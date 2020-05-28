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
        resolve() {
            return;
        }
    }
    Action.PLAYERACTIONS = {
        attack: "attack",
        defend: "defend",
        move: "move",
        follow: "follow",
        rest: "rest",
        wait: "wait"
    };
    return Action;
})();
export { Action };
//# sourceMappingURL=Action.js.map