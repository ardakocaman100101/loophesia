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
        'sticky top-0 z-50 flex h-16 w-full flex-col justify-center transition-all duration-300',
        scrolled
          ? 'bg-white/70 backdrop-blur-md border-b border-gray-100 dark:bg-black/70 dark:border-gray-800'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex w-full max-w-(--breakpoint-lg) items-center justify-between px-6">
        <Link
          to={'/'}
          className="flex items-center gap-2 text-gray-900 transition hover:opacity-80 dark:text-white"
        >
          <Logo height={28} width={28} />
          <span className="text-xl font-medium tracking-tight">loophesia</span>
        </Link>

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
