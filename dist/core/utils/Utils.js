"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static getInRadius(grid, fromRow, fromCol, radius) {
        const results = [];
        const minRow = (fromRow - radius) < 0 ? 0 : (fromRow - radius);
        const minCol = (fromCol - radius) < 0 ? 0 : (fromCol - radius);
        const maxRow = (fromRow + radius + 1) > grid.numRows ? grid.numRows : (fromRow + radius + 1);
        const maxCol = (fromCol + radius + 1) > grid.numCols ? grid.numCols : (fromCol + radius + 1);
        for (let i = minRow; i < maxRow; i++) {
            for (let j = minCol; j < maxCol; j++) {
                if (i === fromRow && j === fromCol)
                    continue;
                results.push(grid.getAt(i, j));
            }
        }
        return results;
    }
    static getEnnemiesInRadius(ennemies, fromRow, fromCol, radius) {
        const minRow = (fromRow - radius);
        const minCol = (fromCol - radius);
        const maxRow = (fromRow + radius);
        const maxCol = (fromCol + radius);
        return ennemies.filter((enemy) => {
            return !(enemy.col < minCol ||
                enemy.col > maxCol ||
                enemy.row < minRow ||
                enemy.row > maxRow);
        });
    }
    static getClosestEnemyIn(ennemies, fromRow, fromCol) {
        let minDist = Infinity;
        let enemy = null;
        for (let i = 0; i < ennemies.length; i++) {
            const distRow = ennemies[i].row - fromRow;
            const distCol = ennemies[i].col - fromCol;
            const dist = Math.sqrt((distRow * distRow) + (distCol * distCol));
            if (dist < minDist) {
                minDist = dist;
                enemy = ennemies[i];
            }
        }
        return enemy;
    }
}
exports.default = Utils;
