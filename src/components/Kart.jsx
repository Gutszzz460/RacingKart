import React, { useRef, useEffect } from 'react'
import { useBox, useRaycastVehicle } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '../hooks/useKeyboardControls'
import Wheel from './Wheel'

export default function Kart() {
    // Chassis physics body
    const chassisWidth = 1
    const chassisHeight = 0.5
    const chassisLength = 2
    const mass = 50 // Tuned mass

    const [chassisBody, chassisApi] = useBox(() => ({
        allowSleep: false,
        args: [chassisWidth, chassisHeight, chassisLength],
        mass,
        onCollide: (e) => console.log('bonk', e.body.name),
        position: [0, 10, 0], // Spawn higher
    }))

    // Wheels configuration
    const wheelRadius = 0.5
    const wheelWidth = 0.25
    const wheelFrontOffset = 0.85
    const wheelBackOffset = -0.75
    const wheelSideOffset = 0.65
    const wheelHeightOffset = -0.1

    const wheelInfos = [
        {
            radius: wheelRadius,
            directionLocal: [0, -1, 0],
            suspensionStiffness: 50,
            suspensionRestLength: 0.5,
            maxSuspensionForce: 10000,
            maxSuspensionTravel: 0.3,
            dampingRelaxation: 2.3,
            dampingCompression: 4.4,
            axleLocal: [-1, 0, 0],
            chassisConnectionPointLocal: [wheelSideOffset, wheelHeightOffset, wheelFrontOffset], // Front Left
            useCustomSlidingRotationalSpeed: true,
            customSlidingRotationalSpeed: -30,
            frictionSlip: 2,
        },
        {
            radius: wheelRadius,
            directionLocal: [0, -1, 0],
            suspensionStiffness: 50,
            suspensionRestLength: 0.5,
            maxSuspensionForce: 10000,
            maxSuspensionTravel: 0.3,
            dampingRelaxation: 2.3,
            dampingCompression: 4.4,
            axleLocal: [-1, 0, 0],
            chassisConnectionPointLocal: [-wheelSideOffset, wheelHeightOffset, wheelFrontOffset], // Front Right
            useCustomSlidingRotationalSpeed: true,
            customSlidingRotationalSpeed: -30,
            frictionSlip: 2,
        },
        {
            radius: wheelRadius,
            directionLocal: [0, -1, 0],
            suspensionStiffness: 50,
            suspensionRestLength: 0.5,
            maxSuspensionForce: 10000,
            maxSuspensionTravel: 0.3,
            dampingRelaxation: 2.3,
            dampingCompression: 4.4,
            axleLocal: [-1, 0, 0],
            chassisConnectionPointLocal: [wheelSideOffset, wheelHeightOffset, wheelBackOffset], // Rear Left
            useCustomSlidingRotationalSpeed: true,
            customSlidingRotationalSpeed: -30,
            frictionSlip: 2,
        },
        {
            radius: wheelRadius,
            directionLocal: [0, -1, 0],
            suspensionStiffness: 50,
            suspensionRestLength: 0.5,
            maxSuspensionForce: 10000,
            maxSuspensionTravel: 0.3,
            dampingRelaxation: 2.3,
            dampingCompression: 4.4,
            axleLocal: [-1, 0, 0],
            chassisConnectionPointLocal: [-wheelSideOffset, wheelHeightOffset, wheelBackOffset], // Rear Right
            useCustomSlidingRotationalSpeed: true,
            customSlidingRotationalSpeed: -30,
            frictionSlip: 2,
        },
    ]

    const wheel1 = useRef(null)
    const wheel2 = useRef(null)
    const wheel3 = useRef(null)
    const wheel4 = useRef(null)

    const vehicle = useRaycastVehicle(() => ({
        chassisBody,
        wheelInfos,
        wheels: [wheel1, wheel2, wheel3, wheel4],
    }))

    const vehicleApi = vehicle[1]

    const keys = useKeyboardControls()
    const isClicking = useRef(false)

    useEffect(() => {
        const down = () => { isClicking.current = true }
        const up = () => { isClicking.current = false }
        window.addEventListener('mousedown', down)
        window.addEventListener('mouseup', up)
        window.addEventListener('touchstart', down)
        window.addEventListener('touchend', up)
        return () => {
            window.removeEventListener('mousedown', down)
            window.removeEventListener('mouseup', up)
            window.removeEventListener('touchstart', down)
            window.removeEventListener('touchend', up)
        }
    }, [])

    // Debug logging
    useEffect(() => {
        const unsubscribe = chassisApi.position.subscribe((p) => {
            if (Math.random() > 0.98) console.log('Kart Position:', p)
        })
        return unsubscribe
    }, [chassisApi])

    useFrame(() => {
        const { forward, backward, left, right } = keys.current || {}
        const moveForward = forward || isClicking.current

        // Controls
        const maxSteerVal = 0.5
        const maxForce = 1500
        const brakeForce = 20

        // Steering (Front wheels: 0 and 1)
        const steerVal = left ? maxSteerVal : right ? -maxSteerVal : 0
        vehicleApi.setSteeringValue(steerVal, 0)
        vehicleApi.setSteeringValue(steerVal, 1)

        // Engine Force (Rear wheels: 2 and 3) - or AWD if you prefer
        let engineForce = 0
        if (moveForward) engineForce = -maxForce // Negative because z-forward is negative in Three.js usually, but check direction
        else if (backward) engineForce = maxForce

        vehicleApi.applyEngineForce(engineForce, 2)
        vehicleApi.applyEngineForce(engineForce, 3)

        // Simple braking if no input (optional)
        if (!moveForward && !backward) {
            vehicleApi.setBrake(10, 2)
            vehicleApi.setBrake(10, 3)
        } else {
            vehicleApi.setBrake(0, 2)
            vehicleApi.setBrake(0, 3)
        }
    })

    return (
        <group name="Kart">
            <mesh ref={chassisBody} castShadow>
                <boxGeometry args={[chassisWidth, chassisHeight, chassisLength]} />
                <meshStandardMaterial color="red" />
                {/* Driver / Cockpit visual */}
                <mesh position={[0, 0.25, -0.2]}>
                    <boxGeometry args={[0.5, 0.4, 0.8]} />
                    <meshStandardMaterial color="#222" />
                </mesh>
            </mesh>

            <Wheel ref={wheel1} position={[wheelSideOffset, wheelHeightOffset, wheelFrontOffset]} radius={wheelRadius} leftSide={true} />
            <Wheel ref={wheel2} position={[-wheelSideOffset, wheelHeightOffset, wheelFrontOffset]} radius={wheelRadius} leftSide={false} />
            <Wheel ref={wheel3} position={[wheelSideOffset, wheelHeightOffset, wheelBackOffset]} radius={wheelRadius} leftSide={true} />
            <Wheel ref={wheel4} position={[-wheelSideOffset, wheelHeightOffset, wheelBackOffset]} radius={wheelRadius} leftSide={false} />
        </group>
    )
}
