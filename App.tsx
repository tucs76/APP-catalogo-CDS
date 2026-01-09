
import React, { useState, useEffect } from 'react';
import { ViewState, AppTheme, UserProfile } from './types';
import LibraryView from './components/LibraryView';
import AlbumDetailView from './components/AlbumDetailView';
import ScannerView from './components/ScannerView';
import ProfileView from './components/ProfileView';
import ExploreView from './components/ExploreView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('LIBRARY');
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | undefined>();
  const [theme, setTheme] = useState<AppTheme>((localStorage.getItem('app-theme') as AppTheme) || 'dark');
  const [user, setUser] = useState<UserProfile | undefined>(() => {
    const saved = localStorage.getItem('app-user');
    return saved ? JSON.parse(saved) : undefined;
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const handleSelectAlbum = (id: string) => {
    setSelectedAlbumId(id);
    setCurrentView('DETAIL');
  };

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleLogin = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('app-user', JSON.stringify(profile));
  };

  const handleLogout = () => {
    setUser(undefined);
    localStorage.removeItem('app-user');
  };

  const renderView = () => {
    switch (currentView) {
      case 'LIBRARY':
        return (
          <LibraryView 
            onSelectAlbum={handleSelectAlbum} 
            onOpenScanner={() => navigateTo('SCANNER')} 
            user={user}
          />
        );
      case 'DETAIL':
        return (
          <AlbumDetailView 
            albumId={selectedAlbumId} 
            onBack={() => navigateTo('LIBRARY')} 
          />
        );
      case 'SCANNER':
        return (
          <ScannerView 
            onClose={() => navigateTo('LIBRARY')} 
            onMatchConfirmed={(id) => handleSelectAlbum(id)}
          />
        );
      case 'PROFILE':
        return (
          <ProfileView 
            user={user} 
            theme={theme} 
            onThemeChange={setTheme} 
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        );
      case 'EXPLORE':
        return <ExploreView onSelectAlbum={handleSelectAlbum} />;
      case 'WISHLIST':
        return (
          <div className="p-8 text-center pt-20">
            <span className="material-symbols-outlined text-6xl text-primary opacity-20 mb-4">favorite</span>
            <h2 className="text-xl font-bold font-display">My Wishlist</h2>
            <p className="text-slate-500 mt-2">Track the albums you're looking for. Use Gemini to find the best deals.</p>
          </div>
        );
      default:
        return <LibraryView onSelectAlbum={handleSelectAlbum} onOpenScanner={() => navigateTo('SCANNER')} user={user} />;
    }
  };

  return (
    <div className="max-w-xl mx-auto min-h-screen relative transition-colors duration-300 overflow-x-hidden">
      {renderView()}
      
      {currentView !== 'SCANNER' && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-dark/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-white/5 pb-6">
          <div className="max-w-xl mx-auto flex items-center justify-around h-16 px-6">
            {[
              { id: 'LIBRARY', icon: 'grid_view', label: 'Library' },
              { id: 'EXPLORE', icon: 'search', label: 'Explore' },
              { id: 'WISHLIST', icon: 'favorite', label: 'Wishlist' },
              { id: 'PROFILE', icon: 'account_circle', label: 'Profile' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => navigateTo(item.id as ViewState)}
                className={`flex flex-col items-center gap-1 transition-all flex-1 ${currentView === item.id ? 'text-primary scale-110' : 'opacity-40 hover:opacity-100'}`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: currentView === item.id ? "'FILL' 1" : "" }}>{item.icon}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};

export default App;
