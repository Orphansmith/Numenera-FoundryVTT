/**
 * Data class for Numenera roll options (stat, skill, effort level, etc.)
 *
 * @export
 * @class RollData
 */
export class RollData {
  constructor() {
    this.topic = "";
    this.taskLevel = 0;
    this.nbAssets = 0;
    this.skillLevel = 0;
    this.isHindered = false;
    this.effortLevel = 0;
    this.gmRoll = false;
  }

  get flavorText() {
    let text = `${game.i18n.localize("NUMENERA.rolling")} ${this.topic}`;
    if (this.effortLevel)
      text += `+ ${this.effortLevel} ${game.i18n.localize("NUMENERA.effortLevels")}`;

    return text;
  }

  /**
   * Get the roll formula for the Foundry Roll API (eg. "d20+3").
   *
   * @export
   * @returns {string}
   */
  getRollFormula() {
    let formula = "d20";
    let level = this.skillLevel || 0;

    if (this.isHindered)
      level--;

    if (this.effortLevel)
      level += this.effortLevel;

    if (level > 0)
      formula += "+";

    if (level !== 0)
      formula += (3 * level).toString();

    if (this.taskLevel) {
      formula = `{${formula}}cs>=${3 * this.taskLevel}`;
    }

    return formula;
  }

  /**
   * Given a RollData object, get the related Roll object.
   *
   * @export
   * @returns {Roll}
   */
  getRoll() {
    const rollFormula = this.getRollFormula();
    return new Roll(rollFormula);
  }

  /**
   * Given a Roll object, determine the text for the roll's results.
   *
   * @export
   * @returns {object}
   */
  static rollText(dieRoll) {
    switch (dieRoll) {
      case 1:
        return {
          text: game.i18n.localize("NUMENERA.gmIntrusion"),
          color: 0x000000,
        }

      case 19:
        return {
          text: game.i18n.localize("NUMENERA.minorEffect"),
          color: 0x000000,
        }

      case 20:
        return {
          text: game.i18n.localize("NUMENERA.majorEffect"),
          color: 0x000000,
        }

      default:
        return null;
    }
  }
}
