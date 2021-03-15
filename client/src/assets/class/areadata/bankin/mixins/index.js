
export const myMixin = {
    data(){
      return{
        headerRow: [
          [
            {
              value: 'Flr. Level',
              rowspan: '1',
              scope: 'col'
            },
         
           
            {
              value: '1F',
              colspan: '3',
              scope: 'col'
            },
            {
              value: '2F',
              colspan: '3',
              scope: 'col'
            },
            
            {
              value: '3F',
              colspan: '3',
              scope: 'col'
            },
          ],
          [
            {
              value: 'Direction',
              scope: 'col'
            },
            {
              value: 'Grids'
            },
            {
              value: 'Const'
            },
            {
              value: 'Irr.'
            },
            {
              value: 'Grids'
            },
            {
              value: 'Const'
            },
            {
              value: 'Irr.'
            },
            {
              value: 'Grids'
            },
            {
              value: 'Const'
            },
            {
              value: 'Irr.'
            },
          ]
        ],
        parapetOnly: [
          [
            {
              value: 'Direction',
              rowspan: '2',
              scope: 'col'
            },
           
            {
              value: 'Length',
              colspan: '2',
              scope: 'col'
            },
            {
              value: 'Parapet',
              colspan: '1',
              scope: 'col'
            },
            
            {
              value: `Area, m${"2".sup()}`,
              rowspan: '2',
              scope: 'col'
            },
          ],
          [
            {
              value: 'Grids'
            },
            {
              value: 'Addt\'l'
            },
            {
              value: 'Height'
            },
          ]
        ],
        withRoof: [
          [
            {
              value: 'Direction',
              rowspan: '2',
              scope: 'col'
            },
            {
              value: 'Pitch',
              rowspan: '2',
              scope: 'col'
            },
            {
              value: 'Length',
              colspan: '2',
              scope: 'col'
            },
            {
              value: 'Width',
              rowspan: '2',
              scope: 'col'
            },
            
            {
              value: `Area, m${"2".sup()}`,
              rowspan: '2',
              scope: 'col'
            },
          ],
          [
            {
              value: 'Grids'
            },
            {
              value: 'Addt\'l'
            },
         
          ]
        ],
        rowHeader: [
          {
           value: 'east',
           scope: 'row',
           alignment: 'text-center'

          },
          {
            value: 'west',
            scope: 'row',
            alignment: 'text-center'
          },
          {
            value: 'south',
            scope: 'row',
            alignment: 'text-center'
          },
          {
            value: 'north',
            scope: 'row',
            alignment: 'text-center'
          },
        ],  
         
        headerBankin: [
          'No.',
          'Grids',
          'Add\'l',
          'Const',
          'ITEM',
          'Dir',
          'Length, M'
        ],
        descriptionList: []
      }
    },
    created(){
      // for(let i = 1; i<=3; i++){
      //   for(let j = 1; j<=3; j ++){
      //   this.descriptionList.push(`tanitoi ${j}FP${i}`)
      //   } 
      // }
        for(let j = 1; j <=3; j++){
          for(let k = 1; k <= 3; k++){
            this.descriptionList.push(`amaosae s ${k}F p${j}`)
          }
        }
        for(let j = 1; j <=3; j++){
          for(let k = 1; k <= 3; k++){
            this.descriptionList.push(`amaosae geya s ${k}F p${j}`)
          }
        }
      // for(let i = 1; i<=3; i++){
      //   for(let j = 1; j<=3; j ++){
      //   this.descriptionList.push(`add'l sute ${j}FP${i}`)
      //   } 
      // }
        for(let k = 1; k <= 3; k++){
          this.descriptionList.push(`amaosae h ${k}F`)
        }
        for(let k = 1; k <= 3; k++){
          this.descriptionList.push(`amaosae geya h ${k}F`)
        }
    }
  
}