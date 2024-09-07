import { PianoProps } from "../../pages/main/piano/Piano"
import './AnimateKeyButton.css'

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
  let buttons = Array.from(document.getElementsByClassName(
      `KeyButton${code || NaN}`
  ) as HTMLCollectionOf<HTMLButtonElement>)
  if(buttons.length === 0) {
    buttons = Array.from(document.getElementsByClassName(
        `KeyButton${key || NaN}`
    ) as HTMLCollectionOf<HTMLButtonElement>)
  }
  buttons = Array.from(buttons)
  buttons.forEach(
      (button) => {
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
      (props.duration.get() || 0) * 300
  )

  return buttons
}