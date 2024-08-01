import { HTMLAttributes } from 'react'
import './Span.css'

type SpanProps = (
    HTMLAttributes<HTMLSpanElement>
)

export function Span(props: SpanProps) {
    return (
        <span 
            {...props}
            className={`Span ${props.className || ''}`}/>
    )
}