import { useEffect } from 'react'
import { Input, InputProps } from '../../../../components/Components'
import { PianoAudioContext } from '../../../../utils/piano_audio_context/PianoAudioContext'
import './CurrentNoteInput.css'
import { useStateAsObject, UseStateObject } from '../../../../utils/Utils'
import { Note, PlayMode } from '../../../../models/Models'
import { play_modes } from '../../../../assets/Assets'

export type CurrentNoteInputProps = InputProps & {
  play_notes: UseStateObject<Note[]>
  play_mode: UseStateObject<PlayMode>
}

export function CurrentNoteInput(props: CurrentNoteInputProps) {
  const value = useStateAsObject(PianoAudioContext.get_current_note())
  return (
    <Input
      {...props}
      type='range'
      min={0}
      max={props.play_notes.get()?.filter(note => note.type === 'noteOn').length}
      value={PianoAudioContext.get_current_note() || 0}
      onChange={event => {
        PianoAudioContext.cancel_animation_frame()
        PianoAudioContext.set_current_note(parseInt(event.target.value))
        value.set(parseInt(event.target.value))
        props.play_mode.set(new PlayMode(play_modes.find(mode => mode.name === 'play')))
      }}
      className={`CurrentNoteInput ${props.className || ''}`}/>
  )
}