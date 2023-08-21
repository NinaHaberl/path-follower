/**
 * Software Sauna Code Challenge: Follow a path of characters & collect letters
 *
 */

import {Direction, MapOfCharacters, Position} from "../src/types";
import * as valid from "../maps/valid";

export function validateMapAndFindStartingPosition(map: MapOfCharacters[][]): Position | undefined {

    let startCharacter= false;
    let stopCharacter = false;
    let startPosition: Position | undefined = undefined;

    for(let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
            switch (map[row][column]) {
                case "@":
                    if (startCharacter === false) {
                        startCharacter = true;
                        startPosition = {row, column};
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

    if(startPosition !== undefined && startCharacter === true && stopCharacter === true) {
        return startPosition;

    } else {
        errorInvalidStartOrStopCharacter(startCharacter, stopCharacter);
    }
}

function errorInvalidStartOrStopCharacter(start: boolean, stop: boolean): void | Error {
    if(start === false && stop === false) {
        throw new Error("Invalid map - There is no start nor stop character!");

    } else if(start === true && stop === false) {
        throw new Error("Invalid map - There is no stop character!");

    } else if(start === false && stop === true) {
        throw new Error("Invalid map - There is no start character!");
    }
}

function setPathDirection(right: string, down, left, up): Direction | Error {
        return Direction.Right;
}

function collectLettersAndFollowPath(map: MapOfCharacters[][], startPosition: Position): { letters: string, path: string } {

    let collectedLetters: string[] = [];
    let pathAsCharacters: string[] = ["@"];
    let { row, column } = startPosition;
    let pathDirection: Direction | Error = Direction.Start;
    let endOfPath: MapOfCharacters | null = null;

    let cellLeft = "";
    let cellRight = "";
    let cellAbove = "";
    let cellBellow = "";
    let currentCell = "";
    let newPosition: Position = { row, column };

    while(endOfPath !== "x") {

        currentCell = map[row][column];
        //cellLeft = map[row][column - 1];
        cellRight = map[row][column + 1];
        //cellAbove = map[row - 1][column];
        //cellBellow = map[row + 1][column];

        if (pathDirection === 0) {
            pathDirection = setPathDirection(cellRight, cellBellow, cellLeft, cellAbove);
            console.log(`vratio mi je ${pathDirection}`);
            if(cellRight === "x") {
                endOfPath = "x";
                pathAsCharacters.push(cellRight);
            }
        }
    }

    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
}

const map = valid.minimumMap;
const startPosition = validateMapAndFindStartingPosition(map);

if(startPosition !== undefined) {
    let output = collectLettersAndFollowPath(map, startPosition);
    console.log(`Collected letters: ${output.letters}`);
    console.log(`Path as characters: ${output.path}`);
}