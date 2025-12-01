import { Route, Routes } from 'react-router'

import { About } from '@/components/about'
import { FontsLoader, Inject } from '@/components/inject'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <div className="bg-background w-120 p-5">
      <Routes>
        <Route element={<Inject />} path="/" />
        <Route element={<About />} path="about" />
      </Routes>

      {/* load fonts for popup */}
      <FontsLoader />

      {/* add shadcn sonner */}
      <Toaster closeButton />
    </div>
  )
}

export default App
