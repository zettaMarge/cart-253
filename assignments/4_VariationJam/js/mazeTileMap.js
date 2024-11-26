/**
 * "Enum" class for the mazes' tile mapping
 */
class MazeTileMap {
    static #_EMPTY = 0;
    static #_WALL = 1;
    static #_PLAYER_1_SPAWN = 2;
    static #_PLAYER_1_TRAIL = 3;
    static #_PLAYER_2_SPAWN = 4;
    static #_PLAYER_2_TRAIL = 5;
    static #_COMBINED_TRAIL = 6;
    static #_NEW_WALL = 7;

    static get EMPTY() { return this.#_EMPTY; }
    static get WALL() { return this.#_WALL; }
    static get PLAYER_1_SPAWN() { return this.#_PLAYER_1_SPAWN; }
    static get PLAYER_1_TRAIL() { return this.#_PLAYER_1_TRAIL; }
    static get PLAYER_2_SPAWN() { return this.#_PLAYER_2_SPAWN; }
    static get PLAYER_2_TRAIL() { return this.#_PLAYER_2_TRAIL; }
    static get COMBINED_TRAIL() { return this.#_COMBINED_TRAIL; }
    static get NEW_WALL() { return this.#_NEW_WALL; }
}