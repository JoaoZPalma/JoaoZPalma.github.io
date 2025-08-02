// hooks/useImagePreloader.ts - Testing version with delays
import { useState, useEffect } from 'react';

interface UseImagePreloaderReturn {
  progress: number;
  isLoading: boolean;
  loadedImages: (HTMLImageElement | null)[];
}

type ProgressCallback = (progress: number, loaded: number, total: number) => void;

// Add this flag for testing - set to true to enable slow loading
const ENABLE_SLOW_LOADING = false; // Change to false in production
const DELAY_PER_IMAGE = 40; // Milliseconds delay per image

export const preloadImages = async (
  imageSources: string[],
  onProgress?: ProgressCallback
): Promise<(HTMLImageElement | null)[]> => {
  if (!imageSources || imageSources.length === 0) {
    return [];
  }

  let loadedCount = 0;
  const totalImages = imageSources.length;
  const loadedImages: (HTMLImageElement | null)[] = [];

  const preloadImageWithDelay = (src: string, index: number): Promise<void> => {
    return new Promise((imageResolve) => {
      const img = new Image();

      img.onload = async () => {
        if (ENABLE_SLOW_LOADING) {
          await new Promise(r => setTimeout(r, DELAY_PER_IMAGE));
        }
        loadedCount++;
        loadedImages[index] = img;
        onProgress?.((loadedCount / totalImages) * 100, loadedCount, totalImages);
        imageResolve();
      };

      img.onerror = async () => {
        console.warn(`Failed to load image: ${src}`);
        if (ENABLE_SLOW_LOADING) {
          await new Promise(r => setTimeout(r, DELAY_PER_IMAGE));
        }
        loadedCount++;
        loadedImages[index] = null;
        onProgress?.((loadedCount / totalImages) * 100, loadedCount, totalImages);
        imageResolve();
      };

      img.src = src;
    });
  };

  const loadSequentially = async (): Promise<void> => {
    for (let i = 0; i < imageSources.length; i++) {
      await preloadImageWithDelay(imageSources[i], i);
    }
  };

  if (ENABLE_SLOW_LOADING) {
    await loadSequentially();
  } else {
    await Promise.all(imageSources.map(preloadImageWithDelay));
  }

  return loadedImages;
};

export const useImagePreloader = (imageSources: string[]): UseImagePreloaderReturn => {
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedImages, setLoadedImages] = useState<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (!imageSources || imageSources.length === 0) {
      setIsLoading(false);
      return;
    }

    const loadImages = async (): Promise<void> => {
      try {
        const images = await preloadImages(imageSources, (progress, loaded, total) => {
          setProgress(progress);
          console.log(`🚀 Loading: ${loaded}/${total} images (${progress.toFixed(1)}%)`);
        });

        setLoadedImages(images);
        setIsLoading(false);
        console.log('✅ All images loaded!');
      } catch (error) {
        console.error('❌ Error loading images:', error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [imageSources]);

  return { progress, isLoading, loadedImages };
};
