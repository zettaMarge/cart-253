/**
 * "Enum" class for the game variations
 */
class GameVariation {
    static #_FILL = "1 - FILL";
    static #_BLEND = "2 - BLEND";
    static #_COLORBLIND = "3 - COLORBLIND";

    static get FILL() { return this.#_FILL; }
    static get BLEND() { return this.#_BLEND; }
    static get COLORBLIND() { return this.#_COLORBLIND; }
    static get TO_LIST() { return [this.#_FILL, this.#_BLEND, this.#_COLORBLIND]; }
}