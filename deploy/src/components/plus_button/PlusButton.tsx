import { UseStateObject } from "../../utils/Utils"
import { CharButton, CharButtonProps } from "../Components"
import "./PlusButton.css"

export type PlusButtonProps = CharButtonProps & {
  state: UseStateObject<number>,
  step?: number
}

export function PlusButton(props: PlusButtonProps) {
  return (
    <CharButton 
      {...props}
      children={'+'}
      className={`PlusButton ${props.className || ''}`}
      onClick={event => {
        props.onClick && props.onClick(event)
        props.state?.set((props.state.get() || 0) + (props.step || 1))
      }}/>
  )
}