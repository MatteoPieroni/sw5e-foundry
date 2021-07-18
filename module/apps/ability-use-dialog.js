/**
 * A specialized Dialog subclass for ability usage
 * @type {Dialog}
 */
export default class AbilityUseDialog extends Dialog {
  constructor(item, dialogData={}, options={}) {
    super(dialogData, options);
    this.options.classes = ["sw5e", "dialog"];

    /**
     * Store a reference to the Item entity being used
     * @type {Item5e}
     */
    this.item = item;
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * A constructor function which displays the Spell Cast Dialog app for a given Actor and Item.
   * Returns a Promise which resolves to the dialog FormData once the workflow has been completed.
   * @param {Item5e} item
   * @return {Promise}
   */
  static async create(item) {
    if ( !item.isOwned ) throw new Error("You cannot display an ability usage dialog for an unowned item");

    // Prepare data
    const actorData = item.actor.data.data;
    const itemData = item.data.data;
    const uses = itemData.uses || {};
    const quantity = itemData.quantity || 0;
    const recharge = itemData.recharge || {};
    const recharges = !!recharge.value;
    const sufficientUses = (quantity > 0 && !uses.value) || uses.value > 0; 

    // Prepare dialog form data
    const data = {
      item: item.data,
      title: game.i18n.format("DND5E.AbilityUseHint", {type: game.i18n.localize(`DND5E.ItemType${item.type.capitalize()}`), name: item.name}),
      note: this._getAbilityUseNote(item.data, uses, recharge),
      consumeSpellSlot: false,
      consumeRecharge: recharges,
      consumeResource: !!itemData.consume.target,
      consumeUses: uses.per && (uses.max > 0),
      canUse: recharges ? recharge.charged : sufficientUses,
      createTemplate: game.user.can("TEMPLATE_CREATE") && item.hasAreaTarget,
      errors: []
    };
    if ( item.data.type === "spell" ) this._getSpellData(actorData, itemData, data);
    if ( item.data.type === "forcepower" ) this._getPowerData(actorData, itemData, data, { mode: 'force' });
    if ( item.data.type === "techpower" ) this._getPowerData(actorData, itemData, data, { mode: 'tech' });

    // Render the ability usage template
    const html = await renderTemplate("systems/sw5efoundry/templates/apps/ability-use.html", data);

    // Create the Dialog and return data as a Promise
    const icon = data.isSpell ? "fa-magic" : "fa-fist-raised";
    const label = game.i18n.localize("DND5E.AbilityUse" + (data.isSpell ? "Cast" : "Use"));
    return new Promise((resolve) => {
      const dlg = new this(item, {
        title: `${item.name}: ${game.i18n.localize("DND5E.AbilityUseConfig")}`,
        content: html,
        buttons: {
          use: {
            icon: `<i class="fas ${icon}"></i>`,
            label: label,
            callback: html => {
              const fd = new FormDataExtended(html[0].querySelector("form"));
              resolve(fd.toObject());
            }
          }
        },
        default: "use",
        close: () => resolve(null)
      });
      dlg.render(true);
    });
  }

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Get dialog data related to limited spell slots
   * @private
   */
  static _getSpellData(actorData, itemData, data) {

    // Determine whether the spell may be up-cast
    const lvl = itemData.level;
    const consumeSpellSlot = (lvl > 0) && CONFIG.DND5E.spellUpcastModes.includes(itemData.preparation.mode);

    // If can't upcast, return early and don't bother calculating available spell slots
    if (!consumeSpellSlot) {
      mergeObject(data, { isSpell: true, consumeSpellSlot });
      return;
    }

    // Determine the levels which are feasible
    let lmax = 0;
    const spellLevels = Array.fromRange(10).reduce((arr, i) => {
      if ( i < lvl ) return arr;
      const label = CONFIG.DND5E.spellLevels[i];
      const l = actorData.spells["spell"+i] || {max: 0, override: null};
      let max = parseInt(l.override || l.max || 0);
      let slots = Math.clamped(parseInt(l.value || 0), 0, max);
      if ( max > 0 ) lmax = i;
      arr.push({
        level: i,
        label: i > 0 ? game.i18n.format('DND5E.SpellLevelSlot', {level: label, n: slots}) : label,
        canCast: max > 0,
        hasSlots: slots > 0
      });
      return arr;
    }, []).filter(sl => sl.level <= lmax);

    // If this character has pact slots, present them as an option for casting the spell.
    const pact = actorData.spells.pact;
    if (pact.level >= lvl) {
      spellLevels.push({
        level: 'pact',
        label: `${game.i18n.format('DND5E.SpellLevelPact', {level: pact.level, n: pact.value})}`,
        canCast: true,
        hasSlots: pact.value > 0
      });
    }
    const canCast = spellLevels.some(l => l.hasSlots);
    if ( !canCast ) data.errors.push(game.i18n.format("DND5E.SpellCastNoSlots", {
      level: CONFIG.DND5E.spellLevels[lvl],
      name: data.item.name
    }));

    // Merge spell casting data
    return foundry.utils.mergeObject(data, { isSpell: true, consumeSpellSlot, spellLevels });
  }

  /* -------------------------------------------- */

  /**
   * Get dialog data related to limited power points
   * @private
   */
  static _getPowerData(actorData, itemData, data, { mode }) {
    const isTech = mode === "tech";

    // check the modifier is correct for the alignment of the power
    const isWrongModifier = Power.computeModifierAlignment({
      itemType: data.item.type,
      itemAlignment: itemData.school || "uni",
      currentModifier: actorData.attributes[isTech ? 'techcasting' : 'forcecasting'],
    });

    // Determine whether the spell may be up-cast
    const lvl = itemData.level;

    // If the power is at-will do not show consume points checkbox
    const powerCosts = lvl > 0;

    // Determine the levels which are feasible
    const remainingPoints = isTech ? actorData.techcasting.points.value : actorData.forcecasting.points.value;
    let lmax = actorData[(isTech ? 'techcasting' : 'forcecasting')]?.level || 0;

    const canUpcast = lvl < lmax;
    const isHigherPower = lvl > lmax;

    // If can't upcast, return early and don't bother calculating available spell slots
    if (!canUpcast) {
      foundry.utils.mergeObject(data, {
        isSpell: true,
        canUpcast,
        hasSlots: remainingPoints - (lvl + 1) > 0,
        isHigherPower,
        isWrongModifier,
        powerCosts,
      });
      return;
    }

    const spellLevels = Array.fromRange(10).reduce((arr, i) => {
      if ( i < lvl ) return arr;
      const label = CONFIG.DND5E.powerLevels[i];
      const potentialRemainingPoints = remainingPoints - (i + 1);

      arr.push({
        level: i,
        label,
        canCast: potentialRemainingPoints > 0,
        hasSlots: potentialRemainingPoints > 0,
      });
      return arr;
    }, []).filter(sl => sl.level <= lmax);

    const canCast = spellLevels.some(l => l.hasSlots);
    if ( !canCast ) data.errors.push(game.i18n.format("DND5E.SpellCastNoSlots", {
      level: CONFIG.DND5E.spellLevels[lvl],
      name: data.item.name
    }));

    // Return merged data
    return foundry.utils.mergeObject(data, {
      isSpell: true,
      canUpcast,
      spellLevels,
      isHigherPower,
      isWrongModifier,
      // if we can upcast then always ask about consuming power points
      powerCosts: true,
    });
  }

  /* -------------------------------------------- */

  /**
   * Get the ability usage note that is displayed
   * @private
   */
  static _getAbilityUseNote(item, uses, recharge) {

    // Zero quantity
    const quantity = item.data.quantity;
    if ( quantity <= 0 ) return game.i18n.localize("DND5E.AbilityUseUnavailableHint");

    // Abilities which use Recharge
    if ( !!recharge.value ) {
      return game.i18n.format(recharge.charged ? "DND5E.AbilityUseChargedHint" : "DND5E.AbilityUseRechargeHint", {
        type: game.i18n.localize(`DND5E.ItemType${item.type.capitalize()}`),
      })
    }

    // Does not use any resource
    if ( !uses.per || !uses.max ) return "";

    // Consumables
    if ( item.type === "consumable" ) {
      let str = "DND5E.AbilityUseNormalHint";
      if ( uses.value > 1 ) str = "DND5E.AbilityUseConsumableChargeHint";
      else if ( item.data.quantity === 1 && uses.autoDestroy ) str = "DND5E.AbilityUseConsumableDestroyHint";
      else if ( item.data.quantity > 1 ) str = "DND5E.AbilityUseConsumableQuantityHint";
      return game.i18n.format(str, {
        type: game.i18n.localize(`DND5E.Consumable${item.data.consumableType.capitalize()}`),
        value: uses.value,
        quantity: item.data.quantity,
        max: uses.max,
        per: CONFIG.DND5E.limitedUsePeriods[uses.per]
      });
    }

    // Other Items
    else {
      return game.i18n.format("DND5E.AbilityUseNormalHint", {
        type: game.i18n.localize(`DND5E.ItemType${item.type.capitalize()}`),
        value: uses.value,
        max: uses.max,
        per: CONFIG.DND5E.limitedUsePeriods[uses.per]
      });
    }
  }
}
