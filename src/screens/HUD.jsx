import React from 'react'
import { useNavigate } from 'react-router-dom'
import GameScene from '../components/GameScene'
import useGameStore from '../game/useGameStore'

const HUD = () => {
    const navigate = useNavigate()
    const { laps, item } = useGameStore()

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            {/* 3D Scene */}
            <div style={{ position: 'absolute', inset: 0 }}>
                <GameScene />
            </div>

            {/* Top Left: Laps */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>
                <div style={{
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontSize: '2rem',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold'
                }}>
                    LAP {laps + 1}
                </div>
            </div>

            {/* Top Right: Item */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'rgba(0,0,0,0.5)',
                    border: '4px solid white',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                }}>
                    {item || '❓'}
                </div>
            </div>

            {/* Back button overlay */}
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 10 }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        padding: '10px 20px',
                        fontSize: '1rem',
                        background: '#ff0099',
                        color: 'white',
                        border: '2px solid black',
                        borderRadius: '20px',
                        cursor: 'pointer'
                    }}
                >
                    Exit Race
                </button>
            </div>
        </div>
    )
}

export default HUD
