import { 
  Div, 
  Input, 
  MinusButton, 
  PlusButton, 
  Span 
} from "../../../../components/Components"
import { Keyboards } from "../../../../keyboards/Keyboards"
import { PianoAudioContext } from "../../../../utils/piano_audio_context/PianoAudioContext"
import { UseStateObject } from "../../../../utils/Utils"
import { ClearButtons } from "../../piano/clear_buttons/ClearButtons"

import './MidiPlayerInput.css'

type MidiPlayerInputProps = React.HTMLAttributes<HTMLDivElement> & {
  state: UseStateObject<number>
  step?: number
  onChange?: () => void
  keyboard?: UseStateObject<string>
  min?: number
  max?: number
}

export function MidiPlayerInput(props: MidiPlayerInputProps) {

  return (
    <Div className='MidiPlayerInputDiv'>
      {props.children}
      <Input
        step={props.step}
        value={props.state.get()}
        onChange={event => {
          PianoAudioContext.cancel_animation_frame()
          if(props.onChange) props.onChange(event)
          props.state.set(parseFloat(event.target.value))
        }}
        type='number'
        min={props.min}
        max={props.max}
        style={{width: '3em'}}/>
      <PlusButton 
        onClick={event => {
          PianoAudioContext.cancel_animation_frame()
          if(props.onChange) props.onChange()
        }}
        state={props.state} 
        step={props.step}
        />
      <MinusButton 
        onClick={event => {
          PianoAudioContext.cancel_animation_frame()
          if(props.onChange) props.onChange()
        }}
        state={props.state} 
        step={props.step}
        />
    </Div>
  )
}