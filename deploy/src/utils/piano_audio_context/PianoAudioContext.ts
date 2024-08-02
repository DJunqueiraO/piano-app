import { Note, NoteProps } from '../../models/Models'
import { Keyboard, Keyboards } from '../../keyboards/Keyboards'
import { 
    // notes,
    instruments
} from '../../assets/Assets'
import { AnimateKeyButton } from '../../pages/main/piano/animate_key_button/AnimateKeyButton'
import { ClearButtons } from '../../pages/main/piano/clear_buttons/ClearButtons'
import { UseStateObject } from '../Utils'

export type WaitProps = {
    props: NoteProps,
    current_note: number,
    keyboard: UseStateObject<Keyboard>
    muted?: boolean,
    active_class?: string,
}

export class PianoAudioContext {

    audio_context: AudioContext

    constructor() {
        this.audio_context = new window.AudioContext()
    }

    wait = (
        {
            props,
            current_note,
            active_class,
            keyboard,
            muted = false
        }: WaitProps
    ) => {
        
        const play_notes = props.play_notes?.get()?.filter(note => note.type === 'noteOn') || []

        if (current_note >= play_notes.length) {return}
        
        const current_tab_note = play_notes[current_note] || null
        const current_tab_number = (
            (current_tab_note?.noteNumber || 0) - props.upper.get()
        )
        const notes = keyboard.get()?.notes
        let current_tab_keys = (
            props.keyboard.get() === Keyboards.guitar_arm?
            [`${current_tab_number}`]
            :
            Object.keys(notes).reduce(
                ($0: string[], $1: string) => {
                    if(
                        notes[$1 as keyof typeof notes] === current_tab_number.toString()
                    ) {
                        $0.push($1)
                    }
                    return $0
                },
                []
            )
        )
        current_tab_keys.forEach(
            current_tab_key => {
                current_tab_key && AnimateKeyButton(
                    {
                        code: current_tab_key, 
                        props: props,
                        active_class: active_class
                    }
                )
            }
        )
        if(!muted) {
            this.play(
                Note.get_frequency(current_tab_note?.noteNumber), 
                props
            )
        }

        return current_tab_keys
    }

    auto_play = (
        props: NoteProps,
        keyboard: UseStateObject<Keyboard>
    ) => {

        let startTime = performance.now()
        const play_notes = (
            (
                props.play_notes
                    ?.get()
                    ?.filter(note => note.type === 'noteOn')
                    .map(note => ({...note, time: note.time*(1/props.velocity.get())}))
            ) || 
            []
        )

        if(play_notes) {
            const playNextNote = (index: number) => {

                if (index >= play_notes.length) {return}
    
                const upper = props.upper?.get()
                const note = play_notes[index]
                const noteAbsolute = note.noteNumber - upper
                const notes = keyboard.get()?.notes
                const buttonCodes = (
                    props.keyboard.get() === Keyboards.guitar_arm?
                    [`${noteAbsolute}`]
                    :
                    Object.keys(notes).reduce(
                        (keys: string[], key: string) => {
                            if(notes[key as keyof typeof notes] === `${noteAbsolute}`) {
                                keys.push(key)
                            }
                            return keys
                        },
                        []
                    )
                )
    
                buttonCodes.forEach(buttonCode => {
                    ClearButtons({keyboard: keyboard})
                    AnimateKeyButton({code: buttonCode, props: props})
                })
    
                const currentTime = performance.now()
                const elapsed = currentTime - startTime
    
                if (elapsed >= note.time) {
                    this.play(
                        Note.get_frequency(note.noteNumber), 
                        props
                    )
                    requestAnimationFrame(() => playNextNote(index + 1))
                } else {
                    requestAnimationFrame(() => playNextNote(index))
                }
            }
            requestAnimationFrame(() => playNextNote(0))
        }
    }

    play = (
        frequency: number, 
        props: NoteProps
    ) => {
        
        if (this.audio_context) {

            const oscillator = this.audio_context.createOscillator()
            const instrumentObject = instruments[props.instrument.get()] || {}

            if (oscillator) {

                if (!instrumentObject.value) {
                    oscillator.type = instrumentObject.name as OscillatorType;
                    } else {
                    const customWave = this.audio_context?.createPeriodicWave(
                        instrumentObject.value.real,
                        instrumentObject.value.imag
                    );
                    if (customWave) {
                        oscillator.setPeriodicWave(customWave);
                    }
                }

                oscillator.frequency.setValueAtTime(
                    frequency,
                    this.audio_context.currentTime
                )

                const gainNode = this.audio_context.createGain()

                gainNode.gain.setValueAtTime(
                    (props.volume.get() || 0) / 100,
                    this.audio_context.currentTime
                )

                gainNode.gain.exponentialRampToValueAtTime(
                    0.0001,
                    this.audio_context.currentTime + (
                        props.duration.get() || 0
                    )
                )

                oscillator.connect(gainNode)
                gainNode.connect(this.audio_context.destination)
                oscillator.start()
                oscillator.stop(
                    this.audio_context.currentTime + (
                        props.duration.get() || 0
                    )
                )
            }
        }
    }
}
