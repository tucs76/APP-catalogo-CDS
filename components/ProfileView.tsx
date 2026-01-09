
import React from 'react';
import { AppTheme, UserProfile } from '../types';

interface Props {
  user?: UserProfile;
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  onLogin: (profile: UserProfile) => void;
  onLogout: () => void;
}

const ProfileView: React.FC<Props> = ({ user, theme, onThemeChange, onLogin, onLogout }) => {
  
  const handleGoogleLogin = () => {
    // Mock login for demo purposes
    onLogin({
      name: 'Julian Collector',
      email: 'julian@musicarchive.com',
      picture: 'https://picsum.photos/seed/collector/200/200',
      syncEnabled: true
    });
  };

  return (
    <div className="pb-32">
      <header className="p-6 pt-10 text-center">
        <h2 className="text-2xl font-bold font-display mb-8">My Archive Profile</h2>
        
        <div className="relative inline-block mb-6">
          <div className="size-24 rounded-full border-4 border-primary p-1 bg-surface-dark overflow-hidden mx-auto shadow-xl">
            {user ? (
              <img className="w-full h-full object-cover rounded-full" src={user.picture} alt={user.name} />
            ) : (
              <div className="w-full h-full flex items-center justify-center opacity-20">
                <span className="material-symbols-outlined text-6xl">account_circle</span>
              </div>
            )}
          </div>
          {user && (
            <div className="absolute bottom-0 right-0 size-8 bg-primary rounded-full border-2 border-background-dark flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white text-sm">verified</span>
            </div>
          )}
        </div>
        
        {user ? (
          <div>
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-slate-500 text-sm">{user.email}</p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold opacity-40">Guest Collector</h3>
            <button 
              onClick={handleGoogleLogin}
              className="mt-4 inline-flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:brightness-90 active:scale-95 transition-all"
            >
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              Sign in with Google
            </button>
          </div>
        )}
      </header>

      <main className="px-6 space-y-8">
        {/* Drive Sync Section */}
        <section>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Storage & Backup</h4>
          <div className="bg-surface-dark rounded-2xl p-5 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                  <span className="material-symbols-outlined">add_to_drive</span>
                </div>
                <div>
                  <p className="font-bold text-sm leading-none mb-1">Google Drive Sync</p>
                  <p className="text-[10px] text-slate-500">Backup your entire archive</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={!!user} className="sr-only peer" readOnly />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            {user && (
              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
                <p className="text-[10px] text-slate-500 italic">Last sync: 2 mins ago</p>
                <button className="text-primary text-[10px] font-bold uppercase tracking-widest">Force Sync</button>
              </div>
            )}
          </div>
        </section>

        {/* Theming Section */}
        <section>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Appearance</h4>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'dark', label: 'Dark', icon: 'dark_mode', color: 'bg-background-dark' },
              { id: 'light', label: 'Light', icon: 'light_mode', color: 'bg-background-light border-slate-200' },
              { id: 'emerald', label: 'Emerald', icon: 'nature', color: 'bg-[#064e3b]' }
            ].map((t) => (
              <button 
                key={t.id}
                onClick={() => onThemeChange(t.id as AppTheme)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${theme === t.id ? 'border-primary bg-primary/5 shadow-lg' : 'border-white/5 bg-surface-dark opacity-60 hover:opacity-100'}`}
              >
                <div className={`size-8 rounded-full ${t.color} border shadow-inner flex items-center justify-center`}>
                  <span className={`material-symbols-outlined text-sm ${t.id === 'light' ? 'text-black' : 'text-white'}`}>{t.icon}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">{t.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Logout Section */}
        {user && (
          <button 
            onClick={onLogout}
            className="w-full h-14 border border-red-500/20 text-red-500 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-500/5 transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
            Sign out of Archive
          </button>
        )}

        <div className="text-center pt-8 opacity-20">
          <p className="text-[10px] font-bold">My Archive v2.4.0</p>
          <p className="text-[8px] uppercase tracking-widest mt-1">Collector's Edition</p>
        </div>
      </main>
    </div>
  );
};

export default ProfileView;
