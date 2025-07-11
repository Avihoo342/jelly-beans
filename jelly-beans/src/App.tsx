import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import TimiPage from './pages/TimiPage/TimiPage';
import StatsPage from './pages/StatsPage/StatsPage';
import TabsNavigation from './components/TabsNavigation/TabsNavigation';

function App() {
  return (
    <BrowserRouter>
      <TabsNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timi" element={<TimiPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
