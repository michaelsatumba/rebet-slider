"use client";
import React, { useState, useRef } from 'react';
import Head from 'next/head';

const Slider: React.FC = () => {
  const [position, setPosition] = useState(0);
  const [orbColor, setOrbColor] = useState('bg-gray-800');
  const [trackColor, setTrackColor] = useState('bg-gray-500');
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const sliderWidth = sliderRef.current?.offsetWidth || 0;
    const maxPosition = sliderWidth - 30; // 30 is the width of the orb

    const moveOrb = (event: MouseEvent) => {
      const newPosition = Math.min(
        Math.max(event.clientX - (sliderRef.current?.getBoundingClientRect().left || 0) - 15, 0),
        maxPosition
      );
      setPosition(newPosition);
      updateColors(newPosition, maxPosition);
    };

    const stopMoving = () => {
      document.removeEventListener('mousemove', moveOrb);
      document.removeEventListener('mouseup', stopMoving);
      if (position === 0) {
        console.log('Declined');
      } else if (position === maxPosition) {
        console.log('Accepted');
      }
      setPosition(0); // Reset position
    };

    document.addEventListener('mousemove', moveOrb);
    document.addEventListener('mouseup', stopMoving);
  };

  const updateColors = (pos: number, maxPos: number) => {
    if (pos < maxPos / 2) {
      setOrbColor('bg-red-600');
      setTrackColor('bg-red-300');
    } else {
      setOrbColor('bg-green-600');
      setTrackColor('bg-green-300');
    }
  };

  return (
    <div className="flex items-center justify-center h-32">
      <div className={`relative w-72 h-2 ${trackColor}`} ref={sliderRef}>
        <div
          className={`absolute top-0 left-0 w-8 h-8 ${orbColor} rounded-full cursor-pointer`}
          style={{ left: position }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Head>
        <title>P2P Slider</title>
        <meta name="description" content="P2P Slider Component" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold text-white">P2P Slider</h1>
        <Slider />
      </main>
    </div>
  );
};

export default Home;
