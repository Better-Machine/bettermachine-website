import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Better Machine — Internal",
  description: "Private dashboard for managing public site content",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0A] text-silver antialiased">{children}</body>
    </html>
  );
}
