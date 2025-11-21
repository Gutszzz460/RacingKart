import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

export default function FollowCamera({ target }) {
    const cameraRef = useRef()
    const currentPosition = useRef(new Vector3())
    const currentLookAt = useRef(new Vector3())

    useFrame(({ camera, scene }) => {
        // Find the kart in the scene if target is not provided directly
        // For now, we assume the kart is at the center or we can find it by name if we name it
        // But a better way is to pass the kart's ref or position. 
        // Since we don't have the kart's ref here easily without context, 
        // let's assume the camera follows a specific object name or we pass a ref via a store or context.

        // However, simpler approach for now: 
        // The Kart component updates the store with its position? 
        // Or we can just make the camera a child of the Kart? No, that's rigid.

        // Let's try to find the object by name for this simple version
        const kart = scene.getObjectByName('Kart')

        if (kart) {
            const targetPos = kart.position
            const targetRot = kart.rotation

            // Calculate desired camera position (behind and above)
            // This is a very basic follow. 
            // We need the kart's forward vector to know where "behind" is.

            const offset = new Vector3(0, 5, 10)
            // Ideally we rotate this offset by the kart's rotation
            offset.applyEuler(targetRot)

            const desiredPosition = new Vector3()
            desiredPosition.copy(targetPos).add(offset)

            // Lerp camera position
            currentPosition.current.lerp(desiredPosition, 0.1)
            camera.position.copy(currentPosition.current)

            // Look at kart
            currentLookAt.current.lerp(targetPos, 0.1)
            camera.lookAt(currentLookAt.current)
        }
    })

    return null
}
