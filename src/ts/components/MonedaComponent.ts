import {  EnumEventos, EnumSonidos, EnumSpriteImagenes, EnumSpriteImagenesAnimaciones, ManejarDepthMainGame  } from "../utilidades/Diccionario";
import { UtilSonido } from "../utilidades/UtilSonido";

export class MonedaComponent extends Phaser.Physics.Arcade.Sprite{
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, EnumSpriteImagenes.ColeccionablesMonedaOverworld);
        this.scene.add.existing(this);
        this.scene.physics.add.staticGroup().add(this);
        this.setDepth(ManejarDepthMainGame.profundidad7);
        
        this.anims.play(EnumSpriteImagenesAnimaciones.CoinIdle, true);
    }

    recogerMoneda() {
        UtilSonido.reproducirSonidoEfecto(this.scene, EnumSonidos.EfectoCoin);
        this.scene.registry.events.emit(EnumEventos.MonedasActualizar);
        this.destroy();
    }
}