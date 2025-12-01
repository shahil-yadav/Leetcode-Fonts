import { About } from "@/components/about";
import { Inject } from "@/components/inject";
import { Toaster } from "@/components/ui/sonner";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="bg-background w-120 p-4">
      <Routes>
        <Route path="/" element={<Inject />} />
        <Route path="about" element={<About />} />
      </Routes>

      {/* add shadcn sonner */}
      <Toaster richColors closeButton />
    </div>
  );
}

export default App;
