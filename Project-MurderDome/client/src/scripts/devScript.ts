
import { PlayerControl } from '../classes/devPlayerControl.js';
import { Action } from '../../../shared/src/classes/Actions.js';
import { PriorityQueue } from '../classes/PriorityQueue.js';


let PlayerAmtElement: HTMLInputElement = undefined;
let CreatePlayersBtn: HTMLButtonElement = undefined;
let PlayersContainer: HTMLDivElement = undefined;
let GOBtn: HTMLButtonElement = undefined;
let ActionLogContainer: HTMLDivElement = undefined;

let playerControls: PlayerControl[] = [];
let actions: PriorityQueue = new PriorityQueue(Action.comparator);

function clearData() {
    playerControls = [];
    PlayersContainer.innerHTML = "";
}

function CreatePlayersBtnClickHandler() {

    clearData();

    let allPlayerIds: string[] = [];

    for (let i = 0; i < +PlayerAmtElement.value; i++) {
        allPlayerIds.push(i+"");
    }

    let container: HTMLDivElement = document.createElement('div');
    container.classList.add("PlayersContainerCore");

    allPlayerIds.forEach(function (playerId) {
        let playerDiv: HTMLDivElement = document.createElement('div');
        playerDiv.classList.add("PlayerControlContainer");
        playerControls.push(new PlayerControl(playerDiv, playerId, allPlayerIds));
        container.appendChild(playerDiv);
    });

    PlayersContainer.appendChild(container);

}

function GOBtnClickHandler() {

    if (playerControls.length < 1) {
        return;
    }

    displayLog(resolveActions());
}

function displayLog(log: string) {
    ActionLogContainer.innerHTML = log
}

function resolveActions(): string {

    let log: string = "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++<br/>";

    playerControls.forEach((playerControl) => {
        //let action: Action = playerControl.player.getAction();
        let action: Action = Action.buildAction(playerControl.player);
        if (action) {
            actions.push(action);
        }
    });

    while (!actions.isEmpty()) {
        let action: Action = actions.pop();
        if (action) {
            log += resolveAction(action) + "<br/>";
        }
    }

    log += "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++<br/>";
    return log;
}

function resolveAction(action: Action): string {

    let log: string = "";
    //log = "+" + action.owner.getNameTag() + ": " + action.action + "<br/>";
    log += action.resolve();


    //if (action.action === Action.PLAYERACTIONS.attack) {
    //    log += "+++ if(" + playerControls[+action.target].player.getName() + " attack-response roll exists&fails)<br/>";
    //    log += "+++++ if(" + action.owner.getName() + " attack roll succeed)<br/>";
    //    log += "+++++++ " + action.owner.getName() + " damage roll<br/>";
    //    log += "+++++++ " + playerControls[+action.target].player.getName() + " take damage<br/>";
    //}




    playerControls[action.owner.playerId].updateControlWithPlayerData();
    playerControls[+action.target].updateControlWithPlayerData();
    return log;
}

function populateDOMElementVariables() {

    PlayerAmtElement = document.getElementById("PlayerAmt") as HTMLInputElement;
    PlayersContainer = document.getElementById("Players") as HTMLDivElement;
    ActionLogContainer = document.getElementById("ActionLog") as HTMLDivElement;

    CreatePlayersBtn = document.getElementById("CreatePlayers") as HTMLButtonElement;
    GOBtn = document.getElementById("GO") as HTMLButtonElement;

    addHandlers();

    return;
}

function addHandlers() {

    CreatePlayersBtn.addEventListener("click", CreatePlayersBtnClickHandler);
    GOBtn.addEventListener("click", GOBtnClickHandler);

    return;
}


function init() {
    populateDOMElementVariables();

    return;
}

window.onload = function () {
    init();

    return;
};






