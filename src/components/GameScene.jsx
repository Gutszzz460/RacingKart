import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Sky, Environment } from '@react-three/drei'
import Kart from './Kart'
import TestTrack from './TestTrack'
import FollowCamera from './FollowCamera'

export default function GameScene() {
    return (
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
            <Suspense fallback={null}>
                <Environment preset="sunset" />
                <Sky sunPosition={[100, 10, 100]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} castShadow />

                <Physics broadphase="SAP" gravity={[0, -9.8, 0]}>
                    <Kart />
                    <TestTrack />
                </Physics>

                <FollowCamera />
            </Suspense>
        </Canvas>
    )
}
