import { Scene, GameObjects } from 'phaser';
import GameScene from './GameScene';
import { AtlasImagenes, AtlasImagenesExtras, EnumSonidos, EnumSpriteImagenes, EnumVariables, ManejarDepthMainGame } from '../utilidades/Diccionario';
import ToggleSwitch from 'phaser3-rex-plugins/plugins/gameobjects/shape/toggleswitch/ToggleSwitch';
import { UtilSonido } from '../utilidades/UtilSonido';



export default class MainMenuScene extends Scene
{
    public static Name = "MainMenu";
    background: GameObjects.Image;
    title: GameObjects.Text;
    particulasEmitterFuego: GameObjects.Particles.ParticleEmitter;
    

    constructor () {
        super(MainMenuScene.Name);
    }

    create () {
        this.background = this.add.image(512, 384, 'background');//template

        const posX = this.cameras.main.displayWidth * 0.66; 
        const posY = this.cameras.main.displayHeight * 0.2;        
        const logo = this.add.sprite(0, this.cameras.main.displayHeight, AtlasImagenes.Extras, AtlasImagenesExtras.Logo)
			.setAlpha(0)
			.setDepth(ManejarDepthMainGame.profundidad7);            
		this.tweens.add({
			targets: logo,
			// alpha: { value: 1, ease: 'Quad.in' },
			// x: { value: 1030, ease: 'Bounce.in' },
			// y: { value: 250, ease: 'Quad.in' },
			alpha: { value: 1, ease: Phaser.Math.Easing.Quadratic.In },
			x: { value: posX, ease: Phaser.Math.Easing.Bounce.In },
			y: { value: posY, ease: Phaser.Math.Easing.Quadratic.In },
			duration: 2000,
			onComplete: () => {
				this.crearParticulasBrillo(logo);
			}
		});

        this.registry.set(EnumVariables.JuegoMonedas, 0);
        this.registry.set(EnumVariables.JuegoPuntaje, 0);
        this.registry.set(EnumVariables.JuegoVidas, 5);

        this.crearBotonJugar();
        this.crearOpciones();
        this.efectoConfeti();
        this.crearConfiguracion()
    }

    private crearBotonJugar() {
        const posX = this.cameras.main.displayWidth * 0.66; 
        const botonJugar = this.add.text(posX, this.cameras.main.displayHeight * 0.88, 'Jugar', { fontFamily: 'monospace', backgroundColor: '#111', fontSize: 12 })
        .setOrigin(0.5)
        .setPadding(12)
        .setInteractive({ useHandCursor: true })
        .setDepth(ManejarDepthMainGame.profundidad7)
        .on(Phaser.Input.Events.POINTER_DOWN, ()=> this.scene.start(GameScene.Name))
        .on(Phaser.Input.Events.POINTER_OVER, () => botonJugar.setStyle({ fill: '#f39c12' }))
        .on(Phaser.Input.Events.POINTER_OUT, () => botonJugar.setStyle({ fill: '#FFF' }));
    
        const botonJugarGlow = botonJugar.preFX!.addGlow(0x6daced);
        botonJugarGlow.setActive(true);
        botonJugarGlow.outerStrength = 0;
        botonJugarGlow.innerStrength = 0;
        this.add.tween(
            {
                targets: botonJugarGlow,
                outerStrength: 4,
                innerStrength: 1,
                ease: 'sine.in',
                yoyo: true,
                duration: 1800,
                repeat: -1,
            });
                
        const grafica = this.add.graphics();
        grafica.lineStyle(2, 0x6daced, 1);
        grafica.strokeRect(botonJugar.getBounds().x, botonJugar.getBounds().y, botonJugar.width, botonJugar.height);
        this.add.particles(0, 0, AtlasImagenes.Extras, {
                frame: AtlasImagenesExtras.FuegoBlanco,
                follow: botonJugar,
                color: [ 0xad8742, 0xffdd74, 0xf9c25f, 0xffdb61, 0xfdffdd ],
                colorEase: 'quart.out',
                lifespan: 1000,
                angle: { min: -140, max: -40 },
                scale: { start: 1, end: 0, ease: 'sine.in' },
                speed: { min: -200, max: 200 },
                advance: 2000,
                frequency: 100,
                blendMode: 'ADD',
            }).setDepth(ManejarDepthMainGame.profundidad6);
    }

    private crearOpciones() {
        const screenHeight = this.cameras.main.displayHeight;
        const screenWidth = this.cameras.main.displayWidth;
        
        this.add.rectangle(0, 0, screenWidth * .33, screenHeight, 0x171717, 0.5)
            .setOrigin(0)
            .setDepth(4);

        this.add.text(42, screenHeight - (screenHeight* 0.85), 'Settings', { fontFamily: 'pixel', fontSize: 12, align: 'center'})
            .setOrigin(0.5, 0)
            .setDepth(5);

        const musicToggleSwitch = this.add.rexToggleSwitch(20, 100, 20, 20, <ToggleSwitch.IConfig>{
                color: 0x039be5,
                value: <boolean> this.registry.get(EnumVariables.MusicaActivada),
            })
            .setDepth(10)
            .on('valuechange', (value: boolean) => {
                this.registry.set(EnumVariables.MusicaActivada, value);
                if (value) {
                    UtilSonido.reproducirMusicaFondo(this, EnumSonidos.MusicOverworldTheme);
                } else {
                    UtilSonido.detenerMusicaFondo(this);
                }
            });
        let musicToggleSwitchText = this.add.text(0, 0, 'Música', { fontFamily: 'pixel', fontSize: 8, align: 'center'})
            .setOrigin(0.5, 0)
            .setDepth(10)
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => musicToggleSwitch.toggleValue());
        Phaser.Display.Align.In.LeftCenter(musicToggleSwitchText, musicToggleSwitch, -musicToggleSwitch.displayWidth - 5, 2);


        const musicEfectosToggleSwitch = this.add.rexToggleSwitch(20, 120, 20, 20, <ToggleSwitch.IConfig>{
                color: 0x039be5,
                value: <boolean> this.registry.get(EnumVariables.MusicaEfectosActivada),
            })
            .setDepth(10)
            .on('valuechange', (value: boolean) => {
                this.registry.set(EnumVariables.MusicaEfectosActivada, value);
            });
        let musicEfectosToggleSwitchText = this.add.text(0, 0, 'Sonidos', { fontFamily: 'pixel', fontSize: 8, align: 'center'})
            .setOrigin(0.5, 0)
            .setDepth(10)
            .setInteractive()
            .on(Phaser.Input.Events.POINTER_DOWN, () => musicToggleSwitch.toggleValue());
        Phaser.Display.Align.In.LeftCenter(musicEfectosToggleSwitchText, musicEfectosToggleSwitch, -musicEfectosToggleSwitch.displayWidth - 5, 2);

        // let musicCheckbox = this.add.rexCheckbox(20, 100, 20, 20, <Checkbox.IConfig> {
        //     color: 0xffffff, 
        //     checked: false, //localStorage.getItem('music-enabled') == 'true' || localStorage.getItem('music-enabled') == 'false' ? localStorage.getItem('music-enabled') == 'true' : true,
        //     animationDuration: 150,
        // }).setDepth(10)
        // .on('valuechange', () => {

        // });
        // let musicCheckboxText = this.add.text(0, 0, 'Musica', { fontFamily: 'pixel', fontSize: 14, align: 'center'})
        //     .setOrigin(0.5, 0)
        //     .setDepth(10)
        //     .setInteractive()
        //     .on('pointerdown', () => musicCheckbox.toggleChecked());
        // Phaser.Display.Align.In.LeftCenter(musicCheckboxText, musicCheckbox, -musicCheckbox.displayWidth - 5);
        
        
        // let musicCheckbox = this.add.rexCheckbox(screenWidth / 10, screenHeight / 2.9, screenWidth / 40, screenWidth / 40, {});
        // musicCheckbox.depth = 5;
        // settingsMenuObjects.add(musicCheckbox);

        // musicCheckbox.on('valuechange', function() {
        //     localStorage.setItem('music-enabled', musicCheckbox.checked)
        // });
    }

    private efectoConfeti() {
        // https://codepen.io/samme/pen/YzbLYXq
        const TAU = 2 * Math.PI;
        this.add.particles(0, 0, EnumSpriteImagenes.ExtrasConfeti, {
            frequency: 60,
            lifespan: 5000,
            speed: 100,
            gravityY: 100,
            frame: [0, 4, 8, 12, 16],
            x: { min: 0, max: 200 },
            scaleX: {
                onEmit: (_) => {
                    return 1;
                },
                onUpdate: (particle) => {
                    // 4 cycles per lifespan
                    return Math.cos(TAU * 4 * particle.lifeT);
                }
            },
            rotate: {
                onEmit: (_) => {
                    return 0;
                },
                onUpdate: (particle) => {
                    // 2 cycles per lifespan
                    return 2 * 360 * Math.sign(particle.velocityX) * particle.lifeT;
                }
            }
        });
    }

    private crearConfiguracion() {
        const screenHeight = this.cameras.main.displayHeight;
        const screenWidth = this.cameras.main.displayWidth;
        const posX = screenWidth * .38;
        const posY = screenHeight * .32;
        this.add.rectangle(posX, posY, screenWidth * .58, screenHeight * .46, 0x171717, 0.5)
            .setOrigin(0)
            .setDepth(ManejarDepthMainGame.profundidad3);
        this.add.text(posX + 10, posY + 5, ' Saltar ', { fontFamily: 'monospace', fontStyle: 'bold', color: '#f9d34e', stroke: '#03872a', strokeThickness: 3, backgroundColor: '#111', fontSize: 12 })
            .setDepth(ManejarDepthMainGame.profundidad4);
        this.add.text(posX + 10, posY + 25, ' Izquierda ', { fontFamily: 'monospace', fontStyle: 'bold', color: '#8cfffb', stroke: '#03872a', strokeThickness: 3, backgroundColor: '#111', fontSize: 12 })
            .setDepth(ManejarDepthMainGame.profundidad4);
        this.add.text(posX + 10, posY + 45, ' Derecha ', { fontFamily: 'monospace', fontStyle: 'bold', color: '#ffc000', stroke: '#03872a', strokeThickness: 3, backgroundColor: '#111', fontSize: 12 })
            .setDepth(ManejarDepthMainGame.profundidad4);
        this.add.text(posX + 10, posY + 65, ' Abajo ', { fontFamily: 'monospace', fontStyle: 'bold', color: '#000000', stroke: '#03872a', strokeThickness: 3, backgroundColor: '#111', fontSize: 12 })
            .setDepth(ManejarDepthMainGame.profundidad4);
        this.add.text(posX + 10, posY + 85, ' Correr ', { fontFamily: 'monospace', fontStyle: 'bold', color: '#ffffff', stroke: '#03872a', strokeThickness: 3, backgroundColor: '#111', fontSize: 12 })
                .setDepth(ManejarDepthMainGame.profundidad4);

        this.add.text(posX + 120, posY + 5, ' ↑ ', { fontFamily: 'monospace', fontStyle: 'bold', color: '#f9d34e', stroke: '#03872a', strokeThickness: 3, backgroundColor: '#111', fontSize: 12 })
            .setOrigin(0.5, 0)
            .setDepth(ManejarDepthMainGame.profundidad4);
        this.add.text(posX + 120, posY + 25, ' ← ', { fontFamily: 'monospace', fontStyle: 'bold', color: '#8cfffb', stroke: '#03872a', strokeThickness: 3, backgroundColor: '#111', fontSize: 12 })
            .setOrigin(0.5, 0)
            .setDepth(ManejarDepthMainGame.profundidad4);
        this.add.text(posX + 120, posY + 45, ' → ', { fontFamily: 'monospace', fontStyle: 'bold', color: '#ffc000', stroke: '#03872a', strokeThickness: 3, backgroundColor: '#111', fontSize: 12 })
            .setOrigin(0.5, 0)
            .setDepth(ManejarDepthMainGame.profundidad4);
        this.add.text(posX + 120, posY + 65, ' ↓ ', { fontFamily: 'monospace', fontStyle: 'bold', color: '#000000', stroke: '#03872a', strokeThickness: 3, backgroundColor: '#111', fontSize: 12 })
            .setOrigin(0.5, 0)
            .setDepth(ManejarDepthMainGame.profundidad4);
        this.add.text(posX + 120, posY + 85, ' SPACE ', { fontFamily: 'monospace', fontStyle: 'bold', color: '#ffffff', stroke: '#03872a', strokeThickness: 3, backgroundColor: '#111', fontSize: 12 })
            .setOrigin(0.5, 0)
            .setDepth(ManejarDepthMainGame.profundidad4);
            
            this.add.text(posX + 10, posY + 102, ' Solo Lectura ', { fontFamily: 'monospace', fontStyle: 'bold', color: '#fff', fontSize: 8 })
            .setDepth(ManejarDepthMainGame.profundidad4);

    }

    private crearParticulasBrillo(logo: Phaser.GameObjects.Image) {
		const textures = this.textures;
		const origin = logo.getTopLeft();
		const logoSource = {
			getRandomPoint: function (vec: any) {
				let pixel;
				let x, y: number;
				do {
					x = Phaser.Math.Between(0, logo.width - 1);
					y = Phaser.Math.Between(0, logo.height - 1);
					pixel = textures.getPixel(x, y, AtlasImagenes.Extras, AtlasImagenesExtras.Logo);
				} while ((pixel?.alpha || 0) < 255);

				return vec.setTo(x + origin.x, y + origin.y);
			}
		};
		const configParticulas: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
			frame: AtlasImagenesExtras.FuegoBlanco,
			// tint: 0xe43602,
			// color: [0x273e96, 0x3a5de2, 0x4c85bd],
			x: 0,
			y: 0,
			lifespan: 1000,
			gravityY: 10,
			scale: { start: 0, end: 0.25, ease: 'Quad.easeOut' },
			alpha: { start: 1, end: 0, ease: 'Quad.easeIn' },
			blendMode: 'ADD',
			emitZone: { type: 'random', source: logoSource }
		};
		this.add.particles(null!, null!, AtlasImagenes.Extras, configParticulas).setDepth(ManejarDepthMainGame.profundidad7);
	}
}
