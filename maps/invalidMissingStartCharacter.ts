/**
 * Invalid map: Missing start character
 */

import {MapOfCharacters} from "../src/types";

const map: MapOfCharacters[][] = [
    [" ", " ", " ", "-", "-", "-", "A", "-", "-", "-", "+", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", " "],
    [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "C", " "],
    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|", " "],
    [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "+", " "]
];

export default map;