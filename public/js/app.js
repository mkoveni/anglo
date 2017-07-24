/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * Vue.js v2.4.1
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(val);
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;
var tip = noop;
var formatComponentName = (null); // work around flow check

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefix has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn.call(this, parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options) {
  var inject = options.inject;
  if (Array.isArray(inject)) {
    var normalized = options.inject = {};
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = inject[i];
    }
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    valid = typeof value === expectedType.toLowerCase();
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (comp.__esModule && comp.default) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listensers hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data && parentVnode.data.attrs;
  vm.$listeners = listeners;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function checkOptionType (vm, name) {
  var option = vm.$options[name];
  if (!isPlainObject(option)) {
    warn(
      ("component option \"" + name + "\" should be an object."),
      vm
    );
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      if (isReservedAttribute(key) || config.isReservedAttr(key)) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  process.env.NODE_ENV !== 'production' && checkOptionType(vm, 'computed');
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production') {
      if (getter === undefined) {
        warn(
          ("No getter function has been defined for computed property \"" + key + "\"."),
          vm
        );
        getter = noop;
      }
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  process.env.NODE_ENV !== 'production' && checkOptionType(vm, 'methods');
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  process.env.NODE_ENV !== 'production' && checkOptionType(vm, 'watch');
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (process.env.NODE_ENV !== 'production' && !hasOwn(result, key)) {
        warn(("Injection \"" + key + "\" not found"), vm);
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // keep listeners
  var listeners = data.on;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      props = extend(extend({}, bindObject), props);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && process.env.NODE_ENV !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(ours, existing) : ours;
      }
    }
  }
  return data
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', parentData && parentData.on, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, null, true);
    defineReactive$$1(vm, '$listeners', parentData && parentData.on, null, true);
  }
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
  Vue.prototype._g = bindObjectListeners;
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp, Array];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.4.1';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (process.env.NODE_ENV !== 'production' &&
              typeof console !== 'undefined' &&
              !bailed
            ) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    process.env.NODE_ENV !== 'production' && warn &&
    modifiers && modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (modelRs.exp) + ", " + (modelRs.idx) + ", " + assignment + ")")
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  var isComponentRoot = isDef(vnode.componentOptions);
  var oldOn = isComponentRoot ? oldVnode.data.nativeOn : oldVnode.data.on;
  var on = isComponentRoot ? vnode.data.nativeOn : vnode.data.on;
  if (isUndef(oldOn) && isUndef(on)) {
    return
  }
  on = on || {};
  oldOn = oldOn || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers) && modifiers.number) {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likley wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1 && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1 && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$options._renderChildren;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\"/>";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      if (shouldIgnoreFirstNewline(lastTag, html)) {
        advance(1);
      }
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production') {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production') {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      process.env.NODE_ENV !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (!el.component && (
          isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      process.env.NODE_ENV !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if (process.env.NODE_ENV !== 'production' &&
      name === 'click' &&
      handler && handler.modifiers && handler.modifiers.right
    ) {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function on (el, dir) {
  if (process.env.NODE_ENV !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (process.env.NODE_ENV !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  return "{key:" + key + ",fn:function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el, state) || 'void 0'
      : genElement(el, state)) + "}}"
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e('" + (comment.text) + "')")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (process.env.NODE_ENV !== 'production') {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["default"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4), __webpack_require__(5)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/util.ts
function NOOP() { }
function getReflectType(target, key) {
    if (typeof Reflect === "object" && typeof Reflect.getMetadata === "function") {
        return Reflect.getMetadata('design:type', target, key);
    }
    return null;
}
function createMap() {
    var ret = Object.create(null);
    ret["__"] = undefined;
    delete ret["__"];
    return ret;
}
function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

// CONCATENATED MODULE: ./src/core.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/**
 * The basic idea behind Component is marking on prototype
 * and then process these marks to collect options and modify class/instance.
 *
 * A decorator will mark `internalKey` on prototypes, storgin meta information
 * Then register `DecoratorProcessor` on Component, which will be called in `Component` decorator
 * `DecoratorProcessor` can execute custom logic based on meta information stored before
 *
 * For non-annotated fields, `Component` will treat them as `methods` and `computed` in `option`
 * instance variable is treated as the return value of `data()` in `option`
 *
 * So a `DecoratorProcessor` may delete fields on prototype and instance,
 * preventing meta properties like lifecycle and prop to pollute `method` and `data`
 */


// option is a full-blown Vue compatible option
// meta is vue.ts specific type for annotation, a subset of option
function makeOptionsFromMeta(meta, name) {
    meta.name = meta.name || name;
    for (var _i = 0, _a = ['props', 'computed', 'watch', 'methods']; _i < _a.length; _i++) {
        var key = _a[_i];
        if (!hasOwn(meta, key)) {
            meta[key] = {};
        }
    }
    return meta;
}
// given a vue class' prototype, return its internalKeys and normalKeys
// internalKeys are for decorators' use, like $$Prop, $$Lifecycle
// normalKeys are for methods / computed property
function getKeys(proto) {
    var protoKeys = Object.getOwnPropertyNames(proto);
    var internalKeys = [];
    var normalKeys = [];
    for (var _i = 0, protoKeys_1 = protoKeys; _i < protoKeys_1.length; _i++) {
        var key = protoKeys_1[_i];
        if (key === 'constructor') {
            continue;
        }
        else if (key.substr(0, 2) === '$$') {
            internalKeys.push(key);
        }
        else {
            normalKeys.push(key);
        }
    }
    return {
        internalKeys: internalKeys, normalKeys: normalKeys
    };
}
var registeredProcessors = createMap();
// delegate to processor
function collectInternalProp(propKey, proto, instance, optionsToWrite) {
    var processor = registeredProcessors[propKey];
    if (!processor) {
        return;
    }
    processor(proto, instance, optionsToWrite);
}
// un-annotated and undeleted methods/getters are handled as `methods` and `computed`
function collectMethodsAndComputed(propKey, proto, optionsToWrite) {
    var descriptor = Object.getOwnPropertyDescriptor(proto, propKey);
    if (!descriptor) {
        return;
    }
    if (typeof descriptor.value === 'function') {
        optionsToWrite.methods[propKey] = descriptor.value;
    }
    else if (descriptor.get || descriptor.set) {
        optionsToWrite.computed[propKey] = {
            get: descriptor.get,
            set: descriptor.set,
        };
    }
}
var VUE_KEYS = Object.keys(new __WEBPACK_IMPORTED_MODULE_0_vue___default.a);
// find all undeleted instance property as the return value of data()
// need to remove Vue keys to avoid cyclic references
function collectData(cls, keys, optionsToWrite) {
    // already implemented by @Data
    if (optionsToWrite.data)
        return;
    // what a closure! :(
    optionsToWrite.data = function () {
        var selfData = {};
        var vm = this;
        var insKeys = Object.keys(vm).concat(Object.keys(vm.$props || {}));
        // _init is the only method required for `cls` call
        // for not data property, set as a readonly prop
        // so @Prop does not rewrite it to undefined
        cls.prototype._init = !vm ? NOOP : function () {
            var _loop_1 = function (key) {
                if (keys.indexOf(key) >= 0)
                    return "continue";
                Object.defineProperty(this_1, key, {
                    get: function () { return vm[key]; },
                    set: NOOP
                });
            };
            var this_1 = this;
            for (var _i = 0, insKeys_1 = insKeys; _i < insKeys_1.length; _i++) {
                var key = insKeys_1[_i];
                _loop_1(key);
            }
        };
        var proxy = new cls();
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (VUE_KEYS.indexOf(key) === -1) {
                selfData[key] = proxy[key];
            }
        }
        return selfData;
    };
}
// find proto's superclass' constructor to correctly extend
function findSuper(proto) {
    // prototype:   {}  -> VueInst -> ParentInst, aka. proto
    // constructor: Vue -> Parent  -> Child
    var superProto = Object.getPrototypeOf(proto);
    var Super = superProto instanceof __WEBPACK_IMPORTED_MODULE_0_vue___default.a
        ? superProto.constructor // TS does not setup constructor :(
        : __WEBPACK_IMPORTED_MODULE_0_vue___default.a;
    return Super;
}
var BUILTIN = ['name', 'length', 'prototype', 'arguments', 'caller'];
function Component_(meta) {
    if (meta === void 0) { meta = {}; }
    function decorate(cls) {
        Component.inDefinition = true;
        cls.prototype._init = NOOP;
        var instance = null;
        try {
            instance = new cls();
        }
        finally {
            Component.inDefinition = false;
        }
        delete cls.prototype._init;
        var proto = cls.prototype;
        var options = makeOptionsFromMeta(meta, cls['name']);
        var _a = getKeys(proto), internalKeys = _a.internalKeys, normalKeys = _a.normalKeys;
        for (var _i = 0, internalKeys_1 = internalKeys; _i < internalKeys_1.length; _i++) {
            var protoKey = internalKeys_1[_i];
            collectInternalProp(protoKey, proto, instance, options);
        }
        for (var _b = 0, normalKeys_1 = normalKeys; _b < normalKeys_1.length; _b++) {
            var protoKey = normalKeys_1[_b];
            collectMethodsAndComputed(protoKey, proto, options);
        }
        // everything on instance is packed into data
        collectData(cls, Object.keys(instance), options);
        var Super = findSuper(proto);
        var ret = Super.extend(options);
        var statics = Object.getOwnPropertyNames(cls).filter(function (k) { return BUILTIN.indexOf(k) < 0; });
        for (var _c = 0, statics_1 = statics; _c < statics_1.length; _c++) {
            var key = statics_1[_c];
            ret[key] = cls[key];
        }
        return ret;
    }
    return decorate;
}
function Component(target) {
    if (typeof target === 'function') {
        return Component_()(target);
    }
    return Component_(target);
}
(function (Component) {
    function register(key, logic) {
        registeredProcessors[key] = logic;
    }
    Component.register = register;
    Component.inDefinition = false;
})(Component || (Component = {}));

// CONCATENATED MODULE: ./src/lifecycle.ts


var LIFECYCLE_KEY = '$$Lifecycle';
function Lifecycle(target, life, _) {
    var lifecycles = target[LIFECYCLE_KEY] = target[LIFECYCLE_KEY] || createMap();
    lifecycles[life] = true;
}
Component.register(LIFECYCLE_KEY, function (proto, instance, options) {
    var lifecycles = proto[LIFECYCLE_KEY];
    for (var lifecycle in lifecycles) {
        // lifecycles must be on proto because internalKeys is processed before method
        var handler = proto[lifecycle];
        delete proto[lifecycle];
        options[lifecycle] = handler;
    }
});

// CONCATENATED MODULE: ./src/prop.ts


var PROP_KEY = '$$Prop';
function Prop(target, key) {
    var propKeys = target[PROP_KEY] = target[PROP_KEY] || [];
    propKeys.push(key);
}
Component.register(PROP_KEY, function (proto, instance, options) {
    var propKeys = proto[PROP_KEY];
    var props = options.props = options.props || createMap();
    for (var _i = 0, propKeys_1 = propKeys; _i < propKeys_1.length; _i++) {
        var key = propKeys_1[_i];
        var prop = {};
        if (instance[key] != null) {
            prop = instance[key];
            delete instance[key];
        }
        // refill type if not existing, do we need this?
        if (!prop.type) {
            prop.type = getReflectType(proto, key);
        }
        props[key] = prop;
    }
    options.props = props;
});
function p(confOrType) {
    if (!Component.inDefinition) {
        return undefined;
    }
    if (typeof confOrType === 'function') {
        var tpe = confOrType;
        return { type: tpe };
    }
    var conf = confOrType;
    if (conf.type === Function) {
        conf.default = conf.defaultFunc;
        // TODO: evaluate copying a config rather than delete prop
        delete conf.defaultFunc;
    }
    return conf;
}

// CONCATENATED MODULE: ./src/render.ts

var RENDER_KEY = '$$Render';
var RENDER = 'render';
function Render(target, key, _) {
    target[RENDER_KEY] = true;
}
Component.register(RENDER_KEY, function (proto, instance, options) {
    if (proto[RENDER_KEY]) {
        options[RENDER] = proto[RENDER];
        delete proto[RENDER];
    }
});

// CONCATENATED MODULE: ./src/transition.ts
// for type checking only
function Transition(target, key, _) {
}

// CONCATENATED MODULE: ./src/watch.ts


var WATCH_PROP = '$$Watch';
function Watch(keyOrPath, opt) {
    if (opt === void 0) { opt = {}; }
    var key = Array.isArray(keyOrPath) ? keyOrPath.join('.') : keyOrPath;
    return function (target, method) {
        var watchedProps = target[WATCH_PROP] = target[WATCH_PROP] || createMap();
        opt['handler'] = target[method];
        opt['originalMethod'] = method;
        watchedProps[key] = opt;
    };
}
Component.register(WATCH_PROP, function (target, instance, optionsToWrite) {
    var watchedProps = target[WATCH_PROP];
    var watch = optionsToWrite.watch;
    for (var key in watchedProps) {
        watch[key] = watchedProps[key];
        delete target[watchedProps[key]['originalMethod']];
    }
});

// CONCATENATED MODULE: ./src/data.ts

var DATA_KEY = '$$data';
function Data(target, key, _) {
    target[DATA_KEY] = target[key];
}
Component.register(DATA_KEY, function (proto, instance, options) {
    var dataFunc = proto['data'];
    options.data = function () {
        return dataFunc.call(this);
    };
    delete proto['data'];
});

// CONCATENATED MODULE: ./src/functions.ts
function Mixin(parent) {
    var traits = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        traits[_i - 1] = arguments[_i];
    }
    return parent.extend({ mixins: traits });
}


// CONCATENATED MODULE: ./index.ts
/* harmony import */ var ____WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var ____WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(____WEBPACK_IMPORTED_MODULE_0_vue__);
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Lifecycle", function() { return Lifecycle; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Prop", function() { return Prop; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "p", function() { return p; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Render", function() { return Render; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Transition", function() { return Transition; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Watch", function() { return Watch; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Data", function() { return Data; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Mixin", function() { return Mixin; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Trait", function() { return Component; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "Vue", function() { return ____WEBPACK_IMPORTED_MODULE_0_vue___default.a; });












/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __webpack_require__(0);

/***/ })
/******/ ]);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('hello', __webpack_require__(6));
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('layers', __webpack_require__(9));
new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
    el: '#app'
});


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(8),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/CodeThunder/Dev/sites/anglo/resources/assets/js/components/html/hello.vue.html"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] hello.vue.html: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e799226", Component.options)
  } else {
    hotAPI.reload("data-v-3e799226", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hello", function() { return Hello; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_av_ts__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_av_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_av_ts__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var Hello = (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hello.prototype.mounted = function () {
        console.log('here');
    };
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1_av_ts__["Lifecycle"]
    ], Hello.prototype, "mounted", null);
    Hello = __decorate([
        __WEBPACK_IMPORTED_MODULE_1_av_ts__["Component"]
    ], Hello);
    return Hello;
}(__WEBPACK_IMPORTED_MODULE_0_vue__["default"]));



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('h2', [_vm._v("Hello")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3e799226", module.exports)
  }
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(10)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(17),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/CodeThunder/Dev/sites/anglo/resources/assets/js/components/html/layers.vue.html"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] layers.vue.html: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4b9e1fa8", Component.options)
  } else {
    hotAPI.reload("data-v-4b9e1fa8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(13)("4970ed2e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4b9e1fa8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./layers.vue.html", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4b9e1fa8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./layers.vue.html");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(undefined);
// imports


// module
exports.push([module.i, "\n#map{\n    width:100%;\n    height: 400px;\n}\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(14)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_av_ts__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_av_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_av_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_openlayers_dist_ol_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_openlayers_dist_ol_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_openlayers_dist_ol_js__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var Layers = (function (_super) {
    __extends(Layers, _super);
    function Layers() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'Simon';
        return _this;
    }
    Layers.prototype.mounted = function () {
        new __WEBPACK_IMPORTED_MODULE_2_openlayers_dist_ol_js___default.a.Map({
            layers: [
                new __WEBPACK_IMPORTED_MODULE_2_openlayers_dist_ol_js___default.a.layer.Tile({
                    source: new __WEBPACK_IMPORTED_MODULE_2_openlayers_dist_ol_js___default.a.source.OSM()
                })
            ],
            view: new __WEBPACK_IMPORTED_MODULE_2_openlayers_dist_ol_js___default.a.View({
                center: [0, 0],
                zoom: 4
            }),
            target: 'map'
        });
    };
    __decorate([
        __WEBPACK_IMPORTED_MODULE_1_av_ts__["Lifecycle"]
    ], Layers.prototype, "mounted", null);
    Layers = __decorate([
        __WEBPACK_IMPORTED_MODULE_1_av_ts__["Component"]
    ], Layers);
    return Layers;
}(__WEBPACK_IMPORTED_MODULE_0_vue__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Layers);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// OpenLayers. See https://openlayers.org/
// License: https://raw.githubusercontent.com/openlayers/openlayers/master/LICENSE.md
// Version: v4.2.0
;(function (root, factory) {
  if (true) {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    root.ol = factory();
  }
}(this, function () {
  var OPENLAYERS = {};
  var k,aa=this;function t(a,b){var c=OPENLAYERS;a=a.split(".");c=c||aa;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b};var ea,fa;function ia(a,b){return a>b?1:a<b?-1:0}function ja(a,b){return 0<=a.indexOf(b)}function ka(a,b,c){var d=a.length;if(a[0]<=b)return 0;if(!(b<=a[d-1]))if(0<c)for(c=1;c<d;++c){if(a[c]<b)return c-1}else if(0>c)for(c=1;c<d;++c){if(a[c]<=b)return c}else for(c=1;c<d;++c){if(a[c]==b)return c;if(a[c]<b)return a[c-1]-b<b-a[c]?c-1:c}return d-1}function la(a,b){var c=Array.isArray(b)?b:[b],d=c.length;for(b=0;b<d;b++)a[a.length]=c[b]}function ma(a,b){b=a.indexOf(b);-1<b&&a.splice(b,1)}
function na(a,b){for(var c=a.length>>>0,d,e=0;e<c;e++)if(d=a[e],b(d,e,a))return d;return null}function pa(a,b){var c=a.length;if(c!==b.length)return!1;for(var d=0;d<c;d++)if(a[d]!==b[d])return!1;return!0}function qa(a){var b=ra,c=a.length,d=Array(a.length),e;for(e=0;e<c;e++)d[e]={index:e,value:a[e]};d.sort(function(a,c){return b(a.value,c.value)||a.index-c.index});for(e=0;e<a.length;e++)a[e]=d[e].value}function sa(a,b){var c;return a.every(function(d,e){c=e;return!b(d,e,a)})?-1:c}
function ta(a,b){var c=b||ia;return a.every(function(b,e){if(!e)return!0;b=c(a[e-1],b);return!(0<b||0===b)})};function v(a,b){a.prototype=Object.create(b.prototype);a.prototype.constructor=a}function ua(){}function w(a){return a.Vo||(a.Vo=++va)}var va=0;function wa(a){this.message="Assertion failed. See https://openlayers.org/en/v4.2.0/doc/errors/#"+a+" for details.";this.code=a;this.name="AssertionError"}v(wa,Error);function xa(a,b){if(!a)throw new wa(b);};function ya(a,b,c,d){this.ca=a;this.$=b;this.da=c;this.ia=d}function za(a,b,c){return a.ca<=b&&b<=a.$&&a.da<=c&&c<=a.ia}function Aa(a,b){return a.ca==b.ca&&a.da==b.da&&a.$==b.$&&a.ia==b.ia}function Ba(a,b){return a.ca<=b.$&&a.$>=b.ca&&a.da<=b.ia&&a.ia>=b.da};function Ca(a,b,c){return Math.min(Math.max(a,b),c)}var Da=function(){var a;"cosh"in Math?a=Math.cosh:a=function(a){a=Math.exp(a);return(a+1/a)/2};return a}();function Ea(a){xa(0<a,29);return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))}function Fa(a,b,c,d,e,f){var g=e-c,h=f-d;if(g||h){var l=((a-c)*g+(b-d)*h)/(g*g+h*h);1<l?(c=e,d=f):0<l&&(c+=g*l,d+=h*l)}return Ga(a,b,c,d)}function Ga(a,b,c,d){a=c-a;b=d-b;return a*a+b*b}function Ha(a){return a*Math.PI/180}function Ia(a,b){a%=b;return 0>a*b?a+b:a}
function Ja(a,b,c){return a+c*(b-a)};function Ka(a,b,c){void 0===c&&(c=[0,0]);c[0]=a[0]+2*b;c[1]=a[1]+2*b;return c}function La(a,b,c){void 0===c&&(c=[0,0]);c[0]=a[0]*b+.5|0;c[1]=a[1]*b+.5|0;return c}function Ma(a,b){if(Array.isArray(a))return a;void 0===b?b=[a,a]:b[0]=b[1]=a;return b};function Na(a){for(var b=Oa(),c=0,d=a.length;c<d;++c)Pa(b,a[c]);return b}function Qa(a,b,c){return c?(c[0]=a[0]-b,c[1]=a[1]-b,c[2]=a[2]+b,c[3]=a[3]+b,c):[a[0]-b,a[1]-b,a[2]+b,a[3]+b]}function Ra(a,b){return b?(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b):a.slice()}function Sa(a,b,c){b=b<a[0]?a[0]-b:a[2]<b?b-a[2]:0;a=c<a[1]?a[1]-c:a[3]<c?c-a[3]:0;return b*b+a*a}function Ta(a,b){return Ua(a,b[0],b[1])}function Va(a,b){return a[0]<=b[0]&&b[2]<=a[2]&&a[1]<=b[1]&&b[3]<=a[3]}
function Ua(a,b,c){return a[0]<=b&&b<=a[2]&&a[1]<=c&&c<=a[3]}function Wa(a,b){var c=a[1],d=a[2],e=a[3],f=b[0];b=b[1];var g=0;f<a[0]?g|=16:f>d&&(g|=4);b<c?g|=8:b>e&&(g|=2);g||(g=1);return g}function Oa(){return[Infinity,Infinity,-Infinity,-Infinity]}function Xa(a,b,c,d,e){return e?(e[0]=a,e[1]=b,e[2]=c,e[3]=d,e):[a,b,c,d]}function Ya(a){return Xa(Infinity,Infinity,-Infinity,-Infinity,a)}function Za(a,b){var c=a[0];a=a[1];return Xa(c,a,c,a,b)}function $a(a,b,c,d,e){e=Ya(e);return ab(e,a,b,c,d)}
function bb(a,b){return a[0]==b[0]&&a[2]==b[2]&&a[1]==b[1]&&a[3]==b[3]}function cb(a,b){b[0]<a[0]&&(a[0]=b[0]);b[2]>a[2]&&(a[2]=b[2]);b[1]<a[1]&&(a[1]=b[1]);b[3]>a[3]&&(a[3]=b[3]);return a}function Pa(a,b){b[0]<a[0]&&(a[0]=b[0]);b[0]>a[2]&&(a[2]=b[0]);b[1]<a[1]&&(a[1]=b[1]);b[1]>a[3]&&(a[3]=b[1])}function ab(a,b,c,d,e){for(;c<d;c+=e){var f=a,g=b[c],h=b[c+1];f[0]=Math.min(f[0],g);f[1]=Math.min(f[1],h);f[2]=Math.max(f[2],g);f[3]=Math.max(f[3],h)}return a}
function db(a,b,c){var d;return(d=b.call(c,eb(a)))||(d=b.call(c,gb(a)))||(d=b.call(c,hb(a)))?d:(d=b.call(c,ib(a)))?d:!1}function jb(a){var b=0;kb(a)||(b=lb(a)*mb(a));return b}function eb(a){return[a[0],a[1]]}function gb(a){return[a[2],a[1]]}function nb(a){return[(a[0]+a[2])/2,(a[1]+a[3])/2]}
function ob(a,b,c,d,e){var f=b*d[0]/2;d=b*d[1]/2;b=Math.cos(c);var g=Math.sin(c);c=f*b;f*=g;b*=d;var h=d*g,l=a[0],m=a[1];a=l-c+h;d=l-c-h;g=l+c-h;c=l+c+h;var h=m-f-b,l=m-f+b,n=m+f+b,f=m+f-b;return Xa(Math.min(a,d,g,c),Math.min(h,l,n,f),Math.max(a,d,g,c),Math.max(h,l,n,f),e)}function mb(a){return a[3]-a[1]}function pb(a,b,c){c=c?c:Oa();qb(a,b)&&(c[0]=a[0]>b[0]?a[0]:b[0],c[1]=a[1]>b[1]?a[1]:b[1],c[2]=a[2]<b[2]?a[2]:b[2],c[3]=a[3]<b[3]?a[3]:b[3]);return c}function ib(a){return[a[0],a[3]]}
function hb(a){return[a[2],a[3]]}function lb(a){return a[2]-a[0]}function qb(a,b){return a[0]<=b[2]&&a[2]>=b[0]&&a[1]<=b[3]&&a[3]>=b[1]}function kb(a){return a[2]<a[0]||a[3]<a[1]}function rb(a,b){var c=(a[2]-a[0])/2*(b-1);b=(a[3]-a[1])/2*(b-1);a[0]-=c;a[2]+=c;a[1]-=b;a[3]+=b}
function sb(a,b,c){a=[a[0],a[1],a[0],a[3],a[2],a[1],a[2],a[3]];b(a,a,2);var d=[a[0],a[2],a[4],a[6]],e=[a[1],a[3],a[5],a[7]];b=Math.min.apply(null,d);a=Math.min.apply(null,e);d=Math.max.apply(null,d);e=Math.max.apply(null,e);return Xa(b,a,d,e,c)};var tb="function"===typeof Object.assign?Object.assign:function(a,b){if(!a||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var c=Object(a),d=1,e=arguments.length;d<e;++d){var f=arguments[d];if(void 0!==f&&null!==f)for(var g in f)f.hasOwnProperty(g)&&(c[g]=f[g])}return c};function ub(a){for(var b in a)delete a[b]}function vb(a){var b=[],c;for(c in a)b.push(a[c]);return b}function wb(a){for(var b in a)return!1;return!b};/*

 Latitude/longitude spherical geodesy formulae taken from
 http://www.movable-type.co.uk/scripts/latlong.html
 Licensed under CC-BY-3.0.
*/
function xb(a){this.radius=a}xb.prototype.a=function(a){for(var b=0,c=a.length,d=a[c-1][0],e=a[c-1][1],f=0;f<c;f++)var g=a[f][0],h=a[f][1],b=b+Ha(g-d)*(2+Math.sin(Ha(e))+Math.sin(Ha(h))),d=g,e=h;return b*this.radius*this.radius/2};xb.prototype.b=function(a,b){var c=Ha(a[1]),d=Ha(b[1]),e=(d-c)/2;a=Ha(b[0]-a[0])/2;c=Math.sin(e)*Math.sin(e)+Math.sin(a)*Math.sin(a)*Math.cos(c)*Math.cos(d);return 2*this.radius*Math.atan2(Math.sqrt(c),Math.sqrt(1-c))};
xb.prototype.offset=function(a,b,c){var d=Ha(a[1]);b/=this.radius;var e=Math.asin(Math.sin(d)*Math.cos(b)+Math.cos(d)*Math.sin(b)*Math.cos(c));return[180*(Ha(a[0])+Math.atan2(Math.sin(c)*Math.sin(b)*Math.cos(d),Math.cos(b)-Math.sin(d)*Math.sin(e)))/Math.PI,180*e/Math.PI]};var yb=new xb(6370997);var zb={};zb.degrees=2*Math.PI*yb.radius/360;zb.ft=.3048;zb.m=1;zb["us-ft"]=1200/3937;var Ab=null;function Bb(a){this.mb=a.code;this.a=a.units;this.f=void 0!==a.extent?a.extent:null;this.g=void 0!==a.worldExtent?a.worldExtent:null;this.b=void 0!==a.axisOrientation?a.axisOrientation:"enu";this.c=void 0!==a.global?a.global:!1;this.i=!(!this.c||!this.f);this.o=a.getPointResolution;this.j=null;this.l=a.metersPerUnit;var b=a.code,c=Ab||window.proj4;"function"==typeof c&&(b=c.defs(b),void 0!==b&&(void 0!==b.axis&&void 0===a.axisOrientation&&(this.b=b.axis),void 0===a.metersPerUnit&&(this.l=b.to_meter),
void 0===a.units&&(this.a=b.units)))}k=Bb.prototype;k.Jk=function(){return this.mb};k.G=function(){return this.f};k.Un=function(){return this.a};k.sc=function(){return this.l||zb[this.a]};k.tl=function(){return this.g};k.dm=function(){return this.c};k.$p=function(a){this.c=a;this.i=!(!a||!this.f)};k.Vn=function(a){this.f=a;this.i=!(!this.c||!a)};k.kq=function(a){this.g=a};k.Zp=function(a){this.o=a};function Cb(a){Bb.call(this,{code:a,units:"m",extent:Db,global:!0,worldExtent:Eb,getPointResolution:function(a,c){return a/Da(c[1]/6378137)}})}v(Cb,Bb);var Fb=6378137*Math.PI,Db=[-Fb,-Fb,Fb,Fb],Eb=[-180,-85,180,85],Gb="EPSG:3857 EPSG:102100 EPSG:102113 EPSG:900913 urn:ogc:def:crs:EPSG:6.18:3:3857 urn:ogc:def:crs:EPSG::3857 http://www.opengis.net/gml/srs/epsg.xml#3857".split(" ").map(function(a){return new Cb(a)});
function Hb(a,b,c){var d=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(d));for(var e=0;e<d;e+=c){b[e]=Fb*a[e]/180;var f=6378137*Math.log(Math.tan(Math.PI*(a[e+1]+90)/360));f>Fb?f=Fb:f<-Fb&&(f=-Fb);b[e+1]=f}return b}function Ib(a,b,c){var d=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(d));for(var e=0;e<d;e+=c)b[e]=180*a[e]/Fb,b[e+1]=360*Math.atan(Math.exp(a[e+1]/6378137))/Math.PI-90;return b};var Jb=new xb(6378137);function Kb(a,b){Bb.call(this,{code:a,units:"degrees",extent:Lb,axisOrientation:b,global:!0,metersPerUnit:Mb,worldExtent:Lb})}v(Kb,Bb);var Lb=[-180,-90,180,90],Mb=Math.PI*Jb.radius/180,Nb=[new Kb("CRS:84"),new Kb("EPSG:4326","neu"),new Kb("urn:ogc:def:crs:EPSG::4326","neu"),new Kb("urn:ogc:def:crs:EPSG:6.6:4326","neu"),new Kb("urn:ogc:def:crs:OGC:1.3:CRS84"),new Kb("urn:ogc:def:crs:OGC:2:84"),new Kb("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new Kb("urn:x-ogc:def:crs:EPSG:4326","neu")];var Ob={};var Pb={};function Qb(a,b,c){a=a.mb;b=b.mb;a in Pb||(Pb[a]={});Pb[a][b]=c}function Rb(a,b){var c;a in Pb&&b in Pb[a]&&(c=Pb[a][b]);return c};function Sb(a,b,c){a=Tb(a);var d=a.o;d?b=d(b,c):"degrees"!=a.a&&(d=Vb(a,Tb("EPSG:4326")),b=[c[0]-b/2,c[1],c[0]+b/2,c[1],c[0],c[1]-b/2,c[0],c[1]+b/2],b=d(b,b,2),b=(yb.b(b.slice(0,2),b.slice(2,4))+yb.b(b.slice(4,6),b.slice(6,8)))/2,a=a.sc(),void 0!==a&&(b/=a));return b}function Wb(a){a.forEach(Xb);a.forEach(function(b){a.forEach(function(a){b!==a&&Qb(b,a,Yb)})})}function Zb(){Nb.forEach(function(a){Gb.forEach(function(b){Qb(a,b,Hb);Qb(b,a,Ib)})})}function Xb(a){Ob[a.mb]=a;Qb(a,a,Yb)}
function $b(a){return a?"string"===typeof a?Tb(a):a:Tb("EPSG:3857")}function ac(a,b,c,d){a=Tb(a);b=Tb(b);Qb(a,b,cc(c));Qb(b,a,cc(d))}function cc(a){return function(b,c,d){var e=b.length;d=void 0!==d?d:2;c=void 0!==c?c:Array(e);var f;for(f=0;f<e;f+=d){var g=a([b[f],b[f+1]]);c[f]=g[0];c[f+1]=g[1];for(g=d-1;2<=g;--g)c[f+g]=b[f+g]}return c}}
function Tb(a){var b=null;if(a instanceof Bb)b=a;else if("string"===typeof a){var b=Ob[a]||null,c=Ab||window.proj4;b||"function"!=typeof c||void 0===c.defs(a)||(b=new Bb({code:a}),Xb(b))}return b}function dc(a,b){if(a===b)return!0;var c=a.a===b.a;return a.mb===b.mb?c:Vb(a,b)===Yb&&c}function ec(a,b){a=Tb(a);b=Tb(b);return Vb(a,b)}
function Vb(a,b){var c=a.mb,d=b.mb,e=Rb(c,d);if(!e){var f=Ab||window.proj4;if("function"==typeof f){var g=f.defs(c),h=f.defs(d);void 0!==g&&void 0!==h&&(g===h?Wb([b,a]):(e=f(d,c),ac(b,a,e.forward,e.inverse)),e=Rb(c,d))}}e||(e=fc);return e}function fc(a,b){if(void 0!==b&&a!==b){for(var c=0,d=a.length;c<d;++c)b[c]=a[c];a=b}return a}function Yb(a,b){if(void 0!==b){for(var c=0,d=a.length;c<d;++c)b[c]=a[c];a=b}else a=a.slice();return a}function gc(a,b,c){return ec(b,c)(a,void 0,a.length)}
function hc(a,b,c){b=ec(b,c);return sb(a,b)}function ic(){Wb(Gb);Wb(Nb);Zb()}ic();function jc(a,b,c,d){return void 0!==d?(d[0]=a,d[1]=b,d[2]=c,d):[a,b,c]}function kc(a){var b=a[0],c=Array(b),d=1<<b-1,e;for(e=0;e<b;++e){var f=48;a[1]&d&&(f+=1);a[2]&d&&(f+=2);c[e]=String.fromCharCode(f);d>>=1}return c.join("")};function lc(a){this.minZoom=void 0!==a.minZoom?a.minZoom:0;this.b=a.resolutions;xa(ta(this.b,function(a,b){return b-a}),17);this.maxZoom=this.b.length-1;this.i=void 0!==a.origin?a.origin:null;this.c=null;void 0!==a.origins&&(this.c=a.origins,xa(this.c.length==this.b.length,20));var b=a.extent;void 0===b||this.i||this.c||(this.i=ib(b));xa(!this.i&&this.c||this.i&&!this.c,18);this.f=null;void 0!==a.tileSizes&&(this.f=a.tileSizes,xa(this.f.length==this.b.length,19));this.g=void 0!==a.tileSize?a.tileSize:
this.f?null:256;xa(!this.g&&this.f||this.g&&!this.f,22);this.v=void 0!==b?b:null;this.a=null;this.j=[0,0];void 0!==a.sizes?this.a=a.sizes.map(function(a){return new ya(Math.min(0,a[0]),Math.max(a[0]-1,-1),Math.min(0,a[1]),Math.max(a[1]-1,-1))},this):b&&mc(this,b)}var nc=[0,0,0];k=lc.prototype;k.Rf=function(a,b,c){a=oc(this,a,b);for(var d=a.ca,e=a.$;d<=e;++d)for(var f=a.da,g=a.ia;f<=g;++f)c([b,d,f])};
function pc(a,b,c,d,e){e=a.Aa(b,e);for(b=b[0]-1;b>=a.minZoom;){if(c.call(null,b,oc(a,e,b,d)))return!0;--b}return!1}k.G=function(){return this.v};k.Ti=function(){return this.maxZoom};k.Ui=function(){return this.minZoom};k.Pc=function(a){return this.i?this.i:this.c[a]};k.Da=function(a){return this.b[a]};k.Vi=function(){return this.b};function qc(a,b,c,d){return b[0]<a.maxZoom?(d=a.Aa(b,d),oc(a,d,b[0]+1,c)):null}
function rc(a,b,c,d){sc(a,b[0],b[1],c,!1,nc);var e=nc[1],f=nc[2];sc(a,b[2],b[3],c,!0,nc);a=nc[1];b=nc[2];void 0!==d?(d.ca=e,d.$=a,d.da=f,d.ia=b):d=new ya(e,a,f,b);return d}function oc(a,b,c,d){return rc(a,b,a.Da(c),d)}function tc(a,b){var c=a.Pc(b[0]),d=a.Da(b[0]);a=Ma(a.gb(b[0]),a.j);return[c[0]+(b[1]+.5)*a[0]*d,c[1]+(b[2]+.5)*a[1]*d]}k.Aa=function(a,b){var c=this.Pc(a[0]),d=this.Da(a[0]),e=Ma(this.gb(a[0]),this.j),f=c[0]+a[1]*e[0]*d;a=c[1]+a[2]*e[1]*d;return Xa(f,a,f+e[0]*d,a+e[1]*d,b)};
k.Be=function(a,b,c){return sc(this,a[0],a[1],b,!1,c)};function sc(a,b,c,d,e,f){var g=a.tc(d),h=d/a.Da(g),l=a.Pc(g);a=Ma(a.gb(g),a.j);b=h*Math.floor((b-l[0])/d+(e?.5:0))/a[0];c=h*Math.floor((c-l[1])/d+(e?0:.5))/a[1];e?(b=Math.ceil(b)-1,c=Math.ceil(c)-1):(b=Math.floor(b),c=Math.floor(c));return jc(g,b,c,f)}k.bg=function(a,b,c){return sc(this,a[0],a[1],this.Da(b),!1,c)};k.gb=function(a){return this.g?this.g:this.f[a]};k.tc=function(a,b){return Ca(ka(this.b,a,b||0),this.minZoom,this.maxZoom)};
function mc(a,b){for(var c=a.b.length,d=Array(c),e=a.minZoom;e<c;++e)d[e]=oc(a,b,e);a.a=d};function vc(a){var b=a.j;b||(b=wc(a),a.j=b);return b}function xc(a){var b={};tb(b,a?a:{});void 0===b.extent&&(b.extent=Tb("EPSG:3857").G());b.resolutions=yc(b.extent,b.maxZoom,b.tileSize);delete b.maxZoom;return new lc(b)}function yc(a,b,c){b=void 0!==b?b:42;var d=mb(a);a=lb(a);c=Ma(void 0!==c?c:256);c=Math.max(a/c[0],d/c[1]);b+=1;d=Array(b);for(a=0;a<b;++a)d[a]=c/Math.pow(2,a);return d}function wc(a,b,c){a=zc(a);b=yc(a,b,c);return new lc({extent:a,origin:ib(a),resolutions:b,tileSize:c})}
function zc(a){a=Tb(a);var b=a.G();b||(a=180*zb.degrees/a.sc(),b=Xa(-a,-a,a,a));return b};function Ac(a){this.b=a.html;this.a=a.tileRanges?a.tileRanges:null}Ac.prototype.i=function(){return this.b};function Bc(a){return function(b){if(b)return[Ca(b[0],a[0],a[2]),Ca(b[1],a[1],a[3])]}}function Cc(a){return a};function Dc(a){function b(b){var c=a.listener,e=a.lh||a.target;a.nh&&Ec(a);return c.call(e,b)}return a.mh=b}function Fc(a,b,c,d){for(var e,f=0,g=a.length;f<g;++f)if(e=a[f],e.listener===b&&e.lh===c)return d&&(e.deleteIndex=f),e}function Gc(a,b){return(a=a.fb)?a[b]:void 0}function Hc(a){var b=a.fb;b||(b=a.fb={});return b}function Ic(a,b){var c=Gc(a,b);if(c){for(var d=0,e=c.length;d<e;++d)a.removeEventListener(b,c[d].mh),ub(c[d]);c.length=0;if(c=a.fb)delete c[b],Object.keys(c).length||delete a.fb}}
function y(a,b,c,d,e){var f=Hc(a),g=f[b];g||(g=f[b]=[]);(f=Fc(g,c,d,!1))?e||(f.nh=!1):(f={lh:d,nh:!!e,listener:c,target:a,type:b},a.addEventListener(b,Dc(f)),g.push(f));return f}function Jc(a,b,c,d){return y(a,b,c,d,!0)}function Kc(a,b,c,d){(a=Gc(a,b))&&(c=Fc(a,c,d,!0))&&Ec(c)}function Ec(a){if(a&&a.target){a.target.removeEventListener(a.type,a.mh);var b=Gc(a.target,a.type);if(b){var c="deleteIndex"in a?a.deleteIndex:b.indexOf(a);-1!==c&&b.splice(c,1);b.length||Ic(a.target,a.type)}ub(a)}}
function Lc(a){var b=Hc(a),c;for(c in b)Ic(a,c)};function Mc(){}Mc.prototype.Jb=!1;function Nc(a){a.Jb||(a.Jb=!0,a.ka())}Mc.prototype.ka=ua;function Oc(a){this.type=a;this.target=null}Oc.prototype.preventDefault=Oc.prototype.stopPropagation=function(){this.qp=!0};function Pc(a){a.stopPropagation()};function Qc(){this.Ua={};this.ra={};this.oa={}}v(Qc,Mc);Qc.prototype.addEventListener=function(a,b){var c=this.oa[a];c||(c=this.oa[a]=[]);-1===c.indexOf(b)&&c.push(b)};
Qc.prototype.b=function(a){var b="string"===typeof a?new Oc(a):a;a=b.type;b.target=this;var c=this.oa[a];if(c){a in this.ra||(this.ra[a]=0,this.Ua[a]=0);++this.ra[a];for(var d=0,e=c.length;d<e;++d)if(!1===c[d].call(this,b)||b.qp){var f=!1;break}--this.ra[a];if(!this.ra[a]){b=this.Ua[a];for(delete this.Ua[a];b--;)this.removeEventListener(a,ua);delete this.ra[a]}return f}};Qc.prototype.ka=function(){Lc(this)};function Rc(a,b){return b?b in a.oa:0<Object.keys(a.oa).length}
Qc.prototype.removeEventListener=function(a,b){var c=this.oa[a];c&&(b=c.indexOf(b),a in this.Ua?(c[b]=ua,++this.Ua[a]):(c.splice(b,1),c.length||delete this.oa[a]))};function Sc(){Qc.call(this);this.i=0}v(Sc,Qc);k=Sc.prototype;k.s=function(){++this.i;this.b("change")};k.L=function(){return this.i};k.J=function(a,b,c){if(Array.isArray(a)){for(var d=a.length,e=Array(d),f=0;f<d;++f)e[f]=y(this,a[f],b,c);return e}return y(this,a,b,c)};k.once=function(a,b,c){if(Array.isArray(a)){for(var d=a.length,e=Array(d),f=0;f<d;++f)e[f]=Jc(this,a[f],b,c);return e}return Jc(this,a,b,c)};
k.K=function(a,b,c){if(Array.isArray(a))for(var d=0,e=a.length;d<e;++d)Kc(this,a[d],b,c);else Kc(this,a,b,c)};function Tc(a){Sc.call(this);w(this);this.S={};void 0!==a&&this.H(a)}v(Tc,Sc);var Uc={};function Vc(a){return Uc.hasOwnProperty(a)?Uc[a]:Uc[a]="change:"+a}k=Tc.prototype;k.get=function(a){var b;this.S.hasOwnProperty(a)&&(b=this.S[a]);return b};k.O=function(){return Object.keys(this.S)};k.N=function(){return tb({},this.S)};function Wc(a,b,c){var d=Vc(b);a.b(new Xc(d,b,c));a.b(new Xc("propertychange",b,c))}k.set=function(a,b,c){c?this.S[a]=b:(c=this.S[a],this.S[a]=b,c!==b&&Wc(this,a,c))};
k.H=function(a,b){for(var c in a)this.set(c,a[c],b)};k.P=function(a,b){if(a in this.S){var c=this.S[a];delete this.S[a];b||Wc(this,a,c)}};function Xc(a,b,c){Oc.call(this,a);this.key=b;this.oldValue=c}v(Xc,Oc);function Yc(a,b){Tc.call(this);this.c=!!(b||{}).unique;this.a=a?a:[];if(this.c)for(a=0,b=this.a.length;a<b;++a)Zc(this,this.a[a],a);$c(this)}v(Yc,Tc);k=Yc.prototype;k.clear=function(){for(;0<this.dc();)this.pop()};k.fg=function(a){var b;var c=0;for(b=a.length;c<b;++c)this.push(a[c]);return this};k.forEach=function(a,b){this.a.forEach(a,b)};k.tm=function(){return this.a};k.item=function(a){return this.a[a]};k.dc=function(){return this.get(ad)};
k.He=function(a,b){this.c&&Zc(this,b);this.a.splice(a,0,b);$c(this);this.b(new bd("add",b))};k.pop=function(){return this.Hg(this.dc()-1)};k.push=function(a){this.c&&Zc(this,a);var b=this.dc();this.He(b,a);return this.dc()};k.remove=function(a){var b=this.a,c;var d=0;for(c=b.length;d<c;++d)if(b[d]===a)return this.Hg(d)};k.Hg=function(a){var b=this.a[a];this.a.splice(a,1);$c(this);this.b(new bd("remove",b));return b};
k.Wp=function(a,b){var c=this.dc();if(a<c)this.c&&Zc(this,b,a),c=this.a[a],this.a[a]=b,this.b(new bd("remove",c)),this.b(new bd("add",b));else{for(;c<a;++c)this.He(c,void 0);this.He(a,b)}};function $c(a){a.set(ad,a.a.length)}function Zc(a,b,c){for(var d=0,e=a.a.length;d<e;++d)if(a.a[d]===b&&d!==c)throw new wa(58);}var ad="length";function bd(a,b){Oc.call(this,a);this.element=b}v(bd,Oc);var cd=/^#(?:[0-9a-f]{3}){1,2}$/i,dd=/^([a-z]*)$/i;function ed(a){return Array.isArray(a)?a:fd(a)}function gd(a){if("string"!==typeof a){var b=a[0];b!=(b|0)&&(b=b+.5|0);var c=a[1];c!=(c|0)&&(c=c+.5|0);var d=a[2];d!=(d|0)&&(d=d+.5|0);a="rgba("+b+","+c+","+d+","+(void 0===a[3]?1:a[3])+")"}return a}
var fd=function(){var a={},b=0;return function(c){if(a.hasOwnProperty(c))var d=a[c];else{if(1024<=b){d=0;for(var e in a)d++&3||(delete a[e],--b)}d=c;dd.exec(d)&&(e=document.createElement("div"),e.style.color=d,document.body.appendChild(e),d=getComputedStyle(e).color,document.body.removeChild(e));if(cd.exec(d)){var f=d.length-1;xa(3==f||6==f,54);var g=3==f?1:2;f=parseInt(d.substr(1+0*g,g),16);e=parseInt(d.substr(1+1*g,g),16);d=parseInt(d.substr(1+2*g,g),16);1==g&&(f=(f<<4)+f,e=(e<<4)+e,d=(d<<4)+d);
f=[f,e,d,1]}else d.indexOf("rgba(")?d.indexOf("rgb(")?xa(!1,14):(d=d.slice(4,-1).split(",").map(Number),d.push(1),f=hd(d)):(d=d.slice(5,-1).split(",").map(Number),f=hd(d));d=f;a[c]=d;++b}return d}}();function hd(a){var b=[];b[0]=Ca(a[0]+.5|0,0,255);b[1]=Ca(a[1]+.5|0,0,255);b[2]=Ca(a[2]+.5|0,0,255);b[3]=Ca(a[3],0,1);return b};function id(a){return"string"===typeof a||a instanceof CanvasPattern||a instanceof CanvasGradient?a:gd(a)};function jd(a,b){var c=document.createElement("CANVAS");a&&(c.width=a);b&&(c.height=b);return c.getContext("2d")}function kd(a,b){var c=b.parentNode;c&&c.replaceChild(a,b)}function ld(a){a&&a.parentNode&&a.parentNode.removeChild(a)};function md(a){Tc.call(this);this.element=a.element?a.element:null;this.a=this.R=null;this.v=[];this.render=a.render?a.render:ua;a.target&&this.f(a.target)}v(md,Tc);md.prototype.ka=function(){ld(this.element);Tc.prototype.ka.call(this)};md.prototype.g=function(){return this.a};
md.prototype.setMap=function(a){this.a&&ld(this.element);for(var b=0,c=this.v.length;b<c;++b)Ec(this.v[b]);this.v.length=0;if(this.a=a)(this.R?this.R:a.D).appendChild(this.element),this.render!==ua&&this.v.push(y(a,"postrender",this.render,this)),a.render()};md.prototype.f=function(a){this.R="string"===typeof a?document.getElementById(a):a};function nd(a){a=a?a:{};this.I=document.createElement("UL");this.u=document.createElement("LI");this.I.appendChild(this.u);this.u.style.display="none";this.c=void 0!==a.collapsed?a.collapsed:!0;this.o=void 0!==a.collapsible?a.collapsible:!0;this.o||(this.c=!1);var b=void 0!==a.className?a.className:"ol-attribution",c=void 0!==a.tipLabel?a.tipLabel:"Attributions",d=void 0!==a.collapseLabel?a.collapseLabel:"\u00bb";"string"===typeof d?(this.D=document.createElement("span"),this.D.textContent=d):this.D=
d;d=void 0!==a.label?a.label:"i";"string"===typeof d?(this.C=document.createElement("span"),this.C.textContent=d):this.C=d;var e=this.o&&!this.c?this.D:this.C,d=document.createElement("button");d.setAttribute("type","button");d.title=c;d.appendChild(e);y(d,"click",this.Vm,this);c=document.createElement("div");c.className=b+" ol-unselectable ol-control"+(this.c&&this.o?" ol-collapsed":"")+(this.o?"":" ol-uncollapsible");c.appendChild(this.I);c.appendChild(d);md.call(this,{element:c,render:a.render?
a.render:od,target:a.target});this.B=!0;this.l={};this.j={};this.T={}}v(nd,md);
function od(a){if(a=a.frameState){var b,c,d,e,f,g=a.layerStatesArray,h=tb({},a.attributions),l={},m={},n=a.viewState.projection;var p=0;for(b=g.length;p<b;p++)if(e=g[p].layer.ha()){var q=w(e).toString();if(f=e.j){var r=0;for(c=f.length;r<c;r++){var u=f[r];var x=w(u).toString();if(!(x in h)){if(d=a.usedTiles[q]){var B=e.Ta(n);a:{var E=void 0;var A,L=u,oa=B,ha=n;if(L.a){for(E in d)if(E in L.a){var B=d[E];var ga=0;for(A=L.a[E].length;ga<A;++ga){var z=L.a[E][ga];if(Ba(z,B)){E=!0;break a}var M=oc(oa,zc(ha),
parseInt(E,10)),ba=M.$-M.ca+1;if(B.ca<M.ca||B.$>M.$)if(Ba(z,new ya(Ia(B.ca,ba),Ia(B.$,ba),B.da,B.ia))||B.$-B.ca+1>ba&&Ba(z,M)){E=!0;break a}}}E=!1}else E=!0}}else E=!1;E?(x in l&&delete l[x],E=u.b,E in m||(m[E]=!0,h[x]=u)):l[x]=u}}}}b=[h,l];p=b[0];b=b[1];for(var da in this.l)da in p?(this.j[da]||(this.l[da].style.display="",this.j[da]=!0),delete p[da]):da in b?(this.j[da]&&(this.l[da].style.display="none",delete this.j[da]),delete b[da]):(ld(this.l[da]),delete this.l[da],delete this.j[da]);for(da in p)r=
document.createElement("LI"),r.innerHTML=p[da].b,this.I.appendChild(r),this.l[da]=r,this.j[da]=!0;for(da in b)r=document.createElement("LI"),r.innerHTML=b[da].b,r.style.display="none",this.I.appendChild(r),this.l[da]=r;da=!wb(this.j)||!wb(a.logos);this.B!=da&&(this.element.style.display=da?"":"none",this.B=da);da&&wb(this.j)?this.element.classList.add("ol-logo-only"):this.element.classList.remove("ol-logo-only");a=a.logos;da=this.T;for(ca in da)ca in a||(ld(da[ca]),delete da[ca]);for(var fb in a)if(b=
a[fb],b instanceof HTMLElement&&(this.u.appendChild(b),da[fb]=b),!(fb in da)){var ca=new Image;ca.src=fb;""===b?p=ca:(p=document.createElement("a"),p.href=b,p.appendChild(ca));this.u.appendChild(p);da[fb]=p}this.u.style.display=wb(a)?"none":""}else this.B&&(this.element.style.display="none",this.B=!1)}k=nd.prototype;k.Vm=function(a){a.preventDefault();pd(this)};function pd(a){a.element.classList.toggle("ol-collapsed");a.c?kd(a.D,a.C):kd(a.C,a.D);a.c=!a.c}k.Um=function(){return this.o};
k.Xm=function(a){this.o!==a&&(this.o=a,this.element.classList.toggle("ol-uncollapsible"),!a&&this.c&&pd(this))};k.Wm=function(a){this.o&&this.c!==a&&pd(this)};k.Tm=function(){return this.c};function qd(a){return Math.pow(a,3)}function rd(a){return 1-qd(1-a)}function sd(a){return 3*a*a-2*a*a*a}function td(a){return a};function ud(a){a=a?a:{};var b=void 0!==a.className?a.className:"ol-rotate",c=void 0!==a.label?a.label:"\u21e7";this.c=null;"string"===typeof c?(this.c=document.createElement("span"),this.c.className="ol-compass",this.c.textContent=c):(this.c=c,this.c.classList.add("ol-compass"));var d=a.tipLabel?a.tipLabel:"Reset rotation",c=document.createElement("button");c.className=b+"-reset";c.setAttribute("type","button");c.title=d;c.appendChild(this.c);y(c,"click",ud.prototype.D,this);d=document.createElement("div");
d.className=b+" ol-unselectable ol-control";d.appendChild(c);b=a.render?a.render:vd;this.o=a.resetNorth?a.resetNorth:void 0;md.call(this,{element:d,render:b,target:a.target});this.l=void 0!==a.duration?a.duration:250;this.j=void 0!==a.autoHide?a.autoHide:!0;this.u=void 0;this.j&&this.element.classList.add("ol-hidden")}v(ud,md);ud.prototype.D=function(a){a.preventDefault();this.o?this.o():(a=this.a.Z())&&void 0!==a.Qa()&&(0<this.l?a.animate({rotation:0,duration:this.l,easing:rd}):a.Oe(0))};
function vd(a){if(a=a.frameState){a=a.viewState.rotation;if(a!=this.u){var b="rotate("+a+"rad)";if(this.j){var c=this.element.classList.contains("ol-hidden");c||a?c&&a&&this.element.classList.remove("ol-hidden"):this.element.classList.add("ol-hidden")}this.c.style.msTransform=b;this.c.style.webkitTransform=b;this.c.style.transform=b}this.u=a}};function wd(a){a=a?a:{};var b=void 0!==a.className?a.className:"ol-zoom",c=void 0!==a.delta?a.delta:1,d=void 0!==a.zoomInLabel?a.zoomInLabel:"+",e=void 0!==a.zoomOutLabel?a.zoomOutLabel:"\u2212",f=void 0!==a.zoomInTipLabel?a.zoomInTipLabel:"Zoom in",g=void 0!==a.zoomOutTipLabel?a.zoomOutTipLabel:"Zoom out",h=document.createElement("button");h.className=b+"-in";h.setAttribute("type","button");h.title=f;h.appendChild("string"===typeof d?document.createTextNode(d):d);y(h,"click",wd.prototype.j.bind(this,
c));d=document.createElement("button");d.className=b+"-out";d.setAttribute("type","button");d.title=g;d.appendChild("string"===typeof e?document.createTextNode(e):e);y(d,"click",wd.prototype.j.bind(this,-c));c=document.createElement("div");c.className=b+" ol-unselectable ol-control";c.appendChild(h);c.appendChild(d);md.call(this,{element:c,target:a.target});this.c=void 0!==a.duration?a.duration:250}v(wd,md);
wd.prototype.j=function(a,b){b.preventDefault();if(b=this.a.Z()){var c=b.Pa();c&&(a=b.constrainResolution(c,a),0<this.c?(b.Ic()&&b.ed(),b.animate({resolution:a,duration:this.c,easing:rd})):b.Vc(a))}};function xd(a){a=a?a:{};var b=new Yc;(void 0!==a.zoom?a.zoom:1)&&b.push(new wd(a.zoomOptions));(void 0!==a.rotate?a.rotate:1)&&b.push(new ud(a.rotateOptions));(void 0!==a.attribution?a.attribution:1)&&b.push(new nd(a.attributionOptions));return b};function yd(a){a=a?a:{};this.c=void 0!==a.className?a.className:"ol-full-screen";var b=void 0!==a.label?a.label:"\u2922";this.o="string"===typeof b?document.createTextNode(b):b;b=void 0!==a.labelActive?a.labelActive:"\u00d7";this.l="string"===typeof b?document.createTextNode(b):b;var c=a.tipLabel?a.tipLabel:"Toggle full-screen",b=document.createElement("button");b.className=this.c+"-"+zd();b.setAttribute("type","button");b.title=c;b.appendChild(this.o);y(b,"click",this.C,this);c=document.createElement("div");
c.className=this.c+" ol-unselectable ol-control "+(Ad()?"":"ol-unsupported");c.appendChild(b);md.call(this,{element:c,target:a.target});this.D=void 0!==a.keys?a.keys:!1;this.j=a.source}v(yd,md);
yd.prototype.C=function(a){a.preventDefault();Ad()&&(a=this.a)&&(zd()?document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen():(a=this.j?"string"===typeof this.j?document.getElementById(this.j):this.j:a.jd(),this.D?a.mozRequestFullScreenWithKeys?a.mozRequestFullScreenWithKeys():a.webkitRequestFullscreen?a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):
Bd(a):Bd(a)))};yd.prototype.u=function(){var a=this.element.firstElementChild,b=this.a;zd()?(a.className=this.c+"-true",kd(this.l,this.o)):(a.className=this.c+"-false",kd(this.o,this.l));b&&b.Ad()};yd.prototype.setMap=function(a){md.prototype.setMap.call(this,a);a&&this.v.push(y(document,Cd(),this.u,this))};
function Ad(){var a=document.body;return!!(a.webkitRequestFullscreen||a.mozRequestFullScreen&&document.mozFullScreenEnabled||a.msRequestFullscreen&&document.msFullscreenEnabled||a.requestFullscreen&&document.fullscreenEnabled)}function zd(){return!!(document.webkitIsFullScreen||document.mozFullScreen||document.msFullscreenElement||document.fullscreenElement)}
function Bd(a){a.requestFullscreen?a.requestFullscreen():a.msRequestFullscreen?a.msRequestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.webkitRequestFullscreen&&a.webkitRequestFullscreen()}var Cd=function(){var a;return function(){if(!a){var b=document.body;b.webkitRequestFullscreen?a="webkitfullscreenchange":b.mozRequestFullScreen?a="mozfullscreenchange":b.msRequestFullscreen?a="MSFullscreenChange":b.requestFullscreen&&(a="fullscreenchange")}return a}}();function Dd(a){a=a?a:{};var b=document.createElement("DIV");b.className=void 0!==a.className?a.className:"ol-mouse-position";md.call(this,{element:b,render:a.render?a.render:Ed,target:a.target});y(this,Vc(Fd),this.Ym,this);a.coordinateFormat&&this.kj(a.coordinateFormat);a.projection&&this.$h(a.projection);this.u=void 0!==a.undefinedHTML?a.undefinedHTML:"";this.l=b.innerHTML;this.o=this.j=this.c=null}v(Dd,md);
function Ed(a){a=a.frameState;a?this.c!=a.viewState.projection&&(this.c=a.viewState.projection,this.j=null):this.c=null;Gd(this,this.o)}k=Dd.prototype;k.Ym=function(){this.j=null};k.xh=function(){return this.get(Hd)};k.Zh=function(){return this.get(Fd)};k.Ll=function(a){this.o=this.a.xe(a);Gd(this,this.o)};k.Ml=function(){Gd(this,null);this.o=null};k.setMap=function(a){md.prototype.setMap.call(this,a);a&&(a=a.a,this.v.push(y(a,"mousemove",this.Ll,this),y(a,"mouseout",this.Ml,this)))};
k.kj=function(a){this.set(Hd,a)};k.$h=function(a){this.set(Fd,Tb(a))};function Gd(a,b){var c=a.u;if(b&&a.c){if(!a.j){var d=a.Zh();a.j=d?Vb(a.c,d):fc}if(b=a.a.Wa(b))a.j(b,b),c=(c=a.xh())?c(b):b.toString()}a.l&&c==a.l||(a.element.innerHTML=c,a.l=c)}var Fd="projection",Hd="coordinateFormat";function Id(a,b,c){Oc.call(this,a);this.map=b;this.frameState=void 0!==c?c:null}v(Id,Oc);function Jd(a,b,c,d,e){Id.call(this,a,b,e);this.originalEvent=c;this.pixel=b.xe(c);this.coordinate=b.Wa(this.pixel);this.dragging=void 0!==d?d:!1}v(Jd,Id);Jd.prototype.preventDefault=function(){Id.prototype.preventDefault.call(this);this.originalEvent.preventDefault()};Jd.prototype.stopPropagation=function(){Id.prototype.stopPropagation.call(this);this.originalEvent.stopPropagation()};var Kd=["experimental-webgl","webgl","webkit-3d","moz-webgl"];function Ld(a,b){var c,d,e=Kd.length;for(d=0;d<e;++d)try{if(c=a.getContext(Kd[d],b))return c}catch(f){}return null};var Md,Nd="undefined"!==typeof navigator?navigator.userAgent.toLowerCase():"",Od=-1!==Nd.indexOf("firefox"),Pd=-1!==Nd.indexOf("safari")&&-1==Nd.indexOf("chrom"),Qd=-1!==Nd.indexOf("webkit")&&-1==Nd.indexOf("edge"),Rd=-1!==Nd.indexOf("macintosh"),Sd=window.devicePixelRatio||1,Td=!1,Ud=function(){if(!("HTMLCanvasElement"in window))return!1;try{var a=document.createElement("CANVAS").getContext("2d");return a?(void 0!==a.setLineDash&&(Td=!0),!0):!1}catch(b){return!1}}(),Vd="DeviceOrientationEvent"in
window,Wd="geolocation"in navigator,Xd="ontouchstart"in window,Yd="PointerEvent"in window,Zd=!!navigator.msPointerEnabled,$d=!1,ae,be=[];if("WebGLRenderingContext"in window)try{var ce=Ld(document.createElement("CANVAS"),{failIfMajorPerformanceCaveat:!0});ce&&($d=!0,ae=ce.getParameter(ce.MAX_TEXTURE_SIZE),be=ce.getSupportedExtensions())}catch(a){}Md=$d;fa=be;ea=ae;var de={Iq:"singleclick",xq:"click",yq:"dblclick",Bq:"pointerdrag",Eq:"pointermove",Aq:"pointerdown",Hq:"pointerup",Gq:"pointerover",Fq:"pointerout",Cq:"pointerenter",Dq:"pointerleave",zq:"pointercancel"};function ee(a,b,c,d,e){Jd.call(this,a,b,c.b,d,e);this.b=c}v(ee,Jd);function fe(a,b){this.b=a;this.f=b};function ge(a){fe.call(this,a,{mousedown:this.fm,mousemove:this.gm,mouseup:this.jm,mouseover:this.im,mouseout:this.hm});this.a=a.i;this.i=[]}v(ge,fe);function he(a,b){a=a.i;var c=b.clientX;b=b.clientY;for(var d=0,e=a.length,f;d<e&&(f=a[d]);d++){var g=Math.abs(b-f[1]);if(25>=Math.abs(c-f[0])&&25>=g)return!0}return!1}function ie(a){var b=je(a,a),c=b.preventDefault;b.preventDefault=function(){a.preventDefault();c()};b.pointerId=1;b.isPrimary=!0;b.pointerType="mouse";return b}k=ge.prototype;
k.fm=function(a){if(!he(this,a)){(1).toString()in this.a&&this.cancel(a);var b=ie(a);this.a[(1).toString()]=a;ke(this.b,"pointerdown",b,a)}};k.gm=function(a){if(!he(this,a)){var b=ie(a);ke(this.b,"pointermove",b,a)}};k.jm=function(a){if(!he(this,a)){var b=this.a[(1).toString()];b&&b.button===a.button&&(b=ie(a),ke(this.b,"pointerup",b,a),delete this.a[(1).toString()])}};k.im=function(a){if(!he(this,a)){var b=ie(a);le(this.b,b,a)}};k.hm=function(a){if(!he(this,a)){var b=ie(a);me(this.b,b,a)}};
k.cancel=function(a){var b=ie(a);this.b.cancel(b,a);delete this.a[(1).toString()]};function ne(a){fe.call(this,a,{MSPointerDown:this.om,MSPointerMove:this.pm,MSPointerUp:this.sm,MSPointerOut:this.qm,MSPointerOver:this.rm,MSPointerCancel:this.nm,MSGotPointerCapture:this.lm,MSLostPointerCapture:this.mm});this.a=a.i;this.i=["","unavailable","touch","pen","mouse"]}v(ne,fe);function oe(a,b){var c=b;"number"===typeof b.pointerType&&(c=je(b,b),c.pointerType=a.i[b.pointerType]);return c}k=ne.prototype;
k.om=function(a){this.a[a.pointerId.toString()]=a;var b=oe(this,a);ke(this.b,"pointerdown",b,a)};k.pm=function(a){var b=oe(this,a);ke(this.b,"pointermove",b,a)};k.sm=function(a){var b=oe(this,a);ke(this.b,"pointerup",b,a);delete this.a[a.pointerId.toString()]};k.qm=function(a){var b=oe(this,a);me(this.b,b,a)};k.rm=function(a){var b=oe(this,a);le(this.b,b,a)};k.nm=function(a){var b=oe(this,a);this.b.cancel(b,a);delete this.a[a.pointerId.toString()]};
k.mm=function(a){this.b.b(new pe("lostpointercapture",a,a))};k.lm=function(a){this.b.b(new pe("gotpointercapture",a,a))};function qe(a){fe.call(this,a,{pointerdown:this.ip,pointermove:this.jp,pointerup:this.mp,pointerout:this.kp,pointerover:this.lp,pointercancel:this.hp,gotpointercapture:this.ul,lostpointercapture:this.em})}v(qe,fe);k=qe.prototype;k.ip=function(a){re(this.b,a)};k.jp=function(a){re(this.b,a)};k.mp=function(a){re(this.b,a)};k.kp=function(a){re(this.b,a)};k.lp=function(a){re(this.b,a)};k.hp=function(a){re(this.b,a)};k.em=function(a){re(this.b,a)};k.ul=function(a){re(this.b,a)};function pe(a,b,c){Oc.call(this,a);this.b=b;a=c?c:{};this.buttons=se(a);this.pressure=te(a,this.buttons);this.bubbles="bubbles"in a?a.bubbles:!1;this.cancelable="cancelable"in a?a.cancelable:!1;this.view="view"in a?a.view:null;this.detail="detail"in a?a.detail:null;this.screenX="screenX"in a?a.screenX:0;this.screenY="screenY"in a?a.screenY:0;this.clientX="clientX"in a?a.clientX:0;this.clientY="clientY"in a?a.clientY:0;this.ctrlKey="ctrlKey"in a?a.ctrlKey:!1;this.altKey="altKey"in a?a.altKey:!1;this.shiftKey=
"shiftKey"in a?a.shiftKey:!1;this.metaKey="metaKey"in a?a.metaKey:!1;this.button="button"in a?a.button:0;this.relatedTarget="relatedTarget"in a?a.relatedTarget:null;this.pointerId="pointerId"in a?a.pointerId:0;this.width="width"in a?a.width:0;this.height="height"in a?a.height:0;this.tiltX="tiltX"in a?a.tiltX:0;this.tiltY="tiltY"in a?a.tiltY:0;this.pointerType="pointerType"in a?a.pointerType:"";this.isPrimary="isPrimary"in a?a.isPrimary:!1;b.preventDefault&&(this.preventDefault=function(){b.preventDefault()})}
v(pe,Oc);function se(a){if(a.buttons||ue)a=a.buttons;else switch(a.which){case 1:a=1;break;case 2:a=4;break;case 3:a=2;break;default:a=0}return a}function te(a,b){var c=0;a.pressure?c=a.pressure:c=b?.5:0;return c}var ue=!1;try{ue=1===(new MouseEvent("click",{buttons:1})).buttons}catch(a){};function ve(a,b){fe.call(this,a,{touchstart:this.rq,touchmove:this.qq,touchend:this.pq,touchcancel:this.oq});this.a=a.i;this.j=b;this.i=void 0;this.g=0;this.c=void 0}v(ve,fe);k=ve.prototype;k.ij=function(){this.g=0;this.c=void 0};
function we(a,b,c){b=je(b,c);b.pointerId=c.identifier+2;b.bubbles=!0;b.cancelable=!0;b.detail=a.g;b.button=0;b.buttons=1;b.width=c.webkitRadiusX||c.radiusX||0;b.height=c.webkitRadiusY||c.radiusY||0;b.pressure=c.webkitForce||c.force||.5;b.isPrimary=a.i===c.identifier;b.pointerType="touch";b.clientX=c.clientX;b.clientY=c.clientY;b.screenX=c.screenX;b.screenY=c.screenY;return b}
function xe(a,b,c){function d(){b.preventDefault()}var e=Array.prototype.slice.call(b.changedTouches),f=e.length,g;for(g=0;g<f;++g){var h=we(a,b,e[g]);h.preventDefault=d;c.call(a,b,h)}}
k.rq=function(a){var b=a.touches,c=Object.keys(this.a),d=c.length;if(d>=b.length){var e=[],f;for(f=0;f<d;++f){var g=c[f];var h=this.a[g];var l;if(!(l=1==g))a:{for(var m=b.length,n=0;n<m;n++)if(l=b[n],l.identifier===g-2){l=!0;break a}l=!1}l||e.push(h.out)}for(f=0;f<e.length;++f)this.Kf(a,e[f])}b=a.changedTouches[0];c=Object.keys(this.a).length;if(!c||1===c&&(1).toString()in this.a)this.i=b.identifier,void 0!==this.c&&clearTimeout(this.c);ye(this,a);this.g++;xe(this,a,this.cp)};
k.cp=function(a,b){this.a[b.pointerId]={target:b.target,out:b,Wi:b.target};var c=this.b;b.bubbles=!0;ke(c,"pointerover",b,a);c=this.b;b.bubbles=!1;ke(c,"pointerenter",b,a);ke(this.b,"pointerdown",b,a)};k.qq=function(a){a.preventDefault();xe(this,a,this.km)};
k.km=function(a,b){var c=this.a[b.pointerId];if(c){var d=c.out,e=c.Wi;ke(this.b,"pointermove",b,a);d&&e!==b.target&&(d.relatedTarget=b.target,b.relatedTarget=e,d.target=e,b.target?(me(this.b,d,a),le(this.b,b,a)):(b.target=e,b.relatedTarget=null,this.Kf(a,b)));c.out=b;c.Wi=b.target}};k.pq=function(a){ye(this,a);xe(this,a,this.sq)};
k.sq=function(a,b){ke(this.b,"pointerup",b,a);this.b.out(b,a);ze(this.b,b,a);delete this.a[b.pointerId];b.isPrimary&&(this.i=void 0,this.c=setTimeout(this.ij.bind(this),200))};k.oq=function(a){xe(this,a,this.Kf)};k.Kf=function(a,b){this.b.cancel(b,a);this.b.out(b,a);ze(this.b,b,a);delete this.a[b.pointerId];b.isPrimary&&(this.i=void 0,this.c=setTimeout(this.ij.bind(this),200))};
function ye(a,b){var c=a.j.i;b=b.changedTouches[0];if(a.i===b.identifier){var d=[b.clientX,b.clientY];c.push(d);setTimeout(function(){ma(c,d)},2500)}};function Ae(a){Qc.call(this);this.g=a;this.i={};this.f={};this.a=[];Yd?Be(this,new qe(this)):Zd?Be(this,new ne(this)):(a=new ge(this),Be(this,a),Xd&&Be(this,new ve(this,a)));a=this.a.length;for(var b,c=0;c<a;c++)b=this.a[c],Ce(this,Object.keys(b.f))}v(Ae,Qc);function Be(a,b){var c=Object.keys(b.f);c&&(c.forEach(function(a){var c=b.f[a];c&&(this.f[a]=c.bind(b))},a),a.a.push(b))}Ae.prototype.c=function(a){var b=this.f[a.type];b&&b(a)};
function Ce(a,b){b.forEach(function(a){y(this.g,a,this.c,this)},a)}function De(a,b){b.forEach(function(a){Kc(this.g,a,this.c,this)},a)}function je(a,b){for(var c={},d,e=0,f=Ee.length;e<f;e++)d=Ee[e][0],c[d]=a[d]||b[d]||Ee[e][1];return c}function ze(a,b,c){b.bubbles=!1;ke(a,"pointerleave",b,c)}Ae.prototype.out=function(a,b){a.bubbles=!0;ke(this,"pointerout",a,b)};Ae.prototype.cancel=function(a,b){ke(this,"pointercancel",a,b)};
function me(a,b,c){a.out(b,c);var d=b.target,e=b.relatedTarget;d&&e&&d.contains(e)||ze(a,b,c)}function le(a,b,c){b.bubbles=!0;ke(a,"pointerover",b,c);var d=b.target,e=b.relatedTarget;d&&e&&d.contains(e)||(b.bubbles=!1,ke(a,"pointerenter",b,c))}function ke(a,b,c,d){a.b(new pe(b,d,c))}function re(a,b){a.b(new pe(b.type,b,b))}Ae.prototype.ka=function(){for(var a=this.a.length,b,c=0;c<a;c++)b=this.a[c],De(this,Object.keys(b.f));Qc.prototype.ka.call(this)};
var Ee=[["bubbles",!1],["cancelable",!1],["view",null],["detail",null],["screenX",0],["screenY",0],["clientX",0],["clientY",0],["ctrlKey",!1],["altKey",!1],["shiftKey",!1],["metaKey",!1],["button",0],["relatedTarget",null],["buttons",0],["pointerId",0],["width",0],["height",0],["pressure",0],["tiltX",0],["tiltY",0],["pointerType",""],["hwTimestamp",0],["isPrimary",!1],["type",""],["target",null],["currentTarget",null],["which",0]];function Fe(a,b){Qc.call(this);this.i=a;this.j=0;this.o=!1;this.f=[];this.D=b?b*Sd:Sd;this.c=null;a=this.i.a;this.S=0;this.u={};this.g=new Ae(a);this.a=null;this.l=y(this.g,"pointerdown",this.Ol,this);this.v=y(this.g,"pointermove",this.Lp,this)}v(Fe,Qc);function Ge(a,b){var c=new ee("click",a.i,b);a.b(c);a.j?(clearTimeout(a.j),a.j=0,c=new ee("dblclick",a.i,b),a.b(c)):a.j=setTimeout(function(){this.j=0;var a=new ee("singleclick",this.i,b);this.b(a)}.bind(a),250)}
function He(a,b){"pointerup"==b.type||"pointercancel"==b.type?delete a.u[b.pointerId]:"pointerdown"==b.type&&(a.u[b.pointerId]=!0);a.S=Object.keys(a.u).length}k=Fe.prototype;k.Jh=function(a){He(this,a);var b=new ee("pointerup",this.i,a);this.b(b);this.o||a.button||Ge(this,this.c);this.S||(this.f.forEach(Ec),this.f.length=0,this.o=!1,this.c=null,Nc(this.a),this.a=null)};
k.Ol=function(a){He(this,a);var b=new ee("pointerdown",this.i,a);this.b(b);this.c=a;this.f.length||(this.a=new Ae(document),this.f.push(y(this.a,"pointermove",this.Hm,this),y(this.a,"pointerup",this.Jh,this),y(this.g,"pointercancel",this.Jh,this)))};k.Hm=function(a){if(Ie(this,a)){this.o=!0;var b=new ee("pointerdrag",this.i,a,this.o);this.b(b)}a.preventDefault()};k.Lp=function(a){this.b(new ee(a.type,this.i,a,!(!this.c||!Ie(this,a))))};
function Ie(a,b){return Math.abs(b.clientX-a.c.clientX)>a.D||Math.abs(b.clientY-a.c.clientY)>a.D}k.ka=function(){this.v&&(Ec(this.v),this.v=null);this.l&&(Ec(this.l),this.l=null);this.f.forEach(Ec);this.f.length=0;this.a&&(Nc(this.a),this.a=null);this.g&&(Nc(this.g),this.g=null);Qc.prototype.ka.call(this)};function Ke(a,b){this.l=a;this.c=b;this.b=[];this.i=[];this.a={}}Ke.prototype.clear=function(){this.b.length=0;this.i.length=0;ub(this.a)};function Le(a){var b=a.b,c=a.i,d=b[0];1==b.length?(b.length=0,c.length=0):(b[0]=b.pop(),c[0]=c.pop(),Me(a,0));b=a.c(d);delete a.a[b];return d}Ke.prototype.f=function(a){xa(!(this.c(a)in this.a),31);var b=this.l(a);return Infinity!=b?(this.b.push(a),this.i.push(b),this.a[this.c(a)]=!0,Ne(this,0,this.b.length-1),!0):!1};
function Me(a,b){for(var c=a.b,d=a.i,e=c.length,f=c[b],g=d[b],h=b;b<e>>1;){var l=2*b+1,m=2*b+2,l=m<e&&d[m]<d[l]?m:l;c[b]=c[l];d[b]=d[l];b=l}c[b]=f;d[b]=g;Ne(a,h,b)}function Ne(a,b,c){var d=a.b;a=a.i;for(var e=d[c],f=a[c];c>b;){var g=c-1>>1;if(a[g]>f)d[c]=d[g],a[c]=a[g],c=g;else break}d[c]=e;a[c]=f}
function Oe(a){var b=a.l,c=a.b,d=a.i,e=0,f=c.length,g;for(g=0;g<f;++g){var h=c[g];var l=b(h);Infinity==l?delete a.a[a.c(h)]:(d[e]=l,c[e++]=h)}c.length=e;d.length=e;for(b=(a.b.length>>1)-1;0<=b;b--)Me(a,b)};function Pe(a,b){Ke.call(this,function(b){return a.apply(null,b)},function(a){return a[0].bb()});this.v=b;this.j=0;this.g={}}v(Pe,Ke);Pe.prototype.f=function(a){var b=Ke.prototype.f.call(this,a);b&&y(a[0],"change",this.o,this);return b};Pe.prototype.o=function(a){a=a.target;var b=a.getState();if(2===b||3===b||4===b||5===b)Kc(a,"change",this.o,this),a=a.bb(),a in this.g&&(delete this.g[a],--this.j),this.v()};
function Qe(a,b,c){for(var d=0,e,f;a.j<b&&d<c&&0<a.b.length;)e=Le(a)[0],f=e.bb(),0!==e.getState()||f in a.g||(a.g[f]=!0,++a.j,++d,e.load())};function Re(a){return function(b,c,d){if(void 0!==b)return b=ka(a,b,d),b=Ca(b+c,0,a.length-1),c=Math.floor(b),b!=c&&c<a.length-1?a[c]/Math.pow(a[c]/a[c+1],b-c):a[c]}}function Se(a,b,c){return function(d,e,f){if(void 0!==d)return d=Math.max(Math.floor(Math.log(b/d)/Math.log(a)+(-f/2+.5))+e,0),void 0!==c&&(d=Math.min(d,c)),b/Math.pow(a,d)}};function Te(a){if(void 0!==a)return 0}function Ue(a,b){if(void 0!==a)return a+b}function Ve(a){var b=2*Math.PI/a;return function(a,d){if(void 0!==a)return a=Math.floor((a+d)/b+.5)*b}}function We(){var a=Ha(5);return function(b,c){if(void 0!==b)return Math.abs(b+c)<=a?0:b+c}};function Xe(a,b){a=void 0!==b?a.toFixed(b):""+a;b=a.indexOf(".");b=-1===b?a.length:b;return 2<b?a:Array(3-b).join("0")+a}function Ye(a){a=(""+a).split(".");for(var b=["1","3"],c=0;c<Math.max(a.length,b.length);c++){var d=parseInt(a[c]||"0",10),e=parseInt(b[c]||"0",10);if(d>e)return 1;if(e>d)return-1}return 0};function Ze(a,b){a[0]+=b[0];a[1]+=b[1];return a}function $e(a,b){var c=b.pd(),d=b.wa();b=d[0];var d=d[1],e=a[0]-b;a=a[1]-d;e||a||(e=1);var f=Math.sqrt(e*e+a*a);return[b+c*e/f,d+c*a/f]}function af(a,b){var c=a[0];a=a[1];var d=b[0],e=b[1];b=d[0];var d=d[1],f=e[0],e=e[1],g=f-b,h=e-d,c=g||h?(g*(c-b)+h*(a-d))/(g*g+h*h||0):0;0>=c?(a=b,c=d):1<=c?(a=f,c=e):(a=b+c*g,c=d+c*h);return[a,c]}
function bf(a,b,c){b=Ia(b+180,360)-180;var d=Math.abs(3600*b);c=c||0;var e=Math.pow(10,c),f=Math.floor(d/3600),g=Math.floor((d-3600*f)/60),d=Math.ceil((d-3600*f-60*g)*e)/e;60<=d&&(d=0,g+=1);60<=g&&(g=0,f+=1);return f+"\u00b0 "+Xe(g)+"\u2032 "+Xe(d,c)+"\u2033"+(b?" "+a.charAt(0>b?1:0):"")}function cf(a,b,c){return a?b.replace("{x}",a[0].toFixed(c)).replace("{y}",a[1].toFixed(c)):""}function df(a,b){for(var c=!0,d=a.length-1;0<=d;--d)if(a[d]!=b[d]){c=!1;break}return c}
function ef(a,b){var c=Math.cos(b);b=Math.sin(b);var d=a[1]*c+a[0]*b;a[0]=a[0]*c-a[1]*b;a[1]=d;return a}function gf(a,b){a[0]*=b;a[1]*=b}function hf(a,b){var c=a[0]-b[0];a=a[1]-b[1];return c*c+a*a}function jf(a,b){return Math.sqrt(hf(a,b))}function kf(a,b){return hf(a,af(a,b))}function lf(a,b){return cf(a,"{x}, {y}",b)};function mf(){return!0}function nf(){return!1};function of(){Tc.call(this);this.l=Oa();this.v=-1;this.f={};this.o=this.g=0}v(of,Tc);k=of.prototype;k.Ab=function(a,b){b=b?b:[NaN,NaN];this.Kb(a[0],a[1],b,Infinity);return b};k.sb=function(a){return this.Mc(a[0],a[1])};k.Mc=nf;k.G=function(a){this.v!=this.i&&(this.l=this.se(this.l),this.v=this.i);var b=this.l;a?(a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=b[3]):a=b;return a};k.Rb=function(a){return this.Vd(a*a)};k.tb=function(a,b){this.Dc(ec(a,b));return this};function pf(a,b,c,d,e,f){for(var g=f?f:[],h=0;b<c;b+=d){var l=a[b],m=a[b+1];g[h++]=e[0]*l+e[2]*m+e[4];g[h++]=e[1]*l+e[3]*m+e[5]}f&&g.length!=h&&(g.length=h);return g}function qf(a,b,c,d,e,f,g){for(var h=g?g:[],l=0,m;b<c;b+=d)for(h[l++]=a[b]+e,h[l++]=a[b+1]+f,m=b+2;m<b+d;++m)h[l++]=a[m];g&&h.length!=l&&(h.length=l);return h};function rf(){of.call(this);this.ja="XY";this.a=2;this.A=null}v(rf,of);function sf(a){var b;"XY"==a?b=2:"XYZ"==a||"XYM"==a?b=3:"XYZM"==a&&(b=4);return b}k=rf.prototype;k.Mc=nf;k.se=function(a){return $a(this.A,0,this.A.length,this.a,a)};k.ac=function(){return this.A.slice(0,this.a)};k.ga=function(){return this.A};k.bc=function(){return this.A.slice(this.A.length-this.a)};k.cc=function(){return this.ja};
k.Vd=function(a){this.o!=this.i&&(ub(this.f),this.g=0,this.o=this.i);if(0>a||this.g&&a<=this.g)return this;var b=a.toString();if(this.f.hasOwnProperty(b))return this.f[b];var c=this.hd(a);if(c.ga().length<this.A.length)return this.f[b]=c;this.g=a;return this};k.hd=function(){return this};k.qa=function(){return this.a};function tf(a,b,c){a.a=sf(b);a.ja=b;a.A=c}
function uf(a,b,c,d){if(b)c=sf(b);else{for(b=0;b<d;++b)if(c.length)c=c[0];else{a.ja="XY";a.a=2;return}c=c.length;var e;2==c?e="XY":3==c?e="XYZ":4==c&&(e="XYZM");b=e}a.ja=b;a.a=c}k.Dc=function(a){this.A&&(a(this.A,this.A,this.a),this.s())};
k.rotate=function(a,b){var c=this.ga();if(c){var d=c.length,e=this.qa(),f=c?c:[],g=Math.cos(a);a=Math.sin(a);var h=b[0];b=b[1];for(var l=0,m=0;m<d;m+=e){var n=c[m]-h,p=c[m+1]-b;f[l++]=h+n*g-p*a;f[l++]=b+n*a+p*g;for(n=m+2;n<m+e;++n)f[l++]=c[n]}c&&f.length!=l&&(f.length=l);this.s()}};
k.scale=function(a,b,c){var d=b;void 0===d&&(d=a);var e=c;e||(e=nb(this.G()));if(c=this.ga()){b=c.length;for(var f=this.qa(),g=c?c:[],h=e[0],e=e[1],l=0,m=0;m<b;m+=f){var n=c[m]-h,p=c[m+1]-e;g[l++]=h+a*n;g[l++]=e+d*p;for(n=m+2;n<m+f;++n)g[l++]=c[n]}c&&g.length!=l&&(g.length=l);this.s()}};k.translate=function(a,b){var c=this.ga();c&&(qf(c,0,c.length,this.qa(),a,b,c),this.s())};function vf(a,b,c,d){for(var e=0,f=a[c-d],g=a[c-d+1];b<c;b+=d)var h=a[b],l=a[b+1],e=e+(g*h-f*l),f=h,g=l;return e/2}function wf(a,b,c,d){var e=0,f;var g=0;for(f=c.length;g<f;++g){var h=c[g],e=e+vf(a,b,h,d);b=h}return e};function xf(a,b,c,d,e,f,g){var h=a[b],l=a[b+1],m=a[c]-h,n=a[c+1]-l;if(m||n)if(f=((e-h)*m+(f-l)*n)/(m*m+n*n),1<f)b=c;else if(0<f){for(e=0;e<d;++e)g[e]=Ja(a[b+e],a[c+e],f);g.length=d;return}for(e=0;e<d;++e)g[e]=a[b+e];g.length=d}function yf(a,b,c,d,e){var f=a[b],g=a[b+1];for(b+=d;b<c;b+=d){var h=a[b],l=a[b+1],f=Ga(f,g,h,l);f>e&&(e=f);f=h;g=l}return e}function zf(a,b,c,d,e){var f;var g=0;for(f=c.length;g<f;++g){var h=c[g];e=yf(a,b,h,d,e);b=h}return e}
function Af(a,b,c,d,e,f,g,h,l,m,n){if(b==c)return m;if(!e){var p=Ga(g,h,a[b],a[b+1]);if(p<m){for(n=0;n<d;++n)l[n]=a[b+n];l.length=d;return p}return m}for(var q=n?n:[NaN,NaN],r=b+d;r<c;)if(xf(a,r-d,r,d,g,h,q),p=Ga(g,h,q[0],q[1]),p<m){m=p;for(n=0;n<d;++n)l[n]=q[n];l.length=d;r+=d}else r+=d*Math.max((Math.sqrt(p)-Math.sqrt(m))/e|0,1);if(f&&(xf(a,c-d,b,d,g,h,q),p=Ga(g,h,q[0],q[1]),p<m)){m=p;for(n=0;n<d;++n)l[n]=q[n];l.length=d}return m}
function Bf(a,b,c,d,e,f,g,h,l,m,n){n=n?n:[NaN,NaN];var p;var q=0;for(p=c.length;q<p;++q){var r=c[q];m=Af(a,b,r,d,e,f,g,h,l,m,n);b=r}return m};function Cf(a,b){var c=0,d;var e=0;for(d=b.length;e<d;++e)a[c++]=b[e];return c}function Df(a,b,c,d){var e;var f=0;for(e=c.length;f<e;++f){var g=c[f],h;for(h=0;h<d;++h)a[b++]=g[h]}return b}function Ef(a,b,c,d,e){e=e?e:[];var f=0,g;var h=0;for(g=c.length;h<g;++h)b=Df(a,b,c[h],d),e[f++]=b;e.length=f;return e};function Ff(a,b,c,d,e){e=void 0!==e?e:[];for(var f=0;b<c;b+=d)e[f++]=a.slice(b,b+d);e.length=f;return e}function Gf(a,b,c,d,e){e=void 0!==e?e:[];var f=0,g;var h=0;for(g=c.length;h<g;++h){var l=c[h];e[f++]=Ff(a,b,l,d,e[f]);b=l}e.length=f;return e};function Hf(a,b,c,d,e,f,g){var h=(c-b)/d;if(3>h){for(;b<c;b+=d)f[g++]=a[b],f[g++]=a[b+1];return g}var l=Array(h);l[0]=1;l[h-1]=1;c=[b,c-d];for(var m=0,n;0<c.length;){var p=c.pop(),q=c.pop(),r=0,u=a[q],x=a[q+1],B=a[p],E=a[p+1];for(n=q+d;n<p;n+=d){var A=Fa(a[n],a[n+1],u,x,B,E);A>r&&(m=n,r=A)}r>e&&(l[(m-b)/d]=1,q+d<m&&c.push(q,m),m+d<p&&c.push(m,p))}for(n=0;n<h;++n)l[n]&&(f[g++]=a[b+n*d],f[g++]=a[b+n*d+1]);return g}
function If(a,b,c,d,e,f,g,h){var l;var m=0;for(l=c.length;m<l;++m){var n=c[m];a:{var p=a,q=n,r=d,u=e,x=f,B=g;if(b!=q){var E=u*Math.round(p[b]/u),A=u*Math.round(p[b+1]/u);b+=r;x[B++]=E;x[B++]=A;do{var L=u*Math.round(p[b]/u);g=u*Math.round(p[b+1]/u);b+=r;if(b==q){x[B++]=L;x[B++]=g;g=B;break a}}while(L==E&&g==A);for(;b<q;){var oa=u*Math.round(p[b]/u);var ha=u*Math.round(p[b+1]/u);b+=r;if(oa!=L||ha!=g){var ga=L-E,z=g-A,M=oa-E,ba=ha-A;ga*ba==z*M&&(0>ga&&M<ga||ga==M||0<ga&&M>ga)&&(0>z&&ba<z||z==ba||0<z&&
ba>z)||(x[B++]=L,x[B++]=g,E=L,A=g);L=oa;g=ha}}x[B++]=L;x[B++]=g}g=B}h.push(g);b=n}return g};function Jf(a,b){rf.call(this);this.c=this.j=-1;this.ma(a,b)}v(Jf,rf);k=Jf.prototype;k.clone=function(){var a=new Jf(null);Kf(a,this.ja,this.A.slice());return a};k.Kb=function(a,b,c,d){if(d<Sa(this.G(),a,b))return d;this.c!=this.i&&(this.j=Math.sqrt(yf(this.A,0,this.A.length,this.a,0)),this.c=this.i);return Af(this.A,0,this.A.length,this.a,this.j,!0,a,b,c,d)};k.qn=function(){return vf(this.A,0,this.A.length,this.a)};k.X=function(){return Ff(this.A,0,this.A.length,this.a)};
k.hd=function(a){var b=[];b.length=Hf(this.A,0,this.A.length,this.a,a,b,0);a=new Jf(null);Kf(a,"XY",b);return a};k.U=function(){return"LinearRing"};k.Xa=function(){};k.ma=function(a,b){a?(uf(this,b,a,1),this.A||(this.A=[]),this.A.length=Df(this.A,0,a,this.a),this.s()):Kf(this,"XY",null)};function Kf(a,b,c){tf(a,b,c);a.s()};function C(a,b){rf.call(this);this.ma(a,b)}v(C,rf);k=C.prototype;k.clone=function(){var a=new C(null);a.ba(this.ja,this.A.slice());return a};k.Kb=function(a,b,c,d){var e=this.A;a=Ga(a,b,e[0],e[1]);if(a<d){d=this.a;for(b=0;b<d;++b)c[b]=e[b];c.length=d;return a}return d};k.X=function(){return this.A?this.A.slice():[]};k.se=function(a){return Za(this.A,a)};k.U=function(){return"Point"};k.Xa=function(a){return Ua(a,this.A[0],this.A[1])};
k.ma=function(a,b){a?(uf(this,b,a,0),this.A||(this.A=[]),this.A.length=Cf(this.A,a),this.s()):this.ba("XY",null)};k.ba=function(a,b){tf(this,a,b);this.s()};function Lf(a,b,c,d,e){return!db(e,function(e){return!Mf(a,b,c,d,e[0],e[1])})}function Mf(a,b,c,d,e,f){for(var g=0,h=a[c-d],l=a[c-d+1];b<c;b+=d){var m=a[b],n=a[b+1];l<=f?n>f&&0<(m-h)*(f-l)-(e-h)*(n-l)&&g++:n<=f&&0>(m-h)*(f-l)-(e-h)*(n-l)&&g--;h=m;l=n}return!!g}function Nf(a,b,c,d,e,f){if(!c.length||!Mf(a,b,c[0],d,e,f))return!1;var g;b=1;for(g=c.length;b<g;++b)if(Mf(a,c[b-1],c[b],d,e,f))return!1;return!0};function Of(a,b,c,d,e,f,g){var h,l=e[f+1],m=[],n=c[0];var p=a[n-d];var q=a[n-d+1];for(h=b;h<n;h+=d){var r=a[h];var u=a[h+1];if(l<=q&&u<=l||q<=l&&l<=u)p=(l-q)/(u-q)*(r-p)+p,m.push(p);p=r;q=u}n=NaN;q=-Infinity;m.sort(ia);p=m[0];h=1;for(u=m.length;h<u;++h){r=m[h];var x=Math.abs(r-p);x>q&&(p=(p+r)/2,Nf(a,b,c,d,p,l)&&(n=p,q=x));p=r}isNaN(n)&&(n=e[f]);return g?(g.push(n,l),g):[n,l]};function Pf(a,b,c,d,e,f){for(var g=[a[b],a[b+1]],h=[],l;b+d<c;b+=d){h[0]=a[b+d];h[1]=a[b+d+1];if(l=e.call(f,g,h))return l;g[0]=h[0];g[1]=h[1]}return!1};function Qf(a,b,c,d,e){var f=ab(Oa(),a,b,c,d);return qb(e,f)?Va(e,f)||f[0]>=e[0]&&f[2]<=e[2]||f[1]>=e[1]&&f[3]<=e[3]?!0:Pf(a,b,c,d,function(a,b){var c=!1,d=Wa(e,a),f=Wa(e,b);if(1===d||1===f)c=!0;else{var g=e[0],h=e[1],r=e[2],u=e[3],x=b[0];b=b[1];a=(b-a[1])/(x-a[0]);f&2&&!(d&2)&&(c=x-(b-u)/a,c=c>=g&&c<=r);c||!(f&4)||d&4||(c=b-(x-r)*a,c=c>=h&&c<=u);c||!(f&8)||d&8||(c=x-(b-h)/a,c=c>=g&&c<=r);c||!(f&16)||d&16||(c=b-(x-g)*a,c=c>=h&&c<=u)}return c}):!1}
function Rf(a,b,c,d,e){var f=c[0];if(!(Qf(a,b,f,d,e)||Mf(a,b,f,d,e[0],e[1])||Mf(a,b,f,d,e[0],e[3])||Mf(a,b,f,d,e[2],e[1])||Mf(a,b,f,d,e[2],e[3])))return!1;if(1===c.length)return!0;b=1;for(f=c.length;b<f;++b)if(Lf(a,c[b-1],c[b],d,e))return!1;return!0};function Sf(a,b,c,d){for(var e=0,f=a[c-d],g=a[c-d+1];b<c;b+=d)var h=a[b],l=a[b+1],e=e+(h-f)*(l+g),f=h,g=l;return 0<e}function Tf(a,b,c,d){var e=0;d=void 0!==d?d:!1;var f;var g=0;for(f=b.length;g<f;++g){var h=b[g],e=Sf(a,e,h,c);if(!g){if(d&&e||!d&&!e)return!1}else if(d&&!e||!d&&e)return!1;e=h}return!0}
function Uf(a,b,c,d,e){e=void 0!==e?e:!1;var f;var g=0;for(f=c.length;g<f;++g){var h=c[g],l=Sf(a,b,h,d);if(g?e&&!l||!e&&l:e&&l||!e&&!l)for(var l=a,m=h,n=d;b<m-n;){var p;for(p=0;p<n;++p){var q=l[b+p];l[b+p]=l[m-n+p];l[m-n+p]=q}b+=n;m-=n}b=h}return b}function Vf(a,b,c,d){var e=0,f;var g=0;for(f=b.length;g<f;++g)e=Uf(a,e,b[g],c,d);return e};function D(a,b){rf.call(this);this.c=[];this.u=-1;this.D=null;this.I=this.C=this.B=-1;this.j=null;this.ma(a,b)}v(D,rf);k=D.prototype;k.pk=function(a){this.A?la(this.A,a.ga()):this.A=a.ga().slice();this.c.push(this.A.length);this.s()};k.clone=function(){var a=new D(null);a.ba(this.ja,this.A.slice(),this.c.slice());return a};
k.Kb=function(a,b,c,d){if(d<Sa(this.G(),a,b))return d;this.C!=this.i&&(this.B=Math.sqrt(zf(this.A,0,this.c,this.a,0)),this.C=this.i);return Bf(this.A,0,this.c,this.a,this.B,!0,a,b,c,d)};k.Mc=function(a,b){return Nf(this.ec(),0,this.c,this.a,a,b)};k.tn=function(){return wf(this.ec(),0,this.c,this.a)};k.X=function(a){if(void 0!==a){var b=this.ec().slice();Uf(b,0,this.c,this.a,a)}else b=this.A;return Gf(b,0,this.c,this.a)};k.Bb=function(){return this.c};
function Wf(a){if(a.u!=a.i){var b=nb(a.G());a.D=Of(a.ec(),0,a.c,a.a,b,0);a.u=a.i}return a.D}k.Tk=function(){return new C(Wf(this))};k.Zk=function(){return this.c.length};k.Ch=function(a){if(0>a||this.c.length<=a)return null;var b=new Jf(null);Kf(b,this.ja,this.A.slice(a?this.c[a-1]:0,this.c[a]));return b};k.Sd=function(){var a=this.ja,b=this.A,c=this.c,d=[],e=0,f;var g=0;for(f=c.length;g<f;++g){var h=c[g],l=new Jf(null);Kf(l,a,b.slice(e,h));d.push(l);e=h}return d};
k.ec=function(){if(this.I!=this.i){var a=this.A;Tf(a,this.c,this.a)?this.j=a:(this.j=a.slice(),this.j.length=Uf(this.j,0,this.c,this.a));this.I=this.i}return this.j};k.hd=function(a){var b=[],c=[];b.length=If(this.A,0,this.c,this.a,Math.sqrt(a),b,0,c);a=new D(null);a.ba("XY",b,c);return a};k.U=function(){return"Polygon"};k.Xa=function(a){return Rf(this.ec(),0,this.c,this.a,a)};
k.ma=function(a,b){a?(uf(this,b,a,2),this.A||(this.A=[]),a=Ef(this.A,0,a,this.a,this.c),this.A.length=a.length?a[a.length-1]:0,this.s()):this.ba("XY",null,this.c)};k.ba=function(a,b,c){tf(this,a,b);this.c=c;this.s()};function Xf(a,b,c,d){var e=d?d:32;d=[];var f;for(f=0;f<e;++f)la(d,a.offset(b,c,2*Math.PI*f/e));d.push(d[0],d[1]);a=new D(null);a.ba("XY",d,[d.length]);return a}function Yf(a){var b=a[0],c=a[1],d=a[2];a=a[3];b=[b,c,b,a,d,a,d,c,b,c];c=new D(null);c.ba("XY",b,[b.length]);return c}
function Zf(a,b,c){var d=b?b:32,e=a.qa();b=a.ja;for(var f=new D(null,b),d=e*(d+1),e=Array(d),g=0;g<d;g++)e[g]=0;f.ba(b,e,[e.length]);$f(f,a.wa(),a.pd(),c);return f}function $f(a,b,c,d){var e=a.ga(),f=a.ja,g=a.qa(),h=a.Bb(),l=e.length/g-1;d=d?d:0;for(var m,n,p=0;p<=l;++p)n=p*g,m=d+2*Ia(p,l)*Math.PI/l,e[n]=b[0]+c*Math.cos(m),e[n+1]=b[1]+c*Math.sin(m);a.ba(f,e,h)};function F(a){Tc.call(this);a=tb({},a);this.o=[0,0];this.c=[];this.wf=this.wf.bind(this);this.v=$b(a.projection);ag(this,a)}v(F,Tc);
function ag(a,b){var c={};c.center=void 0!==b.center?b.center:null;var d=void 0!==b.minZoom?b.minZoom:0;var e=void 0!==b.maxZoom?b.maxZoom:28;var f=void 0!==b.zoomFactor?b.zoomFactor:2;if(void 0!==b.resolutions){e=b.resolutions;var g=e[0];var h=e[e.length-1];e=Re(e)}else{g=$b(b.projection);h=g.G();var l=(h?Math.max(lb(h),mb(h)):360*zb.degrees/g.sc())/256/Math.pow(2,0),m=l/Math.pow(2,28);g=b.maxResolution;void 0!==g?d=0:g=l/Math.pow(f,d);h=b.minResolution;void 0===h&&(h=void 0!==b.maxZoom?void 0!==
b.maxResolution?g/Math.pow(f,e):l/Math.pow(f,e):m);e=d+Math.floor(Math.log(g/h)/Math.log(f));h=g/Math.pow(f,e-d);e=Se(f,g,e-d)}a.a=g;a.f=h;a.C=f;a.j=b.resolutions;a.l=d;(void 0!==b.enableRotation?b.enableRotation:1)?(d=b.constrainRotation,d=void 0===d||!0===d?We():!1===d?Ue:"number"===typeof d?Ve(d):Ue):d=Te;a.g={center:void 0!==b.extent?Bc(b.extent):Cc,resolution:e,rotation:d};void 0!==b.resolution?c.resolution=b.resolution:void 0!==b.zoom&&(c.resolution=a.constrainResolution(a.a,b.zoom-a.l));c.rotation=
void 0!==b.rotation?b.rotation:0;a.H(c);a.D=b}function bg(a,b){var c=tb({},a.D);void 0!==c.resolution?c.resolution=a.Pa():c.zoom=a.Hh();c.center=a.wa();c.rotation=a.Qa();return tb({},c,b)}k=F.prototype;
k.animate=function(a){var b=Date.now(),c=this.wa().slice(),d=this.Pa(),e=this.Qa(),f=arguments.length;if(1<f&&"function"===typeof arguments[f-1]){var g=arguments[f-1];--f}for(var h=[],l=0;l<f;++l){var m=arguments[l],n={start:b,complete:!1,anchor:m.anchor,duration:void 0!==m.duration?m.duration:1E3,easing:m.easing||sd};m.center&&(n.Rg=c,n.Tg=m.center,c=n.Tg);void 0!==m.zoom?(n.tf=d,n.zd=this.constrainResolution(this.a,m.zoom-this.l,0),d=n.zd):m.resolution&&(n.tf=d,n.zd=m.resolution,d=n.zd);void 0!==
m.rotation&&(n.Sg=e,n.uf=m.rotation,e=n.uf);n.callback=g;b+=n.duration;h.push(n)}this.c.push(h);cg(this,0,1);this.wf()};k.Ic=function(){return 0<dg(this)[0]};k.Rk=function(){return 0<dg(this)[1]};k.ed=function(){cg(this,0,-dg(this)[0]);for(var a=0,b=this.c.length;a<b;++a){var c=this.c[a];c[0].callback&&c[0].callback(!1)}this.c.length=0};
k.wf=function(){void 0!==this.u&&(cancelAnimationFrame(this.u),this.u=void 0);if(this.Ic()){for(var a=Date.now(),b=!1,c=this.c.length-1;0<=c;--c){for(var d=this.c[c],e=!0,f=0,g=d.length;f<g;++f){var h=d[f];if(!h.complete){b=a-h.start;b=0<h.duration?b/h.duration:1;1<=b?(h.complete=!0,b=1):e=!1;b=h.easing(b);if(h.Rg){var l=h.Rg[0],m=h.Rg[1];this.set("center",[l+b*(h.Tg[0]-l),m+b*(h.Tg[1]-m)])}h.tf&&h.zd&&(l=1===b?h.zd:h.tf+b*(h.zd-h.tf),h.anchor&&this.set("center",eg(this,l,h.anchor)),this.set("resolution",
l));void 0!==h.Sg&&void 0!==h.uf&&(b=1===b?h.uf:h.Sg+b*(h.uf-h.Sg),h.anchor&&this.set("center",fg(this,b,h.anchor)),this.set("rotation",b));b=!0;if(!h.complete)break}}e&&(this.c[c]=null,cg(this,0,-1),(d=d[0].callback)&&d(!0))}this.c=this.c.filter(Boolean);b&&void 0===this.u&&(this.u=requestAnimationFrame(this.wf))}};function fg(a,b,c){var d=a.wa();if(void 0!==d){var e=[d[0]-c[0],d[1]-c[1]];ef(e,b-a.Qa());Ze(e,c)}return e}
function eg(a,b,c){var d,e=a.wa();a=a.Pa();void 0!==e&&void 0!==a&&(d=[c[0]-b*(c[0]-e[0])/a,c[1]-b*(c[1]-e[1])/a]);return d}function gg(a){var b=[100,100];a='.ol-viewport[data-view="'+w(a)+'"]';if(a=document.querySelector(a))a=getComputedStyle(a),b[0]=parseInt(a.width,10),b[1]=parseInt(a.height,10);return b}k.Ec=function(a){return this.g.center(a)};k.constrainResolution=function(a,b,c){return this.g.resolution(a,b||0,c||0)};k.constrainRotation=function(a,b){return this.g.rotation(a,b||0)};k.wa=function(){return this.get("center")};
function dg(a,b){return void 0!==b?(b[0]=a.o[0],b[1]=a.o[1],b):a.o.slice()}k.dd=function(a){a=a||gg(this);var b=this.wa();xa(b,1);var c=this.Pa();xa(void 0!==c,2);var d=this.Qa();xa(void 0!==d,3);return ob(b,c,d,a)};k.Nm=function(){return this.a};k.Pm=function(){return this.f};k.Om=function(){return this.Ce(this.f)};k.eq=function(a){ag(this,bg(this,{maxZoom:a}))};k.Qm=function(){return this.Ce(this.a)};k.fq=function(a){ag(this,bg(this,{minZoom:a}))};k.Rm=function(){return this.v};k.Pa=function(){return this.get("resolution")};
k.Sm=function(){return this.j};k.ze=function(a,b){b=b||gg(this);return Math.max(lb(a)/b[0],mb(a)/b[1])};function hg(a){var b=a.a,c=Math.log(b/a.f)/Math.log(2);return function(a){return b/Math.pow(2,a*c)}}k.Qa=function(){return this.get("rotation")};function ig(a){var b=a.a,c=Math.log(b/a.f)/Math.log(2);return function(a){return Math.log(b/a)/Math.log(2)/c}}k.getState=function(){var a=this.wa(),b=this.v,c=this.Pa(),d=this.Qa();return{center:a.slice(),projection:void 0!==b?b:null,resolution:c,rotation:d}};
k.Hh=function(){var a,b=this.Pa();void 0!==b&&(a=this.Ce(b));return a};k.Ce=function(a){if(a>=this.f&&a<=this.a){var b=this.l||0;if(this.j){var c=ka(this.j,a,1);b+=c;if(c==this.j.length-1)return b;var d=this.j[c];c=d/this.j[c+1]}else d=this.a,c=this.C;b+=Math.log(d/a)/Math.log(c)}return b};
k.Qf=function(a,b){b=b||{};var c=b.size;c||(c=gg(this));if(a instanceof rf)if("Circle"===a.U()){a=a.G();var d=Yf(a);d.rotate(this.Qa(),nb(a))}else d=a;else xa(Array.isArray(a),24),xa(!kb(a),25),d=Yf(a);var e=b.padding?b.padding:[0,0,0,0],f=void 0!==b.constrainResolution?b.constrainResolution:!0,g=void 0!==b.nearest?b.nearest:!1,h;void 0!==b.minResolution?h=b.minResolution:void 0!==b.maxZoom?h=this.constrainResolution(this.a,b.maxZoom-this.l,0):h=0;var l=d.ga(),m=this.Qa();a=Math.cos(-m);var m=Math.sin(-m),
n=Infinity,p=Infinity,q=-Infinity,r=-Infinity;d=d.qa();for(var u=0,x=l.length;u<x;u+=d)var B=l[u]*a-l[u+1]*m,E=l[u]*m+l[u+1]*a,n=Math.min(n,B),p=Math.min(p,E),q=Math.max(q,B),r=Math.max(r,E);c=this.ze([n,p,q,r],[c[0]-e[1]-e[3],c[1]-e[0]-e[2]]);c=isNaN(c)?h:Math.max(c,h);f&&(h=this.constrainResolution(c,0,0),!g&&h<c&&(h=this.constrainResolution(h,-1,0)),c=h);m=-m;h=(n+q)/2+(e[1]-e[3])/2*c;e=(p+r)/2+(e[0]-e[2])/2*c;a=[h*a-e*m,e*a+h*m];e=b.callback?b.callback:ua;void 0!==b.duration?this.animate({resolution:c,
center:a,duration:b.duration,easing:b.easing},e):(this.Vc(c),this.ob(a),setTimeout(e.bind(void 0,!0),0))};k.uk=function(a,b,c){var d=this.Qa(),e=Math.cos(-d),d=Math.sin(-d),f=a[0]*e-a[1]*d;a=a[1]*e+a[0]*d;var g=this.Pa(),f=f+(b[0]/2-c[0])*g;a+=(c[1]-b[1]/2)*g;d=-d;this.ob([f*e-a*d,a*e+f*d])};function jg(a){return!!a.wa()&&void 0!==a.Pa()}k.rotate=function(a,b){void 0!==b&&(b=fg(this,a,b),this.ob(b));this.Oe(a)};k.ob=function(a){this.set("center",a);this.Ic()&&this.ed()};
function cg(a,b,c){a.o[b]+=c;a.s()}k.Vc=function(a){this.set("resolution",a);this.Ic()&&this.ed()};k.Oe=function(a){this.set("rotation",a);this.Ic()&&this.ed()};k.lq=function(a){a=this.constrainResolution(this.a,a-this.l,0);this.Vc(a)};function kg(a,b,c){this.f=a;this.c=b;this.g=c;this.b=[];this.a=this.i=0}function lg(a){a.b.length=0;a.i=0;a.a=0}function mg(a){if(6>a.b.length)return!1;var b=Date.now()-a.g,c=a.b.length-3;if(a.b[c+2]<b)return!1;for(var d=c-3;0<d&&a.b[d+2]>b;)d-=3;b=a.b[c+2]-a.b[d+2];if(b<1E3/60)return!1;var e=a.b[c]-a.b[d],c=a.b[c+1]-a.b[d+1];a.i=Math.atan2(c,e);a.a=Math.sqrt(e*e+c*c)/b;return a.a>a.c};function ng(a){Tc.call(this);this.v=null;this.Ha(!0);this.handleEvent=a.handleEvent}v(ng,Tc);ng.prototype.c=function(){return this.get("active")};ng.prototype.f=function(){return this.v};ng.prototype.Ha=function(a){this.set("active",a)};ng.prototype.setMap=function(a){this.v=a};function og(a,b,c,d){if(void 0!==b){var e=a.Qa(),f=a.wa();void 0!==e&&f&&0<d?a.animate({rotation:b,anchor:c,duration:d,easing:rd}):a.rotate(b,c)}}
function pg(a,b,c,d){var e=a.Pa();b=a.constrainResolution(e,b,0);if(c&&void 0!==b&&b!==e){var f=a.wa();c=eg(a,b,c);c=a.Ec(c);c=[(b*f[0]-e*c[0])/(b-e),(b*f[1]-e*c[1])/(b-e)]}qg(a,b,c,d)}function qg(a,b,c,d){if(b){var e=a.Pa(),f=a.wa();void 0!==e&&f&&b!==e&&d?a.animate({resolution:b,anchor:c,duration:d,easing:rd}):(c&&(c=eg(a,b,c),a.ob(c)),a.Vc(b))}};function rg(a){a=a?a:{};this.a=a.delta?a.delta:1;ng.call(this,{handleEvent:sg});this.g=void 0!==a.duration?a.duration:250}v(rg,ng);function sg(a){var b=!1,c=a.originalEvent;if("dblclick"==a.type){var b=a.coordinate,c=c.shiftKey?-this.a:this.a,d=a.map.Z();pg(d,c,b,this.g);a.preventDefault();b=!0}return!b};function tg(a){a=a.originalEvent;return a.altKey&&!(a.metaKey||a.ctrlKey)&&a.shiftKey}function ug(a){a=a.originalEvent;return!a.button&&!(Qd&&Rd&&a.ctrlKey)}function vg(a){return"pointermove"==a.type}function wg(a){return"singleclick"==a.type}function xg(a){a=a.originalEvent;return!a.altKey&&!(a.metaKey||a.ctrlKey)&&!a.shiftKey}function yg(a){a=a.originalEvent;return!a.altKey&&!(a.metaKey||a.ctrlKey)&&a.shiftKey}
function Ag(a){a=a.originalEvent.target.tagName;return"INPUT"!==a&&"SELECT"!==a&&"TEXTAREA"!==a}function Bg(a){xa(a.b,56);return"mouse"==a.b.pointerType}function Cg(a){a=a.b;return a.isPrimary&&0===a.button};function Dg(a){a=a?a:{};ng.call(this,{handleEvent:a.handleEvent?a.handleEvent:Eg});this.yf=a.handleDownEvent?a.handleDownEvent:nf;this.If=a.handleDragEvent?a.handleDragEvent:ua;this.Jf=a.handleMoveEvent?a.handleMoveEvent:ua;this.sk=a.handleUpEvent?a.handleUpEvent:nf;this.D=!1;this.na={};this.o=[]}v(Dg,ng);function Fg(a){for(var b=a.length,c=0,d=0,e=0;e<b;e++)c+=a[e].clientX,d+=a[e].clientY;return[c/b,d/b]}
function Eg(a){if(!(a instanceof ee))return!0;var b=!1,c=a.type;if("pointerdown"===c||"pointerdrag"===c||"pointerup"===c)c=a.b,"pointerup"==a.type?delete this.na[c.pointerId]:"pointerdown"==a.type?this.na[c.pointerId]=c:c.pointerId in this.na&&(this.na[c.pointerId]=c),this.o=vb(this.na);this.D?"pointerdrag"==a.type?this.If(a):"pointerup"==a.type&&(this.D=this.sk(a)&&0<this.o.length):"pointerdown"==a.type?(this.D=a=this.yf(a),b=this.Xc(a)):"pointermove"==a.type&&this.Jf(a);return!b}
Dg.prototype.Xc=function(a){return a};function Gg(a){Dg.call(this,{handleDownEvent:Hg,handleDragEvent:Ig,handleUpEvent:Jg});a=a?a:{};this.a=a.kinetic;this.g=null;this.u=a.condition?a.condition:xg;this.j=!1}v(Gg,Dg);function Ig(a){var b=this.o,c=Fg(b);if(b.length==this.l){if(this.a&&this.a.b.push(c[0],c[1],Date.now()),this.g){var d=this.g[0]-c[0],e=c[1]-this.g[1];a=a.map.Z();var f=a.getState(),d=[d,e];gf(d,f.resolution);ef(d,f.rotation);Ze(d,f.center);d=a.Ec(d);a.ob(d)}}else this.a&&lg(this.a);this.g=c;this.l=b.length}
function Jg(a){var b=a.map;a=b.Z();if(this.o.length)return this.a&&lg(this.a),this.g=null,!0;if(!this.j&&this.a&&mg(this.a)){var c=this.a;c=(c.c-c.a)/c.f;var d=this.a.i,e=a.wa(),e=b.Ja(e),b=b.Wa([e[0]-c*Math.cos(d),e[1]-c*Math.sin(d)]);a.animate({center:a.Ec(b),duration:500,easing:rd})}cg(a,1,-1);return!1}
function Hg(a){if(0<this.o.length&&this.u(a)){var b=a.map.Z();this.g=null;this.D||cg(b,1,1);dg(b)[0]&&b.ob(a.frameState.viewState.center);this.a&&lg(this.a);this.j=1<this.o.length;return!0}return!1}Gg.prototype.Xc=nf;function Kg(a){a=a?a:{};Dg.call(this,{handleDownEvent:Lg,handleDragEvent:Mg,handleUpEvent:Ng});this.g=a.condition?a.condition:tg;this.a=void 0;this.j=void 0!==a.duration?a.duration:250}v(Kg,Dg);function Mg(a){if(Bg(a)){var b=a.map,c=b.Z();if(c.g.rotation!==Te){b=b.Ob();a=a.pixel;a=Math.atan2(b[1]/2-a[1],a[0]-b[0]/2);if(void 0!==this.a){var b=a-this.a,d=c.Qa();og(c,d-b)}this.a=a}}}
function Ng(a){if(!Bg(a))return!0;a=a.map.Z();cg(a,1,-1);var b=a.Qa(),c=this.j,b=a.constrainRotation(b,0);og(a,b,void 0,c);return!1}function Lg(a){return Bg(a)&&ug(a)&&this.g(a)?(cg(a.map.Z(),1,1),this.a=void 0,!0):!1}Kg.prototype.Xc=nf;function Og(a){this.Gc=null;this.a=document.createElement("div");this.a.style.position="absolute";this.a.className="ol-box "+a;this.i=this.c=this.b=null}v(Og,Mc);Og.prototype.ka=function(){this.setMap(null)};function Pg(a){var b=a.c,c=a.i;a=a.a.style;a.left=Math.min(b[0],c[0])+"px";a.top=Math.min(b[1],c[1])+"px";a.width=Math.abs(c[0]-b[0])+"px";a.height=Math.abs(c[1]-b[1])+"px"}
Og.prototype.setMap=function(a){if(this.b){this.b.C.removeChild(this.a);var b=this.a.style;b.left=b.top=b.width=b.height="inherit"}(this.b=a)&&this.b.C.appendChild(this.a)};function Qg(a){var b=a.c,c=a.i,b=[b,[b[0],c[1]],c,[c[0],b[1]]].map(a.b.Wa,a.b);b[4]=b[0].slice();a.Gc?a.Gc.ma([b]):a.Gc=new D([b])}Og.prototype.V=function(){return this.Gc};function Rg(a){Dg.call(this,{handleDownEvent:Sg,handleDragEvent:Tg,handleUpEvent:Ug});a=a?a:{};this.a=new Og(a.className||"ol-dragbox");this.u=void 0!==a.minArea?a.minArea:64;this.g=null;this.C=a.condition?a.condition:mf;this.l=a.boxEndCondition?a.boxEndCondition:Vg}v(Rg,Dg);function Vg(a,b,c){a=c[0]-b[0];b=c[1]-b[1];return a*a+b*b>=this.u}function Tg(a){if(Bg(a)){var b=this.a,c=a.pixel;b.c=this.g;b.i=c;Qg(b);Pg(b);this.b(new Wg(Xg,a.coordinate,a))}}Rg.prototype.V=function(){return this.a.V()};
Rg.prototype.j=ua;function Ug(a){if(!Bg(a))return!0;this.a.setMap(null);this.l(a,this.g,a.pixel)&&(this.j(a),this.b(new Wg(Yg,a.coordinate,a)));return!1}function Sg(a){if(Bg(a)&&ug(a)&&this.C(a)){this.g=a.pixel;this.a.setMap(a.map);var b=this.a,c=this.g;b.c=this.g;b.i=c;Qg(b);Pg(b);this.b(new Wg(Zg,a.coordinate,a));return!0}return!1}var Zg="boxstart",Xg="boxdrag",Yg="boxend";function Wg(a,b,c){Oc.call(this,a);this.coordinate=b;this.mapBrowserEvent=c}v(Wg,Oc);function $g(a){a=a?a:{};var b=a.condition?a.condition:yg;this.B=void 0!==a.duration?a.duration:200;this.I=void 0!==a.out?a.out:!1;Rg.call(this,{condition:b,className:a.className||"ol-dragzoom"})}v($g,Rg);
$g.prototype.j=function(){var a=this.v,b=a.Z(),c=a.Ob(),d=this.V().G();if(this.I){var e=b.dd(c),d=[a.Ja(eb(d)),a.Ja(hb(d))],a=Ya(void 0),f;var g=0;for(f=d.length;g<f;++g)Pa(a,d[g]);d=b.ze(a,c);rb(e,1/d);d=e}c=b.constrainResolution(b.ze(d,c));e=nb(d);e=b.Ec(e);b.animate({resolution:c,center:e,duration:this.B,easing:rd})};function ah(a){ng.call(this,{handleEvent:bh});a=a||{};this.a=function(a){return xg(a)&&Ag(a)};this.g=a.condition?a.condition:this.a;this.j=void 0!==a.duration?a.duration:100;this.o=void 0!==a.pixelDelta?a.pixelDelta:128}v(ah,ng);
function bh(a){var b=!1;if("keydown"==a.type){var c=a.originalEvent.keyCode;if(this.g(a)&&(40==c||37==c||39==c||38==c)){var b=a.map.Z(),d=b.Pa()*this.o,e=0,f=0;40==c?f=-d:37==c?e=-d:39==c?e=d:f=d;d=[e,f];ef(d,b.Qa());c=this.j;if(e=b.wa())d=b.Ec([e[0]+d[0],e[1]+d[1]]),c?b.animate({duration:c,easing:td,center:d}):b.ob(d);a.preventDefault();b=!0}}return!b};function ch(a){ng.call(this,{handleEvent:dh});a=a?a:{};this.g=a.condition?a.condition:Ag;this.a=a.delta?a.delta:1;this.j=void 0!==a.duration?a.duration:100}v(ch,ng);function dh(a){var b=!1;if("keydown"==a.type||"keypress"==a.type){var c=a.originalEvent.charCode;!this.g(a)||43!=c&&45!=c||(b=43==c?this.a:-this.a,c=a.map.Z(),pg(c,b,void 0,this.j),a.preventDefault(),b=!0)}return!b};function eh(a){ng.call(this,{handleEvent:fh});a=a||{};this.j=0;this.D=void 0!==a.duration?a.duration:250;this.na=void 0!==a.timeout?a.timeout:80;this.C=void 0!==a.useAnchor?a.useAnchor:!0;this.R=a.constrainResolution||!1;this.a=null;this.l=this.o=this.u=this.g=void 0}v(eh,ng);
function fh(a){var b=a.type;if("wheel"!==b&&"mousewheel"!==b)return!0;a.preventDefault();var b=a.map,c=a.originalEvent;this.C&&(this.a=a.coordinate);if("wheel"==a.type){var d=c.deltaY;Od&&c.deltaMode===WheelEvent.DOM_DELTA_PIXEL&&(d/=Sd);c.deltaMode===WheelEvent.DOM_DELTA_LINE&&(d*=40)}else"mousewheel"==a.type&&(d=-c.wheelDeltaY,Pd&&(d/=3));if(0===d)return!1;a=Date.now();void 0===this.g&&(this.g=a);if(!this.o||400<a-this.g)this.o=4>Math.abs(d)?gh:hh;if(this.o===gh){b=b.Z();this.l?clearTimeout(this.l):
cg(b,1,1);this.l=setTimeout(this.B.bind(this),400);var c=b.Pa()*Math.pow(2,d/300),e=b.f,f=b.a,g=0;c<e?(c=Math.max(c,e/1.5),g=1):c>f&&(c=Math.min(c,1.5*f),g=-1);if(this.a){var h=eg(b,c,this.a);b.ob(b.Ec(h))}b.Vc(c);!g&&this.R&&b.animate({resolution:b.constrainResolution(c,0<d?-1:1),easing:rd,anchor:this.a,duration:this.D});0<g?b.animate({resolution:e,easing:rd,anchor:this.a,duration:500}):0>g&&b.animate({resolution:f,easing:rd,anchor:this.a,duration:500});this.g=a;return!1}this.j+=d;d=Math.max(this.na-
(a-this.g),0);clearTimeout(this.u);this.u=setTimeout(this.I.bind(this,b),d);return!1}eh.prototype.B=function(){this.l=void 0;cg(this.v.Z(),1,-1)};eh.prototype.I=function(a){a=a.Z();a.Ic()&&a.ed();pg(a,-Ca(this.j,-1,1),this.a,this.D);this.o=void 0;this.j=0;this.a=null;this.u=this.g=void 0};eh.prototype.T=function(a){this.C=a;a||(this.a=null)};var gh="trackpad",hh="wheel";function ih(a){Dg.call(this,{handleDownEvent:jh,handleDragEvent:kh,handleUpEvent:lh});a=a||{};this.g=null;this.j=void 0;this.a=!1;this.l=0;this.C=void 0!==a.threshold?a.threshold:.3;this.u=void 0!==a.duration?a.duration:250}v(ih,Dg);
function kh(a){var b=0,c=this.o[0],d=this.o[1],c=Math.atan2(d.clientY-c.clientY,d.clientX-c.clientX);void 0!==this.j&&(b=c-this.j,this.l+=b,!this.a&&Math.abs(this.l)>this.C&&(this.a=!0));this.j=c;a=a.map;c=a.Z();if(c.g.rotation!==Te){var d=a.a.getBoundingClientRect(),e=Fg(this.o);e[0]-=d.left;e[1]-=d.top;this.g=a.Wa(e);this.a&&(d=c.Qa(),a.render(),og(c,d+b,this.g))}}
function lh(a){if(2>this.o.length){a=a.map.Z();cg(a,1,-1);if(this.a){var b=a.Qa(),c=this.g,d=this.u,b=a.constrainRotation(b,0);og(a,b,c,d)}return!1}return!0}function jh(a){return 2<=this.o.length?(a=a.map,this.g=null,this.j=void 0,this.a=!1,this.l=0,this.D||cg(a.Z(),1,1),!0):!1}ih.prototype.Xc=nf;function mh(a){Dg.call(this,{handleDownEvent:nh,handleDragEvent:oh,handleUpEvent:ph});a=a?a:{};this.l=a.constrainResolution||!1;this.g=null;this.u=void 0!==a.duration?a.duration:400;this.a=void 0;this.j=1}v(mh,Dg);
function oh(a){var b=1,c=this.o[0],d=this.o[1],e=c.clientX-d.clientX,c=c.clientY-d.clientY,e=Math.sqrt(e*e+c*c);void 0!==this.a&&(b=this.a/e);this.a=e;a=a.map;var e=a.Z(),d=e.Pa(),f=e.a,g=e.f,c=d*b;c>f?(b=f/d,c=f):c<g&&(b=g/d,c=g);1!=b&&(this.j=b);b=a.a.getBoundingClientRect();d=Fg(this.o);d[0]-=b.left;d[1]-=b.top;this.g=a.Wa(d);a.render();qg(e,c,this.g)}
function ph(a){if(2>this.o.length){a=a.map.Z();cg(a,1,-1);var b=a.Pa();if(this.l||b<a.f||b>a.a){var c=this.g,d=this.u,b=a.constrainResolution(b,0,this.j-1);qg(a,b,c,d)}return!1}return!0}function nh(a){return 2<=this.o.length?(a=a.map,this.g=null,this.a=void 0,this.j=1,this.D||cg(a.Z(),1,1),!0):!1}mh.prototype.Xc=nf;function qh(a){a=a?a:{};var b=new Yc,c=new kg(-.005,.05,100);(void 0!==a.altShiftDragRotate?a.altShiftDragRotate:1)&&b.push(new Kg);(void 0!==a.doubleClickZoom?a.doubleClickZoom:1)&&b.push(new rg({delta:a.zoomDelta,duration:a.zoomDuration}));(void 0!==a.dragPan?a.dragPan:1)&&b.push(new Gg({kinetic:c}));(void 0!==a.pinchRotate?a.pinchRotate:1)&&b.push(new ih);(void 0!==a.pinchZoom?a.pinchZoom:1)&&b.push(new mh({constrainResolution:a.constrainResolution,duration:a.zoomDuration}));if(void 0!==a.keyboard?
a.keyboard:1)b.push(new ah),b.push(new ch({delta:a.zoomDelta,duration:a.zoomDuration}));(void 0!==a.mouseWheelZoom?a.mouseWheelZoom:1)&&b.push(new eh({constrainResolution:a.constrainResolution,duration:a.zoomDuration}));(void 0!==a.shiftDragZoom?a.shiftDragZoom:1)&&b.push(new $g({duration:a.zoomDuration}));return b};function sh(a){Tc.call(this);var b=tb({},a);b.opacity=void 0!==a.opacity?a.opacity:1;b.visible=void 0!==a.visible?a.visible:!0;b.zIndex=void 0!==a.zIndex?a.zIndex:0;b.maxResolution=void 0!==a.maxResolution?a.maxResolution:Infinity;b.minResolution=void 0!==a.minResolution?a.minResolution:0;this.H(b);this.a={layer:this,Je:!0}}v(sh,Tc);
function th(a){a.a.opacity=Ca(a.hc(),0,1);a.a.yj=a.$f();a.a.visible=a.Mb();a.a.extent=a.G();a.a.zIndex=a.Ba();a.a.maxResolution=a.fc();a.a.minResolution=Math.max(a.gc(),0);return a.a}k=sh.prototype;k.G=function(){return this.get("extent")};k.fc=function(){return this.get("maxResolution")};k.gc=function(){return this.get("minResolution")};k.hc=function(){return this.get("opacity")};k.Mb=function(){return this.get("visible")};k.Ba=function(){return this.get("zIndex")};
k.vc=function(a){this.set("extent",a)};k.Ac=function(a){this.set("maxResolution",a)};k.Bc=function(a){this.set("minResolution",a)};k.wc=function(a){this.set("opacity",a)};k.xc=function(a){this.set("visible",a)};k.Vb=function(a){this.set("zIndex",a)};function uh(a){var b=a||{};a=tb({},b);delete a.layers;b=b.layers;sh.call(this,a);this.f=[];this.c={};y(this,Vc(vh),this.Hl,this);b?Array.isArray(b)?b=new Yc(b.slice(),{unique:!0}):xa(b instanceof Yc,43):b=new Yc(void 0,{unique:!0});this.xi(b)}v(uh,sh);k=uh.prototype;k.Fd=function(){};k.Fe=function(){this.Mb()&&this.s()};
k.Hl=function(){this.f.forEach(Ec);this.f.length=0;var a=this.qd();this.f.push(y(a,"add",this.Gl,this),y(a,"remove",this.Il,this));for(var b in this.c)this.c[b].forEach(Ec);ub(this.c);var a=a.a,c;b=0;for(c=a.length;b<c;b++){var d=a[b];this.c[w(d).toString()]=[y(d,"propertychange",this.Fe,this),y(d,"change",this.Fe,this)]}this.s()};k.Gl=function(a){a=a.element;var b=w(a).toString();this.c[b]=[y(a,"propertychange",this.Fe,this),y(a,"change",this.Fe,this)];this.s()};
k.Il=function(a){a=w(a.element).toString();this.c[a].forEach(Ec);delete this.c[a];this.s()};k.qd=function(){return this.get(vh)};k.xi=function(a){this.set(vh,a)};
k.Yf=function(a){var b=void 0!==a?a:[],c=b.length;this.qd().forEach(function(a){a.Yf(b)});a=th(this);var d;for(d=b.length;c<d;c++){var e=b[c];e.opacity*=a.opacity;e.visible=e.visible&&a.visible;e.maxResolution=Math.min(e.maxResolution,a.maxResolution);e.minResolution=Math.max(e.minResolution,a.minResolution);void 0!==a.extent&&(e.extent=void 0!==e.extent?pb(e.extent,a.extent):a.extent)}return b};k.$f=function(){return"ready"};var vh="layers";function wh(a){var b=tb({},a);delete b.source;sh.call(this,b);this.v=this.l=this.o=null;a.map&&this.setMap(a.map);y(this,Vc("source"),this.Ul,this);this.Wc(a.source?a.source:null)}v(wh,sh);function xh(a,b){return a.visible&&b>=a.minResolution&&b<a.maxResolution}k=wh.prototype;k.Yf=function(a){a=a?a:[];a.push(th(this));return a};k.ha=function(){return this.get("source")||null};k.$f=function(){var a=this.ha();return a?a.getState():"undefined"};k.Tn=function(){this.s()};
k.Ul=function(){this.v&&(Ec(this.v),this.v=null);var a=this.ha();a&&(this.v=y(a,"change",this.Tn,this));this.s()};k.setMap=function(a){this.o&&(Ec(this.o),this.o=null);a||this.s();this.l&&(Ec(this.l),this.l=null);a&&(this.o=y(a,"precompose",function(a){var b=th(this);b.Je=!1;b.zIndex=Infinity;a.frameState.layerStatesArray.push(b);a.frameState.layerStates[w(this)]=b},this),this.l=y(this,"change",a.render,a),this.s())};k.Wc=function(a){this.set("source",a)};function yh(){this.b={};this.a=0}yh.prototype.clear=function(){this.b={};this.a=0};yh.prototype.get=function(a,b,c){a=b+":"+a+":"+(c?gd(c):"null");return a in this.b?this.b[a]:null};yh.prototype.set=function(a,b,c,d){this.b[b+":"+a+":"+(c?gd(c):"null")]=d;++this.a};var zh=new yh;var Ah=Array(6);function Bh(){return[1,0,0,1,0,0]}function Ch(a){return Dh(a,1,0,0,1,0,0)}function Eh(a,b){var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5],l=b[0],m=b[1],n=b[2],p=b[3],q=b[4];b=b[5];a[0]=c*l+e*m;a[1]=d*l+f*m;a[2]=c*n+e*p;a[3]=d*n+f*p;a[4]=c*q+e*b+g;a[5]=d*q+f*b+h;return a}function Dh(a,b,c,d,e,f,g){a[0]=b;a[1]=c;a[2]=d;a[3]=e;a[4]=f;a[5]=g;return a}function Fh(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];a[4]=b[4];a[5]=b[5];return a}
function Gh(a,b){var c=b[0],d=b[1];b[0]=a[0]*c+a[2]*d+a[4];b[1]=a[1]*c+a[3]*d+a[5];return b}function Hh(a,b){var c=Math.cos(b);b=Math.sin(b);Eh(a,Dh(Ah,c,b,-b,c,0,0))}function Ih(a,b,c){return Eh(a,Dh(Ah,b,0,0,c,0,0))}function Jh(a,b,c){Eh(a,Dh(Ah,1,0,0,1,b,c))}function Kh(a,b,c,d,e,f,g,h){var l=Math.sin(f);f=Math.cos(f);a[0]=d*f;a[1]=e*l;a[2]=-d*l;a[3]=e*f;a[4]=g*d*f-h*d*l+b;a[5]=g*e*l+h*e*f+c;return a}
function Lh(a){var b=a[0]*a[3]-a[1]*a[2];xa(!!b,32);var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5];a[0]=f/b;a[1]=-d/b;a[2]=-e/b;a[3]=c/b;a[4]=(e*h-f*g)/b;a[5]=-(c*h-d*g)/b;return a};function Mh(a,b){this.o=b;this.c={};this.v={}}v(Mh,Mc);function Nh(a){var b=a.viewState,c=a.coordinateToPixelTransform,d=a.pixelToCoordinateTransform;Kh(c,a.size[0]/2,a.size[1]/2,1/b.resolution,-1/b.resolution,-b.rotation,-b.center[0],-b.center[1]);Lh(Fh(d,c))}k=Mh.prototype;k.ka=function(){for(var a in this.c)Nc(this.c[a])};function Oh(){if(32<zh.a){var a=0,b;for(b in zh.b){var c=zh.b[b];a++&3||Rc(c)||(delete zh.b[b],--zh.a)}}}
k.Ea=function(a,b,c,d,e,f,g){function h(a,c){var f=w(a).toString(),g=b.layerStates[w(c)].Je;if(!(f in b.skippedFeatureUids)||g)return d.call(e,a,g?c:null)}var l,m=b.viewState,n=m.resolution,p=m.projection,m=a;if(p.i){var p=p.G(),q=lb(p),r=a[0];if(r<p[0]||r>p[2])m=[r+q*Math.ceil((p[0]-r)/q),a[1]]}p=b.layerStatesArray;for(q=p.length-1;0<=q;--q){var u=p[q],r=u.layer;if(xh(u,n)&&f.call(g,r)&&(u=Ph(this,r),r.ha()&&(l=u.Ea(r.ha().u?m:a,b,c,h,e)),l))return l}};
k.Ei=function(a,b,c,d,e){return void 0!==this.Ea(a,b,c,mf,this,d,e)};function Ph(a,b){var c=w(b).toString();if(c in a.c)return a.c[c];b=b.Fd(a);a.c[c]=b;a.v[c]=y(b,"change",a.Fl,a);return b}k.Fl=function(){this.o.render()};k.Jg=ua;k.Rp=function(a,b){for(var c in this.c)if(!(b&&c in b.layerStates)){a=c;var d=this.c[a];delete this.c[a];Ec(this.v[a]);delete this.v[a];Nc(d)}};function Qh(a,b){for(var c in a.c)if(!(c in b.layerStates)){b.postRenderFunctions.push(a.Rp.bind(a));break}}
function ra(a,b){return a.zIndex-b.zIndex};function Rh(a,b,c,d,e){Oc.call(this,a);this.vectorContext=b;this.frameState=c;this.context=d;this.glContext=e}v(Rh,Oc);var Sh=[0,0,0,1],Th=[],Uh=[0,0,0,1];function Vh(a,b,c,d){b&&(a.translate(c,d),a.rotate(b),a.translate(-c,-d))};function Wh(){}k=Wh.prototype;k.zb=function(){};k.rd=function(){};k.Zb=function(){};k.te=function(){};k.ue=function(){};k.mc=function(){};k.nc=function(){};k.oc=function(){};k.pc=function(){};k.qc=function(){};k.rc=function(){};k.yc=function(){};k.Ma=function(){};k.Ub=function(){};k.Cb=function(){};function Xh(a,b,c,d,e){this.i=a;this.u=b;this.c=c;this.S=d;this.Yb=e;this.M=this.b=this.a=this.Ua=this.R=this.I=null;this.na=this.T=this.l=this.B=this.C=this.D=0;this.fa=!1;this.f=this.fb=0;this.pa=!1;this.oa=0;this.Ia="";this.va=this.Jb=0;this.Sa=!1;this.j=this.$a=0;this.ra=this.o=this.g=null;this.v=[];this.xb=Bh()}v(Xh,Wh);
function Yh(a,b,c){if(a.M){b=pf(b,0,c,2,a.S,a.v);c=a.i;var d=a.xb,e=c.globalAlpha;1!=a.l&&(c.globalAlpha=e*a.l);var f=a.fb;a.fa&&(f+=a.Yb);var g;var h=0;for(g=b.length;h<g;h+=2){var l=b[h]-a.D,m=b[h+1]-a.C;a.pa&&(l=Math.round(l),m=Math.round(m));if(f||1!=a.f){var n=l+a.D,p=m+a.C;Kh(d,n,p,a.f,a.f,f,-n,-p);c.setTransform.apply(c,d)}c.drawImage(a.M,a.T,a.na,a.oa,a.B,l,m,a.oa,a.B)}(f||1!=a.f)&&c.setTransform(1,0,0,1,0,0);1!=a.l&&(c.globalAlpha=e)}}
function Zh(a,b,c,d){var e=0;if(a.ra&&""!==a.Ia){a.g&&$h(a,a.g);a.o&&ai(a,a.o);var f=a.ra,g=a.i,h=a.Ua;h?(h.font!=f.font&&(h.font=g.font=f.font),h.textAlign!=f.textAlign&&(h.textAlign=g.textAlign=f.textAlign),h.textBaseline!=f.textBaseline&&(h.textBaseline=g.textBaseline=f.textBaseline)):(g.font=f.font,g.textAlign=f.textAlign,g.textBaseline=f.textBaseline,a.Ua={font:f.font,textAlign:f.textAlign,textBaseline:f.textBaseline});b=pf(b,e,c,d,a.S,a.v);f=a.i;g=a.$a;for(a.Sa&&(g+=a.Yb);e<c;e+=d){var h=b[e]+
a.Jb,l=b[e+1]+a.va;if(g||1!=a.j){var m=Kh(a.xb,h,l,a.j,a.j,g,-h,-l);f.setTransform.apply(f,m)}a.o&&f.strokeText(a.Ia,h,l);a.g&&f.fillText(a.Ia,h,l)}(g||1!=a.j)&&f.setTransform(1,0,0,1,0,0)}}function bi(a,b,c,d,e,f){var g=a.i;a=pf(b,c,d,e,a.S,a.v);g.moveTo(a[0],a[1]);b=a.length;f&&(b-=2);for(c=2;c<b;c+=2)g.lineTo(a[c],a[c+1]);f&&g.closePath();return d}function ci(a,b,c,d,e){var f;var g=0;for(f=d.length;g<f;++g)c=bi(a,b,c,d[g],e,!0);return c}k=Xh.prototype;
k.Zb=function(a){if(qb(this.c,a.G())){if(this.a||this.b){this.a&&$h(this,this.a);this.b&&ai(this,this.b);var b=this.S;var c=this.v,d=a.ga();b=d?pf(d,0,d.length,a.qa(),b,c):null;c=b[2]-b[0];d=b[3]-b[1];c=Math.sqrt(c*c+d*d);d=this.i;d.beginPath();d.arc(b[0],b[1],c,0,2*Math.PI);this.a&&d.fill();this.b&&d.stroke()}""!==this.Ia&&Zh(this,a.wa(),2,2)}};k.rd=function(a){this.Ma(a.Fa(),a.Ga());this.Ub(a.Y());this.Cb(a.Na())};
k.zb=function(a){switch(a.U()){case "Point":this.qc(a);break;case "LineString":this.mc(a);break;case "Polygon":this.rc(a);break;case "MultiPoint":this.oc(a);break;case "MultiLineString":this.nc(a);break;case "MultiPolygon":this.pc(a);break;case "GeometryCollection":this.ue(a);break;case "Circle":this.Zb(a)}};k.te=function(a,b){(a=(0,b.Za)(a))&&qb(this.c,a.G())&&(this.rd(b),this.zb(a))};k.ue=function(a){a=a.a;var b;var c=0;for(b=a.length;c<b;++c)this.zb(a[c])};
k.qc=function(a){var b=a.ga();a=a.qa();this.M&&Yh(this,b,b.length);""!==this.Ia&&Zh(this,b,b.length,a)};k.oc=function(a){var b=a.ga();a=a.qa();this.M&&Yh(this,b,b.length);""!==this.Ia&&Zh(this,b,b.length,a)};k.mc=function(a){if(qb(this.c,a.G())){if(this.b){ai(this,this.b);var b=this.i,c=a.ga();b.beginPath();bi(this,c,0,c.length,a.qa(),!1);b.stroke()}""!==this.Ia&&(a=di(a),Zh(this,a,2,2))}};
k.nc=function(a){var b=a.G();if(qb(this.c,b)){if(this.b){ai(this,this.b);var b=this.i,c=a.ga(),d=0,e=a.Bb(),f=a.qa();b.beginPath();var g;var h=0;for(g=e.length;h<g;++h)d=bi(this,c,d,e[h],f,!1);b.stroke()}""!==this.Ia&&(a=ei(a),Zh(this,a,a.length,2))}};k.rc=function(a){if(qb(this.c,a.G())){if(this.b||this.a){this.a&&$h(this,this.a);this.b&&ai(this,this.b);var b=this.i;b.beginPath();ci(this,a.ec(),0,a.Bb(),a.qa());this.a&&b.fill();this.b&&b.stroke()}""!==this.Ia&&(a=Wf(a),Zh(this,a,2,2))}};
k.pc=function(a){if(qb(this.c,a.G())){if(this.b||this.a){this.a&&$h(this,this.a);this.b&&ai(this,this.b);var b=this.i,c=fi(a),d=0,e=a.c,f=a.qa(),g;b.beginPath();var h=0;for(g=e.length;h<g;++h)d=ci(this,c,d,e[h],f);this.a&&b.fill();this.b&&b.stroke()}""!==this.Ia&&(a=gi(a),Zh(this,a,a.length,2))}};function $h(a,b){var c=a.i,d=a.I;d?d.fillStyle!=b.fillStyle&&(d.fillStyle=c.fillStyle=b.fillStyle):(c.fillStyle=b.fillStyle,a.I={fillStyle:b.fillStyle})}
function ai(a,b){var c=a.i,d=a.R;d?(d.lineCap!=b.lineCap&&(d.lineCap=c.lineCap=b.lineCap),Td&&!pa(d.lineDash,b.lineDash)&&c.setLineDash(d.lineDash=b.lineDash),d.lineJoin!=b.lineJoin&&(d.lineJoin=c.lineJoin=b.lineJoin),d.lineWidth!=b.lineWidth&&(d.lineWidth=c.lineWidth=b.lineWidth),d.miterLimit!=b.miterLimit&&(d.miterLimit=c.miterLimit=b.miterLimit),d.strokeStyle!=b.strokeStyle&&(d.strokeStyle=c.strokeStyle=b.strokeStyle)):(c.lineCap=b.lineCap,Td&&c.setLineDash(b.lineDash),c.lineJoin=b.lineJoin,c.lineWidth=
b.lineWidth,c.miterLimit=b.miterLimit,c.strokeStyle=b.strokeStyle,a.R={lineCap:b.lineCap,lineDash:b.lineDash,lineJoin:b.lineJoin,lineWidth:b.lineWidth,miterLimit:b.miterLimit,strokeStyle:b.strokeStyle})}
k.Ma=function(a,b){a?(a=a.b,this.a={fillStyle:id(a?a:Sh)}):this.a=null;if(b){a=b.a;var c=b.f,d=b.i,e=b.g,f=b.j,g=b.c;b=b.o;this.b={lineCap:void 0!==c?c:"round",lineDash:d?d:Th,lineDashOffset:e?e:0,lineJoin:void 0!==f?f:"round",lineWidth:this.u*(void 0!==g?g:1),miterLimit:void 0!==b?b:10,strokeStyle:id(a?a:Uh)}}else this.b=null};
k.Ub=function(a){if(a){var b=a.Hc(),c=a.Y(1),d=a.Oc(),e=a.ic();this.D=b[0];this.C=b[1];this.B=e[1];this.M=c;this.l=a.f;this.T=d[0];this.na=d[1];this.fa=a.l;this.fb=a.g;this.f=a.a;this.pa=a.v;this.oa=e[0]}else this.M=null};
k.Cb=function(a){if(a){var b=a.Fa();b?(b=b.b,this.g={fillStyle:id(b?b:Sh)}):this.g=null;var c=a.Ga();if(c){var b=c.a,d=c.f,e=c.i,f=c.g,g=c.j,h=c.c,c=c.o;this.o={lineCap:void 0!==d?d:"round",lineDash:e?e:Th,lineDashOffset:f?f:0,lineJoin:void 0!==g?g:"round",lineWidth:void 0!==h?h:1,miterLimit:void 0!==c?c:10,strokeStyle:id(b?b:Uh)}}else this.o=null;var b=a.a,d=a.i,e=a.c,f=a.o,g=a.f,h=a.b,c=a.Na(),l=a.g;a=a.j;this.ra={font:void 0!==b?b:"10px sans-serif",textAlign:void 0!==l?l:"center",textBaseline:void 0!==
a?a:"middle"};this.Ia=void 0!==c?c:"";this.Jb=void 0!==d?this.u*d:0;this.va=void 0!==e?this.u*e:0;this.Sa=void 0!==f?f:!1;this.$a=void 0!==g?g:0;this.j=this.u*(void 0!==h?h:1)}else this.Ia=""};function hi(a,b){Mh.call(this,0,b);this.i=jd();this.b=this.i.canvas;this.b.style.width="100%";this.b.style.height="100%";this.b.style.display="block";this.b.className="ol-unselectable";a.insertBefore(this.b,a.childNodes[0]||null);this.a=!0;this.f=Bh()}v(hi,Mh);
function ii(a,b,c){var d=a.o,e=a.i;if(Rc(d,b)){var f=c.extent,g=c.pixelRatio,h=c.viewState.rotation,l=c.viewState,m=c.pixelRatio/l.resolution;a=Kh(a.f,a.b.width/2,a.b.height/2,m,-m,-l.rotation,-l.center[0],-l.center[1]);d.b(new Rh(b,new Xh(e,g,f,a,h),c,e,null))}}hi.prototype.U=function(){return"canvas"};
hi.prototype.Jg=function(a){if(a){var b=this.i,c=a.pixelRatio,d=Math.round(a.size[0]*c),e=Math.round(a.size[1]*c);this.b.width!=d||this.b.height!=e?(this.b.width=d,this.b.height=e):b.clearRect(0,0,d,e);c=a.viewState.rotation;Nh(a);ii(this,"precompose",a);var f=a.layerStatesArray;qa(f);c&&(b.save(),Vh(b,c,d/2,e/2));var d=a.viewState.resolution,g,e=0;for(g=f.length;e<g;++e){var h=f[e];var l=h.layer;l=Ph(this,l);xh(h,d)&&"ready"==h.yj&&l.sd(a,h)&&l.S(a,h,b)}c&&b.restore();ii(this,"postcompose",a);this.a||
(this.b.style.display="",this.a=!0);Qh(this,a);a.postRenderFunctions.push(Oh)}else this.a&&(this.b.style.display="none",this.a=!1)};hi.prototype.Di=function(a,b,c,d,e,f){var g=b.viewState.resolution,h=b.layerStatesArray,l=h.length;a=Gh(b.pixelToCoordinateTransform,a.slice());for(--l;0<=l;--l){var m=h[l];var n=m.layer;if(xh(m,g)&&e.call(f,n)&&(m=Ph(this,n).u(a,b,c,d)))return m}};var ji=["Polygon","Circle","LineString","Image","Text"];function ki(){};function li(a){this.b=a};function mi(a){this.b=a}v(mi,li);mi.prototype.U=function(){return 35632};function ni(a){this.b=a}v(ni,li);ni.prototype.U=function(){return 35633};function oi(){this.b="precision mediump float;varying vec2 a;varying vec2 b;varying float c;varying float d;uniform float m;uniform vec4 n;uniform vec4 o;uniform vec2 p;void main(void){vec2 windowCenter=vec2((a.x+1.0)/2.0*p.x*d,(a.y+1.0)/2.0*p.y*d);vec2 windowOffset=vec2((b.x+1.0)/2.0*p.x*d,(b.y+1.0)/2.0*p.y*d);float radius=length(windowCenter-windowOffset);float dist=length(windowCenter-gl_FragCoord.xy);if(dist>radius+c){if(o.a==0.0){gl_FragColor=n;}else{gl_FragColor=o;}gl_FragColor.a=gl_FragColor.a-(dist-(radius+c));}else if(n.a==0.0){gl_FragColor=o;if(dist<radius-c){gl_FragColor.a=gl_FragColor.a-(radius-c-dist);}} else{gl_FragColor=n;float strokeDist=radius-c;float antialias=2.0*d;if(dist>strokeDist){gl_FragColor=o;}else if(dist>=strokeDist-antialias){float step=smoothstep(strokeDist-antialias,strokeDist,dist);gl_FragColor=mix(n,o,step);}} gl_FragColor.a=gl_FragColor.a*m;if(gl_FragColor.a<=0.0){discard;}}"}
v(oi,mi);var pi=new oi;
function qi(){this.b="varying vec2 a;varying vec2 b;varying float c;varying float d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;void main(void){mat4 offsetMatrix=i*j;a=vec4(h*vec4(e,0.0,1.0)).xy;d=l;float lineWidth=k*l;c=lineWidth/2.0;if(lineWidth==0.0){lineWidth=2.0*l;}vec2 offset;float radius=g+3.0*l;if(f==0.0){offset=vec2(-1.0,1.0);}else if(f==1.0){offset=vec2(-1.0,-1.0);}else if(f==2.0){offset=vec2(1.0,-1.0);}else{offset=vec2(1.0,1.0);}gl_Position=h*vec4(e+offset*radius,0.0,1.0)+offsetMatrix*vec4(offset*lineWidth,0.0,0.0);b=vec4(h*vec4(e.x+g,e.y,0.0,1.0)).xy;if(distance(a,b)>20000.0){gl_Position=vec4(a,0.0,1.0);}}"}
v(qi,ni);var ri=new qi;function si(a,b){this.B=a.getUniformLocation(b,"n");this.oa=a.getUniformLocation(b,"k");this.c=a.getUniformLocation(b,"j");this.f=a.getUniformLocation(b,"i");this.a=a.getUniformLocation(b,"m");this.ra=a.getUniformLocation(b,"l");this.i=a.getUniformLocation(b,"h");this.I=a.getUniformLocation(b,"p");this.R=a.getUniformLocation(b,"o");this.j=a.getAttribLocation(b,"f");this.b=a.getAttribLocation(b,"e");this.S=a.getAttribLocation(b,"g")};function ti(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function ui(a,b){a[0]=b[0];a[1]=b[1];a[4]=b[2];a[5]=b[3];a[12]=b[4];a[13]=b[5];return a};function vi(a,b){this.origin=nb(b);this.xb=Bh();this.Sa=Bh();this.$a=Bh();this.Jb=ti();this.b=[];this.o=null;this.i=[];this.f=[];this.a=[];this.l=null;this.g=void 0}v(vi,Wh);
vi.prototype.La=function(a,b,c,d,e,f,g,h,l,m,n){var p=a.b;if(this.g){var q=p.isEnabled(p.STENCIL_TEST);var r=p.getParameter(p.STENCIL_FUNC);var u=p.getParameter(p.STENCIL_VALUE_MASK);var x=p.getParameter(p.STENCIL_REF);var B=p.getParameter(p.STENCIL_WRITEMASK);var E=p.getParameter(p.STENCIL_FAIL);var A=p.getParameter(p.STENCIL_PASS_DEPTH_PASS);var L=p.getParameter(p.STENCIL_PASS_DEPTH_FAIL);p.enable(p.STENCIL_TEST);p.clear(p.STENCIL_BUFFER_BIT);p.stencilMask(255);p.stencilFunc(p.ALWAYS,1,255);p.stencilOp(p.KEEP,
p.KEEP,p.REPLACE);this.g.La(a,b,c,d,e,f,g,h,l,m,n);p.stencilMask(0);p.stencilFunc(p.NOTEQUAL,1,255)}wi(a,34962,this.l);wi(a,34963,this.o);f=this.rf(p,a,e,f);var oa=Ch(this.xb);Ih(oa,2/(c*e[0]),2/(c*e[1]));Hh(oa,-d);Jh(oa,-(b[0]-this.origin[0]),-(b[1]-this.origin[1]));b=Ch(this.$a);Ih(b,2/e[0],2/e[1]);e=Ch(this.Sa);d&&Hh(e,-d);p.uniformMatrix4fv(f.i,!1,ui(this.Jb,oa));p.uniformMatrix4fv(f.f,!1,ui(this.Jb,b));p.uniformMatrix4fv(f.c,!1,ui(this.Jb,e));p.uniform1f(f.a,g);if(l){m?a=this.ve(p,a,h,l,n):(p.clear(p.COLOR_BUFFER_BIT|
p.DEPTH_BUFFER_BIT),this.Od(p,a,h,!0),a=(a=l(null))?a:void 0);var ha=a}else this.Od(p,a,h,!1);this.sf(p,f);this.g&&(q||p.disable(p.STENCIL_TEST),p.clear(p.STENCIL_BUFFER_BIT),p.stencilFunc(r,x,u),p.stencilMask(B),p.stencilOp(E,L,A));return ha};function xi(a,b,c,d){a.drawElements(4,d-c,b.g?5125:5123,c*(b.g?4:2))};var yi=[0,0,0,1],zi=[],Ai=[0,0,0,1];function Bi(a,b,c,d,e,f){a=(c-a)*(f-b)-(e-a)*(d-b);return a<=Ci&&a>=-Ci?void 0:0<a}var Ci=Number.EPSILON||2.220446049250313E-16;function Di(a){this.b=void 0!==a?a:[];this.a=Ei}var Ei=35044;function Fi(a,b){vi.call(this,0,b);this.v=null;this.j=[];this.u=[];this.S=0;this.c={fillColor:null,strokeColor:null,lineDash:null,lineDashOffset:void 0,lineWidth:void 0,s:!1}}v(Fi,vi);k=Fi.prototype;
k.Zb=function(a,b){var c=a.pd(),d=a.qa();if(c){this.i.push(this.b.length);this.f.push(b);this.c.s&&(this.u.push(this.b.length),this.c.s=!1);this.S=c;a=a.ga();a=qf(a,0,2,d,-this.origin[0],-this.origin[1]);b=this.a.length;var c=this.b.length,e=b/4,f;for(f=0;2>f;f+=d)this.a[b++]=a[f],this.a[b++]=a[f+1],this.a[b++]=0,this.a[b++]=this.S,this.a[b++]=a[f],this.a[b++]=a[f+1],this.a[b++]=1,this.a[b++]=this.S,this.a[b++]=a[f],this.a[b++]=a[f+1],this.a[b++]=2,this.a[b++]=this.S,this.a[b++]=a[f],this.a[b++]=
a[f+1],this.a[b++]=3,this.a[b++]=this.S,this.b[c++]=e,this.b[c++]=e+1,this.b[c++]=e+2,this.b[c++]=e+2,this.b[c++]=e+3,this.b[c++]=e,e+=4}else this.c.s&&(this.j.pop(),this.j.length&&(d=this.j[this.j.length-1],this.c.fillColor=d[0],this.c.strokeColor=d[1],this.c.lineWidth=d[2],this.c.s=!1))};k.Db=function(){this.l=new Di(this.a);this.o=new Di(this.b);this.i.push(this.b.length);!this.u.length&&0<this.j.length&&(this.j=[]);this.b=this.a=null};
k.Eb=function(a){var b=this.l,c=this.o;return function(){Gi(a,b);Gi(a,c)}};k.rf=function(a,b,c,d){var e=Hi(b,pi,ri);if(this.v)var f=this.v;else this.v=f=new si(a,e);b.Qc(e);a.enableVertexAttribArray(f.b);a.vertexAttribPointer(f.b,2,5126,!1,16,0);a.enableVertexAttribArray(f.j);a.vertexAttribPointer(f.j,1,5126,!1,16,8);a.enableVertexAttribArray(f.S);a.vertexAttribPointer(f.S,1,5126,!1,16,12);a.uniform2fv(f.I,c);a.uniform1f(f.ra,d);return f};
k.sf=function(a,b){a.disableVertexAttribArray(b.b);a.disableVertexAttribArray(b.j);a.disableVertexAttribArray(b.S)};
k.Od=function(a,b,c){if(wb(c)){var d=this.i[this.i.length-1];for(c=this.u.length-1;0<=c;--c){var e=this.u[c];var f=this.j[c];a.uniform4fv(this.v.B,f[0]);Ii(this,a,f[1],f[2]);xi(a,b,e,d);d=e}}else{var g=this.i.length-2;f=d=this.i[g+1];for(e=this.u.length-1;0<=e;--e){var h=this.j[e];a.uniform4fv(this.v.B,h[0]);Ii(this,a,h[1],h[2]);for(h=this.u[e];0<=g&&this.i[g]>=h;){var l=this.i[g];var m=this.f[g];m=w(m).toString();c[m]&&(d!==f&&xi(a,b,d,f),f=l);g--;d=l}d!==f&&xi(a,b,d,f);d=f=h}}};
k.ve=function(a,b,c,d,e){var f,g;var h=this.i.length-2;var l=this.i[h+1];for(f=this.u.length-1;0<=f;--f){var m=this.j[f];a.uniform4fv(this.v.B,m[0]);Ii(this,a,m[1],m[2]);for(g=this.u[f];0<=h&&this.i[h]>=g;){m=this.i[h];var n=this.f[h];var p=w(n).toString();if(void 0===c[p]&&n.V()&&(void 0===e||qb(e,n.V().G()))&&(a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),xi(a,b,m,l),l=d(n)))return l;h--;l=m}}};function Ii(a,b,c,d){b.uniform4fv(a.v.R,c);b.uniform1f(a.v.oa,d)}
k.Ma=function(a,b){if(b){var c=b.i;this.c.lineDash=c?c:zi;c=b.g;this.c.lineDashOffset=c?c:0;c=b.a;c instanceof CanvasGradient||c instanceof CanvasPattern?c=Ai:c=ed(c).map(function(a,b){return 3!=b?a/255:a})||Ai;b=b.c;b=void 0!==b?b:1}else c=[0,0,0,0],b=0;a=a?a.b:[0,0,0,0];a instanceof CanvasGradient||a instanceof CanvasPattern?a=yi:a=ed(a).map(function(a,b){return 3!=b?a/255:a})||yi;this.c.strokeColor&&pa(this.c.strokeColor,c)&&this.c.fillColor&&pa(this.c.fillColor,a)&&this.c.lineWidth===b||(this.c.s=
!0,this.c.fillColor=a,this.c.strokeColor=c,this.c.lineWidth=b,this.j.push([a,c,b]))};function Ji(){this.b="precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"}v(Ji,mi);var Ki=new Ji;
function Li(){this.b="varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.0,0.0);gl_Position=h*vec4(c,0.0,1.0)+offsets;a=d;b=f;}"}v(Li,ni);var Mi=new Li;
function Ni(a,b){this.c=a.getUniformLocation(b,"j");this.f=a.getUniformLocation(b,"i");this.a=a.getUniformLocation(b,"k");this.i=a.getUniformLocation(b,"h");this.v=a.getAttribLocation(b,"e");this.u=a.getAttribLocation(b,"f");this.b=a.getAttribLocation(b,"c");this.D=a.getAttribLocation(b,"g");this.C=a.getAttribLocation(b,"d")};function Oi(a,b){this.j=a;this.b=b;this.a={};this.c={};this.i={};this.l=this.v=this.f=this.o=null;(this.g=ja(fa,"OES_element_index_uint"))&&b.getExtension("OES_element_index_uint");y(this.j,"webglcontextlost",this.Xo,this);y(this.j,"webglcontextrestored",this.Yo,this)}v(Oi,Mc);
function wi(a,b,c){var d=a.b,e=c.b,f=String(w(c));if(f in a.a)d.bindBuffer(b,a.a[f].buffer);else{var g=d.createBuffer();d.bindBuffer(b,g);var h;34962==b?h=new Float32Array(e):34963==b&&(h=a.g?new Uint32Array(e):new Uint16Array(e));d.bufferData(b,h,c.a);a.a[f]={lc:c,buffer:g}}}function Gi(a,b){var c=a.b;b=String(w(b));var d=a.a[b];c.isContextLost()||c.deleteBuffer(d.buffer);delete a.a[b]}k=Oi.prototype;
k.ka=function(){Lc(this.j);var a=this.b;if(!a.isContextLost()){for(var b in this.a)a.deleteBuffer(this.a[b].buffer);for(b in this.i)a.deleteProgram(this.i[b]);for(b in this.c)a.deleteShader(this.c[b]);a.deleteFramebuffer(this.f);a.deleteRenderbuffer(this.l);a.deleteTexture(this.v)}};k.Wo=function(){return this.b};
function Pi(a){if(!a.f){var b=a.b,c=b.createFramebuffer();b.bindFramebuffer(b.FRAMEBUFFER,c);var d=Qi(b,1,1),e=b.createRenderbuffer();b.bindRenderbuffer(b.RENDERBUFFER,e);b.renderbufferStorage(b.RENDERBUFFER,b.DEPTH_COMPONENT16,1,1);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,d,0);b.framebufferRenderbuffer(b.FRAMEBUFFER,b.DEPTH_ATTACHMENT,b.RENDERBUFFER,e);b.bindTexture(b.TEXTURE_2D,null);b.bindRenderbuffer(b.RENDERBUFFER,null);b.bindFramebuffer(b.FRAMEBUFFER,null);a.f=c;
a.v=d;a.l=e}return a.f}function Ri(a,b){var c=String(w(b));if(c in a.c)return a.c[c];var d=a.b,e=d.createShader(b.U());d.shaderSource(e,b.b);d.compileShader(e);return a.c[c]=e}function Hi(a,b,c){var d=w(b)+"/"+w(c);if(d in a.i)return a.i[d];var e=a.b,f=e.createProgram();e.attachShader(f,Ri(a,b));e.attachShader(f,Ri(a,c));e.linkProgram(f);return a.i[d]=f}k.Xo=function(){ub(this.a);ub(this.c);ub(this.i);this.l=this.v=this.f=this.o=null};k.Yo=function(){};
k.Qc=function(a){if(a==this.o)return!1;this.b.useProgram(a);this.o=a;return!0};function Si(a,b,c){var d=a.createTexture();a.bindTexture(a.TEXTURE_2D,d);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR);void 0!==b&&a.texParameteri(3553,10242,b);void 0!==c&&a.texParameteri(3553,10243,c);return d}function Qi(a,b,c){var d=Si(a,void 0,void 0);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,b,c,0,a.RGBA,a.UNSIGNED_BYTE,null);return d}
function Ti(a,b){var c=Si(a,33071,33071);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,b);return c};function Ui(a,b){vi.call(this,0,b);this.C=this.D=void 0;this.S=[];this.v=[];this.oa=void 0;this.j=[];this.c=[];this.I=this.ra=void 0;this.B=null;this.fb=this.fa=this.na=this.T=this.Ua=this.R=void 0;this.va=[];this.u=[];this.pa=void 0}v(Ui,vi);k=Ui.prototype;k.Eb=function(a){var b=this.l,c=this.o,d=this.va,e=this.u,f=a.b;return function(){if(!f.isContextLost()){var g;var h=0;for(g=d.length;h<g;++h)f.deleteTexture(d[h]);h=0;for(g=e.length;h<g;++h)f.deleteTexture(e[h])}Gi(a,b);Gi(a,c)}};
function Vi(a,b,c,d){var e=a.D,f=a.C,g=a.oa,h=a.ra,l=a.I,m=a.R,n=a.Ua,p=a.T,q=a.na?1:0,r=-a.fa,u=a.fb,x=a.pa,B=Math.cos(r),r=Math.sin(r),E=a.b.length,A=a.a.length,L;for(L=0;L<c;L+=d){var oa=b[L]-a.origin[0];var ha=b[L+1]-a.origin[1];var ga=A/8;var z=-u*e;var M=-u*(g-f);a.a[A++]=oa;a.a[A++]=ha;a.a[A++]=z*B-M*r;a.a[A++]=z*r+M*B;a.a[A++]=n/l;a.a[A++]=(p+g)/h;a.a[A++]=m;a.a[A++]=q;z=u*(x-e);M=-u*(g-f);a.a[A++]=oa;a.a[A++]=ha;a.a[A++]=z*B-M*r;a.a[A++]=z*r+M*B;a.a[A++]=(n+x)/l;a.a[A++]=(p+g)/h;a.a[A++]=
m;a.a[A++]=q;z=u*(x-e);M=u*f;a.a[A++]=oa;a.a[A++]=ha;a.a[A++]=z*B-M*r;a.a[A++]=z*r+M*B;a.a[A++]=(n+x)/l;a.a[A++]=p/h;a.a[A++]=m;a.a[A++]=q;z=-u*e;M=u*f;a.a[A++]=oa;a.a[A++]=ha;a.a[A++]=z*B-M*r;a.a[A++]=z*r+M*B;a.a[A++]=n/l;a.a[A++]=p/h;a.a[A++]=m;a.a[A++]=q;a.b[E++]=ga;a.b[E++]=ga+1;a.b[E++]=ga+2;a.b[E++]=ga;a.b[E++]=ga+2;a.b[E++]=ga+3}}k.oc=function(a,b){this.i.push(this.b.length);this.f.push(b);b=a.ga();Vi(this,b,b.length,a.qa())};
k.qc=function(a,b){this.i.push(this.b.length);this.f.push(b);b=a.ga();Vi(this,b,b.length,a.qa())};k.Db=function(a){a=a.b;this.S.push(this.b.length);this.v.push(this.b.length);this.l=new Di(this.a);this.o=new Di(this.b);var b={};Wi(this.va,this.j,b,a);Wi(this.u,this.c,b,a);this.oa=this.C=this.D=void 0;this.c=this.j=null;this.I=this.ra=void 0;this.b=null;this.fb=this.fa=this.na=this.T=this.Ua=this.R=void 0;this.a=null;this.pa=void 0};
function Wi(a,b,c,d){var e,f=b.length;for(e=0;e<f;++e){var g=b[e];var h=w(g).toString();h in c?g=c[h]:(g=Ti(d,g),c[h]=g);a[e]=g}}
k.rf=function(a,b){var c=Hi(b,Ki,Mi);if(this.B)var d=this.B;else this.B=d=new Ni(a,c);b.Qc(c);a.enableVertexAttribArray(d.b);a.vertexAttribPointer(d.b,2,5126,!1,32,0);a.enableVertexAttribArray(d.v);a.vertexAttribPointer(d.v,2,5126,!1,32,8);a.enableVertexAttribArray(d.C);a.vertexAttribPointer(d.C,2,5126,!1,32,16);a.enableVertexAttribArray(d.u);a.vertexAttribPointer(d.u,1,5126,!1,32,24);a.enableVertexAttribArray(d.D);a.vertexAttribPointer(d.D,1,5126,!1,32,28);return d};
k.sf=function(a,b){a.disableVertexAttribArray(b.b);a.disableVertexAttribArray(b.v);a.disableVertexAttribArray(b.C);a.disableVertexAttribArray(b.u);a.disableVertexAttribArray(b.D)};
k.Od=function(a,b,c,d){var e=d?this.u:this.va;d=d?this.v:this.S;if(wb(c)){var f;c=0;var g=e.length;for(f=0;c<g;++c){a.bindTexture(3553,e[c]);var h=d[c];xi(a,b,f,h);f=h}}else for(f=g=0,h=e.length;f<h;++f){a.bindTexture(3553,e[f]);for(var l=0<f?d[f-1]:0,m=d[f],n=l;g<this.i.length&&this.i[g]<=m;){var p=w(this.f[g]).toString();void 0!==c[p]?(n!==l&&xi(a,b,n,l),l=n=g===this.i.length-1?m:this.i[g+1]):l=g===this.i.length-1?m:this.i[g+1];g++}n!==l&&xi(a,b,n,l)}};
k.ve=function(a,b,c,d,e){var f,g,h=this.i.length-1;for(f=this.u.length-1;0<=f;--f){a.bindTexture(3553,this.u[f]);var l=0<f?this.v[f-1]:0;for(g=this.v[f];0<=h&&this.i[h]>=l;){var m=this.i[h];var n=this.f[h];var p=w(n).toString();if(void 0===c[p]&&n.V()&&(void 0===e||qb(e,n.V().G()))&&(a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),xi(a,b,m,g),g=d(n)))return g;g=m;h--}}};
k.Ub=function(a){var b=a.Hc(),c=a.Y(1),d=a.ye(),e=a.qg(1),f=a.f,g=a.Oc(),h=a.l,l=a.g,m=a.ic();a=a.a;if(this.j.length){var n=this.j[this.j.length-1];w(n)!=w(c)&&(this.S.push(this.b.length),this.j.push(c))}else this.j.push(c);this.c.length?(n=this.c[this.c.length-1],w(n)!=w(e)&&(this.v.push(this.b.length),this.c.push(e))):this.c.push(e);this.D=b[0];this.C=b[1];this.oa=m[1];this.ra=d[1];this.I=d[0];this.R=f;this.Ua=g[0];this.T=g[1];this.fa=l;this.na=h;this.fb=a;this.pa=m[0]};function Xi(a,b,c){var d=b-c;return a[0]===a[d]&&a[1]===a[d+1]&&3<(b-0)/c?!!vf(a,0,b,c):!1};function Yi(){this.b="precision mediump float;varying float a;varying vec2 b;varying float c;uniform float m;uniform vec4 n;uniform vec2 o;uniform float p;void main(void){if(a>0.0){vec2 windowCoords=vec2((b.x+1.0)/2.0*o.x*p,(b.y+1.0)/2.0*o.y*p);if(length(windowCoords-gl_FragCoord.xy)>c*p){discard;}} gl_FragColor=n;float alpha=n.a*m;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"}v(Yi,mi);var Zi=new Yi;
function $i(){this.b="varying float a;varying vec2 b;varying float c;attribute vec2 d;attribute vec2 e;attribute vec2 f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;bool nearlyEquals(in float value,in float ref){float epsilon=0.000000000001;return value>=ref-epsilon&&value<=ref+epsilon;}void alongNormal(out vec2 offset,in vec2 nextP,in float turnDir,in float direction){vec2 dirVect=nextP-e;vec2 normal=normalize(vec2(-turnDir*dirVect.y,turnDir*dirVect.x));offset=k/2.0*normal*direction;}void miterUp(out vec2 offset,out float round,in bool isRound,in float direction){float halfWidth=k/2.0;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=f-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;round=0.0;if(isRound){round=1.0;}else if(miterLength>l+k){offset=halfWidth*tmpNormal*direction;}} bool miterDown(out vec2 offset,in vec4 projPos,in mat4 offsetMatrix,in float direction){bool degenerate=false;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=d-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));vec2 longOffset,shortOffset,longVertex;vec4 shortProjVertex;float halfWidth=k/2.0;if(length(f-e)>length(d-e)){longOffset=tmpNormal*direction*halfWidth;shortOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=f;shortProjVertex=h*vec4(d,0.0,1.0);}else{shortOffset=tmpNormal*direction*halfWidth;longOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=d;shortProjVertex=h*vec4(f,0.0,1.0);}vec4 p1=h*vec4(longVertex,0.0,1.0)+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p2=projPos+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p3=shortProjVertex+offsetMatrix*vec4(-shortOffset,0.0,0.0);vec4 p4=shortProjVertex+offsetMatrix*vec4(shortOffset,0.0,0.0);float denom=(p4.y-p3.y)*(p2.x-p1.x)-(p4.x-p3.x)*(p2.y-p1.y);float firstU=((p4.x-p3.x)*(p1.y-p3.y)-(p4.y-p3.y)*(p1.x-p3.x))/denom;float secondU=((p2.x-p1.x)*(p1.y-p3.y)-(p2.y-p1.y)*(p1.x-p3.x))/denom;float epsilon=0.000000000001;if(firstU>epsilon&&firstU<1.0-epsilon&&secondU>epsilon&&secondU<1.0-epsilon){shortProjVertex.x=p1.x+firstU*(p2.x-p1.x);shortProjVertex.y=p1.y+firstU*(p2.y-p1.y);offset=shortProjVertex.xy;degenerate=true;}else{float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;}return degenerate;}void squareCap(out vec2 offset,out float round,in bool isRound,in vec2 nextP,in float turnDir,in float direction){round=0.0;vec2 dirVect=e-nextP;vec2 firstNormal=normalize(dirVect);vec2 secondNormal=vec2(turnDir*firstNormal.y*direction,-turnDir*firstNormal.x*direction);vec2 hypotenuse=normalize(firstNormal-secondNormal);vec2 normal=vec2(turnDir*hypotenuse.y*direction,-turnDir*hypotenuse.x*direction);float length=sqrt(c*c*2.0);offset=normal*length;if(isRound){round=1.0;}} void main(void){bool degenerate=false;float direction=float(sign(g));mat4 offsetMatrix=i*j;vec2 offset;vec4 projPos=h*vec4(e,0.0,1.0);bool round=nearlyEquals(mod(g,2.0),0.0);a=0.0;c=k/2.0;b=projPos.xy;if(nearlyEquals(mod(g,3.0),0.0)||nearlyEquals(mod(g,17.0),0.0)){alongNormal(offset,f,1.0,direction);}else if(nearlyEquals(mod(g,5.0),0.0)||nearlyEquals(mod(g,13.0),0.0)){alongNormal(offset,d,-1.0,direction);}else if(nearlyEquals(mod(g,23.0),0.0)){miterUp(offset,a,round,direction);}else if(nearlyEquals(mod(g,19.0),0.0)){degenerate=miterDown(offset,projPos,offsetMatrix,direction);}else if(nearlyEquals(mod(g,7.0),0.0)){squareCap(offset,a,round,f,1.0,direction);}else if(nearlyEquals(mod(g,11.0),0.0)){squareCap(offset,a,round,d,-1.0,direction);}if(!degenerate){vec4 offsets=offsetMatrix*vec4(offset,0.0,0.0);gl_Position=projPos+offsets;}else{gl_Position=vec4(offset,0.0,1.0);}}"}
v($i,ni);var aj=new $i;function bj(a,b){this.B=a.getUniformLocation(b,"n");this.oa=a.getUniformLocation(b,"k");this.R=a.getUniformLocation(b,"l");this.c=a.getUniformLocation(b,"j");this.f=a.getUniformLocation(b,"i");this.a=a.getUniformLocation(b,"m");this.ra=a.getUniformLocation(b,"p");this.i=a.getUniformLocation(b,"h");this.I=a.getUniformLocation(b,"o");this.g=a.getAttribLocation(b,"g");this.o=a.getAttribLocation(b,"d");this.l=a.getAttribLocation(b,"f");this.b=a.getAttribLocation(b,"e")};function cj(a,b){vi.call(this,0,b);this.v=null;this.u=[];this.j=[];this.c={strokeColor:null,lineCap:void 0,lineDash:null,lineDashOffset:void 0,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0,s:!1}}v(cj,vi);
function dj(a,b,c,d){var e,f=a.a.length,g=a.b.length,h="bevel"===a.c.lineJoin?0:"miter"===a.c.lineJoin?1:2,l="butt"===a.c.lineCap?0:"square"===a.c.lineCap?1:2,m=Xi(b,c,d),n=g,p=1;for(e=0;e<c;e+=d){var q=f/7;var r=u;var u=x||[b[e],b[e+1]];if(e)if(e===c-d){if(m)var x=B;else r=r||[0,0],f=ej(a,r,u,[0,0],p*fj*(l||1),f),f=ej(a,r,u,[0,0],-p*fj*(l||1),f),a.b[g++]=q,a.b[g++]=n-1,a.b[g++]=n,a.b[g++]=n,a.b[g++]=q+1,a.b[g++]=q,l&&(f=ej(a,r,u,[0,0],p*gj*l,f),f=ej(a,r,u,[0,0],-p*gj*l,f),a.b[g++]=q+2,a.b[g++]=q,
a.b[g++]=q+1,a.b[g++]=q+1,a.b[g++]=q+3,a.b[g++]=q+2);break}else x=[b[e+d],b[e+d+1]];else{x=[b[e+d],b[e+d+1]];if(c-0===2*d&&pa(u,x))break;if(m){r=[b[c-2*d],b[c-2*d+1]];var B=x}else{l&&(f=ej(a,[0,0],u,x,p*hj*l,f),f=ej(a,[0,0],u,x,-p*hj*l,f),a.b[g++]=q+2,a.b[g++]=q,a.b[g++]=q+1,a.b[g++]=q+1,a.b[g++]=q+3,a.b[g++]=q+2);f=ej(a,[0,0],u,x,p*ij*(l||1),f);f=ej(a,[0,0],u,x,-p*ij*(l||1),f);n=f/7-1;continue}}var E=Bi(r[0],r[1],u[0],u[1],x[0],x[1])?-1:1;f=ej(a,r,u,x,E*jj*(h||1),f);f=ej(a,r,u,x,E*kj*(h||1),f);f=
ej(a,r,u,x,-E*lj*(h||1),f);0<e&&(a.b[g++]=q,a.b[g++]=n-1,a.b[g++]=n,a.b[g++]=q+2,a.b[g++]=q,a.b[g++]=0<p*E?n:n-1);a.b[g++]=q;a.b[g++]=q+2;a.b[g++]=q+1;n=q+2;p=E;h&&(f=ej(a,r,u,x,E*mj*h,f),a.b[g++]=q+1,a.b[g++]=q+3,a.b[g++]=q)}m&&(q=q||f/7,E=Sf([r[0],r[1],u[0],u[1],x[0],x[1]],0,6,2)?1:-1,f=ej(a,r,u,x,E*jj*(h||1),f),ej(a,r,u,x,-E*lj*(h||1),f),a.b[g++]=q,a.b[g++]=n-1,a.b[g++]=n,a.b[g++]=q+1,a.b[g++]=q,a.b[g++]=0<p*E?n:n-1)}
function ej(a,b,c,d,e,f){a.a[f++]=b[0];a.a[f++]=b[1];a.a[f++]=c[0];a.a[f++]=c[1];a.a[f++]=d[0];a.a[f++]=d[1];a.a[f++]=e;return f}function nj(a,b,c,d){c-=b;return c<2*d?!1:c===2*d?!pa([a[b],a[b+1]],[a[b+d],a[b+d+1]]):!0}k=cj.prototype;k.mc=function(a,b){var c=a.ga();a=a.qa();nj(c,0,c.length,a)&&(c=qf(c,0,c.length,a,-this.origin[0],-this.origin[1]),this.c.s&&(this.j.push(this.b.length),this.c.s=!1),this.i.push(this.b.length),this.f.push(b),dj(this,c,c.length,a))};
k.nc=function(a,b){var c=this.b.length,d=a.Bb();d.unshift(0);var e=a.ga();a=a.qa();var f;if(1<d.length){var g=1;for(f=d.length;g<f;++g)if(nj(e,d[g-1],d[g],a)){var h=qf(e,d[g-1],d[g],a,-this.origin[0],-this.origin[1]);dj(this,h,h.length,a)}}this.b.length>c&&(this.i.push(c),this.f.push(b),this.c.s&&(this.j.push(c),this.c.s=!1))};
function oj(a,b,c,d){Xi(b,b.length,d)||(b.push(b[0]),b.push(b[1]));dj(a,b,b.length,d);if(c.length){var e;b=0;for(e=c.length;b<e;++b)Xi(c[b],c[b].length,d)||(c[b].push(c[b][0]),c[b].push(c[b][1])),dj(a,c[b],c[b].length,d)}}function pj(a,b,c){c=void 0===c?a.b.length:c;a.i.push(c);a.f.push(b);a.c.s&&(a.j.push(c),a.c.s=!1)}k.Db=function(){this.l=new Di(this.a);this.o=new Di(this.b);this.i.push(this.b.length);!this.j.length&&0<this.u.length&&(this.u=[]);this.b=this.a=null};
k.Eb=function(a){var b=this.l,c=this.o;return function(){Gi(a,b);Gi(a,c)}};
k.rf=function(a,b,c,d){var e=Hi(b,Zi,aj);if(this.v)var f=this.v;else this.v=f=new bj(a,e);b.Qc(e);a.enableVertexAttribArray(f.o);a.vertexAttribPointer(f.o,2,5126,!1,28,0);a.enableVertexAttribArray(f.b);a.vertexAttribPointer(f.b,2,5126,!1,28,8);a.enableVertexAttribArray(f.l);a.vertexAttribPointer(f.l,2,5126,!1,28,16);a.enableVertexAttribArray(f.g);a.vertexAttribPointer(f.g,1,5126,!1,28,24);a.uniform2fv(f.I,c);a.uniform1f(f.ra,d);return f};
k.sf=function(a,b){a.disableVertexAttribArray(b.o);a.disableVertexAttribArray(b.b);a.disableVertexAttribArray(b.l);a.disableVertexAttribArray(b.g)};
k.Od=function(a,b,c,d){var e=a.getParameter(a.DEPTH_FUNC),f=a.getParameter(a.DEPTH_WRITEMASK);d||(a.enable(a.DEPTH_TEST),a.depthMask(!0),a.depthFunc(a.NOTEQUAL));if(wb(c)){var g=this.i[this.i.length-1];for(c=this.j.length-1;0<=c;--c){var h=this.j[c];var l=this.u[c];qj(this,a,l[0],l[1],l[2]);xi(a,b,h,g);a.clear(a.DEPTH_BUFFER_BIT);g=h}}else{var m=this.i.length-2;l=g=this.i[m+1];for(h=this.j.length-1;0<=h;--h){var n=this.u[h];qj(this,a,n[0],n[1],n[2]);for(n=this.j[h];0<=m&&this.i[m]>=n;){var p=this.i[m];
var q=this.f[m];q=w(q).toString();c[q]&&(g!==l&&(xi(a,b,g,l),a.clear(a.DEPTH_BUFFER_BIT)),l=p);m--;g=p}g!==l&&(xi(a,b,g,l),a.clear(a.DEPTH_BUFFER_BIT));g=l=n}}d||(a.disable(a.DEPTH_TEST),a.clear(a.DEPTH_BUFFER_BIT),a.depthMask(f),a.depthFunc(e))};
k.ve=function(a,b,c,d,e){var f,g;var h=this.i.length-2;var l=this.i[h+1];for(f=this.j.length-1;0<=f;--f){var m=this.u[f];qj(this,a,m[0],m[1],m[2]);for(g=this.j[f];0<=h&&this.i[h]>=g;){m=this.i[h];var n=this.f[h];var p=w(n).toString();if(void 0===c[p]&&n.V()&&(void 0===e||qb(e,n.V().G()))&&(a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),xi(a,b,m,l),l=d(n)))return l;h--;l=m}}};function qj(a,b,c,d,e){b.uniform4fv(a.v.B,c);b.uniform1f(a.v.oa,d);b.uniform1f(a.v.R,e)}
k.Ma=function(a,b){a=b.f;this.c.lineCap=void 0!==a?a:"round";a=b.i;this.c.lineDash=a?a:zi;a=b.g;this.c.lineDashOffset=a?a:0;a=b.j;this.c.lineJoin=void 0!==a?a:"round";a=b.a;a instanceof CanvasGradient||a instanceof CanvasPattern?a=Ai:a=ed(a).map(function(a,b){return 3!=b?a/255:a})||Ai;var c=b.c,c=void 0!==c?c:1;b=b.o;b=void 0!==b?b:10;this.c.strokeColor&&pa(this.c.strokeColor,a)&&this.c.lineWidth===c&&this.c.miterLimit===b||(this.c.s=!0,this.c.strokeColor=a,this.c.lineWidth=c,this.c.miterLimit=b,
this.u.push([a,c,b]))};var ij=3,fj=5,hj=7,gj=11,jj=13,kj=17,lj=19,mj=23;function rj(){this.b="precision mediump float;uniform vec4 e;uniform float f;void main(void){gl_FragColor=e;float alpha=e.a*f;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"}v(rj,mi);var sj=new rj;function tj(){this.b="attribute vec2 a;uniform mat4 b;uniform mat4 c;uniform mat4 d;void main(void){gl_Position=b*vec4(a,0.0,1.0);}"}v(tj,ni);var uj=new tj;
function vj(a,b){this.B=a.getUniformLocation(b,"e");this.c=a.getUniformLocation(b,"d");this.f=a.getUniformLocation(b,"c");this.a=a.getUniformLocation(b,"f");this.i=a.getUniformLocation(b,"b");this.b=a.getAttribLocation(b,"a")};function wj(a){a=a||{};this.a=void 0!==a.color?a.color:null;this.f=a.lineCap;this.i=void 0!==a.lineDash?a.lineDash:null;this.g=a.lineDashOffset;this.j=a.lineJoin;this.o=a.miterLimit;this.c=a.width;this.b=void 0}k=wj.prototype;k.clone=function(){var a=this.a;return new wj({color:a&&a.slice?a.slice():a||void 0,lineCap:this.f,lineDash:this.i?this.i.slice():void 0,lineDashOffset:this.g,lineJoin:this.j,miterLimit:this.o,width:this.c})};k.No=function(){return this.a};k.Vk=function(){return this.f};
k.Oo=function(){return this.i};k.Wk=function(){return this.g};k.Xk=function(){return this.j};k.bl=function(){return this.o};k.Po=function(){return this.c};k.Qo=function(a){this.a=a;this.b=void 0};k.aq=function(a){this.f=a;this.b=void 0};k.setLineDash=function(a){this.i=a;this.b=void 0};k.bq=function(a){this.g=a;this.b=void 0};k.cq=function(a){this.j=a;this.b=void 0};k.gq=function(a){this.o=a;this.b=void 0};k.jq=function(a){this.c=a;this.b=void 0};function xj(a){this.b=this.a=this.i=void 0;this.f=void 0===a?!0:a;this.c=0}function yj(a){var b=a.b;if(b){var c=b.next,d=b.ub;c&&(c.ub=d);d&&(d.next=c);a.b=c||d;a.i===a.a?(a.b=void 0,a.i=void 0,a.a=void 0):a.i===b?a.i=a.b:a.a===b&&(a.a=d?a.b.ub:a.b);a.c--}}function zj(a){a.b=a.i;if(a.b)return a.b.data}function Aj(a){if(a.b&&a.b.next)return a.b=a.b.next,a.b.data}function Bj(a){if(a.b&&a.b.next)return a.b.next.data}function Cj(a){if(a.b&&a.b.ub)return a.b=a.b.ub,a.b.data}
function Dj(a){if(a.b&&a.b.ub)return a.b.ub.data}function Ej(a){if(a.b)return a.b.data}xj.prototype.concat=function(a){if(a.b){if(this.b){var b=this.b.next;this.b.next=a.i;a.i.ub=this.b;b.ub=a.a;a.a.next=b;this.c+=a.c}else this.b=a.b,this.i=a.i,this.a=a.a,this.c=a.c;a.b=void 0;a.i=void 0;a.a=void 0;a.c=0}};var Fj={$d:function(){}};
(function(a){function b(a,e,f,g,h){f=f||0;g=g||a.length-1;for(h=h||d;g>f;){if(600<g-f){var l=g-f+1,m=e-f+1,n=Math.log(l),p=.5*Math.exp(2*n/3),n=.5*Math.sqrt(n*p*(l-p)/l)*(0>m-l/2?-1:1);b(a,e,Math.max(f,Math.floor(e-m*p/l+n)),Math.min(g,Math.floor(e+(l-m)*p/l+n)),h)}l=a[e];m=f;p=g;c(a,f,e);for(0<h(a[g],l)&&c(a,f,g);m<p;){c(a,m,p);m++;for(p--;0>h(a[m],l);)m++;for(;0<h(a[p],l);)p--}0===h(a[f],l)?c(a,f,p):(p++,c(a,p,g));p<=e&&(f=p+1);e<=p&&(g=p-1)}}function c(a,b,c){var d=a[b];a[b]=a[c];a[c]=d}function d(a,
b){return a<b?-1:a>b?1:0}function e(a,b){if(!(this instanceof e))return new e(a,b);this.Hf=Math.max(4,a||9);this.fh=Math.max(2,Math.ceil(.4*this.Hf));b&&this.ek(b);this.clear()}function f(a,b){g(a,0,a.children.length,b,a)}function g(a,b,c,d,e){e||(e=u(null));e.ca=Infinity;e.da=Infinity;e.$=-Infinity;e.ia=-Infinity;for(var f;b<c;b++)f=a.children[b],h(e,a.ib?d(f):f);return e}function h(a,b){a.ca=Math.min(a.ca,b.ca);a.da=Math.min(a.da,b.da);a.$=Math.max(a.$,b.$);a.ia=Math.max(a.ia,b.ia)}function l(a,
b){return a.ca-b.ca}function m(a,b){return a.da-b.da}function n(a){return(a.$-a.ca)*(a.ia-a.da)}function p(a){return a.$-a.ca+(a.ia-a.da)}function q(a,b){return a.ca<=b.ca&&a.da<=b.da&&b.$<=a.$&&b.ia<=a.ia}function r(a,b){return b.ca<=a.$&&b.da<=a.ia&&b.$>=a.ca&&b.ia>=a.da}function u(a){return{children:a,height:1,ib:!0,ca:Infinity,da:Infinity,$:-Infinity,ia:-Infinity}}function x(a,b,c,d,e){for(var f=[b,c],g;f.length;)c=f.pop(),b=f.pop(),c-b<=d||(g=b+Math.ceil((c-b)/d/2)*d,B(a,g,b,c,e),f.push(b,g,
g,c))}var B=b;e.prototype={all:function(){return this.$g(this.data,[])},search:function(a){var b=this.data,c=[],d=this.wb;if(!r(a,b))return c;for(var e=[],f,g,h,l;b;){f=0;for(g=b.children.length;f<g;f++)h=b.children[f],l=b.ib?d(h):h,r(a,l)&&(b.ib?c.push(h):q(a,l)?this.$g(h,c):e.push(h));b=e.pop()}return c},load:function(a){if(!a||!a.length)return this;if(a.length<this.fh){for(var b=0,c=a.length;b<c;b++)this.Ca(a[b]);return this}a=this.bh(a.slice(),0,a.length-1,0);this.data.children.length?this.data.height===
a.height?this.hh(this.data,a):(this.data.height<a.height&&(b=this.data,this.data=a,a=b),this.eh(a,this.data.height-a.height-1,!0)):this.data=a;return this},Ca:function(a){a&&this.eh(a,this.data.height-1);return this},clear:function(){this.data=u([]);return this},remove:function(a,b){if(!a)return this;for(var c=this.data,d=this.wb(a),e=[],f=[],g,h,l,m;c||e.length;){c||(c=e.pop(),h=e[e.length-1],g=f.pop(),m=!0);if(c.ib){a:{l=a;var n=c.children,p=b;if(p){for(var r=0;r<n.length;r++)if(p(l,n[r])){l=r;
break a}l=-1}else l=n.indexOf(l)}if(-1!==l){c.children.splice(l,1);e.push(c);this.ck(e);break}}m||c.ib||!q(c,d)?h?(g++,c=h.children[g],m=!1):c=null:(e.push(c),f.push(g),g=0,h=c,c=c.children[0])}return this},wb:function(a){return a},Lf:l,Mf:m,toJSON:function(){return this.data},$g:function(a,b){for(var c=[];a;)a.ib?b.push.apply(b,a.children):c.push.apply(c,a.children),a=c.pop();return b},bh:function(a,b,c,d){var e=c-b+1,g=this.Hf;if(e<=g){var h=u(a.slice(b,c+1));f(h,this.wb);return h}d||(d=Math.ceil(Math.log(e)/
Math.log(g)),g=Math.ceil(e/Math.pow(g,d-1)));h=u([]);h.ib=!1;h.height=d;var e=Math.ceil(e/g),g=e*Math.ceil(Math.sqrt(g)),l;for(x(a,b,c,g,this.Lf);b<=c;b+=g){var m=Math.min(b+g-1,c);x(a,b,m,e,this.Mf);for(l=b;l<=m;l+=e){var n=Math.min(l+e-1,m);h.children.push(this.bh(a,l,n,d-1))}}f(h,this.wb);return h},bk:function(a,b,c,d){for(var e,f,g,h,l,m,p,q;;){d.push(b);if(b.ib||d.length-1===c)break;p=q=Infinity;e=0;for(f=b.children.length;e<f;e++)g=b.children[e],l=n(g),m=(Math.max(g.$,a.$)-Math.min(g.ca,a.ca))*
(Math.max(g.ia,a.ia)-Math.min(g.da,a.da))-l,m<q?(q=m,p=l<p?l:p,h=g):m===q&&l<p&&(p=l,h=g);b=h||b.children[0]}return b},eh:function(a,b,c){var d=this.wb;c=c?a:d(a);var d=[],e=this.bk(c,this.data,b,d);e.children.push(a);for(h(e,c);0<=b;)if(d[b].children.length>this.Hf)this.jk(d,b),b--;else break;this.Zj(c,d,b)},jk:function(a,b){var c=a[b],d=c.children.length,e=this.fh;this.$j(c,e,d);d=this.ak(c,e,d);d=u(c.children.splice(d,c.children.length-d));d.height=c.height;d.ib=c.ib;f(c,this.wb);f(d,this.wb);
b?a[b-1].children.push(d):this.hh(c,d)},hh:function(a,b){this.data=u([a,b]);this.data.height=a.height+1;this.data.ib=!1;f(this.data,this.wb)},ak:function(a,b,c){var d,e;var f=e=Infinity;for(d=b;d<=c-b;d++){var h=g(a,0,d,this.wb);var l=g(a,d,c,this.wb);var m=Math.max(0,Math.min(h.$,l.$)-Math.max(h.ca,l.ca))*Math.max(0,Math.min(h.ia,l.ia)-Math.max(h.da,l.da));h=n(h)+n(l);if(m<f){f=m;var p=d;e=h<e?h:e}else m===f&&h<e&&(e=h,p=d)}return p},$j:function(a,b,c){var d=a.ib?this.Lf:l,e=a.ib?this.Mf:m,f=this.ah(a,
b,c,d);b=this.ah(a,b,c,e);f<b&&a.children.sort(d)},ah:function(a,b,c,d){a.children.sort(d);d=this.wb;var e=g(a,0,b,d),f=g(a,c-b,c,d),l=p(e)+p(f),m;for(m=b;m<c-b;m++){var n=a.children[m];h(e,a.ib?d(n):n);l+=p(e)}for(m=c-b-1;m>=b;m--)n=a.children[m],h(f,a.ib?d(n):n),l+=p(f);return l},Zj:function(a,b,c){for(;0<=c;c--)h(b[c],a)},ck:function(a){for(var b=a.length-1,c;0<=b;b--)0===a[b].children.length?0<b?(c=a[b-1].children,c.splice(c.indexOf(a[b]),1)):this.clear():f(a[b],this.wb)},ek:function(a){var b=
["return a"," - b",";"];this.Lf=new Function("a","b",b.join(a[0]));this.Mf=new Function("a","b",b.join(a[1]));this.wb=new Function("a","return {minX: a"+a[0]+", minY: a"+a[1]+", maxX: a"+a[2]+", maxY: a"+a[3]+"};")}};a["default"]=e})(Fj.$d=Fj.$d||{});Fj.$d=Fj.$d.default;function Gj(a){this.a=Fj.$d(a);this.b={}}k=Gj.prototype;k.Ca=function(a,b){a={ca:a[0],da:a[1],$:a[2],ia:a[3],value:b};this.a.Ca(a);this.b[w(b)]=a};k.load=function(a,b){for(var c=Array(b.length),d=0,e=b.length;d<e;d++){var f=a[d],g=b[d],f={ca:f[0],da:f[1],$:f[2],ia:f[3],value:g};c[d]=f;this.b[w(g)]=f}this.a.load(c)};k.remove=function(a){a=w(a);var b=this.b[a];delete this.b[a];return null!==this.a.remove(b)};function Hj(a,b,c){var d=a.b[w(c)];bb([d.ca,d.da,d.$,d.ia],b)||(a.remove(c),a.Ca(b,c))}
function Ij(a){return a.a.all().map(function(a){return a.value})}function Jj(a,b){return a.a.search({ca:b[0],da:b[1],$:b[2],ia:b[3]}).map(function(a){return a.value})}k.forEach=function(a,b){return Kj(Ij(this),a,b)};function Lj(a,b,c,d){return Kj(Jj(a,b),c,d)}function Kj(a,b,c){for(var d,e=0,f=a.length;e<f&&!(d=b.call(c,a[e]));e++);return d}k.clear=function(){this.a.clear();this.b={}};k.G=function(a){var b=this.a.data;return Xa(b.ca,b.da,b.$,b.ia,a)};
k.concat=function(a){this.a.load(a.a.all());for(var b in a.b)this.b[b|0]=a.b[b|0]};function Mj(a,b){vi.call(this,0,b);this.g=new cj(0,b);this.v=null;this.u=[];this.c=[];this.j={fillColor:null,s:!1}}v(Mj,vi);
function Nj(a,b,c,d){var e=new xj,f=new Gj;b=Oj(a,b,d,e,f,!0);if(c.length){var g,h=[];var l=0;for(g=c.length;l<g;++l){var m={list:new xj,$:void 0,Mg:new Gj};h.push(m);m.$=Oj(a,c[l],d,m.list,m.Mg,!1)}h.sort(function(a,b){return b.$[0]===a.$[0]?a.$[1]-b.$[1]:b.$[0]-a.$[0]});for(l=0;l<h.length;++l){c=h[l].list;g=d=zj(c);do{if(Pj(g,f).length){var n=!0;break}g=Aj(c)}while(d!==g);n||(Qj(c,h[l].Mg,!0),Rj(c,h[l].$[0],e,b[0],f)&&(f.concat(h[l].Mg),Qj(e,f,!1)))}}else Qj(e,f,!1);Sj(a,e,f)}
function Oj(a,b,c,d,e,f){var g,h=a.a.length/2,l,m=[],n=[];if(f===Sf(b,0,b.length,c)){var p=l=Tj(a,b[0],b[1],h++);f=b[0];var q=b[1];var r=c;for(g=b.length;r<g;r+=c){var u=Tj(a,b[r],b[r+1],h++);n.push(Uj(p,u,d));m.push([Math.min(p.x,u.x),Math.min(p.y,u.y),Math.max(p.x,u.x),Math.max(p.y,u.y)]);b[r]>f&&(f=b[r],q=b[r+1]);p=u}}else for(r=b.length-c,p=l=Tj(a,b[r],b[r+1],h++),f=b[r],q=b[r+1],r-=c,g=0;r>=g;r-=c)u=Tj(a,b[r],b[r+1],h++),n.push(Uj(p,u,d)),m.push([Math.min(p.x,u.x),Math.min(p.y,u.y),Math.max(p.x,
u.x),Math.max(p.y,u.y)]),b[r]>f&&(f=b[r],q=b[r+1]),p=u;n.push(Uj(u,l,d));m.push([Math.min(p.x,u.x),Math.min(p.y,u.y),Math.max(p.x,u.x),Math.max(p.y,u.y)]);e.load(m,n);return[f,q]}function Qj(a,b,c){var d=zj(a),e=d,f=Aj(a),g=!1;do{var h=c?Bi(f.W.x,f.W.y,e.W.x,e.W.y,e.aa.x,e.aa.y):Bi(e.aa.x,e.aa.y,e.W.x,e.W.y,f.W.x,f.W.y);void 0===h?(Vj(e,f,a,b),g=!0,f===d&&(d=Bj(a)),f=e,Cj(a)):e.W.Fb!==h&&(e.W.Fb=h,g=!0);e=f;f=Aj(a)}while(e!==d);return g}
function Rj(a,b,c,d,e){for(var f=zj(a);f.W.x!==b;)f=Aj(a);b=f.W;d={x:d,y:b.y,hb:-1};var g=Infinity,h;var l=Pj({aa:b,W:d},e,!0);var m=0;for(h=l.length;m<h;++m){var n=l[m],p=Wj(b,d,n.aa,n.W,!0),q=Math.abs(b.x-p[0]);if(q<g&&void 0!==Bi(b.x,b.y,n.aa.x,n.aa.y,n.W.x,n.W.y)){g=q;var r={x:p[0],y:p[1],hb:-1};f=n}}if(Infinity===g)return!1;l=f.W;if(0<g&&(f=Xj(b,r,f.W,e),f.length))for(r=Infinity,m=0,h=f.length;m<h;++m)if(g=f[m],n=Math.atan2(b.y-g.y,d.x-g.x),n<r||n===r&&g.x<l.x)r=n,l=g;for(f=zj(c);f.W.x!==l.x||
f.W.y!==l.y;)f=Aj(c);d={x:b.x,y:b.y,hb:b.hb,Fb:void 0};m={x:f.W.x,y:f.W.y,hb:f.W.hb,Fb:void 0};Bj(a).aa=d;Uj(b,f.W,a,e);Uj(m,d,a,e);f.W=m;a.f&&a.b&&(a.i=a.b,a.a=a.b.ub);c.concat(a);return!0}
function Sj(a,b,c){for(var d=!1,e=Yj(b,c);3<b.c;)if(e){if(!Zj(a,b,c,e,d)&&!Qj(b,c,d)&&!ak(a,b,c,!0))break}else if(!Zj(a,b,c,e,d)&&!Qj(b,c,d)&&!ak(a,b,c))if(e=Yj(b,c)){var d=b,f=2*d.c,g=Array(f),h=zj(d),l=h,m=0;do g[m++]=l.aa.x,g[m++]=l.aa.y,l=Aj(d);while(l!==h);d=!Sf(g,0,f,2);Qj(b,c,d)}else{e=a;d=b;f=g=zj(d);do{h=Pj(f,c);if(h.length){g=h[0];h=Wj(f.aa,f.W,g.aa,g.W);h=Tj(e,h[0],h[1],e.a.length/2);l=new xj;m=new Gj;Uj(h,f.W,l,m);f.W=h;Hj(c,[Math.min(f.aa.x,h.x),Math.min(f.aa.y,h.y),Math.max(f.aa.x,h.x),
Math.max(f.aa.y,h.y)],f);for(f=Aj(d);f!==g;)Uj(f.aa,f.W,l,m),c.remove(f),yj(d),f=Ej(d);Uj(g.aa,h,l,m);g.aa=h;Hj(c,[Math.min(g.W.x,h.x),Math.min(g.W.y,h.y),Math.max(g.W.x,h.x),Math.max(g.W.y,h.y)],g);Qj(d,c,!1);Sj(e,d,c);Qj(l,m,!1);Sj(e,l,m);break}f=Aj(d)}while(f!==g);break}3===b.c&&(e=a.b.length,a.b[e++]=Dj(b).aa.hb,a.b[e++]=Ej(b).aa.hb,a.b[e++]=Bj(b).aa.hb)}
function Zj(a,b,c,d,e){var f=a.b.length,g=zj(b),h=Dj(b),l=g,m=Aj(b),n=Bj(b),p=!1;do{var q=l.aa;var r=l.W;var u=m.W;if(!1===r.Fb){var x=e?bk(n.W,u,r,q,h.aa):bk(h.aa,q,r,u,n.W);!d&&Pj({aa:q,W:u},c).length||!x||Xj(q,r,u,c,!0).length||!d&&!1!==q.Fb&&!1!==u.Fb&&Sf([h.aa.x,h.aa.y,q.x,q.y,r.x,r.y,u.x,u.y,n.W.x,n.W.y],0,10,2)!==!e||(a.b[f++]=q.hb,a.b[f++]=r.hb,a.b[f++]=u.hb,Vj(l,m,b,c),m===g&&(g=n),p=!0)}h=Dj(b);l=Ej(b);m=Aj(b);n=Bj(b)}while(l!==g&&3<b.c);return p}
function ak(a,b,c,d){var e=zj(b);Aj(b);var f=e,g=Aj(b),h=!1;do{var l=Wj(f.aa,f.W,g.aa,g.W,d);if(l){var h=a.b.length,m=a.a.length/2,n=Cj(b);yj(b);c.remove(n);var p=n===e;d?(l[0]===f.aa.x&&l[1]===f.aa.y?(Cj(b),l=f.aa,g.aa=l,c.remove(f),p=p||f===e):(l=g.W,f.W=l,c.remove(g),p=p||g===e),yj(b)):(l=Tj(a,l[0],l[1],m),f.W=l,g.aa=l,Hj(c,[Math.min(f.aa.x,f.W.x),Math.min(f.aa.y,f.W.y),Math.max(f.aa.x,f.W.x),Math.max(f.aa.y,f.W.y)],f),Hj(c,[Math.min(g.aa.x,g.W.x),Math.min(g.aa.y,g.W.y),Math.max(g.aa.x,g.W.x),
Math.max(g.aa.y,g.W.y)],g));a.b[h++]=n.aa.hb;a.b[h++]=n.W.hb;a.b[h++]=l.hb;h=!0;if(p)break}f=Dj(b);g=Aj(b)}while(f!==e);return h}function Yj(a,b){var c=zj(a),d=c;do{if(Pj(d,b).length)return!1;d=Aj(a)}while(d!==c);return!0}function Tj(a,b,c,d){var e=a.a.length;a.a[e++]=b;a.a[e++]=c;return{x:b,y:c,hb:d,Fb:void 0}}
function Uj(a,b,c,d){var e={aa:a,W:b},f={ub:void 0,next:void 0,data:e},g=c.b;if(g){var h=g.next;f.ub=g;f.next=h;g.next=f;h&&(h.ub=f);g===c.a&&(c.a=f)}else c.i=f,c.a=f,c.f&&(f.next=f,f.ub=f);c.b=f;c.c++;d&&d.Ca([Math.min(a.x,b.x),Math.min(a.y,b.y),Math.max(a.x,b.x),Math.max(a.y,b.y)],e);return e}function Vj(a,b,c,d){Ej(c)===b&&(yj(c),a.W=b.W,d.remove(b),Hj(d,[Math.min(a.aa.x,a.W.x),Math.min(a.aa.y,a.W.y),Math.max(a.aa.x,a.W.x),Math.max(a.aa.y,a.W.y)],a))}
function Xj(a,b,c,d,e){var f,g,h=[],l=Jj(d,[Math.min(a.x,b.x,c.x),Math.min(a.y,b.y,c.y),Math.max(a.x,b.x,c.x),Math.max(a.y,b.y,c.y)]);d=0;for(f=l.length;d<f;++d)for(g in l[d]){var m=l[d][g];"object"!==typeof m||e&&!m.Fb||m.x===a.x&&m.y===a.y||m.x===b.x&&m.y===b.y||m.x===c.x&&m.y===c.y||-1!==h.indexOf(m)||!Mf([a.x,a.y,b.x,b.y,c.x,c.y],0,6,2,m.x,m.y)||h.push(m)}return h}
function Pj(a,b,c){var d=a.aa,e=a.W;b=Jj(b,[Math.min(d.x,e.x),Math.min(d.y,e.y),Math.max(d.x,e.x),Math.max(d.y,e.y)]);var f=[],g;var h=0;for(g=b.length;h<g;++h){var l=b[h];a!==l&&(c||l.aa!==e||l.W!==d)&&Wj(d,e,l.aa,l.W,c)&&f.push(l)}return f}
function Wj(a,b,c,d,e){var f=(d.y-c.y)*(b.x-a.x)-(d.x-c.x)*(b.y-a.y);if(f&&(d=((d.x-c.x)*(a.y-c.y)-(d.y-c.y)*(a.x-c.x))/f,c=((b.x-a.x)*(a.y-c.y)-(b.y-a.y)*(a.x-c.x))/f,!e&&d>Ci&&d<1-Ci&&c>Ci&&c<1-Ci||e&&0<=d&&1>=d&&0<=c&&1>=c))return[a.x+d*(b.x-a.x),a.y+d*(b.y-a.y)]}
function bk(a,b,c,d,e){if(void 0===b.Fb||void 0===d.Fb)return!1;var f=(c.x-d.x)*(b.y-d.y)>(c.y-d.y)*(b.x-d.x);e=(e.x-d.x)*(b.y-d.y)<(e.y-d.y)*(b.x-d.x);a=(a.x-b.x)*(d.y-b.y)>(a.y-b.y)*(d.x-b.x);c=(c.x-b.x)*(d.y-b.y)<(c.y-b.y)*(d.x-b.x);b=b.Fb?c||a:c&&a;return(d.Fb?e||f:e&&f)&&b}k=Mj.prototype;
k.pc=function(a,b){var c=a.c,d=a.qa(),e=this.b.length,f=this.g.b.length;a=a.ga();var g,h,l;var m=h=0;for(g=c.length;m<g;++m){var n=c[m];if(0<n.length){var p=qf(a,h,n[0],d,-this.origin[0],-this.origin[1]);if(p.length){var q=[];h=1;for(l=n.length;h<l;++h)if(n[h]!==n[h-1]){var r=qf(a,n[h-1],n[h],d,-this.origin[0],-this.origin[1]);q.push(r)}oj(this.g,p,q,d);Nj(this,p,q,d)}}h=n[n.length-1]}this.b.length>e&&(this.i.push(e),this.f.push(b),this.j.s&&(this.c.push(e),this.j.s=!1));this.g.b.length>f&&pj(this.g,
b,f)};k.rc=function(a,b){var c=a.Bb(),d=a.qa();if(0<c.length){a=a.ga().map(Number);var e=qf(a,0,c[0],d,-this.origin[0],-this.origin[1]);if(e.length){var f=[],g;var h=1;for(g=c.length;h<g;++h)if(c[h]!==c[h-1]){var l=qf(a,c[h-1],c[h],d,-this.origin[0],-this.origin[1]);f.push(l)}this.i.push(this.b.length);this.f.push(b);this.j.s&&(this.c.push(this.b.length),this.j.s=!1);pj(this.g,b);oj(this.g,e,f,d);Nj(this,e,f,d)}}};
k.Db=function(a){this.l=new Di(this.a);this.o=new Di(this.b);this.i.push(this.b.length);this.g.Db(a);!this.c.length&&0<this.u.length&&(this.u=[]);this.b=this.a=null};k.Eb=function(a){var b=this.l,c=this.o,d=this.g.Eb(a);return function(){Gi(a,b);Gi(a,c);d()}};k.rf=function(a,b){var c=Hi(b,sj,uj);if(this.v)var d=this.v;else this.v=d=new vj(a,c);b.Qc(c);a.enableVertexAttribArray(d.b);a.vertexAttribPointer(d.b,2,5126,!1,8,0);return d};k.sf=function(a,b){a.disableVertexAttribArray(b.b)};
k.Od=function(a,b,c,d){var e=a.getParameter(a.DEPTH_FUNC),f=a.getParameter(a.DEPTH_WRITEMASK);d||(a.enable(a.DEPTH_TEST),a.depthMask(!0),a.depthFunc(a.NOTEQUAL));if(wb(c)){var g=this.i[this.i.length-1];for(c=this.c.length-1;0<=c;--c){var h=this.c[c];var l=this.u[c];a.uniform4fv(this.v.B,l);xi(a,b,h,g);g=h}}else{var m=this.i.length-2;l=g=this.i[m+1];for(h=this.c.length-1;0<=h;--h){var n=this.u[h];a.uniform4fv(this.v.B,n);for(n=this.c[h];0<=m&&this.i[m]>=n;){var p=this.i[m];var q=this.f[m];q=w(q).toString();
c[q]&&(g!==l&&(xi(a,b,g,l),a.clear(a.DEPTH_BUFFER_BIT)),l=p);m--;g=p}g!==l&&(xi(a,b,g,l),a.clear(a.DEPTH_BUFFER_BIT));g=l=n}}d||(a.disable(a.DEPTH_TEST),a.clear(a.DEPTH_BUFFER_BIT),a.depthMask(f),a.depthFunc(e))};
k.ve=function(a,b,c,d,e){var f,g;var h=this.i.length-2;var l=this.i[h+1];for(f=this.c.length-1;0<=f;--f){var m=this.u[f];a.uniform4fv(this.v.B,m);for(g=this.c[f];0<=h&&this.i[h]>=g;){m=this.i[h];var n=this.f[h];var p=w(n).toString();if(void 0===c[p]&&n.V()&&(void 0===e||qb(e,n.V().G()))&&(a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),xi(a,b,m,l),l=d(n)))return l;h--;l=m}}};
k.Ma=function(a,b){a=a?a.b:[0,0,0,0];a instanceof CanvasGradient||a instanceof CanvasPattern?a=yi:a=ed(a).map(function(a,b){return 3!=b?a/255:a})||yi;this.j.fillColor&&pa(a,this.j.fillColor)||(this.j.fillColor=a,this.j.s=!0,this.u.push(a));b?this.g.Ma(null,b):this.g.Ma(null,new wj({color:[0,0,0,0],lineWidth:0}))};function ck(){}ck.prototype.La=function(){};function dk(a,b,c){this.f=b;this.g=a;this.c=c;this.a={}}v(dk,ki);function ek(a,b){var c=[],d;for(d in a.a){var e=a.a[d],f;for(f in e)c.push(e[f].Eb(b))}return function(){for(var a=c.length,b,d=0;d<a;d++)b=c[d].apply(this,arguments);return b}}function fk(a,b){for(var c in a.a){var d=a.a[c],e;for(e in d)d[e].Db(b)}}dk.prototype.b=function(a,b){var c=void 0!==a?a.toString():"0";a=this.a[c];void 0===a&&(a={},this.a[c]=a);c=a[b];void 0===c&&(c=new gk[b](this.g,this.f),a[b]=c);return c};
dk.prototype.i=function(){return wb(this.a)};dk.prototype.La=function(a,b,c,d,e,f,g,h){var l=Object.keys(this.a).map(Number);l.sort(ia);var m,n;var p=0;for(m=l.length;p<m;++p){var q=this.a[l[p].toString()];var r=0;for(n=ji.length;r<n;++r){var u=q[ji[r]];void 0!==u&&u.La(a,b,c,d,e,f,g,h,void 0,!1)}}};
function hk(a,b,c,d,e,f,g,h,l,m,n){var p=ik,q=Object.keys(a.a).map(Number);q.sort(function(a,b){return b-a});var r,u;var x=0;for(r=q.length;x<r;++x){var B=a.a[q[x].toString()];for(u=ji.length-1;0<=u;--u){var E=B[ji[u]];if(void 0!==E&&(E=E.La(b,c,d,e,p,f,g,h,l,m,n)))return E}}}
dk.prototype.Ea=function(a,b,c,d,e,f,g,h,l,m){var n=b.b;n.bindFramebuffer(n.FRAMEBUFFER,Pi(b));var p;void 0!==this.c&&(p=Qa(Za(a),d*this.c));return hk(this,b,a,d,e,g,h,l,function(a){var b=new Uint8Array(4);n.readPixels(0,0,1,1,n.RGBA,n.UNSIGNED_BYTE,b);if(0<b[3]&&(a=m(a)))return a},!0,p)};
function jk(a,b,c,d,e,f,g,h){var l=c.b;l.bindFramebuffer(l.FRAMEBUFFER,Pi(c));return void 0!==hk(a,c,b,d,e,f,g,h,function(){var a=new Uint8Array(4);l.readPixels(0,0,1,1,l.RGBA,l.UNSIGNED_BYTE,a);return 0<a[3]},!1)}var ik=[1,1],gk={Circle:Fi,Image:Ui,LineString:cj,Polygon:Mj,Text:ck};function kk(a,b,c,d,e,f,g){this.b=a;this.i=b;this.a=f;this.c=g;this.j=e;this.g=d;this.f=c;this.o=this.l=this.v=null}v(kk,Wh);k=kk.prototype;k.rd=function(a){this.Ma(a.Fa(),a.Ga());this.Ub(a.Y())};
k.zb=function(a){switch(a.U()){case "Point":this.qc(a,null);break;case "LineString":this.mc(a,null);break;case "Polygon":this.rc(a,null);break;case "MultiPoint":this.oc(a,null);break;case "MultiLineString":this.nc(a,null);break;case "MultiPolygon":this.pc(a,null);break;case "GeometryCollection":this.ue(a,null);break;case "Circle":this.Zb(a,null)}};k.te=function(a,b){(a=(0,b.Za)(a))&&qb(this.a,a.G())&&(this.rd(b),this.zb(a))};k.ue=function(a){a=a.a;var b;var c=0;for(b=a.length;c<b;++c)this.zb(a[c])};
k.qc=function(a,b){var c=this.b,d=(new dk(1,this.a)).b(0,"Image");d.Ub(this.v);d.qc(a,b);d.Db(c);d.La(this.b,this.i,this.f,this.g,this.j,this.c,1,{},void 0,!1);d.Eb(c)()};k.oc=function(a,b){var c=this.b,d=(new dk(1,this.a)).b(0,"Image");d.Ub(this.v);d.oc(a,b);d.Db(c);d.La(this.b,this.i,this.f,this.g,this.j,this.c,1,{},void 0,!1);d.Eb(c)()};
k.mc=function(a,b){var c=this.b,d=(new dk(1,this.a)).b(0,"LineString");d.Ma(null,this.o);d.mc(a,b);d.Db(c);d.La(this.b,this.i,this.f,this.g,this.j,this.c,1,{},void 0,!1);d.Eb(c)()};k.nc=function(a,b){var c=this.b,d=(new dk(1,this.a)).b(0,"LineString");d.Ma(null,this.o);d.nc(a,b);d.Db(c);d.La(this.b,this.i,this.f,this.g,this.j,this.c,1,{},void 0,!1);d.Eb(c)()};
k.rc=function(a,b){var c=this.b,d=(new dk(1,this.a)).b(0,"Polygon");d.Ma(this.l,this.o);d.rc(a,b);d.Db(c);d.La(this.b,this.i,this.f,this.g,this.j,this.c,1,{},void 0,!1);d.Eb(c)()};k.pc=function(a,b){var c=this.b,d=(new dk(1,this.a)).b(0,"Polygon");d.Ma(this.l,this.o);d.pc(a,b);d.Db(c);d.La(this.b,this.i,this.f,this.g,this.j,this.c,1,{},void 0,!1);d.Eb(c)()};
k.Zb=function(a,b){var c=this.b,d=(new dk(1,this.a)).b(0,"Circle");d.Ma(this.l,this.o);d.Zb(a,b);d.Db(c);d.La(this.b,this.i,this.f,this.g,this.j,this.c,1,{},void 0,!1);d.Eb(c)()};k.Ub=function(a){this.v=a};k.Ma=function(a,b){this.l=a;this.o=b};function lk(){this.c=0;this.b={};this.i=this.a=null}k=lk.prototype;k.clear=function(){this.c=0;this.b={};this.i=this.a=null};k.forEach=function(a,b){for(var c=this.a;c;)a.call(b,c.Yc,c.uc,this),c=c.Nb};k.get=function(a){a=this.b[a];xa(!!a,15);if(a===this.i)return a.Yc;a===this.a?(this.a=this.a.Nb,this.a.vd=null):(a.Nb.vd=a.vd,a.vd.Nb=a.Nb);a.Nb=null;a.vd=this.i;this.i=this.i.Nb=a;return a.Yc};
k.pop=function(){var a=this.a;delete this.b[a.uc];a.Nb&&(a.Nb.vd=null);this.a=a.Nb;this.a||(this.i=null);--this.c;return a.Yc};k.replace=function(a,b){this.get(a);this.b[a].Yc=b};k.set=function(a,b){xa(!(a in this.b),16);b={uc:a,Nb:null,vd:this.i,Yc:b};this.i?this.i.Nb=b:this.a=b;this.i=b;this.b[a]=b;++this.c};function mk(a,b){Mh.call(this,0,b);this.b=document.createElement("CANVAS");this.b.style.width="100%";this.b.style.height="100%";this.b.style.display="block";this.b.className="ol-unselectable";a.insertBefore(this.b,a.childNodes[0]||null);this.S=this.D=0;this.C=jd();this.l=!0;this.i=Ld(this.b,{antialias:!0,depth:!0,failIfMajorPerformanceCaveat:!0,preserveDrawingBuffer:!1,stencil:!0});this.f=new Oi(this.b,this.i);y(this.b,"webglcontextlost",this.Yn,this);y(this.b,"webglcontextrestored",this.Zn,this);
this.a=new lk;this.u=null;this.j=new Ke(function(a){var b=a[1];a=a[2];var c=b[0]-this.u[0],b=b[1]-this.u[1];return 65536*Math.log(a)+Math.sqrt(c*c+b*b)/a}.bind(this),function(a){return a[0].bb()});this.B=function(){if(this.j.b.length){Oe(this.j);var a=Le(this.j);nk(this,a[0],a[3],a[4])}return!1}.bind(this);this.g=0;ok(this)}v(mk,Mh);
function nk(a,b,c,d){var e=a.i,f=b.bb();if(a.a.b.hasOwnProperty(f))a=a.a.get(f),e.bindTexture(3553,a.Ib),9729!=a.Ph&&(e.texParameteri(3553,10240,9729),a.Ph=9729),9729!=a.Rh&&(e.texParameteri(3553,10241,9729),a.Rh=9729);else{var g=e.createTexture();e.bindTexture(3553,g);if(0<d){var h=a.C.canvas,l=a.C;a.D!==c[0]||a.S!==c[1]?(h.width=c[0],h.height=c[1],a.D=c[0],a.S=c[1]):l.clearRect(0,0,c[0],c[1]);l.drawImage(b.Y(),d,d,c[0],c[1],0,0,c[0],c[1]);e.texImage2D(3553,0,6408,6408,5121,h)}else e.texImage2D(3553,
0,6408,6408,5121,b.Y());e.texParameteri(3553,10240,9729);e.texParameteri(3553,10241,9729);e.texParameteri(3553,10242,33071);e.texParameteri(3553,10243,33071);a.a.set(f,{Ib:g,Ph:9729,Rh:9729})}}function pk(a,b,c){var d=a.o;if(Rc(d,b)){a=a.f;var e=c.viewState;d.b(new Rh(b,new kk(a,e.center,e.resolution,e.rotation,c.size,c.extent,c.pixelRatio),c,null,a))}}k=mk.prototype;k.ka=function(){var a=this.i;a.isContextLost()||this.a.forEach(function(b){b&&a.deleteTexture(b.Ib)});Nc(this.f);Mh.prototype.ka.call(this)};
k.xk=function(a,b){a=this.i;for(var c;1024<this.a.c-this.g;){if(c=this.a.a.Yc)a.deleteTexture(c.Ib);else if(+this.a.a.uc==b.index)break;else--this.g;this.a.pop()}};k.U=function(){return"webgl"};k.Yn=function(a){a.preventDefault();this.a.clear();this.g=0;a=this.c;for(var b in a)a[b].mg()};k.Zn=function(){ok(this);this.o.render()};function ok(a){a=a.i;a.activeTexture(33984);a.blendFuncSeparate(770,771,1,771);a.disable(2884);a.disable(2929);a.disable(3089);a.disable(2960)}
k.Jg=function(a){var b=this.f,c=this.i;if(c.isContextLost())return!1;if(!a)return this.l&&(this.b.style.display="none",this.l=!1),!1;this.u=a.focus;this.a.set((-a.index).toString(),null);++this.g;pk(this,"precompose",a);var d=[],e=a.layerStatesArray;qa(e);var f=a.viewState.resolution,g;var h=0;for(g=e.length;h<g;++h){var l=e[h];if(xh(l,f)&&"ready"==l.yj){var m=Ph(this,l.layer);m.ng(a,l,b)&&d.push(l)}}e=a.size[0]*a.pixelRatio;f=a.size[1]*a.pixelRatio;if(this.b.width!=e||this.b.height!=f)this.b.width=
e,this.b.height=f;c.bindFramebuffer(36160,null);c.clearColor(0,0,0,0);c.clear(16384);c.enable(3042);c.viewport(0,0,this.b.width,this.b.height);h=0;for(g=d.length;h<g;++h)l=d[h],m=Ph(this,l.layer),m.Gi(a,l,b);this.l||(this.b.style.display="",this.l=!0);Nh(a);1024<this.a.c-this.g&&a.postRenderFunctions.push(this.xk.bind(this));this.j.b.length&&(a.postRenderFunctions.push(this.B),a.animate=!0);pk(this,"postcompose",a);Qh(this,a);a.postRenderFunctions.push(Oh)};
k.Ea=function(a,b,c,d,e,f,g){if(this.i.isContextLost())return!1;var h=b.viewState,l=b.layerStatesArray,m;for(m=l.length-1;0<=m;--m){var n=l[m];var p=n.layer;if(xh(n,h.resolution)&&f.call(g,p)&&(n=Ph(this,p).Ea(a,b,c,d,e)))return n}};k.Ei=function(a,b,c,d,e){c=!1;if(this.i.isContextLost())return!1;var f=b.viewState,g=b.layerStatesArray,h;for(h=g.length-1;0<=h;--h){var l=g[h],m=l.layer;if(xh(l,f.resolution)&&d.call(e,m)&&(c=Ph(this,m).Ue(a,b)))return!0}return c};
k.Di=function(a,b,c,d,e){if(this.i.isContextLost())return!1;var f=b.viewState,g=b.layerStatesArray,h;for(h=g.length-1;0<=h;--h){var l=g[h];var m=l.layer;if(xh(l,f.resolution)&&e.call(d,m)&&(l=Ph(this,m).lg(a,b,c,d)))return l}};var qk=["canvas","webgl"];
function G(a){Tc.call(this);var b=rk(a);this.Cf=void 0!==a.loadTilesWhileAnimating?a.loadTilesWhileAnimating:!1;this.Df=void 0!==a.loadTilesWhileInteracting?a.loadTilesWhileInteracting:!1;this.If=void 0!==a.pixelRatio?a.pixelRatio:Sd;this.yf=b.logos;this.pa=function(){this.j=void 0;this.Sp.call(this,Date.now())}.bind(this);this.Yb=Bh();this.Jf=Bh();this.ad=0;this.I=this.R=this.T=this.g=this.c=null;this.a=document.createElement("DIV");this.a.className="ol-viewport"+(Xd?" ol-touch":"");this.a.style.position=
"relative";this.a.style.overflow="hidden";this.a.style.width="100%";this.a.style.height="100%";this.a.style.msTouchAction="none";this.a.style.touchAction="none";this.C=document.createElement("DIV");this.C.className="ol-overlaycontainer";this.a.appendChild(this.C);this.D=document.createElement("DIV");this.D.className="ol-overlaycontainer-stopevent";for(var c="click dblclick mousedown touchstart MSPointerDown pointerdown mousewheel wheel".split(" "),d=0,e=c.length;d<e;++d)y(this.D,c[d],Pc);this.a.appendChild(this.D);
this.Sa=new Fe(this,a.moveTolerance);for(var f in de)y(this.Sa,de[f],this.Ih,this);this.va=b.keyboardEventTarget;this.u=null;y(this.a,"wheel",this.ld,this);y(this.a,"mousewheel",this.ld,this);this.l=b.controls;this.o=b.interactions;this.v=b.overlays;this.rg={};this.B=new b.Up(this.a,this);this.na=null;this.xb=[];this.$a=new Pe(this.ql.bind(this),this.Wl.bind(this));this.fa={};y(this,Vc("layergroup"),this.El,this);y(this,Vc("view"),this.Xl,this);y(this,Vc("size"),this.Tl,this);y(this,Vc("target"),
this.Vl,this);this.H(b.values);this.l.forEach(function(a){a.setMap(this)},this);y(this.l,"add",function(a){a.element.setMap(this)},this);y(this.l,"remove",function(a){a.element.setMap(null)},this);this.o.forEach(function(a){a.setMap(this)},this);y(this.o,"add",function(a){a.element.setMap(this)},this);y(this.o,"remove",function(a){a.element.setMap(null)},this);this.v.forEach(this.kh,this);y(this.v,"add",function(a){this.kh(a.element)},this);y(this.v,"remove",function(a){var b=a.element.g;void 0!==
b&&delete this.rg[b.toString()];a.element.setMap(null)},this)}v(G,Tc);k=G.prototype;k.kk=function(a){this.l.push(a)};k.lk=function(a){this.o.push(a)};k.ih=function(a){this.Kc().qd().push(a)};k.jh=function(a){this.v.push(a)};k.kh=function(a){var b=a.g;void 0!==b&&(this.rg[b.toString()]=a);a.setMap(this)};
k.ka=function(){Nc(this.Sa);Nc(this.B);Kc(this.a,"wheel",this.ld,this);Kc(this.a,"mousewheel",this.ld,this);this.f&&(window.removeEventListener("resize",this.f,!1),this.f=void 0);this.j&&(cancelAnimationFrame(this.j),this.j=void 0);this.Le(null);Tc.prototype.ka.call(this)};k.we=function(a,b,c){if(this.c)return a=this.Wa(a),c=c?c:{},this.B.Ea(a,this.c,void 0!==c.hitTolerance?c.hitTolerance*this.c.pixelRatio:0,b,null,c.layerFilter?c.layerFilter:mf,null)};
k.Im=function(a,b,c,d,e){if(this.c)return this.B.Di(a,this.c,b,void 0!==c?c:null,d?d:mf,void 0!==e?e:null)};k.Yl=function(a,b){if(!this.c)return!1;a=this.Wa(a);b=b?b:{};return this.B.Ei(a,this.c,void 0!==b.hitTolerance?b.hitTolerance*this.c.pixelRatio:0,b.layerFilter?b.layerFilter:mf,null)};k.Tf=function(a){return this.Wa(this.xe(a))};k.xe=function(a){var b=this.a.getBoundingClientRect();a=a.changedTouches?a.changedTouches[0]:a;return[a.clientX-b.left,a.clientY-b.top]};k.ag=function(){return this.get("target")};
k.jd=function(){var a=this.ag();return void 0!==a?"string"===typeof a?document.getElementById(a):a:null};k.Wa=function(a){var b=this.c;return b?Gh(b.pixelToCoordinateTransform,a.slice()):null};k.Lk=function(){return this.l};k.fl=function(){return this.v};k.el=function(a){a=this.rg[a.toString()];return void 0!==a?a:null};k.Sk=function(){return this.o};k.Kc=function(){return this.get("layergroup")};k.Xh=function(){return this.Kc().qd()};
k.Ja=function(a){var b=this.c;return b?Gh(b.coordinateToPixelTransform,a.slice(0,2)):null};k.Ob=function(){return this.get("size")};k.Z=function(){return this.get("view")};k.sl=function(){return this.a};k.ql=function(a,b,c,d){var e=this.c;if(!(e&&b in e.wantedTiles&&e.wantedTiles[b][a.bb()]))return Infinity;a=c[0]-e.focus[0];c=c[1]-e.focus[1];return 65536*Math.log(d)+Math.sqrt(a*a+c*c)/d};k.ld=function(a,b){a=new Jd(b||a.type,this,a);this.Ih(a)};
k.Ih=function(a){if(this.c){this.na=a.coordinate;a.frameState=this.c;var b=this.o.a,c;if(!1!==this.b(a))for(c=b.length-1;0<=c;c--){var d=b[c];if(d.c()&&!d.handleEvent(a))break}}};k.Rl=function(){var a=this.c,b=this.$a;if(b.b.length){var c=16,d=c;if(a){var e=a.viewHints;e[0]&&(c=this.Cf?8:0,d=2);e[1]&&(c=this.Df?8:0,d=2)}b.j<c&&(Oe(b),Qe(b,c,d))}b=this.xb;c=0;for(d=b.length;c<d;++c)b[c](this,a);b.length=0};k.Tl=function(){this.render()};
k.Vl=function(){var a;this.ag()&&(a=this.jd());if(this.u){for(var b=0,c=this.u.length;b<c;++b)Ec(this.u[b]);this.u=null}a?(a.appendChild(this.a),a=this.va?this.va:a,this.u=[y(a,"keydown",this.ld,this),y(a,"keypress",this.ld,this)],this.f||(this.f=this.Ad.bind(this),window.addEventListener("resize",this.f,!1))):(ld(this.a),this.f&&(window.removeEventListener("resize",this.f,!1),this.f=void 0));this.Ad()};k.Wl=function(){this.render()};k.Lh=function(){this.render()};
k.Xl=function(){this.T&&(Ec(this.T),this.T=null);this.R&&(Ec(this.R),this.R=null);var a=this.Z();a&&(this.a.setAttribute("data-view",w(a)),this.T=y(a,"propertychange",this.Lh,this),this.R=y(a,"change",this.Lh,this));this.render()};k.El=function(){this.I&&(this.I.forEach(Ec),this.I=null);var a=this.Kc();a&&(this.I=[y(a,"propertychange",this.render,this),y(a,"change",this.render,this)]);this.render()};k.Tp=function(){this.j&&cancelAnimationFrame(this.j);this.pa()};
k.render=function(){void 0===this.j&&(this.j=requestAnimationFrame(this.pa))};k.Mp=function(a){return this.l.remove(a)};k.Np=function(a){return this.o.remove(a)};k.Pp=function(a){return this.Kc().qd().remove(a)};k.Qp=function(a){return this.v.remove(a)};
k.Sp=function(a){var b,c=this.Ob(),d=this.Z(),e=Oa(),f=this.c,g=null;if(void 0!==c&&0<c[0]&&0<c[1]&&d&&jg(d)){var g=dg(d,this.c?this.c.viewHints:void 0),h=this.Kc().Yf(),l={};var m=0;for(b=h.length;m<b;++m)l[w(h[m].layer)]=h[m];m=d.getState();g={animate:!1,attributions:{},coordinateToPixelTransform:this.Yb,extent:e,focus:this.na?this.na:m.center,index:this.ad++,layerStates:l,layerStatesArray:h,logos:tb({},this.yf),pixelRatio:this.If,pixelToCoordinateTransform:this.Jf,postRenderFunctions:[],size:c,
skippedFeatureUids:this.fa,tileQueue:this.$a,time:a,usedTiles:{},viewState:m,viewHints:g,wantedTiles:{}}}g&&(g.extent=ob(m.center,m.resolution,m.rotation,g.size,e));this.c=g;this.B.Jg(g);g&&(g.animate&&this.render(),Array.prototype.push.apply(this.xb,g.postRenderFunctions),!f||this.g&&(kb(this.g)||bb(g.extent,this.g))||(this.b(new Id("movestart",this,f)),this.g=Ya(this.g)),!this.g||g.viewHints[0]||g.viewHints[1]||bb(g.extent,this.g)||(this.b(new Id("moveend",this,g)),Ra(g.extent,this.g)));this.b(new Id("postrender",
this,g));setTimeout(this.Rl.bind(this),0)};k.qj=function(a){this.set("layergroup",a)};k.Qg=function(a){this.set("size",a)};k.Le=function(a){this.set("target",a)};k.iq=function(a){this.set("view",a)};k.xj=function(a){a=w(a).toString();this.fa[a]=!0;this.render()};
k.Ad=function(){var a=this.jd();if(a){var b=getComputedStyle(a);this.Qg([a.offsetWidth-parseFloat(b.borderLeftWidth)-parseFloat(b.paddingLeft)-parseFloat(b.paddingRight)-parseFloat(b.borderRightWidth),a.offsetHeight-parseFloat(b.borderTopWidth)-parseFloat(b.paddingTop)-parseFloat(b.paddingBottom)-parseFloat(b.borderBottomWidth)])}else this.Qg(void 0)};k.Cj=function(a){a=w(a).toString();delete this.fa[a];this.render()};
function rk(a){var b=null;void 0!==a.keyboardEventTarget&&(b="string"===typeof a.keyboardEventTarget?document.getElementById(a.keyboardEventTarget):a.keyboardEventTarget);var c={},d={};if(void 0===a.logo||"boolean"===typeof a.logo&&a.logo)d["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"]=
"https://openlayers.org/";else{var e=a.logo;"string"===typeof e?d[e]="":e instanceof HTMLElement?d[w(e).toString()]=e:e&&(xa("string"==typeof e.href,44),xa("string"==typeof e.src,45),d[e.src]=e.href)}e=a.layers instanceof uh?a.layers:new uh({layers:a.layers});c.layergroup=e;c.target=a.target;c.view=void 0!==a.view?a.view:new F;var e=Mh,f;void 0!==a.renderer?(Array.isArray(a.renderer)?f=a.renderer:"string"===typeof a.renderer?f=[a.renderer]:xa(!1,46),0<=f.indexOf("dom")&&(f=f.concat(qk))):f=qk;var g;
var h=0;for(g=f.length;h<g;++h){var l=f[h];if("canvas"==l){if(Ud){e=hi;break}}else if("webgl"==l&&Md){e=mk;break}}void 0!==a.controls?Array.isArray(a.controls)?f=new Yc(a.controls.slice()):(xa(a.controls instanceof Yc,47),f=a.controls):f=xd();void 0!==a.interactions?Array.isArray(a.interactions)?h=new Yc(a.interactions.slice()):(xa(a.interactions instanceof Yc,48),h=a.interactions):h=qh();void 0!==a.overlays?Array.isArray(a.overlays)?a=new Yc(a.overlays.slice()):(xa(a.overlays instanceof Yc,49),a=
a.overlays):a=new Yc;return{controls:f,interactions:h,keyboardEventTarget:b,logos:d,overlays:a,Up:e,values:c}};function sk(a){Tc.call(this);this.g=a.id;this.l=void 0!==a.insertFirst?a.insertFirst:!0;this.v=void 0!==a.stopEvent?a.stopEvent:!0;this.c=document.createElement("DIV");this.c.className="ol-overlay-container ol-selectable";this.c.style.position="absolute";this.autoPan=void 0!==a.autoPan?a.autoPan:!1;this.j=a.autoPanAnimation||{};this.o=void 0!==a.autoPanMargin?a.autoPanMargin:20;this.a={re:"",Ie:"",nf:"",vf:"",visible:!0};this.f=null;y(this,Vc(tk),this.zl,this);y(this,Vc(uk),this.Jl,this);y(this,Vc(vk),
this.Nl,this);y(this,Vc(wk),this.Pl,this);y(this,Vc(xk),this.Ql,this);void 0!==a.element&&this.lj(a.element);this.rj(void 0!==a.offset?a.offset:[0,0]);this.uj(void 0!==a.positioning?a.positioning:"top-left");void 0!==a.position&&this.Ne(a.position)}v(sk,Tc);k=sk.prototype;k.Rd=function(){return this.get(tk)};k.Jm=function(){return this.g};k.Me=function(){return this.get(uk)};k.Dh=function(){return this.get(vk)};k.Yh=function(){return this.get(wk)};k.Eh=function(){return this.get(xk)};
k.zl=function(){for(var a=this.c;a.lastChild;)a.removeChild(a.lastChild);(a=this.Rd())&&this.c.appendChild(a)};k.Jl=function(){this.f&&(ld(this.c),Ec(this.f),this.f=null);var a=this.Me();a&&(this.f=y(a,"postrender",this.render,this),yk(this),a=this.v?a.D:a.C,this.l?a.insertBefore(this.c,a.childNodes[0]||null):a.appendChild(this.c))};k.render=function(){yk(this)};k.Nl=function(){yk(this)};
k.Pl=function(){yk(this);if(this.get(wk)&&this.autoPan){var a=this.Me();if(a&&a.jd()){var b=zk(a.jd(),a.Ob()),c=this.Rd(),d=c.offsetWidth,e=getComputedStyle(c),d=d+(parseInt(e.marginLeft,10)+parseInt(e.marginRight,10)),e=c.offsetHeight,f=getComputedStyle(c),e=e+(parseInt(f.marginTop,10)+parseInt(f.marginBottom,10)),g=zk(c,[d,e]),c=this.o;Va(b,g)||(d=g[0]-b[0],e=b[2]-g[2],f=g[1]-b[1],g=b[3]-g[3],b=[0,0],0>d?b[0]=d-c:0>e&&(b[0]=Math.abs(e)+c),0>f?b[1]=f-c:0>g&&(b[1]=Math.abs(g)+c),0===b[0]&&0===b[1])||
(c=a.Z().wa(),c=a.Ja(c),b=[c[0]+b[0],c[1]+b[1]],a.Z().animate({center:a.Wa(b),duration:this.j.duration,easing:this.j.easing}))}}};k.Ql=function(){yk(this)};k.lj=function(a){this.set(tk,a)};k.setMap=function(a){this.set(uk,a)};k.rj=function(a){this.set(vk,a)};k.Ne=function(a){this.set(wk,a)};function zk(a,b){var c=a.getBoundingClientRect();a=c.left+window.pageXOffset;c=c.top+window.pageYOffset;return[a,c,a+b[0],c+b[1]]}k.uj=function(a){this.set(xk,a)};
function Ak(a,b){a.a.visible!==b&&(a.c.style.display=b?"":"none",a.a.visible=b)}
function yk(a){var b=a.Me(),c=a.Yh();if(b&&b.c&&c){var c=b.Ja(c),d=b.Ob(),b=a.c.style,e=a.Dh(),f=a.Eh();Ak(a,!0);var g=e[0],e=e[1];if("bottom-right"==f||"center-right"==f||"top-right"==f)""!==a.a.Ie&&(a.a.Ie=b.left=""),g=Math.round(d[0]-c[0]-g)+"px",a.a.nf!=g&&(a.a.nf=b.right=g);else{""!==a.a.nf&&(a.a.nf=b.right="");if("bottom-center"==f||"center-center"==f||"top-center"==f)g-=a.c.offsetWidth/2;g=Math.round(c[0]+g)+"px";a.a.Ie!=g&&(a.a.Ie=b.left=g)}if("bottom-left"==f||"bottom-center"==f||"bottom-right"==
f)""!==a.a.vf&&(a.a.vf=b.top=""),c=Math.round(d[1]-c[1]-e)+"px",a.a.re!=c&&(a.a.re=b.bottom=c);else{""!==a.a.re&&(a.a.re=b.bottom="");if("center-left"==f||"center-center"==f||"center-right"==f)e-=a.c.offsetHeight/2;c=Math.round(c[1]+e)+"px";a.a.vf!=c&&(a.a.vf=b.top=c)}}else Ak(a,!1)}var tk="element",uk="map",vk="offset",wk="position",xk="positioning";function Bk(a){function b(a){a=h.Tf(a);l.a.Z().ob(a);window.removeEventListener("mousemove",c);window.removeEventListener("mouseup",b)}function c(a){a=h.Tf({clientX:a.clientX-n.offsetWidth/2,clientY:a.clientY+n.offsetHeight/2});m.Ne(a)}a=a?a:{};this.j=void 0!==a.collapsed?a.collapsed:!0;this.o=void 0!==a.collapsible?a.collapsible:!0;this.o||(this.j=!1);var d=void 0!==a.className?a.className:"ol-overviewmap",e=void 0!==a.tipLabel?a.tipLabel:"Overview map",f=void 0!==a.collapseLabel?a.collapseLabel:
"\u00ab";"string"===typeof f?(this.u=document.createElement("span"),this.u.textContent=f):this.u=f;f=void 0!==a.label?a.label:"\u00bb";"string"===typeof f?(this.D=document.createElement("span"),this.D.textContent=f):this.D=f;var g=this.o&&!this.j?this.u:this.D,f=document.createElement("button");f.setAttribute("type","button");f.title=e;f.appendChild(g);y(f,"click",this.an,this);this.C=document.createElement("DIV");this.C.className="ol-overviewmap-map";var h=this.c=new G({controls:new Yc,interactions:new Yc,
view:a.view});a.layers&&a.layers.forEach(function(a){h.ih(a)},this);e=document.createElement("DIV");e.className="ol-overviewmap-box";e.style.boxSizing="border-box";this.l=new sk({position:[0,0],positioning:"bottom-left",element:e});this.c.jh(this.l);e=document.createElement("div");e.className=d+" ol-unselectable ol-control"+(this.j&&this.o?" ol-collapsed":"")+(this.o?"":" ol-uncollapsible");e.appendChild(this.C);e.appendChild(f);md.call(this,{element:e,render:a.render?a.render:Ck,target:a.target});
var l=this,m=this.l,n=this.l.Rd();n.addEventListener("mousedown",function(){window.addEventListener("mousemove",c);window.addEventListener("mouseup",b)})}v(Bk,md);k=Bk.prototype;k.setMap=function(a){var b=this.a;a!==b&&(b&&((b=b.Z())&&Kc(b,Vc("rotation"),this.Ge,this),this.c.Le(null)),md.prototype.setMap.call(this,a),a&&(this.c.Le(this.C),this.v.push(y(a,"propertychange",this.Kl,this)),this.c.Xh().dc()||this.c.qj(a.Kc()),a=a.Z()))&&(y(a,Vc("rotation"),this.Ge,this),jg(a)&&(this.c.Ad(),Dk(this)))};
k.Kl=function(a){"view"===a.key&&((a=a.oldValue)&&Kc(a,Vc("rotation"),this.Ge,this),a=this.a.Z(),y(a,Vc("rotation"),this.Ge,this))};k.Ge=function(){this.c.Z().Oe(this.a.Z().Qa())};function Ck(){var a=this.a,b=this.c;if(a.c&&b.c){var c=a.Ob(),a=a.Z().dd(c),d=b.Ob(),c=b.Z().dd(d),e=b.Ja(ib(a)),f=b.Ja(gb(a)),b=Math.abs(e[0]-f[0]),e=Math.abs(e[1]-f[1]),f=d[0],d=d[1];b<.1*f||e<.1*d||b>.75*f||e>.75*d?Dk(this):Va(c,a)||(a=this.c,c=this.a.Z(),a.Z().ob(c.wa()))}Ek(this)}
function Dk(a){var b=a.a;a=a.c;var c=b.Ob(),b=b.Z().dd(c);a=a.Z();rb(b,1/(.1*Math.pow(2,Math.log(7.5)/Math.LN2/2)));a.Qf(b)}function Ek(a){var b=a.a,c=a.c;if(b.c&&c.c){var d=b.Ob(),e=b.Z(),f=c.Z(),c=e.Qa(),b=a.l,g=a.l.Rd(),h=e.dd(d),d=f.Pa(),e=eb(h),f=hb(h);if(a=a.a.Z().wa()){var l=[e[0]-a[0],e[1]-a[1]];ef(l,c);Ze(l,a)}b.Ne(l);g&&(g.style.width=Math.abs((e[0]-f[0])/d)+"px",g.style.height=Math.abs((f[1]-e[1])/d)+"px")}}k.an=function(a){a.preventDefault();Fk(this)};
function Fk(a){a.element.classList.toggle("ol-collapsed");a.j?kd(a.u,a.D):kd(a.D,a.u);a.j=!a.j;var b=a.c;a.j||b.c||(b.Ad(),Dk(a),Jc(b,"postrender",function(){Ek(this)},a))}k.$m=function(){return this.o};k.cn=function(a){this.o!==a&&(this.o=a,this.element.classList.toggle("ol-uncollapsible"),!a&&this.j&&Fk(this))};k.bn=function(a){this.o&&this.j!==a&&Fk(this)};k.Zm=function(){return this.j};k.gl=function(){return this.c};function Gk(a){a=a?a:{};var b=void 0!==a.className?a.className:"ol-scale-line";this.o=document.createElement("DIV");this.o.className=b+"-inner";this.c=document.createElement("DIV");this.c.className=b+" ol-unselectable";this.c.appendChild(this.o);this.u=null;this.l=void 0!==a.minWidth?a.minWidth:64;this.j=!1;this.B=void 0;this.D="";md.call(this,{element:this.c,render:a.render?a.render:Hk,target:a.target});y(this,Vc(Ik),this.T,this);this.I(a.units||"metric")}v(Gk,md);var Jk=[1,2,5];Gk.prototype.C=function(){return this.get(Ik)};
function Hk(a){(a=a.frameState)?this.u=a.viewState:this.u=null;Kk(this)}Gk.prototype.T=function(){Kk(this)};Gk.prototype.I=function(a){this.set(Ik,a)};
function Kk(a){var b=a.u;if(b){var c=b.projection,d=c.sc(),b=Sb(c,b.resolution,b.center)*d,d=a.l*b,c="",e=a.C();"degrees"==e?(c=zb.degrees,b/=c,d<c/60?(c="\u2033",b*=3600):d<c?(c="\u2032",b*=60):c="\u00b0"):"imperial"==e?.9144>d?(c="in",b/=.0254):1609.344>d?(c="ft",b/=.3048):(c="mi",b/=1609.344):"nautical"==e?(b/=1852,c="nm"):"metric"==e?.001>d?(c="\u03bcm",b*=1E6):1>d?(c="mm",b*=1E3):1E3>d?c="m":(c="km",b/=1E3):"us"==e?.9144>d?(c="in",b*=39.37):1609.344>d?(c="ft",b/=.30480061):(c="mi",b/=1609.3472):
xa(!1,33);for(var e=3*Math.floor(Math.log(a.l*b)/Math.log(10)),f;;){f=Jk[(e%3+3)%3]*Math.pow(10,Math.floor(e/3));d=Math.round(f/b);if(isNaN(d)){a.c.style.display="none";a.j=!1;return}if(d>=a.l)break;++e}b=f+" "+c;a.D!=b&&(a.o.innerHTML=b,a.D=b);a.B!=d&&(a.o.style.width=d+"px",a.B=d);a.j||(a.c.style.display="",a.j=!0)}else a.j&&(a.c.style.display="none",a.j=!1)}var Ik="units";function Lk(a){a=a?a:{};this.c=void 0;this.j=Mk;this.D=this.l=0;this.I=null;this.na=!1;this.T=void 0!==a.duration?a.duration:200;var b=void 0!==a.className?a.className:"ol-zoomslider",c=document.createElement("button");c.setAttribute("type","button");c.className=b+"-thumb ol-unselectable";var d=document.createElement("div");d.className=b+" ol-unselectable ol-control";d.appendChild(c);this.o=new Ae(d);y(this.o,"pointerdown",this.yl,this);y(this.o,"pointermove",this.wl,this);y(this.o,"pointerup",this.xl,
this);y(d,"click",this.vl,this);y(c,"click",Pc);md.call(this,{element:d,render:a.render?a.render:Nk})}v(Lk,md);Lk.prototype.ka=function(){Nc(this.o);md.prototype.ka.call(this)};var Mk=0;k=Lk.prototype;k.setMap=function(a){md.prototype.setMap.call(this,a);a&&a.render()};
function Nk(a){if(a.frameState){if(!this.na){var b=this.element,c=b.offsetWidth,d=b.offsetHeight,e=b.firstElementChild,f=getComputedStyle(e),b=e.offsetWidth+parseFloat(f.marginRight)+parseFloat(f.marginLeft),e=e.offsetHeight+parseFloat(f.marginTop)+parseFloat(f.marginBottom);this.I=[b,e];c>d?(this.j=1,this.D=c-b):(this.j=Mk,this.l=d-e);this.na=!0}a=a.frameState.viewState.resolution;a!==this.c&&(this.c=a,Ok(this,a))}}
k.vl=function(a){var b=this.a.Z();a=Pk(this,Ca(1===this.j?(a.offsetX-this.I[0]/2)/this.D:(a.offsetY-this.I[1]/2)/this.l,0,1));b.animate({resolution:b.constrainResolution(a),duration:this.T,easing:rd})};k.yl=function(a){this.u||a.b.target!==this.element.firstElementChild||(cg(this.a.Z(),1,1),this.C=a.clientX,this.B=a.clientY,this.u=!0)};
k.wl=function(a){if(this.u){var b=this.element.firstElementChild;this.c=Pk(this,Ca(1===this.j?(a.clientX-this.C+parseInt(b.style.left,10))/this.D:(a.clientY-this.B+parseInt(b.style.top,10))/this.l,0,1));this.a.Z().Vc(this.c);Ok(this,this.c);this.C=a.clientX;this.B=a.clientY}};k.xl=function(){if(this.u){var a=this.a.Z();cg(a,1,-1);a.animate({resolution:a.constrainResolution(this.c),duration:this.T,easing:rd});this.u=!1;this.B=this.C=void 0}};
function Ok(a,b){b=1-ig(a.a.Z())(b);var c=a.element.firstElementChild;1==a.j?c.style.left=a.D*b+"px":c.style.top=a.l*b+"px"}function Pk(a,b){return hg(a.a.Z())(1-b)};function Qk(a){a=a?a:{};this.c=a.extent?a.extent:null;var b=void 0!==a.className?a.className:"ol-zoom-extent",c=void 0!==a.label?a.label:"E",d=void 0!==a.tipLabel?a.tipLabel:"Fit to extent",e=document.createElement("button");e.setAttribute("type","button");e.title=d;e.appendChild("string"===typeof c?document.createTextNode(c):c);y(e,"click",this.j,this);c=document.createElement("div");c.className=b+" ol-unselectable ol-control";c.appendChild(e);md.call(this,{element:c,target:a.target})}v(Qk,md);
Qk.prototype.j=function(a){a.preventDefault();a=this.a.Z();var b=this.c?this.c:a.v.G();a.Qf(b)};function Rk(a){Tc.call(this);a=a?a:{};this.a=null;y(this,Vc(Sk),this.vm,this);this.gg(void 0!==a.tracking?a.tracking:!1)}v(Rk,Tc);k=Rk.prototype;k.ka=function(){this.gg(!1);Tc.prototype.ka.call(this)};
k.ap=function(a){if(null!==a.alpha){var b=Ha(a.alpha);this.set(Tk,b);"boolean"===typeof a.absolute&&a.absolute?this.set(Uk,b):"number"===typeof a.webkitCompassHeading&&-1!=a.webkitCompassAccuracy&&this.set(Uk,Ha(a.webkitCompassHeading))}null!==a.beta&&this.set(Vk,Ha(a.beta));null!==a.gamma&&this.set(Wk,Ha(a.gamma));this.s()};k.Fk=function(){return this.get(Tk)};k.Ik=function(){return this.get(Vk)};k.Ok=function(){return this.get(Wk)};k.um=function(){return this.get(Uk)};k.Th=function(){return this.get(Sk)};
k.vm=function(){if(Vd){var a=this.Th();a&&!this.a?this.a=y(window,"deviceorientation",this.ap,this):a||null===this.a||(Ec(this.a),this.a=null)}};k.gg=function(a){this.set(Sk,a)};var Tk="alpha",Vk="beta",Wk="gamma",Uk="heading",Sk="tracking";function Xk(a){this.f=a.opacity;this.l=a.rotateWithView;this.g=a.rotation;this.a=a.scale;this.v=a.snapToPixel}k=Xk.prototype;k.Ze=function(){return this.f};k.$e=function(){return this.l};k.af=function(){return this.g};k.bf=function(){return this.a};k.Ae=function(){return this.v};k.td=function(a){this.f=a};k.cf=function(a){this.g=a};k.ud=function(a){this.a=a};function Yk(a){this.D=this.u=this.c=null;this.Va=void 0!==a.fill?a.fill:null;this.oa=[0,0];this.o=a.points;this.b=void 0!==a.radius?a.radius:a.radius1;this.i=a.radius2;this.j=void 0!==a.angle?a.angle:0;this.Ya=void 0!==a.stroke?a.stroke:null;this.B=this.ra=this.C=null;this.S=a.atlasManager;Zk(this,this.S);Xk.call(this,{opacity:1,rotateWithView:void 0!==a.rotateWithView?a.rotateWithView:!1,rotation:void 0!==a.rotation?a.rotation:0,scale:1,snapToPixel:void 0!==a.snapToPixel?a.snapToPixel:!0})}
v(Yk,Xk);k=Yk.prototype;k.clone=function(){var a=new Yk({fill:this.Fa()?this.Fa().clone():void 0,points:this.o,radius:this.b,radius2:this.i,angle:this.j,snapToPixel:this.v,stroke:this.Ga()?this.Ga().clone():void 0,rotation:this.g,rotateWithView:this.l,atlasManager:this.S});a.td(this.f);a.ud(this.a);return a};k.Hc=function(){return this.C};k.Pi=function(){return this.j};k.Fa=function(){return this.Va};k.qg=function(){return this.D};k.Y=function(){return this.u};k.ye=function(){return this.B};
k.Ye=function(){return 2};k.Oc=function(){return this.oa};k.Qi=function(){return this.o};k.Ri=function(){return this.b};k.Fh=function(){return this.i};k.ic=function(){return this.ra};k.Ga=function(){return this.Ya};k.Nh=function(){};k.load=function(){};k.Bj=function(){};
function Zk(a,b){var c="",d="",e=0,f=null,g=0;if(a.Ya){var h=a.Ya.a;null===h&&(h=Uh);h=id(h);g=a.Ya.c;void 0===g&&(g=1);f=a.Ya.i;Td||(f=null);d=a.Ya.j;void 0===d&&(d="round");c=a.Ya.f;void 0===c&&(c="round");e=a.Ya.o;void 0===e&&(e=10)}var l=2*(a.b+g)+1,c={strokeStyle:h,zj:g,size:l,lineCap:c,lineDash:f,lineJoin:d,miterLimit:e};if(void 0===b){var m=jd(l,l);a.u=m.canvas;b=l=a.u.width;a.rh(c,m,0,0);a.Va?a.D=a.u:(m=jd(c.size,c.size),a.D=m.canvas,a.qh(c,m,0,0))}else l=Math.round(l),(d=!a.Va)&&(m=a.qh.bind(a,
c)),a.Ya?(e=a.Ya,void 0===e.b&&(e.b="s",e.b=e.a?"string"===typeof e.a?e.b+e.a:e.b+w(e.a).toString():e.b+"-",e.b+=","+(void 0!==e.f?e.f.toString():"-")+","+(e.i?e.i.toString():"-")+","+(void 0!==e.g?e.g:"-")+","+(void 0!==e.j?e.j:"-")+","+(void 0!==e.o?e.o.toString():"-")+","+(void 0!==e.c?e.c.toString():"-")),e=e.b):e="-",a.Va?(f=a.Va,void 0===f.a&&(f.a=f.b instanceof CanvasPattern||f.b instanceof CanvasGradient?w(f.b).toString():"f"+(f.b?gd(f.b):"-")),f=f.a):f="-",a.c&&e==a.c[1]&&f==a.c[2]&&a.b==
a.c[3]&&a.i==a.c[4]&&a.j==a.c[5]&&a.o==a.c[6]||(a.c=["r"+e+f+(void 0!==a.b?a.b.toString():"-")+(void 0!==a.i?a.i.toString():"-")+(void 0!==a.j?a.j.toString():"-")+(void 0!==a.o?a.o.toString():"-"),e,f,a.b,a.i,a.j,a.o]),m=b.add(a.c[0],l,l,a.rh.bind(a,c),m),a.u=m.image,a.oa=[m.offsetX,m.offsetY],b=m.image.width,a.D=d?m.Zl:a.u;a.C=[l/2,l/2];a.ra=[l,l];a.B=[b,b]}
k.rh=function(a,b,c,d){b.setTransform(1,0,0,1,0,0);b.translate(c,d);b.beginPath();var e=this.o;if(Infinity===e)b.arc(a.size/2,a.size/2,this.b,0,2*Math.PI,!0);else{var f=void 0!==this.i?this.i:this.b;f!==this.b&&(e*=2);for(c=0;c<=e;c++){d=2*c*Math.PI/e-Math.PI/2+this.j;var g=c%2?f:this.b;b.lineTo(a.size/2+g*Math.cos(d),a.size/2+g*Math.sin(d))}}this.Va&&(c=this.Va.b,null===c&&(c=Sh),b.fillStyle=id(c),b.fill());this.Ya&&(b.strokeStyle=a.strokeStyle,b.lineWidth=a.zj,a.lineDash&&b.setLineDash(a.lineDash),
b.lineCap=a.lineCap,b.lineJoin=a.lineJoin,b.miterLimit=a.miterLimit,b.stroke());b.closePath()};
k.qh=function(a,b,c,d){b.setTransform(1,0,0,1,0,0);b.translate(c,d);b.beginPath();c=this.o;if(Infinity===c)b.arc(a.size/2,a.size/2,this.b,0,2*Math.PI,!0);else{d=void 0!==this.i?this.i:this.b;d!==this.b&&(c*=2);var e;for(e=0;e<=c;e++){var f=2*e*Math.PI/c-Math.PI/2+this.j;var g=e%2?d:this.b;b.lineTo(a.size/2+g*Math.cos(f),a.size/2+g*Math.sin(f))}}b.fillStyle=Sh;b.fill();this.Ya&&(b.strokeStyle=a.strokeStyle,b.lineWidth=a.zj,a.lineDash&&b.setLineDash(a.lineDash),b.stroke());b.closePath()};function $k(a){a=a||{};Yk.call(this,{points:Infinity,fill:a.fill,radius:a.radius,snapToPixel:a.snapToPixel,stroke:a.stroke,atlasManager:a.atlasManager})}v($k,Yk);$k.prototype.clone=function(){var a=new $k({fill:this.Fa()?this.Fa().clone():void 0,stroke:this.Ga()?this.Ga().clone():void 0,radius:this.b,snapToPixel:this.v,atlasManager:this.S});a.td(this.f);a.ud(this.a);return a};$k.prototype.Uc=function(a){this.b=a;Zk(this,this.S)};function al(a){a=a||{};this.b=void 0!==a.color?a.color:null;this.a=void 0}al.prototype.clone=function(){var a=this.b;return new al({color:a&&a.slice?a.slice():a||void 0})};al.prototype.i=function(){return this.b};al.prototype.c=function(a){this.b=a;this.a=void 0};function bl(a){a=a||{};this.Gc=null;this.Za=cl;void 0!==a.geometry&&this.Ra(a.geometry);this.Va=void 0!==a.fill?a.fill:null;this.M=void 0!==a.image?a.image:null;this.Ya=void 0!==a.stroke?a.stroke:null;this.Ia=void 0!==a.text?a.text:null;this.Fj=a.zIndex}k=bl.prototype;
k.clone=function(){var a=this.V();a&&a.clone&&(a=a.clone());return new bl({geometry:a,fill:this.Fa()?this.Fa().clone():void 0,image:this.Y()?this.Y().clone():void 0,stroke:this.Ga()?this.Ga().clone():void 0,text:this.Na()?this.Na().clone():void 0,zIndex:this.Ba()})};k.V=function(){return this.Gc};k.Pk=function(){return this.Za};k.Fa=function(){return this.Va};k.pf=function(a){this.Va=a};k.Y=function(){return this.M};k.Og=function(a){this.M=a};k.Ga=function(){return this.Ya};
k.qf=function(a){this.Ya=a};k.Na=function(){return this.Ia};k.xd=function(a){this.Ia=a};k.Ba=function(){return this.Fj};k.Ra=function(a){"function"===typeof a?this.Za=a:"string"===typeof a?this.Za=function(b){return b.get(a)}:a?a&&(this.Za=function(){return a}):this.Za=cl;this.Gc=a};k.Vb=function(a){this.Fj=a};function dl(a){if("function"!==typeof a){if(Array.isArray(a))var b=a;else xa(a instanceof bl,41),b=[a];a=function(){return b}}return a}var el=null;
function fl(){if(!el){var a=new al({color:"rgba(255,255,255,0.4)"}),b=new wj({color:"#3399CC",width:1.25});el=[new bl({image:new $k({fill:a,stroke:b,radius:5}),fill:a,stroke:b})]}return el}
function gl(){var a={},b=[255,255,255,1],c=[0,153,255,1];a.Polygon=[new bl({fill:new al({color:[255,255,255,.5]})})];a.MultiPolygon=a.Polygon;a.LineString=[new bl({stroke:new wj({color:b,width:5})}),new bl({stroke:new wj({color:c,width:3})})];a.MultiLineString=a.LineString;a.Circle=a.Polygon.concat(a.LineString);a.Point=[new bl({image:new $k({radius:6,fill:new al({color:c}),stroke:new wj({color:b,width:1.5})}),zIndex:Infinity})];a.MultiPoint=a.Point;a.GeometryCollection=a.Polygon.concat(a.LineString,
a.Point);return a}function cl(a){return a.V()};function H(a){Tc.call(this);this.a=void 0;this.c="geometry";this.g=null;this.j=void 0;this.f=null;y(this,Vc(this.c),this.Ee,this);void 0!==a&&(a instanceof of||!a?this.Ra(a):this.H(a))}v(H,Tc);k=H.prototype;k.clone=function(){var a=new H(this.N());a.Tc(this.c);var b=this.V();b&&a.Ra(b.clone());(b=this.g)&&a.hg(b);return a};k.V=function(){return this.get(this.c)};k.wm=function(){return this.a};k.Qk=function(){return this.c};k.xm=function(){return this.g};k.Lc=function(){return this.j};k.Al=function(){this.s()};
k.Ee=function(){this.f&&(Ec(this.f),this.f=null);var a=this.V();a&&(this.f=y(a,"change",this.Al,this));this.s()};k.Ra=function(a){this.set(this.c,a)};k.hg=function(a){this.j=(this.g=a)?hl(a):void 0;this.s()};k.jc=function(a){this.a=a;this.s()};k.Tc=function(a){Kc(this,Vc(this.c),this.Ee,this);this.c=a;y(this,Vc(this.c),this.Ee,this);this.Ee()};
function hl(a){var b;if("function"===typeof a)2==a.length?b=function(b){return a(this,b)}:b=a;else{if(Array.isArray(a))var c=a;else xa(a instanceof bl,41),c=[a];b=function(){return c}}return b};var il=document.implementation.createDocument("","",null);function jl(a,b){return il.createElementNS(a,b)}function kl(a,b){return ll(a,b,[]).join("")}function ll(a,b,c){if(a.nodeType==Node.CDATA_SECTION_NODE||a.nodeType==Node.TEXT_NODE)b?c.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):c.push(a.nodeValue);else for(a=a.firstChild;a;a=a.nextSibling)ll(a,b,c);return c}function ml(a){return a instanceof Document}function nl(a){return a instanceof Node}
function pl(a){return(new DOMParser).parseFromString(a,"application/xml")}function ql(a,b){return function(c,d){c=a.call(b,c,d);void 0!==c&&la(d[d.length-1],c)}}function rl(a,b){return function(c,d){c=a.call(void 0!==b?b:this,c,d);void 0!==c&&d[d.length-1].push(c)}}function sl(a,b){return function(c,d){c=a.call(void 0!==b?b:this,c,d);void 0!==c&&(d[d.length-1]=c)}}
function tl(a){return function(b,c){var d=a.call(this,b,c);if(void 0!==d){c=c[c.length-1];b=b.localName;var e;b in c?e=c[b]:e=c[b]=[];e.push(d)}}}function I(a,b){return function(c,d){var e=a.call(this,c,d);void 0!==e&&(d[d.length-1][void 0!==b?b:c.localName]=e)}}function J(a,b){return function(c,d,e){a.call(void 0!==b?b:this,c,d,e);e[e.length-1].node.appendChild(c)}}
function vl(a){var b,c;return function(d,e,f){if(!b){b={};var g={};g[d.localName]=a;b[d.namespaceURI]=g;c=wl(d.localName)}xl(b,c,e,f)}}function wl(a,b){return function(c,d,e){c=d[d.length-1].node;d=a;void 0===d&&(d=e);e=b;void 0===b&&(e=c.namespaceURI);return jl(e,d)}}var yl=wl();function zl(a,b){for(var c=b.length,d=Array(c),e=0;e<c;++e)d[e]=a[b[e]];return d}function K(a,b,c){c=void 0!==c?c:{};var d;var e=0;for(d=a.length;e<d;++e)c[a[e]]=b;return c}
function Al(a,b,c,d){for(b=b.firstElementChild;b;b=b.nextElementSibling){var e=a[b.namespaceURI];void 0!==e&&(e=e[b.localName])&&e.call(d,b,c)}}function N(a,b,c,d,e){d.push(a);Al(b,c,d,e);return d.pop()}function xl(a,b,c,d,e,f){for(var g=(void 0!==e?e:c).length,h,l,m=0;m<g;++m)h=c[m],void 0!==h&&(l=b.call(f,h,d,void 0!==e?e[m]:void 0),void 0!==l&&a[l.namespaceURI][l.localName].call(f,l,h,d))}function Bl(a,b,c,d,e,f,g){e.push(a);xl(b,c,d,e,f,g);e.pop()};function Cl(a,b,c,d){return function(e,f,g){var h=new XMLHttpRequest;h.open("GET","function"===typeof a?a(e,f,g):a,!0);"arraybuffer"==b.U()&&(h.responseType="arraybuffer");h.onload=function(){if(!h.status||200<=h.status&&300>h.status){var a=b.U();if("json"==a||"text"==a)var e=h.responseText;else"xml"==a?(e=h.responseXML)||(e=pl(h.responseText)):"arraybuffer"==a&&(e=h.response);e?c.call(this,b.Oa(e,{featureProjection:g}),b.kb(e)):d.call(this)}else d.call(this)}.bind(this);h.onerror=function(){d.call(this)}.bind(this);
h.send()}}function Dl(a,b){return Cl(a,b,function(a){this.cd(a)},ua)};function El(){this.f=this.defaultDataProjection=null}function Fl(a,b,c){var d;c&&(d={dataProjection:c.dataProjection?c.dataProjection:a.kb(b),featureProjection:c.featureProjection});return Gl(a,d)}function Gl(a,b){return tb({dataProjection:a.defaultDataProjection,featureProjection:a.f},b)}
function Hl(a,b,c){var d=c?Tb(c.featureProjection):null,e=c?Tb(c.dataProjection):null,f;d&&e&&!dc(d,e)?a instanceof of?f=(b?a.clone():a).tb(b?d:e,b?e:d):f=hc(a,e,d):f=a;if(b&&c&&void 0!==c.decimals){var g=Math.pow(10,c.decimals);f===a&&(f=f.clone());f.Dc(function(a){for(var b=0,c=a.length;b<c;++b)a[b]=Math.round(a[b]*g)/g;return a})}return f};function Il(){El.call(this)}v(Il,El);function Jl(a){return"string"===typeof a?(a=JSON.parse(a))?a:null:null!==a?a:null}k=Il.prototype;k.U=function(){return"json"};k.Tb=function(a,b){return this.Rc(Jl(a),Fl(this,a,b))};k.Oa=function(a,b){return this.yg(Jl(a),Fl(this,a,b))};k.Sc=function(a,b){return this.Cg(Jl(a),Fl(this,a,b))};k.kb=function(a){return this.Fg(Jl(a))};k.Bd=function(a,b){return JSON.stringify(this.Zc(a,b))};k.Wb=function(a,b){return JSON.stringify(this.he(a,b))};
k.$c=function(a,b){return JSON.stringify(this.je(a,b))};function Kl(a,b,c,d,e,f){var g=NaN,h=NaN,l=(c-b)/d;if(1===l)g=a[b],h=a[b+1];else if(2==l)g=(1-e)*a[b]+e*a[b+d],h=(1-e)*a[b+1]+e*a[b+d+1];else if(l){var h=a[b],l=a[b+1],m=0,g=[0],n;for(n=b+d;n<c;n+=d){var p=a[n],q=a[n+1],m=m+Math.sqrt((p-h)*(p-h)+(q-l)*(q-l));g.push(m);h=p;l=q}c=e*m;l=0;m=g.length;for(n=!1;l<m;)e=l+(m-l>>1),h=+ia(g[e],c),0>h?l=e+1:(m=e,n=!h);e=n?l:~l;0>e?(c=(c-g[-e-2])/(g[-e-1]-g[-e-2]),b+=(-e-2)*d,g=Ja(a[b],a[b+d],c),h=Ja(a[b+1],a[b+d+1],c)):(g=a[b+e*d],h=a[b+e*d+1])}return f?(f[0]=
g,f[1]=h,f):[g,h]}function Ll(a,b,c,d,e,f){if(c==b)return null;if(e<a[b+d-1])return f?(c=a.slice(b,b+d),c[d-1]=e,c):null;if(a[c-1]<e)return f?(c=a.slice(c-d,c),c[d-1]=e,c):null;if(e==a[b+d-1])return a.slice(b,b+d);b/=d;for(c/=d;b<c;)f=b+c>>1,e<a[(f+1)*d-1]?c=f:b=f+1;c=a[b*d-1];if(e==c)return a.slice((b-1)*d,(b-1)*d+d);f=(e-c)/(a[(b+1)*d-1]-c);c=[];var g;for(g=0;g<d-1;++g)c.push(Ja(a[(b-1)*d+g],a[b*d+g],f));c.push(e);return c}
function Ml(a,b,c,d,e,f){var g=0;if(f)return Ll(a,g,b[b.length-1],c,d,e);if(d<a[c-1])return e?(a=a.slice(0,c),a[c-1]=d,a):null;if(a[a.length-1]<d)return e?(a=a.slice(a.length-c),a[c-1]=d,a):null;e=0;for(f=b.length;e<f;++e){var h=b[e];if(g!=h){if(d<a[g+c-1])break;else if(d<=a[h-1])return Ll(a,g,h,c,d,!1);g=h}}return null};function O(a,b){rf.call(this);this.c=null;this.u=this.D=this.j=-1;this.ma(a,b)}v(O,rf);k=O.prototype;k.mk=function(a){this.A?la(this.A,a):this.A=a.slice();this.s()};k.clone=function(){var a=new O(null);a.ba(this.ja,this.A.slice());return a};k.Kb=function(a,b,c,d){if(d<Sa(this.G(),a,b))return d;this.u!=this.i&&(this.D=Math.sqrt(yf(this.A,0,this.A.length,this.a,0)),this.u=this.i);return Af(this.A,0,this.A.length,this.a,this.D,!1,a,b,c,d)};
k.Ck=function(a,b){return Pf(this.A,0,this.A.length,this.a,a,b)};k.nn=function(a,b){return"XYM"!=this.ja&&"XYZM"!=this.ja?null:Ll(this.A,0,this.A.length,this.a,a,void 0!==b?b:!1)};k.X=function(){return Ff(this.A,0,this.A.length,this.a)};k.wh=function(a,b){return Kl(this.A,0,this.A.length,this.a,a,b)};k.pn=function(){var a=this.A,b=this.a,c=a[0],d=a[1],e=0,f;for(f=0+b;f<this.A.length;f+=b)var g=a[f],h=a[f+1],e=e+Math.sqrt((g-c)*(g-c)+(h-d)*(h-d)),c=g,d=h;return e};
function di(a){a.j!=a.i&&(a.c=a.wh(.5,a.c),a.j=a.i);return a.c}k.hd=function(a){var b=[];b.length=Hf(this.A,0,this.A.length,this.a,a,b,0);a=new O(null);a.ba("XY",b);return a};k.U=function(){return"LineString"};k.Xa=function(a){return Qf(this.A,0,this.A.length,this.a,a)};k.ma=function(a,b){a?(uf(this,b,a,1),this.A||(this.A=[]),this.A.length=Df(this.A,0,a,this.a),this.s()):this.ba("XY",null)};k.ba=function(a,b){tf(this,a,b);this.s()};function P(a,b){rf.call(this);this.c=[];this.j=this.u=-1;this.ma(a,b)}v(P,rf);k=P.prototype;k.nk=function(a){this.A?la(this.A,a.ga().slice()):this.A=a.ga().slice();this.c.push(this.A.length);this.s()};k.clone=function(){var a=new P(null);a.ba(this.ja,this.A.slice(),this.c.slice());return a};k.Kb=function(a,b,c,d){if(d<Sa(this.G(),a,b))return d;this.j!=this.i&&(this.u=Math.sqrt(zf(this.A,0,this.c,this.a,0)),this.j=this.i);return Bf(this.A,0,this.c,this.a,this.u,!1,a,b,c,d)};
k.rn=function(a,b,c){return"XYM"!=this.ja&&"XYZM"!=this.ja||!this.A.length?null:Ml(this.A,this.c,this.a,a,void 0!==b?b:!1,void 0!==c?c:!1)};k.X=function(){return Gf(this.A,0,this.c,this.a)};k.Bb=function(){return this.c};k.Yk=function(a){if(0>a||this.c.length<=a)return null;var b=new O(null);b.ba(this.ja,this.A.slice(a?this.c[a-1]:0,this.c[a]));return b};
k.gd=function(){var a=this.A,b=this.c,c=this.ja,d=[],e=0,f;var g=0;for(f=b.length;g<f;++g){var h=b[g],l=new O(null);l.ba(c,a.slice(e,h));d.push(l);e=h}return d};function ei(a){var b=[],c=a.A,d=0,e=a.c;a=a.a;var f;var g=0;for(f=e.length;g<f;++g){var h=e[g],d=Kl(c,d,h,a,.5);la(b,d);d=h}return b}k.hd=function(a){var b=[],c=[],d=this.A,e=this.c,f=this.a,g=0,h=0,l;var m=0;for(l=e.length;m<l;++m){var n=e[m],h=Hf(d,g,n,f,a,b,h);c.push(h);g=n}b.length=h;a=new P(null);a.ba("XY",b,c);return a};k.U=function(){return"MultiLineString"};
k.Xa=function(a){a:{var b=this.A,c=this.c,d=this.a,e=0,f;var g=0;for(f=c.length;g<f;++g){if(Qf(b,e,c[g],d,a)){a=!0;break a}e=c[g]}a=!1}return a};k.ma=function(a,b){a?(uf(this,b,a,2),this.A||(this.A=[]),a=Ef(this.A,0,a,this.a,this.c),this.A.length=a.length?a[a.length-1]:0,this.s()):this.ba("XY",null,this.c)};k.ba=function(a,b,c){tf(this,a,b);this.c=c;this.s()};function Nl(a,b){var c=a.ja,d=[],e=[],f;var g=0;for(f=b.length;g<f;++g){var h=b[g];g||(c=h.ja);la(d,h.ga());e.push(d.length)}a.ba(c,d,e)};function Q(a,b){rf.call(this);this.ma(a,b)}v(Q,rf);k=Q.prototype;k.qk=function(a){this.A?la(this.A,a.ga()):this.A=a.ga().slice();this.s()};k.clone=function(){var a=new Q(null);a.ba(this.ja,this.A.slice());return a};k.Kb=function(a,b,c,d){if(d<Sa(this.G(),a,b))return d;var e=this.A,f=this.a,g;var h=0;for(g=e.length;h<g;h+=f){var l=Ga(a,b,e[h],e[h+1]);if(l<d){d=l;for(l=0;l<f;++l)c[l]=e[h+l];c.length=f}}return d};k.X=function(){return Ff(this.A,0,this.A.length,this.a)};
k.il=function(a){var b=this.A?this.A.length/this.a:0;if(0>a||b<=a)return null;b=new C(null);b.ba(this.ja,this.A.slice(a*this.a,(a+1)*this.a));return b};k.Zd=function(){var a=this.A,b=this.ja,c=this.a,d=[],e;var f=0;for(e=a.length;f<e;f+=c){var g=new C(null);g.ba(b,a.slice(f,f+c));d.push(g)}return d};k.U=function(){return"MultiPoint"};k.Xa=function(a){var b=this.A,c=this.a,d;var e=0;for(d=b.length;e<d;e+=c){var f=b[e];var g=b[e+1];if(Ua(a,f,g))return!0}return!1};
k.ma=function(a,b){a?(uf(this,b,a,1),this.A||(this.A=[]),this.A.length=Df(this.A,0,a,this.a),this.s()):this.ba("XY",null)};k.ba=function(a,b){tf(this,a,b);this.s()};function R(a,b){rf.call(this);this.c=[];this.u=-1;this.D=null;this.I=this.C=this.B=-1;this.j=null;this.ma(a,b)}v(R,rf);k=R.prototype;k.rk=function(a){if(this.A){var b=this.A.length;la(this.A,a.ga());a=a.Bb().slice();var c;var d=0;for(c=a.length;d<c;++d)a[d]+=b}else this.A=a.ga().slice(),a=a.Bb().slice(),this.c.push();this.c.push(a);this.s()};k.clone=function(){for(var a=new R(null),b=this.c.length,c=Array(b),d=0;d<b;++d)c[d]=this.c[d].slice();Ol(a,this.ja,this.A.slice(),c);return a};
k.Kb=function(a,b,c,d){if(d<Sa(this.G(),a,b))return d;if(this.C!=this.i){var e=this.c,f=0,g=0,h;var l=0;for(h=e.length;l<h;++l)var m=e[l],g=zf(this.A,f,m,this.a,g),f=m[m.length-1];this.B=Math.sqrt(g);this.C=this.i}e=fi(this);f=this.c;g=this.a;l=this.B;h=0;var m=[NaN,NaN],n;var p=0;for(n=f.length;p<n;++p){var q=f[p];d=Bf(e,h,q,g,l,!0,a,b,c,d,m);h=q[q.length-1]}return d};
k.Mc=function(a,b){a:{var c=fi(this),d=this.c,e=0;if(d.length){var f;var g=0;for(f=d.length;g<f;++g){var h=d[g];if(Nf(c,e,h,this.a,a,b)){a=!0;break a}e=h[h.length-1]}}a=!1}return a};k.sn=function(){var a=fi(this),b=this.c,c=0,d=0,e;var f=0;for(e=b.length;f<e;++f)var g=b[f],d=d+wf(a,c,g,this.a),c=g[g.length-1];return d};
k.X=function(a){if(void 0!==a){var b=fi(this).slice();Vf(b,this.c,this.a,a)}else b=this.A;a=b;b=this.c;var c=this.a,d=0,e=[],f=0,g;var h=0;for(g=b.length;h<g;++h){var l=b[h];e[f++]=Gf(a,d,l,c,e[f]);d=l[l.length-1]}e.length=f;return e};
function gi(a){if(a.u!=a.i){var b=a.A,c=a.c,d=a.a,e=0,f=[],g;var h=0;for(g=c.length;h<g;++h){var l=c[h],e=$a(b,e,l[0],d);f.push((e[0]+e[2])/2,(e[1]+e[3])/2);e=l[l.length-1]}b=fi(a);c=a.c;d=a.a;h=0;g=[];l=0;for(e=c.length;l<e;++l){var m=c[l];g=Of(b,h,m,d,f,2*l,g);h=m[m.length-1]}a.D=g;a.u=a.i}return a.D}k.Uk=function(){var a=new Q(null);a.ba("XY",gi(this).slice());return a};
function fi(a){if(a.I!=a.i){var b=a.A;a:{var c=a.c;var d;var e=0;for(d=c.length;e<d;++e)if(!Tf(b,c[e],a.a,void 0)){c=!1;break a}c=!0}c?a.j=b:(a.j=b.slice(),a.j.length=Vf(a.j,a.c,a.a));a.I=a.i}return a.j}k.hd=function(a){var b=[],c=[],d=this.A,e=this.c,f=this.a;a=Math.sqrt(a);var g=0,h=0,l;var m=0;for(l=e.length;m<l;++m){var n=e[m],p=[],h=If(d,g,n,f,a,b,h,p);c.push(p);g=n[n.length-1]}b.length=h;d=new R(null);Ol(d,"XY",b,c);return d};
k.jl=function(a){if(0>a||this.c.length<=a)return null;if(a){var b=this.c[a-1];b=b[b.length-1]}else b=0;a=this.c[a].slice();var c=a[a.length-1];if(b){var d;var e=0;for(d=a.length;e<d;++e)a[e]-=b}e=new D(null);e.ba(this.ja,this.A.slice(b,c),a);return e};k.Td=function(){var a=this.ja,b=this.A,c=this.c,d=[],e=0,f,g;var h=0;for(f=c.length;h<f;++h){var l=c[h].slice(),m=l[l.length-1];if(e){var n=0;for(g=l.length;n<g;++n)l[n]-=e}n=new D(null);n.ba(a,b.slice(e,m),l);d.push(n);e=m}return d};k.U=function(){return"MultiPolygon"};
k.Xa=function(a){a:{var b=fi(this),c=this.c,d=this.a,e=0,f;var g=0;for(f=c.length;g<f;++g){var h=c[g];if(Rf(b,e,h,d,a)){a=!0;break a}e=h[h.length-1]}a=!1}return a};k.ma=function(a,b){if(a){uf(this,b,a,3);this.A||(this.A=[]);b=this.A;var c=this.a,d=this.c,e=0,d=d?d:[],f=0,g;var h=0;for(g=a.length;h<g;++h)e=Ef(b,e,a[h],c,d[f]),d[f++]=e,e=e[e.length-1];d.length=f;d.length?(a=d[d.length-1],this.A.length=a.length?a[a.length-1]:0):this.A.length=0;this.s()}else Ol(this,"XY",null,this.c)};
function Ol(a,b,c,d){tf(a,b,c);a.c=d;a.s()}function Pl(a,b){var c=a.ja,d=[],e=[],f;var g=0;for(f=b.length;g<f;++g){var h=b[g];g||(c=h.ja);var l=d.length;var m=h.Bb();var n;var p=0;for(n=m.length;p<n;++p)m[p]+=l;la(d,h.ga());e.push(m)}Ol(a,c,d,e)};function Ql(a){a=a?a:{};El.call(this);this.b=a.geometryName}v(Ql,Il);
function Rl(a,b){if(!a)return null;if("number"===typeof a.x&&"number"===typeof a.y)var c="Point";else if(a.points)c="MultiPoint";else if(a.paths)c=1===a.paths.length?"LineString":"MultiLineString";else if(a.rings){var d=a.rings,e=Sl(a),f=[],g=[];c=[];var h;var l=0;for(h=d.length;l<h;++l)f.length=0,Df(f,0,d[l],e.length),Sf(f,0,f.length,e.length)?g.push([d[l]]):c.push(d[l]);for(;c.length;){d=c.shift();e=!1;for(l=g.length-1;0<=l;l--)if(Va((new Jf(g[l][0])).G(),(new Jf(d)).G())){g[l].push(d);e=!0;break}e||
g.push([d.reverse()])}a=tb({},a);1===g.length?(c="Polygon",a.rings=g[0]):(c="MultiPolygon",a.rings=g)}return Hl((0,Tl[c])(a),!1,b)}function Sl(a){var b="XY";!0===a.hasZ&&!0===a.hasM?b="XYZM":!0===a.hasZ?b="XYZ":!0===a.hasM&&(b="XYM");return b}function Ul(a){a=a.ja;return{hasZ:"XYZ"===a||"XYZM"===a,hasM:"XYM"===a||"XYZM"===a}}
var Tl={Point:function(a){return void 0!==a.m&&void 0!==a.z?new C([a.x,a.y,a.z,a.m],"XYZM"):void 0!==a.z?new C([a.x,a.y,a.z],"XYZ"):void 0!==a.m?new C([a.x,a.y,a.m],"XYM"):new C([a.x,a.y])},LineString:function(a){return new O(a.paths[0],Sl(a))},Polygon:function(a){return new D(a.rings,Sl(a))},MultiPoint:function(a){return new Q(a.points,Sl(a))},MultiLineString:function(a){return new P(a.paths,Sl(a))},MultiPolygon:function(a){return new R(a.rings,Sl(a))}},Vl={Point:function(a){var b=a.X(),c;a=a.ja;
"XYZ"===a?c={x:b[0],y:b[1],z:b[2]}:"XYM"===a?c={x:b[0],y:b[1],m:b[2]}:"XYZM"===a?c={x:b[0],y:b[1],z:b[2],m:b[3]}:"XY"===a?c={x:b[0],y:b[1]}:xa(!1,34);return c},LineString:function(a){var b=Ul(a);return{hasZ:b.hasZ,hasM:b.hasM,paths:[a.X()]}},Polygon:function(a){var b=Ul(a);return{hasZ:b.hasZ,hasM:b.hasM,rings:a.X(!1)}},MultiPoint:function(a){var b=Ul(a);return{hasZ:b.hasZ,hasM:b.hasM,points:a.X()}},MultiLineString:function(a){var b=Ul(a);return{hasZ:b.hasZ,hasM:b.hasM,paths:a.X()}},MultiPolygon:function(a){var b=
Ul(a);a=a.X(!1);for(var c=[],d=0;d<a.length;d++)for(var e=a[d].length-1;0<=e;e--)c.push(a[d][e]);return{hasZ:b.hasZ,hasM:b.hasM,rings:c}}};k=Ql.prototype;k.Rc=function(a,b){var c=Rl(a.geometry,b),d=new H;this.b&&d.Tc(this.b);d.Ra(c);b&&b.dg&&a.attributes[b.dg]&&d.jc(a.attributes[b.dg]);a.attributes&&d.H(a.attributes);return d};k.yg=function(a,b){b=b?b:{};if(a.features){var c=[],d=a.features,e;b.dg=a.objectIdFieldName;a=0;for(e=d.length;a<e;++a)c.push(this.Rc(d[a],b));return c}return[this.Rc(a,b)]};
k.Cg=function(a,b){return Rl(a,b)};k.Fg=function(a){return a.spatialReference&&a.spatialReference.wkid?Tb("EPSG:"+a.spatialReference.wkid):null};function Wl(a,b){return(0,Vl[a.U()])(Hl(a,!0,b),b)}k.je=function(a,b){return Wl(a,Gl(this,b))};k.Zc=function(a,b){b=Gl(this,b);var c={},d=a.V();d&&(c.geometry=Wl(d,b));d=a.N();delete d[a.c];c.attributes=wb(d)?{}:d;b&&b.featureProjection&&(c.spatialReference={wkid:Tb(b.featureProjection).mb.split(":").pop()});return c};
k.he=function(a,b){b=Gl(this,b);var c=[],d;var e=0;for(d=a.length;e<d;++e)c.push(this.Zc(a[e],b));return{features:c}};function Xl(a){this.kc=a};function Yl(a,b){this.kc=a;this.b=Array.prototype.slice.call(arguments,1);xa(2<=this.b.length,57)}v(Yl,Xl);function Zl(a){var b=["And"].concat(Array.prototype.slice.call(arguments));Yl.apply(this,b)}v(Zl,Yl);function $l(a,b,c){this.kc="BBOX";this.geometryName=a;this.extent=b;this.srsName=c}v($l,Xl);function am(a,b){this.kc=a;this.b=b}v(am,Xl);function bm(a,b,c){am.call(this,"During",a);this.a=b;this.i=c}v(bm,am);function cm(a,b,c,d){am.call(this,a,b);this.i=c;this.a=d}v(cm,am);function dm(a,b,c){cm.call(this,"PropertyIsEqualTo",a,b,c)}v(dm,cm);function em(a,b){cm.call(this,"PropertyIsGreaterThan",a,b)}v(em,cm);function fm(a,b){cm.call(this,"PropertyIsGreaterThanOrEqualTo",a,b)}v(fm,cm);function gm(a,b,c,d){this.kc=a;this.geometryName=b||"the_geom";this.geometry=c;this.srsName=d}v(gm,Xl);function hm(a,b,c){gm.call(this,"Intersects",a,b,c)}v(hm,gm);function im(a,b,c){am.call(this,"PropertyIsBetween",a);this.a=b;this.i=c}v(im,am);function jm(a,b,c,d,e,f){am.call(this,"PropertyIsLike",a);this.c=b;this.g=void 0!==c?c:"*";this.f=void 0!==d?d:".";this.i=void 0!==e?e:"!";this.a=f}v(jm,am);function km(a){am.call(this,"PropertyIsNull",a)}v(km,am);function lm(a,b){cm.call(this,"PropertyIsLessThan",a,b)}v(lm,cm);function mm(a,b){cm.call(this,"PropertyIsLessThanOrEqualTo",a,b)}v(mm,cm);function nm(a){this.kc="Not";this.condition=a}v(nm,Xl);function om(a,b,c){cm.call(this,"PropertyIsNotEqualTo",a,b,c)}v(om,cm);function pm(a){var b=["Or"].concat(Array.prototype.slice.call(arguments));Yl.apply(this,b)}v(pm,Yl);function qm(a,b,c){gm.call(this,"Within",a,b,c)}v(qm,gm);function rm(a){var b=[null].concat(Array.prototype.slice.call(arguments));return new (Function.prototype.bind.apply(Zl,b))}function sm(a,b,c){return new $l(a,b,c)};function tm(a){of.call(this);this.a=a?a:null;um(this)}v(tm,of);function vm(a){var b=[],c;var d=0;for(c=a.length;d<c;++d)b.push(a[d].clone());return b}function wm(a){var b;if(a.a){var c=0;for(b=a.a.length;c<b;++c)Kc(a.a[c],"change",a.s,a)}}function um(a){var b;if(a.a){var c=0;for(b=a.a.length;c<b;++c)y(a.a[c],"change",a.s,a)}}k=tm.prototype;k.clone=function(){var a=new tm(null);a.oj(this.a);return a};
k.Kb=function(a,b,c,d){if(d<Sa(this.G(),a,b))return d;var e=this.a,f;var g=0;for(f=e.length;g<f;++g)d=e[g].Kb(a,b,c,d);return d};k.Mc=function(a,b){var c=this.a,d;var e=0;for(d=c.length;e<d;++e)if(c[e].Mc(a,b))return!0;return!1};k.se=function(a){Ya(a);for(var b=this.a,c=0,d=b.length;c<d;++c)cb(a,b[c].G());return a};k.Vf=function(){return vm(this.a)};
k.Vd=function(a){this.o!=this.i&&(ub(this.f),this.g=0,this.o=this.i);if(0>a||this.g&&a<this.g)return this;var b=a.toString();if(this.f.hasOwnProperty(b))return this.f[b];var c=[],d=this.a,e=!1,f;var g=0;for(f=d.length;g<f;++g){var h=d[g],l=h.Vd(a);c.push(l);l!==h&&(e=!0)}if(e)return a=new tm(null),wm(a),a.a=c,um(a),a.s(),this.f[b]=a;this.g=a;return this};k.U=function(){return"GeometryCollection"};k.Xa=function(a){var b=this.a,c;var d=0;for(c=b.length;d<c;++d)if(b[d].Xa(a))return!0;return!1};
k.rotate=function(a,b){for(var c=this.a,d=0,e=c.length;d<e;++d)c[d].rotate(a,b);this.s()};k.scale=function(a,b,c){c||(c=nb(this.G()));for(var d=this.a,e=0,f=d.length;e<f;++e)d[e].scale(a,b,c);this.s()};k.oj=function(a){a=vm(a);wm(this);this.a=a;um(this);this.s()};k.Dc=function(a){var b=this.a,c;var d=0;for(c=b.length;d<c;++d)b[d].Dc(a);this.s()};k.translate=function(a,b){var c=this.a,d;var e=0;for(d=c.length;e<d;++e)c[e].translate(a,b);this.s()};k.ka=function(){wm(this);of.prototype.ka.call(this)};function xm(a){a=a?a:{};El.call(this);this.defaultDataProjection=Tb(a.defaultDataProjection?a.defaultDataProjection:"EPSG:4326");a.featureProjection&&(this.f=Tb(a.featureProjection));this.b=a.geometryName}v(xm,Il);function ym(a,b){return a?Hl((0,zm[a.type])(a),!1,b):null}function Am(a,b){return(0,Bm[a.U()])(Hl(a,!0,b),b)}
var zm={Point:function(a){return new C(a.coordinates)},LineString:function(a){return new O(a.coordinates)},Polygon:function(a){return new D(a.coordinates)},MultiPoint:function(a){return new Q(a.coordinates)},MultiLineString:function(a){return new P(a.coordinates)},MultiPolygon:function(a){return new R(a.coordinates)},GeometryCollection:function(a,b){a=a.geometries.map(function(a){return ym(a,b)});return new tm(a)}},Bm={Point:function(a){return{type:"Point",coordinates:a.X()}},LineString:function(a){return{type:"LineString",
coordinates:a.X()}},Polygon:function(a,b){if(b)var c=b.rightHanded;return{type:"Polygon",coordinates:a.X(c)}},MultiPoint:function(a){return{type:"MultiPoint",coordinates:a.X()}},MultiLineString:function(a){return{type:"MultiLineString",coordinates:a.X()}},MultiPolygon:function(a,b){if(b)var c=b.rightHanded;return{type:"MultiPolygon",coordinates:a.X(c)}},GeometryCollection:function(a,b){return{type:"GeometryCollection",geometries:a.a.map(function(a){var c=tb({},b);delete c.featureProjection;return Am(a,
c)})}},Circle:function(){return{type:"GeometryCollection",geometries:[]}}};k=xm.prototype;k.Rc=function(a,b){a="Feature"===a.type?a:{type:"Feature",geometry:a};b=ym(a.geometry,b);var c=new H;this.b&&c.Tc(this.b);c.Ra(b);void 0!==a.id&&c.jc(a.id);a.properties&&c.H(a.properties);return c};k.yg=function(a,b){if("FeatureCollection"===a.type){var c=[];a=a.features;var d;var e=0;for(d=a.length;e<d;++e)c.push(this.Rc(a[e],b))}else c=[this.Rc(a,b)];return c};k.Cg=function(a,b){return ym(a,b)};
k.Fg=function(a){a=a.crs;var b;a?"name"==a.type?b=Tb(a.properties.name):"EPSG"==a.type?b=Tb("EPSG:"+a.properties.code):xa(!1,36):b=this.defaultDataProjection;return b};k.Zc=function(a,b){b=Gl(this,b);var c={type:"Feature"},d=a.a;void 0!==d&&(c.id=d);(d=a.V())?c.geometry=Am(d,b):c.geometry=null;b=a.N();delete b[a.c];wb(b)?c.properties=null:c.properties=b;return c};k.he=function(a,b){b=Gl(this,b);var c=[],d;var e=0;for(d=a.length;e<d;++e)c.push(this.Zc(a[e],b));return{type:"FeatureCollection",features:c}};
k.je=function(a,b){return Am(a,Gl(this,b))};function Cm(){this.i=new XMLSerializer;El.call(this)}v(Cm,El);k=Cm.prototype;k.U=function(){return"xml"};k.Tb=function(a,b){return ml(a)?Dm(this,a,b):nl(a)?this.xg(a,b):"string"===typeof a?(a=pl(a),Dm(this,a,b)):null};function Dm(a,b,c){a=Em(a,b,c);return 0<a.length?a[0]:null}k.xg=function(){return null};k.Oa=function(a,b){return ml(a)?Em(this,a,b):nl(a)?this.zc(a,b):"string"===typeof a?(a=pl(a),Em(this,a,b)):[]};
function Em(a,b,c){var d=[];for(b=b.firstChild;b;b=b.nextSibling)b.nodeType==Node.ELEMENT_NODE&&la(d,a.zc(b,c));return d}k.Sc=function(a,b){if(ml(a))return null;if(nl(a))return this.aj(a,b);"string"===typeof a&&pl(a);return null};k.aj=function(){return null};k.kb=function(a){return ml(a)?this.Eg(a):nl(a)?this.kf(a):"string"===typeof a?(a=pl(a),this.Eg(a)):null};k.Eg=function(){return this.defaultDataProjection};k.kf=function(){return this.defaultDataProjection};
k.Bd=function(a,b){return this.i.serializeToString(this.Vg(a,b))};k.Vg=function(){return null};k.Wb=function(a,b){a=this.Xb(a,b);return this.i.serializeToString(a)};k.Xb=function(){return null};k.$c=function(a,b){a=this.ie(a,b);return this.i.serializeToString(a)};k.ie=function(){return null};function Fm(a){a=a?a:{};this.featureType=a.featureType;this.featureNS=a.featureNS;this.srsName=a.srsName;this.schemaLocation="";this.b={};this.b["http://www.opengis.net/gml"]={featureMember:sl(Fm.prototype.be),featureMembers:sl(Fm.prototype.be)};Cm.call(this)}v(Fm,Cm);var Gm=/^[\s\xa0]*$/;k=Fm.prototype;
k.be=function(a,b){var c=a.localName,d=null;if("FeatureCollection"==c)"http://www.opengis.net/wfs"===a.namespaceURI?d=N([],this.b,a,b,this):d=N(null,this.b,a,b,this);else if("featureMembers"==c||"featureMember"==c){var e=b[0],f=e.featureType,g=e.featureNS,h;if(!f&&a.childNodes){f=[];g={};var l=0;for(h=a.childNodes.length;l<h;++l){var m=a.childNodes[l];if(1===m.nodeType){var n=m.nodeName.split(":").pop();if(-1===f.indexOf(n)){var p="",q=0,m=m.namespaceURI,r;for(r in g){if(g[r]===m){p=r;break}++q}p||
(p="p"+q,g[p]=m);f.push(p+":"+n)}}}"featureMember"!=c&&(e.featureType=f,e.featureNS=g)}"string"===typeof g&&(l=g,g={},g.p0=l);var e={},f=Array.isArray(f)?f:[f],u;for(u in g){n={};l=0;for(h=f.length;l<h;++l)(-1===f[l].indexOf(":")?"p0":f[l].split(":")[0])===u&&(n[f[l].split(":").pop()]="featureMembers"==c?rl(this.wg,this):sl(this.wg,this));e[g[u]]=n}"featureMember"==c?d=N(void 0,e,a,b):d=N([],e,a,b)}null===d&&(d=[]);return d};
k.gf=function(a,b){var c=b[0];c.srsName=a.firstElementChild.getAttribute("srsName");if(a=N(null,this.Zg,a,b,this))return Hl(a,!1,c)};
k.wg=function(a,b){var c;(c=a.getAttribute("fid"))||(c=a.getAttributeNS("http://www.opengis.net/gml","id")||"");var d={},e;for(a=a.firstElementChild;a;a=a.nextElementSibling){var f=a.localName;if(0===a.childNodes.length||1===a.childNodes.length&&(3===a.firstChild.nodeType||4===a.firstChild.nodeType)){var g=kl(a,!1);Gm.test(g)&&(g=void 0);d[f]=g}else"boundedBy"!==f&&(e=f),d[f]=this.gf(a,b)}b=new H(d);e&&b.Tc(e);c&&b.jc(c);return b};
k.fj=function(a,b){if(a=this.ff(a,b))return b=new C(null),b.ba("XYZ",a),b};k.dj=function(a,b){if(a=N([],this.Nj,a,b,this))return new Q(a)};k.cj=function(a,b){if(a=N([],this.Mj,a,b,this))return b=new P(null),Nl(b,a),b};k.ej=function(a,b){if(a=N([],this.Oj,a,b,this))return b=new R(null),Pl(b,a),b};k.Xi=function(a,b){Al(this.Rj,a,b,this)};k.Mh=function(a,b){Al(this.Kj,a,b,this)};k.Yi=function(a,b){Al(this.Sj,a,b,this)};k.hf=function(a,b){if(a=this.ff(a,b))return b=new O(null),b.ba("XYZ",a),b};
k.wp=function(a,b){if(a=N(null,this.ke,a,b,this))return a};k.bj=function(a,b){if(a=this.ff(a,b))return b=new Jf(null),Kf(b,"XYZ",a),b};k.jf=function(a,b){if((a=N([null],this.zf,a,b,this))&&a[0]){b=new D(null);var c=a[0],d=[c.length],e;var f=1;for(e=a.length;f<e;++f)la(c,a[f]),d.push(c.length);b.ba("XYZ",c,d);return b}};k.ff=function(a,b){return N(null,this.ke,a,b,this)};k.Nj={"http://www.opengis.net/gml":{pointMember:rl(Fm.prototype.Xi),pointMembers:rl(Fm.prototype.Xi)}};
k.Mj={"http://www.opengis.net/gml":{lineStringMember:rl(Fm.prototype.Mh),lineStringMembers:rl(Fm.prototype.Mh)}};k.Oj={"http://www.opengis.net/gml":{polygonMember:rl(Fm.prototype.Yi),polygonMembers:rl(Fm.prototype.Yi)}};k.Rj={"http://www.opengis.net/gml":{Point:rl(Fm.prototype.ff)}};k.Kj={"http://www.opengis.net/gml":{LineString:rl(Fm.prototype.hf)}};k.Sj={"http://www.opengis.net/gml":{Polygon:rl(Fm.prototype.jf)}};k.le={"http://www.opengis.net/gml":{LinearRing:sl(Fm.prototype.wp)}};
k.aj=function(a,b){return(a=this.gf(a,[Fl(this,a,b?b:{})]))?a:null};k.zc=function(a,b){var c={featureType:this.featureType,featureNS:this.featureNS};b&&tb(c,Fl(this,a,b));return this.be(a,[c])||[]};k.kf=function(a){return Tb(this.srsName?this.srsName:a.firstElementChild.getAttribute("srsName"))};function Hm(a){a=kl(a,!1);return Im(a)}function Im(a){if(a=/^\s*(true|1)|(false|0)\s*$/.exec(a))return void 0!==a[1]||!1}function Jm(a){a=kl(a,!1);a=Date.parse(a);return isNaN(a)?void 0:a/1E3}function Km(a){a=kl(a,!1);return Lm(a)}function Lm(a){if(a=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(a))return parseFloat(a[1])}function Mm(a){a=kl(a,!1);return Nm(a)}function Nm(a){if(a=/^\s*(\d+)\s*$/.exec(a))return parseInt(a[1],10)}function S(a){return kl(a,!1).trim()}
function Om(a,b){Pm(a,b?"1":"0")}function Qm(a,b){a.appendChild(il.createTextNode(b.toPrecision()))}function Rm(a,b){a.appendChild(il.createTextNode(b.toString()))}function Pm(a,b){a.appendChild(il.createTextNode(b))};function Sm(a){a=a?a:{};Fm.call(this,a);this.l=void 0!==a.surface?a.surface:!1;this.c=void 0!==a.curve?a.curve:!1;this.g=void 0!==a.multiCurve?a.multiCurve:!0;this.j=void 0!==a.multiSurface?a.multiSurface:!0;this.schemaLocation=a.schemaLocation?a.schemaLocation:"http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd"}v(Sm,Fm);k=Sm.prototype;k.Ap=function(a,b){if(a=N([],this.Lj,a,b,this))return b=new P(null),Nl(b,a),b};
k.Bp=function(a,b){if(a=N([],this.Pj,a,b,this))return b=new R(null),Pl(b,a),b};k.ph=function(a,b){Al(this.Hj,a,b,this)};k.Aj=function(a,b){Al(this.Uj,a,b,this)};k.Ep=function(a,b){return N([null],this.Qj,a,b,this)};k.Hp=function(a,b){return N([null],this.Tj,a,b,this)};k.Fp=function(a,b){return N([null],this.zf,a,b,this)};k.zp=function(a,b){return N([null],this.ke,a,b,this)};k.cm=function(a,b){(a=N(void 0,this.le,a,b,this))&&b[b.length-1].push(a)};
k.yk=function(a,b){(a=N(void 0,this.le,a,b,this))&&(b[b.length-1][0]=a)};k.gj=function(a,b){if((a=N([null],this.Vj,a,b,this))&&a[0]){b=new D(null);var c=a[0],d=[c.length],e;var f=1;for(e=a.length;f<e;++f)la(c,a[f]),d.push(c.length);b.ba("XYZ",c,d);return b}};k.Zi=function(a,b){if(a=N([null],this.Ij,a,b,this))return b=new O(null),b.ba("XYZ",a),b};k.vp=function(a,b){a=N([null],this.Jj,a,b,this);return Xa(a[1][0],a[1][1],a[2][0],a[2][1])};
k.xp=function(a,b){var c=kl(a,!1),d=/^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/;a=[];for(var e;e=d.exec(c);)a.push(parseFloat(e[1])),c=c.substr(e[0].length);if(""===c){b=b[0].srsName;c="enu";b&&(c=Tb(b).b);if("neu"===c)for(b=0,c=a.length;b<c;b+=3)d=a[b],a[b]=a[b+1],a[b+1]=d;b=a.length;2==b&&a.push(0);if(b)return a}};
k.Bg=function(a,b){var c=kl(a,!1).replace(/^\s*|\s*$/g,""),d=b[0].srsName,e=a.parentNode.getAttribute("srsDimension");b="enu";d&&(b=Tb(d).b);c=c.split(/\s+/);d=2;a.getAttribute("srsDimension")?d=Nm(a.getAttribute("srsDimension")):a.getAttribute("dimension")?d=Nm(a.getAttribute("dimension")):e&&(d=Nm(e));for(var f,g=[],h=0,l=c.length;h<l;h+=d)a=parseFloat(c[h]),e=parseFloat(c[h+1]),f=3===d?parseFloat(c[h+2]):0,"en"===b.substr(0,2)?g.push(a,e,f):g.push(e,a,f);return g};
k.ke={"http://www.opengis.net/gml":{pos:sl(Sm.prototype.xp),posList:sl(Sm.prototype.Bg)}};k.zf={"http://www.opengis.net/gml":{interior:Sm.prototype.cm,exterior:Sm.prototype.yk}};
k.Zg={"http://www.opengis.net/gml":{Point:sl(Fm.prototype.fj),MultiPoint:sl(Fm.prototype.dj),LineString:sl(Fm.prototype.hf),MultiLineString:sl(Fm.prototype.cj),LinearRing:sl(Fm.prototype.bj),Polygon:sl(Fm.prototype.jf),MultiPolygon:sl(Fm.prototype.ej),Surface:sl(Sm.prototype.gj),MultiSurface:sl(Sm.prototype.Bp),Curve:sl(Sm.prototype.Zi),MultiCurve:sl(Sm.prototype.Ap),Envelope:sl(Sm.prototype.vp)}};k.Lj={"http://www.opengis.net/gml":{curveMember:rl(Sm.prototype.ph),curveMembers:rl(Sm.prototype.ph)}};
k.Pj={"http://www.opengis.net/gml":{surfaceMember:rl(Sm.prototype.Aj),surfaceMembers:rl(Sm.prototype.Aj)}};k.Hj={"http://www.opengis.net/gml":{LineString:rl(Fm.prototype.hf),Curve:rl(Sm.prototype.Zi)}};k.Uj={"http://www.opengis.net/gml":{Polygon:rl(Fm.prototype.jf),Surface:rl(Sm.prototype.gj)}};k.Vj={"http://www.opengis.net/gml":{patches:sl(Sm.prototype.Ep)}};k.Ij={"http://www.opengis.net/gml":{segments:sl(Sm.prototype.Hp)}};k.Jj={"http://www.opengis.net/gml":{lowerCorner:rl(Sm.prototype.Bg),upperCorner:rl(Sm.prototype.Bg)}};
k.Qj={"http://www.opengis.net/gml":{PolygonPatch:sl(Sm.prototype.Fp)}};k.Tj={"http://www.opengis.net/gml":{LineStringSegment:sl(Sm.prototype.zp)}};function Tm(a,b,c){var d=c[c.length-1];c=d.hasZ;d=d.srsName;b=b.X();for(var e=b.length,f=Array(e),g,h=0;h<e;++h){g=b[h];var l=h,m=c,n="enu";d&&(n=Tb(d).b);n="en"===n.substr(0,2)?g[0]+" "+g[1]:g[1]+" "+g[0];m&&(n+=" "+(g[2]||0));f[l]=n}Pm(a,f.join(" "))}
k.ni=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);d=jl(a.namespaceURI,"pos");a.appendChild(d);c=c[c.length-1];a=c.hasZ;var e=c.srsName;c="enu";e&&(c=Tb(e).b);b=b.X();c="en"===c.substr(0,2)?b[0]+" "+b[1]:b[1]+" "+b[0];a&&(c+=" "+(b[2]||0));Pm(d,c)};var Um={"http://www.opengis.net/gml":{lowerCorner:J(Pm),upperCorner:J(Pm)}};k=Sm.prototype;
k.jn=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);Bl({node:a},Um,yl,[b[0]+" "+b[1],b[2]+" "+b[3]],c,["lowerCorner","upperCorner"],this)};k.ki=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);d=jl(a.namespaceURI,"posList");a.appendChild(d);Tm(d,b,c)};k.hn=function(a,b){a=b[b.length-1];b=a.node;var c=a.exteriorWritten;void 0===c&&(a.exteriorWritten=!0);return jl(b.namespaceURI,void 0!==c?"interior":"exterior")};
k.Se=function(a,b,c){var d=c[c.length-1],e=d.hasZ,d=d.srsName;"PolygonPatch"!==a.nodeName&&d&&a.setAttribute("srsName",d);"Polygon"===a.nodeName||"PolygonPatch"===a.nodeName?(b=b.Sd(),Bl({node:a,hasZ:e,srsName:d},Vm,this.hn,b,c,void 0,this)):"Surface"===a.nodeName&&(e=jl(a.namespaceURI,"patches"),a.appendChild(e),a=jl(e.namespaceURI,"PolygonPatch"),e.appendChild(a),this.Se(a,b,c))};
k.Re=function(a,b,c){var d=c[c.length-1].srsName;"LineStringSegment"!==a.nodeName&&d&&a.setAttribute("srsName",d);"LineString"===a.nodeName||"LineStringSegment"===a.nodeName?(d=jl(a.namespaceURI,"posList"),a.appendChild(d),Tm(d,b,c)):"Curve"===a.nodeName&&(d=jl(a.namespaceURI,"segments"),a.appendChild(d),a=jl(d.namespaceURI,"LineStringSegment"),d.appendChild(a),this.Re(a,b,c))};
k.mi=function(a,b,c){var d=c[c.length-1],e=d.hasZ,f=d.srsName,d=d.surface;f&&a.setAttribute("srsName",f);b=b.Td();Bl({node:a,hasZ:e,srsName:f,surface:d},Wm,this.o,b,c,void 0,this)};k.kn=function(a,b,c){var d=c[c.length-1],e=d.srsName,d=d.hasZ;e&&a.setAttribute("srsName",e);b=b.Zd();Bl({node:a,hasZ:d,srsName:e},Xm,wl("pointMember"),b,c,void 0,this)};
k.li=function(a,b,c){var d=c[c.length-1],e=d.hasZ,f=d.srsName,d=d.curve;f&&a.setAttribute("srsName",f);b=b.gd();Bl({node:a,hasZ:e,srsName:f,curve:d},Ym,this.o,b,c,void 0,this)};k.oi=function(a,b,c){var d=jl(a.namespaceURI,"LinearRing");a.appendChild(d);this.ki(d,b,c)};k.pi=function(a,b,c){var d=this.a(b,c);d&&(a.appendChild(d),this.Se(d,b,c))};k.ln=function(a,b,c){var d=jl(a.namespaceURI,"Point");a.appendChild(d);this.ni(d,b,c)};
k.ji=function(a,b,c){var d=this.a(b,c);d&&(a.appendChild(d),this.Re(d,b,c))};k.od=function(a,b,c){var d=c[c.length-1],e=tb({},d);e.node=a;var f;Array.isArray(b)?d.dataProjection?f=hc(b,d.featureProjection,d.dataProjection):f=b:f=Hl(b,!0,d);Bl(e,Zm,this.a,[f],c,void 0,this)};
k.ii=function(a,b,c){var d=b.a;d&&a.setAttribute("fid",d);var d=c[c.length-1],e=d.featureNS,f=b.c;d.lb||(d.lb={},d.lb[e]={});var g=b.N();b=[];var h=[];for(m in g){var l=g[m];null!==l&&(b.push(m),h.push(l),m==f||l instanceof of?m in d.lb[e]||(d.lb[e][m]=J(this.od,this)):m in d.lb[e]||(d.lb[e][m]=J(Pm)))}var m=tb({},d);m.node=a;Bl(m,d.lb,wl(void 0,e),h,c,b)};
var Wm={"http://www.opengis.net/gml":{surfaceMember:J(Sm.prototype.pi),polygonMember:J(Sm.prototype.pi)}},Xm={"http://www.opengis.net/gml":{pointMember:J(Sm.prototype.ln)}},Ym={"http://www.opengis.net/gml":{lineStringMember:J(Sm.prototype.ji),curveMember:J(Sm.prototype.ji)}},Vm={"http://www.opengis.net/gml":{exterior:J(Sm.prototype.oi),interior:J(Sm.prototype.oi)}},Zm={"http://www.opengis.net/gml":{Curve:J(Sm.prototype.Re),MultiCurve:J(Sm.prototype.li),Point:J(Sm.prototype.ni),MultiPoint:J(Sm.prototype.kn),
LineString:J(Sm.prototype.Re),MultiLineString:J(Sm.prototype.li),LinearRing:J(Sm.prototype.ki),Polygon:J(Sm.prototype.Se),MultiPolygon:J(Sm.prototype.mi),Surface:J(Sm.prototype.Se),MultiSurface:J(Sm.prototype.mi),Envelope:J(Sm.prototype.jn)}},$m={MultiLineString:"lineStringMember",MultiCurve:"curveMember",MultiPolygon:"polygonMember",MultiSurface:"surfaceMember"};Sm.prototype.o=function(a,b){return jl("http://www.opengis.net/gml",$m[b[b.length-1].node.nodeName])};
Sm.prototype.a=function(a,b){var c=b[b.length-1];b=c.multiSurface;var d=c.surface,e=c.curve,c=c.multiCurve;Array.isArray(a)?a="Envelope":(a=a.U(),"MultiPolygon"===a&&!0===b?a="MultiSurface":"Polygon"===a&&!0===d?a="Surface":"LineString"===a&&!0===e?a="Curve":"MultiLineString"===a&&!0===c&&(a="MultiCurve"));return jl("http://www.opengis.net/gml",a)};
Sm.prototype.ie=function(a,b){b=Gl(this,b);var c=jl("http://www.opengis.net/gml","geom"),d={node:c,hasZ:this.hasZ,srsName:this.srsName,curve:this.c,surface:this.l,multiSurface:this.j,multiCurve:this.g};b&&tb(d,b);this.od(c,a,[d]);return c};
Sm.prototype.Xb=function(a,b){b=Gl(this,b);var c=jl("http://www.opengis.net/gml","featureMembers");c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",this.schemaLocation);var d={srsName:this.srsName,hasZ:this.hasZ,curve:this.c,surface:this.l,multiSurface:this.j,multiCurve:this.g,featureNS:this.featureNS,featureType:this.featureType};b&&tb(d,b);b=[d];var e=b[b.length-1],d=e.featureType,f=e.featureNS,g={};g[f]={};g[f][d]=J(this.ii,this);e=tb({},e);e.node=c;Bl(e,g,wl(d,
f),a,b);return c};function an(a){a=a?a:{};Fm.call(this,a);this.b["http://www.opengis.net/gml"].featureMember=rl(Fm.prototype.be);this.schemaLocation=a.schemaLocation?a.schemaLocation:"http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd"}v(an,Fm);k=an.prototype;
k.$i=function(a,b){a=kl(a,!1).replace(/^\s*|\s*$/g,"");var c=b[0].srsName;b="enu";c&&(c=Tb(c))&&(b=c.b);a=a.trim().split(/\s+/);for(var d,e,f=[],g=0,h=a.length;g<h;g++)e=a[g].split(/,+/),c=parseFloat(e[0]),d=parseFloat(e[1]),e=3===e.length?parseFloat(e[2]):0,"en"===b.substr(0,2)?f.push(c,d,e):f.push(d,c,e);return f};k.tp=function(a,b){a=N([null],this.Gj,a,b,this);return Xa(a[1][0],a[1][1],a[1][3],a[1][4])};k.am=function(a,b){(a=N(void 0,this.le,a,b,this))&&b[b.length-1].push(a)};
k.bp=function(a,b){(a=N(void 0,this.le,a,b,this))&&(b[b.length-1][0]=a)};k.ke={"http://www.opengis.net/gml":{coordinates:sl(an.prototype.$i)}};k.zf={"http://www.opengis.net/gml":{innerBoundaryIs:an.prototype.am,outerBoundaryIs:an.prototype.bp}};k.Gj={"http://www.opengis.net/gml":{coordinates:rl(an.prototype.$i)}};
k.Zg={"http://www.opengis.net/gml":{Point:sl(Fm.prototype.fj),MultiPoint:sl(Fm.prototype.dj),LineString:sl(Fm.prototype.hf),MultiLineString:sl(Fm.prototype.cj),LinearRing:sl(Fm.prototype.bj),Polygon:sl(Fm.prototype.jf),MultiPolygon:sl(Fm.prototype.ej),Box:sl(an.prototype.tp)}};
k.jg=function(a,b){var c=b[b.length-1];b=c.multiSurface;var d=c.surface,c=c.multiCurve;Array.isArray(a)?a="Envelope":(a=a.U(),"MultiPolygon"===a&&!0===b?a="MultiSurface":"Polygon"===a&&!0===d?a="Surface":"MultiLineString"===a&&!0===c&&(a="MultiCurve"));return jl("http://www.opengis.net/gml",a)};k.ai=function(a,b,c){var d=c[c.length-1],e=tb({},d);e.node=a;var f;Array.isArray(b)?d.dataProjection?f=hc(b,d.featureProjection,d.dataProjection):f=b:f=Hl(b,!0,d);Bl(e,bn,this.jg,[f],c,void 0,this)};
k.Pe=function(a,b,c){var d=c[c.length-1].srsName;"LineStringSegment"!==a.nodeName&&d&&a.setAttribute("srsName",d);"LineString"===a.nodeName||"LineStringSegment"===a.nodeName?(d=cn(a.namespaceURI),a.appendChild(d),dn(d,b,c)):"Curve"===a.nodeName&&(d=jl(a.namespaceURI,"segments"),a.appendChild(d),a=jl(d.namespaceURI,"LineStringSegment"),d.appendChild(a),this.Pe(a,b,c))};function cn(a){a=jl(a,"coordinates");a.setAttribute("decimal",".");a.setAttribute("cs",",");a.setAttribute("ts"," ");return a}
function dn(a,b,c){var d=c[c.length-1];c=d.hasZ;d=d.srsName;b=b.X();for(var e=b.length,f=Array(e),g,h=0;h<e;++h)g=b[h],f[h]=en(g,d,c);Pm(a,f.join(" "))}
k.Qe=function(a,b,c){var d=c[c.length-1],e=d.hasZ,d=d.srsName;"PolygonPatch"!==a.nodeName&&d&&a.setAttribute("srsName",d);"Polygon"===a.nodeName||"PolygonPatch"===a.nodeName?(b=b.Sd(),Bl({node:a,hasZ:e,srsName:d},fn,this.dn,b,c,void 0,this)):"Surface"===a.nodeName&&(e=jl(a.namespaceURI,"patches"),a.appendChild(e),a=jl(e.namespaceURI,"PolygonPatch"),e.appendChild(a),this.Qe(a,b,c))};
k.dn=function(a,b){a=b[b.length-1];b=a.node;var c=a.exteriorWritten;void 0===c&&(a.exteriorWritten=!0);return jl(b.namespaceURI,void 0!==c?"innerBoundaryIs":"outerBoundaryIs")};k.gi=function(a,b,c){var d=jl(a.namespaceURI,"LinearRing");a.appendChild(d);this.ci(d,b,c)};function en(a,b,c){var d="enu";b&&(d=Tb(b).b);b="en"===d.substr(0,2)?a[0]+","+a[1]:a[1]+","+a[0];c&&(b+=","+(a[2]||0));return b}
k.di=function(a,b,c){var d=c[c.length-1],e=d.hasZ,f=d.srsName,d=d.curve;f&&a.setAttribute("srsName",f);b=b.gd();Bl({node:a,hasZ:e,srsName:f,curve:d},gn,this.a,b,c,void 0,this)};k.fi=function(a,b,c){var d=c[c.length-1];c=d.hasZ;var e=d.srsName;e&&a.setAttribute("srsName",e);d=cn(a.namespaceURI);a.appendChild(d);a=b.X();a=en(a,e,c);Pm(d,a)};
k.fn=function(a,b,c){var d=c[c.length-1],e=d.hasZ;(d=d.srsName)&&a.setAttribute("srsName",d);b=b.Zd();Bl({node:a,hasZ:e,srsName:d},hn,wl("pointMember"),b,c,void 0,this)};k.gn=function(a,b,c){var d=jl(a.namespaceURI,"Point");a.appendChild(d);this.fi(d,b,c)};k.bi=function(a,b,c){var d=this.jg(b,c);d&&(a.appendChild(d),this.Pe(d,b,c))};k.ci=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);d=cn(a.namespaceURI);a.appendChild(d);dn(d,b,c)};
k.ei=function(a,b,c){var d=c[c.length-1],e=d.hasZ,f=d.srsName,d=d.surface;f&&a.setAttribute("srsName",f);b=b.Td();Bl({node:a,hasZ:e,srsName:f,surface:d},jn,this.a,b,c,void 0,this)};k.hi=function(a,b,c){var d=this.jg(b,c);d&&(a.appendChild(d),this.Qe(d,b,c))};k.en=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);Bl({node:a},kn,yl,[b[0]+" "+b[1],b[2]+" "+b[3]],c,["lowerCorner","upperCorner"],this)};
var bn={"http://www.opengis.net/gml":{Curve:J(an.prototype.Pe),MultiCurve:J(an.prototype.di),Point:J(an.prototype.fi),MultiPoint:J(an.prototype.fn),LineString:J(an.prototype.Pe),MultiLineString:J(an.prototype.di),LinearRing:J(an.prototype.ci),Polygon:J(an.prototype.Qe),MultiPolygon:J(an.prototype.ei),Surface:J(an.prototype.Qe),MultiSurface:J(an.prototype.ei),Envelope:J(an.prototype.en)}},fn={"http://www.opengis.net/gml":{outerBoundaryIs:J(an.prototype.gi),innerBoundaryIs:J(an.prototype.gi)}},hn={"http://www.opengis.net/gml":{pointMember:J(an.prototype.gn)}},
gn={"http://www.opengis.net/gml":{lineStringMember:J(an.prototype.bi),curveMember:J(an.prototype.bi)}};an.prototype.a=function(a,b){return jl("http://www.opengis.net/gml",ln[b[b.length-1].node.nodeName])};var ln={MultiLineString:"lineStringMember",MultiCurve:"curveMember",MultiPolygon:"polygonMember",MultiSurface:"surfaceMember"},jn={"http://www.opengis.net/gml":{surfaceMember:J(an.prototype.hi),polygonMember:J(an.prototype.hi)}},kn={"http://www.opengis.net/gml":{lowerCorner:J(Pm),upperCorner:J(Pm)}};function mn(a){a=a?a:{};Cm.call(this);this.defaultDataProjection=Tb("EPSG:4326");this.b=a.readExtensions}v(mn,Cm);var nn=[null,"http://www.topografix.com/GPX/1/0","http://www.topografix.com/GPX/1/1"];function on(a,b,c,d){a.push(parseFloat(c.getAttribute("lon")),parseFloat(c.getAttribute("lat")));"ele"in d?(a.push(d.ele),delete d.ele,b.hasZ=!0):a.push(0);"time"in d?(a.push(d.time),delete d.time,b.hasM=!0):a.push(0);return a}
function pn(a,b,c){var d="XY",e=2;a.hasZ&&a.hasM?(d="XYZM",e=4):a.hasZ?(d="XYZ",e=3):a.hasM&&(d="XYM",e=3);if(4!==e){var f;var g=0;for(f=b.length/4;g<f;g++)b[g*e]=b[4*g],b[g*e+1]=b[4*g+1],a.hasZ&&(b[g*e+2]=b[4*g+2]),a.hasM&&(b[g*e+2]=b[4*g+3]);b.length=b.length/4*e;if(c)for(g=0,f=c.length;g<f;g++)c[g]=c[g]/4*e}return d}function qn(a,b){var c=b[b.length-1],d=a.getAttribute("href");null!==d&&(c.link=d);Al(rn,a,b)}function sn(a,b){b[b.length-1].extensionsNode_=a}
function tn(a,b){var c=b[0];if(a=N({flatCoordinates:[],layoutOptions:{}},un,a,b)){b=a.flatCoordinates;delete a.flatCoordinates;var d=a.layoutOptions;delete a.layoutOptions;var d=pn(d,b),e=new O(null);e.ba(d,b);Hl(e,!1,c);c=new H(e);c.H(a);return c}}
function vn(a,b){var c=b[0];if(a=N({flatCoordinates:[],ends:[],layoutOptions:{}},wn,a,b)){b=a.flatCoordinates;delete a.flatCoordinates;var d=a.ends;delete a.ends;var e=a.layoutOptions;delete a.layoutOptions;var e=pn(e,b,d),f=new P(null);f.ba(e,b,d);Hl(f,!1,c);c=new H(f);c.H(a);return c}}function xn(a,b){var c=b[0];if(b=N({},yn,a,b)){var d={};a=on([],d,a,b);d=pn(d,a);a=new C(a,d);Hl(a,!1,c);c=new H(a);c.H(b);return c}}
var zn={rte:tn,trk:vn,wpt:xn},An=K(nn,{rte:rl(tn),trk:rl(vn),wpt:rl(xn)}),rn=K(nn,{text:I(S,"linkText"),type:I(S,"linkType")}),un=K(nn,{name:I(S),cmt:I(S),desc:I(S),src:I(S),link:qn,number:I(Mm),extensions:sn,type:I(S),rtept:function(a,b){var c=N({},Bn,a,b);c&&(b=b[b.length-1],on(b.flatCoordinates,b.layoutOptions,a,c))}}),Bn=K(nn,{ele:I(Km),time:I(Jm)}),wn=K(nn,{name:I(S),cmt:I(S),desc:I(S),src:I(S),link:qn,number:I(Mm),type:I(S),extensions:sn,trkseg:function(a,b){var c=b[b.length-1];Al(Cn,a,b);c.ends.push(c.flatCoordinates.length)}}),
Cn=K(nn,{trkpt:function(a,b){var c=N({},Dn,a,b);c&&(b=b[b.length-1],on(b.flatCoordinates,b.layoutOptions,a,c))}}),Dn=K(nn,{ele:I(Km),time:I(Jm)}),yn=K(nn,{ele:I(Km),time:I(Jm),magvar:I(Km),geoidheight:I(Km),name:I(S),cmt:I(S),desc:I(S),src:I(S),link:qn,sym:I(S),type:I(S),fix:I(S),sat:I(Mm),hdop:I(Km),vdop:I(Km),pdop:I(Km),ageofdgpsdata:I(Km),dgpsid:I(Mm),extensions:sn});
function En(a,b){b||(b=[]);for(var c=0,d=b.length;c<d;++c){var e=b[c];if(a.b){var f=e.get("extensionsNode_")||null;a.b(e,f)}e.set("extensionsNode_",void 0)}}mn.prototype.xg=function(a,b){if(!ja(nn,a.namespaceURI))return null;var c=zn[a.localName];if(!c)return null;a=c(a,[Fl(this,a,b)]);if(!a)return null;En(this,[a]);return a};mn.prototype.zc=function(a,b){return ja(nn,a.namespaceURI)?"gpx"==a.localName&&(a=N([],An,a,[Fl(this,a,b)]))?(En(this,a),a):[]:[]};
function Fn(a,b,c){a.setAttribute("href",b);b=c[c.length-1].properties;Bl({node:a},Gn,yl,[b.linkText,b.linkType],c,Hn)}function In(a,b,c){var d=c[c.length-1],e=d.node.namespaceURI,f=d.properties;a.setAttributeNS(null,"lat",b[1]);a.setAttributeNS(null,"lon",b[0]);switch(d.geometryLayout){case "XYZM":b[3]&&(f.time=b[3]);case "XYZ":b[2]&&(f.ele=b[2]);break;case "XYM":b[2]&&(f.time=b[2])}b="rtept"==a.nodeName?Jn[e]:Kn[e];d=zl(f,b);Bl({node:a,properties:f},Ln,yl,d,c,b)}
var Hn=["text","type"],Gn=K(nn,{text:J(Pm),type:J(Pm)}),Mn=K(nn,"name cmt desc src link number type rtept".split(" ")),Nn=K(nn,{name:J(Pm),cmt:J(Pm),desc:J(Pm),src:J(Pm),link:J(Fn),number:J(Rm),type:J(Pm),rtept:vl(J(In))}),Jn=K(nn,["ele","time"]),On=K(nn,"name cmt desc src link number type trkseg".split(" ")),Rn=K(nn,{name:J(Pm),cmt:J(Pm),desc:J(Pm),src:J(Pm),link:J(Fn),number:J(Rm),type:J(Pm),trkseg:vl(J(function(a,b,c){Bl({node:a,geometryLayout:b.ja,properties:{}},Pn,Qn,b.X(),c)}))}),Qn=wl("trkpt"),
Pn=K(nn,{trkpt:J(In)}),Kn=K(nn,"ele time magvar geoidheight name cmt desc src link sym type fix sat hdop vdop pdop ageofdgpsdata dgpsid".split(" ")),Ln=K(nn,{ele:J(Qm),time:J(function(a,b){b=new Date(1E3*b);a.appendChild(il.createTextNode(b.getUTCFullYear()+"-"+Xe(b.getUTCMonth()+1)+"-"+Xe(b.getUTCDate())+"T"+Xe(b.getUTCHours())+":"+Xe(b.getUTCMinutes())+":"+Xe(b.getUTCSeconds())+"Z"))}),magvar:J(Qm),geoidheight:J(Qm),name:J(Pm),cmt:J(Pm),desc:J(Pm),src:J(Pm),link:J(Fn),sym:J(Pm),type:J(Pm),fix:J(Pm),
sat:J(Rm),hdop:J(Qm),vdop:J(Qm),pdop:J(Qm),ageofdgpsdata:J(Qm),dgpsid:J(Rm)}),Sn={Point:"wpt",LineString:"rte",MultiLineString:"trk"};function Tn(a,b){if(a=a.V())if(a=Sn[a.U()])return jl(b[b.length-1].node.namespaceURI,a)}
var Un=K(nn,{rte:J(function(a,b,c){var d=c[0],e=b.N();a={node:a,properties:e};if(b=b.V())b=Hl(b,!0,d),a.geometryLayout=b.ja,e.rtept=b.X();d=Mn[c[c.length-1].node.namespaceURI];e=zl(e,d);Bl(a,Nn,yl,e,c,d)}),trk:J(function(a,b,c){var d=c[0],e=b.N();a={node:a,properties:e};if(b=b.V())b=Hl(b,!0,d),e.trkseg=b.gd();d=On[c[c.length-1].node.namespaceURI];e=zl(e,d);Bl(a,Rn,yl,e,c,d)}),wpt:J(function(a,b,c){var d=c[0],e=c[c.length-1];e.properties=b.N();if(b=b.V())b=Hl(b,!0,d),e.geometryLayout=b.ja,In(a,b.X(),
c)})});mn.prototype.Xb=function(a,b){b=Gl(this,b);var c=jl("http://www.topografix.com/GPX/1/1","gpx");c.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation","http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd");c.setAttribute("version","1.1");c.setAttribute("creator","OpenLayers");Bl({node:c},Un,Tn,a,[b]);return c};function Vn(){El.call(this)}v(Vn,El);function Wn(a){return"string"===typeof a?a:""}k=Vn.prototype;k.U=function(){return"text"};k.Tb=function(a,b){return this.ae(Wn(a),Gl(this,b))};k.Oa=function(a,b){return this.zg(Wn(a),Gl(this,b))};k.Sc=function(a,b){return this.wd(Wn(a),Gl(this,b))};k.kb=function(){return this.defaultDataProjection};k.Bd=function(a,b){return this.ge(a,Gl(this,b))};k.Wb=function(a,b){return this.Wg(a,Gl(this,b))};k.$c=function(a,b){return this.Cd(a,Gl(this,b))};function Xn(a){a=a?a:{};El.call(this);this.defaultDataProjection=Tb("EPSG:4326");this.b=a.altitudeMode?a.altitudeMode:"none"}v(Xn,Vn);var Yn=/^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{5})([NS])(\d{3})(\d{5})([EW])([AV])(\d{5})(\d{5})/,Zn=/^H.([A-Z]{3}).*?:(.*)/,$n=/^HFDTE(\d{2})(\d{2})(\d{2})/,ao=/\r\n|\r|\n/;k=Xn.prototype;
k.ae=function(a,b){var c=this.b,d=a.split(ao);a={};var e=[],f=2E3,g=0,h=1,l=-1,m;var n=0;for(m=d.length;n<m;++n){var p=d[n],q;if("B"==p.charAt(0)){if(q=Yn.exec(p)){var p=parseInt(q[1],10),r=parseInt(q[2],10),u=parseInt(q[3],10),x=parseInt(q[4],10)+parseInt(q[5],10)/6E4;"S"==q[6]&&(x=-x);var B=parseInt(q[7],10)+parseInt(q[8],10)/6E4;"W"==q[9]&&(B=-B);e.push(B,x);"none"!=c&&e.push("gps"==c?parseInt(q[11],10):"barometric"==c?parseInt(q[12],10):0);q=Date.UTC(f,g,h,p,r,u);q<l&&(q=Date.UTC(f,g,h+1,p,r,
u));e.push(q/1E3);l=q}}else"H"==p.charAt(0)&&((q=$n.exec(p))?(h=parseInt(q[1],10),g=parseInt(q[2],10)-1,f=2E3+parseInt(q[3],10)):(q=Zn.exec(p))&&(a[q[1]]=q[2].trim()))}if(!e.length)return null;d=new O(null);d.ba("none"==c?"XYM":"XYZM",e);b=new H(Hl(d,!1,b));b.H(a);return b};k.zg=function(a,b){return(a=this.ae(a,b))?[a]:[]};k.ge=function(){};k.Wg=function(){};k.Cd=function(){};k.wd=function(){};function bo(a,b,c,d,e,f){Qc.call(this);this.j=null;this.M=a?a:new Image;null!==d&&(this.M.crossOrigin=d);this.c=f?document.createElement("CANVAS"):null;this.g=f;this.f=null;this.i=e;this.a=c;this.o=b;this.l=!1;2==this.i&&co(this)}v(bo,Qc);function co(a){var b=jd(1,1);try{b.drawImage(a.M,0,0),b.getImageData(0,0,1,1)}catch(c){a.l=!0}}bo.prototype.v=function(){this.i=3;this.f.forEach(Ec);this.f=null;this.b("change")};
bo.prototype.u=function(){this.i=2;this.a&&(this.M.width=this.a[0],this.M.height=this.a[1]);this.a=[this.M.width,this.M.height];this.f.forEach(Ec);this.f=null;co(this);if(!this.l&&null!==this.g){this.c.width=this.M.width;this.c.height=this.M.height;var a=this.c.getContext("2d");a.drawImage(this.M,0,0);for(var b=a.getImageData(0,0,this.M.width,this.M.height),c=b.data,d=this.g[0]/255,e=this.g[1]/255,f=this.g[2]/255,g=0,h=c.length;g<h;g+=4)c[g]*=d,c[g+1]*=e,c[g+2]*=f;a.putImageData(b,0,0)}this.b("change")};
bo.prototype.Y=function(){return this.c?this.c:this.M};bo.prototype.load=function(){if(0==this.i){this.i=1;this.f=[Jc(this.M,"error",this.v,this),Jc(this.M,"load",this.u,this)];try{this.M.src=this.o}catch(a){this.v()}}};function eo(a){a=a||{};this.o=void 0!==a.anchor?a.anchor:[.5,.5];this.u=null;this.i=void 0!==a.anchorOrigin?a.anchorOrigin:"top-left";this.C=void 0!==a.anchorXUnits?a.anchorXUnits:"fraction";this.B=void 0!==a.anchorYUnits?a.anchorYUnits:"fraction";this.ra=void 0!==a.crossOrigin?a.crossOrigin:null;var b=void 0!==a.img?a.img:null,c=void 0!==a.imgSize?a.imgSize:null,d=a.src;xa(!(void 0!==d&&b),4);xa(!b||b&&c,5);void 0!==d&&d.length||!b||(d=b.src||w(b).toString());xa(void 0!==d&&0<d.length,6);var e=void 0!==
a.src?0:2;this.j=void 0!==a.color?ed(a.color):null;var f=this.ra,g=this.j,h=zh.get(d,f,g);h||(h=new bo(b,d,c,f,e,g),zh.set(d,f,g,h));this.b=h;this.oa=void 0!==a.offset?a.offset:[0,0];this.c=void 0!==a.offsetOrigin?a.offsetOrigin:"top-left";this.S=null;this.D=void 0!==a.size?a.size:null;Xk.call(this,{opacity:void 0!==a.opacity?a.opacity:1,rotation:void 0!==a.rotation?a.rotation:0,scale:void 0!==a.scale?a.scale:1,snapToPixel:void 0!==a.snapToPixel?a.snapToPixel:!0,rotateWithView:void 0!==a.rotateWithView?
a.rotateWithView:!1})}v(eo,Xk);k=eo.prototype;
k.clone=function(){var a=this.Y(1);if(2===this.b.i)if("IMG"===a.tagName.toUpperCase())var b=a.cloneNode(!0);else{b=document.createElement("canvas");var c=b.getContext("2d");b.width=a.width;b.height=a.height;c.drawImage(a,0,0)}return new eo({anchor:this.o.slice(),anchorOrigin:this.i,anchorXUnits:this.C,anchorYUnits:this.B,crossOrigin:this.ra,color:this.j&&this.j.slice?this.j.slice():this.j||void 0,img:b?b:void 0,imgSize:b?this.b.a.slice():void 0,src:b?void 0:this.b.o,offset:this.oa.slice(),offsetOrigin:this.c,
size:null!==this.D?this.D.slice():void 0,opacity:this.f,scale:this.a,snapToPixel:this.v,rotation:this.g,rotateWithView:this.l})};
k.Hc=function(){if(this.u)return this.u;var a=this.o,b=this.ic();if("fraction"==this.C||"fraction"==this.B){if(!b)return null;a=this.o.slice();"fraction"==this.C&&(a[0]*=b[0]);"fraction"==this.B&&(a[1]*=b[1])}if("top-left"!=this.i){if(!b)return null;a===this.o&&(a=this.o.slice());if("top-right"==this.i||"bottom-right"==this.i)a[0]=-a[0]+b[0];if("bottom-left"==this.i||"bottom-right"==this.i)a[1]=-a[1]+b[1]}return this.u=a};k.Lo=function(){return this.j};k.Y=function(a){return this.b.Y(a)};k.ye=function(){return this.b.a};
k.Ye=function(){return this.b.i};k.qg=function(){var a=this.b;if(!a.j)if(a.l){var b=a.a[0],c=a.a[1],d=jd(b,c);d.fillRect(0,0,b,c);a.j=d.canvas}else a.j=a.M;return a.j};k.Oc=function(){if(this.S)return this.S;var a=this.oa;if("top-left"!=this.c){var b=this.ic(),c=this.b.a;if(!b||!c)return null;a=a.slice();if("top-right"==this.c||"bottom-right"==this.c)a[0]=c[0]-b[0]-a[0];if("bottom-left"==this.c||"bottom-right"==this.c)a[1]=c[1]-b[1]-a[1]}return this.S=a};k.Mo=function(){return this.b.o};
k.ic=function(){return this.D?this.D:this.b.a};k.Nh=function(a,b){return y(this.b,"change",a,b)};k.load=function(){this.b.load()};k.Bj=function(a,b){Kc(this.b,"change",a,b)};function fo(a){a=a||{};this.a=a.font;this.f=a.rotation;this.o=a.rotateWithView;this.b=a.scale;this.Ia=a.text;this.g=a.textAlign;this.j=a.textBaseline;this.Va=void 0!==a.fill?a.fill:new al({color:"#333"});this.Ya=void 0!==a.stroke?a.stroke:null;this.i=void 0!==a.offsetX?a.offsetX:0;this.c=void 0!==a.offsetY?a.offsetY:0}k=fo.prototype;
k.clone=function(){return new fo({font:this.a,rotation:this.f,rotateWithView:this.o,scale:this.b,text:this.Na(),textAlign:this.g,textBaseline:this.j,fill:this.Fa()?this.Fa().clone():void 0,stroke:this.Ga()?this.Ga().clone():void 0,offsetX:this.i,offsetY:this.c})};k.Nk=function(){return this.a};k.cl=function(){return this.i};k.dl=function(){return this.c};k.Fa=function(){return this.Va};k.Ro=function(){return this.o};k.So=function(){return this.f};k.To=function(){return this.b};k.Ga=function(){return this.Ya};
k.Na=function(){return this.Ia};k.nl=function(){return this.g};k.ol=function(){return this.j};k.nj=function(a){this.a=a};k.sj=function(a){this.i=a};k.tj=function(a){this.c=a};k.pf=function(a){this.Va=a};k.Uo=function(a){this.f=a};k.Si=function(a){this.b=a};k.qf=function(a){this.Ya=a};k.xd=function(a){this.Ia=a};k.vj=function(a){this.g=a};k.hq=function(a){this.j=a};function go(a){a=a?a:{};Cm.call(this);ho||(io=[255,255,255,1],jo=new al({color:io}),ko=[20,2],lo=mo="pixels",no=[64,64],oo="https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png",po=.5,qo=new eo({anchor:ko,anchorOrigin:"bottom-left",anchorXUnits:mo,anchorYUnits:lo,crossOrigin:"anonymous",rotation:0,scale:po,size:no,src:oo}),ro="NO_IMAGE",so=new wj({color:io,width:1}),to=new wj({color:[51,51,51,1],width:2}),uo=new fo({font:"bold 16px Helvetica",fill:jo,stroke:to,scale:.8}),vo=new bl({fill:jo,
image:qo,text:uo,stroke:so,zIndex:0}),ho=[vo]);this.defaultDataProjection=Tb("EPSG:4326");this.a=a.defaultStyle?a.defaultStyle:ho;this.c=void 0!==a.extractStyles?a.extractStyles:!0;this.j=void 0!==a.writeStyles?a.writeStyles:!0;this.b={};this.g=void 0!==a.showPointNames?a.showPointNames:!0}var ho,io,jo,ko,mo,lo,no,oo,po,qo,ro,so,to,uo,vo;v(go,Cm);
var wo=["http://www.google.com/kml/ext/2.2"],xo=[null,"http://earth.google.com/kml/2.0","http://earth.google.com/kml/2.1","http://earth.google.com/kml/2.2","http://www.opengis.net/kml/2.2"],yo={fraction:"fraction",pixels:"pixels",insetPixels:"pixels"};
function zo(a,b){var c=[0,0],d="start";if(a.Y()){var e=a.Y().ye();null===e&&(e=no);2==e.length&&(d=a.Y().a,c[0]=d*e[0]/2,c[1]=-d*e[1]/2,d="left")}null!==a.Na()?(e=a.Na(),a=e.clone(),a.nj(e.a||uo.a),a.Si(e.b||uo.b),a.pf(e.Fa()||uo.Fa()),a.qf(e.Ga()||to)):a=uo.clone();a.xd(b);a.sj(c[0]);a.tj(c[1]);a.vj(d);return new bl({text:a})}
function Ao(a,b,c,d,e){return function(){var f=e,g="";f&&this.V()&&(f="Point"===this.V().U());f&&(g=this.get("name"),f=f&&g);if(a)return f?(f=zo(a[0],g),a.concat(f)):a;if(b){var h=Bo(b,c,d);return f?(f=zo(h[0],g),h.concat(f)):h}return f?(f=zo(c[0],g),c.concat(f)):c}}function Bo(a,b,c){return Array.isArray(a)?a:"string"===typeof a?(!(a in c)&&"#"+a in c&&(a="#"+a),Bo(c[a],b,c)):b}
function Co(a){a=kl(a,!1);if(a=/^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(a))return a=a[1],[parseInt(a.substr(6,2),16),parseInt(a.substr(4,2),16),parseInt(a.substr(2,2),16),parseInt(a.substr(0,2),16)/255]}function Do(a){a=kl(a,!1);for(var b=[],c=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?))?\s*/i,d;d=c.exec(a);)b.push(parseFloat(d[1]),parseFloat(d[2]),d[3]?parseFloat(d[3]):0),a=a.substr(d[0].length);if(""===a)return b}
function Eo(a){var b=kl(a,!1).trim();return a.baseURI&&"about:blank"!==a.baseURI?(new URL(b,a.baseURI)).href:b}function Fo(a){return Km(a)}function Go(a,b){return N(null,Ho,a,b)}function Io(a,b){if(b=N({A:[],Ej:[]},Jo,a,b)){a=b.A;b=b.Ej;var c;var d=0;for(c=Math.min(a.length,b.length);d<c;++d)a[4*d+3]=b[d];b=new O(null);b.ba("XYZM",a);return b}}function Ko(a,b){var c=N({},Lo,a,b);if(a=N(null,Mo,a,b))return b=new O(null),b.ba("XYZ",a),b.H(c),b}
function No(a,b){var c=N({},Lo,a,b);if(a=N(null,Mo,a,b))return b=new D(null),b.ba("XYZ",a,[a.length]),b.H(c),b}
function Oo(a,b){a=N([],Po,a,b);if(!a)return null;if(!a.length)return new tm(a);var c=!0,d=a[0].U(),e;var f=1;for(e=a.length;f<e;++f)if(b=a[f],b.U()!=d){c=!1;break}if(c)if("Point"==d){var g=a[0];c=g.ja;d=g.ga();f=1;for(e=a.length;f<e;++f)b=a[f],la(d,b.ga());g=new Q(null);g.ba(c,d);Qo(g,a)}else"LineString"==d?(g=new P(null),Nl(g,a),Qo(g,a)):"Polygon"==d?(g=new R(null),Pl(g,a),Qo(g,a)):"GeometryCollection"==d?g=new tm(a):xa(!1,37);else g=new tm(a);return g}
function Ro(a,b){var c=N({},Lo,a,b);if(a=N(null,Mo,a,b))return b=new C(null),b.ba("XYZ",a),b.H(c),b}function So(a,b){var c=N({},Lo,a,b);if((a=N([null],To,a,b))&&a[0]){b=new D(null);var d=a[0],e=[d.length],f;var g=1;for(f=a.length;g<f;++g)la(d,a[g]),e.push(d.length);b.ba("XYZ",d,e);b.H(c);return b}}
function Uo(a,b){b=N({},Vo,a,b);if(!b)return null;a="fillStyle"in b?b.fillStyle:jo;var c=b.fill;void 0===c||c||(a=null);c="imageStyle"in b?b.imageStyle:qo;c==ro&&(c=void 0);var d="textStyle"in b?b.textStyle:uo,e="strokeStyle"in b?b.strokeStyle:so;b=b.outline;void 0===b||b||(e=null);return[new bl({fill:a,image:c,stroke:e,text:d,zIndex:void 0})]}
function Qo(a,b){var c=b.length,d=Array(b.length),e=Array(b.length),f,g;var h=g=!1;for(f=0;f<c;++f){var l=b[f];d[f]=l.get("extrude");e[f]=l.get("altitudeMode");h=h||void 0!==d[f];g=g||e[f]}h&&a.set("extrude",d);g&&a.set("altitudeMode",e)}function Wo(a,b){Al(Xo,a,b)}function Yo(a,b){Al(Zo,a,b)}
var $o=K(xo,{displayName:I(S),value:I(S)}),Xo=K(xo,{Data:function(a,b){var c=a.getAttribute("name");Al($o,a,b);a=b[b.length-1];null!==c?a[c]=a.value:null!==a.displayName&&(a[a.displayName]=a.value)},SchemaData:function(a,b){Al(ap,a,b)}}),Zo=K(xo,{LatLonAltBox:function(a,b){if(a=N({},bp,a,b))b=b[b.length-1],b.extent=[parseFloat(a.west),parseFloat(a.south),parseFloat(a.east),parseFloat(a.north)],b.altitudeMode=a.altitudeMode,b.minAltitude=parseFloat(a.minAltitude),b.maxAltitude=parseFloat(a.maxAltitude)},
Lod:function(a,b){if(a=N({},cp,a,b))b=b[b.length-1],b.minLodPixels=parseFloat(a.minLodPixels),b.maxLodPixels=parseFloat(a.maxLodPixels),b.minFadeExtent=parseFloat(a.minFadeExtent),b.maxFadeExtent=parseFloat(a.maxFadeExtent)}}),bp=K(xo,{altitudeMode:I(S),minAltitude:I(Km),maxAltitude:I(Km),north:I(Km),south:I(Km),east:I(Km),west:I(Km)}),cp=K(xo,{minLodPixels:I(Km),maxLodPixels:I(Km),minFadeExtent:I(Km),maxFadeExtent:I(Km)}),Lo=K(xo,{extrude:I(Hm),altitudeMode:I(S)}),Ho=K(xo,{coordinates:sl(Do)}),To=
K(xo,{innerBoundaryIs:function(a,b){(a=N(void 0,dp,a,b))&&b[b.length-1].push(a)},outerBoundaryIs:function(a,b){(a=N(void 0,ep,a,b))&&(b[b.length-1][0]=a)}}),Jo=K(xo,{when:function(a,b){b=b[b.length-1].Ej;a=kl(a,!1);a=Date.parse(a);b.push(isNaN(a)?0:a)}},K(wo,{coord:function(a,b){b=b[b.length-1].A;a=kl(a,!1);(a=/^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(a))?b.push(parseFloat(a[1]),parseFloat(a[2]),parseFloat(a[3]),
0):b.push(0,0,0,0)}})),Mo=K(xo,{coordinates:sl(Do)}),fp=K(xo,{href:I(Eo)},K(wo,{x:I(Km),y:I(Km),w:I(Km),h:I(Km)})),gp=K(xo,{Icon:I(function(a,b){return(a=N({},fp,a,b))?a:null}),heading:I(Km),hotSpot:I(function(a){var b=a.getAttribute("xunits"),c=a.getAttribute("yunits");var d="insetPixels"!==b?"insetPixels"!==c?"bottom-left":"top-left":"insetPixels"!==c?"bottom-right":"top-right";return{x:parseFloat(a.getAttribute("x")),Xg:yo[b],y:parseFloat(a.getAttribute("y")),Yg:yo[c],origin:d}}),scale:I(Fo)}),
dp=K(xo,{LinearRing:sl(Go)}),hp=K(xo,{color:I(Co),scale:I(Fo)}),ip=K(xo,{color:I(Co),width:I(Km)}),Po=K(xo,{LineString:rl(Ko),LinearRing:rl(No),MultiGeometry:rl(Oo),Point:rl(Ro),Polygon:rl(So)}),jp=K(wo,{Track:rl(Io)}),lp=K(xo,{ExtendedData:Wo,Region:Yo,Link:function(a,b){Al(kp,a,b)},address:I(S),description:I(S),name:I(S),open:I(Hm),phoneNumber:I(S),visibility:I(Hm)}),kp=K(xo,{href:I(Eo)}),ep=K(xo,{LinearRing:sl(Go)}),mp=K(xo,{Style:I(Uo),key:I(S),styleUrl:I(Eo)}),op=K(xo,{ExtendedData:Wo,Region:Yo,
MultiGeometry:I(Oo,"geometry"),LineString:I(Ko,"geometry"),LinearRing:I(No,"geometry"),Point:I(Ro,"geometry"),Polygon:I(So,"geometry"),Style:I(Uo),StyleMap:function(a,b){if(a=N(void 0,np,a,b))b=b[b.length-1],Array.isArray(a)?b.Style=a:"string"===typeof a?b.styleUrl=a:xa(!1,38)},address:I(S),description:I(S),name:I(S),open:I(Hm),phoneNumber:I(S),styleUrl:I(Eo),visibility:I(Hm)},K(wo,{MultiTrack:I(function(a,b){if(a=N([],jp,a,b))return b=new P(null),Nl(b,a),b},"geometry"),Track:I(Io,"geometry")})),
pp=K(xo,{color:I(Co),fill:I(Hm),outline:I(Hm)}),ap=K(xo,{SimpleData:function(a,b){var c=a.getAttribute("name");null!==c&&(a=S(a),b[b.length-1][c]=a)}}),Vo=K(xo,{IconStyle:function(a,b){if(a=N({},gp,a,b)){b=b[b.length-1];var c="Icon"in a?a.Icon:{},d=!("Icon"in a)||0<Object.keys(c).length,e,f=c.href;f?e=f:d&&(e=oo);var f="bottom-left",g=a.hotSpot;if(g){var h=[g.x,g.y];var l=g.Xg;var m=g.Yg;f=g.origin}else e===oo?(h=ko,l=mo,m=lo):/^http:\/\/maps\.(?:google|gstatic)\.com\//.test(e)&&(h=[.5,0],m=l="fraction");
var n,g=c.x,p=c.y;void 0!==g&&void 0!==p&&(n=[g,p]);var q,g=c.w,c=c.h;void 0!==g&&void 0!==c&&(q=[g,c]);var r,c=a.heading;void 0!==c&&(r=Ha(c));a=a.scale;d?(e==oo&&(q=no,void 0===a&&(a=po)),e=new eo({anchor:h,anchorOrigin:f,anchorXUnits:l,anchorYUnits:m,crossOrigin:"anonymous",offset:n,offsetOrigin:"bottom-left",rotation:r,scale:a,size:q,src:e}),b.imageStyle=e):b.imageStyle=ro}},LabelStyle:function(a,b){(a=N({},hp,a,b))&&(b[b.length-1].textStyle=new fo({fill:new al({color:"color"in a?a.color:io}),
scale:a.scale}))},LineStyle:function(a,b){(a=N({},ip,a,b))&&(b[b.length-1].strokeStyle=new wj({color:"color"in a?a.color:io,width:"width"in a?a.width:1}))},PolyStyle:function(a,b){if(a=N({},pp,a,b)){b=b[b.length-1];b.fillStyle=new al({color:"color"in a?a.color:io});var c=a.fill;void 0!==c&&(b.fill=c);a=a.outline;void 0!==a&&(b.outline=a)}}}),np=K(xo,{Pair:function(a,b){if(a=N({},mp,a,b)){var c=a.key;c&&"normal"==c&&((c=a.styleUrl)&&(b[b.length-1]=c),(a=a.Style)&&(b[b.length-1]=a))}}});k=go.prototype;
k.vg=function(a,b){var c=K(xo,{Document:ql(this.vg,this),Folder:ql(this.vg,this),Placemark:rl(this.Dg,this),Style:this.Jp.bind(this),StyleMap:this.Ip.bind(this)});if(a=N([],c,a,b,this))return a};k.Dg=function(a,b){var c=N({geometry:null},op,a,b);if(c){var d=new H;a=a.getAttribute("id");null!==a&&d.jc(a);b=b[0];(a=c.geometry)&&Hl(a,!1,b);d.Ra(a);delete c.geometry;this.c&&d.hg(Ao(c.Style,c.styleUrl,this.a,this.b,this.g));delete c.Style;d.H(c);return d}};
k.Jp=function(a,b){var c=a.getAttribute("id");null!==c&&(b=Uo(a,b))&&(a=a.baseURI&&"about:blank"!==a.baseURI?(new URL("#"+c,a.baseURI)).href:"#"+c,this.b[a]=b)};k.Ip=function(a,b){var c=a.getAttribute("id");null!==c&&(b=N(void 0,np,a,b))&&(a=a.baseURI&&"about:blank"!==a.baseURI?(new URL("#"+c,a.baseURI)).href:"#"+c,this.b[a]=b)};k.xg=function(a,b){return ja(xo,a.namespaceURI)?(a=this.Dg(a,[Fl(this,a,b)]))?a:null:null};
k.zc=function(a,b){if(!ja(xo,a.namespaceURI))return[];var c=a.localName;if("Document"==c||"Folder"==c)return(c=this.vg(a,[Fl(this,a,b)]))?c:[];if("Placemark"==c)return(b=this.Dg(a,[Fl(this,a,b)]))?[b]:[];if("kml"==c){c=[];for(a=a.firstElementChild;a;a=a.nextElementSibling){var d=this.zc(a,b);d&&la(c,d)}return c}return[]};k.Cp=function(a){if(ml(a))return qp(this,a);if(nl(a))return rp(this,a);if("string"===typeof a)return a=pl(a),qp(this,a)};
function qp(a,b){for(b=b.firstChild;b;b=b.nextSibling)if(b.nodeType==Node.ELEMENT_NODE){var c=rp(a,b);if(c)return c}}function rp(a,b){var c;for(c=b.firstElementChild;c;c=c.nextElementSibling)if(ja(xo,c.namespaceURI)&&"name"==c.localName)return S(c);for(c=b.firstElementChild;c;c=c.nextElementSibling)if(b=c.localName,ja(xo,c.namespaceURI)&&("Document"==b||"Folder"==b||"Placemark"==b||"kml"==b)&&(b=rp(a,c)))return b}
k.Dp=function(a){var b=[];ml(a)?la(b,sp(this,a)):nl(a)?la(b,tp(this,a)):"string"===typeof a&&(a=pl(a),la(b,sp(this,a)));return b};function sp(a,b){var c=[];for(b=b.firstChild;b;b=b.nextSibling)b.nodeType==Node.ELEMENT_NODE&&la(c,tp(a,b));return c}
function tp(a,b){var c,d=[];for(c=b.firstElementChild;c;c=c.nextElementSibling)if(ja(xo,c.namespaceURI)&&"NetworkLink"==c.localName){var e=N({},lp,c,[]);d.push(e)}for(c=b.firstElementChild;c;c=c.nextElementSibling)b=c.localName,!ja(xo,c.namespaceURI)||"Document"!=b&&"Folder"!=b&&"kml"!=b||la(d,tp(a,c));return d}k.Gp=function(a){var b=[];ml(a)?la(b,up(this,a)):nl(a)?la(b,this.lf(a)):"string"===typeof a&&(a=pl(a),la(b,up(this,a)));return b};
function up(a,b){var c=[];for(b=b.firstChild;b;b=b.nextSibling)b.nodeType==Node.ELEMENT_NODE&&la(c,a.lf(b));return c}k.lf=function(a){var b,c=[];for(b=a.firstElementChild;b;b=b.nextElementSibling)if(ja(xo,b.namespaceURI)&&"Region"==b.localName){var d=N({},Zo,b,[]);c.push(d)}for(b=a.firstElementChild;b;b=b.nextElementSibling)a=b.localName,!ja(xo,b.namespaceURI)||"Document"!=a&&"Folder"!=a&&"kml"!=a||la(c,this.lf(b));return c};
function vp(a,b){b=ed(b);b=[255*(4==b.length?b[3]:1),b[2],b[1],b[0]];var c;for(c=0;4>c;++c){var d=parseInt(b[c],10).toString(16);b[c]=1==d.length?"0"+d:d}Pm(a,b.join(""))}function wp(a,b,c){a={node:a};var d=b.U();if("GeometryCollection"==d){var e=b.Vf();var f=xp}else"MultiPoint"==d?(e=b.Zd(),f=yp):"MultiLineString"==d?(e=b.gd(),f=zp):"MultiPolygon"==d?(e=b.Td(),f=Ap):xa(!1,39);Bl(a,Bp,f,e,c)}function Cp(a,b,c){Bl({node:a},Dp,Ep,[b],c)}
function Fp(a,b,c){var d={node:a};b.a&&a.setAttribute("id",b.a);a=b.N();var e={address:1,description:1,name:1,open:1,phoneNumber:1,styleUrl:1,visibility:1};e[b.c]=1;var f=Object.keys(a||{}).sort().filter(function(a){return!e[a]});if(0<f.length){var g=zl(a,f);Bl(d,Gp,Hp,[{names:f,values:g}],c)}if(f=b.Lc())if(f=f.call(b,0))f=Array.isArray(f)?f[0]:f,this.j&&(a.Style=f),(f=f.Na())&&(a.name=f.Na());f=Ip[c[c.length-1].node.namespaceURI];a=zl(a,f);Bl(d,Gp,yl,a,c,f);a=c[0];(b=b.V())&&(b=Hl(b,!0,a));Bl(d,
Gp,xp,[b],c)}function Jp(a,b,c){var d=b.ga();a={node:a};a.layout=b.ja;a.stride=b.qa();Bl(a,Kp,Lp,[d],c)}function Mp(a,b,c){b=b.Sd();var d=b.shift();a={node:a};Bl(a,Np,Op,b,c);Bl(a,Np,Pp,[d],c)}function Qp(a,b){Qm(a,Math.round(1E6*b)/1E6)}
var Rp=K(xo,["Document","Placemark"]),Up=K(xo,{Document:J(function(a,b,c){Bl({node:a},Sp,Tp,b,c,void 0,this)}),Placemark:J(Fp)}),Sp=K(xo,{Placemark:J(Fp)}),Vp=K(xo,{Data:J(function(a,b,c){a.setAttribute("name",b.name);a={node:a};b=b.value;"object"==typeof b?(null!==b&&b.displayName&&Bl(a,Vp,yl,[b.displayName],c,["displayName"]),null!==b&&b.value&&Bl(a,Vp,yl,[b.value],c,["value"])):Bl(a,Vp,yl,[b],c,["value"])}),value:J(function(a,b){Pm(a,b)}),displayName:J(function(a,b){a.appendChild(il.createCDATASection(b))})}),
Wp={Point:"Point",LineString:"LineString",LinearRing:"LinearRing",Polygon:"Polygon",MultiPoint:"MultiGeometry",MultiLineString:"MultiGeometry",MultiPolygon:"MultiGeometry",GeometryCollection:"MultiGeometry"},Xp=K(xo,["href"],K(wo,["x","y","w","h"])),Yp=K(xo,{href:J(Pm)},K(wo,{x:J(Qm),y:J(Qm),w:J(Qm),h:J(Qm)})),Zp=K(xo,["scale","heading","Icon","hotSpot"]),aq=K(xo,{Icon:J(function(a,b,c){a={node:a};var d=Xp[c[c.length-1].node.namespaceURI],e=zl(b,d);Bl(a,Yp,yl,e,c,d);d=Xp[wo[0]];e=zl(b,d);Bl(a,Yp,
$p,e,c,d)}),heading:J(Qm),hotSpot:J(function(a,b){a.setAttribute("x",b.x);a.setAttribute("y",b.y);a.setAttribute("xunits",b.Xg);a.setAttribute("yunits",b.Yg)}),scale:J(Qp)}),bq=K(xo,["color","scale"]),cq=K(xo,{color:J(vp),scale:J(Qp)}),dq=K(xo,["color","width"]),eq=K(xo,{color:J(vp),width:J(Qm)}),Dp=K(xo,{LinearRing:J(Jp)}),Bp=K(xo,{LineString:J(Jp),Point:J(Jp),Polygon:J(Mp),GeometryCollection:J(wp)}),Ip=K(xo,"name open visibility address phoneNumber description styleUrl Style".split(" ")),Gp=K(xo,
{ExtendedData:J(function(a,b,c){a={node:a};var d=b.names;b=b.values;for(var e=d.length,f=0;f<e;f++)Bl(a,Vp,fq,[{name:d[f],value:b[f]}],c)}),MultiGeometry:J(wp),LineString:J(Jp),LinearRing:J(Jp),Point:J(Jp),Polygon:J(Mp),Style:J(function(a,b,c){a={node:a};var d={},e=b.Fa(),f=b.Ga(),g=b.Y();b=b.Na();g instanceof eo&&(d.IconStyle=g);b&&(d.LabelStyle=b);f&&(d.LineStyle=f);e&&(d.PolyStyle=e);b=gq[c[c.length-1].node.namespaceURI];d=zl(d,b);Bl(a,hq,yl,d,c,b)}),address:J(Pm),description:J(Pm),name:J(Pm),
open:J(Om),phoneNumber:J(Pm),styleUrl:J(Pm),visibility:J(Om)}),Kp=K(xo,{coordinates:J(function(a,b,c){c=c[c.length-1];var d=c.layout;c=c.stride;var e;"XY"==d||"XYM"==d?e=2:"XYZ"==d||"XYZM"==d?e=3:xa(!1,34);var f,g=b.length,h="";if(0<g){h+=b[0];for(d=1;d<e;++d)h+=","+b[d];for(f=c;f<g;f+=c)for(h+=" "+b[f],d=1;d<e;++d)h+=","+b[f+d]}Pm(a,h)})}),Np=K(xo,{outerBoundaryIs:J(Cp),innerBoundaryIs:J(Cp)}),iq=K(xo,{color:J(vp)}),gq=K(xo,["IconStyle","LabelStyle","LineStyle","PolyStyle"]),hq=K(xo,{IconStyle:J(function(a,
b,c){a={node:a};var d={},e=b.ic(),f=b.ye(),g={href:b.b.o};if(e){g.w=e[0];g.h=e[1];var h=b.Hc(),l=b.Oc();l&&f&&l[0]&&l[1]!==e[1]&&(g.x=l[0],g.y=f[1]-(l[1]+e[1]));h&&h[0]&&h[1]!==e[1]&&(d.hotSpot={x:h[0],Xg:"pixels",y:e[1]-h[1],Yg:"pixels"})}d.Icon=g;e=b.a;1!==e&&(d.scale=e);(b=b.g)&&(d.heading=b);b=Zp[c[c.length-1].node.namespaceURI];d=zl(d,b);Bl(a,aq,yl,d,c,b)}),LabelStyle:J(function(a,b,c){a={node:a};var d={},e=b.Fa();e&&(d.color=e.b);(b=b.b)&&1!==b&&(d.scale=b);b=bq[c[c.length-1].node.namespaceURI];
d=zl(d,b);Bl(a,cq,yl,d,c,b)}),LineStyle:J(function(a,b,c){a={node:a};var d=dq[c[c.length-1].node.namespaceURI];b=zl({color:b.a,width:b.c},d);Bl(a,eq,yl,b,c,d)}),PolyStyle:J(function(a,b,c){Bl({node:a},iq,jq,[b.b],c)})});function $p(a,b,c){return jl(wo[0],"gx:"+c)}function Tp(a,b){return jl(b[b.length-1].node.namespaceURI,"Placemark")}function xp(a,b){if(a)return jl(b[b.length-1].node.namespaceURI,Wp[a.U()])}
var jq=wl("color"),Lp=wl("coordinates"),fq=wl("Data"),Hp=wl("ExtendedData"),Op=wl("innerBoundaryIs"),yp=wl("Point"),zp=wl("LineString"),Ep=wl("LinearRing"),Ap=wl("Polygon"),Pp=wl("outerBoundaryIs");
go.prototype.Xb=function(a,b){b=Gl(this,b);var c=jl(xo[4],"kml");c.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:gx",wo[0]);c.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation","http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd");var d={node:c},e={};1<a.length?e.Document=a:1==a.length&&(e.Placemark=a[0]);a=Rp[c.namespaceURI];
e=zl(e,a);Bl(d,Up,yl,e,[b],a,this);return c};Fj.Dd=function(){};
(function(a){function b(a){this.lc=ArrayBuffer.isView&&ArrayBuffer.isView(a)?a:new Uint8Array(a||0);this.type=this.ea=0;this.length=this.lc.length}function c(a,b,c){var e=c.lc;var f=e[c.ea++];var g=(f&112)>>4;if(128>f)return d(a,g,b);f=e[c.ea++];g|=(f&127)<<3;if(128>f)return d(a,g,b);f=e[c.ea++];g|=(f&127)<<10;if(128>f)return d(a,g,b);f=e[c.ea++];g|=(f&127)<<17;if(128>f)return d(a,g,b);f=e[c.ea++];g|=(f&127)<<24;if(128>f)return d(a,g,b);f=e[c.ea++];if(128>f)return d(a,g|(f&1)<<31,b);throw Error("Expected varint not more than 10 bytes");
}function d(a,b,c){return c?4294967296*b+(a>>>0):4294967296*(b>>>0)+(a>>>0)}var e={read:function(a,b,c,d,e){var f=8*e-d-1;var g=(1<<f)-1,h=g>>1,l=-7;e=c?e-1:0;var m=c?-1:1,x=a[b+e];e+=m;c=x&(1<<-l)-1;x>>=-l;for(l+=f;0<l;c=256*c+a[b+e],e+=m,l-=8);f=c&(1<<-l)-1;c>>=-l;for(l+=d;0<l;f=256*f+a[b+e],e+=m,l-=8);if(0===c)c=1-h;else{if(c===g)return f?NaN:Infinity*(x?-1:1);f+=Math.pow(2,d);c-=h}return(x?-1:1)*f*Math.pow(2,c-d)},write:function(a,b,c,d,e,n){var f,g=8*n-e-1,h=(1<<g)-1,l=h>>1,m=23===e?Math.pow(2,
-24)-Math.pow(2,-77):0;n=d?0:n-1;var B=d?1:-1,E=0>b||0===b&&0>1/b?1:0;b=Math.abs(b);isNaN(b)||Infinity===b?(b=isNaN(b)?1:0,d=h):(d=Math.floor(Math.log(b)/Math.LN2),1>b*(f=Math.pow(2,-d))&&(d--,f*=2),b=1<=d+l?b+m/f:b+m*Math.pow(2,1-l),2<=b*f&&(d++,f/=2),d+l>=h?(b=0,d=h):1<=d+l?(b=(b*f-1)*Math.pow(2,e),d+=l):(b=b*Math.pow(2,l-1)*Math.pow(2,e),d=0));for(;8<=e;a[c+n]=b&255,n+=B,b/=256,e-=8);d=d<<e|b;for(g+=e;0<g;a[c+n]=d&255,n+=B,d/=256,g-=8);a[c+n-B]|=128*E}};b.c=0;b.i=1;b.b=2;b.a=5;b.prototype={Ag:function(a,
b,c){for(c=c||this.length;this.ea<c;){var d=this.Ka(),e=d>>3,f=this.ea;this.type=d&7;a(e,b,this);this.ea===f&&this.mq(d)}return b},yp:function(){var a=e.read(this.lc,this.ea,!0,23,4);this.ea+=4;return a},up:function(){var a=e.read(this.lc,this.ea,!0,52,8);this.ea+=8;return a},Ka:function(a){var b=this.lc;var d=b[this.ea++];var e=d&127;if(128>d)return e;d=b[this.ea++];e|=(d&127)<<7;if(128>d)return e;d=b[this.ea++];e|=(d&127)<<14;if(128>d)return e;d=b[this.ea++];e|=(d&127)<<21;if(128>d)return e;d=b[this.ea];
return c(e|(d&15)<<28,a,this)},Kp:function(){return this.Ka(!0)},ce:function(){var a=this.Ka();return 1===a%2?(a+1)/-2:a/2},sp:function(){return!!this.Ka()},Gg:function(){for(var a=this.Ka()+this.ea,b=this.lc,c="",d=this.ea;d<a;){var e=b[d],n=null,p=239<e?4:223<e?3:191<e?2:1;if(d+p>a)break;if(1===p)128>e&&(n=e);else if(2===p){var q=b[d+1];128===(q&192)&&(n=(e&31)<<6|q&63,127>=n&&(n=null))}else if(3===p){q=b[d+1];var r=b[d+2];128===(q&192)&&128===(r&192)&&(n=(e&15)<<12|(q&63)<<6|r&63,2047>=n||55296<=
n&&57343>=n)&&(n=null)}else if(4===p){q=b[d+1];r=b[d+2];var u=b[d+3];128===(q&192)&&128===(r&192)&&128===(u&192)&&(n=(e&15)<<18|(q&63)<<12|(r&63)<<6|u&63,65535>=n||1114112<=n)&&(n=null)}null===n?(n=65533,p=1):65535<n&&(n-=65536,c+=String.fromCharCode(n>>>10&1023|55296),n=56320|n&1023);c+=String.fromCharCode(n);d+=p}this.ea=a;return c},mq:function(a){a&=7;if(a===b.c)for(;127<this.lc[this.ea++];);else if(a===b.b)this.ea=this.Ka()+this.ea;else if(a===b.a)this.ea+=4;else if(a===b.i)this.ea+=8;else throw Error("Unimplemented type: "+
a);}};a["default"]=b})(Fj.Dd=Fj.Dd||{});Fj.Dd=Fj.Dd.default;Fj.xf={};Fj.xf.Bf=function(){};
(function(a){function b(a,b){this.layers=a.Ag(l,{},b)}function c(a,b){this.x=a;this.y=b}function d(a,b,c,d,f){this.properties={};this.extent=c;this.type=0;this.Cc=a;this.Ef=-1;this.ne=d;this.pe=f;a.Ag(e,this,b)}function e(a,b,c){if(1==a)b.id=c.Ka();else if(2==a)for(a=c.Ka()+c.ea;c.ea<a;){var d=b.ne[c.Ka()],e=b.pe[c.Ka()];b.properties[d]=e}else 3==a?b.type=c.Ka():4==a&&(b.Ef=c.ea)}function f(a,b){this.version=1;this.name=null;this.extent=4096;this.length=0;this.Cc=a;this.ne=[];this.pe=[];this.me=[];
a.Ag(g,this,b);this.length=this.me.length}function g(a,b,c){15===a?b.version=c.Ka():1===a?b.name=c.Gg():5===a?b.extent=c.Ka():2===a?b.me.push(c.ea):3===a?b.ne.push(c.Gg()):4===a&&b.pe.push(h(c))}function h(a){for(var b=null,c=a.Ka()+a.ea;a.ea<c;)b=a.Ka()>>3,b=1===b?a.Gg():2===b?a.yp():3===b?a.up():4===b?a.Kp():5===b?a.Ka():6===b?a.ce():7===b?a.sp():null;return b}function l(a,b,c){3===a&&(a=new m(c,c.Ka()+c.ea),a.length&&(b[a.name]=a))}c.prototype={clone:function(){return new c(this.x,this.y)},add:function(a){return this.clone().Yj(a)},
rotate:function(a){return this.clone().hk(a)},round:function(){return this.clone().ik()},angle:function(){return Math.atan2(this.y,this.x)},Yj:function(a){this.x+=a.x;this.y+=a.y;return this},hk:function(a){var b=Math.cos(a);a=Math.sin(a);var c=a*this.x+b*this.y;this.x=b*this.x-a*this.y;this.y=c;return this},ik:function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this}};c.Kq=function(a){return a instanceof c?a:Array.isArray(a)?new c(a[0],a[1]):a};d.b=["Unknown","Point","LineString",
"Polygon"];d.prototype.Oh=function(){var a=this.Cc;a.ea=this.Ef;for(var b=a.Ka()+a.ea,d=1,e=0,f=0,g=0,h=[],l;a.ea<b;)if(e||(e=a.Ka(),d=e&7,e>>=3),e--,1===d||2===d)f+=a.ce(),g+=a.ce(),1===d&&(l&&h.push(l),l=[]),l.push(new c(f,g));else if(7===d)l&&l.push(l[0].clone());else throw Error("unknown command "+d);l&&h.push(l);return h};d.prototype.bbox=function(){var a=this.Cc;a.ea=this.Ef;for(var b=a.Ka()+a.ea,c=1,d=0,e=0,f=0,g=Infinity,h=-Infinity,l=Infinity,m=-Infinity;a.ea<b;)if(d||(d=a.Ka(),c=d&7,d>>=
3),d--,1===c||2===c)e+=a.ce(),f+=a.ce(),e<g&&(g=e),e>h&&(h=e),f<l&&(l=f),f>m&&(m=f);else if(7!==c)throw Error("unknown command "+c);return[g,l,h,m]};var m=f;f.prototype.feature=function(a){if(0>a||a>=this.me.length)throw Error("feature index out of bounds");this.Cc.ea=this.me[a];a=this.Cc.Ka()+this.Cc.ea;return new d(this.Cc,a,this.extent,this.ne,this.pe)};var n=m;a["default"]={Bf:b,Wj:d,Xj:n};a.Bf=b;a.Wj=d;a.Xj=n})(Fj.xf=Fj.xf||{});function kq(a,b,c,d,e){this.g=e;this.i=a;this.b=b;this.f=c;this.c=d}k=kq.prototype;k.get=function(a){return this.c[a]};k.Bb=function(){return this.f};k.G=function(){this.a||(this.a="Point"===this.i?Za(this.b):$a(this.b,0,this.b.length,2));return this.a};k.Wn=function(){return this.g};k.ec=function(){return this.b};k.ga=kq.prototype.ec;k.V=function(){return this};k.Xn=function(){return this.c};k.Vd=kq.prototype.V;k.qa=function(){return 2};k.Lc=ua;k.U=function(){return this.i};function lq(a){El.call(this);a=a?a:{};this.defaultDataProjection=new Bb({code:"",units:"tile-pixels"});this.b=a.featureClass?a.featureClass:kq;this.a=a.geometryName;this.i=a.layerName?a.layerName:"layer";this.c=a.layers?a.layers:null}v(lq,El);k=lq.prototype;k.U=function(){return"arraybuffer"};
k.Oa=function(a,b){var c=this.c;a=new Fj.Dd(a);a=new Fj.xf.Bf(a);var d=[],e=this.b,f;for(f in a.layers)if(!c||-1!=c.indexOf(f)){var g=a.layers[f];for(var h=0,l=g.length;h<l;++h){if(e===kq){var m=void 0;var n=g.feature(h),p=f,q=n.Oh(),r=[],u=[];mq(q,u,r);var x=n.type;1===x?m=1===q.length?"Point":"MultiPoint":2===x?m=1===q.length?"LineString":"MultiLineString":3===x&&(m="Polygon");q=n.properties;q[this.i]=p;m=new this.b(m,u,r,q,n.id)}else{x=g.feature(h);u=f;r=b;m=new this.b;n=x.id;p=x.properties;p[this.i]=
u;this.a&&m.Tc(this.a);u=void 0;q=x.type;if(0===q)u=null;else{var x=x.Oh(),B=[],E=[];mq(x,E,B);1===q?u=1===x.length?new C(null):new Q(null):2===q?1===x.length?u=new O(null):u=new P(null):3===q&&(u=new D(null));u.ba("XY",E,B)}r=Hl(u,!1,Gl(this,r));m.Ra(r);m.jc(n);m.H(p)}d.push(m)}}return d};k.kb=function(){return this.defaultDataProjection};k.mn=function(a){this.c=a};
function mq(a,b,c){for(var d=0,e=0,f=a.length;e<f;++e){var g=a[e],h;var l=0;for(h=g.length;l<h;++l){var m=g[l];b.push(m.x,m.y)}d+=2*l;c.push(d)}}k.Tb=function(){};k.Sc=function(){};k.Bd=function(){};k.$c=function(){};k.Wb=function(){};function nq(){Cm.call(this);this.defaultDataProjection=Tb("EPSG:4326")}v(nq,Cm);function oq(a,b){b[b.length-1].fe[a.getAttribute("k")]=a.getAttribute("v")}
var pq=[null],qq=K(pq,{nd:function(a,b){b[b.length-1].md.push(a.getAttribute("ref"))},tag:oq}),sq=K(pq,{node:function(a,b){var c=b[0],d=b[b.length-1],e=a.getAttribute("id"),f=[parseFloat(a.getAttribute("lon")),parseFloat(a.getAttribute("lat"))];d.Sh[e]=f;a=N({fe:{}},rq,a,b);wb(a.fe)||(f=new C(f),Hl(f,!1,c),c=new H(f),c.jc(e),c.H(a.fe),d.features.push(c))},way:function(a,b){var c=b[0],d=a.getAttribute("id");a=N({md:[],fe:{}},qq,a,b);b=b[b.length-1];for(var e=[],f=0,g=a.md.length;f<g;f++)la(e,b.Sh[a.md[f]]);
a.md[0]==a.md[a.md.length-1]?(f=new D(null),f.ba("XY",e,[e.length])):(f=new O(null),f.ba("XY",e));Hl(f,!1,c);c=new H(f);c.jc(d);c.H(a.fe);b.features.push(c)}}),rq=K(pq,{tag:oq});nq.prototype.zc=function(a,b){b=Fl(this,a,b);return"osm"==a.localName&&(a=N({Sh:{},features:[]},sq,a,[b]),a.features)?a.features:[]};nq.prototype.Vg=function(){};nq.prototype.Xb=function(){};nq.prototype.ie=function(){};function tq(a){return a.getAttributeNS("http://www.w3.org/1999/xlink","href")};function uq(){}uq.prototype.read=function(a){return ml(a)?this.a(a):nl(a)?this.b(a):"string"===typeof a?(a=pl(a),this.a(a)):null};function vq(){}v(vq,uq);vq.prototype.a=function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return this.b(a);return null};vq.prototype.b=function(a){return(a=N({},wq,a,[]))?a:null};
var xq=[null,"http://www.opengis.net/ows/1.1"],wq=K(xq,{ServiceIdentification:I(function(a,b){return N({},yq,a,b)}),ServiceProvider:I(function(a,b){return N({},zq,a,b)}),OperationsMetadata:I(function(a,b){return N({},Aq,a,b)})}),Cq=K(xq,{DeliveryPoint:I(S),City:I(S),AdministrativeArea:I(S),PostalCode:I(S),Country:I(S),ElectronicMailAddress:I(S)}),Dq=K(xq,{Value:tl(function(a){return S(a)})}),Eq=K(xq,{AllowedValues:I(function(a,b){return N({},Dq,a,b)})}),Gq=K(xq,{Phone:I(function(a,b){return N({},
Fq,a,b)}),Address:I(function(a,b){return N({},Cq,a,b)})}),Iq=K(xq,{HTTP:I(function(a,b){return N({},Hq,a,b)})}),Hq=K(xq,{Get:tl(function(a,b){var c=tq(a);if(c)return N({href:c},Jq,a,b)}),Post:void 0}),Kq=K(xq,{DCP:I(function(a,b){return N({},Iq,a,b)})}),Aq=K(xq,{Operation:function(a,b){var c=a.getAttribute("name");(a=N({},Kq,a,b))&&(b[b.length-1][c]=a)}}),Fq=K(xq,{Voice:I(S),Facsimile:I(S)}),Jq=K(xq,{Constraint:tl(function(a,b){var c=a.getAttribute("name");if(c)return N({name:c},Eq,a,b)})}),Lq=K(xq,
{IndividualName:I(S),PositionName:I(S),ContactInfo:I(function(a,b){return N({},Gq,a,b)})}),yq=K(xq,{Title:I(S),ServiceTypeVersion:I(S),ServiceType:I(S)}),zq=K(xq,{ProviderName:I(S),ProviderSite:I(tq),ServiceContact:I(function(a,b){return N({},Lq,a,b)})});function Mq(a,b,c,d){var e;void 0!==d?e=d:e=[];for(var f=d=0;f<b;){var g=a[f++];e[d++]=a[f++];e[d++]=g;for(g=2;g<c;++g)e[d++]=a[f++]}e.length=d};function Nq(a){a=a?a:{};El.call(this);this.defaultDataProjection=Tb("EPSG:4326");this.b=a.factor?a.factor:1E5;this.a=a.geometryLayout?a.geometryLayout:"XY"}v(Nq,Vn);function Oq(a,b,c){var d,e=Array(b);for(d=0;d<b;++d)e[d]=0;var f;var g=0;for(f=a.length;g<f;)for(d=0;d<b;++d,++g){var h=a[g],l=h-e[d];e[d]=h;a[g]=l}return Pq(a,c?c:1E5)}function Qq(a,b,c){var d,e=Array(b);for(d=0;d<b;++d)e[d]=0;a=Rq(a,c?c:1E5);var f;c=0;for(f=a.length;c<f;)for(d=0;d<b;++d,++c)e[d]+=a[c],a[c]=e[d];return a}
function Pq(a,b){b=b?b:1E5;var c;var d=0;for(c=a.length;d<c;++d)a[d]=Math.round(a[d]*b);b=0;for(d=a.length;b<d;++b)c=a[b],a[b]=0>c?~(c<<1):c<<1;b="";d=0;for(c=a.length;d<c;++d){for(var e,f=a[d],g="";32<=f;)e=(32|f&31)+63,g+=String.fromCharCode(e),f>>=5;g+=String.fromCharCode(f+63);b+=g}return b}
function Rq(a,b){b=b?b:1E5;var c=[],d=0,e=0,f;var g=0;for(f=a.length;g<f;++g){var h=a.charCodeAt(g)-63,d=d|(h&31)<<e;32>h?(c.push(d),e=d=0):e+=5}a=0;for(d=c.length;a<d;++a)e=c[a],c[a]=e&1?~(e>>1):e>>1;a=0;for(d=c.length;a<d;++a)c[a]/=b;return c}k=Nq.prototype;k.ae=function(a,b){a=this.wd(a,b);return new H(a)};k.zg=function(a,b){return[this.ae(a,b)]};k.wd=function(a,b){var c=sf(this.a);a=Qq(a,c,this.b);Mq(a,a.length,c,a);c=Ff(a,0,a.length,c);return Hl(new O(c,this.a),!1,Gl(this,b))};
k.ge=function(a,b){if(a=a.V())return this.Cd(a,b);xa(!1,40);return""};k.Wg=function(a,b){return this.ge(a[0],b)};k.Cd=function(a,b){a=Hl(a,!0,Gl(this,b));b=a.ga();a=a.qa();Mq(b,b.length,a,b);return Oq(b,a,this.b)};function Sq(a){a=a?a:{};El.call(this);this.a=a.layerName;this.b=a.layers?a.layers:null;this.defaultDataProjection=Tb(a.defaultDataProjection?a.defaultDataProjection:"EPSG:4326")}v(Sq,Il);function Tq(a,b){var c=[],d,e;var f=0;for(e=a.length;f<e;++f){var g=a[f];0<f&&c.pop();0<=g?d=b[g]:d=b[~g].slice().reverse();c.push.apply(c,d)}a=0;for(b=c.length;a<b;++a)c[a]=c[a].slice();return c}
function Uq(a,b,c,d,e,f,g){a=a.geometries;var h=[],l;var m=0;for(l=a.length;m<l;++m)h[m]=Vq(a[m],b,c,d,e,f,g);return h}function Vq(a,b,c,d,e,f,g){var h=a.type,l=Wq[h];c="Point"===h||"MultiPoint"===h?l(a,c,d):l(a,b);b=new H;b.Ra(Hl(c,!1,g));void 0!==a.id&&b.jc(a.id);a=a.properties;e&&(a||(a={}),a[e]=f);a&&b.H(a);return b}
Sq.prototype.yg=function(a,b){if("Topology"==a.type){var c=null,d=null;if(a.transform){var e=a.transform;c=e.scale;d=e.translate}var f=a.arcs;if(e){e=c;var g=d,h;var l=0;for(h=f.length;l<h;++l){var m,n=f[l],p=e,q=g,r=0,u=0;var x=0;for(m=n.length;x<m;++x){var B=n[x];r+=B[0];u+=B[1];B[0]=r;B[1]=u;Xq(B,p,q)}}}e=[];a=a.objects;var g=this.a,E;for(E in a)this.b&&-1==this.b.indexOf(E)||("GeometryCollection"===a[E].type?(l=a[E],e.push.apply(e,Uq(l,f,c,d,g,E,b))):(l=a[E],e.push(Vq(l,f,c,d,g,E,b))));return e}return[]};
function Xq(a,b,c){a[0]=a[0]*b[0]+c[0];a[1]=a[1]*b[1]+c[1]}Sq.prototype.Fg=function(){return this.defaultDataProjection};
var Wq={Point:function(a,b,c){a=a.coordinates;b&&c&&Xq(a,b,c);return new C(a)},LineString:function(a,b){a=Tq(a.arcs,b);return new O(a)},Polygon:function(a,b){var c=[],d;var e=0;for(d=a.arcs.length;e<d;++e)c[e]=Tq(a.arcs[e],b);return new D(c)},MultiPoint:function(a,b,c){a=a.coordinates;var d;if(b&&c){var e=0;for(d=a.length;e<d;++e)Xq(a[e],b,c)}return new Q(a)},MultiLineString:function(a,b){var c=[],d;var e=0;for(d=a.arcs.length;e<d;++e)c[e]=Tq(a.arcs[e],b);return new P(c)},MultiPolygon:function(a,
b){var c=[],d,e;var f=0;for(e=a.arcs.length;f<e;++f){var g=a.arcs[f];var h=[];var l=0;for(d=g.length;l<d;++l)h[l]=Tq(g[l],b);c[f]=h}return new R(c)}};k=Sq.prototype;k.Zc=function(){};k.he=function(){};k.je=function(){};k.Cg=function(){};k.Rc=function(){};function Yq(a){a=a?a:{};this.c=a.featureType;this.a=a.featureNS;this.b=a.gmlFormat?a.gmlFormat:new Sm;this.o=a.schemaLocation?a.schemaLocation:Zq["1.1.0"];Cm.call(this)}v(Yq,Cm);var Zq={"1.1.0":"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd","1.0.0":"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd"};
Yq.prototype.zc=function(a,b){var c={featureType:this.c,featureNS:this.a};tb(c,Fl(this,a,b?b:{}));b=[c];this.b.b["http://www.opengis.net/gml"].featureMember=rl(Fm.prototype.be);(a=N([],this.b.b,a,b,this.b))||(a=[]);return a};Yq.prototype.j=function(a){if(ml(a))return $q(a);if(nl(a))return N({},ar,a,[]);if("string"===typeof a)return a=pl(a),$q(a)};Yq.prototype.g=function(a){if(ml(a))return br(this,a);if(nl(a))return cr(this,a);if("string"===typeof a)return a=pl(a),br(this,a)};
function br(a,b){for(b=b.firstChild;b;b=b.nextSibling)if(b.nodeType==Node.ELEMENT_NODE)return cr(a,b)}var dr={"http://www.opengis.net/gml":{boundedBy:I(Fm.prototype.gf,"bounds")}};function cr(a,b){var c={},d=Nm(b.getAttribute("numberOfFeatures"));c.numberOfFeatures=d;return N(c,dr,b,[],a.b)}
var er={"http://www.opengis.net/wfs":{totalInserted:I(Mm),totalUpdated:I(Mm),totalDeleted:I(Mm)}},fr={"http://www.opengis.net/ogc":{FeatureId:rl(function(a){return a.getAttribute("fid")})}},gr={"http://www.opengis.net/wfs":{Feature:function(a,b){Al(fr,a,b)}}},ar={"http://www.opengis.net/wfs":{TransactionSummary:I(function(a,b){return N({},er,a,b)},"transactionSummary"),InsertResults:I(function(a,b){return N([],gr,a,b)},"insertIds")}};
function $q(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return N({},ar,a,[])}var hr={"http://www.opengis.net/wfs":{PropertyName:J(Pm)}};function ir(a,b){var c=jl("http://www.opengis.net/ogc","Filter"),d=jl("http://www.opengis.net/ogc","FeatureId");c.appendChild(d);d.setAttribute("fid",b);a.appendChild(c)}function jr(a,b){a=(a?a:"feature")+":";return b.indexOf(a)?a+b:b}
var kr={"http://www.opengis.net/wfs":{Insert:J(function(a,b,c){var d=c[c.length-1],e=d.gmlVersion,d=jl(d.featureNS,d.featureType);a.appendChild(d);if(2===e){a=an.prototype;(e=b.a)&&d.setAttribute("fid",e);var e=c[c.length-1],f=e.featureNS,g=b.c;e.lb||(e.lb={},e.lb[f]={});var h=b.N();b=[];var l=[];for(n in h){var m=h[n];null!==m&&(b.push(n),l.push(m),n==g||m instanceof of?n in e.lb[f]||(e.lb[f][n]=J(a.ai,a)):n in e.lb[f]||(e.lb[f][n]=J(Pm)))}var n=tb({},e);n.node=d;Bl(n,e.lb,wl(void 0,f),l,c,b)}else Sm.prototype.ii(d,
b,c)}),Update:J(function(a,b,c){var d=c[c.length-1];xa(void 0!==b.a,27);var e=d.featurePrefix,f=d.featureNS;a.setAttribute("typeName",jr(e,d.featureType));a.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:"+e,f);e=b.a;if(void 0!==e){for(var f=b.O(),g=[],h=0,l=f.length;h<l;h++){var m=b.get(f[h]);void 0!==m&&g.push({name:f[h],value:m})}Bl({gmlVersion:d.gmlVersion,node:a,hasZ:d.hasZ,srsName:d.srsName},kr,wl("Property"),g,c);ir(a,e)}}),Delete:J(function(a,b,c){c=c[c.length-1];xa(void 0!==b.a,26);
var d=c.featurePrefix,e=c.featureNS;a.setAttribute("typeName",jr(d,c.featureType));a.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:"+d,e);b=b.a;void 0!==b&&ir(a,b)}),Property:J(function(a,b,c){var d=jl("http://www.opengis.net/wfs","Name"),e=c[c.length-1].gmlVersion;a.appendChild(d);Pm(d,b.name);void 0!==b.value&&null!==b.value&&(d=jl("http://www.opengis.net/wfs","Value"),a.appendChild(d),b.value instanceof of?2===e?an.prototype.ai(d,b.value,c):Sm.prototype.od(d,b.value,c):Pm(d,b.value))}),
Native:J(function(a,b){b.vq&&a.setAttribute("vendorId",b.vq);void 0!==b.Vp&&a.setAttribute("safeToIgnore",b.Vp);void 0!==b.value&&Pm(a,b.value)})}};function lr(a,b,c){var d={node:a};b.b.forEach(function(a){Bl(d,mr,wl(a.kc),[a],c)})}function nr(a,b){void 0!==b.a&&a.setAttribute("matchCase",b.a.toString());or(a,b.b);pr(a,""+b.i)}function qr(a,b,c){a=jl("http://www.opengis.net/ogc",a);Pm(a,c);b.appendChild(a)}function or(a,b){qr("PropertyName",a,b)}function pr(a,b){qr("Literal",a,b)}
function rr(a,b){var c=jl("http://www.opengis.net/gml","TimeInstant");a.appendChild(c);a=jl("http://www.opengis.net/gml","timePosition");c.appendChild(a);Pm(a,b)}
var mr={"http://www.opengis.net/wfs":{Query:J(function(a,b,c){var d=c[c.length-1],e=d.featurePrefix,f=d.featureNS,g=d.propertyNames,h=d.srsName;a.setAttribute("typeName",e?jr(e,b):b);h&&a.setAttribute("srsName",h);f&&a.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:"+e,f);b=tb({},d);b.node=a;Bl(b,hr,wl("PropertyName"),g,c);if(d=d.filter)g=jl("http://www.opengis.net/ogc","Filter"),a.appendChild(g),Bl({node:g},mr,wl(d.kc),[d],c)})},"http://www.opengis.net/ogc":{During:J(function(a,b){var c=jl("http://www.opengis.net/fes",
"ValueReference");Pm(c,b.b);a.appendChild(c);c=jl("http://www.opengis.net/gml","TimePeriod");a.appendChild(c);a=jl("http://www.opengis.net/gml","begin");c.appendChild(a);rr(a,b.a);a=jl("http://www.opengis.net/gml","end");c.appendChild(a);rr(a,b.i)}),And:J(lr),Or:J(lr),Not:J(function(a,b,c){b=b.condition;Bl({node:a},mr,wl(b.kc),[b],c)}),BBOX:J(function(a,b,c){c[c.length-1].srsName=b.srsName;or(a,b.geometryName);Sm.prototype.od(a,b.extent,c)}),Intersects:J(function(a,b,c){c[c.length-1].srsName=b.srsName;
or(a,b.geometryName);Sm.prototype.od(a,b.geometry,c)}),Within:J(function(a,b,c){c[c.length-1].srsName=b.srsName;or(a,b.geometryName);Sm.prototype.od(a,b.geometry,c)}),PropertyIsEqualTo:J(nr),PropertyIsNotEqualTo:J(nr),PropertyIsLessThan:J(nr),PropertyIsLessThanOrEqualTo:J(nr),PropertyIsGreaterThan:J(nr),PropertyIsGreaterThanOrEqualTo:J(nr),PropertyIsNull:J(function(a,b){or(a,b.b)}),PropertyIsBetween:J(function(a,b){or(a,b.b);var c=jl("http://www.opengis.net/ogc","LowerBoundary");a.appendChild(c);
pr(c,""+b.a);c=jl("http://www.opengis.net/ogc","UpperBoundary");a.appendChild(c);pr(c,""+b.i)}),PropertyIsLike:J(function(a,b){a.setAttribute("wildCard",b.g);a.setAttribute("singleChar",b.f);a.setAttribute("escapeChar",b.i);void 0!==b.a&&a.setAttribute("matchCase",b.a.toString());or(a,b.b);pr(a,""+b.c)})}};
Yq.prototype.l=function(a){var b=jl("http://www.opengis.net/wfs","GetFeature");b.setAttribute("service","WFS");b.setAttribute("version","1.1.0");if(a){a.handle&&b.setAttribute("handle",a.handle);a.outputFormat&&b.setAttribute("outputFormat",a.outputFormat);void 0!==a.maxFeatures&&b.setAttribute("maxFeatures",a.maxFeatures);a.resultType&&b.setAttribute("resultType",a.resultType);void 0!==a.startIndex&&b.setAttribute("startIndex",a.startIndex);void 0!==a.count&&b.setAttribute("count",a.count);var c=
a.filter;if(a.bbox){xa(a.geometryName,12);var d=sm(a.geometryName,a.bbox,a.srsName);c?c=rm(c,d):c=d}}b.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",this.o);c={node:b,srsName:a.srsName,featureNS:a.featureNS?a.featureNS:this.a,featurePrefix:a.featurePrefix,geometryName:a.geometryName,filter:c,propertyNames:a.propertyNames?a.propertyNames:[]};xa(Array.isArray(a.featureTypes),11);a=a.featureTypes;c=[c];d=tb({},c[c.length-1]);d.node=b;Bl(d,mr,wl("Query"),a,c);return b};
Yq.prototype.v=function(a,b,c,d){var e=[],f=jl("http://www.opengis.net/wfs","Transaction"),g=d.version?d.version:"1.1.0",h="1.0.0"===g?2:3;f.setAttribute("service","WFS");f.setAttribute("version",g);if(d){var l=d.gmlOptions?d.gmlOptions:{};d.handle&&f.setAttribute("handle",d.handle)}f.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",Zq[g]);a&&(g={node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:d.featurePrefix,gmlVersion:h,hasZ:d.hasZ,srsName:d.srsName},
tb(g,l),Bl(g,kr,wl("Insert"),a,e));b&&(g={node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:d.featurePrefix,gmlVersion:h,hasZ:d.hasZ,srsName:d.srsName},tb(g,l),Bl(g,kr,wl("Update"),b,e));c&&Bl({node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:d.featurePrefix,gmlVersion:h,srsName:d.srsName},kr,wl("Delete"),c,e);d.nativeElements&&Bl({node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:d.featurePrefix,gmlVersion:h,srsName:d.srsName},kr,wl("Native"),
d.nativeElements,e);return f};Yq.prototype.Eg=function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return this.kf(a);return null};Yq.prototype.kf=function(a){if(a.firstElementChild&&a.firstElementChild.firstElementChild)for(a=a.firstElementChild.firstElementChild,a=a.firstElementChild;a;a=a.nextElementSibling)if(0!==a.childNodes.length&&(1!==a.childNodes.length||3!==a.firstChild.nodeType)){var b=[{}];this.b.gf(a,b);return Tb(b.pop().srsName)}return null};function sr(a){a=a?a:{};El.call(this);this.b=void 0!==a.splitCollection?a.splitCollection:!1}v(sr,Vn);function tr(a){a=a.X();return a.length?a.join(" "):""}function ur(a){a=a.X();for(var b=[],c=0,d=a.length;c<d;++c)b.push(a[c].join(" "));return b.join(",")}function vr(a){var b=[];a=a.Sd();for(var c=0,d=a.length;c<d;++c)b.push("("+ur(a[c])+")");return b.join(",")}
function wr(a){var b=a.U(),c=(0,xr[b])(a),b=b.toUpperCase();if(a instanceof rf){a=a.ja;var d="";if("XYZ"===a||"XYZM"===a)d+="Z";if("XYM"===a||"XYZM"===a)d+="M";a=d;0<a.length&&(b+=" "+a)}return c.length?b+"("+c+")":b+" EMPTY"}
var xr={Point:tr,LineString:ur,Polygon:vr,MultiPoint:function(a){var b=[];a=a.Zd();for(var c=0,d=a.length;c<d;++c)b.push("("+tr(a[c])+")");return b.join(",")},MultiLineString:function(a){var b=[];a=a.gd();for(var c=0,d=a.length;c<d;++c)b.push("("+ur(a[c])+")");return b.join(",")},MultiPolygon:function(a){var b=[];a=a.Td();for(var c=0,d=a.length;c<d;++c)b.push("("+vr(a[c])+")");return b.join(",")},GeometryCollection:function(a){var b=[];a=a.Vf();for(var c=0,d=a.length;c<d;++c)b.push(wr(a[c]));return b.join(",")}};
k=sr.prototype;k.ae=function(a,b){return(a=this.wd(a,b))?(b=new H,b.Ra(a),b):null};k.zg=function(a,b){var c=[];a=this.wd(a,b);this.b&&"GeometryCollection"==a.U()?c=a.a:c=[a];b=[];for(var d=0,e=c.length;d<e;++d)a=new H,a.Ra(c[d]),b.push(a);return b};k.wd=function(a,b){a=new yr(new zr(a));Ar(a);return(a=Br(a))?Hl(a,!1,b):null};k.ge=function(a,b){return(a=a.V())?this.Cd(a,b):""};
k.Wg=function(a,b){if(1==a.length)return this.ge(a[0],b);for(var c=[],d=0,e=a.length;d<e;++d)c.push(a[d].V());a=new tm(c);return this.Cd(a,b)};k.Cd=function(a,b){return wr(Hl(a,!0,b))};function zr(a){this.a=a;this.b=-1}
function Cr(a){var b=a.a.charAt(++a.b),c={position:a.b,value:b};if("("==b)c.type=2;else if(","==b)c.type=5;else if(")"==b)c.type=3;else if("0"<=b&&"9">=b||"."==b||"-"==b){c.type=4;var b=a.b,d=!1,e=!1;do{if("."==f)d=!0;else if("e"==f||"E"==f)e=!0;var f=a.a.charAt(++a.b)}while("0"<=f&&"9">=f||"."==f&&(void 0===d||!d)||!e&&("e"==f||"E"==f)||e&&("-"==f||"+"==f));a=parseFloat(a.a.substring(b,a.b--));c.value=a}else if("a"<=b&&"z">=b||"A"<=b&&"Z">=b){c.type=1;b=a.b;do f=a.a.charAt(++a.b);while("a"<=f&&"z">=
f||"A"<=f&&"Z">=f);a=a.a.substring(b,a.b--).toUpperCase();c.value=a}else{if(" "==b||"\t"==b||"\r"==b||"\n"==b)return Cr(a);if(""===b)c.type=6;else throw Error("Unexpected character: "+b);}return c}function yr(a){this.i=a;this.a="XY"}function Ar(a){a.b=Cr(a.i)}function Dr(a,b){(b=a.b.type==b)&&Ar(a);return b}
function Br(a){var b=a.b;if(Dr(a,1)){var b=b.value,c="XY",d=a.b;1==a.b.type&&(d=d.value,"Z"===d?c="XYZ":"M"===d?c="XYM":"ZM"===d&&(c="XYZM"),"XY"!==c&&Ar(a));a.a=c;if("GEOMETRYCOLLECTION"==b){a:{if(Dr(a,2)){b=[];do b.push(Br(a));while(Dr(a,5));if(Dr(a,3)){a=b;break a}}else if(Er(a)){a=[];break a}throw Error(Fr(a));}return new tm(a)}d=Gr[b];c=Hr[b];if(!d||!c)throw Error("Invalid geometry type: "+b);b=d.call(a);return new c(b,a.a)}throw Error(Fr(a));}k=yr.prototype;
k.tg=function(){if(Dr(this,2)){var a=Ir(this);if(Dr(this,3))return a}else if(Er(this))return null;throw Error(Fr(this));};k.sg=function(){if(Dr(this,2)){var a=Jr(this);if(Dr(this,3))return a}else if(Er(this))return[];throw Error(Fr(this));};k.ug=function(){if(Dr(this,2)){var a=Kr(this);if(Dr(this,3))return a}else if(Er(this))return[];throw Error(Fr(this));};
k.fp=function(){if(Dr(this,2)){var a;if(2==this.b.type)for(a=[this.tg()];Dr(this,5);)a.push(this.tg());else a=Jr(this);if(Dr(this,3))return a}else if(Er(this))return[];throw Error(Fr(this));};k.ep=function(){if(Dr(this,2)){var a=Kr(this);if(Dr(this,3))return a}else if(Er(this))return[];throw Error(Fr(this));};k.gp=function(){if(Dr(this,2)){for(var a=[this.ug()];Dr(this,5);)a.push(this.ug());if(Dr(this,3))return a}else if(Er(this))return[];throw Error(Fr(this));};
function Ir(a){for(var b=[],c=a.a.length,d=0;d<c;++d){var e=a.b;if(Dr(a,4))b.push(e.value);else break}if(b.length==c)return b;throw Error(Fr(a));}function Jr(a){for(var b=[Ir(a)];Dr(a,5);)b.push(Ir(a));return b}function Kr(a){for(var b=[a.sg()];Dr(a,5);)b.push(a.sg());return b}function Er(a){var b=1==a.b.type&&"EMPTY"==a.b.value;b&&Ar(a);return b}function Fr(a){return"Unexpected `"+a.b.value+"` at position "+a.b.position+" in `"+a.i.a+"`"}
var Hr={POINT:C,LINESTRING:O,POLYGON:D,MULTIPOINT:Q,MULTILINESTRING:P,MULTIPOLYGON:R},Gr={POINT:yr.prototype.tg,LINESTRING:yr.prototype.sg,POLYGON:yr.prototype.ug,MULTIPOINT:yr.prototype.fp,MULTILINESTRING:yr.prototype.ep,MULTIPOLYGON:yr.prototype.gp};function Lr(){this.version=void 0}v(Lr,uq);Lr.prototype.a=function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return this.b(a);return null};Lr.prototype.b=function(a){this.version=a.getAttribute("version").trim();return(a=N({version:this.version},Mr,a,[]))?a:null};function Nr(a,b){return N({},Or,a,b)}function Pr(a,b){return N({},Qr,a,b)}function Rr(a,b){if(b=Nr(a,b))return a=[Nm(a.getAttribute("width")),Nm(a.getAttribute("height"))],b.size=a,b}
function Sr(a,b){return N([],Tr,a,b)}
var Ur=[null,"http://www.opengis.net/wms"],Mr=K(Ur,{Service:I(function(a,b){return N({},Vr,a,b)}),Capability:I(function(a,b){return N({},Wr,a,b)})}),Wr=K(Ur,{Request:I(function(a,b){return N({},Xr,a,b)}),Exception:I(function(a,b){return N([],Yr,a,b)}),Layer:I(function(a,b){return N({},Zr,a,b)})}),Vr=K(Ur,{Name:I(S),Title:I(S),Abstract:I(S),KeywordList:I(Sr),OnlineResource:I(tq),ContactInformation:I(function(a,b){return N({},$r,a,b)}),Fees:I(S),AccessConstraints:I(S),LayerLimit:I(Mm),MaxWidth:I(Mm),
MaxHeight:I(Mm)}),$r=K(Ur,{ContactPersonPrimary:I(function(a,b){return N({},as,a,b)}),ContactPosition:I(S),ContactAddress:I(function(a,b){return N({},bs,a,b)}),ContactVoiceTelephone:I(S),ContactFacsimileTelephone:I(S),ContactElectronicMailAddress:I(S)}),as=K(Ur,{ContactPerson:I(S),ContactOrganization:I(S)}),bs=K(Ur,{AddressType:I(S),Address:I(S),City:I(S),StateOrProvince:I(S),PostCode:I(S),Country:I(S)}),Yr=K(Ur,{Format:rl(S)}),Zr=K(Ur,{Name:I(S),Title:I(S),Abstract:I(S),KeywordList:I(Sr),CRS:tl(S),
EX_GeographicBoundingBox:I(function(a,b){var c=N({},cs,a,b);if(c){a=c.westBoundLongitude;b=c.southBoundLatitude;var d=c.eastBoundLongitude,c=c.northBoundLatitude;if(void 0!==a&&void 0!==b&&void 0!==d&&void 0!==c)return[a,b,d,c]}}),BoundingBox:tl(function(a){var b=[Lm(a.getAttribute("minx")),Lm(a.getAttribute("miny")),Lm(a.getAttribute("maxx")),Lm(a.getAttribute("maxy"))],c=[Lm(a.getAttribute("resx")),Lm(a.getAttribute("resy"))];return{crs:a.getAttribute("CRS"),extent:b,res:c}}),Dimension:tl(function(a){return{name:a.getAttribute("name"),
units:a.getAttribute("units"),unitSymbol:a.getAttribute("unitSymbol"),"default":a.getAttribute("default"),multipleValues:Im(a.getAttribute("multipleValues")),nearestValue:Im(a.getAttribute("nearestValue")),current:Im(a.getAttribute("current")),values:S(a)}}),Attribution:I(function(a,b){return N({},ds,a,b)}),AuthorityURL:tl(function(a,b){if(b=Nr(a,b))return b.name=a.getAttribute("name"),b}),Identifier:tl(S),MetadataURL:tl(function(a,b){if(b=Nr(a,b))return b.type=a.getAttribute("type"),b}),DataURL:tl(Nr),
FeatureListURL:tl(Nr),Style:tl(function(a,b){return N({},es,a,b)}),MinScaleDenominator:I(Km),MaxScaleDenominator:I(Km),Layer:tl(function(a,b){var c=b[b.length-1],d=N({},Zr,a,b);if(d)return b=Im(a.getAttribute("queryable")),void 0===b&&(b=c.queryable),d.queryable=void 0!==b?b:!1,b=Nm(a.getAttribute("cascaded")),void 0===b&&(b=c.cascaded),d.cascaded=b,b=Im(a.getAttribute("opaque")),void 0===b&&(b=c.opaque),d.opaque=void 0!==b?b:!1,b=Im(a.getAttribute("noSubsets")),void 0===b&&(b=c.noSubsets),d.noSubsets=
void 0!==b?b:!1,(b=Lm(a.getAttribute("fixedWidth")))||(b=c.fixedWidth),d.fixedWidth=b,(a=Lm(a.getAttribute("fixedHeight")))||(a=c.fixedHeight),d.fixedHeight=a,["Style","CRS","AuthorityURL"].forEach(function(a){a in c&&(d[a]=(d[a]||[]).concat(c[a]))}),"EX_GeographicBoundingBox BoundingBox Dimension Attribution MinScaleDenominator MaxScaleDenominator".split(" ").forEach(function(a){a in d||(d[a]=c[a])}),d})}),ds=K(Ur,{Title:I(S),OnlineResource:I(tq),LogoURL:I(Rr)}),cs=K(Ur,{westBoundLongitude:I(Km),
eastBoundLongitude:I(Km),southBoundLatitude:I(Km),northBoundLatitude:I(Km)}),Xr=K(Ur,{GetCapabilities:I(Pr),GetMap:I(Pr),GetFeatureInfo:I(Pr)}),Qr=K(Ur,{Format:tl(S),DCPType:tl(function(a,b){return N({},fs,a,b)})}),fs=K(Ur,{HTTP:I(function(a,b){return N({},gs,a,b)})}),gs=K(Ur,{Get:I(Nr),Post:I(Nr)}),es=K(Ur,{Name:I(S),Title:I(S),Abstract:I(S),LegendURL:tl(Rr),StyleSheetURL:I(Nr),StyleURL:I(Nr)}),Or=K(Ur,{Format:I(S),OnlineResource:I(tq)}),Tr=K(Ur,{Keyword:rl(S)});function hs(a){a=a?a:{};this.a="http://mapserver.gis.umn.edu/mapserver";this.b=new an;this.c=a.layers?a.layers:null;Cm.call(this)}v(hs,Cm);
hs.prototype.zc=function(a,b){var c={};b&&tb(c,Fl(this,a,b));c=[c];a.setAttribute("namespaceURI",this.a);var d=a.localName;b=[];if(a.childNodes.length){if("msGMLOutput"==d)for(var e=0,f=a.childNodes.length;e<f;e++){var g=a.childNodes[e];if(g.nodeType===Node.ELEMENT_NODE){var h=c[0],l=g.localName.replace("_layer","");if(!this.c||ja(this.c,l)){l+="_feature";h.featureType=l;h.featureNS=this.a;var m={};m[l]=rl(this.b.wg,this.b);h=K([h.featureNS,null],m);g.setAttribute("namespaceURI",this.a);(g=N([],h,
g,c,this.b))&&la(b,g)}}}"FeatureCollection"==d&&(a=N([],this.b.b,a,[{}],this.b))&&(b=a)}return b};hs.prototype.Vg=function(){};hs.prototype.Xb=function(){};hs.prototype.ie=function(){};function is(){this.i=new vq}v(is,uq);is.prototype.a=function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return this.b(a);return null};is.prototype.b=function(a){var b=a.getAttribute("version").trim(),c=this.i.b(a);if(!c)return null;c.version=b;return(c=N(c,js,a,[]))?c:null};function ks(a){var b=S(a).split(" ");if(b&&2==b.length&&(a=+b[0],b=+b[1],!isNaN(a)&&!isNaN(b)))return[a,b]}
var ls=[null,"http://www.opengis.net/wmts/1.0"],ms=[null,"http://www.opengis.net/ows/1.1"],js=K(ls,{Contents:I(function(a,b){return N({},ns,a,b)})}),ns=K(ls,{Layer:tl(function(a,b){return N({},os,a,b)}),TileMatrixSet:tl(function(a,b){return N({},ps,a,b)})}),os=K(ls,{Style:tl(function(a,b){if(b=N({},qs,a,b))return a="true"===a.getAttribute("isDefault"),b.isDefault=a,b}),Format:tl(S),TileMatrixSetLink:tl(function(a,b){return N({},rs,a,b)}),Dimension:tl(function(a,b){return N({},ss,a,b)}),ResourceURL:tl(function(a){var b=
a.getAttribute("format"),c=a.getAttribute("template");a=a.getAttribute("resourceType");var d={};b&&(d.format=b);c&&(d.template=c);a&&(d.resourceType=a);return d})},K(ms,{Title:I(S),Abstract:I(S),WGS84BoundingBox:I(function(a,b){a=N([],ts,a,b);if(2==a.length)return Na(a)}),Identifier:I(S)})),qs=K(ls,{LegendURL:tl(function(a){var b={};b.format=a.getAttribute("format");b.href=tq(a);return b})},K(ms,{Title:I(S),Identifier:I(S)})),rs=K(ls,{TileMatrixSet:I(S),TileMatrixSetLimits:I(function(a,b){return N([],
us,a,b)})}),us=K(ls,{TileMatrixLimits:rl(function(a,b){return N({},vs,a,b)})}),vs=K(ls,{TileMatrix:I(S),MinTileRow:I(Mm),MaxTileRow:I(Mm),MinTileCol:I(Mm),MaxTileCol:I(Mm)}),ss=K(ls,{Default:I(S),Value:tl(S)},K(ms,{Identifier:I(S)})),ts=K(ms,{LowerCorner:rl(ks),UpperCorner:rl(ks)}),ps=K(ls,{WellKnownScaleSet:I(S),TileMatrix:tl(function(a,b){return N({},ws,a,b)})},K(ms,{SupportedCRS:I(S),Identifier:I(S)})),ws=K(ls,{TopLeftCorner:I(ks),ScaleDenominator:I(Km),TileWidth:I(Mm),TileHeight:I(Mm),MatrixWidth:I(Mm),
MatrixHeight:I(Mm)},K(ms,{Identifier:I(S)}));function xs(a){Tc.call(this);a=a||{};this.a=null;this.f=fc;this.c=void 0;y(this,Vc("projection"),this.Am,this);y(this,Vc("tracking"),this.Bm,this);void 0!==a.projection&&this.Wh(a.projection);void 0!==a.trackingOptions&&this.wj(a.trackingOptions);this.Ke(void 0!==a.tracking?a.tracking:!1)}v(xs,Tc);k=xs.prototype;k.ka=function(){this.Ke(!1);Tc.prototype.ka.call(this)};k.Am=function(){var a=this.Uh();a&&(this.f=Vb(Tb("EPSG:4326"),a),this.a&&this.set("position",this.f(this.a)))};
k.Bm=function(){if(Wd){var a=this.Vh();a&&void 0===this.c?this.c=navigator.geolocation.watchPosition(this.np.bind(this),this.op.bind(this),this.Gh()):a||void 0===this.c||(navigator.geolocation.clearWatch(this.c),this.c=void 0)}};
k.np=function(a){a=a.coords;this.set("accuracy",a.accuracy);this.set("altitude",null===a.altitude?void 0:a.altitude);this.set("altitudeAccuracy",null===a.altitudeAccuracy?void 0:a.altitudeAccuracy);this.set("heading",null===a.heading?void 0:Ha(a.heading));this.a?(this.a[0]=a.longitude,this.a[1]=a.latitude):this.a=[a.longitude,a.latitude];var b=this.f(this.a);this.set("position",b);this.set("speed",null===a.speed?void 0:a.speed);a=Xf(Jb,this.a,a.accuracy);a.Dc(this.f);this.set("accuracyGeometry",a);
this.s()};k.op=function(a){a.type="error";this.Ke(!1);this.b(a)};k.Dk=function(){return this.get("accuracy")};k.Ek=function(){return this.get("accuracyGeometry")||null};k.Gk=function(){return this.get("altitude")};k.Hk=function(){return this.get("altitudeAccuracy")};k.ym=function(){return this.get("heading")};k.zm=function(){return this.get("position")};k.Uh=function(){return this.get("projection")};k.ll=function(){return this.get("speed")};k.Vh=function(){return this.get("tracking")};k.Gh=function(){return this.get("trackingOptions")};
k.Wh=function(a){this.set("projection",Tb(a))};k.Ke=function(a){this.set("tracking",a)};k.wj=function(a){this.set("trackingOptions",a)};function ys(a,b,c){rf.call(this);this.Ng(a,b?b:0,c)}v(ys,rf);k=ys.prototype;k.clone=function(){var a=new ys(null);tf(a,this.ja,this.A.slice());a.s();return a};k.Kb=function(a,b,c,d){var e=this.A;a-=e[0];var f=b-e[1];b=a*a+f*f;if(b<d){if(b)for(d=this.pd()/Math.sqrt(b),c[0]=e[0]+d*a,c[1]=e[1]+d*f,d=2;d<this.a;++d)c[d]=e[d];else for(d=0;d<this.a;++d)c[d]=e[d];c.length=this.a;return b}return d};k.Mc=function(a,b){var c=this.A;a-=c[0];b-=c[1];return a*a+b*b<=zs(this)};
k.wa=function(){return this.A.slice(0,this.a)};k.se=function(a){var b=this.A,c=b[this.a]-b[0];return Xa(b[0]-c,b[1]-c,b[0]+c,b[1]+c,a)};k.pd=function(){return Math.sqrt(zs(this))};function zs(a){var b=a.A[a.a]-a.A[0];a=a.A[a.a+1]-a.A[1];return b*b+a*a}k.U=function(){return"Circle"};k.Xa=function(a){var b=this.G();return qb(a,b)?(b=this.wa(),a[0]<=b[0]&&a[2]>=b[0]||a[1]<=b[1]&&a[3]>=b[1]?!0:db(a,this.sb,this)):!1};
k.ob=function(a){var b=this.a,c=a.slice();c[b]=c[0]+(this.A[b]-this.A[0]);var d;for(d=1;d<b;++d)c[b+d]=a[d];tf(this,this.ja,c);this.s()};k.Ng=function(a,b,c){if(a){uf(this,c,a,0);this.A||(this.A=[]);c=this.A;a=Cf(c,a);c[a++]=c[0]+b;var d;b=1;for(d=this.a;b<d;++b)c[a++]=c[b];c.length=a}else tf(this,"XY",null);this.s()};k.X=function(){};k.ma=function(){};k.Uc=function(a){this.A[this.a]=this.A[0]+a;this.s()};function As(a,b,c){for(var d=[],e=a(0),f=a(1),g=b(e),h=b(f),l=[f,e],m=[h,g],n=[1,0],p={},q=1E5,r,u,x,B,E;0<--q&&0<n.length;)x=n.pop(),e=l.pop(),g=m.pop(),f=x.toString(),f in p||(d.push(g[0],g[1]),p[f]=!0),B=n.pop(),f=l.pop(),h=m.pop(),E=(x+B)/2,r=a(E),u=b(r),Fa(u[0],u[1],g[0],g[1],h[0],h[1])<c?(d.push(h[0],h[1]),f=B.toString(),p[f]=!0):(n.push(B,E,E,x),m.push(h,u,u,g),l.push(f,r,r,e));return d}function Bs(a,b,c,d,e){var f=Tb("EPSG:4326");return As(function(d){return[a,b+(c-b)*d]},ec(f,d),e)}
function Cs(a,b,c,d,e){var f=Tb("EPSG:4326");return As(function(d){return[b+(c-b)*d,a]},ec(f,d),e)};function Ds(a){a=a||{};this.j=this.v=null;this.f=this.o=Infinity;this.g=this.l=-Infinity;this.ra=this.oa=Infinity;this.R=this.I=-Infinity;this.Jb=void 0!==a.targetSize?a.targetSize:100;this.fb=void 0!==a.maxLines?a.maxLines:100;this.i=[];this.c=[];this.pa=void 0!==a.strokeStyle?a.strokeStyle:Es;this.D=this.u=void 0;this.a=this.b=this.S=null;1==a.showLabels&&(this.na=a.lonLabelFormatter?a.lonLabelFormatter:bf.bind(this,"EW"),this.Ua=a.latLabelFormatter?a.latLabelFormatter:bf.bind(this,"NS"),this.fa=
void 0==a.lonLabelPosition?0:a.lonLabelPosition,this.T=void 0==a.latLabelPosition?1:a.latLabelPosition,this.B=void 0!==a.lonLabelStyle?a.lonLabelStyle:new fo({font:"12px Calibri,sans-serif",textBaseline:"bottom",fill:new al({color:"rgba(0,0,0,1)"}),stroke:new wj({color:"rgba(255,255,255,1)",width:3})}),this.C=void 0!==a.latLabelStyle?a.latLabelStyle:new fo({font:"12px Calibri,sans-serif",textAlign:"end",fill:new al({color:"rgba(0,0,0,1)"}),stroke:new wj({color:"rgba(255,255,255,1)",width:3})}),this.b=
[],this.a=[]);this.setMap(void 0!==a.map?a.map:null)}var Es=new wj({color:"rgba(0,0,0,0.2)"}),Fs=[90,45,30,20,10,5,2,1,.5,.2,.1,.05,.01,.005,.002,.001];function Gs(a,b,c,d,e,f,g){var h=g;c=Bs(b,c,d,a.j,e);h=void 0!==a.i[h]?a.i[h]:new O(null);h.ba("XY",c);qb(h.G(),f)&&(a.b&&(c=g,d=h.ga(),f=[d[0],Ca(f[1]+Math.abs(f[1]-f[3])*a.fa,Math.max(f[1],d[1]),Math.min(f[3],d[d.length-1]))],c=a.b[c]?a.b[c].Qd:new C(null),c.ma(f),a.b[g]={Qd:c,text:a.na(b)}),a.i[g++]=h);return g}
function Hs(a,b,c,d,e){var f=e;c=Cs(b,a.g,a.f,a.j,c);f=void 0!==a.c[f]?a.c[f]:new O(null);f.ba("XY",c);if(qb(f.G(),d)){if(a.a){c=e;var g=f.ga();d=[Ca(d[0]+Math.abs(d[0]-d[2])*a.T,Math.max(d[0],g[0]),Math.min(d[2],g[g.length-2])),g[1]];c=a.a[c]?a.a[c].Qd:new C(null);c.ma(d);a.a[e]={Qd:c,text:a.Ua(b)}}a.c[e++]=f}return e}k=Ds.prototype;k.Cm=function(){return this.v};k.al=function(){return this.i};k.hl=function(){return this.c};
k.Kh=function(a){var b=a.vectorContext,c=a.frameState,d=c.extent;a=c.viewState;var e=a.center,f=a.projection,g=a.resolution;a=c.pixelRatio;a=g*g/(4*a*a);if(!this.j||!dc(this.j,f)){var h=Tb("EPSG:4326"),l=f.G(),m=f.g,n=hc(m,h,f),p=m[2],q=m[1],r=m[0],u=n[3],x=n[2],B=n[1],n=n[0];this.o=m[3];this.f=p;this.l=q;this.g=r;this.oa=u;this.ra=x;this.I=B;this.R=n;this.u=ec(h,f);this.D=ec(f,h);this.S=this.D(nb(l));this.j=f}f.i&&(f=f.G(),h=lb(f),c=c.focus[0],c<f[0]||c>f[2])&&(c=h*Math.ceil((f[0]-c)/h),d=[d[0]+
c,d[1],d[2]+c,d[3]]);c=this.S[0];f=this.S[1];h=-1;m=Math.pow(this.Jb*g,2);p=[];q=[];g=0;for(l=Fs.length;g<l;++g){r=Fs[g]/2;p[0]=c-r;p[1]=f-r;q[0]=c+r;q[1]=f+r;this.u(p,p);this.u(q,q);r=Math.pow(q[0]-p[0],2)+Math.pow(q[1]-p[1],2);if(r<=m)break;h=Fs[g]}g=h;if(-1==g)this.i.length=this.c.length=0,this.b&&(this.b.length=0),this.a&&(this.a.length=0);else{c=this.D(e);e=c[0];c=c[1];f=this.fb;h=[Math.max(d[0],this.R),Math.max(d[1],this.I),Math.min(d[2],this.ra),Math.min(d[3],this.oa)];h=hc(h,this.j,"EPSG:4326");
m=h[3];q=h[1];e=Math.floor(e/g)*g;p=Ca(e,this.g,this.f);l=Gs(this,p,q,m,a,d,0);for(h=0;p!=this.g&&h++<f;)p=Math.max(p-g,this.g),l=Gs(this,p,q,m,a,d,l);p=Ca(e,this.g,this.f);for(h=0;p!=this.f&&h++<f;)p=Math.min(p+g,this.f),l=Gs(this,p,q,m,a,d,l);this.i.length=l;this.b&&(this.b.length=l);c=Math.floor(c/g)*g;e=Ca(c,this.l,this.o);l=Hs(this,e,a,d,0);for(h=0;e!=this.l&&h++<f;)e=Math.max(e-g,this.l),l=Hs(this,e,a,d,l);e=Ca(c,this.l,this.o);for(h=0;e!=this.o&&h++<f;)e=Math.min(e+g,this.o),l=Hs(this,e,a,
d,l);this.c.length=l;this.a&&(this.a.length=l)}b.Ma(null,this.pa);a=0;for(e=this.i.length;a<e;++a)g=this.i[a],b.zb(g);a=0;for(e=this.c.length;a<e;++a)g=this.c[a],b.zb(g);if(this.b)for(a=0,e=this.b.length;a<e;++a)g=this.b[a],this.B.xd(g.text),b.Cb(this.B),b.zb(g.Qd);if(this.a)for(a=0,e=this.a.length;a<e;++a)g=this.a[a],this.C.xd(g.text),b.Cb(this.C),b.zb(g.Qd)};
k.setMap=function(a){this.v&&(this.v.K("postcompose",this.Kh,this),this.v.render());a&&(a.J("postcompose",this.Kh,this),a.render());this.v=a};function Is(a,b,c,d,e){Qc.call(this);this.f=e;this.extent=a;this.a=c;this.resolution=b;this.state=d}v(Is,Qc);Is.prototype.s=function(){this.b("change")};Is.prototype.G=function(){return this.extent};Is.prototype.getState=function(){return this.state};function Js(a,b,c,d,e,f,g){Is.call(this,a,b,c,0,d);this.j=e;this.M=new Image;null!==f&&(this.M.crossOrigin=f);this.c={};this.i=null;this.state=0;this.g=g}v(Js,Is);k=Js.prototype;k.Y=function(a){if(void 0!==a){var b;a=w(a);if(a in this.c)return this.c[a];wb(this.c)?b=this.M:b=this.M.cloneNode(!1);return this.c[a]=b}return this.M};k.Fm=function(){this.state=3;this.i.forEach(Ec);this.i=null;this.s()};
k.Gm=function(){void 0===this.resolution&&(this.resolution=mb(this.extent)/this.M.height);this.state=2;this.i.forEach(Ec);this.i=null;this.s()};k.load=function(){if(0==this.state||3==this.state)this.state=1,this.s(),this.i=[Jc(this.M,"error",this.Fm,this),Jc(this.M,"load",this.Gm,this)],this.g(this,this.j)};k.Og=function(a){this.M=a};function Ks(a,b,c,d,e,f){this.c=f?f:null;Is.call(this,a,b,c,f?0:2,d);this.i=e}v(Ks,Is);Ks.prototype.g=function(a){this.state=a?3:2;this.s()};Ks.prototype.load=function(){0==this.state&&(this.state=1,this.s(),this.c(this.g.bind(this)))};Ks.prototype.Y=function(){return this.i};function Ls(a,b){Qc.call(this);this.ta=a;this.state=b;this.i=null;this.key=""}v(Ls,Qc);Ls.prototype.s=function(){this.b("change")};Ls.prototype.bb=function(){return this.key+"/"+this.ta};function Ms(a){if(!a.i)return a;var b=a.i;do{if(2==b.getState())return b;b=b.i}while(b);return a}Ls.prototype.f=function(){return this.ta};Ls.prototype.getState=function(){return this.state};function Ns(a,b){a.state=b;a.s()};function Os(a,b,c,d,e){Ls.call(this,a,b);this.g=c;this.M=new Image;null!==d&&(this.M.crossOrigin=d);this.c=null;this.j=e}v(Os,Ls);k=Os.prototype;k.ka=function(){1==this.state&&Ps(this);this.i&&Nc(this.i);this.state=5;this.s();Ls.prototype.ka.call(this)};k.Y=function(){return this.M};k.bb=function(){return this.g};k.Dm=function(){this.state=3;this.M=Qs;Ps(this);this.s()};k.Em=function(){this.state=this.M.naturalWidth&&this.M.naturalHeight?2:4;Ps(this);this.s()};
k.load=function(){if(0==this.state||3==this.state)this.state=1,this.s(),this.c=[Jc(this.M,"error",this.Dm,this),Jc(this.M,"load",this.Em,this)],this.j(this,this.g)};function Ps(a){a.c.forEach(Ec);a.c=null}var Qs=new Image;Qs.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";function Rs(a){a=a?a:{};ng.call(this,{handleEvent:mf});this.g=a.formatConstructors?a.formatConstructors:[];this.o=a.projection?Tb(a.projection):null;this.a=null;this.target=a.target?a.target:null}v(Rs,ng);function Ss(a){a=a.dataTransfer.files;var b;var c=0;for(b=a.length;c<b;++c){var d=a.item(c);var e=new FileReader;e.addEventListener("load",this.j.bind(this,d));e.readAsText(d)}}function Ts(a){a.stopPropagation();a.preventDefault();a.dataTransfer.dropEffect="copy"}
Rs.prototype.j=function(a,b){b=b.target.result;var c=this.v,d=this.o;d||(d=c.Z().v);var c=this.g,e=[],f;var g=0;for(f=c.length;g<f;++g){var h=new c[g];var l={featureProjection:d};try{e=h.Oa(b,l)}catch(m){e=null}if(e&&0<e.length)break}this.b(new Us(Vs,a,e,d))};function Ws(a){var b=a.v;b&&(b=a.target?a.target:b.a,a.a=[y(b,"drop",Ss,a),y(b,"dragenter",Ts,a),y(b,"dragover",Ts,a),y(b,"drop",Ts,a)])}Rs.prototype.Ha=function(a){ng.prototype.Ha.call(this,a);a?Ws(this):Xs(this)};
Rs.prototype.setMap=function(a){Xs(this);ng.prototype.setMap.call(this,a);this.c()&&Ws(this)};function Xs(a){a.a&&(a.a.forEach(Ec),a.a=null)}var Vs="addfeatures";function Us(a,b,c,d){Oc.call(this,a);this.features=c;this.file=b;this.projection=d}v(Us,Oc);function Ys(a){a=a?a:{};Dg.call(this,{handleDownEvent:Zs,handleDragEvent:$s,handleUpEvent:at});this.l=a.condition?a.condition:yg;this.a=this.g=void 0;this.j=0;this.u=void 0!==a.duration?a.duration:400}v(Ys,Dg);
function $s(a){if(Bg(a)){var b=a.map,c=b.Ob(),d=a.pixel;a=d[0]-c[0]/2;d=c[1]/2-d[1];c=Math.atan2(d,a);a=Math.sqrt(a*a+d*d);b=b.Z();b.g.rotation!==Te&&void 0!==this.g&&(d=c-this.g,og(b,b.Qa()-d));this.g=c;void 0!==this.a&&(c=this.a*(b.Pa()/a),qg(b,c));void 0!==this.a&&(this.j=this.a/a);this.a=a}}
function at(a){if(!Bg(a))return!0;a=a.map.Z();cg(a,1,-1);var b=this.j-1,c=a.Qa(),c=a.constrainRotation(c,0);og(a,c,void 0,void 0);var c=a.Pa(),d=this.u,c=a.constrainResolution(c,0,b);qg(a,c,void 0,d);this.j=0;return!1}function Zs(a){return Bg(a)&&this.l(a)?(cg(a.map.Z(),1,1),this.a=this.g=void 0,!0):!1};function bt(a,b,c,d){this.fb=a;this.Ua=b;this.overlaps=d;this.c=0;this.resolution=c;this.ra=this.oa=null;this.a=[];this.coordinates=[];this.T=Bh();this.b=[];this.B=null;this.fa=Bh();this.na=Bh()}v(bt,Wh);
function ct(a,b,c,d,e,f,g){var h=a.coordinates.length,l=a.Sf();g&&(c+=e);g=[b[c],b[c+1]];var m=[NaN,NaN],n=!0,p;for(p=c+e;p<d;p+=e){m[0]=b[p];m[1]=b[p+1];var q=Wa(l,m);q!==r?(n&&(a.coordinates[h++]=g[0],a.coordinates[h++]=g[1]),a.coordinates[h++]=m[0],a.coordinates[h++]=m[1],n=!1):1===q?(a.coordinates[h++]=m[0],a.coordinates[h++]=m[1],n=!1):n=!0;g[0]=m[0];g[1]=m[1];var r=q}if(f&&n||p===c+e)a.coordinates[h++]=g[0],a.coordinates[h++]=g[1];return h}
function dt(a,b){a.oa=[0,b,0];a.a.push(a.oa);a.ra=[0,b,0];a.b.push(a.ra)}bt.prototype.Va=function(a,b){if(this.R){var c=Gh(this.T,this.R.slice());a.translate(c[0],c[1]);a.rotate(b)}a.fill();this.R&&a.setTransform.apply(a,this.na)};
function et(a,b,c,d,e,f,g,h,l){if(a.B&&pa(d,a.T))var m=a.B;else a.B||(a.B=[]),m=pf(a.coordinates,0,a.coordinates.length,2,d,a.B),Fh(a.T,d);d=!wb(f);for(var n=0,p=g.length,q=0,r,u=a.fa,x=a.na,B,E,A,L,oa=0,ha=0,ga=a.a!=g||a.overlaps?0:200;n<p;){var z=g[n];switch(z[0]){case 0:q=z[1];d&&f[w(q).toString()]||!q.V()?n=z[2]:void 0===l||qb(l,q.V().G())?++n:n=z[2]+1;break;case 1:oa>ga&&(a.Va(b,e),oa=0);ha>ga&&(b.stroke(),ha=0);oa||ha||(b.beginPath(),B=E=NaN);++n;break;case 2:q=z[1];r=m[q];z=m[q+1];A=m[q+2]-
r;q=m[q+3]-z;q=Math.sqrt(A*A+q*q);b.moveTo(r+q,z);b.arc(r,z,q,0,2*Math.PI,!0);++n;break;case 3:b.closePath();++n;break;case 4:q=z[1];r=z[2];var M=z[3];var ba=z[4]*c;var da=z[5]*c;var fb=z[6],ca=z[7],Ub=z[8],uc=z[9];var bc=z[10];A=z[11];L=z[12];var Je=z[13],zg=z[14];for(bc&&(A+=e);q<r;q+=2){z=m[q]-ba;bc=m[q+1]-da;Je&&(z=Math.round(z),bc=Math.round(bc));if(1!=L||A){var ff=z+ba,rh=bc+da;Kh(u,ff,rh,L,L,A,-ff,-rh);b.setTransform.apply(b,u)}ff=b.globalAlpha;1!=ca&&(b.globalAlpha=ff*ca);var rh=zg+Ub>M.width?
M.width-Ub:zg,Bq=fb+uc>M.height?M.height-uc:fb;b.drawImage(M,Ub,uc,rh,Bq,z,bc,rh*c,Bq*c);1!=ca&&(b.globalAlpha=ff);(1!=L||A)&&b.setTransform.apply(b,x)}++n;break;case 5:q=z[1];r=z[2];da=z[3];fb=z[4]*c;ca=z[5]*c;A=z[6];L=z[7]*c;M=z[8];ba=z[9];for((bc=z[10])&&(A+=e);q<r;q+=2){z=m[q]+fb;bc=m[q+1]+ca;if(1!=L||A)Kh(u,z,bc,L,L,A,-z,-bc),b.setTransform.apply(b,u);Ub=da.split("\n");uc=Ub.length;1<uc?(Je=Math.round(1.5*b.measureText("M").width),bc-=(uc-1)/2*Je):Je=0;for(zg=0;zg<uc;zg++)ff=Ub[zg],ba&&b.strokeText(ff,
z,bc),M&&b.fillText(ff,z,bc),bc+=Je;(1!=L||A)&&b.setTransform.apply(b,x)}++n;break;case 6:if(h&&(q=z[1],q=h(q)))return q;++n;break;case 7:ga?oa++:a.Va(b,e);++n;break;case 8:q=z[1];r=z[2];z=m[q];bc=m[q+1];A=z+.5|0;L=bc+.5|0;if(A!==B||L!==E)b.moveTo(z,bc),B=A,E=L;for(q+=2;q<r;q+=2)if(z=m[q],bc=m[q+1],A=z+.5|0,L=bc+.5|0,q==r-2||A!==B||L!==E)b.lineTo(z,bc),B=A,E=L;++n;break;case 9:a.R=z[2];oa&&(a.Va(b,e),oa=0,ha&&(b.stroke(),ha=0));b.fillStyle=z[1];++n;break;case 10:var q=void 0!==z[8]?z[8]:!0,ul=z[9];
r=z[2];ha&&(b.stroke(),ha=0);b.strokeStyle=z[1];b.lineWidth=q?r*c:r;b.lineCap=z[3];b.lineJoin=z[4];b.miterLimit=z[5];Td&&(r=z[6],A=z[7],q&&c!==ul&&(r=r.map(function(a){return a*c/ul}),A*=c/ul,z[6]=r,z[7]=A,z[9]=c),b.lineDashOffset=A,b.setLineDash(r));++n;break;case 11:b.font=z[1];b.textAlign=z[2];b.textBaseline=z[3];++n;break;case 12:ga?ha++:b.stroke();++n;break;default:++n}}oa&&a.Va(b,e);ha&&b.stroke()}bt.prototype.La=function(a,b,c,d,e){et(this,a,b,c,d,e,this.a,void 0,void 0)};
function ft(a){var b=a.b;b.reverse();var c,d=b.length,e=-1;for(c=0;c<d;++c){var f=b[c];var g=f[0];if(6==g)e=c;else if(0==g){f[2]=c;f=a.b;for(g=c;e<g;){var h=f[e];f[e]=f[g];f[g]=h;++e;--g}e=-1}}}function gt(a,b){a.oa[2]=a.a.length;a.oa=null;a.ra[2]=a.b.length;a.ra=null;b=[6,b];a.a.push(b);a.b.push(b)}bt.prototype.Te=ua;bt.prototype.Sf=function(){return this.Ua};function ht(a,b,c,d){bt.call(this,a,b,c,d);this.M=this.I=null;this.C=this.D=this.S=this.u=this.v=this.l=this.o=this.j=this.g=this.f=this.i=void 0}v(ht,bt);
ht.prototype.qc=function(a,b){if(this.M){dt(this,b);var c=a.ga(),d=this.coordinates.length;a=ct(this,c,0,c.length,a.qa(),!1,!1);this.a.push([4,d,a,this.M,this.i,this.f,this.g,this.j,this.o,this.l,this.v,this.u,this.S,this.D,this.C]);this.b.push([4,d,a,this.I,this.i,this.f,this.g,this.j,this.o,this.l,this.v,this.u,this.S,this.D,this.C]);gt(this,b)}};
ht.prototype.oc=function(a,b){if(this.M){dt(this,b);var c=a.ga(),d=this.coordinates.length;a=ct(this,c,0,c.length,a.qa(),!1,!1);this.a.push([4,d,a,this.M,this.i,this.f,this.g,this.j,this.o,this.l,this.v,this.u,this.S,this.D,this.C]);this.b.push([4,d,a,this.I,this.i,this.f,this.g,this.j,this.o,this.l,this.v,this.u,this.S,this.D,this.C]);gt(this,b)}};ht.prototype.Te=function(){ft(this);this.f=this.i=void 0;this.M=this.I=null;this.C=this.D=this.u=this.v=this.l=this.o=this.j=this.S=this.g=void 0};
ht.prototype.Ub=function(a){var b=a.Hc(),c=a.ic(),d=a.qg(1),e=a.Y(1),f=a.Oc();this.i=b[0];this.f=b[1];this.I=d;this.M=e;this.g=c[1];this.j=a.f;this.o=f[0];this.l=f[1];this.v=a.l;this.u=a.g;this.S=a.a;this.D=a.v;this.C=c[0]};function it(a,b,c,d){bt.call(this,a,b,c,d);this.f=null;this.i={Md:void 0,Gd:void 0,Hd:null,Id:void 0,Jd:void 0,Kd:void 0,Ld:void 0,eg:0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineDashOffset:void 0,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}v(it,bt);function jt(a,b,c,d,e){var f=a.coordinates.length;b=ct(a,b,c,d,e,!1,!1);f=[8,f,b];a.a.push(f);a.b.push(f);return d}k=it.prototype;k.Sf=function(){this.f||(this.f=Ra(this.Ua),0<this.c&&Qa(this.f,this.resolution*(this.c+1)/2,this.f));return this.f};
function kt(a){var b=a.i,c=b.strokeStyle,d=b.lineCap,e=b.lineDash,f=b.lineDashOffset,g=b.lineJoin,h=b.lineWidth,l=b.miterLimit;b.Md==c&&b.Gd==d&&pa(b.Hd,e)&&b.Id==f&&b.Jd==g&&b.Kd==h&&b.Ld==l||(b.eg!=a.coordinates.length&&(a.a.push([12]),b.eg=a.coordinates.length),a.a.push([10,c,h,d,g,l,e,f,!0,1],[1]),b.Md=c,b.Gd=d,b.Hd=e,b.Id=f,b.Jd=g,b.Kd=h,b.Ld=l)}
k.mc=function(a,b){var c=this.i,d=c.lineWidth;void 0!==c.strokeStyle&&void 0!==d&&(kt(this),dt(this,b),this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash,c.lineDashOffset,!0,1],[1]),c=a.ga(),jt(this,c,0,c.length,a.qa()),this.b.push([12]),gt(this,b))};
k.nc=function(a,b){var c=this.i,d=c.lineWidth;if(void 0!==c.strokeStyle&&void 0!==d){kt(this);dt(this,b);this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash,c.lineDashOffset,!0,1],[1]);c=a.Bb();d=a.ga();a=a.qa();var e=0,f;var g=0;for(f=c.length;g<f;++g)e=jt(this,d,e,c[g],a);this.b.push([12]);gt(this,b)}};k.Te=function(){this.i.eg!=this.coordinates.length&&this.a.push([12]);ft(this);this.i=null};
k.Ma=function(a,b){a=b.a;this.i.strokeStyle=id(a?a:Uh);a=b.f;this.i.lineCap=void 0!==a?a:"round";a=b.i;this.i.lineDash=a?a:Th;a=b.g;this.i.lineDashOffset=a?a:0;a=b.j;this.i.lineJoin=void 0!==a?a:"round";a=b.c;this.i.lineWidth=void 0!==a?a:1;b=b.o;this.i.miterLimit=void 0!==b?b:10;this.i.lineWidth>this.c&&(this.c=this.i.lineWidth,this.f=null)};function lt(a,b,c,d){bt.call(this,a,b,c,d);this.f=null;this.i={oh:void 0,Md:void 0,Gd:void 0,Hd:null,Id:void 0,Jd:void 0,Kd:void 0,Ld:void 0,fillStyle:void 0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineDashOffset:void 0,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}v(lt,bt);
function mt(a,b,c,d,e){var f=a.i,g=void 0!==f.fillStyle,f=void 0!=f.strokeStyle,h=d.length,l=[1];a.a.push(l);a.b.push(l);for(l=0;l<h;++l){var m=d[l],n=a.coordinates.length;c=ct(a,b,c,m,e,!0,!f);c=[8,n,c];a.a.push(c);a.b.push(c);f&&(c=[3],a.a.push(c),a.b.push(c));c=m}b=[7];a.b.push(b);g&&a.a.push(b);f&&(g=[12],a.a.push(g),a.b.push(g));return c}k=lt.prototype;
k.Zb=function(a,b){var c=this.i,d=c.strokeStyle;if(void 0!==c.fillStyle||void 0!==d){nt(this,a);dt(this,b);this.b.push([9,gd(Sh)]);void 0!==c.strokeStyle&&this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash,c.lineDashOffset,!0,1]);var e=a.ga(),d=this.coordinates.length;ct(this,e,0,e.length,a.qa(),!1,!1);a=[1];d=[2,d];this.a.push(a,d);this.b.push(a,d);a=[7];this.b.push(a);void 0!==c.fillStyle&&this.a.push(a);void 0!==c.strokeStyle&&(c=[12],this.a.push(c),this.b.push(c));
gt(this,b)}};k.rc=function(a,b){var c=this.i;nt(this,a);dt(this,b);this.b.push([9,gd(Sh)]);void 0!==c.strokeStyle&&this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash,c.lineDashOffset,!0,1]);var c=a.Bb(),d=a.ec();mt(this,d,0,c,a.qa());gt(this,b)};
k.pc=function(a,b){var c=this.i,d=c.strokeStyle;if(void 0!==c.fillStyle||void 0!==d){nt(this,a);dt(this,b);this.b.push([9,gd(Sh)]);void 0!==c.strokeStyle&&this.b.push([10,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash,c.lineDashOffset,!0,1]);c=a.c;d=fi(a);a=a.qa();var e=0,f;var g=0;for(f=c.length;g<f;++g)e=mt(this,d,e,c[g],a);gt(this,b)}};
k.Te=function(){ft(this);this.i=null;var a=this.fb;if(a){var b=this.coordinates,c;var d=0;for(c=b.length;d<c;++d)b[d]=a*Math.round(b[d]/a)}};k.Sf=function(){this.f||(this.f=Ra(this.Ua),0<this.c&&Qa(this.f,this.resolution*(this.c+1)/2,this.f));return this.f};
k.Ma=function(a,b){var c=this.i;a?(a=a.b,c.fillStyle=id(a?a:Sh)):c.fillStyle=void 0;b?(a=b.a,c.strokeStyle=id(a?a:Uh),a=b.f,c.lineCap=void 0!==a?a:"round",a=b.i,c.lineDash=a?a.slice():Th,a=b.g,c.lineDashOffset=a?a:0,a=b.j,c.lineJoin=void 0!==a?a:"round",a=b.c,c.lineWidth=void 0!==a?a:1,b=b.o,c.miterLimit=void 0!==b?b:10,c.lineWidth>this.c&&(this.c=c.lineWidth,this.f=null)):(c.strokeStyle=void 0,c.lineCap=void 0,c.lineDash=null,c.lineDashOffset=void 0,c.lineJoin=void 0,c.lineWidth=void 0,c.miterLimit=
void 0)};function nt(a,b){var c=a.i,d=c.fillStyle,e=c.strokeStyle,f=c.lineCap,g=c.lineDash,h=c.lineDashOffset,l=c.lineJoin,m=c.lineWidth,n=c.miterLimit;if(void 0!==d&&("string"!==typeof d||c.oh!=d)){var p=[9,d];"string"!==typeof d&&(b=b.G(),p.push([b[0],b[3]]));a.a.push(p);c.oh=c.fillStyle}void 0===e||c.Md==e&&c.Gd==f&&pa(c.Hd,g)&&c.Id==h&&c.Jd==l&&c.Kd==m&&c.Ld==n||(a.a.push([10,e,m,f,l,n,g,h,!0,1]),c.Md=e,c.Gd=f,c.Hd=g,c.Id=h,c.Jd=l,c.Kd=m,c.Ld=n)};function ot(a,b,c,d){bt.call(this,a,b,c,d);this.C=this.D=this.S=null;this.Ia="";this.o=this.j=0;this.l=void 0;this.u=this.v=0;this.g=this.f=this.i=null}v(ot,bt);
ot.prototype.yc=function(a,b,c,d,e,f){if(""!==this.Ia&&this.g&&(this.i||this.f)){if(this.i){e=this.i;var g=this.S;if(!g||g.fillStyle!=e.fillStyle){var h=[9,e.fillStyle];this.a.push(h);this.b.push(h);g?g.fillStyle=e.fillStyle:this.S={fillStyle:e.fillStyle}}}this.f&&(e=this.f,g=this.D,g&&g.lineCap==e.lineCap&&g.lineDash==e.lineDash&&g.lineDashOffset==e.lineDashOffset&&g.lineJoin==e.lineJoin&&g.lineWidth==e.lineWidth&&g.miterLimit==e.miterLimit&&g.strokeStyle==e.strokeStyle||(h=[10,e.strokeStyle,e.lineWidth,
e.lineCap,e.lineJoin,e.miterLimit,e.lineDash,e.lineDashOffset,!1,1],this.a.push(h),this.b.push(h),g?(g.lineCap=e.lineCap,g.lineDash=e.lineDash,g.lineDashOffset=e.lineDashOffset,g.lineJoin=e.lineJoin,g.lineWidth=e.lineWidth,g.miterLimit=e.miterLimit,g.strokeStyle=e.strokeStyle):this.D={lineCap:e.lineCap,lineDash:e.lineDash,lineDashOffset:e.lineDashOffset,lineJoin:e.lineJoin,lineWidth:e.lineWidth,miterLimit:e.miterLimit,strokeStyle:e.strokeStyle}));e=this.g;g=this.C;g&&g.font==e.font&&g.textAlign==
e.textAlign&&g.textBaseline==e.textBaseline||(h=[11,e.font,e.textAlign,e.textBaseline],this.a.push(h),this.b.push(h),g?(g.font=e.font,g.textAlign=e.textAlign,g.textBaseline=e.textBaseline):this.C={font:e.font,textAlign:e.textAlign,textBaseline:e.textBaseline});dt(this,f);e=this.coordinates.length;a=ct(this,a,b,c,d,!1,!1);a=[5,e,a,this.Ia,this.j,this.o,this.v,this.u,!!this.i,!!this.f,this.l];this.a.push(a);this.b.push(a);gt(this,f)}};
ot.prototype.Cb=function(a){if(a){var b=a.Fa();b?(b=b.b,b=id(b?b:Sh),this.i?this.i.fillStyle=b:this.i={fillStyle:b}):this.i=null;var c=a.Ga();if(c){var b=c.a,d=c.f,e=c.i,f=c.g,g=c.j,h=c.c,c=c.o,d=void 0!==d?d:"round",e=e?e.slice():Th,f=void 0!==f?f:0,g=void 0!==g?g:"round",h=void 0!==h?h:1,c=void 0!==c?c:10,b=id(b?b:Uh);if(this.f){var l=this.f;l.lineCap=d;l.lineDash=e;l.lineDashOffset=f;l.lineJoin=g;l.lineWidth=h;l.miterLimit=c;l.strokeStyle=b}else this.f={lineCap:d,lineDash:e,lineDashOffset:f,lineJoin:g,
lineWidth:h,miterLimit:c,strokeStyle:b}}else this.f=null;var m=a.a,b=a.i,d=a.c,e=a.o,h=a.f,c=a.b,f=a.Na(),g=a.g,l=a.j;a=void 0!==m?m:"10px sans-serif";g=void 0!==g?g:"center";l=void 0!==l?l:"middle";this.g?(m=this.g,m.font=a,m.textAlign=g,m.textBaseline=l):this.g={font:a,textAlign:g,textBaseline:l};this.Ia=void 0!==f?f:"";this.j=void 0!==b?b:0;this.o=void 0!==d?d:0;this.l=void 0!==e?e:!1;this.v=void 0!==h?h:0;this.u=void 0!==c?c:1}else this.Ia=""};function pt(a,b,c,d,e){this.v=a;this.c=b;this.o=d;this.l=c;this.f=e;this.a={};this.g=jd(1,1);this.j=Bh()}v(pt,ki);var qt={0:[[!0]]};function rt(a,b,c){var d,e=Math.floor(a.length/2);if(b>=e)for(d=e;d<b;d++)a[d][c]=!0;else if(b<e)for(d=b+1;d<e;d++)a[d][c]=!0}
function st(a){if(void 0!==qt[a])return qt[a];for(var b=2*a+1,c=Array(b),d=0;d<b;d++)c[d]=Array(b);for(var b=a,e=d=0;b>=d;)rt(c,a+b,a+d),rt(c,a+d,a+b),rt(c,a-d,a+b),rt(c,a-b,a+d),rt(c,a-b,a-d),rt(c,a-d,a-b),rt(c,a+d,a-b),rt(c,a+b,a-d),d++,e+=1+2*d,0<2*(e-b)+1&&(--b,e+=1-2*b);return qt[a]=c}function tt(a){for(var b in a.a){var c=a.a[b],d;for(d in c)c[d].Te()}}
pt.prototype.Ea=function(a,b,c,d,e,f){d=Math.round(d);var g=2*d+1,h=Kh(this.j,d+.5,d+.5,1/b,-1/b,-c,-a[0],-a[1]),l=this.g;l.canvas.width!==g||l.canvas.height!==g?(l.canvas.width=g,l.canvas.height=g):l.clearRect(0,0,g,g);if(void 0!==this.f){var m=Oa();Pa(m,a);Qa(m,b*(this.f+d),m)}var n=st(d);return ut(this,l,h,c,e,function(a){for(var b=l.getImageData(0,0,g,g).data,c=0;c<g;c++)for(var d=0;d<g;d++)if(n[c][d]&&0<b[4*(d*g+c)+3]){if(a=f(a))return a;l.clearRect(0,0,g,g);return}},m)};
function vt(a,b){var c=a.c;a=c[0];var d=c[1],e=c[2],c=c[3];a=[a,d,a,c,e,c,e,d];pf(a,0,8,2,b,a);return a}pt.prototype.b=function(a,b){var c=void 0!==a?a.toString():"0";a=this.a[c];void 0===a&&(a={},this.a[c]=a);c=a[b];void 0===c&&(c=new wt[b](this.v,this.c,this.l,this.o),a[b]=c);return c};pt.prototype.i=function(){return wb(this.a)};
pt.prototype.La=function(a,b,c,d,e,f){var g=Object.keys(this.a).map(Number);g.sort(ia);var h=vt(this,c);a.save();a.beginPath();a.moveTo(h[0],h[1]);a.lineTo(h[2],h[3]);a.lineTo(h[4],h[5]);a.lineTo(h[6],h[7]);a.clip();f=f?f:ji;var l,m,h=0;for(l=g.length;h<l;++h){var n=this.a[g[h].toString()];var p=0;for(m=f.length;p<m;++p){var q=n[f[p]];void 0!==q&&q.La(a,b,c,d,e)}}a.restore()};
function ut(a,b,c,d,e,f,g){var h=Object.keys(a.a).map(Number);h.sort(function(a,b){return b-a});var l,m;var n=0;for(l=h.length;n<l;++n){var p=a.a[h[n].toString()];for(m=ji.length-1;0<=m;--m){var q=p[ji[m]];if(void 0!==q&&(q=et(q,b,1,c,d,e,q.b,f,g)))return q}}}var wt={Circle:lt,Image:ht,LineString:it,Polygon:lt,Text:ot};function xt(a){Sc.call(this);this.a=a}v(xt,Sc);xt.prototype.Ea=ua;xt.prototype.Ue=nf;xt.prototype.Nf=function(a,b,c){return function(d,e){return yt(a,b,d,e,function(a){c[d]||(c[d]={});c[d][a.ta.toString()]=a})}};xt.prototype.na=function(a){2===a.target.getState()&&zt(this)};function At(a,b){var c=b.getState();2!=c&&3!=c&&y(b,"change",a.na,a);0==c&&(b.load(),c=b.getState());return 2==c}function zt(a){var b=a.a;b.Mb()&&"ready"==b.$f()&&a.s()}
function Bt(a,b){b.Ki()&&a.postRenderFunctions.push(function(a,b,e){b=w(a).toString();a.fd(e.viewState.projection,e.usedTiles[b])}.bind(null,b))}function Ct(a,b){if(b){var c;var d=0;for(c=b.length;d<c;++d){var e=b[d];a[w(e).toString()]=e}}}function Dt(a,b){b=b.D;void 0!==b&&("string"===typeof b?a.logos[b]="":b&&(xa("string"==typeof b.href,44),xa("string"==typeof b.src,45),a.logos[b.src]=b.href))}
function Et(a,b,c,d){b=w(b).toString();c=c.toString();b in a?c in a[b]?(a=a[b][c],d.ca<a.ca&&(a.ca=d.ca),d.$>a.$&&(a.$=d.$),d.da<a.da&&(a.da=d.da),d.ia>a.ia&&(a.ia=d.ia)):a[b][c]=d:(a[b]={},a[b][c]=d)}
function Ft(a,b,c,d,e,f,g,h,l,m){var n=w(b).toString();n in a.wantedTiles||(a.wantedTiles[n]={});var p=a.wantedTiles[n];a=a.tileQueue;var q=c.minZoom,r,u,x;for(x=g;x>=q;--x){var B=oc(c,f,x,B);var E=c.Da(x);for(r=B.ca;r<=B.$;++r)for(u=B.da;u<=B.ia;++u)if(g-x<=h){var A=b.Nc(x,r,u,d,e);0==A.getState()&&(p[A.bb()]=!0,A.bb()in a.a||a.f([A,n,tc(c,A.ta),E]));l&&l.call(m,A)}else b.Ug(x,r,u,e)}};function Gt(a){xt.call(this,a);this.fa=Bh()}v(Gt,xt);function Ht(a,b,c){var d=b.pixelRatio,e=b.size[0]*d,f=b.size[1]*d,g=b.viewState.rotation,h=ib(c),l=hb(c),m=gb(c);c=eb(c);Gh(b.coordinateToPixelTransform,h);Gh(b.coordinateToPixelTransform,l);Gh(b.coordinateToPixelTransform,m);Gh(b.coordinateToPixelTransform,c);a.save();Vh(a,-g,e/2,f/2);a.beginPath();a.moveTo(h[0]*d,h[1]*d);a.lineTo(l[0]*d,l[1]*d);a.lineTo(m[0]*d,m[1]*d);a.lineTo(c[0]*d,c[1]*d);a.clip();Vh(a,g,e/2,f/2)}
function It(a,b,c,d,e){var f=a.a;if(Rc(f,b)){var g=d.size[0]*d.pixelRatio,h=d.size[1]*d.pixelRatio,l=d.viewState.rotation;Vh(c,-l,g/2,h/2);a=e?e:Jt(a,d,0);f.b(new Rh(b,new Xh(c,d.pixelRatio,d.extent,a,d.viewState.rotation),d,c,null));Vh(c,l,g/2,h/2)}}Gt.prototype.u=function(a,b,c,d){if(this.Ea(a,b,0,mf,this))return c.call(d,this.a,null)};Gt.prototype.ef=function(a,b,c,d){It(this,"postcompose",a,b,d)};
function Jt(a,b,c){var d=b.viewState,e=b.pixelRatio,f=e/d.resolution;return Kh(a.fa,e*b.size[0]/2,e*b.size[1]/2,f,-f,-d.rotation,-d.center[0]+c,-d.center[1])};function Kt(a,b){return w(a)-w(b)}function Lt(a,b){a=.5*a/b;return a*a}function Mt(a,b,c,d,e,f){var g=!1,h;if(h=c.Y()){var l=h.Ye();2==l||3==l?h.Bj(e,f):(0==l&&h.load(),h.Nh(e,f),g=!0)}if(e=(0,c.Za)(b))d=e.Vd(d),(0,Nt[d.U()])(a,d,c,b);return g}
var Nt={Point:function(a,b,c,d){var e=c.Y();if(e){if(2!=e.Ye())return;var f=a.b(c.Ba(),"Image");f.Ub(e);f.qc(b,d)}if(e=c.Na())a=a.b(c.Ba(),"Text"),a.Cb(e),a.yc(b.ga(),0,2,2,b,d)},LineString:function(a,b,c,d){var e=c.Ga();if(e){var f=a.b(c.Ba(),"LineString");f.Ma(null,e);f.mc(b,d)}if(e=c.Na())a=a.b(c.Ba(),"Text"),a.Cb(e),a.yc(di(b),0,2,2,b,d)},Polygon:function(a,b,c,d){var e=c.Fa(),f=c.Ga();if(e||f){var g=a.b(c.Ba(),"Polygon");g.Ma(e,f);g.rc(b,d)}if(e=c.Na())a=a.b(c.Ba(),"Text"),a.Cb(e),a.yc(Wf(b),
0,2,2,b,d)},MultiPoint:function(a,b,c,d){var e=c.Y();if(e){if(2!=e.Ye())return;var f=a.b(c.Ba(),"Image");f.Ub(e);f.oc(b,d)}if(e=c.Na())a=a.b(c.Ba(),"Text"),a.Cb(e),c=b.ga(),a.yc(c,0,c.length,b.qa(),b,d)},MultiLineString:function(a,b,c,d){var e=c.Ga();if(e){var f=a.b(c.Ba(),"LineString");f.Ma(null,e);f.nc(b,d)}if(e=c.Na())a=a.b(c.Ba(),"Text"),a.Cb(e),c=ei(b),a.yc(c,0,c.length,2,b,d)},MultiPolygon:function(a,b,c,d){var e=c.Fa(),f=c.Ga();if(f||e){var g=a.b(c.Ba(),"Polygon");g.Ma(e,f);g.pc(b,d)}if(e=
c.Na())a=a.b(c.Ba(),"Text"),a.Cb(e),c=gi(b),a.yc(c,0,c.length,2,b,d)},GeometryCollection:function(a,b,c,d){b=b.a;var e;var f=0;for(e=b.length;f<e;++f)(0,Nt[b[f].U()])(a,b[f],c,d)},Circle:function(a,b,c,d){var e=c.Fa(),f=c.Ga();if(e||f){var g=a.b(c.Ba(),"Circle");g.Ma(e,f);g.Zb(b,d)}if(e=c.Na())a=a.b(c.Ba(),"Text"),a.Cb(e),a.yc(b.wa(),0,2,2,b,d)}};function Ot(a){Gt.call(this,a);this.c=!1;this.v=-1;this.l=NaN;this.j=Oa();this.f=this.o=null;this.g=jd()}v(Ot,Gt);
Ot.prototype.S=function(a,b,c){var d=a.extent,e=a.pixelRatio,f=b.Je?a.skippedFeatureUids:{},g=a.viewState,h=g.projection,g=g.rotation,l=h.G(),m=this.a.ha(),n=Jt(this,a,0);It(this,"precompose",c,a,n);var p=b.extent,q=void 0!==p;q&&Ht(c,a,p);if((p=this.f)&&!p.i()){var r=0,u=0;if(Rc(this.a,"render")){var x=c.canvas.width;var B=c.canvas.height;if(g){var E=Math.round(Math.sqrt(x*x+B*B)),r=(E-x)/2,u=(E-B)/2;x=B=E}this.g.canvas.width=x;this.g.canvas.height=B;x=this.g}else x=c;B=x.globalAlpha;x.globalAlpha=
b.opacity;x!=c&&x.translate(r,u);var E=a.size[0]*e,A=a.size[1]*e;Vh(x,-g,E/2,A/2);p.La(x,e,n,g,f);if(m.u&&h.i&&!Va(l,d)){for(var h=d[0],m=lb(l),L=0;h<l[0];)--L,n=m*L,n=Jt(this,a,n),p.La(x,e,n,g,f),h+=m;L=0;for(h=d[2];h>l[2];)++L,n=m*L,n=Jt(this,a,n),p.La(x,e,n,g,f),h-=m;n=Jt(this,a,0)}Vh(x,g,E/2,A/2);x!=c&&(It(this,"render",x,a,n),c.drawImage(x.canvas,-r,-u),x.translate(-r,-u));x.globalAlpha=B}q&&c.restore();this.ef(c,a,b,n)};
Ot.prototype.Ea=function(a,b,c,d,e){if(this.f){var f=this.a,g={};return this.f.Ea(a,b.viewState.resolution,b.viewState.rotation,c,{},function(a){var b=w(a).toString();if(!(b in g))return g[b]=!0,d.call(e,a,f)})}};Ot.prototype.D=function(){zt(this)};
Ot.prototype.sd=function(a){function b(a){var b=a.Lc();if(b)var d=b.call(a,m);else(b=c.f)&&(d=b(a,m));if(d){if(d){b=!1;if(Array.isArray(d))for(var e=0,f=d.length;e<f;++e)b=Mt(q,a,d[e],Lt(m,n),this.D,this)||b;else b=Mt(q,a,d,Lt(m,n),this.D,this)||b;a=b}else a=!1;this.c=this.c||a}}var c=this.a,d=c.ha();Ct(a.attributions,d.j);Dt(a,d);var e=a.viewHints[0],f=a.viewHints[1],g=c.T,h=c.na;if(!this.c&&!g&&e||!h&&f)return!0;var l=a.extent,h=a.viewState,e=h.projection,m=h.resolution,n=a.pixelRatio,f=c.i,p=c.c,
g=c.get(Pt);void 0===g&&(g=Kt);l=Qa(l,p*m);p=h.projection.G();d.u&&h.projection.i&&!Va(p,a.extent)&&(a=Math.max(lb(l)/2,lb(p)),l[0]=p[0]-a,l[2]=p[2]+a);if(!this.c&&this.l==m&&this.v==f&&this.o==g&&Va(this.j,l))return!0;this.f=null;this.c=!1;var q=new pt(.5*m/n,l,m,d.T,c.c);d.Yd(l,m,e);if(g){var r=[];d.$b(l,function(a){r.push(a)},this);r.sort(g);r.forEach(b,this)}else d.$b(l,b,this);tt(q);this.l=m;this.v=f;this.o=g;this.j=l;this.f=q;return!0};function Qt(){this.b="precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}"}v(Qt,mi);var Rt=new Qt;function St(){this.b="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"}v(St,ni);var Tt=new St;
function Ut(a,b){this.i=a.getUniformLocation(b,"f");this.c=a.getUniformLocation(b,"e");this.g=a.getUniformLocation(b,"d");this.f=a.getUniformLocation(b,"g");this.b=a.getAttribLocation(b,"b");this.a=a.getAttribLocation(b,"c")};function Vt(a,b){xt.call(this,b);this.c=a;this.T=new Di([-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,1,1,1]);this.g=this.Ib=null;this.j=void 0;this.v=Bh();this.S=Bh();this.C=ti();this.u=null}v(Vt,xt);
function Wt(a,b,c){var d=a.c.i;if(void 0===a.j||a.j!=c){b.postRenderFunctions.push(function(a,b,c){a.isContextLost()||(a.deleteFramebuffer(b),a.deleteTexture(c))}.bind(null,d,a.g,a.Ib));b=Qi(d,c,c);var e=d.createFramebuffer();d.bindFramebuffer(36160,e);d.framebufferTexture2D(36160,36064,3553,b,0);a.Ib=b;a.g=e;a.j=c}else d.bindFramebuffer(36160,a.g)}
Vt.prototype.Gi=function(a,b,c){Xt(this,"precompose",c,a);wi(c,34962,this.T);var d=c.b,e=Hi(c,Rt,Tt);if(this.u)var f=this.u;else this.u=f=new Ut(d,e);c.Qc(e)&&(d.enableVertexAttribArray(f.b),d.vertexAttribPointer(f.b,2,5126,!1,16,0),d.enableVertexAttribArray(f.a),d.vertexAttribPointer(f.a,2,5126,!1,16,8),d.uniform1i(f.f,0));d.uniformMatrix4fv(f.g,!1,ui(this.C,this.v));d.uniformMatrix4fv(f.c,!1,ui(this.C,this.S));d.uniform1f(f.i,b.opacity);d.bindTexture(3553,this.Ib);d.drawArrays(5,0,4);Xt(this,"postcompose",
c,a)};function Xt(a,b,c,d){a=a.a;if(Rc(a,b)){var e=d.viewState;a.b(new Rh(b,new kk(c,e.center,e.resolution,e.rotation,d.size,d.extent,d.pixelRatio),d,null,c))}}Vt.prototype.mg=function(){this.g=this.Ib=null;this.j=void 0};function Yt(a,b){Vt.call(this,a,b);this.l=!1;this.R=-1;this.I=NaN;this.D=Oa();this.o=this.f=this.B=null}v(Yt,Vt);k=Yt.prototype;k.Gi=function(a,b,c){this.o=b;var d=a.viewState,e=this.f,f=a.size,g=a.pixelRatio,h=this.c.i;e&&!e.i()&&(h.enable(h.SCISSOR_TEST),h.scissor(0,0,f[0]*g,f[1]*g),e.La(c,d.center,d.resolution,d.rotation,f,g,b.opacity,b.Je?a.skippedFeatureUids:{}),h.disable(h.SCISSOR_TEST))};k.ka=function(){var a=this.f;a&&(ek(a,this.c.f)(),this.f=null);Vt.prototype.ka.call(this)};
k.Ea=function(a,b,c,d,e){if(this.f&&this.o){c=b.viewState;var f=this.a,g={};return this.f.Ea(a,this.c.f,c.center,c.resolution,c.rotation,b.size,b.pixelRatio,this.o.opacity,{},function(a){var b=w(a).toString();if(!(b in g))return g[b]=!0,d.call(e,a,f)})}};k.Ue=function(a,b){if(this.f&&this.o){var c=b.viewState;return jk(this.f,a,this.c.f,c.resolution,c.rotation,b.pixelRatio,this.o.opacity,b.skippedFeatureUids)}return!1};
k.lg=function(a,b,c,d){a=Gh(b.pixelToCoordinateTransform,a.slice());if(this.Ue(a,b))return c.call(d,this.a,null)};k.Hi=function(){zt(this)};
k.ng=function(a,b,c){function d(a){var b=a.Lc();if(b)var c=b.call(a,m);else(b=e.f)&&(c=b(a,m));if(c){if(c){b=!1;if(Array.isArray(c))for(var d=c.length-1;0<=d;--d)b=Mt(q,a,c[d],Lt(m,n),this.Hi,this)||b;else b=Mt(q,a,c,Lt(m,n),this.Hi,this)||b;a=b}else a=!1;this.l=this.l||a}}var e=this.a;b=e.ha();Ct(a.attributions,b.j);Dt(a,b);var f=a.viewHints[0],g=a.viewHints[1],h=e.T,l=e.na;if(!this.l&&!h&&f||!l&&g)return!0;var g=a.extent,h=a.viewState,f=h.projection,m=h.resolution,n=a.pixelRatio,h=e.i,p=e.c,l=e.get(Pt);
void 0===l&&(l=Kt);g=Qa(g,p*m);if(!this.l&&this.I==m&&this.R==h&&this.B==l&&Va(this.D,g))return!0;this.f&&a.postRenderFunctions.push(ek(this.f,c));this.l=!1;var q=new dk(.5*m/n,g,e.c);b.Yd(g,m,f);if(l){var r=[];b.$b(g,function(a){r.push(a)},this);r.sort(l);r.forEach(d,this)}else b.$b(g,d,this);fk(q,c);this.I=m;this.R=h;this.B=l;this.D=g;this.f=q;return!0};function T(a){a=a?a:{};var b=tb({},a);delete b.style;delete b.renderBuffer;delete b.updateWhileAnimating;delete b.updateWhileInteracting;wh.call(this,b);this.c=void 0!==a.renderBuffer?a.renderBuffer:100;this.u=null;this.f=void 0;this.g(a.style);this.T=void 0!==a.updateWhileAnimating?a.updateWhileAnimating:!1;this.na=void 0!==a.updateWhileInteracting?a.updateWhileInteracting:!1}v(T,wh);T.prototype.Fd=function(a){var b=null,c=a.U();"canvas"===c?b=new Ot(this):"webgl"===c&&(b=new Yt(a,this));return b};
T.prototype.D=function(){return this.u};T.prototype.C=function(){return this.f};T.prototype.g=function(a){this.u=void 0!==a?a:fl;this.f=null===a?void 0:dl(this.u);this.s()};var Pt="renderOrder";function Zt(){return[[-Infinity,-Infinity,Infinity,Infinity]]};function $t(a){Tc.call(this);this.c=Tb(a.projection);this.j=au(a.attributions);this.D=a.logo;this.na=void 0!==a.state?a.state:"ready";this.u=void 0!==a.wrapX?a.wrapX:!1}v($t,Tc);function au(a){if("string"===typeof a)return[new Ac({html:a})];if(a instanceof Ac)return[a];if(Array.isArray(a)){for(var b=a.length,c=Array(b),d=0;d<b;d++){var e=a[d];c[d]="string"===typeof e?new Ac({html:e}):e}return c}return null}k=$t.prototype;k.Ea=ua;k.ya=function(){return this.j};k.xa=function(){return this.D};k.za=function(){return this.c};
k.getState=function(){return this.na};k.sa=function(){this.s()};k.ua=function(a){this.j=au(a);this.s()};function bu(a,b){a.na=b;a.s()};function U(a){a=a||{};$t.call(this,{attributions:a.attributions,logo:a.logo,projection:void 0,state:"ready",wrapX:void 0!==a.wrapX?a.wrapX:!0});this.B=ua;this.C=a.format;this.T=void 0==a.overlaps?!0:a.overlaps;this.I=a.url;a.loader?this.B=a.loader:void 0!==this.I&&(xa(this.C,7),this.B=Dl(this.I,this.C));this.fa=a.strategy?a.strategy:Zt;var b=void 0!==a.useSpatialIndex?a.useSpatialIndex:!0;this.a=b?new Gj:null;this.R=new Gj;this.g={};this.o={};this.l={};this.v={};this.f=null;if(a.features instanceof
Yc){var c=a.features;var d=c.a}else Array.isArray(a.features)&&(d=a.features);b||c||(c=new Yc(d));d&&cu(this,d);c&&du(this,c)}v(U,$t);k=U.prototype;k.yb=function(a){var b=w(a).toString();if(eu(this,b,a)){fu(this,b,a);var c=a.V();c?(b=c.G(),this.a&&this.a.Ca(b,a)):this.g[b]=a;this.b(new gu("addfeature",a))}this.s()};function fu(a,b,c){a.v[b]=[y(c,"change",a.Oi,a),y(c,"propertychange",a.Oi,a)]}
function eu(a,b,c){var d=!0,e=c.a;void 0!==e?e.toString()in a.o?d=!1:a.o[e.toString()]=c:(xa(!(b in a.l),30),a.l[b]=c);return d}k.cd=function(a){cu(this,a);this.s()};function cu(a,b){var c,d=[],e=[],f=[];var g=0;for(c=b.length;g<c;g++){var h=b[g];var l=w(h).toString();eu(a,l,h)&&e.push(h)}g=0;for(c=e.length;g<c;g++)h=e[g],l=w(h).toString(),fu(a,l,h),(b=h.V())?(l=b.G(),d.push(l),f.push(h)):a.g[l]=h;a.a&&a.a.load(d,f);g=0;for(c=e.length;g<c;g++)a.b(new gu("addfeature",e[g]))}
function du(a,b){var c=!1;y(a,"addfeature",function(a){c||(c=!0,b.push(a.feature),c=!1)});y(a,"removefeature",function(a){c||(c=!0,b.remove(a.feature),c=!1)});y(b,"add",function(a){c||(c=!0,this.yb(a.element),c=!1)},a);y(b,"remove",function(a){c||(c=!0,this.Gb(a.element),c=!1)},a);a.f=b}
k.clear=function(a){if(a){for(var b in this.v)this.v[b].forEach(Ec);this.f||(this.v={},this.o={},this.l={})}else if(this.a){this.a.forEach(this.Ig,this);for(var c in this.g)this.Ig(this.g[c])}this.f&&this.f.clear();this.a&&this.a.clear();this.R.clear();this.g={};this.b(new gu("clear"));this.s()};k.sh=function(a,b){if(this.a)return this.a.forEach(a,b);if(this.f)return this.f.forEach(a,b)};function hu(a,b,c){a.$b([b[0],b[1],b[0],b[1]],function(a){if(a.V().sb(b))return c.call(void 0,a)})}
k.$b=function(a,b,c){if(this.a)return Lj(this.a,a,b,c);if(this.f)return this.f.forEach(b,c)};k.th=function(a,b,c){return this.$b(a,function(d){if(d.V().Xa(a)&&(d=b.call(c,d)))return d})};k.Ah=function(){return this.f};k.Xe=function(){if(this.f)var a=this.f.a;else this.a&&(a=Ij(this.a),wb(this.g)||la(a,vb(this.g)));return a};k.zh=function(a){var b=[];hu(this,a,function(a){b.push(a)});return b};k.Uf=function(a){return Jj(this.a,a)};
k.vh=function(a,b){var c=a[0],d=a[1],e=null,f=[NaN,NaN],g=Infinity,h=[-Infinity,-Infinity,Infinity,Infinity],l=b?b:mf;Lj(this.a,h,function(a){if(l(a)){var b=a.V(),m=g;g=b.Kb(c,d,f,g);g<m&&(e=a,a=Math.sqrt(g),h[0]=c-a,h[1]=d-a,h[2]=c+a,h[3]=d+a)}});return e};k.G=function(a){return this.a.G(a)};k.yh=function(a){a=this.o[a.toString()];return void 0!==a?a:null};k.Mi=function(){return this.C};k.Ni=function(){return this.I};
k.Oi=function(a){a=a.target;var b=w(a).toString(),c=a.V();c?(c=c.G(),b in this.g?(delete this.g[b],this.a&&this.a.Ca(c,a)):this.a&&Hj(this.a,c,a)):b in this.g||(this.a&&this.a.remove(a),this.g[b]=a);c=a.a;void 0!==c?(c=c.toString(),b in this.l?(delete this.l[b],this.o[c]=a):this.o[c]!==a&&(iu(this,a),this.o[c]=a)):b in this.l||(iu(this,a),this.l[b]=a);this.s();this.b(new gu("changefeature",a))};
k.Yd=function(a,b,c){var d=this.R;a=this.fa(a,b);var e;var f=0;for(e=a.length;f<e;++f){var g=a[f];Lj(d,g,function(a){return Va(a.extent,g)})||(this.B.call(this,g,b,c),d.Ca(g,{extent:g.slice()}))}};k.Gb=function(a){var b=w(a).toString();b in this.g?delete this.g[b]:this.a&&this.a.remove(a);this.Ig(a);this.s()};k.Ig=function(a){var b=w(a).toString();this.v[b].forEach(Ec);delete this.v[b];var c=a.a;void 0!==c?delete this.o[c.toString()]:delete this.l[b];this.b(new gu("removefeature",a))};
function iu(a,b){for(var c in a.o)if(a.o[c]===b){delete a.o[c];break}}function gu(a,b){Oc.call(this,a);this.feature=b}v(gu,Oc);function ju(a){Dg.call(this,{handleDownEvent:ku,handleEvent:lu,handleUpEvent:mu});this.T=!1;this.fa=null;this.u=!1;this.Yb=a.source?a.source:null;this.$a=a.features?a.features:null;this.wk=a.snapTolerance?a.snapTolerance:12;this.R=a.type;this.g=nu(this.R);this.Sa=a.minPoints?a.minPoints:this.g===ou?3:2;this.va=a.maxPoints?a.maxPoints:Infinity;this.Cf=a.finishCondition?a.finishCondition:mf;var b=a.geometryFunction;if(!b)if("Circle"===this.R)b=function(a,b){b=b?b:new ys([NaN,NaN]);b.Ng(a[0],Math.sqrt(hf(a[0],
a[1])));return b};else{var c,d=this.g;d===pu?c=C:d===qu?c=O:d===ou&&(c=D);b=function(a,b){b?d===ou?b.ma([a[0].concat([a[0][0]])]):b.ma(a):b=new c(a);return b}}this.Za=b;this.I=this.C=this.a=this.B=this.j=this.l=null;this.ad=a.clickTolerance?a.clickTolerance*a.clickTolerance:36;this.pa=new T({source:new U({useSpatialIndex:!1,wrapX:a.wrapX?a.wrapX:!1}),style:a.style?a.style:ru()});this.xb=a.geometryName;this.vk=a.condition?a.condition:xg;this.Df=a.freehand?mf:a.freehandCondition?a.freehandCondition:
yg;y(this,Vc("active"),this.ri,this)}v(ju,Dg);function ru(){var a=gl();return function(b){return a[b.V().U()]}}k=ju.prototype;k.setMap=function(a){Dg.prototype.setMap.call(this,a);this.ri()};function lu(a){this.u=this.g!==pu&&this.Df(a);var b=!this.u;this.u&&"pointerdrag"===a.type&&null!==this.j?(su(this,a),b=!1):"pointermove"===a.type?b=tu(this,a):"dblclick"===a.type&&(b=!1);return Eg.call(this,a)&&b}
function ku(a){this.T=!this.u;return this.u?(this.fa=a.pixel,this.l||uu(this,a),!0):this.vk(a)?(this.fa=a.pixel,!0):!1}function mu(a){var b=!0;tu(this,a);var c=this.g===vu;this.T?(this.l?this.u||c?this.Pd():wu(this,a)?this.Cf(a)&&this.Pd():su(this,a):(uu(this,a),this.g===pu&&this.Pd()),b=!1):this.u&&(this.l=null,xu(this));return b}
function tu(a,b){if(a.fa&&(!a.u&&a.T||a.u&&!a.T)){var c=a.fa,d=b.pixel,e=c[0]-d[0],c=c[1]-d[1],e=e*e+c*c;a.T=a.u?e>a.ad:e<=a.ad}a.l?(e=b.coordinate,c=a.j.V(),a.g===pu?d=a.a:a.g===ou?(d=a.a[0],d=d[d.length-1],wu(a,b)&&(e=a.l.slice())):(d=a.a,d=d[d.length-1]),d[0]=e[0],d[1]=e[1],a.Za(a.a,c),a.B&&a.B.V().ma(e),c instanceof D&&a.g!==ou?(a.C||(a.C=new H(new O(null))),e=c.Ch(0),b=a.C.V(),b.ba(e.ja,e.ga())):a.I&&(b=a.C.V(),b.ma(a.I)),yu(a)):(b=b.coordinate.slice(),a.B?a.B.V().ma(b):(a.B=new H(new C(b)),
yu(a)));return!0}function wu(a,b){var c=!1;if(a.j){var d=!1,e=[a.l];a.g===qu?d=a.a.length>a.Sa:a.g===ou&&(d=a.a[0].length>a.Sa,e=[a.a[0][0],a.a[0][a.a[0].length-2]]);if(d)for(var d=b.map,f=0,g=e.length;f<g;f++){var h=e[f],l=d.Ja(h),m=b.pixel,c=m[0]-l[0],l=m[1]-l[1];if(c=Math.sqrt(c*c+l*l)<=(a.u?1:a.wk)){a.l=h;break}}}return c}
function uu(a,b){b=b.coordinate;a.l=b;a.g===pu?a.a=b.slice():a.g===ou?(a.a=[[b.slice(),b.slice()]],a.I=a.a[0]):(a.a=[b.slice(),b.slice()],a.g===vu&&(a.I=a.a));a.I&&(a.C=new H(new O(a.I)));b=a.Za(a.a);a.j=new H;a.xb&&a.j.Tc(a.xb);a.j.Ra(b);yu(a);a.b(new zu("drawstart",a.j))}
function su(a,b){b=b.coordinate;var c=a.j.V(),d;if(a.g===qu){a.l=b.slice();var e=a.a;e.length>=a.va&&(a.u?e.pop():d=!0);e.push(b.slice());a.Za(e,c)}else a.g===ou&&(e=a.a[0],e.length>=a.va&&(a.u?e.pop():d=!0),e.push(b.slice()),d&&(a.l=e[0]),a.Za(a.a,c));yu(a);d&&a.Pd()}
k.Op=function(){if(this.j){var a=this.j.V();if(this.g===qu){var b=this.a;b.splice(-2,1);this.Za(b,a);2<=b.length&&(this.l=b[b.length-2].slice())}else if(this.g===ou){b=this.a[0];b.splice(-2,1);var c=this.C.V();c.ma(b);this.Za(this.a,a)}0===b.length&&(this.l=null);yu(this)}};
k.Pd=function(){var a=xu(this),b=this.a,c=a.V();this.g===qu?(b.pop(),this.Za(b,c)):this.g===ou&&(b[0].pop(),this.Za(b,c),b=c.X());"MultiPoint"===this.R?a.Ra(new Q([b])):"MultiLineString"===this.R?a.Ra(new P([b])):"MultiPolygon"===this.R&&a.Ra(new R([b]));this.b(new zu("drawend",a));this.$a&&this.$a.push(a);this.Yb&&this.Yb.yb(a)};function xu(a){a.l=null;var b=a.j;b&&(a.j=null,a.B=null,a.C=null,a.pa.ha().clear(!0));return b}
k.vn=function(a){var b=a.V();this.j=a;this.a=b.X();a=this.a[this.a.length-1];this.l=a.slice();this.a.push(a.slice());yu(this);this.b(new zu("drawstart",this.j))};k.Xc=nf;function yu(a){var b=[];a.j&&b.push(a.j);a.C&&b.push(a.C);a.B&&b.push(a.B);a=a.pa.ha();a.clear(!0);a.cd(b)}k.ri=function(){var a=this.v,b=this.c();a&&b||xu(this);this.pa.setMap(b?a:null)};
function nu(a){var b;"Point"===a||"MultiPoint"===a?b=pu:"LineString"===a||"MultiLineString"===a?b=qu:"Polygon"===a||"MultiPolygon"===a?b=ou:"Circle"===a&&(b=vu);return b}var pu="Point",qu="LineString",ou="Polygon",vu="Circle";function zu(a,b){Oc.call(this,a);this.feature=b}v(zu,Oc);function Au(a){this.a=this.j=null;this.C=!1;this.B=this.l=null;a||(a={});a.extent&&this.g(a.extent);Dg.call(this,{handleDownEvent:Bu,handleDragEvent:Cu,handleEvent:Du,handleUpEvent:Eu});this.u=new T({source:new U({useSpatialIndex:!1,wrapX:!!a.wrapX}),style:a.boxStyle?a.boxStyle:Fu(),updateWhileAnimating:!0,updateWhileInteracting:!0});this.I=new T({source:new U({useSpatialIndex:!1,wrapX:!!a.wrapX}),style:a.pointerStyle?a.pointerStyle:Gu(),updateWhileAnimating:!0,updateWhileInteracting:!0})}v(Au,Dg);
function Du(a){if(!(a instanceof ee))return!0;if("pointermove"==a.type&&!this.D){var b=a.pixel,c=a.map,d=Hu(this,b,c);d||(d=c.Wa(b));Iu(this,d)}Eg.call(this,a);return!1}
function Bu(a){function b(a){var b=null,c=null;a[0]==e[0]?b=e[2]:a[0]==e[2]&&(b=e[0]);a[1]==e[1]?c=e[3]:a[1]==e[3]&&(c=e[1]);return null!==b&&null!==c?[b,c]:null}var c=a.pixel,d=a.map,e=this.G();(a=Hu(this,c,d))&&e?(c=a[0]==e[0]||a[0]==e[2]?a[0]:null,d=a[1]==e[1]||a[1]==e[3]?a[1]:null,null!==c&&null!==d?this.a=Ju(b(a)):null!==c?this.a=Ku(b([c,e[1]]),b([c,e[3]])):null!==d&&(this.a=Ku(b([e[0],d]),b([e[2],d])))):(a=d.Wa(c),this.g([a[0],a[1],a[0],a[1]]),this.a=Ju(a));return!0}
function Cu(a){this.a&&(a=a.coordinate,this.g(this.a(a)),Iu(this,a));return!0}function Eu(){this.a=null;var a=this.G();a&&jb(a)||this.g(null);return!1}function Fu(){var a=gl();return function(){return a.Polygon}}function Gu(){var a=gl();return function(){return a.Point}}function Ju(a){return function(b){return Na([a,b])}}function Ku(a,b){return a[0]==b[0]?function(c){return Na([a,[c[0],b[1]]])}:a[1]==b[1]?function(c){return Na([a,[b[0],c[1]]])}:null}
function Hu(a,b,c){function d(a,b){return kf(e,a)-kf(e,b)}var e=c.Wa(b),f=a.G();if(f){f=[[[f[0],f[1]],[f[0],f[3]]],[[f[0],f[3]],[f[2],f[3]]],[[f[2],f[3]],[f[2],f[1]]],[[f[2],f[1]],[f[0],f[1]]]];f.sort(d);var f=f[0],g=af(e,f),h=c.Ja(g);if(10>=jf(b,h))return b=c.Ja(f[0]),c=c.Ja(f[1]),b=hf(h,b),c=hf(h,c),a.C=10>=Math.sqrt(Math.min(b,c)),a.C&&(g=b>c?f[1]:f[0]),g}return null}function Iu(a,b){var c=a.B;c?c.V().ma(b):(c=new H(new C(b)),a.B=c,a.I.ha().yb(c))}
Au.prototype.setMap=function(a){this.u.setMap(a);this.I.setMap(a);Dg.prototype.setMap.call(this,a)};Au.prototype.G=function(){return this.j};Au.prototype.g=function(a){this.j=a?a:null;var b=this.l;b?a?b.Ra(Yf(a)):b.Ra(void 0):(this.l=b=a?new H(Yf(a)):new H({}),this.u.ha().yb(b));this.b(new Lu(this.j))};function Lu(a){Oc.call(this,Mu);this.b=a}v(Lu,Oc);var Mu="extentchanged";function Nu(a){Dg.call(this,{handleDownEvent:Ou,handleDragEvent:Pu,handleEvent:Qu,handleUpEvent:Ru});this.ad=a.condition?a.condition:Cg;this.$a=function(a){return xg(a)&&wg(a)};this.xb=a.deleteCondition?a.deleteCondition:this.$a;this.Yb=a.insertVertexCondition?a.insertVertexCondition:mf;this.Sa=this.g=null;this.va=[0,0];this.C=this.I=!1;this.a=new Gj;this.fa=void 0!==a.pixelTolerance?a.pixelTolerance:10;this.l=this.pa=!1;this.j=[];this.B=new T({source:new U({useSpatialIndex:!1,wrapX:!!a.wrapX}),style:a.style?
a.style:Su(),updateWhileAnimating:!0,updateWhileInteracting:!0});this.T={Point:this.Dn,LineString:this.ti,LinearRing:this.ti,Polygon:this.En,MultiPoint:this.Bn,MultiLineString:this.An,MultiPolygon:this.Cn,Circle:this.yn,GeometryCollection:this.zn};this.u=a.features;this.u.forEach(this.kg,this);y(this.u,"add",this.wn,this);y(this.u,"remove",this.xn,this);this.R=null}v(Nu,Dg);k=Nu.prototype;
k.kg=function(a){var b=a.V();b&&b.U()in this.T&&this.T[b.U()].call(this,a,b);(b=this.v)&&b.c&&this.c()&&Tu(this,this.va,b);y(a,"change",this.si,this)};function Uu(a,b){a.C||(a.C=!0,a.b(new Vu("modifystart",a.u,b)))}function Wu(a,b){Xu(a,b);a.g&&!a.u.dc()&&(a.B.ha().Gb(a.g),a.g=null);Kc(b,"change",a.si,a)}function Xu(a,b){a=a.a;var c=[];a.forEach(function(a){b===a.feature&&c.push(a)});for(var d=c.length-1;0<=d;--d)a.remove(c[d])}
k.Ha=function(a){this.g&&!a&&(this.B.ha().Gb(this.g),this.g=null);Dg.prototype.Ha.call(this,a)};k.setMap=function(a){this.B.setMap(a);Dg.prototype.setMap.call(this,a)};k.wn=function(a){this.kg(a.element)};k.si=function(a){this.l||(a=a.target,Wu(this,a),this.kg(a))};k.xn=function(a){Wu(this,a.element)};k.Dn=function(a,b){var c=b.X();a={feature:a,geometry:b,la:[c,c]};this.a.Ca(b.G(),a)};
k.Bn=function(a,b){var c=b.X(),d;var e=0;for(d=c.length;e<d;++e){var f=c[e];f={feature:a,geometry:b,depth:[e],index:e,la:[f,f]};this.a.Ca(b.G(),f)}};k.ti=function(a,b){var c=b.X(),d;var e=0;for(d=c.length-1;e<d;++e){var f=c.slice(e,e+2);var g={feature:a,geometry:b,index:e,la:f};this.a.Ca(Na(f),g)}};
k.An=function(a,b){var c=b.X(),d,e;var f=0;for(e=c.length;f<e;++f){var g=c[f];var h=0;for(d=g.length-1;h<d;++h){var l=g.slice(h,h+2);var m={feature:a,geometry:b,depth:[f],index:h,la:l};this.a.Ca(Na(l),m)}}};k.En=function(a,b){var c=b.X(),d,e;var f=0;for(e=c.length;f<e;++f){var g=c[f];var h=0;for(d=g.length-1;h<d;++h){var l=g.slice(h,h+2);var m={feature:a,geometry:b,depth:[f],index:h,la:l};this.a.Ca(Na(l),m)}}};
k.Cn=function(a,b){var c=b.X(),d,e,f;var g=0;for(f=c.length;g<f;++g){var h=c[g];var l=0;for(e=h.length;l<e;++l){var m=h[l];var n=0;for(d=m.length-1;n<d;++n){var p=m.slice(n,n+2);var q={feature:a,geometry:b,depth:[l,g],index:n,la:p};this.a.Ca(Na(p),q)}}}};k.yn=function(a,b){var c=b.wa(),d={feature:a,geometry:b,index:0,la:[c,c]};a={feature:a,geometry:b,index:1,la:[c,c]};d.Pf=a.Pf=[d,a];this.a.Ca(Za(c),d);this.a.Ca(b.G(),a)};
k.zn=function(a,b){var c=b.a;for(b=0;b<c.length;++b)this.T[c[b].U()].call(this,a,c[b])};function Yu(a,b){var c=a.g;c?c.V().ma(b):(c=new H(new C(b)),a.g=c,a.B.ha().yb(c))}function Zu(a,b){return a.index-b.index}
function Ou(a){if(!this.ad(a))return!1;Tu(this,a.pixel,a.map);var b=a.map.Wa(a.pixel);this.j.length=0;this.C=!1;var c=this.g;if(c){var d=[],c=c.V().X(),e=Na([c]),e=Jj(this.a,e),f={};e.sort(Zu);for(var g=0,h=e.length;g<h;++g){var l=e[g],m=l.la,n=w(l.feature),p=l.depth;p&&(n+="-"+p.join("-"));f[n]||(f[n]=Array(2));if("Circle"===l.geometry.U()&&1===l.index)m=$u(b,l),df(m,c)&&!f[n][0]&&(this.j.push([l,0]),f[n][0]=l);else if(df(m[0],c)&&!f[n][0])this.j.push([l,0]),f[n][0]=l;else if(df(m[1],c)&&!f[n][1]){if("LineString"!==
l.geometry.U()&&"MultiLineString"!==l.geometry.U()||!f[n][0]||0!==f[n][0].index)this.j.push([l,1]),f[n][1]=l}else this.Yb(a)&&w(m)in this.Sa&&!f[n][0]&&!f[n][1]&&d.push([l,c])}d.length&&Uu(this,a);for(a=d.length-1;0<=a;--a)this.bm.apply(this,d[a])}return!!this.g}
function Pu(a){this.I=!1;Uu(this,a);a=a.coordinate;for(var b=0,c=this.j.length;b<c;++b){for(var d=this.j[b],e=d[0],f=e.depth,g=e.geometry,h,l=e.la,d=d[1];a.length<g.qa();)a.push(l[d][a.length]);switch(g.U()){case "Point":h=a;l[0]=l[1]=a;break;case "MultiPoint":h=g.X();h[e.index]=a;l[0]=l[1]=a;break;case "LineString":h=g.X();h[e.index+d]=a;l[d]=a;break;case "MultiLineString":h=g.X();h[f[0]][e.index+d]=a;l[d]=a;break;case "Polygon":h=g.X();h[f[0]][e.index+d]=a;l[d]=a;break;case "MultiPolygon":h=g.X();
h[f[1]][f[0]][e.index+d]=a;l[d]=a;break;case "Circle":l[0]=l[1]=a,0===e.index?(this.l=!0,g.ob(a)):(this.l=!0,g.Uc(jf(g.wa(),a))),this.l=!1}h&&(e=g,f=h,this.l=!0,e.ma(f),this.l=!1)}Yu(this,a)}function Ru(a){for(var b,c,d=this.j.length-1;0<=d;--d)if(b=this.j[d][0],c=b.geometry,"Circle"===c.U()){var e=c.wa(),f=b.Pf[0];b=b.Pf[1];f.la[0]=f.la[1]=e;b.la[0]=b.la[1]=e;Hj(this.a,Za(e),f);Hj(this.a,c.G(),b)}else Hj(this.a,Na(b.la),b);this.C&&(this.b(new Vu("modifyend",this.u,a)),this.C=!1);return!1}
function Qu(a){if(!(a instanceof ee))return!0;this.R=a;var b;dg(a.map.Z())[1]||"pointermove"!=a.type||this.D||(this.va=a.pixel,Tu(this,a.pixel,a.map));this.g&&this.xb(a)&&(b="singleclick"==a.type&&this.I?!0:this.hj());"singleclick"==a.type&&(this.I=!1);return Eg.call(this,a)&&!b}
function Tu(a,b,c){function d(a,b){return av(e,a)-av(e,b)}var e=c.Wa(b),f=Qa(Za(e),c.Z().Pa()*a.fa),f=Jj(a.a,f);if(0<f.length){f.sort(d);var g=f[0],h=g.la,l=$u(e,g),m=c.Ja(l),n=jf(b,m);if(n<=a.fa){b={};if("Circle"===g.geometry.U()&&1===g.index)a.pa=!0,Yu(a,l);else for(n=c.Ja(h[0]),g=c.Ja(h[1]),c=hf(m,n),m=hf(m,g),n=Math.sqrt(Math.min(c,m)),a.pa=n<=a.fa,a.pa&&(l=c>m?h[1]:h[0]),Yu(a,l),m=1,c=f.length;m<c;++m)if(l=f[m].la,df(h[0],l[0])&&df(h[1],l[1])||df(h[0],l[1])&&df(h[1],l[0]))b[w(l)]=!0;else break;
b[w(h)]=!0;a.Sa=b;return}}a.g&&(a.B.ha().Gb(a.g),a.g=null)}function av(a,b){var c=b.geometry;return"Circle"===c.U()&&1===b.index?(a=hf(c.wa(),a),c=Math.sqrt(a)-c.pd(),c*c):kf(a,b.la)}function $u(a,b){var c=b.geometry;return"Circle"===c.U()&&1===b.index?c.Ab(a):af(a,b.la)}
k.bm=function(a,b){for(var c=a.la,d=a.feature,e=a.geometry,f=a.depth,g=a.index,h;b.length<e.qa();)b.push(0);switch(e.U()){case "MultiLineString":h=e.X();h[f[0]].splice(g+1,0,b);break;case "Polygon":h=e.X();h[f[0]].splice(g+1,0,b);break;case "MultiPolygon":h=e.X();h[f[1]][f[0]].splice(g+1,0,b);break;case "LineString":h=e.X();h.splice(g+1,0,b);break;default:return}this.l=!0;e.ma(h);this.l=!1;h=this.a;h.remove(a);bv(this,e,g,f,1);a={la:[c[0],b],feature:d,geometry:e,depth:f,index:g};h.Ca(Na(a.la),a);
this.j.push([a,1]);b={la:[b,c[1]],feature:d,geometry:e,depth:f,index:g+1};h.Ca(Na(b.la),b);this.j.push([b,0]);this.I=!0};
k.hj=function(){if(this.R&&"pointerdrag"!=this.R.type){var a=this.R;Uu(this,a);var b=this.j,c={},d,e;for(e=b.length-1;0<=e;--e){var f=b[e];var g=f[0];var h=w(g.feature);g.depth&&(h+="-"+g.depth.join("-"));h in c||(c[h]={});0===f[1]?(c[h].right=g,c[h].index=g.index):1==f[1]&&(c[h].left=g,c[h].index=g.index+1)}for(h in c){var l=c[h].right;var m=c[h].left;e=c[h].index;var n=e-1;g=void 0!==m?m:l;0>n&&(n=0);f=g.geometry;var p=d=f.X();var q=!1;switch(f.U()){case "MultiLineString":2<d[g.depth[0]].length&&
(d[g.depth[0]].splice(e,1),q=!0);break;case "LineString":2<d.length&&(d.splice(e,1),q=!0);break;case "MultiPolygon":p=p[g.depth[1]];case "Polygon":p=p[g.depth[0]],4<p.length&&(e==p.length-1&&(e=0),p.splice(e,1),q=!0,0===e&&(p.pop(),p.push(p[0]),n=p.length-1))}q&&(q=f,this.l=!0,q.ma(d),this.l=!1,d=[],void 0!==m&&(this.a.remove(m),d.push(m.la[0])),void 0!==l&&(this.a.remove(l),d.push(l.la[1])),void 0!==m&&void 0!==l&&(m={depth:g.depth,feature:g.feature,geometry:g.geometry,index:n,la:d},this.a.Ca(Na(m.la),
m)),bv(this,f,e,g.depth,-1),this.g&&(this.B.ha().Gb(this.g),this.g=null),b.length=0)}this.b(new Vu("modifyend",this.u,a));this.C=!1;return!0}return!1};function bv(a,b,c,d,e){Lj(a.a,b.G(),function(a){a.geometry===b&&(void 0===d||void 0===a.depth||pa(a.depth,d))&&a.index>c&&(a.index+=e)})}function Su(){var a=gl();return function(){return a.Point}}function Vu(a,b,c){Oc.call(this,a);this.features=b;this.mapBrowserEvent=c}v(Vu,Oc);function cv(a){ng.call(this,{handleEvent:dv});a=a?a:{};this.C=a.condition?a.condition:wg;this.D=a.addCondition?a.addCondition:nf;this.B=a.removeCondition?a.removeCondition:nf;this.I=a.toggleCondition?a.toggleCondition:yg;this.l=a.multi?a.multi:!1;this.o=a.filter?a.filter:mf;this.j=a.hitTolerance?a.hitTolerance:0;this.g=new T({source:new U({useSpatialIndex:!1,features:a.features,wrapX:a.wrapX}),style:a.style?a.style:ev(),updateWhileAnimating:!0,updateWhileInteracting:!0});if(a.layers)if("function"===
typeof a.layers)a=a.layers;else{var b=a.layers;a=function(a){return ja(b,a)}}else a=mf;this.u=a;this.a={};a=this.g.ha().f;y(a,"add",this.Fn,this);y(a,"remove",this.Jn,this)}v(cv,ng);k=cv.prototype;k.Gn=function(){return this.g.ha().f};k.Hn=function(){return this.j};k.In=function(a){a=w(a);return this.a[a]};
function dv(a){if(!this.C(a))return!0;var b=this.D(a),c=this.B(a),d=this.I(a),e=!b&&!c&&!d,f=a.map,g=this.g.ha().f,h=[],l=[];if(e){ub(this.a);f.we(a.pixel,function(a,b){if(this.o(a,b))return l.push(a),a=w(a),this.a[a]=b,!this.l}.bind(this),{layerFilter:this.u,hitTolerance:this.j});for(e=g.dc()-1;0<=e;--e){var f=g.item(e),m=l.indexOf(f);-1<m?l.splice(m,1):(g.remove(f),h.push(f))}l.length&&g.fg(l)}else{f.we(a.pixel,function(a,e){if(this.o(a,e))return!b&&!d||ja(g.a,a)?(c||d)&&ja(g.a,a)&&(h.push(a),e=
w(a),delete this.a[e]):(l.push(a),a=w(a),this.a[a]=e),!this.l}.bind(this),{layerFilter:this.u,hitTolerance:this.j});for(e=h.length-1;0<=e;--e)g.remove(h[e]);g.fg(l)}(0<l.length||0<h.length)&&this.b(new fv(gv,l,h,a));return vg(a)}k.Kn=function(a){this.j=a};k.setMap=function(a){var b=this.v,c=this.g.ha().f;b&&c.forEach(b.Cj,b);ng.prototype.setMap.call(this,a);this.g.setMap(a);a&&c.forEach(a.xj,a)};
function ev(){var a=gl();la(a.Polygon,a.LineString);la(a.GeometryCollection,a.LineString);return function(b){return b.V()?a[b.V().U()]:null}}k.Fn=function(a){var b=this.v;b&&b.xj(a.element)};k.Jn=function(a){var b=this.v;b&&b.Cj(a.element)};function fv(a,b,c,d){Oc.call(this,a);this.selected=b;this.deselected=c;this.mapBrowserEvent=d}v(fv,Oc);var gv="select";function hv(a){Dg.call(this,{handleEvent:iv,handleDownEvent:mf,handleUpEvent:jv});a=a?a:{};this.l=a.source?a.source:null;this.R=void 0!==a.vertex?a.vertex:!0;this.C=void 0!==a.edge?a.edge:!0;this.j=a.features?a.features:null;this.pa=[];this.B={};this.T={};this.u={};this.I=null;this.g=void 0!==a.pixelTolerance?a.pixelTolerance:10;this.va=kv.bind(this);this.a=new Gj;this.fa={Point:this.Rn,LineString:this.wi,LinearRing:this.wi,Polygon:this.Sn,MultiPoint:this.Pn,MultiLineString:this.On,MultiPolygon:this.Qn,
GeometryCollection:this.Nn,Circle:this.Mn}}v(hv,Dg);k=hv.prototype;k.yb=function(a,b){b=void 0!==b?b:!0;var c=w(a),d=a.V();if(d){var e=this.fa[d.U()];e&&(this.T[c]=d.G(Oa()),e.call(this,a,d))}b&&(this.B[c]=y(a,"change",this.Ln,this))};k.Ak=function(a){this.yb(a)};k.Bk=function(a){this.Gb(a)};k.ui=function(a){if(a instanceof gu)var b=a.feature;else a instanceof bd&&(b=a.element);this.yb(b)};k.vi=function(a){if(a instanceof gu)var b=a.feature;else a instanceof bd&&(b=a.element);this.Gb(b)};
k.Ln=function(a){a=a.target;if(this.D){var b=w(a);b in this.u||(this.u[b]=a)}else this.Dj(a)};k.Gb=function(a,b){b=void 0!==b?b:!0;var c=w(a),d=this.T[c];if(d){var e=this.a,f=[];Lj(e,d,function(b){a===b.feature&&f.push(b)});for(d=f.length-1;0<=d;--d)e.remove(f[d])}b&&(Ec(this.B[c]),delete this.B[c])};
k.setMap=function(a){var b=this.v,c=this.pa,d;this.j?d=this.j:this.l&&(d=this.l.Xe());b&&(c.forEach(Ec),c.length=0,d.forEach(this.Bk,this));Dg.prototype.setMap.call(this,a);a&&(this.j?c.push(y(this.j,"add",this.ui,this),y(this.j,"remove",this.vi,this)):this.l&&c.push(y(this.l,"addfeature",this.ui,this),y(this.l,"removefeature",this.vi,this)),d.forEach(this.Ak,this))};k.Xc=nf;
function lv(a,b,c,d){var e=d.Wa([b[0]-a.g,b[1]+a.g]),f=d.Wa([b[0]+a.g,b[1]-a.g]),e=Na([e,f]),g=Jj(a.a,e);a.R&&!a.C&&(g=g.filter(function(a){return"Circle"!==a.feature.V().U()}));var h=!1,e=!1,l=f=null;if(0<g.length){a.I=c;g.sort(a.va);var m=g[0].la,h="Circle"===g[0].feature.V().U();if(a.R&&!a.C){if(c=d.Ja(m[0]),h=d.Ja(m[1]),c=hf(b,c),b=hf(b,h),h=Math.sqrt(Math.min(c,b)),h=h<=a.g)e=!0,f=c>b?m[1]:m[0],l=d.Ja(f)}else a.C&&(f=h?$e(c,g[0].feature.V()):af(c,m),l=d.Ja(f),jf(b,l)<=a.g&&(e=!0,a.R&&!h&&(c=
d.Ja(m[0]),h=d.Ja(m[1]),c=hf(l,c),b=hf(l,h),h=Math.sqrt(Math.min(c,b)),h=h<=a.g)))&&(f=c>b?m[1]:m[0],l=d.Ja(f));e&&(l=[Math.round(l[0]),Math.round(l[1])])}return{nq:e,vertex:f,wq:l}}k.Dj=function(a){this.Gb(a,!1);this.yb(a,!1)};k.Mn=function(a,b){b=Zf(b).X()[0];var c;var d=0;for(c=b.length-1;d<c;++d){var e=b.slice(d,d+2);var f={feature:a,la:e};this.a.Ca(Na(e),f)}};k.Nn=function(a,b){var c=b.a;for(b=0;b<c.length;++b){var d=this.fa[c[b].U()];d&&d.call(this,a,c[b])}};
k.wi=function(a,b){b=b.X();var c;var d=0;for(c=b.length-1;d<c;++d){var e=b.slice(d,d+2);var f={feature:a,la:e};this.a.Ca(Na(e),f)}};k.On=function(a,b){b=b.X();var c,d;var e=0;for(d=b.length;e<d;++e){var f=b[e];var g=0;for(c=f.length-1;g<c;++g){var h=f.slice(g,g+2);var l={feature:a,la:h};this.a.Ca(Na(h),l)}}};k.Pn=function(a,b){var c=b.X(),d;var e=0;for(d=c.length;e<d;++e){var f=c[e];f={feature:a,la:[f,f]};this.a.Ca(b.G(),f)}};
k.Qn=function(a,b){b=b.X();var c,d,e;var f=0;for(e=b.length;f<e;++f){var g=b[f];var h=0;for(d=g.length;h<d;++h){var l=g[h];var m=0;for(c=l.length-1;m<c;++m){var n=l.slice(m,m+2);var p={feature:a,la:n};this.a.Ca(Na(n),p)}}}};k.Rn=function(a,b){var c=b.X();a={feature:a,la:[c,c]};this.a.Ca(b.G(),a)};k.Sn=function(a,b){b=b.X();var c,d;var e=0;for(d=b.length;e<d;++e){var f=b[e];var g=0;for(c=f.length-1;g<c;++g){var h=f.slice(g,g+2);var l={feature:a,la:h};this.a.Ca(Na(h),l)}}};
function iv(a){var b=lv(this,a.pixel,a.coordinate,a.map);b.nq&&(a.coordinate=b.vertex.slice(0,2),a.pixel=b.wq);return Eg.call(this,a)}function jv(){var a=vb(this.u);a.length&&(a.forEach(this.Dj,this),this.u={});return!1}function kv(a,b){return kf(this.I,a.la)-kf(this.I,b.la)};function mv(a){Dg.call(this,{handleDownEvent:nv,handleDragEvent:ov,handleMoveEvent:pv,handleUpEvent:qv});a=a?a:{};this.a=null;this.j=void 0!==a.features?a.features:null;if(a.layers)if("function"===typeof a.layers)var b=a.layers;else{var c=a.layers;b=function(a){return ja(c,a)}}else b=mf;this.C=b;this.l=a.hitTolerance?a.hitTolerance:0;this.g=null;y(this,Vc("active"),this.u,this)}v(mv,Dg);
function nv(a){this.g=rv(this,a.pixel,a.map);if(!this.a&&this.g){this.a=a.coordinate;pv.call(this,a);var b=this.j||new Yc([this.g]);this.b(new sv("translatestart",b,a.coordinate));return!0}return!1}function qv(a){if(this.a){this.a=null;pv.call(this,a);var b=this.j||new Yc([this.g]);this.b(new sv("translateend",b,a.coordinate));return!0}return!1}
function ov(a){if(this.a){a=a.coordinate;var b=a[0]-this.a[0],c=a[1]-this.a[1],d=this.j||new Yc([this.g]);d.forEach(function(a){var d=a.V();d.translate(b,c);a.Ra(d)});this.a=a;this.b(new sv("translating",d,a))}}function pv(a){var b=a.map.a;rv(this,a.pixel,a.map)?(b.classList.remove(this.a?"ol-grab":"ol-grabbing"),b.classList.add(this.a?"ol-grabbing":"ol-grab")):b.classList.remove("ol-grab","ol-grabbing")}
function rv(a,b,c){return c.we(b,function(a){if(!this.j||ja(this.j.a,a))return a}.bind(a),{layerFilter:a.C,hitTolerance:a.l})}mv.prototype.B=function(){return this.l};mv.prototype.I=function(a){this.l=a};mv.prototype.setMap=function(a){var b=this.v;Dg.prototype.setMap.call(this,a);tv(this,b)};mv.prototype.u=function(){tv(this,null)};function tv(a,b){var c=a.v;a=a.c();c&&a||(c||(c=b),c.a.classList.remove("ol-grab","ol-grabbing"))}
function sv(a,b,c){Oc.call(this,a);this.features=b;this.coordinate=c}v(sv,Oc);function V(a){a=a?a:{};var b=tb({},a);delete b.gradient;delete b.radius;delete b.blur;delete b.shadow;delete b.weight;T.call(this,b);this.j=null;this.R=void 0!==a.shadow?a.shadow:250;this.I=void 0;this.B=null;y(this,Vc(uv),this.Bl,this);this.pj(a.gradient?a.gradient:vv);this.jj(void 0!==a.blur?a.blur:15);this.Uc(void 0!==a.radius?a.radius:8);y(this,Vc(wv),this.cg,this);y(this,Vc(xv),this.cg,this);this.cg();var c=a.weight?a.weight:"weight",d;"string"===typeof c?d=function(a){return a.get(c)}:d=c;this.g(function(a){a=
d(a);a=void 0!==a?Ca(a,0,1):1;var b=255*a|0,c=this.B[b];c||(c=[new bl({image:new eo({opacity:a,src:this.I})})],this.B[b]=c);return c}.bind(this));this.set(Pt,null);y(this,"render",this.Sl,this)}v(V,T);var vv=["#00f","#0ff","#0f0","#ff0","#f00"];k=V.prototype;k.uh=function(){return this.get(wv)};k.Bh=function(){return this.get(uv)};k.yi=function(){return this.get(xv)};
k.Bl=function(){for(var a=this.Bh(),b=jd(1,256),c=b.createLinearGradient(0,0,1,256),d=1/(a.length-1),e=0,f=a.length;e<f;++e)c.addColorStop(e*d,a[e]);b.fillStyle=c;b.fillRect(0,0,1,256);this.j=b.getImageData(0,0,1,256).data};k.cg=function(){var a=this.yi(),b=this.uh(),c=a+b+1,d=2*c,d=jd(d,d);d.shadowOffsetX=d.shadowOffsetY=this.R;d.shadowBlur=b;d.shadowColor="#000";d.beginPath();b=c-this.R;d.arc(b,b,a,0,2*Math.PI,!0);d.fill();this.I=d.canvas.toDataURL();this.B=Array(256);this.s()};
k.Sl=function(a){a=a.context;var b=a.canvas,b=a.getImageData(0,0,b.width,b.height),c=b.data,d,e;var f=0;for(d=c.length;f<d;f+=4)if(e=4*c[f+3])c[f]=this.j[e],c[f+1]=this.j[e+1],c[f+2]=this.j[e+2];a.putImageData(b,0,0)};k.jj=function(a){this.set(wv,a)};k.pj=function(a){this.set(uv,a)};k.Uc=function(a){this.set(xv,a)};var wv="blur",uv="gradient",xv="radius";function yv(a){Gt.call(this,a);this.v=Bh();this.j=null}v(yv,Gt);yv.prototype.S=function(a,b,c){It(this,"precompose",c,a,void 0);var d=this.Y();if(d){var e=b.extent,f=void 0!==e&&!Va(e,a.extent)&&qb(e,a.extent);f&&Ht(c,a,e);var e=this.C(),g=c.globalAlpha;c.globalAlpha=b.opacity;c.drawImage(d,0,0,+d.width,+d.height,Math.round(e[4]),Math.round(e[5]),Math.round(d.width*e[0]),Math.round(d.height*e[3]));c.globalAlpha=g;f&&c.restore()}this.ef(c,a,b)};
yv.prototype.Ea=function(a,b,c,d,e){var f=this.a;return f.ha().Ea(a,b.viewState.resolution,b.viewState.rotation,c,b.skippedFeatureUids,function(a){return d.call(e,a,f)})};
yv.prototype.u=function(a,b,c,d){if(this.Y()){if(this.a.ha().Ea!==ua)return Gt.prototype.u.apply(this,arguments);var e=Gh(this.v,a.slice());gf(e,b.viewState.resolution/this.f);this.j||(this.j=jd(1,1));this.j.clearRect(0,0,1,1);this.j.drawImage(this.Y(),e[0],e[1],1,1,0,0,1,1);e=this.j.getImageData(0,0,1,1).data;if(0<e[3])return c.call(d,this.a,e)}};function zv(a){yv.call(this,a);this.M=null;this.c=Bh()}v(zv,yv);zv.prototype.Y=function(){return this.M?this.M.Y():null};zv.prototype.C=function(){return this.c};
zv.prototype.sd=function(a,b){var c=a.pixelRatio,d=a.size,e=a.viewState,f=e.center,g=e.resolution,h=this.a.ha(),l=a.viewHints,m=a.extent;void 0!==b.extent&&(m=pb(m,b.extent));l[0]||l[1]||kb(m)||(b=h.Y(m,g,c,e.projection))&&At(this,b)&&(this.M=b);if(this.M){b=this.M;var l=b.G(),m=b.resolution,e=b.a,n=c*m/(g*e),l=Kh(this.c,c*d[0]/2,c*d[1]/2,n,n,0,e*(l[0]-f[0])/m,e*(f[1]-l[3])/m);Kh(this.v,c*d[0]/2-l[4],c*d[1]/2-l[5],c/g,-c/g,0,-f[0],-f[1]);Ct(a.attributions,b.f);Dt(a,h);this.f=g*c/e}return!!this.M};function Av(a,b,c,d){var e=gc(c,b,a);c=Sb(b,d,c);b=b.sc();void 0!==b&&(c*=b);b=a.sc();void 0!==b&&(c/=b);a=Sb(a,c,e)/c;isFinite(a)&&0<a&&(c/=a);return c}function Bv(a,b,c,d){a=c-a;b=d-b;var e=Math.sqrt(a*a+b*b);return[Math.round(c+a/e),Math.round(d+b/e)]}
function Cv(a,b,c,d,e,f,g,h,l,m,n){var p=jd(Math.round(c*a),Math.round(c*b));if(!l.length)return p.canvas;p.scale(c,c);var q=Oa();l.forEach(function(a){cb(q,a.extent)});var r=jd(Math.round(c*lb(q)/d),Math.round(c*mb(q)/d)),u=c/d;l.forEach(function(a){r.drawImage(a.image,m,m,a.image.width-2*m,a.image.height-2*m,(a.extent[0]-q[0])*u,-(a.extent[3]-q[3])*u,lb(a.extent)*u,mb(a.extent)*u)});var x=ib(g);h.c.forEach(function(a){var b=a.source,e=a.target,g=b[1][0],h=b[1][1],l=b[2][0],m=b[2][1];a=(e[0][0]-
x[0])/f;var n=-(e[0][1]-x[1])/f,u=(e[1][0]-x[0])/f,B=-(e[1][1]-x[1])/f,da=(e[2][0]-x[0])/f,fb=-(e[2][1]-x[1])/f,e=b[0][0],b=b[0][1],g=g-e,h=h-b,l=l-e,m=m-b;a:{g=[[g,h,0,0,u-a],[l,m,0,0,da-a],[0,0,g,h,B-n],[0,0,l,m,fb-n]];h=g.length;for(l=0;l<h;l++){for(var m=l,ca=Math.abs(g[l][l]),Ub=l+1;Ub<h;Ub++){var uc=Math.abs(g[Ub][l]);uc>ca&&(ca=uc,m=Ub)}if(!ca){g=null;break a}ca=g[m];g[m]=g[l];g[l]=ca;for(m=l+1;m<h;m++)for(ca=-g[m][l]/g[l][l],Ub=l;Ub<h+1;Ub++)g[m][Ub]=l==Ub?0:g[m][Ub]+ca*g[l][Ub]}l=Array(h);
for(m=h-1;0<=m;m--)for(l[m]=g[m][h]/g[m][m],ca=m-1;0<=ca;ca--)g[ca][h]-=g[ca][m]*l[m];g=l}g&&(p.save(),p.beginPath(),l=(a+u+da)/3,m=(n+B+fb)/3,h=Bv(l,m,a,n),u=Bv(l,m,u,B),da=Bv(l,m,da,fb),p.moveTo(u[0],u[1]),p.lineTo(h[0],h[1]),p.lineTo(da[0],da[1]),p.clip(),p.transform(g[0],g[2],g[1],g[3],a,n),p.translate(q[0]-e,q[3]-b),p.scale(d/c,-d/c),p.drawImage(r.canvas,0,0),p.restore())});n&&(p.save(),p.strokeStyle="black",p.lineWidth=1,h.c.forEach(function(a){var b=a.target;a=(b[0][0]-x[0])/f;var c=-(b[0][1]-
x[1])/f,d=(b[1][0]-x[0])/f,e=-(b[1][1]-x[1])/f,g=(b[2][0]-x[0])/f,b=-(b[2][1]-x[1])/f;p.beginPath();p.moveTo(d,e);p.lineTo(a,c);p.lineTo(g,b);p.closePath();p.stroke()}),p.restore());return p.canvas};function Dv(a,b,c,d,e){this.i=a;this.f=b;var f={},g=ec(this.f,this.i);this.a=function(a){var b=a[0]+"/"+a[1];f[b]||(f[b]=g(a));return f[b]};this.g=d;this.v=e*e;this.c=[];this.o=!1;this.l=this.i.i&&!!d&&!!this.i.G()&&lb(d)==lb(this.i.G());this.b=this.i.G()?lb(this.i.G()):null;this.j=this.f.G()?lb(this.f.G()):null;a=ib(c);b=hb(c);d=gb(c);c=eb(c);e=this.a(a);var h=this.a(b),l=this.a(d),m=this.a(c);Ev(this,a,b,d,c,e,h,l,m,10);if(this.o){var n=Infinity;this.c.forEach(function(a){n=Math.min(n,a.source[0][0],
a.source[1][0],a.source[2][0])});this.c.forEach(function(a){if(Math.max(a.source[0][0],a.source[1][0],a.source[2][0])-n>this.b/2){var b=[[a.source[0][0],a.source[0][1]],[a.source[1][0],a.source[1][1]],[a.source[2][0],a.source[2][1]]];b[0][0]-n>this.b/2&&(b[0][0]-=this.b);b[1][0]-n>this.b/2&&(b[1][0]-=this.b);b[2][0]-n>this.b/2&&(b[2][0]-=this.b);Math.max(b[0][0],b[1][0],b[2][0])-Math.min(b[0][0],b[1][0],b[2][0])<this.b/2&&(a.source=b)}},this)}f={}}
function Ev(a,b,c,d,e,f,g,h,l,m){var n=Na([f,g,h,l]),p=a.b?lb(n)/a.b:null,q=a.b,r=a.i.i&&.5<p&&1>p,u=!1;if(0<m){if(a.f.c&&a.j)var x=Na([b,c,d,e]),u=u|.25<lb(x)/a.j;!r&&a.i.c&&p&&(u|=.25<p)}if(u||!a.g||qb(n,a.g)){if(!(u||isFinite(f[0])&&isFinite(f[1])&&isFinite(g[0])&&isFinite(g[1])&&isFinite(h[0])&&isFinite(h[1])&&isFinite(l[0])&&isFinite(l[1])))if(0<m)u=!0;else return;if(0<m&&(u||(n=a.a([(b[0]+d[0])/2,(b[1]+d[1])/2]),q=r?(Ia(f[0],q)+Ia(h[0],q))/2-Ia(n[0],q):(f[0]+h[0])/2-n[0],n=(f[1]+h[1])/2-n[1],
u=q*q+n*n>a.v),u)){Math.abs(b[0]-d[0])<=Math.abs(b[1]-d[1])?(r=[(c[0]+d[0])/2,(c[1]+d[1])/2],q=a.a(r),n=[(e[0]+b[0])/2,(e[1]+b[1])/2],p=a.a(n),Ev(a,b,c,r,n,f,g,q,p,m-1),Ev(a,n,r,d,e,p,q,h,l,m-1)):(r=[(b[0]+c[0])/2,(b[1]+c[1])/2],q=a.a(r),n=[(d[0]+e[0])/2,(d[1]+e[1])/2],p=a.a(n),Ev(a,b,r,n,e,f,q,p,l,m-1),Ev(a,r,c,d,n,q,g,h,p,m-1));return}if(r){if(!a.l)return;a.o=!0}a.c.push({source:[f,h,l],target:[b,d,e]});a.c.push({source:[f,g,h],target:[b,c,d]})}}
function Fv(a){var b=Oa();a.c.forEach(function(a){a=a.source;Pa(b,a[0]);Pa(b,a[1]);Pa(b,a[2])});return b};function Gv(a,b,c,d,e,f){this.v=b;this.l=a.G();var g=b.G(),h=g?pb(c,g):c,g=Av(a,b,nb(h),d);this.j=new Dv(a,b,h,this.l,.5*g);this.c=d;this.i=c;a=Fv(this.j);this.o=(this.Hb=f(a,g,e))?this.Hb.a:1;this.ee=this.g=null;e=2;f=[];this.Hb&&(e=0,f=this.Hb.f);Is.call(this,c,d,this.o,e,f)}v(Gv,Is);Gv.prototype.ka=function(){1==this.state&&(Ec(this.ee),this.ee=null);Is.prototype.ka.call(this)};Gv.prototype.Y=function(){return this.g};
Gv.prototype.de=function(){var a=this.Hb.getState();2==a&&(this.g=Cv(lb(this.i)/this.c,mb(this.i)/this.c,this.o,this.Hb.resolution,0,this.c,this.i,this.j,[{extent:this.Hb.G(),image:this.Hb.Y()}],0));this.state=a;this.s()};Gv.prototype.load=function(){if(0==this.state){this.state=1;this.s();var a=this.Hb.getState();2==a||3==a?this.de():(this.ee=y(this.Hb,"change",function(){var a=this.Hb.getState();if(2==a||3==a)Ec(this.ee),this.ee=null,this.de()},this),this.Hb.load())}};function Hv(a){$t.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection,state:a.state});this.C=void 0!==a.resolutions?a.resolutions:null;this.a=null;this.fa=0}v(Hv,$t);function Iv(a,b){a.C&&(b=a.C[ka(a.C,b,0)]);return b}
Hv.prototype.Y=function(a,b,c,d){var e=this.c;if(e&&d&&!dc(e,d)){if(this.a){if(this.fa==this.i&&dc(this.a.v,d)&&this.a.resolution==b&&this.a.a==c&&bb(this.a.G(),a))return this.a;Nc(this.a);this.a=null}this.a=new Gv(e,d,a,b,c,function(a,b,c){return this.Jc(a,b,c,e)}.bind(this));this.fa=this.i;return this.a}e&&(d=e);return this.Jc(a,b,c,d)};Hv.prototype.o=function(a){a=a.target;switch(a.getState()){case 1:this.b(new Jv(Kv,a));break;case 2:this.b(new Jv(Lv,a));break;case 3:this.b(new Jv(Mv,a))}};
function Nv(a,b){a.Y().src=b}function Jv(a,b){Oc.call(this,a);this.image=b}v(Jv,Oc);var Kv="imageloadstart",Lv="imageloadend",Mv="imageloaderror";function Ov(a){Hv.call(this,{attributions:a.attributions,logo:a.logo,projection:a.projection,resolutions:a.resolutions,state:a.state});this.pa=a.canvasFunction;this.R=null;this.T=0;this.va=void 0!==a.ratio?a.ratio:1.5}v(Ov,Hv);Ov.prototype.Jc=function(a,b,c,d){b=Iv(this,b);var e=this.R;if(e&&this.T==this.i&&e.resolution==b&&e.a==c&&Va(e.G(),a))return e;a=a.slice();rb(a,this.va);(d=this.pa(a,b,c,[lb(a)/b*c,mb(a)/b*c],d))&&(e=new Ks(a,b,c,this.j,d));this.R=e;this.T=this.i;return e};function Pv(a){this.f=a.source;this.$a=Bh();this.g=jd();this.l=[0,0];this.Sa=void 0==a.renderBuffer?100:a.renderBuffer;this.B=null;Ov.call(this,{attributions:a.attributions,canvasFunction:this.tk.bind(this),logo:a.logo,projection:a.projection,ratio:a.ratio,resolutions:a.resolutions,state:this.f.getState()});this.I=null;this.v=void 0;this.Ii(a.style);y(this.f,"change",this.ro,this)}v(Pv,Ov);k=Pv.prototype;
k.tk=function(a,b,c,d,e){var f=new pt(.5*b/c,a,b,this.f.T,this.Sa);this.f.Yd(a,b,e);var g=!1;this.f.$b(a,function(a){var d;if(!(d=g)){var e;(d=a.Lc())?e=d.call(a,b):this.v&&(e=this.v(a,b));if(e){var h,p=!1;Array.isArray(e)||(e=[e]);d=0;for(h=e.length;d<h;++d)p=Mt(f,a,e[d],Lt(b,c),this.qo,this)||p;d=p}else d=!1}g=d},this);tt(f);if(g)return null;this.l[0]!=d[0]||this.l[1]!=d[1]?(this.g.canvas.width=d[0],this.g.canvas.height=d[1],this.l[0]=d[0],this.l[1]=d[1]):this.g.clearRect(0,0,d[0],d[1]);a=Qv(this,
nb(a),b,c,d);f.La(this.g,c,a,0,{});this.B=f;return this.g.canvas};k.Ea=function(a,b,c,d,e,f){if(this.B){var g={};return this.B.Ea(a,b,0,d,e,function(a){var b=w(a).toString();if(!(b in g))return g[b]=!0,f(a)})}};k.no=function(){return this.f};k.oo=function(){return this.I};k.po=function(){return this.v};function Qv(a,b,c,d,e){c=d/c;return Kh(a.$a,e[0]/2,e[1]/2,c,-c,0,-b[0],-b[1])}k.qo=function(){this.s()};k.ro=function(){bu(this,this.f.getState())};
k.Ii=function(a){this.I=void 0!==a?a:fl;this.v=a?dl(this.I):void 0;this.s()};function Rv(a,b){Vt.call(this,a,b);this.o=this.f=this.M=null}v(Rv,Vt);function Sv(a,b){b=b.Y();return Ti(a.c.i,b)}Rv.prototype.Ea=function(a,b,c,d,e){var f=this.a;return f.ha().Ea(a,b.viewState.resolution,b.viewState.rotation,c,b.skippedFeatureUids,function(a){return d.call(e,a,f)})};
Rv.prototype.ng=function(a,b){var c=this.c.i,d=a.pixelRatio,e=a.viewState,f=e.center,g=e.resolution,h=e.rotation,l=this.M,m=this.Ib,n=this.a.ha(),p=a.viewHints,q=a.extent;void 0!==b.extent&&(q=pb(q,b.extent));p[0]||p[1]||kb(q)||(b=n.Y(q,g,d,e.projection))&&At(this,b)&&(l=b,m=Sv(this,b),this.Ib&&a.postRenderFunctions.push(function(a,b){a.isContextLost()||a.deleteTexture(b)}.bind(null,c,this.Ib)));l&&(c=this.c.f.j,Tv(this,c.width,c.height,d,f,g,h,l.G()),this.o=null,d=this.v,Ch(d),Ih(d,1,-1),Jh(d,0,
-1),this.M=l,this.Ib=m,Ct(a.attributions,l.f),Dt(a,n));return!!l};function Tv(a,b,c,d,e,f,g,h){b*=f;c*=f;a=a.S;Ch(a);Ih(a,2*d/b,2*d/c);Hh(a,-g);Jh(a,h[0]-e[0],h[1]-e[1]);Ih(a,(h[2]-h[0])/2,(h[3]-h[1])/2);Jh(a,1,1)}Rv.prototype.Ue=function(a,b){return void 0!==this.Ea(a,b,0,mf,this)};
Rv.prototype.lg=function(a,b,c,d){if(this.M&&this.M.Y())if(this.a.ha()instanceof Pv){var e=Gh(b.pixelToCoordinateTransform,a.slice());if(this.Ea(e,b,0,mf,this))return c.call(d,this.a,null)}else{e=[this.M.Y().width,this.M.Y().height];if(!this.o){var f=b.size;b=Bh();Jh(b,-1,-1);Ih(b,2/f[0],2/f[1]);Jh(b,0,f[1]);Ih(b,1,-1);var f=Lh(this.S.slice()),g=Bh();Jh(g,0,e[1]);Ih(g,1,-1);Ih(g,e[0]/2,e[1]/2);Jh(g,1,1);Eh(g,f);Eh(g,b);this.o=g}a=Gh(this.o,a.slice());if(!(0>a[0]||a[0]>e[0]||0>a[1]||a[1]>e[1])&&(this.f||
(this.f=jd(1,1)),this.f.clearRect(0,0,1,1),this.f.drawImage(this.M.Y(),a[0],a[1],1,1,0,0,1,1),e=this.f.getImageData(0,0,1,1).data,0<e[3]))return c.call(d,this.a,e)}};function Uv(a){wh.call(this,a?a:{})}v(Uv,wh);Uv.prototype.Fd=function(a){var b=null,c=a.U();"canvas"===c?b=new zv(this):"webgl"===c&&(b=new Rv(a,this));return b};function Vv(a){yv.call(this,a);this.c=null===this.c?null:jd();this.o=null;this.g=[];this.l=Oa();this.va=new ya(0,0,0,0);this.B=Bh();this.T=0}v(Vv,yv);function Wv(a,b){b=b.getState();a=a.a.kd();return 2==b||4==b||3==b&&!a}
Vv.prototype.sd=function(a,b){var c=a.pixelRatio,d=a.size,e=a.viewState,f=e.projection,g=e.resolution,e=e.center,h=this.a,l=h.ha(),m=l.i,n=l.Ta(f),p=n.tc(g,this.T),q=n.Da(p),r=Math.round(g/q)||1,u=a.extent;void 0!==b.extent&&(u=pb(u,b.extent));if(kb(u))return!1;var x=rc(n,u,q);var B=n.Pc(p);var E=n.Da(p),A=Ma(n.gb(p),n.j);B=Xa(B[0]+x.ca*A[0]*E,B[1]+x.da*A[1]*E,B[0]+(x.$+1)*A[0]*E,B[1]+(x.ia+1)*A[1]*E,void 0);E=l.nb(c);A={};A[p]={};var L=this.Nf(l,f,A),oa=this.l,ha=this.va,ga=!1,z,M;for(z=x.ca;z<=
x.$;++z)for(M=x.da;M<=x.ia;++M){var ba=l.Nc(p,z,M,c,f);3!=ba.getState()||this.a.kd()||Ns(ba,2);Wv(this,ba)||(ba=Ms(ba));Wv(this,ba)?2==ba.getState()&&(A[p][ba.ta.toString()]=ba,ga||-1!=this.g.indexOf(ba)||(ga=!0)):pc(n,ba.ta,L,ha,oa)||(ba=qc(n,ba.ta,ha,oa))&&L(p+1,ba)}z=a.viewHints;z=z[0]||z[1];if(!(this.f&&16<Date.now()-a.time&&z||!ga&&this.o&&Va(this.o,u)&&this.mf==m&&r==this.R&&(z||q*c/E*r==this.f))){if(z=this.c)M=l.Xd(p,c,f),ba=Math.round((x.$-x.ca+1)*M[0]/r),M=Math.round((x.ia-x.da+1)*M[1]/r),
ga=z.canvas,ga.width!=ba||ga.height!=M?(this.R=r,ga.width=ba,ga.height=M):(z.clearRect(0,0,ba,M),r=this.R);this.g.length=0;ga=Object.keys(A).map(Number);ga.sort(ia);var da,ha=0;for(da=ga.length;ha<da;++ha){z=ga[ha];L=l.Xd(z,c,f);ba=n.Da(z);var fb=ba/q;var ca=E*l.Wf(f);var Ub=A[z];for(var uc in Ub){ba=Ub[uc];M=n.Aa(ba.ta,oa);z=(M[0]-B[0])/q*E/r;M=(B[3]-M[3])/q*E/r;var bc=L[0]*fb/r;var Je=L[1]*fb/r;this.Of(ba,a,b,z,M,bc,Je,ca);this.g.push(ba)}}this.mf=m;this.f=q*c/E*r;this.o=B}b=this.f/g;b=Kh(this.B,
c*d[0]/2,c*d[1]/2,b,b,0,(this.o[0]-e[0])/this.f*c,(e[1]-this.o[3])/this.f*c);Kh(this.v,c*d[0]/2-b[4],c*d[1]/2-b[5],c/g,-c/g,0,-e[0],-e[1]);Et(a.usedTiles,l,p,x);Ft(a,l,n,c,f,u,p,h.Ud());Bt(a,l);Dt(a,l);return 0<this.g.length};Vv.prototype.Of=function(a,b,c,d,e,f,g,h){this.a.ha().Zf(b.viewState.projection)||this.c.clearRect(d,e,f,g);(a=a.Y())&&this.c.drawImage(a,h,h,a.width-2*h,a.height-2*h,d,e,f,g)};Vv.prototype.Y=function(){var a=this.c;return a?a.canvas:null};Vv.prototype.C=function(){return this.B};function Xv(){this.b="precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}"}v(Xv,mi);var Yv=new Xv;function Zv(){this.b="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}"}v(Zv,ni);var $v=new Zv;function aw(a,b){this.i=a.getUniformLocation(b,"e");this.c=a.getUniformLocation(b,"d");this.b=a.getAttribLocation(b,"b");this.a=a.getAttribLocation(b,"c")};function bw(a,b){Vt.call(this,a,b);this.I=Yv;this.fa=$v;this.f=null;this.B=new Di([0,0,0,1,1,0,1,1,0,1,0,0,1,1,1,0]);this.D=this.o=null;this.l=-1;this.R=[0,0]}v(bw,Vt);k=bw.prototype;k.ka=function(){Gi(this.c.f,this.B);Vt.prototype.ka.call(this)};k.Nf=function(a,b,c){var d=this.c;return function(e,f){return yt(a,b,e,f,function(a){var b=d.a.b.hasOwnProperty(a.bb());b&&(c[e]||(c[e]={}),c[e][a.ta.toString()]=a);return b})}};k.mg=function(){Vt.prototype.mg.call(this);this.f=null};
k.ng=function(a,b,c){var d=this.c,e=c.b,f=a.viewState,g=f.projection,h=this.a,l=h.ha(),m=l.Ta(g),n=m.tc(f.resolution),p=m.Da(n),q=l.Xd(n,a.pixelRatio,g),r=q[0]/Ma(m.gb(n),this.R)[0],u=p/r,x=l.nb(r)*l.Wf(g),B=f.center,E=a.extent,A=rc(m,E,p);if(this.o&&Aa(this.o,A)&&this.l==l.i)u=this.D;else{var L=[A.$-A.ca+1,A.ia-A.da+1],oa=Ea(Math.max(L[0]*q[0],L[1]*q[1])),L=u*oa,ha=m.Pc(n),ga=ha[0]+A.ca*q[0]*u,u=ha[1]+A.da*q[1]*u,u=[ga,u,ga+L,u+L];Wt(this,a,oa);e.viewport(0,0,oa,oa);e.clearColor(0,0,0,0);e.clear(16384);
e.disable(3042);oa=Hi(c,this.I,this.fa);c.Qc(oa);this.f||(this.f=new aw(e,oa));wi(c,34962,this.B);e.enableVertexAttribArray(this.f.b);e.vertexAttribPointer(this.f.b,2,5126,!1,16,0);e.enableVertexAttribArray(this.f.a);e.vertexAttribPointer(this.f.a,2,5126,!1,16,8);e.uniform1i(this.f.i,0);c={};c[n]={};var z=this.Nf(l,g,c),M=h.kd(),oa=!0,ga=Oa(),ba=new ya(0,0,0,0),da,fb;for(da=A.ca;da<=A.$;++da)for(fb=A.da;fb<=A.ia;++fb){ha=l.Nc(n,da,fb,r,g);if(void 0!==b.extent){var ca=m.Aa(ha.ta,ga);if(!qb(ca,b.extent))continue}ca=
ha.getState();(ca=2==ca||4==ca||3==ca&&!M)||(ha=Ms(ha));ca=ha.getState();if(2==ca){if(d.a.b.hasOwnProperty(ha.bb())){c[n][ha.ta.toString()]=ha;continue}}else if(4==ca||3==ca&&!M)continue;oa=!1;ca=pc(m,ha.ta,z,ba,ga);ca||(ha=qc(m,ha.ta,ba,ga))&&z(n+1,ha)}b=Object.keys(c).map(Number);b.sort(ia);for(var z=new Float32Array(4),Ub,M=0,ba=b.length;M<ba;++M)for(Ub in da=c[b[M]],da)ha=da[Ub],ca=m.Aa(ha.ta,ga),z[0]=2*(ca[2]-ca[0])/L,z[1]=2*(ca[3]-ca[1])/L,z[2]=2*(ca[0]-u[0])/L-1,z[3]=2*(ca[1]-u[1])/L-1,e.uniform4fv(this.f.c,
z),nk(d,ha,q,x*r),e.drawArrays(5,0,4);oa?(this.o=A,this.D=u,this.l=l.i):(this.D=this.o=null,this.l=-1,a.animate=!0)}Et(a.usedTiles,l,n,A);var uc=d.j;Ft(a,l,m,r,g,E,n,h.Ud(),function(a){2!=a.getState()||d.a.b.hasOwnProperty(a.bb())||a.bb()in uc.a||uc.f([a,tc(m,a.ta),m.Da(a.ta[0]),q,x*r])},this);Bt(a,l);Dt(a,l);e=this.v;Ch(e);Jh(e,(Math.round(B[0]/p)*p-u[0])/(u[2]-u[0]),(Math.round(B[1]/p)*p-u[1])/(u[3]-u[1]));f.rotation&&Hh(e,f.rotation);Ih(e,a.size[0]*f.resolution/(u[2]-u[0]),a.size[1]*f.resolution/
(u[3]-u[1]));Jh(e,-.5,-.5);return!0};k.lg=function(a,b,c,d){if(this.g){a=Gh(this.v,[a[0]/b.size[0],(b.size[1]-a[1])/b.size[1]].slice());a=[a[0]*this.j,a[1]*this.j];b=this.c.f.b;b.bindFramebuffer(b.FRAMEBUFFER,this.g);var e=new Uint8Array(4);b.readPixels(a[0],a[1],1,1,b.RGBA,b.UNSIGNED_BYTE,e);if(0<e[3])return c.call(d,this.a,e)}};function cw(a){a=a?a:{};var b=tb({},a);delete b.preload;delete b.useInterimTilesOnError;wh.call(this,b);this.zi(void 0!==a.preload?a.preload:0);this.Ai(void 0!==a.useInterimTilesOnError?a.useInterimTilesOnError:!0)}v(cw,wh);k=cw.prototype;k.Fd=function(a){var b=null,c=a.U();"canvas"===c?b=new Vv(this):"webgl"===c&&(b=new bw(a,this));return b};k.Ud=function(){return this.get("preload")};k.zi=function(a){this.set("preload",a)};k.kd=function(){return this.get("useInterimTilesOnError")};
k.Ai=function(a){this.set("useInterimTilesOnError",a)};function dw(a){this.c=null;Vv.call(this,a);this.I=!1;this.D=Bh();this.T="vector"==a.j?1:0}v(dw,Vv);var ew={image:ji,hybrid:["Polygon","LineString"]},fw={hybrid:["Image","Text"],vector:ji};k=dw.prototype;k.sd=function(a,b){var c=this.a,d=c.i;this.pa!=d&&(this.g.length=0,c=c.j,this.c||"vector"==c||(this.c=jd()),this.c&&"vector"==c&&(this.c=null));this.pa=d;return Vv.prototype.sd.apply(this,arguments)};
k.Of=function(a,b,c,d,e,f,g,h){var l=a,m=this.a,n=b.pixelRatio,p=b.viewState.projection,q=m.i,r=m.get(Pt)||null,u=l.o;if(u.Nd||u.mf!=q||u.Kg!=r){for(var x=0,B=l.a.length;x<B;++x){var E=l.c[l.a[x]];E.S=null;u.Nd=!1;var A=m.ha(),L=A.tileGrid,oa=E.ta,ha=E.a,ga=A.Ta(p),z=ga.Da(l.ta[0]),M=L.Da(E.ta[0]),ga=ga.Aa(l.v),oa=L.Aa(oa),ga=pb(ga,oa);if("tile-pixels"==ha.a)var ba=L=A.nb(),M=Kh(this.D,0,0,1/M*ba,-1/M*ba,0,-oa[0],-oa[3]),M=Gh(M,[ga[0],ga[3]]).concat(Gh(M,[ga[2],ga[1]]));else if(L=z,M=ga,!dc(p,ha)){var da=
!0;E.ig(p)}u.Nd=!1;A=new pt(0,M,L,A.l,m.c);M=Lt(L,n);L=E.g;r&&r!==u.Kg&&L.sort(r);oa=0;for(ga=L.length;oa<ga;++oa){ba=L[oa];da&&ba.V().tb(ha,p);var fb=void 0,ca=ba.Lc();ca?fb=ca.call(ba,z):(ca=m.f)&&(fb=ca(ba,z));if(fb){Array.isArray(fb)||(fb=[fb]);var ca=M,Ub=A;if(fb){var uc=!1;if(Array.isArray(fb))for(var bc=0,Je=fb.length;bc<Je;++bc)uc=Mt(Ub,ba,fb[bc],ca,this.Fi,this)||uc;else uc=Mt(Ub,ba,fb,ca,this.Fi,this)||uc;ba=uc}else ba=!1;this.I=this.I||ba;u.Nd=u.Nd||ba}}tt(A);E.c[l.ta.toString()]=A}u.mf=
q;u.Kg=r}if(this.c){x=b;p=this.a;n=l.o;q=p.i;if((m=ew[p.j])&&n.Lg!==q)for(n.Lg=q,B=l.v,E=B[0],n=x.pixelRatio,z=p.ha(),p=z.tileGrid,ha=z.Ta(x.viewState.projection),q=ha.Da(E),r=z.nb(),l.j||(l.j=jd()),u=l.j,x=z.Xd(E,n,x.viewState.projection),u.canvas.width=x[0],u.canvas.height=x[1],x=ha.Aa(B),B=0,E=l.a.length;B<E;++B)ha=l.c[l.a[B]],A=ha.ta,da=n/q,z=Ch(this.D),"tile-pixels"==ha.a.a?(da=p.Aa(A,this.l),A=p.Da(A[0]),M=n/r*A/q,Ih(z,M,M),Jh(z,Math.round((da[0]-x[0])/A*r),Math.round((x[3]-da[3])/A*r))):(Ih(z,
da,-da),Jh(z,-x[0],-x[3])),ha.c[l.ta.toString()].La(u,n,z,0,{},m);Vv.prototype.Of.apply(this,arguments)}};
k.Ea=function(a,b,c,d,e){var f=b.viewState.resolution,g=b.viewState.rotation;c=void 0==c?0:c;var h=this.a,l={},m=this.g,n=h.ha();b=n.Ta(b.viewState.projection);var p=n.tileGrid,q;var r=0;for(q=m.length;r<q;++r){var u=m[r];var x=u.ta;x=b.Aa(x,this.l);var B=Qa(x,c*f,B);if(Ta(B,a)){x=0;for(var E=u.a.length;x<E;++x){var A=u.c[u.a[x]];if("tile-pixels"===A.a.a){var L=A.ta;f=p.Aa(L,this.l);var oa=ib(f);f=n.nb();L=p.Da(L[0])/f;oa=[(a[0]-oa[0])/L,(oa[1]-a[1])/L]}else oa=a;A=A.c[u.ta];var ha=ha||A.Ea(oa,f,
g,c,{},function(a){var b=w(a).toString();if(!(b in l))return l[b]=!0,d.call(e,a,h)})}}}return ha};k.Fi=function(){zt(this)};
k.ef=function(a,b,c){var d=this.a,e=d.ha(),f=fw[d.j];if(f)for(var g=b.pixelRatio,h=b.viewState.rotation,l=b.size,m=Math.round(g*l[0]/2),l=Math.round(g*l[1]/2),n=this.g,d=d.ha().nb(),p=e.tileGrid,e=e.Ta(b.viewState.projection),q=[],r=[],u=n.length-1;0<=u;--u){var x=n[u];if(5!=x.getState())for(var B=x.ta,E=e.Aa(B)[0]-e.Aa(x.v)[0],A=0,L=x.a.length;A<L;++A){var oa=x.c[x.a[A]],ha=oa.ta[0],ga=p.Da(ha);var z=oa;var M=b;if("tile-pixels"==z.a.a){var ba=this.a.ha(),da=ba.tileGrid,fb=z.ta,ba=da.Da(fb[0])/ba.nb(),
z=M.viewState,ca=M.pixelRatio,Ub=z.resolution/ca,fb=da.Aa(fb,this.l),da=z.center,fb=ib(fb);M=M.size;M=Kh(this.D,Math.round(ca*M[0]/2),Math.round(ca*M[1]/2),ba/Ub,ba/Ub,z.rotation,(fb[0]-da[0])/ba,(da[1]-fb[1])/ba)}else M=Jt(this,M,0);Jh(M,E*d/ga,0);oa=oa.c[B.toString()];ga=vt(oa,M);a.save();a.globalAlpha=c.opacity;Vh(a,-h,m,l);ba=0;for(z=q.length;ba<z;++ba)ca=q[ba],ha<r[ba]&&(a.beginPath(),a.moveTo(ga[0],ga[1]),a.lineTo(ga[2],ga[3]),a.lineTo(ga[4],ga[5]),a.lineTo(ga[6],ga[7]),a.moveTo(ca[6],ca[7]),
a.lineTo(ca[4],ca[5]),a.lineTo(ca[2],ca[3]),a.lineTo(ca[0],ca[1]),a.clip());oa.La(a,g,M,h,{},f);a.restore();q.push(ga);r.push(ha)}}Vv.prototype.ef.apply(this,arguments)};function W(a){a=a?a:{};var b=tb({},a);delete b.preload;delete b.useInterimTilesOnError;T.call(this,b);this.Bi(a.preload?a.preload:0);this.Ci(a.useInterimTilesOnError?a.useInterimTilesOnError:!0);xa(void 0==a.renderMode||"image"==a.renderMode||"hybrid"==a.renderMode||"vector"==a.renderMode,28);this.j=a.renderMode||"hybrid"}v(W,T);k=W.prototype;k.Fd=function(a){var b=null;"canvas"===a.U()&&(b=new dw(this));return b};k.Ud=function(){return this.get("preload")};k.kd=function(){return this.get("useInterimTilesOnError")};
k.Bi=function(a){this.set("preload",a)};k.Ci=function(a){this.set("useInterimTilesOnError",a)};function gw(a,b,c,d){function e(){delete window[g];f.parentNode.removeChild(f)}var f=document.createElement("script"),g="olc_"+w(b);f.async=!0;f.src=a+(-1==a.indexOf("?")?"?":"&")+(d||"callback")+"="+g;var h=setTimeout(function(){e();c&&c()},1E4);window[g]=function(a){clearTimeout(h);e();b(a)};document.getElementsByTagName("head")[0].appendChild(f)};function hw(a,b,c,d,e,f,g,h,l,m,n){Ls.call(this,e,0);this.D=void 0!==n?n:!1;this.S=g;this.u=h;this.v=null;this.c=b;this.j=d;this.o=f?f:e;this.a=[];this.yd=null;this.g=0;f=d.Aa(this.o);h=this.j.G();e=this.c.G();f=h?pb(f,h):f;if(jb(f))if((h=a.G())&&(e?e=pb(e,h):e=h),d=Av(a,c,nb(f),d.Da(this.o[0])),!isFinite(d)||0>=d)this.state=4;else if(this.l=new Dv(a,c,f,e,d*(void 0!==m?m:.5)),this.l.c.length)if(this.g=b.tc(d),c=Fv(this.l),e&&(a.i?(c[1]=Ca(c[1],e[1],e[3]),c[3]=Ca(c[3],e[1],e[3])):c=pb(c,e)),jb(c)){a=
oc(b,c,this.g);for(b=a.ca;b<=a.$;b++)for(c=a.da;c<=a.ia;c++)(m=l(this.g,b,c,g))&&this.a.push(m);this.a.length||(this.state=4)}else this.state=4;else this.state=4;else this.state=4}v(hw,Ls);hw.prototype.ka=function(){1==this.state&&(this.yd.forEach(Ec),this.yd=null);Ls.prototype.ka.call(this)};hw.prototype.Y=function(){return this.v};
hw.prototype.de=function(){var a=[];this.a.forEach(function(b){b&&2==b.getState()&&a.push({extent:this.c.Aa(b.ta),image:b.Y()})},this);this.a.length=0;if(a.length){var b=this.o[0],c=this.j.gb(b),d="number"===typeof c?c:c[0],c="number"===typeof c?c:c[1],b=this.j.Da(b),e=this.c.Da(this.g),f=this.j.Aa(this.o);this.v=Cv(d,c,this.S,e,this.c.G(),b,f,this.l,a,this.u,this.D);this.state=2}else this.state=3;this.s()};
hw.prototype.load=function(){if(0==this.state){this.state=1;this.s();var a=0;this.yd=[];this.a.forEach(function(b){var c=b.getState();if(0==c||1==c){a++;var d=y(b,"change",function(){var c=b.getState();if(2==c||3==c||4==c)Ec(d),a--,a||(this.yd.forEach(Ec),this.yd=null,this.de())},this);this.yd.push(d)}},this);this.a.forEach(function(a){0==a.getState()&&a.load()});a||setTimeout(this.de.bind(this),0)}};function iw(a,b){var c=/\{z\}/g,d=/\{x\}/g,e=/\{y\}/g,f=/\{-y\}/g;return function(g){if(g)return a.replace(c,g[0].toString()).replace(d,g[1].toString()).replace(e,function(){return(-g[2]-1).toString()}).replace(f,function(){var a=b.a?b.a[g[0]]:null;xa(a,55);return(a.ia-a.da+1+g[2]).toString()})}}function jw(a,b){for(var c=a.length,d=Array(c),e=0;e<c;++e)d[e]=iw(a[e],b);return kw(d)}function kw(a){return 1===a.length?a[0]:function(b,c,d){if(b)return a[Ia((b[1]<<b[0])+b[2],a.length)](b,c,d)}}
function lw(){}function mw(a){var b=[],c=/\{([a-z])-([a-z])\}/.exec(a);if(c){var d=c[2].charCodeAt(0),e;for(e=c[1].charCodeAt(0);e<=d;++e)b.push(a.replace(c[0],String.fromCharCode(e)));return b}if(c=c=/\{(\d+)-(\d+)\}/.exec(a)){d=parseInt(c[2],10);for(e=parseInt(c[1],10);e<=d;e++)b.push(a.replace(c[0],e.toString()));return b}b.push(a);return b};function nw(a){lk.call(this);this.highWaterMark=void 0!==a?a:2048}v(nw,lk);function ow(a){return a.c>a.highWaterMark}nw.prototype.fd=function(a){for(var b,c;ow(this);){b=this.a.Yc;c=b.ta[0].toString();var d;if(d=c in a)b=b.ta,d=za(a[c],b[1],b[2]);if(d)break;else Nc(this.pop())}};function pw(a){$t.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection,state:a.state,wrapX:a.wrapX});this.va=void 0!==a.opaque?a.opaque:!1;this.$a=void 0!==a.tilePixelRatio?a.tilePixelRatio:1;this.tileGrid=void 0!==a.tileGrid?a.tileGrid:null;this.a=new nw(a.cacheSize);this.o=[0,0];this.uc=""}v(pw,$t);k=pw.prototype;k.Ki=function(){return ow(this.a)};k.fd=function(a,b){(a=this.Wd(a))&&a.fd(b)};
function yt(a,b,c,d,e){b=a.Wd(b);if(!b)return!1;for(var f=!0,g,h,l=d.ca;l<=d.$;++l)for(var m=d.da;m<=d.ia;++m)g=a.Sb(c,l,m),h=!1,b.b.hasOwnProperty(g)&&(g=b.get(g),(h=2===g.getState())&&(h=!1!==e(g))),h||(f=!1);return f}k.Wf=function(){return 0};function qw(a,b){a.uc!==b&&(a.uc=b,a.s())}k.Sb=function(a,b,c){return a+"/"+b+"/"+c};k.Zf=function(){return this.va};k.ab=function(){return this.tileGrid};k.Ta=function(a){return this.tileGrid?this.tileGrid:vc(a)};
k.Wd=function(a){var b=this.c;return b&&!dc(b,a)?null:this.a};k.nb=function(){return this.$a};k.Xd=function(a,b,c){c=this.Ta(c);b=this.nb(b);a=Ma(c.gb(a),this.o);return 1==b?a:La(a,b,this.o)};function rw(a,b,c){var d=void 0!==c?c:a.c;c=a.Ta(d);if(a.u&&d.c){var e=b;b=e[0];a=tc(c,e);d=zc(d);Ta(d,a)?b=e:(e=lb(d),a[0]+=e*Math.ceil((d[0]-a[0])/e),b=c.bg(a,b))}e=b[0];d=b[1];a=b[2];if(c.minZoom>e||e>c.maxZoom)c=!1;else{var f=c.G();c=(c=f?oc(c,f,e):c.a?c.a[e]:null)?za(c,d,a):!0}return c?b:null}
k.sa=function(){this.a.clear();this.s()};k.Ug=ua;function sw(a,b){Oc.call(this,a);this.tile=b}v(sw,Oc);function tw(a){pw.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,extent:a.extent,logo:a.logo,opaque:a.opaque,projection:a.projection,state:a.state,tileGrid:a.tileGrid,tilePixelRatio:a.tilePixelRatio,wrapX:a.wrapX});this.tileLoadFunction=a.tileLoadFunction;this.tileUrlFunction=this.Fc?this.Fc.bind(this):lw;this.urls=null;a.urls?this.eb(a.urls):a.url&&this.jb(a.url);a.tileUrlFunction&&this.cb(a.tileUrlFunction)}v(tw,pw);k=tw.prototype;k.pb=function(){return this.tileLoadFunction};
k.qb=function(){return this.tileUrlFunction};k.rb=function(){return this.urls};k.Li=function(a){a=a.target;switch(a.getState()){case 1:this.b(new sw("tileloadstart",a));break;case 2:this.b(new sw("tileloadend",a));break;case 3:this.b(new sw("tileloaderror",a))}};k.vb=function(a){this.a.clear();this.tileLoadFunction=a;this.s()};k.cb=function(a,b){this.tileUrlFunction=a;"undefined"!==typeof b?qw(this,b):this.s()};
k.jb=function(a){var b=this.urls=mw(a);this.cb(this.Fc?this.Fc.bind(this):jw(b,this.tileGrid),a)};k.eb=function(a){this.urls=a;var b=a.join("\n");this.cb(this.Fc?this.Fc.bind(this):jw(a,this.tileGrid),b)};k.Ug=function(a,b,c){a=this.Sb(a,b,c);this.a.b.hasOwnProperty(a)&&this.a.get(a)};function X(a){tw.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,extent:a.extent,logo:a.logo,opaque:a.opaque,projection:a.projection,state:a.state,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction?a.tileLoadFunction:uw,tilePixelRatio:a.tilePixelRatio,tileUrlFunction:a.tileUrlFunction,url:a.url,urls:a.urls,wrapX:a.wrapX});this.crossOrigin=void 0!==a.crossOrigin?a.crossOrigin:null;this.tileClass=a.tileClass?a.tileClass:Os;this.g={};this.v={};this.Sa=a.reprojectionErrorThreshold;this.I=
!1}v(X,tw);k=X.prototype;k.Ki=function(){if(ow(this.a))return!0;for(var a in this.g)if(ow(this.g[a]))return!0;return!1};k.fd=function(a,b){a=this.Wd(a);this.a.fd(this.a==a?b:{});for(var c in this.g){var d=this.g[c];d.fd(d==a?b:{})}};k.Wf=function(a){return this.c&&a&&!dc(this.c,a)?0:this.Xf()};k.Xf=function(){return 0};k.Zf=function(a){return this.c&&a&&!dc(this.c,a)?!1:tw.prototype.Zf.call(this,a)};
k.Ta=function(a){var b=this.c;return!this.tileGrid||b&&!dc(b,a)?(b=w(a).toString(),b in this.v||(this.v[b]=vc(a)),this.v[b]):this.tileGrid};k.Wd=function(a){var b=this.c;if(!b||dc(b,a))return this.a;a=w(a).toString();a in this.g||(this.g[a]=new nw(this.a.highWaterMark));return this.g[a]};function vw(a,b,c,d,e,f,g){b=[b,c,d];e=(c=rw(a,b,f))?a.tileUrlFunction(c,e,f):void 0;e=new a.tileClass(b,void 0!==e?0:4,void 0!==e?e:"",a.crossOrigin,a.tileLoadFunction);e.key=g;y(e,"change",a.Li,a);return e}
k.Nc=function(a,b,c,d,e){if(this.c&&e&&!dc(this.c,e)){var f=this.Wd(e);c=[a,b,c];var g;a=this.Sb.apply(this,c);f.b.hasOwnProperty(a)&&(g=f.get(a));b=this.uc;if(g&&g.key==b)return g;var h=this.c,l=this.Ta(h),m=this.Ta(e),n=rw(this,c,e);d=new hw(h,l,e,m,c,n,this.nb(d),this.Xf(),function(a,b,c,d){return ww(this,a,b,c,d,h)}.bind(this),this.Sa,this.I);d.key=b;g?(d.i=g,f.replace(a,d)):f.set(a,d);return d}return ww(this,a,b,c,d,e)};
function ww(a,b,c,d,e,f){var g=a.Sb(b,c,d),h=a.uc;if(a.a.b.hasOwnProperty(g)){var l=a.a.get(g);if(l.key!=h){var m=l;l=vw(a,b,c,d,e,f,h);0==m.getState()?l.i=m.i:l.i=m;if(l.i){b=l.i;c=l;do{if(2==b.getState()){b.i=null;break}else 1==b.getState()?c=b:0==b.getState()?c.i=b.i:c=b;b=c.i}while(b)}a.a.replace(g,l)}}else l=vw(a,b,c,d,e,f,h),a.a.set(g,l);return l}k.Pb=function(a){if(this.I!=a){this.I=a;for(var b in this.g)this.g[b].clear();this.s()}};
k.Qb=function(a,b){if(a=Tb(a))a=w(a).toString(),a in this.v||(this.v[a]=b)};function uw(a,b){a.Y().src=b};function xw(a){this.B=void 0!==a.hidpi?a.hidpi:!1;X.call(this,{cacheSize:a.cacheSize,crossOrigin:"anonymous",opaque:!0,projection:Tb("EPSG:3857"),reprojectionErrorThreshold:a.reprojectionErrorThreshold,state:"loading",tileLoadFunction:a.tileLoadFunction,tilePixelRatio:this.B?2:1,wrapX:void 0!==a.wrapX?a.wrapX:!0});this.R=void 0!==a.culture?a.culture:"en-us";this.C=void 0!==a.maxZoom?a.maxZoom:-1;this.f=a.key;this.l=a.imagerySet;gw("https://dev.virtualearth.net/REST/v1/Imagery/Metadata/"+this.l+"?uriScheme=https&include=ImageryProviders&key="+
this.f,this.pa.bind(this),void 0,"jsonp")}v(xw,X);var yw=new Ac({html:'<a class="ol-attribution-bing-tos" href="http://www.microsoft.com/maps/product/terms.html">Terms of Use</a>'});xw.prototype.T=function(){return this.f};xw.prototype.fa=function(){return this.l};
xw.prototype.pa=function(a){if(200!=a.statusCode||"OK"!=a.statusDescription||"ValidCredentials"!=a.authenticationResultCode||1!=a.resourceSets.length||1!=a.resourceSets[0].resources.length)bu(this,"error");else{var b=a.brandLogoUri;-1==b.indexOf("https")&&(b=b.replace("http","https"));var c=a.resourceSets[0].resources[0],d=-1==this.C?c.zoomMax:this.C;a=zc(this.c);var e=xc({extent:a,minZoom:c.zoomMin,maxZoom:d,tileSize:(c.imageWidth==c.imageHeight?c.imageWidth:[c.imageWidth,c.imageHeight])/this.nb()});
this.tileGrid=e;var f=this.R,g=this.B;this.tileUrlFunction=kw(c.imageUrlSubdomains.map(function(a){var b=[0,0,0],d=c.imageUrl.replace("{subdomain}",a).replace("{culture}",f);return function(a){if(a)return jc(a[0],a[1],-a[2]-1,b),a=d,g&&(a+="&dpi=d1&device=mobile"),a.replace("{quadkey}",kc(b))}}));if(c.imageryProviders){var h=Vb(Tb("EPSG:4326"),this.c);a=c.imageryProviders.map(function(a){var b=a.attribution,c={};a.coverageAreas.forEach(function(a){var b=a.zoomMin,f=Math.min(a.zoomMax,d);a=a.bbox;
a=sb([a[1],a[0],a[3],a[2]],h);var g;for(g=b;g<=f;++g){var l=g.toString();b=oc(e,a,g);l in c?c[l].push(b):c[l]=[b]}});return new Ac({html:b,tileRanges:c})});a.push(yw);this.ua(a)}this.D=b;bu(this,"ready")}};function zw(a){a=a||{};var b=void 0!==a.projection?a.projection:"EPSG:3857",c=void 0!==a.tileGrid?a.tileGrid:xc({extent:zc(b),maxZoom:a.maxZoom,minZoom:a.minZoom,tileSize:a.tileSize});X.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,opaque:a.opaque,projection:b,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileGrid:c,tileLoadFunction:a.tileLoadFunction,tilePixelRatio:a.tilePixelRatio,tileUrlFunction:a.tileUrlFunction,url:a.url,urls:a.urls,
wrapX:void 0!==a.wrapX?a.wrapX:!0})}v(zw,X);function Aw(a){this.C=a.account;this.B=a.map||"";this.f=a.config||{};this.l={};zw.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,maxZoom:void 0!==a.maxZoom?a.maxZoom:18,minZoom:a.minZoom,projection:a.projection,state:"loading",wrapX:a.wrapX});Bw(this)}v(Aw,zw);k=Aw.prototype;k.Kk=function(){return this.f};k.tq=function(a){tb(this.f,a);Bw(this)};k.Xp=function(a){this.f=a||{};Bw(this)};
function Bw(a){var b=JSON.stringify(a.f);if(a.l[b])Cw(a,a.l[b]);else{var c="https://"+a.C+".cartodb.com/api/v1/map";a.B&&(c+="/named/"+a.B);var d=new XMLHttpRequest;d.addEventListener("load",a.Dl.bind(a,b));d.addEventListener("error",a.Cl.bind(a));d.open("POST",c);d.setRequestHeader("Content-type","application/json");d.send(JSON.stringify(a.f))}}
k.Dl=function(a,b){b=b.target;if(!b.status||200<=b.status&&300>b.status){try{var c=JSON.parse(b.responseText)}catch(d){bu(this,"error");return}Cw(this,c);this.l[a]=c;bu(this,"ready")}else bu(this,"error")};k.Cl=function(){bu(this,"error")};function Cw(a,b){a.jb("https://"+b.cdn_url.https+"/"+a.C+"/api/v1/map/"+b.layergroupid+"/{z}/{x}/{y}.png")};function Y(a){U.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection,wrapX:a.wrapX});this.resolution=void 0;this.distance=void 0!==a.distance?a.distance:20;this.features=[];this.geometryFunction=a.geometryFunction||function(a){a=a.V();xa(a instanceof C,10);return a};this.source=a.source;this.source.J("change",Y.prototype.sa,this)}v(Y,U);k=Y.prototype;k.$n=function(){return this.distance};k.ao=function(){return this.source};
k.Yd=function(a,b,c){this.source.Yd(a,b,c);b!==this.resolution&&(this.clear(),this.resolution=b,Dw(this),this.cd(this.features))};k.Yp=function(a){this.distance=a;this.sa()};k.sa=function(){this.clear();Dw(this);this.cd(this.features);U.prototype.sa.call(this)};
function Dw(a){if(void 0!==a.resolution){a.features.length=0;for(var b=Oa(),c=a.distance*a.resolution,d=a.source.Xe(),e={},f=0,g=d.length;f<g;f++){var h=d[f];w(h).toString()in e||!(h=a.geometryFunction(h))||(h=h.X(),Za(h,b),Qa(b,c,b),h=a.source.Uf(b),h=h.filter(function(a){a=w(a).toString();return a in e?!1:e[a]=!0}),a.features.push(Ew(a,h)))}}}
function Ew(a,b){for(var c=[0,0],d=b.length-1;0<=d;--d){var e=a.geometryFunction(b[d]);e?Ze(c,e.X()):b.splice(d,1)}gf(c,1/b.length);a=new H(new C(c));a.set("features",b);return a};function Fw(a,b){var c=[];Object.keys(b).forEach(function(a){null!==b[a]&&void 0!==b[a]&&c.push(a+"="+encodeURIComponent(b[a]))});var d=c.join("&");a=a.replace(/[?&]$/,"");a=-1===a.indexOf("?")?a+"?":a+"&";return a+d};function Gw(a){a=a||{};Hv.call(this,{attributions:a.attributions,logo:a.logo,projection:a.projection,resolutions:a.resolutions});this.R=void 0!==a.crossOrigin?a.crossOrigin:null;this.T=void 0!==a.hidpi?a.hidpi:!0;this.f=a.url;this.g=a.imageLoadFunction?a.imageLoadFunction:Nv;this.v=a.params||{};this.M=null;this.l=[0,0];this.I=0;this.B=void 0!==a.ratio?a.ratio:1.5}v(Gw,Hv);k=Gw.prototype;k.co=function(){return this.v};
k.Jc=function(a,b,c,d){if(void 0===this.f)return null;b=Iv(this,b);c=this.T?c:1;var e=this.M;if(e&&this.I==this.i&&e.resolution==b&&e.a==c&&Va(e.G(),a))return e;e={F:"image",FORMAT:"PNG32",TRANSPARENT:!0};tb(e,this.v);a=a.slice();var f=(a[0]+a[2])/2,g=(a[1]+a[3])/2;if(1!=this.B){var h=this.B*lb(a)/2,l=this.B*mb(a)/2;a[0]=f-h;a[1]=g-l;a[2]=f+h;a[3]=g+l}var h=b/c,l=Math.ceil(lb(a)/h),m=Math.ceil(mb(a)/h);a[0]=f-h*l/2;a[2]=f+h*l/2;a[1]=g-h*m/2;a[3]=g+h*m/2;this.l[0]=l;this.l[1]=m;f=a;g=this.l;h=c;d=
d.mb.split(":").pop();e.SIZE=g[0]+","+g[1];e.BBOX=f.join(",");e.BBOXSR=d;e.IMAGESR=d;e.DPI=Math.round(90*h);d=this.f;f=d.replace(/MapServer\/?$/,"MapServer/export").replace(/ImageServer\/?$/,"ImageServer/exportImage");f==d&&xa(!1,50);e=Fw(f,e);this.M=new Js(a,b,c,this.j,e,this.R,this.g);this.I=this.i;y(this.M,"change",this.o,this);return this.M};k.bo=function(){return this.g};k.eo=function(){return this.f};k.fo=function(a){this.M=null;this.g=a;this.s()};
k.ho=function(a){a!=this.f&&(this.f=a,this.M=null,this.s())};k.io=function(a){tb(this.v,a);this.M=null;this.s()};function Hw(a){Hv.call(this,{projection:a.projection,resolutions:a.resolutions});this.R=void 0!==a.crossOrigin?a.crossOrigin:null;this.l=void 0!==a.displayDpi?a.displayDpi:96;this.g=a.params||{};this.I=a.url;this.f=a.imageLoadFunction?a.imageLoadFunction:Nv;this.T=void 0!==a.hidpi?a.hidpi:!0;this.pa=void 0!==a.metersPerUnit?a.metersPerUnit:1;this.v=void 0!==a.ratio?a.ratio:1;this.va=void 0!==a.useOverlay?a.useOverlay:!1;this.M=null;this.B=0}v(Hw,Hv);k=Hw.prototype;k.ko=function(){return this.g};
k.Jc=function(a,b,c){b=Iv(this,b);c=this.T?c:1;var d=this.M;if(d&&this.B==this.i&&d.resolution==b&&d.a==c&&Va(d.G(),a))return d;1!=this.v&&(a=a.slice(),rb(a,this.v));var e=[lb(a)/b*c,mb(a)/b*c];if(void 0!==this.I){var d=this.I,f=nb(a),g=this.pa,h=lb(a),l=mb(a),m=e[0],n=e[1],p=.0254/this.l,e={OPERATION:this.va?"GETDYNAMICMAPOVERLAYIMAGE":"GETMAPIMAGE",VERSION:"2.0.0",LOCALE:"en",CLIENTAGENT:"ol.source.ImageMapGuide source",CLIP:"1",SETDISPLAYDPI:this.l,SETDISPLAYWIDTH:Math.round(e[0]),SETDISPLAYHEIGHT:Math.round(e[1]),
SETVIEWSCALE:n*h>m*l?h*g/(m*p):l*g/(n*p),SETVIEWCENTERX:f[0],SETVIEWCENTERY:f[1]};tb(e,this.g);d=Fw(d,e);d=new Js(a,b,c,this.j,d,this.R,this.f);y(d,"change",this.o,this)}else d=null;this.M=d;this.B=this.i;return d};k.jo=function(){return this.f};k.mo=function(a){tb(this.g,a);this.s()};k.lo=function(a){this.M=null;this.f=a;this.s()};function Iw(a){var b=a.imageExtent,c=void 0!==a.crossOrigin?a.crossOrigin:null,d=a.imageLoadFunction?a.imageLoadFunction:Nv;Hv.call(this,{attributions:a.attributions,logo:a.logo,projection:Tb(a.projection)});this.M=new Js(b,void 0,1,this.j,a.url,c,d);this.f=a.imageSize?a.imageSize:null;y(this.M,"change",this.o,this)}v(Iw,Hv);Iw.prototype.Jc=function(a){return qb(a,this.M.G())?this.M:null};
Iw.prototype.o=function(a){if(2==this.M.getState()){var b=this.M.G(),c=this.M.Y();if(this.f){var d=this.f[0];var e=this.f[1]}else d=c.width,e=c.height;b=Math.ceil(lb(b)/(mb(b)/e));if(b!=d){var b=jd(b,e),f=b.canvas;b.drawImage(c,0,0,d,e,0,0,f.width,f.height);this.M.Og(f)}}Hv.prototype.o.call(this,a)};function Jw(a){a=a||{};Hv.call(this,{attributions:a.attributions,logo:a.logo,projection:a.projection,resolutions:a.resolutions});this.pa=void 0!==a.crossOrigin?a.crossOrigin:null;this.g=a.url;this.v=a.imageLoadFunction?a.imageLoadFunction:Nv;this.f=a.params||{};this.l=!0;Kw(this);this.T=a.serverType;this.va=void 0!==a.hidpi?a.hidpi:!0;this.M=null;this.B=[0,0];this.R=0;this.I=void 0!==a.ratio?a.ratio:1.5}v(Jw,Hv);var Lw=[101,101];k=Jw.prototype;
k.so=function(a,b,c,d){if(void 0!==this.g){var e=ob(a,b,0,Lw),f={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:this.f.LAYERS};tb(f,this.f,d);d=Math.floor((e[3]-a[1])/b);f[this.l?"I":"X"]=Math.floor((a[0]-e[0])/b);f[this.l?"J":"Y"]=d;return Mw(this,e,Lw,1,Tb(c),f)}};k.uo=function(){return this.f};
k.Jc=function(a,b,c,d){if(void 0===this.g)return null;b=Iv(this,b);1==c||this.va&&void 0!==this.T||(c=1);var e=b/c,f=nb(a),g=ob(f,e,0,[Math.ceil(lb(a)/e),Math.ceil(mb(a)/e)]);a=ob(f,e,0,[Math.ceil(this.I*lb(a)/e),Math.ceil(this.I*mb(a)/e)]);if((f=this.M)&&this.R==this.i&&f.resolution==b&&f.a==c&&Va(f.G(),g))return f;g={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};tb(g,this.f);this.B[0]=Math.round(lb(a)/e);this.B[1]=Math.round(mb(a)/e);d=Mw(this,a,this.B,c,d,g);
this.M=new Js(a,b,c,this.j,d,this.pa,this.v);this.R=this.i;y(this.M,"change",this.o,this);return this.M};k.to=function(){return this.v};
function Mw(a,b,c,d,e,f){xa(void 0!==a.g,9);f[a.l?"CRS":"SRS"]=e.mb;"STYLES"in a.f||(f.STYLES="");if(1!=d)switch(a.T){case "geoserver":d=90*d+.5|0;f.FORMAT_OPTIONS="FORMAT_OPTIONS"in f?f.FORMAT_OPTIONS+(";dpi:"+d):"dpi:"+d;break;case "mapserver":f.MAP_RESOLUTION=90*d;break;case "carmentaserver":case "qgis":f.DPI=90*d;break;default:xa(!1,8)}f.WIDTH=c[0];f.HEIGHT=c[1];c=e.b;var g;a.l&&"ne"==c.substr(0,2)?g=[b[1],b[0],b[3],b[2]]:g=b;f.BBOX=g.join(",");return Fw(a.g,f)}k.vo=function(){return this.g};
k.wo=function(a){this.M=null;this.v=a;this.s()};k.xo=function(a){a!=this.g&&(this.g=a,this.M=null,this.s())};k.yo=function(a){tb(this.f,a);Kw(this);this.M=null;this.s()};function Kw(a){a.l=0<=Ye(a.f.VERSION||"1.3.0")};function Nw(a){a=a||{};var b;void 0!==a.attributions?b=a.attributions:b=[Ow];zw.call(this,{attributions:b,cacheSize:a.cacheSize,crossOrigin:void 0!==a.crossOrigin?a.crossOrigin:"anonymous",opaque:void 0!==a.opaque?a.opaque:!0,maxZoom:void 0!==a.maxZoom?a.maxZoom:19,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileLoadFunction:a.tileLoadFunction,url:void 0!==a.url?a.url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",wrapX:a.wrapX})}v(Nw,zw);var Ow=new Ac({html:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'});Fj.df={};Fj.df.Af=function(){};
(function(a){function b(a,b,c){if(g)return new ImageData(a,b,c);b=h.createImageData(b,c);b.data.set(a);return b}function c(a){var b=!0;try{new ImageData(10,10)}catch(n){b=!1}return function(c){var d=c.buffers,e=c.meta,f=c.width,g=c.height,h=d.length,l=d[0].byteLength;if(c.imageOps){l=Array(h);for(c=0;c<h;++c){var m=c;var n=new Uint8ClampedArray(d[c]);var L=f,oa=g;n=b?new ImageData(n,L,oa):{data:n,width:L,height:oa};l[m]=n}f=a(l,e).data}else{f=new Uint8ClampedArray(l);g=Array(h);m=Array(h);for(c=0;c<
h;++c)g[c]=new Uint8ClampedArray(d[c]),m[c]=[0,0,0,0];for(d=0;d<l;d+=4){for(c=0;c<h;++c)n=g[c],m[c][0]=n[d],m[c][1]=n[d+1],m[c][2]=n[d+2],m[c][3]=n[d+3];c=a(m,e);f[d]=c[0];f[d+1]=c[1];f[d+2]=c[2];f[d+3]=c[3]}}return f.buffer}}function d(a,b){var d=Object.keys(a.lib||{}).map(function(b){return"var "+b+" = "+a.lib[b].toString()+";"}).concat(["var __minion__ = ("+c.toString()+")(",a.operation.toString(),");",'self.addEventListener("message", function(event) {',"  var buffer = __minion__(event.data);",
"  self.postMessage({buffer: buffer, meta: event.data.meta}, [buffer]);","});"]),d=URL.createObjectURL(new Blob(d,{type:"text/javascript"})),d=new Worker(d);d.addEventListener("message",b);return d}function e(a,b){var d=c(a.operation);return{postMessage:function(a){setTimeout(function(){b({data:{buffer:d(a),meta:a.meta}})},0)}}}function f(a){this.Ff=!!a.$l;var b;0===a.threads?b=0:this.Ff?b=1:b=a.threads||1;var c=[];if(b)for(var f=0;f<b;++f)c[f]=d(a,this.gh.bind(this,f));else c[0]=e(a,this.gh.bind(this,
0));this.qe=c;this.Ed=[];this.fk=a.rp||Infinity;this.oe=0;this.bd={};this.Gf=null}var g=!0;try{new ImageData(10,10)}catch(l){g=!1}var h=document.createElement("canvas").getContext("2d");f.prototype.pp=function(a,b,c){this.dk({inputs:a,Qh:b,callback:c});this.dh()};f.prototype.dk=function(a){for(this.Ed.push(a);this.Ed.length>this.fk;)this.Ed.shift().callback(null,null)};f.prototype.dh=function(){if(0===this.oe&&0<this.Ed.length){var a=this.Gf=this.Ed.shift(),b=a.inputs[0].width,c=a.inputs[0].height,
d=a.inputs.map(function(a){return a.data.buffer}),e=this.qe.length;this.oe=e;if(1===e)this.qe[0].postMessage({buffers:d,meta:a.Qh,imageOps:this.Ff,width:b,height:c},d);else for(var f=4*Math.ceil(a.inputs[0].data.length/4/e),g=0;g<e;++g){for(var h=g*f,B=[],E=0,A=d.length;E<A;++E)B.push(d[g].slice(h,h+f));this.qe[g].postMessage({buffers:B,meta:a.Qh,imageOps:this.Ff,width:b,height:c},B)}}};f.prototype.gh=function(a,b){this.Jq||(this.bd[a]=b.data,--this.oe,0===this.oe&&this.gk())};f.prototype.gk=function(){var a=
this.Gf,c=this.qe.length;if(1===c){var d=new Uint8ClampedArray(this.bd[0].buffer);var e=this.bd[0].meta}else{var f=a.inputs[0].data.length;d=new Uint8ClampedArray(f);e=Array(f);for(var f=4*Math.ceil(f/4/c),g=0;g<c;++g){var h=g*f;d.set(new Uint8ClampedArray(this.bd[g].buffer),h);e[g]=this.bd[g].meta}}this.Gf=null;this.bd={};a.callback(null,b(d,a.inputs[0].width,a.inputs[0].height),e);this.dh()};a["default"]={Af:f};a.Af=f})(Fj.df=Fj.df||{});function Pw(a){this.B=null;this.va=void 0!==a.operationType?a.operationType:"pixel";this.Sa=void 0!==a.threads?a.threads:1;this.g=Qw(a.sources);for(var b=0,c=this.g.length;b<c;++b)y(this.g[b],"change",this.s,this);this.T=new Pe(function(){return 1},this.s.bind(this));for(var b=Rw(this.g),c={},d=0,e=b.length;d<e;++d)c[w(b[d].layer)]=b[d];this.f=null;this.I={animate:!1,attributions:{},coordinateToPixelTransform:Bh(),extent:null,focus:null,index:0,layerStates:c,layerStatesArray:b,logos:{},pixelRatio:1,
pixelToCoordinateTransform:Bh(),postRenderFunctions:[],size:[0,0],skippedFeatureUids:{},tileQueue:this.T,time:Date.now(),usedTiles:{},viewState:{rotation:0},viewHints:[],wantedTiles:{}};Hv.call(this,{});a.operation&&this.v(a.operation,a.lib)}v(Pw,Hv);Pw.prototype.v=function(a,b){this.B=new Fj.df.Af({operation:a,$l:"image"===this.va,rp:1,lib:b,threads:this.Sa});this.s()};
Pw.prototype.Y=function(a,b,c,d){c=!0;for(var e,f=0,g=this.g.length;f<g;++f)if(e=this.g[f].a.ha(),"ready"!==e.getState()){c=!1;break}if(!c)return null;c=tb({},this.I);c.viewState=tb({},c.viewState);e=nb(a);c.extent=a.slice();c.focus=e;c.size[0]=Math.round(lb(a)/b);c.size[1]=Math.round(mb(a)/b);f=c.viewState;f.center=e;f.projection=d;f.resolution=b;this.l=c;Qe(c.tileQueue,16,16);this.f&&(d=this.f.resolution,c=this.f.G(),b===d&&bb(a,c)||(this.f=null));if(!this.f||this.i!==this.R)a:{a=this.l;d=this.g.length;
b=Array(d);for(c=0;c<d;++c){e=this.g[c];f=a;g=a.layerStatesArray[c];if(e.sd(f,g)){var h=f.size[0],l=f.size[1];if(Sw){var m=Sw.canvas;m.width!==h||m.height!==l?Sw=jd(h,l):Sw.clearRect(0,0,h,l)}else Sw=jd(h,l);e.S(f,g,Sw);e=Sw.getImageData(0,0,h,l)}else e=null;if(e)b[c]=e;else break a}d={};this.b(new Tw(Uw,a,d));this.B.pp(b,d,this.pa.bind(this,a))}return this.f};
Pw.prototype.pa=function(a,b,c,d){if(!b&&c){b=a.extent;var e=a.viewState.resolution;if(e===this.l.viewState.resolution&&bb(b,this.l.extent)){if(this.f)var f=this.f.Y().getContext("2d");else f=jd(Math.round(lb(b)/e),Math.round(mb(b)/e)),this.f=new Ks(b,e,1,this.j,f.canvas);f.putImageData(c,0,0);this.s();this.R=this.i;this.b(new Tw(Vw,a,d))}}};var Sw=null;function Rw(a){return a.map(function(a){return th(a.a)})}
function Qw(a){for(var b=a.length,c=Array(b),d=0;d<b;++d){var e=d,f=a[d],g=null;f instanceof pw?(f=new cw({source:f}),g=new Vv(f)):f instanceof Hv&&(f=new Uv({source:f}),g=new zv(f));c[e]=g}return c}function Tw(a,b,c){Oc.call(this,a);this.extent=b.extent;this.resolution=b.viewState.resolution/b.pixelRatio;this.data=c}v(Tw,Oc);Pw.prototype.Jc=function(){return null};var Uw="beforeoperations",Vw="afteroperations";function Ww(a){var b=a.layer.indexOf("-"),b=Xw[-1==b?a.layer:a.layer.slice(0,b)],c=Yw[a.layer];zw.call(this,{attributions:Zw,cacheSize:a.cacheSize,crossOrigin:"anonymous",maxZoom:void 0!=a.maxZoom?a.maxZoom:b.maxZoom,minZoom:void 0!=a.minZoom?a.minZoom:b.minZoom,opaque:c.opaque,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileLoadFunction:a.tileLoadFunction,url:void 0!==a.url?a.url:"https://stamen-tiles-{a-d}.a.ssl.fastly.net/"+a.layer+"/{z}/{x}/{y}."+c.Lb,wrapX:a.wrapX})}v(Ww,zw);
var Zw=[new Ac({html:'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'}),Ow],Yw={terrain:{Lb:"jpg",opaque:!0},"terrain-background":{Lb:"jpg",opaque:!0},"terrain-labels":{Lb:"png",opaque:!1},"terrain-lines":{Lb:"png",opaque:!1},"toner-background":{Lb:"png",opaque:!0},toner:{Lb:"png",opaque:!0},"toner-hybrid":{Lb:"png",opaque:!1},"toner-labels":{Lb:"png",opaque:!1},"toner-lines":{Lb:"png",opaque:!1},"toner-lite":{Lb:"png",
opaque:!0},watercolor:{Lb:"jpg",opaque:!0}},Xw={terrain:{minZoom:4,maxZoom:18},toner:{minZoom:0,maxZoom:20},watercolor:{minZoom:1,maxZoom:16}};function $w(a){a=a||{};X.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,projection:a.projection,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction,url:a.url,urls:a.urls,wrapX:void 0!==a.wrapX?a.wrapX:!0});this.f=a.params||{};this.l=Oa();qw(this,ax(this))}v($w,X);function ax(a){var b=0,c=[],d;for(d in a.f)c[b++]=d+"-"+a.f[d];return c.join("/")}$w.prototype.C=function(){return this.f};
$w.prototype.nb=function(a){return a};
$w.prototype.Fc=function(a,b,c){var d=this.tileGrid;d||(d=this.Ta(c));if(!(d.b.length<=a[0])){var e=d.Aa(a,this.l),f=Ma(d.gb(a[0]),this.o);1!=b&&(f=La(f,b,this.o));d={F:"image",FORMAT:"PNG32",TRANSPARENT:!0};tb(d,this.f);var g=this.urls;g?(c=c.mb.split(":").pop(),d.SIZE=f[0]+","+f[1],d.BBOX=e.join(","),d.BBOXSR=c,d.IMAGESR=c,d.DPI=Math.round(d.DPI?d.DPI*b:90*b),a=(1==g.length?g[0]:g[Ia((a[1]<<a[0])+a[2],g.length)]).replace(/MapServer\/?$/,"MapServer/export").replace(/ImageServer\/?$/,"ImageServer/exportImage"),
a=Fw(a,d)):a=void 0;return a}};$w.prototype.B=function(a){tb(this.f,a);qw(this,ax(this))};function bx(a){pw.call(this,{opaque:!1,projection:a.projection,tileGrid:a.tileGrid,wrapX:void 0!==a.wrapX?a.wrapX:!0})}v(bx,pw);bx.prototype.Nc=function(a,b,c){var d=this.Sb(a,b,c);if(this.a.b.hasOwnProperty(d))return this.a.get(d);var e=Ma(this.tileGrid.gb(a));a=[a,b,c];b=(b=rw(this,a))?rw(this,b).toString():"";e=new cx(a,e,b);this.a.set(d,e);return e};function cx(a,b,c){Ls.call(this,a,2);this.c=b;this.Ia=c;this.a=null}v(cx,Ls);
cx.prototype.Y=function(){if(this.a)return this.a;var a=this.c,b=jd(a[0],a[1]);b.strokeStyle="black";b.strokeRect(.5,.5,a[0]+.5,a[1]+.5);b.fillStyle="black";b.textAlign="center";b.textBaseline="middle";b.font="24px sans-serif";b.fillText(this.Ia,a[0]/2,a[1]/2);return this.a=b.canvas};cx.prototype.load=function(){};function dx(a){this.f=null;X.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,projection:Tb("EPSG:3857"),reprojectionErrorThreshold:a.reprojectionErrorThreshold,state:"loading",tileLoadFunction:a.tileLoadFunction,wrapX:void 0!==a.wrapX?a.wrapX:!0});if(a.url)if(a.jsonp)gw(a.url,this.og.bind(this),this.Ve.bind(this));else{var b=new XMLHttpRequest;b.addEventListener("load",this.Ao.bind(this));b.addEventListener("error",this.zo.bind(this));b.open("GET",a.url);b.send()}else a.tileJSON?
this.og(a.tileJSON):xa(!1,51)}v(dx,X);k=dx.prototype;k.Ao=function(a){a=a.target;if(!a.status||200<=a.status&&300>a.status){try{var b=JSON.parse(a.responseText)}catch(c){this.Ve();return}this.og(b)}else this.Ve()};k.zo=function(){this.Ve()};k.pl=function(){return this.f};
k.og=function(a){var b=Tb("EPSG:4326"),c=this.c;if(a.bounds){var d=Vb(b,c);var e=sb(a.bounds,d)}var f=a.minzoom||0,d=a.maxzoom||22;this.tileGrid=c=xc({extent:zc(c),maxZoom:d,minZoom:f});this.tileUrlFunction=jw(a.tiles,c);if(void 0!==a.attribution&&!this.j){b=void 0!==e?e:b.G();e={};for(var g;f<=d;++f)g=f.toString(),e[g]=[oc(c,b,f)];this.ua([new Ac({html:a.attribution,tileRanges:e})])}this.f=a;bu(this,"ready")};k.Ve=function(){bu(this,"error")};function ex(a){pw.call(this,{projection:Tb("EPSG:3857"),state:"loading"});this.v=void 0!==a.preemptive?a.preemptive:!0;this.l=lw;this.g=void 0;this.f=a.jsonp||!1;if(a.url)if(this.f)gw(a.url,this.pg.bind(this),this.We.bind(this));else{var b=new XMLHttpRequest;b.addEventListener("load",this.Eo.bind(this));b.addEventListener("error",this.Do.bind(this));b.open("GET",a.url);b.send()}else a.tileJSON?this.pg(a.tileJSON):xa(!1,51)}v(ex,pw);k=ex.prototype;
k.Eo=function(a){a=a.target;if(!a.status||200<=a.status&&300>a.status){try{var b=JSON.parse(a.responseText)}catch(c){this.We();return}this.pg(b)}else this.We()};k.Do=function(){this.We()};k.ml=function(){return this.g};k.zk=function(a,b,c,d,e){this.tileGrid?(b=this.tileGrid.Be(a,b),fx(this.Nc(b[0],b[1],b[2],1,this.c),a,c,d,e)):!0===e?setTimeout(function(){c.call(d,null)},0):c.call(d,null)};k.We=function(){bu(this,"error")};
k.pg=function(a){var b=Tb("EPSG:4326"),c=this.c;if(a.bounds){var d=Vb(b,c);var e=sb(a.bounds,d)}var f=a.minzoom||0,d=a.maxzoom||22;this.tileGrid=c=xc({extent:zc(c),maxZoom:d,minZoom:f});this.g=a.template;var g=a.grids;if(g){this.l=jw(g,c);if(void 0!==a.attribution){b=void 0!==e?e:b.G();for(e={};f<=d;++f)g=f.toString(),e[g]=[oc(c,b,f)];this.ua([new Ac({html:a.attribution,tileRanges:e})])}bu(this,"ready")}else bu(this,"error")};
k.Nc=function(a,b,c,d,e){var f=this.Sb(a,b,c);if(this.a.b.hasOwnProperty(f))return this.a.get(f);a=[a,b,c];b=rw(this,a,e);d=this.l(b,d,e);d=new gx(a,void 0!==d?0:4,void 0!==d?d:"",this.tileGrid.Aa(a),this.v,this.f);this.a.set(f,d);return d};k.Ug=function(a,b,c){a=this.Sb(a,b,c);this.a.b.hasOwnProperty(a)&&this.a.get(a)};function gx(a,b,c,d,e,f){Ls.call(this,a,b);this.o=c;this.a=d;this.v=e;this.c=this.j=this.g=null;this.l=f}v(gx,Ls);k=gx.prototype;k.Y=function(){return null};
k.getData=function(a){if(!this.g||!this.j)return null;var b=this.g[Math.floor((1-(a[1]-this.a[1])/(this.a[3]-this.a[1]))*this.g.length)];if("string"!==typeof b)return null;b=b.charCodeAt(Math.floor((a[0]-this.a[0])/(this.a[2]-this.a[0])*b.length));93<=b&&b--;35<=b&&b--;b-=32;a=null;b in this.j&&(b=this.j[b],this.c&&b in this.c?a=this.c[b]:a=b);return a};
function fx(a,b,c,d,e){0==a.state&&!0===e?(Jc(a,"change",function(){c.call(d,this.getData(b))},a),hx(a)):!0===e?setTimeout(function(){c.call(d,this.getData(b))}.bind(a),0):c.call(d,a.getData(b))}k.bb=function(){return this.o};k.De=function(){this.state=3;this.s()};k.Ji=function(a){this.g=a.grid;this.j=a.keys;this.c=a.data;this.state=4;this.s()};
function hx(a){if(0==a.state)if(a.state=1,a.l)gw(a.o,a.Ji.bind(a),a.De.bind(a));else{var b=new XMLHttpRequest;b.addEventListener("load",a.Co.bind(a));b.addEventListener("error",a.Bo.bind(a));b.open("GET",a.o);b.send()}}k.Co=function(a){a=a.target;if(!a.status||200<=a.status&&300>a.status){try{var b=JSON.parse(a.responseText)}catch(c){this.De();return}this.Ji(b)}else this.De()};k.Bo=function(){this.De()};k.load=function(){this.v&&hx(this)};function ix(a){a=a||{};var b=a.params||{};X.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,opaque:!("TRANSPARENT"in b?b.TRANSPARENT:1),projection:a.projection,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction,url:a.url,urls:a.urls,wrapX:void 0!==a.wrapX?a.wrapX:!0});this.C=void 0!==a.gutter?a.gutter:0;this.f=b;this.l=!0;this.B=a.serverType;this.T=void 0!==a.hidpi?a.hidpi:!0;this.R="";
jx(this);this.fa=Oa();kx(this);qw(this,lx(this))}v(ix,X);k=ix.prototype;
k.Fo=function(a,b,c,d){c=Tb(c);var e=this.tileGrid;e||(e=this.Ta(c));b=e.Be(a,b);if(!(e.b.length<=b[0])){var f=e.Da(b[0]),g=e.Aa(b,this.fa),e=Ma(e.gb(b[0]),this.o),h=this.C;h&&(e=Ka(e,h,this.o),g=Qa(g,f*h,g));h={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:this.f.LAYERS};tb(h,this.f,d);d=Math.floor((g[3]-a[1])/f);h[this.l?"I":"X"]=Math.floor((a[0]-g[0])/f);h[this.l?"J":"Y"]=d;return mx(this,b,e,g,1,c,h)}};k.Xf=function(){return this.C};
k.Sb=function(a,b,c){return this.R+X.prototype.Sb.call(this,a,b,c)};k.Go=function(){return this.f};
function mx(a,b,c,d,e,f,g){var h=a.urls;if(h){g.WIDTH=c[0];g.HEIGHT=c[1];g[a.l?"CRS":"SRS"]=f.mb;"STYLES"in a.f||(g.STYLES="");if(1!=e)switch(a.B){case "geoserver":c=90*e+.5|0;g.FORMAT_OPTIONS="FORMAT_OPTIONS"in g?g.FORMAT_OPTIONS+(";dpi:"+c):"dpi:"+c;break;case "mapserver":g.MAP_RESOLUTION=90*e;break;case "carmentaserver":case "qgis":g.DPI=90*e;break;default:xa(!1,52)}f=f.b;a.l&&"ne"==f.substr(0,2)&&(a=d[0],d[0]=d[1],d[1]=a,a=d[2],d[2]=d[3],d[3]=a);g.BBOX=d.join(",");return Fw(1==h.length?h[0]:h[Ia((b[1]<<
b[0])+b[2],h.length)],g)}}k.nb=function(a){return this.T&&void 0!==this.B?a:1};function jx(a){var b=0,c=[];if(a.urls){var d;var e=0;for(d=a.urls.length;e<d;++e)c[b++]=a.urls[e]}a.R=c.join("#")}function lx(a){var b=0,c=[],d;for(d in a.f)c[b++]=d+"-"+a.f[d];return c.join("/")}
k.Fc=function(a,b,c){var d=this.tileGrid;d||(d=this.Ta(c));if(!(d.b.length<=a[0])){1==b||this.T&&void 0!==this.B||(b=1);var e=d.Da(a[0]),f=d.Aa(a,this.fa),d=Ma(d.gb(a[0]),this.o),g=this.C;g&&(d=Ka(d,g,this.o),f=Qa(f,e*g,f));1!=b&&(d=La(d,b,this.o));e={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};tb(e,this.f);return mx(this,a,d,f,b,c,e)}};k.eb=function(a){X.prototype.eb.call(this,a);jx(this)};k.Ho=function(a){tb(this.f,a);jx(this);kx(this);qw(this,lx(this))};
function kx(a){a.l=0<=Ye(a.f.VERSION||"1.3.0")};function nx(a,b,c,d,e,f,g,h,l,m,n,p,q,r){Ls.call(this,a,b);this.j=null;this.o={Nd:!1,Kg:null,mf:-1,Lg:-1};this.c=m;this.a=[];this.u=c;this.v=f;this.g=[];this.l=[];if(f){var u=l.Aa(f),x=l.Da(a[0]);h.Rf(u,h.tc(x),function(a){var b=pb(u,h.Aa(a));if(.5<=lb(b)/x&&.5<=mb(b)/x){var b=a.toString(),c=m[b];c||(c=g(a,n,p),c=m[b]=new q(a,void 0==c?4:0,void 0==c?"":c,d,e),this.l.push(y(c,"change",r)));c.j++;this.a.push(b)}}.bind(this))}}v(nx,Ls);
nx.prototype.ka=function(){for(var a=0,b=this.a.length;a<b;++a){var c=this.a[a],d=this.c[c];d.j--;d.j||(delete this.c[c],Nc(d))}this.a.length=0;this.c=null;1==this.state&&(this.g.forEach(Ec),this.g.length=0);this.i&&Nc(this.i);this.state=5;this.s();this.l.forEach(Ec);this.l.length=0;Ls.prototype.ka.call(this)};nx.prototype.Y=function(){return-1==this.o.Lg?null:this.j.canvas};nx.prototype.bb=function(){return this.a.join("/")+"/"+this.u};
nx.prototype.load=function(){var a=0,b=!1;0==this.state&&Ns(this,1);1==this.state&&this.a.forEach(function(c){var d=this.c[c];0==d.state?(d.Pg(this.S),d.load()):3==d.state?b=!0:4==d.state&&ma(this.a,c);if(1==d.state){var e=y(d,"change",function(){var f=d.getState();if(2==f||3==f)--a,Ec(e),ma(this.g,e),3==f&&(ma(this.a,c),b=!0),a||Ns(this,0<this.a.length?2:3)}.bind(this));this.g.push(e);++a}}.bind(this));a||setTimeout(function(){Ns(this,0<this.a.length?2:b?3:4)}.bind(this),0)};
function ox(a,b){a.Pg(Cl(b,a.o,a.$o.bind(a),a.Zo.bind(a)))};function px(a,b,c,d,e){Ls.call(this,a,b);this.j=0;this.o=d;this.g=null;this.c={};this.u=e;this.l=c}v(px,Ls);k=px.prototype;k.ka=function(){this.g=null;this.c={};this.state=5;this.s();Ls.prototype.ka.call(this)};k.Lm=function(){return this.o};k.Km=function(){return this.g};k.bb=function(){return this.l};k.Mm=function(){return this.a};k.load=function(){0==this.state&&(Ns(this,1),this.u(this,this.l),this.v(null,NaN,null))};k.$o=function(a,b){this.ig(b);this.mj(a)};k.Zo=function(){Ns(this,3)};
k.mj=function(a){this.g=a;Ns(this,2)};k.ig=function(a){this.a=a};k.Pg=function(a){this.v=a};function qx(a){tw.call(this,{attributions:a.attributions,cacheSize:void 0!==a.cacheSize?a.cacheSize:128,extent:a.extent,logo:a.logo,opaque:!1,projection:a.projection,state:a.state,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction?a.tileLoadFunction:ox,tileUrlFunction:a.tileUrlFunction,tilePixelRatio:a.tilePixelRatio,url:a.url,urls:a.urls,wrapX:void 0===a.wrapX?!0:a.wrapX});this.g=a.format?a.format:null;this.v={};this.l=void 0==a.overlaps?!0:a.overlaps;this.tileClass=a.tileClass?a.tileClass:
px;this.f={};this.tileGrid||(this.tileGrid=this.Ta(Tb(a.projection||"EPSG:3857")))}v(qx,tw);qx.prototype.Nc=function(a,b,c,d,e){var f=this.Sb(a,b,c);if(this.a.b.hasOwnProperty(f))return this.a.get(f);a=[a,b,c];c=(b=rw(this,a,e))?this.tileUrlFunction(b,d,e):void 0;d=new nx(a,void 0!==c?0:4,void 0!==c?c:"",this.g,this.tileLoadFunction,b,this.tileUrlFunction,this.tileGrid,this.Ta(e),this.v,d,e,this.tileClass,this.Li.bind(this));this.a.set(f,d);return d};
qx.prototype.Ta=function(a){var b=a.mb,c=this.f[b];c||(c=this.tileGrid,c=this.f[b]=wc(a,void 0,c?c.gb(c.minZoom):void 0));return c};qx.prototype.nb=function(a){return void 0==a?tw.prototype.nb.call(this,a):a};qx.prototype.Xd=function(a,b,c){a=Ma(this.Ta(c).gb(a));return[Math.round(a[0]*b),Math.round(a[1]*b)]};function rx(a){this.o=a.matrixIds;lc.call(this,{extent:a.extent,origin:a.origin,origins:a.origins,resolutions:a.resolutions,tileSize:a.tileSize,tileSizes:a.tileSizes,sizes:a.sizes})}v(rx,lc);rx.prototype.l=function(){return this.o};
function sx(a,b,c){var d=[],e=[],f=[],g=[],h=[],l=void 0!==c?c:[];c=Tb(a.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"));var m=c.sc(),n="ne"==c.b.substr(0,2);a.TileMatrix.sort(function(a,b){return b.ScaleDenominator-a.ScaleDenominator});a.TileMatrix.forEach(function(a){var b;0<l.length?b=na(l,function(b){return a.Identifier==b.TileMatrix}):b=!0;if(b){e.push(a.Identifier);b=2.8E-4*a.ScaleDenominator/m;var c=a.TileWidth,p=a.TileHeight;n?f.push([a.TopLeftCorner[1],a.TopLeftCorner[0]]):
f.push(a.TopLeftCorner);d.push(b);g.push(c==p?c:[c,p]);h.push([a.MatrixWidth,-a.MatrixHeight])}});return new rx({extent:b,origins:f,resolutions:d,matrixIds:e,tileSizes:g,sizes:h})};function Z(a){function b(a){a="KVP"==d?Fw(a,f):a.replace(/\{(\w+?)\}/g,function(a,b){return b.toLowerCase()in f?f[b.toLowerCase()]:a});return function(b){if(b){var c={TileMatrix:e.o[b[0]],TileCol:b[1],TileRow:-b[2]-1};tb(c,g);b=a;return b="KVP"==d?Fw(b,c):b.replace(/\{(\w+?)\}/g,function(a,b){return c[b]})}}}this.fa=void 0!==a.version?a.version:"1.0.0";this.C=void 0!==a.format?a.format:"image/jpeg";this.f=a.dimensions?a.dimensions:{};this.B=a.layer;this.l=a.matrixSet;this.R=a.style;var c=a.urls;void 0===
c&&void 0!==a.url&&(c=mw(a.url));var d=this.T=void 0!==a.requestEncoding?a.requestEncoding:"KVP",e=a.tileGrid,f={layer:this.B,style:this.R,tilematrixset:this.l};"KVP"==d&&tb(f,{Service:"WMTS",Request:"GetTile",Version:this.fa,Format:this.C});var g=this.f,h=c&&0<c.length?kw(c.map(b)):lw;X.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,projection:a.projection,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileClass:a.tileClass,tileGrid:e,
tileLoadFunction:a.tileLoadFunction,tilePixelRatio:a.tilePixelRatio,tileUrlFunction:h,urls:c,wrapX:void 0!==a.wrapX?a.wrapX:!1});qw(this,tx(this))}v(Z,X);k=Z.prototype;k.Mk=function(){return this.f};k.Io=function(){return this.C};k.Jo=function(){return this.B};k.$k=function(){return this.l};k.kl=function(){return this.T};k.Ko=function(){return this.R};k.rl=function(){return this.fa};function tx(a){var b=0,c=[],d;for(d in a.f)c[b++]=d+"-"+a.f[d];return c.join("/")}
k.uq=function(a){tb(this.f,a);qw(this,tx(this))};function ux(a){a=a||{};var b=a.size,c=b[0],d=b[1],e=[],f=256;switch(void 0!==a.tierSizeCalculation?a.tierSizeCalculation:vx){case vx:for(;c>f||d>f;)e.push([Math.ceil(c/f),Math.ceil(d/f)]),f+=f;break;case wx:for(;c>f||d>f;)e.push([Math.ceil(c/f),Math.ceil(d/f)]),c>>=1,d>>=1;break;default:xa(!1,53)}e.push([1,1]);e.reverse();for(var f=[1],g=[0],d=1,c=e.length;d<c;d++)f.push(1<<d),g.push(e[d-1][0]*e[d-1][1]+g[d-1]);f.reverse();b=[0,-b[1],b[0],0];b=new lc({extent:b,origin:ib(b),resolutions:f});(f=a.url)&&
-1==f.indexOf("{TileGroup}")&&(f+="{TileGroup}/{z}-{x}-{y}.jpg");f=mw(f);f=kw(f.map(function(a){return function(b){if(b){var c=b[0],d=b[1];b=-b[2]-1;var f={z:c,x:d,y:b,TileGroup:"TileGroup"+((d+b*e[c][0]+g[c])/256|0)};return a.replace(/\{(\w+?)\}/g,function(a,b){return f[b]})}}}));X.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,projection:a.projection,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileClass:xx,tileGrid:b,tileUrlFunction:f})}
v(ux,X);function xx(a,b,c,d,e){Os.call(this,a,b,c,d,e);this.a=null}v(xx,Os);xx.prototype.Y=function(){if(this.a)return this.a;var a=Os.prototype.Y.call(this);if(2==this.state){if(256==a.width&&256==a.height)return this.a=a;var b=jd(256,256);b.drawImage(a,0,0);return this.a=b.canvas}return a};var vx="default",wx="truncated";function yx(a,b){this.b=b;this.a=[{x:0,y:0,width:a,height:a}];this.c={};this.i=jd(a,a);this.f=this.i.canvas}yx.prototype.get=function(a){return this.c[a]||null};
yx.prototype.add=function(a,b,c,d,e){var f;var g=0;for(f=this.a.length;g<f;++g){var h=this.a[g];if(h.width>=b+this.b&&h.height>=c+this.b)return f={offsetX:h.x+this.b,offsetY:h.y+this.b,image:this.f},this.c[a]=f,d.call(e,this.i,h.x+this.b,h.y+this.b),a=g,b+=this.b,d=c+this.b,h.width-b>h.height-d?(c={x:h.x+b,y:h.y,width:h.width-b,height:h.height},b={x:h.x,y:h.y+d,width:b,height:h.height-d},zx(this,a,c,b)):(c={x:h.x+b,y:h.y,width:h.width-b,height:d},b={x:h.x,y:h.y+d,width:h.width,height:h.height-d},
zx(this,a,c,b)),f}return null};function zx(a,b,c,d){b=[b,1];0<c.width&&0<c.height&&b.push(c);0<d.width&&0<d.height&&b.push(d);a.a.splice.apply(a.a,b)};function Ax(a){a=a||{};this.a=void 0!==a.initialSize?a.initialSize:256;this.i=void 0!==a.maxSize?a.maxSize:void 0!==ea?ea:2048;this.b=void 0!==a.space?a.space:1;this.f=[new yx(this.a,this.b)];this.c=this.a;this.g=[new yx(this.c,this.b)]}Ax.prototype.add=function(a,b,c,d,e,f){if(b+this.b>this.i||c+this.b>this.i)return null;d=Bx(this,!1,a,b,c,d,f);if(!d)return null;a=Bx(this,!0,a,b,c,e?e:ua,f);return{offsetX:d.offsetX,offsetY:d.offsetY,image:d.image,Zl:a.image}};
function Bx(a,b,c,d,e,f,g){var h=b?a.g:a.f,l;var m=0;for(l=h.length;m<l;++m){var n=h[m];if(n=n.add(c,d,e,f,g))return n;n||m!==l-1||(b?(n=Math.min(2*a.c,a.i),a.c=n):(n=Math.min(2*a.a,a.i),a.a=n),n=new yx(n,a.b),h.push(n),++l)}return null};wa.prototype.code=wa.prototype.code;t("ol.Attribution",Ac);Ac.prototype.getHTML=Ac.prototype.i;t("ol.Collection",Yc);Yc.prototype.clear=Yc.prototype.clear;Yc.prototype.extend=Yc.prototype.fg;Yc.prototype.forEach=Yc.prototype.forEach;Yc.prototype.getArray=Yc.prototype.tm;Yc.prototype.item=Yc.prototype.item;Yc.prototype.getLength=Yc.prototype.dc;Yc.prototype.insertAt=Yc.prototype.He;Yc.prototype.pop=Yc.prototype.pop;Yc.prototype.push=Yc.prototype.push;Yc.prototype.remove=Yc.prototype.remove;
Yc.prototype.removeAt=Yc.prototype.Hg;Yc.prototype.setAt=Yc.prototype.Wp;bd.prototype.element=bd.prototype.element;t("ol.color.asArray",ed);t("ol.color.asString",gd);t("ol.colorlike.asColorLike",id);t("ol.control.defaults",xd);t("ol.coordinate.add",Ze);t("ol.coordinate.createStringXY",function(a){return function(b){return lf(b,a)}});t("ol.coordinate.format",cf);t("ol.coordinate.rotate",ef);t("ol.coordinate.toStringHDMS",function(a,b){return a?bf("NS",a[1],b)+" "+bf("EW",a[0],b):""});
t("ol.coordinate.toStringXY",lf);t("ol.DeviceOrientation",Rk);Rk.prototype.getAlpha=Rk.prototype.Fk;Rk.prototype.getBeta=Rk.prototype.Ik;Rk.prototype.getGamma=Rk.prototype.Ok;Rk.prototype.getHeading=Rk.prototype.um;Rk.prototype.getTracking=Rk.prototype.Th;Rk.prototype.setTracking=Rk.prototype.gg;t("ol.easing.easeIn",qd);t("ol.easing.easeOut",rd);t("ol.easing.inAndOut",sd);t("ol.easing.linear",td);t("ol.easing.upAndDown",function(a){return.5>a?sd(2*a):1-sd(2*(a-.5))});
t("ol.extent.boundingExtent",Na);t("ol.extent.buffer",Qa);t("ol.extent.containsCoordinate",Ta);t("ol.extent.containsExtent",Va);t("ol.extent.containsXY",Ua);t("ol.extent.createEmpty",Oa);t("ol.extent.equals",bb);t("ol.extent.extend",cb);t("ol.extent.getArea",jb);t("ol.extent.getBottomLeft",eb);t("ol.extent.getBottomRight",gb);t("ol.extent.getCenter",nb);t("ol.extent.getHeight",mb);t("ol.extent.getIntersection",pb);t("ol.extent.getSize",function(a){return[a[2]-a[0],a[3]-a[1]]});
t("ol.extent.getTopLeft",ib);t("ol.extent.getTopRight",hb);t("ol.extent.getWidth",lb);t("ol.extent.intersects",qb);t("ol.extent.isEmpty",kb);t("ol.extent.applyTransform",sb);t("ol.Feature",H);H.prototype.clone=H.prototype.clone;H.prototype.getGeometry=H.prototype.V;H.prototype.getId=H.prototype.wm;H.prototype.getGeometryName=H.prototype.Qk;H.prototype.getStyle=H.prototype.xm;H.prototype.getStyleFunction=H.prototype.Lc;H.prototype.setGeometry=H.prototype.Ra;H.prototype.setStyle=H.prototype.hg;
H.prototype.setId=H.prototype.jc;H.prototype.setGeometryName=H.prototype.Tc;t("ol.featureloader.xhr",Dl);t("ol.Geolocation",xs);xs.prototype.getAccuracy=xs.prototype.Dk;xs.prototype.getAccuracyGeometry=xs.prototype.Ek;xs.prototype.getAltitude=xs.prototype.Gk;xs.prototype.getAltitudeAccuracy=xs.prototype.Hk;xs.prototype.getHeading=xs.prototype.ym;xs.prototype.getPosition=xs.prototype.zm;xs.prototype.getProjection=xs.prototype.Uh;xs.prototype.getSpeed=xs.prototype.ll;xs.prototype.getTracking=xs.prototype.Vh;
xs.prototype.getTrackingOptions=xs.prototype.Gh;xs.prototype.setProjection=xs.prototype.Wh;xs.prototype.setTracking=xs.prototype.Ke;xs.prototype.setTrackingOptions=xs.prototype.wj;t("ol.Graticule",Ds);Ds.prototype.getMap=Ds.prototype.Cm;Ds.prototype.getMeridians=Ds.prototype.al;Ds.prototype.getParallels=Ds.prototype.hl;Ds.prototype.setMap=Ds.prototype.setMap;t("ol.has.DEVICE_PIXEL_RATIO",Sd);t("ol.has.CANVAS",Ud);t("ol.has.DEVICE_ORIENTATION",Vd);t("ol.has.GEOLOCATION",Wd);t("ol.has.TOUCH",Xd);
t("ol.has.WEBGL",Md);Js.prototype.getImage=Js.prototype.Y;Js.prototype.load=Js.prototype.load;Os.prototype.getImage=Os.prototype.Y;t("ol.inherits",v);t("ol.interaction.defaults",qh);t("ol.Kinetic",kg);t("ol.loadingstrategy.all",Zt);t("ol.loadingstrategy.bbox",function(a){return[a]});t("ol.loadingstrategy.tile",function(a){return function(b,c){c=a.tc(c);b=oc(a,b,c);var d=[];c=[c,0,0];for(c[1]=b.ca;c[1]<=b.$;++c[1])for(c[2]=b.da;c[2]<=b.ia;++c[2])d.push(a.Aa(c));return d}});t("ol.Map",G);
G.prototype.addControl=G.prototype.kk;G.prototype.addInteraction=G.prototype.lk;G.prototype.addLayer=G.prototype.ih;G.prototype.addOverlay=G.prototype.jh;G.prototype.forEachFeatureAtPixel=G.prototype.we;G.prototype.forEachLayerAtPixel=G.prototype.Im;G.prototype.hasFeatureAtPixel=G.prototype.Yl;G.prototype.getEventCoordinate=G.prototype.Tf;G.prototype.getEventPixel=G.prototype.xe;G.prototype.getTarget=G.prototype.ag;G.prototype.getTargetElement=G.prototype.jd;G.prototype.getCoordinateFromPixel=G.prototype.Wa;
G.prototype.getControls=G.prototype.Lk;G.prototype.getOverlays=G.prototype.fl;G.prototype.getOverlayById=G.prototype.el;G.prototype.getInteractions=G.prototype.Sk;G.prototype.getLayerGroup=G.prototype.Kc;G.prototype.getLayers=G.prototype.Xh;G.prototype.getPixelFromCoordinate=G.prototype.Ja;G.prototype.getSize=G.prototype.Ob;G.prototype.getView=G.prototype.Z;G.prototype.getViewport=G.prototype.sl;G.prototype.renderSync=G.prototype.Tp;G.prototype.render=G.prototype.render;
G.prototype.removeControl=G.prototype.Mp;G.prototype.removeInteraction=G.prototype.Np;G.prototype.removeLayer=G.prototype.Pp;G.prototype.removeOverlay=G.prototype.Qp;G.prototype.setLayerGroup=G.prototype.qj;G.prototype.setSize=G.prototype.Qg;G.prototype.setTarget=G.prototype.Le;G.prototype.setView=G.prototype.iq;G.prototype.updateSize=G.prototype.Ad;Jd.prototype.originalEvent=Jd.prototype.originalEvent;Jd.prototype.pixel=Jd.prototype.pixel;Jd.prototype.coordinate=Jd.prototype.coordinate;
Jd.prototype.dragging=Jd.prototype.dragging;Id.prototype.map=Id.prototype.map;Id.prototype.frameState=Id.prototype.frameState;t("ol.Object",Tc);Tc.prototype.get=Tc.prototype.get;Tc.prototype.getKeys=Tc.prototype.O;Tc.prototype.getProperties=Tc.prototype.N;Tc.prototype.set=Tc.prototype.set;Tc.prototype.setProperties=Tc.prototype.H;Tc.prototype.unset=Tc.prototype.P;Xc.prototype.key=Xc.prototype.key;Xc.prototype.oldValue=Xc.prototype.oldValue;t("ol.Observable",Sc);
t("ol.Observable.unByKey",function(a){if(Array.isArray(a))for(var b=0,c=a.length;b<c;++b)Ec(a[b]);else Ec(a)});Sc.prototype.changed=Sc.prototype.s;Sc.prototype.dispatchEvent=Sc.prototype.b;Sc.prototype.getRevision=Sc.prototype.L;Sc.prototype.on=Sc.prototype.J;Sc.prototype.once=Sc.prototype.once;Sc.prototype.un=Sc.prototype.K;t("ol.Overlay",sk);sk.prototype.getElement=sk.prototype.Rd;sk.prototype.getId=sk.prototype.Jm;sk.prototype.getMap=sk.prototype.Me;sk.prototype.getOffset=sk.prototype.Dh;
sk.prototype.getPosition=sk.prototype.Yh;sk.prototype.getPositioning=sk.prototype.Eh;sk.prototype.setElement=sk.prototype.lj;sk.prototype.setMap=sk.prototype.setMap;sk.prototype.setOffset=sk.prototype.rj;sk.prototype.setPosition=sk.prototype.Ne;sk.prototype.setPositioning=sk.prototype.uj;t("ol.proj.METERS_PER_UNIT",zb);t("ol.proj.setProj4",function(a){Ab=a});t("ol.proj.getPointResolution",Sb);t("ol.proj.addEquivalentProjections",Wb);t("ol.proj.addProjection",Xb);
t("ol.proj.addCoordinateTransforms",ac);t("ol.proj.fromLonLat",function(a,b){return gc(a,"EPSG:4326",void 0!==b?b:"EPSG:3857")});t("ol.proj.toLonLat",function(a,b){return gc(a,void 0!==b?b:"EPSG:3857","EPSG:4326")});t("ol.proj.get",Tb);t("ol.proj.equivalent",dc);t("ol.proj.getTransform",ec);t("ol.proj.transform",gc);t("ol.proj.transformExtent",hc);
t("ol.render.toContext",function(a,b){var c=a.canvas,d=b?b:{};b=d.pixelRatio||Sd;if(d=d.size)c.width=d[0]*b,c.height=d[1]*b,c.style.width=d[0]+"px",c.style.height=d[1]+"px";c=[0,0,c.width,c.height];d=Ih(Bh(),b,b);return new Xh(a,b,c,d,0)});t("ol.size.toSize",Ma);t("ol.Sphere",xb);xb.prototype.geodesicArea=xb.prototype.a;xb.prototype.haversineDistance=xb.prototype.b;Ls.prototype.getTileCoord=Ls.prototype.f;Ls.prototype.load=Ls.prototype.load;t("ol.tilegrid.createXYZ",xc);px.prototype.getFormat=px.prototype.Lm;
px.prototype.getFeatures=px.prototype.Km;px.prototype.getProjection=px.prototype.Mm;px.prototype.setFeatures=px.prototype.mj;px.prototype.setProjection=px.prototype.ig;px.prototype.setLoader=px.prototype.Pg;t("ol.View",F);F.prototype.animate=F.prototype.animate;F.prototype.getAnimating=F.prototype.Ic;F.prototype.getInteracting=F.prototype.Rk;F.prototype.cancelAnimations=F.prototype.ed;F.prototype.constrainCenter=F.prototype.Ec;F.prototype.constrainResolution=F.prototype.constrainResolution;
F.prototype.constrainRotation=F.prototype.constrainRotation;F.prototype.getCenter=F.prototype.wa;F.prototype.calculateExtent=F.prototype.dd;F.prototype.getMaxResolution=F.prototype.Nm;F.prototype.getMinResolution=F.prototype.Pm;F.prototype.getMaxZoom=F.prototype.Om;F.prototype.setMaxZoom=F.prototype.eq;F.prototype.getMinZoom=F.prototype.Qm;F.prototype.setMinZoom=F.prototype.fq;F.prototype.getProjection=F.prototype.Rm;F.prototype.getResolution=F.prototype.Pa;F.prototype.getResolutions=F.prototype.Sm;
F.prototype.getResolutionForExtent=F.prototype.ze;F.prototype.getRotation=F.prototype.Qa;F.prototype.getZoom=F.prototype.Hh;F.prototype.getZoomForResolution=F.prototype.Ce;F.prototype.fit=F.prototype.Qf;F.prototype.centerOn=F.prototype.uk;F.prototype.rotate=F.prototype.rotate;F.prototype.setCenter=F.prototype.ob;F.prototype.setResolution=F.prototype.Vc;F.prototype.setRotation=F.prototype.Oe;F.prototype.setZoom=F.prototype.lq;t("ol.xml.getAllTextContent",kl);t("ol.xml.parse",pl);
Oi.prototype.getGL=Oi.prototype.Wo;Oi.prototype.useProgram=Oi.prototype.Qc;t("ol.tilegrid.TileGrid",lc);lc.prototype.forEachTileCoord=lc.prototype.Rf;lc.prototype.getMaxZoom=lc.prototype.Ti;lc.prototype.getMinZoom=lc.prototype.Ui;lc.prototype.getOrigin=lc.prototype.Pc;lc.prototype.getResolution=lc.prototype.Da;lc.prototype.getResolutions=lc.prototype.Vi;lc.prototype.getTileCoordExtent=lc.prototype.Aa;lc.prototype.getTileCoordForCoordAndResolution=lc.prototype.Be;
lc.prototype.getTileCoordForCoordAndZ=lc.prototype.bg;lc.prototype.getTileSize=lc.prototype.gb;lc.prototype.getZForResolution=lc.prototype.tc;t("ol.tilegrid.WMTS",rx);rx.prototype.getMatrixIds=rx.prototype.l;t("ol.tilegrid.WMTS.createFromCapabilitiesMatrixSet",sx);t("ol.style.AtlasManager",Ax);t("ol.style.Circle",$k);$k.prototype.setRadius=$k.prototype.Uc;t("ol.style.Fill",al);al.prototype.clone=al.prototype.clone;al.prototype.getColor=al.prototype.i;al.prototype.setColor=al.prototype.c;
t("ol.style.Icon",eo);eo.prototype.clone=eo.prototype.clone;eo.prototype.getAnchor=eo.prototype.Hc;eo.prototype.getColor=eo.prototype.Lo;eo.prototype.getImage=eo.prototype.Y;eo.prototype.getOrigin=eo.prototype.Oc;eo.prototype.getSrc=eo.prototype.Mo;eo.prototype.getSize=eo.prototype.ic;eo.prototype.load=eo.prototype.load;t("ol.style.Image",Xk);Xk.prototype.getOpacity=Xk.prototype.Ze;Xk.prototype.getRotateWithView=Xk.prototype.$e;Xk.prototype.getRotation=Xk.prototype.af;Xk.prototype.getScale=Xk.prototype.bf;
Xk.prototype.getSnapToPixel=Xk.prototype.Ae;Xk.prototype.setOpacity=Xk.prototype.td;Xk.prototype.setRotation=Xk.prototype.cf;Xk.prototype.setScale=Xk.prototype.ud;t("ol.style.RegularShape",Yk);Yk.prototype.clone=Yk.prototype.clone;Yk.prototype.getAnchor=Yk.prototype.Hc;Yk.prototype.getAngle=Yk.prototype.Pi;Yk.prototype.getFill=Yk.prototype.Fa;Yk.prototype.getImage=Yk.prototype.Y;Yk.prototype.getOrigin=Yk.prototype.Oc;Yk.prototype.getPoints=Yk.prototype.Qi;Yk.prototype.getRadius=Yk.prototype.Ri;
Yk.prototype.getRadius2=Yk.prototype.Fh;Yk.prototype.getSize=Yk.prototype.ic;Yk.prototype.getStroke=Yk.prototype.Ga;t("ol.style.Stroke",wj);wj.prototype.clone=wj.prototype.clone;wj.prototype.getColor=wj.prototype.No;wj.prototype.getLineCap=wj.prototype.Vk;wj.prototype.getLineDash=wj.prototype.Oo;wj.prototype.getLineDashOffset=wj.prototype.Wk;wj.prototype.getLineJoin=wj.prototype.Xk;wj.prototype.getMiterLimit=wj.prototype.bl;wj.prototype.getWidth=wj.prototype.Po;wj.prototype.setColor=wj.prototype.Qo;
wj.prototype.setLineCap=wj.prototype.aq;wj.prototype.setLineDash=wj.prototype.setLineDash;wj.prototype.setLineDashOffset=wj.prototype.bq;wj.prototype.setLineJoin=wj.prototype.cq;wj.prototype.setMiterLimit=wj.prototype.gq;wj.prototype.setWidth=wj.prototype.jq;t("ol.style.Style",bl);bl.prototype.clone=bl.prototype.clone;bl.prototype.getGeometry=bl.prototype.V;bl.prototype.getGeometryFunction=bl.prototype.Pk;bl.prototype.getFill=bl.prototype.Fa;bl.prototype.setFill=bl.prototype.pf;
bl.prototype.getImage=bl.prototype.Y;bl.prototype.setImage=bl.prototype.Og;bl.prototype.getStroke=bl.prototype.Ga;bl.prototype.setStroke=bl.prototype.qf;bl.prototype.getText=bl.prototype.Na;bl.prototype.setText=bl.prototype.xd;bl.prototype.getZIndex=bl.prototype.Ba;bl.prototype.setGeometry=bl.prototype.Ra;bl.prototype.setZIndex=bl.prototype.Vb;t("ol.style.Text",fo);fo.prototype.clone=fo.prototype.clone;fo.prototype.getFont=fo.prototype.Nk;fo.prototype.getOffsetX=fo.prototype.cl;
fo.prototype.getOffsetY=fo.prototype.dl;fo.prototype.getFill=fo.prototype.Fa;fo.prototype.getRotateWithView=fo.prototype.Ro;fo.prototype.getRotation=fo.prototype.So;fo.prototype.getScale=fo.prototype.To;fo.prototype.getStroke=fo.prototype.Ga;fo.prototype.getText=fo.prototype.Na;fo.prototype.getTextAlign=fo.prototype.nl;fo.prototype.getTextBaseline=fo.prototype.ol;fo.prototype.setFont=fo.prototype.nj;fo.prototype.setOffsetX=fo.prototype.sj;fo.prototype.setOffsetY=fo.prototype.tj;
fo.prototype.setFill=fo.prototype.pf;fo.prototype.setRotation=fo.prototype.Uo;fo.prototype.setScale=fo.prototype.Si;fo.prototype.setStroke=fo.prototype.qf;fo.prototype.setText=fo.prototype.xd;fo.prototype.setTextAlign=fo.prototype.vj;fo.prototype.setTextBaseline=fo.prototype.hq;t("ol.source.BingMaps",xw);t("ol.source.BingMaps.TOS_ATTRIBUTION",yw);xw.prototype.getApiKey=xw.prototype.T;xw.prototype.getImagerySet=xw.prototype.fa;t("ol.source.CartoDB",Aw);Aw.prototype.getConfig=Aw.prototype.Kk;
Aw.prototype.updateConfig=Aw.prototype.tq;Aw.prototype.setConfig=Aw.prototype.Xp;t("ol.source.Cluster",Y);Y.prototype.getDistance=Y.prototype.$n;Y.prototype.getSource=Y.prototype.ao;Y.prototype.setDistance=Y.prototype.Yp;t("ol.source.Image",Hv);Jv.prototype.image=Jv.prototype.image;t("ol.source.ImageArcGISRest",Gw);Gw.prototype.getParams=Gw.prototype.co;Gw.prototype.getImageLoadFunction=Gw.prototype.bo;Gw.prototype.getUrl=Gw.prototype.eo;Gw.prototype.setImageLoadFunction=Gw.prototype.fo;
Gw.prototype.setUrl=Gw.prototype.ho;Gw.prototype.updateParams=Gw.prototype.io;t("ol.source.ImageCanvas",Ov);t("ol.source.ImageMapGuide",Hw);Hw.prototype.getParams=Hw.prototype.ko;Hw.prototype.getImageLoadFunction=Hw.prototype.jo;Hw.prototype.updateParams=Hw.prototype.mo;Hw.prototype.setImageLoadFunction=Hw.prototype.lo;t("ol.source.ImageStatic",Iw);t("ol.source.ImageVector",Pv);Pv.prototype.getSource=Pv.prototype.no;Pv.prototype.getStyle=Pv.prototype.oo;Pv.prototype.getStyleFunction=Pv.prototype.po;
Pv.prototype.setStyle=Pv.prototype.Ii;t("ol.source.ImageWMS",Jw);Jw.prototype.getGetFeatureInfoUrl=Jw.prototype.so;Jw.prototype.getParams=Jw.prototype.uo;Jw.prototype.getImageLoadFunction=Jw.prototype.to;Jw.prototype.getUrl=Jw.prototype.vo;Jw.prototype.setImageLoadFunction=Jw.prototype.wo;Jw.prototype.setUrl=Jw.prototype.xo;Jw.prototype.updateParams=Jw.prototype.yo;t("ol.source.OSM",Nw);t("ol.source.OSM.ATTRIBUTION",Ow);t("ol.source.Raster",Pw);Pw.prototype.setOperation=Pw.prototype.v;
Tw.prototype.extent=Tw.prototype.extent;Tw.prototype.resolution=Tw.prototype.resolution;Tw.prototype.data=Tw.prototype.data;t("ol.source.Source",$t);$t.prototype.getAttributions=$t.prototype.ya;$t.prototype.getLogo=$t.prototype.xa;$t.prototype.getProjection=$t.prototype.za;$t.prototype.getState=$t.prototype.getState;$t.prototype.refresh=$t.prototype.sa;$t.prototype.setAttributions=$t.prototype.ua;t("ol.source.Stamen",Ww);t("ol.source.Tile",pw);pw.prototype.getTileGrid=pw.prototype.ab;
sw.prototype.tile=sw.prototype.tile;t("ol.source.TileArcGISRest",$w);$w.prototype.getParams=$w.prototype.C;$w.prototype.updateParams=$w.prototype.B;t("ol.source.TileDebug",bx);t("ol.source.TileImage",X);X.prototype.setRenderReprojectionEdges=X.prototype.Pb;X.prototype.setTileGridForProjection=X.prototype.Qb;t("ol.source.TileJSON",dx);dx.prototype.getTileJSON=dx.prototype.pl;t("ol.source.TileUTFGrid",ex);ex.prototype.getTemplate=ex.prototype.ml;ex.prototype.forDataAtCoordinateAndResolution=ex.prototype.zk;
t("ol.source.TileWMS",ix);ix.prototype.getGetFeatureInfoUrl=ix.prototype.Fo;ix.prototype.getParams=ix.prototype.Go;ix.prototype.updateParams=ix.prototype.Ho;tw.prototype.getTileLoadFunction=tw.prototype.pb;tw.prototype.getTileUrlFunction=tw.prototype.qb;tw.prototype.getUrls=tw.prototype.rb;tw.prototype.setTileLoadFunction=tw.prototype.vb;tw.prototype.setTileUrlFunction=tw.prototype.cb;tw.prototype.setUrl=tw.prototype.jb;tw.prototype.setUrls=tw.prototype.eb;t("ol.source.Vector",U);
U.prototype.addFeature=U.prototype.yb;U.prototype.addFeatures=U.prototype.cd;U.prototype.clear=U.prototype.clear;U.prototype.forEachFeature=U.prototype.sh;U.prototype.forEachFeatureInExtent=U.prototype.$b;U.prototype.forEachFeatureIntersectingExtent=U.prototype.th;U.prototype.getFeaturesCollection=U.prototype.Ah;U.prototype.getFeatures=U.prototype.Xe;U.prototype.getFeaturesAtCoordinate=U.prototype.zh;U.prototype.getFeaturesInExtent=U.prototype.Uf;U.prototype.getClosestFeatureToCoordinate=U.prototype.vh;
U.prototype.getExtent=U.prototype.G;U.prototype.getFeatureById=U.prototype.yh;U.prototype.getFormat=U.prototype.Mi;U.prototype.getUrl=U.prototype.Ni;U.prototype.removeFeature=U.prototype.Gb;gu.prototype.feature=gu.prototype.feature;t("ol.source.VectorTile",qx);t("ol.source.WMTS",Z);Z.prototype.getDimensions=Z.prototype.Mk;Z.prototype.getFormat=Z.prototype.Io;Z.prototype.getLayer=Z.prototype.Jo;Z.prototype.getMatrixSet=Z.prototype.$k;Z.prototype.getRequestEncoding=Z.prototype.kl;
Z.prototype.getStyle=Z.prototype.Ko;Z.prototype.getVersion=Z.prototype.rl;Z.prototype.updateDimensions=Z.prototype.uq;
t("ol.source.WMTS.optionsFromCapabilities",function(a,b){var c=na(a.Contents.Layer,function(a){return a.Identifier==b.layer});if(null===c)return null;var d=a.Contents.TileMatrixSet;var e=1<c.TileMatrixSetLink.length?"projection"in b?sa(c.TileMatrixSetLink,function(a){var c=na(d,function(b){return b.Identifier==a.TileMatrixSet}).SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"),e=Tb(c),f=Tb(b.projection);return e&&f?dc(e,f):c==b.projection}):sa(c.TileMatrixSetLink,function(a){return a.TileMatrixSet==
b.matrixSet}):0;0>e&&(e=0);var f=c.TileMatrixSetLink[e].TileMatrixSet;var g=c.TileMatrixSetLink[e].TileMatrixSetLimits;var h=c.Format[0];"format"in b&&(h=b.format);e=sa(c.Style,function(a){return"style"in b?a.Title==b.style:a.isDefault});0>e&&(e=0);e=c.Style[e].Identifier;var l={};"Dimension"in c&&c.Dimension.forEach(function(a){var b=a.Identifier,c=a.Default;void 0===c&&(c=a.Value[0]);l[b]=c});var m=na(a.Contents.TileMatrixSet,function(a){return a.Identifier==f});var n="projection"in b?Tb(b.projection):
Tb(m.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"));var p=c.WGS84BoundingBox;if(void 0!==p){var q=Tb("EPSG:4326").G();q=p[0]==q[0]&&p[2]==q[2];var r=hc(p,"EPSG:4326",n);(p=n.G())&&(Va(p,r)||(r=void 0))}g=sx(m,r,g);var u=[],m=b.requestEncoding,m=void 0!==m?m:"";if("OperationsMetadata"in a&&"GetTile"in a.OperationsMetadata)for(a=a.OperationsMetadata.GetTile.DCP.HTTP.Get,r=0,p=a.length;r<p;++r){var x=na(a[r].Constraint,function(a){return"GetEncoding"==a.name}).AllowedValues.Value;
""===m&&(m=x[0]);if("KVP"===m)ja(x,"KVP")&&u.push(a[r].href);else break}u.length||(m="REST",c.ResourceURL.forEach(function(a){"tile"===a.resourceType&&(h=a.format,u.push(a.template))}));return{urls:u,layer:b.layer,matrixSet:f,format:h,projection:n,requestEncoding:m,tileGrid:g,style:e,dimensions:l,wrapX:q,crossOrigin:b.crossOrigin}});t("ol.source.XYZ",zw);t("ol.source.Zoomify",ux);Rh.prototype.vectorContext=Rh.prototype.vectorContext;Rh.prototype.frameState=Rh.prototype.frameState;
Rh.prototype.context=Rh.prototype.context;Rh.prototype.glContext=Rh.prototype.glContext;kq.prototype.get=kq.prototype.get;kq.prototype.getExtent=kq.prototype.G;kq.prototype.getId=kq.prototype.Wn;kq.prototype.getGeometry=kq.prototype.V;kq.prototype.getProperties=kq.prototype.Xn;kq.prototype.getType=kq.prototype.U;t("ol.render.VectorContext",Wh);kk.prototype.setStyle=kk.prototype.rd;kk.prototype.drawGeometry=kk.prototype.zb;kk.prototype.drawFeature=kk.prototype.te;Xh.prototype.drawCircle=Xh.prototype.Zb;
Xh.prototype.setStyle=Xh.prototype.rd;Xh.prototype.drawGeometry=Xh.prototype.zb;Xh.prototype.drawFeature=Xh.prototype.te;t("ol.proj.common.add",ic);t("ol.proj.Projection",Bb);Bb.prototype.getCode=Bb.prototype.Jk;Bb.prototype.getExtent=Bb.prototype.G;Bb.prototype.getUnits=Bb.prototype.Un;Bb.prototype.getMetersPerUnit=Bb.prototype.sc;Bb.prototype.getWorldExtent=Bb.prototype.tl;Bb.prototype.isGlobal=Bb.prototype.dm;Bb.prototype.setGlobal=Bb.prototype.$p;Bb.prototype.setExtent=Bb.prototype.Vn;
Bb.prototype.setWorldExtent=Bb.prototype.kq;Bb.prototype.setGetPointResolution=Bb.prototype.Zp;t("ol.proj.Units.METERS_PER_UNIT",zb);t("ol.layer.Base",sh);sh.prototype.getExtent=sh.prototype.G;sh.prototype.getMaxResolution=sh.prototype.fc;sh.prototype.getMinResolution=sh.prototype.gc;sh.prototype.getOpacity=sh.prototype.hc;sh.prototype.getVisible=sh.prototype.Mb;sh.prototype.getZIndex=sh.prototype.Ba;sh.prototype.setExtent=sh.prototype.vc;sh.prototype.setMaxResolution=sh.prototype.Ac;
sh.prototype.setMinResolution=sh.prototype.Bc;sh.prototype.setOpacity=sh.prototype.wc;sh.prototype.setVisible=sh.prototype.xc;sh.prototype.setZIndex=sh.prototype.Vb;t("ol.layer.Group",uh);uh.prototype.getLayers=uh.prototype.qd;uh.prototype.setLayers=uh.prototype.xi;t("ol.layer.Heatmap",V);V.prototype.getBlur=V.prototype.uh;V.prototype.getGradient=V.prototype.Bh;V.prototype.getRadius=V.prototype.yi;V.prototype.setBlur=V.prototype.jj;V.prototype.setGradient=V.prototype.pj;V.prototype.setRadius=V.prototype.Uc;
t("ol.layer.Image",Uv);Uv.prototype.getSource=Uv.prototype.ha;t("ol.layer.Layer",wh);wh.prototype.getSource=wh.prototype.ha;wh.prototype.setMap=wh.prototype.setMap;wh.prototype.setSource=wh.prototype.Wc;t("ol.layer.Tile",cw);cw.prototype.getPreload=cw.prototype.Ud;cw.prototype.getSource=cw.prototype.ha;cw.prototype.setPreload=cw.prototype.zi;cw.prototype.getUseInterimTilesOnError=cw.prototype.kd;cw.prototype.setUseInterimTilesOnError=cw.prototype.Ai;t("ol.layer.Vector",T);T.prototype.getSource=T.prototype.ha;
T.prototype.getStyle=T.prototype.D;T.prototype.getStyleFunction=T.prototype.C;T.prototype.setStyle=T.prototype.g;t("ol.layer.VectorTile",W);W.prototype.getPreload=W.prototype.Ud;W.prototype.getUseInterimTilesOnError=W.prototype.kd;W.prototype.setPreload=W.prototype.Bi;W.prototype.setUseInterimTilesOnError=W.prototype.Ci;t("ol.interaction.DoubleClickZoom",rg);t("ol.interaction.DoubleClickZoom.handleEvent",sg);t("ol.interaction.DragAndDrop",Rs);t("ol.interaction.DragAndDrop.handleEvent",mf);
Us.prototype.features=Us.prototype.features;Us.prototype.file=Us.prototype.file;Us.prototype.projection=Us.prototype.projection;t("ol.interaction.DragBox",Rg);Rg.prototype.getGeometry=Rg.prototype.V;Wg.prototype.coordinate=Wg.prototype.coordinate;Wg.prototype.mapBrowserEvent=Wg.prototype.mapBrowserEvent;t("ol.interaction.DragPan",Gg);t("ol.interaction.DragRotate",Kg);t("ol.interaction.DragRotateAndZoom",Ys);t("ol.interaction.DragZoom",$g);t("ol.interaction.Draw",ju);
t("ol.interaction.Draw.handleEvent",lu);ju.prototype.removeLastPoint=ju.prototype.Op;ju.prototype.finishDrawing=ju.prototype.Pd;ju.prototype.extend=ju.prototype.vn;t("ol.interaction.Draw.createRegularPolygon",function(a,b){return function(c,d){var e=c[0];c=c[1];var f=Math.sqrt(hf(e,c));d=d?d:Zf(new ys(e),a);$f(d,e,f,b?b:Math.atan((c[1]-e[1])/(c[0]-e[0])));return d}});
t("ol.interaction.Draw.createBox",function(){return function(a,b){a=Na(a);b=b||new D(null);b.ma([[eb(a),gb(a),hb(a),ib(a),eb(a)]]);return b}});zu.prototype.feature=zu.prototype.feature;t("ol.interaction.Extent",Au);Au.prototype.getExtent=Au.prototype.G;Au.prototype.setExtent=Au.prototype.g;Lu.prototype.extent_=Lu.prototype.b;t("ol.interaction.Interaction",ng);ng.prototype.getActive=ng.prototype.c;ng.prototype.getMap=ng.prototype.f;ng.prototype.setActive=ng.prototype.Ha;
t("ol.interaction.KeyboardPan",ah);t("ol.interaction.KeyboardPan.handleEvent",bh);t("ol.interaction.KeyboardZoom",ch);t("ol.interaction.KeyboardZoom.handleEvent",dh);t("ol.interaction.Modify",Nu);t("ol.interaction.Modify.handleEvent",Qu);Nu.prototype.removePoint=Nu.prototype.hj;Vu.prototype.features=Vu.prototype.features;Vu.prototype.mapBrowserEvent=Vu.prototype.mapBrowserEvent;t("ol.interaction.MouseWheelZoom",eh);t("ol.interaction.MouseWheelZoom.handleEvent",fh);eh.prototype.setMouseAnchor=eh.prototype.T;
t("ol.interaction.PinchRotate",ih);t("ol.interaction.PinchZoom",mh);t("ol.interaction.Pointer",Dg);t("ol.interaction.Pointer.handleEvent",Eg);t("ol.interaction.Select",cv);cv.prototype.getFeatures=cv.prototype.Gn;cv.prototype.getHitTolerance=cv.prototype.Hn;cv.prototype.getLayer=cv.prototype.In;t("ol.interaction.Select.handleEvent",dv);cv.prototype.setHitTolerance=cv.prototype.Kn;cv.prototype.setMap=cv.prototype.setMap;fv.prototype.selected=fv.prototype.selected;fv.prototype.deselected=fv.prototype.deselected;
fv.prototype.mapBrowserEvent=fv.prototype.mapBrowserEvent;t("ol.interaction.Snap",hv);hv.prototype.addFeature=hv.prototype.yb;hv.prototype.removeFeature=hv.prototype.Gb;t("ol.interaction.Translate",mv);mv.prototype.getHitTolerance=mv.prototype.B;mv.prototype.setHitTolerance=mv.prototype.I;sv.prototype.features=sv.prototype.features;sv.prototype.coordinate=sv.prototype.coordinate;t("ol.geom.Circle",ys);ys.prototype.clone=ys.prototype.clone;ys.prototype.getCenter=ys.prototype.wa;
ys.prototype.getRadius=ys.prototype.pd;ys.prototype.getType=ys.prototype.U;ys.prototype.intersectsExtent=ys.prototype.Xa;ys.prototype.setCenter=ys.prototype.ob;ys.prototype.setCenterAndRadius=ys.prototype.Ng;ys.prototype.setRadius=ys.prototype.Uc;ys.prototype.transform=ys.prototype.tb;t("ol.geom.Geometry",of);of.prototype.getClosestPoint=of.prototype.Ab;of.prototype.intersectsCoordinate=of.prototype.sb;of.prototype.getExtent=of.prototype.G;of.prototype.rotate=of.prototype.rotate;
of.prototype.scale=of.prototype.scale;of.prototype.simplify=of.prototype.Rb;of.prototype.transform=of.prototype.tb;t("ol.geom.GeometryCollection",tm);tm.prototype.clone=tm.prototype.clone;tm.prototype.getGeometries=tm.prototype.Vf;tm.prototype.getType=tm.prototype.U;tm.prototype.intersectsExtent=tm.prototype.Xa;tm.prototype.setGeometries=tm.prototype.oj;tm.prototype.applyTransform=tm.prototype.Dc;tm.prototype.translate=tm.prototype.translate;t("ol.geom.LinearRing",Jf);Jf.prototype.clone=Jf.prototype.clone;
Jf.prototype.getArea=Jf.prototype.qn;Jf.prototype.getCoordinates=Jf.prototype.X;Jf.prototype.getType=Jf.prototype.U;Jf.prototype.setCoordinates=Jf.prototype.ma;t("ol.geom.LineString",O);O.prototype.appendCoordinate=O.prototype.mk;O.prototype.clone=O.prototype.clone;O.prototype.forEachSegment=O.prototype.Ck;O.prototype.getCoordinateAtM=O.prototype.nn;O.prototype.getCoordinates=O.prototype.X;O.prototype.getCoordinateAt=O.prototype.wh;O.prototype.getLength=O.prototype.pn;O.prototype.getType=O.prototype.U;
O.prototype.intersectsExtent=O.prototype.Xa;O.prototype.setCoordinates=O.prototype.ma;t("ol.geom.MultiLineString",P);P.prototype.appendLineString=P.prototype.nk;P.prototype.clone=P.prototype.clone;P.prototype.getCoordinateAtM=P.prototype.rn;P.prototype.getCoordinates=P.prototype.X;P.prototype.getLineString=P.prototype.Yk;P.prototype.getLineStrings=P.prototype.gd;P.prototype.getType=P.prototype.U;P.prototype.intersectsExtent=P.prototype.Xa;P.prototype.setCoordinates=P.prototype.ma;
t("ol.geom.MultiPoint",Q);Q.prototype.appendPoint=Q.prototype.qk;Q.prototype.clone=Q.prototype.clone;Q.prototype.getCoordinates=Q.prototype.X;Q.prototype.getPoint=Q.prototype.il;Q.prototype.getPoints=Q.prototype.Zd;Q.prototype.getType=Q.prototype.U;Q.prototype.intersectsExtent=Q.prototype.Xa;Q.prototype.setCoordinates=Q.prototype.ma;t("ol.geom.MultiPolygon",R);R.prototype.appendPolygon=R.prototype.rk;R.prototype.clone=R.prototype.clone;R.prototype.getArea=R.prototype.sn;
R.prototype.getCoordinates=R.prototype.X;R.prototype.getInteriorPoints=R.prototype.Uk;R.prototype.getPolygon=R.prototype.jl;R.prototype.getPolygons=R.prototype.Td;R.prototype.getType=R.prototype.U;R.prototype.intersectsExtent=R.prototype.Xa;R.prototype.setCoordinates=R.prototype.ma;t("ol.geom.Point",C);C.prototype.clone=C.prototype.clone;C.prototype.getCoordinates=C.prototype.X;C.prototype.getType=C.prototype.U;C.prototype.intersectsExtent=C.prototype.Xa;C.prototype.setCoordinates=C.prototype.ma;
t("ol.geom.Polygon",D);D.prototype.appendLinearRing=D.prototype.pk;D.prototype.clone=D.prototype.clone;D.prototype.getArea=D.prototype.tn;D.prototype.getCoordinates=D.prototype.X;D.prototype.getInteriorPoint=D.prototype.Tk;D.prototype.getLinearRingCount=D.prototype.Zk;D.prototype.getLinearRing=D.prototype.Ch;D.prototype.getLinearRings=D.prototype.Sd;D.prototype.getType=D.prototype.U;D.prototype.intersectsExtent=D.prototype.Xa;D.prototype.setCoordinates=D.prototype.ma;
t("ol.geom.Polygon.circular",Xf);t("ol.geom.Polygon.fromExtent",Yf);t("ol.geom.Polygon.fromCircle",Zf);t("ol.geom.SimpleGeometry",rf);rf.prototype.getFirstCoordinate=rf.prototype.ac;rf.prototype.getLastCoordinate=rf.prototype.bc;rf.prototype.getLayout=rf.prototype.cc;rf.prototype.applyTransform=rf.prototype.Dc;rf.prototype.translate=rf.prototype.translate;t("ol.format.EsriJSON",Ql);Ql.prototype.readFeature=Ql.prototype.Tb;Ql.prototype.readFeatures=Ql.prototype.Oa;Ql.prototype.readGeometry=Ql.prototype.Sc;
Ql.prototype.readProjection=Ql.prototype.kb;Ql.prototype.writeGeometry=Ql.prototype.$c;Ql.prototype.writeGeometryObject=Ql.prototype.je;Ql.prototype.writeFeature=Ql.prototype.Bd;Ql.prototype.writeFeatureObject=Ql.prototype.Zc;Ql.prototype.writeFeatures=Ql.prototype.Wb;Ql.prototype.writeFeaturesObject=Ql.prototype.he;t("ol.format.Feature",El);t("ol.format.filter.and",rm);
t("ol.format.filter.or",function(a){var b=[null].concat(Array.prototype.slice.call(arguments));return new (Function.prototype.bind.apply(pm,b))});t("ol.format.filter.not",function(a){return new nm(a)});t("ol.format.filter.bbox",sm);t("ol.format.filter.intersects",function(a,b,c){return new hm(a,b,c)});t("ol.format.filter.within",function(a,b,c){return new qm(a,b,c)});t("ol.format.filter.equalTo",function(a,b,c){return new dm(a,b,c)});
t("ol.format.filter.notEqualTo",function(a,b,c){return new om(a,b,c)});t("ol.format.filter.lessThan",function(a,b){return new lm(a,b)});t("ol.format.filter.lessThanOrEqualTo",function(a,b){return new mm(a,b)});t("ol.format.filter.greaterThan",function(a,b){return new em(a,b)});t("ol.format.filter.greaterThanOrEqualTo",function(a,b){return new fm(a,b)});t("ol.format.filter.isNull",function(a){return new km(a)});t("ol.format.filter.between",function(a,b,c){return new im(a,b,c)});
t("ol.format.filter.like",function(a,b,c,d,e,f){return new jm(a,b,c,d,e,f)});t("ol.format.filter.during",function(a,b,c){return new bm(a,b,c)});t("ol.format.GeoJSON",xm);xm.prototype.readFeature=xm.prototype.Tb;xm.prototype.readFeatures=xm.prototype.Oa;xm.prototype.readGeometry=xm.prototype.Sc;xm.prototype.readProjection=xm.prototype.kb;xm.prototype.writeFeature=xm.prototype.Bd;xm.prototype.writeFeatureObject=xm.prototype.Zc;xm.prototype.writeFeatures=xm.prototype.Wb;
xm.prototype.writeFeaturesObject=xm.prototype.he;xm.prototype.writeGeometry=xm.prototype.$c;xm.prototype.writeGeometryObject=xm.prototype.je;t("ol.format.GML",Sm);Sm.prototype.writeFeatures=Sm.prototype.Wb;Sm.prototype.writeFeaturesNode=Sm.prototype.Xb;t("ol.format.GML2",an);t("ol.format.GML3",Sm);Sm.prototype.writeGeometryNode=Sm.prototype.ie;Sm.prototype.writeFeatures=Sm.prototype.Wb;Sm.prototype.writeFeaturesNode=Sm.prototype.Xb;Fm.prototype.readFeatures=Fm.prototype.Oa;t("ol.format.GPX",mn);
mn.prototype.readFeature=mn.prototype.Tb;mn.prototype.readFeatures=mn.prototype.Oa;mn.prototype.readProjection=mn.prototype.kb;mn.prototype.writeFeatures=mn.prototype.Wb;mn.prototype.writeFeaturesNode=mn.prototype.Xb;t("ol.format.IGC",Xn);Xn.prototype.readFeature=Xn.prototype.Tb;Xn.prototype.readFeatures=Xn.prototype.Oa;Xn.prototype.readProjection=Xn.prototype.kb;t("ol.format.KML",go);go.prototype.readFeature=go.prototype.Tb;go.prototype.readFeatures=go.prototype.Oa;go.prototype.readName=go.prototype.Cp;
go.prototype.readNetworkLinks=go.prototype.Dp;go.prototype.readRegion=go.prototype.Gp;go.prototype.readRegionFromNode=go.prototype.lf;go.prototype.readProjection=go.prototype.kb;go.prototype.writeFeatures=go.prototype.Wb;go.prototype.writeFeaturesNode=go.prototype.Xb;t("ol.format.MVT",lq);lq.prototype.readFeatures=lq.prototype.Oa;lq.prototype.readProjection=lq.prototype.kb;lq.prototype.setLayers=lq.prototype.mn;t("ol.format.OSMXML",nq);nq.prototype.readFeatures=nq.prototype.Oa;
nq.prototype.readProjection=nq.prototype.kb;t("ol.format.Polyline",Nq);t("ol.format.Polyline.encodeDeltas",Oq);t("ol.format.Polyline.decodeDeltas",Qq);t("ol.format.Polyline.encodeFloats",Pq);t("ol.format.Polyline.decodeFloats",Rq);Nq.prototype.readFeature=Nq.prototype.Tb;Nq.prototype.readFeatures=Nq.prototype.Oa;Nq.prototype.readGeometry=Nq.prototype.Sc;Nq.prototype.readProjection=Nq.prototype.kb;Nq.prototype.writeGeometry=Nq.prototype.$c;t("ol.format.TopoJSON",Sq);Sq.prototype.readFeatures=Sq.prototype.Oa;
Sq.prototype.readProjection=Sq.prototype.kb;t("ol.format.WFS",Yq);Yq.prototype.readFeatures=Yq.prototype.Oa;Yq.prototype.readTransactionResponse=Yq.prototype.j;Yq.prototype.readFeatureCollectionMetadata=Yq.prototype.g;t("ol.format.WFS.writeFilter",function(a){var b=jl("http://www.opengis.net/ogc","Filter");Bl({node:b},mr,wl(a.kc),[a],[]);return b});Yq.prototype.writeGetFeature=Yq.prototype.l;Yq.prototype.writeTransaction=Yq.prototype.v;Yq.prototype.readProjection=Yq.prototype.kb;
t("ol.format.WKT",sr);sr.prototype.readFeature=sr.prototype.Tb;sr.prototype.readFeatures=sr.prototype.Oa;sr.prototype.readGeometry=sr.prototype.Sc;sr.prototype.writeFeature=sr.prototype.Bd;sr.prototype.writeFeatures=sr.prototype.Wb;sr.prototype.writeGeometry=sr.prototype.$c;t("ol.format.WMSCapabilities",Lr);Lr.prototype.read=Lr.prototype.read;t("ol.format.WMSGetFeatureInfo",hs);hs.prototype.readFeatures=hs.prototype.Oa;t("ol.format.WMTSCapabilities",is);is.prototype.read=is.prototype.read;
t("ol.format.filter.And",Zl);t("ol.format.filter.Bbox",$l);t("ol.format.filter.Comparison",am);t("ol.format.filter.ComparisonBinary",cm);t("ol.format.filter.During",bm);t("ol.format.filter.EqualTo",dm);t("ol.format.filter.Filter",Xl);t("ol.format.filter.GreaterThan",em);t("ol.format.filter.GreaterThanOrEqualTo",fm);t("ol.format.filter.Intersects",hm);t("ol.format.filter.IsBetween",im);t("ol.format.filter.IsLike",jm);t("ol.format.filter.IsNull",km);t("ol.format.filter.LessThan",lm);
t("ol.format.filter.LessThanOrEqualTo",mm);t("ol.format.filter.Not",nm);t("ol.format.filter.NotEqualTo",om);t("ol.format.filter.Or",pm);t("ol.format.filter.Spatial",gm);t("ol.format.filter.Within",qm);t("ol.events.condition.altKeyOnly",function(a){a=a.originalEvent;return a.altKey&&!(a.metaKey||a.ctrlKey)&&!a.shiftKey});t("ol.events.condition.altShiftKeysOnly",tg);t("ol.events.condition.always",mf);t("ol.events.condition.click",function(a){return"click"==a.type});t("ol.events.condition.never",nf);
t("ol.events.condition.pointerMove",vg);t("ol.events.condition.singleClick",wg);t("ol.events.condition.doubleClick",function(a){return"dblclick"==a.type});t("ol.events.condition.noModifierKeys",xg);t("ol.events.condition.platformModifierKeyOnly",function(a){a=a.originalEvent;return!a.altKey&&(Rd?a.metaKey:a.ctrlKey)&&!a.shiftKey});t("ol.events.condition.shiftKeyOnly",yg);t("ol.events.condition.targetNotEditable",Ag);t("ol.events.condition.mouseOnly",Bg);t("ol.events.condition.primaryAction",Cg);
Oc.prototype.type=Oc.prototype.type;Oc.prototype.target=Oc.prototype.target;Oc.prototype.preventDefault=Oc.prototype.preventDefault;Oc.prototype.stopPropagation=Oc.prototype.stopPropagation;t("ol.control.Attribution",nd);t("ol.control.Attribution.render",od);nd.prototype.getCollapsible=nd.prototype.Um;nd.prototype.setCollapsible=nd.prototype.Xm;nd.prototype.setCollapsed=nd.prototype.Wm;nd.prototype.getCollapsed=nd.prototype.Tm;t("ol.control.Control",md);md.prototype.getMap=md.prototype.g;
md.prototype.setMap=md.prototype.setMap;md.prototype.setTarget=md.prototype.f;t("ol.control.FullScreen",yd);t("ol.control.MousePosition",Dd);t("ol.control.MousePosition.render",Ed);Dd.prototype.getCoordinateFormat=Dd.prototype.xh;Dd.prototype.getProjection=Dd.prototype.Zh;Dd.prototype.setCoordinateFormat=Dd.prototype.kj;Dd.prototype.setProjection=Dd.prototype.$h;t("ol.control.OverviewMap",Bk);t("ol.control.OverviewMap.render",Ck);Bk.prototype.getCollapsible=Bk.prototype.$m;
Bk.prototype.setCollapsible=Bk.prototype.cn;Bk.prototype.setCollapsed=Bk.prototype.bn;Bk.prototype.getCollapsed=Bk.prototype.Zm;Bk.prototype.getOverviewMap=Bk.prototype.gl;t("ol.control.Rotate",ud);t("ol.control.Rotate.render",vd);t("ol.control.ScaleLine",Gk);Gk.prototype.getUnits=Gk.prototype.C;t("ol.control.ScaleLine.render",Hk);Gk.prototype.setUnits=Gk.prototype.I;t("ol.control.Zoom",wd);t("ol.control.ZoomSlider",Lk);t("ol.control.ZoomSlider.render",Nk);t("ol.control.ZoomToExtent",Qk);
Tc.prototype.changed=Tc.prototype.s;Tc.prototype.dispatchEvent=Tc.prototype.b;Tc.prototype.getRevision=Tc.prototype.L;Tc.prototype.on=Tc.prototype.J;Tc.prototype.once=Tc.prototype.once;Tc.prototype.un=Tc.prototype.K;Yc.prototype.get=Yc.prototype.get;Yc.prototype.getKeys=Yc.prototype.O;Yc.prototype.getProperties=Yc.prototype.N;Yc.prototype.set=Yc.prototype.set;Yc.prototype.setProperties=Yc.prototype.H;Yc.prototype.unset=Yc.prototype.P;Yc.prototype.changed=Yc.prototype.s;
Yc.prototype.dispatchEvent=Yc.prototype.b;Yc.prototype.getRevision=Yc.prototype.L;Yc.prototype.on=Yc.prototype.J;Yc.prototype.once=Yc.prototype.once;Yc.prototype.un=Yc.prototype.K;bd.prototype.type=bd.prototype.type;bd.prototype.target=bd.prototype.target;bd.prototype.preventDefault=bd.prototype.preventDefault;bd.prototype.stopPropagation=bd.prototype.stopPropagation;Rk.prototype.get=Rk.prototype.get;Rk.prototype.getKeys=Rk.prototype.O;Rk.prototype.getProperties=Rk.prototype.N;Rk.prototype.set=Rk.prototype.set;
Rk.prototype.setProperties=Rk.prototype.H;Rk.prototype.unset=Rk.prototype.P;Rk.prototype.changed=Rk.prototype.s;Rk.prototype.dispatchEvent=Rk.prototype.b;Rk.prototype.getRevision=Rk.prototype.L;Rk.prototype.on=Rk.prototype.J;Rk.prototype.once=Rk.prototype.once;Rk.prototype.un=Rk.prototype.K;H.prototype.get=H.prototype.get;H.prototype.getKeys=H.prototype.O;H.prototype.getProperties=H.prototype.N;H.prototype.set=H.prototype.set;H.prototype.setProperties=H.prototype.H;H.prototype.unset=H.prototype.P;
H.prototype.changed=H.prototype.s;H.prototype.dispatchEvent=H.prototype.b;H.prototype.getRevision=H.prototype.L;H.prototype.on=H.prototype.J;H.prototype.once=H.prototype.once;H.prototype.un=H.prototype.K;xs.prototype.get=xs.prototype.get;xs.prototype.getKeys=xs.prototype.O;xs.prototype.getProperties=xs.prototype.N;xs.prototype.set=xs.prototype.set;xs.prototype.setProperties=xs.prototype.H;xs.prototype.unset=xs.prototype.P;xs.prototype.changed=xs.prototype.s;xs.prototype.dispatchEvent=xs.prototype.b;
xs.prototype.getRevision=xs.prototype.L;xs.prototype.on=xs.prototype.J;xs.prototype.once=xs.prototype.once;xs.prototype.un=xs.prototype.K;Os.prototype.getTileCoord=Os.prototype.f;Os.prototype.load=Os.prototype.load;G.prototype.get=G.prototype.get;G.prototype.getKeys=G.prototype.O;G.prototype.getProperties=G.prototype.N;G.prototype.set=G.prototype.set;G.prototype.setProperties=G.prototype.H;G.prototype.unset=G.prototype.P;G.prototype.changed=G.prototype.s;G.prototype.dispatchEvent=G.prototype.b;
G.prototype.getRevision=G.prototype.L;G.prototype.on=G.prototype.J;G.prototype.once=G.prototype.once;G.prototype.un=G.prototype.K;Id.prototype.type=Id.prototype.type;Id.prototype.target=Id.prototype.target;Id.prototype.preventDefault=Id.prototype.preventDefault;Id.prototype.stopPropagation=Id.prototype.stopPropagation;Jd.prototype.map=Jd.prototype.map;Jd.prototype.frameState=Jd.prototype.frameState;Jd.prototype.type=Jd.prototype.type;Jd.prototype.target=Jd.prototype.target;
Jd.prototype.preventDefault=Jd.prototype.preventDefault;Jd.prototype.stopPropagation=Jd.prototype.stopPropagation;ee.prototype.originalEvent=ee.prototype.originalEvent;ee.prototype.pixel=ee.prototype.pixel;ee.prototype.coordinate=ee.prototype.coordinate;ee.prototype.dragging=ee.prototype.dragging;ee.prototype.preventDefault=ee.prototype.preventDefault;ee.prototype.stopPropagation=ee.prototype.stopPropagation;ee.prototype.map=ee.prototype.map;ee.prototype.frameState=ee.prototype.frameState;
ee.prototype.type=ee.prototype.type;ee.prototype.target=ee.prototype.target;Xc.prototype.type=Xc.prototype.type;Xc.prototype.target=Xc.prototype.target;Xc.prototype.preventDefault=Xc.prototype.preventDefault;Xc.prototype.stopPropagation=Xc.prototype.stopPropagation;sk.prototype.get=sk.prototype.get;sk.prototype.getKeys=sk.prototype.O;sk.prototype.getProperties=sk.prototype.N;sk.prototype.set=sk.prototype.set;sk.prototype.setProperties=sk.prototype.H;sk.prototype.unset=sk.prototype.P;
sk.prototype.changed=sk.prototype.s;sk.prototype.dispatchEvent=sk.prototype.b;sk.prototype.getRevision=sk.prototype.L;sk.prototype.on=sk.prototype.J;sk.prototype.once=sk.prototype.once;sk.prototype.un=sk.prototype.K;nx.prototype.getTileCoord=nx.prototype.f;nx.prototype.load=nx.prototype.load;px.prototype.getTileCoord=px.prototype.f;px.prototype.load=px.prototype.load;F.prototype.get=F.prototype.get;F.prototype.getKeys=F.prototype.O;F.prototype.getProperties=F.prototype.N;F.prototype.set=F.prototype.set;
F.prototype.setProperties=F.prototype.H;F.prototype.unset=F.prototype.P;F.prototype.changed=F.prototype.s;F.prototype.dispatchEvent=F.prototype.b;F.prototype.getRevision=F.prototype.L;F.prototype.on=F.prototype.J;F.prototype.once=F.prototype.once;F.prototype.un=F.prototype.K;rx.prototype.forEachTileCoord=rx.prototype.Rf;rx.prototype.getMaxZoom=rx.prototype.Ti;rx.prototype.getMinZoom=rx.prototype.Ui;rx.prototype.getOrigin=rx.prototype.Pc;rx.prototype.getResolution=rx.prototype.Da;
rx.prototype.getResolutions=rx.prototype.Vi;rx.prototype.getTileCoordExtent=rx.prototype.Aa;rx.prototype.getTileCoordForCoordAndResolution=rx.prototype.Be;rx.prototype.getTileCoordForCoordAndZ=rx.prototype.bg;rx.prototype.getTileSize=rx.prototype.gb;rx.prototype.getZForResolution=rx.prototype.tc;Yk.prototype.getOpacity=Yk.prototype.Ze;Yk.prototype.getRotateWithView=Yk.prototype.$e;Yk.prototype.getRotation=Yk.prototype.af;Yk.prototype.getScale=Yk.prototype.bf;Yk.prototype.getSnapToPixel=Yk.prototype.Ae;
Yk.prototype.setOpacity=Yk.prototype.td;Yk.prototype.setRotation=Yk.prototype.cf;Yk.prototype.setScale=Yk.prototype.ud;$k.prototype.clone=$k.prototype.clone;$k.prototype.getAngle=$k.prototype.Pi;$k.prototype.getFill=$k.prototype.Fa;$k.prototype.getPoints=$k.prototype.Qi;$k.prototype.getRadius=$k.prototype.Ri;$k.prototype.getRadius2=$k.prototype.Fh;$k.prototype.getStroke=$k.prototype.Ga;$k.prototype.getOpacity=$k.prototype.Ze;$k.prototype.getRotateWithView=$k.prototype.$e;
$k.prototype.getRotation=$k.prototype.af;$k.prototype.getScale=$k.prototype.bf;$k.prototype.getSnapToPixel=$k.prototype.Ae;$k.prototype.setOpacity=$k.prototype.td;$k.prototype.setRotation=$k.prototype.cf;$k.prototype.setScale=$k.prototype.ud;eo.prototype.getOpacity=eo.prototype.Ze;eo.prototype.getRotateWithView=eo.prototype.$e;eo.prototype.getRotation=eo.prototype.af;eo.prototype.getScale=eo.prototype.bf;eo.prototype.getSnapToPixel=eo.prototype.Ae;eo.prototype.setOpacity=eo.prototype.td;
eo.prototype.setRotation=eo.prototype.cf;eo.prototype.setScale=eo.prototype.ud;$t.prototype.get=$t.prototype.get;$t.prototype.getKeys=$t.prototype.O;$t.prototype.getProperties=$t.prototype.N;$t.prototype.set=$t.prototype.set;$t.prototype.setProperties=$t.prototype.H;$t.prototype.unset=$t.prototype.P;$t.prototype.changed=$t.prototype.s;$t.prototype.dispatchEvent=$t.prototype.b;$t.prototype.getRevision=$t.prototype.L;$t.prototype.on=$t.prototype.J;$t.prototype.once=$t.prototype.once;
$t.prototype.un=$t.prototype.K;pw.prototype.getAttributions=pw.prototype.ya;pw.prototype.getLogo=pw.prototype.xa;pw.prototype.getProjection=pw.prototype.za;pw.prototype.getState=pw.prototype.getState;pw.prototype.refresh=pw.prototype.sa;pw.prototype.setAttributions=pw.prototype.ua;pw.prototype.get=pw.prototype.get;pw.prototype.getKeys=pw.prototype.O;pw.prototype.getProperties=pw.prototype.N;pw.prototype.set=pw.prototype.set;pw.prototype.setProperties=pw.prototype.H;pw.prototype.unset=pw.prototype.P;
pw.prototype.changed=pw.prototype.s;pw.prototype.dispatchEvent=pw.prototype.b;pw.prototype.getRevision=pw.prototype.L;pw.prototype.on=pw.prototype.J;pw.prototype.once=pw.prototype.once;pw.prototype.un=pw.prototype.K;tw.prototype.getTileGrid=tw.prototype.ab;tw.prototype.refresh=tw.prototype.sa;tw.prototype.getAttributions=tw.prototype.ya;tw.prototype.getLogo=tw.prototype.xa;tw.prototype.getProjection=tw.prototype.za;tw.prototype.getState=tw.prototype.getState;tw.prototype.setAttributions=tw.prototype.ua;
tw.prototype.get=tw.prototype.get;tw.prototype.getKeys=tw.prototype.O;tw.prototype.getProperties=tw.prototype.N;tw.prototype.set=tw.prototype.set;tw.prototype.setProperties=tw.prototype.H;tw.prototype.unset=tw.prototype.P;tw.prototype.changed=tw.prototype.s;tw.prototype.dispatchEvent=tw.prototype.b;tw.prototype.getRevision=tw.prototype.L;tw.prototype.on=tw.prototype.J;tw.prototype.once=tw.prototype.once;tw.prototype.un=tw.prototype.K;X.prototype.getTileLoadFunction=X.prototype.pb;
X.prototype.getTileUrlFunction=X.prototype.qb;X.prototype.getUrls=X.prototype.rb;X.prototype.setTileLoadFunction=X.prototype.vb;X.prototype.setTileUrlFunction=X.prototype.cb;X.prototype.setUrl=X.prototype.jb;X.prototype.setUrls=X.prototype.eb;X.prototype.getTileGrid=X.prototype.ab;X.prototype.refresh=X.prototype.sa;X.prototype.getAttributions=X.prototype.ya;X.prototype.getLogo=X.prototype.xa;X.prototype.getProjection=X.prototype.za;X.prototype.getState=X.prototype.getState;
X.prototype.setAttributions=X.prototype.ua;X.prototype.get=X.prototype.get;X.prototype.getKeys=X.prototype.O;X.prototype.getProperties=X.prototype.N;X.prototype.set=X.prototype.set;X.prototype.setProperties=X.prototype.H;X.prototype.unset=X.prototype.P;X.prototype.changed=X.prototype.s;X.prototype.dispatchEvent=X.prototype.b;X.prototype.getRevision=X.prototype.L;X.prototype.on=X.prototype.J;X.prototype.once=X.prototype.once;X.prototype.un=X.prototype.K;xw.prototype.setRenderReprojectionEdges=xw.prototype.Pb;
xw.prototype.setTileGridForProjection=xw.prototype.Qb;xw.prototype.getTileLoadFunction=xw.prototype.pb;xw.prototype.getTileUrlFunction=xw.prototype.qb;xw.prototype.getUrls=xw.prototype.rb;xw.prototype.setTileLoadFunction=xw.prototype.vb;xw.prototype.setTileUrlFunction=xw.prototype.cb;xw.prototype.setUrl=xw.prototype.jb;xw.prototype.setUrls=xw.prototype.eb;xw.prototype.getTileGrid=xw.prototype.ab;xw.prototype.refresh=xw.prototype.sa;xw.prototype.getAttributions=xw.prototype.ya;
xw.prototype.getLogo=xw.prototype.xa;xw.prototype.getProjection=xw.prototype.za;xw.prototype.getState=xw.prototype.getState;xw.prototype.setAttributions=xw.prototype.ua;xw.prototype.get=xw.prototype.get;xw.prototype.getKeys=xw.prototype.O;xw.prototype.getProperties=xw.prototype.N;xw.prototype.set=xw.prototype.set;xw.prototype.setProperties=xw.prototype.H;xw.prototype.unset=xw.prototype.P;xw.prototype.changed=xw.prototype.s;xw.prototype.dispatchEvent=xw.prototype.b;xw.prototype.getRevision=xw.prototype.L;
xw.prototype.on=xw.prototype.J;xw.prototype.once=xw.prototype.once;xw.prototype.un=xw.prototype.K;zw.prototype.setRenderReprojectionEdges=zw.prototype.Pb;zw.prototype.setTileGridForProjection=zw.prototype.Qb;zw.prototype.getTileLoadFunction=zw.prototype.pb;zw.prototype.getTileUrlFunction=zw.prototype.qb;zw.prototype.getUrls=zw.prototype.rb;zw.prototype.setTileLoadFunction=zw.prototype.vb;zw.prototype.setTileUrlFunction=zw.prototype.cb;zw.prototype.setUrl=zw.prototype.jb;zw.prototype.setUrls=zw.prototype.eb;
zw.prototype.getTileGrid=zw.prototype.ab;zw.prototype.refresh=zw.prototype.sa;zw.prototype.getAttributions=zw.prototype.ya;zw.prototype.getLogo=zw.prototype.xa;zw.prototype.getProjection=zw.prototype.za;zw.prototype.getState=zw.prototype.getState;zw.prototype.setAttributions=zw.prototype.ua;zw.prototype.get=zw.prototype.get;zw.prototype.getKeys=zw.prototype.O;zw.prototype.getProperties=zw.prototype.N;zw.prototype.set=zw.prototype.set;zw.prototype.setProperties=zw.prototype.H;zw.prototype.unset=zw.prototype.P;
zw.prototype.changed=zw.prototype.s;zw.prototype.dispatchEvent=zw.prototype.b;zw.prototype.getRevision=zw.prototype.L;zw.prototype.on=zw.prototype.J;zw.prototype.once=zw.prototype.once;zw.prototype.un=zw.prototype.K;Aw.prototype.setRenderReprojectionEdges=Aw.prototype.Pb;Aw.prototype.setTileGridForProjection=Aw.prototype.Qb;Aw.prototype.getTileLoadFunction=Aw.prototype.pb;Aw.prototype.getTileUrlFunction=Aw.prototype.qb;Aw.prototype.getUrls=Aw.prototype.rb;Aw.prototype.setTileLoadFunction=Aw.prototype.vb;
Aw.prototype.setTileUrlFunction=Aw.prototype.cb;Aw.prototype.setUrl=Aw.prototype.jb;Aw.prototype.setUrls=Aw.prototype.eb;Aw.prototype.getTileGrid=Aw.prototype.ab;Aw.prototype.refresh=Aw.prototype.sa;Aw.prototype.getAttributions=Aw.prototype.ya;Aw.prototype.getLogo=Aw.prototype.xa;Aw.prototype.getProjection=Aw.prototype.za;Aw.prototype.getState=Aw.prototype.getState;Aw.prototype.setAttributions=Aw.prototype.ua;Aw.prototype.get=Aw.prototype.get;Aw.prototype.getKeys=Aw.prototype.O;
Aw.prototype.getProperties=Aw.prototype.N;Aw.prototype.set=Aw.prototype.set;Aw.prototype.setProperties=Aw.prototype.H;Aw.prototype.unset=Aw.prototype.P;Aw.prototype.changed=Aw.prototype.s;Aw.prototype.dispatchEvent=Aw.prototype.b;Aw.prototype.getRevision=Aw.prototype.L;Aw.prototype.on=Aw.prototype.J;Aw.prototype.once=Aw.prototype.once;Aw.prototype.un=Aw.prototype.K;U.prototype.getAttributions=U.prototype.ya;U.prototype.getLogo=U.prototype.xa;U.prototype.getProjection=U.prototype.za;
U.prototype.getState=U.prototype.getState;U.prototype.refresh=U.prototype.sa;U.prototype.setAttributions=U.prototype.ua;U.prototype.get=U.prototype.get;U.prototype.getKeys=U.prototype.O;U.prototype.getProperties=U.prototype.N;U.prototype.set=U.prototype.set;U.prototype.setProperties=U.prototype.H;U.prototype.unset=U.prototype.P;U.prototype.changed=U.prototype.s;U.prototype.dispatchEvent=U.prototype.b;U.prototype.getRevision=U.prototype.L;U.prototype.on=U.prototype.J;U.prototype.once=U.prototype.once;
U.prototype.un=U.prototype.K;Y.prototype.addFeature=Y.prototype.yb;Y.prototype.addFeatures=Y.prototype.cd;Y.prototype.clear=Y.prototype.clear;Y.prototype.forEachFeature=Y.prototype.sh;Y.prototype.forEachFeatureInExtent=Y.prototype.$b;Y.prototype.forEachFeatureIntersectingExtent=Y.prototype.th;Y.prototype.getFeaturesCollection=Y.prototype.Ah;Y.prototype.getFeatures=Y.prototype.Xe;Y.prototype.getFeaturesAtCoordinate=Y.prototype.zh;Y.prototype.getFeaturesInExtent=Y.prototype.Uf;
Y.prototype.getClosestFeatureToCoordinate=Y.prototype.vh;Y.prototype.getExtent=Y.prototype.G;Y.prototype.getFeatureById=Y.prototype.yh;Y.prototype.getFormat=Y.prototype.Mi;Y.prototype.getUrl=Y.prototype.Ni;Y.prototype.removeFeature=Y.prototype.Gb;Y.prototype.getAttributions=Y.prototype.ya;Y.prototype.getLogo=Y.prototype.xa;Y.prototype.getProjection=Y.prototype.za;Y.prototype.getState=Y.prototype.getState;Y.prototype.refresh=Y.prototype.sa;Y.prototype.setAttributions=Y.prototype.ua;
Y.prototype.get=Y.prototype.get;Y.prototype.getKeys=Y.prototype.O;Y.prototype.getProperties=Y.prototype.N;Y.prototype.set=Y.prototype.set;Y.prototype.setProperties=Y.prototype.H;Y.prototype.unset=Y.prototype.P;Y.prototype.changed=Y.prototype.s;Y.prototype.dispatchEvent=Y.prototype.b;Y.prototype.getRevision=Y.prototype.L;Y.prototype.on=Y.prototype.J;Y.prototype.once=Y.prototype.once;Y.prototype.un=Y.prototype.K;Hv.prototype.getAttributions=Hv.prototype.ya;Hv.prototype.getLogo=Hv.prototype.xa;
Hv.prototype.getProjection=Hv.prototype.za;Hv.prototype.getState=Hv.prototype.getState;Hv.prototype.refresh=Hv.prototype.sa;Hv.prototype.setAttributions=Hv.prototype.ua;Hv.prototype.get=Hv.prototype.get;Hv.prototype.getKeys=Hv.prototype.O;Hv.prototype.getProperties=Hv.prototype.N;Hv.prototype.set=Hv.prototype.set;Hv.prototype.setProperties=Hv.prototype.H;Hv.prototype.unset=Hv.prototype.P;Hv.prototype.changed=Hv.prototype.s;Hv.prototype.dispatchEvent=Hv.prototype.b;Hv.prototype.getRevision=Hv.prototype.L;
Hv.prototype.on=Hv.prototype.J;Hv.prototype.once=Hv.prototype.once;Hv.prototype.un=Hv.prototype.K;Jv.prototype.type=Jv.prototype.type;Jv.prototype.target=Jv.prototype.target;Jv.prototype.preventDefault=Jv.prototype.preventDefault;Jv.prototype.stopPropagation=Jv.prototype.stopPropagation;Gw.prototype.getAttributions=Gw.prototype.ya;Gw.prototype.getLogo=Gw.prototype.xa;Gw.prototype.getProjection=Gw.prototype.za;Gw.prototype.getState=Gw.prototype.getState;Gw.prototype.refresh=Gw.prototype.sa;
Gw.prototype.setAttributions=Gw.prototype.ua;Gw.prototype.get=Gw.prototype.get;Gw.prototype.getKeys=Gw.prototype.O;Gw.prototype.getProperties=Gw.prototype.N;Gw.prototype.set=Gw.prototype.set;Gw.prototype.setProperties=Gw.prototype.H;Gw.prototype.unset=Gw.prototype.P;Gw.prototype.changed=Gw.prototype.s;Gw.prototype.dispatchEvent=Gw.prototype.b;Gw.prototype.getRevision=Gw.prototype.L;Gw.prototype.on=Gw.prototype.J;Gw.prototype.once=Gw.prototype.once;Gw.prototype.un=Gw.prototype.K;
Ov.prototype.getAttributions=Ov.prototype.ya;Ov.prototype.getLogo=Ov.prototype.xa;Ov.prototype.getProjection=Ov.prototype.za;Ov.prototype.getState=Ov.prototype.getState;Ov.prototype.refresh=Ov.prototype.sa;Ov.prototype.setAttributions=Ov.prototype.ua;Ov.prototype.get=Ov.prototype.get;Ov.prototype.getKeys=Ov.prototype.O;Ov.prototype.getProperties=Ov.prototype.N;Ov.prototype.set=Ov.prototype.set;Ov.prototype.setProperties=Ov.prototype.H;Ov.prototype.unset=Ov.prototype.P;Ov.prototype.changed=Ov.prototype.s;
Ov.prototype.dispatchEvent=Ov.prototype.b;Ov.prototype.getRevision=Ov.prototype.L;Ov.prototype.on=Ov.prototype.J;Ov.prototype.once=Ov.prototype.once;Ov.prototype.un=Ov.prototype.K;Hw.prototype.getAttributions=Hw.prototype.ya;Hw.prototype.getLogo=Hw.prototype.xa;Hw.prototype.getProjection=Hw.prototype.za;Hw.prototype.getState=Hw.prototype.getState;Hw.prototype.refresh=Hw.prototype.sa;Hw.prototype.setAttributions=Hw.prototype.ua;Hw.prototype.get=Hw.prototype.get;Hw.prototype.getKeys=Hw.prototype.O;
Hw.prototype.getProperties=Hw.prototype.N;Hw.prototype.set=Hw.prototype.set;Hw.prototype.setProperties=Hw.prototype.H;Hw.prototype.unset=Hw.prototype.P;Hw.prototype.changed=Hw.prototype.s;Hw.prototype.dispatchEvent=Hw.prototype.b;Hw.prototype.getRevision=Hw.prototype.L;Hw.prototype.on=Hw.prototype.J;Hw.prototype.once=Hw.prototype.once;Hw.prototype.un=Hw.prototype.K;Iw.prototype.getAttributions=Iw.prototype.ya;Iw.prototype.getLogo=Iw.prototype.xa;Iw.prototype.getProjection=Iw.prototype.za;
Iw.prototype.getState=Iw.prototype.getState;Iw.prototype.refresh=Iw.prototype.sa;Iw.prototype.setAttributions=Iw.prototype.ua;Iw.prototype.get=Iw.prototype.get;Iw.prototype.getKeys=Iw.prototype.O;Iw.prototype.getProperties=Iw.prototype.N;Iw.prototype.set=Iw.prototype.set;Iw.prototype.setProperties=Iw.prototype.H;Iw.prototype.unset=Iw.prototype.P;Iw.prototype.changed=Iw.prototype.s;Iw.prototype.dispatchEvent=Iw.prototype.b;Iw.prototype.getRevision=Iw.prototype.L;Iw.prototype.on=Iw.prototype.J;
Iw.prototype.once=Iw.prototype.once;Iw.prototype.un=Iw.prototype.K;Pv.prototype.getAttributions=Pv.prototype.ya;Pv.prototype.getLogo=Pv.prototype.xa;Pv.prototype.getProjection=Pv.prototype.za;Pv.prototype.getState=Pv.prototype.getState;Pv.prototype.refresh=Pv.prototype.sa;Pv.prototype.setAttributions=Pv.prototype.ua;Pv.prototype.get=Pv.prototype.get;Pv.prototype.getKeys=Pv.prototype.O;Pv.prototype.getProperties=Pv.prototype.N;Pv.prototype.set=Pv.prototype.set;Pv.prototype.setProperties=Pv.prototype.H;
Pv.prototype.unset=Pv.prototype.P;Pv.prototype.changed=Pv.prototype.s;Pv.prototype.dispatchEvent=Pv.prototype.b;Pv.prototype.getRevision=Pv.prototype.L;Pv.prototype.on=Pv.prototype.J;Pv.prototype.once=Pv.prototype.once;Pv.prototype.un=Pv.prototype.K;Jw.prototype.getAttributions=Jw.prototype.ya;Jw.prototype.getLogo=Jw.prototype.xa;Jw.prototype.getProjection=Jw.prototype.za;Jw.prototype.getState=Jw.prototype.getState;Jw.prototype.refresh=Jw.prototype.sa;Jw.prototype.setAttributions=Jw.prototype.ua;
Jw.prototype.get=Jw.prototype.get;Jw.prototype.getKeys=Jw.prototype.O;Jw.prototype.getProperties=Jw.prototype.N;Jw.prototype.set=Jw.prototype.set;Jw.prototype.setProperties=Jw.prototype.H;Jw.prototype.unset=Jw.prototype.P;Jw.prototype.changed=Jw.prototype.s;Jw.prototype.dispatchEvent=Jw.prototype.b;Jw.prototype.getRevision=Jw.prototype.L;Jw.prototype.on=Jw.prototype.J;Jw.prototype.once=Jw.prototype.once;Jw.prototype.un=Jw.prototype.K;Nw.prototype.setRenderReprojectionEdges=Nw.prototype.Pb;
Nw.prototype.setTileGridForProjection=Nw.prototype.Qb;Nw.prototype.getTileLoadFunction=Nw.prototype.pb;Nw.prototype.getTileUrlFunction=Nw.prototype.qb;Nw.prototype.getUrls=Nw.prototype.rb;Nw.prototype.setTileLoadFunction=Nw.prototype.vb;Nw.prototype.setTileUrlFunction=Nw.prototype.cb;Nw.prototype.setUrl=Nw.prototype.jb;Nw.prototype.setUrls=Nw.prototype.eb;Nw.prototype.getTileGrid=Nw.prototype.ab;Nw.prototype.refresh=Nw.prototype.sa;Nw.prototype.getAttributions=Nw.prototype.ya;
Nw.prototype.getLogo=Nw.prototype.xa;Nw.prototype.getProjection=Nw.prototype.za;Nw.prototype.getState=Nw.prototype.getState;Nw.prototype.setAttributions=Nw.prototype.ua;Nw.prototype.get=Nw.prototype.get;Nw.prototype.getKeys=Nw.prototype.O;Nw.prototype.getProperties=Nw.prototype.N;Nw.prototype.set=Nw.prototype.set;Nw.prototype.setProperties=Nw.prototype.H;Nw.prototype.unset=Nw.prototype.P;Nw.prototype.changed=Nw.prototype.s;Nw.prototype.dispatchEvent=Nw.prototype.b;Nw.prototype.getRevision=Nw.prototype.L;
Nw.prototype.on=Nw.prototype.J;Nw.prototype.once=Nw.prototype.once;Nw.prototype.un=Nw.prototype.K;Pw.prototype.getAttributions=Pw.prototype.ya;Pw.prototype.getLogo=Pw.prototype.xa;Pw.prototype.getProjection=Pw.prototype.za;Pw.prototype.getState=Pw.prototype.getState;Pw.prototype.refresh=Pw.prototype.sa;Pw.prototype.setAttributions=Pw.prototype.ua;Pw.prototype.get=Pw.prototype.get;Pw.prototype.getKeys=Pw.prototype.O;Pw.prototype.getProperties=Pw.prototype.N;Pw.prototype.set=Pw.prototype.set;
Pw.prototype.setProperties=Pw.prototype.H;Pw.prototype.unset=Pw.prototype.P;Pw.prototype.changed=Pw.prototype.s;Pw.prototype.dispatchEvent=Pw.prototype.b;Pw.prototype.getRevision=Pw.prototype.L;Pw.prototype.on=Pw.prototype.J;Pw.prototype.once=Pw.prototype.once;Pw.prototype.un=Pw.prototype.K;Tw.prototype.type=Tw.prototype.type;Tw.prototype.target=Tw.prototype.target;Tw.prototype.preventDefault=Tw.prototype.preventDefault;Tw.prototype.stopPropagation=Tw.prototype.stopPropagation;
Ww.prototype.setRenderReprojectionEdges=Ww.prototype.Pb;Ww.prototype.setTileGridForProjection=Ww.prototype.Qb;Ww.prototype.getTileLoadFunction=Ww.prototype.pb;Ww.prototype.getTileUrlFunction=Ww.prototype.qb;Ww.prototype.getUrls=Ww.prototype.rb;Ww.prototype.setTileLoadFunction=Ww.prototype.vb;Ww.prototype.setTileUrlFunction=Ww.prototype.cb;Ww.prototype.setUrl=Ww.prototype.jb;Ww.prototype.setUrls=Ww.prototype.eb;Ww.prototype.getTileGrid=Ww.prototype.ab;Ww.prototype.refresh=Ww.prototype.sa;
Ww.prototype.getAttributions=Ww.prototype.ya;Ww.prototype.getLogo=Ww.prototype.xa;Ww.prototype.getProjection=Ww.prototype.za;Ww.prototype.getState=Ww.prototype.getState;Ww.prototype.setAttributions=Ww.prototype.ua;Ww.prototype.get=Ww.prototype.get;Ww.prototype.getKeys=Ww.prototype.O;Ww.prototype.getProperties=Ww.prototype.N;Ww.prototype.set=Ww.prototype.set;Ww.prototype.setProperties=Ww.prototype.H;Ww.prototype.unset=Ww.prototype.P;Ww.prototype.changed=Ww.prototype.s;Ww.prototype.dispatchEvent=Ww.prototype.b;
Ww.prototype.getRevision=Ww.prototype.L;Ww.prototype.on=Ww.prototype.J;Ww.prototype.once=Ww.prototype.once;Ww.prototype.un=Ww.prototype.K;sw.prototype.type=sw.prototype.type;sw.prototype.target=sw.prototype.target;sw.prototype.preventDefault=sw.prototype.preventDefault;sw.prototype.stopPropagation=sw.prototype.stopPropagation;$w.prototype.setRenderReprojectionEdges=$w.prototype.Pb;$w.prototype.setTileGridForProjection=$w.prototype.Qb;$w.prototype.getTileLoadFunction=$w.prototype.pb;
$w.prototype.getTileUrlFunction=$w.prototype.qb;$w.prototype.getUrls=$w.prototype.rb;$w.prototype.setTileLoadFunction=$w.prototype.vb;$w.prototype.setTileUrlFunction=$w.prototype.cb;$w.prototype.setUrl=$w.prototype.jb;$w.prototype.setUrls=$w.prototype.eb;$w.prototype.getTileGrid=$w.prototype.ab;$w.prototype.refresh=$w.prototype.sa;$w.prototype.getAttributions=$w.prototype.ya;$w.prototype.getLogo=$w.prototype.xa;$w.prototype.getProjection=$w.prototype.za;$w.prototype.getState=$w.prototype.getState;
$w.prototype.setAttributions=$w.prototype.ua;$w.prototype.get=$w.prototype.get;$w.prototype.getKeys=$w.prototype.O;$w.prototype.getProperties=$w.prototype.N;$w.prototype.set=$w.prototype.set;$w.prototype.setProperties=$w.prototype.H;$w.prototype.unset=$w.prototype.P;$w.prototype.changed=$w.prototype.s;$w.prototype.dispatchEvent=$w.prototype.b;$w.prototype.getRevision=$w.prototype.L;$w.prototype.on=$w.prototype.J;$w.prototype.once=$w.prototype.once;$w.prototype.un=$w.prototype.K;
bx.prototype.getTileGrid=bx.prototype.ab;bx.prototype.refresh=bx.prototype.sa;bx.prototype.getAttributions=bx.prototype.ya;bx.prototype.getLogo=bx.prototype.xa;bx.prototype.getProjection=bx.prototype.za;bx.prototype.getState=bx.prototype.getState;bx.prototype.setAttributions=bx.prototype.ua;bx.prototype.get=bx.prototype.get;bx.prototype.getKeys=bx.prototype.O;bx.prototype.getProperties=bx.prototype.N;bx.prototype.set=bx.prototype.set;bx.prototype.setProperties=bx.prototype.H;bx.prototype.unset=bx.prototype.P;
bx.prototype.changed=bx.prototype.s;bx.prototype.dispatchEvent=bx.prototype.b;bx.prototype.getRevision=bx.prototype.L;bx.prototype.on=bx.prototype.J;bx.prototype.once=bx.prototype.once;bx.prototype.un=bx.prototype.K;dx.prototype.setRenderReprojectionEdges=dx.prototype.Pb;dx.prototype.setTileGridForProjection=dx.prototype.Qb;dx.prototype.getTileLoadFunction=dx.prototype.pb;dx.prototype.getTileUrlFunction=dx.prototype.qb;dx.prototype.getUrls=dx.prototype.rb;dx.prototype.setTileLoadFunction=dx.prototype.vb;
dx.prototype.setTileUrlFunction=dx.prototype.cb;dx.prototype.setUrl=dx.prototype.jb;dx.prototype.setUrls=dx.prototype.eb;dx.prototype.getTileGrid=dx.prototype.ab;dx.prototype.refresh=dx.prototype.sa;dx.prototype.getAttributions=dx.prototype.ya;dx.prototype.getLogo=dx.prototype.xa;dx.prototype.getProjection=dx.prototype.za;dx.prototype.getState=dx.prototype.getState;dx.prototype.setAttributions=dx.prototype.ua;dx.prototype.get=dx.prototype.get;dx.prototype.getKeys=dx.prototype.O;
dx.prototype.getProperties=dx.prototype.N;dx.prototype.set=dx.prototype.set;dx.prototype.setProperties=dx.prototype.H;dx.prototype.unset=dx.prototype.P;dx.prototype.changed=dx.prototype.s;dx.prototype.dispatchEvent=dx.prototype.b;dx.prototype.getRevision=dx.prototype.L;dx.prototype.on=dx.prototype.J;dx.prototype.once=dx.prototype.once;dx.prototype.un=dx.prototype.K;ex.prototype.getTileGrid=ex.prototype.ab;ex.prototype.refresh=ex.prototype.sa;ex.prototype.getAttributions=ex.prototype.ya;
ex.prototype.getLogo=ex.prototype.xa;ex.prototype.getProjection=ex.prototype.za;ex.prototype.getState=ex.prototype.getState;ex.prototype.setAttributions=ex.prototype.ua;ex.prototype.get=ex.prototype.get;ex.prototype.getKeys=ex.prototype.O;ex.prototype.getProperties=ex.prototype.N;ex.prototype.set=ex.prototype.set;ex.prototype.setProperties=ex.prototype.H;ex.prototype.unset=ex.prototype.P;ex.prototype.changed=ex.prototype.s;ex.prototype.dispatchEvent=ex.prototype.b;ex.prototype.getRevision=ex.prototype.L;
ex.prototype.on=ex.prototype.J;ex.prototype.once=ex.prototype.once;ex.prototype.un=ex.prototype.K;ix.prototype.setRenderReprojectionEdges=ix.prototype.Pb;ix.prototype.setTileGridForProjection=ix.prototype.Qb;ix.prototype.getTileLoadFunction=ix.prototype.pb;ix.prototype.getTileUrlFunction=ix.prototype.qb;ix.prototype.getUrls=ix.prototype.rb;ix.prototype.setTileLoadFunction=ix.prototype.vb;ix.prototype.setTileUrlFunction=ix.prototype.cb;ix.prototype.setUrl=ix.prototype.jb;ix.prototype.setUrls=ix.prototype.eb;
ix.prototype.getTileGrid=ix.prototype.ab;ix.prototype.refresh=ix.prototype.sa;ix.prototype.getAttributions=ix.prototype.ya;ix.prototype.getLogo=ix.prototype.xa;ix.prototype.getProjection=ix.prototype.za;ix.prototype.getState=ix.prototype.getState;ix.prototype.setAttributions=ix.prototype.ua;ix.prototype.get=ix.prototype.get;ix.prototype.getKeys=ix.prototype.O;ix.prototype.getProperties=ix.prototype.N;ix.prototype.set=ix.prototype.set;ix.prototype.setProperties=ix.prototype.H;ix.prototype.unset=ix.prototype.P;
ix.prototype.changed=ix.prototype.s;ix.prototype.dispatchEvent=ix.prototype.b;ix.prototype.getRevision=ix.prototype.L;ix.prototype.on=ix.prototype.J;ix.prototype.once=ix.prototype.once;ix.prototype.un=ix.prototype.K;gu.prototype.type=gu.prototype.type;gu.prototype.target=gu.prototype.target;gu.prototype.preventDefault=gu.prototype.preventDefault;gu.prototype.stopPropagation=gu.prototype.stopPropagation;qx.prototype.getTileLoadFunction=qx.prototype.pb;qx.prototype.getTileUrlFunction=qx.prototype.qb;
qx.prototype.getUrls=qx.prototype.rb;qx.prototype.setTileLoadFunction=qx.prototype.vb;qx.prototype.setTileUrlFunction=qx.prototype.cb;qx.prototype.setUrl=qx.prototype.jb;qx.prototype.setUrls=qx.prototype.eb;qx.prototype.getTileGrid=qx.prototype.ab;qx.prototype.refresh=qx.prototype.sa;qx.prototype.getAttributions=qx.prototype.ya;qx.prototype.getLogo=qx.prototype.xa;qx.prototype.getProjection=qx.prototype.za;qx.prototype.getState=qx.prototype.getState;qx.prototype.setAttributions=qx.prototype.ua;
qx.prototype.get=qx.prototype.get;qx.prototype.getKeys=qx.prototype.O;qx.prototype.getProperties=qx.prototype.N;qx.prototype.set=qx.prototype.set;qx.prototype.setProperties=qx.prototype.H;qx.prototype.unset=qx.prototype.P;qx.prototype.changed=qx.prototype.s;qx.prototype.dispatchEvent=qx.prototype.b;qx.prototype.getRevision=qx.prototype.L;qx.prototype.on=qx.prototype.J;qx.prototype.once=qx.prototype.once;qx.prototype.un=qx.prototype.K;Z.prototype.setRenderReprojectionEdges=Z.prototype.Pb;
Z.prototype.setTileGridForProjection=Z.prototype.Qb;Z.prototype.getTileLoadFunction=Z.prototype.pb;Z.prototype.getTileUrlFunction=Z.prototype.qb;Z.prototype.getUrls=Z.prototype.rb;Z.prototype.setTileLoadFunction=Z.prototype.vb;Z.prototype.setTileUrlFunction=Z.prototype.cb;Z.prototype.setUrl=Z.prototype.jb;Z.prototype.setUrls=Z.prototype.eb;Z.prototype.getTileGrid=Z.prototype.ab;Z.prototype.refresh=Z.prototype.sa;Z.prototype.getAttributions=Z.prototype.ya;Z.prototype.getLogo=Z.prototype.xa;
Z.prototype.getProjection=Z.prototype.za;Z.prototype.getState=Z.prototype.getState;Z.prototype.setAttributions=Z.prototype.ua;Z.prototype.get=Z.prototype.get;Z.prototype.getKeys=Z.prototype.O;Z.prototype.getProperties=Z.prototype.N;Z.prototype.set=Z.prototype.set;Z.prototype.setProperties=Z.prototype.H;Z.prototype.unset=Z.prototype.P;Z.prototype.changed=Z.prototype.s;Z.prototype.dispatchEvent=Z.prototype.b;Z.prototype.getRevision=Z.prototype.L;Z.prototype.on=Z.prototype.J;Z.prototype.once=Z.prototype.once;
Z.prototype.un=Z.prototype.K;ux.prototype.setRenderReprojectionEdges=ux.prototype.Pb;ux.prototype.setTileGridForProjection=ux.prototype.Qb;ux.prototype.getTileLoadFunction=ux.prototype.pb;ux.prototype.getTileUrlFunction=ux.prototype.qb;ux.prototype.getUrls=ux.prototype.rb;ux.prototype.setTileLoadFunction=ux.prototype.vb;ux.prototype.setTileUrlFunction=ux.prototype.cb;ux.prototype.setUrl=ux.prototype.jb;ux.prototype.setUrls=ux.prototype.eb;ux.prototype.getTileGrid=ux.prototype.ab;
ux.prototype.refresh=ux.prototype.sa;ux.prototype.getAttributions=ux.prototype.ya;ux.prototype.getLogo=ux.prototype.xa;ux.prototype.getProjection=ux.prototype.za;ux.prototype.getState=ux.prototype.getState;ux.prototype.setAttributions=ux.prototype.ua;ux.prototype.get=ux.prototype.get;ux.prototype.getKeys=ux.prototype.O;ux.prototype.getProperties=ux.prototype.N;ux.prototype.set=ux.prototype.set;ux.prototype.setProperties=ux.prototype.H;ux.prototype.unset=ux.prototype.P;ux.prototype.changed=ux.prototype.s;
ux.prototype.dispatchEvent=ux.prototype.b;ux.prototype.getRevision=ux.prototype.L;ux.prototype.on=ux.prototype.J;ux.prototype.once=ux.prototype.once;ux.prototype.un=ux.prototype.K;hw.prototype.getTileCoord=hw.prototype.f;hw.prototype.load=hw.prototype.load;xt.prototype.changed=xt.prototype.s;xt.prototype.dispatchEvent=xt.prototype.b;xt.prototype.getRevision=xt.prototype.L;xt.prototype.on=xt.prototype.J;xt.prototype.once=xt.prototype.once;xt.prototype.un=xt.prototype.K;Vt.prototype.changed=Vt.prototype.s;
Vt.prototype.dispatchEvent=Vt.prototype.b;Vt.prototype.getRevision=Vt.prototype.L;Vt.prototype.on=Vt.prototype.J;Vt.prototype.once=Vt.prototype.once;Vt.prototype.un=Vt.prototype.K;Rv.prototype.changed=Rv.prototype.s;Rv.prototype.dispatchEvent=Rv.prototype.b;Rv.prototype.getRevision=Rv.prototype.L;Rv.prototype.on=Rv.prototype.J;Rv.prototype.once=Rv.prototype.once;Rv.prototype.un=Rv.prototype.K;bw.prototype.changed=bw.prototype.s;bw.prototype.dispatchEvent=bw.prototype.b;bw.prototype.getRevision=bw.prototype.L;
bw.prototype.on=bw.prototype.J;bw.prototype.once=bw.prototype.once;bw.prototype.un=bw.prototype.K;Yt.prototype.changed=Yt.prototype.s;Yt.prototype.dispatchEvent=Yt.prototype.b;Yt.prototype.getRevision=Yt.prototype.L;Yt.prototype.on=Yt.prototype.J;Yt.prototype.once=Yt.prototype.once;Yt.prototype.un=Yt.prototype.K;Gt.prototype.changed=Gt.prototype.s;Gt.prototype.dispatchEvent=Gt.prototype.b;Gt.prototype.getRevision=Gt.prototype.L;Gt.prototype.on=Gt.prototype.J;Gt.prototype.once=Gt.prototype.once;
Gt.prototype.un=Gt.prototype.K;yv.prototype.changed=yv.prototype.s;yv.prototype.dispatchEvent=yv.prototype.b;yv.prototype.getRevision=yv.prototype.L;yv.prototype.on=yv.prototype.J;yv.prototype.once=yv.prototype.once;yv.prototype.un=yv.prototype.K;zv.prototype.changed=zv.prototype.s;zv.prototype.dispatchEvent=zv.prototype.b;zv.prototype.getRevision=zv.prototype.L;zv.prototype.on=zv.prototype.J;zv.prototype.once=zv.prototype.once;zv.prototype.un=zv.prototype.K;Vv.prototype.changed=Vv.prototype.s;
Vv.prototype.dispatchEvent=Vv.prototype.b;Vv.prototype.getRevision=Vv.prototype.L;Vv.prototype.on=Vv.prototype.J;Vv.prototype.once=Vv.prototype.once;Vv.prototype.un=Vv.prototype.K;Ot.prototype.changed=Ot.prototype.s;Ot.prototype.dispatchEvent=Ot.prototype.b;Ot.prototype.getRevision=Ot.prototype.L;Ot.prototype.on=Ot.prototype.J;Ot.prototype.once=Ot.prototype.once;Ot.prototype.un=Ot.prototype.K;dw.prototype.changed=dw.prototype.s;dw.prototype.dispatchEvent=dw.prototype.b;dw.prototype.getRevision=dw.prototype.L;
dw.prototype.on=dw.prototype.J;dw.prototype.once=dw.prototype.once;dw.prototype.un=dw.prototype.K;Rh.prototype.type=Rh.prototype.type;Rh.prototype.target=Rh.prototype.target;Rh.prototype.preventDefault=Rh.prototype.preventDefault;Rh.prototype.stopPropagation=Rh.prototype.stopPropagation;pe.prototype.type=pe.prototype.type;pe.prototype.target=pe.prototype.target;pe.prototype.preventDefault=pe.prototype.preventDefault;pe.prototype.stopPropagation=pe.prototype.stopPropagation;sh.prototype.get=sh.prototype.get;
sh.prototype.getKeys=sh.prototype.O;sh.prototype.getProperties=sh.prototype.N;sh.prototype.set=sh.prototype.set;sh.prototype.setProperties=sh.prototype.H;sh.prototype.unset=sh.prototype.P;sh.prototype.changed=sh.prototype.s;sh.prototype.dispatchEvent=sh.prototype.b;sh.prototype.getRevision=sh.prototype.L;sh.prototype.on=sh.prototype.J;sh.prototype.once=sh.prototype.once;sh.prototype.un=sh.prototype.K;uh.prototype.getExtent=uh.prototype.G;uh.prototype.getMaxResolution=uh.prototype.fc;
uh.prototype.getMinResolution=uh.prototype.gc;uh.prototype.getOpacity=uh.prototype.hc;uh.prototype.getVisible=uh.prototype.Mb;uh.prototype.getZIndex=uh.prototype.Ba;uh.prototype.setExtent=uh.prototype.vc;uh.prototype.setMaxResolution=uh.prototype.Ac;uh.prototype.setMinResolution=uh.prototype.Bc;uh.prototype.setOpacity=uh.prototype.wc;uh.prototype.setVisible=uh.prototype.xc;uh.prototype.setZIndex=uh.prototype.Vb;uh.prototype.get=uh.prototype.get;uh.prototype.getKeys=uh.prototype.O;
uh.prototype.getProperties=uh.prototype.N;uh.prototype.set=uh.prototype.set;uh.prototype.setProperties=uh.prototype.H;uh.prototype.unset=uh.prototype.P;uh.prototype.changed=uh.prototype.s;uh.prototype.dispatchEvent=uh.prototype.b;uh.prototype.getRevision=uh.prototype.L;uh.prototype.on=uh.prototype.J;uh.prototype.once=uh.prototype.once;uh.prototype.un=uh.prototype.K;wh.prototype.getExtent=wh.prototype.G;wh.prototype.getMaxResolution=wh.prototype.fc;wh.prototype.getMinResolution=wh.prototype.gc;
wh.prototype.getOpacity=wh.prototype.hc;wh.prototype.getVisible=wh.prototype.Mb;wh.prototype.getZIndex=wh.prototype.Ba;wh.prototype.setExtent=wh.prototype.vc;wh.prototype.setMaxResolution=wh.prototype.Ac;wh.prototype.setMinResolution=wh.prototype.Bc;wh.prototype.setOpacity=wh.prototype.wc;wh.prototype.setVisible=wh.prototype.xc;wh.prototype.setZIndex=wh.prototype.Vb;wh.prototype.get=wh.prototype.get;wh.prototype.getKeys=wh.prototype.O;wh.prototype.getProperties=wh.prototype.N;wh.prototype.set=wh.prototype.set;
wh.prototype.setProperties=wh.prototype.H;wh.prototype.unset=wh.prototype.P;wh.prototype.changed=wh.prototype.s;wh.prototype.dispatchEvent=wh.prototype.b;wh.prototype.getRevision=wh.prototype.L;wh.prototype.on=wh.prototype.J;wh.prototype.once=wh.prototype.once;wh.prototype.un=wh.prototype.K;T.prototype.setMap=T.prototype.setMap;T.prototype.setSource=T.prototype.Wc;T.prototype.getExtent=T.prototype.G;T.prototype.getMaxResolution=T.prototype.fc;T.prototype.getMinResolution=T.prototype.gc;
T.prototype.getOpacity=T.prototype.hc;T.prototype.getVisible=T.prototype.Mb;T.prototype.getZIndex=T.prototype.Ba;T.prototype.setExtent=T.prototype.vc;T.prototype.setMaxResolution=T.prototype.Ac;T.prototype.setMinResolution=T.prototype.Bc;T.prototype.setOpacity=T.prototype.wc;T.prototype.setVisible=T.prototype.xc;T.prototype.setZIndex=T.prototype.Vb;T.prototype.get=T.prototype.get;T.prototype.getKeys=T.prototype.O;T.prototype.getProperties=T.prototype.N;T.prototype.set=T.prototype.set;
T.prototype.setProperties=T.prototype.H;T.prototype.unset=T.prototype.P;T.prototype.changed=T.prototype.s;T.prototype.dispatchEvent=T.prototype.b;T.prototype.getRevision=T.prototype.L;T.prototype.on=T.prototype.J;T.prototype.once=T.prototype.once;T.prototype.un=T.prototype.K;V.prototype.getSource=V.prototype.ha;V.prototype.getStyle=V.prototype.D;V.prototype.getStyleFunction=V.prototype.C;V.prototype.setStyle=V.prototype.g;V.prototype.setMap=V.prototype.setMap;V.prototype.setSource=V.prototype.Wc;
V.prototype.getExtent=V.prototype.G;V.prototype.getMaxResolution=V.prototype.fc;V.prototype.getMinResolution=V.prototype.gc;V.prototype.getOpacity=V.prototype.hc;V.prototype.getVisible=V.prototype.Mb;V.prototype.getZIndex=V.prototype.Ba;V.prototype.setExtent=V.prototype.vc;V.prototype.setMaxResolution=V.prototype.Ac;V.prototype.setMinResolution=V.prototype.Bc;V.prototype.setOpacity=V.prototype.wc;V.prototype.setVisible=V.prototype.xc;V.prototype.setZIndex=V.prototype.Vb;V.prototype.get=V.prototype.get;
V.prototype.getKeys=V.prototype.O;V.prototype.getProperties=V.prototype.N;V.prototype.set=V.prototype.set;V.prototype.setProperties=V.prototype.H;V.prototype.unset=V.prototype.P;V.prototype.changed=V.prototype.s;V.prototype.dispatchEvent=V.prototype.b;V.prototype.getRevision=V.prototype.L;V.prototype.on=V.prototype.J;V.prototype.once=V.prototype.once;V.prototype.un=V.prototype.K;Uv.prototype.setMap=Uv.prototype.setMap;Uv.prototype.setSource=Uv.prototype.Wc;Uv.prototype.getExtent=Uv.prototype.G;
Uv.prototype.getMaxResolution=Uv.prototype.fc;Uv.prototype.getMinResolution=Uv.prototype.gc;Uv.prototype.getOpacity=Uv.prototype.hc;Uv.prototype.getVisible=Uv.prototype.Mb;Uv.prototype.getZIndex=Uv.prototype.Ba;Uv.prototype.setExtent=Uv.prototype.vc;Uv.prototype.setMaxResolution=Uv.prototype.Ac;Uv.prototype.setMinResolution=Uv.prototype.Bc;Uv.prototype.setOpacity=Uv.prototype.wc;Uv.prototype.setVisible=Uv.prototype.xc;Uv.prototype.setZIndex=Uv.prototype.Vb;Uv.prototype.get=Uv.prototype.get;
Uv.prototype.getKeys=Uv.prototype.O;Uv.prototype.getProperties=Uv.prototype.N;Uv.prototype.set=Uv.prototype.set;Uv.prototype.setProperties=Uv.prototype.H;Uv.prototype.unset=Uv.prototype.P;Uv.prototype.changed=Uv.prototype.s;Uv.prototype.dispatchEvent=Uv.prototype.b;Uv.prototype.getRevision=Uv.prototype.L;Uv.prototype.on=Uv.prototype.J;Uv.prototype.once=Uv.prototype.once;Uv.prototype.un=Uv.prototype.K;cw.prototype.setMap=cw.prototype.setMap;cw.prototype.setSource=cw.prototype.Wc;
cw.prototype.getExtent=cw.prototype.G;cw.prototype.getMaxResolution=cw.prototype.fc;cw.prototype.getMinResolution=cw.prototype.gc;cw.prototype.getOpacity=cw.prototype.hc;cw.prototype.getVisible=cw.prototype.Mb;cw.prototype.getZIndex=cw.prototype.Ba;cw.prototype.setExtent=cw.prototype.vc;cw.prototype.setMaxResolution=cw.prototype.Ac;cw.prototype.setMinResolution=cw.prototype.Bc;cw.prototype.setOpacity=cw.prototype.wc;cw.prototype.setVisible=cw.prototype.xc;cw.prototype.setZIndex=cw.prototype.Vb;
cw.prototype.get=cw.prototype.get;cw.prototype.getKeys=cw.prototype.O;cw.prototype.getProperties=cw.prototype.N;cw.prototype.set=cw.prototype.set;cw.prototype.setProperties=cw.prototype.H;cw.prototype.unset=cw.prototype.P;cw.prototype.changed=cw.prototype.s;cw.prototype.dispatchEvent=cw.prototype.b;cw.prototype.getRevision=cw.prototype.L;cw.prototype.on=cw.prototype.J;cw.prototype.once=cw.prototype.once;cw.prototype.un=cw.prototype.K;W.prototype.getSource=W.prototype.ha;W.prototype.getStyle=W.prototype.D;
W.prototype.getStyleFunction=W.prototype.C;W.prototype.setStyle=W.prototype.g;W.prototype.setMap=W.prototype.setMap;W.prototype.setSource=W.prototype.Wc;W.prototype.getExtent=W.prototype.G;W.prototype.getMaxResolution=W.prototype.fc;W.prototype.getMinResolution=W.prototype.gc;W.prototype.getOpacity=W.prototype.hc;W.prototype.getVisible=W.prototype.Mb;W.prototype.getZIndex=W.prototype.Ba;W.prototype.setExtent=W.prototype.vc;W.prototype.setMaxResolution=W.prototype.Ac;W.prototype.setMinResolution=W.prototype.Bc;
W.prototype.setOpacity=W.prototype.wc;W.prototype.setVisible=W.prototype.xc;W.prototype.setZIndex=W.prototype.Vb;W.prototype.get=W.prototype.get;W.prototype.getKeys=W.prototype.O;W.prototype.getProperties=W.prototype.N;W.prototype.set=W.prototype.set;W.prototype.setProperties=W.prototype.H;W.prototype.unset=W.prototype.P;W.prototype.changed=W.prototype.s;W.prototype.dispatchEvent=W.prototype.b;W.prototype.getRevision=W.prototype.L;W.prototype.on=W.prototype.J;W.prototype.once=W.prototype.once;
W.prototype.un=W.prototype.K;ng.prototype.get=ng.prototype.get;ng.prototype.getKeys=ng.prototype.O;ng.prototype.getProperties=ng.prototype.N;ng.prototype.set=ng.prototype.set;ng.prototype.setProperties=ng.prototype.H;ng.prototype.unset=ng.prototype.P;ng.prototype.changed=ng.prototype.s;ng.prototype.dispatchEvent=ng.prototype.b;ng.prototype.getRevision=ng.prototype.L;ng.prototype.on=ng.prototype.J;ng.prototype.once=ng.prototype.once;ng.prototype.un=ng.prototype.K;rg.prototype.getActive=rg.prototype.c;
rg.prototype.getMap=rg.prototype.f;rg.prototype.setActive=rg.prototype.Ha;rg.prototype.get=rg.prototype.get;rg.prototype.getKeys=rg.prototype.O;rg.prototype.getProperties=rg.prototype.N;rg.prototype.set=rg.prototype.set;rg.prototype.setProperties=rg.prototype.H;rg.prototype.unset=rg.prototype.P;rg.prototype.changed=rg.prototype.s;rg.prototype.dispatchEvent=rg.prototype.b;rg.prototype.getRevision=rg.prototype.L;rg.prototype.on=rg.prototype.J;rg.prototype.once=rg.prototype.once;rg.prototype.un=rg.prototype.K;
Rs.prototype.getActive=Rs.prototype.c;Rs.prototype.getMap=Rs.prototype.f;Rs.prototype.setActive=Rs.prototype.Ha;Rs.prototype.get=Rs.prototype.get;Rs.prototype.getKeys=Rs.prototype.O;Rs.prototype.getProperties=Rs.prototype.N;Rs.prototype.set=Rs.prototype.set;Rs.prototype.setProperties=Rs.prototype.H;Rs.prototype.unset=Rs.prototype.P;Rs.prototype.changed=Rs.prototype.s;Rs.prototype.dispatchEvent=Rs.prototype.b;Rs.prototype.getRevision=Rs.prototype.L;Rs.prototype.on=Rs.prototype.J;
Rs.prototype.once=Rs.prototype.once;Rs.prototype.un=Rs.prototype.K;Us.prototype.type=Us.prototype.type;Us.prototype.target=Us.prototype.target;Us.prototype.preventDefault=Us.prototype.preventDefault;Us.prototype.stopPropagation=Us.prototype.stopPropagation;Dg.prototype.getActive=Dg.prototype.c;Dg.prototype.getMap=Dg.prototype.f;Dg.prototype.setActive=Dg.prototype.Ha;Dg.prototype.get=Dg.prototype.get;Dg.prototype.getKeys=Dg.prototype.O;Dg.prototype.getProperties=Dg.prototype.N;Dg.prototype.set=Dg.prototype.set;
Dg.prototype.setProperties=Dg.prototype.H;Dg.prototype.unset=Dg.prototype.P;Dg.prototype.changed=Dg.prototype.s;Dg.prototype.dispatchEvent=Dg.prototype.b;Dg.prototype.getRevision=Dg.prototype.L;Dg.prototype.on=Dg.prototype.J;Dg.prototype.once=Dg.prototype.once;Dg.prototype.un=Dg.prototype.K;Rg.prototype.getActive=Rg.prototype.c;Rg.prototype.getMap=Rg.prototype.f;Rg.prototype.setActive=Rg.prototype.Ha;Rg.prototype.get=Rg.prototype.get;Rg.prototype.getKeys=Rg.prototype.O;
Rg.prototype.getProperties=Rg.prototype.N;Rg.prototype.set=Rg.prototype.set;Rg.prototype.setProperties=Rg.prototype.H;Rg.prototype.unset=Rg.prototype.P;Rg.prototype.changed=Rg.prototype.s;Rg.prototype.dispatchEvent=Rg.prototype.b;Rg.prototype.getRevision=Rg.prototype.L;Rg.prototype.on=Rg.prototype.J;Rg.prototype.once=Rg.prototype.once;Rg.prototype.un=Rg.prototype.K;Wg.prototype.type=Wg.prototype.type;Wg.prototype.target=Wg.prototype.target;Wg.prototype.preventDefault=Wg.prototype.preventDefault;
Wg.prototype.stopPropagation=Wg.prototype.stopPropagation;Gg.prototype.getActive=Gg.prototype.c;Gg.prototype.getMap=Gg.prototype.f;Gg.prototype.setActive=Gg.prototype.Ha;Gg.prototype.get=Gg.prototype.get;Gg.prototype.getKeys=Gg.prototype.O;Gg.prototype.getProperties=Gg.prototype.N;Gg.prototype.set=Gg.prototype.set;Gg.prototype.setProperties=Gg.prototype.H;Gg.prototype.unset=Gg.prototype.P;Gg.prototype.changed=Gg.prototype.s;Gg.prototype.dispatchEvent=Gg.prototype.b;Gg.prototype.getRevision=Gg.prototype.L;
Gg.prototype.on=Gg.prototype.J;Gg.prototype.once=Gg.prototype.once;Gg.prototype.un=Gg.prototype.K;Kg.prototype.getActive=Kg.prototype.c;Kg.prototype.getMap=Kg.prototype.f;Kg.prototype.setActive=Kg.prototype.Ha;Kg.prototype.get=Kg.prototype.get;Kg.prototype.getKeys=Kg.prototype.O;Kg.prototype.getProperties=Kg.prototype.N;Kg.prototype.set=Kg.prototype.set;Kg.prototype.setProperties=Kg.prototype.H;Kg.prototype.unset=Kg.prototype.P;Kg.prototype.changed=Kg.prototype.s;Kg.prototype.dispatchEvent=Kg.prototype.b;
Kg.prototype.getRevision=Kg.prototype.L;Kg.prototype.on=Kg.prototype.J;Kg.prototype.once=Kg.prototype.once;Kg.prototype.un=Kg.prototype.K;Ys.prototype.getActive=Ys.prototype.c;Ys.prototype.getMap=Ys.prototype.f;Ys.prototype.setActive=Ys.prototype.Ha;Ys.prototype.get=Ys.prototype.get;Ys.prototype.getKeys=Ys.prototype.O;Ys.prototype.getProperties=Ys.prototype.N;Ys.prototype.set=Ys.prototype.set;Ys.prototype.setProperties=Ys.prototype.H;Ys.prototype.unset=Ys.prototype.P;Ys.prototype.changed=Ys.prototype.s;
Ys.prototype.dispatchEvent=Ys.prototype.b;Ys.prototype.getRevision=Ys.prototype.L;Ys.prototype.on=Ys.prototype.J;Ys.prototype.once=Ys.prototype.once;Ys.prototype.un=Ys.prototype.K;$g.prototype.getGeometry=$g.prototype.V;$g.prototype.getActive=$g.prototype.c;$g.prototype.getMap=$g.prototype.f;$g.prototype.setActive=$g.prototype.Ha;$g.prototype.get=$g.prototype.get;$g.prototype.getKeys=$g.prototype.O;$g.prototype.getProperties=$g.prototype.N;$g.prototype.set=$g.prototype.set;
$g.prototype.setProperties=$g.prototype.H;$g.prototype.unset=$g.prototype.P;$g.prototype.changed=$g.prototype.s;$g.prototype.dispatchEvent=$g.prototype.b;$g.prototype.getRevision=$g.prototype.L;$g.prototype.on=$g.prototype.J;$g.prototype.once=$g.prototype.once;$g.prototype.un=$g.prototype.K;ju.prototype.getActive=ju.prototype.c;ju.prototype.getMap=ju.prototype.f;ju.prototype.setActive=ju.prototype.Ha;ju.prototype.get=ju.prototype.get;ju.prototype.getKeys=ju.prototype.O;
ju.prototype.getProperties=ju.prototype.N;ju.prototype.set=ju.prototype.set;ju.prototype.setProperties=ju.prototype.H;ju.prototype.unset=ju.prototype.P;ju.prototype.changed=ju.prototype.s;ju.prototype.dispatchEvent=ju.prototype.b;ju.prototype.getRevision=ju.prototype.L;ju.prototype.on=ju.prototype.J;ju.prototype.once=ju.prototype.once;ju.prototype.un=ju.prototype.K;zu.prototype.type=zu.prototype.type;zu.prototype.target=zu.prototype.target;zu.prototype.preventDefault=zu.prototype.preventDefault;
zu.prototype.stopPropagation=zu.prototype.stopPropagation;Au.prototype.getActive=Au.prototype.c;Au.prototype.getMap=Au.prototype.f;Au.prototype.setActive=Au.prototype.Ha;Au.prototype.get=Au.prototype.get;Au.prototype.getKeys=Au.prototype.O;Au.prototype.getProperties=Au.prototype.N;Au.prototype.set=Au.prototype.set;Au.prototype.setProperties=Au.prototype.H;Au.prototype.unset=Au.prototype.P;Au.prototype.changed=Au.prototype.s;Au.prototype.dispatchEvent=Au.prototype.b;Au.prototype.getRevision=Au.prototype.L;
Au.prototype.on=Au.prototype.J;Au.prototype.once=Au.prototype.once;Au.prototype.un=Au.prototype.K;Lu.prototype.type=Lu.prototype.type;Lu.prototype.target=Lu.prototype.target;Lu.prototype.preventDefault=Lu.prototype.preventDefault;Lu.prototype.stopPropagation=Lu.prototype.stopPropagation;ah.prototype.getActive=ah.prototype.c;ah.prototype.getMap=ah.prototype.f;ah.prototype.setActive=ah.prototype.Ha;ah.prototype.get=ah.prototype.get;ah.prototype.getKeys=ah.prototype.O;ah.prototype.getProperties=ah.prototype.N;
ah.prototype.set=ah.prototype.set;ah.prototype.setProperties=ah.prototype.H;ah.prototype.unset=ah.prototype.P;ah.prototype.changed=ah.prototype.s;ah.prototype.dispatchEvent=ah.prototype.b;ah.prototype.getRevision=ah.prototype.L;ah.prototype.on=ah.prototype.J;ah.prototype.once=ah.prototype.once;ah.prototype.un=ah.prototype.K;ch.prototype.getActive=ch.prototype.c;ch.prototype.getMap=ch.prototype.f;ch.prototype.setActive=ch.prototype.Ha;ch.prototype.get=ch.prototype.get;ch.prototype.getKeys=ch.prototype.O;
ch.prototype.getProperties=ch.prototype.N;ch.prototype.set=ch.prototype.set;ch.prototype.setProperties=ch.prototype.H;ch.prototype.unset=ch.prototype.P;ch.prototype.changed=ch.prototype.s;ch.prototype.dispatchEvent=ch.prototype.b;ch.prototype.getRevision=ch.prototype.L;ch.prototype.on=ch.prototype.J;ch.prototype.once=ch.prototype.once;ch.prototype.un=ch.prototype.K;Nu.prototype.getActive=Nu.prototype.c;Nu.prototype.getMap=Nu.prototype.f;Nu.prototype.setActive=Nu.prototype.Ha;Nu.prototype.get=Nu.prototype.get;
Nu.prototype.getKeys=Nu.prototype.O;Nu.prototype.getProperties=Nu.prototype.N;Nu.prototype.set=Nu.prototype.set;Nu.prototype.setProperties=Nu.prototype.H;Nu.prototype.unset=Nu.prototype.P;Nu.prototype.changed=Nu.prototype.s;Nu.prototype.dispatchEvent=Nu.prototype.b;Nu.prototype.getRevision=Nu.prototype.L;Nu.prototype.on=Nu.prototype.J;Nu.prototype.once=Nu.prototype.once;Nu.prototype.un=Nu.prototype.K;Vu.prototype.type=Vu.prototype.type;Vu.prototype.target=Vu.prototype.target;
Vu.prototype.preventDefault=Vu.prototype.preventDefault;Vu.prototype.stopPropagation=Vu.prototype.stopPropagation;eh.prototype.getActive=eh.prototype.c;eh.prototype.getMap=eh.prototype.f;eh.prototype.setActive=eh.prototype.Ha;eh.prototype.get=eh.prototype.get;eh.prototype.getKeys=eh.prototype.O;eh.prototype.getProperties=eh.prototype.N;eh.prototype.set=eh.prototype.set;eh.prototype.setProperties=eh.prototype.H;eh.prototype.unset=eh.prototype.P;eh.prototype.changed=eh.prototype.s;
eh.prototype.dispatchEvent=eh.prototype.b;eh.prototype.getRevision=eh.prototype.L;eh.prototype.on=eh.prototype.J;eh.prototype.once=eh.prototype.once;eh.prototype.un=eh.prototype.K;ih.prototype.getActive=ih.prototype.c;ih.prototype.getMap=ih.prototype.f;ih.prototype.setActive=ih.prototype.Ha;ih.prototype.get=ih.prototype.get;ih.prototype.getKeys=ih.prototype.O;ih.prototype.getProperties=ih.prototype.N;ih.prototype.set=ih.prototype.set;ih.prototype.setProperties=ih.prototype.H;ih.prototype.unset=ih.prototype.P;
ih.prototype.changed=ih.prototype.s;ih.prototype.dispatchEvent=ih.prototype.b;ih.prototype.getRevision=ih.prototype.L;ih.prototype.on=ih.prototype.J;ih.prototype.once=ih.prototype.once;ih.prototype.un=ih.prototype.K;mh.prototype.getActive=mh.prototype.c;mh.prototype.getMap=mh.prototype.f;mh.prototype.setActive=mh.prototype.Ha;mh.prototype.get=mh.prototype.get;mh.prototype.getKeys=mh.prototype.O;mh.prototype.getProperties=mh.prototype.N;mh.prototype.set=mh.prototype.set;
mh.prototype.setProperties=mh.prototype.H;mh.prototype.unset=mh.prototype.P;mh.prototype.changed=mh.prototype.s;mh.prototype.dispatchEvent=mh.prototype.b;mh.prototype.getRevision=mh.prototype.L;mh.prototype.on=mh.prototype.J;mh.prototype.once=mh.prototype.once;mh.prototype.un=mh.prototype.K;cv.prototype.getActive=cv.prototype.c;cv.prototype.getMap=cv.prototype.f;cv.prototype.setActive=cv.prototype.Ha;cv.prototype.get=cv.prototype.get;cv.prototype.getKeys=cv.prototype.O;
cv.prototype.getProperties=cv.prototype.N;cv.prototype.set=cv.prototype.set;cv.prototype.setProperties=cv.prototype.H;cv.prototype.unset=cv.prototype.P;cv.prototype.changed=cv.prototype.s;cv.prototype.dispatchEvent=cv.prototype.b;cv.prototype.getRevision=cv.prototype.L;cv.prototype.on=cv.prototype.J;cv.prototype.once=cv.prototype.once;cv.prototype.un=cv.prototype.K;fv.prototype.type=fv.prototype.type;fv.prototype.target=fv.prototype.target;fv.prototype.preventDefault=fv.prototype.preventDefault;
fv.prototype.stopPropagation=fv.prototype.stopPropagation;hv.prototype.getActive=hv.prototype.c;hv.prototype.getMap=hv.prototype.f;hv.prototype.setActive=hv.prototype.Ha;hv.prototype.get=hv.prototype.get;hv.prototype.getKeys=hv.prototype.O;hv.prototype.getProperties=hv.prototype.N;hv.prototype.set=hv.prototype.set;hv.prototype.setProperties=hv.prototype.H;hv.prototype.unset=hv.prototype.P;hv.prototype.changed=hv.prototype.s;hv.prototype.dispatchEvent=hv.prototype.b;hv.prototype.getRevision=hv.prototype.L;
hv.prototype.on=hv.prototype.J;hv.prototype.once=hv.prototype.once;hv.prototype.un=hv.prototype.K;mv.prototype.getActive=mv.prototype.c;mv.prototype.getMap=mv.prototype.f;mv.prototype.setActive=mv.prototype.Ha;mv.prototype.get=mv.prototype.get;mv.prototype.getKeys=mv.prototype.O;mv.prototype.getProperties=mv.prototype.N;mv.prototype.set=mv.prototype.set;mv.prototype.setProperties=mv.prototype.H;mv.prototype.unset=mv.prototype.P;mv.prototype.changed=mv.prototype.s;mv.prototype.dispatchEvent=mv.prototype.b;
mv.prototype.getRevision=mv.prototype.L;mv.prototype.on=mv.prototype.J;mv.prototype.once=mv.prototype.once;mv.prototype.un=mv.prototype.K;sv.prototype.type=sv.prototype.type;sv.prototype.target=sv.prototype.target;sv.prototype.preventDefault=sv.prototype.preventDefault;sv.prototype.stopPropagation=sv.prototype.stopPropagation;of.prototype.get=of.prototype.get;of.prototype.getKeys=of.prototype.O;of.prototype.getProperties=of.prototype.N;of.prototype.set=of.prototype.set;
of.prototype.setProperties=of.prototype.H;of.prototype.unset=of.prototype.P;of.prototype.changed=of.prototype.s;of.prototype.dispatchEvent=of.prototype.b;of.prototype.getRevision=of.prototype.L;of.prototype.on=of.prototype.J;of.prototype.once=of.prototype.once;of.prototype.un=of.prototype.K;rf.prototype.getClosestPoint=rf.prototype.Ab;rf.prototype.intersectsCoordinate=rf.prototype.sb;rf.prototype.getExtent=rf.prototype.G;rf.prototype.rotate=rf.prototype.rotate;rf.prototype.scale=rf.prototype.scale;
rf.prototype.simplify=rf.prototype.Rb;rf.prototype.transform=rf.prototype.tb;rf.prototype.get=rf.prototype.get;rf.prototype.getKeys=rf.prototype.O;rf.prototype.getProperties=rf.prototype.N;rf.prototype.set=rf.prototype.set;rf.prototype.setProperties=rf.prototype.H;rf.prototype.unset=rf.prototype.P;rf.prototype.changed=rf.prototype.s;rf.prototype.dispatchEvent=rf.prototype.b;rf.prototype.getRevision=rf.prototype.L;rf.prototype.on=rf.prototype.J;rf.prototype.once=rf.prototype.once;rf.prototype.un=rf.prototype.K;
ys.prototype.getFirstCoordinate=ys.prototype.ac;ys.prototype.getLastCoordinate=ys.prototype.bc;ys.prototype.getLayout=ys.prototype.cc;ys.prototype.rotate=ys.prototype.rotate;ys.prototype.scale=ys.prototype.scale;ys.prototype.getClosestPoint=ys.prototype.Ab;ys.prototype.intersectsCoordinate=ys.prototype.sb;ys.prototype.getExtent=ys.prototype.G;ys.prototype.simplify=ys.prototype.Rb;ys.prototype.get=ys.prototype.get;ys.prototype.getKeys=ys.prototype.O;ys.prototype.getProperties=ys.prototype.N;
ys.prototype.set=ys.prototype.set;ys.prototype.setProperties=ys.prototype.H;ys.prototype.unset=ys.prototype.P;ys.prototype.changed=ys.prototype.s;ys.prototype.dispatchEvent=ys.prototype.b;ys.prototype.getRevision=ys.prototype.L;ys.prototype.on=ys.prototype.J;ys.prototype.once=ys.prototype.once;ys.prototype.un=ys.prototype.K;tm.prototype.getClosestPoint=tm.prototype.Ab;tm.prototype.intersectsCoordinate=tm.prototype.sb;tm.prototype.getExtent=tm.prototype.G;tm.prototype.rotate=tm.prototype.rotate;
tm.prototype.scale=tm.prototype.scale;tm.prototype.simplify=tm.prototype.Rb;tm.prototype.transform=tm.prototype.tb;tm.prototype.get=tm.prototype.get;tm.prototype.getKeys=tm.prototype.O;tm.prototype.getProperties=tm.prototype.N;tm.prototype.set=tm.prototype.set;tm.prototype.setProperties=tm.prototype.H;tm.prototype.unset=tm.prototype.P;tm.prototype.changed=tm.prototype.s;tm.prototype.dispatchEvent=tm.prototype.b;tm.prototype.getRevision=tm.prototype.L;tm.prototype.on=tm.prototype.J;
tm.prototype.once=tm.prototype.once;tm.prototype.un=tm.prototype.K;Jf.prototype.getFirstCoordinate=Jf.prototype.ac;Jf.prototype.getLastCoordinate=Jf.prototype.bc;Jf.prototype.getLayout=Jf.prototype.cc;Jf.prototype.rotate=Jf.prototype.rotate;Jf.prototype.scale=Jf.prototype.scale;Jf.prototype.getClosestPoint=Jf.prototype.Ab;Jf.prototype.intersectsCoordinate=Jf.prototype.sb;Jf.prototype.getExtent=Jf.prototype.G;Jf.prototype.simplify=Jf.prototype.Rb;Jf.prototype.transform=Jf.prototype.tb;
Jf.prototype.get=Jf.prototype.get;Jf.prototype.getKeys=Jf.prototype.O;Jf.prototype.getProperties=Jf.prototype.N;Jf.prototype.set=Jf.prototype.set;Jf.prototype.setProperties=Jf.prototype.H;Jf.prototype.unset=Jf.prototype.P;Jf.prototype.changed=Jf.prototype.s;Jf.prototype.dispatchEvent=Jf.prototype.b;Jf.prototype.getRevision=Jf.prototype.L;Jf.prototype.on=Jf.prototype.J;Jf.prototype.once=Jf.prototype.once;Jf.prototype.un=Jf.prototype.K;O.prototype.getFirstCoordinate=O.prototype.ac;
O.prototype.getLastCoordinate=O.prototype.bc;O.prototype.getLayout=O.prototype.cc;O.prototype.rotate=O.prototype.rotate;O.prototype.scale=O.prototype.scale;O.prototype.getClosestPoint=O.prototype.Ab;O.prototype.intersectsCoordinate=O.prototype.sb;O.prototype.getExtent=O.prototype.G;O.prototype.simplify=O.prototype.Rb;O.prototype.transform=O.prototype.tb;O.prototype.get=O.prototype.get;O.prototype.getKeys=O.prototype.O;O.prototype.getProperties=O.prototype.N;O.prototype.set=O.prototype.set;
O.prototype.setProperties=O.prototype.H;O.prototype.unset=O.prototype.P;O.prototype.changed=O.prototype.s;O.prototype.dispatchEvent=O.prototype.b;O.prototype.getRevision=O.prototype.L;O.prototype.on=O.prototype.J;O.prototype.once=O.prototype.once;O.prototype.un=O.prototype.K;P.prototype.getFirstCoordinate=P.prototype.ac;P.prototype.getLastCoordinate=P.prototype.bc;P.prototype.getLayout=P.prototype.cc;P.prototype.rotate=P.prototype.rotate;P.prototype.scale=P.prototype.scale;
P.prototype.getClosestPoint=P.prototype.Ab;P.prototype.intersectsCoordinate=P.prototype.sb;P.prototype.getExtent=P.prototype.G;P.prototype.simplify=P.prototype.Rb;P.prototype.transform=P.prototype.tb;P.prototype.get=P.prototype.get;P.prototype.getKeys=P.prototype.O;P.prototype.getProperties=P.prototype.N;P.prototype.set=P.prototype.set;P.prototype.setProperties=P.prototype.H;P.prototype.unset=P.prototype.P;P.prototype.changed=P.prototype.s;P.prototype.dispatchEvent=P.prototype.b;
P.prototype.getRevision=P.prototype.L;P.prototype.on=P.prototype.J;P.prototype.once=P.prototype.once;P.prototype.un=P.prototype.K;Q.prototype.getFirstCoordinate=Q.prototype.ac;Q.prototype.getLastCoordinate=Q.prototype.bc;Q.prototype.getLayout=Q.prototype.cc;Q.prototype.rotate=Q.prototype.rotate;Q.prototype.scale=Q.prototype.scale;Q.prototype.getClosestPoint=Q.prototype.Ab;Q.prototype.intersectsCoordinate=Q.prototype.sb;Q.prototype.getExtent=Q.prototype.G;Q.prototype.simplify=Q.prototype.Rb;
Q.prototype.transform=Q.prototype.tb;Q.prototype.get=Q.prototype.get;Q.prototype.getKeys=Q.prototype.O;Q.prototype.getProperties=Q.prototype.N;Q.prototype.set=Q.prototype.set;Q.prototype.setProperties=Q.prototype.H;Q.prototype.unset=Q.prototype.P;Q.prototype.changed=Q.prototype.s;Q.prototype.dispatchEvent=Q.prototype.b;Q.prototype.getRevision=Q.prototype.L;Q.prototype.on=Q.prototype.J;Q.prototype.once=Q.prototype.once;Q.prototype.un=Q.prototype.K;R.prototype.getFirstCoordinate=R.prototype.ac;
R.prototype.getLastCoordinate=R.prototype.bc;R.prototype.getLayout=R.prototype.cc;R.prototype.rotate=R.prototype.rotate;R.prototype.scale=R.prototype.scale;R.prototype.getClosestPoint=R.prototype.Ab;R.prototype.intersectsCoordinate=R.prototype.sb;R.prototype.getExtent=R.prototype.G;R.prototype.simplify=R.prototype.Rb;R.prototype.transform=R.prototype.tb;R.prototype.get=R.prototype.get;R.prototype.getKeys=R.prototype.O;R.prototype.getProperties=R.prototype.N;R.prototype.set=R.prototype.set;
R.prototype.setProperties=R.prototype.H;R.prototype.unset=R.prototype.P;R.prototype.changed=R.prototype.s;R.prototype.dispatchEvent=R.prototype.b;R.prototype.getRevision=R.prototype.L;R.prototype.on=R.prototype.J;R.prototype.once=R.prototype.once;R.prototype.un=R.prototype.K;C.prototype.getFirstCoordinate=C.prototype.ac;C.prototype.getLastCoordinate=C.prototype.bc;C.prototype.getLayout=C.prototype.cc;C.prototype.rotate=C.prototype.rotate;C.prototype.scale=C.prototype.scale;
C.prototype.getClosestPoint=C.prototype.Ab;C.prototype.intersectsCoordinate=C.prototype.sb;C.prototype.getExtent=C.prototype.G;C.prototype.simplify=C.prototype.Rb;C.prototype.transform=C.prototype.tb;C.prototype.get=C.prototype.get;C.prototype.getKeys=C.prototype.O;C.prototype.getProperties=C.prototype.N;C.prototype.set=C.prototype.set;C.prototype.setProperties=C.prototype.H;C.prototype.unset=C.prototype.P;C.prototype.changed=C.prototype.s;C.prototype.dispatchEvent=C.prototype.b;
C.prototype.getRevision=C.prototype.L;C.prototype.on=C.prototype.J;C.prototype.once=C.prototype.once;C.prototype.un=C.prototype.K;D.prototype.getFirstCoordinate=D.prototype.ac;D.prototype.getLastCoordinate=D.prototype.bc;D.prototype.getLayout=D.prototype.cc;D.prototype.rotate=D.prototype.rotate;D.prototype.scale=D.prototype.scale;D.prototype.getClosestPoint=D.prototype.Ab;D.prototype.intersectsCoordinate=D.prototype.sb;D.prototype.getExtent=D.prototype.G;D.prototype.simplify=D.prototype.Rb;
D.prototype.transform=D.prototype.tb;D.prototype.get=D.prototype.get;D.prototype.getKeys=D.prototype.O;D.prototype.getProperties=D.prototype.N;D.prototype.set=D.prototype.set;D.prototype.setProperties=D.prototype.H;D.prototype.unset=D.prototype.P;D.prototype.changed=D.prototype.s;D.prototype.dispatchEvent=D.prototype.b;D.prototype.getRevision=D.prototype.L;D.prototype.on=D.prototype.J;D.prototype.once=D.prototype.once;D.prototype.un=D.prototype.K;Sm.prototype.readFeatures=Sm.prototype.Oa;
an.prototype.readFeatures=an.prototype.Oa;Sm.prototype.readFeatures=Sm.prototype.Oa;md.prototype.get=md.prototype.get;md.prototype.getKeys=md.prototype.O;md.prototype.getProperties=md.prototype.N;md.prototype.set=md.prototype.set;md.prototype.setProperties=md.prototype.H;md.prototype.unset=md.prototype.P;md.prototype.changed=md.prototype.s;md.prototype.dispatchEvent=md.prototype.b;md.prototype.getRevision=md.prototype.L;md.prototype.on=md.prototype.J;md.prototype.once=md.prototype.once;
md.prototype.un=md.prototype.K;nd.prototype.getMap=nd.prototype.g;nd.prototype.setMap=nd.prototype.setMap;nd.prototype.setTarget=nd.prototype.f;nd.prototype.get=nd.prototype.get;nd.prototype.getKeys=nd.prototype.O;nd.prototype.getProperties=nd.prototype.N;nd.prototype.set=nd.prototype.set;nd.prototype.setProperties=nd.prototype.H;nd.prototype.unset=nd.prototype.P;nd.prototype.changed=nd.prototype.s;nd.prototype.dispatchEvent=nd.prototype.b;nd.prototype.getRevision=nd.prototype.L;nd.prototype.on=nd.prototype.J;
nd.prototype.once=nd.prototype.once;nd.prototype.un=nd.prototype.K;yd.prototype.getMap=yd.prototype.g;yd.prototype.setMap=yd.prototype.setMap;yd.prototype.setTarget=yd.prototype.f;yd.prototype.get=yd.prototype.get;yd.prototype.getKeys=yd.prototype.O;yd.prototype.getProperties=yd.prototype.N;yd.prototype.set=yd.prototype.set;yd.prototype.setProperties=yd.prototype.H;yd.prototype.unset=yd.prototype.P;yd.prototype.changed=yd.prototype.s;yd.prototype.dispatchEvent=yd.prototype.b;
yd.prototype.getRevision=yd.prototype.L;yd.prototype.on=yd.prototype.J;yd.prototype.once=yd.prototype.once;yd.prototype.un=yd.prototype.K;Dd.prototype.getMap=Dd.prototype.g;Dd.prototype.setMap=Dd.prototype.setMap;Dd.prototype.setTarget=Dd.prototype.f;Dd.prototype.get=Dd.prototype.get;Dd.prototype.getKeys=Dd.prototype.O;Dd.prototype.getProperties=Dd.prototype.N;Dd.prototype.set=Dd.prototype.set;Dd.prototype.setProperties=Dd.prototype.H;Dd.prototype.unset=Dd.prototype.P;Dd.prototype.changed=Dd.prototype.s;
Dd.prototype.dispatchEvent=Dd.prototype.b;Dd.prototype.getRevision=Dd.prototype.L;Dd.prototype.on=Dd.prototype.J;Dd.prototype.once=Dd.prototype.once;Dd.prototype.un=Dd.prototype.K;Bk.prototype.getMap=Bk.prototype.g;Bk.prototype.setMap=Bk.prototype.setMap;Bk.prototype.setTarget=Bk.prototype.f;Bk.prototype.get=Bk.prototype.get;Bk.prototype.getKeys=Bk.prototype.O;Bk.prototype.getProperties=Bk.prototype.N;Bk.prototype.set=Bk.prototype.set;Bk.prototype.setProperties=Bk.prototype.H;Bk.prototype.unset=Bk.prototype.P;
Bk.prototype.changed=Bk.prototype.s;Bk.prototype.dispatchEvent=Bk.prototype.b;Bk.prototype.getRevision=Bk.prototype.L;Bk.prototype.on=Bk.prototype.J;Bk.prototype.once=Bk.prototype.once;Bk.prototype.un=Bk.prototype.K;ud.prototype.getMap=ud.prototype.g;ud.prototype.setMap=ud.prototype.setMap;ud.prototype.setTarget=ud.prototype.f;ud.prototype.get=ud.prototype.get;ud.prototype.getKeys=ud.prototype.O;ud.prototype.getProperties=ud.prototype.N;ud.prototype.set=ud.prototype.set;
ud.prototype.setProperties=ud.prototype.H;ud.prototype.unset=ud.prototype.P;ud.prototype.changed=ud.prototype.s;ud.prototype.dispatchEvent=ud.prototype.b;ud.prototype.getRevision=ud.prototype.L;ud.prototype.on=ud.prototype.J;ud.prototype.once=ud.prototype.once;ud.prototype.un=ud.prototype.K;Gk.prototype.getMap=Gk.prototype.g;Gk.prototype.setMap=Gk.prototype.setMap;Gk.prototype.setTarget=Gk.prototype.f;Gk.prototype.get=Gk.prototype.get;Gk.prototype.getKeys=Gk.prototype.O;
Gk.prototype.getProperties=Gk.prototype.N;Gk.prototype.set=Gk.prototype.set;Gk.prototype.setProperties=Gk.prototype.H;Gk.prototype.unset=Gk.prototype.P;Gk.prototype.changed=Gk.prototype.s;Gk.prototype.dispatchEvent=Gk.prototype.b;Gk.prototype.getRevision=Gk.prototype.L;Gk.prototype.on=Gk.prototype.J;Gk.prototype.once=Gk.prototype.once;Gk.prototype.un=Gk.prototype.K;wd.prototype.getMap=wd.prototype.g;wd.prototype.setMap=wd.prototype.setMap;wd.prototype.setTarget=wd.prototype.f;wd.prototype.get=wd.prototype.get;
wd.prototype.getKeys=wd.prototype.O;wd.prototype.getProperties=wd.prototype.N;wd.prototype.set=wd.prototype.set;wd.prototype.setProperties=wd.prototype.H;wd.prototype.unset=wd.prototype.P;wd.prototype.changed=wd.prototype.s;wd.prototype.dispatchEvent=wd.prototype.b;wd.prototype.getRevision=wd.prototype.L;wd.prototype.on=wd.prototype.J;wd.prototype.once=wd.prototype.once;wd.prototype.un=wd.prototype.K;Lk.prototype.getMap=Lk.prototype.g;Lk.prototype.setMap=Lk.prototype.setMap;
Lk.prototype.setTarget=Lk.prototype.f;Lk.prototype.get=Lk.prototype.get;Lk.prototype.getKeys=Lk.prototype.O;Lk.prototype.getProperties=Lk.prototype.N;Lk.prototype.set=Lk.prototype.set;Lk.prototype.setProperties=Lk.prototype.H;Lk.prototype.unset=Lk.prototype.P;Lk.prototype.changed=Lk.prototype.s;Lk.prototype.dispatchEvent=Lk.prototype.b;Lk.prototype.getRevision=Lk.prototype.L;Lk.prototype.on=Lk.prototype.J;Lk.prototype.once=Lk.prototype.once;Lk.prototype.un=Lk.prototype.K;Qk.prototype.getMap=Qk.prototype.g;
Qk.prototype.setMap=Qk.prototype.setMap;Qk.prototype.setTarget=Qk.prototype.f;Qk.prototype.get=Qk.prototype.get;Qk.prototype.getKeys=Qk.prototype.O;Qk.prototype.getProperties=Qk.prototype.N;Qk.prototype.set=Qk.prototype.set;Qk.prototype.setProperties=Qk.prototype.H;Qk.prototype.unset=Qk.prototype.P;Qk.prototype.changed=Qk.prototype.s;Qk.prototype.dispatchEvent=Qk.prototype.b;Qk.prototype.getRevision=Qk.prototype.L;Qk.prototype.on=Qk.prototype.J;Qk.prototype.once=Qk.prototype.once;
Qk.prototype.un=Qk.prototype.K;
  return OPENLAYERS.ol;
}));



/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "map"
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4b9e1fa8", module.exports)
  }
}

/***/ })
/******/ ]);