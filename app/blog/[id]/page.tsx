"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

import Header from "@/components/Header";
import Footer from '@/components/Footer';

interface Post {
  id: string;
  title: string;
  text: string;
  imageLink: string;
  createdAt: Timestamp;
  name: string;
  displayImage?: boolean;
}

const BlogPost = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const formatText = (text: string) => {
    return text.split('\\n').map((line, index) => (
      <p key={index} className="text-gray-700 leading-relaxed mb-6">
        {line}
      </p>
    ));
  };

  useEffect(() => {
    window.history.pushState({ prevPage: '/' }, '');
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) return;
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as Post);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
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
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-r from-[#4facfe] to-[#00f2fe] pt-20">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <Alert variant="destructive">
              <AlertDescription>Post not found</AlertDescription>
            </Alert>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <ScrollArea className="min-h-screen bg-gradient-to-r from-[#4facfe] to-[#00f2fe] pt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Button 
            variant="ghost"
            onClick={() => {
              router.push('/blog');
            }}
            className="group mb-8 hover:bg-white/20"
          >
            <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to posts
          </Button>

          <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardContent className="p-0">
              {post.imageLink && (
                <div className={`relative w-full ${post.displayImage ? 'h-[80vh]' : 'h-[60vh]'} overflow-hidden`}>
                  <div className="absolute inset-0 animate-fade-in">
                    <img 
                      src={post.imageLink} 
                      alt={post.title} 
                      className="w-full h-full object-cover object-center scale-105 animate-zoom-in" 
                    />
                    {!post.displayImage && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="px-8 md:px-16 lg:px-24 py-12">
                <div className="max-w-4xl mx-auto space-y-12">
                  <div className="space-y-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
                      {post.title}
                    </h1>

                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 ring-2 ring-blue-500/10">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                          {post.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">By {post.name}</p>
                        <p className="text-sm text-gray-500">
                          {format(post.createdAt.toDate(), 'MMMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="prose prose-lg md:prose-xl max-w-none">
                    {formatText(post.text)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
      <Footer />
    </>
  );
};

export default BlogPost;