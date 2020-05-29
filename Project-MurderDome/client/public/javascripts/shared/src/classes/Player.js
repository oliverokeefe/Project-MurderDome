import { Action } from './Actions.js';
let Player = /** @class */ (() => {
    class Player {
        constructor(playerId, playerName, stats) {
            this.playerId = playerId;
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
            return "[" + this.playerId + "] " + this.getName();
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
        get_actionType() {
            return this._actionType;
        }
        get_modifier() {
            return this._modifier;
        }
        get_target() {
            return this._target;
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
        set_actionType(action) {
            if (Action.isValidAction(action)) {
                this._actionType = action;
            }
            else {
                this._actionType = undefined;
            }
        }
        set_modifier(mod) {
            this._modifier = mod;
        }
        set_target(target) {
            this._target = target;
        }
        /**
         * This needs to be removed, the player should not have a reference to an actual action, they will just store types instead.
         * @param action
         * @param target
         * @param modifier
         */
        setAction(action) {
            if (Action.isValidAction(action)) {
                this._action = Action.buildAction(this);
            }
            else {
                this._action = undefined;
            }
            return;
        }
        updateAction(action, target, modifier) {
            this.set_actionType(action);
            this.set_target(target);
            this.set_modifier(modifier);
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