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

export function startMoving(right, down, left, up): number | Error {
    let pathDirection: Direction;
    const surroundingCells: MapOfCharacters[] = [right, down, left, up];
    let definedCell: Array<{ value: string; index: number; }> = [];

    surroundingCells.forEach((value, index) => {
        if(/[A-Z]|-|\||\+/.test(value)) {
            console.log(value);
            console.log(index);
            definedCell.push({value, index});
        }
    });

    if(definedCell.length === 0) {
        throw new Error("Invalid map: Broken path after @ character");

    } else if(definedCell.length === 1) {
        console.log(`Next position: ${definedCell[0].value}; direction: ${definedCell[0].index}`);
        pathDirection = definedCell[0].index;

    } else {
        console.log(definedCell.length);
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