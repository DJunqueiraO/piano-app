import { Button, Div, DivProps, Input, Label, MinusButton, PlusButton, Span } from '../../../components/Components'
import { Note, KeyboardProps, PlayMode } from '../../../models/Models'
import { midiToJson, UseStateObject } from '../../../utils/Utils'
import play_modes from '../../../assets/play_modes.json'
import './MidiPlayer.css'
import { Keyboards } from '../../../keyboards/Keyboards'
import { strings } from '../../../assets/Assets'
import { MidiPlayerInput } from './midi_player_input/MidiPlayerInput'
import { ClearButtons } from '../piano/clear_buttons/ClearButtons'
import { PianoAudioContext } from '../../../utils/piano_audio_context/PianoAudioContext'

type MidiPlayerProps = DivProps & KeyboardProps & {
  play_notes: UseStateObject<Note[]>
}

export function MidiPlayer(props: MidiPlayerProps) {

  const on_file_change = async (event: React.ChangeEvent<HTMLInputElement>) => {
    PianoAudioContext.current_note = 0
    PianoAudioContext.cancel_animation_frame()
    const files = event.target.files
    if(files) {
        const file = files[0]
        if (file) {
          try {
            props.play_notes.set(await midiToJson(file))
          } catch (e) {
            console.log(e)
          }
        }
    }
  }

  const on_download_tab = () => {

    const a = document.createElement('a')
    const play_notes = (
      props.play_notes
        ?.get()
        ?.reduce(
          (notes: Note[][], note: Note) => {
            const time_notes = (
              props.play_notes
                ?.get()
                ?.filter(note => note.type === 'noteOn')
                ?.filter($0 => $0.time === note.time)
            )
            if(!notes.some($0 => $0.some($1 => $1.time === note.time))) {
              notes.push(time_notes)
            }
            return notes
          },
          []
        )
        ?.map(notes => notes.map(note => Note.get_character(note.noteNumber)))
    )
    const blob = new Blob([JSON.stringify(play_notes)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    a.href = url
    a.download = 'tab.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Div 
      {...props}
      className='MidiPlayer'>
      <Input 
        id="InputFile"
        type="file" 
        accept=".mid,.midi" 
        onChange={on_file_change}/>
      <Label 
        htmlFor="InputFile">
        {`${strings.en.upload} ${strings.en.midi}`}
      </Label>
      <Button
        className='MidiPlayerDownloadTabButton'
        onClick={on_download_tab}>
        {`${strings.en.download} ${strings.en.tablature}`}
      </Button>
      <MidiPlayerInput 
        step={0.1}
        min={0}
        max={9}
        state={props.velocity}>
        <Span>x</Span>
      </MidiPlayerInput>
      {/* <MidiPlayerInput 
        keyboard={props.keyboard}
        state={props.current_note}>
        <Span>&gt;</Span>
      </MidiPlayerInput> */}
      {
        play_modes.map((mode: PlayMode, index: number) => (
          <Button
            dangerouslySetInnerHTML={{__html: mode.inner_html}}
            key={index}
            selected={(props.play_mode.get()?.name || '') === mode.name}
            onClick={() => {
              let next_note = PianoAudioContext.current_note
              ClearButtons({keyboard: Keyboards.get(props.keyboard.get())})
              switch(mode.name) {
              case 'stop':
                PianoAudioContext.current_note = 0
                break
              case 'next':
                next_note += 1
                PianoAudioContext.current_note = next_note
                mode = {...mode, current_note: next_note}
                break
              case 'back':
                next_note -= 1
                if(next_note >= 0) {
                  PianoAudioContext.current_note = next_note
                }
                mode = {...mode, current_note: next_note}
                break
              }
              props.play_mode.set(mode)
            }}/>
        ))
      }
  </Div>
  )
}