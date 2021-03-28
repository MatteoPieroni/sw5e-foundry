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
      // get the tier by diving the new value by 10
      // and getting the lower value
      return Math.floor(value / this.max * 10);
    }

    // get the tier by diving the new value by 10
    // and getting the higher value
    return Math.ceil(value / this.min * -10);
  }

  static computeProgression(value, numberOfPoints) {
    if (numberOfPoints === 0) {
      return value;
    }

    if (!numberOfPoints) {
      throw new Error('Cannot modify without a number of points');
    }

    // check current number of points sign
    const currentSign = value >= 0 ? 1 : -1;
    // check modification sign
    const modificationSign = numberOfPoints > 0 ? 1 : -1;
    // get current number of points
    const valueModulus = value * currentSign;
    // get the current tier
    const tier = Math.floor(valueModulus / this.max * 10);

    // if the tier is 0 simply return the new number of points
    if (tier === 0) {
      return value + numberOfPoints;
    }

    // if the modification goes in the opposite direction of the current return the number of points
    // when the direction is inverse we don't want to calculate with a different
    // modifier
    if (currentSign * modificationSign < 0) {
      return value + numberOfPoints;
    }

    // otherwise check if it goes towards the light side or the dark side
    // and update using a linear increase dependent on the current tier
    const increase =  Math.max(1, numberOfPoints + Math.floor((tier + 1) / 3));
    const decrease =  Math.min(-1, numberOfPoints - Math.floor((tier + 1) / 3));

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

  static checkChangedTierEffect({ currentTier, newTier, config }) {
    if ((currentTier !== 0 && !currentTier) || (newTier !== 0 && !newTier)) {
      console.error('You need to pass both tiers to calculate a tier change');
      return;
    }

    if (currentTier === newTier) {
      return;
    }

    return {
      tier: newTier,
      ...(config[newTier] ? config[newTier] : {}),
    }
  }
}