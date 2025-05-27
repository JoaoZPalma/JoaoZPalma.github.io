"use client";
import { useState, useRef } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
// import Image from "next/image";
import Scroll from './components/scroll'
import ScrollHeader from './components/scroll_header'
import Profile from './components/profile'
import Button from './components/button'
import Chest from './components/chestIcon'
import Eye from './components/eyeIcon'
import Contacts from './components/contacts'
// import Raven from './ravenIcon'
// import SimpleFrame from './frame300'

import './globals.css'

export default function Home() {

  const [showContacts, setShowContacts] = useState(false);
  const draggableRef = useRef(null);

  const handleDrag: DraggableEventHandler = (e, data) => {
    console.log("Dragged window to: ", data.x, data.y);
  }

  return (
    <div>
      {showContacts && (
        <Draggable nodeRef={draggableRef}
          onDrag={handleDrag}
          bounds="parent"
          handle=".drag-handle"
          defaultPosition={{ x: window.innerWidth * 0.05, y: window.innerHeight * 0.05 }}>
          <div ref={draggableRef} className="fixed z-50">
            <ScrollHeader
              header="CONTACT"
              onClose={() => setShowContacts(false)}
            >
              <Contacts />
            </ScrollHeader>
          </div>
        </Draggable>
      )}
      <div className="bg-secondary min-h-screen flex items-center justify-center">
        <div className="flex justify-center">
          <Scroll>
            <h1 className="text-[42px] text-darker_secondary pt-6 pl-6" style={{ fontFamily: 'AtlantisText', fontWeight: 900 }}>
              PALMA'S ELDRITCH<br />
              CODEX
            </h1>
            {/* Coluna 1 */}
            <div className="flex justify-between ">
              <div className="w-[45%]">
                <section className="w-[400px] text-[44px] text-darker_secondary leading-none pl-6" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>
                  BIO ---------------------
                  <p className="text-[28px] " style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
                    "I've bargained with Cursed Code and deciphered Ancient Docs.
                    <span className="font-bold decoration-2"> In a Mighty Quest and in need of a Coding Warlock?</span> The Ravens know where to find me..."
                  </p>
                  <p className="text-[22px] text-right italic" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
                    (or just email me, that's fine too)
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
                    <button>
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
              <div className="grid grid-cols-3 gap-4 mt-2 place-items-center">
                <div className="artifact flex flex-col items-center h-full relative">
                  <div className="flex-1 flex items-center absolute -left-9">
                    <Chest></Chest>
                  </div>
                  <p className="text-[20px] mt-1 absolute -bottom-9">Projects</p>
                </div>

                <div className="artifact flex flex-col items-center h-full relative">
                  <div className="flex-1 flex items-center">
                    <Eye></Eye>
                  </div>
                  <p className="text-[20px] mt-1 absolute -bottom-9">FAQ</p>
                </div>

                <div className="artifact flex flex-col items-center h-full relative">
                  <button onClick={() => setShowContacts(!showContacts)} className="flex-1 flex items-center justify-center">
                    <div className="crow-icon "></div>
                  </button>
                  <p className="text-[20px] mt-1 absolute -bottom-9">Contacts</p>
                </div>
              </div>
            </section>
          </Scroll>
        </div>
      </div>
    </div>
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
