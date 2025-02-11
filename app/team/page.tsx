"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
// Removed page-level ScrollArea; use global layout background
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import { staticTeamMembers, TeamMember } from '@/public/data/team/currentIntern';
import { formerTeamMembers } from '@/public/data/team/formerInterns';
import { staticTeamMembers as heads } from '@/public/data/team/heads';
import { staticTeamMembers as board } from '@/public/data/team/Board';
import { staticTeamMembers as contributors } from '@/public/data/team/contributors';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Section = 'leadership' | 'board' | 'contributors' | 'team'  | 'former';
type SelectedMember = TeamMember | null;

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-4">
    <div className="relative">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="h-6 w-6 rounded-full bg-white/30 blur-sm"></div>
      </div>
    </div>
  </div>
);

interface FadeInOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      { 
        threshold,
        rootMargin: '50px 0px 200px 0px'
      }
    );

    const currentElement = domRef.current;
    if (currentElement) {
      // Check if element is already in viewport on mount
      const rect = currentElement.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setIsVisible(true);
      } else {
        observer.observe(currentElement);
      }
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return (
    <motion.div
      ref={domRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.5,
        delay: delay * 0.5, 
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const TeamPage = () => {
  const [activeSection, setActiveSection] = useState<Section>('leadership');
  const [selectedMember, setSelectedMember] = useState<SelectedMember>(null);
  const [sectionData, setSectionData] = useState({
    leadership: { data: [] as TeamMember[], loaded: false },
    board: { data: [] as TeamMember[], loaded: false },
    team: { data: [] as TeamMember[], loaded: false },
    former: { data: [] as TeamMember[], loaded: false },
    contributors: { data: [] as TeamMember[], loaded: false }
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const allMembers = [...heads, ...board, ...contributors, ...staticTeamMembers,  ...formerTeamMembers];
    const imagePromises = allMembers.map((member) => {
      if (!member.imageLink) return Promise.resolve();
      return fetch(member.imageLink)
        .then(response => response.blob())
        .then(() => Promise.resolve())
        .catch(() => Promise.resolve());
    });
  
    Promise.all(imagePromises);
  }, []);

  

  const LinkedBioText = ({ text, className }: { text: string, className?: string }) => {
    const convertUrlsToLinks = (text: string) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;

      let convertedText = text.replace(urlRegex, (url) => 
        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">${url}</a>`
      );

      convertedText = convertedText.replace(emailRegex, (email) => 
        `<a href="mailto:${email}" class="text-blue-600 hover:text-blue-800 underline">${email}</a>`
      );

      return convertedText;
    };

    // Split into paragraphs on blank lines (handles CRLF and variable spacing),
    // then convert single newlines inside paragraphs into <br/> for line breaks.
    const paragraphs = text.split(/\r?\n\s*\r?\n/).map(p => p.trim()).filter(Boolean);
    const html = paragraphs.map(p => {
      const withLinks = convertUrlsToLinks(p);
      const withLineBreaks = withLinks.replace(/\r?\n/g, '<br/>');
      return `<p class="mb-3">${withLineBreaks}</p>`;
    }).join('');

    return (
      <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
    );
  };

const loadSection = useCallback(async (section: Section) => {
  if (sectionData[section].loaded) return;

  let data: TeamMember[] = [];
  switch (section) {
    case 'leadership': data = heads; break;
    case 'board': data = board; break;
    case 'team': data = staticTeamMembers; break;
    case 'former': data = formerTeamMembers; break;
    case 'contributors': data = contributors; break;
  }

  await new Promise(resolve => setTimeout(resolve, 300));
  setSectionData(prev => ({
    ...prev,
    [section]: { data, loaded: true }
  }));
}, [sectionData]);

  useEffect(() => {
    const initialLoad = async () => {
      await loadSection('leadership');
      setIsInitialLoad(false);
      const sections: Section[] = ['board', 'contributors','team','former'];
      await Promise.all(sections.map(section => loadSection(section)));
    };
    initialLoad();
  }, [loadSection]);
  
  useEffect(() => {
    if (!isInitialLoad) {
      loadSection(activeSection);
    }
  }, [activeSection, isInitialLoad, loadSection]);
  
  const renderTeamMembers = (members: TeamMember[], isBoard = false, isLeadership = false, isContributors = false) => {
    return members.map((member, index) => {
      const hasContributions = !!member.contributions && member.contributions.trim() !== '' && !member.contributions.toLowerCase().includes('placeholder');
      const showHoverOverlay = !isBoard && !isContributors && !isLeadership && hasContributions;
  const cardClass = `relative flex overflow-hidden bg-white/95 border border-gray-200 transform transition-all duration-300 ${showHoverOverlay ? 'group hover:scale-105' : ''}`;
  const overlayClass = `absolute inset-0 bg-white/95 opacity-0 transition-opacity duration-300 ${showHoverOverlay ? 'group-hover:opacity-100' : ''} z-10 w-full h-full flex flex-col items-center pointer-events-none`;
      return (
      <FadeInOnScroll key={member.id} delay={index * 0.1}>
        <Card className={cardClass}>
          <div className={overlayClass}>
            <div className='padding: p-4 pb-1 font-bold text-gray-900 dark:text-white text-xl'>
              Contributions by {member.name}
            </div>
            <div className='p-0 pb-4 text-blue-600 dark:text-blue-400 italic text-s text-center'>
              {member.date || 'N/A'}
            </div>
            <div className='max-h-40 overflow-y-auto w-full px-4 pointer-events-auto'>
            <ul className='pl-4 list-disc'>
            {member.contributions
              ? member.contributions.includes(';') 
                ? member.contributions.split(';').map((contribution, i) => (
                    <li key={i} className="text-gray-600">{contribution.trim()}</li>
                  ))
                : <li className="text-gray-600 mb-1">{member.contributions.trim()}</li>
              : <li className="text-gray-600">No contributions listed yet</li>
            }
            </ul>
            </div>
          </div>
          <div className="relative w-1/2 overflow-hidden z-0">
            {member.imageLink && (
              <div className="relative w-full h-full min-h-[250px] z-0">
                <Image
                  src={member.imageLink}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300 z-0"
                  quality={95}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR8ZGR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
            )}
          </div>
          <CardContent className="p-6 w-1/2 space-y-4 flex flex-col z-0 pointer-events-auto"> 
      <div className="space-y-2 text-center">
              <CardTitle className={`text-2xl font-bold tracking-tight ${isBoard || isContributors || isLeadership ? 'group-hover:text-blue-600' : ''} transition-colors break-words overflow-hidden`}>
                 {member.name.split(" ").length > 1 && member.name.length > 17 ? (
                  <>
                    {member.name.split(" ")[0]}{" "}
                    <span className="text-xl">{member.name.split(" ").slice(1).join(" ")}</span>
                  </> ) : (
                  member.name
                )}
              </CardTitle>
      {member.role && !member.role.includes('placeholder') && (
      <CardDescription className="team-role text-sm text-gray-800 dark:text-gray-300 break-words">
                    {member.role}
                  </CardDescription>
                )}
            </div>
            {!isBoard && member.bio && !member.bio.includes('placeholder') && (
              <LinkedBioText 
    text={member.bio}
    className="text-gray-800 dark:text-gray-300 line-clamp-3 text-center"
              />
            )}
            {isBoard && member.bio && !member.bio.includes('placeholder') && (
              <Button 
                variant="outline" 
                onClick={() => setSelectedMember(member)}
                className="mt-auto"
              >
                View Bio
              </Button>         
            )}
            {isContributors && (
              <div className="inline-block rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-xs font-semibold mt-2">
                Contributor
              </div>
            )}
            
           
          </CardContent>
        </Card>
      </FadeInOnScroll>
      );
    });
  };

  const sections = [
    { id: 'leadership', label: 'Leadership Team' },
    { id: 'board', label: 'Board Members' },
    { id: 'contributors', label: 'Contributors' },
    { id: 'team', label: 'Current Team' },
    { id: 'former', label: 'Former Interns' },
  ] as const;
  
  const renderSection = (section: Section) => {
    const isLoading = !sectionData[section].loaded;
    const data = sectionData[section].data;
    const sectionId = section as Section;

    
    if (sectionId === 'team') {
      const leads = data.filter(member => 
        member.role?.toLowerCase().includes('lead') && 
        !member.role?.toLowerCase().includes('former')
      );

      const businessMembers = data.filter(member => 
        (!member.role?.toLowerCase().includes('lead') || 
        member.role?.toLowerCase().includes('former')) && 
        (member.role?.toLowerCase().includes('business') ||
         member.role?.toLowerCase().includes('research') ||
         member.role?.toLowerCase().includes('graphics'))
      );

      const frontMembers = data.filter(member => 
        (!member.role?.toLowerCase().includes('lead') || 
        member.role?.toLowerCase().includes('former')) && 
        member.role?.toLowerCase().includes('front')
      );

      const mobileMembers = data.filter(member => 
        (!member.role?.toLowerCase().includes('lead') || 
        member.role?.toLowerCase().includes('former')) && 
        member.role?.toLowerCase().includes('mobile')
      );

      const webMembers = data.filter(member => 
        (!member.role?.toLowerCase().includes('lead') || 
        member.role?.toLowerCase().includes('former')) && 
        member.role?.toLowerCase().includes('web')
      );

      const CyberSecurityMembers = data.filter(member => 
        (!member.role?.toLowerCase().includes('lead') || 
        member.role?.toLowerCase().includes('former')) && 
        member.role?.toLowerCase().includes('cyber security')
      );

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isLoading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-24">
              {/* Team Leads */}
              {leads.length > 0 && (
                <FadeInOnScroll className="space-y-12">
                    <motion.h2 
                    className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Team Leads
                  </motion.h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                    {renderTeamMembers(leads)}
                  </div>
                </FadeInOnScroll>
              )}
              {/* Business Development Team Members */}
              <FadeInOnScroll className="space-y-12" delay={0.2}>
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Business Development Team
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                    {renderTeamMembers(businessMembers)}
                </div>
                
              </FadeInOnScroll>
              {/* Front End Team Members */}
              <FadeInOnScroll className="space-y-12" delay={0.2}>
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Front End Team
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                    {renderTeamMembers(frontMembers)}
                </div>
                
              </FadeInOnScroll>
              {/* Mobile End Team Members */}
              <FadeInOnScroll className="space-y-12" delay={0.2}>
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Mobile End Team
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                    {renderTeamMembers(mobileMembers)}
                </div>
                
              </FadeInOnScroll>
              {/* Web End Team Members */}
              <FadeInOnScroll className="space-y-12" delay={0.2}>
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Web End Team
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                    {renderTeamMembers(webMembers)}
                </div>
                
              </FadeInOnScroll>
              {/* Cyber Security Team Members */}
              <FadeInOnScroll className="space-y-12" delay={0.2}>
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Cyber Security Team
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                    {renderTeamMembers(CyberSecurityMembers)}
                </div>
                
              </FadeInOnScroll>

            </div>
          )}
        </motion.div>
      );
    }
    if (section === 'team') {
      const leads = data.filter(member => 
        member.role?.toLowerCase().includes('lead') && 
        !member.role?.toLowerCase().includes('former')
      );

      const businessMembers = data.filter(member => 
        (!member.role?.toLowerCase().includes('lead') || 
        member.role?.toLowerCase().includes('former')) && 
        (member.role?.toLowerCase().includes('business') ||
         member.role?.toLowerCase().includes('research') ||
         member.role?.toLowerCase().includes('graphics'))
      );

      const frontMembers = data.filter(member => 
        (!member.role?.toLowerCase().includes('lead') || 
        member.role?.toLowerCase().includes('former')) && 
        member.role?.toLowerCase().includes('front')
      );

      const mobileMembers = data.filter(member => 
        (!member.role?.toLowerCase().includes('lead') || 
        member.role?.toLowerCase().includes('former')) && 
        member.role?.toLowerCase().includes('mobile')
      );

      const webMembers = data.filter(member => 
        (!member.role?.toLowerCase().includes('lead') || 
        member.role?.toLowerCase().includes('former')) && 
        member.role?.toLowerCase().includes('web')
      );

      const CyberSecurityMembers = data.filter(member => 
        (!member.role?.toLowerCase().includes('lead') || 
        member.role?.toLowerCase().includes('former')) && 
        member.role?.toLowerCase().includes('cyber security')
      );
      leads.sort((a, b) => a.name.localeCompare(b.name));
      businessMembers.sort((a, b) => a.name.localeCompare(b.name));
      frontMembers.sort((a, b) => a.name.localeCompare(b.name));
      mobileMembers.sort((a, b) => a.name.localeCompare(b.name));
      webMembers.sort((a, b) => a.name.localeCompare(b.name));
      CyberSecurityMembers.sort((a, b) => a.name.localeCompare(b.name));

      /*code*/
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isLoading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-24">
              {/* Team Leads */}
              {leads.length > 0 && (
                <FadeInOnScroll className="space-y-12">
                  <motion.h2 
                    className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Team Leads
                  </motion.h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                    {renderTeamMembers(leads)}
                  </div>
                </FadeInOnScroll>
              )}
              {/* Business Development Team Members */}
              <FadeInOnScroll className="space-y-12" delay={0.2}>
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Business Development Team
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                    {renderTeamMembers(businessMembers)}
                </div>
                
              </FadeInOnScroll>
              {/* Front End Team Members */}
              <FadeInOnScroll className="space-y-12" delay={0.2}>
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Front End Team
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                    {renderTeamMembers(frontMembers)}
                </div>
                
              </FadeInOnScroll>
              {/* Mobile End Team Members */}
              <FadeInOnScroll className="space-y-12" delay={0.2}>
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Mobile End Team
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                    {renderTeamMembers(mobileMembers)}
                </div>
                
              </FadeInOnScroll>
              {/* Web End Team Members */}
              <FadeInOnScroll className="space-y-12" delay={0.2}>
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Web End Team
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                    {renderTeamMembers(webMembers)}
                </div>
                
              </FadeInOnScroll>
              {/* Cyber Security Team Members */}
              <FadeInOnScroll className="space-y-12" delay={0.2}>
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Cyber Security Team
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                    {renderTeamMembers(CyberSecurityMembers)}
                </div>
                
              </FadeInOnScroll>

            </div>
          )}
        </motion.div>
      );
    }
      if (section === 'former') {
        const projectManagers = data.filter(member =>
          member.role?.toLowerCase().includes('project manager') 
        );
        const leads = data.filter(member => 
          member.role?.toLowerCase().includes('lead')  
        );
        const businessMembers = data.filter(member => 
          !member.role?.toLowerCase().includes('lead') &&
          !member.role?.toLowerCase().includes('project manager') &&
          (
            member.role?.toLowerCase().includes('business') ||
            member.role?.toLowerCase().includes('research') ||
            member.role?.toLowerCase().includes('graphics')
          )
        );
      
        const frontMembers = data.filter(member => 
          !member.role?.toLowerCase().includes('lead') &&
          !member.role?.toLowerCase().includes('project manager') &&
          member.role?.toLowerCase().includes('front')
        );
      
        const mobileMembers = data.filter(member => 
          !member.role?.toLowerCase().includes('lead') &&
          !member.role?.toLowerCase().includes('project manager') &&
          member.role?.toLowerCase().includes('mobile')
        );
      
        const webMembers = data.filter(member => 
          !member.role?.toLowerCase().includes('lead') &&
          !member.role?.toLowerCase().includes('project manager') &&
          member.role?.toLowerCase().includes('web')
        );
        leads.sort((a, b) => a.name.localeCompare(b.name));
        businessMembers.sort((a, b) => a.name.localeCompare(b.name));
        frontMembers.sort((a, b) => a.name.localeCompare(b.name));
        mobileMembers.sort((a, b) => a.name.localeCompare(b.name));
        webMembers.sort((a, b) => a.name.localeCompare(b.name));

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading ? (
              <div className="min-h-[400px] flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="space-y-24">
                {projectManagers.length > 0 && (
                  <FadeInOnScroll className="space-y-12">
                    <motion.h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                      Former Project Managers
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {renderTeamMembers(projectManagers)}
                    </div>
                  </FadeInOnScroll>
                )}
        
                {leads.length > 0 && (
                  <FadeInOnScroll className="space-y-12">
                    <motion.h2 
                      className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Former Leads 
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                      {renderTeamMembers(leads)}
                    </div>
                  </FadeInOnScroll>
                )}
                {/* Business Development Team Members */}
                {businessMembers.length > 0 && (
                  <FadeInOnScroll className="space-y-12" delay={0.2}>
                    <motion.h2 
                      className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Former Business Development Team
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                      {renderTeamMembers(businessMembers)}
                    </div>
                  </FadeInOnScroll>
                )}
                {/* Front End Team Members */}
                {frontMembers.length > 0 && (
                  <FadeInOnScroll className="space-y-12" delay={0.2}>
                    <motion.h2 
                      className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Former Front End Team
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                      {renderTeamMembers(frontMembers)}
                    </div>
                  </FadeInOnScroll>
                )}
                {/* Mobile Team Members */}
                {mobileMembers.length > 0 && (
                  <FadeInOnScroll className="space-y-12" delay={0.2}>
                    <motion.h2 
                      className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Former Mobile Team
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                      {renderTeamMembers(mobileMembers)}
                    </div>
                  </FadeInOnScroll>
                )}
                {/* Web Team Members */}
                {webMembers.length > 0 && (
                  <FadeInOnScroll className="space-y-12" delay={0.2}>
                    <motion.h2 
                      className="text-3xl font-bold text-gray-900 dark:text-white text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Former Web Team
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
                      {renderTeamMembers(webMembers)}
                    </div>
                  </FadeInOnScroll>
                )}
              </div>
            )}
          </motion.div>
        );
      }
    // Leadership, Board, and Former sections
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isLoading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className={`
            grid gap-8
            grid-cols-1
            ${section === 'leadership' 
              ? 'md:grid-cols-2' 
              : 'sm:grid-cols-2 lg:grid-cols-3'
            }
          `}>
            {renderTeamMembers(data, section === 'board', section === 'leadership')}
          </div>
        )}
        {section === 'board' && <BioModal />}
      </motion.div>
    );
  };

  const convertUrlsToLinks = (text: string) => {
    // Match URLs and email addresses
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;
  

    let convertedText = text.replace(urlRegex, (url) => 
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">${url}</a>`
    );

    convertedText = convertedText.replace(emailRegex, (email) => 
      `<a href="mailto:${email}" class="text-blue-600 hover:text-blue-800 underline">${email}</a>`
    );
  
    return convertedText;
  };

  const BioModal = () => (
    <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
      <DialogContent className="bio-modal max-h-[85vh] overflow-y-auto w-[95vw] max-w-4xl p-0">
        {/* Accessible title for screen readers (keeps Radix happy) */}
        <DialogTitle className="sr-only">{selectedMember?.name || 'Profile'}</DialogTitle>

        <div className="flex flex-col md:flex-row">
          <div className="left-panel md:w-1/3 p-6 flex items-center justify-center">
            {selectedMember?.imageLink ? (
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-md overflow-hidden shadow-md">
                <Image src={selectedMember.imageLink} alt={selectedMember.name || 'Member'} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-48 h-48 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-gray-600">No Image</div>
            )}
          </div>

          <div className="md:w-2/3 p-6 text-black dark:text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold team-heading mb-1">{selectedMember?.name}</DialogTitle>
              <DialogDescription className="team-role text-lg mb-4">{selectedMember?.role}</DialogDescription>
            </DialogHeader>

            <div className="prose max-w-none content-text">
              {selectedMember?.bio ? (
                <div dangerouslySetInnerHTML={{ __html: (
                  selectedMember.bio
                    .split(/\r?\n\s*\r?\n/)
                    .map(p => p.trim())
                    .filter(Boolean)
                    .map(p => convertUrlsToLinks(p).replace(/\r?\n/g, '<br/>'))
                    .map(p => `<p class="mb-4">${p}</p>`)
                    .join('')
                ) }} />
              ) : null}
            </div>

            {selectedMember?.contributions && selectedMember.contributions.trim() !== '' && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Contributions</h3>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                  {selectedMember.contributions.includes(';')
                    ? selectedMember.contributions.split(';').map((c, i) => <li key={i}>{c.trim()}</li>)
                    : <li>{selectedMember.contributions.trim()}</li>
                  }
                </ul>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
  return (
  <>
        <div className="container max-w-7xl mx-auto px-4 py-16 pt-20">
          <div className="space-y-12">
            {/* Navigation Buttons */}
            <FadeInOnScroll className="flex flex-wrap justify-center gap-4">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as Section)}
                  variant={activeSection === section.id ? "default" : "outline"}
                  className={`
                    px-8 py-6 text-lg font-semibold rounded-full transition-all
                    ${activeSection === section.id 
                      ? 'bg-blue-600 text-white shadow-lg scale-105' 
                        : 'bg-white/80 text-gray-800 hover:bg-white'
                    }
                  `}
                >
                  {section.label}
                  {!sectionData[section.id].loaded && (
                    <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"/>
                  )}
                </Button>
              ))}
            </FadeInOnScroll>
  
            {/* Content Section */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center space-y-4 mb-12">
                  <motion.h1 
                    className={`team-heading text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-white ${activeSection === 'leadership' ? 'drop-shadow-sm' : ''}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {sections.find(s => s.id === activeSection)?.label}
                  </motion.h1>
                  <motion.p 
                    className={`team-subtitle text-xl ${activeSection === 'leadership' ? 'text-black dark:text-white font-semibold drop-shadow-sm' : 'text-black dark:text-white/85'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {activeSection === 'leadership' && "Meet the visionaries behind Hey, Blue!"}
                    {activeSection === 'board' && "Our dedicated board members"}
                    {activeSection === 'team' && "Get to know the people behind our success"}
                    {activeSection === 'contributors' && "Celebrating our valued contributors"}
                    {activeSection === 'former' && "A special thanks to our former interns"}
                  </motion.p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {renderSection(activeSection as Section)}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
    </>
  );
}

export default TeamPage;

