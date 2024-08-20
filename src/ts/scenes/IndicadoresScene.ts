import { Scene } from "phaser";
import { EnumEventos, EnumSpriteImagenes, EnumSpriteImagenesAnimaciones, EnumVariables } from "../utilidades/Diccionario";

export default class IndicadoresScene extends Scene {
    public static Name = "IndicadoresScene";
    private puntajeTexto: Phaser.GameObjects.BitmapText;
    private vidasTexto: Phaser.GameObjects.BitmapText;
    private monedasTexto: Phaser.GameObjects.BitmapText;
    private tweenPuntaje: Phaser.Tweens.Tween;
    constructor() {
        super(IndicadoresScene.Name);
    }

    init() {
        this.scene.moveUp();
    }
    
    create() {
        // this.groupLife = this.add.group({
        //     key: 'life',
        //     repeat: 2,
        //     setXY: {
        //         x: 50,
        //         y: 20,
        //         stepX: 25
        //     }
        // });
        this.add.bitmapText(10, 5, 'pixelFont', 'MARIO', 8)
            .setTint(0xffffff);

        this.add.text(57, 5, 'X', { fontFamily: 'monospace', fontSize: 8 });
        const vidas = +this.registry.get(EnumVariables.JuegoVidas);
        this.vidasTexto =  this.add.bitmapText(63, 5, 'pixelFont', vidas.toString().padStart(2, '0'), 8)
            .setTint(0xffffff);
        
        const puntaje = +this.registry.get(EnumVariables.JuegoPuntaje);
        this.puntajeTexto = this.add.bitmapText(10, 15, 'pixelFont', puntaje.toString().padStart(6, '0'), 8)
            .setTint(0xffffff);

        this.add.sprite(110, 8, EnumSpriteImagenes.ColeccionablesMonedaOverworld)
            .setOrigin(0, 0)
            .setScale(0.75)
            .play(EnumSpriteImagenesAnimaciones.CoinIdle)
            ;
        this.add.text(122, 10, 'X', { fontFamily: 'monospace', fontSize: 8 });
        const monedas = +this.registry.get(EnumVariables.JuegoMonedas);
        this.monedasTexto = this.add.bitmapText(130, 10, 'pixelFont', monedas.toString().padStart(2, '0'), 8)
            .setTint(0xffffff);

        // Eventos
        // this.registry.events.on('remove_life', () => {
        //     this.groupLife.getChildren()[this.groupLife.getChildren().length - 1].destroy();
        // });
        // this.registry.events.on('game_over', () => {
        //     this.registry.events.removeAllListeners();
        //     this.scene.start('Menu', {points: this.actual_points});
        // });

        
        this.registry.events.on(EnumEventos.PuntajeActualizar, (scoreSumar: number) => {

            const puntajeActual = this.registry.get(EnumVariables.JuegoPuntaje);
            const puntajeNuevo = puntajeActual + scoreSumar;
            this.registry.set(EnumVariables.JuegoPuntaje, puntajeNuevo);
            // this.puntajeTexto.setText(puntajeNuevo.toString().padStart(6, '0'));
			if (this.tweenPuntaje?.isPlaying()) {
				this.tweenPuntaje.stop();
			}
            this.tweenPuntaje = this.tweens.addCounter({
				from: puntajeActual,
				to: puntajeNuevo,
				duration: 500,
				ease: 'linear',
				onUpdate: tween => {
					const value = Math.round(tween.getValue());
					this.puntajeTexto.setText(`${value.toString().padStart(6, "0")}`)
				}
			});
        });
        this.registry.events.on(EnumEventos.VidasActualizar, (numVidas: number) => {
            this.vidasTexto.setText(`${numVidas.toString().padStart(2, '0')}`);
        });
        this.registry.events.on(EnumEventos.MonedasActualizar, () => {
            const monedasActual = +this.registry.get(EnumVariables.JuegoMonedas) + 1;
            this.registry.set(EnumVariables.JuegoMonedas, monedasActual);
            this.monedasTexto.setText(`${monedasActual.toString().padStart(2, '0')}`);
        });
    }
}