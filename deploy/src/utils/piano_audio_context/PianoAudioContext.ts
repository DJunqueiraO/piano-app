import { Note, KeyboardProps } from '../../models/Models'
import { Keyboards } from '../../keyboards/Keyboards'
import { instruments } from '../../assets/Assets'
import { AnimateKeyButton } from '../../pages/main/piano/animate_key_button/AnimateKeyButton'
import { ClearButtons } from '../../pages/main/piano/clear_buttons/ClearButtons'
import { LocalStorage } from '../../utils/Utils'

export type WaitProps = {
    props: KeyboardProps,
    muted?: boolean,
    active_class?: string,
}

export class PianoAudioContext {

    audio_context: AudioContext
    static animation_frame = 0
    static current_note = new LocalStorage('current_note')

    constructor() {
        this.audio_context = new window.AudioContext()
    }

    static get_current_note = () => {
        return parseInt(PianoAudioContext.current_note.get() || "0")
    }

    static increment_current_note = (play_notes?: Note[]) => {
        const current_note = PianoAudioContext.get_current_note()
        const next_note = current_note + (
            current_note < (
                play_notes?.filter(note => note.type === 'noteOn').length || 
                0
            ) - 1? 
            1 
            : 
            0
        )
        PianoAudioContext.set_current_note(
            current_note + (
                current_note < (
                    play_notes?.filter(note => note.type === 'noteOn').length || 
                    0
                ) - 1? 
                1 
                : 
                0
            )

        )
        return PianoAudioContext.get_current_note()
    }

    static decrement_current_note = () => {
        const current_note = PianoAudioContext.get_current_note()
        PianoAudioContext.set_current_note(current_note - (current_note > 0? 1 : 0))
        return PianoAudioContext.get_current_note()
    }

    static set_current_note = (next_note: number) => {
        const inputs: HTMLCollectionOf<any> = document.getElementsByClassName("CurrentNoteInput")
        for(let i = 0; i <= inputs.length; i++) {
            const input = inputs[i] as HTMLInputElement
            if(input) {
                input.value = (next_note || 0).toString()
            }
        }
        PianoAudioContext.current_note.set(next_note.toString())
        return PianoAudioContext.get_current_note()
    }

    static cancel_animation_frame = () => {
        cancelAnimationFrame(PianoAudioContext.animation_frame)
    }

    wait = (
        {
            props,
            active_class,
            muted = false
        }: WaitProps
    ) => {
        const play_notes = (
            props.play_notes
                ?.get()
                ?.filter(note => note.type === 'noteOn')
        ) || []
        if (PianoAudioContext.get_current_note() >= play_notes.length) {return}
        const current_tab_note = play_notes[PianoAudioContext.get_current_note()] || null
        const current_tab_notes = (
            play_notes
                .reduce(
                    (notes: Note[], note: Note) => {
                        if(
                            note === current_tab_note || 
                            note?.time === current_tab_note?.time
                        ) {
                            notes.push(note)
                        }
                        return notes
                    },
                    []
                )
                .map(note => ({...note, noteNumber: note.noteNumber - (props.upper.get() || 0)}))
        )
        const keyboard_notes = Keyboards.get(props.keyboard.get()).notes
        let current_tab_keys = (
            Object.values(keyboard_notes).length === 0?
            current_tab_notes.map(note => note.noteNumber.toString())
            :
            Object.keys(keyboard_notes).reduce(
                ($0: string[], $1: string) => {
                    if(
                        current_tab_notes.some(
                            note => {
                                const keyboard_note_number = (
                                    keyboard_notes[$1 as keyof typeof keyboard_notes]
                                )
                                return keyboard_note_number === note.noteNumber.toString()
                            }
                        )
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

    auto_play = (props: KeyboardProps) => {
        let startTime = performance.now()
        const play_notes = (
            (
                props.play_notes
                    ?.get()
                    ?.filter(note => note.type === 'noteOn')
                    .map(note => ({...note, time: note.time*(1/(props.velocity.get() || 1))}))
            ) || 
            []
        )
        const play_notes_sliced_down = (
            play_notes.slice(0, PianoAudioContext.get_current_note())
        )
        const play_notes_sliced_up = (
            play_notes.slice(PianoAudioContext.get_current_note())
        )
        const play_notes_in_time_sliced_up: Note[] = (
            play_notes_sliced_up.map(note => ({...note, time: note.time - play_notes_sliced_up[0].time}))
        )
        if(play_notes_in_time_sliced_up) {
            const playNextNote = (index: number) => {
                if (PianoAudioContext.get_current_note() >= play_notes.length) {return}
                PianoAudioContext.set_current_note(index + play_notes_sliced_down.length)
                const upper = props.upper?.get() || 0
                if(index >= play_notes_in_time_sliced_up.length) {return}
                const note = play_notes_in_time_sliced_up[index]
                const notes = (
                    play_notes_in_time_sliced_up
                        .reduce(
                            (notes: Note[], note: Note) => {
                                if(
                                    note === play_notes_in_time_sliced_up[index] ||
                                    note.time === play_notes_in_time_sliced_up[index].time
                                ) {
                                    notes.push(note)
                                }
                                return notes
                            },
                            []
                        )
                        .map(note => ({...note, noteNumber: note.noteNumber - upper}))
                )
                if(!note.noteNumber) {return}
                const keyboard_notes = Keyboards.get(props.keyboard.get()).notes
                const buttonCodes = (
                    Object.values(keyboard_notes).length === 0?
                    notes.map(note => note.noteNumber.toString())
                    :
                    Object.keys(keyboard_notes).reduce(
                        (keys: string[], key: string) => {
                            if(
                                notes.some(
                                    (note: Note) => {
                                        const keyboard_note = (
                                            keyboard_notes[key as keyof typeof keyboard_notes]
                                        )
                                        return (
                                            keyboard_note === note.noteNumber.toString()
                                        )
                                    }
                                )
                            ) {
                                keys.push(key)
                            }
                            return keys
                        },
                        []
                    )
                )
                ClearButtons({keyboard: props.keyboard.get()})
                buttonCodes.forEach(buttonCode => {
                    AnimateKeyButton({code: buttonCode, props: props})
                })
                const currentTime = performance.now()
                const elapsed = currentTime - startTime
                if (elapsed >= note.time) {
                    this.play(
                        Note.get_frequency(note.noteNumber), 
                        props
                    )
                    PianoAudioContext.animation_frame = (
                        requestAnimationFrame(() => playNextNote(index + 1))
                    )
                } else {
                    PianoAudioContext.animation_frame = (
                        requestAnimationFrame(() => playNextNote(index))
                    )
                }
            }
            PianoAudioContext.animation_frame = (
                requestAnimationFrame(() => playNextNote(0))
            )
        }
    }

    play = (
        frequency: number, 
        props: KeyboardProps
    ) => {
        if (this.audio_context) {
            const oscillator = this.audio_context.createOscillator()
            const instrumentObject = instruments[props.instrument.get() || 0] || {}
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
