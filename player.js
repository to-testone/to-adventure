import { ui } from "./ui.js";

export class Player {

    constructor(player_name, hero_class) {
        this.player_name = player_name
        this.hero_class = hero_class;
        this.maxHealth = 30;
        this.maxMana = 30;
        this.health = this.maxHealth;
        this.mana = this.maxMana;
        this.baseAtk = 5;
        this.baseDef = 0;
        this.addAtk = 0;
        this.addDef = 0;
        this.atk = this.baseAtk + this.addAtk;
        this.def = this.baseDef + this.addDef;
        this.exp = 0;
        this.level = 1;
        this.money = 0,
        this.inventory = [];
        this.equipmentSlot = {weapon: null, shield: null, armor: null};
        this.atShop = false
    }

    get_exp(exp) {
        this.exp += exp;
        if (this.exp >= Math.pow(2, this.level+3)) {
            this.exp -= Math.pow(2, this.level+3);
            this.level += 1;
            this.maxHealth += 5;
            this.maxMana += 5;
            this.health += 5;
            this.mana += 5;
            this.baseAtk += 1;
        }
        ui.updateStats(this);
    }
    
    get_item(item) {
        let existingItem = this.inventory.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.amount += item.amount;
        } else {
            this.inventory.push(item);
        }
        ui.updateInventory(this);
    }

    remove_item(item) {
        this.inventory = this.inventory.filter(i => i !== item);
        ui.updateInventory(this);
    }

    get_equipment(equipment) {
        this.inventory.push(equipment);
        ui.updateInventory(this);
    }
    
    get_health(amount) {
        this.health += amount;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
        ui.updateStats(this);
        ui.updateInventory(this);
    }

    get_mana(amount) {
        this.mana += amount;
        if (this.mana > this.maxMana) {
            this.mana = this.maxMana;
        }
        ui.updateStats(this);
        ui.updateInventory(this);
    }

    get_atk(amount) {
        this.atk += amount;
        ui.updateStats(this);
        ui.updateInventory(this);
    }

    get_def(amount) {
        this.def += amount;
        ui.updateStats(this);
        ui.updateInventory(this);
    }

    get_money(amount) {
        this.money += amount;
        ui.updateStats(this);
    }

    pay_money(amount) {
        this.money -= amount;
        ui.updateStats(this);
    }

    equip(equipment) {
        const eq_type = equipment.type;
        if (this.equipmentSlot[eq_type] === null) {
            this.equipmentSlot[eq_type] = equipment;
            this.inventory = this.inventory.filter(i => i !== equipment);
            this.addAtk += equipment.attack;
            this.addDef += equipment.defense;
            ui.updateInventory(this);
            ui.updateStats(this);
            ui.updateEquipment(this);
            this.update()
        }
    }

    unequip(part, equipment) {
        this.equipmentSlot[part] = null;
        this.addAtk -= equipment.attack;
        this.addDef -= equipment.defense;
        this.inventory.push(equipment);
        ui.updateStats(this);
        ui.updateInventory(this);
        ui.updateEquipment(this);
    }

    use(item) {
        if (item.type === "health") {
            this.get_health(item.buff_amount)
        } else if (item.type === "mana") {
            this.get_mana(item.buff_amount)
        } else if (item.type === "attack") {
            this.get_atk(item.buff_amount)
        } else if (item.type === "defense") {
            this.get_def(item.buff_amount)
        }
    }

    update() {
        this.atk = this.baseAtk + this.addAtk;
        this.def = this.baseDef + this.addDef;
    }

}

