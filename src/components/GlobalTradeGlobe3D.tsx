import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ShippingPortRoute {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  fclTransit: string;
  primaryCargo: string;
  color: string;
}

// Major Global Destination Hubs from Mundra & Hazira Ports (Gujarat, India)
const MUNDRA_ORIGIN = { name: 'Mundra Port (Gujarat, India)', lat: 22.84, lng: 69.7 };

const DESTINATION_PORTS: ShippingPortRoute[] = [
  {
    id: 'rotterdam',
    name: 'Port of Rotterdam',
    region: 'Western Europe',
    lat: 51.92,
    lng: 4.47,
    fclTransit: '18 - 22 Days',
    primaryCargo: 'Organic Jaggery Powder, Cubes & Natural Sweeteners',
    color: '#C7A45B',
  },
  {
    id: 'jebel-ali',
    name: 'Jebel Ali Port (Dubai)',
    region: 'Middle East / GCC',
    lat: 25.0,
    lng: 55.06,
    fclTransit: '4 - 6 Days',
    primaryCargo: 'Chilli, Turmeric, Cumin & Sesame',
    color: '#E2C785',
  },
  {
    id: 'singapore',
    name: 'Port of Singapore',
    region: 'Southeast Asia',
    lat: 1.35,
    lng: 103.82,
    fclTransit: '7 - 10 Days',
    primaryCargo: 'Groundnut, Spices & Organic Jaggery Powder',
    color: '#38BDF8',
  },
  {
    id: 'alexandria',
    name: 'Port of Alexandria / Port Said',
    region: 'North Africa & Mediterranean',
    lat: 31.2,
    lng: 29.9,
    fclTransit: '12 - 15 Days',
    primaryCargo: 'Black Pepper, Cloves & Oilseeds',
    color: '#F59E0B',
  },
  {
    id: 'durban',
    name: 'Port of Durban',
    region: 'Southern & East Africa',
    lat: -29.85,
    lng: 31.02,
    fclTransit: '14 - 18 Days',
    primaryCargo: 'Red Chilli Powder, Turmeric & Traditional Jaggery Blocks',
    color: '#10B981',
  },
  {
    id: 'shanghai',
    name: 'Port of Shanghai / Ningbo',
    region: 'East Asia',
    lat: 31.23,
    lng: 121.47,
    fclTransit: '12 - 16 Days',
    primaryCargo: 'Premium Jaggery Cubes & Spiced Jaggery',
    color: '#A855F7',
  },
  {
    id: 'houston',
    name: 'Port of Houston / New York',
    region: 'Americas',
    lat: 29.76,
    lng: -95.36,
    fclTransit: '24 - 28 Days',
    primaryCargo: 'Organic Spices, Lakadong & Specialty Extract',
    color: '#EC4899',
  },
];

// Simplified continent dot coordinates for 3D landmass representation
const LANDMASS_COORDS: [number, number][] = [
  // Europe & Mediterranean
  [55, 10], [50, 15], [48, 2], [40, -3], [42, 12], [46, 25], [52, 20], [60, 25],
  // Asia & Middle East
  [25, 45], [24, 54], [15, 48], [30, 35], [20, 78], [28, 77], [13, 80], [22, 88], [15, 100], [1, 103], [35, 105], [31, 121], [38, 116], [35, 139],
  // Africa
  [30, 31], [25, 13], [15, 38], [8, 38], [5, 0], [-1, 37], [-12, 45], [-29, 30], [-34, 18], [0, 20], [10, -10],
  // Americas
  [40, -74], [42, -71], [30, -90], [25, -80], [37, -122], [47, -122], [10, -75], [4, -73], [-12, -77], [-23, -43], [-34, -58],
  // Australia / Oceania
  [-25, 135], [-33, 151], [-37, 144], [-31, 115]
];

export function GlobalTradeGlobe3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  // References for Three.js state management
  const sceneRef = useRef<THREE.Scene | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.2, y: -0.8 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    
    // Dynamically adjust camera Z distance to fit globe comfortably on small mobile screens
    const updateCameraDistance = (w: number) => {
      if (w < 480) {
        camera.position.z = 230; // Extra clearance for narrow mobile viewports
      } else if (w < 768) {
        camera.position.z = 200;
      } else {
        camera.position.z = 175;
      }
    };
    updateCameraDistance(width);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 3. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xc7a45b, 2.5);
    dirLight1.position.set(150, 100, 150);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.5);
    dirLight2.position.set(-150, -50, -150);
    scene.add(dirLight2);

    // 4. Main Globe Group
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    const GLOBE_RADIUS = 50;

    // Base Sphere
    const sphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x09152b,
      roughness: 0.7,
      metalness: 0.3,
      wireframe: false,
    });
    const globeMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globeGroup.add(globeMesh);

    // Subtle Outer Atmosphere Glow
    const atmosphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.08, 32, 32);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xc7a45b,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphereMesh);

    // Latitude & Longitude Wireframe Grid Rings
    const gridGeometry = new THREE.WireframeGeometry(new THREE.SphereGeometry(GLOBE_RADIUS * 1.002, 18, 18));
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x1e3a68,
      transparent: true,
      opacity: 0.35,
    });
    const gridLine = new THREE.LineSegments(gridGeometry, gridMaterial);
    globeGroup.add(gridLine);

    // Function: Convert Lat / Lng to 3D Vector
    const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // 5. Landmass Dot Particles
    const dotGeometry = new THREE.SphereGeometry(0.55, 8, 8);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xc7a45b, transparent: true, opacity: 0.85 });

    LANDMASS_COORDS.forEach(([lat, lng]) => {
      // Add slight random cluster variance around main coords
      for (let i = 0; i < 6; i++) {
        const dLat = lat + (Math.random() - 0.5) * 6;
        const dLng = lng + (Math.random() - 0.5) * 6;
        const pos = latLngToVector3(dLat, dLng, GLOBE_RADIUS * 1.008);
        const dotMesh = new THREE.Mesh(dotGeometry, dotMaterial);
        dotMesh.position.copy(pos);
        globeGroup.add(dotMesh);
      }
    });

    // 6. Origin Marker: Mundra Port, Gujarat
    const originPos = latLngToVector3(MUNDRA_ORIGIN.lat, MUNDRA_ORIGIN.lng, GLOBE_RADIUS * 1.02);
    const originMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xffd700 })
    );
    originMesh.position.copy(originPos);
    globeGroup.add(originMesh);

    // Pulse Ring Around Origin
    const ringGeo = new THREE.RingGeometry(1.6, 2.4, 16);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xc7a45b, side: THREE.DoubleSide, transparent: true, opacity: 0.9 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.copy(originPos);
    ringMesh.lookAt(originPos.clone().multiplyScalar(2));
    globeGroup.add(ringMesh);

    // 7. Destination Markers & Curved Shipping Arcs
    const movingParticles: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; progress: number; speed: number }[] = [];

    DESTINATION_PORTS.forEach((port) => {
      const destPos = latLngToVector3(port.lat, port.lng, GLOBE_RADIUS * 1.02);

      // Destination Port Marker Dot
      const destMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.0, 10, 10),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(port.color) })
      );
      destMesh.position.copy(destPos);
      globeGroup.add(destMesh);

      // Curved Arc Line Computation
      const distance = originPos.distanceTo(destPos);
      const midPoint = new THREE.Vector3().addVectors(originPos, destPos).multiplyScalar(0.5);
      // Elevate midpoint outward depending on distance
      const midLength = midPoint.length();
      midPoint.normalize().multiplyScalar(midLength + distance * 0.38);

      const curve = new THREE.QuadraticBezierCurve3(originPos, midPoint, destPos);
      const points = curve.getPoints(40);
      const arcGeometry = new THREE.BufferGeometry().setFromPoints(points);

      const arcMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(port.color),
        transparent: true,
        opacity: 0.55,
      });

      const arcLine = new THREE.Line(arcGeometry, arcMaterial);
      globeGroup.add(arcLine);

      // Animated Glowing Flow Particle traveling along arc
      const particleMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.7, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      globeGroup.add(particleMesh);

      movingParticles.push({
        mesh: particleMesh,
        curve,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.003,
      });
    });

    // 8. Interactive Touch / Drag Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x += deltaY * 0.008;

      // Limit pitch (x-axis) rotation
      targetRotationRef.current.x = Math.max(-1.0, Math.min(1.0, targetRotationRef.current.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x += deltaY * 0.008;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);

    // 9. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (globeGroupRef.current) {
        // Smooth rotation interpolation
        if (!isDragging) {
          targetRotationRef.current.y += 0.0015; // Slow continuous spin
        }

        globeGroupRef.current.rotation.y += (targetRotationRef.current.y - globeGroupRef.current.rotation.y) * 0.08;
        globeGroupRef.current.rotation.x += (targetRotationRef.current.x - globeGroupRef.current.rotation.x) * 0.08;
      }

      // Animate arc particles
      movingParticles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        const pos = p.curve.getPoint(p.progress);
        p.mesh.position.copy(pos);
      });

      // Pulse ring scaling
      ringMesh.scale.setScalar(1 + Math.sin(Date.now() * 0.003) * 0.15);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      updateCameraDistance(w);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#070F20] text-white border-y border-[#162444] overflow-hidden relative w-full">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-[#C7A45B]/10 rounded-full blur-3xl pointer-events-none max-w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 px-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
            Shipping Worldwide
          </h2>
        </div>

        {/* Clean Responsive 3D Globe Container */}
        <div className="w-full flex justify-center max-w-full">
          <div className="w-full max-w-4xl bg-[#09152B]/80 border border-white/10 rounded-2xl p-2 sm:p-4 shadow-2xl backdrop-blur-sm relative overflow-hidden max-w-full">
            <div
              ref={mountRef}
              className="w-full h-[320px] sm:h-[460px] lg:h-[560px] relative cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden touch-none max-w-full"
              title="Interactive 3D Shipping Globe — Drag to rotate"
            />
            {/* Subtle Drag Indicator Pill */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#070F20]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] text-[#94A3B8] flex items-center gap-1.5 pointer-events-none whitespace-nowrap shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#C7A45B] animate-pulse" />
              <span>Drag to rotate 3D Globe</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
