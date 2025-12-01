import { Route, Routes } from 'react-router'

import { About } from '@/components/about'
import { Inject } from '@/components/inject'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <div className="bg-background w-120 p-4">
      <Routes>
        <Route element={<Inject />} path="/" />
        <Route element={<About />} path="about" />
      </Routes>

      {/* add shadcn sonner */}
      <Toaster closeButton richColors />
    </div>
  )
}

export default App
