(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d20f5a3"],{b2eb:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{scrollable:"",fullscreen:"","max-width":t.selectedComputation.width,"hide-overlay":""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",{attrs:{"min-width":"100%"}},[a("v-card-title",{staticClass:"headline font-weight-thin",domProps:{textContent:t._s(t.selectedComputation.title)}}),a("v-card-text",{staticClass:"px-7"},[a(t.selectedComputation.template,{tag:"component",attrs:{index:t.index,selectedRow:t.selected}})],1),a("v-divider"),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"green darken-1",dark:""},domProps:{textContent:t._s("Ok")},on:{click:function(e){return t.close()}}})],1)],1)],1)},l=[],n=a("bd86"),s=a("3d87"),c=a("7d88"),d=a("eae2"),o=a("6e78"),h=a("a78c"),m=a("f7b4"),r=a("0189"),p=a("4dca"),b=a("8453"),u={props:["value","selected","index"],watch:{dialog:function(t){t||this.$emit("close")},value:function(t){this.dialog=t,t&&(this.selected.id in this.componentList?this.selectedComputation=this.componentList[this.selected.id]:this.$emit("close"))}},created:function(){},data:function(){var t;return{dialog:!1,selectedComputation:{title:"",template:{},width:0},componentList:(t={},Object(n["a"])(t,"90660",{title:"Honmune",template:c["a"],width:"100%"}),Object(n["a"])(t,"90670",{title:"Sumimune",template:s["a"],width:"100%"}),Object(n["a"])(t,"990090",{title:"Gaibu Tile",template:o["a"],width:"100%"}),Object(n["a"])(t,"990100",{title:"Gaibu Tile",template:o["a"],width:"100%"}),Object(n["a"])(t,"100011",{title:"Gaibu Tile",template:o["a"],width:"100%"}),Object(n["a"])(t,"100012",{title:"Gaibu Tile",template:o["a"],width:"100%"}),Object(n["a"])(t,"990214",{title:"Nokiten",template:d["a"],width:"100%"}),Object(n["a"])(t,"70620",{title:"Bankin",template:h["a"],width:"100%"}),Object(n["a"])(t,"70625",{title:"Bankin",template:h["a"],width:"100%"}),Object(n["a"])(t,"70730",{title:"Youjonet",template:m["a"],width:"100%"}),Object(n["a"])(t,"70480",{title:"Bankin",template:r["a"],width:"100%"}),Object(n["a"])(t,"70481",{title:"Bankin",template:r["a"],width:"100%"}),Object(n["a"])(t,"70482",{title:"Bankin",template:r["a"],width:"100%"}),Object(n["a"])(t,"70470",{title:"Bankin",template:r["a"],width:"100%"}),Object(n["a"])(t,"70471",{title:"Bankin",template:r["a"],width:"100%"}),Object(n["a"])(t,"70472",{title:"Bankin",template:r["a"],width:"100%"}),Object(n["a"])(t,"70460",{title:"Bankin",template:r["a"],width:"100%"}),Object(n["a"])(t,"70461",{title:"Bankin",template:r["a"],width:"100%"}),Object(n["a"])(t,"70462",{title:"Bankin",template:r["a"],width:"100%"}),Object(n["a"])(t,"100250",{title:"Hafu",template:p["a"],width:"100%"}),Object(n["a"])(t,"990150",{title:"Yane",template:b["a"],width:"100%"}),Object(n["a"])(t,"990160",{title:"Yane",template:b["a"],width:"100%"}),Object(n["a"])(t,"990170",{title:"Yane",template:b["a"],width:"100%"}),Object(n["a"])(t,"990171",{title:"Yane",template:b["a"],width:"100%"}),Object(n["a"])(t,"990172",{title:"Yane",template:b["a"],width:"100%"}),Object(n["a"])(t,"990175",{title:"Yane",template:b["a"],width:"100%"}),Object(n["a"])(t,"990176",{title:"Yane",template:b["a"],width:"100%"}),Object(n["a"])(t,"990177",{title:"Yane",template:b["a"],width:"100%"}),Object(n["a"])(t,"990178",{title:"Yane",template:b["a"],width:"100%"}),Object(n["a"])(t,"990201",{title:"Yane",template:b["a"],width:"100%"}),t)}},methods:{close:function(){switch(this.componentList[this.selected.id].title){case"Yane":this.areaData.yane.passTotal(this.areaData.items);break;case"Gaibu Tile":this.areaData.gt.passTotal(this.areaData.items);break;case"Nokiten":this.areaData.nokiten.passTotal(this.areaData.items);break;case"Hafu":this.areaData.hafu.passTotal(this.areaData.items);break;case"Youjonet":this.areaData.bankin.youjonet.passTotal(this.areaData.items);break;case"Bankin":this.areaData.bankin.passTotal(this.areaData.items);break;case"Honmune":this.areaData.honmune.passTotal(this.areaData.items);break;case"Sumimune":this.areaData.sumimune.passTotal(this.areaData.items);break;default:console.log("! found");break}this.$emit("close")},change:function(){}}},w=u,j=a("2877"),k=a("6544"),O=a.n(k),f=a("8336"),D=a("b0af"),v=a("99d9"),T=a("169a"),g=a("ce7e"),B=a("2fa4"),C=Object(j["a"])(w,i,l,!1,null,null,null);e["default"]=C.exports;O()(C,{VBtn:f["a"],VCard:D["a"],VCardActions:v["a"],VCardText:v["c"],VCardTitle:v["d"],VDialog:T["a"],VDivider:g["a"],VSpacer:B["a"]})}}]);
//# sourceMappingURL=chunk-2d20f5a3.8075833b.js.map