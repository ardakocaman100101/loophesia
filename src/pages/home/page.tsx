import { Sizer, UploadMidi } from '@/components'
import React from 'react'
import { Link, useNavigate } from 'react-router'
import { FeaturedSongsPreview } from './FeaturedSongsPreview'

export default function Home() {
  const navigate = useNavigate()
  const overlappingHeight = 40
  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col text-white bg-black">
        <div className="flex flex-col items-center p-8 text-center pt-4 bg-linear-to-b from-white via-purple-primary via-purple-primary to-black min-h-[1000px] text-white">
          <h1 className="text-responsive-xxl font-bold text-gray-900">loophesia for MIDI Keyboards</h1>
          <Sizer height={8} />
          <h3 className="text-responsive-xl hidden sm:block text-gray-600">
            Open Source MIDI Keyboard Practice App
          </h3>
          <Sizer height={8} />
          <div
            className="grid w-full justify-center gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min-content, 180px))' }}
          >
            <UploadMidi
              onUpload={(id) => navigate(`/play?id=${id}&source=upload`)}
              className="flex items-center justify-center rounded-[15px] border border-white/30 bg-white/20 px-4 py-[10px] font-bold text-gray-700 backdrop-blur-sm transition hover:bg-white/30 text-[clamp(0.875rem,0.875rem+0.5vw,1.2rem)]"
            />
            <Link to={'/songs'}>
              <Button className="flex items-center justify-center rounded-[15px] border border-white/30 bg-white/20 px-4 py-[10px] font-bold text-gray-700 backdrop-blur-sm transition hover:bg-white/30 text-[clamp(0.875rem,0.875rem+0.5vw,1.2rem)]">
                Learn a song
              </Button>
            </Link>
            <Link to={'/freeplay'}>
              <Button className="flex items-center justify-center rounded-[15px] border border-white/30 bg-white/20 px-4 py-[10px] font-bold text-gray-700 backdrop-blur-sm transition hover:bg-white/30 text-[clamp(0.875rem,0.875rem+0.5vw,1.2rem)]">
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
