import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { PackageType } from '../../types/index';
import { useAuth } from '../../hooks/useAuth';
import { useRegionPricing } from '../../hooks/useRegionPricing';
import toast from 'react-hot-toast';

interface PackageCardProps {
  packageData: PackageType;
}

const PackageCard = ({ packageData }: PackageCardProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, addOrder } = useAuth(); // Added user and addOrder
  const { formatPrice, location } = useRegionPricing();
  const [isOrdering, setIsOrdering] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'awaiting_payment' | 'processing' | 'success' | 'failed'>('idle');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'bank' | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const UPI_LIMIT_INR = 5000; // Example UPI limit
  
  const handlePurchase = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to purchase a package', { 
        icon: '🔒',
        duration: 4000
      });
      navigate('/login', { state: { from: '/packages' } });
      return;
    }
    
    setIsOrdering(true); // Keep this for overall purchase process

    // Determine payment method based on price (assuming priceInr is available)
    // For simplicity, let's assume packageData.priceInr is populated by useRegionPricing or similar
    // If priceInr is not available, we might need to fetch it or use a default/conversion
    const priceInr = packageData.priceInr || packageData.priceUsd * 80; // Fallback conversion

    if (priceInr <= UPI_LIMIT_INR) {
      setPaymentMethod('upi');
    } else {
      setPaymentMethod('bank');
    }
    setShowPaymentDetails(true);
    setPaymentStatus('awaiting_payment');
    // We will not proceed to 'processing' immediately. User needs to confirm payment.
  };

  const handlePaymentConfirmation = async () => {
    if (!transactionId.trim()) {
      toast.error('Please enter the transaction ID.');
      return;
    }
    setShowPaymentDetails(false);
    setPaymentStatus('processing');
    setIsOrdering(true); // Ensure this is true when processing starts

    try {
      // Simulate API call to payment gateway
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      const paymentSuccessful = Math.random() > 0.2; // 80% success rate

      if (paymentSuccessful) {
        setPaymentStatus('success');
        // Create a new order object (basic version)
        const newOrderData: Omit<OrderType, 'id' | 'purchaseDate' | 'status' | 'paymentVerified' | 'paymentMethod' | 'transactionId'> = {
          packageName: packageData.title,
          packageTier: packageData.tier,
          price: packageData.priceUsd, // Storing USD price, adjust if INR is primary
          currency: location === 'IN' ? 'INR' : 'USD', // Storing USD price, adjust if INR is primary
          features: packageData.features,
        };

        // Mock email sending to specified email
        console.log('Email sent to kenkaneki9330@gmail.com');
        
        // The addOrder call and navigation are moved into a try-catch block below
        toast.success('Payment successful! Your order has been placed.', {
          duration: 5000
        });
        console.log('Attempting to navigate to /dashboard/orders');
        try {
          // Ensure addOrder completes before navigation if it's async in nature, though it's sync in useAuthStore
          addOrder(newOrderData, { 
            paymentMethod: paymentMethod || 'mock', 
            transactionId: transactionId 
          });
          console.log('Order added, now navigating.');
          navigate('/dashboard/orders');
        } catch (navError) {
          console.error('Error during addOrder or navigation:', navError);
          toast.error('Could not navigate to orders. Please check your orders page manually.');
        }
      } else {
        setPaymentStatus('failed');
        toast.error('Payment failed. Please try again or contact support.');
      }
    } catch (error) {
      setPaymentStatus('failed');
      toast.error('An error occurred during payment. Please try again.');
    } finally {
      setIsOrdering(false); // This will be set to false after processing finishes
      // Reset payment method and transaction ID for next purchase
      // setPaymentMethod(null); 
      // setTransactionId(''); 
      // setPaymentStatus('idle'); // Reset status if needed, or keep success/failed for history
    }
  };
  
  return (
    <Card 
      className={`h-full flex flex-col transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        packageData.popular ? 'border-2 border-primary-500 dark:border-primary-400' : ''
      }`}
      shadow="md"
    >
      {packageData.popular && (
        <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
          Popular
        </div>
      )}
      
      <CardHeader>
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium
            ${packageData.tier === 'starter' 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' 
              : packageData.tier === 'advanced'
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
                : 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100'
            }
          `}>
            {packageData.tier === 'starter' 
              ? 'Starter' 
              : packageData.tier === 'advanced' 
                ? 'Advanced' 
                : 'Premium'
            }
          </span>
        </div>
        <CardTitle className="text-2xl">{packageData.title}</CardTitle>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {packageData.description}
        </p>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="mb-6">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatPrice(packageData)}
          </p>
          {location && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Prices shown in your local currency ({location.country})
            </p>
          )}
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Estimated delivery: <span className="font-medium text-gray-900 dark:text-white">{packageData.deliveryTime}</span>
          </p>
        </div>
        
        <ul className="space-y-3 mt-6">
          {packageData.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5 mr-2" />
              <span className="text-gray-600 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="border-t border-gray-100 dark:border-gray-800">
        <Button 
          className="w-full" 
          onClick={handlePurchase}
          isLoading={isOrdering && paymentStatus !== 'awaiting_payment'} // Loading only when not awaiting user action
          disabled={isOrdering && paymentStatus !== 'awaiting_payment'}
        >
          {paymentStatus === 'awaiting_payment' ? 'Show Payment Instructions' : 
           paymentStatus === 'processing' ? 'Verifying Payment...' : 
           'Purchase Package'}
        </Button>
        {showPaymentDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Complete Your Payment</h3>
              {paymentMethod === 'upi' && (
                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300">Please pay using UPI to the following ID:</p>
                  <p className="font-mono text-lg bg-gray-100 dark:bg-gray-700 p-2 rounded my-2 text-gray-900 dark:text-white">9330909171@superyes</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Amount: {formatPrice(packageData)}</p>
                </div>
              )}
              {paymentMethod === 'bank' && (
                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300">Please transfer to the following bank account:</p>
                  <ul className="list-disc list-inside bg-gray-100 dark:bg-gray-700 p-3 rounded my-2 text-gray-900 dark:text-white">
                    <li>Acc no.: 263601000003901</li>
                    <li>Holder name: Sarannya Chaudhuri</li>
                    <li>IFSC: IOBA0002636</li>
                    <li>Branch: Konnagar</li>
                  </ul>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Amount: {formatPrice(packageData)}</p>
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Transaction ID / Reference No.</label>
                <input 
                  type="text" 
                  id="transactionId" 
                  name="transactionId"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your payment transaction ID"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => { setShowPaymentDetails(false); setIsOrdering(false); setPaymentStatus('idle'); }}>Cancel</Button>
                <Button onClick={handlePaymentConfirmation} isLoading={paymentStatus === 'processing'}>
                  {paymentStatus === 'processing' ? 'Verifying...' : 'I have Paid'}
                </Button>
              </div>
            </div>
          </div>
        )}

        <a 
          href="https://wa.me/919330909171?text=I'm%20interested%20in%20your%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Support on WhatsApp
        </a>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;