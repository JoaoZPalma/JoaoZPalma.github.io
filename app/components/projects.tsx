import '../globals.css'

const projects = [
  {
    title: 'Web Portfolio',
    description: "A portfolio made to my taste using Next.js, React, Typescript and Taiwind. It's simple, cozy and showcases not only my projects but a little bit of me.",
    image: '/images/project1.jpg',
    link: '#'
  },
  {
    title: 'Website for a Non-Profit Organization',
    description: "Designed, developed, and deployed a user-friendly, accessible site within budget constraints without compromising quality.",
    image: '/livroslivres.jpg',
    link: 'https://pracadoslivroslivres.org/'
  }
]

export default function Projects() {
  return (
    <div className="p-2">
      <section className='mt-4'>
        <ul>
          {projects.map((project, index) => (
            <li className={`flex items-start mb-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`} key={index}>
              <img
                className='aspect-square w-40 h-40 object-cover border-secondary border-4'
                src={project.image}
                alt={project.title}
              />
              <article className={`flex-1 text-left ${index % 2 === 1 ? 'text-right mr-4' : ' ml-4'} ${index % 2 === 1 ? '-mt-2' : '-mt-2'}`}>
                <h2 className="text-darker_secondary text-3xl " style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>{project.title}</h2>
                <p className="text-darker_secondary text-2xl" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>{project.description}</p>
                <a href={project.link} className="text-darker_secondary text-2xl underline decoration-2" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>Check it out here!</a>
              </article>
            </li>

          ))}
        </ul>
      </section>

    </div>
  );
}

// ill give further inform
//   < p className = "text-darker_secondary text-[36px] text-center" style = {{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
