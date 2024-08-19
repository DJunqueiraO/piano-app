import { play_modes } from "../../assets/Assets"
import { Note, NoteProps, PlayMode } from "../../models/Models"

export class KeyboardParameters {
  upper: number
  volume: number
  duration: number
  instrument: number
  play_mode: PlayMode
  keyboard: string
  play_notes: Note[]
  velocity: number

  constructor(
    props?: NoteProps
  ) {
    this.upper = props?.upper.get() || 0
    this.volume = props?.volume.get() || 0
    this.duration = props?.duration.get() || 3
    this.instrument = props?.instrument.get() || 0
    this.play_mode = props?.play_mode.get() || play_modes[0]
    this.keyboard = props?.keyboard.get() || 'default'
    this.play_notes = props?.play_notes?.get() || []
    this.velocity = props?.velocity.get() || 1
  }
}
