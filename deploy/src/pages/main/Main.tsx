
import { Piano } from "./piano/Piano";
import './Main.css'
import { useStateAsObject } from "../../utils/Utils";
import { Div } from "../../components/Components";
import { Tools } from "./tools/Tools";
import { useEffect, useMemo } from "react";
import { Note, NoteProps } from "../../models/Models";
import { MidiPlayer } from "./midi_player/MidiPlayer";
import { KeyboardParameters } from "../../keyboards/Keyboards";

export function Main() {

    const get_keyboard_parameters: () => KeyboardParameters = () => {
        const keyboard_parameters = localStorage.getItem('keyboard_parameters')
        if(!keyboard_parameters) {
            localStorage.setItem(
                'keyboard_parameters', 
                JSON.stringify(new KeyboardParameters())
            )
        }
        return JSON.parse(`${keyboard_parameters}`)
    }

    const keyboard_parameters = get_keyboard_parameters()

    const upper = useStateAsObject<number>(keyboard_parameters?.upper)
    const volume = useStateAsObject<number>(keyboard_parameters?.volume)
    const duration = useStateAsObject<number>(keyboard_parameters.duration)
    const instrument = useStateAsObject<number>(keyboard_parameters.instrument)
    const play_notes = useStateAsObject<Note[]>(keyboard_parameters.play_notes)
    const play_mode = useStateAsObject<string>(keyboard_parameters.play_mode)
    const keyboard = useStateAsObject<string>(keyboard_parameters.keyboard)
    const velocity = useStateAsObject<number>(keyboard_parameters.velocity)
    const current_note = useStateAsObject<number>(keyboard_parameters.current_note || 0)

    const note_props: NoteProps = useMemo(
        () => {
            return {
                play_notes: play_notes,
                upper: upper,
                volume: volume,
                duration: duration,
                instrument: instrument,
                play_mode: play_mode,
                keyboard: keyboard,
                velocity: velocity,
                current_note: current_note
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
            velocity, 
            current_note
        ]
    )

    useEffect(
        () => {
            localStorage.setItem(
                'keyboard_parameters', 
                JSON.stringify(
                    new KeyboardParameters(note_props)
                )
            )
        },
        [note_props]
    )

    return (
        <Div 
            style={{flexDirection: "column", display: "flex"}}
            className="Main">
            <Tools {...note_props}/>
            <Piano {...note_props}
                play_notes={play_notes}/>
            <MidiPlayer {...note_props}
                play_notes={play_notes}/>
        </Div>
    )
}