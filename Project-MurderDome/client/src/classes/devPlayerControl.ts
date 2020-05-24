
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

        this._container = document.createElement("div");
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
        this._addNameToContainer();
        this._addStatsToContainer();
        this._addDerivedStatsToContainer();
        this._addActionModToContainer();
        this._addActionSelectToContainer();
        this._addTargetSelectToContainer();
    }

    private _addNameToContainer(): void {
        this._container.appendChild(this._playerNameElement);
    }

    private _addStatsToContainer(): void {
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

    private _addDerivedStatsToContainer(): void {
        this._container.appendChild(this._createLabel(this.hpLabel));
        this._container.appendChild(this._hpElement);

        this._container.appendChild(this._createLabel(this.sanLabel));
        this._container.appendChild(this._sanElement);

        this._container.appendChild(this._createLabel(this.staLabel));
        this._container.appendChild(this._staElement);
    }

    private _addActionModToContainer(): void {
        this._container.appendChild(this._createLabel(this.actionModLabel));
        this._container.appendChild(this._actionModElement);
    }

    private _addActionSelectToContainer(): void {
        this._container.appendChild(this._createLabel(this.actionSelectLabel));
        this._container.appendChild(this._actionSelectElement);
    }

    private _addTargetSelectToContainer(): void {
        this._container.appendChild(this._createLabel(this.targetSelectLabel));
        this._container.appendChild(this._targetSelectElement);
    }

    public constructAction(): Action {

        return undefined;
    }

}