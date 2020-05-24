import { Action } from '../../../shared/src/classes/Action.js';
export class Player {
    constructor(parentElement, id, allPlayerIds) {
        this.playerNameLabel = "Name";
        this.strLabel = "Str";
        this.dexLabel = "Dex";
        this.conLabel = "Con";
        this.intLabel = "Int";
        this.wisLabel = "Wis";
        this.chaLabel = "Cha";
        this.hpLabel = "HP";
        this.sanLabel = "San";
        this.staLabel = "Sta";
        this.actionSelectLabel = "Action";
        this.actionModLabel = "Modifier";
        this.targetSelectLabel = "Target";
        this.parentElement = parentElement;
        this.playerId = id;
        this.allPlayerIds = allPlayerIds;
        this._container = document.createElement("div");
        this._populateElements();
        this._addElementsToContainer();
        this.parentElement.appendChild(this._container);
        return;
    }
    /*
     * Functions for creating HTML elements that are needed
     */
    _createSelect(name, options) {
        let select = document.createElement('select');
        select.setAttribute('name', name + this.playerId);
        options.forEach((option) => {
            select.appendChild(this._createOption(option));
        });
        return select;
    }
    _createOption(option) {
        let optionElement = document.createElement('option');
        optionElement.setAttribute('value', option);
        optionElement.innerText = option;
        return optionElement;
    }
    _createLabel(forName) {
        let label = document.createElement('label');
        label.setAttribute('for', forName + this.playerId);
        label.innerText = forName;
        return label;
    }
    _createTextInput(name) {
        let textInput = document.createElement('input');
        textInput.setAttribute('type', 'text');
        textInput.setAttribute('name', name + this.playerId);
        return textInput;
    }
    _createNumberInput(name) {
        let numberInput = document.createElement('input');
        numberInput.setAttribute('type', 'number');
        numberInput.setAttribute('name', name + this.playerId);
        return numberInput;
    }
    /*
     * Eventually I should make it so there is actual client data variables instead of just using the view values...
     *
     * These populate** functions are a good place to add handlers and such
     */
    _populateElements() {
        this._populateNameElement();
        this._populateStatElements();
        this._populateDerivedStatElements();
        this._populateActionMod();
        this._populateActionElement();
        this._populateTargetElement();
    }
    _populateNameElement() {
        this._playerNameElement = this._createTextInput(this.playerNameLabel);
    }
    _populateStatElements() {
        this._strElememt = this._createNumberInput(this.strLabel);
        this._dexElement = this._createNumberInput(this.dexLabel);
        this._conElement = this._createNumberInput(this.conLabel);
        this._intElement = this._createNumberInput(this.intLabel);
        this._wisElement = this._createNumberInput(this.wisLabel);
        this._chaElement = this._createNumberInput(this.chaLabel);
    }
    _populateDerivedStatElements() {
        this._hpElement = this._createNumberInput(this.hpLabel);
        this._sanElement = this._createNumberInput(this.sanLabel);
        this._staElement = this._createNumberInput(this.staLabel);
    }
    _populateActionMod() {
        this._actionModElement = this._createTextInput(this.actionModLabel);
    }
    _populateActionElement() {
        this._actionSelectElement = this._createSelect(this.actionSelectLabel, Action.playerActions);
    }
    _populateTargetElement() {
        this._targetSelectElement = this._createSelect(this.targetSelectLabel, this.allPlayerIds);
    }
    /*
     * Functions for adding the elements to the container element
     */
    _addElementsToContainer() {
        this._addNameToContainer();
        this._addStatsToContainer();
        this._addDerivedStatsToContainer();
        this._addActionModToContainer();
        this._addActionSelectToContainer();
        this._addTargetSelectToContainer();
    }
    _addNameToContainer() {
        this._container.appendChild(this._playerNameElement);
    }
    _addStatsToContainer() {
        this._container.appendChild(this._createLabel(this.strLabel));
        this._container.appendChild(this._strElememt);
        this._container.appendChild(this._createLabel(this.dexLabel));
        this._container.appendChild(this._dexElement);
        this._container.appendChild(this._createLabel(this.conLabel));
        this._container.appendChild(this._conElement);
        this._container.appendChild(this._createLabel(this.intLabel));
        this._container.appendChild(this._intElement);
        this._container.appendChild(this._createLabel(this.wisLabel));
        this._container.appendChild(this._wisElement);
        this._container.appendChild(this._createLabel(this.chaLabel));
        this._container.appendChild(this._chaElement);
    }
    _addDerivedStatsToContainer() {
        this._container.appendChild(this._createLabel(this.hpLabel));
        this._container.appendChild(this._hpElement);
        this._container.appendChild(this._createLabel(this.sanLabel));
        this._container.appendChild(this._sanElement);
        this._container.appendChild(this._createLabel(this.staLabel));
        this._container.appendChild(this._staElement);
    }
    _addActionModToContainer() {
        this._container.appendChild(this._createLabel(this.actionModLabel));
        this._container.appendChild(this._actionModElement);
    }
    _addActionSelectToContainer() {
        this._container.appendChild(this._createLabel(this.actionSelectLabel));
        this._container.appendChild(this._actionSelectElement);
    }
    _addTargetSelectToContainer() {
        this._container.appendChild(this._createLabel(this.targetSelectLabel));
        this._container.appendChild(this._targetSelectElement);
    }
    constructAction() {
        return undefined;
    }
}
//# sourceMappingURL=devPlayerControl.js.map