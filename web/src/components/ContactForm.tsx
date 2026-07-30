"use client";

import { useState } from "react";

interface ContactFormProps {
  subject?: string;
  onClose?: () => void;
  source?: string;
}

export function ContactForm({ subject, onClose, source }: ContactFormProps) {
  const email = "info@bettermachine.ai";
  const subjectLine = subject || "Contact from bettermachine.ai";

  if (onClose) {
    // Modal mode — show email link
    return (
      <div className="text-center py-8 space-y-6">
        <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Get in Touch</h3>
          <p className="text-slate-400 mb-4">
            We&apos;re currently migrating our website. The fastest way to reach us is by email.
          </p>
        </div>
        <a
          href={`mailto:${email}?subject=${encodeURIComponent(subjectLine)}`}
          className="inline-block px-6 py-3 bg-[#B87333] text-white font-semibold rounded-lg
                     hover:bg-[#D4945A] transition-colors"
        >
          Email {email}
        </a>
        {source && (
          <p className="text-xs text-slate-600 mt-2">
            From: {source}
          </p>
        )}
        {subject && (
          <p className="text-xs text-[#B87333]">
            Subject: {subject}
          </p>
        )}
        <button
          onClick={onClose}
          className="text-sm text-slate-500 hover:text-white transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  // Inline mode (on homepage) — just the email link
  return (
    <div className="text-center py-4">
      <a
        href={`mailto:${email}?subject=${encodeURIComponent(subjectLine)}`}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#B87333] text-white font-semibold rounded-lg
                   hover:bg-[#D4945A] transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Email Us
      </a>
      {source && (
        <p className="text-xs text-slate-600 mt-2">
          From: {source}
        </p>
      )}
    </div>
  );
}

// Modal wrapper for the contact form
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject?: string;
  source?: string;
}

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
