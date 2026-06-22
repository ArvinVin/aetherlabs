import * as THREE from 'three';

export class AetherScene {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  
  private particles: THREE.Points;
  private linesMesh: THREE.LineSegments;
  
  private particleCount = 250;
  private maxDistance = 3.5;
  private positions: Float32Array;
  private velocities: Float32Array;
  
  private mouse = new THREE.Vector2(0, 0);
  private targetMouse = new THREE.Vector2(0, 0);
  private windowHalfX: number;
  private windowHalfY: number;

  private animationFrameId: number = 0;
  private clock: THREE.Clock;

  constructor(container: HTMLElement) {
    this.container = container;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.clock = new THREE.Clock();

    // Setup Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    // Setup Scene
    this.scene = new THREE.Scene();
    
    // Setup Camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 25;

    // Create Particles
    this.positions = new Float32Array(this.particleCount * 3);
    this.velocities = new Float32Array(this.particleCount * 3);
    
    const colors = new Float32Array(this.particleCount * 3);
    const color1 = new THREE.Color('#00f0ff'); // Neon cyan
    const color2 = new THREE.Color('#8b3dff'); // Neon purple
    const color3 = new THREE.Color('#ff55cc'); // Neon pink/magenta

    for (let i = 0; i < this.particleCount; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 10 + Math.random() * 15;
      
      this.positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      this.positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      this.positions[i * 3 + 2] = r * Math.cos(phi);

      this.velocities[i * 3] = (Math.random() - 0.5) * 0.03;
      this.velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.03;
      this.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03;

      const randomVal = Math.random();
      let mixedColor;
      if (randomVal < 0.5) {
        mixedColor = color1.clone().lerp(color2, randomVal * 2);
      } else {
        mixedColor = color2.clone().lerp(color3, (randomVal - 0.5) * 2);
      }
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle material
    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    // Create Lines
    const lineGeometry = new THREE.BufferGeometry();
    // Maximum possible lines: n * (n - 1) / 2
    // We will allocate a reasonable buffer size and update draw range dynamically
    const maxLines = this.particleCount * 10;
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(maxLines * 6), 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3, // Brighter lines
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    this.scene.add(this.linesMesh);

    // Event Listeners
    window.addEventListener('resize', this.onWindowResize);
    document.addEventListener('mousemove', this.onDocumentMouseMove);

    // Start Animation
    this.animate();
  }

  private onWindowResize = () => {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private onDocumentMouseMove = (event: MouseEvent) => {
    this.targetMouse.x = (event.clientX - this.windowHalfX) * 0.05;
    this.targetMouse.y = (event.clientY - this.windowHalfY) * 0.05;
  }

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.render();
  }

  private render = () => {
    const time = this.clock.getElapsedTime();

    // Smooth mouse movement - extremely slow easing
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.005;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.005;

    // Rotate scene slightly based on mouse - very subtle movement
    this.scene.rotation.x += 0.005 * (this.mouse.y - this.scene.rotation.x);
    this.scene.rotation.y += 0.005 * (this.mouse.x - this.scene.rotation.y);
    
    // Auto rotation - very slow drift
    this.particles.rotation.y = time * 0.01;
    this.linesMesh.rotation.y = time * 0.01;

    // Update particle positions
    const posAttribute = this.particles.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttribute.array;
    
    // Connection lines logic
    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;
    
    const linePosAttribute = this.linesMesh.geometry.attributes.position as THREE.BufferAttribute;
    const linePosArray = linePosAttribute.array;
    const lineColorAttribute = this.linesMesh.geometry.attributes.color as THREE.BufferAttribute;
    const lineColorArray = lineColorAttribute.array;

    for (let i = 0; i < this.particleCount; i++) {
      // Wavy motion
      posArray[i * 3 + 1] += Math.sin(time + posArray[i * 3]) * 0.01;
      
      // Update from velocity
      posArray[i * 3] += this.velocities[i * 3];
      posArray[i * 3 + 1] += this.velocities[i * 3 + 1];
      posArray[i * 3 + 2] += this.velocities[i * 3 + 2];

      // Bounce bounds loosely
      if (Math.abs(posArray[i * 3]) > 25) this.velocities[i * 3] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 25) this.velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > 25) this.velocities[i * 3 + 2] *= -1;

      // Check connections
      for (let j = i + 1; j < this.particleCount; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < this.maxDistance) {
          const alpha = 1.0 - (dist / this.maxDistance);
          
          linePosArray[vertexpos++] = posArray[i * 3];
          linePosArray[vertexpos++] = posArray[i * 3 + 1];
          linePosArray[vertexpos++] = posArray[i * 3 + 2];
          
          linePosArray[vertexpos++] = posArray[j * 3];
          linePosArray[vertexpos++] = posArray[j * 3 + 1];
          linePosArray[vertexpos++] = posArray[j * 3 + 2];

          // Neon connection transitions (cyan to purple)
          // R: 0.0 -> 0.54, G: 0.94 -> 0.24, B: 1.0 -> 1.0
          lineColorArray[colorpos++] = 0.0 + alpha * 0.54; // R
          lineColorArray[colorpos++] = 0.94 - alpha * 0.70;  // G
          lineColorArray[colorpos++] = 1.0; // B

          lineColorArray[colorpos++] = 0.0 + alpha * 0.54;
          lineColorArray[colorpos++] = 0.94 - alpha * 0.70;
          lineColorArray[colorpos++] = 1.0;

          numConnected++;
        }
      }
    }

    this.linesMesh.geometry.setDrawRange(0, numConnected * 2);
    this.linesMesh.geometry.attributes.position.needsUpdate = true;
    this.linesMesh.geometry.attributes.color.needsUpdate = true;
    this.particles.geometry.attributes.position.needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }

  public dispose() {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener('mousemove', this.onDocumentMouseMove);
    
    // Dispose resources
    this.particles.geometry.dispose();
    (this.particles.material as THREE.Material).dispose();
    
    this.linesMesh.geometry.dispose();
    (this.linesMesh.material as THREE.Material).dispose();
    
    this.renderer.dispose();
    this.container.removeChild(this.renderer.domElement);
  }
}
