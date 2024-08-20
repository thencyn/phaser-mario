import Phaser from "phaser";
import { EnumSonidos, EnumVariables } from "./Diccionario";

export class UtilSonido {
    static reproducirSonidoEfecto(escena: Phaser.Scene, sonido: EnumSonidos ) {
        const efectos = <boolean> escena.registry.get(EnumVariables.MusicaEfectosActivada);
        if (efectos) {
            const volumen = <number> escena.registry.get(EnumVariables.MusicaEfectosVolumen);
            if ([EnumSonidos.EfectoBlockBump, EnumSonidos.EfectoBreakBlock, EnumSonidos.EfectoGoombaStomp].includes(sonido)) {
                //ESto lo hago porque estos 3 sonidos son muy bajos y no se escuchan bien
                escena.sound.play(sonido, { volume: 0.90 });
            } else {
                escena.sound.play(sonido, {volume: volumen / 100});
            }
        }
    }

    static reproducirMusicaFondo(escena: Phaser.Scene, sonidoSeleccionado: EnumSonidos.MusicOverworldHurryUpTheme | EnumSonidos.MusicOverworldTheme | EnumSonidos.MusicUndergroundTheme | EnumSonidos.MusicUndergroundHurryUpTheme) {
        const activada = <boolean> escena.registry.get(EnumVariables.MusicaActivada);
        if (activada) {
            const volumen = <number> escena.registry.get(EnumVariables.MusicaVolumen);
            //Los sonidos con loop True tienen distinto comportamiento a las otras
            for (const element of [EnumSonidos.MusicOverworldHurryUpTheme, EnumSonidos.MusicOverworldTheme, EnumSonidos.MusicUndergroundTheme, EnumSonidos.MusicUndergroundHurryUpTheme]) {
                const sonido = escena.sound.get(element);
                if (sonido?.isPlaying) {
                    sonido.stop();
                }
                
                if (element === sonidoSeleccionado) {                    
                    if (!sonido) {
                        escena.sound.play(sonidoSeleccionado, { loop: true, volume: volumen / 100 });
                    } else {
                        sonido.play({loop: true, volume: volumen / 100});
                    }
                }
            }
        }
    }

    static detenerMusicaFondo(escena: Phaser.Scene) {
        for (const element of [EnumSonidos.MusicOverworldHurryUpTheme, EnumSonidos.MusicOverworldTheme, EnumSonidos.MusicUndergroundTheme, EnumSonidos.MusicUndergroundHurryUpTheme]) {
            const sonido = escena.sound.get(element);
            if (sonido?.isPlaying) {
                sonido.stop();
            }
        }
    }
}



