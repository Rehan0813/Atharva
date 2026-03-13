import React, { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackgroundBlobs from '../components/BackgroundBlobs'

const API_BASE = '/api'

/** Safely parse JSON — won't throw on empty / non-JSON bodies */
async function safeJson(res) {
    const text = await res.text()
    if (!text) return {}
    try { return JSON.parse(text) } catch { return { detail: text } }
}

const COL_LABELS = {
    access_frequency: 'Access Freq.',
    reuse_distance: 'Reuse Dist.',
    temporal_locality: 'Temporal Loc.',
    spatial_locality: 'Spatial Loc.',
}

export default function Upload() {
    const navigate = useNavigate()
    const inputRef = useRef(null)

    // Step 1 – file selection
    const [file, setFile] = useState(null)
    const [previewing, setPreviewing] = useState(false)
    const [previewError, setPreviewError] = useState('')

    // Step 2 – row selection
    const [rows, setRows] = useState(null)   // array of row objects from /preview_csv
    const [selectedRow, setSelectedRow] = useState(null)

    // Step 3 – submission
    const [loading, setLoading] = useState(false)
    const [submitError, setSubmitError] = useState('')

    /* ── helpers ── */
    const reset = () => {
        setFile(null)
        setRows(null)
        setSelectedRow(null)
        setPreviewError('')
        setSubmitError('')
    }

    const onBrowse = () => inputRef.current?.click()

    const onFile = (f) => {
        if (!f) return
        // Reset row/error state but keep new file
        setRows(null)
        setSelectedRow(null)
        setPreviewError('')
        setSubmitError('')
        setFile(f)
        // Clear input value so re-selecting the same file still fires onChange
        if (inputRef.current) inputRef.current.value = ''
    }

    const onDrop = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        const dropped = e.dataTransfer?.files?.[0]
        if (dropped) onFile(dropped)
    }, [])

    const onDragOver = (e) => { e.preventDefault(); e.stopPropagation() }

    /* ── Step 1: Preview CSV ── */
    const onPreview = async () => {
        if (!file) return
        setPreviewing(true)
        setPreviewError('')
        try {
            const fd = new FormData()
            fd.append('file', file)
            const res = await fetch(`${API_BASE}/preview_csv`, { method: 'POST', body: fd })
            const body = await safeJson(res)
            if (!res.ok) throw new Error(body.detail || `Server error ${res.status}`)
            if (!body.rows || body.rows.length === 0) throw new Error('CSV has no data rows.')
            setRows(body.rows)
            setSelectedRow(0)
        } catch (err) {
            setPreviewError(err?.message || 'Could not load CSV preview')
        } finally {
            setPreviewing(false)
        }
    }

    /* ── Step 2: Submit selected row ── */
    const onSubmit = async () => {
        if (selectedRow === null || !rows) return
        setLoading(true)
        setSubmitError('')

        const chosen = rows[selectedRow]

        // Build a single-row CSV blob so the existing /upload_file endpoint works
        const cols = Object.keys(chosen)
        const csvContent = [cols.join(','), cols.map(c => chosen[c]).join(',')].join('\n')
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const singleRowFile = new File([blob], file.name, { type: 'text/csv' })

        try {
            const fd = new FormData()
            fd.append('file', singleRowFile)
            const res = await fetch(`${API_BASE}/upload_file`, { method: 'POST', body: fd })
            const data = await safeJson(res)
            if (!res.ok) throw new Error(data.detail || `Server error ${res.status}`)
            sessionStorage.setItem('cachex:lastPrediction', JSON.stringify(data))
            navigate('/dashboard')
        } catch (err) {
            setSubmitError(err?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    /* ── Render ── */
    return (
        <div className="relative min-h-screen bg-[#e0f7ff] font-sans overflow-x-hidden pt-20 pb-20">
            <BackgroundBlobs />
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="space-y-4 mb-12 animate-slide-up">
                    <div className="w-12 h-1.5 bg-blue-600 rounded-full" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ingestion Engine</p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#111827]">
                        Workload <span className="text-blue-600">Analysis</span>
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
                        Upload a CSV trace. Preview all rows, pick the exact entry you want to analyse, then run the AI engine.
                    </p>
                </div>

                {/* ── STEP 1: Drop zone (shown when no rows yet) ── */}
                {!rows && (
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
                                    <p className="text-2xl font-black text-slate-900 tracking-tight">Drop telemetry source here</p>
                                    <p className="text-slate-500 font-medium">
                                        or{' '}
                                        <button type="button" onClick={onBrowse} className="text-blue-600 font-black hover:underline underline-offset-4">
                                            browse filesystem
                                        </button>
                                    </p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {['.CSV Traces', '.JSON Config', '.LOG Files'].map((t) => (
                                        <span key={t} className="px-4 py-2 rounded-xl bg-white/60 border border-white text-slate-600 text-[10px] font-black uppercase tracking-widest shadow-sm">{t}</span>
                                    ))}
                                </div>
                                <input ref={inputRef} type="file" accept=".csv,.json" className="hidden" onChange={(e) => onFile(e.target.files?.[0] || null)} />
                                {file && (
                                    <div className="w-full max-w-sm rounded-[1.5rem] bg-blue-50/50 border border-blue-100/50 p-4 text-center">
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Selected File</p>
                                        <p className="text-sm font-black text-slate-900 truncate">{file.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <div className="flex-1 rounded-[2.5rem] bg-slate-900 text-white p-8 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                <p className="relative text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-6">Processing Pipeline</p>
                                <h2 className="relative text-2xl font-black tracking-tight mb-4">Neural Mapping</h2>
                                <p className="relative text-white/60 text-sm font-medium leading-relaxed mb-8">
                                    Upload your CSV, preview every row with exact values, choose the entry you want, then let the AI classify it.
                                </p>
                                {previewError && (
                                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-6">
                                        {previewError}
                                    </div>
                                )}
                                <button
                                    type="button"
                                    disabled={!file || previewing}
                                    onClick={onPreview}
                                    className="relative w-full rounded-[1.25rem] bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    {previewing ? 'Loading rows…' : 'Preview CSV Rows →'}
                                </button>
                            </div>
                            <div className="rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white p-8 shadow-xl">
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> System Privacy
                                </h3>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                    All workload data is processed locally on our secure edge nodes. No customer data is stored beyond the session lifecycle.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── STEP 2: Row selection table ── */}
                {rows && (
                    <div className="animate-slide-up space-y-6">
                        {/* file badge + back */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{file.name}</span>
                                <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                                    {rows.length} {rows.length === 1 ? 'row' : 'rows'}
                                </span>
                            </div>
                            <button
                                onClick={reset}
                                className="text-xs font-black text-slate-400 hover:text-slate-700 transition-colors uppercase tracking-widest"
                            >
                                ← Change File
                            </button>
                        </div>

                        {/* table card */}
                        <div className="rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white shadow-2xl shadow-blue-900/5 overflow-hidden">
                            <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
                                <h2 className="text-base font-black text-slate-900 tracking-tight">Select a Row to Analyse</h2>
                                <span className="text-xs text-slate-400 font-medium">— exact CSV values shown below</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-slate-50/80 border-b border-slate-100">
                                            <th className="px-6 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest w-12">Row</th>
                                            {['access_frequency', 'reuse_distance', 'temporal_locality', 'spatial_locality'].map(col => (
                                                <th key={col} className="px-6 py-3 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    {COL_LABELS[col]}
                                                </th>
                                            ))}
                                            <th className="px-6 py-3 w-12" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, idx) => {
                                            const isSelected = selectedRow === idx
                                            return (
                                                <tr
                                                    key={idx}
                                                    onClick={() => setSelectedRow(idx)}
                                                    className={`cursor-pointer border-b border-slate-50 transition-colors ${isSelected ? 'bg-blue-50' : 'hover:bg-slate-50/60'}`}
                                                >
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex w-7 h-7 items-center justify-center rounded-lg text-xs font-black transition-colors ${isSelected ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 text-slate-500'}`}>
                                                            {idx + 1}
                                                        </span>
                                                    </td>
                                                    {['access_frequency', 'reuse_distance', 'temporal_locality', 'spatial_locality'].map(col => (
                                                        <td key={col} className={`px-6 py-4 text-right font-semibold tabular-nums ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                                                            {typeof row[col] === 'number' ? row[col].toLocaleString(undefined, { maximumFractionDigits: 6 }) : row[col]}
                                                        </td>
                                                    ))}
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`w-4 h-4 rounded-full border-2 inline-block transition-all ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`} />
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* selected row summary */}
                        {selectedRow !== null && rows[selectedRow] && (
                            <div className="rounded-[2rem] bg-slate-900 text-white p-8 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                                <p className="relative text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-4">
                                    Selected — Row {selectedRow + 1}
                                </p>
                                <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                                    {['access_frequency', 'reuse_distance', 'temporal_locality', 'spatial_locality'].map(col => (
                                        <div key={col}>
                                            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">{COL_LABELS[col]}</p>
                                            <p className="text-2xl font-black tabular-nums">
                                                {typeof rows[selectedRow][col] === 'number'
                                                    ? rows[selectedRow][col].toLocaleString(undefined, { maximumFractionDigits: 6 })
                                                    : rows[selectedRow][col]}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {submitError && (
                                    <div className="relative p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-6">
                                        {submitError}
                                    </div>
                                )}
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={onSubmit}
                                    className="relative w-full md:w-auto rounded-[1.25rem] bg-blue-600 px-10 py-4 text-sm font-black text-white shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    {loading ? 'Analysing…' : 'Ingest Row & Optimise →'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
