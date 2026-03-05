import { BookOpen, Zap, Shield, Info, ExternalLink } from 'lucide-react'

const changelog = [
    {
        time: '1 hari lalu',
        title: 'Model Llama-3.3-70b diperbarui',
        desc: 'Akurasi deteksi ujaran kebencian meningkat 15%.',
        color: 'bg-[#3fb950]',
    },
    {
        time: '3 hari lalu',
        title: 'Endpoint /normalize ditingkatkan',
        desc: 'Kini mendukung teks hingga 2000 karakter per permintaan.',
        color: 'bg-[#58a6ff]',
    },
    {
        time: '1 minggu lalu',
        title: 'Perlindungan prompt injection',
        desc: 'Sistem lebih kebal terhadap manipulasi input berbahaya.',
        color: 'bg-[#d29922]',
    },
    {
        time: '2 minggu lalu',
        title: 'Confidence scoring diperbarui',
        desc: 'Skor kepercayaan kini lebih akurat pada kasus ambigu.',
        color: 'bg-[#bc8cff]',
    },
]

const legalRefs = [
    { label: 'UU ITE Pasal 27', href: '#' },
    { label: 'UU ITE Pasal 28', href: '#' },
    { label: 'KUHP Pasal 310', href: '#' },
    { label: 'KUHP Pasal 156', href: '#' },
]

export default function RightPanel() {
    return (
        <aside className="w-full space-y-4">
            {/* Changelog */}
            <div className="bg-[#161b22] border border-[#4a5568] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Zap size={15} className="text-[#d29922]" />
                    <h3 className="text-[#e6edf3] text-sm font-semibold">Pembaruan Terbaru</h3>
                </div>
                <ul className="space-y-3">
                    {changelog.map((item, i) => (
                        <li key={i} className="flex gap-2.5">
                            <div className="mt-1.5 shrink-0">
                                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                            </div>
                            <div>
                                <p className="text-[10px] text-[#7d8590] mb-0.5">{item.time}</p>
                                <p className="text-xs text-[#e6edf3] font-medium leading-snug">{item.title}</p>
                                <p className="text-[11px] text-[#7d8590] leading-snug mt-0.5">{item.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Legal References */}
            <div className="bg-[#161b22] border border-[#4a5568] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={15} className="text-[#58a6ff]" />
                    <h3 className="text-[#e6edf3] text-sm font-semibold">Referensi Hukum</h3>
                </div>
                <ul className="space-y-1.5">
                    {legalRefs.map((ref) => (
                        <li key={ref.label}>
                            <a
                                href={ref.href}
                                className="flex items-center justify-between text-xs text-[#58a6ff] hover:text-[#79c0ff] border border-[#1f6feb]/50 hover:border-[#388bfd] rounded px-2 py-1 transition-colors group"
                            >
                                {ref.label}
                                <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* API Status */}
            <div className="bg-[#161b22] border border-[#4a5568] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Shield size={15} className="text-[#3fb950]" />
                    <h3 className="text-[#e6edf3] text-sm font-semibold">Status API</h3>
                </div>
                <div className="space-y-2">
                    {[
                        { name: '/status', status: 'Operasional', ok: true },
                        { name: '/normalize', status: 'Operasional', ok: true },
                        { name: '/rule', status: 'Operasional', ok: true },
                    ].map((ep) => (
                        <div key={ep.name} className="flex items-center justify-between">
                            <code className="text-[11px] text-[#7d8590] font-mono">{ep.name}</code>
                            <div className="flex items-center gap-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${ep.ok ? 'bg-[#3fb950]' : 'bg-[#f85149]'}`} />
                                <span className={`text-[10px] ${ep.ok ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                                    {ep.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[#30363d]">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#7d8590]">
                        <Info size={11} />
                        <span>Cerebras llama-3.3-70b · Latency ~800ms</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}
