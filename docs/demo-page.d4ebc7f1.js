var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},a=e.parcelRequire021d;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in i){var a=i[e];delete i[e];var s={id:e,exports:{}};return t[e]=s,a.call(s.exports,s,s.exports),s.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){i[e]=t},e.parcelRequire021d=a),a.register("jvJOj",(function(e,t){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.default=e.exports,e.exports.__esModule=!0}));var s=a("jvJOj");a.register("6GsXo",(function(e,t){function i(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=i=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=i=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),i(t)}e.exports=i,e.exports.default=e.exports,e.exports.__esModule=!0}));var r=s(a("6GsXo"));a.register("9hXoK",(function(e,t){var i=a("jvJOj");Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=void 0;var s=i(a("egzcZ")),r=i(a("6WRzF")),o=i(a("aOGIx")),n=a("kBQQy"),l=i(a("dQclf")),d=function(){function e(t,i){var a=this;s.default(this,e),o.default(this,"model",void 0),o.default(this,"view",void 0),o.default(this,"handleCalcValue",(function(e){a.model.setValueFromHandlerPos(e)})),o.default(this,"handleCalcPos",(function(e){a.view.calcPos(e)})),o.default(this,"handleSetPos",(function(e){a.view.setPos(e)})),this.model=new n.Model(i),this.view=new l.default(t),this.updateView(),this.addObservers()}return r.default(e,[{key:"updateView",value:function(){this.view.updateView(this.model.options)}},{key:"addObservers",value:function(){this.view.addObserver("changePos",this.handleCalcValue),this.model.addObserver("calcPos",this.handleCalcPos),this.model.addObserver("setPos",this.handleSetPos)}}]),e}();e.exports.default=d})),a.register("egzcZ",(function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},e.exports.default=e.exports,e.exports.__esModule=!0})),a.register("6WRzF",(function(e,t){function i(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}e.exports=function(e,t,a){return t&&i(e.prototype,t),a&&i(e,a),e},e.exports.default=e.exports,e.exports.__esModule=!0})),a.register("aOGIx",(function(e,t){e.exports=function(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e},e.exports.default=e.exports,e.exports.__esModule=!0})),a.register("kBQQy",(function(e,t){var i=a("jvJOj");Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.Model=void 0;var s=i(a("egzcZ")),r=i(a("6WRzF")),o=i(a("6G58z")),n=i(a("l5QOA")),l=i(a("3tBTJ")),d=i(a("iAZHY")),u=i(a("aOGIx"));function c(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var i,a=d.default(e);if(t){var s=d.default(this).constructor;i=Reflect.construct(a,arguments,s)}else i=a.apply(this,arguments);return l.default(this,i)}}var h=function(e){n.default(i,e);var t=c(i);function i(e){var a;return s.default(this,i),a=t.call(this),u.default(o.default(a),"options",void 0),a.options={limits:e.limits,curValue:e.to||e.curValue,showValueNote:e.showValueNote,step:e.step,vertical:e.vertical,double:e.double,from:e.from,to:e.to},a.init(a.options),a}return r.default(i,[{key:"init",value:function(e){var t=e.limits,i=e.step,a=e.from,s=e.to,r=e.curValue,o=e.double;this.setLimits(t),this.setStep(i),this.setValueTo(s),this.setValueFrom(a),this.setCurValue(r),this.setDouble(o,a)}},{key:"setValueFromHandlerPos",value:function(e){var t=this.calcValueFromHandlerPos(e.relPosition),i=this.options.double&&this.isValToMovesOverValFrom(t);e.isFrom&&this.isValFromMovesOverValTo(t)||!e.isFrom&&i||this.setValAndBroadcast(t,e.isFrom)}},{key:"calcValueFromHandlerPos",value:function(e){var t=this.options.limits,i=t.min,a=t.max-i;return Math.round(i+a*e)}},{key:"setDouble",value:function(e,t){var i=this.options.limits.min;e&&!t&&(this.options.from=i),this.options.double=e}},{key:"setLimits",value:function(e){var t=e.min,i=e.max;if(t>=i)throw new Error("Min can not be the same or more than Max");this.options.limits={min:t,max:i}}},{key:"setCurValue",value:function(e){var t=this.options,i=t.limits,a=i.min,s=i.max,r=t.step,o=t.to;if(e<a||e>s)throw new Error("Value must be in range of min and max limits");if(r){var n=this.setRoundedCurVal(e,r,s,a);this.options.curValue=o||n}}},{key:"setRoundedCurVal",value:function(e,t,i,a){if(0===Math.abs((a-e)%t))return e;var s=Math.round((a-e)/t),r=t*Math.abs(s)+a;return r>i&&(r-=t),r}},{key:"setValueTo",value:function(e){var t=this.options,i=t.limits,a=i.min,s=i.max,r=t.step;if(e<a||e>s)throw new Error("Value must be in range of min and max limits");if(r&&e){var o=this.setRoundedCurVal(e,r,s,a);this.options.to=o}}},{key:"setValueFrom",value:function(e){var t=this.options,i=t.limits,a=i.min,s=i.max,r=t.step,o=t.to;if(e<a||e>s)throw new Error("Value must be in range of min and max limits");if(e>o&&o)throw new Error("Value From must be less than To");if(r&&e){var n=this.setRoundedCurVal(e,r,s,a);this.options.from=n}}},{key:"setStep",value:function(e){var t=this.options.limits,i=t.min;if(e>t.max-i)throw new Error("Step can not be more than odd min and max limits");this.options.step=e||1}},{key:"setValAndBroadcast",value:function(e,t){var i=this.options,a=i.limits,s=i.double;if(t){this.options.from=this.calcValueWithStep(e);var r={value:this.options.from,limits:a,isFrom:t};this.broadcast("calcPos",r);var o={isDouble:s,isFrom:t};this.broadcast("setPos",o)}else{this.options.curValue=this.calcValueWithStep(e);var n={value:this.options.curValue,limits:a,isFrom:t};this.broadcast("calcPos",n);var l={isDouble:s,isFrom:t};this.broadcast("setPos",l)}}},{key:"isValFromMovesOverValTo",value:function(e){return e>this.options.curValue}},{key:"isValToMovesOverValFrom",value:function(e){return e<this.options.from}},{key:"calcValueWithStep",value:function(e){var t=this.options,i=t.limits,a=i.min,s=i.max,r=t.step,o=a+Math.floor(Math.abs(s-a)/r)*r,n=a+r*Math.round((e-a)/r);return n<a&&(n+=r),n>s&&(n-=r),e>o&&(n=e>o+(s-o)/2?s:o),n}}]),i}(i(a("haT7L")).default);e.exports.Model=h})),a.register("6G58z",(function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e},e.exports.default=e.exports,e.exports.__esModule=!0})),a.register("l5QOA",(function(e,t){var i=a("aPOvv");e.exports=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)},e.exports.default=e.exports,e.exports.__esModule=!0})),a.register("aPOvv",(function(e,t){function i(t,a){return e.exports=i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},e.exports.default=e.exports,e.exports.__esModule=!0,i(t,a)}e.exports=i,e.exports.default=e.exports,e.exports.__esModule=!0})),a.register("3tBTJ",(function(e,t){var i=a("6GsXo").default,s=a("6G58z");e.exports=function(e,t){if(t&&("object"===i(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return s(e)},e.exports.default=e.exports,e.exports.__esModule=!0})),a.register("iAZHY",(function(e,t){function i(t){return e.exports=i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},e.exports.default=e.exports,e.exports.__esModule=!0,i(t)}e.exports=i,e.exports.default=e.exports,e.exports.__esModule=!0})),a.register("haT7L",(function(e,t){var i=a("jvJOj");Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=void 0;var s=i(a("egzcZ")),r=i(a("6WRzF")),o=i(a("aOGIx")),n=function(){function e(){s.default(this,e),o.default(this,"observers",void 0),this.observers={}}return r.default(e,[{key:"addObserver",value:function(e,t){if(this.observers[e]){if(this.observers[e].includes(t))throw new Error("Observer is already in the list!");this.observers[e].push(t)}else this.observers[e]=[],this.observers[e].push(t)}},{key:"broadcast",value:function(e,t){if(void 0===this.observers[e])throw new Error("There is no such observer in the list!");this.observers[e].slice(0).forEach((function(e){e(t)}))}}]),e}();e.exports.default=n})),a.register("dQclf",(function(e,t){var i=a("jvJOj");Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=void 0;var s=i(a("egzcZ")),r=i(a("6WRzF")),o=i(a("6G58z")),n=i(a("l5QOA")),l=i(a("3tBTJ")),d=i(a("iAZHY")),u=i(a("aOGIx")),c=i(a("eq0SQ")),h=i(a("4bmuc")),f=i(a("bIqw0")),v=i(a("3G8aT")),m=i(a("cJdzJ"));function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var i,a=d.default(e);if(t){var s=d.default(this).constructor;i=Reflect.construct(a,arguments,s)}else i=a.apply(this,arguments);return l.default(this,i)}}var w=function(e){n.default(i,e);var t=p(i);function i(e){var a;return s.default(this,i),a=t.call(this),u.default(o.default(a),"el",void 0),u.default(o.default(a),"handlerView",void 0),u.default(o.default(a),"handlerViewFrom",void 0),u.default(o.default(a),"valueNoteViewFrom",void 0),u.default(o.default(a),"valueNoteViewCommon",void 0),u.default(o.default(a),"trackView",void 0),u.default(o.default(a),"valueNoteView",void 0),u.default(o.default(a),"barView",void 0),u.default(o.default(a),"scaleView",void 0),u.default(o.default(a),"adslider",void 0),u.default(o.default(a),"handlerShift",void 0),u.default(o.default(a),"handleChangePos",(function(e){if(a.isDouble())a.handlerView.handler.classList.contains("adslider__handler_direction_horizontal")?a.changeHandlerPosForDoubleHorizontal(e):a.changeHandlerPosForDoubleVertical(e);else{var t={shift:a.handlerView.getLength()/2,e:e,handler:a.handlerView};a.mouseMove(t)}})),u.default(o.default(a),"handleMouseDown",(function(e){a.calcShift(e.event,e.handler)})),u.default(o.default(a),"mouseMove",(function(e){var t;t="mousedown"===e.e.type?a.calcNewPos(e.shift,e.e):a.calcNewPos(a.handlerShift,e.e);var i=a.getEdge(e.handler),s={relPosition:(t=a.checkNewPos(t))/i,isFrom:e.handler.handler.classList.contains("adslider__handler_type_from")};a.broadcast("changePos",s)})),u.default(o.default(a),"handleSetBar",(function(e){if(e.double){if(a.handlerViewFrom){var t={valueFrom:a.handlerViewFrom.getPos(),valueTo:a.handlerView.getPos(),handler:e.handler};a.barView.setLengthForDouble(t)}}else a.barView.setLength(e.handler)})),u.default(o.default(a),"handleSetValueNoteFromPos",(function(){a.valueNoteViewFrom&&a.valueNoteViewFrom.setPos()})),u.default(o.default(a),"handleCalcValueNoteFromPos",(function(e){a.valueNoteViewFrom&&a.valueNoteViewFrom.calcPos(e)})),u.default(o.default(a),"handleSetValueNotePos",(function(){a.valueNoteView.setPos()})),u.default(o.default(a),"handleCalcValueNotePos",(function(e){a.valueNoteView.calcPos(e)})),a.render(e),a.addObservers(),a}return r.default(i,[{key:"updateView",value:function(e){var t=e.vertical,i=e.curValue,a=e.limits,s=e.showValueNote,r=e.double,o=e.from;this.setVerticalViewForSingle(t),this.handlerView.calcPos({edge:this.getEdge(this.handlerView),value:i,limits:a}),this.handlerView.setPos(r),this.valueNoteView.setValue(i),this.valueNoteView.showValueNote(s),this.scaleView.drawScale(e,this.handlerView.handler),r?this.updateViewForDouble(t,o,a,s):this.handlerViewFrom&&this.deleteHandlerFrom()}},{key:"calcPos",value:function(e){var t=e.value,i=e.limits,a=e.isFrom;if(this.handlerViewFrom&&this.valueNoteViewFrom){var s={edge:this.getEdge(this.handlerViewFrom),value:t,limits:i};a?(this.handlerViewFrom.calcPos(s),this.valueNoteViewFrom.setValue(t)):(this.handlerView.calcPos(s),this.valueNoteView.setValue(t))}else{var r={edge:this.getEdge(this.handlerView),value:t,limits:i};this.handlerView.calcPos(r),this.valueNoteView.setValue(t)}}},{key:"setPos",value:function(e){var t=e.isDouble,i=e.isFrom;this.handlerViewFrom?(i?this.handlerViewFrom.setPos(t):this.handlerView.setPos(t),this.setViewOfOneNote()):this.handlerView.setPos(t)}},{key:"render",value:function(e){this.el=e,this.adslider=document.createElement("div"),this.adslider.classList.add("adslider"),this.el.append(this.adslider),this.trackView=new h.default(this.adslider),this.barView=new v.default(this.adslider),this.scaleView=new m.default(this.adslider),this.handlerView=new c.default(this.trackView.track),this.valueNoteView=new f.default(this.adslider),this.handlerViewFrom=new c.default(this.trackView.track),this.handlerViewFrom.handler.classList.add("adslider__handler_type_from"),this.valueNoteViewFrom=new f.default(this.adslider),this.valueNoteViewFrom.note.classList.add("adslider__note_type_from"),this.valueNoteView.note.classList.add("adslider__note_type_to")}},{key:"deleteHandlerFrom",value:function(){this.handlerViewFrom&&this.valueNoteViewFrom&&(this.handlerViewFrom.handler.remove(),this.valueNoteViewFrom.note.remove(),delete this.handlerViewFrom,delete this.valueNoteViewFrom)}},{key:"updateViewForDouble",value:function(e,t,i,a){this.handlerViewFrom||this.renderHandlerFrom(),this.updateObservers(),this.setVerticalViewForDouble(e),this.handlerViewFrom&&this.valueNoteViewFrom&&(this.handlerViewFrom.calcPos({edge:this.getEdge(this.handlerViewFrom),value:t,limits:i}),this.handlerViewFrom.setPos(!0),this.valueNoteViewFrom.calcPos(this.handlerViewFrom.handler),this.valueNoteViewFrom.setPos(),this.valueNoteViewFrom.setValue(t),this.valueNoteViewFrom.showValueNote(a),this.barView.setLengthForDouble({valueFrom:this.handlerViewFrom.getPos(),valueTo:this.handlerView.getPos(),handler:this.handlerView.handler})),this.setViewOfOneNote()}},{key:"renderHandlerFrom",value:function(){this.handlerViewFrom=new c.default(this.trackView.track),this.handlerViewFrom.handler.classList.add("adslider__handler_type_from"),this.valueNoteViewFrom=new f.default(this.adslider),this.valueNoteViewFrom.note.classList.add("adslider__note_type_from"),this.handlerViewFrom.addObserver("handlerMousedownEvent",this.handleMouseDown),this.handlerViewFrom.addObserver("handlerMousemoveEvent",this.mouseMove)}},{key:"changeHandlerPosForDoubleVertical",value:function(e){if(this.handlerViewFrom){var t=this.handlerViewFrom.handler.getBoundingClientRect().top,i=(this.handlerView.handler.getBoundingClientRect().top-t)/2+t+this.handlerView.getLength()/2;if(e.clientY>=i){var a={shift:this.handlerViewFrom.getLength()/2,e:e,handler:this.handlerViewFrom};this.mouseMove(a)}else{var s={shift:this.handlerView.getLength()/2,e:e,handler:this.handlerView};this.mouseMove(s)}}}},{key:"changeHandlerPosForDoubleHorizontal",value:function(e){if(this.handlerViewFrom){var t=this.handlerViewFrom.handler.getBoundingClientRect().left,i=(this.handlerView.handler.getBoundingClientRect().left-t)/2+t+this.handlerView.getLength()/2;if(e.clientX<=i){var a={shift:this.handlerViewFrom.getLength()/2,e:e,handler:this.handlerViewFrom};this.mouseMove(a)}else{var s={shift:this.handlerView.getLength()/2,e:e,handler:this.handlerView};this.mouseMove(s)}}}},{key:"setVerticalViewForSingle",value:function(e){e?(this.adslider.classList.remove("adslider_direction_horizontal"),this.adslider.classList.add("adslider_direction_vertical")):(this.adslider.classList.remove("adslider_direction_vertical"),this.adslider.classList.add("adslider_direction_horizontal")),this.trackView.setVerticalView(e),this.handlerView.setVerticalView(e),this.valueNoteView.setVerticalView(e),this.barView.setVerticalView(e)}},{key:"setVerticalViewForDouble",value:function(e){this.handlerViewFrom&&this.valueNoteViewFrom&&(this.handlerViewFrom.setVerticalView(e),this.valueNoteViewFrom.setVerticalView(e))}},{key:"getEdge",value:function(e){return this.trackView.getLength()-e.getLength()}},{key:"checkNewPos",value:function(e){var t=this.getEdge(this.handlerView),i=e;return e<0?i=0:e>t&&(i=t),i}},{key:"calcShift",value:function(e,t){var i=this.isVertical()?e.clientY-t.getBoundingClientRect().bottom:e.clientX-t.getBoundingClientRect().left;this.handlerShift=Math.abs(i)}},{key:"isVertical",value:function(){return this.adslider.classList.contains("adslider_direction_vertical")}},{key:"isDouble",value:function(){return!!this.handlerViewFrom}},{key:"calcNewPos",value:function(e,t){return this.isVertical()?this.trackView.track.getBoundingClientRect().bottom-t.clientY-e:t.clientX-e-this.trackView.track.getBoundingClientRect().left}},{key:"setViewOfOneNote",value:function(){this.isSmallDistanceBetweenNotes()?this.makeCommonNoteView():this.valueNoteViewCommon&&this.removeValueNotesFromAndTo()}},{key:"isSmallDistanceBetweenNotes",value:function(){return!!this.valueNoteViewFrom&&this.valueNoteView.getPos()-this.valueNoteViewFrom.getPos()<this.valueNoteView.getSize()}},{key:"makeCommonNoteView",value:function(){this.valueNoteViewFrom&&this.valueNoteViewFrom.showValueNote(!1),this.valueNoteView.showValueNote(!1),this.valueNoteViewCommon||(this.valueNoteViewCommon=new f.default(this.adslider),this.valueNoteViewCommon.note.classList.add("adslider__note_common"),this.valueNoteViewCommon.setVerticalView(this.isVertical())),this.updateCommonNoteView()}},{key:"updateCommonNoteView",value:function(){if(this.handlerViewFrom&&this.valueNoteViewCommon){var e,t=this.valueNoteView.getValue();this.valueNoteViewFrom&&(e=this.valueNoteViewFrom.getValue(),this.valueNoteViewCommon.setValueForTwo(e,t));var i=this.handlerViewFrom.getPos(),a=this.handlerView.getPos()+this.handlerView.getLength()-i;this.valueNoteViewCommon.valueNotePos=i+a/2,this.valueNoteViewCommon.setPos()}}},{key:"removeValueNotesFromAndTo",value:function(){this.valueNoteViewFrom&&this.valueNoteViewCommon&&(this.valueNoteView.showValueNote(!0),this.valueNoteViewFrom.showValueNote(!0),this.valueNoteViewCommon.note.remove(),delete this.valueNoteViewCommon)}},{key:"addObservers",value:function(){this.handlerView.addObserver("handlerMousedownEvent",this.handleMouseDown),this.handlerView.addObserver("handlerMousemoveEvent",this.mouseMove),this.handlerViewFrom&&(this.handlerViewFrom.addObserver("handlerMousedownEvent",this.handleMouseDown),this.handlerViewFrom.addObserver("handlerMousemoveEvent",this.mouseMove)),this.trackView.addObserver("handlerMousedownEvent",this.handleChangePos),this.barView.addObserver("handlerMousedownEvent",this.handleChangePos),this.scaleView.addObserver("handlerMousedownEvent",this.handleChangePos),this.handlerView.addObserver("calcValueNotePos",this.handleCalcValueNotePos),this.handlerView.addObserver("setValueNotePos",this.handleSetValueNotePos),this.handlerView.addObserver("setBar",this.handleSetBar)}},{key:"updateObservers",value:function(){this.handlerViewFrom&&this.valueNoteViewFrom&&(Object.prototype.hasOwnProperty.call(this.handlerViewFrom.observers,"calcValueNotePos")||(this.handlerViewFrom.addObserver("calcValueNotePos",this.handleCalcValueNoteFromPos),this.handlerViewFrom.addObserver("setValueNotePos",this.handleSetValueNoteFromPos),this.handlerViewFrom.addObserver("setBar",this.handleSetBar)))}}]),i}(i(a("haT7L")).default);e.exports.default=w})),a.register("eq0SQ",(function(e,t){var i=a("jvJOj");Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=void 0;var s=i(a("egzcZ")),r=i(a("6WRzF")),o=i(a("6G58z")),n=i(a("l5QOA")),l=i(a("3tBTJ")),d=i(a("iAZHY")),u=i(a("aOGIx"));function c(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var i,a=d.default(e);if(t){var s=d.default(this).constructor;i=Reflect.construct(a,arguments,s)}else i=a.apply(this,arguments);return l.default(this,i)}}var h=function(e){n.default(i,e);var t=c(i);function i(e){var a;return s.default(this,i),a=t.call(this),u.default(o.default(a),"handler",void 0),u.default(o.default(a),"parent",void 0),u.default(o.default(a),"handlerPos",void 0),u.default(o.default(a),"handleMouseMove",void 0),u.default(o.default(a),"handleMouseUp",void 0),u.default(o.default(a),"handleHandlerMouseDown",(function(e){e.preventDefault(),e.stopPropagation();var t={event:e,handler:a.handler};a.broadcast("handlerMousedownEvent",t),a.bindMousemove(e)})),a.render(e),a}return r.default(i,[{key:"getLength",value:function(){return this.isVertical()?parseInt(getComputedStyle(this.handler).height,10):parseInt(getComputedStyle(this.handler).width,10)}},{key:"getPos",value:function(){return this.isVertical()?parseInt(getComputedStyle(this.handler).bottom,10):parseInt(getComputedStyle(this.handler).left,10)}},{key:"calcPos",value:function(e){var t=e.edge,i=e.value,a=e.limits,s=a.min,r=i-s,o=a.max-s;this.handlerPos=t*(r/o)}},{key:"setPos",value:function(e){this.isVertical()?(this.handler.style.left="",this.handler.style.bottom="".concat(this.handlerPos,"px")):(this.handler.style.bottom="",this.handler.style.left="".concat(this.handlerPos,"px")),this.broadcast("calcValueNotePos",this.handler),this.broadcast("setValueNotePos");var t={handler:this.handler,vertical:this.isVertical(),double:e};this.broadcast("setBar",t)}},{key:"setVerticalView",value:function(e){e?(this.handler.classList.remove("adslider__handler_direction_horizontal"),this.handler.classList.add("adslider__handler_direction_vertical")):(this.handler.classList.remove("adslider__handler_direction_vertical"),this.handler.classList.add("adslider__handler_direction_horizontal"))}},{key:"isVertical",value:function(){return this.handler.classList.contains("adslider__handler_direction_vertical")}},{key:"render",value:function(e){this.parent=e,this.handler=document.createElement("div"),this.handler.classList.add("adslider__handler"),this.parent.append(this.handler),this.handler.addEventListener("mousedown",this.handleHandlerMouseDown)}},{key:"bindMousemove",value:function(e){this.handleMouseMove=this.mouseMove.bind(this),this.handleMouseUp=this.mouseUp.bind(this),"mousedown"===e.type&&(document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp))}},{key:"mouseMove",value:function(e){var t={shift:null,e:e,handler:this};this.broadcast("handlerMousemoveEvent",t)}},{key:"mouseUp",value:function(){document.removeEventListener("mouseup",this.handleMouseUp),document.removeEventListener("mousemove",this.handleMouseMove)}}]),i}(i(a("haT7L")).default);e.exports.default=h})),a.register("4bmuc",(function(e,t){var i=a("jvJOj");Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=void 0;var s=i(a("egzcZ")),r=i(a("6WRzF")),o=i(a("6G58z")),n=i(a("l5QOA")),l=i(a("3tBTJ")),d=i(a("iAZHY")),u=i(a("aOGIx"));function c(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var i,a=d.default(e);if(t){var s=d.default(this).constructor;i=Reflect.construct(a,arguments,s)}else i=a.apply(this,arguments);return l.default(this,i)}}var h=function(e){n.default(i,e);var t=c(i);function i(e){var a;return s.default(this,i),a=t.call(this),u.default(o.default(a),"track",void 0),u.default(o.default(a),"handleTrackMouseDown",(function(e){a.broadcast("handlerMousedownEvent",e)})),a.render(e),a.addListeners(),a}return r.default(i,[{key:"getLength",value:function(){return this.track.classList.contains("adslider__track_direction_vertical")?parseInt(getComputedStyle(this.track).height,10):parseInt(getComputedStyle(this.track).width,10)}},{key:"setVerticalView",value:function(e){e?(this.track.classList.remove("adslider__track_direction_horizontal"),this.track.classList.add("adslider__track_direction_vertical")):(this.track.classList.remove("adslider__track_direction_vertical"),this.track.classList.add("adslider__track_direction_horizontal"))}},{key:"render",value:function(e){this.track=document.createElement("div"),this.track.classList.add("adslider__track"),e.append(this.track)}},{key:"addListeners",value:function(){this.track.addEventListener("mousedown",this.handleTrackMouseDown)}}]),i}(i(a("haT7L")).default);e.exports.default=h})),a.register("bIqw0",(function(e,t){var i=a("jvJOj");Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=void 0;var s=i(a("egzcZ")),r=i(a("6WRzF")),o=i(a("6G58z")),n=i(a("l5QOA")),l=i(a("3tBTJ")),d=i(a("iAZHY")),u=i(a("aOGIx"));function c(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var i,a=d.default(e);if(t){var s=d.default(this).constructor;i=Reflect.construct(a,arguments,s)}else i=a.apply(this,arguments);return l.default(this,i)}}var h=function(e){n.default(i,e);var t=c(i);function i(e){var a;return s.default(this,i),a=t.call(this),u.default(o.default(a),"note",void 0),u.default(o.default(a),"valueNotePos",void 0),u.default(o.default(a),"value",void 0),a.render(e),a}return r.default(i,[{key:"setValue",value:function(e){this.value.textContent=String(e)}},{key:"getValue",value:function(){return Number(this.value.textContent)}},{key:"setValueForTwo",value:function(e,t){var i=String(e),a=String(t);this.value.textContent="".concat(i," - ").concat(a)}},{key:"showValueNote",value:function(e){e?(this.note.classList.remove("adslider__note_hide"),this.note.classList.add("adslider__note_show")):(this.note.classList.remove("adslider__note_show"),this.note.classList.add("adslider__note_hide"))}},{key:"calcPos",value:function(e){if(this.isVertical()){var t=getComputedStyle(e).bottom,i=getComputedStyle(e).height;this.valueNotePos=parseInt(t,10)+parseInt(i,10)/2}else{var a=getComputedStyle(e).left,s=getComputedStyle(e).width;this.valueNotePos=parseInt(a,10)+parseInt(s,10)/2}}},{key:"setPos",value:function(){this.note.classList.contains("adslider__note_direction_vertical")?(this.note.style.left="",this.note.style.bottom="".concat(this.valueNotePos,"px")):(this.note.style.bottom="",this.note.style.left="".concat(this.valueNotePos,"px"))}},{key:"setVerticalView",value:function(e){e?(this.note.classList.remove("adslider__note_direction_horizontal"),this.note.classList.add("adslider__note_direction_vertical")):(this.note.classList.remove("adslider__note_direction_vertical"),this.note.classList.add("adslider__note_direction_horizontal"))}},{key:"getSize",value:function(){return this.note.classList.contains("adslider__note_direction_vertical")?parseInt(getComputedStyle(this.note).height,10):parseInt(getComputedStyle(this.note).width,10)}},{key:"getPos",value:function(){return this.note.classList.contains("adslider__note_direction_vertical")?parseInt(getComputedStyle(this.note).bottom,10):parseInt(getComputedStyle(this.note).left,10)}},{key:"render",value:function(e){this.note=document.createElement("div"),this.value=document.createElement("p"),this.note.classList.add("adslider__note"),this.value.classList.add("adslider__value"),this.note.append(this.value),e.append(this.note)}},{key:"isVertical",value:function(){return this.note.classList.contains("adslider__note_direction_vertical")}}]),i}(i(a("haT7L")).default);e.exports.default=h})),a.register("3G8aT",(function(e,t){var i=a("jvJOj");Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=void 0;var s=i(a("egzcZ")),r=i(a("6WRzF")),o=i(a("6G58z")),n=i(a("l5QOA")),l=i(a("3tBTJ")),d=i(a("iAZHY")),u=i(a("aOGIx"));function c(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var i,a=d.default(e);if(t){var s=d.default(this).constructor;i=Reflect.construct(a,arguments,s)}else i=a.apply(this,arguments);return l.default(this,i)}}var h=function(e){n.default(i,e);var t=c(i);function i(e){var a;return s.default(this,i),a=t.call(this),u.default(o.default(a),"bar",void 0),u.default(o.default(a),"barPos",void 0),u.default(o.default(a),"handleBarMouseDown",(function(e){a.broadcast("handlerMousedownEvent",e)})),a.render(e),a.addListeners(),a}return r.default(i,[{key:"setVerticalView",value:function(e){e?(this.bar.classList.remove("adslider__bar_direction_horizontal"),this.bar.classList.add("adslider__bar_direction_vertical")):(this.bar.classList.remove("adslider__bar_direction_vertical"),this.bar.classList.add("adslider__bar_direction_horizontal"))}},{key:"setLength",value:function(e){var t,i;this.bar.style.bottom="",this.bar.style.left="",this.bar.classList.contains("adslider__bar_direction_horizontal")?(this.bar.style.height="",t=parseInt(getComputedStyle(e).left,10),i=parseInt(getComputedStyle(e).width,10),this.calcBarPosForSingle(t,i),this.bar.style.width="".concat(this.barPos,"px")):(this.bar.style.width="",t=parseInt(getComputedStyle(e).bottom,10),i=parseInt(getComputedStyle(e).height,10),this.calcBarPosForSingle(t,i),this.bar.style.height="".concat(this.barPos,"px"))}},{key:"setLengthForDouble",value:function(e){var t=e.valueFrom,i=e.valueTo,a=e.handler,s=parseInt(getComputedStyle(a).width,10),r=i+s/2,o=t+s/2,n=Math.abs(r-o);this.bar.classList.contains("adslider__bar_direction_horizontal")?(this.bar.style.height="",this.bar.style.bottom="",this.bar.style.width="".concat(n,"px"),this.calcBarPosForDouble(t,i,s),this.bar.style.left="".concat(this.barPos,"px")):(this.bar.style.width="",this.bar.style.left="",this.bar.style.height="".concat(n,"px"),this.calcBarPosForDouble(t,i,s),this.bar.style.bottom="".concat(this.barPos,"px"))}},{key:"render",value:function(e){this.bar=document.createElement("div"),this.bar.classList.add("adslider__bar"),e.append(this.bar)}},{key:"addListeners",value:function(){this.bar.addEventListener("mousedown",this.handleBarMouseDown)}},{key:"calcBarPosForSingle",value:function(e,t){this.barPos=e+t/2}},{key:"calcBarPosForDouble",value:function(e,t,i){this.barPos=e<t?e+i/2:t+i/2}}]),i}(i(a("haT7L")).default);e.exports.default=h})),a.register("cJdzJ",(function(e,t){var i=a("jvJOj");Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=void 0;var s=i(a("egzcZ")),r=i(a("6WRzF")),o=i(a("6G58z")),n=i(a("l5QOA")),l=i(a("3tBTJ")),d=i(a("iAZHY")),u=i(a("aOGIx"));function c(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var i,a=d.default(e);if(t){var s=d.default(this).constructor;i=Reflect.construct(a,arguments,s)}else i=a.apply(this,arguments);return l.default(this,i)}}var h=function(e){n.default(i,e);var t=c(i);function i(e){var a;return s.default(this,i),a=t.call(this),u.default(o.default(a),"parent",void 0),u.default(o.default(a),"scale",void 0),u.default(o.default(a),"numberOfLines",void 0),u.default(o.default(a),"lineArray",[]),u.default(o.default(a),"signArray",[]),u.default(o.default(a),"handleScaleMouseDown",(function(e){a.broadcast("handlerMousedownEvent",e)})),a.render(e),a.addListeners(),a}return r.default(i,[{key:"drawScale",value:function(e,t){e.vertical?(this.scale.classList.remove("adslider__scale_direction_horizontal"),this.scale.classList.add("adslider__scale_direction_vertical")):(this.scale.classList.remove("adslider__scale_direction_vertical"),this.scale.classList.add("adslider__scale_direction_horizontal"));var i=e.step,a=e.limits,s=a.min,r=a.max-s;this.calcNumberOfLines(i,r),this.setScalePos(t),this.createListOfScaleLines(e),this.renderScaleSign(e)}},{key:"render",value:function(e){this.parent=e,this.scale=document.createElement("div"),this.scale.classList.add("adslider__scale"),this.parent.append(this.scale)}},{key:"renderScaleLine",value:function(){var e=document.createElement("div");return e.classList.add("adslider__scale-line"),this.isVertical()?e.classList.add("adslider__scale-line_direction_vertical"):e.classList.add("adslider__scale-line_direction_horizontal"),e}},{key:"addListeners",value:function(){this.scale.addEventListener("mousedown",this.handleScaleMouseDown)}},{key:"calcNumberOfLines",value:function(e,t){this.numberOfLines=t%e==0?t/e+1:Math.floor(t/e+2)}},{key:"setScalePos",value:function(e){var t,i;this.isVertical()?(this.scale.style.width="",this.scale.style.left="",t=parseInt(getComputedStyle(e).height,10),i=parseInt(getComputedStyle(this.parent).height,10)-t,this.scale.style.height="".concat(i,"px"),this.scale.style.top="".concat(t/2,"px")):(this.scale.style.height="",this.scale.style.top="",t=parseInt(getComputedStyle(e).width,10),i=parseInt(getComputedStyle(this.parent).width,10)-t,this.scale.style.width="".concat(i,"px"),this.scale.style.left="".concat(t/2,"px"))}},{key:"createListOfScaleLines",value:function(e){var t=e.step,i=e.limits,a=i.min,s=i.max;this.scale.innerHTML="";for(var r=t/(s-a)*100,o=0;o<this.numberOfLines;o+=1){var n=this.renderScaleLine();this.scale.append(n);var l=o*r>100?100:o*r;this.isVertical()?n.style.bottom="".concat(l,"%"):n.style.left="".concat(l,"%")}}},{key:"renderScaleSign",value:function(e){var t=this;this.scale.querySelectorAll(".adslider__scale-line").forEach((function(i,a){var s=t.calcSigns(a,e),r=document.createElement("div");r.classList.add("adslider__scale-text"),t.isVertical()?r.classList.add("adslider__scale-text_direction_vertical"):r.classList.add("adslider__scale-text_direction_horizontal"),r.innerText="".concat(s),i.append(r),t.lineArray.push(i),t.signArray.push(r)})),this.capacityCheckForSign()}},{key:"capacityCheckForSign",value:function(){(this.isVertical()?this.isSmallDistanceBetweenVerticalSigns():this.isSmallDistanceBetweenHorizontalSigns())&&this.hideSigns(),this.lineArray=[],this.signArray=[]}},{key:"isSmallDistanceBetweenVerticalSigns",value:function(){return this.signArray.some((function(e,t,i){return t>0&&i[t-1].getBoundingClientRect().top-e.getBoundingClientRect().bottom<0}))}},{key:"isSmallDistanceBetweenHorizontalSigns",value:function(){return this.signArray.some((function(e,t,i){return t>0&&e.getBoundingClientRect().left-i[t-1].getBoundingClientRect().right<0}))}},{key:"hideSigns",value:function(){this.lineArray.forEach((function(e,t,i){t%2!=0&&t!==i.length-1&&e.classList.add("adslider__scale-line_hidden")})),this.setPenultimateSignView(),this.capacityCheckForSign()}},{key:"setPenultimateSignView",value:function(){(this.isVertical()?this.calcDistanceBetweenLastVerticalSigns():this.calcDistanceBetweenLastHorizontalSigns())<0?(this.lineArray[this.lineArray.length-2].classList.add("adslider__scale-line_hidden"),this.lineArray=this.lineArray.filter((function(e,t,i){return!(t%2)&&t!==i.length-2||t===i.length-1})),this.signArray=this.signArray.filter((function(e,t,i){return!(t%2)&&t!==i.length-2||t===i.length-1}))):(this.lineArray=this.lineArray.filter((function(e,t){return!(t%2)})),this.signArray=this.signArray.filter((function(e,t){return!(t%2)})))}},{key:"calcDistanceBetweenLastVerticalSigns",value:function(){return this.signArray[this.signArray.length-1].getBoundingClientRect().top-this.signArray[this.signArray.length-2].getBoundingClientRect().bottom}},{key:"calcDistanceBetweenLastHorizontalSigns",value:function(){var e=this.signArray[this.signArray.length-1].getBoundingClientRect().left;return this.signArray[this.signArray.length-2].getBoundingClientRect().right-e}},{key:"calcSigns",value:function(e,t){var i,a=t.step,s=t.limits,r=s.min,o=s.max;return i=0===e?r:e===this.numberOfLines-1?o:e*a+r,Math.round(i)}},{key:"isVertical",value:function(){return this.scale.classList.contains("adslider__scale_direction_vertical")}}]),i}(i(a("haT7L")).default);e.exports.default=h}));var o,n,l=s(a("9hXoK"));o=jQuery,n={init:function(e,t){if(o(this).data("inited"))o.error("Plugin has already been initialized on this selector!");else{var i=new l.default(e,t);o(this).data({presenter:i,inited:!0})}},update:function(e){var t=o(this).data("presenter").model,i=o(this).data("presenter");t.options=e,t.init(t.options),i.updateView()},updateCurValue:function(e){var t=o(this).data("presenter").model,i=o(this).data("presenter");t.options.curValue=e,t.init(t.options),i.updateView()},getOptions:function(){return o(this).data("presenter").model.options}},o.fn.adslider=function(e){return"update"===e?n.update.call(this,arguments[1]):"getOptions"===e?n.getOptions.call(this):"object"!==r.default(e)&&e?void o.error("Method ".concat(e," does not exist on jQuery.tooltip")):n.init.call(this,this[0],e)};
//# sourceMappingURL=demo-page.d4ebc7f1.js.map
