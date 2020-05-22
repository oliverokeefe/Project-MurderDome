//Make sure the page has a socket.io script this tag before this
//<script src="/socket.io/socket.io.js" > </script>
import { Player } from '../../../shared/src/classes/Player.js';
import { Action } from '../../../shared/src/classes/Action.js';
import { PriorityQueue } from '../classes/PriorityQueue.js';
let socket = undefined;
let players = [];
let enterBtn;
let output;
function outputMsg(msg) {
    output.innerHTML = msg;
}
function testHandler() {
}
function enterBtnClickHandler() {
    let actionList = new PriorityQueue(Action.comparator);
    console.log(JSON.parse(JSON.stringify(actionList)));
    players.forEach(function (player, index) {
        actionList.push(player.getSelectedAction());
    });
    console.log(JSON.parse(JSON.stringify(actionList)));
    let actionLog = "";
    while (!actionList.isEmpty()) {
        let curAction = actionList.pop();
        console.log(curAction);
        actionLog += curAction.owner + ": " + curAction.action + "<br/>";
    }
    socket.emit('EnterBtnClicked', actionLog);
}
function createPlayers() {
    players.push(new Player(document.getElementById("Player1"), "Player1"));
    players.push(new Player(document.getElementById("Player2"), "Player2"));
    players.push(new Player(document.getElementById("Player3"), "Player3"));
    players.push(new Player(document.getElementById("Player4"), "Player4"));
    players.push(new Player(document.getElementById("Player5"), "Player5"));
    players.push(new Player(document.getElementById("Player6"), "Player6"));
    return;
}
function setUpEnterBtn() {
    enterBtn = document.getElementById("EnterBtn");
    output = document.getElementById("Output");
    enterBtn.addEventListener("click", enterBtnClickHandler);
    return;
}
function setUpSocket() {
    socket = io();
    socket.on('Output', outputMsg);
}
function init() {
    createPlayers();
    setUpEnterBtn();
    setUpSocket();
    return;
}
window.onload = function () {
    init();
    return;
};
//require(['../../public/javascripts/domReady!'], function (doc) {
//    //This function is called once the DOM is ready,
//    //notice the value for 'domReady!' is the current
//    //document.
//    init()
//});
//# sourceMappingURL=testScript.js.map