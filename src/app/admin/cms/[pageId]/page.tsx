'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { 
    Save, ArrowLeft, Loader2, Plus, Trash2, Edit2, 
    Image as ImageIcon, Type, LayoutDashboard, 
    Info, BarChart3, Building2, BookOpen, Users2, 
    Milestone, Heart, HandHeart, Utensils, X, Check,
    Link as LinkIcon, Upload, Activity, Pill, Truck, Menu
} from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';

// Type definitions for our dynamic items
interface CMSItem {
    id: string;
    title: string;
    description?: string;
    icon?: string;
    image?: string;
    link?: string;
    value?: string;
    label?: string;
    meta?: string;
}

export default function PageEditor() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="animate-spin text-[#012060]" size={48} />
            </div>
        }>
            <PageEditorContent />
        </Suspense>
    );
}

function PageEditorContent() {
    const { pageId } = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'general';

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const triggerSuccess = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };
    const [items, setItems] = useState<CMSItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CMSItem | null>(null);
    const [newItem, setNewItem] = useState<Partial<CMSItem>>({});

    useEffect(() => {
        fetchSectionData();
    }, [pageId, activeTab]);

    const fetchSectionData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/content?pageName=${pageId}`);
            const data = await res.json();
            
            // Handle General Text Content
            const fData: Record<string, string> = {};
            data.forEach((row: any) => {
                fData[row.key] = row.value;
            });

            // Set defaults if empty for Who We Are
            if (pageId === 'home') {
                if (!fData['description']) {
                    fData['description'] = `Idara Al-Khair Welfare Society is a trusted non-profit organization working across Pakistan to uplift underprivileged communities. Since 1987, our work has focused on long-term solutions rather than temporary relief. Ensuring dignity, opportunity, and self-reliance for individuals and families.`;
                }
                if (!fData['quote']) {
                    fData['quote'] = `"We believe charity should not only relieve pain, but also restore hope."`;
                }
            }
            setFormData(fData);

            // Handle Item List (Cards)
            let itemKey = `${activeTab}-items`;
            if (activeTab === 'who-we-are') itemKey = 'who-we-are-stats';
            if (activeTab === 'impact') itemKey = 'impact-stats';
            if (activeTab === 'stories') itemKey = 'testimonial-items';
            if (activeTab === 'real-stories') itemKey = 'stories-items';
            if (activeTab === 'what-we-do') itemKey = 'what-we-do-items';
            
            const contentRow = data.find((row: any) => row.key === itemKey);
            
            if (contentRow && contentRow.value) {
                try {
                    setItems(JSON.parse(contentRow.value));
                } catch (e) {
                    setItems([]);
                }
            } else {
                // Provide defaults for specific tabs
                if (activeTab === 'who-we-are') {
                    const currentYear = new Date().getFullYear();
                    const yearsOfServiceDefault = currentYear - 1987;
                    setItems([
                        { id: '1', title: `${yearsOfServiceDefault} +`, description: 'Years', meta: 'of continuous service' },
                        { id: '2', title: '850 K', description: 'Lives', meta: 'supported' },
                        { id: '3', title: '6000', description: 'Students', meta: 'currently benefiting' }
                    ]);
                } else if (activeTab === 'impact') {
                    setItems([
                        { id: '1', title: '85750', description: 'People Served', meta: 'Since 1987', icon: 'Users' },
                        { id: '2', title: '2960', description: 'Innovation Projects', icon: 'Lightbulb' },
                        { id: '3', title: '1506', description: 'Communities Served', icon: 'Globe' },
                        { id: '4', title: '50', description: 'Health Centers Supported', icon: 'HeartPulse' }
                    ]);
                } else if (activeTab === 'partners') {
                    setItems([
                        { id: '1', title: 'Japan Foundation', description: 'Supporting 500+ students annually', meta: 'Education Sponsor', icon: '/website-media/homepage/japan.png' },
                        { id: '2', title: 'Carrier Pakistan', description: 'Providing infrastructure and cooling solutions', meta: 'Technology Partner', icon: '/website-media/homepage/Carrier-Pakistan.png' },
                        { id: '3', title: 'Cherity Giver', description: 'Funding medical equipment and facilities', meta: 'Healthcare Partner', icon: '/website-media/homepage/Cherity-Giver.png' },
                        { id: '4', title: 'Hansalim Foundation', description: 'Collaborative food distribution initiatives', meta: 'Food Program Supporter', icon: '/website-media/homepage/chines.png' },
                        { id: '5', title: 'Coop Foundation', description: 'Community development programs', meta: 'Development Partner', icon: '/website-media/homepage/coop.png' },
                        { id: '6', title: 'Empower Foundation', description: 'Vocational training and empowerment', meta: 'Skills Developer', icon: '/website-media/homepage/Empower.png' },
                        { id: '7', title: 'Gift Usa Foundation', description: 'Joint welfare and relief activities', meta: 'Humanitarian Partner', icon: '/website-media/homepage/Gift-Usa.png' },
                        { id: '8', title: 'JFSA Foundation', description: 'Shared educational initiatives', meta: 'Education Collaborator', icon: '/website-media/homepage/JFSA.png' },
                        { id: '9', title: 'Meezan Bank', description: 'Healthcare service collaboration', meta: 'Medical Partner', icon: '/website-media/homepage/Meezan-bank.png' },
                        { id: '10', title: 'One Ummah', description: 'Humanitarian and medical support', meta: 'Relief Partner', icon: '/website-media/homepage/one-ummah.png' },
                        { id: '11', title: 'Pearls Foundation', description: 'Healthcare service collaboration', meta: 'Medical Partner', icon: '/website-media/homepage/Pearls.png' },
                        { id: '12', title: 'Samsung HVAC', description: 'Supplying technical and cooling equipment', meta: 'Technical Sponsor', icon: '/website-media/homepage/Smsung-HVAC.jpg' },
                        { id: '13', title: 'SNHS Foundation', description: 'Regional development and welfare', meta: 'Community Partner', icon: '/website-media/homepage/SNHS.png' },
                        { id: '14', title: 'The Care', description: 'Supporting various humanitarian causes', meta: 'Welfare Partner', icon: '/website-media/homepage/the care.png' },
                        { id: '15', title: 'Thaakat Foundation', description: 'Fostering sustainable community growth', meta: 'Empowerment Partner', icon: '/website-media/homepage/Thaakat Foundation.png' }
                    ]);
                } else if (activeTab === 'real-stories') {
                    setItems([
                        { id: '1', title: '"Because of Idara Al-Khair, my children are studying and dreaming again."', description: 'Parent of a sponsored student.' },
                        { id: '2', title: '"Your support reached us when we had nothing left."', description: 'Disaster Relief Beneficiary' }
                    ]);
                } else if (activeTab === 'what-we-do') {
                    setItems([
                        { id: '1', title: 'Food Support', description: 'Daily meals for our students and emergency food distributions to family in deep hungry.', icon: 'ShoppingBasket', link: '/projects/food-support-program' },
                        { id: '2', title: 'Healthcare', description: 'Affordable medical services for communities with limited access to healthcare.', icon: 'HeartPulse', link: '/projects/medical-center' },
                        { id: '3', title: 'Social Welfare & Relief', description: 'Rapid response during disasters and continuous support for vulnerable families.', icon: 'HardHat', link: '/projects/disaster-relief-program' }
                    ]);
                } else if (activeTab === 'stories') {
                    setItems([
                        { id: '1', title: 'Ahmed Hassan', description: "Idara Al-Khair gave me the opportunity to pursue higher education when my family couldn't afford it. Today, I'm a successful engineer giving back to my community.", meta: 'College Graduate', icon: '/website-media/homepage/testimonal2.jpg' },
                        { id: '2', title: 'Fatima Khan', description: "My 2 children are studying in Idara Al-Khair schools. The quality of education and care they receive is exceptional. I'm grateful for this organization.", meta: 'Parent', icon: '/website-media/homepage/testimonal1.jpg' },
                        { id: '3', title: 'Dr. Muhammad Ali', description: "I've witnessed the transformation Idara Al-Khair has brought to our community. Their healthcare centers and educational programs have improved countless lives.", meta: 'Community Leader', icon: '/website-media/homepage/testimonal3.jpg' }
                    ]);
                } else if (activeTab === 'organization') {
                    setItems([
                        { id: '1', title: '35+', description: 'Years of providing quality education to the underprivileged.', icon: 'GraduationCap' },
                        { id: '2', title: '850K+', description: 'Individuals supported through various welfare programs.', icon: 'Users' },
                        { id: '3', title: '12+', description: 'Schools and community centers across Pakistan.', icon: 'Building2' },
                        { id: '4', title: '92%', description: 'Of our students successfully transition to higher education.', icon: 'TrendingUp' }
                    ]);
                } else if (activeTab === 'journey') {
                    setItems([
                        { id: '1', title: 'Founded in 1987', description: 'The journey began with the establishment of the first primary school for underprivileged children.' },
                        { id: '2', title: 'Growth in 1992', description: 'Expansion into more communities with the opening of a second campus to meet growing demand.' },
                        { id: '3', title: 'Healthcare in 1995', description: 'Launched initial medical camps and basic healthcare initiatives for student families.' },
                        { id: '4', title: 'College Level in 2005', description: 'Al-Khair College was established, providing higher secondary education to students.' }
                    ]);
                } else if (activeTab === 'supporters') {
                    setItems([
                        { id: '1', title: 'Ayesha Omar, Artist', description: '"My heart is so happy, Saad. What a campus and what a technical department, and the food bank, everything is so clean, neat, and organized..."' },
                        { id: '2', title: 'Naila Naqvi, CEO Pie In The Sky', description: '"I was so happy to attend the Fun Mela 2023. The children put on a fantastic tableau. Thank you for inviting us."' },
                        { id: '3', title: 'Sitara Chawla, Senior Brand Executive', description: '"This has been such an amazing event! You can see how hard the kids and faculty have worked to make this event possible!"' }
                    ]);
                } else if (activeTab === 'mc-services') {
                    setItems([
                        { id: '1', title: 'General & Emergency Care', description: 'Handling regular and emergency medical cases for students, parents, and the community.', icon: 'Activity', image: '/website-media/medicalcenter/Idara%20Al-Khair%20Welfare%20Society%20-%20Empowering%20Communities%20Since%201987_files/Emergency-Care.jpg', meta: '24/7 Service' },
                        { id: '2', title: 'Dispensary & Pharmacy', description: 'Well-equipped dispensary and pharmacy for immediate medical needs.', icon: 'Pill', image: '/website-media/medicalcenter/Idara%20Al-Khair%20Welfare%20Society%20-%20Empowering%20Communities%20Since%201987_files/Pharmacy-Services.jpg', meta: 'On-site' },
                        { id: '3', title: 'Ambulance Service', description: 'Ambulance available for urgent transport to high-tech hospitals when needed.', icon: 'Truck', image: '/website-media/medicalcenter/Idara%20Al-Khair%20Welfare%20Society%20-%20Empowering%20Communities%20Since%201987_files/ambulance.jpg', meta: 'Quick Response' },
                        { id: '4', title: 'Qualified Staff', description: 'Experienced doctors, nurses, and support staff for compassionate care.', icon: 'Users', image: '/website-media/medicalcenter/Idara%20Al-Khair%20Welfare%20Society%20-%20Empowering%20Communities%20Since%201987_files/health-care.jpg', meta: 'Expert Team' },
                        { id: '5', title: 'Support for the Needy', description: 'Medical support for poor and deprived families, funded by donors and philanthropists.', icon: 'Heart', image: '/website-media/medicalcenter/Idara%20Al-Khair%20Welfare%20Society%20-%20Empowering%20Communities%20Since%201987_files/medical-aid.jpg', meta: 'Charity Care' },
                        { id: '6', title: 'Support for Poors', description: 'Medical support for poor and deprived families, funded by donors and philanthropists.', icon: 'Heart', image: '/website-media/medicalcenter/Idara%20Al-Khair%20Welfare%20Society%20-%20Empowering%20Communities%20Since%201987_files/non-profit.webp', meta: 'Charity Care' }
                    ]);
                } else if (activeTab === 'charity') {
                    setItems([
                        { id: '1', title: 'Emergency Response', description: 'Immediate response to natural disasters with rescue operations, first aid, and emergency shelter setup.', icon: 'AlertTriangle' },
                        { id: '2', title: 'Food & Water Distribution', description: 'Essential food supplies and clean drinking water distribution to affected communities during emergencies.', icon: 'Utensils' },
                        { id: '3', title: 'Temporary Shelter', description: 'Providing temporary housing solutions and shelter materials for displaced families and communities.', icon: 'Tent' },
                        { id: '4', title: 'Medical Aid', description: 'Emergency medical care, mobile health units, and medical supplies for disaster-affected populations.', icon: 'Heart' },
                        { id: '5', title: 'Relief Supplies', description: 'Distribution of essential items including clothing, hygiene kits, and household necessities.', icon: 'Package' },
                        { id: '6', title: 'Rehabilitation Support', description: 'Long-term support for community rebuilding, livelihood restoration, and infrastructure repair.', icon: 'Home' }
                    ]);
                } else if (activeTab === 'distribution') {
                    setItems([
                        { id: '1', title: 'Main Campus Center', description: 'Sector 5-J New Karachi Town. Services: Daily Lunch, Monthly Ration, Emergency Support.' },
                        { id: '2', title: 'Central Food Kitchen', description: 'Block-5, Sector 5-M, North Karachi. Services: Special Programs, Ramadan Distribution.' }
                    ]);
                } else {
                    setItems([]);
                }
            }
        } catch (err) {
            console.error('Error fetching section data:', err);
        } finally {
            setLoading(false);
        }
    };

    const [formData, setFormData] = useState<Record<string, string>>({});

    const handleUpdateField = async (key: string, value: string) => {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pageName: String(pageId),
                    key,
                    value,
                    type: 'TEXT'
                }),
            });
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            setFormData(prev => ({ ...prev, [key]: value }));
            triggerSuccess();
        } catch (err) {
            console.error('Failed to update field:', err);
        } finally {
            setSaving(false);
        }
    };

    const saveItems = async (updatedItems: CMSItem[]) => {
        setSaving(true);
        let itemKey = `${activeTab}-items`;
        if (activeTab === 'who-we-are') itemKey = 'who-we-are-stats';
        if (activeTab === 'impact') itemKey = 'impact-stats';
        if (activeTab === 'stories') itemKey = 'testimonial-items';
        if (activeTab === 'real-stories') itemKey = 'stories-items';
        if (activeTab === 'what-we-do') itemKey = 'what-we-do-items';

        try {
            const res = await fetch('/api/admin/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pageName: String(pageId),
                    key: itemKey,
                    value: JSON.stringify(updatedItems),
                    type: 'JSON'
                }),
            });
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            setItems(updatedItems);
        } catch (err) {
            console.error('Failed to save items:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleAddItem = async () => {
        try {
            const updatedItems = [...items, { ...newItem, id: Date.now().toString() } as CMSItem];
            await saveItems(updatedItems);
            setIsModalOpen(false);
            setNewItem({});
            triggerSuccess();
        } catch (err) {
            console.error('Failed to add item:', err);
        }
    };

    const handleUpdateItem = async () => {
        if (!editingItem) return;
        try {
            const updated = items.map(item => item.id === editingItem.id ? editingItem : item);
            await saveItems(updated);
            setEditingItem(null);
            setIsModalOpen(false);
            triggerSuccess();
        } catch (err) {
            console.error('Failed to update item:', err);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSaving(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                if (editingItem) setEditingItem({ ...editingItem, icon: data.url });
                else setNewItem({ ...newItem, icon: data.url });
                triggerSuccess();
            }
        } catch (err) {
            console.error('Upload failed:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteItem = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            const updatedItems = items.filter(item => item.id !== id);
            await saveItems(updatedItems);
            triggerSuccess();
        } catch (err) {
            console.error('Failed to delete item:', err);
        }
    };

    const getSectionIcon = () => {
        switch(activeTab) {
            case 'who-we-are': return Info;
            case 'impact': return BarChart3;
            case 'partners': return Building2;
            case 'stories': return BookOpen;
            case 'organization': return Users2;
            case 'journey': return Milestone;
            case 'supporters': return Heart;
            case 'charity': return HandHeart;
            case 'distribution': return Utensils;
            default: return LayoutDashboard;
        }
    };

    const SectionIcon = getSectionIcon();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="w-12 h-12 animate-spin text-idara-orange" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            <Sidebar />
            <main className="flex-1 lg:ml-80 xl:ml-[350px] transition-all duration-300">
                <div className="p-8 lg:p-12 max-w-7xl mx-auto">

                    {/* Tab Navigation Bar */}
                    {pageId === 'home' && (
                        <div className="flex flex-wrap gap-2 mb-10 bg-white rounded-3xl p-3 shadow-sm border border-gray-100">
                            {[
                                { tab: 'who-we-are', label: 'Who We Are' },
                                { tab: 'impact', label: 'Impact Stats' },
                                { tab: 'what-we-do', label: 'What We Do' },
                                { tab: 'partners', label: 'Partners' },
                                { tab: 'stories', label: 'Testimonials' },
                                { tab: 'real-stories', label: 'Real Stories' },
                            ].map(({ tab, label }) => (
                                <a
                                    key={tab}
                                    href={`/admin/cms/${pageId}?tab=${tab}`}
                                    className={`px-5 py-2.5 rounded-2xl font-black text-sm transition-all no-underline ${
                                        activeTab === tab
                                            ? 'bg-idara-orange text-white shadow-lg shadow-idara-orange/20'
                                            : 'text-gray-400 hover:text-idara-navy hover:bg-gray-50'
                                    }`}
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    )}
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-gray-400 mb-2">
                                <span className="hover:text-idara-orange transition-colors flex items-center gap-1 cursor-pointer" onClick={() => router.push('/admin')}>
                                    <LayoutDashboard size={14} /> Admin
                                </span>
                                <span>/</span>
                                <span className="text-gray-900 font-bold capitalize">{pageId?.toString().replace(/-/g, ' ')}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-[#012060] tracking-tight">
                                {activeTab.replace(/-/g, ' ').toUpperCase()}
                            </h1>
                        </div>

                        <button 
                            onClick={() => {
                                setNewItem({});
                                setEditingItem(null);
                                setIsModalOpen(true);
                            }}
                            className="px-8 py-4 bg-idara-orange text-white rounded-2xl font-black hover:bg-[#d94d1e] transition-all shadow-lg shadow-idara-orange/20 active:scale-95 flex items-center gap-2"
                        >
                            <Plus size={20} /> Add New Item
                        </button>
                    </div>

                    {/* WHO WE ARE SPECIALIZED EDITOR */}
                    {activeTab === 'who-we-are' && (
                        <div className="space-y-8 mb-12">
                            <section className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-gray-200/50 border border-gray-100">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-idara-orange/10 rounded-2xl text-idara-orange">
                                        <Type size={24} />
                                    </div>
                                    <h2 className="text-2xl font-black text-[#012060] tracking-tight">General Content</h2>
                                </div>
                                
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Description Text</label>
                                        <textarea 
                                            rows={4}
                                            className="w-full bg-gray-50 border-2 border-transparent rounded-3xl px-8 py-6 focus:border-idara-orange focus:bg-white outline-none transition-all font-bold text-[#012060] text-lg leading-relaxed shadow-inner"
                                            value={formData['description'] || ''}
                                            onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                                            onBlur={(e) => handleUpdateField('description', e.target.value)}
                                            placeholder="Enter section description..."
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Section Quote</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-8 py-6 focus:border-idara-orange focus:bg-white outline-none transition-all font-bold text-idara-orange italic text-lg shadow-inner"
                                            value={formData['quote'] || ''}
                                            onChange={(e) => setFormData(prev => ({...prev, quote: e.target.value}))}
                                            onBlur={(e) => handleUpdateField('quote', e.target.value)}
                                            placeholder="Enter inspirational quote..."
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="flex items-center gap-3 mt-12 mb-6">
                                <div className="p-3 bg-idara-cyan/10 rounded-2xl text-idara-cyan">
                                    <BarChart3 size={24} />
                                </div>
                                <h2 className="text-2xl font-black text-[#012060] tracking-tight">Section Items (Cards)</h2>
                            </div>
                        </div>
                    )}

                    {/* Content Grid */}
                    {items.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                            <SectionIcon size={64} className="mx-auto text-gray-200 mb-6" />
                            <h2 className="text-2xl font-black text-gray-400">No cards found for this section</h2>
                            <p className="text-gray-400 font-bold mt-2">Click "Add New Item" to create your first card.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.map((item) => (
                                    <div key={item.id} className="group bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-transparent hover:border-idara-orange transition-all relative overflow-hidden flex flex-col h-full">
                                        {/* Image/Icon Header */}
                                        <div className="relative h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                                            {item.image || (item.icon && (item.icon.startsWith('/') || item.icon.includes('.'))) ? (
                                                <img src={item.image || item.icon} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            ) : (
                                                <div className="p-6 bg-white rounded-3xl shadow-xl text-idara-orange group-hover:scale-110 transition-transform duration-500">
                                                    <SectionIcon size={40} />
                                                </div>
                                            )}
                                            
                                            {/* Action Buttons (Overlay on Top Right) */}
                                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all -translate-y-2.5 group-hover:translate-y-0">
                                                <button 
                                                    onClick={() => {
                                                        setEditingItem(item);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteItem(item.id)}
                                                    className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-8 flex flex-col grow">
                                        <h3 className="text-2xl font-black text-[#012060] mb-2 group-hover:text-idara-orange transition-colors">{item.title}</h3>
                                        {item.meta && (
                                            <div className="text-xs font-black text-idara-orange uppercase tracking-widest mb-4">
                                                {item.meta}
                                            </div>
                                        )}
                                            <div className="text-gray-500 font-bold leading-relaxed grow">
                                                {item.description}
                                            </div>
                                            {item.link && (
                                                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center text-xs font-black text-gray-400 uppercase tracking-widest gap-2">
                                                    <LinkIcon size={14} /> Link Attached
                                                </div>
                                            )}
                                        </div>
                                    </div>
                            ))}
                        </div>
                    )}

                    {/* Item Modal (Add/Edit) */}
                    {isModalOpen && (
                        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                            <div className="absolute inset-0 bg-[#012060]/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                            <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
                                <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                                    <h2 className="text-3xl font-black text-[#012060]">
                                        {editingItem ? 'Edit Item' : 'Add New Item'}
                                    </h2>
                                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-idara-orange transition-all">
                                        <X size={32} />
                                    </button>
                                </div>
                                
                                <div className="p-10 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Title</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-idara-orange focus:bg-white outline-none transition-all font-bold text-[#012060]"
                                            value={editingItem ? (editingItem.title || '') : (newItem.title || '')}
                                            onChange={(e) => editingItem ? setEditingItem({...editingItem, title: e.target.value}) : setNewItem({...newItem, title: e.target.value})}
                                            placeholder="Item Title"
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Description</label>
                                        <textarea 
                                            rows={3}
                                            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-idara-orange focus:bg-white outline-none transition-all font-bold text-[#012060]"
                                            value={editingItem ? (editingItem.description || '') : (newItem.description || '')}
                                            onChange={(e) => editingItem ? setEditingItem({...editingItem, description: e.target.value}) : setNewItem({...newItem, description: e.target.value})}
                                            placeholder="Item Description"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">
                                            {['partners', 'stories', 'charity', 'distribution'].includes(activeTab) ? 'Image Path' : 'Icon'}
                                            </label>
                                            {['partners', 'stories', 'charity', 'distribution'].includes(activeTab) ? (
                                                <div className="relative flex items-center">
                                                    <input 
                                                        type="text" 
                                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl pl-6 pr-16 py-4 focus:border-idara-orange focus:bg-white outline-none transition-all font-bold text-[#012060]"
                                                        value={editingItem ? (editingItem.icon || '') : (newItem.icon || '')}
                                                        onChange={(e) => editingItem ? setEditingItem({...editingItem, icon: e.target.value}) : setNewItem({...newItem, icon: e.target.value})}
                                                        placeholder="/website-media/..."
                                                    />
                                                    <label className="absolute right-2 p-3 bg-idara-navy text-white rounded-xl hover:bg-idara-orange transition-all flex items-center justify-center cursor-pointer shadow-lg active:scale-95 group">
                                                        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                                                        <Upload size={18} className="group-hover:scale-110 transition-transform" />
                                                    </label>
                                                </div>
                                            ) : activeTab === 'mc-services' ? (
                                                <div className="space-y-4">
                                                    <select 
                                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-idara-orange focus:bg-white outline-none transition-all font-bold text-[#012060] appearance-none cursor-pointer"
                                                        value={editingItem ? (editingItem.icon || '') : (newItem.icon || '')}
                                                        onChange={(e) => editingItem ? setEditingItem({...editingItem, icon: e.target.value}) : setNewItem({...newItem, icon: e.target.value})}
                                                    >
                                                        <option value="">No Icon</option>
                                                        <option value="Activity">Activity (Pulse)</option>
                                                        <option value="Pill">Pharmacy (Pill)</option>
                                                        <option value="Truck">Ambulance (Truck)</option>
                                                        <option value="Users">Users (Staff)</option>
                                                        <option value="Heart">Care (Heart)</option>
                                                    </select>
                                                    
                                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2 block">Background Image</label>
                                                    <div className="relative flex items-center">
                                                        <input 
                                                            type="text" 
                                                            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl pl-6 pr-16 py-4 focus:border-idara-orange focus:bg-white outline-none transition-all font-bold text-[#012060]"
                                                            value={editingItem ? (editingItem.image || '') : (newItem.image || '')}
                                                            onChange={(e) => editingItem ? setEditingItem({...editingItem, image: e.target.value}) : setNewItem({...newItem, image: e.target.value})}
                                                            placeholder="/website-media/..."
                                                        />
                                                        <label className="absolute right-2 p-3 bg-idara-navy text-white rounded-xl hover:bg-idara-orange transition-all flex items-center justify-center cursor-pointer shadow-lg active:scale-95 group">
                                                            <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                                                            <Upload size={18} className="group-hover:scale-110 transition-transform" />
                                                        </label>
                                                    </div>
                                                </div>
                                            ) : (
                                                <select 
                                                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-idara-orange focus:bg-white outline-none transition-all font-bold text-[#012060] appearance-none cursor-pointer"
                                                    value={editingItem ? (editingItem.icon || '') : (newItem.icon || '')}
                                                    onChange={(e) => editingItem ? setEditingItem({...editingItem, icon: e.target.value}) : setNewItem({...newItem, icon: e.target.value})}
                                                >
                                                    <option value="">No Icon</option>
                                                    <option value="Users">Users (People)</option>
                                                    <option value="GraduationCap">Education (Cap)</option>
                                                    <option value="Building2">Infrastructure (Building)</option>
                                                    <option value="TrendingUp">Success (Trend)</option>
                                                    <option value="Award">Achievement (Award)</option>
                                                    <option value="Clock">History (Clock)</option>
                                                    <option value="Heart">Care (Heart)</option>
                                                    <option value="BookOpen">Study (Book)</option>
                                                    <option value="HeartPulse">Medical Heart</option>
                                                    <option value="Lightbulb">Innovation</option>
                                                    <option value="Globe">Global/Community</option>
                                                    <option value="HandHeart">Charity</option>
                                                    <option value="Utensils">Food</option>
                                                    <option value="Milestone">Journey</option>
                                                    <option value="Activity">Activity (Pulse)</option>
                                                    <option value="Pill">Pharmacy (Pill)</option>
                                                    <option value="Truck">Ambulance (Truck)</option>
                                                </select>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Extra Info (Meta)</label>
                                            <input 
                                                type="text" 
                                                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-idara-orange focus:bg-white outline-none transition-all font-bold text-[#012060]"
                                                value={editingItem ? (editingItem.meta || '') : (newItem.meta || '')}
                                                onChange={(e) => editingItem ? setEditingItem({...editingItem, meta: e.target.value}) : setNewItem({...newItem, meta: e.target.value})}
                                                placeholder="e.g. Since 1987"
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        onClick={editingItem ? handleUpdateItem : handleAddItem}
                                        disabled={saving}
                                        className="w-full bg-[#012060] text-white py-5 rounded-3xl font-black text-xl hover:bg-idara-orange transition-all shadow-2xl shadow-blue-900/20 active:scale-[0.98] mt-4 flex items-center justify-center gap-3"
                                    >
                                        {saving ? <Loader2 className="animate-spin" /> : <Check />}
                                        {editingItem ? 'Update Item' : 'Create Item'}
                                    </button>

                                </div>
                            </div>
                        </div>
                    )}

                    {/* Global Status Indicators */}
                    <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-50">
                        {saving && (
                            <div className="bg-[#012060] text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3 animate-pulse">
                                <Loader2 size={20} className="animate-spin" />
                                <span className="font-bold uppercase tracking-widest text-sm">Saving Changes...</span>
                            </div>
                        )}
                        {showSuccess && (
                            <div className="bg-emerald-500 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-full duration-500">
                                <div className="p-1 bg-white/20 rounded-full text-white">
                                    <Check size={18} />
                                </div>
                                <span className="font-bold text-sm">Changes updated successfully!</span>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
