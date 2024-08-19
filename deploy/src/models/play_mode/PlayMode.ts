import { play_modes } from "../../assets/Assets"

export interface PlayMode {
  name: string
  inner_html: string
  current_note?: number
}