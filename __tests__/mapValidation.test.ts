import * as valid from '../maps/valid';
import * as invalid from '../maps/invalid';
import {validateMapAndFindStartingPosition} from "../src/main";

const mapsToValidate = [
    valid.minimumMap,
    valid.basicExample,
    invalid.multipleStartA,
    invalid.multipleStartB,
    invalid.multipleStartC
];

describe('validateMapAndFindStartingPosition function', () => {
    test('should validate map and return the starting position of @ character' +
        ' or throw error if map is not valid', () => {

        let result;

        mapsToValidate.forEach(map => {
            try {
                result = validateMapAndFindStartingPosition(map);
                expect(result?.row).toBeGreaterThanOrEqual(0);
                expect(result?.column).toBeGreaterThanOrEqual(0);
            } catch {
                expect(() => {
                    validateMapAndFindStartingPosition(map);
                }).toThrow();
            }
        })
    })
});