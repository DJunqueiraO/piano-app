import { PianoProps } from "../Piano"

interface AnimateKeyButtonProps {
  code: string
  props: PianoProps
  key?: string
  active_class?: string
  delay_class?: string
}

export const AnimateKeyButton = (
  {
    code, 
    props,
    key = code,
    active_class = 'KeyButtonActive',
    delay_class = 'KeyButtonLastNote'
  }: AnimateKeyButtonProps
) => {
  let buttons: any = document.getElementsByClassName(
      `KeyButton${code || NaN}`
  )
  if(buttons.length === 0) buttons = document.getElementsByClassName(
      `KeyButton${key || NaN}`
  )
  buttons = Array.from(buttons)
  buttons.forEach(
      (button: any) => {
          button.classList.add(delay_class)
          button.classList.add(active_class)
      }
  )

  setTimeout(
      () => {
          buttons.forEach(
              (key: any) => key.classList.remove(delay_class)
          )
      },
      props.duration.get() * 300
  )

  return buttons
}