import { ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
/**
 * Creates new fighters according to spawners configuration
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
export default class SpawnNewFightersCommand implements ICommand {
    execute(notification: INotification): boolean;
}
