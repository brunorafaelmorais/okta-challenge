import { tint, shade } from 'polished';

export default {
  settings: {
    radius: '4px',

    gutterXs: '5px',
    gutterSm: '10px',
    gutterMd: '16px',
    gutterLg: '20px',
    gutterXl: '32px',
  },

  colors: {
    primary: '#083a6b',
    primaryRgb: '56,128,255',
    primaryContrast: '#FFF',
    primaryContrastRgb: '255,255,255',
    primaryShade: shade(0.12, '#083a6b'),
    primaryTint: tint(0.12, '#083a6b'),

    background: '#FFF',
    backgroundShade: shade(0.2, '#FFF'),
    backgroundTint: tint(0.2, '#FFF'),

    text: 'rgba(0,0,0,0.87)',
  },
};
