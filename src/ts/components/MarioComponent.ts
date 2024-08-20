import GameOverScene from "../scenes/GameOverScene";
import GameScene from "../scenes/GameScene";
import IndicadoresScene from "../scenes/IndicadoresScene";
import { EnumEventos, AtlasImagenesExtras, EnumSonidos, EnumSpriteImagenes, EnumSpriteImagenesAnimaciones, EnumVariables, ManejarDepthMainGame, AtlasImagenes, EstadoMario } from "../utilidades/Diccionario";
import { UtilSonido } from "../utilidades/UtilSonido";

// export class MarioComponent extends Phaser.Physics.Arcade.Sprite implements Phaser.Physics.Arcade.Body {
export class MarioComponent extends Phaser.Physics.Arcade.Sprite {
    //Phaser.Physics.Arcade.StaticBody
    body: Phaser.Physics.Arcade.Body;
    isDead: boolean = false;
    isPlayerBlocked = false;
    MARIO_ANIMATIONS = {
        grown: {
            idle: EnumSpriteImagenesAnimaciones.MarioBigIdle,
            walk: EnumSpriteImagenesAnimaciones.MarioBigWalk,
            jump: EnumSpriteImagenesAnimaciones.MarioBigJump,
            crouch: EnumSpriteImagenesAnimaciones.MarioBigCrouch,
        },
        normal: {
            idle: EnumSpriteImagenesAnimaciones.MarioIdle,
            walk: EnumSpriteImagenesAnimaciones.MarioWalk,
            jump: EnumSpriteImagenesAnimaciones.MarioJump,
            crouch: null,
        }
    };
    estadoMario: EstadoMario = EstadoMario.Normal;
    velocidad = 100;
    particulaCorrer: Phaser.GameObjects.Particles.ParticleEmitter;
    constructor(scene: Phaser.Scene, x: number, y: number, private escenario: Phaser.Physics.Arcade.StaticGroup, private keys: Phaser.Types.Input.Keyboard.CursorKeys) {
        super(scene, x, y, EnumSpriteImagenes.Mario);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // this.setOrigin(0, 1)
        this.setOrigin(0.5, 0.5)
        this.setCollideWorldBounds(true)
        this.setGravityY(300);
        this.setDepth(ManejarDepthMainGame.profundidad7);
        this.body = this.body as Phaser.Physics.Arcade.Body;
        this.body?.setSize(this.width - (this.width * 0.35), this.height);
        this.scene.physics.add.collider(this, this.escenario);
        this.scene.cameras.main.startFollow(this);        

        this.particulaCorrer = this.scene.add.particles(0, 0, AtlasImagenes.Extras, {
			frame: AtlasImagenesExtras.FuegoBlanco,
			color: [ 0xffffff, 0xcccccc, 0xf2f2f2, 0xbfbfbf ],
			colorEase: 'quad.out',
			lifespan: 350,
			angle: { min: -100, max: -80 },
			scale: { start: 0.35, end: 0, ease: 'sine.in' },
			speedX: 75,
			speedY: { min: -50, max: 0 },
			gravityX: -300,
			// advance: 2000,
			blendMode: 'ADD',
			follow: this,
			followOffset: { x: 0, y: this.displayHeight * 0.5 },
			emitting: false,
		}).setDepth(ManejarDepthMainGame.profundidad3);
    }

    moverMario() {
        // const isMarioTouchingFloor = this.body!.touching.down;
        if (this.isDead) return
        if (this.isPlayerBlocked) return
        const isMarioTouchingFloor = this.body!.onFloor();
        const isLeftKeyDown = this.keys.left.isDown;
        const isRightKeyDown = this.keys.right.isDown;
        const isUpKeyDown = this.keys.up.isDown;
        const isDownKeyDown = this.keys.down.isDown;
        const speedExtra = this.keys.space.isDown ? 1.5 : 1;
        this.particulaCorrer.emitting = this.keys.space.isDown && (isLeftKeyDown || isRightKeyDown);
        if ((isLeftKeyDown || isRightKeyDown)) {
            this.particulaCorrer.speedX = 75 * [1, -1][+isRightKeyDown];
            this.particulaCorrer.setParticleGravity(300 * [1, -1][+isRightKeyDown], 0);
            // this.particulaCorrer.followOffset = new Phaser.Math.Vector2(0, this.displayHeight * 0.5);
        }
        
        if (!isLeftKeyDown && !isRightKeyDown) this.setVelocityX(0);

        const marioAnimations = this.estadoMario === EstadoMario.Normal ? this.MARIO_ANIMATIONS.normal : this.MARIO_ANIMATIONS.grown;

        if (isLeftKeyDown) {
            isMarioTouchingFloor && this.anims.play(marioAnimations.walk, true);
            this.setVelocityX(-this.velocidad * speedExtra);
            this.flipX = true;
        } else if (isRightKeyDown) {
            isMarioTouchingFloor && this.anims.play(marioAnimations.walk, true);
            this.setVelocityX(this.velocidad * speedExtra);
            this.flipX = false;
        } else if (isDownKeyDown && isMarioTouchingFloor && [EstadoMario.Grande, EstadoMario.SuperJump].includes(this.estadoMario)) {
            this.anims.play(marioAnimations.crouch!, true);
        } else if (isMarioTouchingFloor) {
            this.anims.play(marioAnimations.idle, true);
        }
        
        if (isUpKeyDown && isMarioTouchingFloor) {            
            this.setVelocityY(-250 + (this.estadoMario === EstadoMario.SuperJump ? -50 : 0));
            UtilSonido.reproducirSonidoEfecto(this.scene, EnumSonidos.EfectoJump);
            this.anims.play(marioAnimations.jump, true);
        }

        if (this.y >= this.scene.cameras.main.displayHeight) {
            this.killMario()
        }
    }

    degradarMario() {
        this.clearTint();
        if (this.estadoMario === EstadoMario.Normal) {
            this.killMario();
            return;
        }
        this.isPlayerBlocked = true;
        this.scene.physics.world.pause();
        this.scene.anims.pauseAll();
        UtilSonido.reproducirSonidoEfecto(this.scene, EnumSonidos.EfectoPowerdown);
        this.scene.tweens.addCounter({
            from: 1,
            to: 8,
            duration: 1000,
            ease: 'linear',
            onStart: () => {
                // 
            },
            onUpdate: tween => {
                const value = Math.round(tween.getValue());
                this.setTexture(value % 2 === 0 ? EnumSpriteImagenes.Mario : EnumSpriteImagenes.MarioGrown);
            },
            onComplete: () => {
                this.anims.play(EnumSpriteImagenesAnimaciones.MarioIdle, true);
                this.estadoMario = EstadoMario.Normal;
                this.body?.setSize(this.width - (this.width * 0.35), this.height);
                this.refreshBody();
                // this.setPosition(this.x, this.y - 16);
                this.scene.anims.resumeAll();
                this.isPlayerBlocked = false;
                this.scene.physics.world.resume();
            },
        });
    }

    killMario() {
        if (this.isDead) return;

        this.isDead = true;
        this.anims.play(EnumSpriteImagenesAnimaciones.MarioDead);
        this.setCollideWorldBounds(false);
        UtilSonido.reproducirSonidoEfecto(this.scene, EnumSonidos.MusicGameover);

        this.body!.checkCollision.none = true;
        this.setVelocityX(0);
        const vidasActual = +this.scene.registry.get(EnumVariables.JuegoVidas) - 1;
        this.scene.registry.set(EnumVariables.JuegoVidas, vidasActual);
        this.scene.registry.events.emit(EnumEventos.VidasActualizar, vidasActual);

        this.scene.time.delayedCall(100, () => this.setVelocityY(-250));
        this.scene.time.delayedCall(2000, () => {
            if (vidasActual > 0) {
                this.scene.game.scene.start(GameScene.Name);
            } else {
                this.scene.registry.events.removeAllListeners();
                this.scene.game.scene.start(GameOverScene.Name);
                this.scene.game.scene.stop(IndicadoresScene.Name);
                this.scene.game.scene.stop(GameScene.Name);
            }
        });
    }

    addToScore (scoreToAdd: number) {
        const scoreText = this.scene.add.text(this.x, this.y, `${scoreToAdd}`, { fontFamily: 'pixel', fontSize: 8, fontStyle: 'bold' }).setDepth(ManejarDepthMainGame.profundidad7);
        this.scene.tweens.chain({
            tweens: [
                {
                    targets: scoreText,
                    duration: 500,
                    y: scoreText.y - 20,
                },
                {
                    targets: scoreText,
                    duration: 100,
                    alpha: 0,
                }
            ],
            onComplete: () => {
                scoreText.destroy()
            }
        });
        this.scene.registry.events.emit(EnumEventos.PuntajeActualizar, scoreToAdd);
    }
    
    recogerPowerUp(nuevoEstado: EstadoMario) {
        this.addToScore(1000);
        if (this.estadoMario === nuevoEstado) {
            return;
        }
        

        this.isPlayerBlocked = true;
        this.scene.physics.world.pause();
        this.scene.anims.pauseAll();
        UtilSonido.reproducirSonidoEfecto(this.scene, EnumSonidos.EfectoConsumePowerup);
        this.scene.add.particles(0, 0, AtlasImagenes.Extras, {
            frame: AtlasImagenesExtras.FuegoBlanco,
            tint: 0xf83800,
            lifespan: 1500,
            speed: { min: 10, max: 20 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            alpha: { start: 1, end: 0 },
            blendMode: Phaser.BlendModes.ADD,
            quantity: 10, // Cantidad de partículas emitidas por llamada
            frequency: 100, // Frecuencia de emisión en milisegundos
            duration: 1000,
            follow: this,
        }).setDepth(ManejarDepthMainGame.profundidad6);
        this.scene.tweens.addCounter({
            from: 1,
            to: 8,
            duration: 1000,
            ease: 'linear',
            onStart: () => {
                // 
            },
            onUpdate: tween => {
                const value = Math.round(tween.getValue());
                this.setTexture(value % 2 === 0 ? EnumSpriteImagenes.Mario : EnumSpriteImagenes.MarioGrown);
                if (nuevoEstado === EstadoMario.SuperJump) {
                    value % 2 === 0 ? this.setTint(0x8cfffb) : this.clearTint();
                }
                // this.anims.play(value % 2 === 0 ? EnumSpriteImagenesAnimaciones.MarioBigIdle : EnumSpriteImagenesAnimaciones.MarioIdle, true);
            },
            onComplete: () => {
                this.anims.play(EnumSpriteImagenesAnimaciones.MarioBigIdle, true);
                if (nuevoEstado === EstadoMario.SuperJump) {
                    this.setTint(0x8cfffb);
                }
                this.estadoMario = nuevoEstado;
                this.setPosition(this.x, this.y - 16);
                this.scene.anims.resumeAll();
                this.isPlayerBlocked = false;
                this.body?.setSize(this.width - (this.width * 0.35), this.height);
                this.refreshBody();
                this.scene.physics.world.resume();
            },
        });
    }

    tomarBandera() {
        this.particulaCorrer.emitting = false;
        this.scene.physics.world.pause();
        // this.scene.anims.pauseAll();
        this.isPlayerBlocked = true;
        this.setVelocityX(0);
        this.x += 6;
        // this.scene.cameras.main.stopFollow();
        // this.anims.play(EnumSpriteImagenesAnimaciones.MarioFlag, true);
        const piso = this.scene.cameras.main.displayHeight - 32;
        const marioAnimations = this.estadoMario === EstadoMario.Normal ? this.MARIO_ANIMATIONS.normal : this.MARIO_ANIMATIONS.grown;
        this.scene.tweens.chain({
                tweens: [
                    {
                        targets: this,
                        duration: 1000,
                        y: piso - 16 - this.displayWidth,
                        onComplete: () => {
                            this.x += 12;
                            this.setFlipX(true);
                        }
                    },
                    {
                        targets: this,
                        duration: 300,
                        x: this.x + 25,
                    },
                    {
                        targets: this,
                        duration: 300,
                        y: piso - this.displayHeight / 2,
                        onComplete: () => {
                            this.setFlipX(false);
                            this.scene.physics.world.resume();
                        }
                    },
                    {
                        targets: this,
                        duration: 2000,
                        x: 3790,
                        onStart: () => {
                            this.play(marioAnimations.walk, true);
                        },
                        onComplete: () => {
                            this.play(marioAnimations.idle, true);
                        }
                    },
                ]                
            });
    }
}