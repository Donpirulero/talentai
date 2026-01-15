import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { User, CreditCard, Palette, Shield, Bot, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { dbService } from '../services/db';

interface TabItem {
    id: string;
    label: string;
    icon: React.ElementType;
}

const Settings: React.FC = () => {
    const { t, language, setLanguage } = useLanguage();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    const [aiSettings, setAiSettings] = useState(() => {
        const saved = localStorage.getItem('talentai_scout_settings');
        return saved ? JSON.parse(saved) : {
            name: 'Magui',
            profile: 'corporate',
            focus: ''
        };
    });

    useEffect(() => {
        if (user) {
            const loadSettings = async () => {
                try {
                    const settings = await dbService.getUserSettings(user.id);
                    if (settings) {
                        if (settings.ai_agent_name) {
                            setAiSettings(prev => ({
                                ...prev,
                                name: settings.ai_agent_name,
                                profile: settings.ai_agent_profile || prev.profile,
                                focus: settings.ai_agent_focus || prev.focus
                            }));
                            localStorage.setItem('talentai_scout_settings', JSON.stringify({
                                ...aiSettings,
                                name: settings.ai_agent_name,
                                profile: settings.ai_agent_profile || aiSettings.profile,
                                focus: settings.ai_agent_focus || aiSettings.focus
                            }));
                        }
                        if (settings.language) {
                            setLanguage(settings.language as 'es' | 'en');
                        }
                        if (settings.theme) {
                            setTheme(settings.theme as 'dark' | 'light');
                        }
                    }
                } catch (error) {
                    console.error("Error loading settings from DB:", error);
                }
            };
            loadSettings();
        }
    }, [user]);

    const [profileData, setProfileData] = useState({
        name: '',
        email: user?.email || '',
        phone: '',
        company: '',
        position: '',
    });

    const [billingData, setBillingData] = useState({
        paymentMethod: '',
        billingAddress: '',
    });

    const tabs: TabItem[] = [
        { id: 'profile', label: t('settings.tabs.profile') || 'Profile & Contact', icon: User },
        { id: 'billing', label: t('settings.tabs.billing') || 'Billing', icon: CreditCard },
        { id: 'interface', label: t('settings.tabs.interface') || 'Interface', icon: Palette },
        { id: 'ai-agent', label: t('settings.aiAgent.tab') || 'AI Agent', icon: Bot },
        { id: 'roles', label: t('settings.tabs.roles') || 'Roles & Permissions', icon: Shield },
    ];

    const handleSaveAiSettings = async () => {
        localStorage.setItem('talentai_scout_settings', JSON.stringify(aiSettings));

        if (user) {
            try {
                await dbService.updateUserSettings(user.id, {
                    ai_agent_name: aiSettings.name,
                    ai_agent_profile: aiSettings.profile,
                    ai_agent_focus: aiSettings.focus
                });
            } catch (error) {
                console.error("Error saving AI settings to DB:", error);
            }
        }

        alert(language === 'es' ? 'Configuración de IA guardada' : 'AI settings saved');
    };

    const handleSaveProfile = () => {
        console.log('Saving profile:', profileData);
        alert(language === 'es' ? 'Perfil guardado exitosamente' : 'Profile saved successfully');
    };

    const handleSaveBilling = () => {
        console.log('Saving billing:', billingData);
        alert(language === 'es' ? 'Información de facturación guardada' : 'Billing information saved');
    };

    const handleLanguageChange = async (newLang: 'es' | 'en') => {
        setLanguage(newLang);
        if (user) {
            try {
                await dbService.updateUserSettings(user.id, {
                    language: newLang
                });
            } catch (error) {
                console.error("Error saving language to DB:", error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-background-dark p-6 animate-fade-in">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="glass-panel rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="size-16 rounded-2xl bg-primary/20 border-2 border-primary/30 flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                            <Palette size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight">
                                {t('settings.title') || 'Settings'}
                            </h1>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">
                                Platform Configuration & Preferences
                            </p>
                        </div>
                    </div>

                    <div className="flex bg-surface-dark p-1.5 rounded-2xl border border-glass-border shadow-inner">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300
                                        ${isActive
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'text-slate-500 hover:text-white hover:bg-white/5'}
                                    `}
                                >
                                    <Icon size={16} />
                                    <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {/* Active Content Section */}
                    <div className="glass-panel rounded-3xl p-8 min-h-[500px]">

                        {activeTab === 'profile' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <User className="text-primary" size={24} />
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">
                                        {t('settings.tabs.profile') || 'Profile & Contact'}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        { label: t('settings.profile.name') || 'Name', value: profileData.name, key: 'name', type: 'text', placeholder: 'John Doe' },
                                        { label: t('settings.profile.email') || 'Email', value: profileData.email, key: 'email', type: 'email', placeholder: 'john@example.com' },
                                        { label: t('settings.profile.phone') || 'Phone', value: profileData.phone, key: 'phone', type: 'tel', placeholder: '+1 (555) 000-0000' },
                                        { label: t('settings.profile.company') || 'Company', value: profileData.company, key: 'company', type: 'text', placeholder: 'Acme Corp' }
                                    ].map((field) => (
                                        <div key={field.key} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                value={field.value}
                                                onChange={(e) => setProfileData({ ...profileData, [field.key]: e.target.value })}
                                                className="w-full px-5 py-3 bg-surface-dark/50 border border-glass-border rounded-xl text-white font-bold placeholder:text-slate-700 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                                placeholder={field.placeholder}
                                            />
                                        </div>
                                    ))}

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                            {t('settings.profile.position') || 'Position'}
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.position}
                                            onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                                            className="w-full px-5 py-3 bg-surface-dark/50 border border-glass-border rounded-xl text-white font-bold placeholder:text-slate-700 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                            placeholder="Software Engineer"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 pt-6 border-t border-glass-border">
                                    <button
                                        onClick={() => setProfileData({ name: '', email: '', phone: '', company: '', position: '' })}
                                        className="px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        {language === 'es' ? 'Cancelar' : 'Cancel'}
                                    </button>
                                    <button
                                        onClick={handleSaveProfile}
                                        className="px-10 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-glow hover:scale-105 active:scale-95 transition-all"
                                    >
                                        {t('settings.profile.save') || 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'billing' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <CreditCard className="text-primary" size={24} />
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">
                                        {t('settings.tabs.billing') || 'Billing'}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                            {t('settings.billing.paymentMethod') || 'Payment Method'}
                                        </label>
                                        <select
                                            value={billingData.paymentMethod}
                                            onChange={(e) => setBillingData({ ...billingData, paymentMethod: e.target.value })}
                                            className="w-full px-5 py-3 bg-surface-dark/50 border border-glass-border rounded-xl text-white font-bold focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all appearance-none"
                                        >
                                            <option value="">{language === 'es' ? 'Seleccionar método' : 'Select method'}</option>
                                            <option value="credit_card">Credit Card</option>
                                            <option value="paypal">PayPal</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                            {t('settings.billing.billingAddress') || 'Billing Address'}
                                        </label>
                                        <textarea
                                            value={billingData.billingAddress}
                                            onChange={(e) => setBillingData({ ...billingData, billingAddress: e.target.value })}
                                            className="w-full px-5 py-3 bg-surface-dark/50 border border-glass-border rounded-xl text-white font-bold h-32 resize-none placeholder:text-slate-700 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                            placeholder={language === 'es' ? 'Calle, Ciudad, Código Postal, País' : 'Street, City, ZIP, Country'}
                                        />
                                    </div>
                                </div>

                                <div className="bg-surface-dark/30 border border-glass-border rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                                    <div className="flex items-center gap-6">
                                        <div className="size-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                                            <Zap size={32} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Current Plan</p>
                                            <h3 className="text-2xl font-black text-white tracking-tight">Professional <span className="text-primary ml-2 uppercase text-xs">$99/mo</span></h3>
                                            <p className="text-sm text-slate-500 mt-1 font-bold">Renewal: January 23, 2025</p>
                                        </div>
                                    </div>
                                    <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-white transition-all">
                                        Upgrade Plan
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'interface' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <Palette className="text-primary" size={24} />
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">
                                        {t('settings.tabs.interface') || 'Interface'}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                            {t('settings.interface.language') || 'Language'}
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {['es', 'en'].map((lang) => (
                                                <button
                                                    key={lang}
                                                    onClick={() => handleLanguageChange(lang as 'es' | 'en')}
                                                    className={`
                                                        px-6 py-6 rounded-2xl border-2 transition-all group flex flex-col items-center gap-3
                                                        ${language === lang
                                                            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                                                            : 'border-glass-border bg-surface-dark hover:border-slate-600'}
                                                    `}
                                                >
                                                    <span className="text-3xl group-hover:scale-110 transition-transform">
                                                        {lang === 'es' ? '🇪🇸' : '🇬🇧'}
                                                    </span>
                                                    <span className={`text-xs font-black uppercase tracking-widest ${language === lang ? 'text-primary' : 'text-slate-500'}`}>
                                                        {lang === 'es' ? 'Español' : 'English'}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                            {t('settings.interface.theme') || 'Theme'}
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button className="px-6 py-6 rounded-2xl border-2 border-primary bg-primary/10 flex flex-col items-center gap-3 shadow-lg shadow-primary/10">
                                                <span className="text-3xl">🌙</span>
                                                <span className="text-xs font-black uppercase tracking-widest text-primary">Next Gen Dark</span>
                                            </button>
                                            <button disabled className="px-6 py-6 rounded-2xl border-2 border-glass-border bg-surface-dark opacity-40 cursor-not-allowed flex flex-col items-center gap-3">
                                                <span className="text-3xl">☀️</span>
                                                <span className="text-xs font-black uppercase tracking-widest text-slate-500">Retro Light</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'ai-agent' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <Bot className="text-primary" size={24} />
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">
                                        {t('settings.aiAgent.tab') || 'AI Agent'}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                            {t('settings.aiAgent.agentName') || 'Agent Name'}
                                        </label>
                                        <input
                                            type="text"
                                            value={aiSettings.name}
                                            onChange={(e) => setAiSettings({ ...aiSettings, name: e.target.value })}
                                            className="w-full px-5 py-3 bg-surface-dark/50 border border-glass-border rounded-xl text-white font-bold placeholder:text-slate-700 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                            placeholder="Magui"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                            {t('settings.aiAgent.profile') || 'Evaluation Profile'}
                                        </label>
                                        <select
                                            value={aiSettings.profile}
                                            onChange={(e) => setAiSettings({ ...aiSettings, profile: e.target.value })}
                                            className="w-full px-5 py-3 bg-surface-dark/50 border border-glass-border rounded-xl text-white font-bold focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all appearance-none"
                                        >
                                            <option value="corporate">{t('settings.aiAgent.profiles.corporate')}</option>
                                            <option value="innovation">{t('settings.aiAgent.profiles.innovation')}</option>
                                            <option value="technical">{t('settings.aiAgent.profiles.technical')}</option>
                                            <option value="soft">{t('settings.aiAgent.profiles.soft')}</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                            {t('settings.aiAgent.focus') || 'Personalized Focus'}
                                        </label>
                                        <textarea
                                            value={aiSettings.focus}
                                            onChange={(e) => setAiSettings({ ...aiSettings, focus: e.target.value })}
                                            className="w-full px-5 py-3 bg-surface-dark/50 border border-glass-border rounded-xl text-white font-bold h-32 resize-none placeholder:text-slate-700 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                            placeholder={t('settings.aiAgent.focusPlaceholder')}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-6 border-t border-glass-border">
                                    <button
                                        onClick={handleSaveAiSettings}
                                        className="px-10 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-glow hover:scale-105 active:scale-95 transition-all"
                                    >
                                        {t('settings.profile.save') || 'Save Agent Profile'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'roles' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-3 mb-6">
                                    <Shield className="text-primary" size={24} />
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">
                                        {t('settings.tabs.roles') || 'Roles & Permissions'}
                                    </h2>
                                </div>

                                <div className="bg-surface-dark/50 border border-glass-border rounded-3xl overflow-hidden shadow-2xl">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-white/5">
                                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Role</th>
                                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Users</th>
                                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Permissions</th>
                                                <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-glass-border">
                                            {[
                                                { role: 'Admin', users: 3, perm: 'Full Access' },
                                                { role: 'Manager', users: 8, perm: 'Team Management' },
                                                { role: 'Viewer', users: 15, perm: 'Read Only' }
                                            ].map((row) => (
                                                <tr key={row.role} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-8 py-5">
                                                        <span className="text-sm font-black text-white">{row.role}</span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <span className="text-sm font-bold text-slate-400">{row.users} Members</span>
                                                    </td>
                                                    <td className="px-8 py-5 text-sm">
                                                        <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg font-bold text-[10px] uppercase">
                                                            {row.perm}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5 text-center">
                                                        <button className="text-slate-500 hover:text-white transition-colors p-2 underline decoration-primary/30 underline-offset-4 text-xs font-black uppercase">
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
