(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05c42f06"],{"07f3":function(e,t,a){"use strict";var o=a("acd1"),n=a.n(o);n.a},"30e6":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"pa-0",attrs:{fluid:""}},[a("v-card-title",[e._v("YOUJONET KATAGANARE (WITH ROOF)")]),a("v-simple-table",{attrs:{dense:""},scopedSlots:e._u([{key:"default",fn:function(){return[a("thead",e._l(e.withRoof,(function(t,o){return a("tr",{key:o},e._l(t,(function(t,o){return a("th",{key:o,staticClass:"text-center font-weight-light",attrs:{rowspan:t.rowspan,scope:t.scope,colspan:t.colspan},domProps:{innerHTML:e._s(t.value)}})})),0)})),0),a("tbody",e._l(e.items,(function(t,o){return a("tr",{key:o+"a"},[a("th",{staticClass:"text-center"},[e._v(e._s(t.header))]),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.pitch,expression:"trow.pitch"}],staticClass:"text-center",attrs:{type:"text"},domProps:{value:t.pitch},on:{input:[function(a){a.target.composing||e.$set(t,"pitch",a.target.value)},function(a){return e.emitChanges(t,o)}]}})]),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.grids,expression:"trow.grids"}],staticClass:"text-center",attrs:{type:"text"},domProps:{value:t.grids},on:{input:[function(a){a.target.composing||e.$set(t,"grids",a.target.value)},function(a){return e.emitChanges(t,o)}]}})]),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.additional,expression:"trow.additional"}],staticClass:"text-center",attrs:{type:"text"},domProps:{value:t.additional},on:{input:[function(a){a.target.composing||e.$set(t,"additional",a.target.value)},function(a){return e.emitChanges(t,o)}]}})]),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.width,expression:"trow.width"}],staticClass:"text-center",attrs:{type:"text"},domProps:{value:t.width},on:{input:[function(a){a.target.composing||e.$set(t,"width",a.target.value)},function(a){return e.emitChanges(t,o)}]}})]),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.area,expression:"trow.area"}],staticClass:"text-center",attrs:{disabled:"",type:"text"},domProps:{value:t.area},on:{input:function(a){a.target.composing||e.$set(t,"area",a.target.value)}}})])])})),0)]},proxy:!0}])})],1)},n=[],s=(a("c5f6"),a("50c8")),r={mixins:[s["a"]],props:{index:Number,items:Array,selectedRow:Object,value:Boolean},components:{},created:function(){},data:function(){return{}},methods:{emitChanges:function(e,t){this.value?this.areaDataDB.bankin.youjonet.computeWithRoof(e,t):this.areaData.bankin.youjonet.computeWithRoof(e,t)}}},i=r,c=(a("07f3"),a("2877")),l=a("6544"),u=a.n(l),p=a("99d9"),d=a("a523"),v=a("1f4f"),m=Object(c["a"])(i,o,n,!1,null,"582f906c",null);t["default"]=m.exports;u()(m,{VCardTitle:p["d"],VContainer:d["a"],VSimpleTable:v["a"]})},"50c8":function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));a("242a");var o={data:function(){return{headerRow:[[{value:"Flr. Level",rowspan:"1",scope:"col"},{value:"1F",colspan:"3",scope:"col"},{value:"2F",colspan:"3",scope:"col"},{value:"3F",colspan:"3",scope:"col"}],[{value:"Direction",scope:"col"},{value:"Grids"},{value:"Const"},{value:"Irr."},{value:"Grids"},{value:"Const"},{value:"Irr."},{value:"Grids"},{value:"Const"},{value:"Irr."}]],parapetOnly:[[{value:"Direction",rowspan:"2",scope:"col"},{value:"Length",colspan:"2",scope:"col"},{value:"Parapet",colspan:"1",scope:"col"},{value:"Area, m".concat("2".sup()),rowspan:"2",scope:"col"}],[{value:"Grids"},{value:"Addt'l"},{value:"Height"}]],withRoof:[[{value:"Direction",rowspan:"2",scope:"col"},{value:"Pitch",rowspan:"2",scope:"col"},{value:"Length",colspan:"2",scope:"col"},{value:"Width",rowspan:"2",scope:"col"},{value:"Area, m".concat("2".sup()),rowspan:"2",scope:"col"}],[{value:"Grids"},{value:"Addt'l"}]],rowHeader:[{value:"east",scope:"row",alignment:"text-center"},{value:"west",scope:"row",alignment:"text-center"},{value:"south",scope:"row",alignment:"text-center"},{value:"north",scope:"row",alignment:"text-center"}],headerBankin:["No.","Grids","Add'l","Const","ITEM","Dir","Length, M"],descriptionList:[]}},created:function(){for(var e=1;e<=3;e++)for(var t=1;t<=3;t++)this.descriptionList.push("amaosae s ".concat(t,"F p").concat(e));for(var a=1;a<=3;a++)for(var o=1;o<=3;o++)this.descriptionList.push("amaosae geya s ".concat(o,"F p").concat(a));for(var n=1;n<=3;n++)this.descriptionList.push("amaosae h ".concat(n,"F"));for(var s=1;s<=3;s++)this.descriptionList.push("amaosae geya h ".concat(s,"F"))}}},acd1:function(e,t,a){}}]);
//# sourceMappingURL=chunk-05c42f06.347d89fc.js.map