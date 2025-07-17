import React, { useEffect, useState } from 'react';

const Banner: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/banner.jpg')`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div 
        className="relative z-10 flex items-center justify-center h-full"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Ideas</h1>
          <p className="text-xl md:text-2xl">Where all our great things begin</p>
        </div>
      </div>

      {/* Diagonal Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white transform -skew-y-1 origin-bottom-left"></div>
    </div>
  );
};

export default Banner;