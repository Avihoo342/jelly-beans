import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './api/pages/HomePage/HomePage';
import TimiPage from './api/pages/TimiPage/TimiPage';
import StatsPage from './api/pages/StatsPage/StatsPage';
import TabsNavigation from './api/components/TabsNavigation/TabsNavigation';

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
