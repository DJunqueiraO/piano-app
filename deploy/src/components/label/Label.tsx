import './Label.css'

export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label
            {...props}
            className={`Label ${props.className || ''}`}/>
    )
}