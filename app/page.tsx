"use client";
import Image from 'next/image';
import React, { ReactElement, useState, useRef, useEffect } from 'react';
import Draggable, { DraggableProps } from 'react-draggable';
import Scroll from './components/scroll'
import ScrollHeader from './components/scroll_header'
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

import './globals.css'
import { playSound, toggleSound, isSoundEnabled } from './soundManager';

export default function Home() {

  const dragBounds = { top: 0 };

  const [showContacts, setShowContacts] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const [chestHoverTimeout, setChestHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 });
  const [leftPosition, setLeftPosition] = useState({ x: 0, y: 0 });
  const [rightPosition, setRightPosition] = useState({ x: 0, y: 0 });


  function SoundToggleButton() {
    const [enabled, setEnabled] = useState(isSoundEnabled());

    const handleToggle = () => {
      setEnabled(toggleSound());
    };

    return (
      <button
        onClick={handleToggle}
        aria-pressed={!enabled}
        title={enabled ? "Disable sound" : "Enable sound"}
      >
        <Image className="w-6 h-6" src={enabled ? "/Speaker-0.svg" : "/Speaker-Crossed.svg"} alt="Sound Icon" width={24} height={24} />
      </button>
    );
  }

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <div style={{ display: 'none' }}>
        <Inventory />
      </div>
      <div style={{ display: 'none' }}>
        <Projects />
      </div>
      <div style={{ display: 'none' }}>
        <Contacts />
      </div>
      <div style={{ display: 'none' }}>
        <Notes />
      </div>
      {showInventory && (
        <AnimatedPopup
          onClose={() => setShowInventory(false)}
          bounds={dragBounds}
          handle=".drag-handle"
          defaultPosition={rightPosition}
        >
          <ScrollHeader
            header="INVENTORY"
            overflow={true}
          >
            <Inventory />
          </ScrollHeader>
        </AnimatedPopup>
      )}
      {showContacts && (
        <AnimatedPopup
          onClose={() => setShowContacts(false)}
          bounds={dragBounds}
          handle=".drag-handle"
          defaultPosition={leftPosition}
        >
          <ScrollHeader
            header="CONTACTS"
          >
            <Contacts />
          </ScrollHeader>
        </AnimatedPopup>
      )}
      {showProjects && (
        <AnimatedPopup
          onClose={() => setShowProjects(false)}
          bounds={dragBounds}
          handle=".drag-handle"
          defaultPosition={defaultPosition}
        >
          <ScrollHeader
            header="PROJECTS"
            overflow={false}
          >
            <Projects />
          </ScrollHeader>
        </AnimatedPopup>
      )}
      {showFAQ && (
        <AnimatedPopup
          onClose={() => setShowFAQ(false)}
          bounds={dragBounds}
          handle=".drag-handle"
          defaultPosition={leftPosition}
        >
          <ScrollHeader
            header="FAQ"
            overflow={false}
          >
            <FAQ />
          </ScrollHeader>
        </AnimatedPopup>
      )}
      {showNotes && (
        <AnimatedPopup
          onClose={() => setShowNotes(false)}
          bounds={dragBounds}
          handle=".drag-handle"
          defaultPosition={leftPosition}
        >
          <ScrollHeader
            header="NOTES"
            overflow={false}
          >
            <Notes />
          </ScrollHeader>
        </AnimatedPopup>
      )}
      <div className="bg-bg min-h-screen flex items-center justify-center">
        <div className="flex justify-center">
          <div className='absolute top-4 left-4 flex flex-row gap-4'>
            <ThemeToggle />

            <SoundToggleButton />
          </div>
          <Scroll>
            <h1 className="text-[42px] text-darker_secondary pt-6 pl-6" style={{ fontFamily: 'AtlantisText', fontWeight: 900 }}>
              PALMA&apos;S ELDRITCH<br />
              CODEX
            </h1>
            {/* Coluna 1 */}
            <div className="flex justify-between ">
              <div className="w-[45%]">
                <section className="w-[400px] text-[44px] text-darker_secondary leading-none pl-6" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>
                  BIO ---------------------
                  <p className="text-[28px] " style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
                    &quot;I&apos;ve bargained with Cursed Code and deciphered Ancient Docs.
                    <span className="font-bold decoration-2"> In a Mighty Quest and in need of a Coding Warlock?</span> The Ravens know where to find me...&quot;
                  </p>
                  <p className="text-[22px] text-right italic" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
                    (or just email me, that&apos;s fine too)
                  </p>
                </section>
                <section className="w-[400px] text-[44px] text-darker_secondary pl-6" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>
                  STATS -----------------
                  <ul className="grid grid-cols-2 gap-1 text-[34px] ml-4 leading-snug">
                    {stats.map((stat) => (
                      <StatItem key={stat.name} {...stat} />
                    ))}
                  </ul>
                </section>

              </div>
              {/* Coluna 2 */}
              <div className="w-[45%] -mt-14 ">
                <div className="mt-9 flex flex-col items-center">
                  <Profile></Profile>
                  <div className="flex flex-col items-center gap-2">
                    <span className="w-full text-[44px] text-darker_secondary text-center mt-1" style={{ fontFamily: 'AtlantisText', fontWeight: 500 }}>
                      CODE WARLOCK
                    </span>
                    <button onClick={() => { playSound('click1'); setShowInventory(!showInventory); }} className="drag-handle">
                      <Button>
                        inventory
                      </Button>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <section className="w-full text-[44px] text-darker_secondary pl-6 mt-1" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>
              CURSED ARTIFACTS -------------------------
              <div className="grid grid-cols-4 gap-2 mt-2 place-items-center justify-items-center -ml-4">
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
                      className="flex-1 flex items-center justify-center">
                      <Chest>
                      </Chest>
                    </button>
                  </div>
                  <p className="text-[20px] mt-1 absolute -bottom-9">Projects</p>
                </div>

                <div className="artifact flex flex-col items-center h-full relative">
                  <div className="flex-1 flex items-center">
                    <button
                      onClick={() => {
                        playSound('click1');
                        setShowNotes(!showNotes);
                      }}
                      className="flex-1 flex items-center justify-center">
                      <div className="notes-icon"></div>
                    </button>
                  </div>
                  <p className="text-[20px] mt-1 absolute -bottom-9">Notes</p>
                </div>

                <div className="artifact flex flex-col items-center h-full relative">
                  <div className="flex-1 flex items-center">
                    <button
                      onClick={() => {
                        playSound('click1');
                        setShowFAQ(!showFAQ);
                      }}
                      className="flex-1 flex items-center justify-center"
                    >
                      <Eye />
                    </button>
                  </div>
                  <p className="text-[20px] mt-1 absolute -bottom-9">FAQ</p>
                </div>

                <div className="artifact flex flex-col items-center h-full relative">
                  <button
                    onClick={() => {
                      playSound('bird');
                      setShowContacts(!showContacts);
                    }}
                    className="flex-1 flex items-center justify-center"
                  >
                    <div className="crow-icon "></div>
                  </button>
                  <p className="text-[20px] mt-1 absolute -bottom-9">Contacts</p>
                </div>
              </div>
            </section>
          </Scroll>
        </div>
      </div>
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
  <li className="relative">
    <span className="w-max cursor-help group inline-block underline decoration-3 hover:decoration-wavy hover:decoration-1">
      {name} - {value}
      <div className="hidden group-hover:block absolute bottom-full left-0 w-full transform mb-2 
        bg-darker_primary border-2 border-secondary p-1 text-[20px]">
        {description}
      </div>
    </span>
  </li>
);

function AnimatedPopup({
  children,
  onClose,
  ...draggableProps
}: {
  children: ReactElement<{ closing?: boolean; onClose?: () => void }>;
  onClose: () => void;
} & Partial<DraggableProps>) {
  const [visible, setVisible] = useState(true);
  const popupRef = useRef<HTMLElement>(null);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 150);
  };

  return (
    <Draggable nodeRef={popupRef as React.RefObject<HTMLElement>} {...draggableProps}>
      <div
        ref={(el) => {
          popupRef.current = el!; // Non-null assertion since we know the div will exist
        }}
        className="fixed z-50"
      >
        {React.cloneElement(children, {
          closing: !visible,
          onClose: handleClose
        })}
      </div>
    </Draggable>
  );
}
