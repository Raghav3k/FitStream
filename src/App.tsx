import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./pages/Home";
import { InstructorProfile } from "./pages/InstructorProfile";
import { LiveStream } from "./pages/LiveStream";
import { Dashboard } from "./pages/Dashboard";
import { ThemeProvider } from "./components/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex min-h-screen flex-col bg-bg-surface text-text-main font-sans text-sm selection:bg-primary/30 overflow-x-hidden transition-colors duration-300">
          <Navbar />
          <main className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/instructor/:id" element={<InstructorProfile />} />
              <Route path="/class/:id" element={<LiveStream />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}
