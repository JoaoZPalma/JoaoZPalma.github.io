import '../globals.css'
import Image from 'next/image';

const projects = [
  {
    title: 'Web Portfolio',
    description: <>A portfolio made to my taste using <strong>Next.js, React, Typescript and Taiwind</strong>. It&apos;s simple, cozy and showcases not only my projects but a little bit of me.</>,
    image: '/joao.png',
    link: '#',
    available: false,
    unavailableComment: "You're already looking at it!! :-)"
  },
  {
    title: 'Non-Profit Organization Website',
    description: <><strong>Designed, developed, and deployed</strong> a user-friendly, accessible site within budget constraints without compromising quality. </>,
    image: '/livroslivres.png',
    link: 'https://pracadoslivroslivres.org/',
    available: true
  },



  // Projetos não disponíveis :(
  {
    title: 'LEI - Smart Package Monitor',
    description: <>Explored <strong>Jakarta EE</strong> to design a clean <strong>REST API</strong>, structured data flow using <strong>DTOs</strong>, accompained with <strong>Vue</strong>, and <strong>Docker</strong> for deployment and testing.</>,
    image: '/ipleiria.ico',
    link: '#',
    available: false,
    unavailableComment: 'Uni work, not available online :-('
  },
  {
    title: 'LEI - Website Cinemagic',
    description: <>Worked with <strong>PHP</strong>, deepened my knowledge about <strong>MVC</strong> (Model/View/Controller). And learned <strong>Laravel </strong>and <strong>Blade Templates</strong>.</>,
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
    unavailableComment: 'Uni work, not available online :-( '
  }
]

export default function Projects() {
  return (
    <div className="p-2 h-full">
      <section className='mt-4 h-full overflow-y-auto pb-32'>
        <ul className='mr-8'>
          {projects.map((project, index) => (
            <li className={`flex items-start mb-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`} key={index}>
              <Image
                className='aspect-square w-40 h-40 object-cover border-secondary border-4 bg-darker_primary p-1'
                src={project.image}
                alt={project.title}
                width={160}
                height={160}
              />
              <article className={`flex-1 text-left ${index % 2 === 1 ? 'text-right mr-4 ml-2' : ' ml-4 mr-2'} ${index % 2 === 1 ? '-mt-2' : '-mt-2'}`}>
                <h2 className="text-darker_secondary text-4xl " style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>{project.title}</h2>
                <p className="text-darker_secondary text-2xl" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>{project.description}</p>
                {project.available ? (
                  <a href={project.link} className="text-darker_secondary text-2xl underline decoration-2 hover:decoration-wavy hover:decoration-1" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>Check it out here!</a>
                ) : (
                  <div className={`flex items-center gap-2 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                    <span
                      className="text-darker_secondary text-2xl [text-decoration-line:underline_line-through] decoration-2"
                      style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}
                    >
                      Check it out here!
                    </span>
                    <span className="text-darker_secondary text-xl italic -mb-2" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>{project.unavailableComment}</span>
                  </div>
                )}
              </article>
            </li>

          ))}
        </ul>
      </section>
    </div>
  );
}

