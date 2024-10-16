import { key_codes, keyboard_horizontal_interval_5 } from '../../assets/Assets'
import { KeyButtonProps } from '../../components/Components'
import { Keyboard } from '../Keyboards'
import './DefaultHorizontalInterval5.css'

const on_map: (row: string[]) => KeyButtonProps[] = row => row.map(
  column => {

    return {
      is_keyboard: 'true',
      first_span_props: {
        dangerouslySetInnerHTML: {
          __html: key_codes[column as keyof typeof key_codes]
        }
      },
      children: `${column}`
    }
  }
)

export const DefaultHorizontalInterval5: Keyboard = {
  keys: keyboard_horizontal_interval_5.keys.map(on_map),
  notes: keyboard_horizontal_interval_5.keys.reverse().reduce<Record<string, string>>(
    (keys, key, row_index) => {
      key.forEach(($0, column_index) => {
        keys[$0] = `${column_index + (row_index * 5)}`;
      });
      return keys;
    },
    {}
  )
}