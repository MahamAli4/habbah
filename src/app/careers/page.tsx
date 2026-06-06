"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  Send,
  Heart,
  Users,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  Calendar,
  Building,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full-Time",
  PART_TIME: "Part-Time",
  INTERNSHIP: "Internship",
  CONTRACT: "Contract",
};

const JOB_TYPE_COLORS: Record<string, string> = {
  FULL_TIME: "bg-darkblue text-white",
  PART_TIME: "bg-lightblue/10 text-lightblue border border-lightblue/30",
  INTERNSHIP: "bg-yellow/10 text-yellow border border-yellow/30",
  CONTRACT: "bg-gray-100 text-gray-600 border border-gray-200",
};

export default function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyForm, setApplyForm] = useState({
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    coverLetter: "",
    experience: "",
    education: "",
  });
  const [applyStatus, setApplyStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [applyError, setApplyError] = useState("");

  // Volunteer form
  const [volForm, setVolForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [volStatus, setVolStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [volError, setVolError] = useState("");

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((d) => setJobs((d.jobs || []).filter((j: any) => j.id !== 4)))
      .catch(console.error)
      .finally(() => setLoadingJobs(false));
  }, []);

  const openApply = (job: any) => {
    setSelectedJob(job);
    setApplyStatus("idle");
    setApplyForm({ applicantName: "", applicantEmail: "", applicantPhone: "", coverLetter: "", experience: "", education: "" });
    setShowApplyModal(true);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setApplyStatus("loading");
    setApplyError("");

    try {
      const res = await fetch(`/api/jobs/${selectedJob.id}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applyForm),
      });
      if (res.ok) {
        setApplyStatus("success");
      } else {
        const d = await res.json();
        setApplyError(d.error || "Failed to submit. Please try again.");
        setApplyStatus("error");
      }
    } catch {
      setApplyError("Network error. Please try again.");
      setApplyStatus("error");
    }
  };

  const handleVolSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVolStatus("loading");
    setVolError("");

    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volForm),
      });
      if (res.ok) {
        setVolStatus("success");
        setVolForm({ name: "", email: "", phone: "", interest: "", message: "" });
      } else {
        const d = await res.json();
        setVolError(d.error || "Failed to submit.");
        setVolStatus("error");
      }
    } catch {
      setVolError("Network error. Please try again.");
      setVolStatus("error");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-darkblue min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
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
            <Briefcase className="w-3 h-3" /> Join Our Team
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter"
          >
            Careers at{" "}
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
            Be part of a mission-driven team transforming lives through quality education and community support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-8 justify-center mt-12 text-white/60"
          >
            {[
              { icon: Users, label: "Collaborative Culture" },
              { icon: GraduationCap, label: "Growth Opportunities" },
              { icon: Heart, label: "Mission-Driven Work" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 font-bold text-sm">
                <Icon className="w-4 h-4 text-lightblue" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-xs font-black text-lightblue uppercase tracking-[0.3em] mb-4">Open Positions</p>
          <h2 className="text-5xl md:text-6xl font-black text-darkblue tracking-tighter">
            Current Openings
          </h2>
          <p className="text-gray-500 mt-4 font-bold max-w-xl mx-auto">
            Explore our available positions and find your perfect role in making a difference.
          </p>
        </div>

        {loadingJobs ? (
          <div className="flex flex-col items-center py-20">
            <div className="w-16 h-16 border-4 border-darkblue/10 border-t-lightblue rounded-full animate-spin mb-4" />
            <p className="text-gray-400 font-black uppercase tracking-widest text-sm">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-bglightblue rounded-[3rem] border-2 border-dashed border-lightblue/20">
            <Briefcase className="w-16 h-16 text-lightblue/30 mx-auto mb-4" />
            <p className="text-darkblue font-black text-2xl mb-2">No Open Positions</p>
            <p className="text-gray-400 font-bold">Check back soon or submit a general interest application below.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[2.5rem] border-2 border-gray-50 hover:border-lightblue/20 shadow-sm hover:shadow-[0_20px_60px_rgba(3,4,94,0.08)] transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Card Top */}
                <div className="p-8 flex-1">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-14 h-14 bg-darkblue text-yellow rounded-2xl flex items-center justify-center shadow-lg shadow-darkblue/20 group-hover:scale-110 transition-transform">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${JOB_TYPE_COLORS[job.jobType] || "bg-gray-100 text-gray-600"}`}>
                      {JOB_TYPE_LABELS[job.jobType] || job.jobType}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-darkblue tracking-tight mb-3 group-hover:text-lightblue transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-gray-500 font-medium leading-relaxed mb-6 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full text-xs font-black text-gray-400 border border-gray-100">
                      <MapPin className="w-3 h-3 text-lightblue" />
                      {job.location}
                    </div>
                    {job.department && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full text-xs font-black text-gray-400 border border-gray-100">
                        <Building className="w-3 h-3 text-yellow" />
                        {job.department}
                      </div>
                    )}
                    {job.deadlineAt && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full text-xs font-black text-red-400 border border-red-100">
                        <Calendar className="w-3 h-3" />
                        Deadline: {new Date(job.deadlineAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom */}
                <div className="px-8 pb-8">
                  <button
                    onClick={() => openApply(job)}
                    className="w-full py-4 bg-darkblue text-white font-black rounded-2xl hover:bg-lightblue transition-all shadow-lg shadow-darkblue/20 uppercase tracking-widest text-sm flex items-center justify-center gap-2 group/btn"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Volunteer Section */}
      <section className="py-24 bg-bglightblue">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-xs font-black text-lightblue uppercase tracking-[0.3em] mb-4">Make a Difference</p>
                <h2 className="text-5xl md:text-6xl font-black text-darkblue tracking-tighter leading-[0.9] mb-6">
                  Volunteer With <span className="text-lightblue">Us</span>
                </h2>
                <p className="text-gray-600 font-medium leading-relaxed text-lg mb-8">
                  Can&apos;t find a suitable role? Join our volunteer program and contribute your skills and time to help us empower the next generation.
                </p>

                <div className="space-y-5">
                  {[
                    { icon: Users, title: "Community Impact", desc: "Directly help students and families in need" },
                    { icon: GraduationCap, title: "Skill Sharing", desc: "Teach, mentor, and guide aspiring professionals" },
                    { icon: Heart, title: "Fulfilling Work", desc: "Experience meaningful work that transforms lives" },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-4">
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
              </motion.div>

              {/* Right — Volunteer Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[3rem] p-8 md:p-10 shadow-[0_30px_80px_rgba(3,4,94,0.08)] border border-gray-50"
              >
                {volStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-darkblue rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-darkblue/30">
                      <CheckCircle className="w-10 h-10 text-yellow" />
                    </div>
                    <h3 className="text-2xl font-black text-darkblue mb-3">Application Received!</h3>
                    <p className="text-gray-500 font-bold mb-6">
                      Thank you for your interest in volunteering. We&apos;ll be in touch soon!
                    </p>
                    <button
                      onClick={() => setVolStatus("idle")}
                      className="px-6 py-3 bg-darkblue text-white font-black rounded-2xl hover:bg-lightblue transition-all text-sm uppercase tracking-widest"
                    >
                      Submit Another
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-2xl font-black text-darkblue mb-2">Volunteer Application</h3>
                    <p className="text-gray-400 font-bold text-sm mb-8">Join our community of changemakers</p>

                    <form onSubmit={handleVolSubmit} className="space-y-5">
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
                            value={(volForm as any)[field.name]}
                            onChange={(e) => setVolForm((p) => ({ ...p, [e.target.name]: e.target.value }))}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3.5 text-darkblue placeholder:text-gray-400 focus:border-lightblue focus:ring-4 focus:ring-lightblue/10 outline-none transition-all font-bold text-sm"
                          />
                        </div>
                      ))}

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black text-darkblue uppercase tracking-widest">
                          Why do you want to volunteer?
                        </label>
                        <textarea
                          name="message"
                          value={volForm.message}
                          onChange={(e) => setVolForm((p) => ({ ...p, message: e.target.value }))}
                          placeholder="Tell us about your motivation..."
                          rows={4}
                          className="bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3.5 text-darkblue placeholder:text-gray-400 focus:border-lightblue focus:ring-4 focus:ring-lightblue/10 outline-none transition-all font-bold text-sm resize-none"
                        />
                      </div>

                      {volStatus === "error" && (
                        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                          <p className="text-red-600 font-bold text-sm">{volError}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={volStatus === "loading"}
                        className="w-full py-4 bg-darkblue text-white font-black rounded-2xl hover:bg-lightblue transition-all shadow-lg shadow-darkblue/20 uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {volStatus === "loading" ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                        ) : (
                          <><Send className="w-4 h-4" /> Submit Application</>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      <AnimatePresence>
        {showApplyModal && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkblue/60 backdrop-blur-md"
            onClick={(e) => e.target === e.currentTarget && setShowApplyModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[3rem] p-8 md:p-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-xs font-black text-lightblue uppercase tracking-widest mb-1">Apply For</p>
                  <h3 className="text-2xl font-black text-darkblue">{selectedJob.title}</h3>
                  <p className="text-gray-400 font-bold text-sm mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {selectedJob.location}
                  </p>
                </div>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-500 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {applyStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-darkblue rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-yellow" />
                  </div>
                  <h4 className="text-2xl font-black text-darkblue mb-2">Application Submitted!</h4>
                  <p className="text-gray-400 font-bold mb-6">We&apos;ll review your application and reach out soon.</p>
                  <button
                    onClick={() => setShowApplyModal(false)}
                    className="px-8 py-3 bg-darkblue text-white font-black rounded-2xl hover:bg-lightblue transition-all text-sm uppercase tracking-widest"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-5">
                  {[
                    { label: "Full Name", name: "applicantName", type: "text", placeholder: "Your full name", required: true },
                    { label: "Email Address", name: "applicantEmail", type: "email", placeholder: "your@email.com", required: true },
                    { label: "Phone Number", name: "applicantPhone", type: "tel", placeholder: "+92 300 0000000" },
                    { label: "Years of Experience", name: "experience", type: "text", placeholder: "e.g. 3 years" },
                    { label: "Education", name: "education", type: "text", placeholder: "e.g. Bachelor's in Management" },
                  ].map((field) => (
                    <div key={field.name} className="flex flex-col gap-1.5">
                      <label className="text-xs font-black text-darkblue uppercase tracking-widest">
                        {field.label} {field.required && <span className="text-yellow">*</span>}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={(applyForm as any)[field.name]}
                        onChange={(e) => setApplyForm((p) => ({ ...p, [e.target.name]: e.target.value }))}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3.5 text-darkblue placeholder:text-gray-400 focus:border-lightblue focus:ring-4 focus:ring-lightblue/10 outline-none transition-all font-bold text-sm"
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-darkblue uppercase tracking-widest">Cover Letter</label>
                    <textarea
                      name="coverLetter"
                      value={applyForm.coverLetter}
                      onChange={(e) => setApplyForm((p) => ({ ...p, coverLetter: e.target.value }))}
                      placeholder="Tell us why you're the right fit..."
                      rows={5}
                      className="bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3.5 text-darkblue placeholder:text-gray-400 focus:border-lightblue focus:ring-4 focus:ring-lightblue/10 outline-none transition-all font-bold text-sm resize-none"
                    />
                  </div>

                  {applyStatus === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <p className="text-red-600 font-bold text-sm">{applyError}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowApplyModal(false)}
                      className="flex-1 py-4 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all text-sm uppercase tracking-widest"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={applyStatus === "loading"}
                      className="flex-1 py-4 bg-darkblue text-white font-black rounded-2xl hover:bg-lightblue transition-all shadow-lg shadow-darkblue/20 text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {applyStatus === "loading" ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                      ) : (
                        <><Send className="w-4 h-4" /> Submit</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
