import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';
  const { login, isLoading, forgotPassword, sendTwoFactorCode, verifyTwoFactorCode } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isAwaiting2FA, setIsAwaiting2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (isAwaiting2FA) {
      // Handle 2FA verification
      try {
        const success = await verifyTwoFactorCode(formData.email, twoFactorCode);
        if (success) {
          toast.success('Login successful!');
          navigate(from);
        } else {
          setLoginError('Invalid or expired 2FA code.');
          toast.error('Invalid or expired 2FA code.');
        }
      } catch (error: any) {
        setLoginError(error.message || 'Failed to verify 2FA code.');
        toast.error(error.message || 'Failed to verify 2FA code.');
      }
      return;
    }

    // Handle initial login (email/password)
    try {
      // Check if 2FA is enabled for this user *before* attempting full login
      // This usually involves a backend check, here we simulate with localStorage
      const twoFactorEnabledForUser = localStorage.getItem(`2faEnabled_${formData.email}`) === 'true';

      if (twoFactorEnabledForUser) {
        // User has 2FA enabled, send code and prompt for it
        await sendTwoFactorCode(formData.email);
        setIsAwaiting2FA(true);
        toast.success('A 2FA code has been sent to your email.');
      } else {
        // No 2FA, proceed with normal login
        await login(formData.email, formData.password);
        toast.success('Login successful!');
        navigate(from);
      }
    } catch (error: any) {
      if (error.message === 'User not registered. Please sign up.') {
        setLoginError(error.message);
        toast.error(error.message);
        navigate('/register', { state: { email: formData.email } });
      } else {
        setLoginError(error.message || 'Failed to login. Please check your credentials.');
        toast.error(error.message || 'Failed to login. Please check your credentials.');
      }
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-900 rounded-xl shadow">
        <div>
          <h1 className="text-center text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {loginError && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <p>{loginError}</p>
            </div>
          )}
          {!isAwaiting2FA ? (
            <>
              <div className="space-y-4">
                <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-input"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="form-input pr-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 dark:text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 dark:text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.227 14.424 5.547 16.5 8 19.319M18.02 8.223A10.477 10.477 0 0120.066 12C18.773 14.424 16.453 16.5 14 19.319M12 12h.01M6 12a6 6 0 0112 0A6 6 0 006 12z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <button 
                  type="button"
                  onClick={async () => {
                    if (!formData.email) {
                      toast.error('Please enter your email address first.');
                      return;
                    }
                    try {
                      await forgotPassword(formData.email);
                      toast.success('If an account exists for this email, a password reset link has been sent.');
                    } catch (error: any) {
                      toast.error(error.message || 'Failed to send password reset email.');
                    }
                  }}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline focus:outline-none"
                >
                  Forgot your password?
                </button>
              </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="twoFactorCode" className="form-label">
                  Two-Factor Authentication Code
                </label>
                <input
                  id="twoFactorCode"
                  name="twoFactorCode"
                  type="text"
                  required
                  className="form-input"
                  placeholder="Enter 6-digit code"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  maxLength={6}
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  A code has been sent to your email: {formData.email}
                </p>
              </div>
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            {isLoading ? (isAwaiting2FA ? 'Verifying Code...' : 'Signing in...') : (isAwaiting2FA ? 'Verify Code' : 'Sign in')}
          </Button>

          {isAwaiting2FA && (
            <Button
              type="button"
              variant="outline"
              className="w-full mt-2"
              onClick={() => {
                setIsAwaiting2FA(false);
                setTwoFactorCode('');
                setLoginError('');
              }}
              disabled={isLoading}
            >
              Back to Login
            </Button>
          )}
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;