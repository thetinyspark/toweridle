import { ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
/**
 * Remove all attackers that passes the door (aka winners)
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
export default class RemoveWinnersCommand implements ICommand {
    execute(notification: INotification): boolean;
}
