import { EnumSonidos, EnumSpriteImagenes, EnumSpriteImagenesAnimaciones, ManejarDepthMainGame } from "../utilidades/Diccionario";
import { UtilSonido } from "../utilidades/UtilSonido";

export class GoombaComponent extends Phaser.Physics.Arcade.Sprite{
    private velocidad: number = -50;
    constructor(scene: Phaser.Scene, x: number, y: number, private escenario: Phaser.Physics.Arcade.StaticGroup) {
        super(scene, x, y, EnumSpriteImagenes.OverworldGoomba);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setOrigin(0, 1)
        this.setCollideWorldBounds(false)
        this.setGravityY(300)
        this.setVelocityX(this.velocidad);
        this.setBounce(1, 0);
        this.setDepth(ManejarDepthMainGame.profundidad7);
        this.scene.physics.add.collider(this, this.escenario);
        this.anims.play(EnumSpriteImagenesAnimaciones.GoombaWalk, true);
    }

    morirAplastado() {
        UtilSonido.reproducirSonidoEfecto(this.scene, EnumSonidos.EfectoGoombaStomp);
        this.anims.play(EnumSpriteImagenesAnimaciones.GoombaHurt, true);
        // this.body!.checkCollision.none = true;
        // this.body!.setSize(0, 0);
        // this.disableBody(true, true);
        this.setVelocityX(0);
        // marioComponent.play(EnumSpriteImagenesAnimaciones.MarioJump, true);
        // marioComponent.setVelocityY(-250);
        // marioComponent.addToScore(200);
        this.scene.time.delayedCall(500, () => { this.destroy() });
    }
}