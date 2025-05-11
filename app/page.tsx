import Image from "next/image";
import './globals.css'
import Scroll from './scroll'
import Profile from './profile'
import Button from './button'
import SimpleFrame from './frame300'

export default function Home() {
  return (
    <div className="bg-secondary min-h-screen">
      <div className="flex justify-center h-max">
        {/* <SimpleFrame> */}
        <Scroll>
          <h1 className="text-[42px] text-darker_secondary pt-6 pl-6" style={{ fontFamily: 'AtlantisText', fontWeight: 900 }}>
            PALMA'S ELDRITCH<br />
            CODEX
          </h1>
          {/* Coluna 1 */}
          <div className="flex justify-between min-h-screen">
            <div className="w-[45%]">
              <section className="w-[400px] text-[44px] text-darker_secondary pl-6" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>
                BIO ---------------------
                <p className="text-[28px] " style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
                  "I've bargained with Cursed Code and deciphered Ancient Docs.
                  <span className="font-bold decoration-2"> In a Mighty Quest and in need of a Coding Warlock?</span> The Ravens know where to find me..."
                </p>
                <p className="text-[22px] text-right italic" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
                  (or just email me that's fine too)
                </p>
              </section>
              <section className="w-[400px] text-[44px] text-darker_secondary pl-6" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>
                STATS -----------------
                <ul className="grid grid-cols-2 gap-1 text-[34px] ml-4">
                  <li className="relative">
                    <span className="w-max cursor-help group inline-block underline decoration-3 ">
                      STR - 12
                      <div className="hidden group-hover:block absolute bottom-full left-0 w-full transform mb-2 
                          bg-darker_primary border-2 border-secondary p-1 text-[20px]">
                        Palma enjoys doing physical exercise regularly such as going to the gym!
                      </div>
                    </span>
                  </li>
                  <li className="relative">
                    <span className="w-max cursor-help group inline-block underline decoration-3">
                      INT - 12
                      <div className="hidden group-hover:block absolute bottom-full left-0 w-full transform mb-2 
                          bg-darker_primary border-2 border-secondary p-1 text-[20px]">
                        A very smort boy!
                      </div>
                    </span>
                  </li>
                  <li className="relative">
                    <span className="w-max cursor-help group inline-block underline decoration-3">
                      DEX - 18
                      <div className="hidden group-hover:block absolute bottom-full left-0 w-full transform mb-2 
                          bg-darker_primary border-2 border-secondary p-1 text-[20px]">
                        Vim enjoyer, fingers move faster than the compiler can complain. (he wishes)
                      </div>
                    </span>
                  </li>
                  <li className="relative">
                    <span className="w-max cursor-help group inline-block underline decoration-3">
                      WIS - 3
                      <div className="hidden group-hover:block absolute bottom-full left-0 w-full transform mb-2 
                          bg-darker_primary border-2 border-secondary p-1 text-[20px]">
                        Once made a "Arroz de Pato" (a traditional portuguese dish which roughly translates to Duck Rice) without Rice or Duck.
                      </div>
                    </span>
                  </li>
                  <li className="relative">
                    <span className="w-max cursor-help group inline-block underline decoration-3">
                      CON - 10
                      <div className="hidden group-hover:block absolute bottom-full left-0 w-full transform mb-2 
                          bg-darker_primary border-2 border-secondary p-1 text-[20px]">
                        Immune to caffeine crashes (lie).
                      </div>
                    </span>
                  </li>
                  <li className="relative">
                    <span className="w-max cursor-help group inline-block underline decoration-3">
                      CHA - 14
                      <div className="hidden group-hover:block absolute bottom-full left-0 w-full transform mb-2 
                          bg-darker_primary border-2 border-secondary p-1 text-[20px]">
                        Believes himself to be easy going and somewhat funny, but for the life of his do not ask him to tell a joke on the spot.
                      </div>
                    </span>
                  </li>
                </ul>
              </section>

            </div>
            {/* Coluna 2 */}
            <div className="w-[45%]">
              <div className="mt-9 flex flex-col items-center">
                <Profile></Profile>
                <span className="w-full text-[44px] text-darker_secondary text-center" style={{ fontFamily: 'AtlantisText', fontWeight: 500 }}>
                  CODE WARLOCK
                </span>
                <div className="mt-1">
                  <Button>
                    inventory
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Scroll>
        {/* </SimpleFrame> */}
      </div>
    </div>
  );
}
