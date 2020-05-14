"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testData = void 0;
var testData = /** @class */ (function () {
    function testData() {
    }
    testData.prototype.addPlayer = function (player) {
        return this._players.push(player) - 1;
    };
    testData.prototype.removePlayer = function (playerIndex) {
        var newPlayers = [];
        this._players.forEach(function (player, index) { if (playerIndex != index) {
            newPlayers.push(player);
        } });
        this._players = newPlayers;
        return this._players.length;
    };
    return testData;
}());
exports.testData = testData;
//# sourceMappingURL=testData.js.map