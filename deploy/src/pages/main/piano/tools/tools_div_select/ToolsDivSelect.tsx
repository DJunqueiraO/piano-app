import { 
  Div, 
  Select, 
  SelectProps
} from '../../../../../components/Components'
import { KeyboardProps } from '../../../../../models/Models'
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
        {...props.select_props}>
      </Select>
    </Div>
  )
}