export interface Release {
  id: string;
  code: string;
  title: string;
  artist: string;
  year: string;
  format: string;
  edition: string;
  matrix: string;
  rpm: string;
  curatorNotes: string;
  accentColor: 'amber' | 'teal';
  image: string;
  tracklist: { number: string; title: string; duration: string }[];
  audioSpec: {
    baseFreq: number;
    subFreq: number;
    filterFreq: number;
    noiseLevel: number;
    tempo: number;
    type: 'ambient' | 'sub-bass' | 'drone' | 'modular' | 'minimal';
  };
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  location: string;
  releasesCount: string;
  bio: string;
  modularRig: string;
  releases: string[];
}

export interface PerformanceDate {
  id: string;
  date: string;
  event: string;
  city: string;
  venue: string;
  performanceType: string;
  format: string;
  status: 'LIMITED ACETATES' | 'RESERVATIONS OPEN' | 'DIRECT BROADCAST' | 'SOLD OUT';
}

export const CATALOGUE_RELEASES: Release[] = [
  {
    id: 'sub-006',
    code: 'SUB-006',
    title: 'THE DISPERSION OF FORM',
    artist: 'VALENTINA KOROVIN',
    year: '2026',
    format: '2xLP 180G VINYL / GATEFOLD',
    edition: '500 HAND-NUMBERED COPIES',
    matrix: 'SUB-006-A SST LACQUER 33RPM',
    rpm: '33⅓ RPM',
    curatorNotes: 'Direct-to-lathe lacquer cut on a Neumann VMS-80 in Berlin. Sub-frequency harmonic acoustic resonance recorded in an empty dry dock.',
    accentColor: 'amber',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
    tracklist: [
      { number: 'A1', title: 'Dry Dock Resonance (In 48Hz)', duration: '08:14' },
      { number: 'A2', title: 'Phase Migration', duration: '06:22' },
      { number: 'B1', title: 'Acoustic Lattice', duration: '11:05' },
      { number: 'B2', title: 'Silt & Steel Decays', duration: '07:48' }
    ],
    audioSpec: {
      baseFreq: 55,
      subFreq: 27.5,
      filterFreq: 480,
      noiseLevel: 0.08,
      tempo: 42,
      type: 'sub-bass'
    }
  },
  {
    id: 'sub-005',
    code: 'SUB-005',
    title: 'ISOLATION STUDIES I–IV',
    artist: 'NULL PROJECTION',
    year: '2025',
    format: '1xLP 180G CLEAR SMOKE',
    edition: '300 COPIES WITH SILKSCREEN INSERT',
    matrix: 'SUB-005-B DMM DIRECT 45RPM',
    rpm: '45 RPM',
    curatorNotes: 'Single continuous take on Buchla 200e modular system. Cut at half-speed master for extreme low-end transient resolution.',
    accentColor: 'teal',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
    tracklist: [
      { number: 'A1', title: 'Transduction Study I', duration: '09:30' },
      { number: 'A2', title: 'Harmonic Drift II', duration: '05:44' },
      { number: 'B1', title: 'Vector Field III', duration: '08:12' },
      { number: 'B2', title: 'Null Convergence IV', duration: '06:01' }
    ],
    audioSpec: {
      baseFreq: 73.4,
      subFreq: 36.7,
      filterFreq: 620,
      noiseLevel: 0.05,
      tempo: 50,
      type: 'modular'
    }
  },
  {
    id: 'sub-004',
    code: 'SUB-004',
    title: 'CHRONOSTATIC TENSION',
    artist: 'THE TIDES COLLECTIVE',
    year: '2025',
    format: '1xLP 180G DEEP BLACK / EMBOSSED',
    edition: '400 COPIES WORLDWIDE',
    matrix: 'SUB-004-A NEUMANN 33RPM',
    rpm: '33⅓ RPM',
    curatorNotes: 'Micro-tonal cello quartet processed through vintage tape loops and custom convolution chambers in Oslo.',
    accentColor: 'amber',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
    tracklist: [
      { number: 'A1', title: 'Glacial Grain I', duration: '07:18' },
      { number: 'A2', title: 'Chamber Echoes', duration: '04:52' },
      { number: 'B1', title: 'Sub-Cello Drift', duration: '10:41' },
      { number: 'B2', title: 'Return to Zero', duration: '03:19' }
    ],
    audioSpec: {
      baseFreq: 65.4,
      subFreq: 32.7,
      filterFreq: 510,
      noiseLevel: 0.06,
      tempo: 38,
      type: 'drone'
    }
  },
  {
    id: 'sub-003',
    code: 'SUB-003',
    title: 'MONOLITHIC DRIFT',
    artist: 'KILN & REED',
    year: '2024',
    format: '2xLP 180G SILVER RESIN',
    edition: '450 COPIES WITH HARDCOVER LINER',
    matrix: 'SUB-003-C SST HALF-SPEED',
    rpm: '33⅓ RPM',
    curatorNotes: 'Field recordings from abandoned hydroelectric spillways paired with Serge modular synth frequency modulators.',
    accentColor: 'teal',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000&auto=format&fit=crop',
    tracklist: [
      { number: 'A1', title: 'Spillway Hum', duration: '12:04' },
      { number: 'B1', title: 'Turbine Decay', duration: '09:15' },
      { number: 'C1', title: 'Sluice Gate Modulation', duration: '11:32' },
      { number: 'D1', title: 'Tailrace Ambient', duration: '08:50' }
    ],
    audioSpec: {
      baseFreq: 49.0,
      subFreq: 24.5,
      filterFreq: 390,
      noiseLevel: 0.09,
      tempo: 32,
      type: 'ambient'
    }
  },
  {
    id: 'sub-002',
    code: 'SUB-002',
    title: 'RADIAL VECTOR',
    artist: 'SELENA VOX',
    year: '2024',
    format: '1xLP 180G MATTE OPAQUE',
    edition: '300 COPIES / DIE-CUT SLEEVE',
    matrix: 'SUB-002-A DMM CUT 45RPM',
    rpm: '45 RPM',
    curatorNotes: 'Continuous sine-wave interference patterns and vocal micro-samples manipulated through analog spring reverbs.',
    accentColor: 'amber',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop',
    tracklist: [
      { number: 'A1', title: 'Vocal Harmonic Fold', duration: '06:40' },
      { number: 'A2', title: 'Binaural Stasis', duration: '07:11' },
      { number: 'B1', title: 'Radial Impulse', duration: '08:55' }
    ],
    audioSpec: {
      baseFreq: 82.4,
      subFreq: 41.2,
      filterFreq: 750,
      noiseLevel: 0.04,
      tempo: 58,
      type: 'minimal'
    }
  },
  {
    id: 'sub-001',
    code: 'SUB-001',
    title: 'INCIPIENT MATRIX',
    artist: 'SUBSTRATA ENSEMBLE',
    year: '2024',
    format: '1xLP 180G HEAVYWEIGHT BLACK',
    edition: '250 COPIES (ARCHIVE ED.)',
    matrix: 'SUB-001-A FOUNDATION CUT',
    rpm: '33⅓ RPM',
    curatorNotes: 'Inaugural pressing. Direct acoustical capture of acoustic piano soundboards vibrating under tuned electromagnetic inductors.',
    accentColor: 'teal',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
    tracklist: [
      { number: 'A1', title: 'Induction Resonance', duration: '10:20' },
      { number: 'A2', title: 'Harmonic Knot', duration: '05:15' },
      { number: 'B1', title: 'String Excitations', duration: '14:02' }
    ],
    audioSpec: {
      baseFreq: 61.7,
      subFreq: 30.8,
      filterFreq: 420,
      noiseLevel: 0.07,
      tempo: 36,
      type: 'drone'
    }
  }
];

export const ARTISTS_ROSTER: Artist[] = [
  {
    id: 'korovin',
    name: 'VALENTINA KOROVIN',
    role: 'MODULAR SYNTHESIS & ACOUSTIC SPATIALIZATION',
    location: 'BERLIN, DE',
    releasesCount: '02 EDITIONS',
    bio: 'Pioneering work in resonant architecture, low-frequency pressure fields, and spatial acoustic distribution in industrial concrete structures.',
    modularRig: 'Buchla 200e, Custom 1/4" Reel-to-Reel Preamp, Neumann KM184 pairs',
    releases: ['SUB-006', 'SUB-004']
  },
  {
    id: 'null-proj',
    name: 'NULL PROJECTION',
    role: 'SUB-HARMONIC DRIFT & GENERATIVE PATTERNS',
    location: 'HELSINKI, FI',
    releasesCount: '03 EDITIONS',
    bio: 'Explores the perceptual boundary between audible low pitch and somatic physical vibration through custom analog voltage circuits.',
    modularRig: 'Serge 4U Modular System, Moog Subharmonicon, EMT 140 Plate Reverb',
    releases: ['SUB-005']
  },
  {
    id: 'tides-coll',
    name: 'THE TIDES COLLECTIVE',
    role: 'PREPARED STRINGS & TAPE EXPERIMENTATION',
    location: 'OSLO, NO',
    releasesCount: '02 EDITIONS',
    bio: 'Four cellists working with electromagnetic bowings, tape loop delays, and hydrophone capture in sub-arctic Scandinavian environments.',
    modularRig: 'Modified 19th c. Cellos, Studer A80 2-Track Master, Binson Echorec',
    releases: ['SUB-004']
  },
  {
    id: 'kiln-reed',
    name: 'KILN & REED',
    role: 'HYDROELECTRIC FIELD RECORDINGS & SINE OSCILLATION',
    location: 'ZÜRICH, CH',
    releasesCount: '04 EDITIONS',
    bio: 'Site-specific acoustic recordings from hydroelectric turbine chambers, paired with precision analog test equipment and sine-wave generators.',
    modularRig: 'Rohde & Schwarz Audio Test Oscillators, Soundfield ST450 Ambisonic Mic',
    releases: ['SUB-003']
  },
  {
    id: 'selena-vox',
    name: 'SELENA VOX',
    role: 'EXTENDED VOCAL TECHNIQUES & SPRING REVERBERATION',
    location: 'REYKJAVÍK, IS',
    releasesCount: '02 EDITIONS',
    bio: 'Micro-tonal vocal multiphonics passed through multi-tank acoustic spring reverbs and low-pass resonant ladder filters.',
    modularRig: 'AKG BX20 Spring Reverb, Neumann U67 Valve Mic, Roland RE-201',
    releases: ['SUB-002']
  },
  {
    id: 'ensemble',
    name: 'SUBSTRATA ENSEMBLE',
    role: 'RESIDENT RESEARCH & DIRECT-TO-LATHE COMMISSIONS',
    location: 'LONDON / BERLIN',
    releasesCount: '06 EDITIONS',
    bio: 'The label house research group conducting direct lacquer cuts and sound system acoustic calibrations.',
    modularRig: 'Neumann VMS-80 Lathe with SAL-74B Electronics, Scully 280-4 Master Machine',
    releases: ['SUB-001']
  }
];

export const PERFORMANCE_DATES: PerformanceDate[] = [
  {
    id: 'date-1',
    date: '24 OCT 2026',
    event: 'ACOUSTIC PRESSURE NO. 14',
    city: 'BERLIN',
    venue: 'KRAFTWERK MAIN HALL',
    performanceType: 'QUADRAPHONIC LIVE CUT / VALENTINA KOROVIN',
    format: '180G DIRECT ACETATE CUT ON-SITE',
    status: 'LIMITED ACETATES'
  },
  {
    id: 'date-2',
    date: '12 NOV 2026',
    event: 'SPATIAL CONVERGENCE',
    city: 'LONDON',
    venue: 'ST. JOHN AT HACKNEY',
    performanceType: 'PREPARED CELLO & TAPE LOOPS / THE TIDES COLLECTIVE',
    format: 'SUB-004 EMBOSSED EDITION PRESENTATION',
    status: 'RESERVATIONS OPEN'
  },
  {
    id: 'date-3',
    date: '05 DEC 2026',
    event: 'SUB-ZERO FREQUENCIES',
    city: 'HELSINKI',
    venue: 'KULTTUURISAUNA AUDITORIUM',
    performanceType: 'MODULAR RESONANCE / NULL PROJECTION',
    format: 'SUB-005 CLEAR VINYL + LIVE ARCHIVE TAPE',
    status: 'LIMITED ACETATES'
  },
  {
    id: 'date-4',
    date: '19 JAN 2027',
    event: 'SPILLWAY TRANSLATION',
    city: 'ZÜRICH',
    venue: 'ROTE FABRIK TONHALLE',
    performanceType: 'AMBISONIC PROJECTION / KILN & REED',
    format: 'SUB-003 SILVER RESIN DOUBLE LP',
    status: 'RESERVATIONS OPEN'
  },
  {
    id: 'date-5',
    date: '28 FEB 2027',
    event: 'VOCAL MULTIPHONICS & SPRINGS',
    city: 'REYKJAVÍK',
    venue: 'MENNINGARMIÐSTÖÐIN',
    performanceType: 'VALVE & SPRING SYSTEM / SELENA VOX',
    format: 'SUB-002 DIRECT TEST PRESSINGS',
    status: 'SOLD OUT'
  },
  {
    id: 'date-6',
    date: '15 MAR 2027',
    event: 'SUBSTRATA ANNUAL LATHE SESSION',
    city: 'BERLIN',
    venue: 'DUBPLATES & MASTERING CUTTING ROOM',
    performanceType: 'ARCHIVE CUTTING LIVE DEMONSTRATION / ENSEMBLE',
    format: 'DIRECT DMM LIVE SESSIONS',
    status: 'DIRECT BROADCAST'
  }
];
