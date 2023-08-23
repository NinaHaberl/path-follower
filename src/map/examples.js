"use strict";
exports.__esModule = true;
/**
 * Valid map: A basic example
 */
exports.basicExample = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "@", "A", "-", "+", "", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "x", "-", "C", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
];
/**
 * Valid minimum map: Contains only start and stop character.
 */
exports.minimumMap = [
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", "@", "-", "A", "x"],
    [" ", " ", " ", " ", " ", " "]
];
exports.miniMinimumMap = [
    ["@", "x"],
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
    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "x", " "],
    [" ", " ", " ", " ", " ", " ", "@", " ", " ", " ", " ", " "]
];
/**
 * Invalid maps:
 * 2. Multiple starting paths
 */
exports.forkInPathAfterStart = [
    [" ", "x", "-", "@", "-", "-", "A", "-", "-", " ", " ", " "]
];