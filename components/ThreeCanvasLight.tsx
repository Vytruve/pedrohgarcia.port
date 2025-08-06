import React, { useRef, useEffect } from 'react';

// It is expected that THREE is loaded from a CDN in index.html
declare const THREE: any;

const vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  // 2D Random
  float random (vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // 2D Noise
  float noise (vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Fractional Brownian Motion
  float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 0.0;
      for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.;
          amplitude *= 0.5;
      }
      return value;
  }

  void main() {
      vec2 st = gl_FragCoord.xy/u_resolution.xy;
      st.x *= u_resolution.x/u_resolution.y;

      vec2 mouse_normalized = u_mouse / u_resolution;
      float mouse_dist = distance(st, mouse_normalized);
      
      vec3 color = vec3(0.0);
      
      vec2 q = vec2(0.);
      q.x = fbm( st + 0.00*u_time);
      q.y = fbm( st + vec2(1.0));

      vec2 r = vec2(0.);
      r.x = fbm( st + q + vec2(1.7,9.2) + 0.15*u_time );
      r.y = fbm( st + q + vec2(8.3,2.8) + 0.126*u_time);

      float f = fbm(st+r);

      color = mix(vec3(0.8, 0.9, 1.0), // Light Sky Blue
                  vec3(1.0, 0.85, 0.9), // Soft Pink
                  clamp((f*f)*4.0,0.0,1.0));

      color = mix(color,
                  vec3(1.0, 0.95, 0.8), // Pale Gold
                  clamp(length(q),0.0,1.0));

      color = mix(color,
                  vec3(0.9, 0.9, 1.0), // Lavender
                  clamp(length(r.x),0.0,1.0));
      
      color = (f*f*f+.6*f*f+.5*f)*color;

      // Add a soft vignette
      float vignette = smoothstep(1.0, 0.4, length(st - vec2(0.5 * u_resolution.x / u_resolution.y, 0.5)));
      color *= vignette * 1.2;

      gl_FragColor = vec4(color, 1.0);
  }
`;

const ThreeCanvasLight: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const currentMount = mountRef.current;
        const clock = new THREE.Clock();

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        // Uniforms
        const uniforms = {
            u_time: { value: 0.0 },
            u_resolution: { value: new THREE.Vector2(currentMount.clientWidth, currentMount.clientHeight) },
            u_mouse: { value: new THREE.Vector2(currentMount.clientWidth / 2, currentMount.clientHeight / 2) },
        };

        // Plane geometry
        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        });
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Mouse interaction
        const handleMouseMove = (event: MouseEvent) => {
            uniforms.u_mouse.value.x = event.clientX;
            uniforms.u_mouse.value.y = currentMount.clientHeight - event.clientY; // Invert Y for shader coord
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            uniforms.u_time.value = clock.getElapsedTime();
            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            uniforms.u_resolution.value.x = currentMount.clientWidth;
            uniforms.u_resolution.value.y = currentMount.clientHeight;
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};

export default ThreeCanvasLight;
