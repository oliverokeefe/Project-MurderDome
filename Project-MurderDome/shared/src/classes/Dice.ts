
import { roll } from '../types/types';


export class Dice {

    constructor() {

    }

    private static rollPercentDice(): number {
        return Math.floor(Math.random() * 100) + 1;
    }

    private static isCrit(value: number): boolean {
        let valueStr: string = value.toString();
        return (valueStr.length === 2 && valueStr[0] === valueStr[1]) || (value === 1) || (value === 100);
    }

    public static statRoll(stat: number, modifier: number): roll {

        let roll: roll = {
            value: this.rollPercentDice(),
            success: false,
            crit: false
        };

        if (roll.value != 100 && roll.value <= stat*5) {
            roll.success = true;
        }

        roll.crit = this.isCrit(roll.value);

        return roll;
    }

}





