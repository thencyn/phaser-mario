import { EnumImagenes, EstadoMario, ManejarDepthMainGame } from "../utilidades/Diccionario";
import { MarioComponent } from "./MarioComponent";

export class MushroomSuperJumpComponent extends Phaser.Physics.Arcade.Sprite{
    private velocidad: number = 60;
    constructor(scene: Phaser.Scene, x: number, y: number, private escenario: Phaser.Physics.Arcade.StaticGroup, private mario: MarioComponent) {
        super(scene, x, y, EnumImagenes.ColeccionablesExtraSuperJumpChampinon);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // this.setOrigin(0, 1)
        this.setCollideWorldBounds(false);
        // this.setGravityY(300);
        // this.setVelocityX(this.velocidad);
        this.setBounce(1, 0);
        this.setDepth(ManejarDepthMainGame.profundidad7 - 1);//Para que salga por detras del bloque misterioso
        this.scene.physics.add.collider(this, this.escenario);
        this.aparecer();
    }

    private aparecer() {
        this.scene.tweens.add({
            targets: this,
            duration: 400,
            y: this.y - this.height,
            onComplete: () => {
                this.scene.physics.add.overlap(this.mario, this, () => {
                    this.destroy();
                    this.mario.recogerPowerUp(EstadoMario.SuperJump);
                });
                this?.setVelocityX(this.velocidad)
            },
        });
    }
}