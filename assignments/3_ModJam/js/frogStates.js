/**
 * "Enum" class for the states the frog can be in
 */
class FrogStates {
    static #_IDLE = 0;
    static #_OUTBOUND = 1;
    static #_INBOUND = 2;
    static #_STUNNED = 3;

    static get IDLE() { return this.#_IDLE; }
    static get OUTBOUND() { return this.#_OUTBOUND; }
    static get INBOUND() { return this.#_INBOUND; }
    static get STUNNED() { return this.#_STUNNED; }
}