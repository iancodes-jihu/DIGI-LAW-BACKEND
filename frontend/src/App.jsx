import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import RightPanel from './components/RightPanel'
import AnalyzeBox from './components/AnalyzeBox'
import Feed from './components/Feed'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    console.log('Theme set to:', theme);
    console.log('--bg-primary:', getComputedStyle(document.documentElement).getPropertyValue('--bg-primary'));
    console.log('--bg-secondary:', getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary'));
    console.log('--text-primary:', getComputedStyle(document.documentElement).getPropertyValue('--text-primary'));
    console.log('data-theme attribute:', document.documentElement.getAttribute('data-theme'));
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      {/* Top Navbar */}
      <Navbar onToggleSidebar={() => setSidebarOpen((v) => !v)} theme={theme} toggleTheme={toggleTheme} />

      {/* Left Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Layout (offset for navbar + sidebar) */}
      <div className="pt-12 lg:pl-64">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-4 lg:px-6 py-5 sm:py-6">
          <div className="flex gap-5 xl:gap-6 items-start">
            {/* Center Content */}
            <main className="flex-1 min-w-0">
              {/* Page Title */}
              <div className="mb-4 sm:mb-5">
                <h1 className="text-lg sm:text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Beranda</h1>
                <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  Analisis teks hukum menggunakan AI · DigiLaw Backend
                </p>
              </div>

              {/* Analyze Box */}
              <AnalyzeBox />

              <div className="flex items-center gap-3 my-5 sm:my-6">
                <div className="flex-1 border-t" style={{ borderColor: 'var(--border-primary)' }} />
                <span className="text-xs whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>Aktivitas Terbaru</span>
                <div className="flex-1 border-t" style={{ borderColor: 'var(--border-primary)' }} />
              </div>

              {/* Feed */}
              <Feed />
            </main>

            {/* Right Panel — hidden on mobile/tablet, visible on xl */}
            <div className="hidden xl:block w-64 shrink-0 sticky top-16">
              <RightPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
