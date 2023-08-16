"use strict";
/**
 * Invalid map: Multiple starts - variant B
 * - BUT IF we ignore everything after the last character, it can pass as a valid map because
 * - the repeated start character has appeared after the end character, so we can ignore it
 */
exports.__esModule = true;
var map = [
    [" ", " ", " ", "@", "-", "-", "A", "-", "-", "-", "+", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "C", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x", " "],
    [" ", " ", " ", " ", " ", "@", "-", "B", "-", "-", "+", " "]
];
exports["default"] = map;
