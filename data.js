import { Player } from "./player.js";

export class Data {
    constructor() {
        this.player = null;
    }

    createPlayer(player_name) {
        this.player = new Player(player_name, "Rogue");
    }
}

export const data = new Data();