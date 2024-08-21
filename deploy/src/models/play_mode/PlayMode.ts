import { play_modes } from "../../assets/Assets"

export interface PlayModeProps {
  name?: string
  inner_html?: string
  current_note?: number
}

export class PlayMode {
  name: string
  inner_html: string
  current_note?: number

  constructor(props?: PlayModeProps) {
    this.name = props?.name || ''
    this.inner_html = props?.inner_html || ''
    this.current_note = props?.current_note
  }
}