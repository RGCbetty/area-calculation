
export const myMixin = {
  data(){
    return{
      subTotalHeader: ['No.'],
      descriptionList: [],
      HafuHeaders: [
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
            value: 'Sub-Total',
            rowspan: '2'
          },
          {
            value: 'Description',
            rowspan: '2'
          },
        ],
        [
          {
            value: 'Grid'
          },
          {
            value: 'Eaves',
            colspan: '2'
          },
        ]
      ],
      HafuHeader: ['num', 'grids', 'eaves', 'eaves1', 'subTotal', 'description'],
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
      for(let i = 1; i <= 3; i++){
        this.descriptionList.push(`HANA horizontal ${i}F`)
      }
      for(let j = 1; j <= 3; j++){
        for(let k = 1; k <= 3; k++){
          this.descriptionList.push(`HAFU slant ${k}F P${j}`)
        }
      }
      for(let i = 1; i <= 3; i++){
        if(i%2==0){
          this.subTotalHeader.push(`HANA ${i}F`)
          this.subTotalHeader.push(`HAFU ${i}F`)
        } else {
          this.subTotalHeader.push(`HANA ${i}F`)
          this.subTotalHeader.push(`HAFU ${i}F`)
        } 
      }
  }

}