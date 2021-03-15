
export const myMixin = {
  data(){
    return{
      BPheader: [
        [
          {
            value: 'DES',
            rowspan: '2',
            scope: 'col'
          },
          {
            value: 'PART',
            rowspan: '2',
            scope: 'col'
          },
          {
            value: 'Length',
            colspan: '2',
            scope: 'col'
          },
          {
            value: 'Amt., m',
            rowspan: '2',
            scope: 'col'
          },
        ],
        [
          {
            value: 'Grid'
          },
          {
            value: 'Meter'
          },
       
        ]
      ],
      AreaHeader: [
        [
          {
            value: 'No',
            rowspan: '2'
          },
          {
            value: 'Length',
            colspan: '2'
          },
          {
            value: 'Width',
            colspan: '2'
          },
          {
            value: 'Item',
            rowspan: '2'
          },
          {
            value: `Area, m${"2".sup()}`,
            rowspan: '2'
          },
        ],
        [
          {
            value: 'Grid'
          },
          {
            value: 'Meter'
          },
          {
            value: 'Grid'
          },
          {
            value: 'Meter'
          },
        ]
      ],
      itemList: ['balcony', 'parapet', 'roofgarden'],
      //PITCH HEADERS
      standardHeaders: ['FL', 'P1', 'P2', 'P3'],
      mrHeaders: ['MR', 'P1', 'P2', 'P3'],
      spHeaders: ['SP', 'P1', 'P2', 'P3'],
      
    }
  },
  created(){
     for(let i = 1; i <= 3 ; i++){
       this.itemList.push(`inside garden ${i}F`)
     }
  }

}