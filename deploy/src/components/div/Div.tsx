import './Div.css'

export type DivProps = (
  React.HTMLAttributes<HTMLDivElement>
)

export function Div(props: DivProps) {
  return (
    <div
      {...props}
      className={`Div ${props.className || ''}`}/>
  )
}