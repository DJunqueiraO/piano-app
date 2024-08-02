import keyboard_horizontal_cromatic from '../../assets/keyboard_horizontal_cromatic.json'
import key_codes from '../../assets/key_codes.json'
import { KeyButtonProps } from '../../components/Components'
import { Keyboard } from '../Keyboards'
import './DefaultHorizontalCromatic.css'

const on_map: (row: string[]) => KeyButtonProps[] = row => row.map(
  column => {

    return {
      span_props: {
        dangerouslySetInnerHTML: {
          __html: key_codes[column as keyof typeof key_codes]
        }
      },
      children: `${column}`
    }
  }
)

export const DefaultHorizontalCromatic: Keyboard = {
  keys: keyboard_horizontal_cromatic.keys.map(on_map),
  notes: keyboard_horizontal_cromatic.notes
}