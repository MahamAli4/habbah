import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Mail, Phone, MapPin, Globe, Send, Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-webblack text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-lightblue/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-14 h-14 overflow-hidden rounded-xl bg-white p-1 shadow-sm">
                <Image 
                  src="/unnamed.png" 
                  alt="Habbah Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="text-3xl font-black tracking-tighter">HABBAH</span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-lg font-medium">
              Empowering future leaders through quality education and interest-free loans. 
              Join us in building a more equitable future.
            </p>
            <div className="flex gap-5">
              {[Globe, Send, Camera].map((Icon, i) => (
                <Link key={i} href="#" className="p-3 bg-white/5 rounded-2xl hover:bg-lightblue hover:text-darkblue transition-all duration-300 hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-[0.2em] text-lightblue mb-8">Navigation</h4>
            <ul className="space-y-5">
              {["About Us", "Application Process", "Success Stories", "Contact Us"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-all flex items-center gap-3 group">
                    <div className="w-1.5 h-1.5 bg-lightblue rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform font-bold">{link}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-[0.2em] text-lightblue mb-8">Initiatives</h4>
            <ul className="space-y-5">
              {["Interest-free Loans", "Scholarships", "Mentorship", "Career Guidance"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-all flex items-center gap-3 group">
                    <div className="w-1.5 h-1.5 bg-lightblue rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform font-bold">{link}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-black uppercase tracking-[0.2em] text-lightblue mb-8">Get in Touch</h4>
            <ul className="space-y-6">
              {[
                { Icon: MapPin, text: "North Nazimabad, Karachi" },
                { Icon: Phone, text: "+92 300 0220635" },
                { Icon: Mail, text: "habbahclub@gmail.com" }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 text-gray-400">
                  <div className="p-2 bg-white/5 rounded-lg shrink-0">
                    <item.Icon className="w-5 h-5 text-lightblue" />
                  </div>
                  <span className="font-bold text-sm leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-xs font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Habbah Educational Trust</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-lightblue rounded-full animate-pulse" />
            <p className="italic">Powered by Generations School</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
