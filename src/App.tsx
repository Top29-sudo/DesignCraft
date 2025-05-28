import { Routes, Route } from 'react-router-dom';

// Components
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/Home';
import PackagesPage from './pages/Packages';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import FaqPage from './pages/Faq';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import ForgotPasswordPage from './pages/auth/ForgotPassword';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import DashboardPage from './pages/dashboard/Dashboard';
import OrdersPage from './pages/dashboard/Orders';
import ProfilePage from './pages/dashboard/Profile';

// Protected Route
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="packages" element={<PackagesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password/:token" element={<ResetPasswordPage />} />
        
        {/* Protected Routes */}
        <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="dashboard/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
        <Route path="dashboard/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default App;