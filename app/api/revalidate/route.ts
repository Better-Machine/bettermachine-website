import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// POST /api/revalidate - Revalidate static pages after CMS update
export async function POST(request: NextRequest) {
  try {
    const { path, tag, secret } = await request.json();
    
    // Verify secret (should match env var)
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: "Invalid secret" },
        { status: 401 }
      );
    }
    
    if (path) {
      revalidatePath(path);
      return NextResponse.json({ 
        revalidated: true, 
        path,
        message: `Revalidated path: ${path}` 
      });
    }
    
    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ 
        revalidated: true, 
        tag,
        message: `Revalidated tag: ${tag}` 
      });
    }
    
    return NextResponse.json(
      { error: "Missing path or tag" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error revalidating:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
