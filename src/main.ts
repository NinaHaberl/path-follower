/**
 * Software Sauna Code Challenge: Follow a path of characters & collect letters
 *
 */

import * as maps from "./map/examples";
import {validateMapAndFindStartingPosition} from "./map/validate";
import {collectLettersAndFollowPath} from "./path/collector";

const map = maps.aroundStartPretzel;
const startPosition = validateMapAndFindStartingPosition(map);

let output = collectLettersAndFollowPath(map, startPosition);
console.log(`Collected letters: ${output.letters}`);
console.log(`Path as characters: ${output.path}`);

