export class Power {
    static computeModifierAlignment({ itemType, itemAlignment, currentModifier, settings = {} }) {
        const abilities = settings.abilities || CONFIG.DND5E.abilities;
        const alignmentModifiers = settings.alignmentModifiers || CONFIG.DND5E.powerAlignmentsModifiers;

        // check the modifier is correct for the alignment of the power
        const alignmentMods = alignmentModifiers[itemType]?.[itemAlignment || "uni"] || [];
        const originalMods = alignmentMods.length > 1 ?
            alignmentMods.reduce(
                (acc, curr, i) => {
                    return i === 0 ? abilities[curr] : `${acc} or ${abilities[curr]}`;
                },
                ''
            ) :
            abilities[alignmentMods[0]];
    
        const isWrongModifier = {
          value: !alignmentMods.find(mod => mod === currentModifier),
          label: 
            game.i18n.format('DND5E.PowerWrongModifier', {
              original: originalMods,
              current: abilities[currentModifier]
            })
        };

        return isWrongModifier;
    }
}