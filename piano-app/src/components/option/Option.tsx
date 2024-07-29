import './Option.css'

export function Option(props: React.OptionHTMLAttributes<HTMLOptionElement>) {
  return (
    <option
      {...props}
      value={`${props.value || props.children}`}
      className={`Option ${props.className || ''}`}/>
  )
}