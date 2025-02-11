"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createClient } from '@/utils/supabase/client';


// Supabase row interface (mirrors 'news' table schema)
interface Post {
  id: string;
  title: string;
  text: string;
  image_link: string | null;
  author: string;
  created_at: string; // ISO timestamp
  displayImage?: boolean; // optional custom flags if stored
  isPortrait?: boolean;   // optional custom flags if stored
}

const supabase = createClient();

const BlogPost = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatText = (text: string) => {
    // Normalize Windows newlines, then split on one or more newlines.
    const paragraphs = text
      .replace(/\r\n?/g, '\n')
      .split(/\n+/)
      .map(p => p.trim())
      .filter(p => p.length);
    return paragraphs.map((para, i) => (
      <p key={i} className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap break-words">
        {para}
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
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        if (data) {
          setPost(data as Post);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (error) {
    return (
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        </div>
    );
  }

  if (loading) {
    return (
        <div className="pt-20">
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

  if (!post) {
    return (
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <Alert variant="destructive">
              <AlertDescription>Post not found</AlertDescription>
            </Alert>
          </div>
        </div>
    );
  }

  return (
    <>
      <div className="pt-20">
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
              {post.image_link && (
                <div className={`relative w-full ${post.displayImage ? 'h-[80vh]' : 'h-[60vh]'} overflow-hidden`}>
                  <Image
                    src={post.image_link}
                    alt={post.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain object-center scale-105 animate-zoom-in"
                  />
                  {!post.displayImage && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
                    </>
                  )}
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
                          {post.author?.[0] || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">By {post.author}</p>
                        <p className="text-sm text-gray-500">{format(new Date(post.created_at), 'MMMM dd, yyyy')}</p>
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
      </div>
    </>
  );
};

export default BlogPost;