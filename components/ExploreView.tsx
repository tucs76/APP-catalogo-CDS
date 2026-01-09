
import React from 'react';
import { MOCK_ALBUMS } from '../constants';

interface Props {
  onSelectAlbum: (id: string) => void;
}

const ExploreView: React.FC<Props> = ({ onSelectAlbum }) => {
  return (
    <div className="pb-32">
      <header className="p-6 pt-10">
        <h2 className="text-2xl font-bold font-display leading-tight">Explore the <br/><span className="text-primary underline decoration-primary/30">Music Universe</span></h2>
        <p className="text-slate-500 text-sm mt-2">Curated trends and new releases powered by AI insights.</p>
      </header>

      <main className="px-6 space-y-8">
        {/* Trending AI Recommendations */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-xl">bolt</span>
            <h3 className="text-sm font-bold uppercase tracking-widest">Gemini Curated</h3>
          </div>
          <div className="flex flex-col gap-4">
            {MOCK_ALBUMS.slice(4, 7).map(album => (
              <div 
                key={album.id}
                onClick={() => onSelectAlbum(album.id)}
                className="group flex gap-4 bg-surface-dark p-3 rounded-2xl border border-white/5 active:scale-[0.98] transition-all"
              >
                <div className="size-20 rounded-xl overflow-hidden shrink-0 shadow-lg">
                  <img src={album.coverUrl} className="w-full h-full object-cover" alt={album.title} />
                </div>
                <div className="flex flex-col justify-center overflow-hidden">
                  <p className="font-bold text-sm truncate">{album.title}</p>
                  <p className="text-xs text-slate-500 mb-2">{album.artist}</p>
                  <div className="flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-bold uppercase">Trending #1</span>
                    <span className="px-2 py-0.5 rounded-full bg-accent-gold/10 text-accent-gold text-[8px] font-bold uppercase">Must have</span>
                  </div>
                </div>
                <div className="ml-auto flex items-center pr-2">
                  <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">arrow_forward_ios</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global News Section */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Collectors News</h3>
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden aspect-video group">
              <img src="https://picsum.photos/seed/vinyl/600/400" className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-500" alt="News item" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-primary uppercase mb-1">Market Update</span>
                <h4 className="text-white font-bold text-lg leading-tight">Vinyl Sales Surpass Digital in Q3 Archive Report</h4>
              </div>
            </div>
            <div className="border-l-2 border-primary/20 pl-4">
              <p className="text-xs text-slate-500 mb-1 font-bold uppercase tracking-widest">Release Radar</p>
              <h4 className="font-bold text-sm">Echo Theory announces special edition reprint of 'Vortex of Silence'</h4>
              <p className="text-xs text-slate-500 mt-2 italic">Scheduled for Dec 2024 with 3 unreleased tracks.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ExploreView;
