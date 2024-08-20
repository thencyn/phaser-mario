import {  EnumImagenesEscenario, AtlasImagenesExtras, EnumSonidos, ManejarDepthMainGame, AtlasImagenes } from "../utilidades/Diccionario";
import { UtilSonido } from "../utilidades/UtilSonido";
import { MarioComponent } from "./MarioComponent";

export class BanderaComponent extends Phaser.Physics.Arcade.Sprite{
    private bandera: Phaser.GameObjects.Image;
    private particulasEmitterFuego: Phaser.GameObjects.Particles.ParticleEmitter;
    constructor(scene: Phaser.Scene, x: number, y: number, private mario: MarioComponent) {
        super(scene, x, y, EnumImagenesEscenario.FlagMast);
        this.scene.add.existing(this);
        // this.scene.physics.add.existing(this);
        this.scene.physics.add.staticGroup().add(this);

        // this.finalFlagMast.immovable = true;
        // this.finalFlagMast.allowGravity = false;
        this.setOrigin(0.5, 1);
        this.body!.setSize(3, 167);
        this.refreshBody();
        this.scene.physics.add.overlap(mario, this, null!, () => this.raiseFlag());
        // this.scene.physics.add.collider(this.platformGroup.getChildren(), this.finalFlagMast);

        this.setDepth(ManejarDepthMainGame.profundidad6);
        // this.scene.physics.add.staticGroup().add(this);
        // this.scene.physics.add.collider(this, mario, () => mario.tomarBandera());

        this.bandera = this.scene.add.image(x, y - this.displayHeight + 24, EnumImagenesEscenario.FinalFlag)
            .setDepth(ManejarDepthMainGame.profundidad7)
            .setOrigin(1, 1);
        
    }

    raiseFlag() {
        // if (flagRaised) {
        //     return false;
        // }
    
        // this.cameras.main.stopFollow();
        // this.timeLeftText.stopped = true;
        // this.musicTheme.stop();
        // this.undergroundMusicTheme.stop();
        // this.hurryMusicTheme.stop();
        // this.flagPoleSound.play();
        this.configurarEmitterFuegosArtificiales();
        const piso = this.scene.cameras.main.height - 32;
        this.mario.tomarBandera()
        UtilSonido.reproducirSonidoEfecto(this.scene, EnumSonidos.EfectoFlagpole);
        this.scene.time.delayedCall(1000, () => UtilSonido.reproducirSonidoEfecto(this.scene, EnumSonidos.MusicWin));

    
        this.scene.tweens.add({
            targets: this.bandera,
            duration: 1000,
            y: piso - 16,
        });
        // flagRaised = true;
        // playerBlocked = true;
        // return false;
        this.lanzarFuegosArtificiales();
    }

    private configurarEmitterFuegosArtificiales() {
		const rgbToHex = (r: number, g: number, b: number) => {
			const hexString = [r, g, b]
				.map((n) => {
					const hex = n.toString(16);
					return hex.length === 1 ? "0" + hex : hex;
				})
				.join("");
			return parseInt(hexString, 16);
		};
		const tintMin = rgbToHex(0, 0, 0);
		const tintMax = rgbToHex(255, 255, 255);
		this.particulasEmitterFuego = this.scene.add.particles(0, 0, AtlasImagenes.Extras, {
			frame: AtlasImagenesExtras.FuegoBlanco,
			tint: {
				min: tintMin,
				max: tintMax
			},
			lifespan: 1500,
			speed: { min: 75, max: 125 },
			scale: { start: 0.75, end: 0 },
			gravityY: 175,
			blendMode: Phaser.BlendModes.ADD,
			emitting: false
		}).setDepth(ManejarDepthMainGame.profundidad7);
	}

	private lanzarFuegosArtificiales() {
        const posInicioX = this.mario.x - (this.scene.cameras.main.displayWidth / 2);
        const posFinX = this.mario.x + (this.scene.cameras.main.displayWidth / 2);
		this.particulasEmitterFuego.explode(16, Phaser.Math.Between(posInicioX, posFinX), Phaser.Math.Between(0, this.scene.cameras.main.displayHeight / 2));
		this.particulasEmitterFuego.explode(16, Phaser.Math.Between(posInicioX, posFinX), Phaser.Math.Between(0, this.scene.cameras.main.displayHeight / 2));
        this.scene.time.delayedCall(1000, () => this.lanzarFuegosArtificiales());
	}
}