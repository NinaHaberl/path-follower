export type MapOfCharacters = "@" | "-" | "+" | "|" | "x" | string;

export interface Position {
    row: number;
    column: number;
};

export enum Direction {
    Right,
    Down,
    Left,
    Up,
    Start,

}