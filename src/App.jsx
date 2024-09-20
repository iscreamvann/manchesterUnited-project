import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home';
import Fixtures from './components/Pages/Fixtures';
import Standings from './components/Pages/Standings'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/standings" element={<Standings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
