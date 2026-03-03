import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatorPage from './pages/CreatorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatorPage />} />
      </Routes>
    </Router>
  );
}

export default App;