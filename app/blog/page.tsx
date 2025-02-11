import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";

interface Post {
  id: string;
  title: string;
  text: string;
  image_link: string | null;
  author: string;
  created_at: string; // ISO string
}

const BlogPage = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });
  const posts = (data || []) as Post[];

  const formatPreviewText = (text: string) => {
    const flattenedText = text
      .replace(/\r\n?/g, '\n')
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return flattenedText.length > 300 ? `${flattenedText.slice(0, 300)}...` : flattenedText;
  };

  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="pt-20">
      <div className="container max-w-[1400px] mx-auto px-6 py-16">
        <div className="space-y-12">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Hey, Blue! Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-medium">
              Discover our latest stories and insights
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card 
                key={post.id} 
                className="group overflow-hidden bg-white border border-gray-200 shadow hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                <a href={`/blog/${post.id}`} className="flex flex-col h-full">
                <CardHeader className="p-0">
                  {post.image_link && (
                    <div className="relative overflow-hidden">
                      <AspectRatio ratio={16 / 9 }>
                        <Image
                          src={post.image_link}
                          alt={post.title}
                          fill
                          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </AspectRatio>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex flex-col flex-grow p-8 space-y-6">
                  <div className="flex-1 space-y-3">
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold tracking-tight text-center group-hover:text-blue-600 transition-colors duration-300">
                        {post.title}
                      </h2>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <span>{format(new Date(post.created_at), 'MMMM dd, yyyy')}</span>
                        <span>•</span>
                        <span>{getReadingTime(post.text)} min read</span>
                      </p>
                    </div>
                    <p className="text-gray-600 line-clamp-5 leading-relaxed">{formatPreviewText(post.text)}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 ring-2 ring-blue-500/10">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium">
                          {post.author?.[0] || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm font-medium text-gray-600">
                        By {post.author}
                      </div>
                    </div>
                  </div>
                </CardContent>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;