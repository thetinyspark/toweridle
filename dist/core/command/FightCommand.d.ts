import { ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
/**
 * Proceed a fight attackers & defenders
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
export default class FightCommand implements ICommand {
    execute(notification: INotification): boolean;
}
