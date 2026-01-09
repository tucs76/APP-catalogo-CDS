
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_ALBUMS } from '../constants';

interface Props {
  onClose: () => void;
  onMatchConfirmed: (id: string) => void;
}

const ScannerView: React.FC<Props> = ({ onClose, onMatchConfirmed }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [matchFound, setMatchFound] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const dummyMatch = MOCK_ALBUMS[4]; // Vortex of Silence

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }
    setupCamera();

    // Auto-match simulation after 3 seconds
    const timer = setTimeout(() => {
      setMatchFound(true);
      setIsScanning(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col font-display overflow-hidden">
      {/* Header Overlay */}
      <div className="z-20 flex items-center bg-gradient-to-b from-black/80 to-transparent p-4 pb-12 justify-between">
        <button onClick={onClose} className="text-white flex size-12 shrink-0 items-center justify-center">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="text-white text-lg font-bold tracking-tight flex-1 text-center">Cover Identification</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex items-center justify-center rounded-lg h-12 bg-transparent text-white p-0">
            <span className="material-symbols-outlined">flashlight_on</span>
          </button>
        </div>
      </div>

      {/* Main Scanner Body */}
      <div className="flex-1 relative bg-[#121617]">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        
        {/* Viewfinder Brackets */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-72 h-72">
            <div className="scan-line"></div>
            <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-10 h-10 border-bottom-4 border-left-4 border-primary rounded-bl-xl border-b-4 border-l-4"></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-bottom-4 border-right-4 border-primary rounded-br-xl border-b-4 border-r-4"></div>
          </div>
        </div>

        {/* Instructional Title */}
        <div className="relative z-10 flex flex-col items-center pt-8">
          <h3 className="text-white text-2xl font-bold leading-tight px-4 text-center">Point at Album Cover</h3>
          <p className="text-[#a1b1b5] text-sm mt-2">Position the artwork within the brackets</p>
        </div>
      </div>

      {/* Bottom Result Sheet */}
      <div className={`mt-auto relative z-[110] transition-transform duration-500 transform ${matchFound ? 'translate-y-0' : 'translate-y-[85%]'}`}>
        <div className="flex flex-col items-stretch bg-background-dark border-t border-white/10 rounded-t-3xl shadow-2xl pb-10">
          {/* Pull Handle */}
          <button className="flex h-8 w-full items-center justify-center" onClick={() => setMatchFound(!matchFound)}>
            <div className="h-1.5 w-12 rounded-full bg-white/20"></div>
          </button>

          {/* Result Content */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[#a1b1b5] text-[10px] font-bold uppercase tracking-widest">Match Result</h4>
              <span className="flex items-center gap-1 text-accent-gold text-[10px] font-bold bg-accent-gold/10 px-2 py-1 rounded-full">
                <span className="material-symbols-outlined text-[12px]">warning</span> DUPLICATE ALERT
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* User Capture */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-white/40 uppercase font-bold">Your Capture</span>
                <div className="aspect-square w-full rounded-lg overflow-hidden bg-black relative border-2 border-primary">
                  <img className="w-full h-full object-cover blur-[1px] grayscale-[0.2]" src={dummyMatch.coverUrl} alt="Captured scan" />
                  <div className="absolute top-2 right-2 bg-primary p-1 rounded-full">
                    <span className="material-symbols-outlined text-[12px]">check</span>
                  </div>
                </div>
              </div>
              {/* Database Match */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-white/40 uppercase font-bold">Database Match</span>
                <div className="aspect-square w-full rounded-lg overflow-hidden bg-black relative">
                  <img className="w-full h-full object-cover" src={dummyMatch.coverUrl} alt="Database match" />
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <h1 className="text-xl font-bold text-white leading-none">{dummyMatch.title}</h1>
              <p className="text-primary font-medium mt-1">{dummyMatch.artist} ({dummyMatch.year})</p>
              <div className="flex justify-center gap-2 mt-3">
                <span className="px-2 py-0.5 rounded text-[10px] border border-white/20 text-white/60">Post-Punk</span>
                <span className="px-2 py-0.5 rounded text-[10px] border border-white/20 text-white/60">Vinyl/CD</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 px-6 pt-2">
            <button 
              onClick={() => { setMatchFound(false); setIsScanning(true); }}
              className="flex-1 h-14 rounded-xl bg-surface-dark text-white font-bold text-base border border-white/5 active:scale-95 transition-transform"
            >
              Retake
            </button>
            <button 
              onClick={() => onMatchConfirmed(dummyMatch.id)}
              className="flex-[2] h-14 rounded-xl bg-primary text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined">verified</span>
              Confirm Match
            </button>
          </div>

          <div className="mt-4 px-6">
            <div className="bg-accent-gold/5 border border-accent-gold/20 rounded-lg p-3 flex items-center gap-3">
              <span className="material-symbols-outlined text-accent-gold" style={{ fontVariationSettings: "'FILL' 1" }}>library_music</span>
              <div className="flex flex-col">
                <span className="text-xs text-accent-gold font-bold">In Your Collection</span>
                <span className="text-[10px] text-accent-gold/70">Added: Oct 12, 2023 • Near Mint condition</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Controls Overlay */}
      <div className="flex items-center justify-between px-8 py-8 bg-gradient-to-t from-background-dark to-transparent z-[100]">
        <button className="flex shrink-0 items-center justify-center rounded-full size-12 bg-black/60 text-white backdrop-blur-md">
          <span className="material-symbols-outlined">image</span>
        </button>
        <div className="relative">
          <div className="absolute -inset-2 rounded-full bg-primary/20 animate-pulse"></div>
          <button 
            className="relative flex shrink-0 items-center justify-center rounded-full size-20 bg-primary text-white shadow-xl shadow-primary/40 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-4xl">photo_camera</span>
          </button>
        </div>
        <button className="flex shrink-0 items-center justify-center rounded-full size-12 bg-black/60 text-white backdrop-blur-md">
          <span className="material-symbols-outlined">history</span>
        </button>
      </div>
    </div>
  );
};

export default ScannerView;
