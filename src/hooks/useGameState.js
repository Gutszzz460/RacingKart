import { useState, useEffect, useRef } from 'react'

/**
 * Multiplayer-ready game state management
 * Separates game state from player input for future multiplayer support
 */
export const useGameState = () => {
    const [raceState, setRaceState] = useState('countdown') // countdown, racing, paused, finished
    const [countdown, setCountdown] = useState(3)
    const [currentLap, setCurrentLap] = useState(1)
    const [totalLaps] = useState(3)
    const [raceTime, setRaceTime] = useState(0)
    const [checkpointsPassed, setCheckpointsPassed] = useState([])
    const [playerPosition, setPlayerPosition] = useState(1)
    const [totalRacers] = useState(8)

    const raceTimerRef = useRef(null)

    // Countdown logic
    useEffect(() => {
        if (raceState === 'countdown' && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(prev => prev - 1)
            }, 1000)
            return () => clearTimeout(timer)
        } else if (raceState === 'countdown' && countdown === 0) {
            setRaceState('racing')
        }
    }, [raceState, countdown])

    // Race timer
    useEffect(() => {
        if (raceState === 'racing') {
            raceTimerRef.current = setInterval(() => {
                setRaceTime(prev => prev + 0.016) // ~60fps
            }, 16)
        } else {
            if (raceTimerRef.current) {
                clearInterval(raceTimerRef.current)
            }
        }
        return () => {
            if (raceTimerRef.current) {
                clearInterval(raceTimerRef.current)
            }
        }
    }, [raceState])

    const passCheckpoint = (checkpointId) => {
        setCheckpointsPassed(prev => {
            if (!prev.includes(checkpointId)) {
                return [...prev, checkpointId]
            }
            return prev
        })
    }

    const completeLap = () => {
        if (currentLap < totalLaps) {
            setCurrentLap(prev => prev + 1)
            setCheckpointsPassed([])
        } else {
            setRaceState('finished')
        }
    }

    const pauseRace = () => {
        setRaceState('paused')
    }

    const resumeRace = () => {
        setRaceState('racing')
    }

    const resetRace = () => {
        setRaceState('countdown')
        setCountdown(3)
        setCurrentLap(1)
        setRaceTime(0)
        setCheckpointsPassed([])
    }

    return {
        raceState,
        countdown,
        currentLap,
        totalLaps,
        raceTime,
        checkpointsPassed,
        playerPosition,
        totalRacers,
        passCheckpoint,
        completeLap,
        pauseRace,
        resumeRace,
        resetRace,
        isRacing: raceState === 'racing'
    }
}
