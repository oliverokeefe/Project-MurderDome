
import type { action } from '../../../shared/src/types/types';
import { Action } from '../../../shared/src/classes/Action.js';

export class Player {

    readonly parentElement: HTMLDivElement;
    readonly playerId: string;
    readonly allPlayerIds: string[];

    //Containing element
    private _container: HTMLDivElement;

    //Player name input element
    private _playerNameElement: HTMLInputElement;
    readonly playerNameLabel: string = "Name";

    //Player Stat input elements
    private _strElememt: HTMLInputElement;
    private _dexElement: HTMLInputElement;
    private _conElement: HTMLInputElement;
    private _intElement: HTMLInputElement;
    private _wisElement: HTMLInputElement;
    private _chaElement: HTMLInputElement;

    readonly strLabel: string = "Str";
    readonly dexLabel: string = "Dex";
    readonly conLabel: string = "Con";
    readonly intLabel: string = "Int";
    readonly wisLabel: string = "Wis";
    readonly chaLabel: string = "Cha";

    //Derived stats
    private _hpElement: HTMLInputElement;
    private _sanElement: HTMLInputElement;
    private _staElement: HTMLInputElement;

    readonly hpLabel: string = "HP";
    readonly sanLabel: string = "San";
    readonly staLabel: string = "Sta";

    //Action selection element
    private _actionSelectElement: HTMLSelectElement;
    readonly actionSelectLabel: string = "Action";

    //Used to add bonus or subtract penalty to action roll if one is performed
    private _actionModElement: HTMLInputElement;
    readonly actionModLabel: string = "Modifier";

    //Target selection element
    private _targetSelectElement: HTMLSelectElement;
    readonly targetSelectLabel: string = "Target";



    private _selectElement: HTMLSelectElement;
    private _changeEventHandler: EventListener;
    private _selectedAction: Action;



    constructor(parentElement: HTMLDivElement, id: string, allPlayerIds: string[]) {

        this.parentElement = parentElement;
        this.playerId = id;
        this.allPlayerIds = allPlayerIds;

        this._container = this._createContainerDiv("PlayerControlContainerCore");
        this._populateElements();
        this._addElementsToContainer();
        this.parentElement.appendChild(this._container);

        return
    }



    /*
     * Functions for creating HTML elements that are needed
     */

    private _createSelect(name: string, options: string[]): HTMLSelectElement {

        let select: HTMLSelectElement = document.createElement('select');
        select.setAttribute('name', name+this.playerId);

        options.forEach((option) => {
            select.appendChild(this._createOption(option));
        });

         return select;
    }

    private _createOption(option: string): HTMLOptionElement {

        let optionElement: HTMLOptionElement = document.createElement('option');
        optionElement.setAttribute('value', option);
        optionElement.innerText = option;

        return optionElement;
    }

    private _createLabel(forName: string): HTMLLabelElement {

        let label: HTMLLabelElement = document.createElement('label');
        label.setAttribute('for', forName+this.playerId);
        label.innerText = forName;

        return label;
    }

    private _createTextInput(name: string): HTMLInputElement {

        let textInput: HTMLInputElement = document.createElement('input');
        textInput.setAttribute('type', 'text');
        textInput.setAttribute('name', name + this.playerId);

        return textInput;
    }

    private _createNumberInput(name: string): HTMLInputElement {

        let numberInput: HTMLInputElement = document.createElement('input');
        numberInput.setAttribute('type', 'number');
        numberInput.setAttribute('name', name + this.playerId);

        return numberInput;
    }

    private _createContainerDiv(...classes: string[]): HTMLDivElement {
        let containerDiv: HTMLDivElement = document.createElement('div');

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

    private _populateElements(): void {
        this._populateNameElement();
        this._populateStatElements();
        this._populateDerivedStatElements();
        this._populateActionMod();
        this._populateActionElement();
        this._populateTargetElement();
    }

    private _populateNameElement(): void {
        this._playerNameElement = this._createTextInput(this.playerNameLabel);
    }

    private _populateStatElements(): void {
        this._strElememt = this._createNumberInput(this.strLabel);
        this._dexElement = this._createNumberInput(this.dexLabel);
        this._conElement = this._createNumberInput(this.conLabel);
        this._intElement = this._createNumberInput(this.intLabel);
        this._wisElement = this._createNumberInput(this.wisLabel);
        this._chaElement = this._createNumberInput(this.chaLabel);
    }

    private _populateDerivedStatElements(): void {
        this._hpElement = this._createNumberInput(this.hpLabel);
        this._sanElement = this._createNumberInput(this.sanLabel);
        this._staElement = this._createNumberInput(this.staLabel);
    }

    private _populateActionMod(): void {
        this._actionModElement = this._createTextInput(this.actionModLabel);
    }

    private _populateActionElement(): void {
        this._actionSelectElement = this._createSelect(this.actionSelectLabel, Action.playerActions);
    }

    private _populateTargetElement(): void {
        this._targetSelectElement = this._createSelect(this.targetSelectLabel, this.allPlayerIds);
    }


    /*
     * Functions for adding the elements to the container element
     */

    private _addElementsToContainer(): void {
        this._addNameSection();
        this._addStatsSection();
        this._addDerivedStatsSection();
        this._addActionSection();
    }

    private _addNameSection(): void {

        let nameSection = this._createContainerDiv("PlayerName", "Section");
        let nameInputCon = this._createContainerDiv("InputContainer");
        nameInputCon.appendChild(this._playerNameElement);
        nameSection.appendChild(nameInputCon);
        this._container.appendChild(nameSection);
    }

    private _addStatsSection(): void {

        let statSection = this._createContainerDiv("PlayerStats", "Section")

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

    private _addDerivedStatsSection(): void {

        let derivedStatSection = this._createContainerDiv("PlayerDerivedStats", "Section")

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

    private _addActionSection(): void {

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

    public constructAction(): Action {

        return undefined;
    }

}