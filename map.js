import { ui } from "./ui.js";

export class Map {
    constructor(name, level_req, arena_list) {
        const arenas = document.getElementById('arenas');
        arenas.innerHTML = '';
        arena_list.forEach(arena => {
            const button = document.createElement('button');
            button.innerText = arena.name;
            button.onclick = () => {
                arena.clone();
                ui.showScreen("arena");
            }
            arenas.appendChild(button);
        })

    }

}