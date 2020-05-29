
import type { action, stats, vitals } from '../types/types';
import { PlayerControl } from '../../../client/src/classes/devPlayerControl.js';
import { Action } from './Actions.js';

export class Player {

    static readonly STARTINGVITALS: vitals = {
        hp: 100,
        san: 70,
        sta: 50
    };
    static readonly DEFAULTSTATS: stats = {
        str: 13,
        dex: 13,
        con: 12,
        int: 12,
        wis: 11,
        cha: 11
    };
    static readonly DEFAULTMODIFIER: number = 0;


    public readonly playerId: string;

    private _playerName: string;
    private _vitals: vitals;
    private _stats: stats;
    private _action: Action;
    private _actionType: action
    private _modifier: number;
    private _target: number;



    constructor(playerId: string, playerName: string, stats: stats) {

        this.playerId = playerId;
        this._playerName = playerName;
        this._stats = stats;

        return
    }

    public takeDmg(damage: number) {
        this._vitals.hp = (this._vitals.hp - damage <= 0) ? 0 : this._vitals.hp - damage;
    }

    public getName(): string {
        return this._playerName;
    }

    public getNameTag(): string {
        return "[" + this.playerId + "] " + this.getName();
    }

    public getVitals(): vitals {
        return this._vitals;
    }

    public getStats(): stats {
        return this._stats;
    }

    public getAction(): Action {
        return this._action;
    }

    public get_actionType(): action {
        return this._actionType;
    }

    public get_modifier(): number {
        return this._modifier;
    }

    public get_target(): number {
        return this._target;
    }

    public set_playerName(name: string) {
        this._playerName = name;
    }

    public set_vitals(vitals: vitals) {
        this._vitals = vitals;
    }

    public set_stats(stats: stats): void {
        this._stats = stats;
    }

    public set_actionType(action: action): void {
        if (Action.isValidAction(action)) {
            this._actionType = action;
        } else {
            this._actionType = undefined;
        }
    }

    public set_modifier(mod: number): void {
        this._modifier = mod;
    }

    public set_target(target: number): void {
        this._target = target;
    }

    /**
     * This needs to be removed, the player should not have a reference to an actual action, they will just store types instead.
     * @param action
     * @param target
     * @param modifier
     */
    public setAction(action: action): void {

        if (Action.isValidAction(action)) {
            this._action = Action.buildAction(this);
        } else {
            this._action = undefined;
        }

        return;
    }

    public updateAction(action: action, target: number, modifier: number) {
        this.set_actionType(action);
        this.set_target(target);
        this.set_modifier(modifier);
    }

    /**
     * This is for testing, needs to be removed/changed for production
     */
    public updatePlayer(name: string, vitals: vitals, stats: stats): void {
        this.set_playerName(name);
        this.set_vitals(vitals);
        this.set_stats(stats);
    }
}