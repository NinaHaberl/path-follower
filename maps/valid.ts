import {MapOfCharacters} from "../src/types";

/**
 * Valid map: A basic example
 */
export const basicExample: MapOfCharacters[][] = [
    ["@", "-", "-", "-", "-", "-", "A", "-", "-", "-", "+", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", " "],
    [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "C", " "],
    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|", " "],
    [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "+", " "]
];

/**
 * Valid minimum map: Contains only start and stop character.
 */
export const minimumMap: MapOfCharacters[][] = [
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", "@", "x", " ", " "],
    [" ", " ", " ", " ", " ", " "]
];
export const miniMinimumMap: MapOfCharacters[][] = [
    ["@", "x"],
];