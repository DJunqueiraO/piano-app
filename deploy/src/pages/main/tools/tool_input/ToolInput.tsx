import { Button, Div, Input, InputProps, MinusButton, PlusButton, Span } from '../../../../components/Components'
import { UseStateObject } from '../../../../utils/Utils'
import './ToolInput.css'

type ToolInputProps = React.HTMLAttributes<HTMLDivElement> & React.CSSProperties & {
    state: UseStateObject<any>,
    input_props?: InputProps
}

export function ToolInput(props: ToolInputProps) {

    const on_change = () => {
        window.location.reload()
    }

    return (
        <Div
            {...props}
            className={`ToolInput ${props.className || ''}`}>
            <Span>{props.children}</Span>
            <Input 
                state={props.state}
                onChange={on_change}
                max={9999} 
                min={-9999} 
                type="number"
                {...props.input_props}/>
            <PlusButton 
                state={props.state}
                onClick={() => {
                    on_change()
                }}/>
            <MinusButton 
                state={props.state}
                onClick={() => {
                    on_change()
                }}/>
        </Div>
    )
}