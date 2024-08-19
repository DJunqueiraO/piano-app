import { UseStateObject } from "../../utils/Utils"
import { Note, PlayMode } from "../Models"

export interface NoteProps {
  play_notes?: UseStateObject<Array<Note>>
  upper: UseStateObject<number>
  volume: UseStateObject<number>
  duration: UseStateObject<number>
  instrument: UseStateObject<number>
  play_mode: UseStateObject<PlayMode>
  keyboard: UseStateObject<string>
  velocity: UseStateObject<number>
  // current_note: UseStateObject<number>
}