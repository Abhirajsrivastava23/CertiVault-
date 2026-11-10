'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ArrowRight, 
  ExternalLink, 
  RotateCcw, 
  ChevronDown, 
  ShieldCheck, 
  Loader2,
  HelpCircle,
  Zap,
  MessageSquare
} from 'lucide-react';

interface Action {
  label: string;
  url: string;
  variant?: 'primary' | 'secondary';
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actions?: Action[];
  suggestedPrompts?: string[];
  timestamp: string;
}

const INITIAL_MESSAGE: Message = {
  id: 'msg-init',
  role: 'assistant',
  content: `Namaste! 👋 Main **CertiVault AI Assistant** hu.\n\nMain aapko genuine IT exam vouchers dhoondhne, vendor discounts calculate karne, aur Pearson VUE / PSI redemption samajhne mein help kar sakta hu.\n\nAap kisi bhi exam code (jaise **AZ-900**, **AWS SAA-C03**, **CCNA**, **Security+**) ya refund policy ke bare mein pooch sakte hain!`,
  actions: [
    { label: 'Browse All Certifications', url: '/certifications', variant: 'primary' },
    { label: 'Interactive Career Finder', url: '/career-finder', variant: 'secondary' },
  ],
  suggestedPrompts: [
    'Microsoft Azure AZ-900 Price',
    'Best AWS Cloud Voucher',
    'How to redeem on Pearson VUE?',
    'Refund & Guarantee Policy',
  ],
  timestamp: 'Just now',
};

export function CertiVaultAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.slice(-4).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history,
        }),
      });

      const data = await res.json();

      if (data.success && data.reply) {
        const assistantMsg: Message = {
          id: `msg-asst-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          actions: data.actions || [],
          suggestedPrompts: data.suggestedPrompts || [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error || 'Failed to get answer');
      }
    } catch (err) {
      const errorMsg: Message = {
        id: `msg-err-${Date.now()}`,
        role: 'assistant',
        content: 'Maaf kijiye, temporary connection issue hai. Aap hamare [Help Desk](/support) par directly query check kar sakte hain ya dobara try karein.',
        actions: [{ label: 'Open Support Desk', url: '/support', variant: 'primary' }],
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        
        {/* Subtle helper pill on desktop when closed */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs text-blue-200 shadow-xl backdrop-blur-md hover:border-blue-400 hover:text-white transition-all animate-bounce"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span className="font-semibold">Ask CertiVault AI</span>
          </button>
        )}

        {/* Main Floating Circle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle CertiVault AI Assistant"
          className="relative h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 group"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <>
              <Bot className="h-7 w-7 text-white group-hover:rotate-6 transition-transform" />
              {/* Pulsing online badge */}
              <span className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-900" />
              </span>
            </>
          )}
        </button>

      </div>

      {/* Expandable Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[calc(100vh-7rem)] rounded-3xl border border-slate-700/80 bg-slate-900/95 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-slate-900 px-5 py-4 border-b border-slate-700/80 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-white/20 flex items-center justify-center shadow-glow">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm tracking-tight">CertiVault AI Assistant</h3>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.2 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-blue-200">Instant Exam Finder & Portal Support</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                title="Reset Conversation"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="h-7 w-7 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0 mt-0.5 text-blue-400">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-2.5 ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-800/90 border border-slate-700/80 text-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {/* Message Prose with formatted Markdown support */}
                  <div className="leading-relaxed whitespace-pre-line text-xs">
                    {msg.content}
                  </div>

                  {/* Action Buttons if returned */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-2 border-t border-slate-700/60">
                      {msg.actions.map((act, idx) => (
                        <Link
                          key={idx}
                          href={act.url}
                          onClick={() => setIsOpen(false)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-[11px] inline-flex items-center gap-1.5 transition-all ${
                            act.variant === 'primary'
                              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                              : 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600'
                          }`}
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Suggested Follow-up Prompts */}
                  {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                    <div className="pt-2 space-y-1.5 border-t border-slate-700/50">
                      <span className="text-[10px] text-slate-400 block font-medium">Quick suggestions:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedPrompts.map((prompt, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => handleSendMessage(prompt)}
                            className="text-left text-[11px] px-2.5 py-1 rounded-lg bg-slate-900/80 border border-blue-500/30 text-blue-300 hover:bg-blue-950/80 hover:text-white transition-colors"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <span className="block text-[10px] text-slate-400 text-right opacity-70">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="h-7 w-7 rounded-lg bg-blue-700 flex items-center justify-center shrink-0 mt-0.5 text-white">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Thinking / Loading indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="h-7 w-7 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0 text-blue-400">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl rounded-bl-none p-3.5 bg-slate-800/90 border border-slate-700/80 text-blue-300 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                  <span className="text-xs">Searching CertiVault catalog & policies...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-950/90 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask e.g. AZ-900 price, how to redeem..."
                disabled={isLoading}
                className="flex-1 h-11 px-3.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="h-11 w-11 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white flex items-center justify-center shrink-0 transition-colors shadow-md"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 px-1">
              <span className="flex items-center gap-1 text-slate-400">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                Pearson VUE & PSI Verified
              </span>
              <span>CertiVault AI Engine</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
