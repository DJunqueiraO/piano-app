import { 
  Div, 
  Input, 
  MinusButton, 
  PlusButton, 
  Span 
} from "../../../../components/Components"
import { Keyboards } from "../../../../keyboards/Keyboards"
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
          window.location.reload()
          if(props.onChange) props.onChange(event)
          props.state.set(parseFloat(event.target.value))
        }}
        type='number'
        min={props.min}
        max={props.max}
        style={{width: '3em'}}/>
      <PlusButton 
        onClick={event => {
          window.location.reload()
          if(props.onChange) props.onChange()
        }}
        state={props.state} 
        step={props.step}
        />
      <MinusButton 
        onClick={event => {
          window.location.reload()
          if(props.onChange) props.onChange()
        }}
        state={props.state} 
        step={props.step}
        />
    </Div>
  )
}