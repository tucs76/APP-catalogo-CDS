
import React from 'react';
import { MOCK_ALBUMS } from '../constants';
import { UserProfile } from '../types';

interface Props {
  onSelectAlbum: (id: string) => void;
  onOpenScanner: () => void;
  user?: UserProfile;
}

const LibraryView: React.FC<Props> = ({ onSelectAlbum, onOpenScanner, user }) => {
  const justAdded = MOCK_ALBUMS.slice(0, 3);
  const allTitles = MOCK_ALBUMS;

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-30 bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full border-2 border-primary overflow-hidden bg-surface-dark">
              {user ? (
                <img className="w-full h-full object-cover" src={user.picture} alt={user.name} />
              ) : (
                <span className="material-symbols-outlined flex items-center justify-center w-full h-full opacity-40">person</span>
              )}
            </div>
            <div>
              <h1 className="text-sm font-medium opacity-60 leading-none mb-1 font-body">My Archive</h1>
              <h2 className="text-xl font-bold leading-none tracking-tight font-display">Collection</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full text-[10px] text-primary font-bold">
                <span className="material-symbols-outlined text-xs animate-spin-slow">sync</span>
                Cloud Active
              </div>
            )}
            <button className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </div>
      </header>

      <main className="px-4">
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="col-span-1 bg-primary text-white p-5 rounded-xl shadow-lg shadow-primary/10">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">Total CDs</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold leading-none">1,248</span>
              <span className="material-symbols-outlined text-sm mb-1">album</span>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <div className="bg-surface-dark p-4 rounded-xl border border-white/5 flex-1">
              <p className="text-xs font-medium opacity-60 mb-1">Est. Value</p>
              <p className="text-xl font-bold text-primary">$18,500</p>
            </div>
            <div className="bg-surface-dark p-4 rounded-xl border border-white/5 flex-1">
              <p className="text-xs font-medium opacity-60 mb-1">Wishlist</p>
              <p className="text-xl font-bold">42 <span className="text-xs font-normal opacity-40">Items</span></p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button 
            onClick={onOpenScanner}
            className="w-full h-14 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
          >
            <span className="material-symbols-outlined">barcode_scanner</span>
            <span>Scan New Entry</span>
          </button>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="w-full h-12 bg-surface-dark border-none rounded-xl pl-12 pr-4 text-base focus:ring-2 focus:ring-primary/50 placeholder:text-slate-400 transition-all shadow-sm" 
              placeholder="Search by Artist, Album, or Barcode..." 
              type="text"
            />
          </div>
        </div>

        <section className="mt-8 -mx-4 overflow-hidden">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-lg font-bold font-display">Just Added</h3>
            <button className="text-sm font-medium text-primary flex items-center gap-1">
              View all <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar gap-4 px-4 pb-2">
            {justAdded.map((album) => (
              <div 
                key={album.id} 
                className="flex-none w-40 cursor-pointer"
                onClick={() => onSelectAlbum(album.id)}
              >
                <div className="aspect-square rounded-xl overflow-hidden shadow-md mb-2 relative group">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={album.coverUrl} alt={album.title} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                </div>
                <p className="font-bold text-sm truncate">{album.title}</p>
                <p className="text-xs opacity-60 truncate">{album.artist}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold font-display">All Titles</h3>
            <div className="flex gap-2">
              <button className="p-1.5 bg-surface-dark rounded-md border border-white/5">
                <span className="material-symbols-outlined text-base">filter_list</span>
              </button>
              <button className="p-1.5 bg-surface-dark rounded-md border border-white/5">
                <span className="material-symbols-outlined text-base">grid_view</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {allTitles.map((album) => (
              <div 
                key={album.id} 
                className="bg-surface-dark rounded-2xl p-2 pb-4 shadow-sm border border-white/5 cursor-pointer hover:border-primary/30 transition-all hover:-translate-y-1"
                onClick={() => onSelectAlbum(album.id)}
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-3">
                  <img className="w-full h-full object-cover" src={album.coverUrl} alt={album.title} />
                </div>
                <div className="px-2">
                  <p className="font-bold text-sm leading-tight mb-1 truncate">{album.title}</p>
                  <p className="text-xs opacity-60 truncate">{album.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LibraryView;
