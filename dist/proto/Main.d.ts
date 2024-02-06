export default class Main {
    private _battleField;
    private _textureFactory;
    private _spriteFactory;
    private _stage;
    private _assetsManager;
    start(): void;
    renderLoop(): void;
    load(): Promise<void>;
    onComplete(): void;
}
