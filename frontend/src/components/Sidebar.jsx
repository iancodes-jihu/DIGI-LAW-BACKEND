const recentAnalyses = [
    { id: 1, title: 'Dasar hukum pasal 27', desc: 'Teks sesuai regulasi UU ITE yang berlaku.', status: 'clean', time: '2 menit lalu' },
    { id: 2, title: 'Kamu bodoh dan tidak...', desc: 'Terdeteksi ujaran kebencian langsung.', status: 'threat', time: '15 menit lalu' },
    { id: 3, title: 'lu mau dihajar apa...', desc: 'Bahasa informal mengandung ancaman.', status: 'warning', time: '1 jam lalu' },
    { id: 4, title: 'Semua orang dari suku...', desc: 'Indikasi diskriminasi berbasis ras/suku.', status: 'threat', time: '3 jam lalu' },
    { id: 5, title: 'Regulasi terkait UU ITE', desc: 'Normalisasi berhasil, teks sudah formal.', status: 'clean', time: '5 jam lalu' },
    { id: 6, title: 'gak ngerti hukum sama...', desc: 'Teks diformat ulang ke bahasa baku.', status: 'clean', time: '1 hari lalu' },
    { id: 7, title: 'Tindakan tersebut melang...', desc: 'Perlu tinjauan lebih lanjut oleh ahli.', status: 'warning', time: '2 hari lalu' },
]

const dotColor = {
    clean: 'bg-[#3fb950]',
    threat: 'bg-[#f85149]',
    warning: 'bg-[#d29922]',
}

export default function Sidebar({ isOpen, onClose }) {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 lg:hidden"
                    style={{ background: 'var(--overlay)' }}
                    onClick={onClose}
                />
            )}

            <aside className="
                fixed top-12 left-0 bottom-0 z-40 w-64
                overflow-y-auto transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            " style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
                <div className="px-4 py-5">

                    {/* Header */}
                    <h2 className="text-[var(--text-primary)] text-sm font-semibold mb-4">
                        Analisis Terbaru
                    </h2>

                    {/* List */}
                    <ul className="space-y-4">
                        {recentAnalyses.map((item) => (
                            <li key={item.id}>
                                <button
                                    className="w-full flex items-start gap-3 text-left group hover:opacity-80 transition-opacity border rounded-lg px-3 py-2"
                                    style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-primary)' }}
                                >
                                    <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${dotColor[item.status]}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[var(--text-secondary)] text-[11px] mb-0.5">{item.time}</p>
                                        <p className="text-[var(--text-primary)] text-xs font-semibold truncate leading-snug">{item.title}</p>
                                        <p className="text-[var(--text-secondary)] text-[11px] mt-0.5 leading-snug line-clamp-2">{item.desc}</p>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button className="w-full mt-5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1.5 text-left">
                        Lihat semua →
                    </button>

                    <div className="border-t border-[var(--border-secondary)] my-5" />

                    {/* Stats */}
                    <h2 className="text-[var(--text-primary)] text-sm font-semibold mb-3">
                        Statistik Hari Ini
                    </h2>

                    <div className="space-y-2.5">
                        {[
                            { label: 'Total Analisis', value: '47', dot: 'bg-[var(--accent)]' },
                            { label: 'Terdeteksi Berbahaya', value: '12', dot: 'bg-[var(--danger,#f85149)]' },
                            { label: 'Perlu Perhatian', value: '8', dot: 'bg-[var(--warning,#d29922)]' },
                            { label: 'Aman', value: '27', dot: 'bg-[var(--success)]' },
                        ].map(({ label, value, dot }) => (
                            <div key={label} className="flex items-center gap-2.5">
                                <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                                <span className="text-[var(--text-secondary)] text-xs flex-1">{label}</span>
                                <span className="text-[var(--text-primary)] text-xs font-semibold">{value}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </aside>
        </>
    )
}