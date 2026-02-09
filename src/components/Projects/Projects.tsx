/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { 
  LuCode, 
  LuExternalLink, 
  LuChevronLeft, 
  LuChevronRight 
} from "react-icons/lu";

export default function Projects() {
  const t = useTranslations('Projects');

  const projectsData = [
    {
      id: "futsight",
      title: "FutSight (AI Scouting)",
      images: ["/projects/futsight-1.jpg", "/projects/futsight-2.jpg", "/projects/futsight-3.jpg"],
      tags: ["Python", "Sklearn", "React", "Next.js", "Tailwind"],
      link: "https://futsight-web.vercel.app/"
    },
    {
      id: "taskpilot",
      title: "TaskPilot (AI Agent)",
      images: ["/projects/task-1.jpg"],
      tags: ["Python", "LangGraph", "Next.js", "React"],
      link: "https://task-agent-web.vercel.app/"
    },
    {
      id: "fitness",
      title: "Virtual Fitness",
      images: ["/projects/fit-1.jpg", "/projects/fit-2.jpg", "/projects/fit-3.jpg", "/projects/fit-4.jpg"],
      tags: ["Next.js", "React", "Laravel", "Tailwind"],
      link: "https://github.com/yerayhurtado/VirtualFitness"
    },
    {
      id: "raco",
      title: "El Racó de Huelva",
      images: ["/projects/raco-1.jpg", "/projects/raco-2.jpg", "/projects/raco-3.jpg", "/projects/raco-4.jpg"],
      tags: ["Next.js", "React", "Tailwind"],
      link: "https://www.elracodehuelva.es/"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="projects" className="py-24 px-6 relative bg-[#121212] overflow-hidden text-zinc-300">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-sm font-medium text-[#00D4FF] uppercase tracking-widest mb-12 flex items-center gap-2"
        >
          <LuCode size={16} /> {t('title')}
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projectsData.map((project) => (
            <ProjectCard 
              key={project.id}
              title={project.title}
              desc={t(`items.${project.id}.description`)}
              images={project.images}
              tags={project.tags}
              link={project.link}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ title, desc, images, tags, variants, link }: any) {
  const [index, setIndex] = useState(0);

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.article 
      variants={variants}
      className="glass-panel rounded-2xl overflow-hidden group border border-white/5 hover:border-[#00D4FF]/30 transition-all duration-500 flex flex-col h-full bg-white/1"
    >
      {/* Carrusel Visual */}
      <div className="h-64 sm:h-72 relative overflow-hidden bg-zinc-900/50">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
            alt={`${title} screenshot`}
          />
        </AnimatePresence>

        {/* Overlay Controles (Flechas) */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <button 
              onClick={prevStep}
              className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-[#00D4FF] hover:text-black transition-all transform hover:scale-110"
            >
              <LuChevronLeft size={20} />
            </button>
            <button 
              onClick={nextStep}
              className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-[#00D4FF] hover:text-black transition-all transform hover:scale-110"
            >
              <LuChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Indicadores de posición */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 px-4 pointer-events-none z-10">
          {images.map((_: any, i: number) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-[#00D4FF]' : 'w-2 bg-white/20'}`} 
            />
          ))}
        </div>
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-8 flex flex-col grow">
        <div className="flex justify-between items-start mb-4">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#00D4FF] transition-colors duration-300"
          >
            <h3 className="text-xl font-medium text-white group-hover:text-[#00D4FF]">
              {title}
            </h3>
          </a>
          
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-500 hover:text-[#00D4FF] transition-all transform hover:scale-125 p-1"
            title="Ver proyecto"
          >
            <LuExternalLink size={22} />
          </a>
        </div>
        
        <p className="text-zinc-400 text-sm font-light leading-relaxed mb-8 grow">
          {desc}
        </p>

        {/* Etiquetas de Tecnología */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {tags.map((tag: string) => (
            <span 
              key={tag} 
              className="px-3 py-1 text-[10px] uppercase tracking-widest font-medium text-zinc-300 bg-zinc-900/50 rounded-full border border-zinc-800 group-hover:border-[#00D4FF]/20 group-hover:text-[#00D4FF] transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}