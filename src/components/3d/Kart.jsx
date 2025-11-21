import React, { useRef, useState, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useBox, useRaycastVehicle } from '@react-three/cannon'
import { useKeyboardControls } from '../../hooks/useKeyboardControls'

const Kart = forwardRef(({ position, isPlayer = true, color = 'red', onPositionUpdate }, forwardedRef) => {
    const chassis = forwardedRef || useRef(null)
    const wheel1 = useRef(null)
    const wheel2 = useRef(null)
    const wheel3 = useRef(null)
    const wheel4 = useRef(null)

    const [driftLevel, setDriftLevel] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [isBoosting, setIsBoosting] = useState(false)

    const [chassisBody, chassisApi] = useBox(() => ({
        allowSleep: false,
        args: [1.2, 0.5, 2],
        mass: 150,
        position,
        rotation: [0, Math.PI, 0],
    }), chassis)

    const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
        chassisBody,
        wheelInfos: [
            { radius: 0.3, directionLocal: [0, -1, 0], suspensionStiffness: 30, suspensionRestLength: 0.3, maxSuspensionForce: 100000, maxSuspensionTravel: 0.3, dampingRelaxation: 2.3, dampingCompression: 4.4, frictionSlip: 5, rollInfluence: 0.01, axleLocal: [-1, 0, 0], chassisConnectionPointLocal: [-0.7, 0, 1], isFrontWheel: true, useCustomSlidingRotationalSpeed: true, customSlidingRotationalSpeed: -30 },
            { radius: 0.3, directionLocal: [0, -1, 0], suspensionStiffness: 30, suspensionRestLength: 0.3, maxSuspensionForce: 100000, maxSuspensionTravel: 0.3, dampingRelaxation: 2.3, dampingCompression: 4.4, frictionSlip: 5, rollInfluence: 0.01, axleLocal: [-1, 0, 0], chassisConnectionPointLocal: [0.7, 0, 1], isFrontWheel: true, useCustomSlidingRotationalSpeed: true, customSlidingRotationalSpeed: -30 },
            { radius: 0.3, directionLocal: [0, -1, 0], suspensionStiffness: 30, suspensionRestLength: 0.3, maxSuspensionForce: 100000, maxSuspensionTravel: 0.3, dampingRelaxation: 2.3, dampingCompression: 4.4, frictionSlip: 5, rollInfluence: 0.01, axleLocal: [-1, 0, 0], chassisConnectionPointLocal: [-0.7, 0, -1], isFrontWheel: false, useCustomSlidingRotationalSpeed: true, customSlidingRotationalSpeed: -30 },
            { radius: 0.3, directionLocal: [0, -1, 0], suspensionStiffness: 30, suspensionRestLength: 0.3, maxSuspensionForce: 100000, maxSuspensionTravel: 0.3, dampingRelaxation: 2.3, dampingCompression: 4.4, frictionSlip: 5, rollInfluence: 0.01, axleLocal: [-1, 0, 0], chassisConnectionPointLocal: [0.7, 0, -1], isFrontWheel: false, useCustomSlidingRotationalSpeed: true, customSlidingRotationalSpeed: -30 },
        ],
        wheels: [wheel1, wheel2, wheel3, wheel4],
    }))

    const controls = useKeyboardControls()

    useFrame(() => {
        if (!isPlayer) return

        const { forward, backward, left, right, drift } = controls.current

        const maxSpeed = isBoosting ? 2500 : 1500
        const engineForce = (forward ? -1 : backward ? 1 : 0) * maxSpeed
        const steeringValue = (left ? 1 : right ? -1 : 0) * 0.5

        vehicleApi.applyEngineForce(engineForce, 2)
        vehicleApi.applyEngineForce(engineForce, 3)

        if (drift && (left || right) && forward) {
            vehicleApi.setSteeringValue(steeringValue * 1.5, 0)
            vehicleApi.setSteeringValue(steeringValue * 1.5, 1)
            setDriftLevel(prev => Math.min(100, prev + 2))
        } else {
            vehicleApi.setSteeringValue(steeringValue, 0)
            vehicleApi.setSteeringValue(steeringValue, 1)

            if (driftLevel > 50) {
                setIsBoosting(true)
                setTimeout(() => setIsBoosting(false), 1000)
            }
            setDriftLevel(0)
        }
    })

    return (
        <group ref={chassis} name="kart">
            <mesh position={[0, 0.2, 0]} castShadow>
                <boxGeometry args={[1.2, 0.5, 2]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
            </mesh>

            <mesh position={[0, 0.8, -0.2]} castShadow>
                <sphereGeometry args={[0.35, 16, 16]} />
                <meshStandardMaterial color={color} />
            </mesh>

            <mesh position={[0, 0.8, 0]} castShadow>
                <sphereGeometry args={[0.25, 16, 16]} />
                <meshStandardMaterial color="#1a1a1a" transparent opacity={0.8} />
            </mesh>

            {[
                { ref: wheel1, pos: [-0.7, 0, 1] },
                { ref: wheel2, pos: [0.7, 0, 1] },
                { ref: wheel3, pos: [-0.7, 0, -1] },
                { ref: wheel4, pos: [0.7, 0, -1] }
            ].map((wheel, i) => (
                <group key={i} ref={wheel.ref} position={wheel.pos}>
                    <mesh rotation={[0, 0, -Math.PI / 2]} castShadow>
                        <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
                        <meshStandardMaterial color="#1a1a1a" />
                    </mesh>
                </group>
            ))}

            {driftLevel > 20 && (
                <pointLight
                    position={[0, 0, -1]}
                    color={driftLevel > 70 ? "#ff6b00" : "#00d4ff"}
                    intensity={driftLevel / 50}
                    distance={3}
                />
            )}

            {isBoosting && (
                <pointLight
                    position={[0, 0, -1.5]}
                    color="#ffff00"
                    intensity={2}
                    distance={5}
                />
            )}
        </group>
    )
})

Kart.displayName = 'Kart'

export default Kart
