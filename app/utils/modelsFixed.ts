export default [
  {
    symbolicID: 'StereoImager',
    id: 0,
    category: 4,
    name: 'Stereo Imager',
    shortname: 'Imager',
    params: [
      {
        default: 0,
        max: 2,
        min: 0,
        name: 'StereoImager Type',
        persist: 0,
        symbolicID: 'StereoImagerType',
        valueType: 0
      }
    ]
  },
  {
    symbolicID: 'MIC',
    id: 0,
    category: 4,
    name: 'Mic',
    shortname: 'Mic',
    params: [
      {
        default: 0.5,
        max: 1,
        min: 0,
        name: 'Mic Low',
        persist: 0,
        symbolicID: 'MicLowGain',
        valueType: 1
      },
      {
        default: 0.5,
        max: 1,
        min: 0,
        name: 'Mic Mid',
        persist: 0,
        symbolicID: 'MicMidGain',
        valueType: 1
      },
      {
        default: 0.5,
        max: 1,
        min: 0,
        name: 'Mic High',
        persist: 0,
        symbolicID: 'MicHiGain',
        valueType: 1
      },
      {
        default: 0.5,
        max: 1,
        min: 0,
        name: 'Mic Reverb',
        persist: 0,
        symbolicID: 'MicRevMix',
        valueType: 1
      },
      {
        default: 0,
        max: 1,
        min: 0,
        name: 'HPF',
        persist: 0,
        symbolicID: 'MicHPFEnable',
        valueType: 0
      }
    ]
  },
  {
    symbolicID: 'noiseGate',
    id: 0,
    category: 4,
    name: 'Noise Gate',
    shortname: 'Gate',
    params: [
      {
        default: -96,
        max: 0,
        min: -96,
        name: 'Threshold',
        persist: 0,
        symbolicID: 'Thresh',
        valueType: 1
      },
      {
        default: 0.05,
        max: 1,
        min: 0,
        name: 'Decay',
        persist: 0,
        symbolicID: 'Decay',
        valueType: 1
      },
      {
        default: true,
        max: true,
        min: false,
        name: 'Enabled',
        persist: 0,
        symbolicID: '@enabled',
        valueType: 2
      }
    ]
  },
  {
    symbolicID: 'speakerSimulator',
    id: 0,
    category: 4,
    name: 'Speaker Simulator',
    shortname: 'Speaker Sim',
    params: [
      {
        default: 0,
        max: 16,
        min: -1,
        name: 'Type',
        persist: 0,
        symbolicID: 'SpkSimType',
        valueType: 0
      }
    ]
  },
  {
    symbolicID: 'L6DigitalDelayAco',
    id: 0,
    category: 1,
    name: 'L6DigitalDelayAco',
    shortname: 'L6DigitalDelayAco',
    params: [
      {
        default: 0.391,
        max: 1,
        min: 0,
        name: 'Time',
        persist: 0,
        symbolicID: 'Time',
        valueType: 1
      },
      {
        default: 0.39,
        max: 1,
        min: 0,
        name: 'Feedback',
        persist: 0,
        symbolicID: 'Feedback',
        valueType: 1
      },
      {
        default: 0.5,
        max: 1,
        min: 0,
        name: 'Bass',
        persist: 0,
        symbolicID: 'Bass',
        valueType: 1
      },
      {
        default: 0.5,
        max: 1,
        min: 0,
        name: 'Treble',
        persist: 0,
        symbolicID: 'Treble',
        valueType: 1
      },
      {
        default: 0.5,
        max: 1,
        min: 0,
        name: 'Mix',
        persist: 0,
        symbolicID: '@wetDry',
        valueType: 1
      },
      {
        default: true,
        max: true,
        min: false,
        name: 'Enabled',
        persist: 0,
        symbolicID: '@enabled',
        valueType: 2
      }
    ]
  },
  {
    symbolicID: '@global_params',
    id: 1047527424,
    name: 'Globals',
    shortname: 'Globals',
    params: [
      {
        default: 300,
        max: 1000,
        min: 110,
        name: 'Tempo',
        persist: 0,
        symbolicID: 'THRPresetParamTempo',
        valueType: 0
      }
    ]
  }
]
