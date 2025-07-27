import React, { useState } from 'react';
import { Star, Check } from 'lucide-react';

interface Criterion {
  name: string;
  rating?: number;
}

interface RatingSystemProps {
  title: string;
  criteria: Criterion[];
  onRate: (index: number, rating: number) => void;
}

const RatingSystem: React.FC<RatingSystemProps> = ({ title, criteria, onRate }) => {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [hoveredStars, setHoveredStars] = useState<{ [key: number]: number }>({});
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleStarClick = (criterionIndex: number, starValue: number) => {
    setRatings(prev => ({ ...prev, [criterionIndex]: starValue }));
    onRate(criterionIndex, starValue);
  };

  const handleStarHover = (criterionIndex: number, starValue: number) => {
    setHoveredStars(prev => ({ ...prev, [criterionIndex]: starValue }));
  };

  const handleStarLeave = (criterionIndex: number) => {
    setHoveredStars(prev => {
      const newState = { ...prev };
      delete newState[criterionIndex];
      return newState;
    });
  };

  const handleSubmit = () => {
    // Check if at least one rating is provided
    const hasRatings = Object.keys(ratings).length > 0 && Object.values(ratings).some(rating => rating > 0);
    
    if (!hasRatings) {
      alert('Please provide at least one rating before submitting.');
      return;
    }

    setShowAnimation(true);
    
    // After animation completes, show success state
    setTimeout(() => {
      setIsSubmitted(true);
      setShowAnimation(false);
    }, 1000);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setComment('');
      setRatings({});
    }, 3000);
  };

  const getStarRating = (criterionIndex: number) => {
    return hoveredStars[criterionIndex] || ratings[criterionIndex] || 0;
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg shadow p-4 m-4">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">Thank You!</h3>
          <p className="text-gray-600">Your rating has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 m-4">
      <h3 className="text-2xl text-green-700 text-center mb-4">{title}</h3>
      
      {criteria.map((criterion, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-800">{criterion.name}</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map(star => {
                const currentRating = getStarRating(index);
                const isActive = star <= currentRating;
                
                return (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer transition-all duration-200 transform hover:scale-110 ${
                      isActive 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300 hover:text-yellow-300'
                    }`}
                    onClick={() => handleStarClick(index, star)}
                    onMouseEnter={() => handleStarHover(index, star)}
                    onMouseLeave={() => handleStarLeave(index)}
                  />
                );
              })}
            </div>
          </div>
          {ratings[index] && ratings[index] > 0 && (
            <div className="text-right">
              <span className="text-xs text-gray-500">
                {ratings[index]}/5 stars
              </span>
            </div>
          )}
        </div>
      ))}
      
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience (optional)..."
        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
        rows={3}
      />
      
      <button
        onClick={handleSubmit}
        disabled={showAnimation}
        className={`w-full py-2.5 rounded-lg mt-3 font-semibold transition-all duration-300 relative overflow-hidden ${
          showAnimation
            ? 'bg-green-600 text-white'
            : 'bg-green-600 text-white hover:bg-green-700'
        } ${showAnimation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {showAnimation ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            Submitting...
          </div>
        ) : (
          'Submit Rating'
        )}
        
        {/* Tick Animation Overlay */}
        {showAnimation && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-bounce">
              <Check className="w-6 h-6 text-white animate-pulse" />
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export { RatingSystem };