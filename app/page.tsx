// Updated Home component with image preloading
"use client";
import Image from 'next/image';
import React, { ReactElement, useState, useRef, useEffect } from 'react';
import Draggable, { DraggableProps } from 'react-draggable';
import Scroll from './components/scroll'
import ScrollHeader from './components/scroll_header'
import ScrollHeaderMobile from './components/scroll_header_mobile'
import Profile from './components/profile'
import Button from './components/button'
import Chest from './components/chestIcon'
import Eye from './components/eyeIcon'
import Contacts from './components/contacts'
import Inventory from './components/inventory'
import Projects from './components/projects'
import Notes from './components/notes'
import FAQ from './components/faq'
import ThemeToggle from './components/themeToggle'
import LoadingScreen from './loading-screen'
import { preloadImages } from './hooks/useImagePreloader'

import './globals.css'
import { playSound, toggleSound, isSoundEnabled } from './soundManager';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const [controlsOpen, setControlsOpen] = useState<boolean>(false);
  const [imageLoadProgress, setImageLoadProgress] = useState<number>(0);

  // Define all images that need to be preloaded
  const imagesToPreload: string[] = [
    // Inventory images
    "/joao.png",
    "/wizardHat.png",
    "/chapeu.png",
    "/vimIcon.png",
    "/archLinux.png",
    "/aseprite.png",
    "/vue.png",
    "/react.png",
    "/photoshop.png",
    "/github.png",
    "/javascript.png",
    "/typescript.png",
    "/tailwind.png",
    "/figma.png",
    "/aseprite.png",
    "/coffee.png",
    "/nextJs.png",
    "/docker.png",
    "/latex.png",
    "/obsidian.png",
    "/html.png",
    "/css.png",
    "/c.png",
    "/java.png",
    "/python.png",
    "/sql.png",
    // SVGs from public folder
    "/Speaker-0.svg",
    "/Speaker-Crossed.svg",
    "/window.svg",
    "/vercel.svg",
    "/file.svg",
    "/globe.svg",
    "/next.svg",
    "/Speaker-1.svg",
  ];

  // Handle client-side mounting and image preloading
  useEffect(() => {
    setMounted(true);

    // Check if we should show loading only after component mounts
    const hasLoadedBefore = sessionStorage.getItem('codex-loaded');

    if (hasLoadedBefore) {
      setIsLoading(false);
      return;
    }

    // Start preloading images
    const startImagePreloading = async (): Promise<void> => {
      try {
        await preloadImages(imagesToPreload, (progress: number, loaded: number, total: number) => {
          setImageLoadProgress(progress);
          console.log(`Preloaded ${loaded}/${total} images (${progress.toFixed(1)}%)`);
        });

        console.log('All images preloaded successfully!');

        // Optional: Add a small delay to ensure loading screen is visible long enough
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('codex-loaded', 'true');
        }, 500);

      } catch (error) {
        console.error('Error preloading images:', error);
        // Still proceed even if some images failed to load
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('codex-loaded', 'true');
        }, 500);
      }
    };

    startImagePreloading();
  }, []);

  const dragBounds = { top: 0 };

  const [showContacts, setShowContacts] = useState<boolean>(false);
  const [showProjects, setShowProjects] = useState<boolean>(false);
  const [showFAQ, setShowFAQ] = useState<boolean>(false);
  const [showInventory, setShowInventory] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const [chestHoverTimeout, setChestHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [defaultPosition, setDefaultPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [leftPosition, setLeftPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rightPosition, setRightPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  function SoundToggleButton() {
    const [enabled, setEnabled] = useState<boolean>(isSoundEnabled());

    const handleToggle = (): void => {
      setEnabled(toggleSound());
    };

    return (
      <button
        onClick={handleToggle}
        className="p-2"
        aria-pressed={enabled}
        aria-label={enabled ? "Disable sound effects" : "Enable sound effects"}
        title={enabled ? "Disable sound" : "Enable sound"}
      >
        <Image
          className="w-12 h-12 pixelated"
          src={enabled ? "/Speaker-0.svg" : "/Speaker-Crossed.svg"}
          alt={enabled ? "Sound enabled" : "Sound disabled"}
          width={56}
          height={56}
        />
      </button>
    );
  }

  useEffect(() => {
    const handleResize = (): void => {
      if (typeof window !== "undefined") {
        setDefaultPosition({
          x: window.innerWidth * 0.05,
          y: window.innerHeight * 0.05,
        });
        setLeftPosition({
          x: window.innerWidth * 0.1,
          y: window.innerHeight * 0.1,
        });
        setRightPosition({
          x: window.innerWidth * 0.5,
          y: window.innerHeight * 0.1,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (chestHoverTimeout) {
        clearTimeout(chestHoverTimeout);
      }
    };
  }, [chestHoverTimeout]);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <>
        {/* PreLoad components during loading screen */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <Inventory />
          <Projects />
          <Contacts />
          <Notes />
        </div>
        <LoadingScreen
          onLoadCompleteAction={() => setIsLoading(false)}
          imageProgress={imageLoadProgress} // Pass the image loading progress
        />
      </>
    );
  }

  // Rest of your component remains the same...

  return (
    <div>
      {/* PreLoading components for readiness */}
      {showInventory && (
        <div className="md:hidden">
          <ScrollHeaderMobile
            header="INVENTORY"
            overflow={true}
            onClose={() => setShowInventory(false)}
          >
            <Inventory />
          </ScrollHeaderMobile>
        </div>
      )}
      {showInventory && (
        <div className="hidden md:block">
          <AnimatedPopup
            onClose={() => setShowInventory(false)}
            bounds={dragBounds}
            handle=".drag-handle"
            defaultPosition={rightPosition}
            ariaLabel="Inventory popup window"
            popupId="inventory-popup"
          >
            <ScrollHeader
              header="INVENTORY"
              overflow={true}
            >
              <Inventory />
            </ScrollHeader>
          </AnimatedPopup>
        </div>
      )}
      {showContacts && (
        <div className="md:hidden">
          <ScrollHeaderMobile
            header="CONTACTS"
            onClose={() => setShowContacts(false)}
          >
            <Contacts />
          </ScrollHeaderMobile>
        </div>
      )}
      {showContacts && (
        <div className="hidden md:block">
          <AnimatedPopup
            onClose={() => setShowContacts(false)}
            bounds={dragBounds}
            handle=".drag-handle"
            defaultPosition={leftPosition}
            ariaLabel="Contacts popup window"
            popupId="contacts-popup"
          >
            <ScrollHeader
              header="CONTACTS"
            >
              <Contacts />
            </ScrollHeader>
          </AnimatedPopup>
        </div>
      )}
      {showProjects && (
        <div className="md:hidden">
          <ScrollHeaderMobile
            header="PROJECTS"
            overflow={false}
            onClose={() => setShowProjects(false)}
          >
            <Projects />
          </ScrollHeaderMobile>
        </div>
      )}
      {showProjects && (
        <div className="hidden md:block">
          <AnimatedPopup
            onClose={() => setShowProjects(false)}
            bounds={dragBounds}
            handle=".drag-handle"
            defaultPosition={defaultPosition}
            ariaLabel="Projects popup window"
            popupId="projects-popup"
          >
            <ScrollHeader
              header="PROJECTS"
              overflow={false}
            >
              <Projects />
            </ScrollHeader>
          </AnimatedPopup>
        </div>
      )}
      {showFAQ && (
        <div className="md:hidden">
          <ScrollHeaderMobile
            header="FAQ"
            overflow={false}
            onClose={() => setShowFAQ(false)}
          >
            <FAQ />
          </ScrollHeaderMobile>
        </div>
      )}
      {showFAQ && (
        <div className="hidden md:block">
          <AnimatedPopup
            onClose={() => setShowFAQ(false)}
            bounds={dragBounds}
            handle=".drag-handle"
            defaultPosition={leftPosition}
            ariaLabel="FAQ popup window"
            popupId="faq-popup"
          >
            <ScrollHeader
              header="FAQ"
              overflow={false}
            >
              <FAQ />
            </ScrollHeader>
          </AnimatedPopup>
        </div>
      )}
      {showNotes && (
        <div className="md:hidden">
          <ScrollHeaderMobile
            header="NOTES"
            overflow={false}
            onClose={() => setShowNotes(false)}
          >
            <Notes />
          </ScrollHeaderMobile>
        </div>
      )}
      {showNotes && (
        <div className="hidden md:block">
          <AnimatedPopup
            onClose={() => setShowNotes(false)}
            bounds={dragBounds}
            handle=".drag-handle"
            defaultPosition={leftPosition}
            ariaLabel="Notes popup window"
            popupId="notes-popup"
          >
            <ScrollHeader
              header="NOTES"
              overflow={false}
            >
              <Notes />
            </ScrollHeader>
          </AnimatedPopup>
        </div>
      )}
      <main className="bg-bg min-h-screen w-full flex items-center justify-center">
        <div className="flex justify-center">
          <div className="md:hidden fixed top-6 left-0 z-50">
            <div className={`flex flex-col transition-all duration-300 ${controlsOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <button
                onClick={() => setControlsOpen(!controlsOpen)}
                className="bg-darker_primary border-3 border-secondary p-2 absolute right-0 transform translate-x-full"
                aria-label={controlsOpen ? "Close controls" : "Open controls"}
                style={{ fontFamily: 'AtlantisText', fontWeight: 900 }}
              >
                <span className="text-secondary text-xl">{controlsOpen ? 'x' : '☰'}</span>
              </button>
              <div className={`bg-darker_primary border-3 border-secondary py-2 flex flex-col gap-2 items-center transition-all duration-300 ${controlsOpen ? 'w-auto px-4' : 'w-0 px-0 overflow-hidden'}`}>
                <ThemeToggle />
                <SoundToggleButton />
              </div>
            </div>
          </div>

          {/* Desktop controls */}
          <section className='hidden md:flex absolute top-4 left-4 flex-row gap-4 p-2 z-10' aria-label="Main controls">
            <ThemeToggle />
            <SoundToggleButton />
          </section>
          <Scroll>
            <header>
              <h1 className="text-5xl leading-tight text-darker_secondary pt-10 md:pt-6 md:pl-6 pb-6 md:pb-0 text-center md:text-left" style={{ fontFamily: 'AtlantisText', fontWeight: 900 }}>
                PALMA&apos;S ELDRITCH<br />
                CODEX
              </h1>
            </header>
            {/* Mobile Layout - ordered flow */}
            <div className="block md:hidden px-4">
              {/* Bio Section */}
              <section className="w-full text-5xl text-darker_secondary leading-none pl-6 pr-6 overflow-hidden text-center" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }} aria-labelledby="bio-heading">
                <h2 id="bio-heading" className="mx-auto w-fit text-center overflow-hidden whitespace-nowrap">------ BIO ------</h2>
                <p className="text-2xl break-words" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
                  &quot;I&apos;ve bargained with Cursed Code and deciphered Ancient Docs.
                  <span className="font-bold decoration-2"> In a Mighty Quest and in need of a Coding Warlock?</span> The Ravens know where to find me...&quot;
                </p>
                <p className="text-xl text-center italic break-words" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
                  (or just email me, that&apos;s fine too)
                </p>
              </section>

              {/* Profile Image */}
              <div className="flex flex-col items-center mt-8 px-4">
                <Profile></Profile>
                <span className="w-full text-5xl leading-tight text-darker_secondary text-center mt-1" style={{ fontFamily: 'AtlantisText', fontWeight: 500 }} role="heading" aria-level={2}>
                  CODE WARLOCK
                </span>
              </div>

              {/* Stats Section */}
              <section className="w-full text-5xl text-darker_secondary pl-6 pr-6 mt-3 text-center" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }} aria-labelledby="stats-heading">
                <h2 id="stats-heading" className="mx-auto w-fit text-center overflow-hidden whitespace-nowrap">---- STATS ----</h2>
                <ul className="grid grid-cols-2 gap-1 text-4xl ml-4 leading-snug justify-between" role="list">
                  {stats.map((stat) => (
                    <StatItem key={stat.name} {...stat} />
                  ))}
                </ul>
              </section>

              {/* Inventory Button */}
              <div className="flex flex-col items-center gap-2 mt-6 px-4">
                <button
                  onClick={() => { playSound('click1'); setShowInventory(!showInventory); }}
                  className="drag-handle"
                  aria-label="Open inventory"
                  aria-expanded={showInventory}
                  aria-controls={showInventory ? "inventory-popup" : undefined}
                >
                  <Button>
                    inventory
                  </Button>
                </button>
              </div>

              {/* Cursed Artifacts */}
              <section className="w-full text-5xl text-darker_secondary pl-6 pr-6 pb-12 mt-3 leading-normal text-center" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }} aria-labelledby="artifacts-heading">
                <h2 id="artifacts-heading" className="overflow-hidden leading-none whitespace-nowrap">---------------------------</h2>
                <h2 id="artifacts-heading" className="text-wrap leading-none">CURSED ARTIFACTS </h2>
                <h2 id="artifacts-heading" className="overflow-hidden leading-none whitespace-nowrap">---------------------------</h2>
                <nav className="grid grid-cols-2 gap-4 mt-2 place-items-center justify-items-center px-4" role="group" aria-label="Navigation artifacts">
                  <div className="artifact flex flex-col items-center h-full relative">
                    <div className="flex-1 flex items-center">
                      <button
                        onMouseEnter={() => {
                          const timeoutId = setTimeout(() => playSound('chest_open'), 400);
                          setChestHoverTimeout(timeoutId);
                        }}
                        onMouseLeave={() => {
                          if (chestHoverTimeout) {
                            clearTimeout(chestHoverTimeout);
                            setChestHoverTimeout(null);
                          }
                        }}
                        onClick={() => {
                          playSound('click1');
                          setShowProjects(!showProjects);
                        }}
                        className="flex-1 flex items-center justify-center -ml-9"
                        aria-label="Open projects"
                        aria-expanded={showProjects}
                        aria-controls={showProjects ? "projects-popup" : undefined}
                      >
                        <Chest>
                        </Chest>
                      </button>
                    </div>
                    <p className="text-xl mt-1" aria-hidden="true">Projects</p>
                  </div>

                  <div className="artifact flex flex-col items-center h-full relative">
                    <div className="flex-1 flex items-center">
                      <button
                        onClick={() => {
                          playSound('click1');
                          setShowNotes(!showNotes);
                        }}
                        className="flex-1 flex items-center justify-center"
                        aria-label="Open notes"
                        aria-expanded={showNotes}
                        aria-controls={showNotes ? "notes-popup" : undefined}
                      >
                        <div className="notes-icon" aria-hidden="true"></div>
                      </button>
                    </div>
                    <p className="text-xl mt-1" aria-hidden="true">Notes</p>
                  </div>

                  <div className="artifact flex flex-col items-center h-full relative">
                    <div className="flex-1 flex items-center">
                      <button
                        onClick={() => {
                          playSound('click1');
                          setShowFAQ(!showFAQ);
                        }}
                        className="flex-1 flex items-center justify-center"
                        aria-label="Open FAQ"
                        aria-expanded={showFAQ}
                        aria-controls={showFAQ ? "faq-popup" : undefined}
                      >
                        <Eye />
                      </button>
                    </div>
                    <p className="text-xl mt-1" aria-hidden="true">FAQ</p>
                  </div>

                  <div className="artifact flex flex-col items-center h-full relative">
                    <button
                      onClick={() => {
                        playSound('bird');
                        setShowContacts(!showContacts);
                      }}
                      className="flex-1 flex items-center justify-center"
                      aria-label="Open contacts"
                      aria-expanded={showContacts}
                      aria-controls={showContacts ? "contacts-popup" : undefined}
                    >
                      <div className="crow-icon" aria-hidden="true"></div>
                    </button>
                    <p className="text-xl mt-1" aria-hidden="true">Contacts</p>
                  </div>
                </nav>
              </section>
            </div>

            {/* Desktop Layout - original layout */}
            <div className="hidden md:block">
              {/* Coluna 1 */}
              <div className="flex justify-between">
                <div className="w-[45%]">
                  <section className="w-[400px] text-5xl text-darker_secondary leading-none pl-6" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }} aria-labelledby="bio-heading">
                    <h2 id="bio-heading">BIO -------------------</h2>
                    <p className="text-2xl " style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
                      &quot;I&apos;ve bargained with Cursed Code and deciphered Ancient Docs.
                      <span className="font-bold decoration-2"> In a Mighty Quest and in need of a Coding Warlock?</span> The Ravens know where to find me...&quot;
                    </p>
                    <p className="text-xl text-right italic" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
                      (or just email me, that&apos;s fine too)
                    </p>
                  </section>
                  <section className="w-[400px] text-5xl text-darker_secondary pl-6" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }} aria-labelledby="stats-heading">
                    <h2 id="stats-heading">STATS ---------------</h2>
                    <ul className="grid grid-cols-2 gap-1 text-4xl ml-4 leading-snug" role="list">
                      {stats.map((stat) => (
                        <StatItem key={stat.name} {...stat} />
                      ))}
                    </ul>
                  </section>

                </div>
                {/* Coluna 2 */}
                <div className="flex flex-1 -mt-14 mr-8 items-center justify-end">
                  <div className="mt-9 flex flex-col items-center">
                    <Profile></Profile>
                    <div className="flex flex-col items-center gap-2">
                      <span className="w-full text-5xl leading-tight text-darker_secondary text-center mt-1" style={{ fontFamily: 'AtlantisText', fontWeight: 500 }} role="heading" aria-level={2}>
                        CODE WARLOCK
                      </span>
                      <button
                        onClick={() => { playSound('click1'); setShowInventory(!showInventory); }}
                        className="drag-handle"
                        aria-label="Open inventory"
                        aria-expanded={showInventory}
                        aria-controls={showInventory ? "inventory-popup" : undefined}
                      >
                        <Button>
                          inventory
                        </Button>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <section className="w-full text-5xl text-darker_secondary pl-6 mt-1 leading-normal" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }} aria-labelledby="artifacts-heading">
                <h2 id="artifacts-heading" className='overflow-hidden whitespace-nowrap'>CURSED ARTIFACTS --------------------</h2>
                <nav className="grid grid-cols-4 gap-2 mt-2 place-items-center justify-items-center -ml-4" role="group" aria-label="Navigation artifacts">
                  <div className="artifact flex flex-col items-center h-full relative">
                    <div className="flex-1 flex items-center absolute -left-9">
                      <button
                        onMouseEnter={() => {
                          const timeoutId = setTimeout(() => playSound('chest_open'), 400);
                          setChestHoverTimeout(timeoutId);
                        }}
                        onMouseLeave={() => {
                          if (chestHoverTimeout) {
                            clearTimeout(chestHoverTimeout);
                            setChestHoverTimeout(null);
                          }
                        }}
                        onClick={() => {
                          playSound('click1');
                          setShowProjects(!showProjects);
                        }}
                        className="flex-1 flex items-center justify-center"
                        aria-label="Open projects"
                        aria-expanded={showProjects}
                        aria-controls={showProjects ? "projects-popup" : undefined}
                      >
                        <Chest>
                        </Chest>
                      </button>
                    </div>
                    <p className="text-xl mt-1 absolute -bottom-9" aria-hidden="true">Projects</p>
                  </div>

                  <div className="artifact flex flex-col items-center h-full relative">
                    <div className="flex-1 flex items-center">
                      <button
                        onClick={() => {
                          playSound('click1');
                          setShowNotes(!showNotes);
                        }}
                        className="flex-1 flex items-center justify-center"
                        aria-label="Open notes"
                        aria-expanded={showNotes}
                        aria-controls={showNotes ? "notes-popup" : undefined}
                      >
                        <div className="notes-icon" aria-hidden="true"></div>
                      </button>
                    </div>
                    <p className="text-xl mt-1 absolute -bottom-9" aria-hidden="true">Notes</p>
                  </div>

                  <div className="artifact flex flex-col items-center h-full relative">
                    <div className="flex-1 flex items-center">
                      <button
                        onClick={() => {
                          playSound('click1');
                          setShowFAQ(!showFAQ);
                        }}
                        className="flex-1 flex items-center justify-center"
                        aria-label="Open FAQ"
                        aria-expanded={showFAQ}
                        aria-controls={showFAQ ? "faq-popup" : undefined}
                      >
                        <Eye />
                      </button>
                    </div>
                    <p className="text-xl mt-1 absolute -bottom-9" aria-hidden="true">FAQ</p>
                  </div>

                  <div className="artifact flex flex-col items-center h-full relative">
                    <button
                      onClick={() => {
                        playSound('bird');
                        setShowContacts(!showContacts);
                      }}
                      className="flex-1 flex items-center justify-center"
                      aria-label="Open contacts"
                      aria-expanded={showContacts}
                      aria-controls={showContacts ? "contacts-popup" : undefined}
                    >
                      <div className="crow-icon" aria-hidden="true"></div>
                    </button>
                    <p className="text-xl mt-1 absolute -bottom-9" aria-hidden="true">Contacts</p>
                  </div>
                </nav>
              </section>
            </div>
          </Scroll>
        </div>
      </main>
    </div >
  );
}

const stats = [
  { name: "STR", value: "14", description: "Palma enjoys doing physical exercise regularly such as going to the gym!" },
  { name: "INT", value: "8", description: "A very smort boy!" },
  { name: "DEX", value: "18", description: "Vim enjoyer, fingers move faster than the compiler can complain. (he wishes)" },
  { name: "WIS", value: "3", description: "Once made a 'Arroz de Pato' (a traditional portuguese dish which roughly translates to Duck Rice) without any Rice or Duck..." },
  { name: "CON", value: "10", description: "Immune to caffeine crashes (lie)." },
  { name: "CHA", value: "14", description: "Believes himself to be easy going and somewhat funny, but for the life of his do not ask him to tell a joke on the spot." },
];

const StatItem = ({ name, value, description }: { name: string; value: string; description: string }) => (
  <li className="relative" role="listitem">
    <span
      className="w-max cursor-help group inline-block underline decoration-3 hover:decoration-wavy hover:decoration-1 z-35 relative"
      tabIndex={0}
      role="button"
      aria-describedby={`${name.toLowerCase()}-description`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // Toggle tooltip visibility for keyboard users
        }
      }}
    >
      {name} - {value}
      <div
        id={`${name.toLowerCase()}-description`}
        className="hidden group-hover:block group-focus:block absolute bottom-full left-0 w-full transform mb-2 
          bg-darker_primary border-4 border-secondary p-1 text-xl"
        role="tooltip"
        aria-live="polite"
      >
        {description}
      </div>
    </span>
  </li>
);

function AnimatedPopup({
  children,
  onClose,
  ariaLabel,
  popupId,
  ...draggableProps
}: {
  children: ReactElement<{ closing?: boolean; onClose?: () => void }>;
  onClose: () => void;
  ariaLabel?: string;
  popupId?: string;
} & Partial<DraggableProps>) {
  const [visible, setVisible] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <Draggable nodeRef={popupRef} {...draggableProps}>
      <div
        id={popupId}
        ref={popupRef}
        className="fixed z-50"
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {React.cloneElement(children, {
          closing: !visible,
          onClose: handleClose
        })}
      </div>
    </Draggable>
  );
}
