/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function() {
  return loadTemplates([

    // Shared Partials
    "systems/sw5efoundry/templates/actors/parts/active-effects.html",

    // Actor Sheet Partials
    "systems/sw5efoundry/templates/actors/parts/actor-traits.html",
    "systems/sw5efoundry/templates/actors/parts/actor-traits-new.html",
    "systems/sw5efoundry/templates/actors/parts/actor-inventory.html",
    "systems/sw5efoundry/templates/actors/parts/actor-inventory-alternative.html",
    "systems/sw5efoundry/templates/actors/parts/actor-features.html",
    "systems/sw5efoundry/templates/actors/parts/actor-spellbook.html",
    "systems/sw5efoundry/templates/actors/parts/actor-forcepowers.html",
    "systems/sw5efoundry/templates/actors/parts/actor-techpowers.html",

    // Item Sheet Partials
    "systems/sw5efoundry/templates/items/parts/item-action.html",
    "systems/sw5efoundry/templates/items/parts/item-activation.html",
    "systems/sw5efoundry/templates/items/parts/item-description.html",
    "systems/sw5efoundry/templates/items/parts/item-mountable.html"
  ]);
};
