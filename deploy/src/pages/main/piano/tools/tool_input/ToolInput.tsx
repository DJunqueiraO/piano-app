import { Div, Input, InputProps, Span } from '../../../../../components/Components'
import { UseStateObject } from '../../../../../utils/Utils'
import './ToolInput.css'

type ToolInputProps = React.HTMLAttributes<HTMLDivElement> & React.CSSProperties & {
    state: UseStateObject<any>,
    input_props?: InputProps
}

export function ToolInput(props: ToolInputProps) {

    return (
        <Div
            {...props}
            className={`ToolInput ${props.className || ''}`}>
            <Span>{props.children}</Span>
            <Input 
                state={props.state}
                max={9999} 
                min={-9999} 
                type="number"
                {...props.input_props}/>
        </Div>
    )
}