import keyboard_horizontal from '../../assets/keyboard_horizontal.json'
import key_codes from '../../assets/key_codes.json'
import { KeyButtonProps } from '../../components/Components'
import { Keyboard } from '../Keyboards'
import './DefaultHorizontal.css'

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

export const DefaultHorizontal: Keyboard = {
  keys: keyboard_horizontal.keys.map(on_map)
}