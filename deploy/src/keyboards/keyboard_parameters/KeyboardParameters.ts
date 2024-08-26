import { demo, play_modes } from "../../assets/Assets"
import { Note, KeyboardProps, PlayMode } from "../../models/Models"
import { Keyboards } from "../Keyboards"

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
    props?: KeyboardProps
  ) {
    this.upper = props?.upper.get() || 0
    this.volume = props?.volume.get() || 10
    this.duration = props?.duration.get() || 3
    this.instrument = props?.instrument.get() || 3
    this.play_mode = props?.play_mode.get() || play_modes[1]
    this.keyboard = props?.keyboard.get() || Object.values(Keyboards)[0]
    this.play_notes = props?.play_notes?.get() || demo.map(note => new Note(note))
    this.velocity = props?.velocity.get() || 1
  }
}
