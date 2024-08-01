import { Button, ButtonProps } from "../Components"
import "./CharButton.css"

export type CharButtonProps = ButtonProps

export function CharButton(props: CharButtonProps) {
  return (
    <Button 
      {...props}
      style={{width: 'auto', padding: '5px'}}
      className={`CharButton ${props.className || ''}`}
      reverse='true'/>
  )
}