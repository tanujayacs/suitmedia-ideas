import React from 'react';
import { Idea } from '../types';
import LazyImage from './LazyImage';

interface CardProps {
  idea: Idea;
}

const Card: React.FC<CardProps> = ({ idea }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="aspect-[16/10] bg-gray-200">
        <LazyImage
          src={idea.small_image || '/api/placeholder/400/250'}
          alt={idea.title}
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="text-sm text-gray-500 mb-3">
          {formatDate(idea.published_at)}
        </div>

        {/* Title with 3-line limit */}
        <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-3 leading-relaxed">
          {idea.title}
        </h3>
      </div>
    </div>
  );
};

export default Card;