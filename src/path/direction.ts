import {Direction, MapOfCharacters, Position} from "../types";

export function setPathDirection(map: MapOfCharacters[][], row: number, column: number, direction: number): number {

    let [right, down, left, up] = checkSurroundingCells(map, row, column);
    const surroundingCells: MapOfCharacters[] = [right, down, left, up];
    let cellsWithCharacters: Array<{ character: string; direction: number; }> = [];

    // collect the characters from all surrounding cells
    surroundingCells.forEach((character, direction) => {
        if(/[A-Z]|-|\||\+|x/.test(character)) {
            cellsWithCharacters.push({character, direction});
        }
    });

    if(cellsWithCharacters.length === 0) {
        throw new Error("Invalid map: Broken path");

    } else {
        if(cellsWithCharacters.length === 1) {
            direction = cellsWithCharacters[0].direction;

        } else {
            /* TODO: think about edge cases of valid maps, for example

            `
              ++
              @x
            `,
            `
               +--A
                 |@-+
                 |
                 x
             `
             */
            throw new Error("Invalid map: Multiple starting paths");
        }
    }

    return direction;
}

export function setNewPosition(direction: Direction, position: Position): Position {

    switch (direction) {
        case Direction.Right:
            position.column = position.column + 1;
            break;
        case Direction.Down:
            position.row = position.row + 1;
            break;
        case Direction.Left:
            position.column = position.column - 1;
            break;
        case Direction.Up:
            position.row = position.row - 1;
            break;
    }

    return position;
}

export function makeTurn(map: MapOfCharacters[][], row: number, column: number, currentDirection: number): Direction {

    // TODO: reduce code
    let [right, down, left, up] = checkSurroundingCells(map, row, column);
    const surroundingCells: MapOfCharacters[] = [right, down, left, up];
    let cellsWithCharacters: Array<{ character: string; direction: number; }> = [];
    surroundingCells.forEach((character, direction) => {
        if(/[A-Z]|-|\||\+|x/.test(character)) {
            cellsWithCharacters.push({character, direction});
        }
    });

    /* instead of switch/case */
    const directionToIndex = {
        [Direction.Right]: 2,
        [Direction.Down]: 3,
        [Direction.Left]: 0,
        [Direction.Up]: 1,
    };

    const directionToRemove = directionToIndex[currentDirection];
    cellsWithCharacters = cellsWithCharacters.filter(({ direction }) => direction !== directionToRemove);


    for(let x = 0; x < cellsWithCharacters.length; x++) {
        console.log(`${cellsWithCharacters[x].character}`);
        console.log(`${cellsWithCharacters[x].direction}`);
    }

    if(cellsWithCharacters.length === 0) {
        throw new Error("Invalid map: Broken path");

    } else {
        if(cellsWithCharacters.length === 1) {
            // TODO: check for fake turn
            console.log(`Što se nalazi desno? ${right}`);
            console.log(`idem u smijeru ${Direction.Right}`);

            if(/[A-Z]|-|\+|x/.test(right)) {
                throw new Error("Invalid map: Fake turn");
            } else {
                currentDirection = cellsWithCharacters[0].direction;
            }

        } else {
            let invalidDirections = [];

            switch (currentDirection) {
                case Direction.Left:
                case Direction.Right:
                    invalidDirections = [down, up];
                    break;
                case Direction.Down:
                case Direction.Up:
                    invalidDirections = [right, left];
                    break;
            }

            if (invalidDirections.every(direction => /[A-Z]||\+|x/.test(direction))) {
                throw new Error("Invalid map: Fork in path");
            } else {
                currentDirection = cellsWithCharacters[0].direction;
            }
        }
    }

    return currentDirection;
}


export function checkSurroundingCells(map: MapOfCharacters[][], row: number, column: number): [MapOfCharacters | undefined, MapOfCharacters | undefined, MapOfCharacters | undefined, MapOfCharacters | undefined] {

    let right:string | undefined, down:string | undefined, left:string | undefined, up:string | undefined;

    /**
     * Check map index: if index is out of bounds - return undefined
     * TODO: refactor [reduce code]
     */
    if(!(column >= (map[row].length - 1))) {
        right = setNextCellValue(map, row, column, 0, 1);;
    }

    if(!(row >= (map.length - 1))) {
        down = setNextCellValue(map, row, column, 1, 0);
    }

    if(column !== 0) {
        left = setNextCellValue(map, row, column, 0, -1);
    }

    if(row !== 0) {
        up = setNextCellValue(map, row, column, -1, 0);
    }

    return [right, down, left, up];
}

function setNextCellValue(map: MapOfCharacters[][], row: number, column: number, rowOffset: number, colOffset: number): MapOfCharacters {
    return map[row + rowOffset][column + colOffset];
}

export function getCurrentCellValue(map: MapOfCharacters[][], row: number, column: number): MapOfCharacters {
    return map[row][column];
}


