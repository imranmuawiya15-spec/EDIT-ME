import React, { useState, useEffect } from 'react';
import { HireMessage } from '../types';
import { ADMIN_EMAIL } from '../utils/storage';
import { X, Send, Mail, DollarSign, Clock, CheckCircle2, Copy, Check, Sparkles } from 'lucide-react';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitMessage: (message: HireMessage) => void;
  initialBudget?: number;
  initialProjectTitle?: string;
}

export const HireModal: React.FC<HireModalProps> = ({
  isOpen,
  onClose,
  onSubmitMessage,
  initialBudget = 50,
  initialProjectTitle = '',
}) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectType, setProjectType] = useState('Shorts / Reels (9:16)');
  const [budget, setBudget] = useState(initialBudget);
  const [deadline, setDeadline] = useState('Within 48 Hours');
  const [description, setDescription] = useState('');
  const [rawFootageLink, setRawFootageLink] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (initialBudget) setBudget(initialBudget);
  }, [initialBudget]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !description.trim()) return;

    const newMessage: HireMessage = {
      id: `hire-${Date.now()}`,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      projectType,
      budget: Math.min(1000, Math.max(3, Number(budget))),
      deadline,
      description: description.trim(),
      rawFootageLink: rawFootageLink.trim(),
      createdAt: 'Just now',
      status: 'new',
    };

    onSubmitMessage(newMessage);
    setIsSubmitted(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(ADMIN_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Generate mailto link
  const mailtoSubject = encodeURIComponent(`[Video Project Hire - $${budget}] ${projectType} from ${clientName || 'Client'}`);
  const mailtoBody = encodeURIComponent(
    `Hi Muawiya,\n\nI would like to hire you for video editing in Adobe Premiere Pro.\n\nProject Scope: ${projectType}\nAgreed Budget: $${budget}\nDeadline: ${deadline}\nRaw Footage / Drive Link: ${rawFootageLink || 'Will attach in follow-up'}\n\nProject Details:\n${description}\n\nFrom,\n${clientName} (${clientEmail})`
  );
  const directMailtoUrl = `mailto:${ADMIN_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0e111a] border border-[#232a3f] rounded-2xl shadow-2xl p-6 sm:p-8 my-8">
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white">Project Request Sent!</h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md mx-auto">
              Your inquiry has been stored directly in Muawiya’s Admin Inbox. You can also send this brief directly via email for immediate priority response.
            </p>

            <div className="p-4 bg-[#141928] border border-[#232c44] rounded-xl text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Budget Selected:</span>
                <span className="text-emerald-400 font-bold font-mono">${budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Direct Editor Email:</span>
                <span className="text-white font-medium">{ADMIN_EMAIL}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={directMailtoUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg shadow-md transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Email App</span>
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#171c2b] hover:bg-[#20273a] text-zinc-300 text-xs font-semibold rounded-lg transition-colors border border-[#273045]"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Muawiya's Email</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="text-xs text-zinc-500 hover:text-zinc-300 pt-2 block mx-auto"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Hire Muawiya</h2>
                <p className="text-xs text-zinc-400">
                  Direct Adobe Premiere Pro Editing · Starting $3 to $1000
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Jason Blake"
                    className="w-full bg-[#141825] border border-[#252c42] rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="jason@example.com"
                    className="w-full bg-[#141825] border border-[#252c42] rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Project Type
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-[#141825] border border-[#252c42] rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Shorts / Reels (9:16)">Shorts / Reels (9:16)</option>
                    <option value="YouTube Longform (16:9)">YouTube Longform (16:9)</option>
                    <option value="Documentary / Cinematic">Documentary / Cinematic</option>
                    <option value="Gaming Beat-Sync Montage">Gaming Beat-Sync Montage</option>
                    <option value="Commercial / Product Promo">Commercial / Product Promo</option>
                    <option value="Monthly Retainer Partnership">Monthly Retainer Partnership</option>
                    <option value="Custom Project">Other Custom Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Budget ($3 to $1000)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 font-mono text-sm">$</span>
                    <input
                      type="number"
                      min={3}
                      max={1000}
                      required
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full bg-[#141825] border border-[#252c42] rounded-lg pl-7 pr-3 py-2 text-xs sm:text-sm text-white font-mono placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Timeline / Desired Deadline
                </label>
                <select
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-[#141825] border border-[#252c42] rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Within 24 Hours (Rush)">Within 24 Hours (Rush)</option>
                  <option value="Within 48 Hours">Within 48 Hours</option>
                  <option value="3 to 5 Days">3 to 5 Days</option>
                  <option value="Flexible / Ongoing">Flexible / Ongoing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Raw Footage / Assets Link (Drive / Dropbox / WeTransfer)
                </label>
                <input
                  type="url"
                  value={rawFootageLink}
                  onChange={(e) => setRawFootageLink(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full bg-[#141825] border border-[#252c42] rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Project Brief & Editing Instructions
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your vision, target audience, reference videos, pacing preference, or key sound effect requirements..."
                  className="w-full bg-[#141825] border border-[#252c42] rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400">
                  Direct recipient: <strong className="text-zinc-200">{ADMIN_EMAIL}</strong>
                </span>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-purple-900/40 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
