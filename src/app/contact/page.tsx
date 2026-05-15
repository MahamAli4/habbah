"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send,
  MessageSquare,
  Clock,
  ExternalLink,
  CheckCircle,
  GraduationCap,
  Heart
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";

export default function Contact() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden bg-darkblue">
        {/* Modern Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000&auto=format&fit=crop"
            alt="Contact background"
            fill
            className="object-cover object-top opacity-50 brightness-[0.6]"
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
              Get In Touch
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter text-shadow-lg"
            >
              Contact <span className="gradient-text">Habbah</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg md:text-xl text-yellow max-w-4xl mx-auto leading-relaxed font-black text-shadow-lg uppercase tracking-wide"
            >
              Unlock the door to quality education and a brighter future with our supportive, interest-free loan programme. Together, let’s build a community of extraordinary, hardworking, and committed individuals.
            </motion.p>
          </div>
        </div>

        {/* Floating Abstract Shapes */}
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-lightblue/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-yellow/5 rounded-full blur-[120px]" />
      </section>

      {/* Reach Us Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-12 md:p-16 rounded-[4rem] flex flex-col justify-center space-y-10"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-darkblue mb-6 tracking-tighter">Here's how to <span className="text-lightblue">reach us</span></h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                  <div className="p-4 bg-darkblue text-yellow rounded-2xl group-hover:rotate-12 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-darkblue uppercase tracking-widest text-xs mb-1">Our Location</h4>
                    <p className="text-gray-600 font-bold text-lg leading-relaxed">
                      Habbah Educational Trust<br/>
                      F-100, Block-B, North Nazimabad, Karachi
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start group">
                  <div className="p-4 bg-yellow text-darkblue rounded-2xl group-hover:-rotate-12 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-darkblue uppercase tracking-widest text-xs mb-1">Email Us</h4>
                    <p className="text-gray-600 font-bold text-lg">habbahclub@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="p-4 bg-yellow text-darkblue rounded-2xl group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-darkblue uppercase tracking-widest text-xs mb-1">Call Us</h4>
                    <p className="text-gray-600 font-bold text-lg">+92 300 0220635</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white min-h-[500px] group"
          >
            <iframe 
              src="https://maps-api-ssl.google.com/maps?hl=en-GB&ll=24.929,67.040948&output=embed&q=24.928435,67.040924+(Untitled+Location)&z=17"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              className="grayscale contrast-125 brightness-110 group-hover:grayscale-0 transition-all duration-1000"
            ></iframe>
            <div className="absolute top-8 left-8 bg-darkblue text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-xl">
              Live Location
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Appointment Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-5xl mx-auto text-center space-y-12 mb-16">
          <SectionHeader 
            title="Request an Appointment" 
            subtitle="Fill out the form and the Team will reach out to you" 
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Decorative Background Frame */}
          <div className="absolute -inset-4 bg-linear-to-tr from-yellow/20 to-yellow/5 rounded-[5rem] blur-2xl -z-10 group-hover:opacity-100 opacity-50 transition-opacity" />
          
          <div className="glass rounded-[4rem] p-4 md:p-8 overflow-hidden shadow-2xl border border-white/50 bg-white/40 backdrop-blur-3xl min-h-[800px]">
             <iframe 
               src="https://docs.google.com/forms/d/e/1FAIpQLSdfWLhThVV1Cge4zre7MRFZzTDNWbvhg69w0_gZzhkYatUgSg/viewform?embedded=true" 
               width="100%" 
               height="1200" 
               frameBorder="0" 
               marginHeight={0} 
               marginWidth={0}
               className="rounded-[3rem] shadow-inner"
             >
               Loading…
             </iframe>
          </div>
        </motion.div>
      </motion.section>

      {/* Final Callout */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 pb-12"
      >
         <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-3 font-black text-darkblue uppercase tracking-[0.2em] text-sm">
               <GraduationCap className="w-6 h-6" /> Quality Education
            </div>
            <div className="flex items-center gap-3 font-black text-darkblue uppercase tracking-[0.2em] text-sm">
               <Heart className="w-6 h-6 text-lightblue" /> Community Support
            </div>
            <div className="flex items-center gap-3 font-black text-darkblue uppercase tracking-[0.2em] text-sm">
               <CheckCircle className="w-6 h-6 text-yellow" /> Reliable Future
            </div>
         </div>
      </motion.section>
    </div>
  );
}

