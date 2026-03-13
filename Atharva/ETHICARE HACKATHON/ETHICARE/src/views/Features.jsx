import React from 'react'
import BackgroundBlobs from '../components/BackgroundBlobs'

const features = [
    {
        title: 'Self-Learning Cache Engine',
        desc: 'Continuous ML model updates based on real-time ingestion of workload patterns.',
        icon: '🧠',
    },
    {
        title: 'Workload Classification AI',
        desc: 'Neural classification of incoming workloads into specific regime families.',
        icon: '📊',
    },
    {
        title: 'Hybrid Policy Generator',
        desc: 'Dynamic blending of strategies (LRU/LFU/etc) for complex access patterns.',
        icon: '🧬',
    },
    {
        title: 'Real-Time Performance Dashboard',
        desc: 'Live telemetry for hit rates, miss counts, and sub-millisecond latency tracking.',
        icon: '📈',
    },
    {
        title: 'Explainable AI Reasoning',
        desc: 'Human-friendly justifications for every policy decision made by the system.',
        icon: '🔎',
    },
    {
        title: 'Predictive Cache Prefetching',
        desc: 'Sequence-aware data pre-loading to eliminate cold-start cache misses.',
        icon: '🚀',
    },
    {
        title: 'Energy-Aware Optimization',
        desc: 'Balanced performance vs power consumption for sustainable edge deployments.',
        icon: '⚡',
    },
    {
        title: 'Reinforcement Learning',
        desc: 'Agent-based optimization that discovers new cache strategies autonomously.',
        icon: '🔄',
    },
    {
        title: 'Anomaly Detection',
        desc: 'Instant detection of workload spikes or shifts with sudden adaptation logic.',
        icon: '🧪',
    },
    {
        title: 'Policy Auto-Evolution',
        desc: 'Generative AI that creates brand new cache eviction rules from scratch.',
        icon: '🏆',
    },
]

export default function Features() {
    return (
        <div className="relative min-h-screen bg-[#e0f7ff] font-sans overflow-x-hidden pt-20 pb-20">
            <BackgroundBlobs />
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-16 animate-slide-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest mb-6 border border-blue-200">
                    Advanced Capabilities
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#111827] mb-6">
                    Real-World <span className="text-blue-600 italic">Industry Requirements</span>
                </h1>
                <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
                    Designed for production-grade AI infrastructure. Our system covers 10 critical sectors of modern memory optimization.
                </p>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((f, i) => (
                    <div
                        key={f.title}
                        className="group relative rounded-[2.5rem] border border-white/50 bg-white/40 backdrop-blur-xl p-8 shadow-2xl shadow-indigo-900/5 hover:bg-white hover:shadow-blue-900/10 transition-all duration-500 animate-slide-up"
                        style={{ animationDelay: `${i * 0.05}s` }}
                    >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            {f.icon}
                        </div>
                        <h3 className="text-xl font-black text-[#111827] mb-3 group-hover:text-blue-600 transition-colors">
                            {f.title}
                        </h3>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">
                            {f.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

