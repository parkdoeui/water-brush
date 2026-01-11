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
})({"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sub = exports.setMag = exports.map = exports.limit = exports.getRandom = exports.decay = exports.add = void 0;

var add = exports.add = function add(v1, v2) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y
  };
};

var limit = exports.limit = function limit(v1, _limit) {
  var min = _limit * -1;
  var max = _limit * 1;
  return {
    x: v1.x > max ? max : v1.x < min ? min : v1.x,
    y: v1.y > max ? max : v1.y < min ? min : v1.y
  };
};

var setMag = exports.setMag = function setMag(v1, num) {
  return {
    x: v1.x * num,
    y: v1.y * num
  };
};

var sub = exports.sub = function sub(v1, v2) {
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y
  };
};

var decay = exports.decay = function decay(v1) {
  var nx = v1.x > 0 ? 1 : -1;
  var ny = v1.y > 0 ? 1 : -1;
  var rate = 0.006;
  return {
    x: v1.x - rate * nx,
    y: v1.y - rate * ny
  };
};

var getRandom = exports.getRandom = function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var map = exports.map = function map(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
};
},{}],"js/controls.js":[function(require,module,exports) {
var buttonGroup = document.getElementById("button-group");
var panel = document.getElementById('panel');
var settings = document.getElementsByClassName("button settings")[0];
var buttonClose = document.getElementsByClassName("button close")[0];
settings.addEventListener('click', function () {
  var status = panel.style.visibility;

  if (status === 'hidden' || status === "") {
    panel.style.visibility = 'visible';
    panel.style.opacity = 1;
    panel.style.width = '250px';
    buttonGroup.style.visibility = 'hidden';
  } else {
    panel.style.visibility = 'hidden';
    panel.style.opacity = 0;
    panel.style.width = '220px';
    buttonGroup.style.visibility = 'visible';
  }
});
buttonClose.addEventListener('click', function () {
  var status = buttonGroup.style.visibility;

  if (status === 'hidden' || status === "") {
    buttonGroup.style.visibility = 'visible';
    panel.style.visibility = 'hidden';
    panel.style.opacity = 0;
    panel.style.width = '220px';
  } else {
    buttonGroup.style.visibility = 'hidden';
    panel.style.visibility = 'visible';
    panel.style.opacity = 1;
    panel.style.width = '250px';
  }
});
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _utils = require("./utils");

require("./controls");

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }

function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }

function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }

function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }

function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }

function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }

function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }

function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }

function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var particles = [];
var palette = {
  red: {
    id: 'red',
    range: 45,
    startPoint: 305
  },
  green: {
    id: 'green',
    range: 45,
    startPoint: 65
  },
  blue: {
    id: 'blue',
    range: 45,
    startPoint: 185
  },
  rainbow: {
    id: 'rainbow',
    range: 360,
    startPoint: 0
  }
};
var brushConfig = {
  size: 30,
  density: 3,
  color: palette["blue"],
  scatter: 2,
  trails: 300
};
var spawnRange = brushConfig.size * brushConfig.scatter * 0.7;
var mouse = {
  x: null,
  y: null
};
var pmouse = {
  x: null,
  y: null
};
var colorCounter = 0;
var mousePressed = false;

var _iterator = _createForOfIteratorHelper(document.querySelectorAll(".button")),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var r = _step.value;
    r.addEventListener("click", function (e) {
      if (e.target.className === 'button reset') {
        particles.length = 0;
      }
    });
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

var _iterator2 = _createForOfIteratorHelper(document.querySelectorAll(".slider")),
    _step2;

try {
  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
    var s = _step2.value;
    s.addEventListener("change", function (e) {
      brushConfig[e.target.id] = e.target.value;

      if (e.target.id === 'scatter') {
        spawnRange = brushConfig.size * brushConfig.scatter * 0.7;
      }
    });
  }
} catch (err) {
  _iterator2.e(err);
} finally {
  _iterator2.f();
}

var setPalleteColor = function setPalleteColor() {
  var _iterator3 = _createForOfIteratorHelper(document.querySelectorAll(".palette")),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var p = _step3.value;

      if (p.id === brushConfig.color.id) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
};

var _iterator4 = _createForOfIteratorHelper(document.querySelectorAll(".palette")),
    _step4;

try {
  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
    var p = _step4.value;
    p.addEventListener("click", function (e) {
      brushConfig.color = palette[e.target.id];
      setPalleteColor();
    });
  }
} catch (err) {
  _iterator4.e(err);
} finally {
  _iterator4.f();
}

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
canvas.addEventListener('mousemove', function (e) {
  pmouse = _objectSpread({}, mouse);
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
canvas.addEventListener('touchmove', function (e) {
  pmouse = _objectSpread({}, mouse);
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;

  if (e.target == canvas) {
    e.preventDefault();
  }
});
canvas.addEventListener('mousedown', function () {
  mousePressed = true;
});
canvas.addEventListener('touchstart', function (e) {
  mousePressed = true;

  if (e.target == canvas) {
    e.preventDefault();
  }
});
canvas.addEventListener('mouseup', function () {
  mousePressed = false;
});
canvas.addEventListener('touchend', function (e) {
  mousePressed = false;

  if (e.target == canvas) {
    e.preventDefault();
  }
});

var generateParticles = function generateParticles() {
  if (mousePressed) {
    var densityCap = (0, _utils.map)(brushConfig.size, 20, 80, 8, 1);

    for (var i = 0; i < Math.min(parseInt(densityCap), brushConfig.density); i++) {
      particles.push(new Particle(mouse, pmouse));
    }

    colorCounter += 0.01;
  }

  if (particles.length > brushConfig.trails) {
    particles.shift();
    particles.shift();
    particles.shift();
  }
};

var renderParticles = function renderParticles() {
  for (var i in particles) {
    particles[i].update();
    particles[i].draw();
  }
};

var _animate = function animate() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  generateParticles();
  renderParticles();
  requestAnimationFrame(_animate);
};

var Particle =
/*#__PURE__*/
function () {
  function Particle(m, pm) {
    _classCallCheck(this, Particle);

    this.position = {
      x: (0, _utils.getRandom)(pm.x - spawnRange, pm.x + spawnRange),
      y: (0, _utils.getRandom)(pm.y - spawnRange, pm.y + spawnRange)
    };
    this.targetPosition = {
      x: (0, _utils.getRandom)(m.x - spawnRange, m.x + spawnRange),
      y: (0, _utils.getRandom)(m.y - spawnRange, m.y + spawnRange)
    };
    this.velocity = {
      x: 0.0,
      y: 0.0
    };
    this.col = 'hsla(' + (Math.sin(colorCounter % Math.PI) * brushConfig.color.range + brushConfig.color.startPoint) + ',70%, 35%, 1.0)';
    this.topSpeed = 1;
    this.size = Math.random() * brushConfig.size + 15;
    this.f = 0;
  }

  return _createClass(Particle, [{
    key: "update",
    value: function update() {
      var accl = (0, _utils.sub)(this.targetPosition, this.position);
      var maggedAccl = (0, _utils.setMag)(accl, 0.005);
      this.velocity = (0, _utils.add)(maggedAccl, this.velocity);
      this.velocity = (0, _utils.decay)(this.velocity);
      this.velocity = (0, _utils.limit)(this.velocity, this.topSpeed);
      this.position = (0, _utils.add)(this.velocity, this.position);
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.fillStyle = this.col;
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }]);
}();

_animate();
},{"./utils":"js/utils.js","./controls":"js/controls.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63551" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map