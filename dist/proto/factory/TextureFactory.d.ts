import { AssetsManager, Texture } from "@thetinyspark/moocaccino-barista";
export default class TextureFactory {
    private _textures;
    private _data;
    constructor();
    init(manager: AssetsManager): void;
    private _createTextures;
    getData(): Map<string, any>;
    getTextureByID(id: string): Texture | null;
}
