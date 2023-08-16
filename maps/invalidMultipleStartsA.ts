/**
 * Invalid map: Multiple starts - variant A
 */

import {MapOfCharacters} from "../src/types";

const map: MapOfCharacters[][] = [
    [" ", " ", " ", "@", "-", "-", "A", "@", "-", "-", "+", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", " "],
    [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "C", " "],
    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|", " "],
    [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "+", " "]
];

export default map;