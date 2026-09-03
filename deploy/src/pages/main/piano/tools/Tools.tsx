
import { Div, DivProps, Option } from '../../../../components/Components'
import './Tools.css'
import { ToolInput } from './tool_input/ToolInput'
import instruments from '../../../../assets/instruments.json'
import { KeyboardProps } from '../../../../models/Models'
import { strings } from '../../../../assets/Assets'
import { Keyboards } from '../../../../keyboards/Keyboards'
import { ToolsDivSelect } from './tools_div_select/ToolsDivSelect'

type ToolsProps = DivProps & KeyboardProps

export function Tools(props: ToolsProps) {

    return (
        <Div 
            {...props}
            className='Tools'>
            <Div 
                style={{
                    overflowX: 'auto', 
                    overflowY: 'hidden',
                    display: 'flex',
                    width: '100%',
                }}>
                <ToolInput 
                    className='Tool'
                    state={props.upper}>
                    {strings.en.tone}: 
                </ToolInput>
                <ToolInput 
                    style={{marginLeft: '.5em'}}
                    className='Tool'
                    input_props={{min: 0}}
                    state={props.volume}>
                    {strings.en.volume}: 
                </ToolInput>
                <ToolInput 
                    style={{marginLeft: '.5em'}}
                    className='Tool'
                    input_props={{min: 0}}
                    state={props.duration}>
                    {strings.en.duration}: 
                </ToolInput>
                <ToolsDivSelect
                    {...props}
                    select_props={{
                        value: props.keyboard.get(),
                        onChange: (event) => props.keyboard.set(event.target.value),
                        children: (
                            Object.values(Keyboards).map(
                                (keyboard) => (
                                    <Option
                                        key={keyboard}
                                        value={keyboard}>
                                        {keyboard}
                                    </Option>
                                )
                            )
                        )
                    }}/>
                <ToolsDivSelect
                    {...props}
                    select_props={{
                        value: instruments[props.instrument.get() || 0]?.name,
                        onChange: (event) => props.instrument.set(instruments.find(instrument => instrument.name === event.target.value)?.id || 0),
                        children: (
                            instruments.map(
                                instrument => (
                                    <Option
                                        key={instrument.name}
                                        value={instrument.name}>
                                        {instrument.name}
                                    </Option>
                                )
                            )
                        )
                    }}/>
            </Div>
        </Div>
    )
}