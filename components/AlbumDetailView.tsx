
import React, { useEffect, useState } from 'react';
import { MOCK_ALBUMS } from '../constants';
import { getAlbumInsight } from '../services/geminiService';

interface Props {
  albumId?: string;
  onBack: () => void;
}

const AlbumDetailView: React.FC<Props> = ({ albumId, onBack }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const album = MOCK_ALBUMS.find(a => a.id === albumId) || MOCK_ALBUMS[4]; // Fallback to Vortex of Silence

  useEffect(() => {
    async function fetchInsight() {
      if (album) {
        setLoadingInsight(true);
        const text = await getAlbumInsight(album.title, album.artist);
        setInsight(text || "No insights available.");
        setLoadingInsight(false);
      }
    }
    fetchInsight();
  }, [albumId]);

  return (
    <div className="min-h-screen bg-background-dark pb-32">
      {/* Top Bar */}
      <nav className="sticky top-0 z-50 flex items-center bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-white/5">
        <button 
          onClick={onBack}
          className="flex size-10 items-center justify-center cursor-pointer hover:bg-white/5 rounded-full"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center font-display">Album Details</h2>
        <div className="flex w-10 items-center justify-end">
          <button className="flex cursor-pointer items-center justify-center rounded-lg h-10 bg-transparent text-primary">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </nav>

      <main>
        {/* Album Art Hero */}
        <div className="px-4 py-4">
          <div 
            className="relative aspect-square w-full bg-cover bg-center rounded-2xl shadow-2xl overflow-hidden" 
            style={{ 
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 100%), url("${album.coverUrl}")` 
            }}
          >
            <div className="absolute bottom-0 left-0 p-6 w-full">
              {album.rare && (
                <span className="inline-block px-2 py-1 mb-2 rounded bg-accent-gold/90 text-black text-[10px] font-bold uppercase tracking-widest">Rare Edition</span>
              )}
              <h1 className="text-white text-3xl font-bold font-display leading-tight">{album.title}</h1>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="px-4 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold font-display text-primary">{album.artist}</h2>
              <p className="text-slate-500 text-sm mt-1">{album.year} • {album.label} • {album.format}</p>
            </div>
            <div className="flex items-center gap-1 text-accent-gold">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-bold text-sm">{album.rating}</span>
            </div>
          </div>
          
          <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 bg-primary text-white gap-3 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all">
            <span className="material-symbols-outlined">library_add_check</span>
            <span className="font-bold font-display text-base">In Collection</span>
          </button>
          <p className="text-center text-xs text-slate-500 italic">Added on Oct 12, 2023 • Shelf A-12</p>
        </div>

        {/* AI Insight Section */}
        <div className="px-4 mt-8">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-sm">bolt</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary">AI Market Insight</h3>
            </div>
            {loadingInsight ? (
              <div className="h-10 flex items-center gap-2">
                <div className="size-2 bg-primary rounded-full animate-bounce"></div>
                <div className="size-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="size-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-slate-300 italic">"{insight}"</p>
            )}
          </div>
        </div>

        {/* Archive Info */}
        {album.editionDetails && (
          <div className="px-4 mt-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 font-display">Edition Archive</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-dark p-4 rounded-xl border border-white/5">
                <p className="text-[10px] uppercase text-slate-500 mb-1">Matrix / Runout</p>
                <p className="font-mono text-xs break-all text-slate-300">{album.editionDetails.matrix}</p>
              </div>
              <div className="bg-surface-dark p-4 rounded-xl border border-white/5">
                <p className="text-[10px] uppercase text-slate-500 mb-1">Mastering SID</p>
                <p className="font-mono text-xs text-slate-300">{album.editionDetails.masteringSid}</p>
              </div>
              <div className="bg-surface-dark p-4 rounded-xl border border-white/5">
                <p className="text-[10px] uppercase text-slate-500 mb-1">Mould SID</p>
                <p className="font-mono text-xs text-slate-300">{album.editionDetails.mouldSid}</p>
              </div>
              <div className="bg-surface-dark p-4 rounded-xl border border-white/5">
                <p className="text-[10px] uppercase text-slate-500 mb-1">Catalog Number</p>
                <p className="font-mono text-xs text-slate-300">{album.editionDetails.catalogNumber}</p>
              </div>
            </div>
          </div>
        )}

        {/* Market Value */}
        {album.marketValue && (
          <div className="px-4 mt-6">
            <div className="bg-primary/5 border border-primary/20 p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold font-display">Market Value</h3>
                <span className="text-[10px] text-primary bg-primary/20 px-2 py-0.5 rounded-full font-bold">LIVE DATA</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] uppercase text-slate-500">Min</p>
                  <p className="text-lg font-bold">${album.marketValue.min.toFixed(2)}</p>
                </div>
                <div className="border-x border-primary/10">
                  <p className="text-[10px] uppercase text-slate-500">Median</p>
                  <p className="text-lg font-bold text-primary">${album.marketValue.median.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-slate-500">Max</p>
                  <p className="text-lg font-bold text-accent-gold">${album.marketValue.max.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tracklist */}
        {album.tracklist && (
          <div className="px-4 mt-10">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-lg font-bold font-display">Tracklist</h3>
              <p className="text-xs text-slate-500">{album.tracklist.length} Tracks • 48:22</p>
            </div>
            <div className="flex flex-col gap-1">
              {album.tracklist.map((track, idx) => (
                <React.Fragment key={track.number}>
                  <div className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors group">
                    <span className="text-slate-400 font-mono text-sm w-4">{track.number}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold">{track.title}</p>
                      <p className="text-[10px] text-slate-500">{track.duration}</p>
                    </div>
                    <button className="text-slate-400 group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">play_circle</span>
                    </button>
                  </div>
                  {idx < album.tracklist.length - 1 && <div className="h-px bg-white/5 mx-3"></div>}
                </React.Fragment>
              ))}
            </div>
            <button className="w-full text-center py-4 text-primary text-sm font-bold">View All Tracks</button>
          </div>
        )}
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-dark/95 backdrop-blur-xl border-t border-white/5 z-50">
        <div className="max-w-md mx-auto flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-surface-dark text-slate-200 font-bold text-sm">
            <span className="material-symbols-outlined text-xl">favorite</span>
            Wishlist
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-surface-dark text-slate-200 font-bold text-sm">
            <span className="material-symbols-outlined text-xl">edit</span>
            Edit Info
          </button>
          <button className="size-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailView;
