import React, { useState } from 'react';
import { ConciergeMessage, INITIAL_CONCIERGE_MESSAGES, askSanaaConcierge } from '../../services/aiConcierge';
import { X, Send, Sparkles, Shield, MapPin, Wallet, Car } from 'lucide-react';
import { Language } from '../../types';

interface ConciergeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onQuickBook?: () => void;
}

export const ConciergeDrawer: React.FC<ConciergeDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  onQuickBook
}) => {
  const [messages, setMessages] = useState<ConciergeMessage[]>(INITIAL_CONCIERGE_MESSAGES);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const isAr = lang === 'ar';

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ConciergeMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const responseText = await askSanaaConcierge(query, lang);
      const botMsg: ConciergeMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: ConciergeMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: isAr ? 'يسعدنا خدمتك عبر الهاتف المباشر +967 771 234 567 أو زيارة مكتبنا في حدة شارع القدس.' : 'Please contact our direct dispatch desk at +967 771 234 567.',
        timestamp: 'الآن'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickPrompts = [
    { label: isAr ? 'ما هي متطلبات الضمانة القانونية؟' : 'Legal guarantee requirements?', query: 'ما هي متطلبات الضمانة القانونية لتأجير السيارات الفاخرة وفق القانون اليمني؟' },
    { label: isAr ? 'تفاصيل رحلة صنعاء ⇄ عدن' : 'Sanaa to Aden route details', query: 'أخبرني عن مسار رحلة صنعاء إلى عدن، كم يستغرق وما هي حالة الطريق ونقاط التفتيش؟' },
    { label: isAr ? 'طرق الدفع عبر المحافظ الإلكترونية' : 'Payment via Yemen Wallets', query: 'كيف أسدد عبر محفظة الكريمي أو فلوسك أو ون كاش؟' },
    { label: isAr ? 'خدمة التوصيل المباشر في صنعاء' : 'Direct delivery in Sanaa', query: 'كيف تعمل خدمة التوصيل المباشر لباب المنزل في صنعاء؟' }
  ];

  return (
    <div className="fixed inset-y-0 end-0 z-50 w-full sm:w-96 bg-slate-900/95 border-s border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>{isAr ? 'خدمة العملاء والاستفسارات' : 'Customer Support & Inquiries'}</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">24/7</span>
            </h3>
            <div className="text-[11px] text-slate-400">
              {isAr ? 'الشركة المتحدة لتأجير السيارات — صنعاء' : 'United Car Rental - Sana’a'}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none whitespace-pre-line'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-slate-400 text-xs p-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{isAr ? 'ممثل خدمة العملاء يكتب...' : 'Typing...'}</span>
          </div>
        )}
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-950/40 flex flex-wrap gap-1.5">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp.query)}
            className="text-[11px] px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:border-amber-500/40 hover:text-amber-300 transition"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isAr ? 'اسأل عن الطرق، الضمانات، أو المركبات...' : 'Ask about routes, guarantees, fleet...'}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 disabled:opacity-40 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
