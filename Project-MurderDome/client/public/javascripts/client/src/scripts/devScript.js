import { Player } from '../classes/devPlayerControl.js';
let PlayerAmtElement = undefined;
let CreatePlayersBtn = undefined;
let PlayersContainer = undefined;
let allPlayerIds = [];
let players = [];
function CreatePlayersBtnClickHandler() {
    console.log(PlayerAmtElement.value);
    for (let i = 0; i < +PlayerAmtElement.value; i++) {
        allPlayerIds.push(i + "");
    }
    let container = document.createElement('div');
    allPlayerIds.forEach(function (playerId) {
        let playerContainer = document.createElement('div');
        players.push(new Player(playerContainer, playerId, allPlayerIds));
        container.appendChild(playerContainer);
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