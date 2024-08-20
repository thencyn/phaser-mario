# Mario Bros Phaser Typescript Version

Este repositorio no está diseñado para jugar, sino para aprender de forma más sencilla. Es un desarrollo creado con el objetivo de enseñar Phaser.js utilizando TypeScript. Aquí encontrarás un código más organizado y refactorizado en componentes, lo que facilita su comprensión y reutilización. La idea es que explores el código, lo modifiques y aprendas a desarrollar juegos utilizando esta tecnología de una manera más estructurada. Y por supuesto que el código es mejorable.

**[Demo](https://thencyn.github.io/phaser-mario/)**


## Recursos utilizados

**[Template Phaser](https://github.com/phaserjs/template-webpack-ts)**
**[Assets obtenidos Super Mario Phaser](https://github.com/decapapi/Super-Mario-Phaser)**
**[Ideas desde MiduDev](https://github.com/midudev/super-midu-bros)**
**[MiduDev video 01](https://www.youtube.com/watch?v=RBYCgS8Et7Y)**
**[MiduDev video 02](https://www.youtube.com/watch?v=kPgDqdCdjfE)**

## Librerias

- [Phaser 3.80.1](https://github.com/phaserjs/phaser)
- [Webpack 5.93.0](https://github.com/webpack/webpack)
- [TypeScript 5.5.4](https://github.com/microsoft/TypeScript)


## Requisitos

[Node.js](https://nodejs.org)

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm install` | Instalar dependencias del proyecto  |
| `npm run start:dev` | Ejecutar de forma local |
| `npm run build` | Crear build para instalar, output en la carpeta `dist` |


## Primera ejecución
Después de clonar el repositorio, ejecute `npm install` desde el directorio de su proyecto, posteriormente puede iniciar el servidor de desarrollo ejecutando `start:dev`.

El servidor de desarrollo se ejecuta en `http://localhost:8080` de forma predeterminada.

Una vez que el servidor se esté ejecutando, puede editar cualquiera de los archivos en la carpeta src. Webpack recompilará automáticamente su código y luego recargará el navegador. Puede modificar esto en el archivo `tsconfig.json`




## Estructura del proyecto

- `src/assets` - Contiene las imagenes, sonidos, fuentes y fuentes tipo bitmap utilizadas
- `src/ts` - Todos los archivos typescript del proyecto
- `src/ts/scenes` - Archivos de las escenas
- `src/ts/components` - Archivos de los componentes
- `src/ts/utilidades` - Archivos de los utilidades
- `src/main.ts` - El principal punto de **entrada**. Este contiene la configuración del juego y lo inicia.


#### Descripción de las escenas

| Escena | Descripción |
|---------|-------------|
| `BootScene` | Escena del template que carga las imagenes del background y logo de Phaser |
| `PreloaderScene` | Escena que carga todos nuestros assets y configura las animaciones |
| `PresentacionScene` | Efecto inicial del juego |
| `MainMenuScene` | Escena antes de comenzar donde podremos desactivar el sonido, ver las teclas y comenzar el juego |
| `IndicadoresScene` | Escena que se sobrepone a la escena del juego, donde se llevan las vidas, monedas y el puntaje |
| `GameScene` | Escena donde se realiza el juego, es decir donde esta **Mario** |
| `GameOverScene` | Escena de Fin de Juego |


#### Descripción de Utilidades

| Escena | Descripción |
|---------|-------------|
| `Diccionario` | Aca se realiza la configuracion de todos los **assets** del juego. Es importante no repetir nombres, por este motivo utilizamos **enum** y tambien se utilizan **diccionarios** para identificar los recursos que posteriorment son utilizados en la escena Preloader. En toda la aplicación solo accedemos a traves de **enum** con esto tendremos menos errores.   |
| `UtilSonido` | Esta utilidad se encarga de ejecutar todos los sonidos de nuestro juego, de una forma sencilla. |



#### Descripción de Componentes

| Escena | Descripción |
|---------|-------------|
| `BanderaComponent` | Componente que marca el fin de una etapa |
| `BloqueComponent` | Bloques que mario puede romper |
| `BloqueMisteriosoComponent` | Bloque ? donde se obtienen monedas o PowerUps  |
| `EscenarioComponent` | Este componente se utiliza para crear el escenario (suelo, tuberias y bloques inamovibles) |
| `GoombaComponent` | Componente que representa a un Goomba |
| `MarioComponent` | Componente que representa a Mario |
| `MonedaComponent` | Las monedas que podemos distribuir en nuestro escenario |
| `MushroomSuperComponent` | Champiñon para hacer crecer a Mario |
| `MushroomSuperJumpComponent` | Champiñon para hacer crecer a Mario y nos da el poder de saltar más alto de lo normal |
| `TuberiaComponent` | Componente independiente de tuberia, la idea es que entre en esta tuberia (no se utiliza) |


## 🛠️ Ejemplos
#### 🛠️ Crear Goombas

```js
for (let i = 0; i < 3; i++) {
    const goomba = new GoombaComponent(this, 300 + i * 20, pisoAltura - 40, this.escenario);
    this.physics.add.collider(this.mario, goomba, () => {
        this.onHitEnemy(this.mario, goomba);
    });
}
```

#### 🛠️ Crear infinitos Goombas
```js
this.time.addEvent({
    delay: 1500,
    callback: () => {
        const goomba = new GoombaComponent(this, 400, pisoAltura - 40, this.escenario);
        this.physics.add.collider(this.mario, goomba, () => {
            this.onHitEnemy(this.mario, goomba);
        });
    },
    repeat: -1,
});
```

#### 🛠️ Crear bloques misteriosos
```js
const listaPosiciones: { x: number, y: number, moneda: boolean, tipoPowerUp?: TipoPowerUp }[] = [
    { x: 190, y: 145, moneda: true },
    { x: 250, y: 145, moneda: false, tipoPowerUp: TipoPowerUp.MushroomSuper },
    { x: 310, y: 145, moneda: true },
    { x: 2750, y: 150, moneda: false, tipoPowerUp: TipoPowerUp.MushroomSuperJump },
];
for (const elem of listaPosiciones) {
    new BloqueMisteriosoComponent(this, elem.x, elem.y, this.escenario, this.mario, elem.moneda, elem.tipoPowerUp);
}
```

#### 🛠️ Crear Monedas
```js
const moneda = new MonedaComponent(this, 10, 100);
this.physics.add.overlap(this.mario, moneda, () => {
    moneda.recogerMoneda();
    this.mario.addToScore(100);
});
```






## Implementación en producción

Después de ejecutar el comando `npm run build`, el código generara un solo paquete y se guardará en la carpeta `dist`.

Para implementar el juego, necesitarás cargar todo el contenido de la carpeta `dist` en un servidor web público.

## Webpack

Si desea personalizar la compilación, se puede modificar el archivo `webpack/config.*.js`, o puede modificar y/o crear nuevos archivos de configuración. Consulte la [documentación de Webpack] (https://webpack.js.org/) para obtener más información.

## IDEAS
- Agregar el cambio de controles
- Las monedas y gommba deberia recibir a mario como parametro de entrada y dentro del componente resolver las colisiones con Mario, como se hace en otros componentes.
- Mario deberia tener una estrategia mas sencilla para sus movimientos, no deberia saltar sin parar al dejar el boton de salto presionado, tampoco deberia aumentar la velocidad (SPACE) estando en el aire.
- Deberia existir una clase `Colision Manager` y debería ser de instancia única.

## Join the Phaser Community!

We love to see what developers like you create with Phaser! It really motivates us to keep improving. So please join our community and show-off your work 😄

**Visit:** The [Phaser website](https://phaser.io) and follow on [Phaser Twitter](https://twitter.com/phaser_)<br />
**Play:** Some of the amazing games [#madewithphaser](https://twitter.com/search?q=%23madewithphaser&src=typed_query&f=live)<br />
**Learn:** [API Docs](https://newdocs.phaser.io), [Support Forum](https://phaser.discourse.group/) and [StackOverflow](https://stackoverflow.com/questions/tagged/phaser-framework)<br />
**Discord:** Join us on [Discord](https://discord.gg/phaser)<br />
**Code:** 2000+ [Examples](https://labs.phaser.io)<br />
**Read:** The [Phaser World](https://phaser.io/community/newsletter) Newsletter<br />

Created by [Phaser Studio](mailto:support@phaser.io). Powered by coffee, anime, pixels and love.

The Phaser logo and characters are &copy; 2011 - 2024 Phaser Studio Inc.

All rights reserved.
