// export enum Evidence {
//   destruction = 1,
//   disturbedTombs = 2,
//   electronicDisturbance = 4,
//   extinguishedFlames = 8,
//   footsteps = 16,
//   magneticDistortion = 32,
//   metallicSignature = 64,
//   radarDetection = 128,
//   radioactivity = 256,
//   reanimation = 512,
//   tremors = 1024,
//   vocalResponse = 2048,
// }

export interface Evidence {
  mask: number;
  icon?: string;
  name: string
}

export type EvidenceType =
  'destruction' |
  'disturbedTombs' |
  'electronicDisturbance' |
  'extinguishedFlames' |
  'footsteps' |
  'magneticDistortion' |
  'metallicSignature' |
  'radarDetection' |
  'radioactivity' |
  'reanimation' |
  'tremors' |
  'vocalResponse';

export const Evidences: Readonly<Record<EvidenceType, Evidence>> = {
  destruction: {
    mask: 1,
    icon: '',
    name: 'Destruction',
  },
  disturbedTombs: {
    mask: 2,
    icon: '',
    name: 'Disturbed Tombs'
  },
  electronicDisturbance: {
    mask: 4,
    icon: '',
    name: 'Electronic Disturbance'
  },
  extinguishedFlames: {
    mask: 8,
    icon: '',
    name: 'Extinguished Flames'
  },
  footsteps: {
    mask: 16,
    icon: '',
    name: 'Footsteps'
  },
  magneticDistortion: {
    mask: 32,
    icon: '',
    name: 'Magnetic Distortion'
  },
  metallicSignature: {
    mask: 64,
    icon: '',
    name: 'Metallic Signature'
  },
  radarDetection: {
    mask: 128,
    icon: '',
    name: 'Radar Detection'
  },
  radioactivity: {
    mask: 256,
    icon: '',
    name: 'Radioactivity'
  },
  reanimation: {
    mask: 512,
    icon: '',
    name: 'Reanimation'
  },
  tremors: {
    mask: 1024,
    icon: '',
    name: 'Tremors'
  },
  vocalResponse: {
    mask: 2048,
    icon: '',
    name: 'Vocal Response'
  }
}
