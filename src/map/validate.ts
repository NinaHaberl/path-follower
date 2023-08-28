import {MapOfCharacters, Position} from "../types";

export const validateMapAndFindStartingPosition = (map: MapOfCharacters[][]): Position | undefined => {

    let endingCharacter = false;
    let startPosition: Position | undefined = undefined;

    const start = "@";
    const end = "x";

    for(let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
            switch (map[row][column]) {
                case start:
                    if (!startPosition) {
                        startPosition = {row, column};
                    } else {
                        throw new Error("Invalid map - Multiple starts: map contains more than one '@' character");
                    }
                    break;

                case end:
                    endingCharacter = true;
                    break;

                default:
                    if (!isValidMapCharacter(map[row][column])) {
                        throw new Error(`Invalid map - Map contains invalid character ${map[row][column]}. The only valid characters are all uppercase letters (A-Z), minus (-), plus (+), pipe character (|) and 'x' as ending character.`);
                    }
            }
        }
    }

    if(startPosition === undefined) {
        throw new Error("Invalid map - There is no start character!");

    } else {
        if(!endingCharacter) {
            throw new Error("Invalid map - Missing end character");
        }
    }

    return startPosition;
};

export const isValidMapCharacter = (character: MapOfCharacters) => /^\s*$|[A-Z]|-|\||\+|x/.test(character);