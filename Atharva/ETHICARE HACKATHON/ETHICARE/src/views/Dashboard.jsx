import React from 'react'
import DashboardSection from '../components/DashboardSection'
import BackgroundBlobs from '../components/BackgroundBlobs'

export default function Dashboard() {
    return (
        <div className="relative min-h-screen bg-[#e0f7ff] font-sans overflow-x-hidden pt-20 pb-20">
            <BackgroundBlobs />
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-slide-up">
                    <div className="space-y-4">
                        <div className="w-12 h-1.5 bg-blue-600 rounded-full"></div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#111827]">
                            Engine Console <span className="text-blue-600 italic">v4.0</span>
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
                            Real-time observability and workload classification.
                            Monitor your cache infrastructure with sub-millisecond precision.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/40 backdrop-blur-xl border border-white/60 p-2 rounded-2xl shadow-xl">
                        <div className="px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">System Online</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <DashboardSection />
                </div>
            </div>
        </div>
    )
}

