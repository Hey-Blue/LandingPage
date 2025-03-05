"use client";

import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import app from '@/firebaseConfig';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
import Footer from '@/components/Footer';
import ContentTabs from '@/components/ContentTabs';

interface Newsletter {
  id?: string;
  title: string;
  description: string;
  coverImage: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  publishedAt?: Timestamp;
  isPublished: boolean;
  authorName: string;
  authorId: string;
}

export default function NewsletterList() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNewsletters = async () => {
      setLoading(true);
      try {
        const db = getFirestore(app);
        const q = query(
          collection(db, 'newsletters'),
          where('isPublished', '==', true),
          orderBy('publishedAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const newsletterData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Newsletter[];

        setNewsletters(newsletterData);
      } catch (err) {
        console.error('Error fetching newsletters:', err);
        setError('Failed to load newsletters. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  const formatDate = (timestamp?: Timestamp) => {
    if (!timestamp) return 'Published recently';
    return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <Header />
      <ScrollArea className="min-h-screen bg-gradient-to-r from-[#4facfe] to-[#00f2fe] pt-20">
        <div className="container max-w-[1400px] mx-auto px-6 py-24">
          <div className="space-y-16">
            <div className="text-center space-y-10 max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-sm">
                Hey Blue! Newsletters
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium">
                Stay updated with the latest news and stories
              </p>
              
              <ContentTabs />
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(6).fill(0).map((_, i) => (
                  <Card key={i} className="overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader className="p-0">
                      <Skeleton className="w-full h-[240px]" />
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-5 w-1/2" />
                      <Skeleton className="h-24 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center p-8">
                <div className="inline-block bg-white/95 backdrop-blur-sm rounded-lg px-6 py-4 text-red-500">
                  Error: {error}
                </div>
              </div>
            ) : newsletters.length === 0 ? (
              <div className="text-center p-8">
                <div className="inline-block bg-white/95 backdrop-blur-sm rounded-lg px-6 py-4">
                  No newsletters available at this time.
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsletters.map((newsletter) => (
                  <Link href={`/newsletter/${newsletter.id}`} key={newsletter.id}>
                    <Card 
                      className="group overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
                    >
                      <CardHeader className="p-0">
                        {newsletter.coverImage ? (
                          <div className="relative overflow-hidden">
                            <AspectRatio ratio={16 / 9}>
                              <img
                                src={newsletter.coverImage}
                                alt={newsletter.title}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                              />
                            </AspectRatio>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        ) : (
                          <AspectRatio ratio={16 / 9}>
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                              <span className="text-2xl font-bold">Hey Blue!</span>
                            </div>
                          </AspectRatio>
                        )}
                      </CardHeader>
                      <CardContent className="p-8 space-y-6">
                        <div className="space-y-3">
                          <h2 className="text-2xl font-bold tracking-tight text-center group-hover:text-blue-600 transition-colors duration-300">
                            {newsletter.title}
                          </h2>
                          <p className="text-sm text-muted-foreground/80 flex items-center justify-center gap-2">
                            <span>{formatDate(newsletter.publishedAt)}</span>
                          </p>
                        </div>
                        <p className="text-muted-foreground/90 line-clamp-3 leading-relaxed">
                          {newsletter.description}
                        </p>
                        <div className="pt-4 border-t">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10 ring-2 ring-blue-500/10">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium">
                                {newsletter.authorName?.[0] || 'H'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium text-muted-foreground/90">
                              By {newsletter.authorName || 'Hey Blue'}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
      <Footer />
    </>
  );
}
