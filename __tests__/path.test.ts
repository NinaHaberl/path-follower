import * as maps from "../src/map/examples";
import {Direction, Position} from "../src/types";
import {collectLettersAndFollowPath, getNextCell, getPositionRules,} from "../src/path/collector";

import {
    checkLShapedFork,
    checkTShapedFork,
    getCurrentCellValue,
    getNewPosition,
    getSurroundingCells,
    makeTurn,
    setNextCellValue,
} from "../src/path/direction";

import {validateMapAndFindStartingPosition} from "../src/map/validate";

const verticalRule: RegExp = /[A-Z]|\||\+|x/;
const horizontalRule: RegExp = /[A-Z]|-|\+|x/;

describe('collectLettersAndFollowPath function', () => {
    test('should follow the path and return collected letters and path characters', () => {

        const map = maps.basicExample;
        const startPosition = validateMapAndFindStartingPosition(map);
        const result = collectLettersAndFollowPath(map, startPosition);

        expect(() => {
            expect(result).toHaveProperty("letters");
            expect(result).toHaveProperty("path");
            expect(typeof result.letters).toBe("string");
            expect(typeof result.path).toBe("string");
        });
    })
});

describe('getSurroundingCells function', () => {
    test('check surrounding cells and return the value of each cell: ' +
        'out of boundaries cells are undefined', () => {

        const map = maps.intersectionVerA;
        const result = getSurroundingCells(map, {row: 1, column: 2});

        let expectedValues: [string | undefined, string | undefined, string | undefined, string | undefined] = [
            "-", "|", " ", " "
        ];

        expect(result).toEqual(expectedValues);
    });
});

describe('getNewPosition function', () => {

    const position: Position = {
        row: 2,
        column: 5
    };

    it('should move right', () => {
        const newPosition = getNewPosition(Direction.Right, position);
        expect(newPosition.row).toEqual(2);
        expect(newPosition.column).toEqual(6);
    });

    it('should move down', () => {
        const newPosition = getNewPosition(Direction.Down, position);
        expect(newPosition.row).toEqual(3);
        expect(newPosition.column).toEqual(5);
    });

    it('should move left', () => {
        const newPosition = getNewPosition(Direction.Left, position);
        expect(newPosition.row).toEqual(2);
        expect(newPosition.column).toEqual(4);
    });

    it('should move up', () => {
        const newPosition = getNewPosition(Direction.Up, position);
        expect(newPosition.row).toEqual(1);
        expect(newPosition.column).toEqual(5);
    });
});

describe('setNextCellValue function', () => {
    test('should return the value of the cell at the given offset', () => {
        const map: string[][] = maps.basicExample;

        let result: string = setNextCellValue(map, 0, 8, 1, 0);
        expect(result).toBe("|");
    });
});

describe('getCurrentCellValue function', () => {
    test('should return the value of current cell', () => {
        const map: string[][] = maps.basicExample;

        let result: string = getCurrentCellValue(map, 0, 8);
        expect(result).toBe("+");
    });
});

describe('getNextCell function', () => {
    test('should return the value of next cell', () => {
        const right = '-';
        const left = '|';
        const down = '-';
        const up = '-';

        expect(getNextCell(Direction.Right, right, left, down, up)).toBe(right);
        expect(getNextCell(Direction.Left, right, left, down, up)).toBe(left);
        expect(getNextCell(Direction.Down, right, left, down, up)).toBe(down);
        expect(getNextCell(Direction.Up, right, left, down, up)).toBe(up);
    });
});

describe('getPositionRules', () => {
    test('should return a map with the specified rules for each direction', () => {
        const verticalRule: RegExp = /[A-Z]|\||\+|x/;
        const horizontalRule: RegExp = /[A-Z]|-|\+|x/;

        const positionRules = getPositionRules(horizontalRule, verticalRule);

        expect(positionRules.get(Direction.Right)).toBe(horizontalRule);
        expect(positionRules.get(Direction.Left)).toBe(horizontalRule);
        expect(positionRules.get(Direction.Down)).toBe(verticalRule);
        expect(positionRules.get(Direction.Up)).toBe(verticalRule);
    });
});

describe('checkLShapedFork function', () => {

    it('should throw an error for an L-shaped fork in the right direction', () => {

        const right = '-';
        const down = '|';
        const left = '-';
        const up = ' ';

        expect(() => {
            checkLShapedFork(Direction.Right, verticalRule, horizontalRule, right, down, left, up);
        }).toThrowError('Invalid map: Fork in path - L shaped fork');
    });

    it('should throw an error for an L-shaped fork in the left direction', () => {

        const right = '-';
        const down = ' ';
        const left = '-';
        const up = '|';

        expect(() => {
            checkLShapedFork(Direction.Left, verticalRule, horizontalRule, right, down, left, up);
        }).toThrowError('Invalid map: Fork in path - L shaped fork');
    });

    it('should throw an error for an L-shaped fork in the down direction', () => {

        const right = ' ';
        const down = 'B';
        const left = '-';
        const up = '|';

        expect(() => {
            checkLShapedFork(Direction.Down, verticalRule, horizontalRule, right, down, left, up);
        }).toThrowError('Invalid map: Fork in path - L shaped fork');
    });

    it('should throw an error for an L-shaped fork in the up direction', () => {

        const right = '-';
        const down = '@';
        const left = ' ';
        const up = 'C';

        expect(() => {
            checkLShapedFork(Direction.Up, verticalRule, horizontalRule, right, down, left, up);
        }).toThrowError('Invalid map: Fork in path - L shaped fork');
    });
});

describe('checkTShapedFork function', () => {
    it('should throw an error for a T-shaped fork in the right direction', () => {

        const right = ' ';
        const down = '|';
        const left = '-';
        const up = 'A';

        expect(() => {
            checkTShapedFork(Direction.Right, verticalRule, horizontalRule, right, down, left, up);
        }).toThrowError('Invalid map: Fork in path - T shaped fork');
    });

    it('should throw an error for a T-shaped fork in the left direction', () => {

        const right = ' ';
        const down = '|';
        const left = '-';
        const up = 'A';

        expect(() => {
            checkTShapedFork(Direction.Left, verticalRule, horizontalRule, right, down, left, up);
        }).toThrowError('Invalid map: Fork in path - T shaped fork');
    });

    it('should throw an error for a T-shaped fork in the down direction', () => {

        const right = 'A';
        const down = ' ';
        const left = '-';
        const up = 'A';

        expect(() => {
            checkTShapedFork(Direction.Down, verticalRule, horizontalRule, right, down, left, up);
        }).toThrowError('Invalid map: Fork in path - T shaped fork');
    });

    it('should throw an error for a T-shaped fork in the up direction', () => {

        const right = '+';
        const down = '|';
        const left = '-';
        const up = ' ';

        expect(() => {
            checkTShapedFork(Direction.Up, verticalRule, horizontalRule, right, down, left, up);
        }).toThrowError('Invalid map: Fork in path - T shaped fork');
    });
});

describe('makeTurn function', () => {
    it('should make down turn when direction is right and top cell is undefined or empty', () => {
        const result = makeTurn(undefined, 'B', '-', undefined, Direction.Right, verticalRule, horizontalRule);
        expect(result).toBe(Direction.Down);
    });

    it('should make down turn when direction is left and top cell is undefined or empty', () => {
        const result = makeTurn('B', 'B', '-', undefined, Direction.Left, verticalRule, horizontalRule);
        expect(result).toBe(Direction.Down);
    });

    it('should make left turn when direction is up and right cell is undefined or empty', () => {
        const result = makeTurn(' ', '|', '-', undefined, Direction.Up, verticalRule, horizontalRule);
        expect(result).toBe(Direction.Left);
    });

    it('should throw an error for broken path after horizontal turn', () => {
        expect(() => {
            makeTurn(' ', '|', ' ', undefined, Direction.Up, verticalRule, /_/);
        }).toThrowError('Invalid map - Broken path after horizontal turn');
    });
});
