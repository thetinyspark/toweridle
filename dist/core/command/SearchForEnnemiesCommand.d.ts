import { ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
/**
 * each fighter tries to find the closest ennemy inside its radius
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
export default class SearchForEnnemiesCommand implements ICommand {
    execute(notification: INotification): boolean;
}
