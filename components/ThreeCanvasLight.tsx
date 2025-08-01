
import React, { useRef, useEffect } from 'react';

// It is expected that THREE is loaded from a CDN in index.html
declare const THREE: any;

const ThreeCanvasLight: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const currentMount = mountRef.current;

        // Scene
        const scene = new THREE.Scene();
        
        // Load background texture
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2070&auto=format&fit=crop', // A light, abstract texture from Unsplash
            (texture) => {
                scene.background = texture;
            },
            undefined, // onProgress callback not needed
            (err) => {
                console.error('Error loading background texture, falling back to color.', err);
                scene.background = new THREE.Color(0xF9F9F9); // Fallback color
            }
        );

        // Camera
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffd700, 1.5);
        directionalLight.position.set(-5, 5, 5);
        scene.add(directionalLight);

        // Crystal Object
        const crystalGeometry = new THREE.IcosahedronGeometry(1.5, 0);
        const crystalMaterial = new THREE.MeshStandardMaterial({
            color: 0xff7a00,
            emissive: 0xff4500,
            emissiveIntensity: 0.1,
            roughness: 0.1,
            metalness: 0.2,
            transparent: true,
            opacity: 0.9,
        });
        const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
        scene.add(crystal);

        // Floating Dust Motes
        const createMotes = (count: number, size: number, color: number) => {
            const moteVertices: number[] = [];
            for (let i = 0; i < count; i++) {
                const x = (Math.random() - 0.5) * 40;
                const y = (Math.random() - 0.5) * 40;
                const z = (Math.random() - 0.5) * 40;
                moteVertices.push(x, y, z);
            }
            const moteGeometry = new THREE.BufferGeometry();
            moteGeometry.setAttribute('position', new THREE.Float32BufferAttribute(moteVertices, 3));
            const moteMaterial = new THREE.PointsMaterial({
                color: color,
                size: size,
                transparent: true,
                opacity: 0.7,
                blending: THREE.AdditiveBlending
            });
            return new THREE.Points(moteGeometry, moteMaterial);
        }

        const motes = createMotes(5000, 0.02, 0xffeebf); // Pale gold color to complement warm backgrounds
        scene.add(motes);

        // Mouse interaction
        const mouse = new THREE.Vector2();
        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();

            // Rotate motes
            motes.rotation.y = elapsedTime * 0.02;

            // Make crystal and camera follow mouse
            const targetCrystalRotationY = elapsedTime * 0.2 + (mouse.x * 0.5);
            const targetCrystalRotationX = elapsedTime * 0.1 + (mouse.y * 0.5);
            crystal.rotation.y += (targetCrystalRotationY - crystal.rotation.y) * 0.05;
            crystal.rotation.x += (targetCrystalRotationX - crystal.rotation.x) * 0.05;

            // Make camera follow mouse for a parallax effect
            camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.02;
            camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if(currentMount && renderer.domElement){
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};

export default ThreeCanvasLight;