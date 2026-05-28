// Ghost CMS Content API client
// Docs: https://ghost.org/docs/content-api/

const GHOST_URL = process.env.GHOST_URL || "http://192.168.50.32:2368";
const GHOST_API_KEY = process.env.GHOST_CONTENT_API_KEY || "";

export interface GhostPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  html: string;
  published_at: string;
  feature_image?: string;
  primary_author?: {
    name: string;
    profile_image?: string;
  };
  tags?: { name: string; slug: string }[];
}

export interface GhostTag {
  id: string;
  slug: string;
  name: string;
  description?: string;
}

// Fetch all published posts
export async function getPosts(limit: number = 10): Promise<GhostPost[]> {
  if (!GHOST_API_KEY) {
    console.warn("Ghost API key not configured");
    return [];
  }

  try {
    const res = await fetch(
      `${GHOST_URL}/ghost/api/content/posts/?key=${GHOST_API_KEY}&limit=${limit}&include=authors,tags`,
      { next: { revalidate: 300 } } // Cache for 5 minutes
    );

    if (!res.ok) {
      throw new Error(`Ghost API error: ${res.status}`);
    }

    const data = await res.json();
    return data.posts || [];
  } catch (error) {
    console.error("Failed to fetch Ghost posts:", error);
    return [];
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  if (!GHOST_API_KEY) {
    return null;
  }

  try {
    const res = await fetch(
      `${GHOST_URL}/ghost/api/content/posts/slug/${slug}/?key=${GHOST_API_KEY}&include=authors,tags`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      throw new Error(`Ghost API error: ${res.status}`);
    }

    const data = await res.json();
    return data.posts?.[0] || null;
  } catch (error) {
    console.error("Failed to fetch Ghost post:", error);
    return null;
  }
}

// Fetch posts by tag
export async function getPostsByTag(tag: string, limit: number = 10): Promise<GhostPost[]> {
  if (!GHOST_API_KEY) {
    return [];
  }

  try {
    const res = await fetch(
      `${GHOST_URL}/ghost/api/content/posts/?key=${GHOST_API_KEY}&filter=tag:${tag}&limit=${limit}&include=authors,tags`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      throw new Error(`Ghost API error: ${res.status}`);
    }

    const data = await res.json();
    return data.posts || [];
  } catch (error) {
    console.error("Failed to fetch Ghost posts by tag:", error);
    return [];
  }
}

// Format date for display
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
