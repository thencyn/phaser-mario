import Boot from './ts/scenes/BootScene';
import MainGame from './ts/scenes/GameScene';
import GameOverScene from './ts/scenes/GameOverScene';
import MainMenuScene from './ts/scenes/MainMenuScene';
import PreloaderScene from './ts/scenes/PreloaderScene';
import ToggleSwitchPlugin from 'phaser3-rex-plugins/plugins/toggleswitch-plugin.js';

// import { Game, Types } from "phaser";
import { Game } from "phaser";
import IndicadoresScene from './ts/scenes/IndicadoresScene';
import PresentacionScene from './ts/scenes/PresentacionScene';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    width: 256,
	height: 244,
    type: Phaser.AUTO,
    parent: 'game-container',
    plugins: {
        global: [{
                key: 'rexToggleSwitchPlugin',
                plugin: ToggleSwitchPlugin,
                start: true
            },
        ]
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0,  y: 300 },
            debug: false,
        }
    },
    // fps: {
    //     target: 90,
    //     // min: 60,
    //     forceSetTimeOut: true
    // },
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        PreloaderScene,
        PresentacionScene,
        MainMenuScene,
        IndicadoresScene,
        MainGame,
        GameOverScene
    ]
};

export default new Game(config);

// export default class Game extends Phaser.Game {
// 	constructor(config: Phaser.Types.Core.GameConfig) {

// 		super(config);

// 		this.scene.add(Preloader.Name, Preloader);
// 		this.scene.add(SplashScreen.Name, SplashScreen);
// 		this.scene.add(PrincipalScene.Name, PrincipalScene);
// 		this.scene.add(MenuScene.Name, MenuScene);
// 		this.scene.add(FooterScene.Name, FooterScene);
// 		this.scene.add(AyudaScene.Name, AyudaScene);
// 		this.scene.add(ConfiguracionesScene.Name, ConfiguracionesScene);
// 		this.scene.add(ErrorParametrosScene.Name, ErrorParametrosScene);
// 		this.scene.add(MensajePopupReintentarScene.Name, MensajePopupReintentarScene);
// 		this.scene.add(ParticleEffectsScene.Name, ParticleEffectsScene);
// 		this.scene.start(Preloader.Name);
// 		console.log(`version ${configuracion.version}`);
// 	}
// }


// window.onload = (): void => {
//     const urlFont = "/assets/fonts/SuperMario.ttf";
// 	const nombreFont = "pixel";
//     const newFont = new FontFace(nombreFont, `url(${urlFont})`);
// 	newFont.load().then(function (loaded) {
// 		document.fonts.add(loaded);
// 	}).catch(function (error) {
// 		return error;
// 	});
// };

