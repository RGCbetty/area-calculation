(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c3f84e24"],{"0fd9":function(e,t,n){"use strict";n("8e6e");var a=n("bd86"),o=(n("5df3"),n("f400"),n("a481"),n("ac6a"),n("456d"),n("6762"),n("2fdb"),n("4b85"),n("2b0e")),r=n("d9f7"),l=n("80d2");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(n,!0).forEach((function(t){Object(a["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var i=["sm","md","lg","xl"],u=["start","end","center"];function f(e,t){return i.reduce((function(n,a){return n[e+Object(l["B"])(a)]=t(),n}),{})}var d=function(e){return[].concat(u,["baseline","stretch"]).includes(e)},p=f("align",(function(){return{type:String,default:null,validator:d}})),b=function(e){return[].concat(u,["space-between","space-around"]).includes(e)},y=f("justify",(function(){return{type:String,default:null,validator:b}})),v=function(e){return[].concat(u,["space-between","space-around","stretch"]).includes(e)},g=f("alignContent",(function(){return{type:String,default:null,validator:v}})),O={align:Object.keys(p),justify:Object.keys(y),alignContent:Object.keys(g)},j={align:"align",justify:"justify",alignContent:"align-content"};function _(e,t,n){var a=j[e];if(null!=n){if(t){var o=t.replace(e,"");a+="-".concat(o)}return a+="-".concat(n),a.toLowerCase()}}var m=new Map;t["a"]=o["a"].extend({name:"v-row",functional:!0,props:s({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},p,{justify:{type:String,default:null,validator:b}},y,{alignContent:{type:String,default:null,validator:v}},g),render:function(e,t){var n=t.props,o=t.data,l=t.children,c="";for(var s in n)c+=String(n[s]);var i=m.get(c);return i||function(){var e,t;for(t in i=[],O)O[t].forEach((function(e){var a=n[e],o=_(t,e,a);o&&i.push(o)}));i.push((e={"no-gutters":n.noGutters,"row--dense":n.dense},Object(a["a"])(e,"align-".concat(n.align),n.align),Object(a["a"])(e,"justify-".concat(n.justify),n.justify),Object(a["a"])(e,"align-content-".concat(n.alignContent),n.alignContent),e)),m.set(c,i)}(),e(n.tag,Object(r["a"])(o,{staticClass:"row",class:i}),l)}})},"4b85":function(e,t,n){},"536d":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-col",{attrs:{cols:"12"}},[n("v-row",{attrs:{"no-gutters":"",dense:""}},[n("v-col",{attrs:{cols:"2"}},[n("v-text-field",{staticClass:"py-1 pt-3",attrs:{color:"success","hide-details":"",dense:"",outlined:"",label:"Plan Code",readonly:""},model:{value:e.plan_info.plan_code,callback:function(t){e.$set(e.plan_info,"plan_code",t)},expression:"plan_info.plan_code"}})],1),n("v-col",{attrs:{cols:"2"}},[n("v-text-field",{staticClass:"py-1 pt-3",attrs:{color:"success",dense:"",outlined:"",label:"Kanabakari",readonly:"","hide-details":""},model:{value:e.plan_info.kanabakari,callback:function(t){e.$set(e.plan_info,"kanabakari",t)},expression:"plan_info.kanabakari"}})],1),n("v-col",{attrs:{cols:"2"}},[n("v-text-field",{staticClass:"py-1 pt-3",attrs:{color:"success","hide-details":"",dense:"",outlined:"",label:"Data User",readonly:""},model:{value:e.plan_info.data_user,callback:function(t){e.$set(e.plan_info,"data_user",t)},expression:"plan_info.data_user"}})],1),n("v-col",{attrs:{cols:"2"}},[n("v-text-field",{staticClass:"py-1 pt-3",attrs:{color:"success",dense:"",outlined:"",label:"House Type",readonly:"","hide-details":""},model:{value:e.plan_info.houseType,callback:function(t){e.$set(e.plan_info,"houseType",t)},expression:"plan_info.houseType"}})],1),n("v-col",{attrs:{cols:"2"}},[n("v-text-field",{staticClass:"py-1 pt-3",attrs:{color:"success",dense:"",outlined:"",label:"Estimator",readonly:"","hide-details":""},model:{value:e.plan_info.employee_name,callback:function(t){e.$set(e.plan_info,"employee_name",t)},expression:"plan_info.employee_name"}})],1),n("v-col",{attrs:{cols:"2"}},[n("v-text-field",{staticClass:"py-1 pt-3",attrs:{color:"success",dense:"",outlined:"",label:"DATE CHECKED",readonly:"","hide-details":""},model:{value:e.Date_today,callback:function(t){e.Date_today=t},expression:"Date_today"}})],1)],1),n("v-row",{attrs:{"no-gutters":"",dense:""}},[n("v-col",{attrs:{cols:"2"}},[n("v-text-field",{staticClass:"py-1 pt-3",attrs:{color:"success","hide-details":"",dense:"",outlined:"",label:"Plan No.",readonly:""},model:{value:e.plan_info.plan_no,callback:function(t){e.$set(e.plan_info,"plan_no",t)},expression:"plan_info.plan_no"}})],1),n("v-col",{attrs:{cols:"2"}},[n("v-text-field",{staticClass:"py-1 pt-3",attrs:{color:"success",dense:"",outlined:"",label:"Module No.",readonly:"","hide-details":""},model:{value:e.plan_info.module_no,callback:function(t){e.$set(e.plan_info,"module_no",t)},expression:"plan_info.module_no"}})],1),n("v-col",{attrs:{cols:"2"}},[n("v-text-field",{staticClass:"py-1 pt-3",attrs:{color:"success","hide-details":"",dense:"",outlined:"",label:"Tile Type",readonly:""},model:{value:e.plan_info.tile_type,callback:function(t){e.$set(e.plan_info,"tile_type",t)},expression:"plan_info.tile_type"}})],1),n("v-col",{attrs:{cols:"2"}},[n("v-text-field",{staticClass:"py-1 pt-3",attrs:{color:"success",dense:"",outlined:"",label:"Fireproof Type",readonly:"","hide-details":""},model:{value:e.plan_info.fireproof,callback:function(t){e.$set(e.plan_info,"fireproof",t)},expression:"plan_info.fireproof"}})],1),n("v-col",{attrs:{cols:"2"}},[n("v-text-field",{staticClass:"py-1 pt-3",attrs:{color:"success",dense:"",outlined:"",label:"F-Checker",readonly:"","hide-details":""},model:{value:e.plan_info.employee_name,callback:function(t){e.$set(e.plan_info,"employee_name",t)},expression:"plan_info.employee_name"}})],1),n("v-col",{attrs:{cols:"2"}},[n("v-text-field",{staticClass:"py-1 pt-3",attrs:{color:"success",dense:"",outlined:"",label:"Roof Material",readonly:"","hide-details":""},model:{value:e.plan_info.roof_material,callback:function(t){e.$set(e.plan_info,"roof_material",t)},expression:"plan_info.roof_material"}})],1)],1)],1)},o=[],r=n("c1df"),l=n.n(r),c={props:{plan_info:Object},computed:{Date_today:function(){return l()().format("YYYY/MM/DD")}}},s=c,i=n("2877"),u=n("6544"),f=n.n(u),d=n("62ad"),p=n("0fd9"),b=n("8654"),y=Object(i["a"])(s,a,o,!1,null,null,null);t["default"]=y.exports;f()(y,{VCol:d["a"],VRow:p["a"],VTextField:b["a"]})},"62ad":function(e,t,n){"use strict";n("8e6e"),n("f559"),n("6762"),n("2fdb");var a=n("bd86"),o=(n("5df3"),n("f400"),n("a481"),n("ac6a"),n("456d"),n("c5f6"),n("4b85"),n("2b0e")),r=n("d9f7"),l=n("80d2");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(n,!0).forEach((function(t){Object(a["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var i=["sm","md","lg","xl"],u=function(){return i.reduce((function(e,t){return e[t]={type:[Boolean,String,Number],default:!1},e}),{})}(),f=function(){return i.reduce((function(e,t){return e["offset"+Object(l["B"])(t)]={type:[String,Number],default:null},e}),{})}(),d=function(){return i.reduce((function(e,t){return e["order"+Object(l["B"])(t)]={type:[String,Number],default:null},e}),{})}(),p={col:Object.keys(u),offset:Object.keys(f),order:Object.keys(d)};function b(e,t,n){var a=e;if(null!=n&&!1!==n){if(t){var o=t.replace(e,"");a+="-".concat(o)}return"col"!==e||""!==n&&!0!==n?(a+="-".concat(n),a.toLowerCase()):a.toLowerCase()}}var y=new Map;t["a"]=o["a"].extend({name:"v-col",functional:!0,props:s({cols:{type:[Boolean,String,Number],default:!1}},u,{offset:{type:[String,Number],default:null}},f,{order:{type:[String,Number],default:null}},d,{alignSelf:{type:String,default:null,validator:function(e){return["auto","start","end","center","baseline","stretch"].includes(e)}},justifySelf:{type:String,default:null,validator:function(e){return["auto","start","end","center","baseline","stretch"].includes(e)}},tag:{type:String,default:"div"}}),render:function(e,t){var n=t.props,o=t.data,l=t.children,c=(t.parent,"");for(var s in n)c+=String(n[s]);var i=y.get(c);return i||function(){var e,t;for(t in i=[],p)p[t].forEach((function(e){var a=n[e],o=b(t,e,a);o&&i.push(o)}));var o=i.some((function(e){return e.startsWith("col-")}));i.push((e={col:!o||!n.cols},Object(a["a"])(e,"col-".concat(n.cols),n.cols),Object(a["a"])(e,"offset-".concat(n.offset),n.offset),Object(a["a"])(e,"order-".concat(n.order),n.order),Object(a["a"])(e,"align-self-".concat(n.alignSelf),n.alignSelf),Object(a["a"])(e,"justify-self-".concat(n.justifySelf),n.justifySelf),e)),y.set(c,i)}(),e(n.tag,Object(r["a"])(o,{class:i}),l)}})},d9f7:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));n("8e6e");var a=n("bd86");n("ac6a"),n("456d");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(n,!0).forEach((function(t){Object(a["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}
/**
 * @copyright 2017 Alex Regan
 * @license MIT
 * @see https://github.com/alexsasharegan/vue-functional-data-merge
 */function l(){var e,t,n={},a=arguments.length;while(a--)for(var o=0,l=Object.keys(arguments[a]);o<l.length;o++)switch(e=l[o],e){case"class":case"style":case"directives":Array.isArray(n[e])||(n[e]=[]),n[e]=n[e].concat(arguments[a][e]);break;case"staticClass":if(!arguments[a][e])break;void 0===n[e]&&(n[e]=""),n[e]&&(n[e]+=" "),n[e]+=arguments[a][e].trim();break;case"on":case"nativeOn":n[e]||(n[e]={});for(var c=n[e],s=0,i=Object.keys(arguments[a][e]||{});s<i.length;s++)t=i[s],c[t]?c[t]=Array().concat(c[t],arguments[a][e][t]):c[t]=arguments[a][e][t];break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":n[e]||(n[e]={}),n[e]=r({},arguments[a][e],{},n[e]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:n[e]||(n[e]=arguments[a][e])}return n}}}]);
//# sourceMappingURL=chunk-c3f84e24.287b12ab.js.map