export default [
  {
    symbolicID: 'RedComp',
    id: 0,
    category: 1,
    name: 'Compressor',
    shortname: 'Compressor',
    params: [
      {
        default: 0.3,
        max: 1,
        min: 0,
        name: 'Sustain',
        persist: 0,
        symbolicID: 'Sustain',
        valueType: 1
      },
      {
        default: 0.83,
        max: 1,
        min: 0,
        name: 'Level',
        persist: 0,
        symbolicID: 'Level',
        valueType: 1
      },
      {
        default: true,
        max: true,
        min: false,
        name: 'Enabled',
        persist: 1000,
        symbolicID: '@enabled',
        valueType: 2
      }
    ]
  },
  {
    symbolicID: 'VettaComp',
    id: 0,
    category: 1,
    name: 'Compressor',
    shortname: 'Compressor',
    params: [
      {
        default: 0.31,
        max: 1,
        min: 0,
        name: 'Sens',
        persist: 0,
        symbolicID: 'Sens',
        valueType: 1
      },
      {
        default: 0.83,
        max: 1,
        min: 0,
        name: 'Level',
        persist: 0,
        symbolicID: 'Level',
        valueType: 1
      },
      {
        default: true,
        max: true,
        min: false,
        name: 'Enabled',
        persist: 1000,
        symbolicID: '@enabled',
        valueType: 2
      }
    ]
  }
]
