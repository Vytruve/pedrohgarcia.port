import React, { useEffect } from 'react';

declare const VANTA: any;
declare const THREE: any;

interface VantaBackgroundEffectProps {
  sectionRef: React.RefObject<HTMLElement>;
  darkEffect?: 'FOG' | 'NET' | 'GLOBE' | 'CELLS' | 'WAVES' | 'DOTS';
}

const VantaBackgroundEffect: React.FC<VantaBackgroundEffectProps> = ({ sectionRef, darkEffect = 'FOG' }) => {

  useEffect(() => {
    let vantaEffect: any = null;
    
    if (sectionRef.current && typeof VANTA !== 'undefined' && typeof THREE !== 'undefined') {
        const commonConfig = {
            el: sectionRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
        };

        const darkBg = { backgroundColor: 0x0b0c10 }; // cosmic-dark
        if (darkEffect === 'NET' && VANTA.NET) {
            vantaEffect = VANTA.NET({ ...commonConfig, ...darkBg, color: 0x00ffff, points: 12.00, maxDistance: 22.00, spacing: 16.00 });
        } else if (darkEffect === 'GLOBE' && VANTA.GLOBE) {
            vantaEffect = VANTA.GLOBE({ ...commonConfig, ...darkBg, color: 0x00ffff, color2: 0xff00ff, size: 1.20 });
        } else if (darkEffect === 'CELLS' && VANTA.CELLS) {
            vantaEffect = VANTA.CELLS({ ...commonConfig, ...darkBg, color1: 0x00ffff, color2: 0xff00ff, size: 3.00, speed: 2.00 });
        } else if (darkEffect === 'WAVES' && VANTA.WAVES) {
            vantaEffect = VANTA.WAVES({ ...commonConfig, color: 0x2c4e7a, shininess: 30.00, waveHeight: 15.00, waveSpeed: 0.80, zoom: 0.85 });
        } else if (darkEffect === 'DOTS' && VANTA.DOTS) {
            vantaEffect = VANTA.DOTS({ ...commonConfig, ...darkBg, color: 0x00ffff, color2: 0xff00ff, size: 2.50, spacing: 30.00 });
        } else if (VANTA.FOG) { // Fallback to FOG
            vantaEffect = VANTA.FOG({ ...commonConfig, highlightColor: 0x3f8eaf, midtoneColor: 0x9333ea, lowlightColor: 0x0b0c10, baseColor: 0x0b0c10, blurFactor: 0.60, speed: 1.00, zoom: 0.70 });
        }
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [sectionRef, darkEffect]);

  return null;
};

export default VantaBackgroundEffect;