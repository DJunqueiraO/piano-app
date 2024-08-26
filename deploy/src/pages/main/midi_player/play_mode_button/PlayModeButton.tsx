import { Button, ButtonProps } from '../../../../components/Components'

type PlayModeButtonProps = ButtonProps & {

}

export function PlayModeButton(props: PlayModeButtonProps) {
  return (
    <Button
      {...props}
      style={{paddingInline: '1em'}}/>
  )
}