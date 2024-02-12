import { Grid2D } from "../../common/model/space/partitioning/grid";
import Fighter from "../model/schema/Fighter";
export default class Utils {
    static getInRadius<T>(grid: Grid2D<T>, fromRow: number, fromCol: number, radius: number): T[];
    static getEnnemiesInRadius(ennemies: Fighter[], fromRow: number, fromCol: number, radius: number): Fighter[];
    static getClosestEnemyIn(ennemies: Fighter[], fromRow: number, fromCol: number): Fighter;
}
