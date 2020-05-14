    //Example control

    //<div>
    //  <label for= "Player1" > Player 1 < /label>
    //  < select name = "Player1" id = "TestSelect" >
    //      <option value="" > --Please choose an option-- < /option>
    //      < option value = "attack" > Attack < /option>
    //      < option value = "defend" > Defend < /option>
    //      < option value = "move" > Move < /option>
    //      < option value = "follow" > Follow < /option>
    //      < option value = "rest" > Rest < /option>
    //      < option value = "wait" > Wait < /option>
    //  < /select>
    //  <div></div>
    //</div>

import { action } from '../types/types';
import { Action } from './Action';

export class Player {

    readonly parent: HTMLDivElement;
    readonly name: string;

    private _container: HTMLDivElement;
    private _selectElement: HTMLSelectElement;
    private _changeEventHandler: EventListener;
    private _selectedAction: Action;

    constructor(parentElement: HTMLDivElement, playerName: string) {

        this.parent = parentElement;
        this.name = playerName;

        this.parent.classList.add("PlayerControl");

        this._container = document.createElement("div");
        this._container.classList.add("PlayerContainer");

        this._container.appendChild(this._createLabel());
        this._container.appendChild(this._createSelect());

        this.parent.appendChild(this._container);

        return
    }


    private _createLabel(): HTMLLabelElement {

        let label: HTMLLabelElement = document.createElement('label');
        label.classList.add("PlayerLabel");
        label.setAttribute('for', this.name);
        label.innerText = this.name;

        return label;
    }

    private _createSelect(): HTMLSelectElement {

        let select: HTMLSelectElement = document.createElement('select');
        select.setAttribute('name', this.name);

        Action.playerActions.forEach((action) => {
            select.appendChild(this._createOption(action));
        });

        this._selectElement = select;
        this._changeEventHandler = () => { this._setSelectedAction(); };
        this._selectElement.addEventListener("change", this._changeEventHandler);
        this._setSelectedAction();

        return select;
    }

    private _createOption(action: string): HTMLOptionElement {

        let option: HTMLOptionElement = document.createElement('option');
        option.setAttribute('value', action);
        option.innerText = action;

        return option;
    }

    private _setSelectedAction(): void {

        if (this._selectElement && this._selectElement.selectedIndex != -1 && this._selectElement.options.length > 0) {

            let selectedOption: HTMLOptionElement = this._selectElement.options.item(this._selectElement.selectedIndex);

            if (Action.isValidAction(selectedOption.value)) {
                this._selectedAction = new Action(selectedOption.value as action, this.name);
            } else {
                this._selectedAction = undefined;
            }
        }
        return
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

    public getSelectedAction(): Action {
        return this._selectedAction;
    }
}