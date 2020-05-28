
import type { action } from '../types/types';
import { Player } from './Player.js';

export abstract class Action {

    static readonly PLAYERACTIONS = {
        attack: "attack",
        defend: "defend",
        move: "move",
        follow: "follow",
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

    public resolve(): void {
        return;
    }


}





