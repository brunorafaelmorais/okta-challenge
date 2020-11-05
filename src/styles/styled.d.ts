import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    settings: {
      radius: string;

      gutterXs: string;
      gutterSm: string;
      gutterMd: string;
      gutterLg: string;
      gutterXl: string;
    };

    colors: {
      primary: string;
      primaryRgb: string;
      primaryContrast: string;
      primaryContrastRgb: string;
      primaryShade: string;
      primaryTint: string;

      background: string;
      backgroundShade: string;
      backgroundTint: string;

      text: string;
    };
  }
}
