import { Github, Logo } from '@/icons'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

export default function AppBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={clsx(
        'sticky top-0 z-50 flex h-28 w-full flex-col justify-center transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 dark:bg-black/95 dark:border-gray-800'
          : 'bg-transparent',
      )}
    >
      <div className="relative mx-auto flex w-full max-w-(--breakpoint-lg) items-center justify-between px-6">
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-8">
          <Link
            to={'/'}
            className="flex items-center gap-8 text-gray-900 transition hover:opacity-80 dark:text-white"
          >
            <Logo height={192} width={192} className="h-28 w-28 sm:h-40 sm:w-40" />
            <span className="text-6xl font-bold tracking-tighter sm:text-7xl">loophesia</span>
          </Link>
        </div>

        <div className="flex flex-1 justify-start">
          {/* Left side empty or for future menu */}
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="https://github.com/ardakocaman100101/loophesia"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 transition hover:text-gray-900 dark:hover:text-white"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </nav>
  )
}
