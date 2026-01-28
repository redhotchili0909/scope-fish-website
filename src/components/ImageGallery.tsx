import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn } from 'lucide-react';

interface ImageLightboxProps {
    images: { src: string; caption?: string }[];
    currentIndex: number;
    onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ images, currentIndex, onClose }) => {
    const [index, setIndex] = useState(currentIndex);
    const currentImage = images[index];

    const handlePrevious = () => {
        setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const handleNext = () => {
        setIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'ArrowRight') handleNext();
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return createPortal(
        <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
            >
                <X className="w-6 h-6" />
            </button>

            <div
                className="relative max-w-7xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={currentImage.src}
                    alt={currentImage.caption || 'Full size image'}
                    className="max-w-full max-h-[80vh] object-contain"
                />

                {currentImage.caption && (
                    <p className="text-white text-center mt-4 text-sm">
                        {currentImage.caption}
                    </p>
                )}

                {images.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                        <button
                            onClick={handlePrevious}
                            className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                        >
                            ← Previous
                        </button>
                        <span className="px-4 py-2 text-white">
                            {index + 1} / {images.length}
                        </span>
                        <button
                            onClick={handleNext}
                            className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

interface ImageGalleryProps {
    images: { src: string; caption?: string }[];
    title: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    return (
        <>
            <div className="mt-4 grid gap-4">
                {images.map((img, imgIndex) => (
                    <figure
                        key={imgIndex}
                        className="bg-panel border border-border rounded overflow-hidden cursor-pointer group relative"
                        onClick={() => setLightboxIndex(imgIndex)}
                    >
                        <div className="relative max-h-[300px] overflow-hidden flex items-center justify-center bg-panel">
                            <img
                                src={img.src}
                                alt={img.caption || title}
                                className="w-full h-auto max-h-[300px] object-contain"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect fill="%23f0f0f0" width="400" height="200"/><text fill="%23888" font-family="sans-serif" font-size="14" x="50%" y="50%" text-anchor="middle" dy=".3em">Image: ' + encodeURIComponent(img.src.split('/').pop() || 'placeholder') + '</text></svg>';
                                }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3">
                                    <ZoomIn className="w-6 h-6 text-gray-800" />
                                </div>
                            </div>
                        </div>
                        {img.caption && (
                            <figcaption className="px-4 py-2 text-sm text-text-muted italic">
                                {img.caption}
                            </figcaption>
                        )}
                    </figure>
                ))}
            </div>

            {lightboxIndex !== null && (
                <ImageLightbox
                    images={images}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </>
    );
};
