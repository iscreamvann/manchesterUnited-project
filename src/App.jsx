import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home';
import Fixtures from './components/Pages/Fixtures';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fixtures" element={<Fixtures />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
