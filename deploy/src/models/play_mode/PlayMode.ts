import { play_modes } from "../../assets/Assets"

export interface PlayMode {
  name: "play" | "pause" | "mute" | "stop" | "back" | "next"
  inner_html: string
}