import {MapOfCharacters} from "../src/types";
import * as maps from "../src/map/examples";
import {checkSurroundingCells} from "../src/path/direction";

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