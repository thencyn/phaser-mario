import { EnumImagenesBloques, EnumImagenesEscenario, ManejarDepthMainGame } from "../utilidades/Diccionario";

export class EscenarioComponent extends Phaser.Physics.Arcade.StaticGroup {
  private depth = {
    suelo: ManejarDepthMainGame.profundidad2,
    tuberias: ManejarDepthMainGame.profundidad2 - 1,
    bloques: ManejarDepthMainGame.profundidad2,
  }
  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene, private config: IConfigEscenario) {
    super(world, scene);
    this.construirPiso();
    this.construirTuberias();
    this.construirBloques();
  }

  private construirPiso() {
    const configPiso = this.config.piso;
    const texture = this.scene.textures.get(configPiso.imagen);
    const anchoImagenPiso = texture.getSourceImage().width;
    const altoImagenPiso = texture.getSourceImage().height;
    let posX = 0;
    const listaSuelo: {y: number, x: number, ancho: number}[] = [];
    for (const element of configPiso.listaPuntos) {
      posX = element.xInicial;
      while (posX < element.xFinal) {
        const ancho = Math.min(anchoImagenPiso, element.xFinal - posX);
        listaSuelo.push({y: element.y, x: posX, ancho});
        posX += ancho;
      }
    }

    
    
    for (const element of listaSuelo) {
      if (element.ancho < anchoImagenPiso) {
        //Esto lo hago porque la imagen del piso se deforma el cambiar el tamaño, y la corto conserva la propiedad de las fisicas del piso
        //Y con esto quedaria un piso invisible con las fisicas del piso
        const imagenSuelo = this.scene.add.image(element.x, element.y, configPiso.imagen)
          .setVisible(false)
          .setDisplaySize(element.ancho, altoImagenPiso)
          .setOrigin(0, 0)
          .setDepth(this.depth.suelo);
        this.add(imagenSuelo);
        this.scene.add.image(element.x, element.y, configPiso.imagen)
          .setOrigin(0, 0)
          .setCrop(0, 0, element.ancho, altoImagenPiso)
          .setDepth(this.depth.suelo);
      } else {
        const imagenSuelo = this.scene.add.image(element.x, element.y, configPiso.imagen)
          .setOrigin(0, 0)
          .setDepth(this.depth.suelo);
        this.add(imagenSuelo);
      }
    }
    this.refresh();

    // this.create(element.x, element.y, configPiso.imagen)
    //   .setOrigin(0, 0.5)
    //   .refreshBody();
    //     this.create(0, this.scene.cameras.main.displayHeight - 16, configPiso.imagen)
    //       .setOrigin(0, 0.5)
    //       .refreshBody();
    //     this.create((<Phaser.Physics.Arcade.Sprite>this.getChildren()[0]).displayWidth, this.scene.cameras.main.displayHeight - 16, configPiso.imagen)
    //       .setOrigin(0, 0.5)
    //       .refreshBody();
    //     this.create((<Phaser.Physics.Arcade.Sprite>this.getChildren()[1]).x + (<Phaser.Physics.Arcade.Sprite>this.getChildren()[1]).displayWidth + 50, this.scene.cameras.main.displayHeight - 16, configPiso.imagen)
    //       .setOrigin(0, 0.5)
    //       .refreshBody();
  }

  private construirTuberias() {
    const configTuberias = this.config.tuberias;
    if (!configTuberias) return;

    for (const element of configTuberias.lista) {
      const imagenTuberia = this.scene.add.image(element.x, element.y, element.imagen)
        .setOrigin(0, 0)
        .setDepth(this.depth.tuberias);
      this.add(imagenTuberia)
    }
  }

  private construirBloques() {
    const configBloques = this.config.bloquesInmovibles;
    if (!configBloques) return;

    for (const element of configBloques) {
      const imagenBloque = this.scene.add.image(element.x, element.y, EnumImagenesBloques.OverworldImmovableBlock)
      .setOrigin(0, 0)
      .setDepth(this.depth.bloques);
      this.add(imagenBloque)      
    }
  }
}

interface IConfigEscenario {
  piso: {
    listaPuntos: Array<{ xInicial: number; xFinal: number; y: number }>;
    imagen: EnumImagenesEscenario;
  };
  tuberias?: {
    lista: Array<{ x: number; y: number, imagen: EnumImagenesEscenario }>;
  };
  bloquesInmovibles?: { x: number; y: number}[];
}
