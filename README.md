# Path Follower - Code Challenge
## What you are looking at
A piece of code written in TypeScript that takes a map of characters as an input
and outputs the collected letters and the list of characters of the travelled path.
Tests are written in Jest, and can be found in the __tests__ directory.

Input:
- a 2-dimensional map of characters ([check examples.ts file](https://github.com/NinaHaberl/path-follower/src/map/examples.ts))
- the only valid characters are all uppercase letters (A-Z), plus '+', minus '-' and pipe '|'
sign. '@' represents a starting character and 'x' ending character
- turns can be letters or '+'

Output:
- Collected letters
- Path as characters

## Usage
- open main.ts file in your IDE
- change map name you want to test (map examples are in map directory; also you can create your own map)
- compile and run

## Map Examples
Here are examples of all maps I was working with and expected results.
### Valid maps
**Minimum valid map: Contains only start and stop character**
```
@x
```
Expected result:
- Collected letters:
- Path as characters: `@x`

**A basic example**
```
    @-A-+
        |
        |
x-B-+   C
    |   |
    +---+
```
Expected result:
- Collected letters: `ACB`
- Path as characters: `@-A-+||C|+---+|+-B-x`
# 
**Ignore stuff after end of path**
```
    @-A-+
        |
        |
B-x-+   C
    |   |
    +---+
```
Expected result:
- Collected letters: `AC`
- Path as characters: `@-A-+||C|+---+|+-x`
# 
**Go straight through intersections**
```
    @
    | +-C--+
    A |    |
    +---B--+
      |      x 
      |      |
      +---D--+
```
Expected result:
- Collected letters: `ABCD`
- Path as characters: `@|A+---B--+|+--C-+|-||+---D--+|x`
# 
```
    @
    | +-C--+
    A |    |
    +---B--+  +-+ 
      |       | |
      |     x-|-+
      +---D---+
```
Expected result:
- Collected letters: `ABCD`
- Path as characters: `@|A+---B--+|+--C-+|-||+---D---+||+-+|+-|-x`
# 
**Letters may be found on turns**
```
    @--A---+
           |
    x-B+   |
       |   |
       +---C
```
Expected result:
- Collected letters: `ACB`
- Path as characters: `@--A---+|||C---+|+B-x`
# 
```
   @--C---+
          |
   x-L+   |
      |   |
      O---O
```
Expected result:
- Collected letters: `COOL`
- Path as characters: `@--C---+|||O---O|+L-x`
# 
**Do not collect a letter from the same location twice**
```
        +-O-N-+
        |     |
        |   +-I-+
    @-G-O-+ | | |
        | | +-+ E
        +-+     S
                |
                x
```
Expected result:
- Collected letters: `GOONIES`
- Path as characters: `@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x`
# 
```
   @
   | +-E--+
   A |    |
   B-C-D--+  +-+
     |       | |
     |     x-|-+
     F---G---+
```
Expected result:
- Collected letters: `ABCDEFG`
- Path as characters: `@|AB-C-D--+|+--E-+|C||F---G---+||+-+|+-|-x`
# 
**Keep direction, even in a compact space**
```
    +-L-+
    |  +A-+
   @B+ ++ H
    ++    x
```
Expected result:
- Collected letters: `BLAH`
- Path as characters: `@B+++B|+-L-+A+++A-+Hx`
# 
```
    +-L-+
    |  +A-+
   @B+ +W H
    ++    x
```
Expected result:
- Collected letters: `BLAWH`
- Path as characters: `@B+++B|+-L-+AW++A-+Hx`

### Invalid maps
**Multiple starts**
```
    @--A@--+
           |
   x-B-+   C
       |   |
       +---+
```
```
       @--A---+
              |
              C
              x
         @-B--+
```
```
       @--A--x
     
      x-B-+
          |
          @
```
Expected result:
- Error: `Invalid map - Multiple starts: map contains more than one '@' character`
# 
**Multiple starting paths**
```
     x-@--A-x
```
```
    +--A--x
    @
    |
    +--x
```
```
      +--A--x
    x-@
```
Expected result:
- Error: `Invalid map - Multiple starting paths`
# 
**Fork in path**
```
    x---E--B
           |
     @--A--+
           |
           |
     xF----+
```
```
     @--A--+-x
           |
           |
     xF----+
```
Expected result:
- Error: `Invalid map - Fork in path`
# 
**Broken path**
```
        @-A-+
            |
          
    x-B-+   C
        |   |
        +---+
```
```
        @-A-+
     
            |
    x-B-+   C
        |   |
        +---+
```
```
        @-A-+
            |
            |
    x-B-    C
        |   |
        +---+
```
Expected result:
- Error: `Invalid map - Broken path`
# 
**Missing start character**
```
     -A---+
          |
   -B-+   C
      |   |
      +---+
```
```
     -A---+
          |
  x-B-+   C
      |   |
      +---+
```
Expected result:
- Error: `Invalid map - There is no start character!`
# 
**Missing end character**
```
    @-A---+
          |
   -B-+   C
      |   |
      +---+
```
Expected result:
- Error: `Invalid map - Missing end character`
# 
**Fake turn**
```
  @-A+-B-x
```
```
    @
    |
    B
    +
    A
    x
```
Expected result:
- Error: `Fake turn`