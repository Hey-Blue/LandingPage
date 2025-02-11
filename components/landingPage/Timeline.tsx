'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { InstagramEmbed } from 'react-social-media-embed';
import ReactPlayer from 'react-player';

interface TimelineProps {
  events: TimelineEvent[];
}

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  media?: {
    type: 'image' | 'video' | 'youtube' | 'instagram' | 'nbcnews' | 'pdf';
    url?: string;
    thumbnail?: string;
    alt?: string;
    embedId?: string;
    instagramId?: string;
    size?: 'square' | 'portrait' | 'landscape';
    videoId?: string;
    title?: string;
  }[];
  tags?: string[];
  highlight?: boolean;
}

// Remove the custom InstagramEmbed component

const NBCNewsEmbed = ({ videoId }: { videoId: string }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="aspect-video w-full">
      <iframe
        className="w-full h-full"
        src={`https://www.nbcnews.com/news/embedded-video/${videoId}`}
        loading="lazy"
        allowFullScreen
        scrolling="no"
        style={{ border: 0 }}
      />
    </div>
  );
};

const YouTubeEmbed = ({ embedId }: { embedId: string }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="aspect-video w-full">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

const PDFViewer = ({ url, title }: { url: string; title: string }) => {
  return (
    <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
      <iframe
        src={`${url}#toolbar=0&navpanes=0`}
        className="w-full h-full"
        title={title}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-3 text-center">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Open {title}
        </a>
      </div>
    </div>
  );
};

const VideoPlayer = ({ url }: { url: string }) => {
  return (
    <div className="relative aspect-video">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        playing={false}
      />
    </div>
  );
};

const ImageCarousel = ({ media }: { media: TimelineEvent['media'] }) => {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % media!.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + media!.length) % media!.length);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!media || media.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [media, isHovered]);

  if (!mounted || !media || media.length === 0) return null;

  const currentMedia = media[currentIndex];

  return (
    <div
      className="relative mt-4 rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Media content */}
      <div className="relative">
        {currentMedia.type === 'pdf' ? (
          <PDFViewer url={currentMedia.url!} title={currentMedia.title!} />
        ) : currentMedia.type === 'youtube' && currentMedia.embedId ? (
          <YouTubeEmbed embedId={currentMedia.embedId} />
        ) : currentMedia.type === 'instagram' && currentMedia.instagramId ? (
          <InstagramEmbed 
            url={`https://www.instagram.com/p/${currentMedia.instagramId}/`}
            width="100%"
            height="100%"
          />
        ) : currentMedia.type === 'nbcnews' && currentMedia.videoId ? (
          <NBCNewsEmbed videoId={currentMedia.videoId} />
        ) : currentMedia.type === 'image' ? (
          <img
            src={currentMedia.url}
            alt={currentMedia.alt || 'Timeline event'}
            className="w-full object-contain bg-gray-100"
          />
        ) : currentMedia.type === 'video' && (
          <VideoPlayer 
            url={currentMedia.url!}
          />
        )}

        {/* Navigation buttons */}
        {media.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      {media.length > 1 && (
        <div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/20 rounded-full px-3 py-2"
          onClick={handleClick}
        >
          {media.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`
                w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300
                ${index === currentIndex
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/40 hover:bg-white/60'
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TimelineEvent = ({ 
  event, 
  index, 
  isMobile, 
  isExpanded, 
  onToggle 
}: {
  event: TimelineEvent;
  index: number;
  isMobile: boolean;
  isExpanded: boolean;
  onToggle: (date: string) => void;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={isMobile ? false : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.2,
        delay: isMobile ? 0 : Math.min(index * 0.1, 0.2)
      }}
      className={`
        flex flex-col md:flex-row items-center 
        mb-4 md:mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}
        ${!isMobile && 'hover:z-10'}
      `}
    >
      <div className="w-full md:w-[45%] px-2 md:px-8">
        <motion.div
          className={`
            bg-white rounded-xl md:rounded-2xl shadow 
            ${event.highlight ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
            hover:shadow-lg transition-all duration-300
            cursor-pointer overflow-hidden
          `}
          whileHover={!isMobile ? { scale: 1.02 } : {}}
          onClick={() => onToggle(event.date)}
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-blue-600">{event.date}</h3>
                <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mt-2">{event.title}</h4>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-400"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </motion.div>
            </div>

            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {event.media && (
                <ImageCarousel media={event.media} />
              )}
              
              <p className="text-gray-600 mt-4 text-sm md:text-base">
                {event.description}
              </p>
              
              {event.tags && (
                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  {event.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs md:text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <div className="hidden md:flex relative items-center justify-center w-16">
        <motion.div
          className={`
            h-3 w-3 md:h-6 md:w-6 rounded-full shadow-lg z-10
            ${event.highlight ? 'bg-blue-500' : 'bg-blue-300'}
          `}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      </div>
      
      <div className="hidden md:block w-[45%] px-8" />
    </motion.div>
  );
};

export const Timeline = ({ events }: TimelineProps) => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const timelineRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleEvent = (date: string) => {
    setExpandedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(date)) {
        newSet.delete(date);
      } else {
        newSet.add(date);
      }
      return newSet;
    });
  };

  if (!mounted) return null;

  return (
    <div className="relative py-8 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12"
        >
          Our Journey
        </motion.h2>

        <div className="relative" ref={timelineRef}>
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200" />

          {events.map((event, index) => (
            <TimelineEvent
              key={event.date}
              event={event}
              index={index}
              isMobile={isMobile}
              isExpanded={expandedEvents.has(event.date)}
              onToggle={toggleEvent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};