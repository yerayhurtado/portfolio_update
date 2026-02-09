"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { SelectLanguage } from "../SelectLanguage";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const navKeys = ["about", "journey", "projects", "stack", "contact"] as const;
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/70 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer text-xl font-medium tracking-tighter text-white"
        >
          YH
        </motion.span>

        {/* Navegación desktop centrada */}
        <div className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-light text-zinc-400 md:flex">
          {navKeys.map((key, i) => (
            <motion.a
              key={key}
              href={`#${key}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group relative py-2 capitalize transition-colors hover:text-white"
            >
              <motion.span layout>{t(key)}</motion.span>
              <motion.span className="absolute bottom-0 left-0 h-px w-0 bg-[#00D4FF] transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="CV_YerayHurtado.pdf"
            download
            className="hidden items-center rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium text-zinc-200 transition-all hover:border-[#00D4FF]/60 hover:bg-[#00D4FF]/10 hover:text-white sm:inline-flex"
          >
            {t("cv")}
          </a>
          <SelectLanguage />

          {/* Botón menú móvil */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-colors hover:border-[#00D4FF]/60 hover:bg-[#00D4FF]/10 hover:text-white md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {open && (
        <div className="border-t border-white/10 bg-background/95 px-6 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-2 text-sm font-light text-zinc-300">
            {navKeys.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={closeMenu}
                className="rounded-lg px-1 py-2 capitalize transition-colors hover:text-white"
              >
                {t(key)}
              </a>
            ))}
            <a
              href="CV_YerayHurtado.pdf"
              download
              className="mt-2 inline-flex items-center rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-zinc-200 transition-all hover:border-[#00D4FF]/60 hover:bg-[#00D4FF]/10 hover:text-white"
            >
              {t("cv")}
            </a>
          </nav>
        </div>
      )}
    </motion.nav>
  );
}