import { Menu, Search, Bell, Plus, Command } from 'lucide-react'

export default function Navbar({ onToggleSidebar }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 bg-[#161b22] border-b border-[#30363d]">
            <button
                onClick={onToggleSidebar}
                className="p-1.5 rounded-md text-[#7d8590] hover:text-[#e6edf3] border border-[#3d444d] hover:border-[#4a5568] hover:bg-[#21262d] transition-colors shrink-0"
                aria-label="Toggle sidebar"
            >
                <Menu size={18} />
            </button>

            <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[#e6edf3] font-semibold text-sm">LAWNET</span>
            </div>

            <div className="hidden md:flex flex-1 max-w-sm lg:ml-[126px]">
                <div className="w-full flex items-center gap-2 bg-[#0d1117] border border-[#4a5568] rounded-md px-3 py-1.5 text-[#7d8590] hover:border-[#58a6ff] transition-colors cursor-text">
                    <Search size={13} />
                    <span className="text-xs flex-1">Cari analisis...</span>
                    <div className="flex items-center gap-0.5 text-[10px] border border-[#4a5568] rounded px-1 py-0.5">
                        <Command size={10} />
                        <span>K</span>
                    </div>
                </div>
            </div>

            <div className="ml-auto flex items-center gap-1">
                <button className="md:hidden p-1.5 rounded-md text-[#7d8590] hover:text-[#e6edf3] border border-[#3d444d] hover:border-[#4a5568] hover:bg-[#21262d] transition-colors">
                    <Search size={17} />
                </button>
                <button className="p-1.5 rounded-md text-[#7d8590] hover:text-[#e6edf3] border border-[#3d444d] hover:border-[#4a5568] hover:bg-[#21262d] transition-colors relative">
                    <Bell size={17} />
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#1f6feb] rounded-full border border-[#161b22]" />
                </button>
                <button className="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-[#238636] border border-[#2ea043] text-white hover:bg-[#2ea043] hover:border-[#3fb950] transition-colors font-medium">
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
