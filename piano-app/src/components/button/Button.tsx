import { ButtonHTMLAttributes, SyntheticEvent } from 'react'
import './Button.css'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    selected?: boolean,
    onClick?: (event: any) => void,
    onChange?: ((this: GlobalEventHandlers, ev: Event) => any) | null,
    accept?: string,
    type?: 'button' | 'submit' | 'reset' | 'file',
    reverse?: 'true' | 'false'
}

export function Button(props: ButtonProps) {
    const onClickHandler = (event: SyntheticEvent) => {
        
        if (`${props.type}` === 'file') {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = `${props.accept}`
            if(props.onChange) {
                input.onchange = props.onChange
            }
            input.click()
        }
        
        if(props.onClick) {
            props.onClick(event)
        }
    }

    const on_class_name = () => {
        let class_name = 'Button'
        return class_name
            .concat(props.selected? ' ButtonSelected' : '')
            .concat(` ${props.className || ''}`)
            .concat(` ${props.reverse? ' ButtonReverse' : ''}`)
    }

    return (
        <button 
            {...props}
            onClick={onClickHandler}
            className={on_class_name()}/>
    )
}