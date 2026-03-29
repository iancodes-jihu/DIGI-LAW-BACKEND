import {
  CheckCircle, AlertTriangle, XCircle, Clock,
  Shield, Wand2, ChevronRight, User, Users
} from 'lucide-react'

const feedData = [
  {
    id: 1,
    type: 'rule',
    text: '"Dasar lu semua bajingan, mau saya hajar kalian satu-satu!"',
    time: '2 menit lalu',
    result: { status: 'danger', label: 'Ancaman Langsung', confidence: 0.97 },
    details: 'Target: Kelompok · Nada Menyerang: Ya · Ancaman: langsung',
    targetType: 'group',
  },
  {
    id: 2,
    type: 'normalize',
    text: '"gua ga ngerti knapa dia males bgt ngerjain tugas ini"',
    time: '18 menit lalu',
    result: { status: 'clean', label: 'Teks Dinormalisasi', confidence: 1.0 },
    details: 'Saya tidak mengerti kenapa dia malas sekali mengerjakan tugas ini',
    targetType: null,
  },
  {
    id: 3,
    type: 'rule',
    text: '"Semua orang dari daerah X memang tidak bisa dipercaya."',
    time: '45 menit lalu',
    result: { status: 'warning', label: 'Ujaran Diskriminatif', confidence: 0.81 },
    details: 'Target: Kelompok · Nada Menyerang: Ya · Ancaman: tidak langsung',
    targetType: 'group',
  },
  {
    id: 4,
    type: 'rule',
    text: '"UU ITE Pasal 27 ayat 3 mengatur tentang pencemaran nama baik secara digital."',
    time: '1 jam lalu',
    result: { status: 'clean', label: 'Tidak Berbahaya', confidence: 0.99 },
    details: 'Target: Tidak ada · Nada Menyerang: Tidak · Ancaman: Tidak ada',
    targetType: null,
  },
  {
    id: 5,
    type: 'normalize',
    text: '"lu udah tau blm ttg kasus yg lg rame bgt skrg di medsos?"',
    time: '2 jam lalu',
    result: { status: 'clean', label: 'Teks Dinormalisasi', confidence: 1.0 },
    details: 'Kamu sudah tahu belum tentang kasus yang sedang ramai sekali sekarang di media sosial?',
    targetType: null,
  },
]

const statusConfig = {
  danger: { Icon: XCircle, color: 'text-[#f85149]', bg: 'bg-[#ff000010]', border: 'border-[#da3633]', hoverBorder: 'hover:border-[#f85149]' },
  warning: { Icon: AlertTriangle, color: 'text-[#d29922]', bg: 'bg-[#d2992210]', border: 'border-[#9e6a03]', hoverBorder: 'hover:border-[#d29922]' },
  clean: { Icon: CheckCircle, color: 'text-[#3fb950]', bg: 'bg-[#3fb95010]', border: 'border-[#238636]', hoverBorder: 'hover:border-[#3fb950]' },
}

function FeedItem({ item }) {
  const cfg = statusConfig[item.result.status]
  const StatusIcon = cfg.Icon

  return (
    <div className={`border rounded-xl overflow-hidden ${cfg.border} ${cfg.hoverBorder} hover:brightness-110 transition-all cursor-pointer`}>
      <div className="p-3 sm:p-4 bg-[var(--bg-secondary)]">
        {/* Top Row */}
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${cfg.bg}`}>
            <StatusIcon size={16} className={cfg.color} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {/* Type badge */}
              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium border" style={{
                color: item.type === 'rule' ? 'var(--accent)' : 'var(--success)',
                background: 'var(--bg-tertiary)',
                borderColor: item.type === 'rule' ? 'var(--accent)' : 'var(--success)'
              }}>
                {item.type === 'rule' ? 'Deteksi' : 'Normalisasi'}
              </span>

              {/* Status */}
              <span className={`text-[10px] font-semibold ${cfg.color}`}>
                {item.result.label}
              </span>

              {/* Confidence */}
              <span className="text-[10px] text-[var(--text-secondary)] ml-auto flex items-center gap-1">
                <Clock size={10} />
                {item.time}
              </span>
            </div>

            {/* Text */}
            <p className="text-sm text-[var(--text-primary)] font-medium leading-snug mb-2 line-clamp-2">
              {item.text}
            </p>

            {/* Details */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
              <p className="text-[11px] text-[var(--text-secondary)] flex-1 min-w-0 truncate">{item.details}</p>

              <div className="flex items-center gap-2">
                {item.targetType && (
                  <span className="flex items-center gap-1 text-[10px] text-[var(--text-secondary)]">
                    {item.targetType === 'group' ? <Users size={11} /> : <User size={11} />}
                    {item.targetType === 'group' ? 'Kelompok' : 'Individu'}
                  </span>
                )}

                {/* Confidence bar */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[var(--text-secondary)]">
                    {(item.result.confidence * 100).toFixed(0)}%
                  </span>
                  <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                    <div
                      className={`h-full rounded-full ${cfg.color.replace('text-', 'bg-')}`}
                      style={{ width: `${item.result.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ChevronRight size={15} className="text-[var(--text-secondary)] shrink-0 mt-1" />
        </div>
      </div>
    </div>
  )
}

export default function Feed() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[var(--text-primary)] font-semibold text-sm">Riwayat Analisis</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs transition-colors" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-primary)', color: 'var(--text-primary)' }}>
            <Shield size={13} style={{ color: 'var(--text-secondary)' }} />
            Filter
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {feedData.map((item) => (
          <FeedItem key={item.id} item={item} />
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-xs rounded-lg"
        style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)' }}
        onMouseEnter={(e) => e.target.style.background = 'var(--bg-tertiary)'}
        onMouseLeave={(e) => e.target.style.background = 'var(--bg-secondary)'}
      >
        Muat lebih banyak...
      </button>
    </div>
  )
}
