import * as maps from "../src/map/examples";
import {Direction} from "../src/types";
import {getCurrentCellValue, getSurroundingCells, setNextCellValue} from "../src/path/direction";
import {getNextCell} from "../src/path/collector";

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
        const map: string[][] = maps.basicExample;
        let position = {row: 0, column: 7};
        let pathDirection = Direction.Right;
        let [right, down, left, up] = getSurroundingCells(map, position);

        let result = getNextCell(pathDirection, right, left, down, up);
        expect(result).toBe(right);

        // switch (Direction) {
        //     case Direction.Right:
        //         result = right;
        //         break;
        //     case Direction.Down:
        //         result = down;
        //         break;
        //     case Direction.Left:
        //         result = left;
        //         break;
        //     case Direction.Up:
        //         result = up;
        //         break;
        // }
    });
});
