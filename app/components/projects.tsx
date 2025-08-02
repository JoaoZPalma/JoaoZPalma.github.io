import '../globals.css'
import Image from 'next/image';
import React from 'react';

const projects = [
  {
    title: 'Web Portfolio',
    description: <>A portfolio made to my taste using <strong>Next.js, React, Typescript and Tailwind</strong>. It&apos;s simple, cozy and showcases not only my projects but a little bit of me.</>,
    image: '/joao.webp',
    link: '#',
    available: false,
    unavailableComment: "You're already looking at it!! :-)"
  },
  {
    title: 'Non-Profit Organization Website',
    description: <><strong>Designed, developed, and deployed</strong> a user-friendly, accessible site within budget constraints without compromising quality.</>,
    image: '/livroslivres.webp',
    link: 'https://pracadoslivroslivres.org/',
    available: true
  },
  {
    title: 'LEI - Smart Package Monitor',
    description: <>Explored <strong>Jakarta EE</strong> to design a clean <strong>REST API</strong>, structured data flow using <strong>DTOs</strong>, accompanied with <strong>Vue</strong>, and <strong>Docker</strong> for deployment and testing.</>,
    image: '/ipleiria.ico',
    link: '#',
    available: false,
    unavailableComment: 'Uni work, not available online :-('
  },
  {
    title: 'LEI - Website Cinemagic',
    description: <>Worked with <strong>PHP</strong>, deepened my knowledge about <strong>MVC</strong> (Model/View/Controller). And learned <strong>Laravel</strong> and <strong>Blade Templates</strong>.</>,
    image: '/ipleiria.ico',
    link: '#',
    available: false,
    unavailableComment: 'Uni work, not available online :-('
  },
  {
    title: 'LEI - CNN Modelling',
    description: <>Learned <strong>Fine tuning</strong>, <strong>Feature extraction</strong> and the difference between <strong>Models with and without data augmentation</strong>.</>,
    image: '/ipleiria.ico',
    link: '#',
    available: false,
    unavailableComment: 'Uni work, not available online :-('
  }
];

export default function Projects() {
  return (
    <div className="p-2 h-full">
      <section className="h-full overflow-y-auto pb-32">
        <ul className="mr-8">
          {projects.map((project, index) => (
            <React.Fragment key={`project-${project.title}`}>
              <li className={`flex items-start my-6 md:mb-14 flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`flex items-start gap-4 md:contents ${index % 2 === 1 ? 'flex-row-reverse' : 'text-right'}`}>
                  <Image
                    className={`aspect-square w-[10vh] h-[10vh] md:w-40 md:h-40 object-cover border-secondary border-4 bg-darker_primary p-1 mb-4 md:mb-0 ${index % 2 === 1 ? 'self-end md:self-start' : 'self-start'}`}
                    src={project.image}
                    alt={project.title}
                    width={160}
                    height={160}
                  />
                  <h2 className="text-darker_secondary text-4xl md:hidden" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>
                    {project.title}
                  </h2>
                </div>
                <article className={`flex-1 text-left ${index % 2 === 1 ? 'md:text-right md:mr-4 md:ml-2' : 'md:ml-4 md:mr-2'} md:-mt-2`}>
                  <h2 className="text-darker_secondary text-4xl hidden md:block" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>
                    {project.title}
                  </h2>
                  <p className="text-darker_secondary text-2xl" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
                    {project.description}
                  </p>
                  {project.available ? (
                    <a
                      href={project.link}
                      className="text-darker_secondary text-2xl underline decoration-2 hover:decoration-wavy hover:decoration-1"
                      style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Check it out here!
                    </a>
                  ) : (
                    <div className={`flex items-center gap-2 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} flex-col md:flex-row`}>
                      <span
                        className="text-darker_secondary text-2xl line-through decoration-2"
                        style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}
                      >
                        Check it out here!
                      </span>
                      <span className="text-darker_secondary text-xl italic -mb-2" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
                        {project.unavailableComment}
                      </span>
                    </div>
                  )}
                </article>
              </li>
              {index < projects.length - 1 && (
                <li key={`separator-${project.title}`} className="md:hidden flex justify-center">
                  <div className="text-darker_secondary text-4xl leading-none" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
                    -----------------------
                  </div>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </section>
    </div>
  );
}
