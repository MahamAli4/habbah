'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, FileText, ChevronRight, Layout, Menu, X } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import { Suspense } from 'react';

// Each page defines which CMS tabs/sections it has
const PAGES = [
  {
    id: 'home',
    name: 'Home Page',
    path: '/',
    tabs: [
      { tab: 'who-we-are', label: 'Who We Are Section' },
      { tab: 'impact', label: 'Impact Stats Section' },
      { tab: 'partners', label: 'Our Partners / Donors' },
      { tab: 'stories', label: 'Testimonials / Stories' },
      { tab: 'real-stories', label: 'Real Stories Section' },
    ]
  },
  {
    id: 'medical-center',
    name: 'Medical Center',
    path: '/projects/medical-center',
    tabs: [
      { tab: 'mc-services', label: 'Medical Services Cards' },
      { tab: 'general', label: 'General Content' },
    ]
  },
  {
    id: 'technical-training-centers',
    name: 'Technical Training',
    path: '/projects/technical-training-centers',
    tabs: [{ tab: 'general', label: 'General Content' }]
  },
  {
    id: 'food-support-program',
    name: 'Food Support Program',
    path: '/projects/food-support-program',
    tabs: [
      { tab: 'distribution', label: 'Distribution Centers' },
      { tab: 'general', label: 'General Content' },
    ]
  },
  {
    id: 'help-a-dream',
    name: 'Help a Dream',
    path: '/projects/help-a-dream',
    tabs: [{ tab: 'general', label: 'General Content' }]
  },
  {
    id: 'it-institute',
    name: 'IT Institute',
    path: '/projects/it-institute',
    tabs: [{ tab: 'general', label: 'General Content' }]
  },
  {
    id: 'disaster-relief-program',
    name: 'Disaster Relief',
    path: '/projects/disaster-relief-program',
    tabs: [
      { tab: 'charity', label: 'Relief Services Cards' },
      { tab: 'general', label: 'General Content' },
    ]
  },
  {
    id: 'education-schools-colleges',
    name: 'Education (Schools/Colleges)',
    path: '/projects/education-schools-colleges',
    tabs: [
      { tab: 'organization', label: 'Organization Stats' },
      { tab: 'journey', label: 'Our Journey Timeline' },
      { tab: 'supporters', label: 'Supporters / Testimonials' },
    ]
  },
];

export default function CMSPageManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPage, setExpandedPage] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUserRole(data.user.role || '');
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
      }
    };
    checkAuth();
  }, []);

  const filteredPages = PAGES.filter(page =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-50">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 -ml-2 text-idara-navy">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="font-black text-idara-navy tracking-tight">CMS Admin</span>
        <div className="w-8" />
      </div>

      <Suspense fallback={<div className="w-80 bg-white" />}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={userRole} />
      </Suspense>

      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-black text-[#012060] flex items-center gap-3">
                <Layout className="text-idara-orange" /> Content Management
              </h1>
              <p className="text-gray-500 mt-1 font-medium">
                Click a page to see its sections. Click a section to edit its content.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-idara-orange transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search pages..."
                className="pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl w-full md:w-80 focus:ring-4 focus:ring-idara-orange/10 focus:border-idara-orange outline-none transition-all shadow-sm font-bold text-[#012060]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Pages List with expandable tabs */}
          <div className="space-y-4">
            {filteredPages.map((page) => (
              <div key={page.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                {/* Page Header Row */}
                <button
                  onClick={() => setExpandedPage(expandedPage === page.id ? null : page.id)}
                  className="w-full flex items-center justify-between p-8 hover:bg-gray-50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-idara-orange/10 rounded-2xl flex items-center justify-center text-idara-orange group-hover:bg-idara-orange group-hover:text-white transition-all">
                      <FileText size={26} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#012060]">{page.name}</h3>
                      <p className="text-sm text-gray-400 font-bold mt-0.5">
                        {page.tabs.length} section{page.tabs.length !== 1 ? 's' : ''} to manage
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={24}
                    className={`text-gray-300 group-hover:text-idara-orange transition-all duration-300 ${
                      expandedPage === page.id ? 'rotate-90 text-idara-orange' : ''
                    }`}
                  />
                </button>

                {/* Expanded Tabs List */}
                {expandedPage === page.id && (
                  <div className="border-t border-gray-100 px-8 pb-6 pt-4">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">
                      Select a section to edit:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {page.tabs.map((tab) => (
                        <Link
                          key={tab.tab}
                          href={`/admin/cms/${page.id}?tab=${tab.tab}`}
                          className="flex items-center gap-4 bg-gray-50 hover:bg-idara-orange/5 border border-transparent hover:border-idara-orange/20 rounded-2xl px-6 py-4 transition-all group/tab no-underline"
                        >
                          <div className="w-8 h-8 bg-idara-navy/10 rounded-xl flex items-center justify-center group-hover/tab:bg-idara-orange group-hover/tab:text-white transition-all text-idara-navy">
                            <Layout size={16} />
                          </div>
                          <span className="font-black text-[#012060] text-sm group-hover/tab:text-idara-orange transition-colors">
                            {tab.label}
                          </span>
                          <ChevronRight size={16} className="ml-auto text-gray-300 group-hover/tab:text-idara-orange transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredPages.length === 0 && (
            <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 mt-10">
              <p className="text-gray-400 text-xl font-bold">No pages found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
