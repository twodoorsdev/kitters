const sharedColors = {
  primary: {
    $1: '#e8d3f9',
    $2: '#d0a8f1',
    $3: '#b67de9',
    $4: '#9950e0',
    $5: '#7819d7',
    $6: '#601aa8',
    $7: '#49197b',
    $8: '#331551',
    $9: '#1e102b',
  },
  secondary: {
    $1: '#faf7d7',
    $2: '#f3efae',
    $3: '#ebe785',
    $4: '#e2df59',
    $5: '#d7d719',
    $6: '#a8a81d',
    $7: '#7c7b1d',
    $8: '#525119',
    $9: '#2b2a12',
  },
  accent: {
    $1: '#def8d6',
    $2: '#bbf1ad',
    $3: '#95e983',
    $4: '#68e057',
    $5: '#19d719',
    $6: '#23a81c',
    $7: '#237b1c',
    $8: '#1f5118',
    $9: '#162b11',
  },
} as const;

const shared = {
  space: {
    $1: 8,
    $2: 16,
    $3: 24,
    $4: 28,
    $5: 36,
    $6: 48,
    $7: 64,
    $8: 72,
    $9: 128,

    none: 0,
    auto: 'auto',
    full: '100%',
  },

  fontSizes: {
    $1: 14,
    $2: 16,
    $3: 20,
    $4: 24,
    $5: 28,
    $6: 36,
    $7: 48,
    $8: 64,
    $9: 72,
  },

  fontWeights: {
    bold: '500',
  },

  radii: {
    $1: 5,
    $2: 10,
    $3: 15,
    $4: 20,
    $5: 25,
    $6: 50,
    $7: 75,

    none: 0,
    circle: 100,
  },

  borderWidths: {
    $1: 1,
    $2: 2,
    $3: 3,
    $4: 4,
    $5: 5,
    $6: 6,
    $7: 7,
    $8: 8,

    none: 0,
  },
} as const;

export const light = {
  ...shared,
  colors: {
    ...sharedColors,
    typography: {
      $1: '#d6d6d6',
      $2: '#aeaeae',
      $3: '#888888',
      $4: '#646464',
      $5: '#424242',
      $6: '#353535',
      $7: '#292929',
      $8: '#1e1e1e',
      $9: '#121212',
    },
    background: {
      $1: '#ffffff',
      $2: '#ffffff',
      $3: '#ffffff',
      $4: '#ffffff',
      $5: '#ffffff',
      $6: '#c6c6c6',
      $7: '#919191',
      $8: '#5e5e5e',
      $9: '#303030',

      transparent: 'transparent',
      translucent: 'rgba(255, 255, 255, 0.8)',
    },
  },
};

export const dark = {
  ...shared,
  colors: {
    ...sharedColors,
    typography: {
      $1: '#ffffff',
      $2: '#ffffff',
      $3: '#ffffff',
      $4: '#ffffff',
      $5: '#ffffff',
      $6: '#c6c6c6',
      $7: '#919191',
      $8: '#5e5e5e',
      $9: '#303030',
    },
    background: {
      $1: '#d6d6d6',
      $2: '#aeaeae',
      $3: '#888888',
      $4: '#646464',
      $5: '#424242',
      $6: '#353535',
      $7: '#292929',
      $8: '#1e1e1e',
      $9: '#121212',

      transparent: 'transparent',
      translucent: 'rgba(0, 0, 0, 0.8)',
    },
  },
};
