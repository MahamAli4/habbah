"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, GraduationCap, Send, Loader2, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function VolunteerPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", interest: "", message: "" });
      } else {
        const d = await res.json();
        setError(d.error || "Failed to submit.");
        setStatus("error");
      }
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-darkblue min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lightblue/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lightblue/10 border border-lightblue/20 text-lightblue text-xs font-black uppercase tracking-[0.2em] mb-8"
          >
            <Heart className="w-3 h-3" /> Make a Difference
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter"
          >
            Volunteer With{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-br from-white via-lightblue to-yellow bg-size-[200%_auto] animate-shine">
              Habbah
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-yellow/90 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed"
          >
            Join our volunteer program and contribute your skills and time to help us empower the next generation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-8 justify-center mt-12 text-white/60"
          >
            {[
              { icon: Users, label: "Community Impact" },
              { icon: GraduationCap, label: "Skill Sharing" },
              { icon: Heart, label: "Fulfilling Work" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 font-bold text-sm">
                <Icon className="w-4 h-4 text-lightblue" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Volunteer Form Section */}
      <section className="py-24 bg-bglightblue">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-black text-lightblue uppercase tracking-[0.3em] mb-4">Get Involved</p>
              <h2 className="text-5xl md:text-6xl font-black text-darkblue tracking-tighter">
                Volunteer Application
              </h2>
              <p className="text-gray-500 mt-4 font-bold max-w-xl mx-auto">
                Can&apos;t find a suitable role? Join our community of changemakers.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_30px_80px_rgba(3,4,94,0.08)] border border-gray-50"
            >
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-darkblue rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-darkblue/30">
                    <CheckCircle className="w-10 h-10 text-yellow" />
                  </div>
                  <h3 className="text-3xl font-black text-darkblue mb-3">Application Received!</h3>
                  <p className="text-gray-500 font-bold mb-8 text-lg">
                    Thank you for your interest in volunteering. We&apos;ll be in touch soon!
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 bg-darkblue text-white font-black rounded-2xl hover:bg-lightblue transition-all text-sm uppercase tracking-widest"
                  >
                    Submit Another
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {[
                      { icon: Users, title: "Community Impact", desc: "Directly help students and families in need" },
                      { icon: GraduationCap, title: "Skill Sharing", desc: "Teach, mentor, and guide aspiring professionals" },
                      { icon: Heart, title: "Fulfilling Work", desc: "Experience meaningful work that transforms lives" },
                    ].map(({ icon: Icon, title, desc }) => (
                      <div key={title} className="flex items-start gap-4 p-4 bg-bglightblue rounded-2xl">
                        <div className="w-12 h-12 bg-darkblue text-yellow rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-darkblue/20">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-black text-darkblue">{title}</p>
                          <p className="text-gray-500 font-medium text-sm">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { label: "Full Name", name: "name", type: "text", placeholder: "Your full name", required: true },
                        { label: "Email Address", name: "email", type: "email", placeholder: "your@email.com", required: true },
                        { label: "Phone Number", name: "phone", type: "tel", placeholder: "+92 300 0000000" },
                        { label: "Area of Interest", name: "interest", type: "text", placeholder: "e.g. Teaching, Mentoring, Administration" },
                      ].map((field) => (
                        <div key={field.name} className="flex flex-col gap-1.5">
                          <label className="text-xs font-black text-darkblue uppercase tracking-widest">
                            {field.label} {field.required && <span className="text-yellow">*</span>}
                          </label>
                          <input
                            type={field.type}
                            name={field.name}
                            value={(form as any)[field.name]}
                            onChange={(e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3.5 text-darkblue placeholder:text-gray-400 focus:border-lightblue focus:ring-4 focus:ring-lightblue/10 outline-none transition-all font-bold text-sm"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black text-darkblue uppercase tracking-widest">
                        Why do you want to volunteer?
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        placeholder="Tell us about your motivation..."
                        rows={4}
                        className="bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3.5 text-darkblue placeholder:text-gray-400 focus:border-lightblue focus:ring-4 focus:ring-lightblue/10 outline-none transition-all font-bold text-sm resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                        <p className="text-red-600 font-bold text-sm">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-4 bg-darkblue text-white font-black rounded-2xl hover:bg-lightblue transition-all shadow-lg shadow-darkblue/20 uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                      ) : (
                        <><Send className="w-4 h-4" /> Submit Application</>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>

            <div className="text-center mt-12">
              <p className="text-gray-400 font-bold text-sm">
                Looking for paid positions?{" "}
                <Link href="/careers" className="text-lightblue hover:underline font-black">
                  View our career openings <ArrowRight className="w-3 h-3 inline" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
