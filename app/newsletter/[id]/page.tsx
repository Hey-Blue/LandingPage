"use client";

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { Card, CardContent } from "@/components/ui/card";
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
  columnBlocks?: { [key: number]: string[] };
}

interface Newsletter {
  id?: string;
  title: string;
  description: string;
  coverImage: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
  isPublished: boolean;
  blocks: NewsletterBlock[]; 
  rows: NewsletterRow[];
  authorName: string;
  authorId: string;
  contentOrder: string[];
}

const ensureNewsletterStructure = (newsletter: Newsletter): Newsletter => {
  if (!newsletter.rows) {
    newsletter.rows = [];
  }

  // Migrate rows that don't have the columnBlocks structure
  const updatedRows = newsletter.rows.map(row => {
    if (!row.columnBlocks) {
      // Create columnBlocks from blockIds
      const columnBlocks: { [key: number]: string[] } = {};
      
      // Group blocks by column
      newsletter.blocks
        .filter(block => block.rowId === row.id)
        .forEach(block => {
          const colIndex = block.columnIndex ?? 0;
          
          if (!columnBlocks[colIndex]) {
            columnBlocks[colIndex] = [];
          }
          
          columnBlocks[colIndex].push(block.id);
        });
      
      return {
        ...row,
        columnBlocks
      };
    }
    return row;
  });

  return {
    ...newsletter,
    rows: updatedRows
  };
};

export default function NewsletterDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const supabase = createClient();
  
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNewsletter = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('newsletters')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        if (!data) {
          setError('Newsletter not found');
          return;
        }
        const newsletterData = data as unknown as Newsletter;
        if (!newsletterData.isPublished) {
          setError('This newsletter is not available.');
          return;
        }
        const structuredNewsletter = ensureNewsletterStructure(newsletterData);
        setNewsletter(structuredNewsletter);
      } catch (err) {
        console.error('Error fetching newsletter:', err);
        setError('Failed to load newsletter. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchNewsletter();
  }, [id, supabase]);

  // Function to check if an ID is for a row or a standalone block
  const isRowId = (id: string): boolean => {
    return newsletter?.rows?.some(row => row.id === id) || false;
  }


  const formatDate = (value?: string | null) => {
    if (!value) return '';
    const d = new Date(value);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Helper function to determine text alignment class based on position
  const getTextAlignmentClass = (position: string) => {
    switch(position) {
      case 'left': return 'text-left';
      case 'right': return 'text-right';
      case 'center': return 'text-center';
      case 'justified': return 'text-justify';
      default: return 'text-left';
    }
  };

  if (loading) {
    return (
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Card className="bg-white shadow">
            <CardContent className="p-8">
              <div className="space-y-8">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-12 w-3/4" />
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
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
      <div className="pt-20">
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

  // Add this function to better handle the complex column structure
  const getRowColumnBlocks = (row: NewsletterRow, newsletter: Newsletter) => {
    const columnBlocksMap: { [key: number]: NewsletterBlock[] } = {};
    
    // Initialize array for each column
    for (let i = 0; i < (row.columns || 2); i++) {
      columnBlocksMap[i] = [];
    }
    
    // First, try to use the columnBlocks structure if available
    if (row.columnBlocks) {
      for (const [colIndexStr, blockIds] of Object.entries(row.columnBlocks)) {
        const colIndex = parseInt(colIndexStr);
        
        // Find all blocks with these IDs
        const blocks = blockIds
          .map(blockId => newsletter.blocks.find(b => b.id === blockId))
          .filter((block): block is NewsletterBlock => block !== undefined);
        
        // Add these blocks to the column
        if (blocks.length > 0) {
          columnBlocksMap[colIndex] = [...columnBlocksMap[colIndex], ...blocks];
        }
      }
    }
    
    // Then, add any additional blocks that have this rowId and a columnIndex,
    // but might not be in the columnBlocks structure
    newsletter.blocks.forEach(block => {
      if (block.rowId === row.id && typeof block.columnIndex === 'number') {
        // Skip blocks that are already included via columnBlocks
        const alreadyIncluded = columnBlocksMap[block.columnIndex]?.some(b => b.id === block.id);
        if (!alreadyIncluded) {
          if (!columnBlocksMap[block.columnIndex]) {
            columnBlocksMap[block.columnIndex] = [];
          }
          columnBlocksMap[block.columnIndex].push(block);
        }
      }
    });
    
    // Sort blocks within each column by their position in blockIds if possible
    if (row.blockIds && row.blockIds.length > 0) {
      for (const colIndex in columnBlocksMap) {
        columnBlocksMap[colIndex].sort((a, b) => {
          const aIndex = row.blockIds.indexOf(a.id);
          const bIndex = row.blockIds.indexOf(b.id);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });
      }
    }
    
    return columnBlocksMap;
  };

  return (
    <div className="pt-20">
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
                  <Image
                    src={newsletter.coverImage}
                    alt={newsletter.title}
                    fill
                    priority
                    className="object-cover object-center scale-105 animate-zoom-in"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-16">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg leading-tight break-words max-w-[90%] md:max-w-[80%]">
                      <span className="block [word-break:break-word] hyphens-auto">
                        {newsletter.title}
                      </span>
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
              <div className="relative w-full h-[60vh] overflow-hidden bg-white">
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    backgroundImage: 'url(https://7wz8a9gr1e.ufs.sh/f/IVApE56zliouaGuZUdjNjd9CVnurxKYWI3MOcSvFwZUzXEPi)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-16">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg leading-tight break-words max-w-[90%] md:max-w-[80%]">
                      <span className="block [word-break:break-word] hyphens-auto">
                        {newsletter.title}
                      </span>
                    </h1>
                    {newsletter.description && (
                      <p className="text-xl text-white/80 max-w-2xl">
                        {newsletter.description}
                      </p>
                    )}
                  </div>
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
                      // Split row layout with full control
                      const row = newsletter.rows.find(r => r.id === itemId);
                      if (!row) return null;
                      
                      // Debug logging to help diagnose the issue
                      console.log(`Rendering row ${row.id} with ${row.columns} columns`);
                      console.log(`Row blockIds: ${row.blockIds?.join(', ')}`);
                      
                      // Get a more comprehensive mapping of blocks to columns
                      const columnBlocksMap = getRowColumnBlocks(row, newsletter);
                      
                      // Debug the result
                      Object.entries(columnBlocksMap).forEach(([colIndex, blocks]) => {
                        console.log(`Column ${colIndex} will render ${blocks.length} blocks: ${blocks.map(b => b.id).join(', ')}`);
                      });
                      
                      return (
                        <div 
                          key={row.id} 
                          className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12"
                        >
                          {/* Render each column */}
                          {Array.from({ length: row.columns || 2 }, (_, colIndex) => {
                            const columnBlocks = columnBlocksMap[colIndex] || [];
                            
                            return (
                              <div key={`col-${colIndex}`} className="space-y-8">
                                {/* Render each block in the column */}
                                {columnBlocks.length > 0 ? (
                                  columnBlocks.map((block) => (
                                    <div key={block.id} className="w-full">
                                      {renderBlockContent(block)}
                                    </div>
                                  ))
                                ) : (
                                  <div className="text-gray-400 italic text-center p-4 border border-dashed border-gray-200 rounded-lg">
                                    Empty column
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    } else {
                      // Standalone block - with all positioning options
                      const block = newsletter.blocks.find(b => b.id === itemId && !b.rowId);
                      if (!block) return null;
                      
                      return (
                        <div
                          key={block.id}
                          className={`${
                            block.position === 'left' ? 'float-left mr-8 mb-6' :
                            block.position === 'right' ? 'float-right ml-8 mb-6' :
                            block.position === 'center' ? 'mx-auto mb-10' : 'w-full mb-10'
                          } ${block.position === 'full' ? 'clear-both' : ''}`}
                          style={{
                            width: `${block.width}%`,
                            maxWidth: '100%'
                          }}
                        >
                          {renderBlockContent(block)}
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
    </div>
  );
  
  // Helper function to render block content based on type
  function renderBlockContent(block: NewsletterBlock) {
    switch (block.type) {
      case 'text':
        return (
          <div
            style={{
              color: block.styling.fontColor || '#000000',
              fontSize: block.styling.fontSize || '16px',
            }}
            className={`prose max-w-none ${getTextAlignmentClass(block.position)} dark:prose-invert`}
          >
            <ReactMarkdown remarkPlugins={[remarkBreaks]}>{block.content}</ReactMarkdown>
          </div>
        );
        
      case 'image':
        return block.content ? (
          <div 
            className="rounded-xl overflow-hidden shadow-lg mx-auto"
            style={{
              width: `${block.width || 100}%`,
              maxWidth: '100%'
            }}
          >
            <Image
              src={block.content}
              alt="Newsletter image"
              width={1200}
              height={800}
              className="w-full h-auto"
              loading="lazy"
              sizes="(max-width:768px) 100vw, 800px"
            />
          </div>
        ) : null;
        
      case 'youtube':
        return block.content ? (
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
        ) : null;
        
      case 'instagram':
        return block.content ? (
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700">
            {/* Accept either full embed HTML or a post URL */}
            {block.content.includes('<blockquote') || block.content.includes('<iframe') ? (
              <div dangerouslySetInnerHTML={{ __html: block.content }} />
            ) : (
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={block.content}
                data-instgrm-version="14"
                style={{ background: '#fff', border: 0, margin: '1px', maxWidth: '540px', width: 'calc(100% - 2px)' }}
              />
            )}
            <script async src="https://www.instagram.com/embed.js" />
          </div>
        ) : null;
        
      default:
        return null;
    }
  }
}
