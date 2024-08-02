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

export class GuitarArm implements Keyboard {
  
  keys: KeyButtonProps[][]
  notes: Record<string, string>

  constructor() {
    const start_note = [24, 19, 15, 10, 5, 0]
    const keys: number[][] = new Array(6).fill(null).map(
      (row, row_index) => new Array(25).fill(null).map(
        (_, column_index) => (column_index + 40 + start_note[row_index])
      )
    )
    this.keys = keys.map(row => row.map(on_map))
    this.notes = {}
  }
}