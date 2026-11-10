'use client';

import React, { useState, useEffect } from 'react';
import { LifeBuoy, Plus, MessageSquare, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { SupportTicket, TicketCategory } from '@/lib/types';
import { formatDate } from '@/lib/utils/formatters';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/Input';

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New ticket form
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<TicketCategory>('Voucher Redemption');
  const [message, setMessage] = useState('');
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTickets = async () => {
    try {
      const res = await fetch('/api/support/tickets');
      const data = await res.json();
      if (data.success) {
        setTickets(data.data || []);
      }
    } catch (err) {
      console.error('Failed to load tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          category,
          message,
          orderId: orderId.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit ticket');
      }

      setIsModalOpen(false);
      setSubject('');
      setMessage('');
      setOrderId('');
      await loadTickets();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error submitting ticket';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return <Badge variant="warning">Open</Badge>;
      case 'in_progress':
        return <Badge variant="primary">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolved</Badge>;
      case 'closed':
        return <Badge variant="default">Closed</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
            Help & Assistance
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Support Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Have questions about voucher application on Pearson VUE, scheduling windows, or invoices? Our team is here to assist.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="shadow-glow gap-1.5 text-xs font-semibold"
        >
          <Plus className="h-4 w-4" />
          <span>Open New Support Ticket</span>
        </Button>
      </div>

      {/* Tickets List */}
      {loading ? (
        <div className="text-center py-16 text-xs text-slate-400">Loading support inquiries...</div>
      ) : tickets.length > 0 ? (
        <div className="space-y-4">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-surface-border bg-surface-card p-6 space-y-3 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-slate-300 bg-surface-50 px-2 py-0.5 rounded border border-surface-border">
                    {t.ticketNumber}
                  </span>
                  <span className="text-xs font-semibold text-primary-light">
                    {t.category}
                  </span>
                  {getStatusBadge(t.status)}
                </div>
                <span className="text-slate-500">
                  Created {formatDate(t.createdAt)}
                </span>
              </div>

              <h4 className="text-base font-bold text-white pt-1">
                {t.subject}
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-surface-200/60 p-4 rounded-xl border border-surface-border">
                {t.message}
              </p>

              {t.orderId && (
                <div className="text-[11px] text-slate-400 pt-1">
                  Linked Order: <strong className="text-slate-200 font-mono">#{t.orderId}</strong>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl border border-surface-border bg-surface-card space-y-4">
          <div className="h-12 w-12 rounded-full bg-surface-50 text-slate-400 mx-auto flex items-center justify-center">
            <LifeBuoy className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-white">No active support tickets</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Need help redeeming your voucher or have questions about testing centers? Open a ticket to reach our specialist support team.
          </p>
          <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)} className="gap-1.5 shadow-glow">
            <Plus className="h-4 w-4" />
            <span>Create First Ticket</span>
          </Button>
        </div>
      )}

      {/* New Ticket Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Open Support Ticket"
        description="Our specialist team will respond within 4-6 business hours."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateTicket} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800/40 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Inquiry Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TicketCategory)}
              className="w-full h-10 rounded-lg bg-surface-200 border border-surface-border text-xs text-white px-3 focus:outline-none focus:border-primary"
            >
              <option value="Voucher Redemption">Voucher Redemption Assistance</option>
              <option value="Payment Issue">Payment & Billing Query</option>
              <option value="Order Inquiry">Order Status & Fulfillment</option>
              <option value="Technical Support">Technical & Scheduling Support</option>
              <option value="General">General Question</option>
            </select>
          </div>

          <Input
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            placeholder="e.g. Question regarding Pearson VUE scheduling date"
          />

          <Input
            label="Order Number (Optional)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. CV-2026-819204"
          />

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Message Details</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Describe your issue or question in detail..."
              className="w-full rounded-lg bg-surface-200 border border-surface-border text-xs text-white p-3 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-surface-border">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
              className="shadow-glow"
            >
              Submit Ticket
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

