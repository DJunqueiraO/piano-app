import { key_codes, keyboard_horizontal_interval } from '../../assets/Assets'
import { KeyButtonProps } from '../../components/Components'
import './DefaultHorizontalInterval.css'

export interface DefaultHorizontalIntervalProps {
  interval: number
  division?: number
  step?: number
}

export class DefaultHorizontalInterval {
  keys: KeyButtonProps[][]
  notes: Record<string, string>
  division?: number
  step?: number

  constructor(props: DefaultHorizontalIntervalProps) {

    this.division = props.division
    this.step = props.step
    this.keys = keyboard_horizontal_interval.keys.map(this.on_map)
    this.notes = keyboard_horizontal_interval.keys.reduce<Record<string, string>>(
      (keys, key, row_index) => {
        key.forEach(($0, column_index) => {
          let row_interval = keyboard_horizontal_interval.keys.length - row_index
          if(props.division && props.step && props.division >= column_index) {
            row_interval += props.step
          }
          keys[$0] = `${(column_index) + (row_interval * props.interval)}`;
        });
        return keys;
      },
      {}
    )
  }

  on_map: (row: string[]) => KeyButtonProps[] = row => row.map(
    (column, column_index) => {
      const is_left_hand = column_index === this.division
      return {
        is_keyboard: 'true',
        first_span_props: {
          dangerouslySetInnerHTML: {
            __html: key_codes[column as keyof typeof key_codes]
          }
        },
        style: (
          is_left_hand? 
          {borderWidth: '2px', borderRightStyle: 'dashed'} 
          : 
          {}
        ),
        children: `${column}`
      }
    }
  )
}