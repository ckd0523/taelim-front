import {
  init_tiny_invariant,
  invariant
} from "./chunk-U4RNP7XN.js";
import {
  _extends,
  init_extends
} from "./chunk-VQUAN7UM.js";
import {
  require_prop_types
} from "./chunk-XKFK7FOU.js";
import "./chunk-OIOQ25RB.js";
import "./chunk-S7NTK4BX.js";
import {
  require_react
} from "./chunk-SOSU2OUM.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS
} from "./chunk-2LSFTFF7.js";

// node_modules/react-albus/lib/utils/renderCallback.js
var require_renderCallback = __commonJS({
  "node_modules/react-albus/lib/utils/renderCallback.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var renderCallback = function renderCallback2(_ref, wizard) {
      var render = _ref.render, children = _ref.children;
      if (render) {
        return render(wizard);
      } else if (typeof children === "function") {
        return children(wizard);
      }
      return children;
    };
    exports.default = renderCallback;
  }
});

// node_modules/react-albus/lib/components/createWizardComponent.js
var require_createWizardComponent = __commonJS({
  "node_modules/react-albus/lib/components/createWizardComponent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _renderCallback = require_renderCallback();
    var _renderCallback2 = _interopRequireDefault(_renderCallback);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0)
          continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
          continue;
        target[i] = obj[i];
      }
      return target;
    }
    var createWizardComponent = function createWizardComponent2(name) {
      var WizardComponent = function WizardComponent2(props, _ref) {
        var _ref$wizard = _ref.wizard, init = _ref$wizard.init, wizard = _objectWithoutProperties(_ref$wizard, ["init"]);
        return (0, _renderCallback2.default)(props, wizard);
      };
      WizardComponent.contextTypes = {
        wizard: _propTypes2.default.object
      };
      WizardComponent.displayName = name;
      return WizardComponent;
    };
    exports.default = createWizardComponent;
  }
});

// node_modules/resolve-pathname/esm/resolve-pathname.js
function isAbsolute(pathname) {
  return pathname.charAt(0) === "/";
}
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }
  list.pop();
}
function resolvePathname(to, from) {
  if (from === void 0)
    from = "";
  var toParts = to && to.split("/") || [];
  var fromParts = from && from.split("/") || [];
  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;
  if (to && isAbsolute(to)) {
    fromParts = toParts;
  } else if (toParts.length) {
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }
  if (!fromParts.length)
    return "/";
  var hasTrailingSlash;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === "." || last === ".." || last === "";
  } else {
    hasTrailingSlash = false;
  }
  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];
    if (part === ".") {
      spliceOne(fromParts, i);
    } else if (part === "..") {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }
  if (!mustEndAbs)
    for (; up--; up)
      fromParts.unshift("..");
  if (mustEndAbs && fromParts[0] !== "" && (!fromParts[0] || !isAbsolute(fromParts[0])))
    fromParts.unshift("");
  var result = fromParts.join("/");
  if (hasTrailingSlash && result.substr(-1) !== "/")
    result += "/";
  return result;
}
var resolve_pathname_default;
var init_resolve_pathname = __esm({
  "node_modules/resolve-pathname/esm/resolve-pathname.js"() {
    resolve_pathname_default = resolvePathname;
  }
});

// node_modules/value-equal/esm/value-equal.js
function valueOf(obj) {
  return obj.valueOf ? obj.valueOf() : Object.prototype.valueOf.call(obj);
}
function valueEqual(a, b) {
  if (a === b)
    return true;
  if (a == null || b == null)
    return false;
  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function(item, index) {
      return valueEqual(item, b[index]);
    });
  }
  if (typeof a === "object" || typeof b === "object") {
    var aValue = valueOf(a);
    var bValue = valueOf(b);
    if (aValue !== a || bValue !== b)
      return valueEqual(aValue, bValue);
    return Object.keys(Object.assign({}, a, b)).every(function(key) {
      return valueEqual(a[key], b[key]);
    });
  }
  return false;
}
var value_equal_default;
var init_value_equal = __esm({
  "node_modules/value-equal/esm/value-equal.js"() {
    value_equal_default = valueEqual;
  }
});

// node_modules/tiny-warning/dist/tiny-warning.esm.js
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }
    var text = "Warning: " + message;
    if (typeof console !== "undefined") {
      console.warn(text);
    }
    try {
      throw Error(text);
    } catch (x) {
    }
  }
}
var isProduction, tiny_warning_esm_default;
var init_tiny_warning_esm = __esm({
  "node_modules/tiny-warning/dist/tiny-warning.esm.js"() {
    isProduction = false;
    tiny_warning_esm_default = warning;
  }
});

// node_modules/history/esm/history.js
var history_exports = {};
__export(history_exports, {
  createBrowserHistory: () => createBrowserHistory,
  createHashHistory: () => createHashHistory,
  createLocation: () => createLocation,
  createMemoryHistory: () => createMemoryHistory,
  createPath: () => createPath,
  locationsAreEqual: () => locationsAreEqual,
  parsePath: () => parsePath
});
function addLeadingSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
}
function stripLeadingSlash(path) {
  return path.charAt(0) === "/" ? path.substr(1) : path;
}
function hasBasename(path, prefix) {
  return path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 && "/?#".indexOf(path.charAt(prefix.length)) !== -1;
}
function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}
function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === "/" ? path.slice(0, -1) : path;
}
function parsePath(path) {
  var pathname = path || "/";
  var search = "";
  var hash = "";
  var hashIndex = pathname.indexOf("#");
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }
  var searchIndex = pathname.indexOf("?");
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }
  return {
    pathname,
    search: search === "?" ? "" : search,
    hash: hash === "#" ? "" : hash
  };
}
function createPath(location) {
  var pathname = location.pathname, search = location.search, hash = location.hash;
  var path = pathname || "/";
  if (search && search !== "?")
    path += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    path += hash.charAt(0) === "#" ? hash : "#" + hash;
  return path;
}
function createLocation(path, state, key, currentLocation) {
  var location;
  if (typeof path === "string") {
    location = parsePath(path);
    location.state = state;
  } else {
    location = _extends({}, path);
    if (location.pathname === void 0)
      location.pathname = "";
    if (location.search) {
      if (location.search.charAt(0) !== "?")
        location.search = "?" + location.search;
    } else {
      location.search = "";
    }
    if (location.hash) {
      if (location.hash.charAt(0) !== "#")
        location.hash = "#" + location.hash;
    } else {
      location.hash = "";
    }
    if (state !== void 0 && location.state === void 0)
      location.state = state;
  }
  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }
  if (key)
    location.key = key;
  if (currentLocation) {
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== "/") {
      location.pathname = resolve_pathname_default(location.pathname, currentLocation.pathname);
    }
  } else {
    if (!location.pathname) {
      location.pathname = "/";
    }
  }
  return location;
}
function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && value_equal_default(a.state, b.state);
}
function createTransitionManager() {
  var prompt = null;
  function setPrompt(nextPrompt) {
    true ? tiny_warning_esm_default(prompt == null, "A history supports only one prompt at a time") : void 0;
    prompt = nextPrompt;
    return function() {
      if (prompt === nextPrompt)
        prompt = null;
    };
  }
  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    if (prompt != null) {
      var result = typeof prompt === "function" ? prompt(location, action) : prompt;
      if (typeof result === "string") {
        if (typeof getUserConfirmation === "function") {
          getUserConfirmation(result, callback);
        } else {
          true ? tiny_warning_esm_default(false, "A history needs a getUserConfirmation function in order to use a prompt message") : void 0;
          callback(true);
        }
      } else {
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }
  var listeners = [];
  function appendListener(fn) {
    var isActive = true;
    function listener() {
      if (isActive)
        fn.apply(void 0, arguments);
    }
    listeners.push(listener);
    return function() {
      isActive = false;
      listeners = listeners.filter(function(item) {
        return item !== listener;
      });
    };
  }
  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    listeners.forEach(function(listener) {
      return listener.apply(void 0, args);
    });
  }
  return {
    setPrompt,
    confirmTransitionTo,
    appendListener,
    notifyListeners
  };
}
function getConfirmation(message, callback) {
  callback(window.confirm(message));
}
function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf("Android 2.") !== -1 || ua.indexOf("Android 4.0") !== -1) && ua.indexOf("Mobile Safari") !== -1 && ua.indexOf("Chrome") === -1 && ua.indexOf("Windows Phone") === -1)
    return false;
  return window.history && "pushState" in window.history;
}
function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf("Trident") === -1;
}
function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf("Firefox") === -1;
}
function isExtraneousPopstateEvent(event) {
  return event.state === void 0 && navigator.userAgent.indexOf("CriOS") === -1;
}
function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    return {};
  }
}
function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }
  !canUseDOM ? true ? invariant(false, "Browser history needs a DOM") : invariant(false) : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props, _props$forceRefresh = _props.forceRefresh, forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh, _props$getUserConfirm = _props.getUserConfirmation, getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm, _props$keyLength = _props.keyLength, keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : "";
  function getDOMLocation(historyState) {
    var _ref = historyState || {}, key = _ref.key, state = _ref.state;
    var _window$location = window.location, pathname = _window$location.pathname, search = _window$location.search, hash = _window$location.hash;
    var path = pathname + search + hash;
    true ? tiny_warning_esm_default(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "' + path + '" to begin with "' + basename + '".') : void 0;
    if (basename)
      path = stripBasename(path, basename);
    return createLocation(path, state, key);
  }
  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }
  var transitionManager = createTransitionManager();
  function setState(nextState) {
    _extends(history, nextState);
    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }
  function handlePopState(event) {
    if (isExtraneousPopstateEvent(event))
      return;
    handlePop(getDOMLocation(event.state));
  }
  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }
  var forceNextPop = false;
  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = "POP";
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
        if (ok) {
          setState({
            action,
            location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }
  function revertPop(fromLocation) {
    var toLocation = history.location;
    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1)
      toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1)
      fromIndex = 0;
    var delta = toIndex - fromIndex;
    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }
  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key];
  function createHref(location) {
    return basename + createPath(location);
  }
  function push(path, state) {
    true ? tiny_warning_esm_default(!(typeof path === "object" && path.state !== void 0 && state !== void 0), "You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored") : void 0;
    var action = "PUSH";
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
      if (!ok)
        return;
      var href = createHref(location);
      var key = location.key, state2 = location.state;
      if (canUseHistory) {
        globalHistory.pushState({
          key,
          state: state2
        }, null, href);
        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action,
            location
          });
        }
      } else {
        true ? tiny_warning_esm_default(state2 === void 0, "Browser history cannot push state in browsers that do not support HTML5 history") : void 0;
        window.location.href = href;
      }
    });
  }
  function replace(path, state) {
    true ? tiny_warning_esm_default(!(typeof path === "object" && path.state !== void 0 && state !== void 0), "You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored") : void 0;
    var action = "REPLACE";
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
      if (!ok)
        return;
      var href = createHref(location);
      var key = location.key, state2 = location.state;
      if (canUseHistory) {
        globalHistory.replaceState({
          key,
          state: state2
        }, null, href);
        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1)
            allKeys[prevIndex] = location.key;
          setState({
            action,
            location
          });
        }
      } else {
        true ? tiny_warning_esm_default(state2 === void 0, "Browser history cannot replace state in browsers that do not support HTML5 history") : void 0;
        window.location.replace(href);
      }
    });
  }
  function go(n) {
    globalHistory.go(n);
  }
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1);
  }
  var listenerCount = 0;
  function checkDOMListeners(delta) {
    listenerCount += delta;
    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener)
        window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener)
        window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }
  var isBlocked = false;
  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }
    var unblock = transitionManager.setPrompt(prompt);
    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }
    return function() {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }
      return unblock();
    };
  }
  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function() {
      checkDOMListeners(-1);
      unlisten();
    };
  }
  var history = {
    length: globalHistory.length,
    action: "POP",
    location: initialLocation,
    createHref,
    push,
    replace,
    go,
    goBack,
    goForward,
    block,
    listen
  };
  return history;
}
function stripHash(url) {
  var hashIndex = url.indexOf("#");
  return hashIndex === -1 ? url : url.slice(0, hashIndex);
}
function getHashPath() {
  var href = window.location.href;
  var hashIndex = href.indexOf("#");
  return hashIndex === -1 ? "" : href.substring(hashIndex + 1);
}
function pushHashPath(path) {
  window.location.hash = path;
}
function replaceHashPath(path) {
  window.location.replace(stripHash(window.location.href) + "#" + path);
}
function createHashHistory(props) {
  if (props === void 0) {
    props = {};
  }
  !canUseDOM ? true ? invariant(false, "Hash history needs a DOM") : invariant(false) : void 0;
  var globalHistory = window.history;
  var canGoWithoutReload = supportsGoWithoutReloadUsingHash();
  var _props = props, _props$getUserConfirm = _props.getUserConfirmation, getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm, _props$hashType = _props.hashType, hashType = _props$hashType === void 0 ? "slash" : _props$hashType;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : "";
  var _HashPathCoders$hashT = HashPathCoders[hashType], encodePath2 = _HashPathCoders$hashT.encodePath, decodePath2 = _HashPathCoders$hashT.decodePath;
  function getDOMLocation() {
    var path2 = decodePath2(getHashPath());
    true ? tiny_warning_esm_default(!basename || hasBasename(path2, basename), 'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "' + path2 + '" to begin with "' + basename + '".') : void 0;
    if (basename)
      path2 = stripBasename(path2, basename);
    return createLocation(path2);
  }
  var transitionManager = createTransitionManager();
  function setState(nextState) {
    _extends(history, nextState);
    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }
  var forceNextPop = false;
  var ignorePath = null;
  function locationsAreEqual$$1(a, b) {
    return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash;
  }
  function handleHashChange() {
    var path2 = getHashPath();
    var encodedPath2 = encodePath2(path2);
    if (path2 !== encodedPath2) {
      replaceHashPath(encodedPath2);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;
      if (!forceNextPop && locationsAreEqual$$1(prevLocation, location))
        return;
      if (ignorePath === createPath(location))
        return;
      ignorePath = null;
      handlePop(location);
    }
  }
  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = "POP";
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
        if (ok) {
          setState({
            action,
            location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }
  function revertPop(fromLocation) {
    var toLocation = history.location;
    var toIndex = allPaths.lastIndexOf(createPath(toLocation));
    if (toIndex === -1)
      toIndex = 0;
    var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
    if (fromIndex === -1)
      fromIndex = 0;
    var delta = toIndex - fromIndex;
    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }
  var path = getHashPath();
  var encodedPath = encodePath2(path);
  if (path !== encodedPath)
    replaceHashPath(encodedPath);
  var initialLocation = getDOMLocation();
  var allPaths = [createPath(initialLocation)];
  function createHref(location) {
    var baseTag = document.querySelector("base");
    var href = "";
    if (baseTag && baseTag.getAttribute("href")) {
      href = stripHash(window.location.href);
    }
    return href + "#" + encodePath2(basename + createPath(location));
  }
  function push(path2, state) {
    true ? tiny_warning_esm_default(state === void 0, "Hash history cannot push state; it is ignored") : void 0;
    var action = "PUSH";
    var location = createLocation(path2, void 0, void 0, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
      if (!ok)
        return;
      var path3 = createPath(location);
      var encodedPath2 = encodePath2(basename + path3);
      var hashChanged = getHashPath() !== encodedPath2;
      if (hashChanged) {
        ignorePath = path3;
        pushHashPath(encodedPath2);
        var prevIndex = allPaths.lastIndexOf(createPath(history.location));
        var nextPaths = allPaths.slice(0, prevIndex + 1);
        nextPaths.push(path3);
        allPaths = nextPaths;
        setState({
          action,
          location
        });
      } else {
        true ? tiny_warning_esm_default(false, "Hash history cannot PUSH the same path; a new entry will not be added to the history stack") : void 0;
        setState();
      }
    });
  }
  function replace(path2, state) {
    true ? tiny_warning_esm_default(state === void 0, "Hash history cannot replace state; it is ignored") : void 0;
    var action = "REPLACE";
    var location = createLocation(path2, void 0, void 0, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
      if (!ok)
        return;
      var path3 = createPath(location);
      var encodedPath2 = encodePath2(basename + path3);
      var hashChanged = getHashPath() !== encodedPath2;
      if (hashChanged) {
        ignorePath = path3;
        replaceHashPath(encodedPath2);
      }
      var prevIndex = allPaths.indexOf(createPath(history.location));
      if (prevIndex !== -1)
        allPaths[prevIndex] = path3;
      setState({
        action,
        location
      });
    });
  }
  function go(n) {
    true ? tiny_warning_esm_default(canGoWithoutReload, "Hash history go(n) causes a full page reload in this browser") : void 0;
    globalHistory.go(n);
  }
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1);
  }
  var listenerCount = 0;
  function checkDOMListeners(delta) {
    listenerCount += delta;
    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(HashChangeEvent$1, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(HashChangeEvent$1, handleHashChange);
    }
  }
  var isBlocked = false;
  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }
    var unblock = transitionManager.setPrompt(prompt);
    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }
    return function() {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }
      return unblock();
    };
  }
  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function() {
      checkDOMListeners(-1);
      unlisten();
    };
  }
  var history = {
    length: globalHistory.length,
    action: "POP",
    location: initialLocation,
    createHref,
    push,
    replace,
    go,
    goBack,
    goForward,
    block,
    listen
  };
  return history;
}
function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}
function createMemoryHistory(props) {
  if (props === void 0) {
    props = {};
  }
  var _props = props, getUserConfirmation = _props.getUserConfirmation, _props$initialEntries = _props.initialEntries, initialEntries = _props$initialEntries === void 0 ? ["/"] : _props$initialEntries, _props$initialIndex = _props.initialIndex, initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex, _props$keyLength = _props.keyLength, keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var transitionManager = createTransitionManager();
  function setState(nextState) {
    _extends(history, nextState);
    history.length = history.entries.length;
    transitionManager.notifyListeners(history.location, history.action);
  }
  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }
  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function(entry) {
    return typeof entry === "string" ? createLocation(entry, void 0, createKey()) : createLocation(entry, void 0, entry.key || createKey());
  });
  var createHref = createPath;
  function push(path, state) {
    true ? tiny_warning_esm_default(!(typeof path === "object" && path.state !== void 0 && state !== void 0), "You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored") : void 0;
    var action = "PUSH";
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
      if (!ok)
        return;
      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;
      var nextEntries = history.entries.slice(0);
      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }
      setState({
        action,
        location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  }
  function replace(path, state) {
    true ? tiny_warning_esm_default(!(typeof path === "object" && path.state !== void 0 && state !== void 0), "You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored") : void 0;
    var action = "REPLACE";
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
      if (!ok)
        return;
      history.entries[history.index] = location;
      setState({
        action,
        location
      });
    });
  }
  function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
    var action = "POP";
    var location = history.entries[nextIndex];
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
      if (ok) {
        setState({
          action,
          location,
          index: nextIndex
        });
      } else {
        setState();
      }
    });
  }
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1);
  }
  function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  }
  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }
    return transitionManager.setPrompt(prompt);
  }
  function listen(listener) {
    return transitionManager.appendListener(listener);
  }
  var history = {
    length: entries.length,
    action: "POP",
    location: entries[index],
    index,
    entries,
    createHref,
    push,
    replace,
    go,
    goBack,
    goForward,
    canGo,
    block,
    listen
  };
  return history;
}
var canUseDOM, PopStateEvent, HashChangeEvent, HashChangeEvent$1, HashPathCoders;
var init_history = __esm({
  "node_modules/history/esm/history.js"() {
    init_extends();
    init_resolve_pathname();
    init_value_equal();
    init_tiny_warning_esm();
    init_tiny_invariant();
    canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
    PopStateEvent = "popstate";
    HashChangeEvent = "hashchange";
    HashChangeEvent$1 = "hashchange";
    HashPathCoders = {
      hashbang: {
        encodePath: function encodePath(path) {
          return path.charAt(0) === "!" ? path : "!/" + stripLeadingSlash(path);
        },
        decodePath: function decodePath(path) {
          return path.charAt(0) === "!" ? path.substr(1) : path;
        }
      },
      noslash: {
        encodePath: stripLeadingSlash,
        decodePath: addLeadingSlash
      },
      slash: {
        encodePath: addLeadingSlash,
        decodePath: addLeadingSlash
      }
    };
  }
});

// node_modules/react-albus/lib/components/Wizard.js
var require_Wizard = __commonJS({
  "node_modules/react-albus/lib/components/Wizard.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _extends2 = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _slicedToArray = function() {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"])
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      return function(arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _react = require_react();
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _history = (init_history(), __toCommonJS(history_exports));
    var _renderCallback = require_renderCallback();
    var _renderCallback2 = _interopRequireDefault(_renderCallback);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0)
          continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
          continue;
        target[i] = obj[i];
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Wizard = function(_Component) {
      _inherits(Wizard2, _Component);
      function Wizard2() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Wizard2);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Wizard2.__proto__ || Object.getPrototypeOf(Wizard2)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          step: {
            id: null
          },
          steps: []
        }, _this.history = _this.props.history || (0, _history.createMemoryHistory)(), _this.steps = [], _this.pathToStep = function(pathname) {
          var id = pathname.replace(_this.basename, "");
          var _this$state$steps$fil = _this.state.steps.filter(function(s) {
            return s.id === id;
          }), _this$state$steps$fil2 = _slicedToArray(_this$state$steps$fil, 1), step = _this$state$steps$fil2[0];
          return step || _this.state.step;
        }, _this.init = function(steps) {
          _this.setState({ steps }, function() {
            var step = _this.pathToStep(_this.history.location.pathname);
            if (step.id) {
              _this.setState({ step });
            } else {
              _this.history.replace("" + _this.basename + _this.ids[0]);
            }
          });
        }, _this.push = function() {
          var step = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : _this.nextStep;
          return _this.history.push("" + _this.basename + step);
        }, _this.replace = function() {
          var step = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : _this.nextStep;
          return _this.history.replace("" + _this.basename + step);
        }, _this.next = function() {
          if (_this.props.onNext) {
            _this.props.onNext(_this.getChildContext().wizard);
          } else {
            _this.push();
          }
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }
      _createClass(Wizard2, [{
        key: "getChildContext",
        value: function getChildContext() {
          return {
            wizard: _extends2({
              go: this.history.go,
              history: this.history,
              init: this.init,
              next: this.next,
              previous: this.history.goBack,
              push: this.push,
              replace: this.replace
            }, this.state)
          };
        }
      }, {
        key: "componentWillMount",
        value: function componentWillMount() {
          var _this2 = this;
          this.unlisten = this.history.listen(function(_ref2) {
            var pathname = _ref2.pathname;
            return _this2.setState({ step: _this2.pathToStep(pathname) });
          });
          if (this.props.onNext) {
            var _getChildContext$wiza = this.getChildContext().wizard, init = _getChildContext$wiza.init, wizard = _objectWithoutProperties(_getChildContext$wiza, ["init"]);
            this.props.onNext(wizard);
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.unlisten();
        }
      }, {
        key: "render",
        value: function render() {
          var _getChildContext$wiza2 = this.getChildContext().wizard, init = _getChildContext$wiza2.init, wizard = _objectWithoutProperties(_getChildContext$wiza2, ["init"]);
          return (0, _renderCallback2.default)(this.props, wizard);
        }
      }, {
        key: "basename",
        get: function get() {
          return this.props.basename + "/";
        }
      }, {
        key: "ids",
        get: function get() {
          return this.state.steps.map(function(s) {
            return s.id;
          });
        }
      }, {
        key: "nextStep",
        get: function get() {
          return this.ids[this.ids.indexOf(this.state.step.id) + 1];
        }
      }]);
      return Wizard2;
    }(_react.Component);
    Wizard.propTypes = {
      basename: _propTypes2.default.string,
      history: _propTypes2.default.shape({
        entries: _propTypes2.default.array,
        go: _propTypes2.default.func,
        goBack: _propTypes2.default.func,
        listen: _propTypes2.default.func,
        location: _propTypes2.default.object,
        push: _propTypes2.default.func,
        replace: _propTypes2.default.func
      }),
      onNext: _propTypes2.default.func
    };
    Wizard.defaultProps = {
      basename: "",
      history: null,
      onNext: null,
      render: null
    };
    Wizard.childContextTypes = {
      wizard: _propTypes2.default.object
    };
    exports.default = Wizard;
  }
});

// node_modules/react-albus/lib/components/Steps.js
var require_Steps = __commonJS({
  "node_modules/react-albus/lib/components/Steps.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _slicedToArray = function() {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"])
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      return function(arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0)
          continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
          continue;
        target[i] = obj[i];
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Steps = function(_Component) {
      _inherits(Steps2, _Component);
      function Steps2() {
        _classCallCheck(this, Steps2);
        return _possibleConstructorReturn(this, (Steps2.__proto__ || Object.getPrototypeOf(Steps2)).apply(this, arguments));
      }
      _createClass(Steps2, [{
        key: "componentWillMount",
        value: function componentWillMount() {
          var steps = _react2.default.Children.map(this.props.children, function(_ref) {
            var _ref$props = _ref.props, children = _ref$props.children, render = _ref$props.render, config = _objectWithoutProperties(_ref$props, ["children", "render"]);
            return config;
          });
          this.context.wizard.init(steps);
        }
      }, {
        key: "render",
        value: function render() {
          var _ref2 = this.props.step || this.context.wizard.step, activeId = _ref2.id;
          var _React$Children$toArr = _react2.default.Children.toArray(this.props.children).filter(function(_ref3) {
            var id = _ref3.props.id;
            return id === activeId;
          }), _React$Children$toArr2 = _slicedToArray(_React$Children$toArr, 1), _React$Children$toArr3 = _React$Children$toArr2[0], child = _React$Children$toArr3 === void 0 ? null : _React$Children$toArr3;
          return child;
        }
      }]);
      return Steps2;
    }(_react.Component);
    Steps.propTypes = {
      children: _propTypes2.default.node.isRequired,
      step: _propTypes2.default.shape({
        id: _propTypes2.default.string.isRequired
      })
    };
    Steps.defaultProps = {
      step: null
    };
    Steps.contextTypes = {
      wizard: _propTypes2.default.object
    };
    exports.default = Steps;
  }
});

// node_modules/react-albus/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var require_hoist_non_react_statics_cjs = __commonJS({
  "node_modules/react-albus/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"(exports, module) {
    "use strict";
    var REACT_STATICS = {
      childContextTypes: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true
    };
    var KNOWN_STATICS = {
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
    };
    var defineProperty = Object.defineProperty;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectPrototype = getPrototypeOf && getPrototypeOf(Object);
    function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
      if (typeof sourceComponent !== "string") {
        if (objectPrototype) {
          var inheritedComponent = getPrototypeOf(sourceComponent);
          if (inheritedComponent && inheritedComponent !== objectPrototype) {
            hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
          }
        }
        var keys = getOwnPropertyNames(sourceComponent);
        if (getOwnPropertySymbols) {
          keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
            var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
            try {
              defineProperty(targetComponent, key, descriptor);
            } catch (e) {
            }
          }
        }
        return targetComponent;
      }
      return targetComponent;
    }
    module.exports = hoistNonReactStatics;
  }
});

// node_modules/react-albus/lib/withWizard.js
var require_withWizard = __commonJS({
  "node_modules/react-albus/lib/withWizard.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _extends2 = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _hoistNonReactStatics = require_hoist_non_react_statics_cjs();
    var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0)
          continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
          continue;
        target[i] = obj[i];
      }
      return target;
    }
    var withWizard = function withWizard2(Component) {
      var WithWizard = function WithWizard2(props, _ref) {
        var _ref$wizard = _ref.wizard, init = _ref$wizard.init, wizard = _objectWithoutProperties(_ref$wizard, ["init"]);
        return _react2.default.createElement(Component, _extends2({
          wizard
        }, props));
      };
      WithWizard.contextTypes = {
        wizard: _propTypes2.default.object
      };
      WithWizard.displayName = "withWizard(" + (Component.displayName || Component.name) + ")";
      WithWizard.WrappedComponent = Component;
      return (0, _hoistNonReactStatics2.default)(WithWizard, Component);
    };
    exports.default = withWizard;
  }
});

// node_modules/react-albus/lib/wizardShape.js
var require_wizardShape = __commonJS({
  "node_modules/react-albus/lib/wizardShape.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    exports.default = _propTypes2.default.shape({
      go: _propTypes2.default.func.isRequired,
      history: _propTypes2.default.object.isRequired,
      next: _propTypes2.default.func.isRequired,
      previous: _propTypes2.default.func.isRequired,
      push: _propTypes2.default.func.isRequired,
      replace: _propTypes2.default.func.isRequired,
      step: _propTypes2.default.shape({
        id: _propTypes2.default.string.isRequired
      }).isRequired,
      steps: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        id: _propTypes2.default.string.isRequired
      }).isRequired).isRequired
    });
  }
});

// node_modules/react-albus/lib/index.js
var require_lib = __commonJS({
  "node_modules/react-albus/lib/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.wizardShape = exports.withWizard = exports.Steps = exports.Wizard = exports.WithWizard = exports.Step = void 0;
    var _createWizardComponent = require_createWizardComponent();
    var _createWizardComponent2 = _interopRequireDefault(_createWizardComponent);
    var _Wizard2 = require_Wizard();
    var _Wizard3 = _interopRequireDefault(_Wizard2);
    var _Steps2 = require_Steps();
    var _Steps3 = _interopRequireDefault(_Steps2);
    var _withWizard2 = require_withWizard();
    var _withWizard3 = _interopRequireDefault(_withWizard2);
    var _wizardShape2 = require_wizardShape();
    var _wizardShape3 = _interopRequireDefault(_wizardShape2);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var Step = (0, _createWizardComponent2.default)("Step");
    var WithWizard = (0, _createWizardComponent2.default)("WithWizard");
    exports.Step = Step;
    exports.WithWizard = WithWizard;
    exports.Wizard = _Wizard3.default;
    exports.Steps = _Steps3.default;
    exports.withWizard = _withWizard3.default;
    exports.wizardShape = _wizardShape3.default;
  }
});
export default require_lib();
//# sourceMappingURL=react-albus.js.map
