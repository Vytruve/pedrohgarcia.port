
import React, { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

declare const VANTA: any;
declare const THREE: any;

interface VantaBackgroundEffectProps {
  sectionRef: React.RefObject<HTMLElement>;
  darkEffect?: 'FOG' | 'NET' | 'GLOBE' | 'CELLS' | 'WAVES' | 'DOTS';
}

const VantaBackgroundEffect: React.FC<VantaBackgroundEffectProps> = ({ sectionRef, darkEffect = 'FOG' }) => {
  const { theme } = useTheme();

  useEffect(() => {
    let vantaEffect: any = null;
    
    if (sectionRef.current && typeof VANTA !== 'undefined' && typeof THREE !== 'undefined') {
        if (theme === 'dark') {
            if (darkEffect === 'NET' && typeof VANTA.NET === 'function') {
                vantaEffect = VANTA.NET({
                    el: sectionRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x00ffff, // accent-cyan
                    backgroundColor: 0x0b0c10, // cosmic-dark
                    points: 12.00,
                    maxDistance: 22.00,
                    spacing: 16.00,
                });
            } else if (darkEffect === 'GLOBE' && typeof VANTA.GLOBE === 'function') {
                vantaEffect = VANTA.GLOBE({
                    el: sectionRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x00ffff,
                    color2: 0xff00ff,
                    backgroundColor: 0x0b0c10,
                    size: 1.20,
                });
            } else if (darkEffect === 'CELLS' && typeof VANTA.CELLS === 'function') {
                 vantaEffect = VANTA.CELLS({
                    el: sectionRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    color1: 0x00ffff,
                    color2: 0xff00ff,
                    backgroundColor: 0x0b0c10,
                    size: 3.00,
                    speed: 2.00,
                });
            } else if (darkEffect === 'WAVES' && typeof VANTA.WAVES === 'function') {
                 vantaEffect = VANTA.WAVES({
                    el: sectionRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x2c4e7a,
                    shininess: 30.00,
                    waveHeight: 15.00,
                    waveSpeed: 0.80,
                    zoom: 0.85,
                });
            } else if (darkEffect === 'DOTS' && typeof VANTA.DOTS === 'function') {
                 vantaEffect = VANTA.DOTS({
                    el: sectionRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x00ffff,
                    color2: 0xff00ff,
                    backgroundColor: 0x0b0c10,
                    size: 2.50,
                    spacing: 30.00,
                });
            } else if (typeof VANTA.FOG === 'function') { // Fallback to FOG
                vantaEffect = VANTA.FOG({
                    el: sectionRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    highlightColor: 0x3f8eaf,
                    midtoneColor: 0x9333ea,
                    lowlightColor: 0x0b0c10,
                    baseColor: 0x0b0c10,
                    blurFactor: 0.60,
                    speed: 1.00,
                    zoom: 0.70
                });
            }
        } else {
            if (typeof VANTA.BIRDS === 'function') {
                vantaEffect = VANTA.BIRDS({
                    el: sectionRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    backgroundColor: 0xF9F9F9,
                    color1: 0xff7a00,
                    color2: 0x00ffff,
                    colorMode: 'lerp',
                    birdSize: 1.10,
                    wingSpan: 20.00,
                    speedLimit: 4.00,
                    separation: 25.00,
                    alignment: 25.00,
                    cohesion: 25.00,
                    quantity: 2.00
                });
            }
        }
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [theme, sectionRef, darkEffect]);

  return null;
};

export default VantaBackgroundEffect;