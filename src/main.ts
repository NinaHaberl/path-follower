/**
 * Software Sauna Code Challenge: Follow a path of characters & collect letters
 *
 */

import {Direction, MapOfCharacters, Position} from "../src/types";
import * as invalid from "../maps/invalid";
import * as valid from "../maps/valid";
import {forkInPathAfterStart, multipleStartingPath} from "../maps/invalid";
import {basicExample} from "../maps/valid";

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

function setPathDirection(direction: Direction, right, down, left, up): Direction | Error {

    let horizontalDirection = false;
    let verticalDirection = false;

    if (direction === Direction.Start) {
        if(/[A-Z]|-|\+|x/.test(left)) {
            if(horizontalDirection === true) {
                throw new Error("Invalid map - Fork in path");

            } else {

            }
        }
    }
}

function startMoving(surroundingCells): Direction | Error {
    let pathDirection;
    const [right, down, left, up] = surroundingCells;
    const cellValues = [right, down, left, up];
    const cellNames = new Map([
        [0, 'Right'],
        [1, 'Down'],
        [2, 'Left'],
        [3, 'Up'],
    ]);
    const definedValues= [];

    cellValues.forEach((value, index) => {
        if(typeof value !== " ") {
            definedValues.push({value, index});
        }
    });

    console.log("jesmo li došli ovdje?");
    if(definedValues.length === 1) {
        const definedValue = definedValues[0];
        const valueName = cellNames[definedValue.index];
        console.log(`Definirana vrijednost: ${definedValue.value}, Indeks: ${definedValue.index}, Ime: ${valueName}`);
        pathDirection = eval(`Direction.${valueName}`);

    } else {
        console.log("nekaj ne valja");
        console.log(definedValues.length);
    }

    return pathDirection;
}


function getSurroundingCells(map: MapOfCharacters[][], row: number, column: number): [MapOfCharacters | undefined, MapOfCharacters | undefined, MapOfCharacters | undefined, MapOfCharacters | undefined] {

    let right:string | undefined, down:string | undefined, left:string | undefined, up:string | undefined;

    /**
     * Check map index: if index is out of bounds - return undefined
     */
    if(!(column >= (map[row].length - 1))) {
        right = map[row][column + 1];
    }

    if(!(row >= (map.length - 1))) {
        down = map[row + 1][column];
    }

    if(column !== 0) {
        left = map[row][column - 1];
    }

    if(row !== 0) {
        up = map[row - 1][column];
    }

    return [right, down, left, up];
}

function collectLettersAndFollowPath(map: MapOfCharacters[][], startPosition: Position): { letters: string, path: string } {

    let collectedLetters: string[] = [];
    let pathAsCharacters: string[] = ["@"];
    let { row, column } = startPosition;
    let pathDirection: Direction | Error = Direction.Start;
    let endOfPath: MapOfCharacters | null = null;

    let currentCell = "";
    let cellLeft = "";
    let cellRight = "";
    let cellAbove = "";
    let cellBellow = "";

    let newPosition: Position = { row, column };

    while(endOfPath !== "x") {

        let surroundingCells= getSurroundingCells(map, row, column);
        let [cellLeft, cellRight, cellAbove, cellBelow] = surroundingCells;

        if (pathDirection === Direction.Start) {
            pathDirection = startMoving(surroundingCells);

            /* ovdje želim znati u kojem smo smjeru krenuli (u funkciji startMoving ću bacati errore ako imamo fork ili broken path */

            if(cellRight === "x") {
                endOfPath = "x";
                pathAsCharacters.push(cellRight);
            }
        } else {
            switch (pathDirection) {
                case "Right":
                    console.log("idemo desno");
                    endOfPath = "x";
                    break;
                case "Down":
                    console.log("idemo dole");
                    break;
                case "Left":
                    console.log("idemo dole");
                    break;
                case "Up":
                    console.log("idemo dole");
                    break;
            }
        }
    }

    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
}

const map = valid.basicExample;
const startPosition = validateMapAndFindStartingPosition(map);

if(startPosition !== undefined) {
    let output = collectLettersAndFollowPath(map, startPosition);
    console.log(`Collected letters: ${output.letters}`);
    console.log(`Path as characters: ${output.path}`);
}