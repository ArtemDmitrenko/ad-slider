// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"eventObserver/eventObserver.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventObserver = /*#__PURE__*/function () {
  function EventObserver() {
    _classCallCheck(this, EventObserver);

    this.observers = [];
  }

  _createClass(EventObserver, [{
    key: "addObserver",
    value: function addObserver(newObserver) {
      if (typeof newObserver !== 'function') {
        console.dir(this);
        throw new Error('Observer must be a function!');
      }

      this.observers.forEach(function (observer) {
        if (observer === newObserver) {
          throw new Error('Observer already in the list!');
        }
      });
      this.observers.push(newObserver);
    }
  }, {
    key: "removeObserver",
    value: function removeObserver(obs) {
      for (var i = 0; i < this.observers.length; i++) {
        if (obs === this.observers[i]) {
          this.observers.splice(i, 1);
          return;
        }
      }

      throw new Error('No such observer in the list!');
    }
  }, {
    key: "broadcast",
    value: function broadcast(data) {
      if (this.observers < 1) {
        return false;
      }

      var observersClone = this.observers.slice(0);
      observersClone.forEach(function (subscriber) {
        subscriber(data);
      });
    }
  }]);

  return EventObserver;
}();

exports.default = EventObserver;
},{}],"model/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eventObserver = _interopRequireDefault(require("../eventObserver/eventObserver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Model = /*#__PURE__*/function () {
  function Model(options) {
    _classCallCheck(this, Model);

    this.limits = options.limits ? options.limits : {
      min: 0,
      max: 100
    };
    this.defValue = options.defValue ? options.defValue : 50;
    this.showValueNote = options.showValueNote ? options.showValueNote : true;
  }

  _createClass(Model, [{
    key: "setValue",
    value: function setValue(value) {
      this.defValue = value;
      this.updateValue = new _eventObserver.default();
      this.updateValue.broadcast(this.defValue);
    }
  }, {
    key: "setLimits",
    value: function setLimits(values) {
      if (_typeof(values) !== 'object') {
        throw new Error('It must be object');
      } else if (values.min >= values.max) {
        throw new Error('Min can not be more than Max');
      }

      this.limits = {
        min: values.min,
        max: values.max
      };
      this.updateLimits = new _eventObserver.default();
      this.updateLimits.broadcast(this.limits);
    }
  }, {
    key: "getvalue",
    value: function getvalue() {
      return this.defValue;
    }
  }]);

  return Model;
}(); // const model = new Model({ defValue: 70 });
// model.setValue(60);
// console.log(model.limits)
// model.setLimits({ min: 50, max: 100 });
// console.log(model.limits)


exports.default = Model;
},{"../eventObserver/eventObserver":"eventObserver/eventObserver.js"}],"view/handlerView/handlerView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HandlerView = /*#__PURE__*/function () {
  function HandlerView() {
    _classCallCheck(this, HandlerView);
  }

  _createClass(HandlerView, [{
    key: "_render",
    value: function _render() {
      this.$handler = document.createElement('div');
      this.$handler.classList.add('adslider__handler');
    }
  }]);

  return HandlerView;
}();

exports.default = HandlerView;
},{}],"view/trackView/trackView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TrackView = /*#__PURE__*/function () {
  function TrackView(parent) {
    _classCallCheck(this, TrackView);

    this.parent = parent;

    this._render();
  }

  _createClass(TrackView, [{
    key: "_render",
    value: function _render() {
      this.$track = document.createElement('div');
      this.$track.classList.add('adslider__track');
      this.parent.append(this.$track);
    }
  }]);

  return TrackView;
}();

exports.default = TrackView;
},{}],"view/valueNoteView/valueNoteView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ValueNoteView = /*#__PURE__*/function () {
  function ValueNoteView(parent) {
    _classCallCheck(this, ValueNoteView);

    this.parent = parent;

    this._render();
  }

  _createClass(ValueNoteView, [{
    key: "_render",
    value: function _render() {
      this.$note = document.createElement('div');
      this.$value = document.createElement('div');
      this.$note.classList.add('adslider__note');
      this.$value.classList.add('adslider__value');
      this.$note.append(this.$value);
      this.parent.append(this.$note);
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this.$value.textContent = value;
    }
  }]);

  return ValueNoteView;
}();

exports.default = ValueNoteView;
},{}],"view/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eventObserver = _interopRequireDefault(require("../eventObserver/eventObserver"));

var _handlerView = _interopRequireDefault(require("./handlerView/handlerView"));

var _trackView = _interopRequireDefault(require("./trackView/trackView"));

var _valueNoteView = _interopRequireDefault(require("./valueNoteView/valueNoteView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View = /*#__PURE__*/function () {
  function View(selector) {
    _classCallCheck(this, View);

    this.$el = document.querySelector(selector);
    this.render(); // this.$adSlider = this.$el.querySelector('.ad-slider');
    // this.$sliderLine = this.$el.querySelector('.ad-slider__line');
    // this.$input = this.$el.querySelector('.ad-slider__input');
    // this.$sliderValue = this.$el.querySelector('.ad-slider__number');
    // this.$input = this.$el.querySelector('.example');
    // this.displayValue = (options.displayValue) ? options.displayValue : false;
    // this.$sliderTable = this.$el.querySelector('.ad-slider__value');
    // this.$roller = this.$el.querySelector('.ad-slider__roller');
    // this.initdefValue();
    // model.eventObserver.addObserver(() => this.initdefValue());
    // this.initdefValue()
  }

  _createClass(View, [{
    key: "render",
    value: function render() {
      var track = new _trackView.default(this.$el);
      var handler = new _handlerView.default(this.$el);
      var valueNote = new _valueNoteView.default(this.$el);
    } // initdefValue() {
    //   const rightEdge = this.$sliderLine.offsetWidth - this.$roller.offsetWidth;
    //   if (this.model.defValue > this.model.limits.max || this.model.defValue < this.model.limits.min) {
    //     alert('Текщее значение введено вне интервала между минимальным и максимальным значением');
    //   } else {
    //     this.$sliderValue.textContent = this.model.defValue;
    //     const newLeft = Math.round(rightEdge * (this.model.defValue - this.model.limits.min) / (this.model.limits.max - this.model.limits.min));
    //     this.$roller.style.left = newLeft + 'px';
    //     this.$sliderTable.style.left = newLeft + this.$roller.offsetWidth / 2 + 'px';
    //     this.$input.value = this.model.defValue;
    //   }
    // }
    // fillInput() {
    //   this.$input.value = this.model.getValue();
    // }

  }]);

  return View;
}();

exports.default = View;
},{"../eventObserver/eventObserver":"eventObserver/eventObserver.js","./handlerView/handlerView":"view/handlerView/handlerView.js","./trackView/trackView":"view/trackView/trackView.js","./valueNoteView/valueNoteView":"view/valueNoteView/valueNoteView.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _eventObserver = _interopRequireDefault(require("./eventObserver/eventObserver"));

var _model = _interopRequireDefault(require("./model/model"));

var _view = _interopRequireDefault(require("./view/view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var model = new _model.default({
  defValue: 40
});
var view = new _view.default(model, '.container');
},{"./eventObserver/eventObserver":"eventObserver/eventObserver.js","./model/model":"model/model.js","./view/view":"view/view.js"}],"../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64465" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map