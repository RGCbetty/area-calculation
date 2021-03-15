export const Description = {
    data(){
      return{
        headerRow: [
          [
            {
              value: 'No',
              rowspan: '2'
            },
            {
              value: 'Length',
              colspan: '3'
            },
            {
              value: 'Width',
              colspan: '2'
            },
            {
              value: 'Description',
              rowspan: '2'
            },
            {
              value: 'Area, sq.m.',
              rowspan: '2'
            },
          ],
          [
            {
              value: 'Grid'
            },
            {
              value: 'Eaves'
            },
            {
              value: 'Eaves'
            },
            {
              value: 'Grid'
            },
            {
              value: 'Eaves'
            },
          ]
        ],     
        descriptionList: [
          '-',
          'parapet 1F',
          'garage 1F',
          'PH Eaves',
          'Fujyoshitsu 1F' 
        ],
    
      }
    },
    created(){
      for (let i=1; i<=3; i++){
        this.descriptionList.push( `h_wall ${i}F` )
      }
       for (let i=1; i<=3; i++){
        this.descriptionList.push( `balcony ${i}F` )
      }
      let captions = ['MR', 'SP'];
      captions.forEach( caption => {
        for (let p=1; p<=3; p++){
          for (let fl=1; fl<=3; fl++){
            this.descriptionList.push( `${caption} ${fl}F eaves p${p}` )  
          }
        }
      })
    }
}