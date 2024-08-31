import { Input, InputProps } from '../../../../components/Components'
import { PianoAudioContext } from '../../../../utils/piano_audio_context/PianoAudioContext'
import './CurrentNoteInput.css'
import { useStateAsObject, UseStateObject } from '../../../../utils/Utils'
import { KeyboardProps, Note, PlayMode } from '../../../../models/Models'
import { play_modes } from '../../../../assets/Assets'
import { ClearButtons } from '../../piano/clear_buttons/ClearButtons'

export type CurrentNoteInputProps = KeyboardProps & InputProps

export function CurrentNoteInput(props: CurrentNoteInputProps) {
  const value = useStateAsObject(PianoAudioContext.get_current_note())
  return (
    <Input
      {...props}
      type={props.type || 'range'}
      min={0}
      max={props.play_notes?.get()?.filter((note: Note) => note.type === 'noteOn').length}
      value={PianoAudioContext.get_current_note() || 0}
      onChange={event => {
        PianoAudioContext.cancel_animation_frame()
        PianoAudioContext.set_current_note(parseInt(event.target.value))
        value.set(parseInt(event.target.value))
        ClearButtons({keyboard: props.keyboard.get()})
        props.play_mode.set(new PlayMode(play_modes.find(mode => mode.name === props.play_mode.get()?.name)))
      }}
      className={`CurrentNoteInput ${props.className || ''}`}/>
  )
}