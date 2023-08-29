import {Position} from "../types";

export const validateMapAndFindStartingPosition = (map: string[][]): Position => {

    let endingCharacter = false;
    let startPosition: Position | undefined = undefined;

    const start = "@";
    const end = "x";

    map.forEach((row, rowIndex) => {
        row.forEach((character, columnIndex) => {

            switch (character) {
                case start:
                    if (!startPosition) {
                        startPosition = {row: rowIndex, column: columnIndex};
                    } else {
                        throw new Error("Invalid map - Multiple starts: map contains more than one '@' character");
                    }
                    break;

                case end:
                    endingCharacter = true;
                    break;

                default:
                    if (!isValidMapCharacter(character)) {
                        throw new Error(`Invalid map - Map contains invalid character "${character}": valid characters are all uppercase letters (A-Z), minus (-), plus (+), pipe character (|) and 'x' as ending character.`);
                    }
            }
        });
    });

    if(startPosition === undefined) {
        throw new Error("Invalid map - There is no start character!");

    } else {
        if(!endingCharacter) {
            throw new Error("Invalid map - Missing end character");
        }
    }

    return startPosition;
};

export const isValidMapCharacter = (character: string) => /^\s*$|[A-Z]|-|\||\+|x/.test(character);

export const isVerticalDirectionCharacterValid = (character: string) =>/[A-Z]|\||\+|x/.test(character);

export const isHorizontalDirectionCharacterValid = (character: string) =>/[A-Z]|-|\+|x/.test(character);