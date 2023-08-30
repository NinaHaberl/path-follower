"use strict";
/**
 * Software Sauna Code Challenge: Follow a path of characters & collect letters
 *
 */
exports.__esModule = true;
var maps = require("./map/examples");
var validate_1 = require("./map/validate");
var collector_1 = require("./path/collector");
var map = maps.forkInPathLetterOnTurn;
var startPosition = validate_1.validateMapAndFindStartingPosition(map);
var output = collector_1.collectLettersAndFollowPath(map, startPosition);
console.log("Collected letters: " + output.letters);
console.log("Path as characters: " + output.path);
