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
      <div className="p-3 sm:p-4 bg-[#161b22]">
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
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                item.type === 'rule'
                  ? 'text-[#58a6ff] bg-[#1f2d3d] border-[#1f6feb]/40'
                  : 'text-[#3fb950] bg-[#1f2414] border-[#3fb950]/30'
              }`}>
                {item.type === 'rule' ? 'Deteksi' : 'Normalisasi'}
              </span>

              {/* Status */}
              <span className={`text-[10px] font-semibold ${cfg.color}`}>
                {item.result.label}
              </span>

              {/* Confidence */}
              <span className="text-[10px] text-[#7d8590] ml-auto flex items-center gap-1">
                <Clock size={10} />
                {item.time}
              </span>
            </div>

            {/* Text */}
            <p className="text-sm text-[#e6edf3] font-medium leading-snug mb-2 line-clamp-2">
              {item.text}
            </p>

            {/* Details */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
              <p className="text-[11px] text-[#7d8590] flex-1 min-w-0 truncate">{item.details}</p>

              <div className="flex items-center gap-2">
                {item.targetType && (
                  <span className="flex items-center gap-1 text-[10px] text-[#7d8590]">
                    {item.targetType === 'group' ? <Users size={11} /> : <User size={11} />}
                    {item.targetType === 'group' ? 'Kelompok' : 'Individu'}
                  </span>
                )}

                {/* Confidence bar */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#7d8590]">
                    {(item.result.confidence * 100).toFixed(0)}%
                  </span>
                  <div className="w-16 h-1.5 bg-[#21262d] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${cfg.color.replace('text-', 'bg-')}`}
                      style={{ width: `${item.result.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ChevronRight size={15} className="text-[#7d8590] shrink-0 mt-1" />
        </div>
      </div>
    </div>
  )
}

export default function Feed() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[#e6edf3] font-semibold text-sm">Riwayat Analisis</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#21262d] border border-[#4a5568] text-xs text-[#e6edf3] hover:bg-[#30363d] hover:border-[#58a6ff] transition-colors">
            <Shield size={13} className="text-[#7d8590]" />
            Filter
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {feedData.map((item) => (
          <FeedItem key={item.id} item={item} />
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-xs text-[#58a6ff] hover:text-white transition-colors border border-[#388bfd] hover:border-[#58a6ff] hover:bg-[#1f2d3d] rounded-lg">
        Muat lebih banyak...
      </button>
    </div>
  )
}
