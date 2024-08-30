import { ReactNode } from "react"
import { KeyButtonProps } from "../../../../components/Components"
import { Keyboards } from "../../../../keyboards/Keyboards"

interface ClearButtonsProps {
  keyboard?: string
  active_class?: string
}

export const ClearButtons = (
  {
    keyboard,
    active_class = 'KeyButtonActive'
  }: ClearButtonsProps
) => {
  Keyboards.get(keyboard).keys
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