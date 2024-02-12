import { ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
/**
 * Set fighters paths
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
export default class SetFightersPathCommand implements ICommand {
    execute(notification: INotification): boolean;
}
