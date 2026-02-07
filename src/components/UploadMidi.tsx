import { addUploadedSong } from '@/features/persist/persistence'
import { Upload } from 'lucide-react'
import { useRef, useState } from 'react'

export function UploadMidi({
    onUpload,
    className,
}: {
    onUpload?: (id: string) => void
    className?: string
}) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setIsUploading(true)
            const id = await addUploadedSong(file)
            if (onUpload) {
                onUpload(id)
            }
        } catch (error) {
            console.error('Failed to upload MIDI:', error)
            alert('Failed to upload MIDI file')
        } finally {
            setIsUploading(false)
            if (inputRef.current) {
                inputRef.current.value = ''
            }
        }
    }

    return (
        <>
            <input
                type="file"
                accept=".mid,.midi,audio/midi,audio/x-midi"
                ref={inputRef}
                className="hidden"
                onChange={handleFileChange}
            />
            <button
                onClick={() => inputRef.current?.click()}
                disabled={isUploading}
                className={className}
            >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? 'Uploading...' : 'Upload MIDI'}
            </button>
        </>
    )
}
