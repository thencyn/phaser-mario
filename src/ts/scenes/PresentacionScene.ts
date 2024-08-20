import { AtlasImagenes, AtlasImagenesExtras, ManejarDepthMainGame } from "../utilidades/Diccionario";
import MainMenuScene from "./MainMenuScene";

export default class PresentacionScene extends Phaser.Scene {
	public static Name = "PresentacionScene";
    constructor () {
        super(PresentacionScene.Name);
    }
	
	public preload() {
		//
	}

	public create() {
		// this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.cameras.main.displayWidth, this.cameras.main.displayHeight);
		const logo = this.add.image(this.cameras.main.centerX, 50, 'logoPhaser')
			.setScale(0.33);
		this.tweens.add({
			targets: logo,
			scaleX: 0,
			duration: 1000,
			yoyo: true,
			ease: 'Linear',			
			delay: 1500,
		},);
		this.verEstrellas();
		this.efectoLogo();
	}

	private loadMainMenu() {
		this.cameras.main.fadeOut(500, 0, 0, 0);
		this.scene.start(MainMenuScene.Name);
	}

	private verEstrellas() {
		const listaEstrellas = this.add.group(null!, { key: AtlasImagenes.Extras, frame: AtlasImagenesExtras.Estrella, repeat: 15 });
		(<Phaser.GameObjects.Sprite[]> listaEstrellas.getChildren()).forEach(item => {
				item.setDisplaySize(12, 12);
				// item.setBlendMode(Phaser.BlendModes.ADD);
		});

		// this.cameras.main.centerX, this.cameras.main.centerY
		const circle = new Phaser.Geom.Circle(this.cameras.main.centerX, this.cameras.main.centerY + 30, 10);
		Phaser.Actions.PlaceOnCircle(listaEstrellas.getChildren(), circle);
        this.tweens.chain({
            tweens: [
                {
                    targets: circle,
                    radius: 75,
                    ease: 'Quintic.easeInOut',
                    duration: 1500,
                    yoyo: true,
                    //repeat: -1,
                    onUpdate: () =>
                    {
                        Phaser.Actions.RotateAroundDistance(listaEstrellas.getChildren(), { x: this.cameras.main.centerX, y: this.cameras.main.centerY + 30 }, 0.02, circle.radius);
                    },
                },
                {
                    targets: circle,
					radius: 200,
					ease: 'Quintic.easeInOut',
					duration: 1500,
					onUpdate: () =>
					{
						Phaser.Actions.RotateAroundDistance(listaEstrellas.getChildren(), { x: this.cameras.main.centerX, y: this.cameras.main.centerY + 30 }, 0.02, circle.radius);
					},
                }
            ]
        });
	}

	private efectoLogo() {
		const imagen = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 30, AtlasImagenes.Extras, AtlasImagenesExtras.Logo)
            .setScale(0.25)            
            .setAlpha(0.5)
            .setDepth(ManejarDepthMainGame.profundidad7);
		this.tweens.add({
			targets: imagen,
			alpha: 1,
            angle: 360,
            scale: 1,
			duration: 2000,
            hold: 3500,
			onComplete: () => {
				this.loadMainMenu();
			}
		});
	}
}
