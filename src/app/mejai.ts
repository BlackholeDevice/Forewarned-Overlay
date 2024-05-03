import {EvidenceType} from "./evidence";

export interface Mejai {
  name: string;
  subtitle: string;
  evidence: EvidenceType[];
  strengths?: string[];
  weaknesses?: string[];
  wiki?: string;
  icon?: string;
}

export type MejaiType =
  'ataimon' |
  'dekan' |
  'necreph' |
  'ouphris' |
  'rathos' |
  'talgor' |
  'ptahmes';

export const Mejais: Readonly<Record<MejaiType, Mejai>> = {
  ataimon: {
    name: 'Ataimon',
    subtitle: 'The Abominable',
    evidence: [
      'footsteps',
      'tremors',
      'destruction',
      'disturbedTombs',
      'electronicDisturbance',
      'metallicSignature',
      'vocalResponse',
      'radarDetection'
    ],
    strengths: ['Summons Abominations when stunned'],
    weaknesses: ['Stunned by Flashlight']
  },
  dekan: {
    name: 'Dekan',
    subtitle: 'The Lost',
    evidence: [
      'footsteps',
      'tremors',
      'destruction',
      'disturbedTombs',
      'vocalResponse',
      'radarDetection',
      'radioactivity',
      'reanimation'
    ],
    weaknesses: [
      'Blind',
      'Distracted by Handheld Radio'
    ],
    strengths: [
      'Perfect hearing'
    ]
  },
  necreph: {
    name: 'Necreph',
    subtitle: 'The Shadow',
    evidence: [
      'destruction',
      'disturbedTombs',
      'electronicDisturbance',
      'extinguishedFlames',
      'magneticDistortion',
      'metallicSignature',
      'vocalResponse',
      'radioactivity'
    ],
    strengths: ['Hates all light', 'Teleports', 'No staring'],
    weaknesses: ['Leaves you alone']
  },
  ouphris: {
    name: 'Ouphris',
    subtitle: 'The Forgotten',
    evidence: [
      'footsteps',
      'tremors',
      'extinguishedFlames',
      'magneticDistortion',
      'metallicSignature',
      'vocalResponse',
      'radioactivity',
      'reanimation'
    ],
    strengths: ['Disguises as other players'],
    weaknesses: ['Heka Amulet']
  },
  rathos: {
    name: 'Rathos',
    subtitle: 'The Damned',
    evidence: [
      'footsteps',
      'disturbedTombs',
      'electronicDisturbance',
      'extinguishedFlames',
      'magneticDistortion',
      'metallicSignature',
      'radarDetection',
      'reanimation'
    ],
    strengths: [
      'Can blow out torches when he screams',
      'Screams more often when enraged',
      'Prioritizes the relic'
    ],
    weaknesses: [
      'Stalks from a distance',
      'Afraid of fire'
    ]
  },
  talgor: {
    name: 'Talgor',
    subtitle: 'The Perilous',
    evidence: [
      'tremors',
      'destruction',
      'electronicDisturbance',
      'extinguishedFlames',
      'magneticDistortion',
      'radarDetection',
      'radioactivity',
      'reanimation'
    ],
    strengths: [
      'Invisible',
      'Breaks Handheld Radio temporarily'
    ],
    weaknesses: [
      'Visible on tablet',
      'Stunned by Handheld radio'
    ]
  },
  ptahmes: {
    name: 'Ptahmes',
    subtitle: 'The Resilient',
    evidence: [
      'destruction',
      'extinguishedFlames',
      'reanimation',
      'vocalResponse',
      'radarDetection',
      'tremors',
      'footsteps',
      'electronicDisturbance'
    ],
    strengths: [
      'Don\'t stare too long',
      'Teleports',
      'Disorients'
    ],
    weaknesses: [
      'Halts when seen',
      'Repelled with camera',
      'Sounds of bones breaking',
    ]
  }
}
