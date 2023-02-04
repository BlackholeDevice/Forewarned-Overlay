export enum Evidence {
  footsteps = 1,
  tremors = 2,
  destruction = 4,
  disturbedTombs = 8,
  electronicDisturbance = 16,
  extinguishedFlames = 32,
  magneticDistortion = 64,
  metallicSignature = 128,
  vocalResponse = 256,
  radarDetection = 512,
  radioactivity = 1024,
  reanimation = 2048,
}

export const EvidenceLang: { [key: string]: string } = {
  [Evidence.footsteps]: 'Footsteps',
  [Evidence.tremors]: 'Tremors',
  [Evidence.destruction]: 'Destruction',
  [Evidence.disturbedTombs]: 'Disturbed Tombs',
  [Evidence.electronicDisturbance]: 'Electronic Disturbance',
  [Evidence.extinguishedFlames]: 'Extinguished Flames',
  [Evidence.magneticDistortion]: 'Magnetic Distortion',
  [Evidence.metallicSignature]: 'Metallic Signature',
  [Evidence.vocalResponse]: 'Vocal Response',
  [Evidence.radarDetection]: 'Radar Detection',
  [Evidence.radioactivity]: 'Radioactivity',
  [Evidence.reanimation]: 'Reanimation',
};
