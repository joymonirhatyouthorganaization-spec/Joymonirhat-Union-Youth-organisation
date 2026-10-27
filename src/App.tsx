/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { FlagshipProjectSection } from './components/FlagshipProjectSection';
import { WardCoverageSection } from './components/WardCoverageSection';
import { Activities } from './components/Activities';
import { AchievementsSection } from './components/AchievementsSection';
import { Leadership } from './components/Leadership';
import { PartnersSection } from './components/PartnersSection';
import { NoticeBoard } from './components/NoticeBoard';
import { Gallery } from './components/Gallery';
import { SocialHub } from './components/SocialHub';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VolunteerModal } from './components/VolunteerModal';
import { AdminPortal, AdminTab } from './components/AdminPortal';
import { ORG_DETAILS } from './data/organizationData';
import { Language } from './types';
import { MessageCircle, HeartHandshake, UploadCloud } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('bn');
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<AdminTab>('notice');
  const [selectedWardForModal, setSelectedWardForModal] = useState<string | undefined>(undefined);

  const handleOpenAdminWithTab = (tab: AdminTab = 'notice') => {
    setAdminInitialTab(tab);
    setIsAdminPortalOpen(true);
  };

  useEffect(() => {
    // Check if user came via #admin shortcut from PWA or link
    if (window.location.hash === '#admin') {
      handleOpenAdminWithTab('notice');
    } else if (window.location.hash === '#visitors') {
      handleOpenAdminWithTab('analytics');
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleOpenVolunteerModal = (ward?: string) => {
    setSelectedWardForModal(ward);
    setIsVolunteerModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] text-slate-800">
      {/* Top Navigation */}
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        onOpenVolunteerModal={() => handleOpenVolunteerModal()}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
      />


      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Motto & Registration Badge */}
        <Hero
          language={language}
          onOpenVolunteerModal={() => setIsVolunteerModalOpen(true)}
        />

        {/* 2. About Us Section (Background, Vision, Mission, Registration, Demographics) */}
        <About language={language} />

        {/* 3. Grassroots Geography & 9 Wards Union-wide Coverage */}
        <WardCoverageSection
          language={language}
          onOpenVolunteerModal={handleOpenVolunteerModal}
        />

        {/* 4. Flagship Anti-Drug Initiative Proposal & Border Realities */}
        <FlagshipProjectSection
          language={language}
          onOpenVolunteerModal={() => handleOpenVolunteerModal()}
        />

        {/* 5. Our Activities / Services (10 core sectors) */}
        <Activities
          language={language}
          onOpenVolunteerModal={() => handleOpenVolunteerModal()}
        />

        {/* 6. Field Achievements & Historical Impact Milestones */}
        <AchievementsSection language={language} />

        {/* 7. Executive Leadership & Council Directory */}
        <Leadership
          language={language}
          onOpenVolunteerModal={() => handleOpenVolunteerModal()}
        />

        {/* 8. Institutional Partners & Collaborators (Government & NGOs) */}
        <PartnersSection language={language} />

        {/* 9. Notice Board & Official Circulars */}
        <NoticeBoard language={language} />

        {/* 10. Field Photo Archives & Gallery */}
        <Gallery language={language} />

        {/* 11. Social Media Integration (Facebook Page, Group, WhatsApp) */}
        <SocialHub language={language} />

        {/* 12. Contact, Donation Desk & FAQs */}
        <ContactSection language={language} />
      </main>

      {/* Footer with Direct Bottom Admin Access & Visitor Counter */}
      <Footer
        language={language}
        onOpenAdmin={() => handleOpenAdminWithTab('notice')}
        onOpenAdminTab={(tab) => handleOpenAdminWithTab(tab)}
      />

      {/* Interactive Volunteer Registration Modal */}
      <VolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => {
          setIsVolunteerModalOpen(false);
          setSelectedWardForModal(undefined);
        }}
        language={language}
        defaultWard={selectedWardForModal}
      />

      {/* Live Admin Content Publishing Portal Modal */}
      <AdminPortal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        language={language}
        initialTab={adminInitialTab}
      />

      {/* Persistent Floating Quick Action Strip */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* WhatsApp Helpline */}
        <a
          href={ORG_DETAILS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-xs font-bold group"
          title="Direct WhatsApp Helpline"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">
            {language === 'bn' ? 'হোয়াটসঅ্যাপ হেল্পলাইন' : 'WhatsApp Desk'}
          </span>
        </a>

        {/* Join Volunteer */}
        <button
          onClick={() => setIsVolunteerModalOpen(true)}
          type="button"
          className="flex items-center gap-2 px-3.5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-xs font-bold cursor-pointer"
          title="Join Volunteer"
        >
          <HeartHandshake className="w-5 h-5 text-amber-300" />
          <span className="hidden sm:inline">
            {language === 'bn' ? 'স্বেচ্ছাসেবক আবেদন' : 'Join Volunteer'}
          </span>
        </button>
      </div>
    </div>
  );
}
