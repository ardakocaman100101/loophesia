import type { LucideProps } from '@/icons'
import { cn } from '@/utils'

export default function Logo(props: LucideProps) {
  const { width, height, className, style } = props
  return (
    <div className="overflow-hidden flex items-center justify-center p-0" style={{ width, height }}>
      <img
        src="/images/logo-eye.jpg"
        width={width ?? 192}
        height={height ?? 192}
        className={cn(className, 'object-contain')}
        style={{ ...style, imageRendering: 'auto' }}
        alt="Loophesia Logo"
      />
    </div>
  )
}
