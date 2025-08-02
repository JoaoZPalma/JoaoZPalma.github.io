import '../globals.css'
import Image from 'next/image';
import React, { useState } from "react";
import { playSound } from '../soundManager';

const inventoryItems = [
  {
    image: "/vimIcon.webp",
    alt: "Vim Editor",
    tooltip: "The text editor I perform my mystic rites with... though I've upgraded to Neovim lately.",
    link: "https://neovim.io/"
  },
  {
    image: "/archLinux.webp",
    alt: "Arch Linux",
    tooltip: "My trustworthy OS, and always remember read the friendly grimoire! :)",
    link: "https://archlinux.org/"
  },
  {
    image: "/vue.webp",
    alt: "Vue.js",
    tooltip: "One of the first frameworks I learned, and enjoyed working with.",
    link: "https://vuejs.org/"
  },
  {
    image: "/react.webp",
    alt: "React.js",
    tooltip: "The framework I use to build this website, I wanted a little project to learn it.",
    link: "https://react.dev/"
  },
  {
    image: "/photoshop.webp",
    alt: "Adobe Photoshop",
    tooltip: "A powerful tool for image manipulation, learned it in my adolescence and used it to make art for a book for children!.",
    link: "https://www.adobe.com/products/photoshop.html"
  },
  {
    image: "/github.webp",
    alt: "GitHub",
    tooltip: "Magic repository where I store my code and collaborate with other wizards.",
    link: "https://github.com/"
  },
  {
    image: "/javascript.webp",
    alt: "JavaScript",
    tooltip: "One of the languages of the web, I use it to cast spells in my projects.",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
  },
  {
    image: "/typescript.webp",
    alt: "TypeScript",
    tooltip: "Javascript but with types, a safer magic to cast spells you could say...",
    link: "https://www.typescriptlang.org/"
  },
  {
    image: "/tailwind.webp",
    alt: "Tailwind CSS",
    tooltip: "MY BABY! My CSS framework of election that I use to style my projects, love it!",
    link: "https://tailwindcss.com/"
  },
  {
    image: "/figma.webp",
    alt: "Figma",
    tooltip: "Where UI spells are designed before they haunt production.",
    link: "https://figma.com/"
  },
  {
    image: "/aseprite.webp",
    alt: "Aseprite",
    tooltip: "I have massive respect for their business model, and I use it to create pixel art.",
    link: "https://www.aseprite.org/"
  },
  {
    image: "/coffee.webp",
    alt: "Coffee",
    tooltip: "The black potion that fuels my coding sessions, a must-have for any wizard/warlock.",
    link: "https://en.wikipedia.org/wiki/Coffee"
  },
  {
    image: "/nextJs.webp",
    alt: "Next.js",
    tooltip: "The framework I use to build this website, it makes server-side rendering and static site generation a breeze.",
    link: "https://nextjs.org/"
  },
  {
    image: "/docker.webp",
    alt: "Docker",
    tooltip: "Cursed containers to imprison dependencies. 'It works on my cauldron!!'",
    link: "https://www.docker.com/"
  },
  {
    image: "/latex.webp",
    alt: "LaTeX",
    tooltip: "For scribing arcane documents and academic scrolls.",
    link: "https://www.latex-project.org/"
  },
  {
    image: "/obsidian.webp",
    alt: "Obsidian",
    tooltip: "My tangled grimoire of notes, where I keep my thoughts and ideas organized.",
    link: "https://obsidian.md/"
  },
  {
    image: "/html.webp",
    alt: "HTML",
    tooltip: "The foundation of the web, the structure of some of my spells.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML"
  },
  {
    image: "/css.webp",
    alt: "CSS",
    tooltip: "Because raw power is good but style brings it a step further.",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS"
  },
  {
    image: "/c.webp",
    alt: "C Programming Language",
    tooltip: "The forbidden incantation. When I need to commune directly with the machine spirits.",
    link: "https://en.wikipedia.org/wiki/C_(programming_language)"
  },
  {
    image: "/java.webp",
    alt: "Java Programming Language",
    tooltip: "The ancient rune of enterprise wizards. I once battled NullPointerException dragons.",
    link: "https://www.java.com/"
  },
  {
    image: "/python.webp",
    alt: "Python",
    tooltip: "My serpent familiar—conjuring CNNs to see, LLMs to speak, and scripts to automate my dark rituals.",
    link: "https://www.python.org/"
  },
  {
    image: "/sql.webp",
    alt: "SQL",
    tooltip: "The language of databases, where I summon and manipulate data from the abyss.",
    link: "https://en.wikipedia.org/wiki/SQL"
  }
];

export default function Inventory() {
  const [openTooltip, setOpenTooltip] = useState<number | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<{ [key: number]: React.CSSProperties }>({});
  const itemsPerRowMobile = 6;
  const itemsPerRowDesktop = 8;
  const totalRowsMobile = 8;
  const totalRowsDesktop = 6;
  return (
    <div className="overflow-visible flex flex-col items-center p-6 justify-center pb-20">
      <p
        className='w-full text-center justify-center flex items-center text-darker_secondary text-[30px]'
        style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}
        role="note"
        aria-label="Inventory usage tip"
      >
        <span className="sm:hidden"><b>Tap</b> for information<br /> <b>Double tap</b> to access link</span>
        <span className="hidden sm:inline"><b>Hover</b> for information | <b>Click</b> to access link</span>
      </p>
      <div className="inline-block border-6 border-secondary mt-4 mb-8">
        {/* Mobile Table */}
        <table
          className="border-collapse sm:hidden"
          role="grid"
          aria-label="Skills and tools inventory"
        >
          <tbody>
            {Array.from({ length: totalRowsMobile }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: itemsPerRowMobile }).map((_, colIndex) => {
                  const itemIndex = rowIndex * itemsPerRowMobile + colIndex;
                  const item = inventoryItems[itemIndex];
                  const isLastColumn = colIndex === itemsPerRowMobile - 1;
                  const isLastRow = rowIndex === totalRowsMobile - 1;

                  return (
                    <td
                      key={colIndex}
                      className={`group relative h-16 w-16 text-center align-middle transition-colors duration-150
          bg-darker_primary border-secondary hover:bg-primary cursor-pointer focus:bg-primary focus:outline-none focus:ring-2 focus:ring-darker_secondary focus:ring-inset
          ${!isLastColumn ? 'border-r-6' : ''} ${!isLastRow ? 'border-b-6' : ''}`}
                      role="gridcell"
                      aria-label={item ? item.tooltip : `Empty slot ${itemIndex + 1}`}
                      tabIndex={0}
                    >
                      <div
                        className="flex items-center justify-center w-full h-full relative group"
                        onClick={() => {
                          if (openTooltip === itemIndex) {
                            setOpenTooltip(null);
                            setTooltipStyle({});
                          } else {
                            setOpenTooltip(itemIndex);
                            setTimeout(() => {
                              const tooltip = document.getElementById(`tooltip-${itemIndex}`);
                              if (tooltip) {
                                const rect = tooltip.getBoundingClientRect();
                                const padding = 4;
                                const style: React.CSSProperties = {};
                                // Shift left/right if tooltip overflows screen
                                if (rect.left < padding) {
                                  style.transform = `translateX(${padding - rect.left}px)`;
                                } else if (rect.right > window.innerWidth - padding) {
                                  style.transform = `translateX(-${rect.right - window.innerWidth + padding}px)`;
                                } else {
                                  style.transform = "";
                                }
                                setTooltipStyle({ [itemIndex]: style });
                              }
                            }, 0);
                          }
                        }}
                        onDoubleClick={() => {
                          if (item) {
                            playSound('click1_low');
                            window.open(item.link, '_blank', 'noopener,noreferrer');
                          }
                        }}
                        tabIndex={0}
                      >
                        {item ? (
                          <Image
                            src={item.image}
                            alt={item.alt}
                            width={32}
                            height={32}
                            className="w-10 h-10 object-contain"
                          />
                        ) : ""}
                        <span
                          id={`tooltip-${itemIndex}`}
                          className={`pointer-events-none absolute left-1/2 bottom-full mb-2 max-w-xs w-max -translate-x-1/2
              bg-darker_primary border-4 text-lg text-darker_secondary px-3 py-1 transition-opacity
              z-10 whitespace-normal break-words leading-snug
              ${openTooltip === itemIndex ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                          style={{
                            fontFamily: 'AtlantisText',
                            fontWeight: 700,
                            ...(openTooltip === itemIndex ? tooltipStyle[itemIndex] || {} : {}),
                          }}
                        >
                          {item ? item.tooltip : `Empty slot #${itemIndex + 1}`}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Desktop Table */}
        <table
          className="border-collapse hidden sm:table"
          role="grid"
          aria-label="Skills and tools inventory"
        >
          <tbody>
            {Array.from({ length: totalRowsDesktop }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: itemsPerRowDesktop }).map((_, colIndex) => {
                  const itemIndex = rowIndex * itemsPerRowDesktop + colIndex;
                  const item = inventoryItems[itemIndex];
                  const isLastColumn = colIndex === itemsPerRowDesktop - 1;
                  const isLastRow = rowIndex === totalRowsDesktop - 1;

                  return (
                    <td
                      key={colIndex}
                      className={`group relative h-20 w-20 text-center align-middle transition-colors duration-150
                  bg-darker_primary border-secondary hover:bg-primary cursor-pointer focus:bg-primary focus:outline-none focus:ring-2 focus:ring-darker_secondary focus:ring-inset
                  ${!isLastColumn ? 'border-r-6' : ''} ${!isLastRow ? 'border-b-6' : ''}`}
                      role="gridcell"
                      aria-label={item ? item.tooltip : `Empty slot ${itemIndex + 1}`}
                      tabIndex={0}
                      onClick={() => {
                        if (item) {
                          playSound('click1_low');
                          window.open(item.link, '_blank', 'noopener,noreferrer');
                        }
                        if (openTooltip === itemIndex) {
                          setOpenTooltip(null);
                          setTooltipStyle({});
                        } else {
                          setOpenTooltip(itemIndex);
                          setTimeout(() => {
                            const tooltip = document.getElementById(`tooltip-${itemIndex}`);
                            if (tooltip) {
                              const rect = tooltip.getBoundingClientRect();
                              const padding = 4;
                              const style: React.CSSProperties = {};
                              if (rect.left < padding) {
                                style.left = `calc(50% + ${padding - rect.left}px)`;
                              } else if (rect.right > window.innerWidth - padding) {
                                style.left = `calc(50% - ${rect.right - window.innerWidth + padding}px)`;
                              } else {
                                style.left = "";
                                style.transform = "";
                              }
                              setTooltipStyle({ [itemIndex]: style });
                            }
                          }, 0);
                        }
                      }}
                    >
                      {item ? (
                        <Image
                          src={item.image}
                          alt={item.alt}
                          width={64}
                          height={64}
                          className="w-14 h-14 object-contain inline"
                        />
                      ) : ""}
                      <span
                        id={`tooltip-${itemIndex}`}
                        className="pointer-events-none absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2
                    rounded bg-darker_primary border-2 text-[22px] text-darker_secondary px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity
                    z-10 whitespace-nowrap"
                        style={{ fontFamily: 'AtlantisText', fontWeight: 700, ...(openTooltip === itemIndex ? tooltipStyle[itemIndex] || {} : {}) }}
                      >
                        {item ? item.tooltip : `Empty slot #${itemIndex + 1}`}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
}
