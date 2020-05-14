
import { Player } from '../classes/Player';
import { Action } from '../classes/Action';
import { PriorityQueue } from '../classes/PriorityQueue';

let players: Player[] = []

let enterBtn: HTMLButtonElement;
let output: HTMLDivElement;

function enterBtnClickHandler() {

    let actionList: PriorityQueue = new PriorityQueue(Action.comparator);

    console.log(JSON.parse(JSON.stringify(actionList)))
    players.forEach(function (player, index) {
        actionList.push(player.getSelectedAction());
    });
    console.log(JSON.parse(JSON.stringify(actionList)))

    let actionLog: string = "";
    while (!actionList.isEmpty()) {

        let curAction: Action = actionList.pop();
        console.log(curAction);
        actionLog += curAction.owner + ": " + curAction.action + "<br/>";
    }


    output.innerHTML = actionLog;

}

function createPlayers() {

    players.push(new Player(document.getElementById("Player1") as HTMLDivElement, "Player1"));
    players.push(new Player(document.getElementById("Player2") as HTMLDivElement, "Player2"));
    players.push(new Player(document.getElementById("Player3") as HTMLDivElement, "Player3"));
    players.push(new Player(document.getElementById("Player4") as HTMLDivElement, "Player4"));
    players.push(new Player(document.getElementById("Player5") as HTMLDivElement, "Player5"));
    players.push(new Player(document.getElementById("Player6") as HTMLDivElement, "Player6"));
    //players.push(new Player(document.getElementById("Player7") as HTMLDivElement, "Player7"));
    //players.push(new Player(document.getElementById("Player8") as HTMLDivElement, "Player8"));

    return;
}

function setUpEnterBtn() {

    enterBtn = document.getElementById("EnterBtn") as HTMLButtonElement;
    output = document.getElementById("Output") as HTMLDivElement;

    enterBtn.addEventListener("click", enterBtnClickHandler);

    return;
}

function init() {
    createPlayers();
    setUpEnterBtn();

    return;
}

//window.onload = function () {
//    init();

//    return;
//};

//require(['../../public/javascripts/domReady!'], function (doc) {
//    //This function is called once the DOM is ready,
//    //notice the value for 'domReady!' is the current
//    //document.

//    init()
//});





