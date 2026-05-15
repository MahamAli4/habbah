"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  HandCoins, 
  UserRoundCheck, 
  ArrowRight, 
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  GraduationCap
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Modern Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
            alt="Wheat field background"
            fill
            className="object-cover brightness-[0.35] scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-darkblue/40 via-transparent to-white" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-lightblue/10 backdrop-blur-md border border-lightblue/20 text-lightblue text-xs font-bold uppercase tracking-[0.2em] mb-8"
            >
              Sponsored by Generations School
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-none tracking-tighter text-shadow-lg"
            >
              Building <span className="gradient-text">Futures</span> <span className="text-yellow whitespace-nowrap">Through Education</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed font-semibold text-shadow-lg"
            >
              Habbah Educational Trust provides interest-free student loans for undergraduate degree programmes, empowering the next generation of leaders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link
                href="/contact"
                className="bg-yellow hover:bg-white text-darkblue px-10 py-5 rounded-full font-black text-lg transition-all shadow-[0_20px_40px_rgba(255,195,0,0.3)] hover:shadow-yellow/40 flex items-center gap-3 group hover:-translate-y-1"
              >
                Start Your Journey
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="glass-dark text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-darkblue transition-all border-white/20 hover:border-white/40"
              >
                Our Mission
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Abstract Shapes */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-lightblue/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-darkblue/5 rounded-full blur-[120px]" />
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <div className="w-1 h-12 bg-linear-to-b from-darkblue to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* Why Choose Habbah */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="container mx-auto px-4"
      >
        <SectionHeader 
          title="Why choose Habbah" 
          subtitle="Discover how we support students in achieving their academic dreams through a sustainable and trust-based model."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              title: "Convenient Repayment",
              desc: "Interest-free loans with flexible repayment plans tailored to your financial situation.",
              icon: HandCoins,
              delay: 0,
              img: "/unnamed (1).jpg"
            },
            {
              title: "Tailored Loan Programmes",
              desc: "Specialized financial support for various undergraduate degrees in top universities.",
              icon: GraduationCap,
              delay: 0.1,
              img: "/unnamed (2).jpg"
            },
            {
              title: "Guidance & Counselling",
              desc: "Professional mentorship and career advice to help you navigate your educational journey.",
              icon: UserRoundCheck,
              delay: 0.2,
              img: "/unnamed.jpg"
            }
          ].map((item, idx) => (
            <GlassCard key={idx} delay={item.delay} className="group overflow-hidden">
              <div className="relative h-78 -mx-8 -mt-8 mb-6 overflow-hidden">
                <Image 
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-darkblue/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur rounded-2xl shadow-lg">
                  <item.icon className="w-6 h-6 text-darkblue" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-darkblue mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-bglightblue py-32 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lightblue/10 rounded-full -mr-80 -mt-80 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow/5 rounded-full -ml-64 -mb-64 blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader 
            title="The Habbah Team" 
            subtitle="Meet the dedicated individuals working behind the scenes to empower the next generation."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-20">
            {[
              { name: "Shoaib Siddiqui", role: "Founder / Chairman", img: "/unnamed (1).png" },
              { name: "Khurram Humayun", role: "General Manager", img: "/unnamed (4).jpg" },
              { name: "Sumaira Ali", role: "Coordinator / Head of Counselling", img: "/unnamed (5).jpg" }
            ].map((person, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center group"
              >
                <div className="relative w-72 h-72 lg:w-80 lg:h-80 mx-auto mb-10 rounded-full p-2 border-2 border-dashed border-gray-200 group-hover:border-yellow transition-all duration-700">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:shadow-yellow/20 group-hover:scale-[1.05] transition-all duration-500">
                    <Image 
                      src={person.img}
                      alt={person.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  {/* Hover Accent Orb */}
                  <div className="absolute -inset-1 bg-yellow/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
                <h3 className="text-3xl font-black text-darkblue mb-2 group-hover:text-lightblue transition-colors">{person.name}</h3>
                <p className="text-lightblue font-black uppercase tracking-widest text-sm">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Student Impact Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <SectionHeader title="Empowering Future Leaders through Education" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative h-[400px] md:h-[600px] rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-8 border-white mt-12 group"
        >
          <Image 
            src="/unnamed (8).jpg"
            alt="Students collaborating"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-darkblue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>
      </motion.section>

      {/* How to reach us */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 pb-24"
      >
        <SectionHeader 
          title="How to reach us" 
          subtitle="All interactions with Habbah members and associates are carried out from Habbah's office based in Generation's School's South Campus, SITE, Karachi."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {/* Left Column: Stacked Images */}
          <div className="flex flex-col gap-6 h-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex-1 min-h-[350px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group"
            >
              <Image 
                src="/unnamed (6).jpg" 
                alt="Student collaboration" 
                fill 
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-darkblue/10 group-hover:bg-transparent transition-colors" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative flex-1 min-h-[350px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group"
            >
              <Image 
                src="/unnamed (7).jpg" 
                alt="Empowering students" 
                fill 
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-darkblue/10 group-hover:bg-transparent transition-colors" />
            </motion.div>
          </div>

          {/* Right Column: Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[550px] lg:h-full min-h-[550px] rounded-[3.5rem] overflow-hidden shadow-2xl relative border-8 border-white group"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.202302324915!2d67.005328!3d24.902718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f9015555555%3A0x8b3e3e3e3e3e3e3e!2sGeneration's+School!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="grayscale group-hover:grayscale-0 transition-all duration-1000"
            ></iframe>
            
            {/* Map Overlay Card */}
            <div className="absolute bottom-8 left-8 right-8 glass p-8 rounded-3xl shadow-2xl border border-white/20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow rounded-2xl text-darkblue shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-darkblue mb-1">Visit Our Office</h4>
                  <p className="text-gray-600 font-bold leading-relaxed">
                    Generation's School South Campus,<br />
                    SITE, Karachi, Pakistan.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="glass-dark rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden group border-white/10"
        >
          {/* Animated background highlights */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lightblue/10 rounded-full -mr-64 -mt-64 blur-[100px] group-hover:bg-yellow/5 transition-colors duration-700" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-darkblue/50 rounded-full -ml-48 -mb-48 blur-[80px]" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 text-lightblue text-sm font-black uppercase tracking-[0.3em] mb-8"
            >
              Ready to begin?
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[1.1] tracking-tighter">
              Transform Your <span className="gradient-text">Tomorrow.</span> <br className="hidden md:block" />
              Apply Today.
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
              Take the first step towards a successful career. Our application process is designed to find and support the most promising students.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/contact"
                className="bg-yellow hover:bg-white text-darkblue px-12 py-6 rounded-full font-black text-xl transition-all shadow-[0_20px_50px_rgba(255,195,0,0.2)] hover:shadow-yellow/40 hover:-translate-y-1 active:scale-95 flex items-center gap-3 group/btn"
              >
                Start Your Application
                <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Decorative grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </motion.div>
      </section>
    </div>
  );
}

