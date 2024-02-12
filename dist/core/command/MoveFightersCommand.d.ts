import { ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
/**
 * Move all fighters
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
export default class MoveFightersCommand implements ICommand {
    execute(notification: INotification): boolean;
}
