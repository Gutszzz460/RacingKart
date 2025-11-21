import React, { useRef } from 'react'
import { useBox } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '../hooks/useKeyboardControls'

export default function Kart() {
    const [ref, api] = useBox(() => ({
        mass: 500,
        position: [0, 2, 0],
        args: [1, 0.5, 2],
        angularDamping: 0.5,
        linearDamping: 0.5
    }))

    const keys = useKeyboardControls()

    useFrame(() => {
        const { forward, backward, left, right, drift } = keys.current

        // Simple arcade physics
        const force = 2000
        const torque = 50

        if (forward) api.applyLocalForce([0, 0, -force], [0, 0, 0])
        if (backward) api.applyLocalForce([0, 0, force], [0, 0, 0])

        if (left) api.applyTorque([0, force, 0])
        if (right) api.applyTorque([0, -force, 0])
    })

    return (
        <mesh ref={ref} castShadow name="Kart">
            <boxGeometry args={[1, 0.5, 2]} />
            <meshStandardMaterial color="red" />
            <mesh position={[0, 0.25, -0.8]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="blue" />
            </mesh>
        </mesh>
    )
}
