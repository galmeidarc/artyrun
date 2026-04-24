/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Target, 
  Activity, 
  Layers, 
  Palette, 
  Trophy, 
  ArrowRight, 
  CheckCircle2,
  Calendar,
  Moon,
  Zap
} from 'lucide-react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  key?: string | number;
}

const FadeIn = ({ children, delay = 0, y = 20 }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center glass-light">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center">
        <Palette className="text-white w-5 h-5" />
      </div>
      <span className="font-bold text-xl tracking-tight text-brand-dark">Artyrun</span>
    </div>
    <div className="flex items-center gap-4">
      <button className="text-sm font-medium text-brand-dark hover:text-brand-blue transition-colors px-4 py-2 rounded-full border border-slate-200 hover:border-brand-blue/50">
        Entrar
      </button>
    </div>
  </nav>
);

const GenerativeArtSim = () => {
  const [active, setActive] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto group">
      <div className="absolute inset-0 bg-brand-blue/10 blur-[100px] rounded-full group-hover:bg-brand-blue/20 transition-colors duration-1000" />
      <div className="relative w-full h-full glass-light rounded-3xl overflow-hidden flex items-center justify-center bg-white/40">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotate: 10 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-4/5 h-4/5 relative"
          >
            <div className="absolute inset-0 border-2 border-brand-blue/30 rounded-full animate-spin-slow" />
            <div className="absolute inset-4 border-2 border-slate-900/10 rounded-lg rotate-45" />
            <div className="absolute inset-8 border border-brand-blue/5 rounded-full animate-bounce-slow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-brand-blue blur-3xl opacity-20 animate-pulse" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const FloatingElement = ({ 
  children, 
  duration = 6, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode, 
  duration?: number, 
  delay?: number,
  className?: string
}) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    className={`absolute pointer-events-none opacity-[0.15] ${className}`}
  >
    {children}
  </motion.div>
);

const SketchLine = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 100" fill="none">
    <motion.path
      d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 190 80"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="4 4"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
  </svg>
);

const HandCircle = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <motion.circle
      cx="50" cy="50" r="40"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="10 5"
      initial={{ pathLength: 0, rotate: -90 }}
      animate={{ pathLength: 1, rotate: 0 }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
    />
  </svg>
);

const Sketches = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    {/* Esboços flutuantes */}
    <FloatingElement className="top-[10%] left-[5%]" duration={7}>
      <HandCircle className="w-48 h-48 text-brand-blue" />
    </FloatingElement>
    
    <FloatingElement className="top-[20%] right-[10%]" duration={8} delay={1}>
      <SketchLine className="w-64 h-32 text-slate-300 rotate-45" />
    </FloatingElement>
    
    <FloatingElement className="bottom-[15%] left-[20%]" duration={9} delay={0.5}>
      <SketchLine className="w-40 h-20 text-brand-blue/30 -rotate-12" />
    </FloatingElement>
    
    <FloatingElement className="top-[50%] left-[5%]" duration={10} delay={2}>
      <div className="w-32 h-32 border border-dashed border-slate-200 rounded-full rotate-12" />
    </FloatingElement>

    <FloatingElement className="top-[15%] left-[40%]" duration={6} delay={1.5}>
      <div className="w-1 h-32 bg-gradient-to-b from-slate-100 to-transparent rotate-45" />
    </FloatingElement>

    <FloatingElement className="bottom-[10%] right-[25%]" duration={11}>
      <HandCircle className="w-32 h-32 text-slate-200" />
    </FloatingElement>

    {/* Pontos de luz artísticos */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/5 blur-[120px] rounded-full" />
    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-slate-100 blur-[100px] rounded-full" />
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-mesh-light overflow-x-hidden pt-20">
      <Nav />

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-12 relative">
        <Sketches />
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter text-brand-dark">
              Desafios <span className="text-brand-blue italic">criativos</span> estimulam sua <span className="text-glow-blue text-brand-blue">arte</span>.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Entre em um desafio ou grupo. Acompanhe e registre suas atividades criativas.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="https://www.apple.com/br/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-blue hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-full transition-all flex items-center justify-center gap-2 group shadow-xl shadow-brand-blue/20"
              >
                <span>Comece sua jornada</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeIn>
        </div>
        <div className="flex-1 w-full max-w-xl">
          <FadeIn delay={0.4} y={50}>
            <GenerativeArtSim />
          </FadeIn>
        </div>
      </section>

      {/* Social Proof / Hook */}
      <section className="bg-slate-50/50 py-12 border-y border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-[0.3em]">
            Criadores ao redor do mundo estão construindo hábitos
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8 md:gap-24 opacity-30 grayscale transition-all duration-700">
            <span className="text-2xl font-bold italic text-brand-dark">Designers</span>
            <span className="text-2xl font-bold italic text-brand-dark">Artistas</span>
            <span className="text-2xl font-bold italic text-brand-dark">Musicistas</span>
            <span className="text-2xl font-bold italic text-brand-dark">Escritores</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-6 py-32 bg-white">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl md:text-6xl font-black tracking-tight text-brand-dark">
            Treine o hábito de criar com <span className="text-brand-blue">Artyrun</span>
          </h2>
          <p className="text-slate-400 font-medium max-w-2xl mx-auto">Simples, divertido e viciante.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { 
              step: "01", 
              title: "Foto ou Fake", 
              desc: "Registre sua atividade diária em um check-in com foto.",
              icon: <Zap className="w-6 h-6" />
            },
            { 
              step: "02", 
              title: "Análise imediata", 
              desc: "Cada atividade gera dados para entender sua obra.",
              icon: <Activity className="w-6 h-6" />
            },
            { 
              step: "03", 
              title: "Ranking Criativo", 
              desc: "Sistema de pontuação para estimular mais atividades.",
              icon: <Layers className="w-6 h-6" />
            }
          ].map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="space-y-6 relative group p-10 glass-light rounded-[2.5rem] card-hover border-transparent">
                <div className="text-8xl font-black text-slate-100 absolute -top-6 -left-4 z-0">{item.step}</div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark">{item.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mt-4">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        
        <div className="mt-20 flex justify-center">
          <FadeIn delay={0.4}>
            <a 
              href="https://www.apple.com/br/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-blue hover:bg-blue-600 text-white font-bold py-4 px-12 rounded-full transition-all flex items-center justify-center gap-2 group shadow-xl shadow-brand-blue/20"
            >
              <span>Explore as possibilidades</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-slate-50/50 py-32 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <FadeIn>
                <h2 className="text-4xl md:text-7xl font-black leading-tight text-brand-dark tracking-tighter">
                  Construa mais do que <span className="text-brand-blue italic">ideias</span>.<br />Construa um hábito.
                </h2>
              </FadeIn>
              <div className="grid sm:grid-cols-2 gap-10">
                {[
                  { title: "Flow Criativo", desc: "Estimule seu foco", icon: <Activity className="w-5 h-5" /> },
                  { title: "Estilo Único", desc: "Descubra sua identidade", icon: <Sparkles className="w-5 h-5" /> },
                  { title: "Desafios Diários", desc: "Para manter a chama viva", icon: <Trophy className="w-5 h-5" /> },
                  { title: "Ganhe pontos", desc: "E desafie seus amigos", icon: <Target className="w-5 h-5" /> }
                ].map((f, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="flex gap-4 group">
                      <div className="p-3 h-fit bg-white border border-slate-200 rounded-2xl text-brand-blue shadow-sm group-hover:border-brand-blue/20 transition-all">
                        {f.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-dark">{f.title}</h4>
                        <p className="text-sm font-medium text-slate-400">{f.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
            <div className="relative">
              <FadeIn y={40}>
                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-[2.5rem] space-y-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Semana atual</span>
                      <Calendar className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="flex gap-3">
                      {[1,1,1,1,1,0,0].map((s, i) => (
                        <div key={i} className={`h-14 flex-1 rounded-xl ${s ? 'bg-brand-blue shadow-lg shadow-brand-blue/20' : 'bg-slate-100'}`} />
                      ))}
                    </div>
                    <div className="pt-6 flex justify-between items-center border-t border-slate-50">
                      <div className="flex gap-8">
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-tight mb-1">Sessão</div>
                          <div className="text-2xl font-black tracking-tight text-brand-dark">45m</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-tight mb-1">Streak</div>
                          <div className="text-2xl font-black tracking-tight text-brand-blue">12 Dias</div>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full border-4 border-brand-blue/5 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-brand-blue animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-[2.5rem] flex items-center gap-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="p-4 bg-brand-blue/5 rounded-2xl">
                      <Moon className="text-brand-blue w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold italic text-brand-dark text-lg">Pico Noturno</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">Você é 40% mais produtivo após as 22h.</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="container mx-auto px-6 py-40 text-center border-t border-slate-100 bg-slate-50/30">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="flex flex-col items-center gap-4">
            <span className="w-12 h-1 bg-brand-blue rounded-full" />
            <span className="text-brand-blue font-bold tracking-[0.2em] text-xs uppercase">Nossa Filosofia</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black italic text-brand-dark tracking-tight">"Arte é consistência"</h2>
          <p className="text-slate-400 font-medium text-lg leading-relaxed">
            Aspirantes a artistas acreditam que criatividade é um talento inato. Vamos provar que todos podem ser artistas.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-40">
        <div className="relative bg-brand-blue rounded-[4rem] p-16 md:p-32 overflow-hidden text-center shadow-2xl shadow-brand-blue/30">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 blur-[150px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative space-y-10">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-white">
              Pronto para sua <br />primeira criação?
            </h2>
            <p className="text-xl text-blue-100 max-w-lg mx-auto font-medium">
              Junte-se a milhares de criadores e transforme seus dados em beleza pura.
            </p>
            <div className="flex flex-col items-center gap-8">
              <a 
                href="https://www.apple.com/br/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-brand-blue hover:bg-slate-100 font-black py-7 px-16 rounded-full transition-all text-2xl uppercase tracking-tighter shadow-2xl hover:scale-105 active:scale-95 inline-block"
              >
                Comece agora
              </a>
              <div className="flex items-center gap-4 text-white/60 font-bold uppercase text-xs tracking-widest">
                <span className="flex items-center gap-2 font-black"><CheckCircle2 className="w-4 h-4" />Grátis para começar</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span>Sem cartão de crédito</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-16 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-blue rounded-lg">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-brand-dark">Artyrun</span>
          </div>
          <div className="flex gap-10 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-brand-blue transition-colors uppercase tracking-widest">Termos</a>
            <a href="#" className="hover:text-brand-blue transition-colors uppercase tracking-widest">Privacidade</a>
          </div>
          <p className="text-xs font-black text-slate-300 font-mono tracking-tighter">© 2026 ARTYRUN LABS. ALL ART RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
