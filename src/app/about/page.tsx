"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Heart, 
  Target, 
  Trophy, 
  Clock, 
  HandCoins,
  Users,
  Quote,
  GraduationCap,
  Sparkles,
  MapPin
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";

export default function About() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden bg-darkblue">
        {/* Modern Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop"
            alt="Students collaborating"
            fill
            className="object-cover object-bottom opacity-50 brightness-[0.6]"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-darkblue/60 via-transparent to-white" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-lightblue/10 backdrop-blur-md border border-lightblue/20 text-lightblue text-xs font-black uppercase tracking-[0.2em] mb-8"
            >
              Learn Our Story
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter text-shadow-lg"
            >
              About <span className="gradient-text">Habbah</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg md:text-2xl text-yellow max-w-2xl mx-auto leading-relaxed font-black text-shadow-lg uppercase tracking-wide"
            >
              Habbah Educational Trust is dedicated to assisting deserving students in Pakistan
              by providing financial support for their bachelor's degree programmes.
            </motion.p>
          </div>
        </div>

        {/* Floating Abstract Shapes */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-lightblue/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-yellow/5 rounded-full blur-[120px]" />
      </section>

      {/* Quranic Verse Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Nature Image representing the Verse */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden min-h-[400px] shadow-2xl border-4 border-white group"
          >
            <Image 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop"
              alt="Nature representing growth"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-darkblue/10 group-hover:bg-transparent transition-all duration-700" />
            <div className="absolute bottom-8 left-8 bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30">
               <p className="text-white font-black uppercase text-xs tracking-widest">Growth & Abundance</p>
            </div>
          </motion.div>

          {/* The Verse Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-12 md:p-16 rounded-[3rem] flex flex-col justify-center relative overflow-hidden group"
          >
            <Quote className="w-16 h-16 text-yellow/20 absolute top-8 right-8 rotate-12 transition-transform group-hover:scale-125" />
            <div className="space-y-6 relative z-10">
              <p className="text-xl md:text-2xl font-bold text-darkblue italic leading-relaxed">
                "The likeness of those who spend their wealth in the way of Allah, is as the likeness of a grain (of corn); it grows seven ears, and each ear has a hundred grains. Allah gives manifold increase to whom He wills."
              </p>
              <div className="w-16 h-1 bg-yellow" />
              <div>
                <p className="text-lightblue font-black uppercase tracking-[0.2em] text-xs mb-1">The Noble Qu'ran</p>
                <p className="text-darkblue font-black text-lg">Surah Al-Baqarah 2:261</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </motion.div>
        </div>
      </motion.section>

      {/* The Impact Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <SectionHeader title="The Impact" center={false} />
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
              Since inception in the year 2012, Habbah has supported over <span className="text-darkblue font-black underline decoration-yellow decoration-4 underline-offset-8">120 students</span> in pursuing their dream qualifications in various reputable educational institutions across Pakistan.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="p-8 bg-bglightblue rounded-3xl border-b-4 border-yellow shadow-xl">
                <h4 className="text-4xl font-black text-darkblue mb-2">120+</h4>
                <p className="text-lightblue font-bold uppercase text-xs tracking-widest">Success Stories</p>
              </div>
              <div className="p-8 bg-bglightblue rounded-3xl border-b-4 border-lightblue shadow-xl">
                <h4 className="text-4xl font-black text-darkblue mb-2">2012</h4>
                <p className="text-lightblue font-bold uppercase text-xs tracking-widest">Established</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Professional Frame Accents */}
            <div className="absolute -inset-4 border-2 border-dashed border-lightblue/30 rounded-[4.5rem] -rotate-3 group-hover:rotate-0 transition-transform duration-700" />
            <div className="absolute -inset-4 border-2 border-dashed border-yellow/20 rounded-[4.5rem] rotate-3 group-hover:rotate-0 transition-transform duration-700" />
            
            <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white bg-white group">
              <Image 
                src="/unnamed (8).jpg"
                alt="Habbah Members Meetup 2018"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Premium Caption Card */}
              <div className="absolute bottom-8 left-8 right-8">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  className="glass p-8 rounded-3xl border-l-4 border-yellow shadow-2xl"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-black text-2xl text-darkblue mb-1">Members' Meetup</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-lightblue" />
                        <p className="text-lightblue font-black uppercase tracking-widest text-[10px]">Karachi, Pakistan — 2018</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-darkblue text-yellow rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow rounded-full flex items-center justify-center shadow-xl border-4 border-white rotate-12 group-hover:rotate-0 transition-transform duration-500">
               <p className="text-darkblue font-black text-[10px] text-center leading-tight uppercase">Legacy<br/>Since 2012</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* The Habbah Club Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-bglightblue py-32 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative h-[500px] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl order-2 lg:order-1">
              <Image 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="Supportive ecosystem"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-darkblue/20" />
            </div>
            
            <div className="space-y-10 order-1 lg:order-2">
              <div className="space-y-4">
                <h4 className="text-yellow font-black uppercase tracking-[0.3em] text-sm">A Vibrant Community</h4>
                <h2 className="text-5xl md:text-7xl font-black text-darkblue tracking-tighter leading-[0.9]">The Habbah <span className="gradient-text">Club</span></h2>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Habbah functions amidst the growing need for a supportive ecosystem that paves the way for better access to higher education prospects for students. Our student members come from various backgrounds – each with their unique challenges, intents, and aspirations.
              </p>
              
              <div className="glass p-8 rounded-3xl border-l-8 border-yellow shadow-xl bg-white/50">
                <h3 className="text-2xl font-black text-darkblue mb-4 flex items-center gap-3">
                  <Sparkles className="text-yellow w-8 h-8" />
                  Today's Beneficiary... Tomorrow's Contributor
                </h3>
                <p className="text-gray-600 font-semibold leading-relaxed">
                  Student members benefit from strong communal support through the Habbah Club – a platform that brings together Habbah alumni and aspiring members to interact, share resources, and provide career guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lightblue/10 rounded-full blur-[120px]" />
      </motion.section>

      {/* Programs Detailed Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <SectionHeader title="Our Programs" subtitle="Comprehensive support systems designed for student success." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          {[
            {
              title: "Interest-free loans",
              desc: "Habbah offers Qarz-e-Hasanah to students pursuing undergraduate degree programmes on need-cum-merit basis. The programme covers up to 70% of tuition fees in reputable educational institutions across Pakistan.",
              icon: HandCoins,
              delay: 0
            },
            {
              title: "Convenient Repayments",
              desc: "Students are encouraged to begin repaying a nominal amount while pursuing their studies. Their contributions are used for helping other students, realizing the true purpose: 'Today's Beneficiary... Tomorrow's Contributor'.",
              icon: Clock,
              delay: 0.1
            },
            {
              title: "Scholarship Programme",
              desc: "Promoting educational access for underprivileged backgrounds entirely on need basis through a specialized Zakat Fund. Catered specifically for students pursuing Higher Secondary School certifications.",
              icon: GraduationCap,
              delay: 0.2
            },
            {
              title: "Mentorship Programme",
              desc: "Collaborating with corporate institutions and experienced professionals to provide mentorship. Focusing on quarterly sessions for educational, skill-building and career counselling to build networks.",
              icon: Users,
              delay: 0.3
            }
          ].map((program, idx) => (
            <GlassCard key={idx} delay={program.delay} className="p-10 group hover:bg-white transition-all duration-500 border-b-8 border-transparent hover:border-yellow">
              <div className="flex flex-col gap-8">
                <div className="flex justify-between items-start">
                  <div className="p-5 bg-darkblue rounded-3xl text-yellow shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <program.icon className="w-8 h-8" />
                  </div>
                  <div className="text-5xl font-black text-gray-100 group-hover:text-lightblue/20 transition-colors duration-500">
                    0{idx + 1}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-darkblue tracking-tight group-hover:text-lightblue transition-colors">{program.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed font-semibold">
                    {program.desc}
                  </p>
                </div>

                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-sm font-black text-darkblue uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                    Support Our Mission 
                    <div className="w-8 h-px bg-darkblue transition-all group-hover:w-12" />
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

