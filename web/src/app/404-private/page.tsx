export default function NotFoundPrivate() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="text-[#B87333] text-sm uppercase tracking-[0.3em] mb-4">404 · Private</div>
        <h1 className="text-4xl font-light mb-4">This route isn't on the public site.</h1>
        <p className="text-[#A0A0A0] mb-8">
          The internal dashboard is hosted at{" "}
          <span className="text-[#FAFAFA] font-mono">private.bettermachine.ai</span>.
          If you reached this in error, the route you tried is gated to that hostname.
        </p>
        <a
          href="https://bettermachine.ai"
          className="inline-block px-5 py-2 border border-[#B87333]/50 text-[#B87333] hover:bg-[#B87333] hover:text-[#0A0A0A] transition-all"
        >
          Go to public site
        </a>
      </div>
    </div>
  );
}
