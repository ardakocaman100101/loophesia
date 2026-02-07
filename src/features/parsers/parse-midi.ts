// Since this is called from Deno as well, we need to use relative paths.
import * as tonejs from '@tonejs/midi'
import type { Bpm, Song, SongMeasure, SongNote, Tracks } from '../../../src/types'
import { KEY_SIGNATURE } from '../theory'

function sort<T extends { time: number }>(arr: T[]): T[] {
  return arr.sort((i1, i2) => i1.time - i2.time)
}

export default function parseMidi(midiData: Uint8Array<ArrayBuffer>): Song {
  const parsed = new tonejs.Midi(midiData)
  const bpms: Array<Bpm> = parsed.header.tempos.map((tempo) => {
    return { time: parsed.header.ticksToSeconds(tempo.ticks), bpm: tempo.bpm }
  })
  let notes: Array<SongNote> = parsed.tracks.flatMap((track, i) => {
    return track.notes.map((note) => ({
      type: 'note',
      midiNote: note.midi,
      track: i,
      time: note.time,
      duration: note.duration,
      velocity: note.velocity * 127,
      measure: Math.floor(parsed.header.ticksToMeasures(note.ticks)),
    }))
  })
  let tracks: Tracks = Object.fromEntries(
    parsed.tracks.map((track, i) => {
      return [
        i,
        {
          name: track.name,
          // infer percussion soundfont for drums (channel 9)
          instrument: track.channel === 9 ? 'percussion' : track.instrument.name,
          program: track.instrument.number,
        },
      ]
    }),
  )

  // Auto-split single track MIDI
  const activeTracks = new Set(notes.map((n) => n.track))
  if (activeTracks.size === 1) {
    const mainTrackId = activeTracks.values().next().value
    if (mainTrackId === undefined) throw new Error('No track found')

    const splitTrackId = Math.max(...Object.keys(tracks).map(Number)) + 1

    // Create new track for left hand (Bass)
    tracks[splitTrackId] = {
      name: 'Left Hand (Auto-Split)',
      instrument: tracks[mainTrackId].instrument,
      program: tracks[mainTrackId].program,
    }

    // Move notes < 60 (Middle C) to the new track
    // Use K-Means clustering (K=2) to find a better split point than just Middle C.
    // This adapts to songs that are higher or lower in register.
    const pitches = notes.map((n) => n.midiNote)
    if (pitches.length > 0) {
      let centerL = 48 // Start around C3
      let centerR = 72 // Start around C5
      for (let i = 0; i < 5; i++) {
        const groupL = pitches.filter((p) => Math.abs(p - centerL) < Math.abs(p - centerR))
        const groupR = pitches.filter((p) => Math.abs(p - centerL) >= Math.abs(p - centerR))

        if (groupL.length > 0) centerL = groupL.reduce((a, b) => a + b, 0) / groupL.length
        if (groupR.length > 0) centerR = groupR.reduce((a, b) => a + b, 0) / groupR.length
      }

      const splitPoint = (centerL + centerR) / 2

      notes = notes.map((note) => {
        if (note.track === mainTrackId && note.midiNote < splitPoint) {
          return { ...note, track: splitTrackId }
        }
        return note
      })
    }
  }
  const timeSignature = parsed.header.timeSignatures[0]?.timeSignature ?? [4, 4]
  const keySignature = parsed.header.keySignatures[0]?.key as KEY_SIGNATURE

  let measureIndex = 1
  const measures: Array<SongMeasure> = parsed.header.timeSignatures.flatMap(
    (timeSignatureEvent, i, arr) => {
      let startOfTempoTicks = timeSignatureEvent.ticks
      // Either end of song, or start of next timeSignature.
      let endOfTempoTicks = !!arr[i + 1] ? arr[i + 1].ticks : parsed.durationTicks
      let ticksPerMeasure =
        (timeSignatureEvent.timeSignature[0] / timeSignatureEvent.timeSignature[1]) *
        (4 * parsed.header.ppq)
      let startMeasure = parsed.header.ticksToMeasures(startOfTempoTicks)
      let endMeasure = parsed.header.ticksToMeasures(endOfTempoTicks)
      let measureCount = Math.ceil(endMeasure - startMeasure) // If the time signature lasts until the end of the song, it'll be fractional.
      let secondsPerMeasure =
        parsed.header.ticksToSeconds(startOfTempoTicks + ticksPerMeasure) -
        parsed.header.ticksToSeconds(startOfTempoTicks)

      const type = 'measure'
      const duration = secondsPerMeasure
      return Array.from({ length: measureCount }).map((_, i) => {
        let number = measureIndex++
        const tick = startOfTempoTicks + i * ticksPerMeasure
        const time = parsed.header.ticksToSeconds(tick)
        return { type, number, duration, time }
      })
    },
  )

  return {
    duration: parsed.duration,
    measures: sort(measures),
    notes: sort(notes),
    tracks,
    bpms,
    timeSignature: { numerator: timeSignature[0], denominator: timeSignature[1] },
    keySignature,
    items: sort([...measures, ...notes]),
    ppq: parsed.header.ppq,
    secondsToTicks: (n) => parsed.header.secondsToTicks(n),
    ticksToSeconds: (n) => parsed.header.ticksToSeconds(n),
  }
}
