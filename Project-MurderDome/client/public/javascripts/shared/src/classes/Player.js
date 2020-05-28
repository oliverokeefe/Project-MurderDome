import { Action } from './Action.js';
import { AttackAction } from './AttackAction.js';
let Player = /** @class */ (() => {
    class Player {
        constructor(playerId, playerName, stats) {
            this._playerId = playerId;
            this._playerName = playerName;
            this._stats = stats;
            return;
        }
        takeDmg(damage) {
            this._vitals.hp = (this._vitals.hp - damage <= 0) ? 0 : this._vitals.hp - damage;
        }
        getName() {
            return this._playerName;
        }
        getNameTag() {
            return "[" + this._playerId + "] " + this.getName();
        }
        getVitals() {
            return this._vitals;
        }
        getStats() {
            return this._stats;
        }
        getAction() {
            return this._action;
        }
        set_playerName(name) {
            this._playerName = name;
        }
        set_vitals(vitals) {
            this._vitals = vitals;
        }
        set_stats(stats) {
            this._stats = stats;
        }
        setAction(action, target, modifier) {
            if (Action.isValidAction(action)) {
                if (action === Action.PLAYERACTIONS.attack) {
                    this._action = new AttackAction(this, target, modifier);
                }
                //this._action = new Action(action, this._playerId, target, modifier);
            }
            else {
                this._action = undefined;
            }
            return;
        }
        /**
         * This is for testing, needs to be removed/changed for production
         */
        updatePlayer(name, vitals, stats) {
            this.set_playerName(name);
            this.set_vitals(vitals);
            this.set_stats(stats);
        }
    }
    Player.STARTINGVITALS = {
        hp: 100,
        san: 70,
        sta: 50
    };
    Player.DEFAULTSTATS = {
        str: 13,
        dex: 13,
        con: 12,
        int: 12,
        wis: 11,
        cha: 11
    };
    Player.DEFAULTMODIFIER = 0;
    return Player;
})();
export { Player };
//# sourceMappingURL=Player.js.map