import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';

const ResetPasswordPage = () => {
  const { resetPassword, isLoading } = useAuth();
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token.');
      // Consider redirecting or showing a more prominent error
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!token) {
        setError('Reset token is missing.');
        return;
    }
    setError('');
    setMessage('');
    try {
      await resetPassword(token, newPassword);
      setMessage('Your password has been reset successfully. You can now log in.');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3s
    } catch (err: any) {
      setError(err.message || 'Failed to reset password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold text-gray-900 dark:text-white">Reset Your Password</CardTitle>
            <CardDescription className="mt-2 text-gray-600 dark:text-gray-400">
              Enter your new password below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!token ? (
              <p className="text-center text-red-600 dark:text-red-400">{error || 'Invalid password reset link.'}</p>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="new-password">New Password</label>
                  <Input
                    id="new-password"
                    name="newPassword"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password">Confirm New Password</label>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    disabled={isLoading}
                  />
                </div>

                {message && <p className="text-sm text-green-600 dark:text-green-400">{message}</p>}
                {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

                <div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                </div>
              </form>
            )}
            <div className="mt-6 text-center">
              <p className="text-sm">
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                  Back to Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;