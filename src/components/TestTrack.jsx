import React from 'react'
import { usePlane, useBox } from '@react-three/cannon'
import useGameStore from '../game/useGameStore'
import ItemBox from './ItemBox'

const Checkpoint = ({ position, index, args = [10, 5, 1] }) => {
    const passCheckpoint = useGameStore(state => state.passCheckpoint)

    useBox(() => ({
        isTrigger: true,
        position,
        args,
        onCollide: (e) => {
            if (e.body.name === 'Kart') {
                passCheckpoint(index)
            }
        }
    }))

    return (
        <mesh position={position}>
            <boxGeometry args={args} />
            <meshStandardMaterial color="yellow" transparent opacity={0.3} />
        </mesh>
    )
}

export default function TestTrack() {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.5, 0],
        type: 'Static'
    }))

    return (
        <group>
            <mesh ref={ref} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#444" />
            </mesh>

            {/* Checkpoints placed in a loop */}
            <Checkpoint position={[0, 2, -20]} index={1} />
            <Checkpoint position={[20, 2, 0]} index={2} />
            <Checkpoint position={[0, 2, 20]} index={3} />
            <Checkpoint position={[-20, 2, 0]} index={0} /> {/* Start/Finish */}

            {/* Item Boxes */}
            <ItemBox position={[0, 1, -10]} />
            <ItemBox position={[10, 1, 0]} />
            <ItemBox position={[0, 1, 10]} />
        </group>
    )
}
