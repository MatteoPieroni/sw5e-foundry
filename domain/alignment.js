export class Alignment {
  static min = -100;
  static max = 100;
  static alignPowerValue = {
    lig: 1,
    dar: -1,
    uni: 0,
  };

  static clamp(value) {
    return Math.min(Math.max(value, this.min), this.max);
  }

  static computeTier(value) {
    if (value >= 0) {
      return Math.floor(value / this.max * 10);
    }

    return Math.floor(value / this.min * 10);
  }

  static computeProgression(value, numberOfPoints) {
    if (!numberOfPoints || numberOfPoints === 0) {
      throw new Error('Cannot modify without a number of points');
    }

    const currentSign = value > 0 ? 1 : -1;
    const modificationSign = numberOfPoints > 0 ? 1 : -1;
    const valueModulus = value * currentSign;
    const tier = Math.floor(valueModulus / this.max * 10);

    if (tier === 0) {
      return value + modificationSign;
    }

    if (currentSign * modificationSign < 0) {
      return value + modificationSign;
    }

    const increase =  Math.max(1, 1 + Math.floor((tier + 1) / 3));
    const decrease =  Math.min(-1, -1 - Math.floor((tier + 1) / 3));

    return value + (modificationSign > 0 ? increase : decrease);
  }

  static computeAlignment({ original = 0, modifier }) {
    const value = this.clamp(this.computeProgression(+original, +modifier));

    return {
      value,
      tier: this.computeTier(value),
    };
  }

  static computePowerToAlignment({ original, powerType }) {
    const modifier = this.alignPowerValue[powerType];
    const value = this.clamp(this.computeProgression(+original, +modifier));

    return {
      value,
      tier: this.computeTier(value),
    };
  }

  static checkPowerEffect({ alignment }) {
    
  }
}