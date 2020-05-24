
import { Player } from '../classes/devPlayerControl.js';

let PlayerAmtElement: HTMLInputElement = undefined;
let CreatePlayersBtn: HTMLButtonElement = undefined;
let PlayersContainer: HTMLDivElement = undefined;
let allPlayerIds: string[] = [];
let players: Player[] = [];

function CreatePlayersBtnClickHandler() {

    console.log(PlayerAmtElement.value);

    for (let i = 0; i < +PlayerAmtElement.value; i++) {
        allPlayerIds.push(i+"");
    }

    let container: HTMLDivElement = document.createElement('div');

    allPlayerIds.forEach(function (playerId) {
        let playerContainer: HTMLDivElement = document.createElement('div');
        players.push(new Player(playerContainer, playerId, allPlayerIds));
        container.appendChild(playerContainer);
    });

    PlayersContainer.appendChild(container);

}

function bindData() {

    PlayerAmtElement = document.getElementById("PlayerAmt") as HTMLInputElement;
    PlayersContainer = document.getElementById("Players") as HTMLDivElement;

    return;
}

function setUpEnterBtn() {

    CreatePlayersBtn = document.getElementById("CreatePlayers") as HTMLButtonElement;

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






