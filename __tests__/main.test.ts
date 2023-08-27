import * as maps from '../src/map/examples';
import {validateMapAndFindStartingPosition} from "../src/map/validate";
import {collectLettersAndFollowPath} from "../src/path/collector";

const mapsToValidate = [
    maps.minimumMap,
    maps.ignoreAfterX,
    maps.basicExample,
    maps.intersectionVerA,
    maps.intersectionVerB,
    maps.lettersOnTurns,
    maps.lettersOnTurnsVerB,
    maps.lettersOnTurnsWithIntersection,
    maps.goonies,
    maps.compactMap,
    maps.compactMapWithLetterOnTurn,

    maps.multipleStartA,
    maps.multipleStartB,
    maps.multipleStartC,
    maps.multipleStartingPathsVerA,
    maps.multipleStartingPathsVerB,
    maps.multipleStartingPathsVerC,
    maps.forkInPathVerA,
    maps.forkInPathVerB,
    maps.brokenPath,
    maps.brokenPathVerB,
    maps.xMissing,
    maps.startMissingVerA,
    maps.startMissingVerB,
    maps.fakeTurnVerA,
    maps.fakeTurnVerB

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

describe('collectLettersAndFollowPath function', () => {
    test('should follow the path and return collected letters and path characters' +
        ' or throw error if path breaks rules', () => {

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