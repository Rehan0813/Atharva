import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BackgroundBlobs from '../components/BackgroundBlobs'

export default function LearnMore() {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const advancedFeatures = [
        {
            title: 'Predictive Cache Prefetching',
            desc: 'Learns recurrent access sequences like A → B → C and prefetches the most probable next block D into cache before it is requested.',
            tag: 'Latency ↓  ·  Hit rate ↑',
        },
        {
            title: 'Workload Classification Engine',
            desc: 'Classifies incoming workloads (AI, streaming, database, analytics, etc.) using extracted features such as read/write ratio and temporal locality.',
            tag: 'Smart policy routing',
        },
        {
            title: 'Hybrid Cache Policy Generator',
            desc: 'Dynamically blends classical strategies into hybrid policies, e.g. 70% LRU + 30% LFU, tuned to each workload.',
            tag: 'Beyond fixed policies',
        },
        {
            title: 'Explainable Policy Reasoning',
            desc: 'Every prediction is returned with confidence scores and human-readable reasons so judges and engineers can trust the system.',
            tag: 'Trustworthy AI',
        },
        {
            title: 'Anomaly-Aware Adaptation',
            desc: 'Detects sudden workload shifts and can trigger instant policy switches and cache flushing strategies.',
            tag: 'Robust under change',
        },
        {
            title: 'Energy-Aware Optimisation (Optional Extension)',
            desc: 'Can be extended to include energy counters and trade off performance vs. power consumption for edge deployments.',
            tag: 'Hackathon-plus idea',
        },
    ]

    return (
        <div className="relative min-h-screen bg-[#e0f7ff] font-sans overflow-x-hidden">
            <BackgroundBlobs />
            <div className="relative z-10">
                <Navbar />

                <div className="pt-32 pb-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="mb-16 animate-slide-up">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm mb-6 hover:gap-3 transition-all"
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                                Back to Overview
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-black text-[#1f2937] tracking-tight mb-4">
                                Atharva Cache Intelligence
                            </h1>
                            <div className="w-20 h-1.5 bg-indigo-600 rounded-full"></div>
                        </div>

                        {/* Section 1 — Architecture Overview */}
                        <section className="mb-20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-blue-50">
                                <h2 className="text-2xl font-bold text-[#111827] mb-6 flex items-center gap-3">
                                    Architecture Overview
                                </h2>
                                <p className="text-lg text-[#111827]/80 leading-relaxed font-medium mb-4">
                                    Atharva uses a workload-driven approach to optimise cache behaviour. Every incoming workload
                                    is normalised into structured features and stored in the{' '}
                                    <span className="font-semibold">`workloads`</span> table. A prediction service then maps
                                    these features to cache policies and performance expectations.
                                </p>
                                <p className="text-sm text-[#4b5563] leading-relaxed font-medium">
                                    When a prediction is made, the selected policy and its explanation are written to the{' '}
                                    <span className="font-semibold">`policies`</span> table, while simulated or live metrics
                                    flow into <span className="font-semibold">`cache_metrics`</span>. Predicted access patterns
                                    are stored in <span className="font-semibold">`prefetch_predictions`</span>, powering the
                                    predictive prefetch UI.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 — Key System Features */}
                        <section className="mb-20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-blue-50 relative overflow-hidden">
                                {/* Decorative blur */}
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

                                <div className="relative z-10">
                                    <h2 className="text-3xl font-black text-[#111827] mb-12 flex items-center gap-4">
                                        <div className="w-2 h-10 bg-indigo-600 rounded-full"></div>
                                        Hackathon-Winning Features
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                        {advancedFeatures.map((feature, i) => (
                                            <div
                                                key={feature.title}
                                                className="group relative bg-[#f8fbff]/60 backdrop-blur-sm p-8 rounded-[2rem] border border-blue-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-900/10 hover:-translate-y-2 transition-all duration-500"
                                            >
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                                            {i + 1}
                                                        </div>
                                                        <span className="px-3 py-1 rounded-full bg-indigo-50 text-[10px] font-semibold text-indigo-700 uppercase tracking-[0.18em]">
                                                            {feature.tag}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[#111827] font-black text-xl mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                                                            {feature.title}
                                                        </h4>
                                                        <p className="text-[#4b5563] text-sm leading-relaxed font-medium">
                                                            {feature.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3 — Data & API Contracts */}
                        <section className="mb-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-blue-50">
                                <h2 className="text-2xl font-bold text-[#111827] mb-8">
                                    Frontend ↔ Backend Contract (for your teammate)
                                </h2>

                                <div className="space-y-6 text-sm text-[#4b5563] font-medium">
                                    <p>
                                        The frontend assumes JSON responses exactly matching the schemas we defined together:
                                        a <span className="font-semibold">Policy Prediction Response</span> with fields like
                                        `workload_type`, `predicted_policy`, `hybrid_ratio`, `confidence`, and `reason[]`;
                                        a <span className="font-semibold">Dashboard Metrics Response</span> with
                                        `cache_hit_rate`, `cache_miss_rate`, and `latency`; and a{' '}
                                        <span className="font-semibold">Policy History Response</span> array for recent
                                        decisions.
                                    </p>
                                    <p>
                                        In the code, these are consumed via simple `fetch` calls that expect those property
                                        names. Your backend teammate just needs to make sure the JSON keys and types match
                                        the schemas you shared (for example, `reason` as an array of strings) and wire them
                                        to the corresponding tables in the <span className="font-semibold">`atharva`</span>{' '}
                                        database.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 4 — Demo Script */}
                        <section className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-blue-50 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>

                                <h2 className="text-2xl font-bold text-[#111827] mb-6 relative z-10">
                                    Judge-Friendly Demo Flow
                                </h2>
                                <ol className="list-decimal list-inside space-y-3 text-sm text-[#4b5563] font-medium relative z-10">
                                    <li>
                                        Upload or configure a workload on the home screen (set read/write ratio, frequency,
                                        temporal locality).
                                    </li>
                                    <li>
                                        Show the predicted policy, hybrid ratio and explanation on the right side card.
                                    </li>
                                    <li>
                                        Navigate to the dashboard view and highlight hit rate, miss rate and latency widgets.
                                    </li>
                                    <li>
                                        Scroll through policy history to show how the system adapted over time.
                                    </li>
                                    <li>
                                        Point at the predictive prefetch box and explain how it guesses the next memory block
                                        before the CPU asks for it.
                                    </li>
                                </ol>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Simple Footer */}
                <footer className="py-10 border-t border-gray-100 text-center">
                    <p className="text-gray-400 text-sm font-medium">© 2026 CacheX Engineers · Atharva</p>
                </footer>
            </div>
        </div>
    )
}
