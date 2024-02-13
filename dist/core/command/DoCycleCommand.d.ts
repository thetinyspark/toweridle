import { ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import { GameOverInfoType } from "../model/types/GameOverInfoType";
/**
 * process an entire cycle
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
export default class DoCycleCommand implements ICommand {
    execute(notification: INotification): Promise<GameOverInfoType | boolean>;
    private _processCycle;
}
