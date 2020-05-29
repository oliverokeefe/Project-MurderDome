
import { action } from '../types/types';
import { Player } from './Player.js';

export abstract class Action {

    static readonly PLAYERACTIONS = {
        attack: "attack",
        hide: "hide",
        move: "move",
        search: "search",
        rest: "rest",
        wait: "wait"
    };


    protected abstract _priority: number;


    //public readonly ownerId: string;
    public readonly owner: Player;
    public readonly mod: number;
    public readonly target: number;

    public abstract readonly action: string = "";


    constructor(owner: Player, target: number, modifier: number) {
        this.owner = owner;
        this.mod = modifier;
        this.target = target;
    }

    static comparator(a: Action, b: Action): boolean {

        return a._priority < b._priority;

    }

    static isValidAction(action: string): boolean {
        return (Action.PLAYERACTIONS as Object).hasOwnProperty(action);
    }

    static buildAction(owner: Player): Action {

        let action: Action = undefined;

        if (Action.isValidAction(owner.get_actionType())) {

            switch (owner.get_actionType()) {
                case (Action.PLAYERACTIONS.attack):
                    action = new Attack(owner, owner.get_target(), owner.get_modifier());
                    break;
                case (Action.PLAYERACTIONS.hide):
                    action = new Hide(owner, owner.get_target(), owner.get_modifier());
                    break;
                case (Action.PLAYERACTIONS.move):
                    action = new Move(owner, owner.get_target(), owner.get_modifier());
                    break;
                case (Action.PLAYERACTIONS.search):
                    action = new Search(owner, owner.get_target(), owner.get_modifier());
                    break;
                case (Action.PLAYERACTIONS.rest):
                    action = new Rest(owner, owner.get_target(), owner.get_modifier());
                    break;
                case (Action.PLAYERACTIONS.wait):
                    action = new Wait(owner, owner.get_target(), owner.get_modifier());
                    break;
                default:
                    break;
            }

        }

        return action;
    }

    public resolve(): string {
        return "+" + this.owner.getNameTag() + ":: " + this.action + "<br/>";

    }

    public attackResponse(): string {
        return "";
    }


}

export class Attack extends Action {

    public readonly action: string;
    protected _priority: number;

    constructor(owner: Player, target: number, modifier: number) {
        super(owner, target, modifier);

        this.action = Action.PLAYERACTIONS.attack;
        this._priority = 1;
    }

    public resolve(): string {
        let log: string = "";

        log += super.resolve();


        return log;
    }


}

export class Hide extends Action {

    public readonly action: string;
    protected _priority: number;

    constructor(owner: Player, target: number, modifier: number) {
        super(owner, target, modifier);

        this.action = Action.PLAYERACTIONS.hide;
        this._priority = 2;
    }
}

export class Move extends Action {

    public readonly action: string;
    protected _priority: number;

    constructor(owner: Player, target: number, modifier: number) {
        super(owner, target, modifier);

        this.action = Action.PLAYERACTIONS.move;
        this._priority = 3;
    }

    public attackResponse(): string {
        return this.owner.getName() + " attack response";
    }


}

export class Search extends Action {

    public readonly action: string;
    protected _priority: number;

    constructor(owner: Player, target: number, modifier: number) {
        super(owner, target, modifier);

        this.action = Action.PLAYERACTIONS.search;
        this._priority = 4;
    }
}

export class Rest extends Action {

    public readonly action: string;
    protected _priority: number;

    constructor(owner: Player, target: number, modifier: number) {
        super(owner, target, modifier);

        this.action = Action.PLAYERACTIONS.rest;
        this._priority = 5;
    }
}

export class Wait extends Action {

    public readonly action: string;
    protected _priority: number;

    constructor(owner: Player, target: number, modifier: number) {
        super(owner, target, modifier);

        this.action = Action.PLAYERACTIONS.wait;
        this._priority = 6;
    }
}




