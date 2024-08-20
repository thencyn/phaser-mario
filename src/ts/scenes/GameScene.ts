import { Scene } from "phaser";
import { MarioComponent } from "../components/MarioComponent";
import { GoombaComponent } from "../components/GoombaComponent";
import { EnumImagenesEscenario, AtlasImagenesExtras, EnumSpriteImagenesAnimaciones, EnumVariables, ManejarDepthMainGame, AtlasImagenes, TipoPowerUp } from "../utilidades/Diccionario";
import { MonedaComponent } from "../components/MonedaComponent";
import IndicadoresScene from "./IndicadoresScene";
import { EscenarioComponent } from "../components/EscenarioComponent";
import { BanderaComponent } from "../components/BanderaComponent";
import { BloqueComponent } from "../components/BloqueComponent";
import { BloqueMisteriosoComponent } from "../components/BloqueMisteriosoComponent";

export default class GameScene extends Scene {
    public static Name = "GameScene";

    keys: Phaser.Types.Input.Keyboard.CursorKeys;
    mario: MarioComponent;
    goomba: GoombaComponent;
    escenario: EscenarioComponent;
    eventoTiempoGoombas: Phaser.Time.TimerEvent;
    coordenadasMarioTexto: Phaser.GameObjects.Text;
    textoFPS: Phaser.GameObjects.Text;
    flagCrearGoombas: boolean; //No inicializar valor aca, ya que cuando se reinicia la escena no se reinicia el valor. Ver init()
    constructor() {
        super(GameScene.Name);
    }

    init() {
        this.flagCrearGoombas = true;
        this.registry.events.removeAllListeners();
        this.scene.launch(IndicadoresScene.Name);
    }

    preload() {}

    create() {
        this.physics.world.setBounds(0, 0, 4000, this.cameras.main.displayHeight + 50);
        this.cameras.main.setBounds(0, 0, 4000, this.cameras.main.displayHeight);
        const pisoAltura = this.cameras.main.displayHeight - 32;
        

        this.escenario = new EscenarioComponent(this.physics.world, this, {
            piso: {
                imagen: EnumImagenesEscenario.OverworldFloorbricks,
                listaPuntos: [
                    { xInicial: 0, xFinal: 1000, y:  pisoAltura},
                    { xInicial: 1025, xFinal: 1150, y: pisoAltura - 32 },
                    { xInicial: 1175, xFinal: 1500, y: pisoAltura },
                    { xInicial: 1560, xFinal: 2100, y: pisoAltura },
                    { xInicial: 2150, xFinal: 2650, y: pisoAltura },
                    { xInicial: 2700, xFinal: 3000, y: pisoAltura },
                    { xInicial: 3060, xFinal: 4000, y: pisoAltura },
                ]
            },
            tuberias: {
                lista: [
                    { x: 450, y: pisoAltura - 30, imagen: EnumImagenesEscenario.VerticalMediumTube },
                    { x: 600, y: pisoAltura - 40, imagen: EnumImagenesEscenario.VerticalLargeTube2 },
                    { x: 750, y: pisoAltura - 50, imagen: EnumImagenesEscenario.VerticalLargeTube2 },
                    { x: 1300, y: pisoAltura - 63, imagen: EnumImagenesEscenario.VerticalLargeTube2 },
                    // { x: 1302, y: pisoAltura - 60, imagen: EnumImagenesEscenario.VerticalLargeTube },
                    { x: 2150, y: pisoAltura - 30, imagen: EnumImagenesEscenario.Pipe2 },
                    { x: 2600, y: pisoAltura - 45, imagen: EnumImagenesEscenario.Pipe1 },
                    { x: 2875, y: pisoAltura - 63, imagen: EnumImagenesEscenario.VerticalLargeTube2 },
                    { x: 3120, y: pisoAltura - 50, imagen: EnumImagenesEscenario.VerticalLargeTube2 },
                    
                ]
            },
            bloquesInmovibles: [
                ...Array.from({ length: 2 }, (_, i) => ({x: 35 + i*16, y: pisoAltura - 50 })),
                ...Array.from({ length: 2 }, (_, i) => ({x: 90 + i*16, y: pisoAltura - 80 })),
                ...Array.from({ length: 4 }, (_, i) => ({x: 780 + i*16, y: pisoAltura - ((i + 1) * 16)})),
                ...Array.from({ length: 4 }, (_, i) => ({x: 892 - i*16, y: pisoAltura - ((i + 1) * 16)})),
                ...Array.from({ length: 4 }, (_, i) => Array.from({ length: i + 1 }, (_, j) => ({x: 1436 + i*16, y: pisoAltura - ((j + 1) * 16)}))).flat(),
                ...Array.from({ length: 4 }, (_, i) => Array.from({ length: i + 1 }, (_, j) => ({x: 1608 - i*16, y: pisoAltura - ((j + 1) * 16)}))).flat(),
                ...Array.from({ length: 8 }, (_, i) => Array.from({ length: i + 1 }, (_, j) => ({x: 1750 + i*16, y: pisoAltura - ((j + 1) * 16)}))).flat(),
                ...Array.from({ length: 8 }, (_, i) => Array.from({ length: i + 1 }, (_, j) => ({x: 1990 - i*16, y: pisoAltura - ((j + 1) * 16)}))).flat(),
                ...Array.from({ length: 4 }, (_, i) => ({x: 2500 + i*16, y: pisoAltura - 50 })),
                ...Array.from({ length: 9 }, (_, i) => Array.from({ length: (i + 1 === 9 ? i : i + 1) }, (_, j) => ({x: 3400 + i*16, y: pisoAltura - ((j + 1) * 16)}))).flat(),
            ]
        });
        this.keys = this.input.keyboard!.createCursorKeys();
        this.mario = new MarioComponent(this, 0, 100, this.escenario, this.keys);

        // const superChampinon = new MushroomSuperComponent(this, 100, 100, this.escenario);
        // this.physics.add.overlap(this.mario, superChampinon, () => {
        //     superChampinon.destroy();
        //     this.mario.recogerSuuperMusshroom();
        // });

        this.add.text(20, pisoAltura - 110, 'Aca hay un bug,\nal rebotar chocando arriba,\nse puede rebotar en un goomba ya muerto', { fontFamily: 'monospace', fontSize: 8, align: 'center' });
        for (let i = 0; i < 3; i++) {
            const goomba = new GoombaComponent(this, 300 + i * 20, pisoAltura - 40, this.escenario);
            this.physics.add.collider(this.mario, goomba, () => {
                this.onHitEnemy(this.mario, goomba);
            });
        }

        // this.time.addEvent({
        //     delay: 1500,
        //     callback: () => {
        //         const goomba = new GoombaComponent(this, 400, pisoAltura - 40, this.escenario);
        //         this.physics.add.collider(this.mario, goomba, () => {
        //             this.onHitEnemy(this.mario, goomba);
        //         });
        //     },
        //     repeat: -1,
        // });

        const goomba2 = new GoombaComponent(this, 500, pisoAltura - 40, this.escenario);
        this.physics.add.collider(this.mario, goomba2, this.onHitEnemy, null!, this);
        // const goomba3 = new GoombaComponent(this, 265, pisoAltura - 40, this.escenario);
        // this.physics.add.collider(this.mario, goomba3, this.onHitEnemy, null!, this);
        const luzDorada = this.add.image(this.cameras.main.displayWidth - 30, 30, AtlasImagenes.Extras, AtlasImagenesExtras.LuzDorada)
            .setDepth(ManejarDepthMainGame.profundidad5)
            .setScale(0.75);
        luzDorada.setScrollFactor(0);
        this.add.particles(0, 0, AtlasImagenes.Extras, {
            frame: AtlasImagenesExtras.FuegoBlanco,
            // tint: 0xffff00,
            lifespan: 1500,
            speed: { min: 10, max: 20 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            alpha: { start: 1, end: 0 },
            blendMode: Phaser.BlendModes.ADD,
            quantity: 10, // Cantidad de partículas emitidas por llamada
            frequency: 100, // Frecuencia de emisión en milisegundos
            follow: luzDorada,
        }).setDepth(ManejarDepthMainGame.profundidad4).setScrollFactor(0);
        this.tweens.add({
            targets: luzDorada,
            angle: 360,
            duration: 3000,
            repeat: -1,
            hold: 1000,
        });
    
        
        new BanderaComponent(this, 3650, pisoAltura, this.mario);
        this.crearAdornosEscenario();
        this.crearMonedas();
        this.crearBloques();
        this.crearBloquesMisteriosos();
        this.coordenadasMarioTexto = this.add.text(5, this.cameras.main.displayHeight - 16, '', { fontFamily: 'pixelFont', fontSize: 10, color: '#ffffff', fontStyle: 'bold' })
            .setScrollFactor(0)
            .setDepth(ManejarDepthMainGame.profundidad7);
        this.textoFPS = this.add.text(this.cameras.main.displayWidth - 64, this.cameras.main.displayHeight - 16, '', { fontFamily: 'pixelFont', fontSize: 10, color: '#ffffff', fontStyle: 'bold', align: 'center' })
            .setScrollFactor(0)
            .setDepth(ManejarDepthMainGame.profundidad7);        
    }

    update() {
        this.textoFPS.setText(`FPS: ${this.game.loop.actualFps.toFixed(2)}`);
        if (+this.registry.get(EnumVariables.JuegoVidas) === 0) {
            return;
        }
        this.coordenadasMarioTexto.setText(`Mario: x: ${Math.trunc(this.mario.x)}, y: ${Math.trunc(this.mario.y)}`);
        this.mario.moverMario();
        if (this.mario.x > 2300 && this.mario.x < 2700) {
            if (!this.eventoTiempoGoombas) {
                const pisoAltura = this.cameras.main.displayHeight - 77;
                this.crearGommbasTuberia(2600, pisoAltura);
            }
        } else {
            if (this.eventoTiempoGoombas) {
                this.eventoTiempoGoombas.remove();
                this.eventoTiempoGoombas = null!;
            }
        }
        
        if (this.mario.x > 1550 && this.mario.x < 1870 && this.flagCrearGoombas) {
            this.flagCrearGoombas = false;
            for (let i = 0; i < 5; i++) {
                this.time.delayedCall(500 + 500 * i, () => {
                    const goomba = new GoombaComponent(this, 1890, 50, this.escenario);
                    this.physics.add.collider(this.mario, goomba, () => {
                        this.onHitEnemy(this.mario, goomba);
                    });
                });
            }
        }
    }

    crearMonedas() {
        const listaMonedas = [
            ...Array.from({ length: 7 }, (_, i) => ({ x: 190 + i * 20, y: 100 })),
            ...Array.from({ length: 4 }, (_, i) => ({ x: 510 + i * 20, y: 140 })),
            ...Array.from({ length: 4 }, (_, i) => ({ x: 660 + i * 20, y: 120 })),
            ...Array.from({ length: 6 }, (_, i) => ({ x: 1035 + i * 20, y: 130 })),
            ...Array.from({ length: 6 }, (_, i) => ({ x: 1035 + i * 20, y: 110 })),
            ...Array.from({ length: 3 }, (_, i) => ({ x: 1510 + i * 20, y: 95 })),
            ...Array.from({ length: 5 }, (_, i) => ({ x: 1650 + i * 20, y: 160 })),
            ...Array.from({ length: 4 }, (_, i) => Array.from({ length: i + 1 }, (_, j) => ({ x: 2250 + i * 20, y: 150 - ((j + 1) * 20)}))).flat(),
            ...Array.from({ length: 3 }, (_, i) => Array.from({ length: i + 1 }, (_, j) => ({ x: 2370 - i * 20, y: 150 - ((j + 1) * 20)}))).flat(),
        ];
        for (const ele of listaMonedas) {
            const moneda = new MonedaComponent(this, ele.x, ele.y);
            this.physics.add.overlap(this.mario, moneda, () => {
                moneda.recogerMoneda();
                this.mario.addToScore(100);
            });
        }
    } 

    onHitEnemy(mario: any, enemy: any) {
        const marioComponent = <MarioComponent> mario;
        const goombaComponent = <GoombaComponent> enemy;
        if (mario.body!.touching.down && enemy.body!.touching.up) {
            goombaComponent.morirAplastado();
            marioComponent.play(EnumSpriteImagenesAnimaciones.MarioJump, true);
            marioComponent.setVelocityY(-250);
            marioComponent.addToScore(200);
        } else {
            marioComponent.degradarMario();
        }
    }

    crearAdornosEscenario() {
        const nubeSel = () => Phaser.Math.RND.pick([EnumImagenesEscenario.OverworldCloud1, EnumImagenesEscenario.OverworldCloud2]);
        const listaNubes = [
            { x: 200, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 400, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 600, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 800, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 1000, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 1200, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 1400, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 1600, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 1800, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 2000, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 2200, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 2400, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 2600, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 2800, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 3000, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 3200, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 3400, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 3600, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 3800, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
            { x: 4000, y: Phaser.Math.Between(25, 75), imagen: nubeSel() },
        ];
        for (const nube of listaNubes) {
            const imagenNube = this.add.image(Phaser.Math.Between(nube.x - 200, nube.x), nube.y, nube.imagen)
                .setOrigin(0, 0)
                .setFlipX(Phaser.Math.Between(0, 1) === 0)
                .setDepth(ManejarDepthMainGame.profundidad1)
                .setScale(0.15);
            if (Phaser.Math.Between(0, 3) === 0) {
                this.add.image(imagenNube.x + Phaser.Math.Between(imagenNube.displayWidth * 0.75, imagenNube.displayWidth * 0.9), imagenNube.y, EnumImagenesEscenario.OverworldCloud2)
                    .setOrigin(0, 0)
                    .setFlipX(Phaser.Math.Between(0, 1) === 0)
                    .setDepth(ManejarDepthMainGame.profundidad1)
                    .setScale(0.15);
            }
        }

        const sueloY = this.cameras.main.displayHeight - 32;
        const listaMontanas = [
            {x: 25, y: sueloY, imagen: EnumImagenesEscenario.OverworldMountain1},
            {x: 100, y: sueloY, imagen: EnumImagenesEscenario.OverworldFence, scale: 0.40 },
            {x: 152, y: sueloY, imagen: EnumImagenesEscenario.OverworldFence, scale: 0.40 },
            {x: 300, y: sueloY, imagen: EnumImagenesEscenario.OverworldMountain2},
            {x: 400, y: sueloY, imagen: EnumImagenesEscenario.OverworldBush2},
            {x: 700, y: sueloY, imagen: EnumImagenesEscenario.OverworldBush1},
            {x: 1075, y: sueloY - 32, imagen: EnumImagenesEscenario.OverworldBush1},
            {x: 1250, y: sueloY, imagen: EnumImagenesEscenario.OverworldMountain2},
            {x: 1700, y: sueloY, imagen: EnumImagenesEscenario.OverworldBush2},
            {x: 2300, y: sueloY, imagen: EnumImagenesEscenario.OverworldMountain1},
            {x: 2500, y: sueloY, imagen: EnumImagenesEscenario.OverworldBush1},
            {x: 2775, y: sueloY, imagen: EnumImagenesEscenario.OverworldMountain1},
            {x: 2925, y: sueloY, imagen: EnumImagenesEscenario.OverworldMountain2},
            {x: 3150, y: sueloY, imagen: EnumImagenesEscenario.OverworldFence, scale: 0.40 },
            {x: 3202, y: sueloY, imagen: EnumImagenesEscenario.OverworldFence, scale: 0.40 },
            {x: 3254, y: sueloY, imagen: EnumImagenesEscenario.OverworldFence, scale: 0.40 },
            {x: 3330, y: sueloY, imagen: EnumImagenesEscenario.OverworldBush1, scale: 0.40 },
            {x: 3650, y: sueloY, imagen: EnumImagenesEscenario.OverworldMountain2, scale: 0.50 },
            {x: 3875, y: sueloY, imagen: EnumImagenesEscenario.OverworldMountain1, scale: 0.50 },
            {x: 3950, y: sueloY, imagen: EnumImagenesEscenario.OverworldBush2, scale: 0.50 },
        ];

        for (const item of listaMontanas) {
            this.add.image(item.x, item.y, item.imagen)
                .setOrigin(0.5, 1) // aca coloco 1 asi se pinta hacia arriba
                .setFlipX(Phaser.Math.Between(0, 1) === 0)
                .setDepth(ManejarDepthMainGame.profundidad1)
                .setScale(item.scale || Phaser.Math.FloatBetween(0.35, 0.85));
        }

        this.add.image(3750, sueloY, EnumImagenesEscenario.Castle)
            .setOrigin(0, 1);
    }

    crearGommbasTuberia(posx: number, posy: number) {
        this.eventoTiempoGoombas = this.time.addEvent({
            delay: 2000,
            callback: () => {
                const goomba = new GoombaComponent(this, posx, posy, this.escenario);
                this.physics.add.collider(this.mario, goomba, this.onHitEnemy, null!, this);
            },
            loop: true,            
        });
    }

    crearBloques() {
        const listaPosiciones = [
            { x: 1260, y: 170, moneda: true },
            { x: 1244, y: 170, moneda: true },
            { x: 2220, y: 160, moneda: true },
            { x: 2236, y: 160, moneda: false },
            { x: 2252, y: 160, moneda: true },
            { x: 2268, y: 160, moneda: false },
            { x: 2284, y: 160, moneda: true },
            { x: 2300, y: 160, moneda: false },
            { x: 2316, y: 160, moneda: true },
            { x: 2332, y: 160, moneda: false },
            { x: 2348, y: 160, moneda: true },
            { x: 2364, y: 160, moneda: false },
            { x: 2380, y: 160, moneda: true },
            { x: 2396, y: 160, moneda: false },
        ];
        for (const elem of listaPosiciones) {
            new BloqueComponent(this, elem.x, elem.y, this.mario, elem.moneda);
        }
    }

    crearBloquesMisteriosos() {
        const listaPosiciones: { x: number, y: number, moneda: boolean, tipoPowerUp?: TipoPowerUp }[] = [
            { x: 190, y: 145, moneda: true },
            { x: 250, y: 145, moneda: false, tipoPowerUp: TipoPowerUp.MushroomSuper },
            { x: 310, y: 145, moneda: true },
            { x: 2750, y: 150, moneda: false, tipoPowerUp: TipoPowerUp.MushroomSuperJump },
        ];
        for (const elem of listaPosiciones) {
            new BloqueMisteriosoComponent(this, elem.x, elem.y, this.escenario, this.mario, elem.moneda, elem.tipoPowerUp);
        }
    }
}
