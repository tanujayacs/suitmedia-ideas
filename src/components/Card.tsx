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
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <LazyImage
          src={idea.small_image || '/card.jpg'}
          alt={idea.title}
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">
          {formatDate(idea.published_at)}
        </div>
        
        <h3 
          className="text-lg font-semibold text-dark-gray mb-3 line-clamp-3"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {idea.title}
        </h3>
      </div>
    </div>
  );
};

export default Card;