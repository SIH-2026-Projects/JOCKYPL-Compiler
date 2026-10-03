import { BrowserRouter, Routes, Route } from "react-router-dom"
import TopBar from "./components/TopBar"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Hosts from "./pages/Hosts"
import Jobs from "./pages/Jobs"
import Evidence from "./pages/Evidence"
import Timeline from "./pages/Timeline"
import Findings from "./pages/Findings"
import Compiler from "./pages/Compiler"
import Pipelines from "./pages/Pipelines"
import Artifacts from "./pages/Artifacts"
import Research from "./pages/Research"

function App() {
  return (
    <BrowserRouter>
      <div className="jocky-app">
        <TopBar />
        <div className="jocky-body">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/hosts" element={<Hosts />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/evidence" element={<Evidence />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/findings" element={<Findings />} />
            <Route path="/compiler" element={<Compiler />} />
            <Route path="/pipelines" element={<Pipelines />} />
            <Route path="/artifacts" element={<Artifacts />} />
            <Route path="/research" element={<Research />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
