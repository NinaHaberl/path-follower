export type MapOfCharacters = "@" | "-" | "+" | "|" | "x" | string;

export type Position = {
    row: number;
    column: number;
};

export enum Direction {
    Start,
    Up,
    Down,
    Left,
    Right
};