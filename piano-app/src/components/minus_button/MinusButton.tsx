import { UseStateObject } from "../../utils/Utils"
import { CharButton, CharButtonProps } from "../Components"
import "./MinusButton.css"

export type MinusButtonProps = CharButtonProps & {
  state: UseStateObject<number>,
  step?: number
}

export function MinusButton(props: MinusButtonProps) {
  return (
    <CharButton 
      {...props}
      children={'-'}
      className={`MinusButton ${props.className || ''}`}
      onClick={event => {
        props.onClick && props.onClick(event)
        props.state?.set(props.state.get() - (props.step || 1))
      }}/>
  )
}