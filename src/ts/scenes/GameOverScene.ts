import { Scene } from 'phaser';
import MainMenuScene from './MainMenuScene';

export default class GameOverScene extends Scene
{
    public static Name = "GameOver";
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameover_text : Phaser.GameObjects.Text;

    constructor() {
        super(GameOverScene.Name);
    }

    create () {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(0, 0, 'background');
        this.background.setAlpha(0.5);

        this.gameover_text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 16, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.gameover_text.setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start(MainMenuScene.Name);
        });
    }
}
