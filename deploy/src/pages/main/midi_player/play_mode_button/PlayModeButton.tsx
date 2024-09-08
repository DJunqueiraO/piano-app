import { Button, ButtonProps } from '../../../../components/Components'

export function PlayModeButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      onClick={
        event => {
          if(props.onClick) props.onClick(event)
          const button = document.getElementsByClassName('KeyButton')[0] as HTMLButtonElement
          button.focus()
        }
      }
      className='PlayModeButton'/>
  )
}