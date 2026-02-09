import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import { setRequestLocale } from 'next-intl/server';
import Experiencia from '@/components/Experiencia/Experiencia';
import Projects from '@/components/Projects/Projects';
import SkillsSection from '@/components/Skills/Skills';
import Contact from '@/components/Contact/Contact';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Experiencia />
      <Projects />
      <SkillsSection />
      <Contact />
    </>
  );
}