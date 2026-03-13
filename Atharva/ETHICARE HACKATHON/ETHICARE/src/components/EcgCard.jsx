import React, { useRef, useEffect } from 'react'

// Animated engine throughput waveform on canvas
export default function EcgCard() {
    const canvasRef = useRef(null)
    const animRef = useRef(null)
    const offsetRef = useRef(0)
    const [hitRate, setHitRate] = React.useState(84)

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch('/api/cache_metrics')
                if (res.ok) {
                    const data = await res.json()
                    setHitRate(Math.round(data.cache_hit_rate * 100))
                }
            } catch (e) {
                console.error('Failed to fetch metrics', e)
            }
        }

        fetchMetrics()
        const interval = setInterval(fetchMetrics, 5000)

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        const W = canvas.width
        const H = canvas.height
        const midY = H / 2

        // Waveform shape points (normalized 0-1)
        const shape = [
            [0.00, 0.00], [0.10, 0.00], [0.15, -0.20], [0.20, 0.30],
            [0.25, -0.60], [0.30, 0.80], [0.35, -0.40], [0.40, 0.10],
            [0.45, 0.00], [0.55, 0.00], [0.60, 0.40], [0.65, 0.60],
            [0.70, 0.30], [0.75, 0.00], [0.85, 0.00], [1.00, 0.00],
        ]

        function getY(x) {
            for (let i = 1; i < shape.length; i++) {
                const [x0, y0] = shape[i - 1]
                const [x1, y1] = shape[i]
                if (x >= x0 && x <= x1) {
                    const t = (x - x0) / (x1 - x0)
                    return y0 + (y1 - y0) * t
                }
            }
            return 0
        }

        function draw() {
            ctx.clearRect(0, 0, W, H)

            // Draw faint grid
            ctx.strokeStyle = 'rgba(59,130,246,0.1)'
            ctx.lineWidth = 0.5
            for (let x = 0; x < W; x += 30) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
            }
            for (let y = 0; y < H; y += 15) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
            }

            // Draw line
            const period = W
            ctx.beginPath()
            ctx.strokeStyle = '#3b82f6'
            ctx.lineWidth = 2.5
            ctx.shadowColor = '#3b82f6'
            ctx.shadowBlur = 8
            ctx.lineJoin = 'round'
            ctx.lineCap = 'round'

            for (let px = 0; px <= W; px++) {
                const normX = ((px + offsetRef.current) % period) / period
                const normY = getY(normX)
                const py = midY - normY * (H * 0.35)
                if (px === 0) ctx.moveTo(px, py)
                else ctx.lineTo(px, py)
            }
            ctx.stroke()
            ctx.shadowBlur = 0

            offsetRef.current = (offsetRef.current + 2) % period
            animRef.current = requestAnimationFrame(draw)
        }

        draw()
        return () => {
            cancelAnimationFrame(animRef.current)
            clearInterval(interval)
        }
    }, [])

    return (
        <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-7 shadow-2xl shadow-blue-900/5 border border-white/80 transition-all duration-500 hover:shadow-blue-900/10 w-full group">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Efficiency Profile</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-4xl font-black text-slate-900 tracking-tighter">{hitRate}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">% Hit Rate</span>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-xl border border-blue-100/50 bg-blue-50/30">
                <canvas ref={canvasRef} width={300} height={80} className="w-full h-20" />
            </div>
            <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Live telemetry</span>
            </div>
        </div>
    )
}
