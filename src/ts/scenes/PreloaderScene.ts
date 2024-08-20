import { Scene } from 'phaser';
import { AtlasImagenes, AtlasImagenesDetalles, EnumImagenes, EnumImagenesBloques, EnumImagenesBloquesDetalles, EnumImagenesDetalles, EnumImagenesEscenario, EnumImagenesEscenarioDetalles, EnumSonidos, EnumSonidosDetalles, EnumSpriteImagenes, EnumSpriteImagenesAnimaciones, EnumSpriteImagenesDetalles, EnumVariables } from '../utilidades/Diccionario';
import { UtilSonido } from '../utilidades/UtilSonido';
import PresentacionScene from './PresentacionScene';

export default class PreloaderScene extends Scene
{
    public static Name = "Preloader";
    constructor ()
    {
        super(PreloaderScene.Name);
    }

    init () {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');//Template

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload () {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        for(const value of Object.values(EnumImagenes)) {
            this.load.image(value, EnumImagenesDetalles[value].NombreArchivo);
        }


        for (const value of Object.values(EnumSpriteImagenes)) {
            const sprDetalle = EnumSpriteImagenesDetalles[value];
            this.load.spritesheet(value, sprDetalle.NombreArchivo, {
                frameWidth: sprDetalle.AnchoFrame,
                frameHeight: sprDetalle.AltoFrame,
                endFrame: sprDetalle.FrameFinal
            });
        }

        for(const value of Object.values(EnumImagenesEscenario)) {
            this.load.image(value, EnumImagenesEscenarioDetalles[value].NombreArchivo);
        }

        for(const value of Object.values(EnumImagenesBloques)) {
            this.load.image(value, EnumImagenesBloquesDetalles[value].NombreArchivo);
        }

        for(const value of Object.values(EnumSonidos)) {
			this.load.audio(value, EnumSonidosDetalles[value].NombreArchivo);
		}

        for(const value of Object.values(AtlasImagenes)) {
			const detalle = AtlasImagenesDetalles[value];
			this.load.atlas(value, detalle.NombreArchivoImagen, detalle.NombreArchivoAtlas);
		}

        //Hay otras formas de cargar bitmaptext 
        // this.load.bitmapFont('pixelFont', 'fontbitmap/font.png', 'fontbitmap/font.xml');
        this.load.image('font', 'fontbitmap/font.png');
        this.load.json('fontData', 'fontbitmap/font.json');
        this.load.on('complete', () => {
            const fontData = this.cache.json.get('fontData');
            this.cache.bitmapFont.add('pixelFont', Phaser.GameObjects.RetroFont.Parse(this, fontData));
        });

    }

    create () {
        this.registry.set(EnumVariables.MusicaEfectosActivada, true);
		this.registry.set(EnumVariables.MusicaEfectosVolumen, 5);
		this.registry.set(EnumVariables.MusicaActivada, true);
		this.registry.set(EnumVariables.MusicaVolumen, 5);

        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.MarioWalk,
            frames: this.anims.generateFrameNumbers(EnumSpriteImagenes.Mario, { start: 1, end: 3 }),
            frameRate: 12,
            repeat: -1,
        });
    
        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.MarioIdle,
            frames: [{ key: EnumSpriteImagenes.Mario, frame: 0 }],
        });

        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.MarioJump,
            frames: [{ key: EnumSpriteImagenes.Mario, frame: 5 }],
        });

        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.MarioDead,
            frames: [{ key: EnumSpriteImagenes.Mario, frame: 4 }],
        });

        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.MarioBigWalk,
            frames: this.anims.generateFrameNumbers(EnumSpriteImagenes.MarioGrown, { start: 1, end: 3 }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.MarioBigIdle,
            frames: [{ key: EnumSpriteImagenes.MarioGrown, frame: 0 }]
        });

        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.MarioBigJump,
            frames: [{ key: EnumSpriteImagenes.MarioGrown, frame: 5 }]
        });
        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.MarioBigCrouch,
            frames: [{ key: EnumSpriteImagenes.MarioGrown, frame: 4 }]
        });

        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.GoombaWalk,
            frames: this.anims.generateFrameNumbers(EnumSpriteImagenes.OverworldGoomba, { start: 0, end: 1 }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.GoombaHurt,
            frames: [{ key: EnumSpriteImagenes.OverworldGoomba, frame: 2 }]
        });

        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.CoinIdle,
            frames: this.anims.generateFrameNumbers(EnumSpriteImagenes.ColeccionablesMonedaOverworld, { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.OverworldRomperBloque,
            frames: this.anims.generateFrameNumbers(EnumSpriteImagenes.BlocksOverworldBrickDebris, { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.UndergroundRomperBloque,
            frames: this.anims.generateFrameNumbers(EnumSpriteImagenes.BlocksUndergroundBrickDebris, { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.CustomBlockDefault,
            frames: this.anims.generateFrameNumbers(EnumSpriteImagenes.BlocksOverworldCustomBlock, { start: 0, end: 2 }),
            frameRate: 10,
        });

        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.OverworldMisteryBlock,
            frames: this.anims.generateFrameNumbers(EnumSpriteImagenes.OverworldMisteryBlock, { start: 2, end: 0 }),
            frameRate: 5,
            repeat: -1,
            repeatDelay: 5,
        });

        this.anims.create({
            key: EnumSpriteImagenesAnimaciones.UndergroundMisteryBlock,
            frames: this.anims.generateFrameNumbers(EnumSpriteImagenes.UndergroundMisteryBlock, { start: 2, end: 0 }),
            frameRate: 5,
            repeat: -1,
            repeatDelay: 5,
        });
        
        UtilSonido.reproducirMusicaFondo(this, EnumSonidos.MusicOverworldTheme);
        this.scene.start(PresentacionScene.Name);
    }
}
