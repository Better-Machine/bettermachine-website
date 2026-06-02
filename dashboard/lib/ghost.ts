/**
 * Ghost CMS API Client
 * Connects to Ghost on .32 (100.69.226.55:2368)
 */

const GHOST_URL = process.env.GHOST_URL || 'http://100.69.226.55:2368';
const GHOST_ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY || '';

interface GhostPost {
  id: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  featured: boolean;
  status: 'draft' | 'published' | 'scheduled';
  visibility: 'public' | 'members' | 'paid';
  created_at: string;
  updated_at: string;
  published_at: string | null;
  tags: GhostTag[];
  authors: GhostAuthor[];
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
}

interface GhostTag {
  id: string;
  name: string;
  slug: string;
}

interface GhostAuthor {
  id: string;
  name: string;
  slug: string;
  profile_image: string | null;
}

interface SocialVariant {
  platform: 'linkedin' | 'x' | 'instagram';
  title: string;
  content: string;
  hashtags: string[];
  imageUrl: string | null;
  characterCount: number;
}

/**
 * Generate JWT token for Ghost Admin API
 */
function generateGhostJWT(apiKey: string): string {
  const [id, secret] = apiKey.split(':');
  if (!id || !secret) {
    throw new Error('Invalid Ghost API key format. Expected "id:secret"');
  }

  // Simple JWT generation (in production, use a proper JWT library)
  const header = { alg: 'HS256', typ: 'JWT', kid: id };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iat: now,
    exp: now + 300, // 5 minutes
    aud: '/admin/',
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  
  const data = `${encodedHeader}.${encodedPayload}`;
  const crypto = require('crypto');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('base64url');

  return `${data}.${signature}`;
}

/**
 * Make authenticated request to Ghost Admin API
 */
async function ghostRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
  if (!GHOST_ADMIN_API_KEY) {
    throw new Error('GHOST_ADMIN_API_KEY not configured');
  }

  const token = generateGhostJWT(GHOST_ADMIN_API_KEY);
  const url = `${GHOST_URL}/ghost/api/admin/${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Ghost ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Ghost API error: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Content API (public read-only access)
 */
export async function getPosts(
  filter?: { status?: string; tag?: string; author?: string },
  limit: number = 10,
  page: number = 1
): Promise<{ posts: GhostPost[]; meta: { pagination: { total: number; pages: number } } }> {
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  params.append('page', page.toString());
  params.append('include', 'tags,authors');
  
  if (filter?.status) {
    params.append('filter', `status:${filter.status}`);
  }
  if (filter?.tag) {
    params.append('filter', `tag:${filter.tag}`);
  }

  // Use Content API for public reads (no auth needed)
  const url = `${GHOST_URL}/ghost/api/content/posts/?${params.toString()}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Ghost Content API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Admin API - Get all posts (including drafts)
 */
export async function getAllPosts(
  status?: 'draft' | 'published' | 'scheduled',
  limit: number = 50
): Promise<{ posts: GhostPost[] }> {
  const filter = status ? `status:${status}` : undefined;
  const endpoint = filter 
    ? `posts/?limit=${limit}&include=tags,authors&filter=${filter}`
    : `posts/?limit=${limit}&include=tags,authors`;
  
  return ghostRequest(endpoint);
}

/**
 * Get a single post by ID
 */
export async function getPost(id: string): Promise<{ posts: GhostPost[] }> {
  return ghostRequest(`posts/${id}/?include=tags,authors`);
}

/**
 * Create a new post
 */
export async function createPost(post: Partial<GhostPost>): Promise<{ posts: GhostPost[] }> {
  return ghostRequest('posts/', {
    method: 'POST',
    body: JSON.stringify({ posts: [post] }),
  });
}

/**
 * Update a post
 */
export async function updatePost(
  id: string, 
  post: Partial<GhostPost>
): Promise<{ posts: GhostPost[] }> {
  return ghostRequest(`posts/${id}/`, {
    method: 'PUT',
    body: JSON.stringify({ posts: [post] }),
  });
}

/**
 * Publish a draft post
 */
export async function publishPost(id: string): Promise<{ posts: GhostPost[] }> {
  return ghostRequest(`posts/${id}/`, {
    method: 'PUT',
    body: JSON.stringify({
      posts: [{ status: 'published' }],
    }),
  });
}

/**
 * Upload image to Ghost
 */
export async function uploadImage(file: File): Promise<{ images: { url: string }[] }> {
  const formData = new FormData();
  formData.append('file', file);

  const token = generateGhostJWT(GHOST_ADMIN_API_KEY);
  const response = await fetch(`${GHOST_URL}/ghost/api/admin/images/`, {
    method: 'POST',
    headers: {
      Authorization: `Ghost ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Image upload failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Generate social media variants from a post
 */
export function generateSocialVariants(post: GhostPost): SocialVariant[] {
  const variants: SocialVariant[] = [];
  
  // LinkedIn variant (longer, professional)
  const linkedInContent = post.excerpt || post.html.replace(/<[^>]*>/g, '').slice(0, 300);
  variants.push({
    platform: 'linkedin',
    title: post.title,
    content: linkedInContent,
    hashtags: post.tags.map(t => `#${t.slug}`).slice(0, 5),
    imageUrl: post.feature_image,
    characterCount: linkedInContent.length + post.title.length + 50, // +hashtags
  });

  // X/Twitter variant (short, punchy)
  const xContent = post.excerpt?.slice(0, 200) || post.title;
  variants.push({
    platform: 'x',
    title: post.title,
    content: xContent,
    hashtags: post.tags.map(t => `#${t.slug}`).slice(0, 3),
    imageUrl: post.feature_image,
    characterCount: xContent.length + post.title.length + 30,
  });

  // Instagram variant (visual-focused)
  variants.push({
    platform: 'instagram',
    title: post.title,
    content: post.excerpt?.slice(0, 150) || 'Check out our latest post!',
    hashtags: [...post.tags.map(t => `#${t.slug}`), '#bettermachine', '#AI'].slice(0, 10),
    imageUrl: post.feature_image,
    characterCount: 150 + 100, // caption + hashtags
  });

  return variants;
}

/**
 * Check Ghost connection status
 */
export async function checkGhostConnection(): Promise<{
  connected: boolean;
  version?: string;
  error?: string;
}> {
  try {
    // Try Content API first (no auth)
    const response = await fetch(`${GHOST_URL}/ghost/api/content/posts/?limit=1`);
    
    if (!response.ok) {
      return { connected: false, error: `HTTP ${response.status}` };
    }

    const data = await response.json();
    return { 
      connected: true, 
      version: '6.x', // Ghost version
    };
  } catch (error) {
    return { 
      connected: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export type { GhostPost, GhostTag, GhostAuthor, SocialVariant };
