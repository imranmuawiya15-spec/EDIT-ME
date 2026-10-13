import React, { useState } from 'react';
import { HireMessage } from '../types';
import { X, Mail, DollarSign, Clock, ExternalLink, Check, Trash2, Sparkles, Inbox } from 'lucide-react';

interface AdminInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: HireMessage[];
  onUpdateStatus: (id: string, status: HireMessage['status']) => void;
}

export const AdminInboxModal: React.FC<AdminInboxModalProps> = ({
  isOpen,
  onClose,
  messages,
  onUpdateStatus,
}) => {
  const [filter, setFilter] = useState<'all' | 'new' | 'reviewed' | 'contacted'>('all');

  if (!isOpen) return null;

  const filtered = messages.filter((m) => {
    if (filter === 'all') return true;
    return m.status === filter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0c0f18] border border-[#21283d] rounded-2xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] flex flex-col">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Client Inquiries & Hire Inbox</h2>
            <p className="text-xs text-zinc-400">
              Muawiya Admin Control Center · Received messages & project offers
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 mb-6 shrink-0">
          {(['all', 'new', 'reviewed', 'contacted'] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                filter === status
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#141824] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {status === 'all' ? `All Inquiries (${messages.length})` : status}
            </button>
          ))}
        </div>

        {/* Message List */}
        <div className="overflow-y-auto flex-1 space-y-4 pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-xs">
              No inquiries found in this view.
            </div>
          ) : (
            filtered.map((msg) => (
              <div
                key={msg.id}
                className="p-5 bg-[#101420] border border-[#212739] rounded-xl space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{msg.clientName}</h4>
                      <span className="text-xs text-zinc-400 font-mono">
                        &lt;{msg.clientEmail}&gt;
                      </span>
                    </div>
                    <span className="text-xs text-purple-400 font-medium">{msg.projectType}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-lg font-mono font-extrabold text-emerald-400">
                      ${msg.budget}
                    </span>

                    {/* Status Pill */}
                    <select
                      value={msg.status}
                      onChange={(e) =>
                        onUpdateStatus(msg.id, e.target.value as HireMessage['status'])
                      }
                      className="bg-[#171c2b] border border-[#273045] rounded px-2 py-1 text-[11px] text-zinc-300 focus:outline-none"
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="contacted">Contacted</option>
                      <option value="booked">Booked</option>
                    </select>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed bg-[#151928] p-3 rounded-lg border border-[#232a3e]">
                  {msg.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 text-zinc-400">
                  <div className="flex items-center gap-3">
                    <span>Deadline: <strong className="text-zinc-200">{msg.deadline}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>Received {msg.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {msg.rawFootageLink && (
                      <a
                        href={msg.rawFootageLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 underline font-medium"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Footage Link</span>
                      </a>
                    )}

                    <a
                      href={`mailto:${msg.clientEmail}?subject=Re:%20Video%20Editing%20Project%20(${msg.projectType})%20-%20Muawiya&body=Hi%20${encodeURIComponent(msg.clientName)},\n\nThank%20you%20for%20reaching%20out%20about%20your%20project!%20I%20have%20reviewed%20your%20brief%20and%20can%20edit%20this%20in%20Adobe%20Premiere%20Pro.\n\nBest%20regards,\nMuawiya`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply via Email</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
