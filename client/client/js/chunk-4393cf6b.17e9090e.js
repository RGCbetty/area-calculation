(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4393cf6b"],{"3a4b":function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"e",(function(){return r})),n.d(e,"d",(function(){return i})),n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return l})),n.d(e,"f",(function(){return d})),n.d(e,"g",(function(){return c}));var a=function(){return n.e("chunk-2d0d7d7c").then(n.bind(null,"7915"))},r=function(){return n.e("chunk-5b1fc82d").then(n.bind(null,"9f66"))},i=function(){return n.e("chunk-2d22d797").then(n.bind(null,"f83b"))},o=function(){return n.e("chunk-7f252dbd").then(n.bind(null,"1759"))},l=function(){return n.e("chunk-2d0c1232").then(n.bind(null,"4583"))},d=function(){return n.e("chunk-985c72ce").then(n.bind(null,"b2e8"))},c=function(){return n.e("chunk-37911ec0").then(n.bind(null,"8134"))}},"58c1":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{flat:""}},[n("v-card-title",{staticClass:"display-1 font-weight-thin"},[t._v("\n        Additional\n    ")]),n("v-simple-table",{attrs:{dense:""},scopedSlots:t._u([{key:"default",fn:function(){return[n("thead",[n("tr",t._l(t.addHead,(function(e,a){return n("th",{key:a,staticClass:"text-center"},[t._v("\n                        "+t._s(e.value)+"\n                    ")])})),0)]),n("tbody",t._l(t.gt.GTadditionalData,(function(e,a){return n("tr",{key:a},[n("td",{staticClass:"pa-0"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.forDelete,expression:"item.forDelete"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.forDelete)?t._i(e.forDelete,null)>-1:e.forDelete},on:{change:[function(n){var a=e.forDelete,r=n.target,i=!!r.checked;if(Array.isArray(a)){var o=null,l=t._i(a,o);r.checked?l<0&&t.$set(e,"forDelete",a.concat([o])):l>-1&&t.$set(e,"forDelete",a.slice(0,l).concat(a.slice(l+1)))}else t.$set(e,"forDelete",i)},function(e){return t.getDelete("GTadditionalData")}]}})]),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.type,expression:"item.type"}],staticClass:"text-center",attrs:{type:"text",readonly:""},domProps:{value:e.type},on:{dblclick:function(n){return t.editDialog(e,a,"GtAdd")},input:function(n){n.target.composing||t.$set(e,"type",n.target.value)}}})]),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.area,expression:"item.area"}],staticClass:"text-center",attrs:{type:"text",readonly:""},domProps:{value:e.area},on:{dblclick:function(n){return t.editDialog(e,a,"GtAdd")},input:function(n){n.target.composing||t.$set(e,"area",n.target.value)}}})]),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.floor,expression:"item.floor"}],staticClass:"text-center",attrs:{type:"text",readonly:""},domProps:{value:e.floor},on:{dblclick:function(n){return t.editDialog(e,a,"GtAdd")},input:function(n){n.target.composing||t.$set(e,"floor",n.target.value)}}})])])})),0)]},proxy:!0}])}),0==t.gt.GTadditionalData.length?n("v-row",{attrs:{justify:"center"}},[n("h3",{staticClass:"font-weight-thin"},[t._v("No Wall Additional Data!")])]):t._e(),n("gtAddD",{attrs:{bool:t.value,add:t.dialogGtAdd,value:t.addEdit,index:t.editIndex},on:{closeDialog:t.closeDialog}}),n("v-row",{staticClass:"mt-1",attrs:{"no-gutters":""}},[n("v-btn",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.newDialog("GtAdd")}}},[t._v("New Additional")]),t.selected.length>0?n("v-btn",{attrs:{small:""},on:{click:function(e){return t.itemDelete("GTadditionalData")}}},[t._v("Remove Additional")]):t._e()],1)],1)},r=[],i=(n("c5f6"),n("3a4b")),o=n("c714"),l={props:{index:Number,selectedRow:Object,value:Boolean,standard:Object,gt:Object},components:{gtAddD:i["b"]},mixins:[o["a"]]},d=l,c=(n("6462"),n("2877")),u=n("6544"),s=n.n(u),f=n("8336"),p=n("b0af"),v=n("99d9"),m=n("0fd9"),b=n("1f4f"),h=Object(c["a"])(d,a,r,!1,null,"6e8eb922",null);e["default"]=h.exports;s()(h,{VBtn:f["a"],VCard:p["a"],VCardTitle:v["d"],VRow:m["a"],VSimpleTable:b["a"]})},6462:function(t,e,n){"use strict";var a=n("79c1"),r=n.n(a);r.a},"79c1":function(t,e,n){}}]);
//# sourceMappingURL=chunk-4393cf6b.17e9090e.js.map