import { 
    useStateAsObject
} from '../../../utils/Utils'
import { KeyButton, Grid, KeyButtonProps } from '../../../components/Components'
import './Piano.css'
import { useEffect } from 'react'
import { Note, KeyboardProps, PlayMode } from '../../../models/Models'
import { PianoAudioContext } from '../../../utils/piano_audio_context/PianoAudioContext'
import { Keyboards } from '../../../keyboards/Keyboards'
import { AnimateKeyButton } from './animate_key_button/AnimateKeyButton'
import { ClearButtons } from './clear_buttons/ClearButtons'
import { play_modes } from '../../../assets/Assets'

export type PianoProps = KeyboardProps

export function Piano(props: PianoProps) {

    const audioContext = useStateAsObject(new PianoAudioContext())

    const refresh = () => {
        PianoAudioContext.cancel_animation_frame()
        if((props.play_mode.get()?.name || '') === 'play') {
            audioContext.get().auto_play(props)
        } 
        if(
            (props.play_mode.get()?.name || '') === 'pause' || 
            (props.play_mode.get()?.name || '') === 'next' || 
            (props.play_mode.get()?.name || '') === 'back'
        ) {
            audioContext.get().wait({props})
        }
        if((props.play_mode.get()?.name || '') === 'mute') {
            audioContext.get().wait(
                {
                    props: props,
                    muted: true
                }
            )
        }
    }

    useEffect(
        () => {
            const handleVisibilityChange = () => {
                if (document.visibilityState === 'visible') {
                    refresh()
                }
            }
            document.addEventListener('visibilitychange', handleVisibilityChange)
            return () => {
                document.removeEventListener('visibilitychange', handleVisibilityChange)
            }
        }, 
        []
    )

    useEffect(refresh)

    const key_button_on_key_down = function(event: React.KeyboardEvent) {
        event.preventDefault()

        const {key, code} = event
        const upper = props.upper.get() || 0

        if(event.ctrlKey && (key === 'z' || code === 'ArrowLeft')) {
            PianoAudioContext.decrement_current_note()
            props.play_mode.set(new PlayMode(play_modes.find(mode => mode.name === 'back')))
            ClearButtons({keyboard: Keyboards.get(props.keyboard.get())})
            return
        }

        if(key === ' ' || code === 'Space') {
            const play_mode_is_play = props.play_mode.get().name === 'play'
            props.play_mode.set(
                new PlayMode(play_modes.find(mode => mode.name === (
                    play_mode_is_play? (event.ctrlKey? 'stop' : 'pause') : 'play'
                )))
            )
            if(play_mode_is_play && event.ctrlKey) {
                PianoAudioContext.current_note = 0
            }
            ClearButtons({keyboard: Keyboards.get(props.keyboard.get())})
            return
        }

        if(event.ctrlKey && (key === 'y' || code === 'ArrowRight')) {
            PianoAudioContext.increment_current_note(props?.play_notes?.get())
            props.play_mode.set(new PlayMode(play_modes.find(mode => mode.name === 'next')))
            ClearButtons({keyboard: Keyboards.get(props.keyboard.get())})
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

        ClearButtons({keyboard: Keyboards.get(props.keyboard.get())})
        AnimateKeyButton({code: code, key: key, props: props})[0]?.click()

        if(
            (props.play_mode.get()?.name || '') === 'pause' ||
            (props.play_mode.get()?.name || '') === 'stop'
        ) {
            return
        }

        const current_tab_keys = audioContext.get()?.wait(
            {
                props: props,
                muted: true
            }
        )

        if (current_tab_keys?.some(
            current_tab_key => (
                current_tab_key === code || 
                current_tab_key === key
            )
        )) {
            PianoAudioContext.current_note = (
                PianoAudioContext.current_note + 1
            )
            props.play_mode.set(
                {...props.play_mode.get(), current_note: PianoAudioContext.current_note}
            )
            ClearButtons({keyboard: Keyboards.get(props.keyboard.get())})
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
                Keyboards.get(props.keyboard.get()).keys?.map(
                    line => line.map(
                        (key_button_props: KeyButtonProps, index) => { 

                            const notes = Keyboards.get(props.keyboard.get()).notes

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
                                    id={`KeyButton_${index} ${key_button_props.children}`}
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