import {Item} from './item.js'

export class Equipment extends Item {
    constructor(id, name, desc, amount, price, type, attack, defense) {
        super(id, name, desc, amount, price)
        this.type = type; // e.g., weapon, armor, accessory
        this.attack = attack;
        this.defense = defense;
    }

    on_click(player, ui) {
        if (player.atShop) {
            this.sell(player);
        } else {
            this.equip(player);
        }
    }

    equip(player) {
        player.equip(this);
    }

    getType() {
        return "equipment";
    }

    clone() {
        return new Equipment(this.id, this.name, this.desc, this.amount, this.price, this.type, this.attack, this.defense);
    }

}

export const equipment_list = {
    sword: new Equipment(100, "Sword", "Sword of Power", 1, 75, "weapon", 10, 0),
    dagger: new Equipment(101, "Dagger", "Spy dagger", 1, 50, "weapon", 5, 0),
    lance: new Equipment(102, "Lance", "Lancelot", 1, 100, "weapon", 15, 0),
    yearnsword: new Equipment(103, "YearnSword", "Sword of YearningFall", 1, 350, "weapon", 30, 0),
    roundbanger: new Equipment(104, "RoundBanger", "Bang Bang", 1, 150, "shield", 0, 15),
    illuson: new Equipment(105, "Illuson", "Nice Suit", 1, 200, "armor", 0, 20),
}