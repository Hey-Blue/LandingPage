"use client";

import { useState, useEffect, use } from 'react';
import { getFirestore, doc, getDoc, Timestamp } from 'firebase/firestore';
import app from '@/firebaseConfig';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { extractInstagramPostId, isValidInstagramUrl } from '@/utils/instagramHelpers';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from "@/components/ui/skeleton";

interface NewsletterBlock {
  id: string;
  type: 'text' | 'image' | 'youtube' | 'instagram';
  content: string;
  position: 'left' | 'right' | 'center' | 'full';
  width: number;
  rowId?: string;
  columnIndex?: number;
  styling: {
    fontFamily?: string;
    fontSize?: string;
    fontColor?: string;
  };
}

interface NewsletterRow {
  id: string;
  columns: number;
  blockIds: string[];
}

interface Newsletter {
  id?: string;
  title: string;
  description: string;
  coverImage: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  publishedAt?: Timestamp;
  isPublished: boolean;
  blocks: NewsletterBlock[];
  rows: NewsletterRow[];
  authorName: string;
  authorId: string;
  contentOrder: string[];
}

export default function NewsletterDetail({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params at the beginning of the component
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNewsletter = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const db = getFirestore(app);
        const newsletterRef = doc(db, 'newsletters', id);
        const newsletterSnap = await getDoc(newsletterRef);

        if (newsletterSnap.exists()) {
          const newsletterData = {
            id: newsletterSnap.id,
            ...newsletterSnap.data()
          } as Newsletter;

          // Check if the newsletter is published
          if (!newsletterData.isPublished) {
            setError('This newsletter is not available.');
            setLoading(false);
            return;
          }

          setNewsletter(newsletterData);
        } else {
          setError('Newsletter not found');
        }
      } catch (err) {
        console.error('Error fetching newsletter:', err);
        setError('Failed to load newsletter. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletter();
  }, [id]);

  // Function to check if an ID is for a row or a standalone block
  const isRowId = (id: string): boolean => {
    return newsletter?.rows?.some(row => row.id === id) || false;
  }

  // Function to get all blocks in a row
  const getBlocksInRow = (rowId: string) => {
    if (!newsletter) return [];
    
    return newsletter.blocks
      .filter(block => block.rowId === rowId)
      .sort((a, b) => (a.columnIndex || 0) - (b.columnIndex || 0));
  };

  const formatDate = (timestamp?: Timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#4facfe] to-[#00f2fe] pt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-8">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-12 w-3/4" />
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-[300px] w-full" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !newsletter) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#4facfe] to-[#00f2fe] pt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Alert variant="destructive">
            <AlertDescription>
              {error || "We couldn't load the newsletter you're looking for. It may have been removed or is temporarily unavailable."}
            </AlertDescription>
          </Alert>
          <div className="mt-6 flex justify-center">
            <Link href="/newsletter">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Newsletters
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="min-h-screen bg-gradient-to-r from-[#4facfe] to-[#00f2fe] pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Button 
          variant="ghost"
          onClick={() => {}}
          className="group mb-8 hover:bg-white/20"
        >
          <Link href="/newsletter" className="inline-flex items-center">
            <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Newsletters
          </Link>
        </Button>

        <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
          <CardContent className="p-0">
            {/* Cover image and title section */}
            {newsletter.coverImage ? (
              <div className="relative w-full h-[60vh] overflow-hidden">
                <div className="absolute inset-0 animate-fade-in">
                  <img 
                    src={newsletter.coverImage} 
                    alt={newsletter.title} 
                    className="w-full h-full object-cover object-center scale-105 animate-zoom-in" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-16">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                      {newsletter.title}
                    </h1>
                    {newsletter.description && (
                      <p className="text-xl text-white/80 max-w-2xl">
                        {newsletter.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 md:p-16">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                    {newsletter.title}
                  </h1>
                  {newsletter.description && (
                    <p className="text-xl text-white/80 max-w-2xl">
                      {newsletter.description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Author info section */}
            <div className="px-8 md:px-16 lg:px-24 py-12">
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 ring-2 ring-blue-500/10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        {newsletter.authorName?.[0] || 'H'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">By {newsletter.authorName || 'Hey Blue'}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(newsletter.publishedAt) || formatDate(newsletter.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Newsletter content */}
                <div className="space-y-10">
                  {/* Render content in the ordered sequence */}
                  {newsletter.contentOrder && newsletter.contentOrder.map((itemId) => {
                    if (isRowId(itemId)) {
                      // Split row layout
                      const row = newsletter.rows.find(r => r.id === itemId);
                      if (!row) return null;
                      
                      return (
                        <div key={row.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                          {getBlocksInRow(row.id).map((block) => (
                            <div key={block.id} className="space-y-4">
                              {block.type === 'text' && (
                                <div
                                  style={{
                                    color: block.styling.fontColor || '#000000',
                                    fontSize: block.styling.fontSize || '16px',
                                  }}
                                  className="prose prose-lg prose-blue max-w-none"
                                >
                                  <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                    {block.content}
                                  </ReactMarkdown>
                                </div>
                              )}

                              {block.type === 'image' && block.content && (
                                <div 
                                  className="rounded-xl overflow-hidden shadow-lg mx-auto"
                                  style={{
                                    width: `${block.width || 100}%`,
                                    maxWidth: '100%'
                                  }}
                                >
                                  <img
                                    src={block.content}
                                    alt="Newsletter image"
                                    className="w-full h-auto"
                                  />
                                </div>
                              )}

                              {block.type === 'youtube' && block.content && (
                                <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                                  {block.content.includes('iframe') ? (
                                    <div dangerouslySetInnerHTML={{ __html: block.content }} />
                                  ) : (
                                    <iframe
                                      className="w-full h-full"
                                      src={block.content.includes('youtube.com/embed/')
                                        ? block.content
                                        : `https://www.youtube.com/embed/${block.content.split('v=')[1]?.split('&')[0] || ''}`}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      title="YouTube video"
                                    />
                                  )}
                                </div>
                              )}

                              {block.type === 'instagram' && block.content && isValidInstagramUrl(block.content) && (
                                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                                  <div className="aspect-square w-full bg-white">
                                    <iframe 
                                      src={`https://www.instagram.com/p/${extractInstagramPostId(block.content)}/embed/captioned/`}
                                      className="w-full h-full border-0"
                                      scrolling="no"
                                      title="Instagram Post"
                                    ></iframe>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    } else {
                      // Standalone block
                      const block = newsletter.blocks.find(b => b.id === itemId && !b.rowId);
                      if (!block) return null;
                      
                      return (
                        <div
                          key={block.id}
                          className={`
                          ${block.position === 'left' ? 'float-left mr-8 mb-6' :
                              block.position === 'right' ? 'float-right ml-8 mb-6' :
                                block.position === 'center' ? 'mx-auto mb-10' : 'w-full mb-10'}
                          clear-after
                        `}
                          style={{
                            width: `${block.width}%`,
                            maxWidth: '100%',
                            clear: block.position === 'full' ? 'both' : 'none'
                          }}
                        >
                          {block.type === 'text' && (
                            <div
                              style={{
                                color: block.styling.fontColor || '#000000',
                                fontSize: block.styling.fontSize || '16px',
                                textAlign: block.position === 'center' ? 'center' :
                                  block.position === 'left' ? 'left' :
                                    block.position === 'right' ? 'right' : 'left'
                              }}
                              className="prose prose-lg prose-blue max-w-none"
                            >
                              <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                {block.content}
                              </ReactMarkdown>
                            </div>
                          )}

                          {block.type === 'image' && block.content && (
                            <div className="rounded-xl overflow-hidden shadow-lg">
                              <img
                                src={block.content}
                                alt="Newsletter image"
                                className="w-full h-auto"
                              />
                            </div>
                          )}

                          {block.type === 'youtube' && block.content && (
                            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                              {block.content.includes('iframe') ? (
                                <div dangerouslySetInnerHTML={{ __html: block.content }} />
                              ) : (
                                <iframe
                                  className="w-full h-full"
                                  src={block.content.includes('youtube.com/embed/')
                                    ? block.content
                                    : `https://www.youtube.com/embed/${block.content.split('v=')[1]?.split('&')[0] || ''}`}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  title="YouTube video"
                                />
                              )}
                            </div>
                          )}

                          {block.type === 'instagram' && block.content && (
                            <div className="my-4 w-full">
                              {isValidInstagramUrl(block.content) ? (
                                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                                  <div className="aspect-square w-full bg-white">
                                    <iframe 
                                      src={`https://www.instagram.com/p/${extractInstagramPostId(block.content)}/embed/captioned/`}
                                      className="w-full h-full border-0"
                                      scrolling="no" 
                                      title="Instagram Post"
                                    ></iframe>
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-gray-100 rounded-xl p-4 text-center">
                                  <p className="text-sm text-red-500">Invalid Instagram URL</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
