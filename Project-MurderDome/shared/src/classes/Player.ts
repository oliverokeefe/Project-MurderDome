
import type { action, stats, vitals } from '../types/types';
import { PlayerControl } from '../../../client/src/classes/devPlayerControl.js';
import { Action } from './Action.js';

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


    private _playerId: string;
    private _playerName: string;
    private _vitals: vitals;
    private _stats: stats;
    private _action: Action;



    constructor(playerId: string, playerName: string, stats: stats) {

        this._playerId = playerId;
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
        return "[" + this._playerId + "] " + this.getName();
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

    public set_playerName(name: string) {
        this._playerName = name;
    }

    public set_vitals(vitals: vitals) {
        this._vitals = vitals;
    }

    public set_stats(stats: stats): void {
        this._stats = stats;
    }

    public setAction(action: action, target: number, modifier: number): void {

        if (Action.isValidAction(action)) {
            this._action = new Action(action, this._playerId, target, modifier);
        } else {
            this._action = undefined;
        }

        return;
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