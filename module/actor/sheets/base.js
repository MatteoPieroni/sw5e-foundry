import Item5e from "../../item/entity.js";
import TraitSelector from "../../apps/trait-selector.js";
import ActorSheetFlags from "../../apps/actor-flags.js";
import ActorMovementConfig from "../../apps/movement-config.js";
import ActorSensesConfig from "../../apps/senses-config.js";
import {DND5E} from '../../config.js';
import {onManageActiveEffect, prepareActiveEffectCategories} from "../../effects.js";
import { Caster } from "../../../domain/caster.js";

/**
 * Extend the basic ActorSheet class to suppose system-specific logic and functionality.
 * This sheet is an Abstract layer which is not used.
 * @extends {ActorSheet}
 */
export default class ActorSheet5e extends ActorSheet {
  constructor(...args) {
    super(...args);

    /**
     * Track the set of item filters which are applied
     * @type {Set}
     */
    this._filters = {
      inventory: new Set(),
      equippedItems: new Set(),
      forcepowers: new Set(),
      techpowers: new Set(),
      features: new Set(),
      effects: new Set()
    };
  }

  /* -------------------------------------------- */

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      scrollY: [
        ".inventory .inventory-list",
        ".features .inventory-list",
        ".spellbook .inventory-list",
        ".effects .inventory-list"
      ],
      tabs: [{navSelector: ".tabs", contentSelector: ".sheet-body", initial: "description"}]
    });
  }

  /* -------------------------------------------- */

  /** @override */
  get template() {
    if ( !game.user.isGM && this.actor.limited ) return "systems/sw5efoundry/templates/actors/limited-sheet.html";
    return `systems/sw5efoundry/templates/actors/${this.actor.data.type}-sheet.html`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {

    // Basic data
    let isOwner = this.entity.owner;
    const data = {
      owner: isOwner,
      limited: this.entity.limited,
      options: this.options,
      editable: this.isEditable,
      cssClass: isOwner ? "editable" : "locked",
      isCharacter: this.entity.data.type === "character",
      isNPC: this.entity.data.type === "npc",
      isVehicle: this.entity.data.type === 'vehicle',
      config: CONFIG.DND5E,
    };

    // The Actor and its Items
    data.actor = duplicate(this.actor.data);
    data.items = this.actor.items.map(i => {
      i.data.labels = i.labels;
      return i.data;
    });
    data.items.sort((a, b) => (a.sort || 0) - (b.sort || 0));
    data.data = data.actor.data;
    data.labels = this.actor.labels || {};
    data.filters = this._filters;

    // Experience required for next level
    const hp = data.data.attributes.hp;
    const hpValue = hp.value;
    const hpMax = hp.tempMax ? hp.tempMax : hp.max;
    const pct = Math.round(hpValue * 100 / hpMax);
    const statuses = ['red','orange', 'yellow', 'green'];
    const status = Math.floor(pct / 30);
    hp.pct = Math.clamped(pct, 0, 100);
    hp.status = statuses[status];

    // Ability Scores
    for ( let [a, abl] of Object.entries(data.actor.data.abilities)) {
      abl.icon = this._getProficiencyIcon(abl.proficient);
      abl.hover = CONFIG.DND5E.proficiencyLevels[abl.proficient];
      abl.label = CONFIG.DND5E.abilities[a];
    }

    // Skills
    if (data.actor.data.skills) {
      for ( let [s, skl] of Object.entries(data.actor.data.skills)) {
        skl.ability = CONFIG.DND5E.abilityAbbreviations[skl.ability];
        skl.icon = this._getProficiencyIcon(skl.value);
        skl.hover = CONFIG.DND5E.proficiencyLevels[skl.value];
        skl.label = CONFIG.DND5E.skills[s];
      }
    }

    // Movement speeds
    data.movement = this._getMovementSpeed(data.actor);

    // Senses
    data.senses = this._getSenses(data.actor);

    // Update traits
    this._prepareTraits(data.actor.data.traits);

    if (!data.isVehicle) {
      // Prepare casting capacity
      this._prepareCasting(data.actor.data);
    }
    
    // Prepare owned items
    this._prepareItems(data);

    // Prepare equipped items
    this._prepareEquippedItems(data);

    // Prepare active effects
    data.effects = prepareActiveEffectCategories(this.entity.effects);

    if (data.isCharacter) {
      // Prepare alignment
      this._prepareAlignment(data);
    }

    // Return data to the sheet
    return data
  }

  /* -------------------------------------------- */

  /**
   * Prepare the display of movement speed data for the Actor*
   * @param {object} actorData                The Actor data being prepared.
   * @param {boolean} [largestPrimary=false]  Show the largest movement speed as "primary", otherwise show "walk"
   * @returns {{primary: string, special: string}}
   * @private
   */
  _getMovementSpeed(actorData, largestPrimary=false) {
    const movement = actorData.data.attributes.movement || {};

    // Prepare an array of available movement speeds
    let speeds = [
      [movement.burrow, `${game.i18n.localize("DND5E.MovementBurrow")} ${movement.burrow}`],
      [movement.climb, `${game.i18n.localize("DND5E.MovementClimb")} ${movement.climb}`],
      [movement.fly, `${game.i18n.localize("DND5E.MovementFly")} ${movement.fly}` + (movement.hover ? ` (${game.i18n.localize("DND5E.MovementHover")})` : "")],
      [movement.swim, `${game.i18n.localize("DND5E.MovementSwim")} ${movement.swim}`]
    ]
    if ( largestPrimary ) {
      speeds.push([movement.walk, `${game.i18n.localize("DND5E.MovementWalk")} ${movement.walk}`]);
    }

    // Filter and sort speeds on their values
    speeds = speeds.filter(s => !!s[0]).sort((a, b) => b[0] - a[0]);

    // Case 1: Largest as primary
    if ( largestPrimary ) {
      let primary = speeds.shift();
      return {
        primary: `${primary ? primary[1] : "0"} ${movement.units}`,
        special: speeds.map(s => s[1]).join(", ")
      }
    }

    // Case 2: Walk as primary
    else {
      return {
        primary: `${movement.walk || 0} ${movement.units}`,
        special: speeds.length ? speeds.map(s => s[1]).join(", ") : ""
      }
    }
  }

  /* -------------------------------------------- */

  _getSenses(actorData) {
    const senses = actorData.data.attributes.senses || {};
    const tags = {};
    for ( let [k, label] of Object.entries(CONFIG.DND5E.senses) ) {
      const v = senses[k] ?? 0
      if ( v === 0 ) continue;
      tags[k] = `${game.i18n.localize(label)} ${v} ${senses.units}`;
    }
    if ( !!senses.special ) tags["special"] = senses.special;
    return tags;
  }

  /* -------------------------------------------- */

  /**
   * Prepare the data structure for traits data like languages, resistances & vulnerabilities, and proficiencies
   * @param {object} traits   The raw traits data object from the actor data
   * @private
   */
  _prepareTraits(traits) {
    const map = {
      "dr": CONFIG.DND5E.damageResistanceTypes,
      "di": CONFIG.DND5E.damageResistanceTypes,
      "dv": CONFIG.DND5E.damageResistanceTypes,
      "ci": CONFIG.DND5E.conditionTypes,
      "languages": CONFIG.DND5E.languages,
      "armorProf": CONFIG.DND5E.armorProficiencies,
      "weaponProf": CONFIG.DND5E.weaponProficiencies,
      "toolProf": CONFIG.DND5E.toolProficiencies
    };
    for ( let [t, choices] of Object.entries(map) ) {
      const trait = traits[t];
      if ( !trait ) continue;
      let values = [];
      if ( trait.value ) {
        values = trait.value instanceof Array ? trait.value : [trait.value];
      }
      trait.selected = values.reduce((obj, t) => {
        obj[t] = choices[t];
        return obj;
      }, {});

      // Add custom entry
      if ( trait.custom ) {
        trait.custom.split(";").forEach((c, i) => trait.selected[`custom${i+1}`] = c.trim());
      }
      trait.cssClass = !isObjectEmpty(trait.selected) ? "" : "inactive";
    }
  }
  
  /* -------------------------------------------- */

  /**
   * Insert a power into the forcepowers object when rendering the character sheet
   * @param {Object} data     The Actor data being prepared
   * @param {Array} powers    The spell data being prepared
   * @private
   */
  _preparePowers(data, powers, { mode }) {
    if (!mode) {
      return new Error('Preparing powers requires specifying power type');
    };

    const owner = this.actor.owner;
    const levels = data.data[mode];
    const spellbook = {};

    // Define some mappings
    const sections = {
      "atwill": -20,
      "innate": -10,
      "pact": 0.5
    };

    // Label spell slot uses headers
    const useLabels = {
      "-20": "-",
      "-10": "-",
      "0": "&infin;"
    };

    // Format a spellbook entry for a certain indexed level
    const registerSection = (sl, i, label, {prepMode="prepared", value, max, override}={}) => {
      spellbook[i] = {
        order: i,
        label: label,
        usesSlots: i > 0,
        canCreate: owner,
        canPrepare: (data.actor.type === "character") && (i >= 1),
        powers: [],
        uses: useLabels[i] || value || 0,
        slots: useLabels[i] || max || 0,
        override: override || 0,
        dataset: {
          type: mode === 'techcasting' ? 'techpower' : 'forcepower',
          level: i
        },
        prop: sl
      };
    };

    // Determine the maximum spell level which has a slot
    const maxLevel = data.data[mode].level;

    // Level-based spellcasters have cantrips and leveled slots
    if ( maxLevel > 0 ) {
      registerSection("power0", 0, CONFIG.DND5E.powerLevels[0]);
      for (let lvl = 1; lvl <= maxLevel; lvl++) {
        const sl = `power${lvl}`;
        registerSection(sl, lvl, CONFIG.DND5E.powerLevels[lvl], levels[sl]);
      }
    }

    // Iterate over every spell item, adding spells to the spellbook by section
    powers.forEach(power => {
      const mode = power.data.preparation && power.data.preparation.mode || "prepared";
      let s = power.data.level || 0;
      const sl = `power${s}`;

      // Specialized spellcasting modes (if they exist)
      if ( mode in sections ) {
        s = sections[mode];
        if ( !spellbook[s] ){
          const l = levels[mode] || {};
          const config = CONFIG.DND5E.powerPreparationModes[mode];
          registerSection(mode, s, config, {
            prepMode: mode,
            value: l.value,
            max: l.max,
            override: l.override
          });
        }
      }

      // Sections for higher-level spells which the caster "should not" have, but spell items exist for
      else if ( !spellbook[s] ) {
        registerSection(sl, s, CONFIG.DND5E.powerLevels[s], {levels: levels[sl]});
      }

      // Add the spell to the relevant heading
      spellbook[s].powers.push(power);
    });

    // Sort the spellbook by section level
    const sorted = Object.values(spellbook);
    sorted.sort((a, b) => a.order - b.order);
    return sorted;
  }

  /* -------------------------------------------- */

  /**
   * Compute the alignment value and shape it as an object to be consumed
   * @param {Object} data     The Actor data being prepared
   * @private
   */
  _prepareAlignment(data) {
    const alignment = this.actor.data.data.details.alignment || '';

    if (!alignment.replace(/\s/g, '')) {
      return;
    }

    data.sheetAlignment = {
      ...(alignment ? { [alignment.toLowerCase()]: true } : {}),
    }
  }

  /* -------------------------------------------- */

  /**
   * Make a collection of equipped items to show on the actor image
   * @param {Object} data     The Actor data being prepared
   * @private
   */
  _prepareEquippedItems(data) {
    const items = data.inventory ? [...data.inventory] : [];
    const filteredItems = items.reduce((acc, group) => (
      group.dataset &&
      (
        group.dataset.type === 'weapon' ||
        group.dataset.type === 'equipment'
      ) ?
        [
          ...acc,
          ...group.items
        ] :
        acc
    ), []);

    const [weapons, armour] = filteredItems.reduce((acc, item) => {
      const isWeapon = item.type === 'weapon';
      const isArmour = item.type === 'equipment';

      if (item.data && !item.data.equipped) {
        return acc;
      }

      return [
        [
          ...acc[0],
          ...(isWeapon ? [item] : []),
        ],
        [
          ...acc[1],
          ...(isArmour ? [item] : []),
        ],
      ]
    }, [[], []]);
    
    data.equippedItems = { weapons, armour };
  }

  /* -------------------------------------------- */

  /**
   * Prepare casting capacities
   * @param {Object} data     The Actor data being prepared
   * @private
   */
  _prepareCasting(data) {
    const {
      forcecasting,
      techcasting,
      attributes: { forcecasting: forceMod, techcasting: techMod, prof: proficiencyBonus },
      abilities,
    } = data;
    const forceModifier = abilities[forceMod].mod;
    const techModifier = abilities[techMod].mod;

    data.forcecasting = {
      ...forcecasting,
      dc: Caster.getCastingDC({ proficiencyBonus, modifier: forceModifier }),
      bonus: Caster.getCastingAttackModifier({ proficiencyBonus, modifier: forceModifier }),
    };

    data.techcasting = {
      ...techcasting,
      dc: Caster.getCastingDC({ proficiencyBonus, modifier: techModifier }),
      bonus: Caster.getCastingAttackModifier({ proficiencyBonus, modifier: techModifier }),
    };
  }

  /* -------------------------------------------- */

  /**
   * Determine whether an Owned Item will be shown based on the current set of filters
   * @return {boolean}
   * @private
   */
  _filterItems(items, filters) {
    return items.filter(item => {
      const data = item.data;

      // Action usage
      for ( let f of ["action", "bonus", "reaction"] ) {
        if ( filters.has(f) ) {
          if ((data.activation && (data.activation.type !== f))) return false;
        }
      }

      // Spell-specific filters
      if ( filters.has("ritual") ) {
        if (data.components.ritual !== true) return false;
      }
      if ( filters.has("concentration") ) {
        if (data.components.concentration !== true) return false;
      }
      if ( filters.has("prepared") ) {
        if ( data.level === 0 || ["innate", "always"].includes(data.preparation.mode) ) return true;
        if ( this.actor.data.type === "npc" ) return true;
        return data.preparation.prepared;
      }

      // Equipment-specific filters
      if ( filters.has("equipped") ) {
        if ( data.equipped !== true ) return false;
      }
      return true;
    });
  }

  /* -------------------------------------------- */

  /**
   * Get the font-awesome icon used to display a certain level of skill proficiency
   * @private
   */
  _getProficiencyIcon(level) {
    const icons = {
      0: '<i class="far fa-square"></i>',
      0.5: '<i class="fas fa-adjust"></i>',
      1: '<i class="fas fa-check"></i>',
      2: '<i class="fas fa-check-double"></i>'
    };
    return icons[level] || icons[0];
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers
  /* -------------------------------------------- */

  /**
   * Activate event listeners using the prepared sheet HTML
   * @param html {HTML}   The prepared HTML object ready to be rendered into the DOM
   */
  activateListeners(html) {

    // Activate Item Filters
    const filterLists = html.find(".filter-list");
    filterLists.each(this._initializeFilterItemList.bind(this));
    filterLists.on("click", ".filter-item", this._onToggleFilter.bind(this));

    // Item summaries
    html.find('.item:not(.effect) .item-name h4').each((_, el) => this._onItemSummary(el));
    html.find('.equipped-items .item .item-preview-js').each((_, el) => this._onEquippedItemSummary(el));

    // Editable Only Listeners
    if ( this.isEditable ) {

      // Input focus and update
      const inputs = html.find("input");
      inputs.focus(ev => ev.currentTarget.select());
      inputs.addBack().find('[data-dtype="Number"]').change(this._onChangeInputDelta.bind(this));

      // Ability Proficiency
      html.find('.ability-proficiency').click(this._onToggleAbilityProficiency.bind(this));

      // Toggle Skill Proficiency
      html.find('.skill-proficiency').on("click contextmenu", this._onCycleSkillProficiency.bind(this));

      // Trait Selector
      html.find('.trait-selector').click(this._onTraitSelector.bind(this));

      // Configure Special Flags
      html.find('.config-button').click(this._onConfigMenu.bind(this));

      // Owned Item management
      html.find('.item-create').click(this._onItemCreate.bind(this));
      html.find('.item-edit').click(this._onItemEdit.bind(this));
      html.find('.item-delete').click(this._onItemDelete.bind(this));
      html.find('.item-uses input').click(ev => ev.target.select()).change(this._onUsesChange.bind(this));
      html.find('.slot-max-override').click(this._onSpellSlotOverride.bind(this));

      // Active Effect management
      html.find(".effect-control").click(ev => onManageActiveEffect(ev, this.entity));
    }

    // Owner Only Listeners
    if ( this.actor.owner ) {

      // Ability Checks
      html.find('.ability-name.rollable').click(this._onRollAbilityTest.bind(this));


      // Roll Skill Checks
      html.find('.skill-name').click(this._onRollSkillCheck.bind(this));

      // Item Rolling
      html.find('.item .item-roll-js').click(event => this._onItemRoll(event));
      html.find('.item .item-recharge').click(event => this._onItemRecharge(event));

      html.find('#sheet-alignment input[type="radio"]').click(this._onSelectAlignment.bind(this));
    }

    // Otherwise remove rollable classes
    else {
      html.find(".rollable").each((i, el) => el.classList.remove("rollable"));
    }

    // Handle default listeners last so system listeners are triggered first
    super.activateListeners(html);
  }

  /* -------------------------------------------- */

  /**
   * Iinitialize Item list filters by activating the set of filters which are currently applied
   * @private
   */
  _initializeFilterItemList(i, ul) {
    const set = this._filters[ul.dataset.filter];
    const filters = ul.querySelectorAll(".filter-item");
    for ( let li of filters ) {
      if ( set.has(li.dataset.filter) ) li.classList.add("active");
    }
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle input changes to numeric form fields, allowing them to accept delta-typed inputs
   * @param event
   * @private
   */
  _onChangeInputDelta(event) {
    const input = event.target;
    const value = input.value;
    if ( ["+", "-"].includes(value[0]) ) {
      let delta = parseFloat(value);
      input.value = getProperty(this.actor.data, input.name) + delta;
    } else if ( value[0] === "=" ) {
      input.value = value.slice(1);
    }
  }

  /* -------------------------------------------- */

  /**
   * Handle spawning the TraitSelector application which allows a checkbox of multiple trait options
   * @param {Event} event   The click event which originated the selection
   * @private
   */
  _onConfigMenu(event) {
    event.preventDefault();
    const button = event.currentTarget;
    switch ( button.dataset.action ) {
      case "movement":
        new ActorMovementConfig(this.object).render(true);
        break;
      case "flags":
        new ActorSheetFlags(this.object).render(true);
        break;
      case "senses":
        new ActorSensesConfig(this.object).render(true);
        break;
    }
  }

  /* -------------------------------------------- */

  /**
   * Handle cycling proficiency in a Skill
   * @param {Event} event   A click or contextmenu event which triggered the handler
   * @private
   */
  _onCycleSkillProficiency(event) {
    event.preventDefault();
    const field = $(event.currentTarget).siblings('input[type="hidden"]');

    // Get the current level and the array of levels
    const level = parseFloat(field.val());
    const levels = [0, 1, 0.5, 2];
    let idx = levels.indexOf(level);

    // Toggle next level - forward on click, backwards on right
    if ( event.type === "click" ) {
      field.val(levels[(idx === levels.length - 1) ? 0 : idx + 1]);
    } else if ( event.type === "contextmenu" ) {
      field.val(levels[(idx === 0) ? levels.length - 1 : idx - 1]);
    }

    // Update the field value and save the form
    this._onSubmit(event);
  }

  /* -------------------------------------------- */

  /** @override */
  async _onDropActor(event, data) {
    const canPolymorph = game.user.isGM || (this.actor.owner && game.settings.get('sw5efoundry', 'allowPolymorphing'));
    if ( !canPolymorph ) return false;

    // Get the target actor
    let sourceActor = null;
    if (data.pack) {
      const pack = game.packs.find(p => p.collection === data.pack);
      sourceActor = await pack.getEntity(data.id);
    } else {
      sourceActor = game.actors.get(data.id);
    }
    if ( !sourceActor ) return;

    // Define a function to record polymorph settings for future use
    const rememberOptions = html => {
      const options = {};
      html.find('input').each((i, el) => {
        options[el.name] = el.checked;
      });
      const settings = mergeObject(game.settings.get('sw5efoundry', 'polymorphSettings') || {}, options);
      game.settings.set('sw5efoundry', 'polymorphSettings', settings);
      return settings;
    };

    // Create and render the Dialog
    return new Dialog({
      title: game.i18n.localize('DND5E.PolymorphPromptTitle'),
      content: {
        options: game.settings.get('sw5efoundry', 'polymorphSettings'),
        i18n: DND5E.polymorphSettings,
        isToken: this.actor.isToken
      },
      default: 'accept',
      buttons: {
        accept: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize('DND5E.PolymorphAcceptSettings'),
          callback: html => this.actor.transformInto(sourceActor, rememberOptions(html))
        },
        wildshape: {
          icon: '<i class="fas fa-paw"></i>',
          label: game.i18n.localize('DND5E.PolymorphWildShape'),
          callback: html => this.actor.transformInto(sourceActor, {
            keepBio: true,
            keepClass: true,
            keepMental: true,
            mergeSaves: true,
            mergeSkills: true,
            transformTokens: rememberOptions(html).transformTokens
          })
        },
        polymorph: {
          icon: '<i class="fas fa-pastafarianism"></i>',
          label: game.i18n.localize('DND5E.Polymorph'),
          callback: html => this.actor.transformInto(sourceActor, {
            transformTokens: rememberOptions(html).transformTokens
          })
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize('Cancel')
        }
      }
    }, {
      classes: ['dialog', 'sw5e'],
      width: 600,
      template: 'systems/sw5efoundry/templates/apps/polymorph-prompt.html'
    }).render(true);
  }

  /* -------------------------------------------- */

  /** @override */
  async _onDropItemCreate(itemData) {

    // Create a Consumable spell scroll on the Inventory tab
    if ( (itemData.type === "spell") && (this._tabs[0].active === "inventory") ) {
      const scroll = await Item5e.createScrollFromSpell(itemData);
      itemData = scroll.data;
    }

    // Create the owned item as normal
    return super._onDropItemCreate(itemData);
  }

  /* -------------------------------------------- */

  /**
   * Handle enabling editing for a spell slot override value
   * @param {MouseEvent} event    The originating click event
   * @private
   */
  async _onSpellSlotOverride (event) {
    const span = event.currentTarget.parentElement;
    const level = span.dataset.level;
    const override = this.actor.data.data.spells[level].override || span.dataset.slots;
    const input = document.createElement("INPUT");
    input.type = "text";
    input.name = `data.spells.${level}.override`;
    input.value = override;
    input.placeholder = span.dataset.slots;
    input.dataset.dtype = "Number";

    // Replace the HTML
    const parent = span.parentElement;
    parent.removeChild(span);
    parent.appendChild(input);
  }

  /* -------------------------------------------- */

  /**
   * Change the uses amount of an Owned Item within the Actor
   * @param {Event} event   The triggering click event
   * @private
   */
  async _onUsesChange(event) {
      event.preventDefault();
      const itemId = event.currentTarget.closest(".item").dataset.itemId;
      const item = this.actor.getOwnedItem(itemId);
      const uses = Math.clamped(0, parseInt(event.target.value), item.data.data.uses.max);
      event.target.value = uses;
      return item.update({ 'data.uses.value': uses });
  }

  /* -------------------------------------------- */

  /**
   * Handle rolling of an item from the Actor sheet, obtaining the Item instance and dispatching to it's roll method
   * @private
   */
  _onItemRoll(event) {
    event.preventDefault();
    const itemId = event.currentTarget.closest(".item").dataset.itemId;
    const item = this.actor.getOwnedItem(itemId);
    return item.roll();
  }

  /* -------------------------------------------- */

  /**
   * Handle attempting to recharge an item usage by rolling a recharge check
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemRecharge(event) {
    event.preventDefault();
    const itemId = event.currentTarget.closest(".item").dataset.itemId;
    const item = this.actor.getOwnedItem(itemId);
    return item.rollRecharge();
  };

  /* -------------------------------------------- */

  /**
   * Handle rolling of an item from the Actor sheet, obtaining the Item instance and dispatching to it's roll method
   * @private
   */
  _onItemSummary(el) {
    const li = $(el).parents(".item"),
        item = this.actor.getOwnedItem(li.data("item-id")),
        specificData = item.data.data,
        chatData = item.getChatData({secrets: this.actor.owner});
    const title = `<h4 class="item-title">${item.data.name}</h4>`;
    const type = item.data.type ? `<p class="item-type">${game.i18n.localize("DND5E.Type")}: ${item.data.type}</p>` : '';
    const weight = item.data.totalWeight ? `<p class="item-weight">${item.data.totalWeight} ${game.i18n.localize("DND5E.AbbreviationLbs")}</p>` : '';
    const uses = specificData.uses && specificData.uses.value ?
      `<p class="item-uses">${specificData.uses.value}/${specificData.uses.max} ${game.i18n.localize("DND5E.LimitedUses")}</p>` :
      '';
    const summary = chatData.description.value && `<div class="item-summary">${chatData.description.value}</div>`;
    const propsArray = chatData.properties.map(p => `<span class="tag">${p}</span>`).join('');
    const props = propsArray ? `<p class="tags-list">${propsArray}</p>` : '';

    const content = `${title}${type}${weight}${uses}${summary}${props}`;

    tippy(el, {
      content,
      allowHTML: true,
      trigger: 'mouseenter focus',
      theme: 'item',
      placement: 'right',
      interactive: true,
      appendTo: $(el).parents('.item-list')[0],
    });
  }

  /* -------------------------------------------- */

  /**
   * Handle preview of an equipped item
   * @private
   */
  _onEquippedItemSummary(el) {
    const li = $(el).parents(".item"),
        item = this.actor.getOwnedItem(li.data("item-id")),
        specificData = item.data.data,
        chatData = item.getChatData({secrets: this.actor.owner});
    const title = `<h4 class="item-title">${item.data.name}</h4>`;
    const uses = specificData.uses && specificData.uses.value ?
      `<p class="item-uses">${specificData.uses.value}/${specificData.uses.max} ${game.i18n.localize("DND5E.LimitedUses")}</p>` :
      '';
    const propsArray = chatData.properties.map(p => `<span class="tag">${p}</span>`).join('');
    const props = propsArray ? `<p class="tags-list">${propsArray}</p>` : '';

    const content = `${title}${uses}${props}`;

    tippy(el, {
      content,
      allowHTML: true,
      trigger: 'mouseenter focus',
      theme: 'item',
      placement: 'right',
      interactive: true,
      appendTo: $(el).parents('.equipped-items-list')[0],
    });
  }

  /* -------------------------------------------- */

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;
    const itemData = {
      name: game.i18n.format("DND5E.ItemNew", {type: type.capitalize()}),
      type: type,
      data: duplicate(header.dataset)
    };
    delete itemData.data["type"];
    return this.actor.createEmbeddedEntity("OwnedItem", itemData);
  }

  /* -------------------------------------------- */

  /**
   * Handle editing an existing Owned Item for the Actor
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemEdit(event) {
    event.preventDefault();
    const li = event.currentTarget.closest(".item");
    const item = this.actor.getOwnedItem(li.dataset.itemId);
    item.sheet.render(true);
  }

  /* -------------------------------------------- */

  /**
   * Handle deleting an existing Owned Item for the Actor
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemDelete(event) {
    event.preventDefault();
    const li = event.currentTarget.closest(".item");
    this.actor.deleteOwnedItem(li.dataset.itemId);
  }

  /* -------------------------------------------- */

  /**
   * Handle rolling an Ability check, either a test or a saving throw
   * @param {Event} event   The originating click event
   * @private
   */
  _onRollAbilityTest(event) {
    event.preventDefault();
    let ability = event.currentTarget.parentElement.dataset.ability;
    this.actor.rollAbility(ability, {event: event});
  }

  /* -------------------------------------------- */

  /**
   * Handle rolling a Skill check
   * @param {Event} event   The originating click event
   * @private
   */
  _onRollSkillCheck(event) {
    event.preventDefault();
    const skill = event.currentTarget.parentElement.dataset.skill;
    this.actor.rollSkill(skill, {event: event});
  }

  /* -------------------------------------------- */

  /**
   * Handle toggling Ability score proficiency level
   * @param {Event} event     The originating click event
   * @private
   */
  _onToggleAbilityProficiency(event) {
    event.preventDefault();
    const field = event.currentTarget.previousElementSibling;
    this.actor.update({[field.name]: 1 - parseInt(field.value)});
  }

  /* -------------------------------------------- */

  /**
   * Handle toggling of filters to display a different set of owned items
   * @param {Event} event     The click event which triggered the toggle
   * @private
   */
  _onToggleFilter(event) {
    event.preventDefault();
    const li = event.currentTarget;
    const parentElement = li.closest('ul');
    const set = this._filters[parentElement.dataset.filter];
    const filter = li.dataset.filter;
    if ( set.has(filter) ) set.delete(filter);
    else set.add(filter);
    this.render();
  }

  /* -------------------------------------------- */

  /**
   * Handle spawning the TraitSelector application which allows a checkbox of multiple trait options
   * @param {Event} event   The click event which originated the selection
   * @private
   */
  _onTraitSelector(event) {
    event.preventDefault();
    const a = event.currentTarget;
    const label = a.parentElement.querySelector("label");
    const choices = CONFIG.DND5E[a.dataset.options];
    const options = { name: a.dataset.target, title: label.innerText, choices };
    new TraitSelector(this.actor, options).render(true)
  }

  /* -------------------------------------------- */

  /**
   * Handle selection of alignment
   * @param {Event} event   The click event which originated the selection
   * @private
   */
  _onSelectAlignment(event) {
    event.preventDefault();
    
    const element = event.target;
    const value = element.value;

    this.actor.update({ ['data.details.alignment']: value });
  }

  /* -------------------------------------------- */
  
  /** @override */
  _getHeaderButtons() {
    let buttons = super._getHeaderButtons();

    // Add button to revert polymorph
    if ( !this.actor.isPolymorphed || this.actor.isToken ) return buttons;
    buttons.unshift({
      label: 'DND5E.PolymorphRestoreTransformation',
      class: "restore-transformation",
      icon: "fas fa-backward",
      onclick: ev => this.actor.revertOriginalForm()
    });
    return buttons;
  }
}