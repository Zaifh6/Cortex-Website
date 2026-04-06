import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'

// Allocated once outside — no GC pressure per frame
const _mouseWorld = new THREE.Vector3()
const _inverseMatrix = new THREE.Matrix4()

const ParticleSphere = () => {
  const meshRef = useRef()
  const coreRef = useRef()
  const glowRef = useRef()
  const { mouse } = useThree()

  const particleCount = 7500
  const particles = useMemo(() => {
    const temp = []
    const radius = 1.5

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount)
      const theta = Math.sqrt(particleCount * Math.PI) * phi

      const r = radius * (0.999 + Math.random() * 0.002)

      const x = r * Math.cos(theta) * Math.sin(phi)
      const y = r * Math.sin(theta) * Math.sin(phi)
      const z = r * Math.cos(phi)

      temp.push({
        x, y, z,
        originalX: x,
        originalY: y,
        originalZ: z,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.02 + Math.random() * 0.04,
        size: Math.random() > 0.96 ? (0.003 + Math.random() * 0.004) : (0.001 + Math.random() * 0.0015),
        colorRandom: Math.random()
      })
    }
    return temp
  }, [])

  const { positions, colArray } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)

    particles.forEach((p, i) => {
      pos[i * 3] = p.x
      pos[i * 3 + 1] = p.y
      pos[i * 3 + 2] = p.z

      const t = Math.random()

      if (p.colorRandom > 0.92) {
        // Pure bright white highlights
        col[i * 3] = 1.0
        col[i * 3 + 1] = 1.0
        col[i * 3 + 2] = 1.0
      } else if (p.colorRandom > 0.6) {
        // Bright gray/mid-tone
        const val = 0.6 + t * 0.3
        col[i * 3] = val
        col[i * 3 + 1] = val
        col[i * 3 + 2] = val
      } else {
        // Subtle darker gray
        const val = 0.3 + t * 0.2
        col[i * 3] = val
        col[i * 3 + 1] = val
        col[i * 3 + 2] = val
      }
    })
    return { positions: pos, colArray: col }
  }, [particles])

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()
    const currentPositions = meshRef.current.geometry.attributes.position.array

    // Project NDC mouse → world space on the z=0 plane
    // camera is at z=5, fov=45 → half-height = tan(22.5°) * 5
    const camDist = 5
    const halfH = Math.tan((45 / 2) * (Math.PI / 180)) * camDist
    const halfW = halfH * (state.size.width / state.size.height)
    _mouseWorld.set(mouse.x * halfW, mouse.y * halfH, 0)

    // Bring mouse into mesh LOCAL space so rotation is fully accounted for
    _inverseMatrix.copy(meshRef.current.matrixWorld).invert()
    _mouseWorld.applyMatrix4(_inverseMatrix)

    meshRef.current.rotation.y = time * 0.006

    // ── Tuning knobs ──────────────────────────────────────────────────
    // interactionRadius > 3.0 covers full sphere interior + back surface
    // (sphere surface sits at r=1.5, diameter=3.0)
    const interactionRadius = 3.2

    // maxDisplace: how far a particle at cursor center gets pushed (local units)
    // 1.4 = very visible distortion, sphere shape breaks open nicely
    const maxDisplace = 1.4
    // ─────────────────────────────────────────────────────────────────

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i]

      // Idle micro-float — unchanged from original
      const idleX = Math.sin(time * p.floatSpeed + p.floatOffset) * 0.008
      const idleY = Math.cos(time * p.floatSpeed + p.floatOffset) * 0.008
      const idleZ = Math.sin(time * p.floatSpeed * 0.8 + p.floatOffset) * 0.008

      // Always use CURRENT position so already-displaced particles get
      // pushed further — creates the "bubble moving through sphere" feel
      const px = currentPositions[i * 3]
      const py = currentPositions[i * 3 + 1]
      const pz = currentPositions[i * 3 + 2]

      // Direction: mouse → particle (positive = away from mouse = repulsion)
      const dx = px - _mouseWorld.x
      const dy = py - _mouseWorld.y
      const dz = pz - _mouseWorld.z
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

      let repelX = 0, repelY = 0, repelZ = 0

      if (dist < interactionRadius && dist > 0.0001) {
        const invDist = 1 / dist
        const nx = dx * invDist   // normalized push direction
        const ny = dy * invDist
        const nz = dz * invDist

        // Cubic falloff: t=1 at cursor, t=0 at radius edge — no hard cutoff
        const t = 1.0 - (dist / interactionRadius)
        const force = t * t * t * maxDisplace

        repelX = nx * force
        repelY = ny * force
        repelZ = nz * force
      }

      // Target = original resting spot + idle float + repulsion offset
      const tx = p.originalX + idleX + repelX
      const ty = p.originalY + idleY + repelY
      const tz = p.originalZ + idleZ + repelZ

      // Fast push (0.20), smooth elastic return to origin (0.12)
      const easing = (repelX !== 0 || repelY !== 0 || repelZ !== 0) ? 0.20 : 0.12

      currentPositions[i * 3] += (tx - currentPositions[i * 3]) * easing
      currentPositions[i * 3 + 1] += (ty - currentPositions[i * 3 + 1]) * easing
      currentPositions[i * 3 + 2] += (tz - currentPositions[i * 3 + 2]) * easing
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <group>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particleCount} array={colArray} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

export default ParticleSphere
