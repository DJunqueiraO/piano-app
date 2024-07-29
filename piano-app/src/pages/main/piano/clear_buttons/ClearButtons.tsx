import { ReactNode } from "react"
import { Keyboard } from "../../../../keyboards/Keyboards"
import { UseStateObject } from "../../../../utils/Utils"
import { PianoProps } from "../Piano"
import { KeyButtonProps } from "../../../../components/Components"

interface ClearButtonsProps {
  keyboard: UseStateObject<Keyboard>
  active_class?: string
}

export const ClearButtons = (
  {
    keyboard,
    active_class = 'KeyButtonActive'
  }: ClearButtonsProps
) => {
  keyboard.get()?.keys
    .reduce(
        (rows: KeyButtonProps[][], columns: KeyButtonProps[]) => rows.concat(columns), []
    )
    .map((key: any) => `${key.children}`)
    .forEach(
        (key: ReactNode) => {
            let keys: any = document.getElementsByClassName(
                `KeyButton${key}`
            )
            if(!keys) {
                return
            }
            Array.from(keys).forEach(
                (key: any) => key.classList.remove(active_class)
            )
        }
    )
}