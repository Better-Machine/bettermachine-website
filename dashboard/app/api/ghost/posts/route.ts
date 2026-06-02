import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, createPost, getPosts as getPublicPosts } from '@/lib/ghost';

/**
 * GET /api/ghost/posts
 * List all posts (optionally filter by status)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'draft' | 'published' | 'scheduled' | null;
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    
    const data = await getAllPosts(status || undefined, limit);
    
    return NextResponse.json({ 
      success: true, 
      posts: data.posts || [],
      total: data.posts?.length || 0,
    });
  } catch (error) {
    console.error('Ghost API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/ghost/posts
 * Create a new post
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const post = await createPost({
      title: body.title,
      html: body.html,
      excerpt: body.excerpt,
      status: body.status || 'draft',
      feature_image: body.feature_image,
      tags: body.tags?.map((name: string) => ({ name })),
      meta_title: body.meta_title,
      meta_description: body.meta_description,
    });
    
    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
