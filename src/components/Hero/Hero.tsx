"use client";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations('Hero');  
  
  return (
    <section className="min-h-dvh flex flex-col justify-center items-center px-4 md:px-6 py-20 relative overflow-hidden">
      {/* Círculo decorativo: Ajustado para no causar scroll horizontal en móviles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 md:left-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#00D4FF] rounded-full mix-blend-screen filter blur-[80px] md:blur-[128px] opacity-[0.08] animate-pulse pointer-events-none"></div>
        
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center z-10 w-full"
      >
        {/* Badge - Ajustado el padding y texto para móvil */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/5 text-[#00D4FF] text-[10px] md:text-xs tracking-wider uppercase font-medium mb-6 md:mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-[#00D4FF] opacity-75"></span>
            <span className="relative h-2 w-2 rounded-full bg-[#00D4FF]"></span>
          </span>
          {t('card')} 
        </div>
        
        {/* Título - Escala fluida de texto */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white leading-[1.1] mb-6">
          Yeray Hurtado
        </h1>
        
        {/* Descripción - Mejor legibilidad en pantallas pequeñas */}
        <div className="space-y-2 mb-10">
          <p className="text-lg sm:text-xl md:text-2xl font-light text-zinc-400 tracking-tight max-w-2xl mx-auto">
            <span className="text-white font-normal block sm:inline">AI Engineer & Full Stack Developer</span>
          </p>
          <p className="text-zinc-500 text-base md:text-lg max-w-xl mx-auto">
             {t('description')}
          </p>
        </div>

        {/* Botones - Full width en móviles, inline en tablets/desktop */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-xs sm:max-w-none mx-auto">
          <a 
            href="#projects" 
            className="w-full sm:w-auto group relative px-8 py-3.5 bg-zinc-100 text-[#121212] rounded-xl font-semibold text-sm transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {t('cta1')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#contact" 
            className="w-full sm:w-auto px-8 py-3.5 glass-panel text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors border border-white/10"
          >
            {t('cta2')} <ArrowDown size={18} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}