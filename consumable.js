import {Item} from './item.js'

export class Consumable extends Item {
    constructor(id, name, desc, amount, price, type, buff_amount) {
        super(id, name, desc, amount, price)
        this.type = type;
        this.buff_amount = buff_amount;
    }

    on_click(player, ui) {
        if (player.atShop) {
            this.sell(player);
        } else {
            this.use(player, ui);
        }
    }

    use(player, ui) {
        player.use(this);
        this.amount -= 1;
        if (this.amount <= 0) {
            player.remove_item(this);
        }
        ui.updateInventory(player);
    }

    getType() {
        return "consumable";
    }

    clone() {
        return new Consumable(this.id, this.name, this.desc, this.amount, this.price, this.type, this.buff_amount);
    }
}

export const consumable_list = {
    red_potion: new Consumable(200, "Small Red Potion", "Little heal your health", 1, 10, "health", 5),
    blue_potion: new Consumable(201, "Small Blue Potion", "Little add of your mana", 1, 10, "mana", 5),
    banana: new Consumable(202, "Banana", "I feel like monkey", 1, 16, "health", 5),
    milk: new Consumable(203, "Milk", "Mooo", 1, 24, "health", 10),
    cheese: new Consumable(204, "Cheese", "Holy cow", 1, 50, "health/mana", 20),
}