export class Item {
    constructor(id, name, desc, amount, price) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.amount = amount;
        this.price = price;
    }

    on_click(player, ui) {
        if (player.atShop) {
            this.sell(player, ui);
        }
    }
    sell(player, ui) {
        player.get_money((this.price/2));
        this.amount -= 1;
        if (this.amount <= 0) {
            player.remove_item(this);
        }
        ui.updateInventory(player);
    }

    getType() {
        return "item";
    }

    clone() {
        return new Item(this.id, this.name, this.desc, this.amount, this.price);
    }

}

export const item_list = {
    jellopy: new Item(1, "Jellopy", "Yummy", 1, 20),
    bat_wing: new Item(2, "Bat_wing", "Flying wing", 1, 32),
    worm_tooth: new Item(3, "Worm_tooth", "Sharp tooth", 1, 24),
    coconut: new Item(4, "Coconut", "Goooo Shoot", 1, 48),
    spoiledmilk: new Item(5, "Spoiled_Milk", "May be bad luck", 1, 40),
}
