import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Newsletter {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
  isPublished: boolean;
  authorName: string;
  authorId: string;
}
export default async function NewsletterList() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('newsletters')
    .select('id, title, description, coverImage, createdAt, updatedAt, publishedAt, isPublished, authorName, authorId')
    .eq('isPublished', true)
    .order('publishedAt', { ascending: false });
  const newsletters = (data || []) as Newsletter[];

  const formatDate = (value?: string | null) => {
    if (!value) return 'Published recently';
    const d = new Date(value);
    if (isNaN(d.getTime())) return 'Published recently';
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="pt-20">
      <div className="container max-w-[1400px] mx-auto px-6 py-16">
        <div className="space-y-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Hey Blue! Newsletters
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-medium">
              Stay updated with the latest news and stories
            </p>
          </div>
          {/* Removed ContentTabs for consistency and to avoid missing component errors */}

          {error ? (
            <div className="text-center p-8">
              <div className="inline-block bg-white rounded-lg px-6 py-4 text-red-500 border border-gray-200">
                Error: {error.message}
              </div>
            </div>
          ) : newsletters.length === 0 ? (
            <div className="text-center p-8">
              <div className="inline-block bg-white rounded-lg px-6 py-4 border border-gray-200">
                No newsletters available at this time.
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsletters.map((newsletter) => (
                <Link href={`/newsletter/${newsletter.id}`} key={newsletter.id}>
                  <Card 
                    className="group overflow-hidden bg-white border border-gray-200 shadow hover:shadow-lg transition-all duration-300 h-full"
                  >
                    <CardHeader className="p-0">
                      <AspectRatio ratio={16 / 9}>
                      <div 
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500" 
                        style={{ 
                          backgroundImage: `url(${newsletter.coverImage || 'https://7wz8a9gr1e.ufs.sh/f/IVApE56zliou5uvM5ELa8ClSobrIcLMGuVxqNQ0sPKUYf519'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                      </AspectRatio>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold tracking-tight text-center group-hover:text-blue-600 transition-colors duration-300">
                          {newsletter.title}
                        </h2>
                        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                          <span>{formatDate(newsletter.publishedAt)}</span>
                        </p>
                      </div>
                      <p className="text-gray-600 line-clamp-3 leading-relaxed">
                        {newsletter.description}
                      </p>
                      <div className="pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10 ring-2 ring-blue-500/10">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium">
                              {newsletter.authorName?.[0] || 'H'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-sm font-medium text-gray-600">
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
    </div>
  );
}
