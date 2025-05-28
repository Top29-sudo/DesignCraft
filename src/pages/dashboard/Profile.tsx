import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Package, ShoppingCart, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, logout, changePassword, sendTwoFactorCode, verifyTwoFactorCode, isLoading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    phone: user?.phone || '',
    country: user?.country || '',
    address: user?.address || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 2FA State
  const [isSettingUp2FA, setIsSettingUp2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorMessage, setTwoFactorMessage] = useState('');
  const [twoFactorError, setTwoFactorError] = useState('');
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(localStorage.getItem(`2faEnabled_${user?.email}`) === 'true'); // Persist 2FA status
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    try {
      // In a real app, send data to API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSend2FACode = async () => {
    if (!user?.email) return;
    setTwoFactorError('');
    setTwoFactorMessage('');
    setIsSettingUp2FA(true);
    try {
      await sendTwoFactorCode(user.email);
      setTwoFactorMessage('A 2FA code has been sent to your email.');
    } catch (err: any) {
      setTwoFactorError(err.message || 'Failed to send 2FA code.');
    } finally {
      // Keep isSettingUp2FA true to show the code input field
    }
  };

  const handleVerify2FACode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email || !twoFactorCode) return;
    setTwoFactorError('');
    setTwoFactorMessage('');
    setIsVerifying2FA(true);
    try {
      const success = await verifyTwoFactorCode(user.email, twoFactorCode);
      if (success) {
        setTwoFactorMessage('2FA enabled successfully!');
        setTwoFactorEnabled(true);
        localStorage.setItem(`2faEnabled_${user.email}`, 'true');
        setIsSettingUp2FA(false); // Hide setup form
        setTwoFactorCode('');
      } else {
        setTwoFactorError('Invalid or expired 2FA code.');
      }
    } catch (err: any) {
      setTwoFactorError(err.message || 'Failed to verify 2FA code.');
    } finally {
      setIsVerifying2FA(false);
    }
  };

  const handleDisable2FA = () => {
    if (!user?.email) return;
    // In a real app, might require password confirmation
    localStorage.removeItem(`2faEnabled_${user.email}`);
    setTwoFactorEnabled(false);
    setTwoFactorMessage('2FA has been disabled.');
    toast.success('Two-Factor Authentication disabled.');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordMessage('');
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    setIsChangingPassword(true);
    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordMessage('Password changed successfully.');
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to change password.');
    } finally {
      setIsChangingPassword(false);
    }
  };
  
  return (
    <div>
      {/* Dashboard Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-12 text-white">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-white/80">
              Manage your account information and preferences.
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Dashboard Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Dashboard Menu</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Package className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/orders"
                      className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    >
                      <ShoppingCart className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                      My Orders
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center px-6 py-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border-l-4 border-primary-600 dark:border-primary-400"
                    >
                      <User className="h-5 w-5 mr-3 text-primary-600 dark:text-primary-400" />
                      Profile
                    </Link>
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-9">
              <Card shadow="md">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Personal Information</CardTitle>
                    {!isEditing && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-8">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-20 h-20 rounded-full mr-4"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-4">
                        <span className="text-primary-700 dark:text-primary-300 font-bold text-2xl">
                          {user?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-lg font-bold">{user?.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="form-label">Full Name</label>
                          <input 
                            type="text" 
                            name="name" 
                            className="form-input"
                            value={profileData.name}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div>
                          <label className="form-label">Email Address</label>
                          <input 
                            type="email" 
                            name="email" 
                            className="form-input"
                            value={profileData.email}
                            onChange={handleChange}
                            disabled
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Email cannot be changed
                          </p>
                        </div>
                        
                        <div>
                          <label className="form-label">Company</label>
                          <input 
                            type="text" 
                            name="company" 
                            className="form-input"
                            value={profileData.company}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div>
                          <label className="form-label">Phone Number</label>
                          <input 
                            type="tel" 
                            name="phone" 
                            className="form-input"
                            value={profileData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="form-label">Address</label>
                        <input 
                          type="text" 
                          name="address" 
                          className="form-input"
                          value={profileData.address}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label className="form-label">Country</label>
                        <input 
                          type="text" 
                          name="country" 
                          className="form-input"
                          value={profileData.country}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="flex space-x-3 pt-4">
                        <Button 
                          onClick={handleSaveProfile}
                          isLoading={isSaving}
                        >
                          {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                          disabled={isSaving}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</p>
                          <p className="mt-1">{profileData.name}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</p>
                          <p className="mt-1">{profileData.email}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</p>
                          <p className="mt-1">{profileData.company}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</p>
                          <p className="mt-1">{profileData.phone}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</p>
                        <p className="mt-1">{profileData.address}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</p>
                        <p className="mt-1">{profileData.country}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Security Settings */}
              <Card className="mt-8" shadow="md">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">Password</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Last changed 30 days ago
                        </p>
                      </div>
                      {/* This button is now part of the Change Password Card below */}
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                          <p className="text-gray-500 dark:text-gray-400">
                            {twoFactorEnabled ? '2FA is currently enabled.' : 'Add an extra layer of security to your account.'}
                          </p>
                        </div>
                        {!twoFactorEnabled && !isSettingUp2FA && (
                          <Button variant="outline" size="sm" onClick={handleSend2FACode} disabled={authLoading}>
                            Setup 2FA
                          </Button>
                        )}
                        {twoFactorEnabled && (
                           <Button variant="dangerOutline" size="sm" onClick={handleDisable2FA} disabled={authLoading}>
                             Disable 2FA
                           </Button>
                        )}
                      </div>

                      {isSettingUp2FA && !twoFactorEnabled && (
                        <form className="mt-4 space-y-4" onSubmit={handleVerify2FACode}>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Enter the code sent to your email address ({user?.email}).
                          </p>
                          <div>
                            <label htmlFor="twoFactorCode" className="sr-only">2FA Code</label>
                            <input 
                              type="text" 
                              name="twoFactorCode" 
                              id="twoFactorCode"
                              className="form-input w-full md:w-1/2"
                              value={twoFactorCode}
                              onChange={(e) => setTwoFactorCode(e.target.value)}
                              placeholder="Enter 6-digit code"
                              required
                              disabled={isVerifying2FA || authLoading}
                              maxLength={6}
                            />
                          </div>
                          {twoFactorMessage && <p className="text-sm text-green-600 dark:text-green-400">{twoFactorMessage}</p>}
                          {twoFactorError && <p className="text-sm text-red-600 dark:text-red-400">{twoFactorError}</p>}
                          <div className="flex space-x-3">
                            <Button type="submit" disabled={isVerifying2FA || authLoading || !twoFactorCode}>
                              {isVerifying2FA ? 'Verifying...' : 'Verify & Enable 2FA'}
                            </Button>
                            <Button variant="outline" onClick={() => { setIsSettingUp2FA(false); setTwoFactorError(''); setTwoFactorMessage(''); }} disabled={isVerifying2FA || authLoading}>
                              Cancel
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <h3 className="text-lg font-medium text-error-600 dark:text-error-400">Logout</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Sign out of your account on this device
                        </p>
                      </div>
                      <Button variant="danger" size="sm" onClick={logout}>
                        Logout
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Change Password Section */}
              <Card shadow="md" className="mt-8">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" onSubmit={handleChangePassword}>
                    <div>
                      <label htmlFor="currentPassword" className="form-label">Current Password</label>
                      <input 
                        type="password" 
                        name="currentPassword" 
                        id="currentPassword"
                        className="form-input"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                        disabled={isChangingPassword || authLoading}
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="form-label">New Password</label>
                      <input 
                        type="password" 
                        name="newPassword" 
                        id="newPassword"
                        className="form-input"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                        disabled={isChangingPassword || authLoading}
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                      <input 
                        type="password" 
                        name="confirmNewPassword" 
                        id="confirmNewPassword"
                        className="form-input"
                        value={passwordData.confirmNewPassword}
                        onChange={handlePasswordChange}
                        required
                        disabled={isChangingPassword || authLoading}
                      />
                    </div>
                    {passwordMessage && <p className="text-sm text-green-600 dark:text-green-400">{passwordMessage}</p>}
                    {passwordError && <p className="text-sm text-red-600 dark:text-red-400">{passwordError}</p>}
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isChangingPassword || authLoading}>
                        {isChangingPassword || authLoading ? 'Saving...' : 'Change Password'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;