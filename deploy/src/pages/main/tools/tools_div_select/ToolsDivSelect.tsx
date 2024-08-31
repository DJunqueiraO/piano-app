import { strings } from '../../../../assets/Assets'
import { 
  Div, 
  Option, 
  Select, 
  SelectProps, 
  Span 
} from '../../../../components/Components'
import { Keyboards } from '../../../../keyboards/Keyboards'
import { KeyboardProps } from '../../../../models/Models'
import './ToolsDivSelect.css'

export type ToolsDivSelectProps = React.HTMLAttributes<HTMLDivElement> & KeyboardProps & {
  select_props: SelectProps
}

export function ToolsDivSelect(props: ToolsDivSelectProps) {
  return (
    <Div
      {...props}
      className='Tool'
      style={{display: 'flex', marginLeft: '.5em'}}>
      {props.children}
      <Select
        {...props.select_props}
        value={props.keyboard.get()}
        onChange={event => {
            props.keyboard.set(
                event.target.value
            )
        }}>
      </Select>
    </Div>
  )
}