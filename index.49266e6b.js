var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},i=e.parcelRequire021d;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in n){var i=n[e];delete n[e];var s={id:e,exports:{}};return t[e]=s,i.call(s.exports,s,s.exports),s.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequire021d=i);var s=i("jvJOj");i.register("5u68X",(function(e,t){var n=i("jvJOj");Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(){document.querySelectorAll(".js-demo-slider").forEach((function(e){new s.default(e)}))};var s=n(i("4uezN"))})),i.register("4uezN",(function(e,t){var n=i("jvJOj");Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=void 0;var s=n(i("egzcZ")),a=n(i("6WRzF")),u=n(i("aOGIx")),l=n(i("gG9J1")),r=n(i("b7tl4")),o=function(){function e(t){s.default(this,e),u.default(this,"inputsArray",[]),u.default(this,"parent",void 0),u.default(this,"currentValueInstance",void 0),u.default(this,"minValueInstance",void 0),u.default(this,"maxValueInstance",void 0),u.default(this,"noteValueInstance",void 0),u.default(this,"stepInstance",void 0),u.default(this,"verticalInstance",void 0),u.default(this,"doubleInstance",void 0),u.default(this,"fromInstance",void 0),u.default(this,"toInstance",void 0),u.default(this,"initOptions",void 0),u.default(this,"options",void 0),u.default(this,"adslider",void 0),this.parent=t,this.init(),this.setInitOptionsForSlider(),this.initPlugin(),this.getSliderOptions(),this.updatePanel(),this.addListeners()}return a.default(e,[{key:"init",value:function(){this.adslider=this.parent.querySelector(".js-demo-slider__adslider");var e=this.parent.querySelector(".js-demo-slider__minimum-value"),t=this.parent.querySelector(".js-demo-slider__maximum-value"),n=this.parent.querySelector(".js-demo-slider__current-value"),i=this.parent.querySelector(".js-demo-slider__step"),s=this.parent.querySelector(".js-demo-slider__from"),a=this.parent.querySelector(".js-demo-slider__to"),u=this.parent.querySelector(".js-demo-slider__note-value"),o=this.parent.querySelector(".js-demo-slider__vertical-view"),d=this.parent.querySelector(".js-demo-slider__double");e&&(this.minValueInstance=new l.default(e),this.inputsArray.push(this.minValueInstance.getInputElement())),t&&(this.maxValueInstance=new l.default(t),this.inputsArray.push(this.maxValueInstance.getInputElement())),n&&(this.currentValueInstance=new l.default(n),this.inputsArray.push(this.currentValueInstance.getInputElement())),i&&(this.stepInstance=new l.default(i),this.inputsArray.push(this.stepInstance.getInputElement())),s&&(this.fromInstance=new l.default(s),this.inputsArray.push(this.fromInstance.getInputElement())),a&&(this.toInstance=new l.default(a),this.inputsArray.push(this.toInstance.getInputElement())),u&&(this.noteValueInstance=new r.default(u),this.inputsArray.push(this.noteValueInstance.getCheckboxElement())),o&&(this.verticalInstance=new r.default(o),this.inputsArray.push(this.verticalInstance.getCheckboxElement())),d&&(this.doubleInstance=new r.default(d),this.inputsArray.push(this.doubleInstance.getCheckboxElement()))}},{key:"setInitOptionsForSlider",value:function(){this.initOptions={limits:{min:this.minValueInstance.getValue(),max:this.maxValueInstance.getValue()},showValueNote:this.noteValueInstance.isChecked(),step:this.stepInstance.getValue(),vertical:this.verticalInstance.isChecked(),double:this.doubleInstance.isChecked(),from:this.fromInstance.getValue(),to:this.toInstance.getValue()}}},{key:"initPlugin",value:function(){$(".js-demo-slider__adslider",this.parent).adslider(this.initOptions)}},{key:"getSliderOptions",value:function(){this.options=$(".js-demo-slider__adslider",this.parent).adslider("getOptions")}},{key:"updatePanel",value:function(){var e=this.options,t=e.limits,n=t.min,i=t.max,s=e.step,a=e.from,u=e.to,l=e.showValueNote,r=e.vertical,o=e.double;this.toInstance.setValue(u),this.currentValueInstance.setValue(u),this.minValueInstance.setValue(n),this.maxValueInstance.setValue(i),this.stepInstance.setValue(s),l&&this.noteValueInstance.setChecked(),r&&this.verticalInstance.setChecked(),o&&this.doubleInstance.setChecked(),this.fromInstance.setValue(a),this.setInputsForDouble()}},{key:"addListeners",value:function(){var e=this;this.inputsArray.forEach((function(t){t.addEventListener("change",e.handleInputChange.bind(e))})),this.adslider&&(this.adslider.addEventListener("mousemove",this.updatePanel.bind(this)),this.adslider.addEventListener("click",this.updatePanel.bind(this)))}},{key:"handleInputChange",value:function(){this.options={limits:{min:this.minValueInstance.getValue(),max:this.maxValueInstance.getValue()},step:this.stepInstance.getValue(),showValueNote:this.noteValueInstance.isChecked(),vertical:this.verticalInstance.isChecked(),double:this.doubleInstance.isChecked(),from:this.fromInstance.getValue(),to:this.doubleInstance.isChecked()?this.toInstance.getValue():this.currentValueInstance.getValue()},$(".js-demo-slider__adslider",this.parent).adslider("update",this.options),this.updatePanel()}},{key:"setInputsForDouble",value:function(){this.doubleInstance.isChecked()?(this.currentValueInstance.hideInput(),this.fromInstance.showInput(),this.toInstance.showInput()):(this.currentValueInstance.showInput(),this.fromInstance.hideInput(),this.toInstance.hideInput())}}]),e}();e.exports.default=o})),i.register("gG9J1",(function(e,t){var n=i("jvJOj");Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=void 0;var s=n(i("egzcZ")),a=n(i("6WRzF")),u=n(i("aOGIx")),l=function(){function e(t){s.default(this,e),u.default(this,"parent",void 0),u.default(this,"inputElement",void 0),this.parent=t,this.init()}return a.default(e,[{key:"init",value:function(){this.inputElement=this.parent.querySelector(".js-input__value")}},{key:"getInputElement",value:function(){return this.inputElement}},{key:"getValue",value:function(){return""===this.inputElement.value?null:Number(this.inputElement.value)}},{key:"setValue",value:function(e){this.inputElement.value="number"==typeof e?String(e):""}},{key:"hideInput",value:function(){this.inputElement.classList.add("input__value_hidden")}},{key:"showInput",value:function(){this.inputElement.classList.remove("input__value_hidden")}}]),e}();e.exports.default=l})),i.register("b7tl4",(function(e,t){var n=i("jvJOj");Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=void 0;var s=n(i("egzcZ")),a=n(i("6WRzF")),u=n(i("aOGIx")),l=function(){function e(t){s.default(this,e),u.default(this,"parent",void 0),u.default(this,"checkboxElement",void 0),this.parent=t,this.init()}return a.default(e,[{key:"init",value:function(){this.checkboxElement=this.parent.querySelector(".js-checkbox__value")}},{key:"getCheckboxElement",value:function(){return this.checkboxElement}},{key:"isChecked",value:function(){return this.checkboxElement.checked}},{key:"setChecked",value:function(){this.checkboxElement.checked=!0}}]),e}();e.exports.default=l})),s(i("5u68X")).default();
//# sourceMappingURL=index.49266e6b.js.map
