'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquare, 
  PlusCircle, 
  History, 
  ClipboardCheck, 
  Users, 
  UserCheck, 
  Calendar, 
  CheckCircle, 
  UserPlus,
  FileText, // For Pages
  LogOut,
  ChevronDown,
  Briefcase,
  Archive,
  Heart,
  Info,
  BarChart3,
  Building2,
  BookOpen,
  Users2,
  Milestone,
  HandHeart,
  Utensils,
  Activity
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  userRole?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userRole }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'dashboard';

  const [openSubMenus, setOpenSubMenus] = React.useState<Record<string, boolean>>({
    jobs: false,
    cms: false
  });

  const toggleSubMenu = (name: string) => {
    setOpenSubMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/admin', tab: 'dashboard' },
    { title: 'Messages', icon: MessageSquare, path: '/admin/messages' },
    { 
      title: 'Jobs', 
      icon: Briefcase, 
      id: 'jobs',
      subItems: [
        { title: 'Add Job', icon: PlusCircle, path: '/admin', tab: 'addjob' },
        { title: 'Recent Jobs', icon: Briefcase, path: '/admin', tab: 'recentjobs' },
        { title: 'Old Jobs', icon: Archive, path: '/admin', tab: 'oldjobs' },
        { title: 'Role Responses', icon: ClipboardCheck, path: '/admin', tab: 'jobresponse' },
        { title: 'Job Applications', icon: Users, path: '/admin', tab: 'jobapplications' },
      ]
    },
    { title: 'Candidates', icon: Users, path: '/admin', tab: 'candidates' },
    { title: 'Interview', icon: Calendar, path: '/admin', tab: 'interview' },
    { title: 'Hired', icon: UserCheck, path: '/admin', tab: 'hired' },
    { title: 'Volunteers', icon: Heart, path: '/admin', tab: 'volunteers' },
    ...(userRole === 'SUPER_ADMIN' ? [
      { title: 'Activity Log', icon: History, path: '/admin', tab: 'auditlogs' },
      { 
        title: 'CMS', 
        icon: FileText, 
        id: 'cms',
        subItems: [
          { title: 'Home page Who We Are?', icon: Info, path: '/admin/cms/home', tab: 'who-we-are' },
          { title: 'Our Impact in Numbers', icon: BarChart3, path: '/admin/cms/home', tab: 'impact' },
          { title: 'Generous Partners', icon: Building2, path: '/admin/cms/home', tab: 'partners' },
          { title: 'Stories of Impact', icon: BookOpen, path: '/admin/cms/home', tab: 'stories' },
          { title: 'About us Our Organization', icon: Users2, path: '/admin/cms/about', tab: 'organization' },
          { title: 'Our Journey', icon: Milestone, path: '/admin/cms/about', tab: 'journey' },
          { title: 'MC Our Kind Supporters', icon: Heart, path: '/admin/cms/medical-center', tab: 'supporters' },
          { title: 'MC Our Services', icon: Activity, path: '/admin/cms/medical-center', tab: 'mc-services' },
          { title: 'ANCH Charity Program', icon: HandHeart, path: '/admin/cms/anch', tab: 'charity' },
          { title: 'Food Distribution Centers', icon: Utensils, path: '/admin/cms/food', tab: 'distribution' },
        ]
      }
    ] : [])
  ];

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout?")) return;
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        window.location.href = "/admin/login";
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#012060]/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-50
        w-80 xl:w-[350px] h-screen
        bg-white/90 backdrop-blur-2xl border-r border-gray-100 
        flex flex-col shadow-[20px_0_40px_-20px_rgba(0,0,0,0.03)]
        transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-black text-[#012060] tracking-tight">Admin</h1>
            <p className="text-sm md:text-base font-black text-idara-orange uppercase tracking-[.3em] opacity-80">Workspace v2.0</p>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-1.5 overflow-y-auto pb-10 custom-scrollbar">
          {menuItems.map((item) => {
            if (item.subItems) {
              const isSubMenuOpen = openSubMenus[item.id!];
              const isAnySubActive = item.subItems.some(sub => 
                pathname === sub.path && (!sub.tab || currentTab === sub.tab)
              );
              
              return (
                <div key={item.id} className="flex flex-col gap-1">
                  <button
                    onClick={() => toggleSubMenu(item.id!)}
                    className={`w-full text-left px-5 py-4 rounded-2xl flex flex-row items-center gap-4 transition-all duration-300 relative group overflow-hidden whitespace-nowrap ${
                      isAnySubActive 
                        ? "bg-gray-50 text-[#012060] font-black" 
                        : "text-gray-400 hover:bg-gray-50 hover:text-[#012060]"
                    }`}
                  >
                    <item.icon size={20} className="transition-transform duration-500 group-hover:rotate-12" />
                    <span className="font-black text-base md:text-lg tracking-tight flex-1">{item.title}</span>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${isSubMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${isSubMenuOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-10 flex flex-col gap-1 py-2">
                      {item.subItems.map((sub: any) => {
                        const isSubActive = pathname === sub.path && currentTab === sub.tab;
                        const href = sub.tab ? `${sub.path || ''}?tab=${sub.tab}` : (sub.path || '#');
                        return (
                          <Link
                            key={sub.tab || sub.path}
                            href={href}
                            onClick={onClose}
                            className={`w-full text-left px-4 py-3 rounded-xl flex flex-row items-center gap-3 transition-all duration-300 relative group whitespace-nowrap ${
                              isSubActive 
                                ? "text-idara-orange font-bold" 
                                : "text-gray-400 hover:text-[#012060]"
                            }`}
                          >
                            <sub.icon size={16} />
                            <span className="text-sm md:text-base font-bold tracking-tight">{sub.title}</span>
                            {isSubActive && <div className="absolute right-0 top-1 bottom-1 w-1 bg-idara-orange rounded-full"></div>}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            const isActive = item.tab 
              ? (pathname === item.path && currentTab === item.tab)
              : (pathname === item.path || (item.path === '/admin/cms' && pathname.startsWith('/admin/cms')));
              
            const href = item.tab && item.path === '/admin' ? (item.tab === 'dashboard' ? '/admin' : `/admin?tab=${item.tab}`) : (item.path || '#');
            return (
              <Link
                key={item.tab || item.path}
                href={href}
                onClick={onClose}
                className={`w-full text-left px-5 py-4 rounded-2xl flex flex-row items-center gap-4 transition-all duration-300 relative group overflow-hidden whitespace-nowrap ${
                  isActive 
                    ? "bg-[#012060] text-white shadow-[0_10px_20px_-5px_rgba(3,18,73,0.3)] translate-x-2" 
                    : "text-gray-400 hover:bg-gray-50 hover:text-[#012060]"
                }`}
              >
                <item.icon size={20} className={`transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:rotate-12'}`} />
                <span className="font-black text-base md:text-lg tracking-tight">{item.title}</span>
                {isActive && <div className="absolute right-0 top-0 bottom-0 w-1 bg-idara-orange"></div>}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-50 bg-white/50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition-all font-black text-base md:text-lg tracking-tight group"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all">
              <LogOut size={18} />
            </div>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
