import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import Garage from './screens/Garage'
import TrackSelection from './screens/TrackSelection'
import HUD from './screens/HUD'
import AudioPlayer from './components/AudioPlayer'
import Profile from './screens/Profile'

function App() {
    return (
        <Router>
            <AudioPlayer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/garage" element={<Garage />} />
                <Route path="/track-selection" element={<TrackSelection />} />
                <Route path="/hud" element={<HUD />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    )
}

export default App
