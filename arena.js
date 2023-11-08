import { monsters_list } from "./monster.js";
import { data } from "./data.js";
import { ui } from "./ui.js";


export class Arena {
    constructor(name, enemy_team) {
        this.player = data.player;
        this.name = name;
        this.enemy_team = enemy_team.map(enemyObj => enemyObj.clone());
        this.can_select = false;
        this.turn = "player";
        this.battleLog = document.getElementById('battle-log');
        this.battleLog.innerText = "Battle Start!";
        this.enemy_area = document.getElementById('enemy-area');
        this.itemButton = document.getElementById('item');
        this.itemButton.disabled = true;
        this.skillButton = document.getElementById('skill');
        this.skillButton.disabled = true;
        this.runButton = document.getElementById('run');
        this.runButton.disabled = false;
        this.runButton.onclick = () => {ui.showScreen('town');}
        this.update();
    }

    update() {
        this.enemy_area.innerHTML = "";
        this.enemy_team.forEach(enemy => {
            let enemyElement = document.createElement("div");
            enemyElement.onclick = () => {
                if (this.can_select) {
                    this.action('attack', enemy);
                }
            };
            enemyElement.style.userSelect = "none";
            enemyElement.draggable = false;
            enemyElement.className = "enemy"
            enemyElement.innerHTML = `
                <span class="enemy-name">${enemy.name}</span>
                <img src="images/${enemy.name}.png" alt=${enemy.name} draggable="false">
                <div class="health-bar">
                    <div class="health" style="width: ${(enemy.health / enemy.maxHealth) * 100}%"></div>
                </div>
            `
            this.enemy_area.appendChild(enemyElement);
        })
        if (this.enemy_team.length === 0) {
            this.win()
        }
        const actionButtons = document.querySelectorAll('[data-action]');
        actionButtons.forEach(button => {
            if (this.turn === "player") {
                button.disabled = false;
            } else {
                button.disabled = true;
            }
            if (button.dataset.action === "attack") {
                button.onclick = () => {
                    this.battleLog.innerText = "Select enemy to attack."
                    this.can_select = true;
                }
            }
        })
    }

    action(action, target) {
        this.runButton.disabled = true;
        switch (action) {
            case 'attack':
                const damage = (this.player.atk-target.def < 0 ? 0 : this.player.atk-target.def);
                target.take_damage(damage);
                this.battleLog.innerHTML = `${target.name} take ${damage} damage from ${this.player.player_name}`
        }
        this.can_select = false;
        this.turn = "enemy";
        this.update();
        if (target.health <= 0) {
            this.slain(this.player, target);
        }
        if (this.enemy_team.length > 0) {
            this.enemyTurn(this.enemy_team, this.battleLog);
        }
    }

    enemyTurn(enemy_team, battleLog) {
        let i = 0;
        let interval = setInterval(() => {
            if (i < enemy_team.length) {
                const enemy = enemy_team[i];
                const damage = enemy.atk-this.player.def < 0 ? 0 : enemy.atk-this.player.def;
                this.player.take_damage(damage);
                battleLog.innerHTML += `<br>${this.player.player_name} take ${damage} damage from ${enemy.name}`;
                battleLog.scrollTop = battleLog.scrollHeight;
                i++;
                ui.updateStats(this.player);
                if (this.player.health <= 0) {
                    clearInterval(interval);
                    interval = null;
                    this.lose(enemy);
                    return;
                }
            }
            
            if (i === enemy_team.length) {
                clearInterval(interval);
                interval = null;
                this.turn = "player";
                this.update();
            }
        }, 1000)
    }

    slain(attacker, target) {
        const dropItem = target.dropItem().clone()
        attacker.get_exp(target.drop_exp);
        attacker.get_item(dropItem);
        this.battleLog.innerText = `${attacker.player_name} killed ${target.name}. receive EXP ${target.drop_exp}
                    ${attacker.player_name} get ${dropItem.name} x ${dropItem.amount}`;
        this.enemy_team = this.enemy_team.filter(e => e !== target);
        this.update();
    }

    win() {
        this.battleLog.innerHTML += "<br>You Win!!";
        this.battleLog.scrollTop = this.battleLog.scrollHeight;
        const button = document.createElement("button");
        button.innerText = "Go back";
        button.onclick = () => {ui.showScreen("town")};
        this.enemy_area.appendChild(button);
    }

    lose(monster) {
        this.battleLog.innerText = `${this.player.player_name} get killed by ${monster.name}`;
        const button = document.createElement("button");
        button.innerText = "Restart";
        button.onclick = () => {ui.showScreen("first");};
        this.enemy_area.innerHTML = "";
        this.enemy_area.appendChild(button);
    }

    clone() {
        return new Arena(this.name, this.enemy_team);
    }

}

export const arena_list = {
    "1-1": new Arena("1-1", [monsters_list.slime, monsters_list.slime]),
    "1-2": new Arena("1-2", [monsters_list.worm, monsters_list.worm]),
    "1-3": new Arena("1-3", [monsters_list.bat, monsters_list.worm, monsters_list.slime]),
    "1-4": new Arena("1-4", [monsters_list.monkey, monsters_list.bat]),
    "1-5": new Arena("1-5", [monsters_list.monkey, monsters_list.cowjubss, monsters_list.monkey]),
    "1-Boss": new Arena("1-Boss", [monsters_list.yearningfell]),
}
