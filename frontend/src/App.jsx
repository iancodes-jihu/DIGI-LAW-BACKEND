import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import RightPanel from './components/RightPanel'
import AnalyzeBox from './components/AnalyzeBox'
import Feed from './components/Feed'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      {/* Top Navbar */}
      <Navbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />

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
                <h1 className="text-lg sm:text-xl font-semibold text-[#e6edf3]">Beranda</h1>
                <p className="text-xs sm:text-sm text-[#7d8590] mt-0.5">
                  Analisis teks hukum menggunakan AI · DigiLaw Backend
                </p>
              </div>

              {/* Analyze Box */}
              <AnalyzeBox />

              {/* Feed Divider */}
              <div className="flex items-center gap-3 my-5 sm:my-6">
                <div className="flex-1 border-t border-[#30363d]" />
                <span className="text-[#7d8590] text-xs whitespace-nowrap">Aktivitas Terbaru</span>
                <div className="flex-1 border-t border-[#30363d]" />
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
