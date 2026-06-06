"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
  GraduationCap,
  Heart,
  Loader2,
  AlertCircle,
  Calendar,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredDate: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "", preferredDate: "" });
      } else {
        const data = await res.json();
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden bg-darkblue">
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
              Unlock the door to quality education and a brighter future. Together, let's build a community of extraordinary individuals.
            </motion.p>
          </div>
        </div>

        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-lightblue/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-yellow/5 rounded-full blur-[120px]" />
      </section>

      {/* Reach Us + Map Section */}
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
              <h2 className="text-4xl md:text-5xl font-black text-darkblue mb-6 tracking-tighter">
                Here&apos;s how to <span className="text-lightblue">reach us</span>
              </h2>
              <div className="space-y-8">
                {[
                  { Icon: MapPin, bg: "bg-darkblue", color: "text-yellow", title: "Our Location", text: "Habbah Educational Trust\nF-100, Block-B, North Nazimabad, Karachi" },
                  { Icon: Mail, bg: "bg-yellow", color: "text-darkblue", title: "Email Us", text: "habbahclub@gmail.com" },
                  { Icon: Phone, bg: "bg-yellow", color: "text-darkblue", title: "Call Us", text: "+92 300 0220635" },
                ].map(({ Icon, bg, color, title, text }) => (
                  <div key={title} className="flex gap-6 items-start group">
                    <div className={`p-4 ${bg} ${color} rounded-2xl group-hover:rotate-6 transition-transform shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-darkblue uppercase tracking-widest text-xs mb-1">{title}</h4>
                      <p className="text-gray-600 font-bold text-lg leading-relaxed whitespace-pre-line">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white min-h-[500px] group"
          >
            <iframe
              src="https://maps-api-ssl.google.com/maps?hl=en-GB&ll=24.929,67.040948&output=embed&q=24.928435,67.040924+(Habbah+Educational+Trust)&z=17"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="grayscale contrast-125 brightness-110 group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute top-8 left-8 bg-darkblue text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-xl">
              Live Location
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionHeader
              title="Send Us a Message"
              subtitle="Fill out the form below and our team will get back to you shortly"
            />
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-linear-to-tr from-yellow/20 to-lightblue/10 rounded-[5rem] blur-2xl -z-10 opacity-60" />

            <div className="glass rounded-[4rem] p-8 md:p-14 shadow-2xl border border-white/50">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-darkblue rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-darkblue/30">
                    <CheckCircle className="w-12 h-12 text-yellow" />
                  </div>
                  <h3 className="text-3xl font-black text-darkblue mb-4 tracking-tight">Message Sent!</h3>
                  <p className="text-gray-600 font-bold text-lg mb-8 max-w-md mx-auto">
                    Thank you for reaching out. Our team will contact you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-8 py-4 bg-darkblue text-white font-black rounded-2xl hover:bg-lightblue transition-all shadow-lg shadow-darkblue/20 uppercase tracking-widest text-sm"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-darkblue uppercase tracking-widest">
                        Full Name <span className="text-yellow">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="bg-white/80 border-2 border-gray-100 rounded-2xl px-5 py-4 text-darkblue placeholder:text-gray-400 focus:border-lightblue focus:ring-4 focus:ring-lightblue/10 outline-none transition-all font-bold"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-darkblue uppercase tracking-widest">
                        Email Address <span className="text-yellow">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="bg-white/80 border-2 border-gray-100 rounded-2xl px-5 py-4 text-darkblue placeholder:text-gray-400 focus:border-lightblue focus:ring-4 focus:ring-lightblue/10 outline-none transition-all font-bold"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-darkblue uppercase tracking-widest">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+92 300 0000000"
                        className="bg-white/80 border-2 border-gray-100 rounded-2xl px-5 py-4 text-darkblue placeholder:text-gray-400 focus:border-lightblue focus:ring-4 focus:ring-lightblue/10 outline-none transition-all font-bold"
                      />
                    </div>

                    {/* Preferred Date */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-darkblue uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Preferred Meeting Date
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={form.preferredDate}
                        onChange={handleChange}
                        className="bg-white/80 border-2 border-gray-100 rounded-2xl px-5 py-4 text-darkblue focus:border-lightblue focus:ring-4 focus:ring-lightblue/10 outline-none transition-all font-bold"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-darkblue uppercase tracking-widest">
                      Your Message <span className="text-yellow">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      required
                      rows={6}
                      className="bg-white/80 border-2 border-gray-100 rounded-2xl px-5 py-4 text-darkblue placeholder:text-gray-400 focus:border-lightblue focus:ring-4 focus:ring-lightblue/10 outline-none transition-all font-bold resize-none"
                    />
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-100 rounded-2xl">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                      <p className="text-red-600 font-bold text-sm">{errorMsg}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full md:w-auto px-10 py-5 bg-darkblue text-white font-black rounded-2xl hover:bg-lightblue transition-all shadow-xl shadow-darkblue/20 uppercase tracking-widest text-sm flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
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
