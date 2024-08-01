import './Select.css'

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`Select ${props.className || ''}`}/>
  )
}