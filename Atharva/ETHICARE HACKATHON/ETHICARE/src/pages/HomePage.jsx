import React from 'react'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import BackgroundBlobs from '../components/BackgroundBlobs'

export default function HomePage() {
    return (
        <div className="relative min-h-screen bg-[#e0f7ff] font-sans overflow-x-hidden">
            <BackgroundBlobs />
            <div className="relative z-10 pt-2">
                <div className="animate-slide-up">
                    <HeroSection />
                </div>
                <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <AboutSection />
                </div>
            </div>
        </div>
    )
}
