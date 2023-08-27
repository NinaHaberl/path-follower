import {Direction, MapOfCharacters, Position} from "../src/types";
import * as maps from "../src/map/examples";
import {checkSurroundingCells, getCurrentCellValue, setNextCellValue} from "../src/path/direction";

describe('checkSurroundingCells function', () => {
    test('check surrounding cells and return the value of each cell: ' +
        'out of boundaries cells are undefined', () => {

        const map = maps.intersectionVerA;
        const result = checkSurroundingCells(map, 1, 2);

        let expectedValues: [MapOfCharacters | undefined, MapOfCharacters | undefined, MapOfCharacters | undefined, MapOfCharacters | undefined] = [
            "-", "|", " ", " "
        ];

        expect(result).toEqual(expectedValues);
    });
});

describe('setNextCellValue function', () => {
    test('should return the value of the cell at the given offset', () => {
        const map: MapOfCharacters[][] = maps.basicExample;

        let result: MapOfCharacters = setNextCellValue(map, 0, 8, 1, 0);
        expect(result).toBe("|");
    });
});

describe('getCurrentCellValue function', () => {
    test('should return the value of current cell', () => {
        const map: MapOfCharacters[][] = maps.basicExample;

        let result: MapOfCharacters = getCurrentCellValue(map, 0, 8);
        expect(result).toBe("+");
    });
});