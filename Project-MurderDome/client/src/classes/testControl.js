"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testControl = void 0;
var testControl = /** @class */ (function () {
    function testControl(input, output, handler) {
        this.setChangeEventHandler(handler);
        this.setInputElement(input);
        this.setOutputElement(output);
        return;
    }
    testControl.prototype._defaultChangeEventHandler = function () {
        //console.log(["Input", this._inputElement]);
        //console.log(["Output", this._outputElement]);
        if (this._inputElement && this._outputElement && this._inputElement.selectedIndex != -1 && this._inputElement.options.length > 0) {
            var selectedOption = this._inputElement.options.item(this._inputElement.selectedIndex);
            this._outputElement.innerHTML = selectedOption.value;
        }
        return;
    };
    testControl.prototype._attachChangeEventHandler = function () {
        if (this._inputElement && this._changeEventHandler) {
            this._inputElement.addEventListener("change", this._changeEventHandler);
        }
    };
    testControl.prototype._detachChangeEventHandler = function () {
        if (this._inputElement && this._changeEventHandler) {
            this._inputElement.removeEventListener("change", this._changeEventHandler);
        }
    };
    testControl.prototype.setInputElement = function (element, handler) {
        this._detachChangeEventHandler();
        this._inputElement = element;
        this.setChangeEventHandler(handler);
    };
    testControl.prototype.setOutputElement = function (element) {
        this._outputElement = element;
    };
    testControl.prototype.setChangeEventHandler = function (handler) {
        var _this = this;
        this._detachChangeEventHandler();
        if (handler) {
            this._changeEventHandler = handler;
        }
        else {
            this._changeEventHandler = function () {
                _this._defaultChangeEventHandler();
            };
        }
        this._attachChangeEventHandler();
    };
    return testControl;
}());
exports.testControl = testControl;
//# sourceMappingURL=testControl.js.map