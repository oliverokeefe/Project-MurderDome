import { Player } from '../classes/devPlayerControl.js';
let PlayerAmtElement = undefined;
let CreatePlayersBtn = undefined;
let PlayersContainer = undefined;
let allPlayerIds = [];
let players = [];
function CreatePlayersBtnClickHandler() {
    for (let i = 0; i < +PlayerAmtElement.value; i++) {
        allPlayerIds.push(i + "");
    }
    let container = document.createElement('div');
    container.classList.add("PlayersContainerCore");
    allPlayerIds.forEach(function (playerId) {
        let playerDiv = document.createElement('div');
        playerDiv.classList.add("PlayerControlContainer");
        players.push(new Player(playerDiv, playerId, allPlayerIds));
        container.appendChild(playerDiv);
    });
    PlayersContainer.appendChild(container);
}
function bindData() {
    PlayerAmtElement = document.getElementById("PlayerAmt");
    PlayersContainer = document.getElementById("Players");
    return;
}
function setUpEnterBtn() {
    CreatePlayersBtn = document.getElementById("CreatePlayers");
    CreatePlayersBtn.addEventListener("click", CreatePlayersBtnClickHandler);
    return;
}
function init() {
    bindData();
    setUpEnterBtn();
    return;
}
window.onload = function () {
    init();
    return;
};
//# sourceMappingURL=devScript.js.map