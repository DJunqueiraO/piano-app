import { MidiNoteOffEvent, MidiNoteOnEvent, parseMidi } from 'midi-file'
import { Note } from '../../models/Models'

export const midiToJson = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer()
  const midiData = new Uint8Array(arrayBuffer)
  const parsed = parseMidi(midiData)

  const notes: Array<Note> = []
  let currentTime = 0

  let tempo = 500000
  const ticksPerBeat: number = parsed.header.ticksPerBeat || 0

  parsed.tracks.forEach(track => {
    track.forEach((event) => {
      currentTime += event.deltaTime
      if (event.type === 'setTempo') {
        tempo = event.microsecondsPerBeat
      }
      if (event.type === 'noteOn' || event.type === 'noteOff') {
        const timeInMilliseconds = (currentTime * tempo) / (ticksPerBeat * 1000)
        notes.push(
          new Note(event, timeInMilliseconds)
        )
      }
    })
  })

  const filterNotes = (notes: Array<Note>) => {
    let firstNoteOnIndex = -1;
    let lastNoteOnIndex = -1;
    notes.forEach((note, index) => {
      if (note.type === 'noteOn') {
        if (firstNoteOnIndex === -1) {
          firstNoteOnIndex = index;
        }
        lastNoteOnIndex = index;
      }
    });
    if (firstNoteOnIndex !== -1 && lastNoteOnIndex !== -1) {
      return notes.slice(firstNoteOnIndex, lastNoteOnIndex + 1);
    }
    return [];
  };

  const normalizeNoteTimes = (notes: Array<Note>) => {
    if (notes.length === 0) {
      return notes;
    }
    const firstNoteTime = notes.reduce((minTime: number | null, note: Note) => {
      if (note.type === 'noteOn' && (minTime === null || note.time < minTime)) {
        return note.time;
      }
      return minTime;
    }, null);
    if (firstNoteTime === null) {
      return notes;
    }
    return notes.map((note: Note) => ({
      ...note,
      time: note.time - firstNoteTime,
    }));
  };


  return normalizeNoteTimes(filterNotes(notes))
}