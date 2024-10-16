import React, { ButtonHTMLAttributes, HTMLAttributes } from "react"
import './KeyButton.css'
import { Note } from "../../models/Models"

export type KeyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    first_span_props?: HTMLAttributes<HTMLSpanElement>
    last_span_props?: HTMLAttributes<HTMLSpanElement>
    is_keyboard?: string
}


export function KeyButton(props: KeyButtonProps) {

    const onChildren = () => {
        if(
            `${props.children}`.includes('undefined')
        ) {
            return ''
        }
        return props.children
    }

    const on_point_style = () => (
        {
            backgroundColor: Note.get_color(`${onChildren()}`.slice(0, -1))
        }
    )

    const on_class_name = () => {
        let className = 'KeyButton '
        if(props.is_keyboard) {
            className += `KeyButtonKeyboard `
            className += `${onChildren()}`.includes('#')? 'KeyButtonKeyboardSharpNote' : ''
        }
        return (
            className
            .concat(`${props.className || ''} `)
            .concat(`${onChildren() || ''} `)
        )
    }

    if(onChildren()) return (
        <button 
            {...props}
            className={on_class_name()}
            onClick={props.onClick}>
            <span
                {...props.first_span_props}/>
            <hr
                style={on_point_style()}/>
            <span
                className="KeyButtonNoteSpan"
                {...props.last_span_props}>
                {onChildren()}
            </span>
        </button>
    )
    return <></>
}