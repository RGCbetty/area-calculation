(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-37911ec0"],{2353:function(t,e,n){"use strict";var i=n("faad"),s=n.n(i);s.a},"2bfd":function(t,e,n){},8134:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-dialog",{attrs:{width:"550",persistent:""},model:{value:t.sash,callback:function(e){t.sash=e},expression:"sash"}},[n("v-card",[n("v-card-title",{staticClass:"display-1 font-weight-thin"},[t._v("\n            Sash Opening\n            "),n("v-col",{attrs:{cols:"3"}},[n("v-select",{attrs:{outlined:"",dense:"","hide-details":"",items:t.sashFloors,label:"Floor"},model:{value:t.addEdit.floor,callback:function(e){t.$set(t.addEdit,"floor",e)},expression:"addEdit.floor"}})],1),n("v-col",{attrs:{cols:"3"}},[n("v-select",{attrs:{outlined:"",dense:"","hide-details":"",items:t.quantityList,label:"Quantity"},on:{change:function(e){return t.quantity(t.addEdit,"Sash")}},model:{value:t.addEdit.quantity,callback:function(e){t.$set(t.addEdit,"quantity",e)},expression:"addEdit.quantity"}})],1)],1),n("v-card-text",[n("v-simple-table",{attrs:{dense:""},scopedSlots:t._u([{key:"default",fn:function(){return[n("thead",[n("tr",t._l(t.itemHead,(function(e,i){return n("th",{key:i,attrs:{width:e.width}},[t._v("\n                                "+t._s(e.value)+"\n                            ")])})),0)]),n("tbody",t._l(t.addEdit.data,(function(e,i){return n("tr",{key:i},[n("td",{staticClass:"pa-0"},[n("v-combobox",{attrs:{items:t.getWidth,dense:"",outlined:"","hide-details":""},on:{change:function(n){return t.compute(e)}},model:{value:e.width,callback:function(n){t.$set(e,"width",n)},expression:"item.width"}})],1),n("td",{staticClass:"pa-0"},[n("v-combobox",{attrs:{items:t.getHeight,dense:"",outlined:"","hide-details":""},on:{change:function(n){return t.compute(e)}},model:{value:e.height,callback:function(n){t.$set(e,"height",n)},expression:"item.height"}})],1),n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.area,expression:"item.area"}],staticClass:"text-center",attrs:{type:"text",readonly:""},domProps:{value:e.area},on:{input:function(n){n.target.composing||t.$set(e,"area",n.target.value)}}})])])})),0)]},proxy:!0}])})],1),n("v-card-actions",[n("v-row",{staticStyle:{"margin-top":"-20px"},attrs:{"no-gutters":""}},[n("v-spacer"),n("v-btn",{staticClass:"font-weight-bold",attrs:{text:""},on:{click:function(e){return t.cancelDialog("Sash")}}},[t._v("Cancel")]),n("v-btn",{staticClass:"font-weight-bold",attrs:{text:""},on:{click:function(e){return t.save()}}},[t._v("Save")])],1)],1)],1)],1)},s=[],a=(n("ac6a"),n("456d"),n("c714")),o=n("298f"),l={props:["sash","value","index","bool"],mixins:[a["a"]],data:function(){return{sashFloors:["1F","2F","3F","PH","Gar","Fuj"],itemHead:[{value:"Width",width:"50"},{value:"Height",width:"50"},{value:"Area",width:"100"}]}},computed:{getWidth:function(){return Object.keys(o["a"].width)},getHeight:function(){return Object.keys(o["a"].height)}},methods:{compute:function(t){this.bool?this.areaDataDB.gt.computeSash(t):this.areaData.gt.computeSash(t)},save:function(){this.bool?this.areaDataDB.gt.getTotal(this.addEdit):this.areaData.gt.getTotal(this.addEdit),this.saveData("sashData","Sash")}},watch:{sash:function(t){1==t&&this.loadFromParent()}}},r=l,c=(n("2353"),n("2877")),h=n("6544"),u=n.n(h),d=n("8336"),p=n("b0af"),f=n("99d9"),m=n("62ad"),g=(n("8e6e"),n("bd86")),v=(n("aef6"),n("7514"),n("6b54"),n("2bfd"),n("b974")),I=n("c6a6"),S=n("80d2");function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function y(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(n,!0).forEach((function(e){Object(g["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var x=I["a"].extend({name:"v-combobox",props:{delimiters:{type:Array,default:function(){return[]}},returnObject:{type:Boolean,default:!0}},data:function(){return{editingIndex:-1}},computed:{counterValue:function(){return this.multiple?this.selectedItems.length:(this.internalSearch||"").toString().length},hasSlot:function(){return v["a"].options.computed.hasSlot.call(this)||this.multiple},isAnyValueAllowed:function(){return!0},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!!this.$slots["no-data"]&&!this.hideNoData)}},methods:{onInternalSearchChanged:function(t){if(t&&this.multiple&&this.delimiters.length){var e=this.delimiters.find((function(e){return t.endsWith(e)}));null!=e&&(this.internalSearch=t.slice(0,t.length-e.length),this.updateTags())}this.updateMenuDimensions()},genInput:function(){var t=I["a"].options.methods.genInput.call(this);return t.data.on.paste=this.onPaste,t},genChipSelection:function(t,e){var n=this,i=v["a"].options.methods.genChipSelection.call(this,t,e);return this.multiple&&(i.componentOptions.listeners=y({},i.componentOptions.listeners,{dblclick:function(){n.editingIndex=e,n.internalSearch=n.getText(t),n.selectedIndex=-1}})),i},onChipInput:function(t){v["a"].options.methods.onChipInput.call(this,t),this.editingIndex=-1},onEnterDown:function(t){var e=this;t.preventDefault(),this.$nextTick((function(){e.getMenuIndex()>-1||e.updateSelf()}))},onFilteredItemsChanged:function(t,e){this.autoSelectFirst&&I["a"].options.methods.onFilteredItemsChanged.call(this,t,e)},onKeyDown:function(t){var e=t.keyCode;v["a"].options.methods.onKeyDown.call(this,t),this.multiple&&e===S["v"].left&&0===this.$refs.input.selectionStart?this.updateSelf():e===S["v"].enter&&this.onEnterDown(t),this.changeSelectedIndex(e)},onTabDown:function(t){if(this.multiple&&this.internalSearch&&-1===this.getMenuIndex())return t.preventDefault(),t.stopPropagation(),this.updateTags();I["a"].options.methods.onTabDown.call(this,t)},selectItem:function(t){this.editingIndex>-1?this.updateEditing():I["a"].options.methods.selectItem.call(this,t)},setSelectedItems:function(){null==this.internalValue||""===this.internalValue?this.selectedItems=[]:this.selectedItems=this.multiple?this.internalValue:[this.internalValue]},setValue:function(t){v["a"].options.methods.setValue.call(this,null!=t?t:this.internalSearch)},updateEditing:function(){var t=this.internalValue.slice();t[this.editingIndex]=this.internalSearch,this.setValue(t),this.editingIndex=-1},updateCombobox:function(){var t=Boolean(this.$scopedSlots.selection)||this.hasChips;t&&!this.searchIsDirty||(this.internalSearch!==this.getText(this.internalValue)&&this.setValue(),t&&(this.internalSearch=void 0))},updateSelf:function(){this.multiple?this.updateTags():this.updateCombobox()},updateTags:function(){var t=this.getMenuIndex();if(!(t<0)||this.searchIsDirty){if(this.editingIndex>-1)return this.updateEditing();var e=this.selectedItems.indexOf(this.internalSearch);if(e>-1){var n=this.internalValue.slice();n.splice(e,1),this.setValue(n)}if(t>-1)return this.internalSearch=null;this.selectItem(this.internalSearch),this.internalSearch=null}},onPaste:function(t){if(this.multiple&&!this.searchIsDirty){var e=t.clipboardData.getData("text/vnd.vuetify.autocomplete.item+plain");e&&-1===this.findExistingIndex(e)&&(t.preventDefault(),v["a"].options.methods.selectItem.call(this,e))}}}}),D=n("169a"),w=n("0fd9"),O=n("1f4f"),C=n("2fa4"),V=Object(c["a"])(r,i,s,!1,null,"5166c4c5",null);e["default"]=V.exports;u()(V,{VBtn:d["a"],VCard:p["a"],VCardActions:f["a"],VCardText:f["c"],VCardTitle:f["d"],VCol:m["a"],VCombobox:x,VDialog:D["a"],VRow:w["a"],VSelect:v["a"],VSimpleTable:O["a"],VSpacer:C["a"]})},aef6:function(t,e,n){"use strict";var i=n("5ca1"),s=n("9def"),a=n("d2c8"),o="endsWith",l=""[o];i(i.P+i.F*n("5147")(o),"String",{endsWith:function(t){var e=a(this,t,o),n=arguments.length>1?arguments[1]:void 0,i=s(e.length),r=void 0===n?i:Math.min(s(n),i),c=String(t);return l?l.call(e,c,r):e.slice(r-c.length,r)===c}})},c6a6:function(t,e,n){"use strict";n("8e6e"),n("ac6a"),n("456d"),n("6762"),n("2fdb"),n("7514");var i=n("bd86"),s=(n("2bfd"),n("b974")),a=n("8654"),o=n("80d2");function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(n,!0).forEach((function(e){Object(i["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var c=r({},s["b"],{offsetY:!0,offsetOverflow:!0,transition:!1});e["a"]=s["a"].extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(t,e,n){return n.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:s["a"].options.props.menuProps.type,default:function(){return c}},noFilter:Boolean,searchInput:{type:String,default:void 0}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return r({},s["a"].options.computed.classes.call(this),{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var t=this;return this.selectedItems.map((function(e){return t.getValue(e)}))},hasDisplayedItems:function(){var t=this;return this.hideSelected?this.filteredItems.some((function(e){return!t.hasItem(e)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var t=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(e){return t.filter(e,String(t.internalSearch),String(t.getText(e)))}))},internalSearch:{get:function(){return this.lazySearch},set:function(t){this.lazySearch=t,this.$emit("update:search-input",t)}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var t=s["a"].options.computed.$_menuProps.call(this);return t.contentClass="v-autocomplete__content ".concat(t.contentClass||"").trim(),r({},c,{},t)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var t=this;return this.multiple?null:this.selectedItems.find((function(e){return t.valueComparator(t.getValue(e),t.getValue(t.internalValue))}))},listData:function(){var t=s["a"].options.computed.listData.call(this);return t.props=r({},t.props,{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),t}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(t){t?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.updateSelf())},isMenuActive:function(t){!t&&this.hasSlot&&(this.lazySearch=void 0)},items:function(t,e){e&&e.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!t.length||this.activateMenu()},searchInput:function(t){this.lazySearch=t},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},methods:{onFilteredItemsChanged:function(t,e){var n=this;t!==e&&(this.setMenuIndex(-1),this.$nextTick((function(){n.internalSearch&&(1===t.length||n.autoSelectFirst)&&(n.$refs.menu.getTiles(),n.setMenuIndex(0))})))},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(t){if(!this.searchIsDirty&&this.multiple&&[o["v"].backspace,o["v"].left,o["v"].right,o["v"].delete].includes(t)){var e=this.selectedItems.length-1;if(t===o["v"].left)-1===this.selectedIndex?this.selectedIndex=e:this.selectedIndex--;else if(t===o["v"].right)this.selectedIndex>=e?this.selectedIndex=-1:this.selectedIndex++;else if(-1===this.selectedIndex)return void(this.selectedIndex=e);var n=this.selectedItems[this.selectedIndex];if([o["v"].backspace,o["v"].delete].includes(t)&&!this.getDisabled(n)){var i=this.selectedIndex===e?this.selectedIndex-1:this.selectedItems[this.selectedIndex+1]?this.selectedIndex:-1;-1===i?this.setValue(this.multiple?[]:void 0):this.selectItem(n),this.selectedIndex=i}}},clearableCallback:function(){this.internalSearch=void 0,s["a"].options.methods.clearableCallback.call(this)},genInput:function(){var t=a["a"].options.methods.genInput.call(this);return t.data=t.data||{},t.data.attrs=t.data.attrs||{},t.data.attrs.autocomplete=t.data.attrs.autocomplete||"disabled",t.data.domProps=t.data.domProps||{},t.data.domProps.value=this.internalSearch,t},genInputSlot:function(){var t=s["a"].options.methods.genInputSlot.call(this);return t.data.attrs.role="combobox",t},genSelections:function(){return this.hasSlot||this.multiple?s["a"].options.methods.genSelections.call(this):[]},onClick:function(){this.isDisabled||(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.activateMenu())},onInput:function(t){if(!(this.selectedIndex>-1)&&t.target){var e=t.target,n=e.value;e.value&&this.activateMenu(),this.internalSearch=n,this.badInput=e.validity&&e.validity.badInput}},onKeyDown:function(t){var e=t.keyCode;s["a"].options.methods.onKeyDown.call(this,t),this.changeSelectedIndex(e)},onSpaceDown:function(t){},onTabDown:function(t){s["a"].options.methods.onTabDown.call(this,t),this.updateSelf()},onUpDown:function(){this.activateMenu()},selectItem:function(t){s["a"].options.methods.selectItem.call(this,t),this.setSearch()},setSelectedItems:function(){s["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var t=this;this.$nextTick((function(){t.multiple&&t.internalSearch&&t.isMenuActive||(t.internalSearch=!t.selectedItems.length||t.multiple||t.hasSlot?null:t.getText(t.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(t){return this.selectedValues.indexOf(this.getValue(t))>-1},onCopy:function(t){if(-1!==this.selectedIndex){var e=this.selectedItems[this.selectedIndex],n=this.getText(e);t.clipboardData.setData("text/plain",n),t.clipboardData.setData("text/vnd.vuetify.autocomplete.item+plain",n),t.preventDefault()}}}})},faad:function(t,e,n){}}]);
//# sourceMappingURL=chunk-37911ec0.b08ff2e8.js.map