
import type { action } from '../types/types';

export class Action {

    static readonly playerActions: string[] = ["attack", "defend", "move", "follow", "rest", "wait"];

    readonly owner: string;
    readonly action: string;

    private _priority: number;

    constructor(action: action, doer: string) {
        this.owner = doer;
        this.action = action;
        this._setPriorityFromAction();
    }

    private _setPriorityFromAction() {

        switch (this.action) {
            case ("attack"):
                this._priority = 1;
                break;
            case("defend"):
                this._priority = 2;
                break;
            case("move"):
                this._priority = 3;
                break;
            case("follow"):
                this._priority = 4;
                break;
            case("rest"):
                this._priority = 5;
                break;
            case("wait"):
                this._priority = 6;
                break;
            default:
                this._priority = 1000;
                break;
        }
    }


    public static comparator(a: Action, b: Action): boolean {

        return a._priority < b._priority;

    }

    public static isValidAction(action: string): boolean {

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





