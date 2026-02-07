import { Sizer, UploadMidi } from '@/components'
import React from 'react'
import { Link, useNavigate } from 'react-router'
import { FeaturedSongsPreview } from './FeaturedSongsPreview'

export default function Home() {
  const navigate = useNavigate()
  const overlappingHeight = 250
  return (
    <>
      <div className="relative flex min-h-[800px] w-full flex-col text-white">
        <div className="bg-purple-primary flex flex-col items-center p-8 text-center pt-24">
          <h1 className="text-responsive-xxl font-bold">loophesia for MIDI Keyboards</h1>
          <Sizer height={8} />
          <h3 className="text-responsive-xl hidden sm:block">
            Open Source MIDI Keyboard Practice App
          </h3>
          <Sizer height={32} />
          <div
            className="grid w-full justify-center gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min-content, 180px))' }}
          >
            <UploadMidi
              onUpload={(id) => navigate(`/play?id=${id}&source=upload`)}
              className="flex items-center justify-center rounded-[15px] border border-white/30 bg-white/20 px-4 py-2 font-bold text-white backdrop-blur-sm transition hover:bg-white/30"
            />
            <Link to={'/songs'}>
              <Button className="border border-white/30 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                Learn a song
              </Button>
            </Link>
            <Link to={'/freeplay'}>
              <Button className="border border-white/30 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                Free play
              </Button>
            </Link>
          </div>
          <Sizer height={overlappingHeight} />
        </div>
        <FeaturedSongsPreview marginTop={-overlappingHeight} />
        <Sizer height={16} />
      </div>
    </>
  )
}

function Button({
  children,
  style,
  className,
}: {
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <button
      className={className}
      style={{
        transition: 'background-color 150ms',
        cursor: 'pointer',
        fontSize: 'clamp(0.875rem, 0.875rem + 0.5vw, 1.2rem)',
        padding: '10px 16px',
        borderRadius: 15,
        fontWeight: 700,
        minWidth: 'max-content',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </button>
  )
}
