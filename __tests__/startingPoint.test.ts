import { findStartingPoint } from '../your-file-path'; // Zamijenite s vašim putem do fajla
import { MapOfCharacters } from '../your-file-path'; // Importirajte MapOfCharacters ako je definiran u drugom fajlu

const sampleMap: MapOfCharacters[][] = [
    [" ", " ", "@", "-", "-", "-", "A", "-", "-", "-", "+",],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|",],
    [" ", " ", "x", "-", "B", "-", "+", " ", " ", " ", "C",],
    [" ", " ", " ", " ", " ", " ", "|", " ", " ", " ", "|",],
    [" ", " ", " ", " ", " ", " ", "+", "-", "-", "-", "+",],
];

describe('findStartingPoint function', () => {
    it('should return correct starting point', () => {
        const result = findStartingPoint(sampleMap);
        expect(result).toEqual({ row: 0, column: 2 });
    });

    it('should return null when starting point is missing', () => {
        const result = findStartingPoint([]);
        expect(result).toBeNull();
    });
});
