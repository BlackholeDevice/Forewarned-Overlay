export enum Evidence {
  destruction = 1,
  disturbedTombs = 2,
  electronicDisturbance = 4,
  extinguishedFlames = 8,
  footsteps = 16,
  magneticDistortion = 32,
  metallicSignature = 64,
  radarDetection = 128,
  radioactivity = 256,
  reanimation = 512,
  tremors = 1024,
  vocalResponse = 2048  ,
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
