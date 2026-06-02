'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Share2, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: 'draft' | 'published' | 'scheduled';
  feature_image: string | null;
  published_at: string | null;
  updated_at: string;
  tags: { name: string; slug: string }[];
}

export default function ContentPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'published'>('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ghost/posts?limit=100');
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.posts);
      } else {
        setError(data.error || 'Failed to fetch posts');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = activeTab === 'all' 
    ? posts 
    : posts.filter(p => p.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'draft': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'scheduled': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <h3 className="text-red-400 font-medium mb-2">Connection Error</h3>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <p className="text-sm text-muted-foreground">
            Make sure Ghost is running on http://100.69.226.55:2368 and 
            GHOST_ADMIN_API_KEY is configured in environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Content</h1>
          <p className="text-muted-foreground">
            Manage blog posts and social media content
          </p>
        </div>
        <Link href="/content/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList>
          <TabsTrigger value="all">All ({posts.length})</TabsTrigger>
          <TabsTrigger value="draft">Drafts ({posts.filter(p => p.status === 'draft').length})</TabsTrigger>
          <TabsTrigger value="published">Published ({posts.filter(p => p.status === 'published').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-4">
            {filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No {activeTab !== 'all' ? activeTab : ''} posts found.
                  </p>
                  <Link href="/content/new" className="inline-block mt-4">
                    <Button variant="outline">Create your first post</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredPosts.map((post) => (
                <Card key={post.id} className="group">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {post.feature_image ? (
                        <img
                          src={post.feature_image}
                          alt={post.title}
                          className="w-24 h-16 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-24 h-16 bg-muted rounded-md flex items-center justify-center">
                          <span className="text-muted-foreground text-xs">No image</span>
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                          {post.tags.map((tag) => (
                            <Badge key={tag.slug} variant="secondary" className="text-xs">
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="font-semibold truncate">{post.title || 'Untitled'}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {post.excerpt || 'No excerpt'}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>
                            Updated: {new Date(post.updated_at).toLocaleDateString()}
                          </span>
                          {post.published_at && (
                            <span>
                              Published: {new Date(post.published_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/content/${post.id}/edit`}>
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/content/${post.id}/preview`}>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/content/${post.id}/social`}>
                          <Button size="sm" variant="ghost" title="Generate social posts">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
