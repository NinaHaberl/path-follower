/**
 * Valid minimum map: Contains only start and stop character.
 */
export const minimumMap: string[][] = [
    ["@", "x"]
];
/**
 * Valid map: A basic example
 */
export const basicExample: string[][] = [
    [" ", " ", " ", " ", "@", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
    [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", " ", "+", "-", "-", "-", "+"]
];

/**
 * Valid map: Ignore stuff after end of path
 */
export const ignoreAfterX: string[][] = [
    [" ", " ", " ", " ", "@", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["B", "-", "x", "-", "+", " ", " ", " ", "C"],
    [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", " ", "+", "-", "-", "-", "+"]
];

/**
 * Valid map: Go straight through intersections
 */
export const intersectionVerA: string[][] = [
    ["@", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["|", " ", "+", "-", "C", "-", "-", "+", " ", " "],
    ["A", " ", "|", " ", " ", " ", " ", "|", " ", " "],
    ["+", "-", "-", "-", "B", "-", "-", "+", " ", " "],
    [" ", " ", "|", " ", " ", " ", " ", " ", " ", "x"],
    [" ", " ", "|", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", "+", "-", "-", "-", "D", "-", "-", "+"]
];
export const intersectionVerB: string[][] = [
    ["@", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["|", " ", "+", "-", "C", "-", "-", "+", " ", " ", " ", " ", " "],
    ["A", " ", "|", " ", " ", " ", " ", "|", " ", " ", " ", " ", " "],
    ["+", "-", "-", "-", "B", "-", "-", "+", " ", " ", "+", "-", "+"],
    [" ", " ", "|", " ", " ", " ", " ", " ", " ", " ", "|", " ", "|"],
    [" ", " ", "|", " ", " ", " ", " ", " ", "x", "-", "|", "-", "+"],
    [" ", " ", "+", "-", "-", "-", "D", "-", "-", "-", "+", " ", " "]
];

/**
 * Valid map: Letters may be found on turns
 */
export const lettersOnTurns: string[][] = [
    ["@", "-", "-", "A", "-", "-", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", "|"],
    ["x", "-", "B", "+", " ", " ", " ", "|"],
    [" ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", "+", "-", "-", "-", "C"]
];
export const lettersOnTurnsVerB: string[][] = [
    ["@", "-", "-", "C", "-", "-", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", "|"],
    ["x", "-", "L", "+", " ", " ", " ", "|"],
    [" ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", "O", "-", "-", "-", "O"]
];

/**
 * Valid map: Do not collect a letter from the same location twice
 */
export const goonies: string[][] = [
    [" ", " ", " ", " ", "+", "-", "O", "-", "N", "-", "+", " ", " "],
    [" ", " ", " ", " ", "|", " ", " ", " ", " ", " ", "|", " ", " "],
    [" ", " ", " ", " ", "|", " ", " ", " ", "+", "-", "I", "-", "+"],
    ["@", "-", "G", "-", "O", "-", "+", " ", "|", " ", "|", " ", "|"],
    [" ", " ", " ", " ", "|", " ", "|", " ", "+", "-", "+", " ", "E"],
    [" ", " ", " ", " ", "+", "-", "+", " ", " ", " ", " ", " ", "S"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
];
export const lettersOnTurnsWithIntersection: string[][] = [
    ["@", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["|", " ", "+", "-", "E", "-", "-", "+", " ", " ", " ", " ", " "],
    ["A", " ", "|", " ", " ", " ", " ", "|", " ", " ", " ", " ", " "],
    ["B", "-", "C", "-", "D", "-", "-", "+", " ", " ", "+", "-", "+"],
    [" ", " ", "|", " ", " ", " ", " ", " ", " ", " ", "|", " ", "|"],
    [" ", " ", "|", " ", " ", " ", " ", " ", "x", "-", "|", "-", "+"],
    [" ", " ", "F", "-", "-", "-", "G", "-", "-", "-", "+", " ", " "]
];

/**
 * Valid map: Keep direction, even in a compact space
 */
export const compactMap: string[][] = [
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "+", "-", "L", "-", "+", " ", " "],
    [" ", "|", " ", " ", "+", "A", "-", "+"],
    ["@", "B", "+", " ", "+", "+", " ", "H"],
    [" ", "+", "+", " ", " ", " ", " ", "x"]
];
export const compactMapWithLetterOnTurn: string[][] = [
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "+", "-", "L", "-", "+", " ", " "],
    [" ", "|", " ", " ", "+", "A", "-", "+"],
    ["@", "B", "+", " ", "+", "W", " ", "H"],
    [" ", "+", "+", " ", " ", " ", " ", "x"]
];

/**
 * Edge cases: Valid maps around the start
 */
export const aroundStartVerA: string[][] = [
    ["C", "-", "A", " "],
    ["|", "@", "+", " "],
    ["B", " ", " ", " "],
    ["x", " ", " ", " "],
];
export const aroundStartVerB: string[][] = [
    ["D", "-", "A", "+", " "],
    ["|", "@", " ", "|", " "],
    ["B", "|", " ", "+", "x"],
    ["A", "+", " ", " ", " "],
];
export const aroundStartVerC: string[][] = [
    ["L", "-", "+", " ", " "],
    ["|", "@", "|", " ", " "],
    ["L", "|", "O", "-", "x"],
    ["E", "H", " ", " ", " "],
];
export const aroundStartSnail: string[][] = [
    ["A", "-", "N", " ", " ", " ", " "],
    ["|", "@", "S", " ", " ", "+", "x"],
    ["I", "-", "-", "L", "-", "+", " "],
];
export const aroundStartPretzel: string[][] = [
    ["E", "-", "+", " ", " "],
    ["|", "@", "|", " ", " "],
    ["R", "P", "|", "+", "L"],
    [" ", " ", "T", "E", "x"],
    [" ", " ", "Z", "+", " "],
];

/**
 * Invalid maps:
 * 1. Multiple starts
 */
export const multipleStartA: string[][] = [
    [" ", " ", " ", "@", "-", "-", "A", "@", "-", "-", "+", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", " "],
    [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "C", " "],
    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|", " "],
    [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "+", " "]
];

export const multipleStartB: string[][] = [
    [" ", " ", " ", "@", "-", "-", "A", "-", "-", "-", "+", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "C", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x", " "],
    [" ", " ", " ", " ", " ", "@", "-", "B", "-", "-", "+", " "]
];

export const multipleStartC: string[][] = [
    [" ", " ", " ", "@", "-", "-", "A", "-", "-", "x", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", "@", " ", " ", " ", " ", " "]
];

/**
 * Invalid maps:
 * 2. Multiple starting paths
 */
export const multipleStartingPathsVerA: string[][] = [
    [" ", "x", "-", "@", "-", "-", "A", "-", "x"]
];
export const multipleStartingPathsVerB: string[][] = [
    [" ", " ", " ", "+", "-", "-", "A", "-", "-", "x", " ", " "],
    [" ", " ", " ", "@", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "|", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "+", "-", "-", "x", " ", " ", " ", " ", " "]
];
export const multipleStartingPathsVerC: string[][] = [
    [" ", " ", " ", "+", "-", "-", "A", "-", "-", "x", " ", " "],
    [" ", "x", "-", "@", " ", " ", " ", " ", " ", " ", " ", " "]
];

/**
 * Invalid maps:
 * 3. Fork in path
 */
export const forkInPathVerA: string[][] = [
    [" ", " ", " ", " ", " ", " ", " ", " "],
    ["x", "-", "-", "-", "E", "-", "-", "B"],
    [" ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", "@", "-", "-", "A", "-", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", "x", "F", "-", "-", "-", "-", "+"]
];

export const forkInPathVerB: string[][] = [
    [" ", "@", "-", "-", "A", "-", "-", "+", "-", "x"],
    [" ", " ", " ", " ", " ", " ", " ", "|", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", "|", " ", " "],
    [" ", "x", "F", "-", "-", "-", "-", "+", " ", " "]
];

/**
 * Invalid maps:
 * 3. Broken path
 */
export const brokenPath: string[][] = [
    [" ", " ", " ", " ", "@", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
    [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
];
export const brokenPathVerB: string[][] = [
    [" ", " ", " ", " ", "@", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
    [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
];
export const brokenPathVerC: string[][] = [
    [" ", " ", " ", " ", "@", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["x", "-", "B", "-", " ", " ", " ", " ", "C"],
    [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
];

/**
 * Invalid map:
 * 4. Missing start or end character
 */
export const xMissing: string[][] = [
    [" ", " ", " ", " ", "@", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", "-", "B", "-", "+", " ", " ", " ", "C"],
    [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
];
export const startMissingVerA: string[][] = [
    [" ", " ", " ", " ", " ", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", "-", "B", "-", "+", " ", " ", " ", "C"],
    [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
];
export const startMissingVerB: string[][] = [
    [" ", " ", " ", " ", " ", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
    [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
];

/**
 * Invalid map:
 * 5. Fake turn
 */
export const fakeTurnVerA: string[][] = [
    ["@", "-", "A", "+", "-", "B", "-", "x", " "]
];
export const fakeTurnVerB: string[][] = [
    ["@"],
    ["|"],
    ["B"],
    ["+"],
    ["A"],
    ["x"]
];