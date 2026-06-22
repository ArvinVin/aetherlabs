import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import './lib/i18n'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={
      <div className="h-screen w-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="animate-pulse text-[#00f0ff] font-mono text-sm tracking-widest">LOADING</div>
      </div>
    }>
      <App />
    </Suspense>
  </StrictMode>,
)
