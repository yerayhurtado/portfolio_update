"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
// Importamos todo de una sola librería
import { LuHistory, LuNetwork } from "react-icons/lu"; // Lucide
import { SiReact, SiNextdotjs, SiTailwindcss, SiPython } from "react-icons/si"; // Simple Icons (Logos oficiales)

export default function Experiencia() {
  const t = useTranslations('Experience');

  // Variantes para la animación de entrada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20, filter: "blur(5px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section id="journey" className="py-24 px-6 bg-[#121212] overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.h2 
          variants={cardVariants}
          className="text-sm font-medium text-[#00D4FF] uppercase tracking-widest mb-12 flex items-center gap-2"
        >
          <LuHistory className="text-lg" /> {t('title')}
        </motion.h2>
        
        <div className="relative border-l border-zinc-800 ml-3 md:ml-6 space-y-12">
          
          {/* Experiencia 1 */}
          <motion.div variants={cardVariants} className="relative pl-8 md:pl-12 group">
            <span className="absolute -left-[5.5px] top-2 h-2.75 w-2.75 rounded-full bg-[#00D4FF] shadow-[0_0_10px_#00D4FF]"></span>
            
            <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-[#00D4FF]/30 transition-all duration-500 hover:bg-white/2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <h3 className="text-lg font-medium text-white tracking-tight">{t('jobs.tfm.role')}</h3>
                <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800 self-start sm:self-center">
                  2026
                </span>
              </div>
              <p className="text-[#00D4FF] text-sm mb-4 font-medium">Acceleralia</p>
              <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                {t('jobs.tfm.description')}
              </p>
              
              {/* Stack Tecnológico con logos oficiales monocromáticos */}
              <div className="flex gap-5 items-center">
                <div className="group/tech flex items-center gap-2 text-zinc-500 hover:text-[#61DAFB] transition-colors duration-300">
                  <SiPython size={18} />
                </div>
                <div className="group/tech flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300">
                  <LuNetwork size={18} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experiencia 2 */}
          <motion.div variants={cardVariants} className="relative pl-8 md:pl-12 group">
            <span className="absolute -left-[5.5px] top-2 h-2.75 w-2.75 rounded-full bg-zinc-700 group-hover:bg-[#00D4FF] transition-colors"></span>
            
            <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-[#00D4FF]/30 transition-all duration-500 hover:bg-white/2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <h3 className="text-lg font-medium text-white tracking-tight">{t('jobs.webDev.role')}</h3>
                <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800 self-start sm:self-center">
                  2025
                </span>
              </div>
              <p className="text-[#00D4FF] text-sm mb-4 font-medium">Servihabitat</p>
              <p className="text-zinc-400 text-sm font-light leading-relaxed mb-6">
                {t('jobs.webDev.description')}
              </p>
              
              {/* Stack Tecnológico con logos oficiales monocromáticos */}
              <div className="flex gap-5 items-center">
                <div className="group/tech flex items-center gap-2 text-zinc-500 hover:text-[#61DAFB] transition-colors duration-300">
                  <SiReact size={18} />
                </div>
                <div className="group/tech flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300">
                  <SiNextdotjs size={18} />
                </div>
                <div className="group/tech flex items-center gap-2 text-zinc-500 hover:text-[#06B6D4] transition-colors duration-300">
                  <SiTailwindcss size={18} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experiencia 3 */}
          <motion.div variants={cardVariants} className="relative pl-8 md:pl-12 group">
            <span className="absolute -left-[5.5px] top-2 h-2.75 w-2.75 rounded-full bg-zinc-700 group-hover:bg-[#00D4FF] transition-colors"></span>
            
            <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-zinc-600 transition-all duration-500 hover:bg-white/2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <h3 className="text-lg font-medium text-white tracking-tight">{t('jobs.itTech.role')}</h3>
                <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800 self-start sm:self-center">
                  2023 - 2024
                </span>
              </div>
              <p className="text-[#00D4FF] text-sm mb-4 font-medium">Sosmatic</p>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                {t('jobs.itTech.description')}
              </p>
            </div>
          </motion.div>
          
        </div>
      </motion.div>
    </section>
  );
}