//Source: https://www.autodesk.com/techpubs/autocad/acadr14/dxf/header_section_al_u05_c.htm

module.exports = {
  EXTMAX: {
    name: '$EXTMAX',
    groupCode: [10, 20, 30],
    defaultValues: [42000, 29700, 0],
    description: 'X, Y, and Z drawing extents upper-right corner (in WCS)',
  },

  EXTMIN: {
    name: '$EXTMIN',
    groupCode: [10, 20, 30],
    defaultValues: [0, 0, 0],
    description: 'X, Y, and Z drawing extents lower-left corner (in WCS)',
  },

  INSBASE: {
    name: '$INSBASE',
    groupCode: [10, 20, 30],
    defaultValues: [0, 0, 0],
    description: 'Insertion base set by BASE command (in WCS)',
  },

  LIMMAX: {
    name: '$LIMMAX',
    groupCode: [10, 20],
    defaultValues: [42000, 29700],
    description: 'XY drawing limits upper-right corner (in WCS)',
  },

  LIMMIN: {
    name: '$LIMMIN',
    groupCode: [10, 20],
    defaultValues: [0, 0],
    description: 'XY drawing limits lower-left corner (in WCS)',
  },

  LTSCALE: {
    name:'$LTSCALE',
    groupCode: [40],
    defaultValues:[100],
    description: 'Global linetype scale',
  },
}