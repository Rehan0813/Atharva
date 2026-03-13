import React from 'react'

export default function HistoryCard({ history, loading, onRefresh }) {
    return (
        <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-900/5 border border-white/60 p-7">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Telemetry Logs</p>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Deployment History</h3>
                </div>
                <button
                    onClick={onRefresh}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <svg viewBox="0 0 24 24" className={`w-4 h-4 text-slate-400 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>

            <div className="space-y-3">
                {history.length > 0 ? (
                    history.map((item, idx) => (
                        <div key={idx} className="group relative flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-white/80 hover:border-blue-200 hover:bg-white transition-all shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-[10px]">
                                    {idx + 1}
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-slate-900 truncate max-w-[120px]">
                                        {item.workload_type}
                                    </p>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                        {item.timestamp}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-100">
                                    <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                                        {item.policy}
                                    </p>
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-8 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-xs text-slate-400 font-medium tracking-tight">No deployment history found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
