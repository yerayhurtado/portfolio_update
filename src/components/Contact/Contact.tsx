"use client"
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LuMail, LuGithub, LuLinkedin, LuArrowUpRight } from "react-icons/lu";

export default function Contact() {
  const t = useTranslations("Contact");

  const socialLinks = [
    {
      name: "GitHub",
      icon: <LuGithub />,
      href: "https://github.com/yerayhurtado",
      label: "@yerayhurtado",
    },
    {
      name: "LinkedIn",
      icon: <LuLinkedin />,
      href: "https://www.linkedin.com/in/yerayhurtadodev/",
      label: "Yeray Hurtado",
    },
    {
      name: "Email",
      icon: <LuMail />,
      href: "mailto:yerayhudra13@gmail.com",
      label: "yerayhudra13@gmail.com",
    },
  ];

  return (
    <section
      id="contact"
      className="py-32 px-6 bg-[#121212] relative overflow-hidden"
    >
      {/* Luces de fondo optimizadas para diseño centrado */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#00D4FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/5 text-[#00D4FF] text-xs font-medium tracking-widest uppercase mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D4FF]"></span>
            </span>
            {t("eyebrow")}
          </span>

          <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-6">
            {t("title")}
          </h2>
          
          <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-12">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Tarjetas de Contacto */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-panel group p-6 flex flex-col items-center gap-4 transition-all hover:border-[#00D4FF]/50"
            >
              <div className="h-12 w-12 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-2xl text-zinc-400 group-hover:text-[#00D4FF] group-hover:scale-110 transition-all">
                {link.icon}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-tighter text-zinc-500">
                  {link.name}
                </p>
                <p className="text-sm text-white font-medium flex items-center gap-1">
                  {link.label}
                  <LuArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer pequeño opcional */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-xs text-zinc-600 tracking-widest uppercase"
        >
          © {new Date().getFullYear()} — Yeray Hurtado
        </motion.p>
      </div>
    </section>
  );
}