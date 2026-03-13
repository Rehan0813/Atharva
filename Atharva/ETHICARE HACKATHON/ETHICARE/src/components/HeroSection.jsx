import React from 'react'
import Spline from '@splinetool/react-spline'
import { Link, useNavigate } from 'react-router-dom'

export default function HeroSection() {
    const navigate = useNavigate()

    return (
        <section className="relative pt-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT: Spline 3D visual */}
                    <div className="order-2 lg:order-1">
                        <div className="rounded-[2.5rem] border border-white/50 bg-white/40 backdrop-blur-xl shadow-2xl shadow-indigo-900/5 overflow-hidden">
                            <div className="aspect-[4/3] bg-slate-900 relative">
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-500/20 blur-3xl rounded-full" />
                                    <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-indigo-500/20 blur-3xl rounded-full" />
                                </div>
                                <Spline scene="https://prod.spline.design/sxbyIS7iRPcxjfK5/scene.splinecode" />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Heading + CTA */}
                    <div className="flex flex-col gap-8 order-1 lg:order-2">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 border border-blue-200/50 mb-6">
                                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                                <p className="text-[10px] font-black text-blue-800 uppercase tracking-[0.2em]">
                                    CacheX Engine · Production v2.4
                                </p>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#111827] leading-[0.95] mb-6">
                                Self-Learning <br />
                                <span className="text-blue-600 italic">Cache Engine</span>
                            </h1>
                            <div className="w-24 h-2 bg-blue-600 rounded-full"></div>
                        </div>

                        <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                            Atharva analyzes workloads, predicts cache strategies, and prefetches data with explainable AI reasoning. 
                            Built for industrial-scale memory optimization.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="group relative inline-flex items-center justify-center rounded-2xl bg-[#111827] text-white px-8 py-4 text-sm font-bold shadow-xl hover:bg-blue-600 transition-all duration-300"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Run Simulation
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 group-hover:translate-x-1 transition-transform">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </button>
                            <Link
                                to="/architecture"
                                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/50 backdrop-blur px-8 py-4 text-sm font-bold text-slate-900 shadow-sm hover:bg-white transition-all duration-300"
                            >
                                Architecture
                            </Link>
                        </div>

                        <div className="pt-8">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {[
                                    'Classification',
                                    'Hybrid Policies',
                                    'Predictive AI',
                                ].map((f) => (
                                    <div
                                        key={f}
                                        className="rounded-[1.5rem] border border-white/60 bg-white/20 backdrop-blur-md px-5 py-4 shadow-sm hover:shadow-md transition-all"
                                    >
                                        <p className="text-xs font-black text-[#111827] uppercase tracking-wider">{f}</p>
                                        <div className="mt-2 flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
