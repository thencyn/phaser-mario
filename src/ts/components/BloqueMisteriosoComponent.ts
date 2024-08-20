import { EnumEventos, EnumSonidos, EnumSpriteImagenes, EnumSpriteImagenesAnimaciones, ManejarDepthMainGame, TipoPowerUp } from "../utilidades/Diccionario";
import { UtilSonido } from "../utilidades/UtilSonido";
import { EscenarioComponent } from "./EscenarioComponent";
import { MarioComponent } from "./MarioComponent";
import { MushroomSuperComponent } from "./MushroomSuperComponent";
import { MushroomSuperJumpComponent } from "./MushroomSuperJumpComponent";

export class BloqueMisteriosoComponent extends Phaser.Physics.Arcade.Sprite {
    recompensaObtenida: boolean = false;
    constructor(scene: Phaser.Scene, x: number, y: number, private escenario: EscenarioComponent, private mario: MarioComponent, private moneda: boolean, private tipoPowerUp?: TipoPowerUp) {
        super(scene, x, y, EnumSpriteImagenes.OverworldMisteryBlock, 0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // this.scene.physics.add.staticGroup().add(this);
        this.body = this.body as Phaser.Physics.Arcade.Body;
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.setDepth(ManejarDepthMainGame.profundidad7);
        this.play(EnumSpriteImagenesAnimaciones.OverworldMisteryBlock, true);
        this.scene.physics.add.collider(mario, this, () => this.colision());
        
    }

    private colision() {
        if (this.recompensaObtenida) return;
        if (this.mario.body.touching.up && this.body!.touching.down) {
            this.stop();
            if (this.moneda) {
                this.obtenerMoneda();
            } else {
                this.mostrarPowerUp();
            }
        }
    }

    private obtenerMoneda() {
        this.recompensaObtenida = true;
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

    private mostrarPowerUp() {
        this.recompensaObtenida = true;
        if (this.tipoPowerUp === TipoPowerUp.MushroomSuper) {
            const superChampinon = new MushroomSuperComponent(this.scene, this.x, this.y, this.escenario, this.mario);
            this.scene.physics.add.collider(superChampinon, this); //Esto es para que no se caiga, pero ojo el powerup no colisiona con otros bloques
        } else if (this.tipoPowerUp === TipoPowerUp.MushroomSuperJump) {
            const superChampinon = new MushroomSuperJumpComponent(this.scene, this.x, this.y, this.escenario, this.mario);
            this.scene.physics.add.collider(superChampinon, this); //Esto es para que no se caiga, pero ojo el powerup no colisiona con otros bloques
        }
        UtilSonido.reproducirSonidoEfecto(this.scene, EnumSonidos.EfectoPowerupAppears);
        this.play(EnumSpriteImagenesAnimaciones.CustomBlockDefault, true);
    }
}