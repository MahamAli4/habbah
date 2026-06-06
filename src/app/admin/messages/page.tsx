"use client";

import { useState, useEffect } from "react";
import { 
  Mail, 
  Trash2, 
  RefreshCw, 
  Search, 
  Filter, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Phone,
  Calendar,
  ArrowRight,
  Menu,
  X,
  RotateCcw
} from "lucide-react";
import { Suspense } from "react";
import Sidebar from "@/components/admin/Sidebar";

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessages, setSelectedMessages] = useState<Set<number>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>("");

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/session");
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUserRole(data.user.role);
        }
      }
    } catch (err) {
      console.error("Auth check error:", err);
    }
  };

  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages", {
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessages(data.messages || data || []);
      } else {
        setError(data.error || "Failed to load messages");
      }
    } catch (err: any) {
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    loadMessages();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      const res = await fetch("/api/admin/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageIds: [id] }),
        credentials: "include"
      });
      
      if (res.ok) {
        loadMessages();
        setSelectedMessages(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete message");
      }
    } catch (err) {
      alert("Error deleting message");
    }
  };

  const handleRestore = async (id: number) => {
    if (!confirm("Are you sure you want to restore this message?")) return;
    
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageIds: [id] }),
        credentials: "include"
      });
      
      if (res.ok) {
        loadMessages();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to restore message");
      }
    } catch (err) {
      alert("Error restoring message");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedMessages.size === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedMessages.size} selected messages?`)) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageIds: Array.from(selectedMessages) }),
        credentials: "include"
      });
      
      if (res.ok) {
        loadMessages();
        setSelectedMessages(new Set());
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete messages");
      }
    } catch (err) {
      alert("Error processing bulk deletion");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedMessages.size === filteredMessages.length) {
      setSelectedMessages(new Set());
    } else {
      setSelectedMessages(new Set(filteredMessages.map(m => m.id)));
    }
  };

  const toggleSelect = (id: number) => {
    const newSelected = new Set(selectedMessages);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedMessages(newSelected);
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-[#f9fafc] overflow-hidden relative">
      {/* Mobile Header */}
      <div className="lg:hidden h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-50 w-full shrink-0">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 -ml-2 text-idara-navy">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="font-black text-idara-navy tracking-tight">Admin Portal</span>
        <div className="w-8" />
      </div>

      {/* Sidebar Component */}
      <Suspense fallback={null}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={userRole} />
      </Suspense>
      
      {/* CRITICAL FIX: Yahan 'lg:ml-64' ya 'lg:ml-72' add kiya hai. 
        Agar aapka sidebar thoda zyada chauda hai toh 'lg:ml-72' ya 'lg:ml-80' use kar sakte hain.
        Yeh main content ko force karega ke woh sidebar ke khatam hone ke baad shuru ho.
      */}
      <main className="flex-1 min-w-0 w-full flex flex-col overflow-hidden lg:ml-94">
        {/* Top Header */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 md:px-10 relative z-10 w-full shrink-0">
          <div className="truncate pr-4">
            <h1 className="text-2xl md:text-3xl font-black text-idara-navy tracking-tight truncate">Messages</h1>
            <p className="text-xs md:text-sm font-black text-idara-orange uppercase tracking-[.2em] opacity-80 truncate">Communication Hub</p>
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
            <button 
              onClick={loadMessages}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-50 text-idara-navy rounded-2xl hover:bg-idara-navy hover:text-white transition-all shadow-sm border border-gray-100"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-idara-navy flex items-center justify-center text-white font-black text-base md:text-xl shadow-lg shadow-idara-navy/20 cursor-default">
              {userRole === 'SUPER_ADMIN' ? 'SA' : 'A'}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 w-full">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-idara-orange transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-2 border-gray-100 rounded-3xl pl-14 pr-6 py-3.5 outline-none focus:border-idara-orange focus:ring-4 focus:ring-idara-orange/5 transition-all font-bold text-gray-700 shadow-sm"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button 
                onClick={handleSelectAll}
                className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-white border-2 border-gray-100 text-idara-navy font-black text-sm uppercase tracking-widest hover:border-idara-navy transition-all shadow-sm whitespace-nowrap"
              >
                {selectedMessages.size === filteredMessages.length && filteredMessages.length > 0 ? "Deselect All" : "Select All"}
              </button>
              {selectedMessages.size > 0 && (
                <button 
                  onClick={handleBulkDelete}
                  disabled={loading}
                  className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-rose-50 text-rose-500 font-black text-sm uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
                >
                  <Trash2 size={16} />
                  Delete ({selectedMessages.size})
                </button>
              )}
            </div>
          </div>

          {/* Messages Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 w-full">
              <div className="w-16 h-16 border-4 border-idara-navy/10 border-t-idara-orange rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 font-black uppercase tracking-widest text-sm">Loading Inquiries...</p>
            </div>
          ) : error ? (
            <div className="bg-rose-50 border-2 border-rose-100 p-10 rounded-[2.5rem] text-center w-full">
              <p className="text-rose-500 font-black text-xl mb-2">Oops! Something went wrong</p>
              <p className="text-rose-400 font-bold">{error}</p>
              <button onClick={loadMessages} className="mt-6 px-8 py-3 bg-rose-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-rose-500/20">Try Again</button>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="bg-white border-2 border-gray-100 p-12 md:p-20 rounded-[3rem] text-center shadow-sm w-full">
              <Mail className="w-16 h-16 md:w-20 md:h-20 text-gray-100 mx-auto mb-6" />
              <p className="text-idara-navy font-black text-xl md:text-2xl mb-2 tracking-tight">No messages found</p>
              <p className="text-gray-400 font-bold text-sm md:text-base">Inquiries from the website will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 w-full">
              {filteredMessages.map((m) => (
                <div 
                  key={m.id} 
                  className={`group bg-white border-2 rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-[0_20px_50px_rgba(3,18,73,0.08)] transition-all duration-500 relative overflow-hidden flex flex-col min-w-0 ${
                    selectedMessages.has(m.id) ? "border-idara-orange ring-4 ring-idara-orange/5" : "border-gray-50 hover:border-idara-orange/20"
                  } ${m.isDeleted ? "bg-rose-50/20 border-rose-200" : ""}`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-idara-orange/5 rounded-full -mr-12 -mt-12 group-hover:scale-[3] transition-all duration-700"></div>
                  
                  {/* Select Checkbox */}
                  <div className="absolute top-6 right-6 z-10">
                    <input 
                      type="checkbox" 
                      checked={selectedMessages.has(m.id)}
                      onChange={() => toggleSelect(m.id)}
                      className="w-5 h-5 rounded-lg border-2 border-gray-200 text-idara-orange focus:ring-idara-orange/20 transition-all cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-4 mb-6 relative z-10 pr-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-idara-navy text-white rounded-2xl flex items-center justify-center font-black text-lg md:text-xl shadow-lg shadow-idara-navy/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 italic shrink-0">
                      {m.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="overflow-hidden min-w-0 flex-1">
                      <h3 className="font-black text-idara-navy text-base md:text-lg leading-tight truncate group-hover:text-idara-orange transition-colors">{m.name}</h3>
                      <p className="text-xs font-bold text-gray-400 truncate">{m.email}</p>
                    </div>
                  </div>

                  {m.isDeleted && (
                    <div className="mb-4 px-4 py-2 bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl break-words">
                      🗑️ Soft-deleted by {m.deletedBy || "Admin"} on {new Date(m.deletedAt).toLocaleDateString()}
                    </div>
                  )}

                  <div className="space-y-4 flex-1 relative z-10 min-w-0">
                    <div className="p-4 md:p-5 bg-gray-50/50 rounded-3xl border border-gray-100 group-hover:bg-white group-hover:border-idara-orange/10 transition-all break-words overflow-hidden">
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium italic">"{m.message}"</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100 group-hover:bg-white transition-all max-w-full truncate">
                        <Phone size={10} className="text-idara-orange shrink-0" />
                        <span className="truncate">{m.phone || "No Phone"}</span>
                      </div>
                      {m.preferredDate && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full text-[10px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100 group-hover:bg-white transition-all shrink-0">
                          <Calendar size={10} />
                          {m.preferredDate}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between relative z-10 gap-2">
                    <div className="flex items-center gap-2 text-gray-300 min-w-0">
                      <Clock size={12} className="shrink-0" />
                      <span className="text-[10px] font-black uppercase tracking-widest truncate">{new Date(m.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      {m.isDeleted && userRole === 'SUPER_ADMIN' && (
                        <button 
                          onClick={() => handleRestore(m.id)}
                          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"
                          title="Restore Message"
                        >
                          <RotateCcw size={18} />
                        </button>
                      )}
                      
                      {(!m.isDeleted || userRole === 'SUPER_ADMIN') && (
                        <button 
                          onClick={() => handleDelete(m.id)}
                          className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                          title="Delete Message"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}