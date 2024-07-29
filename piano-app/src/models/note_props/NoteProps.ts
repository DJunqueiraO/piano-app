import { UseStateObject } from "../../utils/Utils"
import { Note } from "../Models"

export interface NoteProps {
  play_notes?: UseStateObject<Array<Note>>
  upper: UseStateObject<number>
  volume: UseStateObject<number>
  duration: UseStateObject<number>
  instrument: UseStateObject<number>
  play_mode: UseStateObject<string>
  keyboard: UseStateObject<string>
  velocity: UseStateObject<number>
  current_note: UseStateObject<number>
}