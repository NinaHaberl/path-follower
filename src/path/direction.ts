import {Direction, MapOfCharacters} from "../types";

export function setPathDirection(direction: Direction, right, down, left, up): Direction | Error {

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

export function startMoving(surroundingCells): Direction | Error {
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


export function getSurroundingCells(map: MapOfCharacters[][], row: number, column: number): [MapOfCharacters | undefined, MapOfCharacters | undefined, MapOfCharacters | undefined, MapOfCharacters | undefined] {

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