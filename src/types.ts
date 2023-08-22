export type MapOfCharacters = "@" | "-" | "+" | "|" | "x" | string;

export type Position = {
    row: number;
    column: number;
};

export enum Direction {
    Start = "Start",
    Up = "Up",
    Down = "Down",
    Left = "Left",
    Right = "Right"
}