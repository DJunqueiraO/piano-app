import { ChangeEvent, InputHTMLAttributes } from 'react'
import { UseStateObject } from '../../utils/Utils'
import './Input.css'

export type InputProps = (
    InputHTMLAttributes<HTMLInputElement> & 
    {
        key?: number,
        state?: UseStateObject<any>,
        onShowPlaceHolder?: (value: any) => string
        onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    }
)

export function Input(props: InputProps) {
    const on_change = (event: ChangeEvent<HTMLInputElement>) => {
        if(props.onChange) props.onChange(event)
        let next: number | string
        if(`${props.type}` === 'number') {
            next = parseInt(event.target.value)
            const max = parseInt(`${props.max}`)
            const min = parseInt(`${props.min}`)
            if(next > max) next = max
            if(next < min) next = min
        } else {
            next = event.target.value
        }
        props.state?.set(next)
    }

    const on_place_holder = () => {
        const value = props.state
        if(value && props.onShowPlaceHolder) {
            return `${props.onShowPlaceHolder(value.get())}`
        }
        return "0"
    }

    return (
        <input 
            placeholder={on_place_holder()}
            value={props.state?.get()}
            {...props}
            onChange={on_change}
            className={`Input ${props.className || ''}`}/>
    )
}