
import { Album } from './types';

export const MOCK_ALBUMS: Album[] = [
  {
    id: '1',
    title: 'Structure',
    artist: 'Form & Function',
    year: 2021,
    label: 'Architecture Records',
    format: 'CD, Album',
    coverUrl: 'https://picsum.photos/seed/structure/400/400',
    rating: 4.5
  },
  {
    id: '2',
    title: 'Canvas Soul',
    artist: 'The Painters',
    year: 2022,
    label: 'Vivid Sounds',
    format: 'Vinyl, LP',
    coverUrl: 'https://picsum.photos/seed/soul/400/400',
    rating: 4.8
  },
  {
    id: '3',
    title: 'Lost Signals',
    artist: 'Frequency X',
    year: 2023,
    label: 'Wavelength Audio',
    format: 'CD, Album',
    coverUrl: 'https://picsum.photos/seed/signals/400/400',
    rating: 4.2
  },
  {
    id: '4',
    title: 'Hyperpop',
    artist: 'Electric Cherry',
    year: 2024,
    label: 'Neon Pulse',
    format: 'CD, Album',
    coverUrl: 'https://picsum.photos/seed/hyper/400/400',
    rating: 4.7
  },
  {
    id: '5',
    title: 'Vortex of Silence',
    artist: 'Echo Theory',
    year: 2023,
    label: 'Resonance Records',
    format: 'CD, Album',
    coverUrl: 'https://picsum.photos/seed/vortex/400/400',
    rating: 4.9,
    rare: true,
    editionDetails: {
      matrix: 'DADC-773401 15 A02',
      masteringSid: 'IFPI L329',
      mouldSid: 'IFPI 5077',
      catalogNumber: 'RES-CD-0922'
    },
    marketValue: {
      min: 12.50,
      median: 24.00,
      max: 58.99
    },
    tracklist: [
      { number: '01', title: 'Signal Interference', duration: '04:12' },
      { number: '02', title: 'Parallel Horizons', duration: '03:55' },
      { number: '03', title: 'Deep Resonance', duration: '05:40' }
    ]
  },
  {
    id: '6',
    title: 'Midnight City',
    artist: 'The Echoes',
    year: 2022,
    label: 'Urban Beats',
    format: 'Digital',
    coverUrl: 'https://picsum.photos/seed/midnight/400/400',
    rating: 4.4
  },
  {
    id: '7',
    title: 'Prism Theory',
    artist: 'Neon Wave',
    year: 2023,
    label: 'Retro Future',
    format: 'Vinyl',
    coverUrl: 'https://picsum.photos/seed/prism/400/400',
    rating: 4.6
  }
];
