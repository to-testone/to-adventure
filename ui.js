export class UI {
    constructor() {
        this.playerNameElement = document.getElementById("player_name");
        this.heroClassElement = document.getElementById("hero_class");
        this.healthElement = document.getElementById("health");
        this.manaElement = document.getElementById("mana");
        this.atkElement = document.getElementById("atk");
        this.defElement = document.getElementById("def");
        this.expElement = document.getElementById("exp");
        this.moneyElement = document.getElementById("money");
        this.logElement = document.getElementById("log");
        this.inventoryElement = document.getElementById("inventory");
        this.equipmentElement = document.getElementById("equipment");
        this.logTimeout;
        this.screens = document.querySelectorAll('[data-screen]');
    }

    updateStats(player) {  
        this.playerNameElement.innerText = `Name: ${player.player_name}`;
        this.heroClassElement.innerText = `Class: ${player.hero_class}`;
        this.healthElement.innerText = `Health: ${player.health} / ${player.maxHealth}`;
        this.manaElement.innerText = `Mana: ${player.mana} / ${player.maxMana}`;
        this.atkElement.innerText = (player.addAtk !== 0 ? `Attack: ${player.baseAtk} +${player.addAtk}` : `Attack: ${player.baseAtk}`);
        this.defElement.innerText = (player.addDef !== 0 ? `Defense: ${player.baseDef} +${player.addDef}` : `Defense: ${player.baseDef}`);
        this.expElement.innerText = `Exp: ${player.exp}`;
        this.moneyElement.innerText = `Money: ${player.money}`;
    }

    updateInventory(player) {
        this.inventoryElement.innerText = '';
        player.inventory.forEach(item => {
            const itemSlot = document.createElement('div');
            itemSlot.classList.add('item-slot');
            itemSlot.addEventListener('click', () => item.on_click(player, this))

            const itemImage = document.createElement('img');
            itemImage.src = `images/${item.name}.png`;
            itemImage.onerror = function() {
                this.src = 'images/NoImage.png';
            };
            itemImage.alt = item.name;

            const itemAmount = document.createElement('div');
            itemAmount.classList.add('item-amount');
            itemAmount.textContent = `x ${item.amount}`;

            const itemData = document.createElement('div')
            itemData.classList.add('item-data')

            const itemName = document.createElement('div');
            itemName.classList.add('item-name');
            itemName.textContent = item.name;

            const itemType = document.createElement('div');
            itemType.classList.add('item-type');
            itemType.textContent = item.getType();
            itemType.style.color = "#F4B183";

            const itemDescription = document.createElement('div');
            itemDescription.classList.add('item-description');
            itemDescription.textContent = `Description: ${item.desc}`;

            const itemPrice = document.createElement('div');
            itemPrice.classList.add('item-price');
            itemPrice.textContent = `Price: ${item.price/2}`;

            itemSlot.appendChild(itemImage);
            itemSlot.appendChild(itemAmount);
            itemData.appendChild(itemName);
            itemData.appendChild(itemType);
            itemData.appendChild(itemDescription);
            itemData.appendChild(itemPrice);
            itemSlot.appendChild(itemData);
            this.inventoryElement.appendChild(itemSlot);
        });
    }

    updateEquipment(player) {
        this.equipmentElement.innerText = '';
        for (const [key, value] of Object.entries(player.equipmentSlot)) {
            if (value) {
                const equipmentSlot = document.createElement('div');
                equipmentSlot.classList.add('equipment-slot');
                equipmentSlot.addEventListener('click', () => player.unequip(key, value))
    
                const equipmentImage = document.createElement('img');
                equipmentImage.src = (value ? `images/${value.name}.png` : 'images/Empty.png');
                equipmentImage.onerror = function() {
                    this.src = 'images/NoImage.png';
                };
                equipmentImage.alt = value.name;
                equipmentSlot.appendChild(equipmentImage);
                this.equipmentElement.appendChild(equipmentSlot);
            } else {
                const equipmentSlot = document.createElement('div');
                equipmentSlot.classList.add(key);
    
                const equipmentImage = document.createElement('img');
                equipmentImage.src = 'images/Empty.png';
                equipmentImage.alt = "Empty";
            }
        }
    }

    showLog(message) {
        this.logElement.innerText = message;
        clearTimeout(this.logTimeout);
        this.logTimeout = setTimeout(function() {
            log.innerText = '';
        }, 3000);
    }

  
    showScreen(screenId) {
        this.screens.forEach(screen => {
            if (screen.dataset.screen === screenId) {
            screen.style.display = 'flex';
            } else {
            screen.style.display = 'none';
            }
        });
    }
}

export const ui = new UI()