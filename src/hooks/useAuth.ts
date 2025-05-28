import { create } from 'zustand';
import { OrderType } from '../types/index';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin?: boolean;
  balance: number;
  company?: string;
  phone?: string;
  country?: string;
  address?: string;
  orders?: OrderType[];
  // passwordHash?: string; // For a real app
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  addOrder: (order: Omit<OrderType, 'id' | 'purchaseDate' | 'status' | 'paymentVerified' | 'paymentMethod' | 'transactionId'>, paymentDetails: { paymentMethod: 'upi' | 'bank' | 'mock', transactionId: string }) => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  sendTwoFactorCode: (email: string) => Promise<string>; // Returns a mock code
  verifyTwoFactorCode: (email: string, code: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (email, password) => {
    set({ isLoading: true });
    const storedUsers = localStorage.getItem('users');
    let users: User[] = [];
    if (storedUsers) {
      try {
        users = JSON.parse(storedUsers);
      } catch (e) { 
        console.error("Failed to parse users from localStorage during login", e);
        users = []; 
      }
    }
    const existingUser = users.find((user: User) => user.email === email);

    if (!existingUser) {
      set({ isLoading: false });
      throw new Error('User not registered. Please sign up.');
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
      
      // In a real app, you would compare password against existingUser.passwordHash
      // For this demo, we'll allow login if user exists, and check admin creds specifically
      const isAdminLogin = existingUser.email === 'eyepatch1310' && password === 'EyePatch@890933';
      
      const userData: User = {
        ...existingUser,
        isAdmin: existingUser.isAdmin || isAdminLogin, 
      };
      
      localStorage.setItem('user', JSON.stringify(userData)); // Set current logged-in user
      set({ user: userData, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const emailRegex = /^[^\u0000-\u001F\s@]+@[^\u0000-\u001F\s@]+\.[^\u0000-\u001F\s@]+$/; // Stricter regex
      if (!emailRegex.test(email)) {
        set({ isLoading: false });
        throw new Error('Invalid email format');
      }

      const storedUsers = localStorage.getItem('users');
      let users: User[] = [];
      if (storedUsers) {
        try {
          users = JSON.parse(storedUsers);
        } catch (e) { 
          console.error("Failed to parse users from localStorage during registration", e);
          users = [];
        }
      }
      
      const userExists = users.some(user => user.email === email);
      if (userExists) {
        set({ isLoading: false });
        throw new Error('User with this email already exists.');
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
      
      // In a real app, hash the password before storing
      // const passwordHash = await bcrypt.hash(password, 10);

      const newUser: User = {
        id: crypto.randomUUID(),
        name,
        email,
        // passwordHash, 
        avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(name)}`,
        isAdmin: false,
        balance: 0,
        company: '',
        phone: '',
        country: '',
        address: '',
        orders: []
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users)); 
      localStorage.setItem('user', JSON.stringify(newUser)); 
      set({ user: newUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
    // Optional: localStorage.removeItem('users'); // To clear all users for demo purposes
    set({ user: null, isAuthenticated: false });
  },

  addOrder: (newOrderData, paymentDetails) => {
    const currentUser = get().user;
    if (currentUser) {
      const completeNewOrder: OrderType = {
        ...newOrderData,
        id: `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        purchaseDate: new Date().toISOString(),
        status: 'Pending', // Or 'Pending Payment Verification'
        paymentMethod: paymentDetails.paymentMethod,
        transactionId: paymentDetails.transactionId,
        paymentVerified: false, // Default to false, admin/system would verify
      };

      const updatedUser = {
        ...currentUser,
        orders: [...(currentUser.orders || []), completeNewOrder],
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      const storedUsers = localStorage.getItem('users');
      let users: User[] = [];
      if (storedUsers) {
        try {
          users = JSON.parse(storedUsers);
        } catch (e) { 
          console.error("Failed to parse users from localStorage during addOrder", e);
          users = []; 
        }
      }
      const userIndex = users.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
      }
      set({ user: updatedUser });
    }
  },

  forgotPassword: async (email: string) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call

      const storedUsers = localStorage.getItem('users');
      let users: User[] = [];
      if (storedUsers) {
        try {
          users = JSON.parse(storedUsers);
        } catch (e) {
          console.error("Failed to parse users from localStorage during forgotPassword", e);
          users = [];
        }
      }
      const existingUser = users.find((user: User) => user.email === email);

      if (!existingUser) {
        set({ isLoading: false });
        throw new Error('No user found with this email address.');
      }

      // In a real app, generate a secure token and store it with an expiry
      const resetToken = `mockResetToken_${Date.now()}`;
      localStorage.setItem(`resetToken_${existingUser.email}`, resetToken); // Store token (mock)

      console.log(`Password reset link (mock) would be sent to ${email} for user ${existingUser.name}. Token: ${resetToken}`);
      alert(`If this were a real app, a password reset link with token ${resetToken} would be sent to ${email}.`);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  resetPassword: async (token, newPassword) => {
    set({ isLoading: true });
    // In a real app, validate the token and its expiry
    // For this mock, we'll find the user associated with the token
    // This is highly insecure and for demo purposes only.
    let userEmailForToken: string | null = null;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('resetToken_') && localStorage.getItem(key) === token) {
        userEmailForToken = key.substring('resetToken_'.length);
        break;
      }
    }

    if (!userEmailForToken) {
      set({ isLoading: false });
      throw new Error('Invalid or expired reset token.');
    }

    const storedUsers = localStorage.getItem('users');
    let users: User[] = [];
    if (storedUsers) { users = JSON.parse(storedUsers); }
    const userIndex = users.findIndex(u => u.email === userEmailForToken);

    if (userIndex === -1) {
      set({ isLoading: false });
      throw new Error('User not found for this token.');
    }

    // In a real app, hash the newPassword
    // users[userIndex].passwordHash = await bcrypt.hash(newPassword, 10);
    console.log(`Password for ${users[userIndex].email} would be updated to ${newPassword} (mock).`);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.removeItem(`resetToken_${userEmailForToken}`); // Invalidate token

    set({ isLoading: false });
    alert('Password has been reset successfully. Please log in with your new password.');
  },

  changePassword: async (currentPassword, newPassword) => {
    set({ isLoading: true });
    const currentUser = get().user;
    if (!currentUser) {
      set({ isLoading: false });
      throw new Error('User not logged in.');
    }

    // In a real app, verify currentPassword against currentUser.passwordHash
    // For this demo, we'll assume currentPassword is correct if it's not empty
    if (!currentPassword) { // Simplified check for demo
        set({ isLoading: false });
        throw new Error('Incorrect current password.');
    }

    const storedUsers = localStorage.getItem('users');
    let users: User[] = [];
    if (storedUsers) { users = JSON.parse(storedUsers); }
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex === -1) {
      set({ isLoading: false });
      throw new Error('User not found.');
    }

    // In a real app, hash the newPassword
    // users[userIndex].passwordHash = await bcrypt.hash(newPassword, 10);
    console.log(`Password for ${users[userIndex].email} would be changed (mock).`);
    localStorage.setItem('users', JSON.stringify(users));

    set({ isLoading: false });
    alert('Password changed successfully.');
  },

  sendTwoFactorCode: async (email) => {
    set({ isLoading: true });
    // In a real app, generate a secure code and send it via email
    const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem(`2faCode_${email}`, mockCode); // Store code (mock)
    localStorage.setItem(`2faCodeExpiry_${email}`, (Date.now() + 5 * 60 * 1000).toString()); // 5 min expiry

    console.log(`2FA code for ${email}: ${mockCode} (mock email sending)`);
    alert(`If this were a real app, a 2FA code ${mockCode} would be sent to ${email}.`);
    set({ isLoading: false });
    return mockCode; 
  },

  verifyTwoFactorCode: async (email, code) => {
    set({ isLoading: true });
    const storedCode = localStorage.getItem(`2faCode_${email}`);
    const expiryTime = localStorage.getItem(`2faCodeExpiry_${email}`);

    if (storedCode === code && expiryTime && Date.now() < parseInt(expiryTime)) {
      localStorage.removeItem(`2faCode_${email}`);
      localStorage.removeItem(`2faCodeExpiry_${email}`);
      set({ isLoading: false });
      return true;
    }
    set({ isLoading: false });
    return false;
  }
}));

const initAuth = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      useAuthStore.setState({ user: userData, isAuthenticated: true });
    } catch (error) {
      console.error('Failed to parse current user data from localStorage during initAuth', error);
      localStorage.removeItem('user');
    }
  }
};

initAuth();

export const useAuth = () => useAuthStore();