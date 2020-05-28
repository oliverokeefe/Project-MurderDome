import { PlayerControl } from '../classes/devPlayerControl.js';
import { Action } from '../../../shared/src/classes/Action.js';
import { PriorityQueue } from '../classes/PriorityQueue.js';
let PlayerAmtElement = undefined;
let CreatePlayersBtn = undefined;
let PlayersContainer = undefined;
let GOBtn = undefined;
let ActionLogContainer = undefined;
let playerControls = [];
let actions = new PriorityQueue(Action.comparator);
function clearData() {
    playerControls = [];
    PlayersContainer.innerHTML = "";
}
function CreatePlayersBtnClickHandler() {
    clearData();
    let allPlayerIds = [];
    for (let i = 0; i < +PlayerAmtElement.value; i++) {
        allPlayerIds.push(i + "");
    }
    let container = document.createElement('div');
    container.classList.add("PlayersContainerCore");
    allPlayerIds.forEach(function (playerId) {
        let playerDiv = document.createElement('div');
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
function displayLog(log) {
    ActionLogContainer.innerHTML = log;
}
function resolveActions() {
    let log = "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++<br/>";
    playerControls.forEach((playerControl) => {
        let action = playerControl.player.getAction();
        if (action) {
            actions.push(action);
        }
    });
    while (!actions.isEmpty()) {
        let action = actions.pop();
        log += resolveAction(action) + "<br/>";
    }
    log += "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++<br/>";
    return log;
}
function resolveAction(action) {
    let log = "";
    //log = "+" + playerControls[+action.ownerId].player.getNameTag() + ": " + action.action + "<br/>";
    //if (action.action === Action.PLAYERACTIONS.attack) {
    //    log += "+++ if(" + playerControls[+action.target].player.getName() + " attack-response roll exists&fails)<br/>";
    //    log += "+++++ if(" + playerControls[+action.ownerId].player.getName() + " attack roll succeed)<br/>";
    //    log += "+++++++ " + playerControls[+action.ownerId].player.getName() + " damage roll<br/>";
    //    log += "+++++++ " + playerControls[+action.target].player.getName() + " take damage<br/>";
    //}
    //playerControls[+action.ownerId].updateControlWithPlayerData();
    //playerControls[+action.target].updateControlWithPlayerData();
    return log;
}
function populateDOMElementVariables() {
    PlayerAmtElement = document.getElementById("PlayerAmt");
    PlayersContainer = document.getElementById("Players");
    ActionLogContainer = document.getElementById("ActionLog");
    CreatePlayersBtn = document.getElementById("CreatePlayers");
    GOBtn = document.getElementById("GO");
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
//# sourceMappingURL=devScript.js.map