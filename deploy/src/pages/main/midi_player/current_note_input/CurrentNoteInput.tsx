import { useEffect } from 'react'
import { Input, InputProps } from '../../../../components/Components'
import { PianoAudioContext } from '../../../../utils/piano_audio_context/PianoAudioContext'
import './CurrentNoteInput.css'

type CurrentNoteInputProps = InputProps & {

}

export function CurrentNoteInput(props: CurrentNoteInputProps) {

  return (
    <Input
      {...props}
      value={PianoAudioContext.current_note}
      className={`CurrentNoteInput ${props.className || ''}`}/>
  )
}