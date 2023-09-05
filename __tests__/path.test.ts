import * as maps from "../src/map/examples";
import {Direction} from "../src/types";
import {getCurrentCellValue, getSurroundingCells, setNextCellValue} from "../src/path/direction";
import {getNextCell, getPositionRules, isUppercase} from "../src/path/collector";

describe('checkSurroundingCells function', () => {
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

describe('isUppercase function', () => {
    it('should return true for uppercase characters', () => {
        expect(isUppercase('A')).toBe(true);
        expect(isUppercase('D')).toBe(true);
        expect(isUppercase('Z')).toBe(true);
    });

    it('should return false for lowercase characters and non-alphabet characters', () => {
        expect(isUppercase('x')).toBe(false);
        expect(isUppercase('+')).toBe(false);
        expect(isUppercase('|')).toBe(false);
        expect(isUppercase('-')).toBe(false);
    });
});