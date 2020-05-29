

export type comparator = (a: any, b: any) => boolean;
export type action = "attack" | "hide" | "move" | "search" | "rest" | "wait";
export type stat = "str" | "dex" | "con" | "int" | "wis" | "cha";
export type vital = "hp" | "san" | "sta";
export type vitals = { hp: number; san: number; sta: number};
export type stats = { str: number; dex: number; con: number; int: number; wis: number; cha: number };


