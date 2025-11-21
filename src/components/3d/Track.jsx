import React, { useRef } from 'react'
import { usePlane, useBox } from '@react-three/cannon'
import * as THREE from 'three'

const Checkpoint = ({ position, onPass, id }) => {
    const [ref] = useBox(() => ({
        position,
        args: [10, 5, 1],
        isTrigger: true,
        onCollide: () => onPass(id)
    }))

    return (
        <mesh ref={ref} visible={false}>
            <boxGeometry args={[10, 5, 1]} />
            <meshBasicMaterial transparent opacity={0.3} color="yellow" />
        </mesh>
    )
}

const Track = ({ onCheckpointPass, onLapComplete }) => {
    // Ground Plane
    const [groundRef] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.5, 0],
        material: { friction: 0.3 }
    }))

    // Track boundaries - create walls around the track
    const createWall = (position, args) => {
        const [ref] = useBox(() => ({
            position,
            args,
            type: 'Static'
        }))
        return ref
    }

    return (
        <group>
            {/* Asphalt Track - Main racing surface */}
            <mesh ref={groundRef} receiveShadow>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial
                    color="#2a2a2a"
                    roughness={0.8}
                />
            </mesh>

            {/* Track markings - white lines */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, 0]}>
                <ringGeometry args={[28, 30, 64]} />
                <meshStandardMaterial color="white" />
            </mesh>

            {/* Start/Finish Line */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 30]}>
                <planeGeometry args={[10, 2]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 30]}>
                <planeGeometry args={[10, 0.5]} />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Checkpoints - invisible triggers */}
            {onCheckpointPass && (
                <>
                    <Checkpoint position={[30, 2, 0]} id={1} onPass={onCheckpointPass} />
                    <Checkpoint position={[0, 2, -30]} id={2} onPass={onCheckpointPass} />
                    <Checkpoint position={[-30, 2, 0]} id={3} onPass={onCheckpointPass} />
                    <Checkpoint position={[0, 2, 30]} id={4} onPass={onLapComplete} />
                </>
            )}

            {/* Outer barriers - cartoonish walls */}
            {[
                // Outer ring
                { pos: [0, 1, 50], args: [100, 3, 2] },
                { pos: [0, 1, -50], args: [100, 3, 2] },
                { pos: [50, 1, 0], args: [2, 3, 100] },
                { pos: [-50, 1, 0], args: [2, 3, 100] },
            ].map((wall, i) => (
                <mesh key={i} position={wall.pos} castShadow>
                    <boxGeometry args={wall.args} />
                    <meshStandardMaterial color="#ff6b6b" roughness={0.5} />
                </mesh>
            ))}

            {/* Grass Environment */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
                <planeGeometry args={[400, 400]} />
                <meshStandardMaterial color="#4caf50" />
            </mesh>

            {/* Decorative elements - cartoonish trees */}
            {[
                [-60, 0, -60], [-60, 0, 60], [60, 0, -60], [60, 0, 60],
                [-70, 0, 0], [70, 0, 0], [0, 0, -70], [0, 0, 70]
            ].map((pos, i) => (
                <group key={`tree-${i}`} position={pos}>
                    {/* Tree trunk */}
                    <mesh position={[0, 2, 0]}>
                        <cylinderGeometry args={[0.5, 0.7, 4]} />
                        <meshStandardMaterial color="#8b4513" />
                    </mesh>
                    {/* Tree foliage */}
                    <mesh position={[0, 5, 0]}>
                        <sphereGeometry args={[2.5, 8, 8]} />
                        <meshStandardMaterial color="#2d5016" />
                    </mesh>
                </group>
            ))}

            {/* Item boxes - floating power-up boxes */}
            {[
                [15, 2, 15], [-15, 2, 15], [15, 2, -15], [-15, 2, -15],
                [25, 2, 0], [-25, 2, 0], [0, 2, 25], [0, 2, -25]
            ].map((pos, i) => (
                <mesh key={`item-${i}`} position={pos}>
                    <boxGeometry args={[1.5, 1.5, 1.5]} />
                    <meshStandardMaterial
                        color="#ffd700"
                        emissive="#ffaa00"
                        emissiveIntensity={0.5}
                    />
                </mesh>
            ))}
        </group>
    )
}

export default Track
