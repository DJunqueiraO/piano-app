import { KeyButtonProps } from "../../components/Components"
import { Keyboard } from "../Keyboards"
import './GuitarArm.css'

const on_map: (column: number, column_index: number) => KeyButtonProps = (
  (column, column_index) => {

    const on_class_name = () => {
      let class_name = 'GuitarArm'
      const markers = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24]
      if(column_index === 0) {
        class_name += ' GuitarArmCapotasto'
      }
      if(markers.some(marker => marker === column_index)) {
        class_name += ' GuitarArmFletMarker'
      }
      return class_name
    }

    return {
      className: on_class_name(),
      children: `${column}`
    }
  }
)

export class GuitarArmProps {
  1?: number
  2?: number
  3?: number
  4?: number
  5?: number
  6?: number
}

export class GuitarArm implements Keyboard {
  
  keys: KeyButtonProps[][]
  notes: Record<string, string>

  constructor(
    props: GuitarArmProps = {}
  ) {
    props = {...{1: 24, 2: 19, 3: 15, 4: 10, 5: 5, 6: 0}, ...props}
    const keys: number[][] = new Array(6).fill(null).map(
      (row, row_index) => new Array(25).fill(null).map(
        (_, column_index) => (column_index + 40 + Object.values(props)[row_index])
      )
    )
    this.keys = keys.map(row => row.map(on_map))
    this.notes = {}
  }
}