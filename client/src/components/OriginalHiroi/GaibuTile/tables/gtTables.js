const bhwall = () => import('@/components/OriginalHiroi/GaibuTile/tables/hangingWall')
const bEaves = () => import('@/components/OriginalHiroi/GaibuTile/tables/belowEaves')
const bbTable = () => import('@/components/OriginalHiroi/GaibuTile/tables/belowbalcony')
const gtAdd = () => import('@/components/OriginalHiroi/GaibuTile/tables/gtAdditional')
const gtDed = () => import('@/components/OriginalHiroi/GaibuTile/tables/gtDeduction')
const rDed = () => import('@/components/OriginalHiroi/GaibuTile/tables/roofDeduct')
const sash = () => import('@/components/OriginalHiroi/GaibuTile/tables/sash')
const wallSummary = () => import('@/components/OriginalHiroi/GaibuTile/tables/gtSummary')

export{
    bhwall,
    bEaves,
    bbTable,
    gtAdd,
    gtDed,
    rDed,
    sash,
    wallSummary
}