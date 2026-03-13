import React, { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackgroundBlobs from '../components/BackgroundBlobs'

const API_BASE = '/api'

export default function Upload() {
    const navigate = useNavigate()
    const inputRef = useRef(null)
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const onBrowse = () => inputRef.current?.click()

    const onFile = (f) => {
        setError('')
        setFile(f || null)
    }

    const onDrop = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        const dropped = e.dataTransfer?.files?.[0]
        if (dropped) onFile(dropped)
    }, [])

    const onDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const onUpload = async () => {
        if (!file) return
        setLoading(true)
        setError('')

        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch(`${API_BASE}/upload_file`, {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) {
                const errData = await res.json()
                throw new Error(errData.detail || 'Failed to analyze workload file')
            }

            const data = await res.json()

            // Expected response: { status: 'success', workload_id, filename, predicted_policy, ... }
            sessionStorage.setItem('cachex:lastPrediction', JSON.stringify(data))

            // Success navigation
            navigate('/dashboard')
        } catch (err) {
            setError(err?.message || 'Something went wrong during ingestion')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen bg-[#e0f7ff] font-sans overflow-x-hidden pt-32 pb-20">
            <BackgroundBlobs />
            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <div className="space-y-4 mb-12 animate-slide-up">
                    <div className="w-12 h-1.5 bg-blue-600 rounded-full"></div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ingestion Engine</p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#111827]">
                        Workload <span className="text-blue-600">Analysis</span>
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
                        Upload access traces or configuration files. Our AI engine will parse the workload patterns
                        to determine the mathematically optimal cache policy.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="lg:col-span-8">
                        <div
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            className="h-full rounded-[3rem] border-2 border-dashed border-blue-200 bg-white/40 backdrop-blur-xl p-10 md:p-16 flex flex-col items-center justify-center text-center gap-8 group hover:border-blue-400 transition-all duration-500 shadow-2xl shadow-blue-900/5"
                        >
                            <div className="w-20 h-20 rounded-[2rem] bg-slate-900 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current stroke-2">
                                    <path d="M12 16V4" />
                                    <path d="M7 9l5-5 5 5" />
                                    <path d="M20 16.5a4.5 4.5 0 0 1-4.5 4.5h-7A4.5 4.5 0 0 1 4 16.5" />
                                </svg>
                            </div>

                            <div className="space-y-2">
                                <p className="text-2xl font-black text-slate-900 tracking-tight">
                                    Drop telemetry source here
                                </p>
                                <p className="text-slate-500 font-medium">
                                    or{' '}
                                    <button type="button" onClick={onBrowse} className="text-blue-600 font-black hover:underline underline-offset-4">
                                        browse filesystem
                                    </button>
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-3">
                                {['.CSV Traces', '.JSON Config', '.LOG Files'].map((t) => (
                                    <span
                                        key={t}
                                        className="px-4 py-2 rounded-xl bg-white/60 border border-white text-slate-600 text-[10px] font-black uppercase tracking-widest shadow-sm"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <input
                                ref={inputRef}
                                type="file"
                                className="hidden"
                                onChange={(e) => onFile(e.target.files?.[0] || null)}
                            />

                            <div className="w-full max-w-sm mt-4">
                                <div className="rounded-[1.5rem] bg-blue-50/50 border border-blue-100/50 p-4 text-center">
                                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Target Object</p>
                                    <p className="text-sm font-black text-slate-900 truncate">
                                        {file ? file.name : 'Ready for ingestion'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="flex-1 rounded-[2.5rem] bg-slate-900 text-white p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                            <p className="relative text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-6">Processing Pipeline</p>
                            <h2 className="relative text-2xl font-black tracking-tight mb-4">Neural Mapping</h2>
                            <p className="relative text-white/60 text-sm font-medium leading-relaxed mb-8">
                                Submitting this file will trigger a multi-stage feature extraction process to classify temporal and spatial locality.
                            </p>

                            {error && (
                                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-6">
                                    {error}
                                </div>
                            )}

                            <button
                                type="button"
                                disabled={!file || loading}
                                onClick={onUpload}
                                className="relative w-full rounded-[1.25rem] bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                {loading ? 'Analyzing...' : 'Ingest & Optimize'}
                            </button>
                        </div>

                        <div className="rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white p-8 shadow-xl">
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                System Privacy
                            </h3>
                            <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                All workload data is processed locally on our secure edge nodes. No customer data is stored beyond the session lifecycle.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

