
import { actionKey, actions } from '../types/types';
import { Player } from './Player.js';

export abstract class Action {

    static readonly PLAYERACTIONS: actions = {
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
    public readonly target: Player;

    public abstract readonly actionType: string = "";


    constructor(owner: Player, target: Player, modifier: number) {
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

        if (Action.isValidAction(owner.actionKey)) {

            switch (owner.actionKey) {
                case (Action.PLAYERACTIONS.attack):
                    action = new Attack(owner, owner.target, owner.modifier);
                    break;
                case (Action.PLAYERACTIONS.hide):
                    action = new Hide(owner, owner.target, owner.modifier);
                    break;
                case (Action.PLAYERACTIONS.move):
                    action = new Move(owner, owner.target, owner.modifier);
                    break;
                case (Action.PLAYERACTIONS.search):
                    action = new Search(owner, owner.target, owner.modifier);
                    break;
                case (Action.PLAYERACTIONS.rest):
                    action = new Rest(owner, owner.target, owner.modifier);
                    break;
                case (Action.PLAYERACTIONS.wait):
                    action = new Wait(owner, owner.target, owner.modifier);
                    break;
                default:
                    break;
            }

        }

        return action;
    }

    public resolve(): string {
        return `+${this.owner.getNameTag()}:: ${this.actionType} <br/>`;

    }

    public attackResponse(): string {
        return "";
    }


}

export class Attack extends Action {

    public readonly actionType: string;
    protected _priority: number;

    constructor(owner: Player, target: Player, modifier: number) {
        super(owner, target, modifier);

        this.actionType = Action.PLAYERACTIONS.attack;
        this._priority = 1;
    }

    public resolve(): string {
        let log: string = "";

        log += super.resolve();

        log += `++Begin Action<br/>`;

        log += this.target.action.attackResponse();
        log += `++++${this.owner.playerName} attack role<br/>`;
        log += `++++${this.owner.playerName} damage role<br/>`;
        log += `++++${this.target.playerName} take damage<br/>`;
        log += `++End Action<br/>`;


        return log;
    }


}

export class Hide extends Action {

    public readonly actionType: string;
    protected _priority: number;

    constructor(owner: Player, target: Player, modifier: number) {
        super(owner, target, modifier);

        this.actionType = Action.PLAYERACTIONS.hide;
        this._priority = 2;
    }

    public attackResponse(): string {
        return `+++${this.owner.playerName} hiding attack response<br/>`;;

    }
}

export class Move extends Action {

    public readonly actionType: string;
    protected _priority: number;

    constructor(owner: Player, target: Player, modifier: number) {
        super(owner, target, modifier);

        this.actionType = Action.PLAYERACTIONS.move;
        this._priority = 3;
    }

    public attackResponse(): string {
        return `+++${this.owner.playerName} moving attack response<br/>`;
    }


}

export class Search extends Action {

    public readonly actionType: string;
    protected _priority: number;

    constructor(owner: Player, target: Player, modifier: number) {
        super(owner, target, modifier);

        this.actionType = Action.PLAYERACTIONS.search;
        this._priority = 4;
    }
}

export class Rest extends Action {

    public readonly actionType: string;
    protected _priority: number;

    constructor(owner: Player, target: Player, modifier: number) {
        super(owner, target, modifier);

        this.actionType = Action.PLAYERACTIONS.rest;
        this._priority = 5;
    }
}

export class Wait extends Action {

    public readonly actionType: string;
    protected _priority: number;

    constructor(owner: Player, target: Player, modifier: number) {
        super(owner, target, modifier);

        this.actionType = Action.PLAYERACTIONS.wait;
        this._priority = 6;
    }
}




