import { StrictMode, Suspense, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import './lib/i18n'
import App from './App.tsx'

function InitialLoader() {
  return (
    <>
      <style>{`
        @keyframes logo-fill {
          0% { clip-path: inset(100% 0 0 0); opacity: 0; }
          5% { opacity: 0.9; }
          70% { clip-path: inset(0 0 0 0); opacity: 0.9; }
          100% { clip-path: inset(0 0 0 0); opacity: 1; }
        }
        .animate-logo-fill {
          animation: logo-fill 2.0s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes line-fade {
          0% { opacity: 0.8; }
          70% { opacity: 0.3; }
          100% { opacity: 0; }
        }
        .animate-line-fade {
          animation: line-fade 2.0s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <div className="relative w-[140px] aspect-[1/1] flex items-center justify-center">
        {/* BASE SVG LINE LOGO */}
        <div
          className="absolute inset-0 w-full h-full animate-line-fade"
          style={{
            WebkitMaskImage: `url('/images/logo/AL_line_logo.svg')`,
            maskImage: `url('/images/logo/AL_line_logo.svg')`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-white/20" />
          <div className="absolute inset-[-100%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_50%,#00f0ff_80%,#8b3dff_100%)]" />
        </div>

        {/* REVEALED GLOWING PNG LOGO */}
        <div className="absolute inset-0 animate-logo-fill">
          <img
            src="/images/logo/AL_logo.png"
            alt="Loading..."
            className="w-full h-full object-contain translate-x-[1px] translate-y-[-1px]"
          />
        </div>
      </div>
    </>
  );
}

function MainApp() {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // 1. Wait 2.2 seconds for the fill animation to comfortably finish
    const timer = setTimeout(() => {
      setLoading(false);

      // 2. Unmount the loader from DOM after the 700ms fade transition
      setTimeout(() => setShowLoader(false), 700);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050508] transition-opacity duration-700 ease-in-out pointer-events-none"
          style={{ opacity: loading ? 1 : 0 }}
        >
          <InitialLoader />
        </div>
      )}

      <div
        className="transition-opacity duration-1000 ease-in-out"
        style={{ opacity: loading ? 0 : 1, pointerEvents: loading ? 'none' : 'auto' }}
      >
        <App />
      </div>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div className="h-screen w-screen bg-[#050508]" />}>
      <MainApp />
    </Suspense>
  </StrictMode>,
)
