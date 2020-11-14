export class Alignment {
  static min = -100;
  static max = 100;
  static alignPowerValue = {
    lig: 1,
    dar: -1,
    uni: 0,
  }

  static computePowerToAlignment({ original, powerType }) {
    const modifier = this.alignPowerValue[powerType];

    return Math.min(Math.max(original + modifier, this.min), this.max);
  }

  static checkPowerEffect({ alignment }) {
    
  }
}