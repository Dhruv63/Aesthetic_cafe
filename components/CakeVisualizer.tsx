import React, { useState, useEffect } from 'react';
import { generateCakeImage } from '../services/aiService';
import { ImageSize } from '../types';
import { motion } from 'framer-motion';

const CakeVisualizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>(ImageSize.OneK);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  const checkApiKey = async () => {
    if (window.aistudio && window.aistudio.hasSelectedApiKey) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setHasApiKey(hasKey);
      return hasKey;
    }
    // If not running in an environment with aistudio helper, assume key is present via env for dev
    if (process.env.API_KEY) {
        setHasApiKey(true);
        return true;
    }
    return false;
  };

  useEffect(() => {
    checkApiKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      await window.aistudio.openSelectKey();
      // Assume success after dialog close, or re-check
      await checkApiKey();
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasApiKey) {
        // Fallback if button wasn't clicked or state out of sync
        await handleSelectKey();
        return;
    }
    
    setLoading(true);
    setError(null);
    setImage(null);

    try {
      // Re-verify key right before call as recommended to handle race conditions
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        const confirmed = await window.aistudio.hasSelectedApiKey();
        if(!confirmed) {
             await window.aistudio.openSelectKey();
        }
      }

      const generatedImage = await generateCakeImage(prompt, size);
      setImage(generatedImage);
    } catch (err) {
      if (err instanceof Error && err.message.includes('Requested entity was not found')) {
         // Token might be invalid, force re-selection
         setHasApiKey(false);
         setError("Please select a valid API Key to continue.");
      } else {
         setError("Failed to create your cake vision. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="custom-cake" className="py-24 px-4 bg-beige relative overflow-hidden">
        {/* Decorative Wave Top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] fill-cream">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
        </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden p-8 md:p-12 mt-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark-brown mb-4">Dream It, We Bake It</h2>
          <p className="text-dark-brown/70">Visualize your perfect custom cake with our AI designer before you order.</p>
        </div>

        {!hasApiKey ? (
          <div className="text-center py-10">
            <p className="mb-6 text-dark-brown">To use our advanced high-definition Cake Visualizer, please select a paid API Key.</p>
            <button 
              onClick={handleSelectKey}
              className="px-8 py-4 bg-terracotta text-white rounded-full font-bold shadow-lg hover:bg-orange-600 transition-colors"
            >
              Unlock Premium Cake Designer
            </button>
            <p className="mt-4 text-xs text-gray-500">
               <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-terracotta">
                 Billing Information
               </a>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <form onSubmit={handleGenerate} className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-bold text-dark-brown mb-2">Describe your dream cake</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. A 3-tier rustic wedding cake with wildflowers and gold leaf details..."
                    className="w-full p-4 rounded-xl bg-cream border border-beige focus:ring-2 focus:ring-terracotta outline-none text-dark-brown h-32 resize-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-dark-brown mb-2">Image Resolution</label>
                  <div className="flex gap-4">
                    {Object.values(ImageSize).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`flex-1 py-2 px-4 rounded-lg border transition-all ${size === s ? 'bg-dark-brown text-white border-dark-brown' : 'bg-transparent text-dark-brown border-beige hover:border-terracotta'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="mt-2 py-4 rounded-full bg-terracotta text-white font-bold text-lg shadow-md hover:shadow-lg disabled:opacity-50 transition-all flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Dreaming...
                    </>
                  ) : (
                    'Visualize Cake'
                  )}
                </button>
              </form>
              {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
            </div>

            <div className="bg-cream rounded-2xl flex items-center justify-center min-h-[300px] border border-beige overflow-hidden">
              {loading ? (
                <div className="text-center">
                   <p className="text-terracotta font-serif text-xl animate-pulse">Mixing ingredients...</p>
                </div>
              ) : image ? (
                <motion.img 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={image} 
                  alt="AI Generated Cake" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-6 opacity-40">
                  <div className="text-6xl mb-4">🎂</div>
                  <p>Your cake preview will appear here</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Decorative Wave Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] fill-cream">
             <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default CakeVisualizer;