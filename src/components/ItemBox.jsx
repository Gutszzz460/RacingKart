import React, { useRef } from 'react'
import { useBox } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import useGameStore from '../game/useGameStore'

const ITEMS = ['SPEED', 'SHIELD', 'MISSILE']

export default function ItemBox({ position }) {
    const setItem = useGameStore(state => state.setItem)
    const [ref, api] = useBox(() => ({
        isTrigger: true,
        position,
        args: [1, 1, 1],
        onCollide: (e) => {
            if (e.body.name === 'Kart') {
                const randomItem = ITEMS[Math.floor(Math.random() * ITEMS.length)]
                setItem(randomItem)
                // Disable box temporarily (visual feedback needed later)
                api.position.set(0, -10, 0)
                setTimeout(() => api.position.set(...position), 3000)
            }
        }
    }))

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        api.rotation.set(0, time, 0)
    })

    return (
        <mesh ref={ref}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="cyan" transparent opacity={0.8} />
        </mesh>
    )
}
