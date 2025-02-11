"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from 'next/navigation';

import Header from "@/components/Header";
import Footer from '@/components/Footer';

interface Post {
  id: string;
  title: string;
  text: string;
  imageLink: string;
  createdAt: Timestamp;
  name: string;
}

const BlogPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatPreviewText = (text: string) => {
    const flattenedText = text.replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
    return flattenedText.length > 300 ? `${flattenedText.slice(0, 300)}...` : flattenedText;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const q = query(postsCollection, orderBy('createdAt', 'desc'));
        const postsSnapshot = await getDocs(q);
        const postsData = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Post[];
        setPosts(postsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-r from-[#4facfe] to-[#00f2fe] pt-20">
          <div className="text-center p-8">
            <div className="inline-block bg-white/95 backdrop-blur-sm rounded-lg px-6 py-4 text-red-500">
              Error: {error}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <ScrollArea className="min-h-screen bg-gradient-to-r from-[#4facfe] to-[#00f2fe] pt-20">
        <div className="container max-w-[1400px] mx-auto px-6 py-24">
          <div className="space-y-16">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-sm">
                Hey, Blue! Blog
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium">
                Discover our latest stories and insights
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
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
                ))
              ) : (
                posts.map((post) => (
                  <Card 
                    key={post.id} 
                    className="group overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onClick={() => router.push(`/blog/${post.id}`)}
                  > 
                    <CardHeader className="p-0">
                      {post.imageLink && (
                        <div className="relative overflow-hidden">
                          <AspectRatio ratio={16 / 9}>
                            <img
                              src={post.imageLink}
                              alt={post.title}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                          </AspectRatio>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold tracking-tight text-center group-hover:text-blue-600 transition-colors duration-300">
                          {post.title}
                        </h2>
                        <p className="text-sm text-muted-foreground/80 flex items-center gap-2">
                          <span>{format(post.createdAt.toDate(), 'MMMM dd, yyyy')}</span>
                          <span>•</span>
                          <span>{getReadingTime(post.text)} min read</span>
                        </p>
                      </div>
                      <p className="text-muted-foreground/90 line-clamp-3 leading-relaxed">
                        {formatPreviewText(post.text)}
                      </p>
                      <div className="pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10 ring-2 ring-blue-500/10">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium">
                              {post.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-sm font-medium text-muted-foreground/90">
                            By {post.name}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
      <Footer />
    </>
  );
};

export default BlogPage;