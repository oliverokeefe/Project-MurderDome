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
        this._container = this._createContainerDiv("PlayerControlContainerCore");
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
    _createContainerDiv(...classes) {
        let containerDiv = document.createElement('div');
        classes.forEach((className) => {
            containerDiv.classList.add(className);
        });
        return containerDiv;
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
        this._addNameSection();
        this._addStatsSection();
        this._addDerivedStatsSection();
        this._addActionSection();
    }
    _addNameSection() {
        let nameSection = this._createContainerDiv("PlayerName", "Section");
        let nameInputCon = this._createContainerDiv("InputContainer");
        nameInputCon.appendChild(this._playerNameElement);
        nameSection.appendChild(nameInputCon);
        this._container.appendChild(nameSection);
    }
    _addStatsSection() {
        let statSection = this._createContainerDiv("PlayerStats", "Section");
        let strInputCon = this._createContainerDiv("InputContainer");
        strInputCon.appendChild(this._createLabel(this.strLabel));
        strInputCon.appendChild(this._strElememt);
        statSection.appendChild(strInputCon);
        let dexInputCon = this._createContainerDiv("InputContainer");
        dexInputCon.appendChild(this._createLabel(this.dexLabel));
        dexInputCon.appendChild(this._dexElement);
        statSection.appendChild(dexInputCon);
        let conInputCon = this._createContainerDiv("InputContainer");
        conInputCon.appendChild(this._createLabel(this.conLabel));
        conInputCon.appendChild(this._conElement);
        statSection.appendChild(conInputCon);
        let intInputCon = this._createContainerDiv("InputContainer");
        intInputCon.appendChild(this._createLabel(this.intLabel));
        intInputCon.appendChild(this._intElement);
        statSection.appendChild(intInputCon);
        let wisInputCon = this._createContainerDiv("InputContainer");
        wisInputCon.appendChild(this._createLabel(this.wisLabel));
        wisInputCon.appendChild(this._wisElement);
        statSection.appendChild(wisInputCon);
        let chaInputCon = this._createContainerDiv("InputContainer");
        chaInputCon.appendChild(this._createLabel(this.chaLabel));
        chaInputCon.appendChild(this._chaElement);
        statSection.appendChild(chaInputCon);
        this._container.appendChild(statSection);
    }
    _addDerivedStatsSection() {
        let derivedStatSection = this._createContainerDiv("PlayerDerivedStats", "Section");
        let hpInputCon = this._createContainerDiv("InputContainer");
        hpInputCon.appendChild(this._createLabel(this.hpLabel));
        hpInputCon.appendChild(this._hpElement);
        derivedStatSection.appendChild(hpInputCon);
        let sanInputCon = this._createContainerDiv("InputContainer");
        sanInputCon.appendChild(this._createLabel(this.sanLabel));
        sanInputCon.appendChild(this._sanElement);
        derivedStatSection.appendChild(sanInputCon);
        let staInputCon = this._createContainerDiv("InputContainer");
        staInputCon.appendChild(this._createLabel(this.staLabel));
        staInputCon.appendChild(this._staElement);
        derivedStatSection.appendChild(staInputCon);
        this._container.appendChild(derivedStatSection);
    }
    _addActionSection() {
        let actionSection = this._createContainerDiv("PlayerAction", "Section");
        let actionModInputCon = this._createContainerDiv("InputContainer");
        actionModInputCon.appendChild(this._createLabel(this.actionModLabel));
        actionModInputCon.appendChild(this._actionModElement);
        actionSection.appendChild(actionModInputCon);
        let actionSelectCon = this._createContainerDiv("InputContainer");
        actionSelectCon.appendChild(this._createLabel(this.actionSelectLabel));
        actionSelectCon.appendChild(this._actionSelectElement);
        actionSection.appendChild(actionSelectCon);
        let targetSelectCon = this._createContainerDiv("InputContainer");
        targetSelectCon.appendChild(this._createLabel(this.targetSelectLabel));
        targetSelectCon.appendChild(this._targetSelectElement);
        actionSection.appendChild(targetSelectCon);
        this._container.appendChild(actionSection);
    }
    constructAction() {
        return undefined;
    }
}
//# sourceMappingURL=devPlayerControl.js.map