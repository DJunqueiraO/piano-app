import keyboard_vertical from '../../assets/keyboard_vertical.json'
import { KeyButtonProps } from '../../components/Components'
import { Keyboard } from '../Keyboards'
import './DefaultVertical.css'

const on_map: (row: string[]) => KeyButtonProps[] = row => row.map(
  column => {
    return {
      children: `${column}`
    }
  }
)

export const DefaultVertical: Keyboard = {
  keys: keyboard_vertical.keys.map(on_map),
  notes: keyboard_vertical.notes
}