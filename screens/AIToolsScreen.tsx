
import React, { useState } from 'react';
import * as gemini from '../geminiService';

interface AIToolsScreenProps {
  onBack: () => void;
}

const AIToolsScreen: React.FC<AIToolsScreenProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState<"1K" | "2K" | "4K">("1K");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    try {
      const img = await gemini.generateImage(prompt, size);
      setGeneratedImage(img);
    } catch (err) {
      alert("Failed to generate. Ensure API key is valid.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!prompt.trim() || !generatedImage) return;
    setIsLoading(true);
    try {
      const img = await gemini.editImageWithAI(generatedImage, prompt);
      setGeneratedImage(img);
    } catch (err) {
      alert("Failed to edit.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F4F7FA] overflow-hidden">
      <header className="p-6 pb-2 flex items-center justify-between sticky top-0 bg-[#F4F7FA]/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 icon-container text-[#1F2937] active:scale-95 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-black text-[#1F2937]">Creative AI</h1>
        </div>
        <div className="flex gap-2">
          {(["1K", "2K", "4K"] as const).map(s => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${size === s
                ? 'bg-gradient-to-br from-[#2FED9A] to-[#12C784] text-white shadow-lg'
                : 'neumorphic-inset text-[#6B7280]'
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
        <div className="aspect-square w-full rounded-[40px] neumorphic-elevated overflow-hidden relative border-4 border-white transition-all shadow-xl">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F4F7FA]/50 backdrop-blur-md">
              <div className="w-12 h-12 border-4 border-[#2FED9A] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-black text-[#12C784] mt-4 animate-pulse uppercase tracking-[0.2em]">Imagining...</p>
            </div>
          ) : generatedImage ? (
            <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 mt-4">
              <div className="w-20 h-20 icon-container mb-6 scale-125">
                <svg className="w-10 h-10 text-[#1F2937]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#1F2937]">Describe your vision</p>
            </div>
          )}
        </div>

        <div className="space-y-6 pb-4">
          <div className="space-y-3">
            <p className="text-[10px] font-black text-[#6B7280] uppercase tracking-[0.2em] px-4">Prompt</p>
            <div className="input-field-neumorphic !p-5 transition-all">
              <textarea
                rows={3}
                placeholder="A futuristic cityscape with emerald lights..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-transparent outline-none text-sm font-medium leading-relaxed resize-none text-[#1F2937] placeholder-[#9CA3AF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt}
              className="pill-button !rounded-2xl py-5 !bg-[#1F2937] text-white text-sm shadow-xl disabled:opacity-50"
            >
              Generate
            </button>
            <button
              onClick={handleEdit}
              disabled={isLoading || !generatedImage || !prompt}
              className="pill-button pill-button-primary !rounded-2xl py-5 text-sm shadow-xl disabled:opacity-50"
            >
              Edit Current
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 pb-10 bg-[#F4F7FA] border-t border-white/50">
        <p className="text-[10px] text-[#6B7280] font-black uppercase tracking-[0.2em] mb-4 px-1">Try asking for:</p>
        <div className="flex flex-wrap gap-3">
          {["Anime style", "8k Photorealistic", "Add retro filter", "Pop Art"].map(t => (
            <button
              key={t}
              onClick={() => setPrompt(t)}
              className="px-4 py-2 neumorphic-elevated rounded-full text-[10px] text-[#12C784] font-black hover:scale-105 active:scale-95 transition-all"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIToolsScreen;
