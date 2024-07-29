import React, { ButtonHTMLAttributes, HTMLAttributes } from "react"
import './KeyButton.css'
import { Note } from "../../models/Models"

export type KeyButtonProps = (
    ButtonHTMLAttributes<HTMLButtonElement> & {
        span_props?: HTMLAttributes<HTMLSpanElement>
    }
)

export function KeyButton(props: KeyButtonProps) {

    const onChildren = () => {
        return props.children === 'undefinedNaN'? '' : props.children
    }

    const on_style = () => {
        return {...props.style,

        }
    }

    const on_point_style = () => (
        {
            backgroundColor: Note.get_color(`${onChildren()}`.slice(0, -1))
        }
    )

    const on_class_name = () => {
        return ('KeyButton '
            .concat(`${`${onChildren()}`.includes('#')? 'KeyButtonSharpNote' : ''} `)
            .concat(`${props.className || ''} `)
            .concat(`${onChildren() || ''} `))
    }

    if(onChildren()) return (
        <button 
            {...props}
            className={on_class_name()}
            style={on_style()}
            onClick={props.onClick}>
            <span
                {...props.span_props}/>
            <hr
                style={on_point_style()}/>
            {onChildren()}
        </button>
    )
    return <></>
}