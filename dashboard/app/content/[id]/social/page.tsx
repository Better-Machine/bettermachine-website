'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  html: string;
  feature_image: string | null;
  tags: { name: string; slug: string }[];
}

interface SocialVariant {
  platform: 'linkedin' | 'x' | 'instagram';
  title: string;
  content: string;
  hashtags: string[];
  imageUrl: string | null;
  characterCount: number;
}

const PLATFORM_INFO = {
  linkedin: {
    name: 'LinkedIn',
    maxChars: 3000,
    description: 'Professional, longer-form content',
    color: 'bg-blue-500/20 text-blue-400',
  },
  x: {
    name: 'X / Twitter',
    maxChars: 280,
    description: 'Short, punchy, thread-friendly',
    color: 'bg-neutral-500/20 text-neutral-400',
  },
  instagram: {
    name: 'Instagram',
    maxChars: 2200,
    description: 'Visual-first, caption + hashtags',
    color: 'bg-pink-500/20 text-pink-400',
  },
};

export default function SocialGenerationPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [variants, setVariants] = useState<SocialVariant[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/ghost/posts/${id}`);
      const data = await response.json();
      
      if (data.success && data.posts?.[0]) {
        const post = data.posts[0];
        setPost(post);
        
        // Generate social variants
        const generated = generateVariants(post);
        setVariants(generated);
        
        // Initialize edited content
        const initial: Record<string, string> = {};
        generated.forEach(v => {
          initial[v.platform] = formatContent(v);
        });
        setEditedContent(initial);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateVariants = (post: Post): SocialVariant[] => {
    const plainText = post.html?.replace(/<[^>]*>/g, '').slice(0, 500) || post.excerpt || '';
    const tags = post.tags || [];
    
    return [
      {
        platform: 'linkedin',
        title: post.title,
        content: `${post.title}\n\n${plainText.slice(0, 400)}...\n\nRead more:`,
        hashtags: tags.slice(0, 5).map(t => `#${t.slug}`),
        imageUrl: post.feature_image,
        characterCount: post.title.length + plainText.length + 50,
      },
      {
        platform: 'x',
        title: post.title,
        content: `${post.title}\n\n${plainText.slice(0, 150)}...`,
        hashtags: tags.slice(0, 3).map(t => `#${t.slug}`),
        imageUrl: post.feature_image,
        characterCount: post.title.length + 150 + 30,
      },
      {
        platform: 'instagram',
        title: post.title,
        content: `${post.title}\n\n${plainText.slice(0, 300)}`,
        hashtags: [...tags.slice(0, 8).map(t => `#${t.slug}`), '#AI', '#startup'],
        imageUrl: post.feature_image,
        characterCount: 300 + 100,
      },
    ];
  };

  const formatContent = (variant: SocialVariant): string => {
    const hashtags = variant.hashtags.join(' ');
    return `${variant.content}\n\n${hashtags}`;
  };

  const copyToClipboard = (platform: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(platform);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleContentChange = (platform: string, value: string) => {
    setEditedContent(prev => ({ ...prev, [platform]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Generating social variants...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-6">
        <div className="text-red-400">Post not found</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/content">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Content
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Generate Social Posts</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Original Post Preview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Original Post
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {post.feature_image && (
              <img
                src={post.feature_image}
                alt={post.title}
                className="w-full h-40 object-cover rounded-md"
              />
            )}
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-4">
              {post.excerpt || post.html?.replace(/<[^>]*>/g, '').slice(0, 200)}
            </p>
            <div className="flex flex-wrap gap-1">
              {post.tags.map(tag => (
                <Badge key={tag.slug} variant="secondary" className="text-xs">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Variants */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="linkedin">
            <TabsList className="mb-4">
              {variants.map(v => (
                <TabsTrigger key={v.platform} value={v.platform}>
                  {PLATFORM_INFO[v.platform].name}
                </TabsTrigger>
              ))}
            </TabsList>

            {variants.map(variant => {
              const platform = PLATFORM_INFO[variant.platform];
              const content = editedContent[variant.platform] || formatContent(variant);
              const charCount = content.length;
              const isOverLimit = charCount > platform.maxChars;

              return (
                <TabsContent key={variant.platform} value={variant.platform}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={platform.color}>
                            {platform.name}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {platform.description}
                          </span>
                        </div>
                        <div className={`text-sm ${isOverLimit ? 'text-red-400' : 'text-muted-foreground'}`}>
                          {charCount} / {platform.maxChars}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {variant.imageUrl && (
                        <div className="relative">
                          <img
                            src={variant.imageUrl}
                            alt="Post image"
                            className="w-full h-48 object-cover rounded-md"
                          />
                          <Badge className="absolute top-2 right-2 bg-black/50">
                            Will be attached
                          </Badge>
                        </div>
                      )}

                      <Textarea
                        value={content}
                        onChange={(e) => handleContentChange(variant.platform, e.target.value)}
                        className="min-h-[200px] font-mono text-sm"
                        placeholder={`Write your ${platform.name} post...`}
                      />

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(variant.platform, content)}
                          >
                            {copied === variant.platform ? (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy
                              </>
                            )}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isOverLimit}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Queue to Buffer
                          </Button>
                        </div>

                        {isOverLimit && (
                          <span className="text-sm text-red-400">
                            Over {platform.maxChars} character limit
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
