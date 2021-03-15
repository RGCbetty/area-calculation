const LTYPES = [
  { 
    name: 'CONTINUOUS',
    standardFlag: 64,
    description: '実線',
    patterns: [],
    patternType: [],
    patternLength: 0 
  },

  { 
    name: 'DASHED1',
    standardFlag: 64,
    description: '--  --  --  --  --  --  --  --  ',
    patterns: [ 1.25, -1.25 ],
    patternType: [],
    patternLength: 2.5 
  },

  { 
    name: 'DASHED2',
    standardFlag: 64,
    description: '----    ----    ----    ----    ',
    patterns: [ 2.5, -2.5 ],
    patternType: [],
    patternLength: 5 
  },

  { 
    name: 'DASHED3',
    standardFlag: 64,
    description: '------  ------  ------  ------  ',
    patterns: [ 3.75, -1.25 ],
    patternType: [],
    patternLength: 5 
  },

  { 
    name: 'CENTER1',
    standardFlag: 64,
    description: '----- - ----- - ----- - ----- - ',
    patterns: [ 6.25, -1.25, 1.25, -1.25 ],
    patternType: [],
    patternLength: 10 
  },

  { 
    name: 'CENTER2',
    standardFlag: 64,
    description: '----------  --  ----------  --  ',
    patterns: [ 12.5, -2.5, 2.5, -2.5 ],
    patternType: [],
    patternLength: 20 
  },

  { 
    name: 'PHANTOM1',
    standardFlag: 64,
    description: '--- - - --- - - --- - - --- - - ',
    patterns: [ 3.25, -1.25, 1.25, -1.25, 1.25, -1.25 ],
    patternType: [],
    patternLength: 10 
  },

  {
    name: 'PHANTOM2',
    standardFlag: 64,
    description: '--------  -  -  --------  -  -  ',
    patterns: [ 10, -2.5, 1.25, -2.5, 1.25, -2.5 ],
    patternType: [],
    patternLength: 20 
  },

  { 
    name: 'DOT',
    standardFlag: 64,
    description: '-   -   -   -   -   -   -   -   ',
    patterns: [ 0.625, -1.875 ],
    patternType: [],
    patternLength: 2.5 
  }
]

module.exports = {
  LTYPES
}