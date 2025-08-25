import type { AmpMap } from '~/utils/schemas'

export default <AmpMap[]> [
  {
    channelId: 'clean',
    channel: 'Clean',
    styleId: 'classic',
    style: 'Classic',
    inspiration: 'Fender Deluxe',
    modded: false,
    description: 'A low-gain preamp for sparkling American-style cleans, with 6L6 tubes in the output stage for brightness and a strong midrange',
    symbolicID: 'THR10C_Deluxe',
    split: 'lhs'
  },
  {
    channelId: 'clean',
    channel: 'Clean',
    styleId: 'boutique',
    style: 'Boutique',
    inspiration: 'Fender Blues Jr',
    modded: true,
    description: 'A low-watt EL34 design. Turning up the preamp gain will thicken up the cleans, then push into bluesy overdrive',
    symbolicID: 'THR10C_BJunior2',
    split: 'lhs'
  },
  {
    channelId: 'clean',
    channel: 'Clean',
    styleId: 'modern',
    style: 'Modern',
    inspiration: 'Dr. Z Carmen Ghia',
    modded: false,
    description: 'A boutique, low-watt EL84 design that adds fullness and sustain as the master volume is turned up. A great match for neck pickups',
    symbolicID: 'THR30_Carmen',
    split: 'lhs'
  },
  {
    channelId: 'crunch',
    channel: 'Crunch',
    styleId: 'classic',
    style: 'Classic',
    inspiration: 'Matchless DC30',
    modded: true,
    description: 'EL84 power tubes in a true Class-A configuration with a highly responsive EQ for rich, complex harmonic tones and warm overdrive. Inspired by British chime',
    symbolicID: 'THR10C_DC30',
    split: 'lhs'
  },
  {
    channelId: 'crunch',
    channel: 'Crunch',
    styleId: 'boutique',
    style: 'Boutique',
    inspiration: 'DRZ Mini Z',
    modded: true,
    description: 'A deceptively simple amp circuit with just a single 12AX7 and EL84. A full, no-frills tone that is highly responsive to picking dynamics',
    symbolicID: 'THR10C_Mini',
    split: 'lhs'
  },
  {
    channelId: 'crunch',
    channel: 'Crunch',
    styleId: 'modern',
    style: 'Modern',
    inspiration: 'Vox AC30 and Matchless DC30',
    modded: false,
    description: 'A mid-volume boutique design with 6550 power tubes. Listen for tight bass response and a singing sustain',
    symbolicID: 'THR30_SR101',
    split: 'lhs'
  },
  {
    channelId: 'lead',
    channel: 'Lead',
    styleId: 'classic',
    style: 'Classic',
    inspiration: 'Marshall Plexi / Super Lead',
    modded: false,
    description: 'A low-gain preamp with an EL34-based power section that breaks into classic British overdrive as the master volume is pushed',
    symbolicID: 'THR10_Lead',
    split: 'lhs'
  },
  {
    channelId: 'lead',
    channel: 'Lead',
    styleId: 'boutique',
    style: 'Boutique',
    inspiration: 'Marshall 1987X 50W Plexi',
    modded: true,
    description: 'A version of the Classic/Lead circuit, modified for extra gain with a darker tone and scooped mids',
    symbolicID: 'THR30_Blondie',
    split: 'lhs'
  },
  {
    channelId: 'lead',
    channel: 'Lead',
    styleId: 'modern',
    style: 'Modern',
    inspiration: 'Hot rodded Marshall JCM800',
    modded: false,
    description: 'A high-gain design with 12AX7s into EL34s, for the tone that defined 1980s hard rock and heavy metal',
    symbolicID: 'THR10_Brit',
    split: 'lhs'
  },
  {
    channelId: 'hiGain',
    channel: 'Hi Gain',
    styleId: 'classic',
    style: 'Classic',
    inspiration: 'Mesa/Boogie Dual Rectifier',
    modded: false,
    description: 'Powerful modern distortion that fills out as the high-gain preamp is pushed. Tread carefully after 12 o\'clock',
    symbolicID: 'THR10_Modern',
    split: 'lhs'
  },
  {
    channelId: 'hiGain',
    channel: 'Hi Gain',
    styleId: 'boutique',
    style: 'Boutique',
    inspiration: 'Mixed inspiration from various German high gain amps',
    modded: false,
    description: 'ECC83s into 6L6s for high gain with a highly responsive EQ, inspired by German engineering',
    symbolicID: 'THR30_FLead',
    split: 'lhs'
  },
  {
    channelId: 'hiGain',
    channel: 'Hi Gain',
    styleId: 'modern',
    style: 'Modern',
    inspiration: 'EVH 5150-III Channel 3',
    modded: true,
    description: 'A boosted version of the Classic/Special amp, with even more gain for aggressive rhythms or searing leads',
    symbolicID: 'THR10X_Brown2',
    split: 'lhs'
  },
  {
    channelId: 'special',
    channel: 'Special',
    styleId: 'classic',
    style: 'Classic',
    inspiration: 'EVH 5150-III Channel 2',
    modded: true,
    description: '12AX7 and 6L6 tubes in pursuit of the "Brown" sound. Set the gain around 11 o\'clock for classic rock crunch, or crank it for saturated rhythm tones',
    symbolicID: 'THR10X_Brown1',
    split: 'lhs'
  },
  {
    channelId: 'special',
    channel: 'Special',
    styleId: 'boutique',
    style: 'Boutique',
    inspiration: 'KRANK Krankenstein',
    modded: true,
    description: 'Four 12AX7 preamp tubes into 6L6 output tubes. Tight, fast tracking for crushing highgain',
    symbolicID: 'THR10X_South',
    split: 'lhs'
  },
  {
    channelId: 'special',
    channel: 'Special',
    styleId: 'modern',
    style: 'Modern',
    inspiration: 'Booster circuit + EVH Stealth channel 3',
    modded: true,
    description: 'A classic overdrive circuit before the preamp tightens low-frequency response and provides even more gain. Ideal for extended-range guitars',
    symbolicID: 'THR30_Stealth',
    split: 'lhs'
  },
  {
    channelId: 'bass',
    channel: 'Bass',
    styleId: 'classic',
    style: 'Classic',
    inspiration: 'Eden Terra Nova / Markbass Little Marcus',
    modded: false,
    description: 'Woody, vintage tone with late breakup',
    symbolicID: 'THR10_Bass_Eden_Marcus',
    split: 'rhs'
  },
  {
    channelId: 'bass',
    channel: 'Bass',
    styleId: 'boutique',
    style: 'Boutique',
    inspiration: 'Mesa/Boogie Subway ',
    modded: false,
    description: 'Full, modern tone that breaks into a fuzz-like overdrive when pushed hard',
    symbolicID: 'THR10_Bass_Mesa',
    split: 'rhs'
  },
  {
    channelId: 'bass',
    channel: 'Bass',
    styleId: 'modern',
    style: 'Modern',
    inspiration: 'JK\'s original based on Marshall circuits',
    modded: false,
    description: 'Vintage voicing with early breakup for overdrive that works well with bass or guitar',
    symbolicID: 'THR30_JKBass2',
    split: 'rhs'
  },
  {
    channelId: 'acoustic',
    channel: 'Acoustic',
    styleId: 'classic',
    style: 'Classic',
    inspiration: 'Condenser Mic',
    modded: false,
    description: 'Designed for acoustic-electric guitar, modeling the response of a boutique condenser microphone',
    symbolicID: 'THR10_Aco_Condenser1',
    split: 'rhs'
  },
  {
    channelId: 'acoustic',
    channel: 'Acoustic',
    styleId: 'boutique',
    style: 'Boutique',
    inspiration: 'Tube Mic',
    modded: false,
    description: 'Designed for acoustic-electric guitar, modeling the response of a boutique tube microphone',
    symbolicID: 'THR10_Aco_Tube1',
    split: 'rhs'
  },
  {
    channelId: 'acoustic',
    channel: 'Acoustic',
    styleId: 'modern',
    style: 'Modern',
    inspiration: 'Dynamic Mic',
    modded: false,
    description: 'Designed for acoustic-electric guitar, modeling the response of a boutique dynamic microphone',
    symbolicID: 'THR10_Aco_Dynamic1',
    split: 'rhs'
  },
  {
    channelId: 'flat',
    channel: 'Flat',
    styleId: 'classic',
    style: 'Classic',
    inspiration: 'Direct Injection: Flat',
    modded: false,
    description: 'A neutral tone with no amp or speaker modeling. Great for connecting other instruments to your THR',
    symbolicID: 'THR10_Flat',
    split: 'rhs'
  },
  {
    channelId: 'flat',
    channel: 'Flat',
    styleId: 'boutique',
    style: 'Boutique',
    inspiration: 'Direct Injection: Bass boost',
    modded: false,
    description: 'A neutral tone with no amp or speaker modeling, and a slight bass boost. Great for connecting other instruments to your THR',
    symbolicID: 'THR10_Flat_B',
    split: 'rhs'
  },
  {
    channelId: 'flat',
    channel: 'Flat',
    styleId: 'modern',
    style: 'Modern',
    inspiration: 'Direct Injection: Mid-scoop',
    modded: false,
    description: 'A neutral tone with no amp or speaker modeling, and a slight mid scoop. Great for connecting other instruments to your THR',
    symbolicID: 'THR10_Flat_V',
    split: 'rhs'
  }
]
