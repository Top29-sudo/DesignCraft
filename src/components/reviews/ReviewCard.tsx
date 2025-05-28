import { Star } from 'lucide-react';
import { Card } from '../ui/Card';
import { ReviewType } from '../../types';

interface ReviewCardProps {
  review: ReviewType;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  // Format date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <Card className="h-full flex flex-col" shadow="sm" border>
      <div className="p-6">
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
        </div>
        
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-4">
          {review.packageTitle}
        </p>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {review.comment}
        </p>
        
        <div className="flex items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
          {review.userAvatar ? (
            <img
              src={review.userAvatar}
              alt={review.userName}
              className="w-10 h-10 rounded-full mr-3"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
              <span className="text-primary-700 dark:text-primary-300 font-medium">
                {review.userName.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          
          <div>
            <p className="font-medium text-gray-900 dark:text-white flex items-center">
              {review.userName}
              {review.verified && (
                <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                  Verified
                </span>
              )}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(review.date)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;