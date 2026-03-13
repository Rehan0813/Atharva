import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-900">CacheX Engineers</p>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Atharva DB Lab</p>
                        <p className="text-sm text-slate-600 max-w-md">
                            Intelligent cache optimization for modern computing systems.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                        <Link className="hover:text-slate-900" to="/dashboard">Dashboard</Link>
                        <Link className="hover:text-slate-900" to="/architecture">Architecture</Link>
                        <Link className="hover:text-slate-900" to="/features">Features</Link>
                        <Link className="hover:text-slate-900" to="/demo">Demo Flow</Link>
                        <Link className="hover:text-slate-900" to="/learn-more">Learn More</Link>
                    </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} CacheX Engineers
                    </p>
                    <p className="text-xs text-slate-400">
                        Research prototype · Observability-grade UI
                    </p>
                </div>
            </div>
        </footer>
    )
}

