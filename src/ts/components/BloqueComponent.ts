import { EnumEventos, EnumImagenesBloques, EnumSonidos, EnumSpriteImagenes, EnumSpriteImagenesAnimaciones, EstadoMario, ManejarDepthMainGame } from "../utilidades/Diccionario";
import { UtilSonido } from "../utilidades/UtilSonido";
import { MarioComponent } from "./MarioComponent";

export class BloqueComponent extends Phaser.Physics.Arcade.Sprite {
    monedaObtenida: boolean = false;
    particulaRomper: Phaser.GameObjects.Particles.ParticleEmitter;
    constructor(scene: Phaser.Scene, x: number, y: number, private mario: MarioComponent, private moneda: boolean = false) {
        super(scene, x, y, EnumImagenesBloques.OverworldBlock);
        this.scene.add.existing(this);
        this.scene.physics.add.staticGroup().add(this);
        this.setDepth(ManejarDepthMainGame.profundidad7);
        this.body = this.body as Phaser.Physics.Arcade.Body;
        this.scene.physics.add.collider(mario, this, () => this.colision());
        this.particulaRomper = this.scene.add.particles(0, 0, EnumSpriteImagenes.BlocksOverworldBrickDebris, {
			angle: { start: 0, end: 360, steps: 12 },
			lifespan: 750,
			speed: 100,
			quantity: 12,
			scale: { start: 0.75, end: 0 },
			emitting: false
		}).setDepth(ManejarDepthMainGame.profundidad7);
    }

    private colision() {
        if (this.mario.body.touching.up && this.body!.touching.down) {
            if (this.moneda && !this.monedaObtenida) {
                this.obtenerMoneda();
            }
            
            if (!this.moneda) {
                if (this.mario.estadoMario === EstadoMario.Normal) {
                    this.moverHaciaArriba();
                } else {
                    this.romper();
                }
            }
        }
    }

    obtenerMoneda() {
        this.monedaObtenida = true;
        const moneda = this.scene.add.sprite(this.x, this.y - this.height, EnumSpriteImagenes.ColeccionablesMonedaOverworld)
            .play(EnumSpriteImagenesAnimaciones.CoinIdle, true)
            .setDepth(ManejarDepthMainGame.profundidad7);
        
        this.scene.tweens.add({
            targets: moneda,
            duration: 200,
            y: this.y - this.height * 3,
            yoyo: true,
            onComplete: () => { moneda.destroy() }
        });
        this.play(EnumSpriteImagenesAnimaciones.CustomBlockDefault, true);
        UtilSonido.reproducirSonidoEfecto(this.scene, EnumSonidos.EfectoCoin);
        this.scene.registry.events.emit(EnumEventos.MonedasActualizar);
    }

    romper() {
        this.visible = false;
        this.body!.checkCollision.none = true; //Con esto mario no golpeara 2 veces el objeto si lo hace rapido
        //Si bien prefiero el uso de particulas para la rotura de bloques, se puede hacer lo que uno quiera aca (ver el else )
        //Se mostrara la animacion aleatoria de particulas o se crearan 4 piezas que se alejaran
        if (Phaser.Math.Between(0, 1) === 0) {
            this.particulaRomper.emitParticleAt(this.getCenter().x, this.getCenter().y);
        } else {
            const piece1 = this.scene.add.image(this.x - 16, this.y - 16, EnumSpriteImagenes.BlocksOverworldBrickDebris).setDepth(ManejarDepthMainGame.profundidad7);
            const piece2 = this.scene.add.image(this.x + 16, this.y - 16, EnumSpriteImagenes.BlocksOverworldBrickDebris).setDepth(ManejarDepthMainGame.profundidad7);
            const piece3 = this.scene.add.image(this.x - 16, this.y + 16, EnumSpriteImagenes.BlocksOverworldBrickDebris).setDepth(ManejarDepthMainGame.profundidad7);
            const piece4 = this.scene.add.image(this.x + 16, this.y + 16, EnumSpriteImagenes.BlocksOverworldBrickDebris).setDepth(ManejarDepthMainGame.profundidad7);
            this.visible = false;
            // Animar las piezas para que se alejen y desaparezcan
            this.scene.tweens.add({
                targets: piece1,
                x: piece1.x - 50,
                y: piece1.y - 50,
                angle: 360,
                alpha: 0,
                duration: 750,
                ease: 'Power2',
                onComplete: () => piece1.destroy()
            });
    
            this.scene.tweens.add({
                targets: piece2,
                x: piece2.x + 50,
                y: piece2.y - 50,
                angle: 360,
                alpha: 0,
                duration: 750,
                ease: 'Power2',
                onComplete: () => piece2.destroy()
            });
    
            this.scene.tweens.add({
                targets: piece3,
                x: piece3.x - 50,
                y: piece3.y + 50,
                angle: 360,
                alpha: 0,
                duration: 750,
                ease: 'Power2',
                onComplete: () => piece3.destroy()
            });
    
            this.scene.tweens.add({
                targets: piece4,
                x: piece4.x + 50,
                y: piece4.y + 50,
                angle: 360,
                alpha: 0,
                duration: 750,
                ease: 'Power2',
                onComplete: () => piece4.destroy()
            });
        }        


        UtilSonido.reproducirSonidoEfecto(this.scene, EnumSonidos.EfectoBreakBlock);
        this.scene.time.delayedCall(500, () => { this.destroy() });
    }

    moverHaciaArriba() {
        UtilSonido.reproducirSonidoEfecto(this.scene, EnumSonidos.EfectoBlockBump);
        this.scene.tweens.add({
            targets: this,
            duration: 75,
            y: this.y - 5,
            yoyo: true,
        });
    }
}