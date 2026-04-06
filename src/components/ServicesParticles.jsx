import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'

const _mouseWorld = new THREE.Vector3()
const _inverseMatrix = new THREE.Matrix4()

// Reference: soft “stardust” volume — thicker stroke = halo + many fine dots.
const JITTER = 0.018
const EDGE_SPRAY = 0.072
// World-space size of the icon — slightly smaller than before.
const SHAPE_SCALE = 1.58

/** Builds a fluffy, thicker particle band (like reference glow / fuzzy edges). */
function densifyStroke(pts) {
  const out = []
  for (const p of pts) {
    out.push(p)
    if (Math.random() < 0.58) {
      out.push([
        p[0] + (Math.random() - 0.5) * 0.019,
        p[1] + (Math.random() - 0.5) * 0.019,
        p[2] + (Math.random() - 0.5) * 0.014,
      ])
    }
    const a1 = Math.random() * Math.PI * 2
    const r1 = 0.032 + Math.random() * 0.048
    out.push([
      p[0] + Math.cos(a1) * r1,
      p[1] + Math.sin(a1) * r1,
      p[2] + (Math.random() - 0.5) * 0.018,
    ])
    if (Math.random() < 0.72) {
      const a2 = Math.random() * Math.PI * 2
      const r2 = 0.024 + Math.random() * 0.036
      out.push([
        p[0] + Math.cos(a2) * r2,
        p[1] + Math.sin(a2) * r2,
        p[2] + (Math.random() - 0.5) * 0.016,
      ])
    }
    if (Math.random() < 0.42) {
      const a3 = Math.random() * Math.PI * 2
      const r3 = 0.040 + Math.random() * 0.034
      out.push([
        p[0] + Math.cos(a3) * r3,
        p[1] + Math.sin(a3) * r3,
        p[2] + (Math.random() - 0.5) * 0.014,
      ])
    }
  }
  return out
}

// ── Shape generators ─────────────────────────────────────────────────
function generateShape(shape) {
  const pts = []

  const scatter = (x, y, z = 0, spread = JITTER) => {
    pts.push([
      x + (Math.random() - 0.5) * spread,
      y + (Math.random() - 0.5) * spread,
      z + (Math.random() - 0.5) * spread,
    ])
  }

  /** Extra faint samples near a point (reads as “particle spray” at edges). */
  const spray = (x, y, count = 4) => {
    for (let i = 0; i < count; i++) scatter(x, y, 0, EDGE_SPRAY)
  }

  const sprayZ = (x, y, z, count = 4) => {
    for (let i = 0; i < count; i++) scatter(x, y, z, EDGE_SPRAY)
  }

  const line = (x1, y1, x2, y2, n = 96) => {
    for (let i = 0; i <= n; i++) {
      const t = i / n
      const x = x1 + (x2 - x1) * t
      const y = y1 + (y2 - y1) * t
      scatter(x, y)
      if (i === 0 || i === n) spray(x, y, 4)
    }
  }

  const arc = (cx, cy, rx, ry, startA, endA, n = 110) => {
    for (let i = 0; i <= n; i++) {
      const a = startA + (endA - startA) * (i / n)
      const x = cx + Math.cos(a) * rx
      const y = cy + Math.sin(a) * ry
      scatter(x, y)
      if (i === 0 || i === n) spray(x, y, 3)
    }
  }

  /** Bold stroke: several parallel copies of the segment (chevrons, brackets). */
  const thickLine = (x1, y1, x2, y2, n = 96, halfWidth = 0.05) => {
    const dx = x2 - x1
    const dy = y2 - y1
    const len = Math.hypot(dx, dy) || 1
    const nx = (-dy / len) * halfWidth
    const ny = (dx / len) * halfWidth
    for (let s = -2; s <= 2; s++) {
      const f = s / 2
      line(x1 + nx * f, y1 + ny * f, x2 + nx * f, y2 + ny * f, n)
    }
  }

  const arcZ = (cx, cy, rx, ry, startA, endA, z0, n = 110) => {
    for (let i = 0; i <= n; i++) {
      const a = startA + (endA - startA) * (i / n)
      const x = cx + Math.cos(a) * rx
      const y = cy + Math.sin(a) * ry
      scatter(x, y, z0, JITTER * 1.08)
      if (i === 0 || i === n) sprayZ(x, y, z0, 3)
    }
  }

  switch (shape) {

    case 'gear': {
      const teeth = 12
      const baseR = 0.8
      const outerR = 0.98
      const innerR = 0.45
      const holeR = 0.15

      // Proper gear teeth: flat tops and flat bottoms
      const samples = 800
      for (let i = 0; i <= samples; i++) {
        const a = (i / samples) * Math.PI * 2
        const segment = (a * teeth) / (Math.PI * 2)
        const frac = segment - Math.floor(segment)

        let r = baseR
        if (frac < 0.45) {
          r = outerR // Tooth top
        } else if (frac < 0.5) {
          // Transition up (optional, keeping it sharp for now)
          r = baseR + (outerR - baseR) * ((frac - 0.45) / 0.05)
        } else if (frac < 0.95) {
          r = baseR // Tooth bottom
        } else {
          // Transition down
          r = outerR - (outerR - baseR) * ((frac - 0.95) / 0.05)
        }

        // Slightly simplify transition for cleaner mechanical look
        // We'll use a more square-ish wave
        const toothWidth = 0.4 // 40% of segment is tooth top
        const transitionWidth = 0.05

        let finalR = baseR
        if (frac < toothWidth) {
          finalR = outerR
        } else if (frac < toothWidth + transitionWidth) {
          finalR = outerR - (outerR - baseR) * ((frac - toothWidth) / transitionWidth)
        } else if (frac < 1 - transitionWidth) {
          finalR = baseR
        } else {
          finalR = baseR + (outerR - baseR) * ((frac - (1 - transitionWidth)) / transitionWidth)
        }

        scatter(Math.cos(a) * finalR, Math.sin(a) * finalR)
      }

      arc(0, 0, innerR, innerR, 0, Math.PI * 2, 120)
      arc(0, 0, holeR, holeR, 0, Math.PI * 2, 40)

      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2
        const c = Math.cos(a)
        const s = Math.sin(a)
        line(c * holeR * 1.5, s * holeR * 1.5, c * (innerR - 0.05), s * (innerR - 0.05), 30)
      }

      break
    }

    case 'robot': {
      const t = 0.8
      const w = 0.52 * t
      const top = 0.65 * t
      const bot = -0.1 * t

      // Head/Body outline
      line(-w, top, w, top, 40)
      line(-w, top, -w, bot, 35)
      line(w, top, w, bot, 35)
      line(-w, bot, w, bot, 40)

      // Neck & Torso suggestion
      line(-0.2 * t, bot, -0.2 * t, -0.25 * t, 10)
      line(0.2 * t, bot, 0.2 * t, -0.25 * t, 10)
      line(-0.45 * t, -0.25 * t, 0.45 * t, -0.25 * t, 35)

      // Eyes (more detailed)
      const eyeR = 0.08 * t
      arc(-0.2 * t, 0.35 * t, eyeR, eyeR, 0, Math.PI * 2, 24)
      arc(0.2 * t, 0.35 * t, eyeR, eyeR, 0, Math.PI * 2, 24)
      // Pupils or inner rings
      const pupR = 0.02 * t
      arc(-0.2 * t, 0.35 * t, pupR, pupR, 0, Math.PI * 2, 12)
      arc(0.2 * t, 0.35 * t, pupR, pupR, 0, Math.PI * 2, 12)

      // Mouth
      line(-0.12 * t, 0.12 * t, 0.12 * t, 0.12 * t, 12)

      // Antenna
      line(0, top, 0, 0.85 * t, 12)
      arc(0, 0.92 * t, 0.04 * t, 0.04 * t, 0, Math.PI * 2, 16)

      break
    }

    case 'code': {
      // < / > — Pro-style brackets and central slash
      const y0 = 0.75
      const y1 = -0.75
      const tipL = -0.75 // Slightly wider
      const tipR = 0.75 // Slightly wider
      const innerL = -0.28 // Slightly wider gap
      const innerR = 0.28 // Slightly wider gap

      // Left bracket <
      thickLine(innerL, y0 * 0.75, tipL, 0, 112, 0.05)
      thickLine(tipL, 0, innerL, y1 * 0.75, 112, 0.05)

      // Right bracket >
      thickLine(innerR, y0 * 0.75, tipR, 0, 112, 0.05)
      thickLine(tipR, 0, innerR, y1 * 0.75, 112, 0.05)

      // Central slash / (slightly narrower at top/bottom)
      thickLine(0.12, 0.85, -0.12, -0.85, 120, 0.045)

      break
    }

    case 'chart': {
      // Professional analytics: Axis + 3 bars + growth curve
      const base = -0.6
      const leftAxis = -0.85
      const rightAxis = 0.85
      const topAxis = 0.8

      // Axis lines
      line(leftAxis, base, rightAxis, base, 64) // X
      line(leftAxis, base, leftAxis, topAxis, 64) // Y

      const bw = 0.28
      const bars = [
        { cx: -0.5, h: 0.35 },
        { cx: -0.1, h: 0.55 },
        { cx: 0.3, h: 0.85 },
      ]

      bars.forEach(({ cx, h }) => {
        const l = cx - bw / 2
        const r = cx + bw / 2
        const t = base + h
        line(l, base, l, t, 48)
        line(r, base, r, t, 48)
        line(l, t, r, t, 32)
        // Shading / inner lines
        for (let s = 1; s < 4; s++) {
          const x = l + (r - l) * (s / 4)
          line(x, base, x, t, 32)
        }
      })

      // Dynamic growth curve (curved trend)
      // arc(0, 0, 1.2, 0.9, Math.PI * 0.95, Math.PI * 1.35, 120) // REMOVED as per feedback
      // Transitioning arc to a more manual "growth" line for precision
      for (let i = 0; i <= 80; i++) {
        const t = i / 80
        const x = -0.85 + 1.7 * t
        const y = base + 0.1 + Math.pow(t, 2) * 1.2
        scatter(x, y, 0, JITTER * 1.5)
        if (i % 20 === 0) spray(x, y, 6) // Data points
      }

      break
    }

    case 'cloud': {
      // Volumetric cloud: multiple overlapping arcs + internal spray for density
      const zBack = -0.1
      const zMid = 0
      const zFront = 0.1

      // Bottom line
      line(-0.85, -0.2, 0.85, -0.2, 100)

      // Layered puffs
      arcZ(-0.55, 0.05, 0.4, 0.32, 0.15 * Math.PI, 1.0 * Math.PI, zBack, 100)
      arcZ(0.55, 0.02, 0.38, 0.3, 0.2 * Math.PI, 1.05 * Math.PI, zBack, 100)

      arcZ(-0.1, 0.1, 0.5, 0.35, 0.1 * Math.PI, 0.9 * Math.PI, zMid, 120)
      arcZ(0.2, 0.25, 0.45, 0.35, 0.05 * Math.PI, 0.95 * Math.PI, zFront, 120)

      arcZ(0.4, -0.05, 0.3, 0.25, 0.35 * Math.PI, 0.85 * Math.PI, zMid, 60)

      // Internal "fill" for volume
      for (let j = 0; j < 15; j++) {
        const x = (Math.random() - 0.5) * 1.4
        const y = (Math.random() - 0.5) * 0.4 + 0.1
        const z = (Math.random() - 0.5) * 0.15
        sprayZ(x, y, z, 3)
      }

      break
    }

    case 'brackets': {
      const scale = 0.95
      const left = [
        [-0.5, 0.9],
        [-0.35, 0.9],
        [-0.35, 0.7],
        [-0.22, 0.52],
        [-0.22, 0.22],
        [-0.42, 0.0],
        [-0.22, -0.22],
        [-0.22, -0.52],
        [-0.35, -0.7],
        [-0.35, -0.9],
        [-0.5, -0.9],
      ].map(([x, y]) => [x * scale, y * scale])

      for (let i = 0; i < left.length - 1; i++) {
        thickLine(left[i][0], left[i][1], left[i + 1][0], left[i + 1][1], 62, 0.045)
      }

      const right = left.map(([x, y]) => [-x, y])
      for (let i = 0; i < right.length - 1; i++) {
        thickLine(right[i][0], right[i][1], right[i + 1][0], right[i + 1][1], 62, 0.045)
      }

      // Cursor detail removed as per feedback
      // thickLine(-0.15, -0.15, 0.15, -0.15, 40, 0.03)

      break
    }

    default:
      arc(0, 0, 1.1, 1.1, 0, Math.PI * 2, 280)
  }

  return densifyStroke(pts).map((p) => [
    p[0] * SHAPE_SCALE,
    p[1] * SHAPE_SCALE,
    p[2] * SHAPE_SCALE,
  ])
}

// ── Particle mesh ─────────────────────────────────────────────────────
const ServiceParticles = ({ shape }) => {
  const meshRef = useRef()
  const { mouse, size, camera } = useThree()

  // Re-generate every time shape changes (key prop on Canvas handles unmount)
  const { positions, colors, meta } = useMemo(() => {
    const rawPts = generateShape(shape)
    const count = rawPts.length
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const metaArr = rawPts.map((p, i) => {
      pos[i * 3] = p[0]
      pos[i * 3 + 1] = p[1]
      pos[i * 3 + 2] = p[2]

      const b = 0.55 + Math.random() * 0.45
      col[i * 3] = b
      col[i * 3 + 1] = b
      col[i * 3 + 2] = b

      return {
        ox: p[0], oy: p[1], oz: p[2],
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.012 + Math.random() * 0.022,
      }
    })

    return { positions: pos, colors: col, meta: metaArr }
  }, [shape])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    const cur = meshRef.current.geometry.attributes.position.array

    let halfW
    let halfH
    if (camera.isOrthographicCamera) {
      halfW = (camera.right - camera.left) / (2 * camera.zoom)
      halfH = (camera.top - camera.bottom) / (2 * camera.zoom)
    } else {
      const camDist = Math.abs(camera.position.z)
      const fovRad = (camera.fov * Math.PI) / 180
      halfH = Math.tan(fovRad / 2) * camDist
      halfW = halfH * (size.width / size.height)
    }
    _mouseWorld.set(mouse.x * halfW, mouse.y * halfH, 0)
    _inverseMatrix.copy(meshRef.current.matrixWorld).invert()
    _mouseWorld.applyMatrix4(_inverseMatrix)

    const interactionRadius = 0.45
    const maxDisplace = 0.24

    for (let i = 0; i < meta.length; i++) {
      const m = meta[i]

      const idleX = Math.sin(time * m.floatSpeed + m.floatOffset) * 0.007
      const idleY = Math.cos(time * m.floatSpeed * 1.03 + m.floatOffset) * 0.007

      const px = cur[i * 3]
      const py = cur[i * 3 + 1]
      const pz = cur[i * 3 + 2]

      const dx = px - _mouseWorld.x
      const dy = py - _mouseWorld.y
      const dz = pz - _mouseWorld.z
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

      let repelX = 0, repelY = 0, repelZ = 0

      if (dist < interactionRadius && dist > 0.0001) {
        const inv = 1 / dist
        const t = 1 - dist / interactionRadius
        const force = t * t * t * maxDisplace
        repelX = dx * inv * force
        repelY = dy * inv * force
        repelZ = dz * inv * force
      }

      const tx = m.ox + idleX + repelX
      const ty = m.oy + idleY + repelY
      const tz = m.oz + repelZ
      const easing = (repelX || repelY || repelZ) ? 0.18 : 0.06

      cur[i * 3] += (tx - cur[i * 3]) * easing
      cur[i * 3 + 1] += (ty - cur[i * 3 + 1]) * easing
      cur[i * 3 + 2] += (tz - cur[i * 3 + 2]) * easing
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <group position={[0, -0.12, 0]}>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={meta.length}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={meta.length}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.023}
          vertexColors
          transparent
          opacity={0.94}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

export default ServiceParticles