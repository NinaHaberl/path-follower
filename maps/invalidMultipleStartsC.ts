/**
 * Invalid map: Multiple starts - variant C
 * - also a broken path
 */

import {MapOfCharacters} from "../src/types";

const map: MapOfCharacters[][] = [
    [" ", " ", " ", "@", "-", "-", "A", "-", "-", "x", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "x", " "],
    [" ", " ", " ", " ", " ", " ", "@", " ", " ", " ", " ", " "]
];

export default map;