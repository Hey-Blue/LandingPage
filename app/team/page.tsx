"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import { staticTeamMembers, TeamMember } from '@/public/data/team/currentIntern';
import { formerTeamMembers } from '@/public/data/team/formerInterns';
import { staticTeamMembers as heads } from '@/public/data/team/heads';
import { staticTeamMembers as board } from '@/public/data/team/Board';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from '@/components/Footer';

type Section = 'leadership' | 'board' | 'team' | 'former';
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
    former: { data: [] as TeamMember[], loaded: false }
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const allMembers = [...heads, ...board, ...staticTeamMembers, ...formerTeamMembers];
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
  
    return (
      <p 
        className={className}
        dangerouslySetInnerHTML={{ 
          __html: convertUrlsToLinks(text.trim()) 
        }}
      />
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
      const sections: Section[] = ['board', 'team', 'former'];
      await Promise.all(sections.map(section => loadSection(section)));
    };
    initialLoad();
  }, [loadSection]);
  
  useEffect(() => {
    if (!isInitialLoad) {
      loadSection(activeSection);
    }
  }, [activeSection, isInitialLoad, loadSection]);
  
  const renderTeamMembers = (members: TeamMember[], isBoard = false) => (
    members.map((member, index) => (
      <FadeInOnScroll key={member.id} delay={index * 0.1}>
        <Card className="group flex overflow-hidden bg-white transform transition-all duration-300 hover:scale-105">
          <div className="relative w-1/2 overflow-hidden">
            {member.imageLink && (
              <div className="relative w-full h-full min-h-[250px]">
                <Image
                  src={member.imageLink}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  quality={95}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR8ZGR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
            )}
          </div>
          <CardContent className="p-6 w-1/2 space-y-4 flex flex-col"> 
            <div className="space-y-2 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight group-hover:text-blue-600 transition-colors break-words overflow-hidden">
                {member.name}
              </CardTitle>
              {member.role && !member.role.includes('placeholder') && (
                <CardDescription className="text-sm text-gray-600 break-words">
                  {member.role}
                </CardDescription>
              )}
            </div>
            {!isBoard && member.bio && !member.bio.includes('placeholder') && (
              <LinkedBioText 
                text={member.bio}
                className="text-gray-600 line-clamp-3 text-center"
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
          </CardContent>
        </Card>
      </FadeInOnScroll>
    ))
  );

  const sections = [
    { id: 'leadership', label: 'Leadership Team' },
    { id: 'board', label: 'Board Members' },
    { id: 'team', label: 'Current Team' },
    { id: 'former', label: 'Former Interns' },
  ] as const;
  
  const renderSection = (section: Section) => {
    const isLoading = !sectionData[section].loaded;
    const data = sectionData[section].data;
    
    if (section === 'team') {
      const leads = data.filter(member => 
        member.role?.toLowerCase().includes('lead') && 
        !member.role?.toLowerCase().includes('former')
      );
      
      const regularMembers = data.filter(member => 
        !member.role?.toLowerCase().includes('lead') ||
        member.role?.toLowerCase().includes('former')
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
                    className="text-3xl font-bold text-white text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Team Leads
                  </motion.h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {renderTeamMembers(leads)}
                  </div>
                </FadeInOnScroll>
              )}
      
              {/* Regular Team Members */}
              <FadeInOnScroll className="space-y-12" delay={0.2}>
                <motion.h2
                  className="text-3xl font-bold text-white text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Team Members
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                  {renderTeamMembers(regularMembers)}
                </div>
              </FadeInOnScroll>
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
            {renderTeamMembers(data, section === 'board')}
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
      <DialogContent className="bg-white max-h-[80vh] overflow-y-auto w-[95vw] max-w-3xl">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-3xl font-bold text-blue-600">
            {selectedMember?.name}
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-700 font-medium">
            {selectedMember?.role}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          {selectedMember?.bio.split('\n\n').map((paragraph, index) => (
            <p 
              key={index} 
              className="mb-4 text-gray-600 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: convertUrlsToLinks(paragraph.trim()) 
              }}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );  
    return (
    <>
      <Header />
      <ScrollArea className="min-h-screen bg-gradient-to-r from-[#4facfe] to-[#00f2fe] pt-20"> {/* Added pt-20 */}
        <div className="container max-w-7xl mx-auto px-4 py-16">
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
                      ? 'bg-white text-blue-600 shadow-lg scale-105' 
                      : 'bg-white/10 text-white hover:bg-white/20'
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
                    className="text-4xl md:text-6xl font-bold tracking-tight text-white"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {sections.find(s => s.id === activeSection)?.label}
                  </motion.h1>
                  <motion.p 
                    className="text-xl text-white/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {activeSection === 'leadership' && "Meet the visionaries behind Hey Blue"}
                    {activeSection === 'board' && "Our dedicated board members"}
                    {activeSection === 'team' && "Get to know the people behind our success"}
                    {activeSection === 'former' && "A special thanks to our former interns"}
                  </motion.p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {renderSection(activeSection)}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </ScrollArea>
      <Footer />
    </>
  );
}

export default TeamPage;

