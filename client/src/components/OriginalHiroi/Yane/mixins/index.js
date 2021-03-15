export const Description = {
  data(){
    return{
      YaneHeader: [
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
            colspan: '3'
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
          {
            value: 'Eaves'
          }
        ]
      ],       
      descriptionList: [
        '-',
      ],
    }
  },
  created(){
    const roofs = ['MR', 'SP'];
    for(let roof of roofs){
      for (let p=1; p<=3; p++){
        for (let fl=1; fl<=3; fl++){
          this.descriptionList.push( `${roof} ${fl}F area p${p}` );  
          if(roof == 'SP') continue;
          this.descriptionList.push( `MR ${fl}F deduct p${p}` ); 
          this.descriptionList.push( `MR ${fl}F yosemune p${p}` );
          this.descriptionList.push( `MR ${fl}F kiritsuma p${p}` );
          this.descriptionList.push( `MR perimeter p${p}` );
        }
      }
    }  
    const PHcaptions = ['area', 'deduct', 'perimeter'];
    for(let captions of PHcaptions){
      for(let i=0; i<=2; i++){
        this.descriptionList.push(`PH ${captions}`)
      }
    }
    for (let i=1; i<=2; i++){
      this.descriptionList.push( `L perimeter ${i}F` )
    }
    
  }
}