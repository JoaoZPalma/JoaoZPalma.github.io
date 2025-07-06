"use client";
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadCompleteAction: () => void;
}

export default function LoadingScreen({ onLoadCompleteAction }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentFact, setCurrentFact] = useState('');

  // Fun facts and jokes for loading screen
  const loadingFacts = [
    "Arcane fact: The first documented bug was an actual moth trapped in a computer in 1947!",
    "Did you know? Wizards prefer TypeScript – fewer cursed scrolls.",
    "Developer lore: Coffee is the true source of all spellcasting power ☕",
    "Debug tip: Try talking to a rubber duck familiar. It works.",
    "Fun fact: The 'spam' curse originated in a Monty Python chant!",
    "History check: Ada Lovelace cast the first program in 1843!",
    "Joke: Why do code wizards prefer dark mode? Light attracts bugs!",
    "Mythos: GitHub’s Octocat is said to be part demon, part mascot 🐙",
    "Did you know? Stack Overflow has answered more questions than any village elder.",
    "Joke: How many spellcasters to change a lantern rune? None, it's a hardware ritual!",
    "Ancient code: The first computer virus was summoned in 1971!",
    "Did you know? HTML was the first incantation to bind text with links!",
    "Joke: Why do Java sorcerers wear glasses? Because they can't C#!",
    "Mascot trivia: The Linux penguin, Tux, once defeated a BSD daemon in ritual combat.",
    "Did you know? The '@' rune has been used in messages since 1971!",
    "Joke: There are only 10 kinds of warlocks: those who understand binary and those who don’t!",
    "Timeless link: The first website still exists at info.cern.ch – guarded by ancient firewalls.",
    "Did you know? WiFi is short for 'Wizardry for Internet Frequency Incantations' (just kidding)",
    "Joke: Why did the sorcerer go broke? He used all his cache on potions!",
    "Loading... Please don’t press F5, the ritual is delicate."
  ];

  // Complete list of all images used in your application
  const imagesToPreload = [
    './frame250.png',
    './chapeu.png',
    './joao.png',

    // *.svg files (from sound toggle and other components)
    '/Speaker-0.svg',
    '/Speaker-Crossed.svg',

    // *.png files (from inventory component)
    '/vimIcon.png',
    '/archLinux.png',
    '/vue.png',
    '/react.png',
    '/photoshop.png',
    '/github.png',
    '/javascript.png',
    '/typescript.png',
    '/tailwind.png',
    '/figma.png',
    '/aseprite.png',
    '/coffee.png',
    '/nextJs.png',
    '/docker.png',
    '/latex.png',
    '/obsidian.png',
    '/html.png',
    '/css.png',
    '/c.png',
    '/java.png',
    '/python.png',
    '/sql.png',
    '/frame250.png', // from frame300.tsx
    '/contactCrow.png', // from contacts component
    '/linkedinIcone.png', // from contacts component  
    '/githubIcone.png', // from contacts component

    // *.ico files
    '/favicon.ico',

    // Add any other images your components use
    // Profile image if you have one
    // Background images if any
    // Any other assets in your public folder
  ];

  const totalImages = imagesToPreload.length;

  useEffect(() => {
    let mounted = true;
    let loadedCount = 0;
    const imageRefs: HTMLImageElement[] = [];

    // Separate fact rotation timer
    const startFactRotation = () => {
      if (mounted) {
        setCurrentFact(loadingFacts[Math.floor(Math.random() * loadingFacts.length)]);
      }

      const factInterval = setInterval(() => {
        if (mounted) {
          setCurrentFact(loadingFacts[Math.floor(Math.random() * loadingFacts.length)]);
        }
      }, 5000); // Change fact every 5 seconds

      return factInterval;
    };

    const preloadImages = async () => {
      // Handle empty image list
      if (totalImages === 0) {
        if (mounted) {
          setProgress(100);
          setTimeout(() => {
            onLoadCompleteAction();
          }, 500);
        }
        return;
      }

      // Set initial state and start fact rotation
      setProgress(0);
      const factInterval = startFactRotation();

      const imagePromises = imagesToPreload.map((src, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          imageRefs.push(img);

          const imageName = src.split('/').pop()?.split('.')[0] || 'Unknown';

          const handleLoad = () => {
            if (mounted) {
              loadedCount++;
              const newProgress = (loadedCount / totalImages) * 100;
              setProgress(newProgress);
              console.log(`Loaded ${loadedCount}/${totalImages}: ${imageName} (${newProgress.toFixed(1)}%)`);
            }
            resolve();
          };

          const handleError = () => {
            console.warn(`Failed to load image: ${src}`);
            if (mounted) {
              loadedCount++;
              const newProgress = (loadedCount / totalImages) * 100;
              setProgress(newProgress);
              console.log(`Failed ${loadedCount}/${totalImages}: ${imageName} (${newProgress.toFixed(1)}%)`);
            }
            resolve(); // Continue even if image fails
          };

          // Add a small delay to make the loading visible
          setTimeout(() => {
            img.onload = handleLoad;
            img.onerror = handleError;
            img.src = src;
          }, index * 50); // Stagger loading 
        });
      });

      try {
        await Promise.all(imagePromises);

        if (mounted) {
          clearInterval(factInterval);
          setCurrentFact('Ready to explore the codex!');
          // Mark as loaded in session storage
          sessionStorage.setItem('codex-loaded', 'true');
          // Small delay to show 100% before transitioning
          setTimeout(() => {
            if (mounted) {
              onLoadCompleteAction();
            }
          }, 800);
        }
      } catch (error) {
        console.error('Error during image preloading:', error);
        if (mounted) {
          clearInterval(factInterval);
          // Mark as loaded even on error
          sessionStorage.setItem('codex-loaded', 'true');
          onLoadCompleteAction();
        }
      }
    };

    preloadImages();

    return () => {
      mounted = false;
      // Cleanup image references
      imageRefs.forEach(img => {
        img.onload = null;
        img.onerror = null;
        img.src = '';
      });
    };
  }, [onLoadCompleteAction]);

  return (
    <div
      className="fixed inset-0 bg-bg flex items-center justify-center z-50 px-4 md:px-0"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Loading progress: ${Math.round(progress)}%`}
    >
      <div className="text-center flex flex-col items-center justify-center pixelated w-full md:w-auto max-w-lg md:max-w-none">
        <h1
          className="text-3xl md:text-5xl text-darker_primary mb-6 md:mb-8 pixelated underline decoration-2 md:decoration-4 underline-offset-4 md:underline-offset-8"
          style={{
            fontFamily: 'AtlantisText', fontWeight: 900
          }}
        >
          LOADING CODEX...
        </h1>

        <div className="w-full md:w-[500px] h-8 md:h-10 bg-darker_secondary border-4 md:border-6 border-darker_secondary pixelated relative overflow-hidden">
          <div
            className="h-full bg-darker_primary transition-all duration-300 ease-linear pixelated"
            style={{
              width: `${progress}%`,
              imageRendering: 'pixelated'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-secondary text-lg md:text-xl font-bold z-10"
              style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}
            >
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        <div className="mt-4 md:mt-6 bg-darker_primary border-4 md:border-6 border-darker_secondary p-3 md:p-4 w-full md:max-w-lg pixelated">
          <p
            className="text-secondary text-base md:text-xl text-center leading-relaxed md:leading-normal"
            style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}
          >
            {currentFact}
          </p>
        </div>
      </div>
    </div>
  );
}
