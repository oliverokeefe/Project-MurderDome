(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Action {
    constructor(action, doer) {
        this.owner = doer;
        this.action = action;
        this._setPriorityFromAction();
    }
    _setPriorityFromAction() {
        switch (this.action) {
            case ("attack"):
                this._priority = 1;
                break;
            case ("defend"):
                this._priority = 2;
                break;
            case ("move"):
                this._priority = 3;
                break;
            case ("follow"):
                this._priority = 4;
                break;
            case ("rest"):
                this._priority = 5;
                break;
            case ("wait"):
                this._priority = 6;
                break;
            default:
                this._priority = 1000;
                break;
        }
    }
    static comparator(a, b) {
        return a._priority < b._priority;
    }
    static isValidAction(action) {
        let isValid = false;
        switch (action) {
            case ("attack"):
            case ("defend"):
            case ("move"):
            case ("follow"):
            case ("rest"):
            case ("wait"):
                isValid = true;
                break;
            default:
                isValid = false;
                break;
        }
        return isValid;
    }
}
exports.Action = Action;
Action.playerActions = ["attack", "defend", "move", "follow", "rest", "wait"];

},{}],2:[function(require,module,exports){
"use strict";
//Example control
Object.defineProperty(exports, "__esModule", { value: true });
const Action_js_1 = require("./Action.js");
class Player {
    constructor(parentElement, playerName) {
        this.parent = parentElement;
        this.name = playerName;
        this.parent.classList.add("PlayerControl");
        this._container = document.createElement("div");
        this._container.classList.add("PlayerContainer");
        this._container.appendChild(this._createLabel());
        this._container.appendChild(this._createSelect());
        this.parent.appendChild(this._container);
        return;
    }
    _createLabel() {
        let label = document.createElement('label');
        label.classList.add("PlayerLabel");
        label.setAttribute('for', this.name);
        label.innerText = this.name;
        return label;
    }
    _createSelect() {
        let select = document.createElement('select');
        select.setAttribute('name', this.name);
        Action_js_1.Action.playerActions.forEach((action) => {
            select.appendChild(this._createOption(action));
        });
        this._selectElement = select;
        this._changeEventHandler = () => { this._setSelectedAction(); };
        this._selectElement.addEventListener("change", this._changeEventHandler);
        this._setSelectedAction();
        return select;
    }
    _createOption(action) {
        let option = document.createElement('option');
        option.setAttribute('value', action);
        option.innerText = action;
        return option;
    }
    _setSelectedAction() {
        if (this._selectElement && this._selectElement.selectedIndex != -1 && this._selectElement.options.length > 0) {
            let selectedOption = this._selectElement.options.item(this._selectElement.selectedIndex);
            if (Action_js_1.Action.isValidAction(selectedOption.value)) {
                this._selectedAction = new Action_js_1.Action(selectedOption.value, this.name);
            }
            else {
                this._selectedAction = undefined;
            }
        }
        return;
    }
    //private _attachChangeEventHandler(): void {
    //    if (this._selectElement && this._changeEventHandler) {
    //        this._selectElement.addEventListener("change", this._changeEventHandler);
    //    }
    //}
    //private _detachChangeEventHandler(): void {
    //    if (this._selectElement && this._changeEventHandler) {
    //        this._selectElement.removeEventListener("change", this._changeEventHandler);
    //    }
    //}
    getSelectedAction() {
        return this._selectedAction;
    }
}
exports.Player = Player;

},{"./Action.js":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PriorityQueue {
    constructor(comparator = (a, b) => a > b) {
        this._top = 0;
        this._parent = i => ((i + 1) >>> 1) - 1;
        this._left = i => (i << 1) + 1;
        this._right = i => (i + 1) << 1;
        this._heap = [];
        this._comparator = comparator;
    }
    _greater(i, j) {
        return this._comparator(this._heap[i], this._heap[j]);
    }
    _swap(i, j) {
        [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }
    _siftUp() {
        let node = this.size() - 1;
        while (node > this._top && this._greater(node, this._parent(node))) {
            this._swap(node, this._parent(node));
            node = this._parent(node);
        }
    }
    _siftDown() {
        let node = this._top;
        while ((this._left(node) < this.size() && this._greater(this._left(node), node)) ||
            (this._right(node) < this.size() && this._greater(this._right(node), node))) {
            let maxChild = (this._right(node) < this.size() && this._greater(this._right(node), this._left(node))) ? this._right(node) : this._left(node);
            this._swap(node, maxChild);
            node = maxChild;
        }
    }
    size() {
        return this._heap.length;
    }
    isEmpty() {
        return this.size() == 0;
    }
    peek() {
        return this._heap[this._top];
    }
    push(...values) {
        values.forEach(value => {
            this._heap.push(value);
            this._siftUp();
        });
        return this.size();
    }
    pop() {
        const poppedValue = this.peek();
        const bottom = this.size() - 1;
        if (bottom > this._top) {
            this._swap(this._top, bottom);
        }
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    }
    replace(value) {
        const replacedValue = this.peek();
        this._heap[this._top] = value;
        this._siftDown();
        return replacedValue;
    }
}
exports.PriorityQueue = PriorityQueue;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("../classes/Player");
const Action_1 = require("../classes/Action");
const PriorityQueue_1 = require("../classes/PriorityQueue");
let players = [];
let enterBtn;
let output;
function enterBtnClickHandler() {
    let actionList = new PriorityQueue_1.PriorityQueue(Action_1.Action.comparator);
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
    output.innerHTML = actionLog;
}
function createPlayers() {
    players.push(new Player_1.Player(document.getElementById("Player1"), "Player1"));
    players.push(new Player_1.Player(document.getElementById("Player2"), "Player2"));
    players.push(new Player_1.Player(document.getElementById("Player3"), "Player3"));
    players.push(new Player_1.Player(document.getElementById("Player4"), "Player4"));
    players.push(new Player_1.Player(document.getElementById("Player5"), "Player5"));
    players.push(new Player_1.Player(document.getElementById("Player6"), "Player6"));
    //players.push(new Player(document.getElementById("Player7") as HTMLDivElement, "Player7"));
    //players.push(new Player(document.getElementById("Player8") as HTMLDivElement, "Player8"));
    return;
}
function setUpEnterBtn() {
    enterBtn = document.getElementById("EnterBtn");
    output = document.getElementById("Output");
    enterBtn.addEventListener("click", enterBtnClickHandler);
    return;
}
function init() {
    createPlayers();
    setUpEnterBtn();
    return;
}
window.onload = function () {
    init();
    return;
};

},{"../classes/Action":1,"../classes/Player":2,"../classes/PriorityQueue":3}]},{},[4]);
