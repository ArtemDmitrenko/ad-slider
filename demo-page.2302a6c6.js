// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"6659E":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "69f74e7f31319ffd";
module.bundle.HMR_BUNDLE_ID = "1985a3552302a6c6";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F1() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                } // Render the fancy html overlay
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>\n          ").concat(stack, "\n        </pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>' + hint + '</div>';
            }).join(''), "\n        </div>\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"8NCqq":[function(require,module,exports) {
"use strict";
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
require("./main.scss");
var _Presenter = _interopRequireDefault(require("./Presenter/Presenter"));
(function($) {
    var methods = {
        init: function init(container, options) {
            if ($(this).data('inited')) $.error('Plugin has already been initialized on this selector!');
            else {
                var presenter = new _Presenter["default"](container, options);
                $(this).data({
                    presenter: presenter,
                    inited: true
                });
            }
        },
        update: function update(options) {
            var _$$data = $(this).data('presenter'), model = _$$data.model;
            var presenter = $(this).data('presenter');
            model.options = options;
            model.init(model.options);
            presenter.updateView();
        },
        getOptions: function getOptions() {
            return $(this).data('presenter').model.options;
        }
    };
    $.fn.adslider = function(methodOrOptions) {
        if (methodOrOptions === 'update') return methods.update.call(this, arguments[1]);
        if (methodOrOptions === 'getOptions') return methods.getOptions.call(this);
        if (_typeof2["default"](methodOrOptions) === 'object' || !methodOrOptions) return methods.init.call(this, this[0], methodOrOptions);
        $.error("Method ".concat(methodOrOptions, " does not exist on jQuery.tooltip"));
    };
})(jQuery);

},{"@babel/runtime/helpers/interopRequireDefault":"eigyQ","@babel/runtime/helpers/typeof":"1XGzZ","./main.scss":"2NwCl","./Presenter/Presenter":"e1PEa"}],"eigyQ":[function(require,module,exports) {
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
module.exports = _interopRequireDefault;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],"1XGzZ":[function(require,module,exports) {
function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        module.exports = _typeof = function _typeof1(obj1) {
            return typeof obj1;
        };
        module.exports["default"] = module.exports, module.exports.__esModule = true;
    } else {
        module.exports = _typeof = function _typeof1(obj1) {
            return obj1 && typeof Symbol === "function" && obj1.constructor === Symbol && obj1 !== Symbol.prototype ? "symbol" : typeof obj1;
        };
        module.exports["default"] = module.exports, module.exports.__esModule = true;
    }
    return _typeof(obj);
}
module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],"2NwCl":[function() {},{}],"e1PEa":[function(require,module,exports) {
"use strict";
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Model = require("../Model/Model");
var _View = _interopRequireDefault(require("../View/View"));
var _eventTypes = _interopRequireDefault(require("../EventObserver/eventTypes"));
var Presenter = /*#__PURE__*/ function() {
    function Presenter1(container, _options) {
        var _this = this;
        _classCallCheck2["default"](this, Presenter1);
        _defineProperty2["default"](this, "model", void 0);
        _defineProperty2["default"](this, "view", void 0);
        _defineProperty2["default"](this, "handleCalcValue", function(data) {
            _this.model.setValueFromHandlerPos(data);
        });
        _defineProperty2["default"](this, "handleCalcPos", function(options) {
            _this.view.calcPos(options);
        });
        _defineProperty2["default"](this, "handleSetPos", function(options) {
            _this.view.setPos(options);
        });
        this.model = new _Model.Model(_options);
        this.view = new _View["default"](container);
        this.updateView();
        this.addObservers();
    }
    _createClass2["default"](Presenter1, [
        {
            key: "updateView",
            value: function updateView() {
                this.view.updateView(this.model.options);
            }
        },
        {
            key: "addObservers",
            value: function addObservers() {
                this.view.addObserver(_eventTypes["default"].CHANGE_POSITION, this.handleCalcValue);
                this.model.addObserver(_eventTypes["default"].CALC_POSITION, this.handleCalcPos);
                this.model.addObserver(_eventTypes["default"].SET_POSITION, this.handleSetPos);
            }
        }
    ]);
    return Presenter1;
}();
var _default = Presenter;
exports["default"] = _default;

},{"@babel/runtime/helpers/interopRequireDefault":"eigyQ","@babel/runtime/helpers/classCallCheck":"fIqcI","@babel/runtime/helpers/createClass":"eFNXV","@babel/runtime/helpers/defineProperty":"eCMPI","../Model/Model":"5cv75","../View/View":"3BaZe","../EventObserver/eventTypes":"cbWbf"}],"fIqcI":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],"eFNXV":[function(require,module,exports) {
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],"eCMPI":[function(require,module,exports) {
function _defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],"5cv75":[function(require,module,exports) {
"use strict";
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Model = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _EventObserver2 = _interopRequireDefault(require("../EventObserver/EventObserver"));
var _eventTypes = _interopRequireDefault(require("../EventObserver/eventTypes"));
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf2["default"](Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf2["default"](this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return _possibleConstructorReturn2["default"](this, result);
    };
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
var Model1 = /*#__PURE__*/ function(_EventObserver) {
    _inherits2["default"](Model2, _EventObserver);
    var _super = _createSuper(Model2);
    function Model2(options) {
        var _this;
        _classCallCheck2["default"](this, Model2);
        _this = _super.call(this);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "options", void 0);
        _this.options = {
            limits: options.limits,
            showValueNote: options.showValueNote,
            step: options.step,
            vertical: options.vertical,
            "double": options["double"],
            from: options.from,
            to: options.to
        };
        _this.init(_this.options);
        return _this;
    }
    _createClass2["default"](Model2, [
        {
            key: "init",
            value: function init(options) {
                var limits = options.limits, step = options.step, from = options.from, to = options.to, _double = options["double"];
                this.setLimitsAndValues(limits, to, from, _double);
                this.setStep(step); // this.setValueTo(to);
                // this.setValueFrom(from);
                // this.setCurValue(curValue);
                this.setDouble(_double, from);
            } // public init(): void {
        },
        {
            key: "setValueFromHandlerPos",
            value: function setValueFromHandlerPos(data) {
                var relPosition = data.relPosition, isFrom = data.isFrom;
                var value = this.calcValueFromHandlerPos(relPosition);
                var conditionForReturn = this.options["double"] && this.isValToMovesOverValFrom(value);
                if (isFrom && this.isValFromMovesOverValTo(value)) return;
                if (!isFrom && conditionForReturn) return;
                this.setValAndBroadcast(value, isFrom);
            }
        },
        {
            key: "calcValueFromHandlerPos",
            value: function calcValueFromHandlerPos(relPos) {
                var _this$options$limits = this.options.limits, min = _this$options$limits.min, max = _this$options$limits.max;
                var odds = max - min;
                return Math.round(min + odds * relPos);
            }
        },
        {
            key: "setDouble",
            value: function setDouble(_double2, from) {
                var min = this.options.limits.min;
                if (_double2 && !from) this.options.from = min;
                if (!_double2 && from) this.options.from = null;
                this.options["double"] = _double2;
            }
        },
        {
            key: "setLimitsAndValues",
            value: function setLimitsAndValues(limits, to, from, _double3) {
                var min = limits.min, max = limits.max;
                if (min >= max) throw new Error('Min can not be the same or more than Max');
                if (!_double3) {
                    if (max < to) this.options.to = max;
                    else if (min > to) this.options.to = min;
                    else this.setValue(to);
                }
                if (_double3 && typeof from === 'number' && typeof to === 'number') {
                    if (max < to) this.options.to = max;
                    else if (max < from) this.options.from = max;
                    else if (min > to) this.options.to = min;
                    else if (min > from) this.options.from = min;
                    else {
                        this.setValueTo(to);
                        if (typeof from === 'number') this.setValueFrom(from);
                    }
                }
            }
        },
        {
            key: "setValue",
            value: function setValue(value) {
                var _this$options = this.options, _this$options$limits2 = _this$options.limits, min = _this$options$limits2.min, max = _this$options$limits2.max, step = _this$options.step;
                this.options.to = this.calcRoundedValue(value, step, max, min);
            } // eslint-disable-next-line class-methods-use-this
        },
        {
            key: "calcRoundedValue",
            value: function calcRoundedValue(value, step, max, min) {
                var odd = Math.abs((min - value) % step);
                if (odd === 0) return value;
                var numberOfSteps = Math.round((min - value) / step);
                var newValue = step * Math.abs(numberOfSteps) + min;
                if (newValue > max) newValue = max;
                return newValue;
            }
        },
        {
            key: "setValueTo",
            value: function setValueTo(value) {
                var _this$options2 = this.options, _this$options2$limits = _this$options2.limits, min = _this$options2$limits.min, max = _this$options2$limits.max, step = _this$options2.step;
                if (step && value) this.options.to = this.calcRoundedValue(value, step, max, min);
            }
        },
        {
            key: "setValueFrom",
            value: function setValueFrom(value) {
                var _this$options3 = this.options, _this$options3$limits = _this$options3.limits, min = _this$options3$limits.min, max = _this$options3$limits.max, step = _this$options3.step, to = _this$options3.to;
                if (value > to && to) throw new Error('Value From must be less than To');
                if (step && value) this.options.from = this.calcRoundedValue(value, step, max, min);
            }
        },
        {
            key: "setStep",
            value: function setStep(step) {
                var _this$options$limits3 = this.options.limits, min = _this$options$limits3.min, max = _this$options$limits3.max;
                if (step > max - min) throw new Error('Step can not be more than odd min and max limits');
                this.options.step = step || 1;
            }
        },
        {
            key: "setValAndBroadcast",
            value: function setValAndBroadcast(value, isFrom) {
                var _this$options4 = this.options, limits = _this$options4.limits, _double4 = _this$options4["double"];
                if (isFrom) {
                    this.options.from = this.calcValueWithStep(value);
                    var options = {
                        value: this.options.from,
                        limits: limits,
                        isFrom: isFrom
                    };
                    this.broadcast(_eventTypes["default"].CALC_POSITION, options);
                    var data = {
                        isDouble: _double4,
                        isFrom: isFrom,
                        showValueNote: this.options.showValueNote
                    };
                    this.broadcast(_eventTypes["default"].SET_POSITION, data);
                } else {
                    this.options.to = this.calcValueWithStep(value);
                    var _options = {
                        value: this.options.to,
                        limits: limits,
                        isFrom: isFrom
                    };
                    this.broadcast(_eventTypes["default"].CALC_POSITION, _options);
                    var _data = {
                        isDouble: _double4,
                        isFrom: isFrom,
                        showValueNote: this.options.showValueNote
                    };
                    this.broadcast(_eventTypes["default"].SET_POSITION, _data);
                }
            }
        },
        {
            key: "isValFromMovesOverValTo",
            value: function isValFromMovesOverValTo(value) {
                var to = this.options.to;
                return value > to;
            }
        },
        {
            key: "isValToMovesOverValFrom",
            value: function isValToMovesOverValFrom(value) {
                var from = this.options.from;
                if (from || from === 0) return value < from;
                return false;
            }
        },
        {
            key: "calcValueWithStep",
            value: function calcValueWithStep(value) {
                var _this$options5 = this.options, _this$options5$limits = _this$options5.limits, min = _this$options5$limits.min, max = _this$options5$limits.max, step = _this$options5.step;
                var allNumberOfSteps = Math.floor(Math.abs(max - min) / step);
                var maxStepValue = min + allNumberOfSteps * step;
                var numberOfSteps = Math.round((value - min) / step);
                var newValue = min + step * numberOfSteps;
                if (newValue < min) newValue += step;
                if (newValue > max) newValue -= step;
                if (value > maxStepValue) {
                    if (value > maxStepValue + (max - maxStepValue) / 2) newValue = max;
                    else newValue = maxStepValue;
                }
                return newValue;
            }
        }
    ]);
    return Model2;
}(_EventObserver2["default"]);
exports.Model = Model1;

},{"@babel/runtime/helpers/interopRequireDefault":"eigyQ","@babel/runtime/helpers/classCallCheck":"fIqcI","@babel/runtime/helpers/createClass":"eFNXV","@babel/runtime/helpers/assertThisInitialized":"k3YcS","@babel/runtime/helpers/inherits":"8mpJg","@babel/runtime/helpers/possibleConstructorReturn":"iiXLy","@babel/runtime/helpers/getPrototypeOf":"DHhBk","@babel/runtime/helpers/defineProperty":"eCMPI","../EventObserver/EventObserver":"ftS0S","../EventObserver/eventTypes":"cbWbf"}],"k3YcS":[function(require,module,exports) {
function _assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
module.exports = _assertThisInitialized;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],"8mpJg":[function(require,module,exports) {
var setPrototypeOf = require("./setPrototypeOf.js");
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
}
module.exports = _inherits;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{"./setPrototypeOf.js":"2OSnG"}],"2OSnG":[function(require,module,exports) {
function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf1(o1, p1) {
        o1.__proto__ = p1;
        return o1;
    };
    module.exports["default"] = module.exports, module.exports.__esModule = true;
    return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],"iiXLy":[function(require,module,exports) {
var _typeof = require("@babel/runtime/helpers/typeof")["default"];
var assertThisInitialized = require("./assertThisInitialized.js");
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) return call;
    else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
    return assertThisInitialized(self);
}
module.exports = _possibleConstructorReturn;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{"@babel/runtime/helpers/typeof":"1XGzZ","./assertThisInitialized.js":"k3YcS"}],"DHhBk":[function(require,module,exports) {
function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf1(o1) {
        return o1.__proto__ || Object.getPrototypeOf(o1);
    };
    module.exports["default"] = module.exports, module.exports.__esModule = true;
    return _getPrototypeOf(o);
}
module.exports = _getPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

},{}],"ftS0S":[function(require,module,exports) {
"use strict";
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var EventObserver = /*#__PURE__*/ function() {
    function EventObserver1() {
        _classCallCheck2["default"](this, EventObserver1);
        _defineProperty2["default"](this, "observers", void 0);
        this.observers = {
        };
    }
    _createClass2["default"](EventObserver1, [
        {
            key: "addObserver",
            value: function addObserver(event, newObserver) {
                if (this.observers[event]) {
                    if (this.observers[event].includes(newObserver)) throw new Error('Observer is already in the list!');
                    this.observers[event].push(newObserver);
                } else this.observers[event] = [
                    newObserver
                ];
            }
        },
        {
            key: "broadcast",
            value: function broadcast(event, data) {
                if (this.observers[event] === undefined) throw new Error('There is no such observer in the list!');
                this.observers[event].forEach(function(subscriber) {
                    subscriber(data);
                });
            }
        }
    ]);
    return EventObserver1;
}();
var _default = EventObserver;
exports["default"] = _default;

},{"@babel/runtime/helpers/interopRequireDefault":"eigyQ","@babel/runtime/helpers/classCallCheck":"fIqcI","@babel/runtime/helpers/createClass":"eFNXV","@babel/runtime/helpers/defineProperty":"eCMPI"}],"cbWbf":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
var EventTypes;
(function(EventTypes1) {
    EventTypes1["CHANGE_POSITION"] = "CHANGE_POSITION";
    EventTypes1["CALC_POSITION"] = "CALC_POSITION";
    EventTypes1["SET_POSITION"] = "SET_POSITION";
    EventTypes1["HANDLER_MOUSEDOWN_EVENT"] = "HANDLER_MOUSEDOWN_EVENT";
    EventTypes1["HANDLER_MOUSEMOVE_EVENT"] = "HANDLER_MOUSEMOVE_EVENT";
    EventTypes1["CALC_VALUE_NOTE_POSITION"] = "CALC_VALUE_NOTE_POSITION";
    EventTypes1["SET_VALUE_NOTE_POS"] = "SET_VALUE_NOTE_POS";
    EventTypes1["SET_BAR"] = "SET_BAR";
})(EventTypes || (EventTypes = {
}));
var _default = EventTypes;
exports["default"] = _default;

},{}],"3BaZe":[function(require,module,exports) {
"use strict";
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _HandlerView = _interopRequireDefault(require("./HandlerView/HandlerView"));
var _TrackView = _interopRequireDefault(require("./TrackView/TrackView"));
var _ValueNoteView = _interopRequireDefault(require("./ValueNoteView/ValueNoteView"));
var _BarView = _interopRequireDefault(require("./BarView/BarView"));
var _ScaleView = _interopRequireDefault(require("./ScaleView/ScaleView"));
var _EventObserver2 = _interopRequireDefault(require("../EventObserver/EventObserver"));
var _eventTypes = _interopRequireDefault(require("../EventObserver/eventTypes"));
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf2["default"](Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf2["default"](this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return _possibleConstructorReturn2["default"](this, result);
    };
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
var View1 = /*#__PURE__*/ function(_EventObserver) {
    _inherits2["default"](View2, _EventObserver);
    var _super = _createSuper(View2);
    function View2(container) {
        var _this;
        _classCallCheck2["default"](this, View2);
        _this = _super.call(this);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "el", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handlerView", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handlerViewFrom", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "valueNoteViewFrom", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "valueNoteViewCommon", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "trackView", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "valueNoteView", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "barView", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "scaleView", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "adslider", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handlerShift", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "areHandlersInOnePoint", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "mousedownClientX", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "mousedownClientY", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "leadHandler", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "isHandlerTo", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "isHandlerFrom", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handleChangePos", function(e) {
            if (_this.isDouble()) {
                if (_this.handlerView.handler.classList.contains('adslider__handler_direction_horizontal')) _this.changeHandlerPosForDoubleHorizontal(e);
                else _this.changeHandlerPosForDoubleVertical(e);
            } else {
                var data = {
                    shift: _this.handlerView.getLength() / 2,
                    e: e,
                    handler: _this.handlerView
                };
                _this.mouseMove(data);
            }
        });
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handleMouseDown", function(data) {
            var event = data.event, handler = data.handler;
            _this.calcShift(event, handler);
            _this.checkIfHandlersInOnePlace(event);
        });
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "mouseMove", function(data) {
            var shift = data.shift, e = data.e, handler = data.handler;
            if (_this.areHandlersInOnePoint) _this.findLeadHandler(e, handler);
            else _this.leadHandler = handler;
            var newPos;
            if (e.type === 'mousedown') newPos = _this.calcNewPos(shift, e);
            else newPos = _this.calcNewPos(_this.handlerShift, e);
            var edge = _this.getEdge(_this.leadHandler);
            newPos = _this.checkNewPos(newPos);
            var isFrom = _this.leadHandler.handler.classList.contains('adslider__handler_type_from');
            var relPosition = newPos / edge;
            var options = {
                relPosition: relPosition,
                isFrom: isFrom
            };
            _this.broadcast(_eventTypes["default"].CHANGE_POSITION, options);
        });
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handleSetBar", function(data) {
            if (!data["double"]) _this.barView.setLength(data.handler);
            else if (_this.handlerViewFrom) {
                var options = {
                    valueFrom: _this.handlerViewFrom.getPos(),
                    valueTo: _this.handlerView.getPos(),
                    handler: data.handler
                };
                _this.barView.setLengthForDouble(options);
            }
        });
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handleSetValueNoteFromPos", function() {
            if (_this.valueNoteViewFrom) _this.valueNoteViewFrom.setPos();
        });
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handleCalcValueNoteFromPos", function(handler) {
            if (_this.valueNoteViewFrom) _this.valueNoteViewFrom.calcPos(handler);
        });
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handleSetValueNotePos", function() {
            _this.valueNoteView.setPos();
        });
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handleCalcValueNotePos", function(handler) {
            _this.valueNoteView.calcPos(handler);
        });
        _this.render(container);
        _this.addObservers();
        return _this;
    }
    _createClass2["default"](View2, [
        {
            key: "updateView",
            value: function updateView(options) {
                var vertical = options.vertical, limits = options.limits, showValueNote = options.showValueNote, _double = options["double"], from = options.from, to = options.to;
                this.setVerticalViewForSingle(vertical);
                this.handlerView.calcPos({
                    edge: this.getEdge(this.handlerView),
                    value: to,
                    limits: limits
                });
                this.handlerView.setPos(_double);
                this.valueNoteView.setValue(to);
                this.valueNoteView.showValueNote(showValueNote);
                this.scaleView.drawScale(options, this.handlerView.handler);
                if (_double) this.updateViewForDouble(vertical, from, limits, showValueNote);
                else if (this.handlerViewFrom) {
                    this.deleteHandlerFrom();
                    this.deleteValueNoteViewCommon();
                }
            }
        },
        {
            key: "calcPos",
            value: function calcPos(options) {
                var value = options.value, limits = options.limits, isFrom = options.isFrom;
                if (this.handlerViewFrom && this.valueNoteViewFrom) {
                    var data = {
                        edge: this.getEdge(this.handlerViewFrom),
                        value: value,
                        limits: limits
                    };
                    if (isFrom) {
                        this.handlerViewFrom.calcPos(data);
                        this.valueNoteViewFrom.setValue(value);
                    } else {
                        this.handlerView.calcPos(data);
                        this.valueNoteView.setValue(value);
                    }
                } else {
                    var _data = {
                        edge: this.getEdge(this.handlerView),
                        value: value,
                        limits: limits
                    };
                    this.handlerView.calcPos(_data);
                    this.valueNoteView.setValue(value);
                }
            }
        },
        {
            key: "setPos",
            value: function setPos(options) {
                var isDouble = options.isDouble, isFrom = options.isFrom, showValueNote = options.showValueNote;
                if (this.handlerViewFrom) {
                    if (isFrom) this.handlerViewFrom.setPos(isDouble);
                    else this.handlerView.setPos(isDouble);
                    this.setViewOfOneNote(showValueNote);
                    this.valueNoteView.showValueNote(showValueNote);
                    if (this.valueNoteViewFrom) this.valueNoteViewFrom.showValueNote(showValueNote);
                } else this.handlerView.setPos(isDouble);
            }
        },
        {
            key: "render",
            value: function render(container) {
                this.el = container;
                this.adslider = document.createElement('div');
                this.adslider.classList.add('adslider');
                this.el.append(this.adslider);
                this.trackView = new _TrackView["default"](this.adslider);
                this.barView = new _BarView["default"](this.adslider);
                this.scaleView = new _ScaleView["default"](this.adslider);
                this.handlerView = new _HandlerView["default"](this.trackView.track);
                this.valueNoteView = new _ValueNoteView["default"](this.adslider);
                this.handlerViewFrom = new _HandlerView["default"](this.trackView.track);
                this.handlerViewFrom.handler.classList.add('adslider__handler_type_from');
                this.valueNoteViewFrom = new _ValueNoteView["default"](this.adslider);
                this.valueNoteViewFrom.note.classList.add('adslider__note_type_from');
                this.valueNoteView.note.classList.add('adslider__note_type_to');
            }
        },
        {
            key: "deleteHandlerFrom",
            value: function deleteHandlerFrom() {
                if (this.handlerViewFrom && this.valueNoteViewFrom) {
                    this.handlerViewFrom.handler.remove();
                    this.valueNoteViewFrom.note.remove();
                    delete this.handlerViewFrom;
                    delete this.valueNoteViewFrom;
                }
            }
        },
        {
            key: "deleteValueNoteViewCommon",
            value: function deleteValueNoteViewCommon() {
                if (this.valueNoteViewCommon) {
                    this.valueNoteViewCommon.note.remove();
                    delete this.valueNoteViewCommon;
                }
            }
        },
        {
            key: "updateViewForDouble",
            value: function updateViewForDouble(vertical, from, limits, showValueNote) {
                if (!this.handlerViewFrom) this.renderHandlerFrom();
                this.updateObservers();
                this.setVerticalViewForDouble(vertical);
                if (this.handlerViewFrom && this.valueNoteViewFrom) {
                    this.handlerViewFrom.calcPos({
                        edge: this.getEdge(this.handlerViewFrom),
                        value: from,
                        limits: limits
                    });
                    this.handlerViewFrom.setPos(true);
                    this.valueNoteViewFrom.calcPos(this.handlerViewFrom.handler);
                    this.valueNoteViewFrom.setPos();
                    this.valueNoteViewFrom.setValue(from);
                    this.valueNoteViewFrom.showValueNote(showValueNote);
                    this.barView.setLengthForDouble({
                        valueFrom: this.handlerViewFrom.getPos(),
                        valueTo: this.handlerView.getPos(),
                        handler: this.handlerView.handler
                    });
                }
                this.setViewOfOneNote(showValueNote);
            }
        },
        {
            key: "renderHandlerFrom",
            value: function renderHandlerFrom() {
                this.handlerViewFrom = new _HandlerView["default"](this.trackView.track);
                this.handlerViewFrom.handler.classList.add('adslider__handler_type_from');
                this.valueNoteViewFrom = new _ValueNoteView["default"](this.adslider);
                this.valueNoteViewFrom.note.classList.add('adslider__note_type_from');
                this.handlerViewFrom.addObserver(_eventTypes["default"].HANDLER_MOUSEDOWN_EVENT, this.handleMouseDown);
                this.handlerViewFrom.addObserver(_eventTypes["default"].HANDLER_MOUSEMOVE_EVENT, this.mouseMove);
            }
        },
        {
            key: "changeHandlerPosForDoubleVertical",
            value: function changeHandlerPosForDoubleVertical(e) {
                if (this.handlerViewFrom) {
                    var handlerFromPos = this.handlerViewFrom.handler.getBoundingClientRect().top;
                    var handlerToPos = this.handlerView.handler.getBoundingClientRect().top;
                    var oddToFrom = handlerToPos - handlerFromPos;
                    var middlePos = oddToFrom / 2 + handlerFromPos + this.handlerView.getLength() / 2;
                    if (e.clientY >= middlePos) {
                        var data = {
                            shift: this.handlerViewFrom.getLength() / 2,
                            e: e,
                            handler: this.handlerViewFrom
                        };
                        this.mouseMove(data);
                    } else {
                        var _data2 = {
                            shift: this.handlerView.getLength() / 2,
                            e: e,
                            handler: this.handlerView
                        };
                        this.mouseMove(_data2);
                    }
                }
            }
        },
        {
            key: "changeHandlerPosForDoubleHorizontal",
            value: function changeHandlerPosForDoubleHorizontal(e) {
                if (this.handlerViewFrom) {
                    var handlerFromPos = this.handlerViewFrom.handler.getBoundingClientRect().left;
                    var handlerToPos = this.handlerView.handler.getBoundingClientRect().left;
                    var oddToFrom = handlerToPos - handlerFromPos;
                    var middlePos = oddToFrom / 2 + handlerFromPos + this.handlerView.getLength() / 2;
                    this.checkIfHandlersInOnePlace(e);
                    if (e.clientX <= middlePos) {
                        var data = {
                            shift: this.handlerViewFrom.getLength() / 2,
                            e: e,
                            handler: this.handlerViewFrom
                        };
                        this.mouseMove(data);
                    } else {
                        var _data3 = {
                            shift: this.handlerView.getLength() / 2,
                            e: e,
                            handler: this.handlerView
                        };
                        this.mouseMove(_data3);
                    }
                }
            }
        },
        {
            key: "setVerticalViewForSingle",
            value: function setVerticalViewForSingle(vertical) {
                if (vertical) {
                    this.adslider.classList.remove('adslider_direction_horizontal');
                    this.adslider.classList.add('adslider_direction_vertical');
                } else {
                    this.adslider.classList.remove('adslider_direction_vertical');
                    this.adslider.classList.add('adslider_direction_horizontal');
                }
                this.trackView.setVerticalView(vertical);
                this.handlerView.setVerticalView(vertical);
                this.valueNoteView.setVerticalView(vertical);
                this.barView.setVerticalView(vertical);
            }
        },
        {
            key: "setVerticalViewForDouble",
            value: function setVerticalViewForDouble(vertical) {
                if (this.handlerViewFrom && this.valueNoteViewFrom) {
                    this.handlerViewFrom.setVerticalView(vertical);
                    this.valueNoteViewFrom.setVerticalView(vertical);
                }
            }
        },
        {
            key: "checkIfHandlersInOnePlace",
            value: function checkIfHandlersInOnePlace(event) {
                if (this.handlerViewFrom) {
                    if (this.isVertical()) {
                        if (this.handlerView.handler.style.bottom === this.handlerViewFrom.handler.style.bottom) {
                            this.areHandlersInOnePoint = true;
                            this.mousedownClientY = event.clientY;
                            this.isHandlerFrom = false;
                            this.isHandlerTo = false;
                        } else this.areHandlersInOnePoint = false;
                    } else if (this.handlerView.handler.style.left === this.handlerViewFrom.handler.style.left) {
                        this.areHandlersInOnePoint = true;
                        this.mousedownClientX = event.clientX;
                        this.isHandlerFrom = false;
                        this.isHandlerTo = false;
                    } else this.areHandlersInOnePoint = false;
                } else this.areHandlersInOnePoint = false;
            }
        },
        {
            key: "findLeadHandler",
            value: function findLeadHandler(e, handler) {
                var isValueDecrease;
                var isValueIncrease;
                if (this.isVertical()) {
                    isValueIncrease = e.clientY < this.mousedownClientY;
                    isValueDecrease = e.clientY > this.mousedownClientY;
                } else {
                    isValueIncrease = e.clientX > this.mousedownClientX;
                    isValueDecrease = e.clientX < this.mousedownClientX;
                }
                if (isValueIncrease) {
                    var isHandlerFromLeader = !this.isHandlerTo && this.isHandlerFrom;
                    if (isHandlerFromLeader && this.handlerViewFrom) this.leadHandler = this.handlerViewFrom;
                    else {
                        this.leadHandler = this.handlerView;
                        this.isHandlerTo = true;
                        this.isHandlerFrom = false;
                    }
                } else if (isValueDecrease) {
                    if (this.isHandlerTo && !this.isHandlerFrom) this.leadHandler = this.handlerView;
                    else if (this.handlerViewFrom) {
                        this.leadHandler = this.handlerViewFrom;
                        this.isHandlerFrom = true;
                        this.isHandlerTo = false;
                    }
                } else this.leadHandler = handler;
            }
        },
        {
            key: "getEdge",
            value: function getEdge(handler) {
                return this.trackView.getLength() - handler.getLength();
            }
        },
        {
            key: "checkNewPos",
            value: function checkNewPos(newPos) {
                var edge = this.getEdge(this.handlerView);
                var newPosCopy = newPos;
                if (newPos < 0) newPosCopy = 0;
                else if (newPos > edge) newPosCopy = edge;
                return newPosCopy;
            }
        },
        {
            key: "calcShift",
            value: function calcShift(e, handler) {
                var shift = this.isVertical() ? e.clientY - handler.getBoundingClientRect().bottom : e.clientX - handler.getBoundingClientRect().left;
                this.handlerShift = Math.abs(shift);
            }
        },
        {
            key: "isVertical",
            value: function isVertical() {
                return this.adslider.classList.contains('adslider_direction_vertical');
            }
        },
        {
            key: "isDouble",
            value: function isDouble() {
                return !!this.handlerViewFrom;
            }
        },
        {
            key: "calcNewPos",
            value: function calcNewPos(shift, e) {
                return this.isVertical() ? this.trackView.track.getBoundingClientRect().bottom - e.clientY - shift : e.clientX - shift - this.trackView.track.getBoundingClientRect().left;
            }
        },
        {
            key: "setViewOfOneNote",
            value: function setViewOfOneNote(showValueNote) {
                if (this.isSmallDistanceBetweenNotes()) {
                    this.makeCommonNoteView();
                    this.showCommonValueNote(showValueNote);
                } else if (this.valueNoteViewCommon) this.removeValueNotesFromAndTo();
            }
        },
        {
            key: "isSmallDistanceBetweenNotes",
            value: function isSmallDistanceBetweenNotes() {
                if (this.valueNoteViewFrom) {
                    var distAmongNotes = this.valueNoteView.getPos() - this.valueNoteViewFrom.getPos();
                    return distAmongNotes < this.valueNoteView.getSize();
                }
                return false;
            }
        },
        {
            key: "makeCommonNoteView",
            value: function makeCommonNoteView() {
                if (this.valueNoteViewFrom) this.valueNoteViewFrom.showValueNote(false);
                this.valueNoteView.showValueNote(false);
                if (this.valueNoteViewCommon) this.updateCommonNoteView();
                else {
                    this.valueNoteViewCommon = new _ValueNoteView["default"](this.adslider);
                    this.valueNoteViewCommon.note.classList.add('adslider__note_common');
                    this.valueNoteViewCommon.setVerticalView(this.isVertical());
                    this.updateCommonNoteView();
                }
            }
        },
        {
            key: "showCommonValueNote",
            value: function showCommonValueNote(data) {
                if (data && this.valueNoteViewCommon) {
                    this.valueNoteViewCommon.note.classList.remove('adslider__note_hide');
                    this.valueNoteViewCommon.note.classList.add('adslider__note_show');
                } else if (this.valueNoteViewCommon) {
                    this.valueNoteViewCommon.note.classList.remove('adslider__note_show');
                    this.valueNoteViewCommon.note.classList.add('adslider__note_hide');
                }
            }
        },
        {
            key: "updateCommonNoteView",
            value: function updateCommonNoteView() {
                if (this.handlerViewFrom && this.valueNoteViewCommon) {
                    var valueTo = this.valueNoteView.getValue();
                    var valueFrom;
                    if (this.valueNoteViewFrom) {
                        valueFrom = this.valueNoteViewFrom.getValue();
                        this.valueNoteViewCommon.setValueForTwo(valueFrom, valueTo);
                    }
                    var leftEdgeOfHandlerFrom = this.handlerViewFrom.getPos();
                    var rightEdgeOfHandlerTo = this.handlerView.getPos() + this.handlerView.getLength();
                    var distAmongEdgesOfHandlers = rightEdgeOfHandlerTo - leftEdgeOfHandlerFrom;
                    this.valueNoteViewCommon.valueNotePos = leftEdgeOfHandlerFrom + distAmongEdgesOfHandlers / 2;
                    this.valueNoteViewCommon.setPos();
                }
            }
        },
        {
            key: "removeValueNotesFromAndTo",
            value: function removeValueNotesFromAndTo() {
                if (this.valueNoteViewFrom && this.valueNoteViewCommon) {
                    this.valueNoteView.showValueNote(true);
                    this.valueNoteViewFrom.showValueNote(true);
                    this.valueNoteViewCommon.note.remove();
                    delete this.valueNoteViewCommon;
                }
            }
        },
        {
            key: "addObservers",
            value: function addObservers() {
                this.handlerView.addObserver(_eventTypes["default"].HANDLER_MOUSEDOWN_EVENT, this.handleMouseDown);
                this.handlerView.addObserver(_eventTypes["default"].HANDLER_MOUSEMOVE_EVENT, this.mouseMove);
                if (this.handlerViewFrom) {
                    this.handlerViewFrom.addObserver(_eventTypes["default"].HANDLER_MOUSEDOWN_EVENT, this.handleMouseDown);
                    this.handlerViewFrom.addObserver(_eventTypes["default"].HANDLER_MOUSEMOVE_EVENT, this.mouseMove);
                }
                this.trackView.addObserver(_eventTypes["default"].HANDLER_MOUSEDOWN_EVENT, this.handleChangePos);
                this.barView.addObserver(_eventTypes["default"].HANDLER_MOUSEDOWN_EVENT, this.handleChangePos);
                this.scaleView.addObserver(_eventTypes["default"].HANDLER_MOUSEDOWN_EVENT, this.handleChangePos);
                this.handlerView.addObserver(_eventTypes["default"].CALC_VALUE_NOTE_POSITION, this.handleCalcValueNotePos);
                this.handlerView.addObserver(_eventTypes["default"].SET_VALUE_NOTE_POS, this.handleSetValueNotePos);
                this.handlerView.addObserver(_eventTypes["default"].SET_BAR, this.handleSetBar);
            }
        },
        {
            key: "updateObservers",
            value: function updateObservers() {
                if (this.handlerViewFrom && this.valueNoteViewFrom) {
                    if (!Object.prototype.hasOwnProperty.call(this.handlerViewFrom.observers, _eventTypes["default"].CALC_VALUE_NOTE_POSITION)) {
                        this.handlerViewFrom.addObserver(_eventTypes["default"].CALC_VALUE_NOTE_POSITION, this.handleCalcValueNoteFromPos);
                        this.handlerViewFrom.addObserver(_eventTypes["default"].SET_VALUE_NOTE_POS, this.handleSetValueNoteFromPos);
                        this.handlerViewFrom.addObserver(_eventTypes["default"].SET_BAR, this.handleSetBar);
                    }
                }
            }
        }
    ]);
    return View2;
}(_EventObserver2["default"]);
var _default = View1;
exports["default"] = _default;

},{"@babel/runtime/helpers/interopRequireDefault":"eigyQ","@babel/runtime/helpers/classCallCheck":"fIqcI","@babel/runtime/helpers/createClass":"eFNXV","@babel/runtime/helpers/assertThisInitialized":"k3YcS","@babel/runtime/helpers/inherits":"8mpJg","@babel/runtime/helpers/possibleConstructorReturn":"iiXLy","@babel/runtime/helpers/getPrototypeOf":"DHhBk","@babel/runtime/helpers/defineProperty":"eCMPI","./HandlerView/HandlerView":"fCvxo","./TrackView/TrackView":"jw1m8","./ValueNoteView/ValueNoteView":"6LnC9","./BarView/BarView":"eLuNz","./ScaleView/ScaleView":"hseG1","../EventObserver/EventObserver":"ftS0S","../EventObserver/eventTypes":"cbWbf"}],"fCvxo":[function(require,module,exports) {
"use strict";
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _EventObserver2 = _interopRequireDefault(require("../../EventObserver/EventObserver"));
var _eventTypes = _interopRequireDefault(require("../../EventObserver/eventTypes"));
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf2["default"](Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf2["default"](this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return _possibleConstructorReturn2["default"](this, result);
    };
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
var HandlerView1 = /*#__PURE__*/ function(_EventObserver) {
    _inherits2["default"](HandlerView2, _EventObserver);
    var _super = _createSuper(HandlerView2);
    function HandlerView2(parent) {
        var _this;
        _classCallCheck2["default"](this, HandlerView2);
        _this = _super.call(this);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handler", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "parent", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handlerPos", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handleMouseMove", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handleMouseUp", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handleHandlerMouseDown", function(event) {
            event.preventDefault();
            event.stopPropagation();
            var data = {
                event: event,
                handler: _this.handler
            };
            _this.broadcast(_eventTypes["default"].HANDLER_MOUSEDOWN_EVENT, data);
            _this.bindMousemove(event);
        });
        _this.render(parent);
        return _this;
    }
    _createClass2["default"](HandlerView2, [
        {
            key: "getLength",
            value: function getLength() {
                return this.isVertical() ? parseInt(getComputedStyle(this.handler).height, 10) : parseInt(getComputedStyle(this.handler).width, 10);
            }
        },
        {
            key: "getPos",
            value: function getPos() {
                return this.isVertical() ? parseInt(getComputedStyle(this.handler).bottom, 10) : parseInt(getComputedStyle(this.handler).left, 10);
            }
        },
        {
            key: "calcPos",
            value: function calcPos(options) {
                var edge = options.edge, value = options.value, _options$limits = options.limits, min = _options$limits.min, max = _options$limits.max;
                var oddValMin = value - min;
                var oddMaxMin = max - min;
                this.handlerPos = edge * (oddValMin / oddMaxMin);
            }
        },
        {
            key: "setPos",
            value: function setPos(isDouble) {
                if (this.isVertical()) {
                    this.handler.style.left = '';
                    this.handler.style.bottom = "".concat(this.handlerPos, "px");
                } else {
                    this.handler.style.bottom = '';
                    this.handler.style.left = "".concat(this.handlerPos, "px");
                }
                this.broadcast(_eventTypes["default"].CALC_VALUE_NOTE_POSITION, this.handler);
                this.broadcast(_eventTypes["default"].SET_VALUE_NOTE_POS);
                var data = {
                    handler: this.handler,
                    vertical: this.isVertical(),
                    "double": isDouble
                };
                this.broadcast(_eventTypes["default"].SET_BAR, data);
            }
        },
        {
            key: "setVerticalView",
            value: function setVerticalView(verticalView) {
                if (verticalView) {
                    this.handler.classList.remove('adslider__handler_direction_horizontal');
                    this.handler.classList.add('adslider__handler_direction_vertical');
                } else {
                    this.handler.classList.remove('adslider__handler_direction_vertical');
                    this.handler.classList.add('adslider__handler_direction_horizontal');
                }
            }
        },
        {
            key: "isVertical",
            value: function isVertical() {
                return this.handler.classList.contains('adslider__handler_direction_vertical');
            }
        },
        {
            key: "render",
            value: function render(parent) {
                this.parent = parent;
                this.handler = document.createElement('div');
                this.handler.classList.add('adslider__handler');
                this.parent.append(this.handler);
                this.handler.addEventListener('mousedown', this.handleHandlerMouseDown);
            }
        },
        {
            key: "bindMousemove",
            value: function bindMousemove(event) {
                this.handleMouseMove = this.mouseMove.bind(this);
                this.handleMouseUp = this.mouseUp.bind(this);
                if (event.type === 'mousedown') {
                    document.addEventListener('mousemove', this.handleMouseMove);
                    document.addEventListener('mouseup', this.handleMouseUp);
                }
            }
        },
        {
            key: "mouseMove",
            value: function mouseMove(e) {
                var data = {
                    shift: null,
                    e: e,
                    handler: this
                };
                this.broadcast(_eventTypes["default"].HANDLER_MOUSEMOVE_EVENT, data);
            }
        },
        {
            key: "mouseUp",
            value: function mouseUp() {
                document.removeEventListener('mouseup', this.handleMouseUp);
                document.removeEventListener('mousemove', this.handleMouseMove);
            }
        }
    ]);
    return HandlerView2;
}(_EventObserver2["default"]);
var _default = HandlerView1;
exports["default"] = _default;

},{"@babel/runtime/helpers/interopRequireDefault":"eigyQ","@babel/runtime/helpers/classCallCheck":"fIqcI","@babel/runtime/helpers/createClass":"eFNXV","@babel/runtime/helpers/assertThisInitialized":"k3YcS","@babel/runtime/helpers/inherits":"8mpJg","@babel/runtime/helpers/possibleConstructorReturn":"iiXLy","@babel/runtime/helpers/getPrototypeOf":"DHhBk","@babel/runtime/helpers/defineProperty":"eCMPI","../../EventObserver/EventObserver":"ftS0S","../../EventObserver/eventTypes":"cbWbf"}],"jw1m8":[function(require,module,exports) {
"use strict";
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _EventObserver2 = _interopRequireDefault(require("../../EventObserver/EventObserver"));
var _eventTypes = _interopRequireDefault(require("../../EventObserver/eventTypes"));
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf2["default"](Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf2["default"](this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return _possibleConstructorReturn2["default"](this, result);
    };
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
var TrackView1 = /*#__PURE__*/ function(_EventObserver) {
    _inherits2["default"](TrackView2, _EventObserver);
    var _super = _createSuper(TrackView2);
    function TrackView2(parent) {
        var _this;
        _classCallCheck2["default"](this, TrackView2);
        _this = _super.call(this);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "track", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handleTrackMouseDown", function(event) {
            _this.broadcast(_eventTypes["default"].HANDLER_MOUSEDOWN_EVENT, event);
        });
        _this.render(parent);
        _this.addListeners();
        return _this;
    }
    _createClass2["default"](TrackView2, [
        {
            key: "getLength",
            value: function getLength() {
                return this.track.classList.contains('adslider__track_direction_vertical') ? parseInt(getComputedStyle(this.track).height, 10) : parseInt(getComputedStyle(this.track).width, 10);
            }
        },
        {
            key: "setVerticalView",
            value: function setVerticalView(verticalView) {
                if (verticalView) {
                    this.track.classList.remove('adslider__track_direction_horizontal');
                    this.track.classList.add('adslider__track_direction_vertical');
                } else {
                    this.track.classList.remove('adslider__track_direction_vertical');
                    this.track.classList.add('adslider__track_direction_horizontal');
                }
            }
        },
        {
            key: "render",
            value: function render(parent) {
                this.track = document.createElement('div');
                this.track.classList.add('adslider__track');
                parent.append(this.track);
            }
        },
        {
            key: "addListeners",
            value: function addListeners() {
                this.track.addEventListener('mousedown', this.handleTrackMouseDown);
            }
        }
    ]);
    return TrackView2;
}(_EventObserver2["default"]);
var _default = TrackView1;
exports["default"] = _default;

},{"@babel/runtime/helpers/interopRequireDefault":"eigyQ","@babel/runtime/helpers/classCallCheck":"fIqcI","@babel/runtime/helpers/createClass":"eFNXV","@babel/runtime/helpers/assertThisInitialized":"k3YcS","@babel/runtime/helpers/inherits":"8mpJg","@babel/runtime/helpers/possibleConstructorReturn":"iiXLy","@babel/runtime/helpers/getPrototypeOf":"DHhBk","@babel/runtime/helpers/defineProperty":"eCMPI","../../EventObserver/EventObserver":"ftS0S","../../EventObserver/eventTypes":"cbWbf"}],"6LnC9":[function(require,module,exports) {
"use strict";
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _EventObserver2 = _interopRequireDefault(require("../../EventObserver/EventObserver"));
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf2["default"](Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf2["default"](this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return _possibleConstructorReturn2["default"](this, result);
    };
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
var ValueNoteView1 = /*#__PURE__*/ function(_EventObserver) {
    _inherits2["default"](ValueNoteView2, _EventObserver);
    var _super = _createSuper(ValueNoteView2);
    function ValueNoteView2(parent) {
        var _this;
        _classCallCheck2["default"](this, ValueNoteView2);
        _this = _super.call(this);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "note", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "valueNotePos", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "value", void 0);
        _this.render(parent);
        return _this;
    }
    _createClass2["default"](ValueNoteView2, [
        {
            key: "setValue",
            value: function setValue(value) {
                this.value.textContent = String(value);
            }
        },
        {
            key: "getValue",
            value: function getValue() {
                return Number(this.value.textContent);
            }
        },
        {
            key: "setValueForTwo",
            value: function setValueForTwo(valueFrom, valueTo) {
                var valFrom = String(valueFrom);
                var valTo = String(valueTo);
                this.value.textContent = "".concat(valFrom, " - ").concat(valTo);
            }
        },
        {
            key: "showValueNote",
            value: function showValueNote(data) {
                if (data) {
                    this.note.classList.remove('adslider__note_hide');
                    this.note.classList.add('adslider__note_show');
                } else {
                    this.note.classList.remove('adslider__note_show');
                    this.note.classList.add('adslider__note_hide');
                }
            }
        },
        {
            key: "calcPos",
            value: function calcPos(handler) {
                if (this.isVertical()) {
                    var handlerBottomPos = getComputedStyle(handler).bottom;
                    var handlerHeight = getComputedStyle(handler).height;
                    this.valueNotePos = parseInt(handlerBottomPos, 10) + parseInt(handlerHeight, 10) / 2;
                } else {
                    var handlerLeftPos = getComputedStyle(handler).left;
                    var handlerWidth = getComputedStyle(handler).width;
                    this.valueNotePos = parseInt(handlerLeftPos, 10) + parseInt(handlerWidth, 10) / 2;
                }
            }
        },
        {
            key: "setPos",
            value: function setPos() {
                if (this.note.classList.contains('adslider__note_direction_vertical')) {
                    this.note.style.left = '';
                    this.note.style.bottom = "".concat(this.valueNotePos, "px");
                } else {
                    this.note.style.bottom = '';
                    this.note.style.left = "".concat(this.valueNotePos, "px");
                }
            }
        },
        {
            key: "setVerticalView",
            value: function setVerticalView(verticalView) {
                if (verticalView) {
                    this.note.classList.remove('adslider__note_direction_horizontal');
                    this.note.classList.add('adslider__note_direction_vertical');
                } else {
                    this.note.classList.remove('adslider__note_direction_vertical');
                    this.note.classList.add('adslider__note_direction_horizontal');
                }
            }
        },
        {
            key: "getSize",
            value: function getSize() {
                return this.note.classList.contains('adslider__note_direction_vertical') ? parseInt(getComputedStyle(this.note).height, 10) : parseInt(getComputedStyle(this.note).width, 10);
            }
        },
        {
            key: "getPos",
            value: function getPos() {
                return this.note.classList.contains('adslider__note_direction_vertical') ? parseInt(getComputedStyle(this.note).bottom, 10) : parseInt(getComputedStyle(this.note).left, 10);
            }
        },
        {
            key: "render",
            value: function render(parent) {
                this.note = document.createElement('div');
                this.value = document.createElement('p');
                this.note.classList.add('adslider__note');
                this.value.classList.add('adslider__value');
                this.note.append(this.value);
                parent.append(this.note);
            }
        },
        {
            key: "isVertical",
            value: function isVertical() {
                return this.note.classList.contains('adslider__note_direction_vertical');
            }
        }
    ]);
    return ValueNoteView2;
}(_EventObserver2["default"]);
var _default = ValueNoteView1;
exports["default"] = _default;

},{"@babel/runtime/helpers/interopRequireDefault":"eigyQ","@babel/runtime/helpers/classCallCheck":"fIqcI","@babel/runtime/helpers/createClass":"eFNXV","@babel/runtime/helpers/assertThisInitialized":"k3YcS","@babel/runtime/helpers/inherits":"8mpJg","@babel/runtime/helpers/possibleConstructorReturn":"iiXLy","@babel/runtime/helpers/getPrototypeOf":"DHhBk","@babel/runtime/helpers/defineProperty":"eCMPI","../../EventObserver/EventObserver":"ftS0S"}],"eLuNz":[function(require,module,exports) {
"use strict";
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _EventObserver2 = _interopRequireDefault(require("../../EventObserver/EventObserver"));
var _eventTypes = _interopRequireDefault(require("../../EventObserver/eventTypes"));
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf2["default"](Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf2["default"](this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return _possibleConstructorReturn2["default"](this, result);
    };
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
var BarView1 = /*#__PURE__*/ function(_EventObserver) {
    _inherits2["default"](BarView2, _EventObserver);
    var _super = _createSuper(BarView2);
    function BarView2(parent) {
        var _this;
        _classCallCheck2["default"](this, BarView2);
        _this = _super.call(this);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "bar", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "barPos", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handleBarMouseDown", function(event) {
            _this.broadcast(_eventTypes["default"].HANDLER_MOUSEDOWN_EVENT, event);
        });
        _this.render(parent);
        _this.addListeners();
        return _this;
    }
    _createClass2["default"](BarView2, [
        {
            key: "setVerticalView",
            value: function setVerticalView(verticalView) {
                if (verticalView) {
                    this.bar.classList.remove('adslider__bar_direction_horizontal');
                    this.bar.classList.add('adslider__bar_direction_vertical');
                } else {
                    this.bar.classList.remove('adslider__bar_direction_vertical');
                    this.bar.classList.add('adslider__bar_direction_horizontal');
                }
            }
        },
        {
            key: "setLength",
            value: function setLength(handler) {
                var handlerPos;
                var handlerLength;
                this.bar.style.bottom = '';
                this.bar.style.left = '';
                if (this.bar.classList.contains('adslider__bar_direction_horizontal')) {
                    this.bar.style.height = '';
                    handlerPos = parseInt(getComputedStyle(handler).left, 10);
                    handlerLength = parseInt(getComputedStyle(handler).width, 10);
                    this.calcBarPosForSingle(handlerPos, handlerLength);
                    this.bar.style.width = "".concat(this.barPos, "px");
                } else {
                    this.bar.style.width = '';
                    handlerPos = parseInt(getComputedStyle(handler).bottom, 10);
                    handlerLength = parseInt(getComputedStyle(handler).height, 10);
                    this.calcBarPosForSingle(handlerPos, handlerLength);
                    this.bar.style.height = "".concat(this.barPos, "px");
                }
            }
        },
        {
            key: "setLengthForDouble",
            value: function setLengthForDouble(options) {
                var valueFrom = options.valueFrom, valueTo = options.valueTo, handler = options.handler;
                var handlerLength = parseInt(getComputedStyle(handler).width, 10);
                var barRightEdge = valueTo + handlerLength / 2;
                var barLeftEdge = valueFrom + handlerLength / 2;
                var barLength = Math.abs(barRightEdge - barLeftEdge);
                if (this.bar.classList.contains('adslider__bar_direction_horizontal')) {
                    this.bar.style.height = '';
                    this.bar.style.bottom = '';
                    this.bar.style.width = "".concat(barLength, "px");
                    this.calcBarPosForDouble(valueFrom, valueTo, handlerLength);
                    this.bar.style.left = "".concat(this.barPos, "px");
                } else {
                    this.bar.style.width = '';
                    this.bar.style.left = '';
                    this.bar.style.height = "".concat(barLength, "px");
                    this.calcBarPosForDouble(valueFrom, valueTo, handlerLength);
                    this.bar.style.bottom = "".concat(this.barPos, "px");
                }
            }
        },
        {
            key: "render",
            value: function render(parent) {
                this.bar = document.createElement('div');
                this.bar.classList.add('adslider__bar');
                parent.append(this.bar);
            }
        },
        {
            key: "addListeners",
            value: function addListeners() {
                this.bar.addEventListener('mousedown', this.handleBarMouseDown);
            }
        },
        {
            key: "calcBarPosForSingle",
            value: function calcBarPosForSingle(handlerPos, handlerLength) {
                this.barPos = handlerPos + handlerLength / 2;
            }
        },
        {
            key: "calcBarPosForDouble",
            value: function calcBarPosForDouble(handlerPosFrom, handlerPosTo, handlerLength) {
                this.barPos = handlerPosFrom < handlerPosTo ? handlerPosFrom + handlerLength / 2 : handlerPosTo + handlerLength / 2;
            }
        }
    ]);
    return BarView2;
}(_EventObserver2["default"]);
var _default = BarView1;
exports["default"] = _default;

},{"@babel/runtime/helpers/interopRequireDefault":"eigyQ","@babel/runtime/helpers/classCallCheck":"fIqcI","@babel/runtime/helpers/createClass":"eFNXV","@babel/runtime/helpers/assertThisInitialized":"k3YcS","@babel/runtime/helpers/inherits":"8mpJg","@babel/runtime/helpers/possibleConstructorReturn":"iiXLy","@babel/runtime/helpers/getPrototypeOf":"DHhBk","@babel/runtime/helpers/defineProperty":"eCMPI","../../EventObserver/EventObserver":"ftS0S","../../EventObserver/eventTypes":"cbWbf"}],"hseG1":[function(require,module,exports) {
"use strict";
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _EventObserver2 = _interopRequireDefault(require("../../EventObserver/EventObserver"));
var _eventTypes = _interopRequireDefault(require("../../EventObserver/eventTypes"));
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf2["default"](Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf2["default"](this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return _possibleConstructorReturn2["default"](this, result);
    };
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
var ScaleView1 = /*#__PURE__*/ function(_EventObserver) {
    _inherits2["default"](ScaleView2, _EventObserver);
    var _super = _createSuper(ScaleView2);
    function ScaleView2(parent) {
        var _this;
        _classCallCheck2["default"](this, ScaleView2);
        _this = _super.call(this);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "parent", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "scale", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "numberOfLines", void 0);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "lineArray", []);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "signArray", []);
        _defineProperty2["default"](_assertThisInitialized2["default"](_this), "handleScaleMouseDown", function(event) {
            _this.broadcast(_eventTypes["default"].HANDLER_MOUSEDOWN_EVENT, event);
        });
        _this.render(parent);
        _this.addListeners();
        return _this;
    }
    _createClass2["default"](ScaleView2, [
        {
            key: "drawScale",
            value: function drawScale(options, handler) {
                if (options.vertical) {
                    this.scale.classList.remove('adslider__scale_direction_horizontal');
                    this.scale.classList.add('adslider__scale_direction_vertical');
                } else {
                    this.scale.classList.remove('adslider__scale_direction_vertical');
                    this.scale.classList.add('adslider__scale_direction_horizontal');
                }
                var step = options.step, _options$limits = options.limits, min = _options$limits.min, max = _options$limits.max;
                var odd = max - min;
                this.calcNumberOfLines(step, odd);
                this.setScalePos(handler);
                this.createListOfScaleLines(options);
                this.renderScaleSign(options);
            }
        },
        {
            key: "render",
            value: function render(parent) {
                this.parent = parent;
                this.scale = document.createElement('div');
                this.scale.classList.add('adslider__scale');
                this.parent.append(this.scale);
            }
        },
        {
            key: "renderScaleLine",
            value: function renderScaleLine() {
                var line = document.createElement('div');
                line.classList.add('adslider__scale-line');
                if (this.isVertical()) line.classList.add('adslider__scale-line_direction_vertical');
                else line.classList.add('adslider__scale-line_direction_horizontal');
                return line;
            }
        },
        {
            key: "addListeners",
            value: function addListeners() {
                this.scale.addEventListener('mousedown', this.handleScaleMouseDown);
            }
        },
        {
            key: "calcNumberOfLines",
            value: function calcNumberOfLines(step, odd) {
                this.numberOfLines = odd % step === 0 ? odd / step + 1 : Math.floor(odd / step + 2);
            }
        },
        {
            key: "setScalePos",
            value: function setScalePos(handler) {
                var handlerLength;
                var trackLength;
                var scaleLength;
                if (this.isVertical()) {
                    this.scale.style.width = '';
                    this.scale.style.left = '';
                    handlerLength = parseInt(getComputedStyle(handler).height, 10);
                    trackLength = parseInt(getComputedStyle(this.parent).height, 10);
                    scaleLength = trackLength - handlerLength;
                    this.scale.style.height = "".concat(scaleLength, "px");
                    this.scale.style.top = "".concat(handlerLength / 2, "px");
                } else {
                    this.scale.style.height = '';
                    this.scale.style.top = '';
                    handlerLength = parseInt(getComputedStyle(handler).width, 10);
                    trackLength = parseInt(getComputedStyle(this.parent).width, 10);
                    scaleLength = trackLength - handlerLength;
                    this.scale.style.width = "".concat(scaleLength, "px");
                    this.scale.style.left = "".concat(handlerLength / 2, "px");
                }
            }
        },
        {
            key: "createListOfScaleLines",
            value: function createListOfScaleLines(options) {
                var step = options.step, _options$limits2 = options.limits, min = _options$limits2.min, max = _options$limits2.max;
                this.scale.innerHTML = '';
                var stepPercentage = step / (max - min) * 100;
                for(var i = 0; i < this.numberOfLines; i += 1){
                    var line = this.renderScaleLine();
                    this.scale.append(line);
                    var position = i * stepPercentage > 100 ? 100 : i * stepPercentage;
                    if (this.isVertical()) line.style.bottom = "".concat(position, "%");
                    else line.style.left = "".concat(position, "%");
                }
            }
        },
        {
            key: "renderScaleSign",
            value: function renderScaleSign(options) {
                var _this2 = this;
                var listOfLines = this.scale.querySelectorAll('.adslider__scale-line');
                listOfLines.forEach(function(line, index) {
                    var value = _this2.calcSigns(index, options);
                    var text = document.createElement('div');
                    text.classList.add('adslider__scale-text');
                    if (_this2.isVertical()) text.classList.add('adslider__scale-text_direction_vertical');
                    else text.classList.add('adslider__scale-text_direction_horizontal');
                    text.innerText = "".concat(value);
                    line.append(text);
                    _this2.lineArray.push(line);
                    _this2.signArray.push(text);
                });
                this.capacityCheckForSign();
            }
        },
        {
            key: "capacityCheckForSign",
            value: function capacityCheckForSign() {
                var isSmallDistanceBetweenSigns;
                if (this.isVertical()) isSmallDistanceBetweenSigns = this.isSmallDistanceBetweenVerticalSigns();
                else isSmallDistanceBetweenSigns = this.isSmallDistanceBetweenHorizontalSigns();
                if (isSmallDistanceBetweenSigns) this.hideSigns();
                this.lineArray = [];
                this.signArray = [];
            }
        },
        {
            key: "isSmallDistanceBetweenVerticalSigns",
            value: function isSmallDistanceBetweenVerticalSigns() {
                return this.signArray.some(function(item, i, array) {
                    if (i > 0) return array[i - 1].getBoundingClientRect().top - item.getBoundingClientRect().bottom < 0;
                    return false;
                });
            }
        },
        {
            key: "isSmallDistanceBetweenHorizontalSigns",
            value: function isSmallDistanceBetweenHorizontalSigns() {
                return this.signArray.some(function(item, i, array) {
                    if (i > 0) return item.getBoundingClientRect().left - array[i - 1].getBoundingClientRect().right < 0;
                    return false;
                });
            }
        },
        {
            key: "hideSigns",
            value: function hideSigns() {
                this.lineArray.forEach(function(line, index, array) {
                    if (index % 2 !== 0 && index !== array.length - 1) line.classList.add('adslider__scale-line_hidden');
                });
                this.setPenultimateSignView();
                this.capacityCheckForSign();
            }
        },
        {
            key: "setPenultimateSignView",
            value: function setPenultimateSignView() {
                var distanceBetweenLastSigns;
                if (this.isVertical()) distanceBetweenLastSigns = this.calcDistanceBetweenLastVerticalSigns();
                else distanceBetweenLastSigns = this.calcDistanceBetweenLastHorizontalSigns();
                if (distanceBetweenLastSigns < 0) {
                    this.lineArray[this.lineArray.length - 2].classList.add('adslider__scale-line_hidden');
                    this.lineArray = this.lineArray.filter(function(_el, i, array) {
                        return !(i % 2) && i !== array.length - 2 || i === array.length - 1;
                    });
                    this.signArray = this.signArray.filter(function(_el, i, array) {
                        return !(i % 2) && i !== array.length - 2 || i === array.length - 1;
                    });
                } else {
                    this.lineArray = this.lineArray.filter(function(_el, i) {
                        return !(i % 2);
                    });
                    this.signArray = this.signArray.filter(function(_el, i) {
                        return !(i % 2);
                    });
                }
            }
        },
        {
            key: "calcDistanceBetweenLastVerticalSigns",
            value: function calcDistanceBetweenLastVerticalSigns() {
                var lastSignPos = this.signArray[this.signArray.length - 1].getBoundingClientRect().top;
                var preLastSignPos = this.signArray[this.signArray.length - 2].getBoundingClientRect().bottom;
                return lastSignPos - preLastSignPos;
            }
        },
        {
            key: "calcDistanceBetweenLastHorizontalSigns",
            value: function calcDistanceBetweenLastHorizontalSigns() {
                var lastSignPos = this.signArray[this.signArray.length - 1].getBoundingClientRect().left;
                var preLastSignPos = this.signArray[this.signArray.length - 2].getBoundingClientRect().right;
                return preLastSignPos - lastSignPos;
            }
        },
        {
            key: "calcSigns",
            value: function calcSigns(index, options) {
                var step = options.step, _options$limits3 = options.limits, min = _options$limits3.min, max = _options$limits3.max;
                var value;
                if (index === 0) value = min;
                else if (index === this.numberOfLines - 1) value = max;
                else value = index * step + min;
                return Math.round(value);
            }
        },
        {
            key: "isVertical",
            value: function isVertical() {
                return this.scale.classList.contains('adslider__scale_direction_vertical');
            }
        }
    ]);
    return ScaleView2;
}(_EventObserver2["default"]);
var _default = ScaleView1;
exports["default"] = _default;

},{"@babel/runtime/helpers/interopRequireDefault":"eigyQ","@babel/runtime/helpers/classCallCheck":"fIqcI","@babel/runtime/helpers/createClass":"eFNXV","@babel/runtime/helpers/assertThisInitialized":"k3YcS","@babel/runtime/helpers/inherits":"8mpJg","@babel/runtime/helpers/possibleConstructorReturn":"iiXLy","@babel/runtime/helpers/getPrototypeOf":"DHhBk","@babel/runtime/helpers/defineProperty":"eCMPI","../../EventObserver/EventObserver":"ftS0S","../../EventObserver/eventTypes":"cbWbf"}]},["6659E","8NCqq"], "8NCqq", "parcelRequire021d")

//# sourceMappingURL=demo-page.2302a6c6.js.map