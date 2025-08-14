import { z } from 'zod'

const comp = z.object({
  '@enabled': z.boolean().default(true),
  'Level': z.number().min(0).max(1).default(0.83)
})

const redComp = comp.extend({
  '@asset': z.enum(['RedComp']),
  'Sustain': z.number().min(0).max(1).default(0.3)
})

const vettaComp = comp.extend({
  '@asset': z.enum(['VettaComp']),
  'Sens': z.number().min(0).max(1).default(0.31)
})

const effect = z.object({
  '@enabled': z.boolean().default(false),
  '@wetDry': z.number().min(0).max(1).default(0.5)
})

const stereoSquareChorus = effect.extend({
  '@asset': z.enum(['StereoSquareChorus']),
  'Depth': z.number().min(0).max(1).default(0.2),
  'Feedback': z.number().min(0).max(1).default(0.13),
  'Freq': z.number().min(0).max(1).default(0.04),
  'Pre': z.number().min(0).max(1).default(0.5)
})
const l6Flanger = effect.extend({
  '@asset': z.enum(['L6Flanger']),
  'Depth': z.number().min(0).max(1).default(0.2),
  'Freq': z.number().min(0).max(1).default(0.04)
})

const phaser = effect.extend({
  '@asset': z.enum(['Phaser']),
  'Speed': z.number().min(0).max(1).default(0.04),
  'Feedback': z.number().min(0).max(1).default(0.76)
})

const biasTremolo = effect.extend({
  '@asset': z.enum(['BiasTremolo']),
  'Depth': z.number().min(0).max(1).default(1),
  'Speed': z.number().min(0).max(1).default(0.04)
})

const echo = z.object({
  '@enabled': z.boolean().default(false),
  '@wetDry': z.number().min(0).max(1).default(0.5),
  'Time': z.number().min(0).max(1).default(0.391)
})

const tapeEcho = echo.extend({
  '@asset': z.enum(['TapeEcho']),
  'Bass': z.number().min(0).max(1).default(0.5),
  'Feedback': z.number().min(0).max(1).default(0.63),
  'Treble': z.number().min(0).max(1).default(0)
})

const l6DigitalDelay = echo.extend({
  '@asset': z.enum(['L6DigitalDelay']),
  'Bass': z.number().min(0).max(1).default(0.1),
  'Feedback': z.number().min(0).max(1).default(0.38),
  'Treble': z.number().min(0).max(1).default(0.4)
})

const reverb = z.object({
  '@enabled': z.boolean().default(false),
  '@wetDry': z.number().min(0).max(1).default(0.5),
  'Tone': z.number().min(0).max(1).default(0.5)
})

const standardSpring = reverb.extend({
  '@asset': z.enum(['StandardSpring']),
  'Time': z.number().min(0).max(1).default(0.25)
})

const smallRoom1 = reverb.extend({
  '@asset': z.enum(['SmallRoom1']),
  'Decay': z.number().min(0).max(1).default(0.3),
  'PreDelay': z.number().min(0).max(1).default(0.15)
})

const largePlate1 = reverb.extend({
  '@asset': z.enum(['LargePlate1']),
  'Decay': z.number().min(0).max(1).default(0.3),
  'PreDelay': z.number().min(0).max(1).default(0.15)
})

const reallyLargeHall = reverb.extend({
  '@asset': z.enum(['ReallyLargeHall']),
  'Decay': z.number().min(0).max(1).default(0.15),
  'PreDelay': z.number().min(0).max(1).default(0.1)
})

export const schemaPreset = z.object({
  data: z.object({
    device: z.union([z.literal(2359298), z.literal(2359299), z.literal(2359299)]),
    device_version: z.union([z.literal(18088037), z.literal(18088038), z.literal(3342433)]),
    meta: z.object({
      name: z.string().max(64),
      tnid: z.literal(0)
    }),
    tone: z.object({
      THRGroupAmp: z.object({
        '@asset': z.enum([
          'THR10C_Deluxe',
          'THR10C_BJunior2',
          'THR30_Carmen',
          'THR10_DC30',
          'THR10C_Mini',
          'THR30_SR101',
          'THR10_Lead',
          'THR30_Blondie',
          'THR10_Brit',
          'THR10_Modern',
          'THR30_FLead',
          'THR10X_Brown2',
          'THR10X_Brown1',
          'THR10X_South',
          'THR30_Stealth',
          'THR10_Bass_Eden_Marcus',
          'THR10_Bass_Mesa',
          'THR30_JKBass2',
          'THR10_Aco_Condenser1',
          'THR10_Aco_Tube1',
          'THR10_Aco_Dynamic1',
          'THR10_Flat',
          'THR10_Flat_B',
          'THR_Flat_V'
        ]),
        'Bass': z.number().min(0).max(1).default(0.5),
        'Drive': z.number().min(0).max(1).default(0.5),
        'Master': z.number().min(0).max(1).default(0.5),
        'Mid': z.number().min(0).max(1).default(0.5),
        'Treble': z.number().min(0).max(1).default(0.5)
      }),
      THRGroupCab: z.object({
        '@asset': z.literal('speakerSimulator'),
        'SpkSimType': z.number().min(-1).max(16).default(0)
      }),
      THRGroupFX1Compressor: z.union([redComp, vettaComp]),
      THRGroupFX2Effect: z.union([
        stereoSquareChorus,
        l6Flanger,
        phaser,
        biasTremolo
      ]),
      THRGroupFX3EffectEcho: z.union([
        tapeEcho,
        l6DigitalDelay
      ]),
      THRGroupFX4EffectReverb: z.union([
        standardSpring,
        smallRoom1,
        largePlate1,
        reallyLargeHall
      ]),
      THRGroupGate: z.object({
        '@asset': z.literal('noiseGate'),
        '@enabled': z.boolean().default(false),
        'Decay': z.number().min(0).max(1).default(0.05),
        'Thresh': z.number().min(-96).max(0).default(-96)
      }),
      global: z.object({
        THRPresetParamTempo: z.number().min(110).max(1000).default(300)
      })
    })
  }),
  meta: z.object({
    original: z.literal(0),
    pbn: z.literal(0),
    premium: z.number()
  }),
  schema: z.literal('L6Preset'),
  version: z.literal(5)
})
