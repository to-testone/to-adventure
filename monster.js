import { consumable_list } from './consumable.js';
import { equipment_list } from './equipment.js';
import {item_list} from './item.js';
import {ui} from './ui.js'
export class Monster {
    constructor(name, maxHealth, level, drop_exp, drop_items) {
        this.name = name;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.level = level;
        this.atk = level;
        this.def = 0;
        this.drop_exp = drop_exp;
        this.drop_items = drop_items;
    }

    take_damage(damage) {
        this.health -= damage;
        if(this.health < 0) {this.health = 0;}
    }

    dropItem() {
        let droppedItem = null;
        this.drop_items.forEach(drop => {
            if (Math.random() < drop.dropChance) {
                droppedItem = drop.item;
            }
        });
        return droppedItem;
    }

    clone() {
        return new Monster(this.name, this.health, this.level, this.drop_exp, this.drop_items);
    }
}

export const monsters_list = {
    slime: new Monster("Slime", 10, 1, 10, [{item: item_list.jellopy.clone(), dropChance: 1}, {item: consumable_list.red_potion.clone(), dropChance: 0.2}, {item: equipment_list.sword.clone(), dropChance: 0.05}]),
    worm: new Monster("Worm", 8, 3, 12, [{item: item_list.worm_tooth.clone(), dropChance: 1}, {item: consumable_list.red_potion.clone(), dropChance: 0.2}, {item: equipment_list.lance.clone(), dropChance: 0.05}]),
    bat: new Monster("Bat", 15, 5, 18, [{item: item_list.bat_wing.clone(), dropChance: 1}, {item: consumable_list.blue_potion.clone(), dropChance: 0.2}, {item: equipment_list.dagger.clone(), dropChance: 0.05}]),
    monkey: new Monster("Monkey", 20, 8, 25, [{item: item_list.coconut.clone(), dropChance: 1}, {item: consumable_list.banana.clone(), dropChance: 0.2}, {item: equipment_list.dagger.clone(), dropChance: 0.05}]),
    cowjubss: new Monster("CowJubss", 30, 10, 40, [{item: item_list.spoiledmilk.clone(), dropChance: 1}, {item: consumable_list.milk.clone(), dropChance: 0.2}, {item: consumable_list.cheese.clone(), dropChance: 0.1}, {item: equipment_list.lance.clone(), dropChance: 0.05}]),
    yearningfell: new Monster("YearningFell", 64, 15, 200, [{item: consumable_list.red_potion.clone(), dropChance: 1.0}, {item: consumable_list.blue_potion.clone(), dropChance: 0.7}, {item: equipment_list.yearnsword.clone(), dropChance: 0.1}]),
};