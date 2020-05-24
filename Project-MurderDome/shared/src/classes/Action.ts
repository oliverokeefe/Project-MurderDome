
import type { action } from '../types/types';

export class Action {

    static readonly PLAYERACTIONS = {
        attack: { name: "attack", priority: 1, },
        defend: { name: "defend", priority: 2 },
        move: { name: "move", priority: 3 },
        follow: { name: "follow", priority: 4 },
        rest: { name: "rest", priority: 5 },
        wait: { name: "wait", priority: 6 }
    };

    readonly ownerId: string;
    readonly mod: number;
    readonly action: string;
    readonly target: number;

    private _priority: number;

    constructor(action: action, ownerId: string, target: number, modifier: number) {
        this.ownerId = ownerId;
        this.mod = modifier;
        this.action = action;
        this.target = target;

        this._setPriorityFromAction();
    }

    private _setPriorityFromAction() {

        if (Action.isValidAction(this.action)) {
            this._priority = Action.PLAYERACTIONS[this.action].priority;
        } else {
            this._priority = 1000;
        }

    }


    public static comparator(a: Action, b: Action): boolean {

        return a._priority < b._priority;

    }

    public static isValidAction(action: string): boolean {
        return (Action.PLAYERACTIONS as Object).hasOwnProperty(action);
    }

    public static resolve(action: Action): void {

    }


}





