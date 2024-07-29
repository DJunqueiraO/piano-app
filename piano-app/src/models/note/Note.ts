import { MidiNoteOffEvent, MidiNoteOnEvent } from "midi-file"

export class Note {
  type: 'noteOn' | 'noteOff'
  noteNumber: number
  velocity: number
  time: number

  constructor(
    event: MidiNoteOnEvent | MidiNoteOffEvent,
    time: number
  ) {
    this.type = event.type
    this.noteNumber = event.noteNumber
    this.velocity = event.velocity
    this.time = time
  }

  static get_character = (n: number) => {
    const notas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    const oitava = Math.floor(n / 12)
    const posicaoNota = n % 12
    const notaFormatada = `${notas[posicaoNota]}${oitava}`
    return notaFormatada
  }
  get_character = () => (Note.get_character(this.noteNumber))

  static get_color = (c: string) => {
    const notas: {[key: string]: string} = {
        'C': 'firebrick',
        'C#': 'red',
        'D': 'darkblue',
        'D#': 'lightblue',
        'E': 'royalblue',
        'F': 'purple',
        'F#': 'blueviolet',
        'G': 'darkcyan',
        'G#': 'cyan',
        'A': 'orange',
        'A#': 'yellow',
        'B': 'olive'
    }
    return notas[c]
  }
  get_color = () => (Note.get_color(this.get_character()))

  static get_frequency = (number: number) => {
    if(!number) return 0
    return Math.pow(2, (number - 69) / 12) * 440
  }
  get_frequency = () => (Note.get_frequency(this.noteNumber))
}
