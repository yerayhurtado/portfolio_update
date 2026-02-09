/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState } from 'react';
import { useTranslations } from "next-intl";
import { 
  LuBinary, LuLayoutList, LuServer, 
  LuDatabase, LuPalette, LuGitBranch, LuChartPie, LuBrainCircuit,  
} from 'react-icons/lu';
import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiPython, 
  SiMysql, SiFigma, SiJavascript, SiDocker, 
  SiGithub, SiScikitlearn, SiR, 
  SiDatabricks, SiLangchain, SiMongodb,
  SiHtml5, SiCss3, SiPhp, // Nuevos imports
  SiPandas,
  SiNumpy
} from 'react-icons/si';

import { FaJava } from 'react-icons/fa';

const skills = [
  // Frontend
  { icon: <SiHtml5 />, name: 'HTML5', category: 'Frontend' },
  { icon: <SiCss3 />, name: 'CSS3', category: 'Frontend' },
  { icon: <SiJavascript />, name: 'JavaScript', category: 'Frontend' },
  { icon: <SiReact />, name: 'React', category: 'Frontend' },
  { icon: <SiNextdotjs />, name: 'Next.js', category: 'Frontend' },
  { icon: <SiTailwindcss />, name: 'Tailwind CSS', category: 'Frontend' },
  
  // Backend
  { icon: <SiPython />, name: 'Python', category: 'Backend' },
  { icon: <FaJava />, name: 'Java', category: 'Backend' },
  { icon: <SiPhp />, name: 'PHP', category: 'Backend' }, // Agregado aquí
  { icon: <SiDocker />, name: 'Docker', category: 'Backend' },
  
  // AI & Agents
  { icon: <SiLangchain />, name: 'LangChain', category: 'AI & Agents' },
  { icon: <SiScikitlearn />, name: 'Scikit-learn', category: 'AI & Agents' },
  
  // Data & Analytics
  { icon: <SiPandas />, name: 'Pandas', category: 'Data' }, 
  { icon: <SiNumpy />, name: 'NumPy', category: 'Data' },   
  { icon: <SiDatabricks />, name: 'Databricks', category: 'Data' },
  { icon: <SiR />, name: 'R', category: 'Data' },
  { icon: <LuChartPie />, name: 'Power BI', category: 'Data' },
  { icon: <SiMysql />, name: 'MySQL', category: 'Database' },
  { icon: <SiMongodb />, name: 'MongoDB', category: 'Database' },
  
  // Otros
  { icon: <SiGithub />, name: 'GitHub', category: 'Version Control' },
  { icon: <SiFigma />, name: 'Figma', category: 'Design' },
];

const categoryIcons: Record<string, any> = {
  All: <LuBinary />,
  Frontend: <LuLayoutList />,
  Backend: <LuServer />,
  'AI & Agents': <LuBrainCircuit />,
  Data: <LuChartPie />,
  Database: <LuDatabase />,
  Design: <LuPalette />,
  'Version Control': <LuGitBranch />,
};

export default function SkillsSection() {
  const t = useTranslations('Skills');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'AI & Agents', 'Data', 'Database', 'Design', 'Version Control'];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants : Variants = {
    hidden: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 200, damping: 20 } 
    }
  };

  return (
    <section id="stack" className="py-24 px-6 bg-[#121212] relative overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-sm font-medium text-[#00D4FF] uppercase tracking-widest mb-4 flex items-center gap-2">
            <LuBinary /> {t('title')}
          </h2>
        </motion.div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-[#00D4FF]/10 border-[#00D4FF] text-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                  : 'border-white/5 text-zinc-500 hover:border-white/20 hover:text-white'
              }`}
            >
              <span className="text-lg">{categoryIcons[cat]}</span>
              {cat === 'All' ? t('categories.all') : cat}
            </button>
          ))}
        </div>

        {/* Grid de Skills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8 }}
                className="group relative"
              >
                <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/2 flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-[#00D4FF]/30 hover:bg-[#00D4FF]/5">
                  <div className="text-4xl text-zinc-500 group-hover:text-white transition-colors duration-500">
                    {skill.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                      {skill.name}
                    </p>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1 text-nowrap">
                      {skill.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}