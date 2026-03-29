import { Menu, Search, Bell, Plus, Command, Sun, Moon } from 'lucide-react'

export default function Navbar({ onToggleSidebar, theme, toggleTheme }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 border-b" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
            <button
                onClick={onToggleSidebar}
                className="p-1.5 rounded-md border border-[var(--border-secondary)] hover:border-[var(--accent)] transition-colors shrink-0"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Toggle sidebar"
            >
                <Menu size={18} />
            </button>

            <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[var(--text-primary)] font-semibold text-sm">LAWNET</span>
            </div>

            <div className="hidden md:flex flex-1 max-w-sm lg:ml-[126px]">
                <div className="w-full flex items-center gap-2 rounded-md px-3 py-1.5 hover:border-[var(--accent)] transition-colors cursor-text" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-primary)', color: 'var(--text-secondary)' }}>
                    <Search size={13} />
                    <span className="text-xs flex-1">Cari analisis...</span>
                    <div className="flex items-center gap-0.5 text-[10px] border border-[var(--border-primary)] rounded px-1 py-0.5">
                        <Command size={10} />
                        <span>K</span>
                    </div>
                </div>
            </div>

            <div className="ml-auto flex items-center gap-1">
                <button className="md:hidden p-1.5 rounded-md"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)' }}
                    onMouseEnter={(e) => e.target.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--bg-secondary)'}
                >
                    <Search size={17} />
                </button>
                <button
                    className="p-1.5 rounded-md relative"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)' }}
                    onMouseEnter={(e) => e.target.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--bg-secondary)'}
                    aria-label="Toggle notifications"
                >
                    <Bell size={17} />
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)', borderColor: 'var(--bg-secondary)' }} />
                </button>
                <button
                    onClick={toggleTheme}
                    className="p-1.5 rounded-md"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)' }}
                    onMouseEnter={(e) => e.target.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--bg-secondary)'}
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
                </button>
                <button className="flex items-center gap-1 px-2 py-1 text-xs rounded-md border font-medium"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)' }}
                    onMouseEnter={(e) => e.target.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--bg-secondary)'}
                >
                    <Plus size={14} />
                    <span className="hidden sm:inline">Baru</span>
                </button>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1f6feb] to-[#388bfd] flex items-center justify-center text-white text-xs font-bold ml-0.5">
                    DL
                </div>
            </div>
        </header>
    )
}
