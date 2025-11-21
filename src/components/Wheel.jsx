import React, { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

// Simple wheel component - just a cylinder for now
// We can replace this with a proper 3D model later
const Wheel = forwardRef(({ radius = 0.35, leftSide = false, ...props }, ref) => {
    return (
        <group ref={ref} {...props}>
            <mesh rotation={[0, 0, -Math.PI / 2]} castShadow>
                <cylinderGeometry args={[radius, radius, 0.25, 16]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            {/* Hubcap detail */}
            <mesh rotation={[0, 0, -Math.PI / 2]} position={[leftSide ? -0.13 : 0.13, 0, 0]}>
                <cylinderGeometry args={[radius * 0.5, radius * 0.5, 0.05, 8]} />
                <meshStandardMaterial color="#ddd" />
            </mesh>
        </group>
    )
})

export default Wheel
