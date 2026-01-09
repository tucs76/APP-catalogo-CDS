
export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  label: string;
  format: string;
  coverUrl: string;
  rating: number;
  rare?: boolean;
  editionDetails?: {
    matrix: string;
    masteringSid: string;
    mouldSid: string;
    catalogNumber: string;
  };
  marketValue?: {
    min: number;
    median: number;
    max: number;
  };
  tracklist?: Track[];
}

export interface Track {
  number: string;
  title: string;
  duration: string;
}

export type ViewState = 'LIBRARY' | 'DETAIL' | 'SCANNER' | 'EXPLORE' | 'WISHLIST' | 'PROFILE';
export type AppTheme = 'light' | 'dark' | 'emerald';

export interface UserProfile {
  name: string;
  email: string;
  picture: string;
  syncEnabled: boolean;
}

export interface AppState {
  currentView: ViewState;
  selectedAlbumId?: string;
  theme: AppTheme;
  user?: UserProfile;
}
