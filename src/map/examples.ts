import {MapOfCharacters} from "../types";

/**
 * Valid map: A basic example
 */
export const basicExample: MapOfCharacters[][] = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "@", "A", "-", "+", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "x", "-", "C", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
];

/**
 * Valid minimum map: Contains only start and stop character.
 */
export const minimumMap: MapOfCharacters[][] = [
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", "@", "-", "A", "x"],
    [" ", " ", " ", " ", " ", " "]
];
export const miniMinimumMap: MapOfCharacters[][] = [
    ["@", "x"],
];

/**
 * Invalid maps:
 * 1. Multiple starts
 */
export const multipleStartA: MapOfCharacters[][] = [
    [" ", " ", " ", "@", "-", "-", "A", "@", "-", "-", "+", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", " "],
    [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "C", " "],
    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|", " "],
    [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "+", " "]
];

export const multipleStartB: MapOfCharacters[][] = [
    [" ", " ", " ", "@", "-", "-", "A", "-", "-", "-", "+", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "C", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x", " "],
    [" ", " ", " ", " ", " ", "@", "-", "B", "-", "-", "+", " "]
];

export const multipleStartC: MapOfCharacters[][] = [
    [" ", " ", " ", "@", "-", "-", "A", "-", "-", "x", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "x", " "],
    [" ", " ", " ", " ", " ", " ", "@", " ", " ", " ", " ", " "]
];

/**
 * Invalid maps:
 * 2. Multiple starting paths
 */
export const forkInPathAfterStart: MapOfCharacters[][] = [
    [" ", "x", "-", "@", "-", "-", "A", "-", "-", " ", " ", " "]
];