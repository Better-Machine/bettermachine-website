export const dynamic = "force-static";

export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bettermachine.ai";
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
