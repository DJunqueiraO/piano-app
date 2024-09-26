import { 
    AnimateKeyButton,
    ClearButtons,
    useStateAsObject
} from '../../../utils/Utils'
import { KeyButton, Grid, KeyButtonProps, GridProps } from '../../../components/Components'
import './Piano.css'
import { useEffect } from 'react'
import { Note, KeyboardProps, PlayMode } from '../../../models/Models'
import { PianoAudioContext } from '../../../utils/piano_audio_context/PianoAudioContext'
import { Keyboards } from '../../../keyboards/Keyboards'
import { play_modes } from '../../../assets/Assets'

export type PianoProps = KeyboardProps & GridProps

export function Piano(props: PianoProps) {

    const audio_context = useStateAsObject(new PianoAudioContext())
    const ctrlKey = useStateAsObject(false)

    const refresh = () => {
        PianoAudioContext.cancel_animation_frame()
        if((props.play_mode.get()?.name || '') === 'play') {
            audio_context.get()?.auto_play(props)
        } 
        if(
            (props.play_mode.get()?.name || '') === 'pause' || 
            (props.play_mode.get()?.name || '') === 'next' || 
            (props.play_mode.get()?.name || '') === 'back'
        ) {
            audio_context.get()?.wait({props})
        }
        if((props.play_mode.get()?.name || '') === 'mute') {
            audio_context.get()?.wait(
                {
                    props: props,
                    muted: true
                }
            )
        }
    }

    const onKeyDown = function(event: KeyboardEvent) {
        event.preventDefault()

        ClearButtons({keyboard: props.keyboard.get()})
        AnimateKeyButton({code: event.code, key: event.key, props: props})[0]?.click()

        if(
            (props.play_mode.get()?.name || '') === 'pause' ||
            (props.play_mode.get()?.name || '') === 'stop'
        ) {
            return
        }

        const current_tab_keys = audio_context.get()?.wait(
            {
                props: props,
                muted: true
            }
        )

        if (current_tab_keys?.some(
            current_tab_key => (
                current_tab_key === event.code || 
                current_tab_key === event.key
            )
        )) {
            PianoAudioContext.increment_current_note(props?.play_notes?.get())
            props.play_mode.set(
                {
                    ...props.play_mode.get() || new PlayMode(play_modes[0]), 
                    current_note: PianoAudioContext.get_current_note()
                }
            )
            ClearButtons({keyboard: props.keyboard.get()})
        }
    }


    const key_button_on_click = (noteNumber: number) => {
        audio_context.get()?.play(
            Note.get_frequency(noteNumber), 
            props
        )
    }

    useEffect(refresh)
    useEffect(() => document.addEventListener('keydown', onKeyDown), [])

    return (
        <Grid 
            {...props}
            fill_vertically='true'
            align_columns='true'
            className='Piano'>
            {
                Keyboards.get(props.keyboard.get() || Object.values(Keyboards)[0]).keys?.map(
                    line => line.map(
                        (key_button_props: KeyButtonProps, index) => { 

                            const notes = Keyboards.get(props.keyboard.get() || Object.values(Keyboards)[0]).notes

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
                                    first_span_props={
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