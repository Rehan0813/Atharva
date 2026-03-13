import React, { useEffect, useRef } from 'react'

const bars = [
    { h: 45, color: '#93c5fd' },
    { h: 65, color: '#60a5fa' },
    { h: 35, color: '#3b82f6' },
    { h: 80, color: '#1d4ed8' },
    { h: 55, color: '#60a5fa' },
    { h: 70, color: '#3b82f6' },
    { h: 40, color: '#93c5fd' },
    { h: 60, color: '#1e40af' },
]

export default function BloodPressureCard() {
    const barsRef = useRef([])
    const [avgLatency, setAvgLatency] = React.useState(0.42)

    useEffect(() => {
        barsRef.current.forEach((el, i) => {
            if (el) {
                el.style.animationDelay = `${i * 0.05}s`
            }
        })

        const fetchMetrics = async () => {
            try {
                const res = await fetch('/api/cache_metrics')
                if (res.ok) {
                    const data = await res.json()
                    setAvgLatency(data.latency)
                }
            } catch (e) {
                console.error('Failed to fetch metrics', e)
            }
        }

        fetchMetrics()
        const interval = setInterval(fetchMetrics, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-7 shadow-2xl shadow-indigo-900/5 border border-white/80 transition-all duration-500 hover:shadow-indigo-900/10 w-full group">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Latency Distribution</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-4xl font-black text-slate-900 tracking-tighter">{avgLatency}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">ms (avg)</span>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                        <path d="M12 2v20M2 12h20" />
                    </svg>
                </div>
            </div>

            {/* Vertical bar chart for recent latency samples */}
            <div className="mt-6 flex items-end gap-2 h-20 px-1">
                {bars.map((bar, i) => (
                    <div
                        key={i}
                        ref={(el) => (barsRef.current[i] = el)}
                        className="flex-1 rounded-full animate-bar-grow"
                        style={{
                            height: `${bar.h}%`,
                            backgroundColor: bar.color,
                            transformOrigin: 'bottom',
                        }}
                    />
                ))}
            </div>

            {/* Labels */}
            <div className="flex justify-between mt-4">
                {['T-7', 'T-6', 'T-5', 'T-4', 'T-3', 'T-2', 'T-1', 'NOW'].map((d, i) => (
                    <span key={i} className="text-[8px] text-slate-400 font-black uppercase tracking-tighter flex-1 text-center">{d}</span>
                ))}
            </div>
        </div>
    )
}
