import './Select.css'

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export function Select(props: SelectProps) {
  return (
    <select
      {...props}
      className={`Select ${props.className || ''}`}/>
  )
}