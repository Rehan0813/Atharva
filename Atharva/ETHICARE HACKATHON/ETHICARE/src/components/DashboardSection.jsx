import React, { useEffect, useState } from 'react'
import EcgCard from './EcgCard'
import BloodPressureCard from './BloodPressureCard'

const API_BASE = '/api'

export default function DashboardSection() {
    const [workloadForm, setWorkloadForm] = useState({
        access_frequency: 0.7,
        reuse_distance: 0.2,
        temporal_locality: 0.8,
        spatial_locality: 0.5,
    })

    const [policyResult, setPolicyResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [file, setFile] = useState(null)

    const handleChange = (field, val) => {
        // Strict 0-1 range enforcement
        const numericVal = Math.min(1, Math.max(0, val))
        setWorkloadForm(prev => ({
            ...prev,
            [field]: numericVal
        }))
    }



    useEffect(() => {
        // Sync with upload results
        const stored = sessionStorage.getItem('cachex:lastPrediction')
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                setPolicyResult(parsed)
            } catch (e) {
                console.error('Failed to parse cached prediction', e)
            }
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // 1. Upload Workload Features
            const uploadRes = await fetch(`${API_BASE}/upload_workload`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(workloadForm),
            })

            if (!uploadRes.ok) {
                throw new Error('Failed to upload workload features')
            }

            const { workload_id } = await uploadRes.json()

            // 2. Trigger ML Analysis
            const analyzeRes = await fetch(`${API_BASE}/analyze_workload?workload_id=${workload_id}`, {
                method: 'POST',
            })

            if (!analyzeRes.ok) {
                throw new Error('Failed to get policy prediction from ML model')
            }

            const data = await analyzeRes.json()

            // Store and show result
            setPolicyResult(data)
            sessionStorage.setItem('cachex:lastPrediction', JSON.stringify(data))
        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="solutions" className="pb-12">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                {/* LEFT: Live metric cards */}
                <div className="xl:col-span-4 flex flex-col gap-8 animate-slide-up" style={{ animationDelay: '0.15s' }}>
                    <EcgCard />
                    <BloodPressureCard />
                </div>

                {/* RIGHT: Workload form + policy and history */}
                <div className="xl:col-span-8 flex flex-col gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    {/* Workload configuration & prediction */}
                    <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] shadow-2xl shadow-indigo-900/5 border border-white/60 p-8 md:p-12">
                        <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
                            <div className="flex flex-col gap-2">
                                <div className="w-10 h-1 bg-blue-600 rounded-full"></div>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                                    Policy Orchestration
                                </h2>
                            </div>
                            <div className="flex items-center gap-3">
                                {policyResult && (
                                    <button
                                        onClick={() => {
                                            sessionStorage.removeItem('cachex:lastPrediction')
                                            setPolicyResult(null)
                                        }}
                                        className="px-4 py-2 border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                    >
                                        Clear Analysis
                                    </button>
                                )}
                                <div className="px-4 py-2 bg-slate-900 text-white rounded-xl shadow-xl">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Engine active</span>
                                </div>
                            </div>
                        </div>

                        <form className="grid grid-cols-1 gap-10" onSubmit={handleSubmit}>
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { label: 'Access Frequency', field: 'access_frequency' },
                                        { label: 'Reuse Distance', field: 'reuse_distance' },
                                        { label: 'Temporal Locality', field: 'temporal_locality' },
                                        { label: 'Spatial Locality', field: 'spatial_locality' },
                                    ].map((item) => (
                                        <div key={item.field} className="space-y-2">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                {item.label}
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                className="w-full rounded-2xl border border-white/60 px-4 py-4 text-sm font-bold text-slate-900 bg-white/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-mono"
                                                value={workloadForm[item.field]}
                                                onChange={(e) =>
                                                    handleChange(item.field, parseFloat(e.target.value) || 0)
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className={`transition-all duration-700 ${policyResult ? 'bg-slate-900' : 'bg-slate-800/50'} text-white rounded-[2.5rem] p-8 md:p-10 shadow-3xl relative overflow-hidden group`}>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-blue-600/20 transition-all duration-1000"></div>

                                    <div className="relative flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${policyResult ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></div>
                                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">
                                                {policyResult ? 'Optimization Successful' : 'Awaiting Telemetry'}
                                            </p>
                                        </div>
                                        {policyResult && (
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-lg">
                                                ID: {Math.random().toString(16).slice(2, 8).toUpperCase()}
                                            </span>
                                        )}
                                    </div>

                                    {policyResult ? (
                                        <div className="relative space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-1">
                                                    <p className="text-xs text-white/40 font-black uppercase tracking-widest">Optimized Engine Policy</p>
                                                    <p className="text-4xl md:text-5xl font-black tracking-tighter italic text-white drop-shadow-2xl">
                                                        {policyResult.predicted_policy || '—'}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col md:items-end justify-center">
                                                    <p className="text-xs text-white/40 font-black uppercase tracking-widest mb-1">Model Confidence</p>
                                                    <div className="flex items-baseline gap-2">
                                                        <p className="text-5xl font-black text-emerald-400 tracking-tighter">
                                                            {policyResult.confidence != null
                                                                ? `${(policyResult.confidence * 100).toFixed(0)}`
                                                                : '—'}
                                                        </p>
                                                        <span className="text-xl font-black text-emerald-400/50">%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
                                                {[
                                                    { label: 'Hybrid Ratio', value: policyResult.hybrid_ratio || '70/30' },
                                                    { label: 'Latency Gain', value: '-24.8ms' },
                                                    { label: 'Throughput', value: '+12.4%' },
                                                ].map((stat) => (
                                                    <div key={stat.label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                                        <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                                        <p className="text-sm font-black text-blue-400 font-mono">{stat.value}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {Array.isArray(policyResult.reason) && (
                                                <div className="space-y-3">
                                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Neural Reasoning & Insights</p>
                                                    <div className="grid grid-cols-1 gap-2">
                                                        {policyResult.reason.slice(0, 3).map((r, idx) => (
                                                            <div key={idx} className="flex gap-4 p-4 rounded-xl bg-blue-600/5 border border-blue-600/10 text-xs font-medium text-white/80 group/item hover:bg-blue-600/10 transition-colors">
                                                                <span className="flex-shrink-0 w-5 h-5 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-black text-[10px]">
                                                                    0{idx + 1}
                                                                </span>
                                                                {r}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="relative py-12 flex flex-col items-center justify-center text-center gap-6">
                                            <div className="w-16 h-16 rounded-full border-4 border-dashed border-blue-600/30 border-t-blue-600 animate-spin"></div>
                                            <p className="text-sm text-white/40 leading-relaxed font-medium max-w-xs">
                                                Initialize system parameters or ingest telemetry data to activate the policy regression model.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="relative overflow-hidden group w-full rounded-[1.5rem] bg-blue-600 px-6 py-5 text-sm font-black text-white shadow-2xl shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {loading ? 'Processing Neural Model...' : 'Execute Policy Optimization'}
                                        {!loading && <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2 group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    )
}

