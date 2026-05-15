"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  FileText, 
  Users, 
  Search, 
  UserPlus, 
  CheckCircle,
  ArrowRight
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "The Application Form",
    desc: "Fill out the online form to receive your application pack. Ensure you have all necessary academic and financial documents ready for submission.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Interview",
    desc: "Deserving candidates will be invited for a personal interview with our Student Counsellor and Program Coordinator to discuss their aspirations.",
    icon: Users,
  },
  {
    step: "03",
    title: "Assessment",
    desc: "Our committee reviews each case based on financial need and academic merit to determine the appropriate loan tier and support level.",
    icon: Search,
  },
  {
    step: "04",
    title: "Membership Offer",
    desc: "Successful applicants receive a formal membership offer, including the approved loan amount and a clear repayment schedule.",
    icon: UserPlus,
  },
  {
    step: "05",
    title: "Acceptance",
    desc: "Upon signing the repayment agreement, you officially become a member of the Habbah Club and receive your first disbursement.",
    icon: CheckCircle,
  },
];

export default function ApplicationProcess() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden bg-darkblue">
        {/* Modern Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop"
            alt="Success background"
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
              Step by Step Guide
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter text-shadow-lg"
            >
              Application <span className="gradient-text">Process</span>
            </motion.h1>
  
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg md:text-2xl text-yellow max-w-2xl mx-auto leading-relaxed font-black text-shadow-lg uppercase tracking-wide"
            >
              Transparent and straightforward steps to becoming a Habbah Club beneficiary.
            </motion.p>
          </div>
        </div>

        {/* Floating Abstract Shapes */}
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-lightblue/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-yellow/5 rounded-full blur-[120px]" />
      </section>

      {/* Steps Timeline */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <div className="relative">
          {/* Vertical Line for Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-lightblue via-darkblue to-lightblue transform -translate-x-1/2 opacity-20" />
          
          <div className="space-y-24">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className="flex-1 w-full">
                  <GlassCard className="p-10 hover:border-lightblue transition-all">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-6xl font-extrabold text-lightblue/30 leading-none">
                        {step.step}
                      </span>
                      <h3 className="text-3xl font-bold text-darkblue">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {step.desc}
                    </p>
                  </GlassCard>
                </div>

                {/* Center Icon */}
                <div className="relative z-10 w-20 h-20 bg-darkblue rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white shrink-0 group-hover:scale-110 transition-transform">
                  <step.icon className="w-10 h-10 text-lightblue" />
                </div>

                {/* Spacer for Desktop Alignment */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-lightblue rounded-[3rem] p-12 md:p-16 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-r from-lightblue to-cyan-500 opacity-50" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-darkblue mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-darkblue/80 max-w-2xl mx-auto mb-10 font-medium">
              Don't let financial obstacles hold you back. Apply today and join a community of scholars and mentors.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-darkblue text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-webblack transition-all hover:shadow-2xl hover:-translate-y-1"
            >
              Apply for Interest-Free Loan
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FAQs or Additional Info */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <SectionHeader 
          title="Important Information" 
          subtitle="Please read these details carefully before starting your application."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {[
            { 
              title: "Eligibility", 
              text: "Applicants must be enrolled in or have an admission offer from a recognized university for an undergraduate degree program." 
            },
            { 
              title: "Documents Required", 
              text: "CNIC, Academic transcripts (SSC, HSC), University Admission Letter, and Proof of Household Income." 
            },
            { 
              title: "Processing Time", 
              text: "The entire process from application to disbursement typically takes 4-6 weeks depending on interview availability." 
            },
            { 
              title: "Repayment Terms", 
              text: "Repayments are interest-free and start 6 months after graduation or upon securing employment, whichever is earlier." 
            }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <CheckCircle className="w-6 h-6 text-lightblue shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-darkblue text-lg mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
