import {  EnumImagenesEscenario } from "../utilidades/Diccionario";

//La ide de este componente seria utilizarla para entrar en la tuberia (los bonus secretos)
export class TuberiaComponent extends Phaser.Physics.Arcade.Sprite{
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, EnumImagenesEscenario.VerticalLargeTube2);
        this.scene.add.existing(this);
        this.scene.physics.add.staticGroup().add(this);
        // this.scene.physics.add.existing(this);
        // this.setOrigin(0, 1)
    }
}
