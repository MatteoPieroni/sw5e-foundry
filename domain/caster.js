export class Caster {
    static base = 8;

    static getCastingDC({ proficiencyBonus, modifier }) {
        return this.base + proficiencyBonus + modifier;
    }

    static getCastingAttackModifier({ proficiencyBonus, modifier }) {
        return proficiencyBonus + modifier;
    }
}