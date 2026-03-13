import React from 'react'

const cards = [
    {
        title: 'Self-Learning Cache Engine',
        desc: 'Continuously adapts to new workload patterns and improves policy selection over time.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <path d="M12 2v6" />
                <path d="M12 16v6" />
                <path d="M4.93 4.93l4.24 4.24" />
                <path d="M14.83 14.83l4.24 4.24" />
                <path d="M2 12h6" />
                <path d="M16 12h6" />
                <path d="M4.93 19.07l4.24-4.24" />
                <path d="M14.83 9.17l4.24-4.24" />
            </svg>
        ),
    },
    {
        title: 'Workload Classification AI',
        desc: 'Classifies workloads using extracted features like locality, frequency, and read/write ratios.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <path d="M4 19V5" />
                <path d="M4 19h16" />
                <path d="M8 17V9" />
                <path d="M12 17V7" />
                <path d="M16 17v-5" />
            </svg>
        ),
    },
    {
        title: 'Hybrid Cache Policy Generator',
        desc: 'Generates dynamic mixtures like LRU + LFU with tunable ratios for each workload regime.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <path d="M3 7h18" />
                <path d="M3 12h18" />
                <path d="M3 17h18" />
                <path d="M7 7v10" />
                <path d="M17 7v10" />
            </svg>
        ),
    },
    {
        title: 'Predictive Prefetch Engine',
        desc: 'Detects sequential patterns and prefetches the most likely next block before demand.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <path d="M4 12h10" />
                <path d="M12 6l6 6-6 6" />
            </svg>
        ),
    },
    {
        title: 'Explainable AI Reasoning',
        desc: 'Every prediction returns reasons and confidence for trustworthy decisions and judge-friendly demos.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <path d="M12 18h.01" />
                <path d="M12 14a4 4 0 1 0-4-4" />
                <path d="M20 12a8 8 0 1 1-16 0a8 8 0 0 1 16 0Z" />
            </svg>
        ),
    },
    {
        title: 'Energy-Aware Optimization',
        desc: 'Optional extension to trade performance vs power using energy counters and policy aggressiveness control.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <path d="M13 2L3 14h7l-1 8 12-14h-7l-1-6Z" />
            </svg>
        ),
    },
]

export default function AboutSection() {
    return (
        <section className="max-w-7xl mx-auto px-6 pb-24">
            <div className="rounded-[3rem] border border-white/50 bg-white/40 backdrop-blur-xl p-8 md:p-14 shadow-2xl shadow-indigo-900/5">
                <div className="flex flex-col gap-6 mb-12">
                    <div className="w-12 h-1.5 bg-blue-600 rounded-full"></div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#111827]">
                        Industrial Cache Intelligence
                    </h2>
                    <p className="text-lg text-slate-600 font-medium max-w-3xl leading-relaxed">
                        CacheX is a high-performance AI system designed to eliminate memory bottlenecks. 
                        It continuously learns from data access patterns to deliver sub-millisecond latency.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((c, i) => (
                        <div
                            key={c.title}
                            className="group relative rounded-[2rem] border border-white/60 bg-white/50 p-8 shadow-sm hover:shadow-2xl hover:shadow-indigo-900/10 hover:-translate-y-1 transition-all duration-500"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 mb-6">
                                {c.icon}
                            </div>
                            <h3 className="text-xl font-black text-[#111827] mb-3 group-hover:text-blue-600 transition-colors">
                                {c.title}
                            </h3>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                {c.desc}
                            </p>
                            <div className="absolute top-8 right-8 text-slate-100 font-black text-4xl -z-10 group-hover:text-blue-50 transition-colors">
                                0{i + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
