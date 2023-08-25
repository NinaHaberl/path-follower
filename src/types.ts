export type MapOfCharacters = "@" | "-" | "+" | "|" | "x" | string;

export interface Position {
    row: number | undefined;
    column: number | undefined;
};

export enum Direction {
    Right,
    Down,
    Left,
    Up,
    Start,
}