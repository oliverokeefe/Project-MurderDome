"use strict";
//Example control
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Action_js_1 = require("./Action.js");
var Player = /** @class */ (function () {
    function Player(parentElement, playerName) {
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
    Player.prototype._createLabel = function () {
        var label = document.createElement('label');
        label.classList.add("PlayerLabel");
        label.setAttribute('for', this.name);
        label.innerText = this.name;
        return label;
    };
    Player.prototype._createSelect = function () {
        var _this = this;
        var select = document.createElement('select');
        select.setAttribute('name', this.name);
        Action_js_1.Action.playerActions.forEach(function (action) {
            select.appendChild(_this._createOption(action));
        });
        this._selectElement = select;
        this._changeEventHandler = function () { _this._setSelectedAction(); };
        this._selectElement.addEventListener("change", this._changeEventHandler);
        this._setSelectedAction();
        return select;
    };
    Player.prototype._createOption = function (action) {
        var option = document.createElement('option');
        option.setAttribute('value', action);
        option.innerText = action;
        return option;
    };
    Player.prototype._setSelectedAction = function () {
        if (this._selectElement && this._selectElement.selectedIndex != -1 && this._selectElement.options.length > 0) {
            var selectedOption = this._selectElement.options.item(this._selectElement.selectedIndex);
            if (Action_js_1.Action.isValidAction(selectedOption.value)) {
                this._selectedAction = new Action_js_1.Action(selectedOption.value, this.name);
            }
            else {
                this._selectedAction = undefined;
            }
        }
        return;
    };
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
    Player.prototype.getSelectedAction = function () {
        return this._selectedAction;
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=Player.js.map