import { 
  Div, 
  Input, 
  MinusButton, 
  PlusButton, 
  Span 
} from "../../../../components/Components"
import { UseStateObject } from "../../../../utils/Utils"

import './MidiPlayerVelocityInput.css'

type MidiPlayerVelocityInput = React.HTMLAttributes<HTMLDivElement> & {
  velocity: UseStateObject<number>
}

export function MidiPlayerVelocityInput(props: MidiPlayerVelocityInput) {

  const on_step = () => (0.1)
  const on_change = () => window.location.reload()

  return (
    <Div className='MidiPlayerVelocityInputDiv'>
      <Span>x</Span>
      <Input
        step={on_step()}
        value={props.velocity.get()}
        onChange={event => {
          on_change()
          props.velocity.set(parseFloat(event.target.value))
        }}
        type='number'
        min={0}
        max={9}
        style={{width: '3em'}}/>
      <PlusButton 
        onClick={on_change} 
        state={props.velocity} 
        step={on_step()}/>
      <MinusButton 
        onClick={on_change} 
        state={props.velocity} 
        step={on_step()}/>
    </Div>
  )
}