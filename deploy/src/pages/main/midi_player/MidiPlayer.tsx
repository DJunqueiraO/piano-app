import { Button, Div, DivProps, Input, Label, MinusButton, PlusButton, Span } from '../../../components/Components'
import { Note, NoteProps } from '../../../models/Models'
import { midiToJson, UseStateObject } from '../../../utils/Utils'
import play_modes from '../../../assets/play_modes.json'
import './MidiPlayer.css'
import { Keyboards } from '../../../keyboards/Keyboards'
import { MidiPlayerVelocityInput } from './midi_player_velocity_input/MidiPlayerVelocityInput'
import { strings } from '../../../assets/Assets'

type MidiPlayerProps = DivProps & NoteProps & {
  play_notes: UseStateObject<Note[]>
}

export function MidiPlayer(props: MidiPlayerProps) {

  const on_file_change = async (event: React.ChangeEvent<HTMLInputElement>) => {
    window.location.reload()
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
    props.current_note.set(0)
  }

  const on_download_tab = () => {

    const a = document.createElement('a')
    const play_notes = props.play_notes.get().filter(note => note.type === 'noteOn')
    const notes_tab = (
      play_notes
        .reduce(
          (notes: string[][], note: Note) => {
            const time = note.time
            notes.push(
              play_notes
                .filter(note => note.time === time)
                .map(note => Note.get_character(note.noteNumber))
            )
            return notes
          },
          []
        )
        .map($0 => $0.join('-'))
        .join(' | ')
    )
    const blob = new Blob([notes_tab], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    a.href = url
    a.download = 'tab.txt'
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
        {`${strings.en.upload} ${strings.en.tab}`}
      </Label>
      <Button
        className='MidiPlayerDownloadTabButton'
        onClick={on_download_tab}>
        {`${strings.en.download} ${strings.en.tab}`}
      </Button>
      <MidiPlayerVelocityInput 
        velocity={props.velocity}/>
      {
        play_modes.map((mode, index) => (
          <Button
            dangerouslySetInnerHTML={{__html: mode}}
            key={index}
            selected={props.play_mode.get() === mode}
            onClick={() => {
              window.location.reload()
              if(index === 3) {
                props.current_note.set(0)
              }
              props.play_mode.set(mode)
            }}/>
        ))
      }
  </Div>
  )
}