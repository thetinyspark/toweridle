import { ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
/**
 * removes dead fighters from battlefield
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
export default class RemoveDeadFightersCommand implements ICommand {
    execute(notification: INotification): boolean;
}
