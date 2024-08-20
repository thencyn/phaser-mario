// export class Diccionario {
//     static get Sonidos() { return EnumSonidos };
//     static get SonidosDetalles(): {[Alias: string]: {NombreArchivo: string}} { 
//         return EnumSonidosDetalles;
//     };
//     static get ImagenesEscenario() { return EnumImagenesEscenario };
//     static get ImagenesEscenarioDetalles(): {[Alias: string]: {NombreArchivo: string}} { 
//         return EnumImagenesEscenarioDetalles;
//     };
//     static get SpriteImagenes() { return EnumSpriteImagenes };
//     static get SpriteImagenesDetalles(): {[Alias: string]: {NombreArchivo: string, AnchoFrame: number, AltoFrame: number, FrameFinal?: number}} { 
//         return EnumSpriteImagenesDetalles;
//     };

//     static get SpriteImagenesAnimaciones() { return EnumSpriteImagenesAnimaciones };
// }

export enum EnumEventos {
	VidasActualizar = "EventoVidasActualizar",
	PuntajeActualizar = "EventoScoreActualizar",
    MonedasActualizar = "EventoMonedasActualizar",
}

export enum EnumVariables {
    MusicaEfectosActivada = 'VariableMusicaEfectosActivada',
    MusicaEfectosVolumen = 'VariableMusicaEfectosVolumen',
    MusicaActivada = 'VariableMusicaActivada',
    MusicaVolumen = 'VariableMusicaVolumen',
    JuegoPuntaje = 'VariableJuegoPuntaje',
    JuegoVidas = 'VariableJuegoVidas',
    JuegoMonedas = 'VariableJuegoMonedas',
}

export enum EnumImagenes {
    ColeccionablesChampinon = 'ImagenesColeccionablesChampinon',
    ColeccionablesVida = 'ImagenesColeccionablesVida',
    ColeccionablesExtraSuperJumpChampinon = 'ImagenesColeccionablesExtraSuperJumpChampinon',
};

export const EnumImagenesDetalles: {[Alias: string]: {NombreArchivo: string}} = {
    'ImagenesColeccionablesChampinon': { NombreArchivo: 'collectibles/super-mushroom.png' },
    'ImagenesColeccionablesVida': { NombreArchivo: 'collectibles/live-mushroom.png' },
    'ImagenesColeccionablesExtraSuperJumpChampinon': { NombreArchivo: 'extras/super-jump-mushroom.png' },

};

export enum EnumSpriteImagenes {
    Shell = 'SpriteImagenesShell',
    Fireball = 'SpriteImagenesFireball',
    FireballExplosion = 'SpriteImagenesFireballExplosion',
    Koopa = 'SpriteImagenesKoopa',
    Mario = 'SpriteImagenesMario',
    MarioFire = 'SpriteImagenesMarioFire',
    MarioGrown = 'SpriteImagenesMarioGrown',
    OverworldGoomba = 'SpriteImagenesOverworldGoomba',
    UndergroundGoomba = 'SpriteImagenesUndergroundGoomba',
    ColeccionablesMonedaUnderground = 'SpriteImagenesColeccionablesMonedaUnderground',
    ColeccionablesFlorFuegoUnderground = 'SpriteImagenesColeccionablesFlorFuegoUnderground',
    ColeccionablesMonedaOverworld = 'SpriteImagenesColeccionablesMonedaOverworld',
    ColeccionablesFlorFuegoOverworld = 'SpriteImagenesColeccionablesFlorFuegoOverworld',
    BlocksOverworldBrickDebris = 'SpriteImagenesBloquesOverworldBrickDebris',
    BlocksUndergroundBrickDebris = 'SpriteImagenesBloquesUndergroundBrickDebris',
    BlocksOverworldCustomBlock = 'SpriteImagenesBloquesOverworldCustomBlock',
    OverworldMisteryBlock = 'SpriteImagenesBloquesOverworldMisteryBlock',
    UndergroundMisteryBlock = 'SpriteImagenesBloquesUndergroundMisteryBlock',
    ExtrasConfeti = 'SpriteImagenesExtrasConfeti',
}

export const EnumSpriteImagenesDetalles: {[Alias: string]: {NombreArchivo: string, AnchoFrame: number, AltoFrame: number, FrameFinal?: number}} = {
	'SpriteImagenesShell': { NombreArchivo: 'entities/shell.png', AnchoFrame: 16, AltoFrame: 15 },
	'SpriteImagenesFireball': { NombreArchivo: 'entities/fireball.png', AnchoFrame: 8, AltoFrame: 8 },
	'SpriteImagenesFireballExplosion': { NombreArchivo: 'entities/fireball-explosion.png', AnchoFrame: 16, AltoFrame: 16 },
	'SpriteImagenesKoopa': { NombreArchivo: 'entities/koopa.png', AnchoFrame: 16, AltoFrame: 12 },
	'SpriteImagenesMario': { NombreArchivo: 'entities/mario.png', AnchoFrame: 18, AltoFrame: 16 },
	'SpriteImagenesMarioFire': { NombreArchivo: 'entities/mario-fire.png', AnchoFrame: 18, AltoFrame: 32 },
	'SpriteImagenesMarioGrown': { NombreArchivo: 'entities/mario-grown.png', AnchoFrame: 18, AltoFrame: 32 },
	'SpriteImagenesOverworldGoomba': { NombreArchivo: 'entities/overworld/goomba.png', AnchoFrame: 16, AltoFrame: 16 },
	'SpriteImagenesUndergroundGoomba': { NombreArchivo: 'entities/underground/goomba.png', AnchoFrame: 16, AltoFrame: 16 },
    'SpriteImagenesColeccionablesMonedaUnderground': { NombreArchivo: 'collectibles/underground/ground-coin.png', AnchoFrame: 10, AltoFrame: 14 },
    'SpriteImagenesColeccionablesFlorFuegoUnderground': { NombreArchivo: 'collectibles/underground/fire-flower.png', AnchoFrame: 16, AltoFrame: 16 },
    'SpriteImagenesColeccionablesMonedaOverworld': { NombreArchivo: 'collectibles/coin.png', AnchoFrame: 16, AltoFrame: 16 },
    'SpriteImagenesColeccionablesFlorFuegoOverworld': { NombreArchivo: 'collectibles/overworld/fire-flower.png', AnchoFrame: 16, AltoFrame: 16 },
    'SpriteImagenesBloquesOverworldBrickDebris': { NombreArchivo: 'blocks/overworld/brick-debris.png', AnchoFrame: 8, AltoFrame: 8 },
    'SpriteImagenesBloquesUndergroundBrickDebris': { NombreArchivo: 'blocks/underground/brick-debris.png', AnchoFrame: 8, AltoFrame: 8 },
    'SpriteImagenesBloquesOverworldCustomBlock': { NombreArchivo: 'blocks/overworld/customBlock.png', AnchoFrame: 16, AltoFrame: 16 },
    'SpriteImagenesBloquesOverworldMisteryBlock': { NombreArchivo: 'blocks/overworld/misteryBlock.png', AnchoFrame: 16, AltoFrame: 16 },
    'SpriteImagenesBloquesUndergroundMisteryBlock': { NombreArchivo: 'blocks/underground/misteryBlock.png', AnchoFrame: 16, AltoFrame: 16 },
    'SpriteImagenesExtrasConfeti': { NombreArchivo: 'extras/confeti.png', AnchoFrame: 16, AltoFrame: 16 },
};

export enum EnumSpriteImagenesAnimaciones {
    MarioWalk = 'AnimMarioWalk',
    MarioIdle = 'AnimMarioIdle',
    MarioJump = 'AnimMarioJump',
    MarioBigWalk = 'AnimMarioBigWalk',
    MarioBigIdle = 'AnimMarioBigIdle',
    MarioBigJump = 'AnimMarioBigJump',
    MarioBigCrouch = 'AnimMarioBigCrouch',
    MarioDead = 'AnimMarioDead',
    GoombaWalk = 'AnimGoombaWalk',
    GoombaHurt = 'AnimGoombaHurt',
    CoinIdle = 'AnimCoinIdle',
    UndergroundRomperBloque = 'AnimUndergroundRomperBloque',
    OverworldRomperBloque = 'AnimOverworldRomperBloque',
    CustomBlockDefault = 'AnimCustomBlockDefault',
    OverworldMisteryBlock = 'AnimOverworldMisteryBlock',
    UndergroundMisteryBlock = 'AnimUndergroundMisteryBlock',
}

// const EnumSpriteImagenesAnimacionesDetalle: {keyAnimacion: EnumSpriteImagenesAnimaciones, keySprite: EnumSpriteImagenes, star: number, end: number, frameRate: number, repeat: number}[] = [
//     {keyAnimacion: EnumSpriteImagenesAnimaciones.MarioWalk, keySprite: EnumSpriteImagenes.Mario, star: 1, end: 3, frameRate: 12, repeat: -1},
// ];


export enum EnumImagenesEscenario {
    Castle = 'ImagenesEscenarioCastle',
    VerticalSmallTube = 'ImagenesEscenarioVerticalSmallTube',
    FinalFlag = 'ImagenesEscenarioFinalFlag',
    FlagMast = 'ImagenesEscenarioFlagMast',
    HorizontalFinalTube = 'ImagenesEscenarioHorizontalFinalTube',
    HorizontalTube = 'ImagenesEscenarioHorizontalTube',
    Pipe1 = 'ImagenesEscenarioPipe1',
    Pipe2 = 'ImagenesEscenarioPipe2',
    Sign = 'ImagenesEscenarioSign',
    VerticalLargeTube = 'ImagenesEscenarioVerticalLargeTube',
    VerticalLargeTube2 = 'ImagenesEscenarioVerticalLargeTube2',
    VerticalMediumTube = 'ImagenesEscenarioVerticalMediumTube',
    UndergroundFloorbricks = 'ImagenesEscenarioUndergroundFloorbricks',
    OverworldMountain2 = 'ImagenesEscenarioOverworldMountain2',
    OverworldBush1 = 'ImagenesEscenarioOverworldBush1',
    OverworldBush2 = 'ImagenesEscenarioOverworldBush2',
    OverworldCloud1 = 'ImagenesEscenarioOverworldCloud1',
    OverworldCloud2 = 'ImagenesEscenarioOverworldCloud2',
    OverworldFence = 'ImagenesEscenarioOverworldFence',
    OverworldFloorbricks = 'ImagenesEscenarioOverworldFloorbricks',
    OverworldMountain1 = 'ImagenesEscenarioOverworldMountain1',
};

export const EnumImagenesEscenarioDetalles: {[Alias: string]: {NombreArchivo: string}} = {
    'ImagenesEscenarioCastle' : {NombreArchivo: 'scenery/castle.png'},
    'ImagenesEscenarioVerticalSmallTube' : {NombreArchivo: 'scenery/vertical-small-tube.png'},
    'ImagenesEscenarioFinalFlag' : {NombreArchivo: 'scenery/final-flag.png'},
    'ImagenesEscenarioFlagMast' : {NombreArchivo: 'scenery/flag-mast.png'},
    'ImagenesEscenarioHorizontalFinalTube' : {NombreArchivo: 'scenery/horizontal-final-tube.png'},
    'ImagenesEscenarioHorizontalTube' : {NombreArchivo: 'scenery/horizontal-tube.png'},
    'ImagenesEscenarioPipe1' : {NombreArchivo: 'scenery/pipe1.png'},
    'ImagenesEscenarioPipe2' : {NombreArchivo: 'scenery/pipe2.png'},
    'ImagenesEscenarioSign' : {NombreArchivo: 'scenery/sign.png'},
    'ImagenesEscenarioVerticalLargeTube' : {NombreArchivo: 'scenery/vertical-large-tube.png'},
    'ImagenesEscenarioVerticalLargeTube2' : {NombreArchivo: 'scenery/vertical-large-tube.png.png'},
    'ImagenesEscenarioVerticalMediumTube' : {NombreArchivo: 'scenery/vertical-medium-tube.png'},
    'ImagenesEscenarioUndergroundFloorbricks' : {NombreArchivo: 'scenery/underground/floorbricks.png'},
    'ImagenesEscenarioOverworldMountain2' : {NombreArchivo: 'scenery/overworld/mountain2.png'},
    'ImagenesEscenarioOverworldBush1' : {NombreArchivo: 'scenery/overworld/bush1.png'},
    'ImagenesEscenarioOverworldBush2' : {NombreArchivo: 'scenery/overworld/bush2.png'},
    'ImagenesEscenarioOverworldCloud1' : {NombreArchivo: 'scenery/overworld/cloud1.png'},
    'ImagenesEscenarioOverworldCloud2' : {NombreArchivo: 'scenery/overworld/cloud2.png'},
    'ImagenesEscenarioOverworldFence' : {NombreArchivo: 'scenery/overworld/fence.png'},
    'ImagenesEscenarioOverworldFloorbricks' : {NombreArchivo: 'scenery/overworld/floorbricks.png'},
    'ImagenesEscenarioOverworldMountain1' : {NombreArchivo: 'scenery/overworld/mountain1.png'},
};


export enum EnumImagenesBloques {
    OverworldBlock = 'ImagenesBloquesOverworldBlock',
    OverworldEmptyBlock = 'ImagenesBloquesOverworldEmptyBlock',
    OverworldImmovableBlock = 'ImagenesBloquesOverworldImmovableBlock',
    UndergroundBlock = 'ImagenesBloquesUndergroundBlock',
    UndergroundBlock2 = 'ImagenesBloquesUndergroundBlock2',
    UndergroundEmptyBlock = 'ImagenesBloquesUndergroundEmptyBlock',
    UndergroundImmovableBlock = 'ImagenesBloquesUndergroundImmovableBlock',

}

export const EnumImagenesBloquesDetalles: {[Alias: string]: {NombreArchivo: string}} = {
    
    'ImagenesBloquesOverworldBlock' : {NombreArchivo: 'blocks/overworld/block.png'},
    'ImagenesBloquesOverworldEmptyBlock' : {NombreArchivo: 'blocks/overworld/emptyBlock.png'},
    'ImagenesBloquesOverworldImmovableBlock' : {NombreArchivo: 'blocks/overworld/immovableBlock.png'},
    'ImagenesBloquesUndergroundBlock' : {NombreArchivo: 'blocks/underground/block.png'},
    'ImagenesBloquesUndergroundBlock2' : {NombreArchivo: 'blocks/underground/block2.png'},
    'ImagenesBloquesUndergroundEmptyBlock' : {NombreArchivo: 'blocks/underground/emptyBlock.png'},
    'ImagenesBloquesUndergroundImmovableBlock' : {NombreArchivo: 'blocks/underground/immovableBlock.png'},
};



export enum EnumSonidos {
    EfectoFlagpole = 'SonidoFlagpole',
    EfectoBlockBump = 'SonidoBlockBump',
    EfectoBreakBlock = 'SonidoBreakBlock',
    EfectoCoin = 'SonidoCoin',
    EfectoConsumePowerup = 'SonidoConsumePowerup',
    EfectoCursedHereWeGo = 'SonidoCursedHereWeGo',
    EfectoFireball = 'SonidoFireball',
    EfectoPause = 'SonidoPause',
    EfectoGoombaStomp = 'SonidoGoombaStomp',
    EfectoHereWeGo = 'SonidoHereWeGo',
    EfectoJump = 'SonidoJump',
    EfectoKick = 'SonidoKick',
    EfectoTimeWarning = 'SonidoTimeWarning',
    EfectoPowerdown = 'SonidoPowerdown',
    EfectoPowerupAppears = 'SonidoPowerupAppears',
    MusicOverworldHurryUpTheme = 'SonidoMusicOverworldHurryUpTheme',
    MusicOverworldTheme = 'SonidoMusicOverworldTheme',
    MusicUndergroundTheme = 'SonidoMusicUndergroundTheme',
    MusicUndergroundHurryUpTheme = 'SonidoMusicUndergroundHurryUpTheme',
    MusicGameover = 'SonidoMusicGameover',
    MusicWin = 'SonidoMusicWin',
    
};

export const EnumSonidosDetalles: {[Alias: string]: {NombreArchivo: string}} = {
    'SonidoFlagpole' : {NombreArchivo: 'sound/effects/flagpole.mp3'},
    'SonidoBlockBump' : {NombreArchivo: 'sound/effects/block-bump.wav'},
    'SonidoBreakBlock' : {NombreArchivo: 'sound/effects/break-block.wav'},
    'SonidoCoin' : {NombreArchivo: 'sound/effects/coin.mp3'},
    'SonidoConsumePowerup' : {NombreArchivo: 'sound/effects/consume-powerup.mp3'},
    'SonidoCursedHereWeGo' : {NombreArchivo: 'sound/effects/cursed-here-we-go.mp3'},
    'SonidoFireball' : {NombreArchivo: 'sound/effects/fireball.mp3'},
    'SonidoPause' : {NombreArchivo: 'sound/effects/pause.wav'},
    'SonidoGoombaStomp' : {NombreArchivo: 'sound/effects/goomba-stomp.wav'},
    'SonidoHereWeGo' : {NombreArchivo: 'sound/effects/here-we-go.mp3'},
    'SonidoJump' : {NombreArchivo: 'sound/effects/jump.mp3'},
    'SonidoKick' : {NombreArchivo: 'sound/effects/kick.mp3'},
    'SonidoTimeWarning' : {NombreArchivo: 'sound/effects/time-warning.mp3'},
    'SonidoPowerdown' : {NombreArchivo: 'sound/effects/powerdown.mp3'},
    'SonidoPowerupAppears' : {NombreArchivo: 'sound/effects/powerup-appears.mp3'},
    'SonidoMusicOverworldHurryUpTheme' : {NombreArchivo: 'sound/music/overworld/hurry-up-theme.mp3'},
    'SonidoMusicOverworldTheme' : {NombreArchivo: 'sound/music/overworld/theme.mp3'},
    'SonidoMusicUndergroundTheme' : {NombreArchivo: 'sound/music/underground/theme.mp3'},
    'SonidoMusicUndergroundHurryUpTheme' : {NombreArchivo: 'sound/music/underground/hurry-up-theme.mp3'},
    'SonidoMusicGameover' : {NombreArchivo: 'sound/music/gameover.mp3'},
    'SonidoMusicWin' : {NombreArchivo: 'sound/music/win.wav'},
};

export enum AtlasImagenesExtras {
    Logo = 'logo',
    LuzDorada = 'luz-dorada',
    Estrella = 'estrella',
    FuegoBlanco = 'fuego-blanco',
};

export enum AtlasImagenes {
	Extras = 'AtlasExtras',
}

export const AtlasImagenesDetalles: {[Alias: string]: {NombreArchivoImagen: string, NombreArchivoAtlas: string, prefijoFrame: string, callbackObtenerFrame: (frame: number | string) => string }} = {
	'AtlasExtras': { NombreArchivoImagen: 'extras/imagenes-extras.png', NombreArchivoAtlas: 'extras/imagenes-extras_atlas.json', prefijoFrame: '', callbackObtenerFrame: (frame: number | string) => `${frame}` },
};

// export const EnumImagenesExtrasDetalles: {[Alias: string]: {NombreArchivo: string}} = {
//     ['ImagenesExtrasFuegoBlanco'] : {NombreArchivo: 'extras/fuego-blanco.png'},
//     ['ImagenesExtrasEstrella'] : {NombreArchivo: 'extras/estrella.png'},
//     ['ImagenesExtrasLogo'] : {NombreArchivo: 'extras/logo.png'},
//     ['ImagenesExtrasFuegoBrillante'] : {NombreArchivo: 'extras/fuego-brillante.png'},
//     ['ImagenesExtrasLuzDorada'] : {NombreArchivo: 'extras/luz-dorada.png'},
// };




export const ManejarDepthMainGame = {
	profundidad0: 0,

    /** Adornos nubes, montañas*/
	profundidad1: 10,

    /*** Base del escenarios */
	profundidad2: 20,

	profundidad3: 30,
	profundidad4: 40,
	profundidad5: 50,
	profundidad6: 60,

    /** mario y enemigos */
	profundidad7: 70,
}

export enum EstadoMario {
    Normal,
    Grande,
    SuperJump,
}


export enum TipoPowerUp {
    MushroomSuper,
    MushroomSuperJump,
}