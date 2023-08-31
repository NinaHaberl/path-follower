import * as maps from '../src/map/examples';
import {
    isValidMapCharacter,
    isVerticalDirectionCharacterValid,
    isHorizontalDirectionCharacterValid,
    validateMapAndFindStartingPosition
} from "../src/map/validate";
import {collectLettersAndFollowPath} from "../src/path/collector";

describe('collectLettersAndFollowPath function', () => {
    test('should throw error if map has multiple start, missing start or missinig end character', () => {

        const map = maps.multipleStartA;
        expect(() => {
            validateMapAndFindStartingPosition(map);
        }).toThrow();
    })
});

describe('collectLettersAndFollowPath function', () => {
    test('should validate map and return the starting position of @ character', () => {

        const map = maps.basicExample;
        const result = validateMapAndFindStartingPosition(map);
        expect(result?.row).toBeGreaterThanOrEqual(0);
        expect(result?.column).toBeGreaterThanOrEqual(0);
    })
});

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

describe('isValidMapCharacter function', () => {
    test('should allow uppercase characters', () => {

        const upperCaseLetters: string[] = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
        upperCaseLetters.forEach(character => {
            expect(isValidMapCharacter(character)).toBeTruthy();
        })
    }), test('should allow special characters', () => {

        ['-', '+', '|'].forEach(character => {
            expect(isValidMapCharacter(character)).toBeTruthy();
        })
    })
});

describe('isVerticalDirectionCharacterValid function', () => {
    test('should allow uppercase characters', () => {

        const upperCaseLetters: string[] = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
        upperCaseLetters.forEach(character => {
            expect(isVerticalDirectionCharacterValid(character)).toBeTruthy();
        })
    }), test('should allow special characters', () => {

        ['|', 'x'].forEach(character => {
            expect(isVerticalDirectionCharacterValid(character)).toBeTruthy();
        })
    })
});

describe('isHorizontalDirectionCharacterValid function', () => {
    test('should allow uppercase characters', () => {

        const upperCaseLetters: string[] = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
        upperCaseLetters.forEach(character => {
            expect(isHorizontalDirectionCharacterValid(character)).toBeTruthy();
        })
    }), test('should allow special characters', () => {

        ['-', 'x'].forEach(character => {
            expect(isHorizontalDirectionCharacterValid(character)).toBeTruthy();
        })
    })
});