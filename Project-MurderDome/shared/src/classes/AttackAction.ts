
import type { action } from '../types/types'; 
import { Action } from './Action.js';
import { Player } from './Player.js';

export class AttackAction extends Action {

    public readonly action: string;
    protected _priority: number;

    constructor(owner: Player, target: number, modifier: number) {
        super(owner, target, modifier);

        this.action = Action.PLAYERACTIONS.attack;
        this._priority = 1;
    }

    public resolve(): string {
        let log: string = "";



        return log;
    }


}





