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
import { PlayModeButton } from './play_mode_button/PlayModeButton'
import { CurrentNoteInput } from './current_note_input/CurrentNoteInput'

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

  const play_mode_o_click = (mode: PlayMode) => {
    let next_note = 0
    ClearButtons({keyboard: Keyboards.get(props.keyboard.get())})
    switch(mode.name) {
    case 'stop':
      PianoAudioContext.current_note = next_note
      mode = {...mode, current_note: next_note}
      break
    case 'next':
      next_note = PianoAudioContext.increment_current_note(props?.play_notes?.get())
      mode = {...mode, current_note: next_note}
      break
    case 'back':
      next_note = PianoAudioContext.decrement_current_note()
      mode = {...mode, current_note: next_note}
      break
    }
    props.play_mode.set(mode)
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
      <CurrentNoteInput/>
      {
        play_modes.map((mode: PlayMode, index: number) => (
          <PlayModeButton
            dangerouslySetInnerHTML={{__html: mode.inner_html}}
            key={index}
            selected={(props.play_mode.get()?.name || '') === mode.name}
            onClick={() => play_mode_o_click(mode)}/>
        ))
      }
  </Div>
  )
}