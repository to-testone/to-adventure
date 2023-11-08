import { Consumable } from './consumable.js';
import { data } from './data.js';
import { Equipment, equipment_list } from './equipment.js';
import { Item, item_list } from './item.js'
import { ui } from './ui.js'

export class Shop {
    constructor(item_list) {
        this.player = data.player;
        const shelf = document.getElementById('shelf');
        shelf.innerHTML = "";
        item_list.forEach(itemObj => {
            const item = itemObj.clone();
            const itemSlot = document.createElement('div');
            itemSlot.classList.add('item-slot');
            itemSlot.addEventListener('click', () => this.buy(this.player, item))

            const itemImage = document.createElement('img');
            itemImage.src = `images/${item.name}.png`;
            itemImage.onerror = function() {
                this.src = 'images/NoImage.png';
            };
            itemImage.alt = item.name;

            const itemData = document.createElement('div')
            itemData.classList.add('item-data')

            const itemName = document.createElement('div');
            itemName.classList.add('item-name');
            itemName.innerText = item.name;

            const itemType = document.createElement('div');
            itemType.classList.add('item-type');
            itemType.textContent = item.getType();
            itemType.style.color = "#F4B183";

            const itemDescription = document.createElement('div');
            itemDescription.classList.add('item-description');
            itemDescription.innerText = `Description: ${item.desc}`;

            const itemPrice = document.createElement('div');
            itemPrice.classList.add('item-price');
            itemPrice.innerText = `Price: ${item.price}`;

            itemSlot.appendChild(itemImage);
            itemData.appendChild(itemName);
            itemData.appendChild(itemType);
            itemData.appendChild(itemDescription);
            itemData.appendChild(itemPrice);
            itemSlot.appendChild(itemData);
            shelf.appendChild(itemSlot);
        })
    }

    buy(player, itemObj) {
        const item = itemObj.clone();
        if (player.money >= item.price) {
            if (item instanceof Equipment) {
                player.get_equipment(item);
            } else if (item instanceof Consumable) {
                player.get_item(item);
            } else {
                player.get_item(item);
            }
            player.pay_money(item.price);
        }
    }


}
