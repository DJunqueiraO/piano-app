import { useEffect } from 'react'
import { Input, InputProps } from '../../../../components/Components'
import { PianoAudioContext } from '../../../../utils/piano_audio_context/PianoAudioContext'
import './CurrentNoteInput.css'
import { useStateAsObject } from '../../../../utils/Utils'

type CurrentNoteInputProps = InputProps & {

}

export function CurrentNoteInput(props: CurrentNoteInputProps) {
  const value = useStateAsObject(PianoAudioContext.current_note)
  return (
    <Input
      {...props}
      type='number'
      value={PianoAudioContext.current_note}
      onChange={event => {
        PianoAudioContext.set_current_note(parseInt(event.target.value))
        value.set(parseInt(event.target.value))
      }}
      className={`CurrentNoteInput ${props.className || ''}`}/>
  )
}