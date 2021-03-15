<template>
 
  <v-layout>
    <v-flex xs12>

      <v-card flat>
        <v-card-title v-text="'Bearing Wall'"/>
        <v-card-text>
          <v-simple-table
            dense
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th 
                    v-for="(th, th_i) in headers" 
                    :key="th_i" 
                    class="text-center"
                    v-text="th.text"
                  />
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(tr, tr_i) in items" :key="tr_i" 
                  class="text-center"
                >
                  <td v-text="tr.floorName"/>
                  <td v-text="tr.zone"/>
                  <td v-text="tr.coordinates"/>
                  <td v-text="tr.value"/>
                  <td v-text="tr.length"/>
                  <td v-text="tr.volume"/>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <template 
            v-for="(floor) in value" 
          >

            <v-card
              :key="'fl'+floor"
            >
              <v-card-title>
                {{ floor.floorName}}
              </v-card-title>

              <v-card-text>

                <template 
                  v-for="(axis) in axes" 
                >

                  <div 
                    :key="'axis_' + axis"
                    class="flex-container"
                  >
                    <div 
                      class="flex-container-side"
                    >{{axis.name}} 軸方向</div>

                    
                    <div>
                      <div>
                        
                        <div
                          class="flex-container"
                          
                        >
                          <div>
                            <div
                            >
                              <template>

                              
                              <div

                              >
                                <div
                                  class="flex-container"
                                >
                                  
                                  <div>
                                    1/4
                                  </div>
                                  <div>
                                    
                                    coordinate value
                                  </div>
                                  <div>
                                    <template
                                      v-for="(bwValue, bwValue_i) in floor[axis].zones[0].values"
                                    >
                                      <div
                                        :key="'bwValue_value' + bwValue_i"
                                      >
                                        {{bwValue.bWValue}}
                                      </div>
                                      <v-divider
                                        v-if="bwValue_i < floor[axis].zones[0].values.length-1" 
                                        :key="'bwValue_value_div' + bwValue_i"
                                      
                                      ></v-divider>
                                    </template>
                                  </div>
                                  <div>
                                    <template
                                      v-for="(bwValue, bwValue_i) in floor[axis].zones[0].values"
                                    >
                                      <div
                                        :key="'bwValue_length' + bwValue_i"
                                      >
                                        <span v-roundTo="[bwValue.bWLength, 3]"></span>
                                      </div>
                                      <v-divider
                                        v-if="bwValue_i < floor[axis].zones[0].values.length-1" 
                                        :key="'bwValue_length_div' + bwValue_i"
                                      
                                      ></v-divider>
                                    </template>
                                  </div>
                        
                                  <div>
                                    <template
                                      v-for="(bwValue, bwValue_i) in floor[axis].zones[0].values"
                                    >
                                      <div
                                        :key="'bwValue_volume' + bwValue_i"
                                      >
                                        <span v-roundTo="[bwValue.wallVolume, 3]"></span>
                                      </div>
                                      <v-divider
                                        v-if="bwValue_i < floor[axis].zones[0].values.length-1" 
                                        :key="'bwValue_volume_div' + bwValue_i"
                                      
                                      ></v-divider>
                                    </template>
                                    
                                  </div>

                                  <div>
                                    {{ floor[axis].zones[0].values.reduce( (total, item) => total + item.wallVolume, 0) }}
                                  </div>

                                  <div>
                                    必要壁量 
                                  </div>

                                  <div>
                                    充足率
                                  </div>
                                  
                                </div>

                                <v-divider></v-divider>

                                


                                <div>

                                  
                                    2. １／４
                                  
                                </div>
                              </div>

                              </template>
                              
                            </div>
                            <div
                             
                            >
                              
                            </div>
                            
                          </div>
                          
                        </div>

                        
                      </div>
                      
                    
                    </div>

                    <div
                      class="flex-container-side"
                    >充足比率</div>
                    
                  </div>

                  <v-divider 
                    :key="'d'+axis"
                  ></v-divider>

                  
                </template>  
                
              </v-card-text>

            </v-card>
          </template>

          {{value}}
          
        </v-card-text>
      </v-card>

     
    </v-flex>
  </v-layout>

</template>

<script>

import roundTo from '../../plugins/roundto'

export default {
  props:[
    'items',
    'value'
  ],

  mixins:[
    roundTo
  ],

  data: () => ({
    headers:[
      { text: '方向・階', value: 'floorName' },
      { text: 'ゾーン', value: 'zone' },
      { text: '１／４', value: 'coordinates' },
      { text: '壁倍率', value: 'value' },
      { text: '壁の実長', value: 'length' },
      { text: '存在壁量', value: 'volume' }
    ],

    axes:[
      {
        name: 'x', 
        value: [
          {name: '上'},
          {name: '下'}
        ]
      },

      {
        name: 'y', 
        value: [
          {name: '左'},
          {name: '右'}
        ]
      }
      
    ]

  }),

  computed: {
    getOneFourthValue(axis, oneFourthCondition){
      return this.a(axis, oneFourthCondition)
    }
  },

  methods: {
    a(axis, oneFourthCondition){
      
      if(axis == 'x' && oneFourthCondition == 1){
        return 2
      }else if(axis == 'x' && oneFourthCondition == 2){
        return 0
      }if(axis == 'y' && oneFourthCondition == 1){
        return 0
      }else if(axis == 'y' && oneFourthCondition == 2){
        return 2
      }
      
    }
  }

}
</script>

<style>
  .flex-container {
    display: flex;
    text-align: center;
    align-items: center; /* Use another value to see the result */
    width: 100%;
    border-color: black;
    
    border-width: thin;
    
  }

  .flex-container > .flex-container-side {
    height: 100%;
    width: 25%;
  }

  
  .flex-container > div {
    width: 100%;
    height: 100%;
    margin: 1px;
    
    border-color: black;
    border-radius: 1px;
    
  }
</style>