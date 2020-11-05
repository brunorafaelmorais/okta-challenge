import { tint, shade } from 'polished';

export default {
  settings: {
    radius: '6px',

    gutterXs: '5px',
    gutterSm: '10px',
    gutterMd: '16px',
    gutterLg: '20px',
    gutterXl: '32px',
  },

  colors: {
    primary: '#FF9000',
    primaryRgb: '56,128,255',
    primaryContrast: '#FFF',
    primaryContrastRgb: '255,255,255',
    primaryShade: shade(0.1, '#FF9000'),
    primaryTint: tint(0.1, '#FF9000'),

    background: '#FFF',
    backgroundShade: shade(0.2, '#FFF'),
    backgroundTint: tint(0.2, '#FFF'),

    text: '#333',
  },
};
