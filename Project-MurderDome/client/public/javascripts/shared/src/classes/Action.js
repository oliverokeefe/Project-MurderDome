let Action = /** @class */ (() => {
    class Action {
        constructor(action, ownerId, target, modifier) {
            this.ownerId = ownerId;
            this.mod = modifier;
            this.action = action;
            this.target = target;
            this._setPriorityFromAction();
        }
        _setPriorityFromAction() {
            if (Action.isValidAction(this.action)) {
                this._priority = Action.PLAYERACTIONS[this.action].priority;
            }
            else {
                this._priority = 1000;
            }
        }
        static comparator(a, b) {
            return a._priority < b._priority;
        }
        static isValidAction(action) {
            return Action.PLAYERACTIONS.hasOwnProperty(action);
        }
        static resolve(action) {
        }
    }
    Action.PLAYERACTIONS = {
        attack: { name: "attack", priority: 1, },
        defend: { name: "defend", priority: 2 },
        move: { name: "move", priority: 3 },
        follow: { name: "follow", priority: 4 },
        rest: { name: "rest", priority: 5 },
        wait: { name: "wait", priority: 6 }
    };
    return Action;
})();
export { Action };
//# sourceMappingURL=Action.js.map