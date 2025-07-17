import React, { useEffect, useState } from 'react';

const Banner: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[75vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/banner.png')`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      <div
        className="relative z-10 h-full flex items-center justify-center text-white text-center"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="px-6">
          <h1 className="text-6xl md:text-7xl font-bold tracking-wider">Ideas</h1>
          <p className="text-xl mt-4">Where all our great things begin</p>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-20 bg-white"
        style={{ clipPath: 'polygon(0 100%, 100% 0%, 100% 100%)' }}
      />
    </section>
  );
};

export default Banner;
