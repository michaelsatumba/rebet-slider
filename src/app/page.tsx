"use client";
import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Player } from '@lottiefiles/react-lottie-player';

const Slider: React.FC = () => {
    // Initial position of the slider, starting at the center
  const [position, setPosition] = useState(120);

  // Default orb image (orange)
  const [orbImage, setOrbImage] = useState('/StaticAssets/orange_button.png');

  // Default track color
  const [trackColor, setTrackColor] = useState('bg-gray-500');

  // State to track if the slider is being dragged
  const [isDragging, setIsDragging] = useState(false);

  // State to track if the slider is in a neutral position
  const [isNeutral, setIsNeutral] = useState(true);

  // Reference to the slider DOM element
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Maximum position the slider can move to, adjust based on your slider width
  const maxPosition = 240;

  // Function to handle the mouse down event on the slider
  const handleMouseDown = () => {
    // Set the dragging state to true
    setIsDragging(true);
  };

   const handleMouseMove = (e: MouseEvent) => {
    // If the slider is not being dragged, do nothing
    if (!isDragging) return;

    // Calculate the new position of the slider
    const newPosition = Math.min(
      // Ensure the new position is within the bounds of the slider
      Math.max(e.clientX - (sliderRef.current?.getBoundingClientRect().left || 0) - 25, 0),
      maxPosition
    );

    // Update the position state with the new position
    setPosition(newPosition);

    // Update the orb image based on the new position
    updateOrbImage(newPosition);
  };

  const handleMouseUp = () => {
    // Set the dragging state to false
    setIsDragging(false);

    // Check the position to trigger actions
    if (position <= 0) {
      // Trigger action for left side
      handleLeftAction();
    } else if (position >= maxPosition) {
      // Trigger action for right side
      handleRightAction();
    }

    // Reset position to center
    setPosition(maxPosition / 2);

    // Reset to orange orb
    setOrbImage('/StaticAssets/orange_button.png');

    // Reset track color to default
    setTrackColor('bg-gray-500');

    // Set to neutral state
    setIsNeutral(true);
  };

  // Define the action for the left side
  const handleLeftAction = () => {
    // Log a message to the console
    console.log("Action triggered for left side!");

    // Display an alert to the user
    alert("You have declined!");
  };

  // Define the action for the right side
  const handleRightAction = () => {
    // Log a message to the console
    console.log("Action triggered for right side!");

    // Display an alert to the user
    alert("You have accepted!");
  };

  const updateOrbImage = (pos: number) => {
    // Check if the position is less than half of the maximum position
    if (pos < maxPosition / 2) {
      // Change to red button when dragged left
      setOrbImage('/StaticAssets/red_button.png');
      // Set the track color to a light red
      setTrackColor('bg-red-300');
      // Set the neutral state to false
      setIsNeutral(false);
    } else {
      // Change to green button when dragged right
      setOrbImage('/StaticAssets/green_button.png');
      // Set the track color to a light green
      setTrackColor('bg-green-300');
      // Set the neutral state to false
      setIsNeutral(false);
    }
  };

  useEffect(() => {
    // Define a global mouse move handler
    const handleMouseMoveGlobal = (e: MouseEvent) => handleMouseMove(e);

    // Define a global mouse up handler
    const handleMouseUpGlobal = () => handleMouseUp();

    // Add event listeners for mouse move and mouse up events
    document.addEventListener('mousemove', handleMouseMoveGlobal);
    document.addEventListener('mouseup', handleMouseUpGlobal);

    // Cleanup function to remove event listeners when the component unmounts or dependencies change
    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [isDragging, handleMouseMove]);

    const renderLeftSideContent = () => {
    // Check if the position is less than half of the maximum position
    if (position < maxPosition / 2) {
      // Render content for the left side (Red)
      return (
        <div className="flex items-center space-x-2">
          <Image src="/StaticAssets/red_close.png" alt="Close" width={30} height={30} />
          <span className="text-red-600">Decline</span>
          <Image src="/StaticAssets/red_left_arrows.png" alt="Left Arrow" width={30} height={30} />
        </div>
      );
    } else if (position > maxPosition / 2) {
      // Render content for the right side (Green)
      return (
        <div className="flex items-center space-x-2">
          <Image src="/StaticAssets/green_close.png" alt="Close" width={30} height={30} />
          <span className="text-green-600">Decline</span>
          <Image src="/StaticAssets/green_left_arrows.png" alt="Left Arrow" width={30} height={30} />
        </div>
      );
    } else {
      // Render content for the neutral position (Orange)
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
    // Check if the position is less than half of the maximum position
    if (position < maxPosition / 2) {
      // Render content for the left side (Red)
      return (
        <div className="flex items-center space-x-2">
          <Image src="/StaticAssets/red_right_arrows.png" alt="Right Arrow" width={30} height={30} />
          <span className="text-red-600">Accept</span>
          <Image src="/StaticAssets/red_check.png" alt="Check" width={30} height={30} />
        </div>
      );
    } else if (position > maxPosition / 2) {
      // Render content for the right side (Green)
      return (
        <div className="flex items-center space-x-2">
          <Image src="/StaticAssets/green_right_arrows.png" alt="Right Arrow" width={30} height={30} />
          <span className="text-green-600">Accept</span>
          <Image src="/StaticAssets/green_check.png" alt="Check" width={30} height={30} />
        </div>
      );
    } else {
      // Render content for the neutral position (Orange)
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

// Function to get the border color class based on the track color
const getBorderColorClass = (trackColor: string) => {
  // Switch statement to determine the border color class
  switch (trackColor) {
    case 'bg-red-300':
      // Return the border color class for red track color
      return 'border-red-600';
    case 'bg-green-300':
      // Return the border color class for green track color
      return 'border-green-600';
    case 'bg-gray-500':
      // Return the border color class for gray track color
      return 'border-orange-400';
    default:
      // Return the default border color class
      return 'border-orange-400';
  }
};

return (
  // Container for the slider, centered horizontally and vertically
  <div className="flex items-center justify-center h-32">
    {/* Slider track with dynamic background and border color */}
    <div className={`relative w-72 h-8 rounded-md ${trackColor} ${getBorderColorClass(trackColor)} border-2`} ref={sliderRef}>
      {/* Orb element that moves along the slider track */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer transition-all duration-200"
        style={{ left: position }}
        onMouseDown={handleMouseDown}
      >
        {/* Orb image with optional pulse animation */}
        <Image src={orbImage} alt="Orb" width={50} height={50} className={isNeutral ? 'animate-pulse' : ''} />
      </div>
      {/* Left side content (e.g., Decline) */}
      <div className="absolute left-0 flex items-center space-x-2">
        {renderLeftSideContent()}
      </div>
      {/* Right side content (e.g., Accept) */}
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
      {/* Head component for setting the page title and meta tags */}
      <Head>
        <title>Rebet Slider</title>
        <meta name="description" content="Rebet Slider" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Main content area */}
      <main className="flex flex-col row-start-2">
        {/* Page title */}
        <h1 className="text-3xl font-bold text-white">Rebet Slider</h1>
        {/* Slider component */}
        <Slider />
      </main>
    </div>
  );
};

export default Home