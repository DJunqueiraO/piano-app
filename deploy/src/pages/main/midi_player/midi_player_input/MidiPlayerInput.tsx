import { 
  Div, 
  Input, 
  MinusButton, 
  PlusButton, 
  Span 
} from "../../../../components/Components"
import { UseStateObject } from "../../../../utils/Utils"

import './MidiPlayerInput.css'

type MidiPlayerInputProps = React.HTMLAttributes<HTMLDivElement> & {
  velocity: UseStateObject<number>
  step?: number
}

export function MidiPlayerInput(props: MidiPlayerInputProps) {

  return (
    <Div className='MidiPlayerInputDiv'>
      <Span>x</Span>
      <Input
        step={props.step}
        value={props.velocity.get()}
        onChange={event => {
          props.velocity.set(parseFloat(event.target.value))
        }}
        type='number'
        min={0}
        max={9}
        style={{width: '3em'}}/>
      <PlusButton 
        state={props.velocity} 
        step={props.step}
        />
      <MinusButton 
        state={props.velocity} 
        step={props.step}
        />
    </Div>
  )
}