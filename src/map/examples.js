"use strict";
exports.__esModule = true;
/**
 * Valid map: A basic example
 */
exports.basicExaple = [
    [" ", " ", " ", " ", "@", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
    [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
    [" ", " ", " ", " ", "+", "-", "-", "-", "+"]
];
/**
 * Valid map: Go straight through intersections
 */
exports.intersectionVerA = [
    ["@", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["|", " ", "+", "-", "C", "-", "-", "+", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["A", " ", "|", " ", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["+", "-", "-", "-", "B", "-", "-", "+", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", "|", " ", " ", " ", " ", " ", " ", "x", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", "|", " ", " ", " ", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", "+", "-", "-", "-", "D", "-", "-", "+", " ", " ", " ", " ", " ", " ", " "]
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
 * Valid minimum map: Contains only start and stop character.
 */
exports.minimumMap = [
    ["@", "x"]
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
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["x", "-", "-", "-", "E", "-", "-", "B", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", "|", " ", " "],
    [" ", "@", "-", "-", "A", "-", "-", "+", "-", "x"],
    [" ", " ", " ", " ", " ", " ", " ", "|", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", "|", " ", " "],
    [" ", "x", "F", "-", "-", "-", "-", "+", " ", " "]
];
/**
 * Invalid maps:
 * 3. Fork in path
 */
exports.brokenPath = [
    [" ", " ", " ", " ", "@", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
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
