
import { Div, DivProps, Option, Select, Span } from '../../../components/Components'
import './Tools.css'
import { ToolInput } from './tool_input/ToolInput'
import instruments from '../../../assets/instruments.json'
import keyboards from '../../../assets/keyboards.json'
import { NoteProps } from '../../../models/Models'
import { strings } from '../../../assets/Assets'

type ToolsProps = DivProps & NoteProps

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
                    input_props={{min: 0}}
                    state={props.upper}>
                    {strings.en.upper}: 
                </ToolInput>
                <ToolInput 
                    className='Tool'
                    input_props={{min: 0}}
                    state={props.volume}>
                    {strings.en.volume}: 
                </ToolInput>
                <ToolInput 
                    className='Tool'
                    input_props={{min: 0}}
                    state={props.duration}>
                    {strings.en.duration}: 
                </ToolInput>
                <Div
                    className='Tool'
                    style={{display: 'flex'}}>
                    <Span>{strings.en.keyboard}: </Span>
                    <Select
                        value={props.keyboard.get()}
                        onChange={event => {
                            props.keyboard.set(
                                event.target.value
                            )
                            window.location.reload()
                        }}>
                        {
                            keyboards.map(
                                keyboard => (
                                    <Option
                                        key={keyboard}
                                        value={keyboard}>
                                        {keyboard}
                                    </Option>
                                )
                            )
                        }
                    </Select>
                </Div>
                <Div
                    className='Tool'
                    style={{display: 'flex'}}>
                    <Span>{strings.en.instrument}: </Span>
                    <Select
                        value={instruments.find(instrument => instrument.id === props.instrument.get())?.name || ''}
                        onChange={event => {
                            props.instrument.set(
                                instruments.find(instrument => instrument.name === event.target.value)?.id || 0
                            )
                            window.location.reload()
                        }}>
                        {
                            instruments.map(
                                instrument => (
                                    <Option
                                        key={instrument.name}
                                        value={instrument.name}>
                                        {instrument.name}
                                    </Option>
                                )
                            )
                        }
                    </Select>
                </Div>
            </Div>
        </Div>
    )
}