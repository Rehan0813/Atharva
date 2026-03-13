import React from 'react'
import { Link } from 'react-router-dom'
import BackgroundBlobs from '../components/BackgroundBlobs'

const steps = [
    { name: 'Workload Ingestion', color: 'bg-blue-600' },
    { name: 'Feature Extraction', color: 'bg-indigo-600' },
    { name: 'Classification AI', color: 'bg-violet-600' },
    { name: 'Hybrid Policy Gen', color: 'bg-purple-600' },
    { name: 'Cache Controller', color: 'bg-fuchsia-600' },
    { name: 'Real-time Metrics', color: 'bg-pink-600' },
    { name: 'Reinforcement Learning', color: 'bg-rose-600' },
]

export default function Architecture() {
    return (
        <div className="relative min-h-screen bg-[#e0f7ff] font-sans overflow-x-hidden pt-32 pb-20">
            <BackgroundBlobs />
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="flex flex-col gap-4 mb-12 animate-slide-up">
                    <div className="w-12 h-1.5 bg-blue-600 rounded-full"></div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#111827]">
                        System Architecture
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-3xl leading-relaxed">
                        Atharva Cache Intelligence is built on a closed-loop learning pipeline. 
                        Every memory request flows through our neural controller to ensure optimal performance.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Pipeline Visualization */}
                    <div className="lg:col-span-12 max-w-5xl mx-auto w-full space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <div className="rounded-[3rem] border border-white/50 bg-white/40 backdrop-blur-xl p-8 md:p-12 shadow-2xl shadow-indigo-900/5">
                            <h2 className="text-2xl font-black text-[#111827] mb-8">Logical Pipeline</h2>
                            <div className="space-y-4">
                                {steps.map((s, idx) => (
                                    <div key={s.name} className="group relative flex items-center gap-6 p-6 rounded-[2rem] border border-white/60 bg-white/50 hover:bg-white hover:shadow-xl transition-all duration-500">
                                        <div className={`shrink-0 w-12 h-12 rounded-2xl ${s.color} text-white flex items-center justify-center font-black text-lg shadow-lg`}>
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-black text-[#111827]">{s.name}</h3>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                                                {idx === 0 && 'Synthetic and live workload ingestion'}
                                                {idx === 1 && 'Locality and frequency analysis'}
                                                {idx === 2 && 'Workload regime identification'}
                                                {idx === 3 && 'Dynamic strategy parameterization'}
                                                {idx === 4 && 'Memory access control execution'}
                                                {idx === 5 && 'Observability feedback loop'}
                                                {idx === 6 && 'Model weights and policy optimization'}
                                            </p>
                                        </div>
                                        {idx !== steps.length - 1 && (
                                            <div className="absolute bottom-[-1.5rem] left-[2.45rem] w-0.5 h-6 bg-slate-300 -z-10" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

