// type MapOfCharacters = "@" | "-" | "+" | "|" | "x" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
type MapOfCharacters = "@" | "-" | "+" | "|" | "x" | string;

const map: MapOfCharacters[][] = [
    ["@", "-", "-", "-", "A", "-", "-", "-", "+",],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|",],
    ["x", "-", "B", "-", "+", " ", " ", " ", "C",],
    [" ", " ", " ", " ", "|", " ", " ", " ", "|",],
    [" ", " ", " ", " ", "+", "-", "-", "-", "+",],
];

// Ispisivanje mape
for (const row of map) {
    console.log(row.join(''));
}