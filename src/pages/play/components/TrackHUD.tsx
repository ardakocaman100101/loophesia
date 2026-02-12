import { Volume2, VolumeX, Target } from 'lucide-react'
import { Song, SongConfig } from '@/types'
import { formatInstrumentName } from '@/utils'
import clsx from 'clsx'
import React from 'react'

type TrackHUDProps = {
    song: Song
    config: SongConfig
    onToggleMute: (trackId: number) => void
    onSolo: (trackId: number) => void
    onTogglePractice: (trackId: number) => void
}

export default function TrackHUD({ song, config, onToggleMute, onSolo, onTogglePractice }: TrackHUDProps) {
    const tracks = Object.entries(song.tracks).filter(([_, t]) =>
        song.notes.some(n => n.track === Number(_))
    )

    if (tracks.length <= 1) return null

    return (
        <div className="fixed left-4 top-24 z-20 flex flex-col gap-2 rounded-xl bg-black/40 p-3 backdrop-blur-md border border-white/10 max-h-[60vh] overflow-y-auto w-48 shadow-2xl">
            <div className="mb-2 px-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
                Instruments
            </div>
            {tracks.map(([idStr, track]) => {
                const id = Number(idStr)
                const settings = config.tracks[id]
                const isMuted = !settings?.sound
                const noteCount = song.notes.filter(n => n.track === id).length

                return (
                    <div
                        key={id}
                        className={clsx(
                            "group flex flex-col gap-1 rounded-lg p-2 transition-all hover:bg-white/10",
                            isMuted ? "opacity-50" : "opacity-100"
                        )}
                    >
                        <div className="flex items-center justify-between">
                            <span className="truncate text-xs font-bold text-white max-w-[100px]" title={track.name}>
                                {track.name || formatInstrumentName(settings?.instrument || track.instrument)}
                            </span>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => onSolo(id)}
                                    className="px-1.5 py-0.5 text-[9px] font-bold text-black bg-white/80 rounded hover:bg-white transition"
                                >
                                    SOLO
                                </button>
                                <button
                                    onClick={() => onTogglePractice(id)}
                                    className={clsx(
                                        "p-1 rounded transition",
                                        settings?.practice ? "text-purple-400 bg-purple-500/20" : "text-white/30 hover:text-white"
                                    )}
                                    title="Practice this track"
                                >
                                    <Target size={14} />
                                </button>
                                <button
                                    onClick={() => onToggleMute(id)}
                                    className="text-white hover:text-purple-400 transition"
                                >
                                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-purple-500/50"
                                    style={{ width: `${Math.min(100, (noteCount / song.notes.length) * 500)}%` }}
                                />
                            </div>
                            <span className="text-[8px] text-white/30">{noteCount}n</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
