import '../globals.css'
import Image from 'next/image';

const inventoryItems = [
  {
    image: "/vimIcon.png",
    alt: "Vim Editor",
    tooltip: "The text editor I perform my mystic rites with... though I've upgraded to Neovim lately."
  },
  {
    image: "/archLinux.png",
    alt: "Arch Linux",
    tooltip: "My trustworthy OS, and always remember read the friendly grimoire! :)"
  },
  {
    image: "/vue.png",
    alt: "Vue.js",
    tooltip: "One of the first frameworks I learned, and enjoyed working with."
  },
  {
    image: "/react.png",
    alt: "React.js",
    tooltip: "The framework I use to build this website, I wanted a little project to learn it.",
  },
  {
    image: "/photoshop.png",
    alt: "Adobe Photoshop",
    tooltip: "A powerful tool for image manipulation, learned it in my adolescence and used it to make art for a book for children!.",
  },
  {
    image: "/github.png",
    alt: "GitHub",
    tooltip: "Magic repository where I store my code and collaborate with other wizards.",
  },
  {
    image: "/javascript.png",
    alt: "JavaScript",
    tooltip: "One of the languages of the web, I use it to cast spells in my projects.",
  },
  {
    image: "/typescript.png",
    alt: "TypeScript",
    tooltip: "Javascript but with types, a safer magic to cast spells you could say...",
  },
  {
    image: "/tailwind.png",
    alt: "Tailwind CSS",
    tooltip: "MY BABY! My CSS framework of election that I use to style my projects, love it!",
  },
  {
    image: "/figma.png",
    alt: "Figma",
    tooltip: "Where UI spells are designed before they haunt production.",
  },
  {
    image: "/aseprite.png",
    alt: "Aseprite",
    tooltip: "I have massive respect for their business model, and I use it to create pixel art.",
  },
  {
    image: "/coffee.png",
    alt: "Coffee",
    tooltip: "The black potion that fuels my coding sessions, a must-have for any wizard/warlock.",
  },
  {
    image: "/nextJs.png",
    alt: "Next.js",
    tooltip: "The framework I use to build this website, it makes server-side rendering and static site generation a breeze.",
  },
  {
    image: "/docker.png",
    alt: "Docker",
    tooltip: "Cursed containers to imprison dependencies. 'It works on my cauldron!!'",
  },
  {
    image: "/latex.png",
    alt: "LaTeX",
    tooltip: "For scribing arcane documents and academic scrolls.",
  },
  {
    image: "/obsidian.png",
    alt: "Obsidian",
    tooltip: "My tangled grimoire of notes, where I keep my thoughts and ideas organized.",
  },
  {
    image: "/html.png",
    alt: "HTML",
    tooltip: "The foundation of the web, the structure of some of my spells.",
  },
  {
    image: "/css.png",
    alt: "CSS",
    tooltip: "Because raw power is good but style brings it a step further.",
  },
  {
    image: "/c.png",
    alt: "C Programming Language",
    tooltip: "The forbidden incantation. When I need to commune directly with the machine spirits.",
  },
  {
    image: "/java.png",
    alt: "Java Programming Language",
    tooltip: "The ancient rune of enterprise wizards. I once battled NullPointerException dragons.",
  },
  {
    image: "/python.png",
    alt: "Python",
    tooltip: "My serpent familiar—conjuring CNNs to see, LLMs to speak, and scripts to automate my dark rituals."
  },
  {
    image: "/sql.png",
    alt: "SQL",
    tooltip: "The language of databases, where I summon and manipulate data from the abyss.",
  }
];

export default function Inventory() {
  return (
    <div className="flex flex-col items-center p-6 justify-center">
      <span className='w-full text-center justify-center flex items-center text-darker_secondary text-[30px]' style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
        (tip: on hover will give further information on each skill)
      </span>
      <div className="inline-block border-6 border-secondary mt-4">
        <div className="flex flex-wrap w-[640px] justify-center">
          {Array.from({ length: 48 }).map((_, i) => {
            const item = inventoryItems[i];
            return (
              <div
                key={i}
                className="group relative h-20 w-20 flex items-center text-center justify-center transition-colors duration-150
                bg-darker_primary border-r-6 border-b-6 border-secondary
                hover:bg-primary cursor-pointer
                [&:nth-child(8n)]:border-r-0 [&:nth-child(n+41)]:border-b-0"
              >
                {item ? (
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={64}
                    height={64}
                    className="w-14 h-14 object-contain"
                  />
                ) : ""}
                <span
                  className="pointer-events-none absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2
                  rounded bg-darker_primary border-2 text-[22px] text-darker_secondary px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity
                  z-10 whitespace-nowrap" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}
                >
                  {item ? item.tooltip : `Empty slot #${i + 1}`}
                </span>
              </div>
            );
          }
          )}
        </div>
      </div>
    </div>
  );
}
