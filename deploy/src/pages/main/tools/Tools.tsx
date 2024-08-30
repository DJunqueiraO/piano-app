
import { Div, DivProps, Option, Select, Span } from '../../../components/Components'
import './Tools.css'
import { ToolInput } from './tool_input/ToolInput'
import instruments from '../../../assets/instruments.json'
import { KeyboardProps } from '../../../models/Models'
import { strings } from '../../../assets/Assets'
import { Keyboards } from '../../../keyboards/Keyboards'

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
                <Div
                    className='Tool'
                    style={{display: 'flex', marginLeft: '.5em'}}>
                    <Span>{strings.en.keyboard}: </Span>
                    <Select
                        value={props.keyboard.get()}
                        onChange={event => {
                            props.keyboard.set(
                                event.target.value
                            )
                        }}>
                        {
                            Object.values(Keyboards).map(
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
                    style={{display: 'flex', marginLeft: '.5em'}}>
                    <Span>{strings.en.instrument}: </Span>
                    <Select
                        value={
                            instruments.find(
                                instrument => (
                                    instrument.id === props.instrument.get()
                                )
                            )?.name || ''
                        }
                        onChange={event => {
                            props.instrument.set(
                                instruments
                                    .find(
                                        instrument => (
                                            instrument.name === event.target.value
                                        )
                                    )?.id || 0
                            )
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