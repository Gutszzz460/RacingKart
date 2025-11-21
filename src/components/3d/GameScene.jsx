import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Sky, Environment, PerspectiveCamera } from '@react-three/drei'
import Kart from './Kart'
import Track from './Track'
import * as THREE from 'three'

// Follow camera that tracks the kart
const FollowCamera = ({ target }) => {
    const cameraRef = useRef()

    useFrame(({ camera }) => {
        if (!target.current) return

        // Get kart position
        const kartPos = target.current.position

        // Camera follows behind and above the kart
        const offset = new THREE.Vector3(0, 5, 10)
        const targetPos = new THREE.Vector3(kartPos.x, kartPos.y, kartPos.z).add(offset)

        // Smooth camera movement
        camera.position.lerp(targetPos, 0.1)
        camera.lookAt(kartPos.x, kartPos.y + 1, kartPos.z)
    })

    return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 5, 10]} fov={60} />
}

const GameScene = ({ onCheckpointPass, onLapComplete, onPositionUpdate }) => {
    const kartRef = useRef()

    return (
        <Canvas shadows>
            <FollowCamera target={kartRef} />

            {/* Enhanced Lighting */}
            <Sky sunPosition={[100, 20, 100]} />
            <ambientLight intensity={0.6} />
            <directionalLight
                position={[50, 50, 25]}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
            />
            <hemisphereLight args={['#87CEEB', '#4caf50', 0.6]} />

            {/* Fog for depth */}
            <fog attach="fog" args={['#87CEEB', 50, 200]} />

            <Physics broadphase="SAP" gravity={[0, -9.8, 0]}>
                <Kart
                    ref={kartRef}
                    position={[0, 2, 28]}
                    isPlayer={true}
                    color="#ff0099"
                    onPositionUpdate={onPositionUpdate}
                />
                <Track
                    onCheckpointPass={onCheckpointPass}
                    onLapComplete={onLapComplete}
                />
            </Physics>

            {/* Environment for reflections */}
            <Environment preset="sunset" />
        </Canvas>
    )
}

export default GameScene
