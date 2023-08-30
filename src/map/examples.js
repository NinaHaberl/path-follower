"use strict";
exports.__esModule = true;
/**
 * Valid minimum map: Contains only start and stop character.
 */
exports.minimumMap = [
    ["@", "x"]
];
/**
 * Valid map: A basic example
 */
exports.basicExample = [
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
exports.ignoreAfterX = [
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
exports.intersectionVerA = [
    ["@", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["|", " ", "+", "-", "C", "-", "-", "+", " ", " "],
    ["A", " ", "|", " ", " ", " ", " ", "|", " ", " "],
    ["+", "-", "-", "-", "B", "-", "-", "+", " ", " "],
    [" ", " ", "|", " ", " ", " ", " ", " ", " ", "x"],
    [" ", " ", "|", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", "+", "-", "-", "-", "D", "-", "-", "+"]
];
exports.intersectionVerB = [
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
exports.lettersOnTurns = [
    ["@", "-", "-", "A", "-", "-", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", "|"],
    ["x", "-", "B", "+", " ", " ", " ", "|"],
    [" ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", "+", "-", "-", "-", "C"]
];
exports.lettersOnTurnsVerB = [
    ["@", "-", "-", "C", "-", "-", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", "|"],
    ["x", "-", "L", "+", " ", " ", " ", "|"],
    [" ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", "O", "-", "-", "-", "O"]
];
/**
 * Valid map: Do not collect a letter from the same location twice
 */
exports.goonies = [
    [" ", " ", " ", " ", "+", "-", "O", "-", "N", "-", "+", " ", " "],
    [" ", " ", " ", " ", "|", " ", " ", " ", " ", " ", "|", " ", " "],
    [" ", " ", " ", " ", "|", " ", " ", " ", "+", "-", "I", "-", "+"],
    ["@", "-", "G", "-", "O", "-", "+", " ", "|", " ", "|", " ", "|"],
    [" ", " ", " ", " ", "|", " ", "|", " ", "+", "-", "+", " ", "E"],
    [" ", " ", " ", " ", "+", "-", "+", " ", " ", " ", " ", " ", "S"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
];
exports.lettersOnTurnsWithIntersection = [
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
exports.compactMap = [
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "+", "-", "L", "-", "+", " ", " "],
    [" ", "|", " ", " ", "+", "A", "-", "+"],
    ["@", "B", "+", " ", "+", "+", " ", "H"],
    [" ", "+", "+", " ", " ", " ", " ", "x"]
];
exports.compactMapWithLetterOnTurn = [
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "+", "-", "L", "-", "+", " ", " "],
    [" ", "|", " ", " ", "+", "A", "-", "+"],
    ["@", "B", "+", " ", "+", "W", " ", "H"],
    [" ", "+", "+", " ", " ", " ", " ", "x"]
];
/**
 * Edge cases: Valid maps around the start
 */
exports.aroundStartVerA = [
    ["C", "-", "A", " "],
    ["|", "@", "+", " "],
    ["B", " ", " ", " "],
    ["x", " ", " ", " "],
];
exports.aroundStartVerB = [
    ["D", "-", "A", "+", " "],
    ["|", "@", " ", "|", " "],
    ["B", "|", " ", "+", "x"],
    ["A", "+", " ", " ", " "],
];
exports.aroundStartVerC = [
    ["L", "-", "+", " ", " "],
    ["|", "@", "|", " ", " "],
    ["L", "|", "O", "-", "x"],
    ["E", "H", " ", " ", " "],
];
exports.aroundStartSnail = [
    ["A", "-", "N", " ", " ", " ", " "],
    ["|", "@", "S", " ", " ", "+", "x"],
    ["I", "-", "-", "L", "-", "+", " "],
];
exports.aroundStartPretzel = [
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
exports.multipleStartA = [
    [" ", " ", " ", "@", "-", "-", "A", "@", "-", "-", "+", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", " "],
    [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "C", " "],
    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|", " "],
    [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "+", " "]
];
exports.multipleStartB = [
    [" ", " ", " ", "@", "-", "-", "A", "-", "-", "-", "+", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "C", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x", " "],
    [" ", " ", " ", " ", " ", "@", "-", "B", "-", "-", "+", " "]
];
exports.multipleStartC = [
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
exports.multipleStartingPathsVerA = [
    [" ", "x", "-", "@", "-", "-", "A", "-", "x"]
];
exports.multipleStartingPathsVerB = [
    [" ", " ", " ", "+", "-", "-", "A", "-", "-", "x", " ", " "],
    [" ", " ", " ", "@", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "|", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "+", "-", "-", "x", " ", " ", " ", " ", " "]
];
exports.multipleStartingPathsVerC = [
    [" ", " ", " ", "+", "-", "-", "A", "-", "-", "x", " ", " "],
    [" ", "x", "-", "@", " ", " ", " ", " ", " ", " ", " ", " "]
];
/**
 * Invalid maps:
 * 3. Fork in path
 */
exports.forkInPathVerA = [
    [" ", " ", " ", " ", " ", " ", " ", " "],
    ["x", "-", "-", "-", "E", "-", "-", "B"],
    [" ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", "@", "-", "-", "A", "-", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", "x", "F", "-", "-", "-", "-", "+"]
];
exports.forkInPathVerB = [
    [" ", "@", "-", "-", "A", "-", "-", "+", "-", "x"],
    [" ", " ", " ", " ", " ", " ", " ", "|", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", "|", " ", " "],
    [" ", "x", "F", "-", "-", "-", "-", "+", " ", " "]
];
/**
 * Invalid maps:
 * 3. Broken path
 */
exports.brokenPath = [
    [" ", " ", " ", " ", "@", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
    [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
];
exports.brokenPathVerB = [
    [" ", " ", " ", " ", "@", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
    [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
];
exports.brokenPathVerC = [
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
exports.xMissing = [
    [" ", " ", " ", " ", "@", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", "-", "B", "-", "+", " ", " ", " ", "C"],
    [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
];
exports.startMissingVerA = [
    [" ", " ", " ", " ", " ", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", "-", "B", "-", "+", " ", " ", " ", "C"],
    [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
];
exports.startMissingVerB = [
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
exports.fakeTurnVerA = [
    ["@", "-", "A", "+", "-", "B", "-", "x", " "]
];
exports.fakeTurnVerB = [
    ["@"],
    ["|"],
    ["B"],
    ["+"],
    ["A"],
    ["x"]
];
