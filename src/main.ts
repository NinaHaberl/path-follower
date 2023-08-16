/**
 * Software Sauna Code Challenge: Follow a path of characters & collect letters
 *
 * NOTE: We assume that we read all maps from left to right, from top to bottom
 */

import {MapOfCharacters} from "../src/types";
//import map from "../maps/validBasicExample";
//import map from "../maps/invalidMissingStartCharacter";
//import map from "../maps/invalidMultipleStartsA";
//import map from "../maps/invalidMultipleStartsB";
//import map from "../maps/invalidMissingEndCharacter";
import map from "../maps/invalidMissingStartAndStop";

type Position = {
    row: number;
    column: number;
};

function checkAllowedCharacters(map: MapOfCharacters[][]): { validMap: boolean } | Error {

    let startCharacter= false;
    let stopCharacter = false;
    let mapValidated = false;

    for(let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
            switch (map[row][column]) {
                case "@":
                    if (startCharacter === false) {
                        startCharacter = true;
                    } else {
                        throw new Error("Invalid map - Multiple starts: map contains more than one '@' character");
                    }
                    break;

                case "x":
                    if (stopCharacter === false) {
                        stopCharacter = true;
                    } else {
                        throw new Error("Invalid map - Multiple stops: map contains more than one 'x' character");
                    }
                    break;
                default:
                    if (!/^\s*$|[A-Z]|-|\||\+/.test(map[row][column])) {
                        throw new Error(`Invalid map - Map contains invalid character ${map[row][column]}. The only valid characters are all uppercase letters (A-Z), minus (-), plus (+) and pipe character (|).`);
                    }
            }
        }
    }

    if(startCharacter === false && stopCharacter === false) {
        throw new Error("Invalid map - There is no start nor stop character!");

    } else if(startCharacter === true && stopCharacter === false) {
        throw new Error("Invalid map - There is no stop character!");

    } else if(startCharacter === false && stopCharacter === true) {
        throw new Error("Invalid map - There is no start character!");

    } else {
        mapValidated = true;
    }

    return { validMap: mapValidated };
}

let mapValid = checkAllowedCharacters(map);

if(mapValid) {
    for (const row of map) {
        console.log(row.join(''));
    }

} else {
    throw new Error("Oops, something went totally wrong...");
}


function findStartingCharacter(map: MapOfCharacters[][]): { column: number; row: number } | null | Error {

    let startingCharacterRow = -1;
    let startingCharacterColumn = -1;

    for(let row = 0; row < map.length; row++) {
        for(let column = 0; column < map[row].length; column++) {
            if(map[row][column] === "@") {

                if(startingCharacterRow !== -1 || startingCharacterColumn !== -1) {
                    throw new Error("Invalid map - Multiple starts: map contains more than one '@' character");
                }

                startingCharacterRow = row;
                startingCharacterColumn = column;

            }
        }
    }

    if(startingCharacterRow === -1 || startingCharacterColumn === -1) {
        throw new Error("Invalid map - Missing start character: map doesn't contain starting '@' character");
    }

    return {row: startingCharacterRow, column: startingCharacterColumn};
}

