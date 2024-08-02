import { 
    useStateAsObject
} from '../../../utils/Utils'
import { KeyButton, Grid, KeyButtonProps } from '../../../components/Components'
import './Piano.css'
import { useEffect } from 'react'
import { Note, NoteProps } from '../../../models/Models'
import { PianoAudioContext } from '../../../utils/piano_audio_context/PianoAudioContext'
import { Keyboards } from '../../../keyboards/Keyboards'
import { 
    // notes, 
    play_modes
} from '../../../assets/Assets'
import { AnimateKeyButton } from './animate_key_button/AnimateKeyButton'
import { ClearButtons } from './clear_buttons/ClearButtons'

export type PianoProps = NoteProps

export function Piano(props: PianoProps) {

    const keyboard = useStateAsObject(Keyboards.get(props.keyboard.get()))
    const audioContext = useStateAsObject(new PianoAudioContext())

    useEffect(
        () => {
            const handleVisibilityChange = () => {
                if (document.visibilityState === 'visible') {
                    window.location.reload()
                }
            }
            document.addEventListener('visibilitychange', handleVisibilityChange)
            return () => {
                document.removeEventListener('visibilitychange', handleVisibilityChange)
            }
        }, 
        []
    )

    useEffect(
        () => {
            if(props.play_mode.get() === play_modes[0]) {
                audioContext.get().auto_play(
                    props, 
                    keyboard
                )
            } 
            if(props.play_mode.get() === play_modes[1]) {
                audioContext.get().wait(
                    {
                        keyboard: keyboard,
                        props: props,
                        current_note: props.current_note.get()
                    }
                )
            }
            if(props.play_mode.get() === play_modes[2]) {
                audioContext.get().wait(
                    {
                        keyboard: keyboard,
                        props: props,
                        current_note: props.current_note.get(),
                        muted: true
                    }
                )
            }
        }
    )

    const key_button_on_key_down = function(event: React.KeyboardEvent) {
        event.preventDefault()

        const {key, code} = event
        const upper = props.upper.get() || 0

        if(event.ctrlKey && key === 'z') {
            props.current_note.set(Math.abs(props.current_note.get() - 1))
            ClearButtons({keyboard: keyboard})
            return
        }

        if(key === ' ' || (event.ctrlKey && key === 'y')) {
            props.current_note.set(props.current_note.get() + 1)
            ClearButtons({keyboard: keyboard})
            return
        }

        if(key === 'PageUp') {
            const by = 1
            props.upper.set(upper + by)
            return
        }

        if(key === 'PageDown') {
            const by = - 1
            props.upper.set(upper + by)
            return
        }

        ClearButtons({keyboard: keyboard})
        AnimateKeyButton({code: code, key: key, props: props})[0]?.click()

        if(
            props.play_mode.get() === play_modes[1] ||
            props.play_mode.get() === play_modes[3]
        ) {
            return
        }

        const current_tab_keys = audioContext.get()?.wait(
            {
                keyboard: keyboard,
                props: props,
                current_note: props.current_note.get(),
                muted: true
            }
        )

        if (current_tab_keys?.some(
            current_tab_key => (
                current_tab_key === code || 
                current_tab_key === key
            )
        )) {
            props.current_note.set(props.current_note.get() + 1)
            ClearButtons({keyboard: keyboard})
        }
    }

    const key_button_on_click = (noteNumber: number) => {
        audioContext.get()?.play(
            Note.get_frequency(noteNumber), props
        )
    }

    return (
        <Grid 
            id='Grid'
            fill_vertically='true'
            align_columns='true'
            className='Piano'
            onKeyDown={key_button_on_key_down}>
            {
                keyboard.get()?.keys?.map(
                    line => line.map(
                        (key_button_props: KeyButtonProps, index) => { 

                            const notes = keyboard.get().notes

                            const note = (
                                parseInt(notes[`${key_button_props.children}` as keyof typeof notes]) ||
                                parseInt(`${key_button_props.children}`) 
                            )

                            const noteTone = note + (props.upper.get() || 0)

                            const on_children = () => {
                                if(`${key_button_props.children}`) {
                                    return Note.get_character(noteTone)
                                }
                                return (
                                    `${key_button_props.children}`
                                )
                            }

                            const on_class_name = () => {
                                return `${key_button_props.className || ''}`
                                    .concat(` KeyButton${`${key_button_props.children}`}`)
                                    .concat(` ${note > 25? 'KeyButtonRightHand' : ''}`)
                            }

                            return (
                                <KeyButton 
                                    span_props={
                                        {
                                            children: `${index}`
                                        }
                                    }
                                    {...key_button_props}
                                    id={`${key_button_props.children}`}
                                    className={on_class_name()}
                                    children={on_children()}
                                    onClick={
                                        () => {
                                            key_button_on_click(noteTone)
                                        }
                                    }/>
                            )
                        }
                    )
                )
            }
        </Grid>
    )
}