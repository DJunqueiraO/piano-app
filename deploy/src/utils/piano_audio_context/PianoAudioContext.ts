import { Note, NoteProps } from '../../models/Models'
import { Keyboards } from '../../keyboards/Keyboards'
import { instruments, play_modes } from '../../assets/Assets'
import { AnimateKeyButton } from '../../pages/main/piano/animate_key_button/AnimateKeyButton'
import { ClearButtons } from '../../pages/main/piano/clear_buttons/ClearButtons'

export type WaitProps = {
    props: NoteProps,
    muted?: boolean,
    active_class?: string,
}

export class PianoAudioContext {

    audio_context: AudioContext
    static animation_frame = 0
    static current_note = 0

    constructor() {

        this.audio_context = new window.AudioContext()
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

        if (PianoAudioContext.current_note >= play_notes.length) {return}
        
        const current_tab_note = play_notes[PianoAudioContext.current_note] || null
        const current_tab_notes = (
            play_notes
                .reduce(
                    (notes: Note[], note: Note) => {
                        if(
                            note === current_tab_note || 
                            note.time === current_tab_note.time
                        ) {
                            notes.push(note)
                        }
                        return notes
                    },
                    []
                )
                .map(note => ({...note, noteNumber: note.noteNumber - props.upper.get()}))
        )
        const notes = Keyboards.get(props.keyboard.get()).notes
        let current_tab_keys = (
            props.keyboard.get() === Keyboards.guitar_arm?
            current_tab_notes.map(note => note.noteNumber.toString())
            :
            Object.keys(notes).reduce(
                ($0: string[], $1: string) => {
                    if(
                        current_tab_notes.some(note => notes[$1 as keyof typeof notes] === note.noteNumber.toString())
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

    auto_play = (props: NoteProps) => {

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

        const play_notes_sliced_down = (
            play_notes.slice(0, PianoAudioContext.current_note)
        )

        const play_notes_sliced_up = (
            play_notes.slice(PianoAudioContext.current_note)
        )

        const play_notes_in_time_sliced_up: Note[] = (
            play_notes_sliced_up.map(note => ({...note, time: note.time - play_notes_sliced_up[0].time}))
        )

        if(play_notes_in_time_sliced_up) {
            const playNextNote = (index: number) => {

                if (PianoAudioContext.current_note >= play_notes.length) {return}
                PianoAudioContext.current_note = index + play_notes_sliced_down.length

                const upper = props.upper?.get()
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
                const noteAbsolute = note.noteNumber - upper
                const keyboard_notes = Keyboards.get(props.keyboard.get()).notes
                const buttonCodes = (
                    props.keyboard.get() === Keyboards.guitar_arm?
                    notes.map(note => note.noteNumber.toString())
                    :
                    Object.keys(keyboard_notes).reduce(
                        (keys: string[], key: string) => {
                            if(
                                notes.some(note => keyboard_notes[key as keyof typeof keyboard_notes] === note.noteNumber.toString())
                            ) {
                                keys.push(key)
                            }
                            return keys
                        },
                        []
                    )
                )
    
                ClearButtons({keyboard: Keyboards.get(props.keyboard.get())})
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
