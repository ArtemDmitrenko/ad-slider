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

exports.__esModule = true;

var EventObserver =
/** @class */
function () {
  function EventObserver() {
    this.observers = [];
  } // constructor() {
  //   this.observers = [];
  // }


  EventObserver.prototype.addObserver = function (newObserver) {
    if (typeof newObserver !== 'function') {
      throw new Error('Observer must be a function!');
    }

    this.observers.forEach(function (observer) {
      if (observer === newObserver) {
        throw new Error('Observer already in the list!');
      }
    });
    this.observers.push(newObserver);
  };

  EventObserver.prototype.removeObserver = function (obs) {
    for (var i = 0; i < this.observers.length; i++) {
      if (obs === this.observers[i]) {
        this.observers.splice(i, 1);
        return;
      }
    }

    throw new Error('No such observer in the list!');
  };

  EventObserver.prototype.broadcast = function (data) {
    if (this.observers.length < 1) {
      return;
    }

    var observersClone = this.observers.slice(0);
    observersClone.forEach(function (subscriber) {
      subscriber(data);
    });
  };

  return EventObserver;
}();

exports["default"] = EventObserver;
},{}],"model/model.js":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

exports.__esModule = true;
exports.Model = void 0;

var eventObserver_1 = require("../eventObserver/eventObserver");

var Model =
/** @class */
function (_super) {
  __extends(Model, _super);

  function Model(options) {
    var _this = _super.call(this) || this;

    _this.limits = options.limits ? options.limits : {
      min: 0,
      max: 100
    };
    _this.curValue = options.curValue ? options.curValue : 50;
    _this.showValueNote = typeof options.showValueNote === 'boolean' ? options.showValueNote : true;
    return _this;
  }

  Model.prototype.setValue = function (value) {
    if (typeof value !== 'number') {
      throw new Error('Value must be a number');
    } else if (value < this.limits.min || value > this.limits.max) {
      throw new Error('Value must be in range of min and max limits');
    }

    this.curValue = value; // this.eventUpdateValue.broadcast(this.defValue);
  };

  Model.prototype.setLimits = function (values) {
    if (_typeof(values) !== 'object') {
      throw new Error('Limits must be object');
    } else if (values.min >= values.max) {
      throw new Error('Min can not be more than Max');
    }

    this.limits = {
      min: values.min,
      max: values.max
    };
  };

  return Model;
}(eventObserver_1["default"]);

exports.Model = Model; // constructor(options) {
//   this.limits = (options.limits) ? options.limits : { min: 0, max: 100 };
//   this.defValue = (options.defValue) ? options.defValue : 50;
//   this.showValueNote = (typeof options.showValueNote === 'boolean') ? options.showValueNote : true;
//   // Event to update value on handler when defvalue in Model is changed
//   this.eventUpdateValue = new EventObserver();
//   this.setValue(this.defValue);
//   this.setLimits(this.limits);
// }
//   getValueFromHandlerPos(data) {
//     this.defValue = Math.round(this.limits.min + (this.limits.max - this.limits.min) * (parseInt(data.newLeft, 10) / data.rightEdge));
//     this.eventUpdateValue.broadcast(this.defValue);
//   }
//   getHandlerPosFromValue(rightEdge) {
//     const newLeft = Math.round(rightEdge * (this.defValue - this.limits.min) / (this.limits.max - this.limits.min));
//     return newLeft;
//   }
},{"../eventObserver/eventObserver":"eventObserver/eventObserver.js"}],"view/handlerView/handlerView.js":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var HandlerView =
/** @class */
function () {
  function HandlerView($parent) {
    this.render($parent);
  }

  HandlerView.prototype.render = function ($parent) {
    this.$parent = $parent;
    this.$handler = document.createElement('div');
    this.$handler.classList.add('adslider__handler');
    $parent.append(this.$handler);
  };

  HandlerView.prototype.setPos = function (pos) {
    this.$handler.style.left = pos / this.$parent.offsetWidth * 100 + '%';
  };

  HandlerView.prototype.getHandlerWidth = function () {
    return this.$handler.offsetWidth;
  };

  return HandlerView;
}();

exports["default"] = HandlerView;
},{}],"view/trackView/trackView.js":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var TrackView =
/** @class */
function () {
  function TrackView($parent) {
    this.render($parent);
  }

  TrackView.prototype.render = function ($parent) {
    this.$track = document.createElement('div');
    this.$track.classList.add('adslider__track');
    $parent.append(this.$track);
  };

  return TrackView;
}();

exports["default"] = TrackView;
},{}],"view/valueNoteView/valueNoteView.js":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var ValueNoteView =
/** @class */
function () {
  function ValueNoteView(parent) {
    this.render(parent);
  }

  ValueNoteView.prototype.render = function (parent) {
    this.$note = document.createElement('div');
    this.$value = document.createElement('p');
    this.$note.classList.add('adslider__note');
    this.$value.classList.add('adslider__value');
    this.$note.append(this.$value);
    parent.append(this.$note);
  };

  ValueNoteView.prototype.alignRelHandler = function (handlerWidth) {
    this.$note.style.left = handlerWidth / 2 + 'px';
  };

  return ValueNoteView;
}();

exports["default"] = ValueNoteView;
},{}],"view/view.js":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

exports.__esModule = true;

var handlerView_1 = require("./handlerView/handlerView");

var trackView_1 = require("./trackView/trackView");

var valueNoteView_1 = require("./valueNoteView/valueNoteView");

var eventObserver_1 = require("../eventObserver/eventObserver");

var View =
/** @class */
function (_super) {
  __extends(View, _super);

  function View(selector) {
    var _this = _super.call(this) || this;

    _this.render(selector);

    return _this; // this.valueNote._alignRelHandler(this.handler._getHandlerWidth());
    // this.handler._setMovePosition(this.track.$track);
    // When position of handler is changing - valueNote is changing position too
    // this.handler.eventMousemove.addObserver(this.valueNote._setPosition.bind(this.valueNote));
  }

  View.prototype.render = function (selector) {
    this.$el = document.querySelector(selector);

    if (!this.$el) {
      throw new Error('You do not have this selector in your DOM');
    }

    this.$adslider = document.createElement('div');
    this.$adslider.classList.add('adslider');
    this.$el.append(this.$adslider);
    this.trackView = new trackView_1["default"](this.$adslider);
    this.handlerView = new handlerView_1["default"](this.trackView.$track);
    this.valueNoteView = new valueNoteView_1["default"](this.$adslider);
    this.valueNoteView.$note.style.left = this.handlerView.getHandlerWidth() / 2 + 'px';
  };

  return View;
}(eventObserver_1["default"]);

exports["default"] = View;
},{"./handlerView/handlerView":"view/handlerView/handlerView.js","./trackView/trackView":"view/trackView/trackView.js","./valueNoteView/valueNoteView":"view/valueNoteView/valueNoteView.js","../eventObserver/eventObserver":"eventObserver/eventObserver.js"}],"presenter/presenter.js":[function(require,module,exports) {
"use strict"; // import EventObserver from '../eventObserver/eventObserver';

exports.__esModule = true;

var Presenter =
/** @class */
function () {
  function Presenter() {}

  return Presenter;
}();

exports["default"] = Presenter;
},{}],"createAdslider.js":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var model_1 = require("./model/model");

var view_1 = require("./view/view");

var presenter_1 = require("./presenter/presenter");

function createAdslider(selector, userOptions) {
  var view = new view_1["default"](selector);
  var model = new model_1.Model(userOptions);
  var presenter = new presenter_1["default"]();
}

exports["default"] = createAdslider;
createAdslider('.container', {
  limits: {
    min: 50,
    max: 150
  },
  curValue: 90,
  showValueNote: false
});
},{"./model/model":"model/model.js","./view/view":"view/view.js","./presenter/presenter":"presenter/presenter.js"}],"adslider-native.js":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var createAdslider_1 = require("./createAdslider");

window.adslider = createAdslider_1["default"] || {}; // window.adslider = createAdslider;
},{"./createAdslider":"createAdslider.js"}],"../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56528" + '/');

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
},{}]},{},["../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","adslider-native.js"], null)
//# sourceMappingURL=/adslider-native.782c2f27.js.map