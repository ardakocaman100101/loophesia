import { MarketingFooter } from './MarketingFooter'
import AppBar from './AppBar'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <AppBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  )
}
