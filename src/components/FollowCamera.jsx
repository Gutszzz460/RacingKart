import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

export default function FollowCamera({ target }) {
    const currentPosition = useRef(new Vector3())
    const currentLookAt = useRef(new Vector3())

    useFrame(({ camera, scene }) => {
        // Try to find the 3D kart first, then fallback to simple Kart box
        const targetObj = scene.getObjectByName('kart') || scene.getObjectByName('Chassis') || scene.getObjectByName('Kart')

        if (targetObj) {
            const targetPos = targetObj.position
            const targetRot = targetObj.rotation

            // Calculate desired camera position (behind and above)
            const offset = new Vector3(0, 5, 10)
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
