import React, { useState } from 'react';
import { Upload, Link as LinkIcon, Sparkles, Image as ImageIcon, Check } from 'lucide-react';
import { generateAiImageFromPrompt } from '../../services/aiStudioGenerator';

interface ImageSourceFieldProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
  dimensionsNote?: string;
}

export const ImageSourceField: React.FC<ImageSourceFieldProps> = ({
  label,
  value,
  onChange,
  dimensionsNote
}) => {
  const [mode, setMode] = useState<'url' | 'upload' | 'ai'>('url');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const resultUrl = await generateAiImageFromPrompt(aiPrompt);
      onChange(resultUrl);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
          <span>{label}</span>
        </label>

        {/* 3-Mode Selector */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 transition ${
              mode === 'upload' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>رفع من الجهاز</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 transition ${
              mode === 'url' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>رابط مباشر</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('ai')}
            className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 transition ${
              mode === 'ai' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>توليد بالذكاء الاصطناعي</span>
          </button>
        </div>
      </div>

      {dimensionsNote && (
        <div className="text-[11px] text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5 rounded-lg">
          📐 {dimensionsNote}
        </div>
      )}

      {/* Mode 1: Upload */}
      {mode === 'upload' && (
        <div className="flex items-center gap-3">
          <label className="flex-1 cursor-pointer border border-dashed border-slate-700 hover:border-amber-500 rounded-xl p-3 text-center transition bg-slate-900/50">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="text-xs text-slate-300 font-medium flex items-center justify-center gap-2">
              <Upload className="w-4 h-4 text-amber-400" />
              <span>اضغط لاختيار صورة من جهازك (PNG, JPG, WEBP)</span>
            </div>
          </label>
        </div>
      )}

      {/* Mode 2: Direct URL */}
      {mode === 'url' && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... أو مسار الصورة"
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500"
          />
        </div>
      )}

      {/* Mode 3: AI Prompt */}
      {mode === 'ai' && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="صف الصورة المطلوبة... مثال: سيارة لاندكروزر سوداء فاخرة أمام جبال صنعاء وقت الغروب"
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          />
          <button
            type="button"
            onClick={handleAiGenerate}
            disabled={isGenerating || !aiPrompt.trim()}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'جارِ التوليد...' : 'توليد بالذكاء الاصطناعي'}</span>
          </button>
        </div>
      )}

      {/* Quick Preview Thumbnail */}
      {value && (
        <div className="flex items-center gap-3 pt-1">
          <img
            src={value}
            alt="Preview"
            referrerPolicy="no-referrer"
            className="w-16 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
          />
          <span className="text-[11px] text-emerald-400 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>الصورة جاهزة ومطبقة حياً</span>
          </span>
        </div>
      )}
    </div>
  );
};
