import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
            <div className="bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                <div className="px-6 h-14 flex items-center justify-between gap-4">
                    {/* Left: brand */}
                    <Link to="/" className="flex items-center gap-3 shrink-0">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 font-black text-xs">
                            C
                        </div>
                        <div className="leading-tight hidden sm:block">
                            <div className="text-sm font-black text-white tracking-tighter uppercase italic">Cachec Engineers</div>
                        </div>
                    </Link>

                    {/* Center: Links */}
                    <nav className="flex items-center gap-1">
                        {[
                            { label: 'Overview', to: '/' },
                            { label: 'Dashboard', to: '/dashboard' },
                            { label: 'Architecture', to: '/architecture' },
                            { label: 'Upload', to: '/upload' },
                        ].map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        isActive 
                                        ? 'bg-white text-black shadow-lg' 
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right: indicator */}
                    <div className="hidden lg:flex items-center gap-3">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] leading-none">v4.0.2</span>
                            <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest mt-1">System Stable</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-glow shadow-emerald-500/50" />
                    </div>
                </div>
            </div>
        </div>
    )
}
