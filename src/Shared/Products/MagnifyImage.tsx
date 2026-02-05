import React, { useState, useRef, MouseEvent, TouchEvent } from 'react';
import Image from 'next/image';

interface ImageMagnifierProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    magnifierSize?: number;
    zoomLevel?: number;
    className?: string;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
    src,
    alt,
    width = 600,
    height = 600,
    magnifierSize = 200,
    zoomLevel = 2.5,
    className = '',
}) => {
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [[x, y], setXY] = useState([0, 0]);
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const imgRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
        const elem = e.currentTarget;
        const { width, height } = elem.getBoundingClientRect();
        setSize([width, height]);
        setShowMagnifier(true);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const elem = e.currentTarget;
        const { top, left } = elem.getBoundingClientRect();

        // Calculate cursor position relative to the image (mouse)
        const x = e.pageX - left - window.pageXOffset;
        const y = e.pageY - top - window.pageYOffset;
        setXY([x, y]);
    };

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        const elem = e.currentTarget;
        const { width, height, top, left } = elem.getBoundingClientRect();

        const touch = e.touches[0];
        if (!touch) return;

        const x = touch.pageX - left - window.pageXOffset;
        const y = touch.pageY - top - window.pageYOffset;

        setSize([width, height]);
        setXY([x, y]);
        setShowMagnifier(true);
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        const elem = e.currentTarget;
        const { top, left } = elem.getBoundingClientRect();

        const touch = e.touches[0];
        if (!touch) return;

        // Calculate touch position relative to the image (mobile)
        const x = touch.pageX - left - window.pageXOffset;
        const y = touch.pageY - top - window.pageYOffset;
        setXY([x, y]);
    };

    const handleTouchEnd = () => {
        setShowMagnifier(false);
    };

    const handleMouseLeave = () => {
        setShowMagnifier(false);
    };

    return (
        <div
            ref={imgRef}
            className={`relative inline-block cursor-none ${className}`}
            style={{ width, height }}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
        >
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="object-cover w-full h-full"
                priority
            />

            {showMagnifier && (
                <div
                    className="absolute border-4 border-gray-400 rounded-full pointer-events-none shadow-2xl overflow-hidden"
                    style={{
                        height: `${magnifierSize}px`,
                        width: `${magnifierSize}px`,
                        top: `${y - magnifierSize / 2}px`,
                        left: `${x - magnifierSize / 2}px`,
                        opacity: '1',
                        backgroundColor: 'white',
                        backgroundImage: `url('${src}')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
                        backgroundPositionX: `${-x * zoomLevel + magnifierSize / 2}px`,
                        backgroundPositionY: `${-y * zoomLevel + magnifierSize / 2}px`,
                    }}
                >
                    {/* Optional: Add a crosshair in the center */}
                </div>
            )}
        </div>
    );
};

export default ImageMagnifier;