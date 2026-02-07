import { Github, Logo, Menu } from '@/icons'
import clsx from 'clsx'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Dropdown } from './Dropdown'

type NavItem = { route: string; label: string }
const navItems: NavItem[] = [
  { route: '/songs', label: 'Learn' },
  { route: '/freeplay', label: 'Free Play' },
]

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
          {navItems.map((nav) => (
            <NavLink to={nav.route} key={nav.label}>
              {nav.label}
            </NavLink>
          ))}
          <a
            href="https://github.com/ardakocaman100101/loophesia"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 transition hover:text-gray-900 dark:hover:text-white"
          >
            <Github size={20} />
          </a>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <SmallWindowNav />
        </div>
      </div>
    </nav>
  )
}

function SmallWindowNav() {
  return (
    <Dropdown
      target={<Menu height={24} width={24} className="block text-gray-900 dark:text-white" />}
    >
      <div className="flex flex-col bg-white/90 p-2 backdrop-blur-xl dark:bg-black/90">
        {navItems.map((nav, i) => (
          <Link
            key={i}
            to={nav.route}
            className="text-gray-900 hover:bg-gray-100 block rounded-md px-4 py-3 text-lg font-medium transition dark:text-white dark:hover:bg-gray-800"
          >
            {nav.label}
          </Link>
        ))}
      </div>
    </Dropdown>
  )
}

function NavLink({ to, children }: PropsWithChildren<{ to: string }>) {
  const currentRoute = useLocation().pathname
  const isActive = currentRoute === to

  return (
    <Link
      to={to}
      className={clsx(
        'text-sm font-medium transition-colors',
        isActive
          ? 'text-purple-600 dark:text-purple-400'
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
      )}
    >
      {children}
    </Link>
  )
}
