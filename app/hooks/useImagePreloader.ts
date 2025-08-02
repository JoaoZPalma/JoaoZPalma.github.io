// hooks/useImagePreloader.ts - Testing version with delays
import { useState, useEffect } from 'react';

interface UseImagePreloaderReturn {
  progress: number;
  isLoading: boolean;
  loadedImages: (HTMLImageElement | null)[];
}

type ProgressCallback = (progress: number, loaded: number, total: number) => void;

// Add this flag for testing - set to true to enable slow loading
const ENABLE_SLOW_LOADING = true; // Change to false in production
const DELAY_PER_IMAGE = 40; // Milliseconds delay per image

export const preloadImages = (
  imageSources: string[],
  onProgress?: ProgressCallback
): Promise<(HTMLImageElement | null)[]> => {
  return new Promise((resolve) => {
    if (!imageSources || imageSources.length === 0) {
      resolve([]);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageSources.length;
    const loadedImages: (HTMLImageElement | null)[] = [];

    const preloadImageWithDelay = async (src: string, index: number): Promise<void> => {
      return new Promise((imageResolve) => {
        const img = new Image();

        img.onload = async (): Promise<void> => {
          // Add artificial delay for testing
          if (ENABLE_SLOW_LOADING) {
            await new Promise(resolve => setTimeout(resolve, DELAY_PER_IMAGE));
          }

          loadedCount++;
          loadedImages[index] = img;

          const progress = (loadedCount / totalImages) * 100;
          onProgress?.(progress, loadedCount, totalImages);

          if (loadedCount === totalImages) {
            resolve(loadedImages);
          }
          imageResolve();
        };

        img.onerror = async (): Promise<void> => {
          console.warn(`Failed to load image: ${src}`);

          // Add delay even for errors
          if (ENABLE_SLOW_LOADING) {
            await new Promise(resolve => setTimeout(resolve, DELAY_PER_IMAGE));
          }

          loadedCount++;
          loadedImages[index] = null;

          const progress = (loadedCount / totalImages) * 100;
          onProgress?.(progress, loadedCount, totalImages);

          if (loadedCount === totalImages) {
            resolve(loadedImages);
          }
          imageResolve();
        };

        img.src = src;
      });
    };

    // Load images sequentially for more visible progress (optional)
    const loadSequentially = async (): Promise<void> => {
      for (let i = 0; i < imageSources.length; i++) {
        await preloadImageWithDelay(imageSources[i], i);
      }
    };

    // Choose loading strategy
    if (ENABLE_SLOW_LOADING) {
      // Sequential loading for more visible progress
      loadSequentially();
    } else {
      // Parallel loading for production
      imageSources.forEach((src: string, index: number) => {
        preloadImageWithDelay(src, index);
      });
    }
  });
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
