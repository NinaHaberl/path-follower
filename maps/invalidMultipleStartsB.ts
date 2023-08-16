/**
 * Invalid map: Multiple starts - variant B
 * - BUT IF we ignore everything after the last character, it can pass as a valid map because
 * - the repeated start character has appeared after the end character, so we can ignore it
 */

import {MapOfCharacters} from "../src/types";

const map: MapOfCharacters[][] = [
    [" ", " ", " ", "@", "-", "-", "A", "-", "-", "-", "+", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "C", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x", " "],
    [" ", " ", " ", " ", " ", "@", "-", "B", "-", "-", "+", " "]
];

export default map;