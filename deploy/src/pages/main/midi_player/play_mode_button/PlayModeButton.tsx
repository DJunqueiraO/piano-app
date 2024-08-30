import { Button, ButtonProps } from '../../../../components/Components'
import './PlayModeButton.css'

type PlayModeButtonProps = ButtonProps & {

}

export function PlayModeButton(props: PlayModeButtonProps) {
  return (
    <Button
      {...props}
      className='PlayModeButton'/>
  )
}