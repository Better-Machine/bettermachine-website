"use client";

import { useState } from "react";

interface ContactFormProps {
  subject?: string;
  onClose?: () => void;
  source?: string;
}

export function ContactForm({ subject, onClose, source }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // For now, just simulate submission
    // TODO: Replace with actual email service (Resend, SendGrid, etc.)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Message Sent</h3>
        <p className="text-slate-400">Thanks for reaching out. We&apos;ll get back to you soon.</p>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-6 text-[#B87333] hover:text-[#B87333]/80 transition-colors"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {source && (
        <div className="text-sm text-slate-500">
          From: {source}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-[#B87333] transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-[#B87333] transition-colors"
          placeholder="you@example.com"
        />
      </div>

      {subject && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Subject
          </label>
          <input
            type="text"
            readOnly
            value={subject}
            className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 rounded-lg text-slate-400 cursor-not-allowed"
          />
        </div>
      )}

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-[#B87333] transition-colors resize-none"
          placeholder="Tell us about your interest..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-[#B87333] hover:bg-[#B87333]/90 disabled:bg-[#B87333]/50 text-black font-medium rounded transition-colors flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}

// Modal wrapper for the contact form
export function ContactModal({ isOpen, onClose, subject, source }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0A0A0A] border border-white/10 rounded-xl p-8 max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
        <ContactForm subject={subject} onClose={onClose} source={source} />
      </div>
    </div>
  );
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject?: string;
  source?: string;
}
