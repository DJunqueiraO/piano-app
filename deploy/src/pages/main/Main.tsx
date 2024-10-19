
import { Piano } from "./piano/Piano";
import './Main.css'
import { ClearButtons, LocalStorage, useStateAsObject } from "../../utils/Utils";
import { Div } from "../../components/Components";
import { Tools } from "./tools/Tools";
import { useEffect, useMemo } from "react";
import { Note, KeyboardProps, PlayMode } from "../../models/Models";
import { MidiPlayer } from "./midi_player/MidiPlayer";
import { KeyboardParameters } from "../../keyboards/Keyboards";
import { play_modes } from "../../assets/Assets";
import { PianoAudioContext } from "../../utils/piano_audio_context/PianoAudioContext";

export function Main() {

    const local_storage_keyboard_parameters = new LocalStorage('keyboard_parameters')

    const get_keyboard_parameters: () => KeyboardParameters = () => {
        const keyboard_parameters = local_storage_keyboard_parameters.get()
        if(!keyboard_parameters) {
            local_storage_keyboard_parameters.set(
                JSON.stringify(new KeyboardParameters())
            )
        }
        return JSON.parse(`${keyboard_parameters}`) || new KeyboardParameters()
    }

    const keyboard_parameters = get_keyboard_parameters()

    const upper = useStateAsObject<number>(keyboard_parameters?.upper)
    const volume = useStateAsObject<number>(keyboard_parameters?.volume)
    const duration = useStateAsObject<number>(keyboard_parameters?.duration)
    const instrument = useStateAsObject<number>(keyboard_parameters?.instrument)
    const play_notes = useStateAsObject<Note[]>(keyboard_parameters?.play_notes)
    const play_mode = useStateAsObject<PlayMode>(keyboard_parameters?.play_mode)
    const keyboard = useStateAsObject<string>(keyboard_parameters?.keyboard)
    const velocity = useStateAsObject<number>(keyboard_parameters?.velocity)

    const note_props: KeyboardProps = useMemo(
        () => {
            return {
                play_notes: play_notes,
                upper: upper,
                volume: volume,
                duration: duration,
                instrument: instrument,
                play_mode: play_mode,
                keyboard: keyboard,
                velocity: velocity
            }
        }, 
        [
            play_notes, 
            upper, 
            volume, 
            duration, 
            instrument, 
            play_mode, 
            keyboard, 
            velocity
        ]
    )

    const onKeyDown = (event: KeyboardEvent) => {
        const {key, code, ctrlKey, target, altKey} = event

        if(target instanceof HTMLInputElement) {
            return
        }


        const play = () => {
            let next_play_mode = (
                get_keyboard_parameters().play_mode.name === 'play'?
                'pause'
                :
                'play'
            )
            if(ctrlKey) {
                PianoAudioContext.set_current_note(0)
                next_play_mode = 'stop'
            }
            play_mode.set(
                new PlayMode(play_modes.find(mode => mode.name === (next_play_mode)))
            )
        }
        const back = () => {
            if(!ctrlKey) return
            PianoAudioContext.decrement_current_note()
            play_mode.set(new PlayMode(play_modes.find(mode => mode.name === 'back')))
        }
        const next = () => {
            if(!ctrlKey) return
            PianoAudioContext.increment_current_note(play_notes?.get() || [])
            play_mode.set(new PlayMode(play_modes.find(mode => mode.name === 'next')))
        }
        const tone = (by: number) => {
            const current_upper = get_keyboard_parameters().upper
            upper.set(current_upper + by)
        }
        const controls = {
            ' ': play,
            'Space': play,
            'z': back,
            'ArrowLeft': back,
            'y': next,
            'ArrowRight': next,
            'PageUp': () => tone(1 + (altKey? 12 : 0)),
            'PageDown': () => tone(-(1 + (altKey? 12 : 0)))
        }
        const refresh = () => {
            event.preventDefault()
            ClearButtons({keyboard: keyboard.get(), active_class: 'KeyButtonLastNote'})
            ClearButtons({keyboard: keyboard.get()})
        }
        if(controls[key as keyof typeof controls]) {
            controls[key as keyof typeof controls]()
        } else if(controls[code as keyof typeof controls]) {
            controls[code as keyof typeof controls]()
        }
    }
    

    useEffect(
        () => {
            document.addEventListener(
                'keydown', onKeyDown
            )
            document.addEventListener(
                'visibilitychange',
                () => {
                    play_mode.set(new PlayMode({name: 'mute'}))
                }
            )
        },
        []
    )

    useEffect(
        () => {
            local_storage_keyboard_parameters.set(
                JSON.stringify(
                    new KeyboardParameters(note_props)
                )
            )
        },
        [note_props]
    )

    return (
        <Div 
            className="Main">
            <Tools {...note_props}/>
            <Piano {...note_props}
                play_notes={play_notes}/>
            <MidiPlayer {...note_props}
                play_notes={play_notes}/>
        </Div>
    )
}