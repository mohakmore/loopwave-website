import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

const totalDots = 600;
const randomDotsData = Array.from({ length: totalDots }).map((_, id) => {
  const isIndia = Math.random() < 0.45;
  const lat = isIndia ? Math.random() * (35 - 8) + 8 : (Math.random() - 0.5) * 140;
  const lng = isIndia ? Math.random() * (97 - 68) + 68 : (Math.random() - 0.5) * 360;
  return { lat, lng, size: Math.random() * 4.5 + 2.0, id };
});

export default function GlobeCanvas() {
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const globeEl = useRef<any>(null);
  const [countries, setCountries] = useState<any>({ features: [] });
  const [globeSize, setGlobeSize] = useState(600);
  const [oceanColorImg, setOceanColorImg] = useState<string>('');

  // Build solid-color ocean texture + fetch country GeoJSON
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#121212';
      ctx.fillRect(0, 0, 1, 1);
      setOceanColorImg(canvas.toDataURL('image/png'));
    }

    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  // Sync globe size with container
  useEffect(() => {
    const handleResize = () => {
      if (globeContainerRef.current) {
        setGlobeSize(globeContainerRef.current.clientWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    setTimeout(handleResize, 100);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Init auto-rotation and controls
  useEffect(() => {
    if (!oceanColorImg) return;
    let checkInterval: ReturnType<typeof setInterval>;
    const initControls = () => {
      if (globeEl.current) {
        const controls = globeEl.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 1.0;
          controls.enableDamping = true;
          controls.dampingFactor = 0.05;
          controls.enableZoom = false;
          globeEl.current.pointOfView({ lat: 20, lng: -40, altitude: 1.2 });
          clearInterval(checkInterval);
        }
      }
    };
    checkInterval = setInterval(initControls, 100);
    return () => clearInterval(checkInterval);
  }, [oceanColorImg]);

  return (
    <div
      ref={globeContainerRef}
      className="w-full h-full rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden relative"
    >
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.4); opacity: 1; }
          100% { transform: scale(1); opacity: 0.9; }
        }
        .globe-dot-animate {
          opacity: 0;
          animation: popIn 0.4s forwards ease-out;
        }
      `}</style>

      {oceanColorImg && (
        <Globe
          ref={globeEl}
          width={globeSize}
          height={globeSize}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={oceanColorImg}
          showAtmosphere={true}
          atmosphereColor="#ffd700"
          atmosphereAltitude={0.15}
          htmlElementsData={randomDotsData}
          htmlElement={(d: any) => {
            const container = document.createElement('div');
            container.style.pointerEvents = 'none';
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';

            const el = document.createElement('div');
            el.style.width = `${d.size}px`;
            el.style.height = `${d.size}px`;
            el.style.backgroundColor = '#FFD700';
            el.style.borderRadius = '50%';
            el.style.boxShadow = '0 0 8px #FFD700, 0 0 16px #FFD700';
            el.className = 'globe-dot-animate';
            el.style.animationDelay = `${d.id * 0.007}s`;

            container.appendChild(el);
            return container;
          }}
          htmlAltitude={0.02}
          htmlTransitionDuration={0}
          polygonsData={countries.features}
          polygonAltitude={0.015}
          polygonCapColor={() => '#ffd700'}
          polygonSideColor={() => '#b8860b'}
          polygonStrokeColor={() => '#b8860b'}
          polygonsTransitionDuration={300}
        />
      )}

      {/* Inset shadow overlay for 3D depth */}
      <div className="absolute inset-0 rounded-full pointer-events-none z-10"
        style={{ boxShadow: 'inset -30px -30px 60px rgba(0,0,0,0.9), inset 15px 15px 40px rgba(0,0,0,0.5)' }}
      />
    </div>
  );
}
