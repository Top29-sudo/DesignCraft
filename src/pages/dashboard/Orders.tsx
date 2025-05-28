import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Download, Filter, Package, ShoppingCart, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { OrderType } from '../../types';

const OrdersPage = () => {
  const { user } = useAuth(); // user object now contains orders
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  
  // Orders are now directly available from the user object
  const orders = user?.orders || [];


  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div>
      {/* Dashboard Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-12 text-white">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Orders</h1>
            <p className="text-white/80">
              View and manage all your orders and track their progress.
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
                      className="flex items-center px-6 py-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border-l-4 border-primary-600 dark:border-primary-400"
                    >
                      <ShoppingCart className="h-5 w-5 mr-3 text-primary-600 dark:text-primary-400" />
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
        </div>    
            {/* Main Content */}
            <div className="lg:col-span-9">
              {/* Filter Controls */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Orders</h2>
                <div className="flex items-center space-x-2">

              </div>
              
              {/* Orders Table */}
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Loading your orders...</p>
                </div>
              ) : (
                <>
                <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Package
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Amount
                        </th>

                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Invoice
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {
                        orders.length > 0 ? (<>

                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              #{order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {order.packageName} {/* Corrected: was packageTitle */}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {formatDate(order.purchaseDate)} {/* Corrected: was createdAt */}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              ${order.price.toLocaleString()}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {order.status === 'completed' ? (
                                <button className="text-primary-600 dark:text-primary-400 hover:underline flex items-center">
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </button>
                              ) : (
                                <span className="text-gray-400 dark:text-gray-500">
                                  Not available
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </>)
                      : (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                            You have no orders yet.
                          </td>
                        </tr>
                      )
                      }
                    </tbody>
                  </table>
                </div>
              
                {/* Call to Action */}
              <div className="mt-10 bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 text-center md:text-left md:flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready for a new project?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Browse our packages to find the perfect solution for your needs.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link to="/packages">
                    <Button>View Packages</Button>
                  </Link>
                </div>
              </div>
              </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;