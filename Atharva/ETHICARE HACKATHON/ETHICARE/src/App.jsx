import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import UploadPage from './pages/UploadPage'
import ArchitecturePage from './pages/ArchitecturePage'
import FeaturesPage from './pages/FeaturesPage'
import DemoFlowPage from './pages/DemoFlowPage'
import LearnMore from './pages/LearnMore'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="/architecture" element={<ArchitecturePage />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    <Route path="/demo" element={<DemoFlowPage />} />
                    <Route path="/learn-more" element={<LearnMore />} />

                    {/* Legacy redirect */}
                    <Route path="/learn-more-old" element={<Navigate to="/learn-more" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
