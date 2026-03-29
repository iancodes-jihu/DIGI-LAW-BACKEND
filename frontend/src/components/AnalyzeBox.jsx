import { useState, useRef, useEffect } from 'react'
import {
    Send, Shield, Wand2, ChevronDown,
    Loader2, CheckCircle, AlertTriangle, XCircle, Copy
} from 'lucide-react'

const modes = [
    { id: 'rule', label: 'Deteksi Ujaran', icon: Shield, color: 'text-[#f85149]' },
    { id: 'normalize', label: 'Normalisasi Teks', icon: Wand2, color: 'text-[#3fb950]' },
]

function ResultCard({ result, mode }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(result, null, 2))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (mode === 'normalize') {
        return (
            <div className="mt-4 w-full rounded-lg overflow-hidden" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-primary)' }}>
                <div className="flex items-center justify-between px-4 py-2 border-b" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
                    <div className="flex items-center gap-2">
                        <CheckCircle size={14} style={{ color: '#3fb950' }} />
                        <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>Hasil Normalisasi</span>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                    >
                        <Copy size={12} />
                        {copied ? 'Disalin!' : 'Salin'}
                    </button>
                </div>

                <div className="p-4">
                    <p className="text-sm leading-relaxed break-words" style={{ color: 'var(--text-primary)' }}>
                        {result.normalized_text || result}
                    </p>
                </div>
            </div>
        )
    }

    const { has_threat, has_attack_tone, confidence, target_type, attack_type, threat_type, has_target } = result

    const severity = has_threat ? 'danger' : has_attack_tone ? 'warning' : 'safe'
    const severityConfig = {
        danger: { icon: XCircle, color: 'text-[#f85149]', bg: 'bg-[#ff000015]', border: 'border-[#f8514940]', label: 'Berbahaya' },
        warning: { icon: AlertTriangle, color: 'text-[#d29922]', bg: 'bg-[#d2992215]', border: 'border-[#d2992240]', label: 'Perlu Perhatian' },
        safe: { icon: CheckCircle, color: 'text-[#3fb950]', bg: 'bg-[#3fb95015]', border: 'border-[#3fb95040]', label: 'Aman' },
    }[severity]

    const Icon = severityConfig.icon

    return (
        <div className={`mt-4 w-full border rounded-lg overflow-hidden ${severityConfig.border}`}>
            <div className={`flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b ${severityConfig.border} ${severityConfig.bg}`}>
                <div className="flex items-center gap-2">
                    <Icon size={15} className={severityConfig.color} />
                    <span className={`text-sm font-semibold ${severityConfig.color}`}>
                        {severityConfig.label}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-[11px]">
                    <span style={{ color: 'var(--text-secondary)' }}>
                        Kepercayaan:
                        <span style={{ color: 'var(--text-primary)' }} className="font-medium ml-1">
                            {((confidence || 0) * 100).toFixed(1)}%
                        </span>
                    </span>

                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                    >
                        <Copy size={12} />
                        {copied ? 'Disalin!' : 'Salin'}
                    </button>
                </div>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3" style={{ background: 'var(--bg-primary)' }}>
                <InfoBlock label="Target" value={has_target ? (target_type || '—') : 'Tidak ada'} />
                <InfoBlock label="Nada Menyerang" value={has_attack_tone ? 'Ya' : 'Tidak'} highlight={has_attack_tone} />
                <InfoBlock label="Jenis Serangan" value={attack_type?.length ? attack_type.join(', ') : '—'} />
                <InfoBlock label="Ancaman" value={threat_type?.length ? threat_type.join(', ') : '—'} danger={has_threat} />
            </div>

            <details style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-primary)' }} className="border-t">
                <summary className="px-4 py-2 text-[11px] cursor-pointer" style={{ color: 'var(--text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                    Lihat JSON mentah
                </summary>

                <pre className="px-4 pb-4 text-[11px] text-[#79c0ff] font-mono overflow-x-auto">
{JSON.stringify(result, null, 2)}
                </pre>
            </details>
        </div>
    )
}

function InfoBlock({ label, value, highlight, danger }) {
    return (
        <div className="rounded-md p-3" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
            <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
                {label}
            </p>

            <p className="text-xs font-medium capitalize" style={{
                color: danger ? '#f85149' : highlight ? '#d29922' : 'var(--text-primary)'
            }}>
                {value}
            </p>
        </div>
    )
}

export default function AnalyzeBox() {
    // Debug CSS variables
    useEffect(() => {
        console.log('CSS Variables:');
        console.log('--bg-tertiary:', getComputedStyle(document.documentElement).getPropertyValue('--bg-tertiary'));
        console.log('--bg-primary:', getComputedStyle(document.documentElement).getPropertyValue('--bg-primary'));
        console.log('--text-primary:', getComputedStyle(document.documentElement).getPropertyValue('--text-primary'));
    }, []);
    const [text, setText] = useState('')
    const [mode, setMode] = useState('rule')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    const [showModeMenu, setShowModeMenu] = useState(false)

    const menuRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowModeMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const activeMode = modes.find((m) => m.id === mode)
    const ModeIcon = activeMode.icon

    const handleAnalyze = async (overrideMode) => {
        if (!text.trim()) return

        const effectiveMode = overrideMode || mode

        setLoading(true)
        setResult(null)
        setError(null)

        try {
            const res = await fetch(`/api/${effectiveMode}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            })

            if (!res.ok) {
                const errData = await res.json()
                throw new Error(errData.error || `HTTP ${res.status}`)
            }

            const data = await res.json()
            setResult(data)
            setMode(effectiveMode)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            handleAnalyze()
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto rounded-xl p-4 sm:p-5" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>

            <div className="relative">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Masukkan teks untuk dianalisis... (Ctrl+Enter untuk kirim)"
                    rows={4}
                    className="w-full min-h-[110px] rounded-lg px-4 py-3 text-sm outline-none resize-none focus:border-[var(--accent)]"
                    style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}
                />

                <div className="absolute bottom-2.5 right-2.5 text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                    {text.length}/2000
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-3 w-full">

                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setShowModeMenu((v) => !v)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs"
                        style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)' }}
                        onMouseEnter={(e) => e.target.style.background = 'var(--bg-tertiary)'}
                        onMouseLeave={(e) => e.target.style.background = 'var(--bg-secondary)'}
                    >
                        <ModeIcon size={13} className={activeMode.color} />
                        <span>{activeMode.label}</span>
                        <ChevronDown size={12} style={{ color: 'var(--text-secondary)' }} />
                    </button>

                    {showModeMenu && (
                        <div className="absolute top-full mt-1 left-0 z-10 rounded-lg shadow-xl overflow-hidden w-44" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
                            {modes.map((m) => {
                                const MIcon = m.icon
                                return (
                                    <button
                                        key={m.id}
                                        onClick={() => { setMode(m.id); setShowModeMenu(false) }}
                                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left`}
                                        style={{ color: mode === m.id ? 'var(--accent)' : 'var(--text-primary)' }}
                                    >
                                        <MIcon size={13} className={m.color} />
                                        {m.label}
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </div>

                <button
                    onClick={() => handleAnalyze('rule')}
                    disabled={loading}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs disabled:opacity-40"
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)' }}
                    onMouseEnter={(e) => e.target.style.background = 'var(--bg-secondary)'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--bg-tertiary)'}
                >
                    <Shield size={13} style={{ color: 'var(--text-primary)' }} />
                    Deteksi
                </button>

                <button
                    onClick={() => handleAnalyze('normalize')}
                    disabled={loading}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs disabled:opacity-40"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)' }}
                    onMouseEnter={(e) => e.target.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--bg-secondary)'}
                >
                    <Wand2 size={13} style={{ color: 'var(--text-primary)' }} />
                    Normalisasi
                </button>

                <button
                    onClick={() => handleAnalyze()}
                    disabled={!text.trim() || loading}
                    className="sm:ml-auto w-full sm:w-auto flex justify-center items-center gap-1.5 px-4 py-1.5 rounded-md border text-xs font-medium disabled:opacity-40"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)' }}
                    onMouseEnter={(e) => e.target.style.background = 'var(--bg-tertiary)'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--bg-secondary)'}
                >
                    {loading ? (
                        <Loader2 size={13} className="animate-spin" />
                    ) : (
                        <Send size={13} />
                    )}
                    {loading ? 'Memproses...' : 'Kirim'}
                </button>

            </div>

            {error && (
                <div className="mt-3 flex items-center gap-2 bg-[#ff000010] border border-[#f8514940] rounded-lg px-3 py-2.5 text-xs text-[#f85149]">
                    <XCircle size={14} />
                    {error}
                </div>
            )}

            {result && <ResultCard result={result} mode={mode} />}
        </div>
    )
}