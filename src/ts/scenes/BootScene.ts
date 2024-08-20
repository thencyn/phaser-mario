import { Scene } from 'phaser';

export default class BootScene extends Scene
{
    public static Name = "BootScene";
    constructor () {
        super(BootScene.Name);
    }

    preload () {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background', 'assets/bg.png'); //Template
        this.load.image('logoPhaser', 'assets/logo.png'); //Template
    }

    create () {
        this.scene.start('Preloader');
    }
}
