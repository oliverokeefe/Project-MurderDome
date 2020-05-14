define("types/types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("classes/Action", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = void 0;
    let Action = /** @class */ (() => {
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
        Action.playerActions = ["attack", "defend", "move", "follow", "rest", "wait"];
        return Action;
    })();
    exports.Action = Action;
});
//Example control
define("classes/Player", ["require", "exports", "classes/Action"], function (require, exports, Action_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Player = void 0;
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
            Action_1.Action.playerActions.forEach((action) => {
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
                if (Action_1.Action.isValidAction(selectedOption.value)) {
                    this._selectedAction = new Action_1.Action(selectedOption.value, this.name);
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
});
define("classes/PriorityQueue", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PriorityQueue = void 0;
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
});
define("classes/testControl", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.testControl = void 0;
    class testControl {
        constructor(input, output, handler) {
            this.setChangeEventHandler(handler);
            this.setInputElement(input);
            this.setOutputElement(output);
            return;
        }
        _defaultChangeEventHandler() {
            //console.log(["Input", this._inputElement]);
            //console.log(["Output", this._outputElement]);
            if (this._inputElement && this._outputElement && this._inputElement.selectedIndex != -1 && this._inputElement.options.length > 0) {
                let selectedOption = this._inputElement.options.item(this._inputElement.selectedIndex);
                this._outputElement.innerHTML = selectedOption.value;
            }
            return;
        }
        _attachChangeEventHandler() {
            if (this._inputElement && this._changeEventHandler) {
                this._inputElement.addEventListener("change", this._changeEventHandler);
            }
        }
        _detachChangeEventHandler() {
            if (this._inputElement && this._changeEventHandler) {
                this._inputElement.removeEventListener("change", this._changeEventHandler);
            }
        }
        setInputElement(element, handler) {
            this._detachChangeEventHandler();
            this._inputElement = element;
            this.setChangeEventHandler(handler);
        }
        setOutputElement(element) {
            this._outputElement = element;
        }
        setChangeEventHandler(handler) {
            this._detachChangeEventHandler();
            if (handler) {
                this._changeEventHandler = handler;
            }
            else {
                this._changeEventHandler = () => {
                    this._defaultChangeEventHandler();
                };
            }
            this._attachChangeEventHandler();
        }
    }
    exports.testControl = testControl;
});
define("classes/testData", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.testData = void 0;
    class testData {
        constructor() {
        }
        addPlayer(player) {
            return this._players.push(player) - 1;
        }
        removePlayer(playerIndex) {
            let newPlayers = [];
            this._players.forEach((player, index) => { if (playerIndex != index) {
                newPlayers.push(player);
            } });
            this._players = newPlayers;
            return this._players.length;
        }
    }
    exports.testData = testData;
});
define("scripts/testScript", ["require", "exports", "classes/Player", "classes/Action", "classes/PriorityQueue"], function (require, exports, Player_1, Action_2, PriorityQueue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let players = [];
    let enterBtn;
    let output;
    function enterBtnClickHandler() {
        let actionList = new PriorityQueue_1.PriorityQueue(Action_2.Action.comparator);
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
});
//require(['../../public/javascripts/domReady!'], function (doc) {
//    //This function is called once the DOM is ready,
//    //notice the value for 'domReady!' is the current
//    //document.
//    init()
//});
//# sourceMappingURL=script.js.map