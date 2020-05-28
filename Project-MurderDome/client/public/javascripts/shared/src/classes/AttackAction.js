import { Action } from './Action.js';
export class AttackAction extends Action {
    constructor(owner, target, modifier) {
        super(owner, target, modifier);
        this.action = Action.PLAYERACTIONS.attack;
        this._priority = 1;
    }
    resolve() {
        let log = "";
        return log;
    }
}
//# sourceMappingURL=AttackAction.js.map