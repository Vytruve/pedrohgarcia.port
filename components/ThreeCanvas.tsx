
import React, { useRef, useEffect } from 'react';

// It is expected that THREE is loaded from a CDN in index.html
declare const THREE: any;

const ThreeCanvas: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current || typeof THREE === 'undefined') return;

        const currentMount = mountRef.current;

        // Scene
        const scene = new THREE.Scene();

        // Cube Texture Loader for background nebula
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cube/MilkyWay/dark-s_px.jpg',
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cube/MilkyWay/dark-s_nx.jpg',
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cube/MilkyWay/dark-s_py.jpg',
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cube/MilkyWay/dark-s_ny.jpg',
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cube/MilkyWay/dark-s_pz.jpg',
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cube/MilkyWay/dark-s_nz.jpg',
        ]);
        scene.background = texture;

        // Camera
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 2000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); // Performance optimization
        currentMount.appendChild(renderer.domElement);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Monolith
        const monolithGeometry = new THREE.BoxGeometry(0.8, 3, 0.1);
        const monolithMaterial = new THREE.MeshStandardMaterial({
            color: 0xcccccc,
            metalness: 1.0,
            roughness: 0.05,
            envMap: texture,
        });
        const monolith = new THREE.Mesh(monolithGeometry, monolithMaterial);
        scene.add(monolith);

        // Starfield
        const createStarfield = (count: number, size: number, color: number) => {
            const starVertices: number[] = [];
            for (let i = 0; i < count; i++) {
                const x = (Math.random() - 0.5) * 2000;
                const y = (Math.random() - 0.5) * 2000;
                const z = (Math.random() - 0.5) * 2000;
                starVertices.push(x, y, z);
            }
            const starGeometry = new THREE.BufferGeometry();
            starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
            const starMaterial = new THREE.PointsMaterial({
                color: color,
                size: size,
                transparent: true,
                opacity: 0.8
            });
            return new THREE.Points(starGeometry, starMaterial);
        }

        const stars = createStarfield(15000, 0.6, 0xbbbbbb);
        scene.add(stars);
        const distantStars = createStarfield(10000, 0.5, 0x888888);
        scene.add(distantStars);

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

            // Rotate stars
            stars.rotation.y = elapsedTime * 0.008;
            distantStars.rotation.y = elapsedTime * 0.003;
            
            // Make monolith and camera follow mouse
            const targetMonolithRotationY = elapsedTime * 0.08 + (mouse.x * 0.4);
            const targetMonolithRotationX = elapsedTime * 0.02 + (mouse.y * 0.4);
            monolith.rotation.y += (targetMonolithRotationY - monolith.rotation.y) * 0.05;
            monolith.rotation.x += (targetMonolithRotationX - monolith.rotation.x) * 0.05;

            // Parallax effect for camera
            camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
            camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
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

export default ThreeCanvas;