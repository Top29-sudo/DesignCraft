import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Calendar, CheckCircle, Clock, Package, ShoppingCart, User, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0
  });

  // Calculate stats from user orders
  useEffect(() => {
    if (user && user.orders) {
      const totalOrders = user.orders.length;
      setStats({
        totalOrders
      });
    }
  }, [user]);
  
  // In a real app, fetch this data from your API
  
  return (
    <div>
      {/* Dashboard Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-12 text-white">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name || 'Client'}</h1>
            <p className="text-white/80">
              Manage your orders and account information from your personal dashboard.
            </p>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Total Orders</p>
                  <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
                </div>
              </div>
            </div>
            
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
                      className="flex items-center px-6 py-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border-l-4 border-primary-600 dark:border-primary-400"
                    >
                      <Package className="h-5 w-5 mr-3 text-primary-600 dark:text-primary-400" />
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
                      className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    >
                      <User className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                      Profile
                    </Link>
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-9">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                
                {/* Activity Timeline - In a real app, fetch this data from your API */}
                <div className="space-y-6">
                  <p className="text-gray-500 dark:text-gray-400">No recent activity to display.</p>
                </div>
              </div>
              
              {/* Recommended Packages */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card shadow="sm" border>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">E-Commerce Starter</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Based on your previous orders, we think you'd benefit from our e-commerce solution.
                      </p>
                      <Link 
                        to="/packages" 
                        className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                      >
                        View Package
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card shadow="sm" border>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Maintenance Plan</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Keep your website running smoothly with our professional maintenance service.
                      </p>
                      <Link 
                        to="/packages" 
                        className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                      >
                        View Package
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;