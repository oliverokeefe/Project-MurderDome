let Action = /** @class */ (() => {
    class Action {
        constructor(owner, target, modifier) {
            this.action = "";
            this.owner = owner;
            this.mod = modifier;
            this.target = target;
        }
        static comparator(a, b) {
            return a._priority < b._priority;
        }
        static isValidAction(action) {
            return Action.PLAYERACTIONS.hasOwnProperty(action);
        }
        static buildAction(owner) {
            let action = undefined;
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
        resolve() {
            return "+" + this.owner.getNameTag() + ":: " + this.action + "<br/>";
        }
        attackResponse() {
            return "";
        }
    }
    Action.PLAYERACTIONS = {
        attack: "attack",
        hide: "hide",
        move: "move",
        search: "search",
        rest: "rest",
        wait: "wait"
    };
    return Action;
})();
export { Action };
export class Attack extends Action {
    constructor(owner, target, modifier) {
        super(owner, target, modifier);
        this.action = Action.PLAYERACTIONS.attack;
        this._priority = 1;
    }
    resolve() {
        let log = "";
        log += super.resolve();
        return log;
    }
}
export class Hide extends Action {
    constructor(owner, target, modifier) {
        super(owner, target, modifier);
        this.action = Action.PLAYERACTIONS.hide;
        this._priority = 2;
    }
}
export class Move extends Action {
    constructor(owner, target, modifier) {
        super(owner, target, modifier);
        this.action = Action.PLAYERACTIONS.move;
        this._priority = 3;
    }
    attackResponse() {
        return this.owner.getName() + " attack response";
    }
}
export class Search extends Action {
    constructor(owner, target, modifier) {
        super(owner, target, modifier);
        this.action = Action.PLAYERACTIONS.search;
        this._priority = 4;
    }
}
export class Rest extends Action {
    constructor(owner, target, modifier) {
        super(owner, target, modifier);
        this.action = Action.PLAYERACTIONS.rest;
        this._priority = 5;
    }
}
export class Wait extends Action {
    constructor(owner, target, modifier) {
        super(owner, target, modifier);
        this.action = Action.PLAYERACTIONS.wait;
        this._priority = 6;
    }
}
//# sourceMappingURL=Actions.js.map