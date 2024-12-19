"use client";
import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Player } from '@lottiefiles/react-lottie-player';

const Slider: React.FC = () => {
  const [position, setPosition] = useState(120); // Start at center
  const [orbImage, setOrbImage] = useState('/StaticAssets/orange_button.png'); // Default orb image (orange)
  const [trackColor, setTrackColor] = useState('bg-gray-500');
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const maxPosition = 240; // Adjust based on your slider width

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newPosition = Math.min(
      Math.max(e.clientX - (sliderRef.current?.getBoundingClientRect().left || 0) - 25, 0), // Adjust for orb size
      maxPosition
    );
    setPosition(newPosition);
    updateOrbImage(newPosition);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Reset position to center
    setPosition(maxPosition / 2);
    setOrbImage('/StaticAssets/orange_button.png'); // Reset to orange orb
    setTrackColor('bg-gray-500'); // Reset track color to default
  };

  const updateOrbImage = (pos: number) => {
    if (pos < maxPosition / 2) {
      setOrbImage('/StaticAssets/red_button.png'); // Change to red button when dragged left
      setTrackColor('bg-red-300');
    } else {
      setOrbImage('/StaticAssets/green_button.png'); // Change to green button when dragged right
      setTrackColor('bg-green-300');
    }
  };

  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => handleMouseMove(e);
    const handleMouseUpGlobal = () => handleMouseUp();

    document.addEventListener('mousemove', handleMouseMoveGlobal);
    document.addEventListener('mouseup', handleMouseUpGlobal);

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [isDragging, , handleMouseMove]);

  const renderLeftSideContent = () => {
    if (position < maxPosition / 2) {
      // Left (Red)
      return (
        <div className="flex items-center space-x-2">
          <Image src="/StaticAssets/red_close.png" alt="Close" width={30} height={30} />
          <span className="text-red-600">Decline</span>
          <Image src="/StaticAssets/red_left_arrows.png" alt="Left Arrow" width={30} height={30} />
        </div>
      );
    } else if (position > maxPosition / 2) {
      // Right (Green)
      return (
        <div className="flex items-center space-x-2">
          <Image src="/StaticAssets/green_close.png" alt="Close" width={30} height={30} />
          <span className="text-green-600">Decline</span>
          <Image src="/StaticAssets/green_left_arrows.png" alt="Left Arrow" width={30} height={30} />
        </div>
      );
    } else {
      // Neutral (Orange)
      return (
        <div className="flex items-center space-x-2">
          <Image src="/StaticAssets/white_close.png" alt="Close" width={30} height={30} />
          <span className="text-white">Decline</span>
          <Player
            autoplay
            loop
            src="AnimatedAssets/glowing_left_arrows.json" // Path to your Lottie animation
            style={{ width: '30px', height: '30px' }}
          />
        </div>
      );
    }
  };

  const renderRightSideContent = () => {
    if (position < maxPosition / 2) {
      // Left (Red)
      return (
        <div className="flex items-center space-x-2">
<Image src="/StaticAssets/red_right_arrows.png" alt="Right Arrow" width={30} height={30} />
<span className="text-red-600">Accept</span>
<Image src="/StaticAssets/red_check.png" alt="Check" width={30} height={30} />
</div>
);
} else if (position > maxPosition / 2) {
// Right (Green)
return (
<div className="flex items-center space-x-2">
<Image src="/StaticAssets/green_right_arrows.png" alt="Right Arrow" width={30} height={30} />
<span className="text-green-600">Accept</span>
<Image src="/StaticAssets/green_check.png" alt="Check" width={30} height={30} />
</div>
);
} else {
// Neutral (Orange)
return (
<div className="flex items-center space-x-2">
<Player
  autoplay
  loop
  src="AnimatedAssets/glowing_right_arrows.json" // Path to your Lottie animation
  style={{ width: '30px', height: '30px' }}
/>
<span className="text-white">Accept</span>
<Image src="/StaticAssets/white_check.png" alt="Check" width={30} height={30} />
</div>
);
}
};

const getBorderColorClass = (trackColor: string) => {
  switch (trackColor) {
    case 'bg-red-300':
      return 'border-red-600';
    case 'bg-green-300':
      return 'border-green-600';
    case 'bg-gray-500':
      return 'border-orange-400';
    // Add more cases as needed
    default:
      return 'border-orange-400'; // Default border color
  }
};

return (
<div className="flex items-center justify-center h-32">
<div className={`relative w-72 h-8 rounded-md ${trackColor}  ${getBorderColorClass(trackColor)} border-2`} ref={sliderRef}>
<div
className="absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer transition-all duration-200"
style={{ left: position }}
onMouseDown={handleMouseDown}
>
<Image src={orbImage} alt="Orb" width={50} height={50} />
</div>
<div className="absolute left-0 flex items-center space-x-2">
{renderLeftSideContent()}
</div>
<div className="absolute right-0 flex items-center space-x-2">
{renderRightSideContent()}
</div>
</div>
</div>
);
};

const Home: React.FC = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Head>
        <title>Rebet Slider</title>
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

export default Home