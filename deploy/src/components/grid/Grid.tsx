import { Column, ColumnProps, Row, RowProps } from '../Components'

type GridProps = (
  React.HTMLAttributes<HTMLDivElement> & 
  {
    children?: Array<Array<React.ReactNode>>,
    align_columns?: 'true' | 'false',
    fill_vertically?: 'false' | 'true',
    row_props?: RowProps,
    column_props?: ColumnProps
  }
)

export function Grid(props: GridProps) {

  const numberOfRows = props?.children?.length || 0

  const on_max_items = () => {
    if(props?.align_columns === 'true') return props?.children?.reduce(
      (max, line) => Math.max(max, line.length), 0
    )
    return 0
  }

  return (
    <div
      {...props}
      className={`Grid ${props.className || ''}`}>
      {
        props?.children?.map(
          (line, index) => (
            <Row 
              {...props.row_props}
              style={{
                height: `${props.fill_vertically}` === 'true' ? `${100/(numberOfRows)}%` : 'auto'
              }}
              max_items={on_max_items()} 
              key={index}>
              {
                line.map(
                  (column, index) => (
                    <Column 
                      {...props.column_props}
                      key={index}>
                      {column}
                    </Column>
                  )
                )
              }
            </Row>
          )
        )
      }
    </div>
  )
}