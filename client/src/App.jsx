import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SubmitPage from './pages/SubmitPage';
import DashboardPage from './pages/DashboardPage';
import DetailPage from './pages/DetailPage';

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/submit" replace />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/ideas/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
