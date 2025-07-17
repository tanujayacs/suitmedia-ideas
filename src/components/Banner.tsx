import React, { useEffect, useState } from 'react';

const Banner: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* 1. Gambar Background & Overlay Gelap */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/banner.jpg')` }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 2. Konten Teks di Tengah */}
      <div
        className="relative z-10 flex h-full items-center justify-center"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Ideas</h1>
          <p className="text-xl md:text-2xl">Where all our great things begin</p>
        </div>
      </div>

      {/* 3. Bentuk Putih Miring yang DIAM di Bawah */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-[25vh] bg-white"
        style={{
          // NILAI DI BAWAH INI YANG DIUBAH
          clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)',
        }}
      ></div>

    </div>
  );
};

export default Banner;