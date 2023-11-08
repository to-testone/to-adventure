import { equipment_list } from './equipment.js';
import { consumable_list } from './consumable.js';
import { ui } from './ui.js';
import { Shop } from './shop.js';
import { Map } from './map.js';
import { arena_list } from './arena.js'
import { data } from './data.js';

const playButton = document.getElementById("play")
const playerName = document.getElementById("player-name");
const fullScreen = document.getElementById("full-screen");
const halfScreen = document.getElementById("half-screen");


playButton.onclick = () => {
    fullScreen.style.display = "none";
    halfScreen.style.display = "flex";
    data.createPlayer(playerName.value);
    
    const player = data.player;
    

    
    ui.showScreen("town");
    
    const buttons = document.querySelectorAll('[data-toscreen]');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            ui.showScreen(button.dataset.toscreen);
            player.atShop = (button.dataset.toscreen==="shop");
            const shop = new Shop([equipment_list.sword, equipment_list.dagger, equipment_list.lance, equipment_list.roundbanger, equipment_list.illuson, consumable_list.red_potion, consumable_list.blue_potion, equipment_list.narmalshill]);
            const map = new Map("Forest", 1, [arena_list['1-1'], arena_list['1-2'], arena_list['1-3'], arena_list['1-4'], arena_list['1-5'], arena_list['1-Boss']]);
        })
    })
    // ---------------- Debug Area ----------------
    if (playerName.value === "TestOne") {
        const potion = consumable_list.red_potion;
        potion.amount = 5;
        player.hero_class = "GM";
        player.get_item(potion);
        player.get_equipment(equipment_list.dagger);
        player.get_equipment(equipment_list.narmalshill);
        player.get_money(200);
    }
    ui.updateStats(player);
    ui.updateInventory(player);
    ui.updateEquipment(player);
}




