import * as maps from "../src/map/examples";
import {getSurroundingCells, getCurrentCellValue, setNextCellValue} from "../src/path/direction";

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
