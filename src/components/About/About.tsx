"use client";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { LuUser, LuBrain, LuCode, LuRocket } from "react-icons/lu";
export default function About() {
  const t = useTranslations('About');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section id="about" className="py-24 px-6 bg-[#121212] relative overflow-hidden">
      {/* Decoración de fondo sutil */}
      <div className="absolute top-0 right-0 w-75 h-75 bg-[#00D4FF]/5 rounded-full blur-[100px] -z-10" />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Encabezado */}
        <motion.h2 
          variants={itemVariants}
          className="text-sm font-medium text-[#00D4FF] uppercase tracking-widest mb-12 flex items-center gap-2"
        >
          <LuUser size={16} /> {t('title')}
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Columna Principal: Texto descriptivo */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-7 glass-panel p-8 md:p-12 rounded-3xl border border-white/5 bg-white/2"
          >
            <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed">
              {t.rich('description', {
                important: (chunks) => <span className="text-white font-medium">{chunks}</span>,
                cyan: (chunks) => <span className="text-[#00D4FF] font-medium">{chunks}</span>
              })}
            </p>
          </motion.div>

          {/* Columna Lateral: Tarjetas de Enfoque (Highlights) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 grid grid-cols-1 gap-4"
          >
            <HighlightCard 
              icon={<LuBrain className="text-[#00D4FF]" />}
              title={t('highlights.ai.title')}
              desc={t('highlights.ai.desc')}
            />
            <HighlightCard 
              icon={<LuCode className="text-[#00D4FF]" />}
              title={t('highlights.dev.title')}
              desc={t('highlights.dev.desc')}
            />
            <HighlightCard 
              icon={<LuRocket className="text-[#00D4FF]" />}
              title={t('highlights.goal.title')}
              desc={t('highlights.goal.desc')}
            />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

// Subcomponente para las tarjetas laterales
function HighlightCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-2xl border border-white/5 bg-white/1 hover:bg-white/3 transition-colors group">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-[#00D4FF]/10 text-xl">
          {icon}
        </div>
        <div>
          <h3 className="text-white font-medium mb-1 group-hover:text-[#00D4FF] transition-colors">{title}</h3>
          <p className="text-zinc-500 text-sm font-light leading-snug">{desc}</p>
        </div>
      </div>
    </div>
  );
}