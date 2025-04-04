import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function SpaceAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0A0F1C, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0x9580FF,
      size: 0.02,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Create floating shapes
    const shapes: THREE.Mesh[] = [];
    const shapeGeometries = [
      new THREE.OctahedronGeometry(0.5),
      new THREE.TetrahedronGeometry(0.5),
      new THREE.IcosahedronGeometry(0.5),
    ];

    for (let i = 0; i < 30; i++) {
      const geometry = shapeGeometries[Math.floor(Math.random() * shapeGeometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: 0x9580FF,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });
      
      const shape = new THREE.Mesh(geometry, material);
      
      // Distribute shapes in a more visible area
      shape.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );
      
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      // Store initial position for animation
      shape.userData = {
        initialY: shape.position.y,
        speed: 0.0005 + Math.random() * 0.001,
        amplitude: 0.5 + Math.random() * 0.5
      };
      
      shapes.push(shape);
      scene.add(shape);
    }

    camera.position.z = 10;

    // Animation
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      // Rotate stars slowly
      stars.rotation.y += 0.0001;
      stars.rotation.x += 0.00005;

      // Animate shapes
      shapes.forEach((shape) => {
        // Rotation
        shape.rotation.x += 0.002;
        shape.rotation.y += 0.003;
        
        // Floating motion
        const { initialY, speed, amplitude } = shape.userData;
        shape.position.y = initialY + Math.sin(Date.now() * speed) * amplitude;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial resize

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frame);
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of all geometries and materials
      starGeometry.dispose();
      starMaterial.dispose();
      shapes.forEach(shape => {
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
}

export default SpaceAnimation;