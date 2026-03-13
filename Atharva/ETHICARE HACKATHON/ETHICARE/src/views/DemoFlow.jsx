import React from 'react'
import { Link } from 'react-router-dom'

const steps = [
    {
        title: 'Upload workload',
        body: 'Upload access traces or a workload document using the ingestion interface.',
        cta: { label: 'Go to Upload', to: '/upload' },
    },
    {
        title: 'System classifies workload',
        body: 'CacheX extracts features (ratios, locality, sequentiality) and assigns a workload regime.',
    },
    {
        title: 'Policy prediction appears',
        body: 'The engine selects a policy (LRU/LFU/FIFO/Hybrid) with confidence and explanation.',
    },
    {
        title: 'Dashboard metrics update',
        body: 'Hit/miss/latency panels update in real time to show policy effect.',
    },
    {
        title: 'Prefetch prediction appears',
        body: 'Predictive prefetch detects access patterns and surfaces the most likely next block.',
    },
]

export default function DemoFlow() {
    return (
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-10">
            <p className="text-xs uppercase tracking-wider text-slate-500">Demo</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mt-2">
                Judge Demo Flow
            </h1>
            <p className="text-sm text-slate-600 mt-3 max-w-3xl">
                A guided walkthrough designed for a finalist-level hackathon demo. Each step reinforces the AI system story:
                classification → policy selection → measurable impact → predictive prefetch.
            </p>

            <div className="mt-10 space-y-4">
                {steps.map((s, i) => (
                    <div key={s.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-semibold">
                                    {i + 1}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                                    <p className="text-sm text-slate-600 mt-1">{s.body}</p>
                                </div>
                            </div>
                            {s.cta && (
                                <Link
                                    to={s.cta.to}
                                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-blue-700"
                                >
                                    {s.cta.label}
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

