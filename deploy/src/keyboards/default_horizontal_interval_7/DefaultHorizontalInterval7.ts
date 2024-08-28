import { key_codes, keyboard_horizontal_interval_7 } from '../../assets/Assets'
import { KeyButtonProps } from '../../components/Components'
import { Keyboard } from '../Keyboards'
import './DefaultHorizontalInterval7.css'

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

export const DefaultHorizontalInterval7: Keyboard = {
  keys: keyboard_horizontal_interval_7.keys.map(on_map),
  notes: keyboard_horizontal_interval_7.notes
}