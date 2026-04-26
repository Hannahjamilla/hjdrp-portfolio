'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { STOPS, TOTAL_STOPS } from './road-journey'
import JourneyOverlay from './journey-overlay'

const ROAD_LENGTH = 700
const CAM_START_X = -10
const CAM_END_X = ROAD_LENGTH - 60

// Create a winding road path with garage driveways
const roadPoints = []
// Driveway Start (Inside Garage)
roadPoints.push(new THREE.Vector3(-80, 0, 15))
roadPoints.push(new THREE.Vector3(-60, 0, 15))
roadPoints.push(new THREE.Vector3(-40, 0, 0))

for (let i = 0; i <= 20; i++) {
  const x = i * (ROAD_LENGTH / 20)
  const z = Math.sin(i * 0.6) * 12 + Math.cos(i * 0.3) * 8
  roadPoints.push(new THREE.Vector3(x, 0, z))
}

// Driveway End (Into Garage)
roadPoints.push(new THREE.Vector3(ROAD_LENGTH + 40, 0, 0))
roadPoints.push(new THREE.Vector3(ROAD_LENGTH + 60, 0, -15))
roadPoints.push(new THREE.Vector3(ROAD_LENGTH + 80, 0, -15))

const ROAD_CURVE = new THREE.CatmullRomCurve3(roadPoints)

// Camera view presets — [theta (horizontal°), phi (vertical°), radius, label]
const VIEWS = {
  follow: { theta: 0.3, phi: 0.35, radius: 18, label: 'Follow' },
  chase: { theta: 0, phi: 0.2, radius: 10, label: 'Chase' },
  bird: { theta: 0, phi: 1.4, radius: 35, label: "Bird's Eye" },
  side: { theta: 1.5, phi: 0.3, radius: 16, label: 'Side' },
  front: { theta: Math.PI, phi: 0.25, radius: 14, label: 'Front' },
  cockpit: { theta: 0, phi: 0.08, radius: 0.5, label: 'Cockpit' },
  orbit: { theta: 0, phi: 0.6, radius: 25, label: '360°' },
}

export default function RoadScene({ onProgressUpdate, activeStop, scrollProgress, isScrolling, stops }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const progressRef = useRef(0)
  const [cameraMode, setCameraMode] = useState('orbit')
  const [autoOrbit, setAutoOrbit] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Orbit state refs (not useState to avoid re-renders every frame)
  const orbitRef = useRef({ theta: VIEWS.orbit.theta, phi: VIEWS.orbit.phi, radius: VIEWS.orbit.radius })
  const isDragging = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })
  const carPosRef = useRef(new THREE.Vector3(0, 0, 2.2))
  const cameraRef = useRef(null)
  const hasInteracted = useRef(false)
  const autoOrbitRef = useRef(false) // Ref version for sync access in loop
  const waterMeshRef = useRef(null)

  useEffect(() => {
    autoOrbitRef.current = autoOrbit
  }, [autoOrbit])

  // Switch to a preset view
  const switchView = useCallback((mode) => {
    const view = VIEWS[mode]
    if (!view) return
    setCameraMode(mode)
    setAutoOrbit(false) // Never auto-orbit
    gsap.to(orbitRef.current, {
      theta: view.theta,
      phi: view.phi,
      radius: view.radius,
      duration: 1.2,
      ease: 'power3.inOut',
    })
  }, [])

  useEffect(() => {
    // Mobile detection
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0)

    if (typeof window === 'undefined') return
    const canvas = canvasRef.current
    if (!canvas) return

    // Lock page
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.documentElement.style.height = '100%'
    document.body.style.height = '100%'
    document.body.style.margin = '0'
    document.body.style.background = '#87CEEB'

    /* ─── RENDERER ─── */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', logarithmicDepthBuffer: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    /* ─── SCENE ─── */
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#87CEEB')
    scene.fog = new THREE.FogExp2('#b8d4e8', 0.003)

    /* ─── CAMERA ─── */
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1.0, 2000)
    camera.position.set(CAM_START_X, 4.5, 14)
    cameraRef.current = camera

    const startTime = performance.now()
    function getElapsedTime() { return (performance.now() - startTime) / 1000 }

    /* ─── LIGHTS ─── */
    scene.add(new THREE.AmbientLight(0xfff5e6, 0.7))
    const sun = new THREE.DirectionalLight(0xfff5e6, 1.5)
    sun.position.set(60, 100, 40)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    sun.shadow.bias = -0.001
    sun.shadow.normalBias = 0.05 // Prevents acne on large planes
    sun.shadow.camera.left = -150
    sun.shadow.camera.right = 150
    sun.shadow.camera.top = 150
    sun.shadow.camera.bottom = -150
    sun.shadow.camera.far = 500
    scene.add(sun)

    /* ─── BIOME GROUNDS ─── */
    // Divide ground into segments with different colors
    const biomeColors = ['#5AAF6E', '#2D5A27', '#666666', '#D6C5A1'] // Grass, Forest, City, Sand
    const segmentWidth = (ROAD_LENGTH + 400) / 4
    for (let i = 0; i < 4; i++) {
      const gGeo = new THREE.PlaneGeometry(segmentWidth, (ROAD_LENGTH + 400) * 2)
      const gMat = new THREE.MeshLambertMaterial({ color: biomeColors[i] })
      const g = new THREE.Mesh(gGeo, gMat)
      g.rotation.x = -Math.PI / 2
      g.position.set(i * segmentWidth + segmentWidth / 2 - 150, -0.05, 0)
      g.receiveShadow = true; scene.add(g)

      // Add "water" for the coastal biome (last segment)
      if (i === 3) {
        const wGeo = new THREE.PlaneGeometry(segmentWidth + 100, ROAD_LENGTH)
        const wMat = new THREE.MeshPhongMaterial({
          color: '#004466',
          transparent: true,
          opacity: 0.8,
          shininess: 100
        })
        const w = new THREE.Mesh(wGeo, wMat)
        w.rotation.x = -Math.PI / 2
        w.position.set(i * segmentWidth + segmentWidth / 2 + 30, -0.1, -60)
        scene.add(w)
        waterMeshRef.current = w // Need a ref to animate it
      }
    }

    /* ─── ROAD ─── */
    // Create road mesh using TubeGeometry scaled down in Y to be flat
    const roadGeo = new THREE.TubeGeometry(ROAD_CURVE, 256, 5.2, 4, false)
    const roadMat = new THREE.MeshStandardMaterial({
      color: '#1a1a1a',
      roughness: 0.8,
      metalness: 0.2,
      bumpScale: 0.05
    })
    const road = new THREE.Mesh(roadGeo, roadMat)
    road.scale.y = 0.02; road.position.y = 0.01; road.receiveShadow = true; scene.add(road)

    // White edge lines (using slightly narrower tubes)
    for (const offset of [-4.9, 4.9]) {
      const edgePoints = []
      for (let i = 0; i <= 128; i++) {
        const u = i / 128
        const p = ROAD_CURVE.getPointAt(u)
        const t = ROAD_CURVE.getTangentAt(u)
        const n = new THREE.Vector3(-t.z, 0, t.x).normalize()
        edgePoints.push(p.clone().add(n.multiplyScalar(offset)))
      }
      const edgeCurve = new THREE.CatmullRomCurve3(edgePoints)
      const edge = new THREE.Mesh(
        new THREE.TubeGeometry(edgeCurve, 128, 0.08, 4, false),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          polygonOffset: true,
          polygonOffsetFactor: -1,
          polygonOffsetUnits: -1
        })
      )
      edge.position.y = 0.04; scene.add(edge)

      // Reflective "Cat's Eyes" along the edge
      for (let j = 0; j < 60; j++) {
        const u = j / 60
        const p = edgeCurve.getPointAt(u)
        const reflector = new THREE.Mesh(
          new THREE.BoxGeometry(0.15, 0.1, 0.3),
          new THREE.MeshStandardMaterial({ color: offset > 0 ? 0xffffff : 0xff3333, emissive: offset > 0 ? 0xffffff : 0xff3333, emissiveIntensity: 2 })
        )
        reflector.position.copy(p); reflector.position.y = 0.1
        scene.add(reflector)
      }
    }

    // Center dashes (Neon)
    for (let i = 0; i < 120; i++) {
      const t = i / 120
      if (i % 2 === 0) {
        const p = ROAD_CURVE.getPointAt(t)
        const dash = new THREE.Mesh(
          new THREE.BoxGeometry(1.5, 0.05, 0.25),
          new THREE.MeshStandardMaterial({
            color: 0xFFDD57,
            emissive: 0xFFDD57,
            emissiveIntensity: 1.5,
            polygonOffset: true,
            polygonOffsetFactor: -2,
            polygonOffsetUnits: -1
          })
        )
        const tangent = ROAD_CURVE.getTangentAt(t)
        dash.position.copy(p); dash.position.y = 0.08
        dash.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent)
        scene.add(dash)
      }
    }

    /* ─── 3D CAR ─── */
    const carGroup = new THREE.Group()
    const bodyMat = new THREE.MeshLambertMaterial({ color: 0xE63946 })
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1, 1.6), bodyMat)
    body.position.y = 0.8; body.castShadow = true; carGroup.add(body)

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.9, 1.4), new THREE.MeshLambertMaterial({ color: 0xC1121F }))
    cabin.position.set(-0.1, 1.7, 0); cabin.castShadow = true; carGroup.add(cabin)

    // Windows
    const winMat = new THREE.MeshBasicMaterial({ color: 0xADE8F4, transparent: true, opacity: 0.85 })
    for (const [x, rotY] of [[0.9, Math.PI / 2], [-1.05, Math.PI / 2]]) {
      const w = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.7), winMat)
      w.position.set(x, 1.65, 0); w.rotation.y = rotY; carGroup.add(w)
    }
    for (const side of [-0.71, 0.71]) {
      const w = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.7), winMat)
      w.position.set(-0.1, 1.65, side); w.rotation.y = side > 0 ? 0 : Math.PI; carGroup.add(w)
    }

    // Headlights & taillights
    for (const z of [-0.55, 0.55]) {
      const hl = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.25, 0.3), new THREE.MeshBasicMaterial({ color: 0xFFD700 }))
      hl.position.set(1.65, 0.75, z); carGroup.add(hl)
      const tl = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.2, 0.25), new THREE.MeshBasicMaterial({ color: 0xff3333 }))
      tl.position.set(-1.65, 0.75, z); carGroup.add(tl)
    }

    // Wheels
    const wheels = []
    for (const [wx, wz] of [[1, 0.85], [1, -0.85], [-1, 0.85], [-1, -0.85]]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.25, 16), new THREE.MeshLambertMaterial({ color: 0x222222 }))
      wheel.rotation.x = Math.PI / 2; wheel.position.set(wx, 0.35, wz); wheel.castShadow = true

      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.26, 8), new THREE.MeshBasicMaterial({ color: 0x888888 }))
      // Hub is already in local space of wheel, so we only need to handle the relative rotation
      // Since wheel is rotated X: PI/2, its local Y is World Z. 
      // But we want hub to be on the face of the wheel.
      // If we add hub to wheel, its local (0,0,0) is wheel's center.
      wheel.add(hub)

      carGroup.add(wheel)
      wheels.push(wheel)
    }

    const startP = ROAD_CURVE.getPointAt(0)
    carGroup.position.set(startP.x, 0, startP.z)
    scene.add(carGroup)

    /* ─── SURPRISE: BIRD & TARPULIN ─── */
    const birdGroup = new THREE.Group()
    const birdBody = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.5), new THREE.MeshLambertMaterial({ color: '#444' }))
    birdGroup.add(birdBody)
    const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.05, 0.4), new THREE.MeshLambertMaterial({ color: '#666' }))
    wingL.position.set(0.4, 0, 0); birdGroup.add(wingL)
    const wingR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.05, 0.4), new THREE.MeshLambertMaterial({ color: '#666' }))
    wingR.position.set(-0.4, 0, 0); birdGroup.add(wingR)

    birdGroup.position.set(0, 15, 0); scene.add(birdGroup)

    /* ─── SCENERY GENERATION ─── */
    const tv = [{ trunk: 0x6B3A2A, leaf: 0x2D8A4E, h: 1 }, { trunk: 0x7A4030, leaf: 0x3DA85F, h: 1.3 }, { trunk: 0x5A3020, leaf: 0x48C25B, h: 0.8 }]
    function addTree(x, z, s = 1) {
      const v = tv[Math.floor(Math.random() * 3)]; const g = new THREE.Group()
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * s, 0.28 * s, 2.5 * s, 8), new THREE.MeshLambertMaterial({ color: v.trunk }))
      trunk.position.y = 1.25 * s; trunk.castShadow = true; g.add(trunk)
      for (let l = 0; l < 3; l++) {
        const leaf = new THREE.Mesh(new THREE.ConeGeometry((2 - l * 0.4) * s * v.h, (2.5 - l * 0.3) * s, 8), new THREE.MeshLambertMaterial({ color: v.leaf }))
        leaf.position.y = (2.5 + l * 1.2) * s; leaf.castShadow = true; g.add(leaf)
      }
      g.position.set(x, 0, z); g.rotation.y = Math.random() * Math.PI * 2; scene.add(g)
    }

    function addBuilding(x, z, w, h, d, baseColor) {
      const group = new THREE.Group()

      // High-end metallic building material
      const bodyMat = new THREE.MeshStandardMaterial({
        color: '#0a0a0a',
        roughness: 0.1,
        metalness: 0.9
      })

      // Main Block
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), bodyMat)
      m.position.y = h / 2; m.castShadow = true; m.receiveShadow = true; group.add(m)

      // Tiered Top (Skyscraper look)
      if (h > 20) {
        const tW = w * 0.7, tH = h * 0.2, tD = d * 0.7
        const top = new THREE.Mesh(new THREE.BoxGeometry(tW, tH, tD), bodyMat)
        top.position.y = h + tH / 2; group.add(top)

        // Antenna
        const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 6), new THREE.MeshStandardMaterial({ color: '#333', metalness: 1 }))
        ant.position.y = h + tH + 3; group.add(ant)

        // Blinking Aviation Light
        const light = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), new THREE.MeshBasicMaterial({ color: '#ff0000' }))
        light.position.y = h + tH + 6; group.add(light)
      }

      // Neon Corner Strips
      const neonColors = ['#E63946', '#FFD700', '#00F5FF']
      const nColor = neonColors[Math.floor(Math.random() * neonColors.length)]
      for (const sx of [-1, 1]) {
        for (const sz of [-1, 1]) {
          const strip = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, h, 0.15),
            new THREE.MeshStandardMaterial({ color: nColor, emissive: nColor, emissiveIntensity: 2 })
          )
          strip.position.set(sx * (w / 2 + 0.1), h / 2, sz * (d / 2 + 0.1)); group.add(strip)
        }
      }

      // Windows (Emissive)
      const winMat = new THREE.MeshStandardMaterial({
        color: '#fff', emissive: '#fff', emissiveIntensity: 1.5
      })
      const rows = Math.floor(h / 2.5), cols = Math.floor(w / 1.8)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > 0.5) { // Randomly lit windows
            const win = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.6), winMat)
            // Front and Back
            for (const sz of [-1, 1]) {
              const wf = win.clone()
              wf.position.set(-w / 2 + c * 1.8 + 0.9, r * 2.5 + 1.5, sz * (d / 2 + 0.05))
              if (sz < 0) wf.rotation.y = Math.PI
              group.add(wf)
            }
          }
        }
      }

      group.position.set(x, 0, z); scene.add(group)
    }

    /* ─── ADD HOUSE WITH GARAGE ─── */
    const garageDoors = []
    function addHouse(p, side, isEnd = false) {
      const hGroup = new THREE.Group()

      // Materials
      const wallMat = new THREE.MeshStandardMaterial({ color: '#f0f0f0', roughness: 0.5 })
      const roofMat = new THREE.MeshStandardMaterial({ color: '#E63946', roughness: 0.3, metalness: 0.2 })
      const woodMat = new THREE.MeshStandardMaterial({ color: '#3d2b1f', roughness: 0.8 })
      const windowMat = new THREE.MeshStandardMaterial({ color: '#fff', emissive: '#F1C40F', emissiveIntensity: 2 })

      // 1. Foundation / Deck
      const deck = new THREE.Mesh(new THREE.BoxGeometry(20, 0.5, 20), woodMat)
      deck.position.y = 0.3; hGroup.add(deck) // Slightly higher

      // 1b. Driveway (Connecting to road)
      const driveGeo = new THREE.BoxGeometry(10, 0.1, 15)
      const driveMat = new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.9 })
      const driveway = new THREE.Mesh(driveGeo, driveMat)
      driveway.position.set(0, 0.15, -side * 14); hGroup.add(driveway) // Slightly higher

      // 2. Main Body
      const houseHeight = isEnd ? 18 : 12
      const body = new THREE.Mesh(new THREE.BoxGeometry(15, houseHeight, 15), wallMat)
      body.position.y = houseHeight / 2; hGroup.add(body)

      // 3. Roof
      const roofBase = new THREE.Mesh(new THREE.BoxGeometry(17, 1, 17), roofMat)
      roofBase.position.y = houseHeight; hGroup.add(roofBase)
      const roofTop = new THREE.Mesh(new THREE.ConeGeometry(12, 6, 4), roofMat)
      roofTop.position.y = houseHeight + 3; roofTop.rotation.y = Math.PI / 4; hGroup.add(roofTop)

      // 4. Chimney
      const chimney = new THREE.Mesh(new THREE.BoxGeometry(2, houseHeight * 0.7, 2), wallMat)
      chimney.position.set(-5, houseHeight, -5); hGroup.add(chimney)

      // 5. Balcony
      const balconyY = houseHeight > 15 ? 12 : 7
      const balc = new THREE.Mesh(new THREE.BoxGeometry(16, 0.5, 4), woodMat)
      balc.position.set(0, balconyY, 8); hGroup.add(balc)
      // Railing
      const railMat = new THREE.MeshStandardMaterial({ color: '#333', metalness: 0.8 })
      for (let i = 0; i < 6; i++) {
        const r = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.5, 0.2), railMat)
        r.position.set(-7 + i * 2.8, balconyY + 1.25, 10); hGroup.add(r)
      }
      const topRail = new THREE.Mesh(new THREE.BoxGeometry(16, 0.2, 0.2), railMat)
      topRail.position.set(0, balconyY + 2.5, 10); hGroup.add(topRail)

      // 6. Windows with Frames
      const winRows = isEnd ? 3 : 2
      for (let r = 0; r < winRows; r++) {
        for (let i = 0; i < 2; i++) {
          const wGroup = new THREE.Group()
          const win = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), windowMat)
          if (isEnd) win.material = new THREE.MeshStandardMaterial({ color: '#fff', emissive: '#00F5FF', emissiveIntensity: 3 })
          win.position.z = 0.1; // Window glass is forward
          wGroup.add(win)
          // Frame
          const frame = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.4, 0.2), new THREE.MeshStandardMaterial({ color: '#222' }))
          frame.position.z = 0.05; // Frame is behind glass but in front of wall
          wGroup.add(frame)

          // Front
          const wf = wGroup.clone()
          wf.position.set(-4 + i * 8, 3 + r * 5, 7.55); hGroup.add(wf) // Wall is 7.5, so 0.05 clear
          // Side
          const ws = wGroup.clone(); ws.rotation.y = Math.PI / 2
          ws.position.set(7.55, 3 + r * 5, -4 + i * 8); hGroup.add(ws)
        }
      }

      // 7. Main Door
      const door = new THREE.Mesh(new THREE.BoxGeometry(3, 6, 0.5), woodMat)
      door.position.set(side * 4, 3, 7.6); hGroup.add(door) // 0.1 clear of wall

      // 8. Garage Extension
      const gExt = new THREE.Mesh(new THREE.BoxGeometry(12, 8, 12), wallMat)
      gExt.position.set(0, 4, -side * 9); hGroup.add(gExt)

      // 9. Garage Door
      const gDoor = new THREE.Mesh(new THREE.PlaneGeometry(9, 6.5), new THREE.MeshStandardMaterial({
        color: '#111',
        emissive: isEnd ? '#00F5FF' : '#444',
        emissiveIntensity: 0.2,
        metalness: 0.9,
        roughness: 0.1
      }))
      gDoor.position.set(0, 3.5, -side * 15.1); hGroup.add(gDoor) // Clear of extension
      garageDoors.push({ mesh: gDoor, isEnd })

      // 10. Landscaping (Shrubs)
      const shrubGeo = new THREE.SphereGeometry(1.5, 8, 8)
      const shrubMat = new THREE.MeshLambertMaterial({ color: '#1B4D3E' })
      for (let i = 0; i < 8; i++) {
        const s = new THREE.Mesh(shrubGeo, shrubMat)
        const angle = (i / 8) * Math.PI * 2
        s.position.set(Math.cos(angle) * 9, 0.6, Math.sin(angle) * 9)
        s.scale.y = 0.6; hGroup.add(s)
      }

      // 11. Outdoor Lights
      const lightGeo = new THREE.SphereGeometry(0.3, 8, 8)
      const lightMat = new THREE.MeshBasicMaterial({ color: isEnd ? '#00F5FF' : '#F1C40F' })
      for (const sx of [-5, 5]) {
        const l = new THREE.Mesh(lightGeo, lightMat)
        l.position.set(sx, 7, -side * 15.2); hGroup.add(l)
        const glow = new THREE.Mesh(new THREE.SphereGeometry(1.2, 12, 12), new THREE.MeshBasicMaterial({ color: lightMat.color, transparent: true, opacity: 0.3 }))
        l.add(glow)
      }

      hGroup.position.copy(p).add(new THREE.Vector3(0, 0, side * 12))
      hGroup.lookAt(p.x, 0, p.z)
      scene.add(hGroup)
    }

    addHouse(roadPoints[0].clone(), 1) // Start House on Right
    addHouse(roadPoints[roadPoints.length - 1].clone(), -1, true) // End House on Left

    // Instanced Trees
    const treeTrunkGeo = new THREE.CylinderGeometry(0.15, 0.25, 1.5)
    const treeFoliageGeo = new THREE.ConeGeometry(1.2, 3.5, 6)
    const treeTrunkMat = new THREE.MeshLambertMaterial({ color: 0x5D4037 })
    const treeFoliageMat = new THREE.MeshLambertMaterial({ color: 0x2E7D32 })
    
    const treeCount = 400
    const iTrunk = new THREE.InstancedMesh(treeTrunkGeo, treeTrunkMat, treeCount)
    const iFoliage = new THREE.InstancedMesh(treeFoliageGeo, treeFoliageMat, treeCount)
    iFoliage.castShadow = true
    
    const dummy = new THREE.Object3D()
    for (let i = 0; i < treeCount; i++) {
        const t = Math.random()
        const p = ROAD_CURVE.getPointAt(t)
        const tangent = ROAD_CURVE.getTangentAt(t)
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
        const side = Math.random() > 0.5 ? 1 : -1
        const dist = 14 + Math.random() * 80
        const treePos = p.clone().add(normal.multiplyScalar(side * dist))
        const s = 0.8 + Math.random() * 0.7

        dummy.position.set(treePos.x, 0.75 * s, treePos.z)
        dummy.scale.setScalar(s); dummy.updateMatrix()
        iTrunk.setMatrixAt(i, dummy.matrix)
        
        dummy.position.set(treePos.x, 3 * s, treePos.z)
        dummy.updateMatrix()
        iFoliage.setMatrixAt(i, dummy.matrix)
    }
    scene.add(iTrunk); scene.add(iFoliage)

    // Instanced Rocks & Bushes
    const rockCount = 100, bushCount = 100
    const rockGeo = new THREE.DodecahedronGeometry(1, 0)
    const rockMat = new THREE.MeshLambertMaterial({ color: 0x333333 })
    const bushGeo = new THREE.SphereGeometry(1, 6, 6)
    const bushMat = new THREE.MeshLambertMaterial({ color: 0x0E3311 })
    
    const iRock = new THREE.InstancedMesh(rockGeo, rockMat, rockCount)
    const iBush = new THREE.InstancedMesh(bushGeo, bushMat, bushCount)
    
    for (let i = 0; i < rockCount; i++) {
        const t = Math.random(); const p = ROAD_CURVE.getPointAt(t)
        const side = Math.random() > 0.5 ? 1 : -1; const dist = 14 + Math.random() * 55
        const pos = p.clone().add(new THREE.Vector3(-ROAD_CURVE.getTangentAt(t).z, 0, ROAD_CURVE.getTangentAt(t).x).normalize().multiplyScalar(side * dist))
        const s = 0.5 + Math.random() * 2.0
        dummy.position.set(pos.x, s * 0.4, pos.z); dummy.rotation.set(Math.random(), Math.random(), Math.random()); dummy.scale.setScalar(s); dummy.updateMatrix()
        iRock.setMatrixAt(i, dummy.matrix)
    }
    for (let i = 0; i < bushCount; i++) {
        const t = Math.random(); const p = ROAD_CURVE.getPointAt(t)
        const side = Math.random() > 0.5 ? 1 : -1; const dist = 14 + Math.random() * 55
        const pos = p.clone().add(new THREE.Vector3(-ROAD_CURVE.getTangentAt(t).z, 0, ROAD_CURVE.getTangentAt(t).x).normalize().multiplyScalar(side * dist))
        const s = 0.9 + Math.random() * 1.5
        dummy.position.set(pos.x, s * 0.5, pos.z); dummy.scale.set(s, s * 0.6, s); dummy.updateMatrix()
        iBush.setMatrixAt(i, dummy.matrix)
    }
    scene.add(iRock); scene.add(iBush)


    // City Biome (0.5 - 0.75)
    for (let i = 0; i < 15; i++) {
      const t = 0.5 + (i / 15) * 0.25
      const p = ROAD_CURVE.getPointAt(t)
      const tangent = ROAD_CURVE.getTangentAt(t)
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
      const bPos = p.clone().add(normal.multiplyScalar((Math.random() > 0.5 ? 30 : -30)))
      addBuilding(bPos.x, bPos.z, 10, 15 + Math.random() * 20, 10, i % 2 === 0 ? '#444' : '#666')
    }

    // Coastal Biome (0.75 - 1.0)
    for (let i = 0; i < 30; i++) {
      const t = 0.75 + Math.random() * 0.25
      const p = ROAD_CURVE.getPointAt(t)
      // Add "sand mounds"
      const mound = new THREE.Mesh(new THREE.SphereGeometry(2 + Math.random() * 4, 8, 8), new THREE.MeshLambertMaterial({ color: '#E1C699' }))
      mound.position.set(p.x, -1, p.z + 15 + Math.random() * 20); scene.add(mound)
    }

    /* ─── TOLL GATES ─── */
    const gates = []
    function addTollGate(t, idx) {
      const p = ROAD_CURVE.getPointAt(t)
      const tangent = ROAD_CURVE.getTangentAt(t)
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()

      const gateGroup = new THREE.Group()

      // Booth House (Right Side)
      const boothGeo = new THREE.BoxGeometry(3, 4, 3)
      const boothMat = new THREE.MeshLambertMaterial({ color: '#f1f1f1' })
      const booth = new THREE.Mesh(boothGeo, boothMat)
      booth.position.set(7, 2, 0); gateGroup.add(booth)

      const roof = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.3, 3.5), new THREE.MeshLambertMaterial({ color: '#E63946' }))
      roof.position.set(7, 4, 0); gateGroup.add(roof)

      // Single Main Pillar (Right Side)
      const pillarGeo = new THREE.BoxGeometry(1.2, 5, 1.2)
      const pillarMat = new THREE.MeshLambertMaterial({ color: '#333' })
      const pMain = new THREE.Mesh(pillarGeo, pillarMat)
      pMain.position.set(4, 2.5, 0); gateGroup.add(pMain)

      // Pivot for the bar (positioned on the pillar)
      const barPivot = new THREE.Group()
      barPivot.position.set(4, 4.2, 0)
      gateGroup.add(barPivot)

      // Long Horizontal Bar (Paharang)
      const barGeo = new THREE.BoxGeometry(10, 0.4, 0.4)
      const barMat = new THREE.MeshLambertMaterial({ color: '#FFD700' })
      const bar = new THREE.Mesh(barGeo, barMat)
      bar.position.set(-5, 0, 0); // Extend across the road to the left
      barPivot.add(bar)

      // Initial state: horizontal (0)
      barPivot.rotation.z = 0

      // Hazard Stripes on bar
      for (let j = 0; j < 10; j++) {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.42, 0.42), new THREE.MeshBasicMaterial({ color: '#000' }))
        stripe.position.set(-4.5 + j * 1, 0, 0); bar.add(stripe)
      }

      gateGroup.position.copy(p)
      // Align local X axis with road normal to ensure the bar crosses the road
      gateGroup.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), normal)
      scene.add(gateGroup)
      gates.push({ group: gateGroup, bar: barPivot, opened: false, t, index: idx })
    }

    // Add gates at stops (except hero and contact)
    STOPS.forEach((stop, i) => {
      if (i > 0 && i < STOPS.length - 1) addTollGate(stop.t, i)
    })


    /* ─── LAMP POSTS ─── */
    const numLamps = 50
    for (let i = 0; i < numLamps; i++) {
      for (const side of [-1, 1]) {
        // Stagger the lamps on left and right for a more natural look
        const t = Math.max(0, Math.min(1, (i / numLamps) + (side > 0 ? 0.008 : 0)))
        const p = ROAD_CURVE.getPointAt(t)
        const tangent = ROAD_CURVE.getTangentAt(t)
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()

        const g = new THREE.Group()
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 6, 8), new THREE.MeshLambertMaterial({ color: 0x444444 }))
        post.position.y = 3; g.add(post)
        const light = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfffbe8 }))
        light.position.y = 6.3; g.add(light)

        // Add a small glow effect
        const glow = new THREE.Mesh(new THREE.SphereGeometry(0.6, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfffbe8, transparent: true, opacity: 0.3 }))
        glow.position.y = 6.3; g.add(glow)

        const offset = side * 8.5
        g.position.copy(p).add(normal.clone().multiplyScalar(offset))
        scene.add(g)

        // LIGHT CONE (Volumetric simulation)
        const coneGeo = new THREE.ConeGeometry(3.5, 12, 16, 1, true)
        const coneMat = new THREE.MeshBasicMaterial({
          color: 0xFFD700,
          transparent: true,
          opacity: 0.08,
          side: THREE.DoubleSide,
          depthWrite: false
        })
        const cone = new THREE.Mesh(coneGeo, coneMat)
        cone.position.copy(g.position).add(new THREE.Vector3(0, -1, 0))
        scene.add(cone)
      }
    }

    /* ─── DISTANT MOUNTAINS ─── */
    for (let i = 0; i < 20; i++) {
      const mx = Math.random() * ROAD_LENGTH
      const mz = -300 - Math.random() * 200
      const mh = 60 + Math.random() * 100
      const mountain = new THREE.Mesh(
        new THREE.ConeGeometry(mh * 0.8, mh, 4),
        new THREE.MeshLambertMaterial({ color: 0x111111 })
      )
      mountain.position.set(mx, mh / 2 - 10, mz); scene.add(mountain)
    }

    /* ─── SUN ─── */
    const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(7, 32, 32), new THREE.MeshBasicMaterial({ color: 0xFFD700 }))
    sunMesh.position.set(80, 60, -120); scene.add(sunMesh)
    sunMesh.add(new THREE.Mesh(new THREE.SphereGeometry(15, 32, 32), new THREE.MeshBasicMaterial({ color: 0xFFD700, transparent: true, opacity: 0.1 })))
    sunMesh.add(new THREE.Mesh(new THREE.SphereGeometry(30, 32, 32), new THREE.MeshBasicMaterial({ color: 0xFFD700, transparent: true, opacity: 0.05 })))

    /* ─── STARS ─── */
    const starGeo = new THREE.BufferGeometry()
    const starPos = []
    for (let i = 0; i < 2000; i++) {
      starPos.push((Math.random() - 0.5) * 1000, 100 + Math.random() * 500, (Math.random() - 0.5) * 1000)
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3))
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, sizeAttenuation: true }))
    scene.add(stars)

    /* ─── CLOUDS ─── */
    /* ─── ENVIRONMENTAL CLUTTER REMOVED (Handled by Instancing above) ─── */

    /* ─── WIND TURBINES ─── */
    const turbines = []
    for (let i = 0; i < 12; i++) {
      const t = Math.random()
      const p = ROAD_CURVE.getPointAt(t)
      const tangent = ROAD_CURVE.getTangentAt(t)
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
      const side = Math.random() > 0.5 ? 1 : -1
      const dist = 80 + Math.random() * 60
      const pos = p.clone().add(normal.multiplyScalar(side * dist))

      const tGroup = new THREE.Group()
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.8, 35), new THREE.MeshLambertMaterial({ color: 0xdddddd }))
      pole.position.y = 17.5; tGroup.add(pole)
      const hub = new THREE.Group(); hub.position.y = 35; tGroup.add(hub)
      for (let j = 0; j < 3; j++) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.4, 12, 0.1), new THREE.MeshLambertMaterial({ color: 0xffffff }))
        blade.position.y = 6; const bParent = new THREE.Group(); bParent.rotation.z = (j / 3) * Math.PI * 2; bParent.add(blade); hub.add(bParent)
      }
      tGroup.position.copy(pos); scene.add(tGroup); turbines.push(hub)
    }

    /* ─── ELECTRIC POLES ─── */
    for (let i = 0; i < 15; i++) {
      const t = (i / 15)
      const p = ROAD_CURVE.getPointAt(t)
      const tangent = ROAD_CURVE.getTangentAt(t)
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
      const side = 1
      const pos = p.clone().add(normal.multiplyScalar(side * 18))

      const poleGroup = new THREE.Group()
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 12), new THREE.MeshLambertMaterial({ color: 0x332211 }))
      pole.position.y = 6; poleGroup.add(pole)
      const cross = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 0.2), new THREE.MeshLambertMaterial({ color: 0x332211 }))
      cross.position.y = 11; poleGroup.add(cross)
      poleGroup.position.copy(pos); poleGroup.lookAt(p.x, 6, p.z); scene.add(poleGroup)
    }

    /* ─── CLOUDS: Panoramic ─── */
    const clouds = []
    for (let i = 0; i < 30; i++) {
      const g = new THREE.Group()
      const cMat = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
      for (let j = 0; j < 3; j++) {
        const m = new THREE.Mesh(new THREE.SphereGeometry(2 + Math.random() * 2, 8, 8), cMat)
        m.position.set(j * 2, Math.random(), Math.random()); g.add(m)
      }
      g.position.set(Math.random() * ROAD_LENGTH, 15 + Math.random() * 15, (Math.random() - 0.5) * 200)
      scene.add(g); clouds.push({ mesh: g, speed: 0.01 + Math.random() * 0.03 })
    }

    /* ─── FENCES / GUARDRAILS ─── */
    function addFence(t, side) {
      const p = ROAD_CURVE.getPointAt(t)
      const tangent = ROAD_CURVE.getTangentAt(t)
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
      const pos = p.clone().add(normal.multiplyScalar(side * 8.5))
      const g = new THREE.Group()
      const bar = new THREE.Mesh(new THREE.BoxGeometry(5, 0.3, 0.1), new THREE.MeshLambertMaterial({ color: 0x999999 }))
      bar.position.y = 1.2; g.add(bar)
      const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.5, 0.15), new THREE.MeshLambertMaterial({ color: 0x666666 }))
      p1.position.set(-2.2, 0.75, 0); g.add(p1)
      const p2 = p1.clone(); p2.position.x = 2.2; g.add(p2)
      g.position.copy(pos); g.lookAt(p.x, 1.2, p.z); scene.add(g)
    }
    [0.1, 0.15, 0.3, 0.35, 0.5, 0.55, 0.7, 0.75].forEach(t => { addFence(t, 1); addFence(t, -1) })

    /* ─── PARTICLES ─── */
    const pCount = 300, pGeo = new THREE.BufferGeometry(), pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) { pPos[i * 3] = Math.random() * ROAD_LENGTH; pPos[i * 3 + 1] = 1 + Math.random() * 6; pPos[i * 3 + 2] = -5 + Math.random() * 10 }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({ color: 0xFFFF88, size: 0.15, transparent: true, opacity: 0.7 })
    const particles = new THREE.Points(pGeo, pMat); scene.add(particles)

    /* ═══════════════════════════════════════════
       CAMERA ORBIT SYSTEM — 360° view control
       ═══════════════════════════════════════════ */

    function updateCamera() {
      const { theta, phi, radius } = orbitRef.current
      const carPos = carGroup.position

      // Calculate car heading from tangent at current progress
      const tangent = new THREE.Vector3()
      ROAD_CURVE.getTangentAt(progressRef.current, tangent)
      const carHeading = Math.atan2(tangent.z, tangent.x)

      // Camera theta is relative to the car's heading
      const angle = theta - carHeading

      // Convert spherical to Cartesian offset from car
      const x = radius * Math.sin(phi) * Math.cos(angle)
      const y = radius * Math.cos(phi)
      const z = radius * Math.sin(phi) * Math.sin(angle)

      // Camera orbits around the car
      camera.position.set(
        carPos.x - x,
        Math.max(0.5, carPos.y + y),
        carPos.z + z
      )

      // Look at the car (with slight vertical offset for framing)
      camera.lookAt(carPos.x, carPos.y + 1.2, carPos.z)
    }

    /* ─── MOUSE DRAG → ORBIT ─── */
    const onPointerDown = (e) => {
      hasInteracted.current = true
      isDragging.current = true
      lastMouse.current = { x: e.clientX, y: e.clientY }
      canvas.style.cursor = 'grabbing'
      if (autoOrbitRef.current) setAutoOrbit(false)
      gsap.killTweensOf(orbitRef.current) // Stop any automated transitions immediately
    }
    const onPointerMove = (e) => {
      if (!isDragging.current) return
      const dx = e.clientX - lastMouse.current.x
      const dy = e.clientY - lastMouse.current.y
      lastMouse.current = { x: e.clientX, y: e.clientY }

      // Full 360° Horizontal Orbit
      orbitRef.current.theta += dx * 0.008
      // Wider Vertical Range (almost full sphere look, but avoiding gimbal lock)
      orbitRef.current.phi = Math.max(0.01, Math.min(Math.PI * 0.7, orbitRef.current.phi - dy * 0.008))
    }
    const onPointerUp = () => {
      isDragging.current = false
      canvas.style.cursor = 'grab'
    }
    // Pinch zoom / scroll zoom to change orbit radius
    const onZoom = (e) => {
      if (isDragging.current) return // don't zoom while dragging
      // Only zoom if Ctrl/Shift held (otherwise wheel drives the car)
      if (!e.ctrlKey && !e.shiftKey) return
      e.preventDefault()
      orbitRef.current.radius = Math.max(2, Math.min(40, orbitRef.current.radius + e.deltaY * 0.02))
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('wheel', onZoom, { passive: false })
    canvas.addEventListener('contextmenu', (e) => e.preventDefault()) // block right-click menu
    canvas.style.cursor = 'grab'

    /* ─── WHEEL → SIDE SCROLL (drive) ─── */
    const SPEED = 0.00008 // Ultra-slow for a meditative, high-detail observation experience
    function updateWorld(progress) {
      const p = ROAD_CURVE.getPointAt(progress)
      const tangent = ROAD_CURVE.getTangentAt(progress)

      // Car position and rotation
      gsap.to(carGroup.position, {
        x: p.x,
        y: p.y,
        z: p.z,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true
      })

      // Rotate car to face tangent
      const targetQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent)
      gsap.to(carGroup.quaternion, {
        x: targetQuat.x,
        y: targetQuat.y,
        z: targetQuat.z,
        w: targetQuat.w,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true
      })

      carPosRef.current.copy(p)

      // Sky
      const skyColors = ['#87CEEB', '#B0E2FF', '#87CEEB', '#E8C56E', '#FF7043', '#FF4500']
      const ci = Math.floor(progress * (skyColors.length - 1)), cf = progress * (skyColors.length - 1) - ci
      if (ci < skyColors.length - 1) {
        const bl = new THREE.Color(skyColors[ci]).lerp(new THREE.Color(skyColors[ci + 1]), cf)
        scene.background = bl; scene.fog.color.copy(bl)
      }
      sunMesh.position.x = p.x + 60
      sunMesh.position.y = 55 - progress * 45
    }

    const onWheel = (e) => {
      hasInteracted.current = true
      if (e.ctrlKey || e.shiftKey) return // let zoom handler take it
      e.preventDefault()
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      let newProgress = progressRef.current + delta * SPEED

      // HARD BARRIER PHYSICS
      gates.forEach(gate => {
        if (!gate.opened) {
          // If trying to pass a closed gate (at t - 0.01), stop there
          if (delta > 0 && progressRef.current < gate.t && newProgress >= gate.t - 0.01) {
            newProgress = gate.t - 0.01
          }
        }
      })

      progressRef.current = Math.max(0, Math.min(1, newProgress))
      onProgressUpdate(progressRef.current)
      updateWorld(progressRef.current)
    }
    const onKeyDown = (e) => {
      hasInteracted.current = true
      let step = 0
      if (['ArrowRight', 'ArrowUp'].includes(e.key)) step = 0.002
      if (['ArrowLeft', 'ArrowDown'].includes(e.key)) step = -0.002

      if (step !== 0) {
        let newProgress = progressRef.current + step
        gates.forEach(gate => {
          if (!gate.opened && step > 0 && progressRef.current < gate.t && newProgress >= gate.t - 0.01) {
            newProgress = gate.t - 0.01
          }
        })
        progressRef.current = Math.max(0, Math.min(1, newProgress))
        onProgressUpdate(progressRef.current)
        updateWorld(progressRef.current)
      }
    }
    let touchDriveInterval = null
    const onTouchStart = (e) => {
      hasInteracted.current = true
      
      // Start driving after a short hold (200ms)
      if (touchDriveInterval) clearInterval(touchDriveInterval)
      touchDriveInterval = setTimeout(() => {
        touchDriveInterval = setInterval(() => {
          let newProgress = progressRef.current + 0.0015
          gates.forEach(gate => {
            if (!gate.opened && progressRef.current < gate.t && newProgress >= gate.t - 0.01) {
              newProgress = gate.t - 0.01
            }
          })
          progressRef.current = Math.max(0, Math.min(1, newProgress))
          onProgressUpdate(progressRef.current); updateWorld(progressRef.current)
        }, 16)
      }, 250)
    }
    const onTouchEnd = () => {
      if (touchDriveInterval) {
        clearTimeout(touchDriveInterval)
        clearInterval(touchDriveInterval)
        touchDriveInterval = null
      }
    }
    const onTouchMove = (e) => {
      // If they are moving their finger, they are likely trying to orbit.
      // We can cancel the auto-drive if the movement is significant.
      if (touchDriveInterval && e.touches.length === 1) {
          // Keep driving if they stay relatively still, or cancel if they swipe fast
      }
    }

    const onDriveCar = (e) => {
      hasInteracted.current = true
      const step = e.detail.step
      if (step !== 0) {
        let newProgress = progressRef.current + step
        gates.forEach(gate => {
          if (!gate.opened && step > 0 && progressRef.current < gate.t && newProgress >= gate.t - 0.01) {
            newProgress = gate.t - 0.01
          }
        })
        progressRef.current = Math.max(0, Math.min(1, newProgress))
        onProgressUpdate(progressRef.current)
        updateWorld(progressRef.current)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    canvas.addEventListener('touchstart', onTouchStart, { passive: true })
    canvas.addEventListener('touchend', onTouchEnd)
    canvas.addEventListener('touchcancel', onTouchEnd)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('driveCar', onDriveCar)
    updateWorld(0)

    /* ─── ANIMATION LOOP ─── */
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      const t = getElapsedTime()

      // Auto-orbit logic disabled based on user request
      if (autoOrbitRef.current) {
        orbitRef.current.theta += 0.005
      }

      // Update camera orbit every frame
      updateCamera()

      // Bird Surprise Logic
      const birdP = ROAD_CURVE.getPointAt(Math.min(0.99, progressRef.current + 0.05))
      birdGroup.position.lerp(new THREE.Vector3(birdP.x, 8 + Math.sin(t * 2), birdP.z + 5), 0.1)
      wingL.rotation.z = Math.sin(t * 10) * 0.5
      wingR.rotation.z = -Math.sin(t * 10) * 0.5

      // Clouds
      clouds.forEach(({ mesh, speed }) => { mesh.position.x += speed; if (mesh.position.x > ROAD_LENGTH + 30) mesh.position.x = -30; mesh.position.y += Math.sin(t + mesh.position.x) * 0.003 })
      // Particles
      const pos = particles.geometry.attributes.position.array
      for (let i = 0; i < pCount; i++) { pos[i * 3 + 1] += Math.sin(t * 2 + i) * 0.005; pos[i * 3] += Math.cos(t + i * 0.5) * 0.01; if (pos[i * 3] > ROAD_LENGTH) pos[i * 3] = 0 }
      particles.geometry.attributes.position.needsUpdate = true
      // Wheels spin (Corrected: rotate around local Y axis for rolling motion)
      wheels.forEach(w => { w.rotateY(0.15) })
      // Car bounce & Engine Vibration
      carGroup.position.y = Math.sin(t * 3) * 0.04 + (Math.random() * 0.005)

      // Water Waves
      if (waterMeshRef.current) {
        waterMeshRef.current.position.y = -0.1 + Math.sin(t * 0.5) * 0.1
      }

      // Handle Toll Gates Bar Anim
      gates.forEach(gate => {
        const targetRot = gate.opened ? -Math.PI / 1.8 : 0
        gate.bar.rotation.z = THREE.MathUtils.lerp(gate.bar.rotation.z, targetRot, 0.06)
      })

      // Animate Garage Doors
      garageDoors.forEach(gd => {
        const dist = carGroup.position.distanceTo(gd.mesh.parent.position)
        const targetY = dist < 25 ? 7 : 3.5
        gd.mesh.position.y = THREE.MathUtils.lerp(gd.mesh.position.y, targetY, 0.05)
      })

      // Animate wind turbines
      turbines.forEach((hub, i) => {
        hub.rotation.y += 0.02 + (i * 0.005)
      })

      renderer.render(scene, camera)
    }
    animate()

    const handleUnlock = (e) => {
      const gate = gates.find(g => g.index === e.detail.index)
      if (gate) gate.opened = true
    }
    const handleReset = () => {
      gsap.to(progressRef, {
        current: 0,
        duration: 2.5,
        ease: 'power4.inOut',
        onUpdate: () => {
          onProgressUpdate(progressRef.current)
          updateWorld(progressRef.current)
        }
      })
      gates.forEach(gate => { gate.opened = false })
    }
    window.addEventListener('unlockGate', handleUnlock)
    window.addEventListener('resetJourney', handleReset)

    const onResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight) }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('unlockGate', handleUnlock)
      window.removeEventListener('resetJourney', handleReset)
      canvas.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('wheel', onZoom)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('driveCar', onDriveCar)
      window.removeEventListener('resize', onResize)
      document.documentElement.style.overflow = ''; document.body.style.overflow = ''
      document.documentElement.style.height = ''; document.body.style.height = ''
      document.body.style.background = ''
      renderer.dispose()
    }
  }, [onProgressUpdate])

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 1 }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Journey content overlay */}
      <JourneyOverlay stops={stops} activeStop={activeStop} scrollProgress={scrollProgress} isScrolling={isScrolling} />
    </div>
  )
}
