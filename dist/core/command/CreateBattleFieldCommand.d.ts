import { ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import BattleField from "../model/schema/BattleField";
/**
 * Load battlefied configuration and creates a battlefield
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
export default class CreateBattleFieldCommand implements ICommand {
    execute(notification: INotification): boolean | BattleField;
}
