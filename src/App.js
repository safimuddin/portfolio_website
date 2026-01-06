import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Education } from "./components/Education";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { AskMe } from "./components/AskMe";
import ASMRBackground from "./components/ASMRBackground";
import ScrollComet from "./components/ScrollComet";
import ScrollProgressBar from "./components/ScrollProgressBar";
import GlobePage from "./pages/GlobePage";

function PortfolioHome() {
  return (
    <div className="App">
      <ASMRBackground />
      <ScrollComet />
      <ScrollProgressBar 
        type="circle" 
        position="bottom-right" 
        color="#AA367C" 
        showPercentage={true} 
      />
      <NavBar/>
      <Banner/>
      <Education/>
      <Skills/>
      <Experience/>
      <Projects/>
      <AskMe/>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/globe" element={<GlobePage />} />
      </Routes>
    </Router>
  );
}

export default App;