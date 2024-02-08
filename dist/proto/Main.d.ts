import { INotification } from "@thetinyspark/moocaccino-barista";
export default class Main {
    private _battleField;
    private _textureFactory;
    private _spriteFactory;
    private _stage;
    private _assetsManager;
    private _level;
    private _gameOver;
    start(): void;
    simulate(): void;
    cycleLoop(): void;
    gameOverHandler(notif: INotification): void;
    renderLoop(): void;
    load(): Promise<void>;
    onComplete(): void;
}
