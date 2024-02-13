import { ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import { GameOverInfoType } from "../model/types/GameOverInfoType";
/**
 * Returns info about game over
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
export default class GameOverCommand implements ICommand {
    execute(notification: INotification): GameOverInfoType;
}
