import {
  _objectWithoutProperties,
  _slicedToArray
} from "./chunk-OO7MPBFE.js";
import {
  usePopper
} from "./chunk-FS2LYNAJ.js";
import {
  _assertThisInitialized,
  _classCallCheck,
  _createClass,
  _getPrototypeOf,
  _inherits,
  _possibleConstructorReturn
} from "./chunk-FJEXOSVU.js";
import "./chunk-A4WGF3LP.js";
import {
  _defineProperty
} from "./chunk-MM6YPM6B.js";
import {
  contains,
  require_browser,
  useForceUpdate,
  usePrevious
} from "./chunk-IKFZFGTM.js";
import {
  require_warning
} from "./chunk-H2QHAF7O.js";
import {
  listen_default,
  ownerDocument,
  useEventCallback
} from "./chunk-GEJUQJDF.js";
import "./chunk-PSGUSLG5.js";
import "./chunk-KM5JISHU.js";
import {
  _extends,
  init_extends
} from "./chunk-VQUAN7UM.js";
import {
  require_prop_types
} from "./chunk-XKFK7FOU.js";
import "./chunk-OIOQ25RB.js";
import {
  require_fast_deep_equal
} from "./chunk-RAKMHYX2.js";
import {
  require_classnames
} from "./chunk-D6SQWUSH.js";
import "./chunk-S7NTK4BX.js";
import {
  require_react_dom
} from "./chunk-NK66VB5V.js";
import {
  require_react
} from "./chunk-SOSU2OUM.js";
import {
  __commonJS,
  __toESM
} from "./chunk-2LSFTFF7.js";

// node_modules/lodash.debounce/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.debounce/index.js"(exports, module) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    var now = function() {
      return root.Date.now();
    };
    function debounce2(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
        return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = debounce2;
  }
});

// node_modules/react-bootstrap-typeahead/es/components/AsyncTypeahead/AsyncTypeahead.js
init_extends();
var import_react22 = __toESM(require_react());

// node_modules/react-bootstrap-typeahead/es/behaviors/async.js
init_extends();
var import_lodash = __toESM(require_lodash());
var import_prop_types2 = __toESM(require_prop_types());
var import_react = __toESM(require_react());

// node_modules/react-bootstrap-typeahead/es/propTypes.js
var import_prop_types = __toESM(require_prop_types());

// node_modules/react-bootstrap-typeahead/es/constants.js
var ALIGN_VALUES = ["justify", "left", "right"];
var DEFAULT_LABELKEY = "label";
var SIZES = ["lg", "sm"];

// node_modules/react-bootstrap-typeahead/es/utils/getOptionLabel.js
var import_invariant = __toESM(require_browser());

// node_modules/react-bootstrap-typeahead/es/utils/getStringLabelKey.js
function getStringLabelKey(labelKey) {
  return typeof labelKey === "string" ? labelKey : DEFAULT_LABELKEY;
}

// node_modules/react-bootstrap-typeahead/es/utils/hasOwnProperty.js
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// node_modules/react-bootstrap-typeahead/es/utils/nodash.js
var idCounter = 0;
function isFunction(value) {
  return typeof value === "function";
}
function isString(value) {
  return typeof value === "string";
}
function noop() {
}
function pick(obj, keys) {
  var result = {};
  keys.forEach(function(key) {
    result[key] = obj[key];
  });
  return result;
}
function uniqueId(prefix) {
  idCounter += 1;
  return (prefix == null ? "" : String(prefix)) + idCounter;
}

// node_modules/react-bootstrap-typeahead/es/utils/getOptionLabel.js
function getOptionLabel(option, labelKey) {
  if (!isString(option) && (hasOwnProperty(option, "paginationOption") || hasOwnProperty(option, "customOption"))) {
    return option[getStringLabelKey(labelKey)];
  }
  var optionLabel;
  if (isFunction(labelKey)) {
    optionLabel = labelKey(option);
  } else if (isString(option)) {
    optionLabel = option;
  } else {
    optionLabel = option[labelKey];
  }
  !isString(optionLabel) ? true ? (0, import_invariant.default)(false, "One or more options does not have a valid label string. Check the `labelKey` prop to ensure that it matches the correct option key and provides a string for filtering and display.") : (0, import_invariant.default)(false) : void 0;
  return optionLabel;
}
var getOptionLabel_default = getOptionLabel;

// node_modules/react-bootstrap-typeahead/es/utils/addCustomOption.js
function addCustomOption(results, props) {
  var allowNew = props.allowNew, labelKey = props.labelKey, text = props.text;
  if (!allowNew || !text.trim()) {
    return false;
  }
  if (isFunction(allowNew)) {
    return allowNew(results, props);
  }
  return !results.some(function(o3) {
    return getOptionLabel_default(o3, labelKey) === text;
  });
}
var addCustomOption_default = addCustomOption;

// node_modules/react-bootstrap-typeahead/es/utils/defaultFilterBy.js
var import_fast_deep_equal = __toESM(require_fast_deep_equal());

// node_modules/react-bootstrap-typeahead/es/utils/getOptionProperty.js
function getOptionProperty(option, key) {
  if (isString(option)) {
    return void 0;
  }
  return option[key];
}

// node_modules/react-bootstrap-typeahead/es/utils/stripDiacritics.js
var map = [{
  base: "A",
  letters: "AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"
}, {
  base: "AA",
  letters: "Ꜳ"
}, {
  base: "AE",
  letters: "ÆǼǢ"
}, {
  base: "AO",
  letters: "Ꜵ"
}, {
  base: "AU",
  letters: "Ꜷ"
}, {
  base: "AV",
  letters: "ꜸꜺ"
}, {
  base: "AY",
  letters: "Ꜽ"
}, {
  base: "B",
  letters: "BⒷＢḂḄḆɃƂƁ"
}, {
  base: "C",
  letters: "CⒸＣĆĈĊČÇḈƇȻꜾ"
}, {
  base: "D",
  letters: "DⒹＤḊĎḌḐḒḎĐƋƊƉꝹÐ"
}, {
  base: "DZ",
  letters: "ǱǄ"
}, {
  base: "Dz",
  letters: "ǲǅ"
}, {
  base: "E",
  letters: "EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ"
}, {
  base: "F",
  letters: "FⒻＦḞƑꝻ"
}, {
  base: "G",
  letters: "GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ"
}, {
  base: "H",
  letters: "HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"
}, {
  base: "I",
  letters: "IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"
}, {
  base: "J",
  letters: "JⒿＪĴɈ"
}, {
  base: "K",
  letters: "KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"
}, {
  base: "L",
  letters: "LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"
}, {
  base: "LJ",
  letters: "Ǉ"
}, {
  base: "Lj",
  letters: "ǈ"
}, {
  base: "M",
  letters: "MⓂＭḾṀṂⱮƜ"
}, {
  base: "N",
  letters: "NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ"
}, {
  base: "NJ",
  letters: "Ǌ"
}, {
  base: "Nj",
  letters: "ǋ"
}, {
  base: "O",
  letters: "OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"
}, {
  base: "OI",
  letters: "Ƣ"
}, {
  base: "OO",
  letters: "Ꝏ"
}, {
  base: "OU",
  letters: "Ȣ"
}, {
  base: "OE",
  letters: "Œ"
}, {
  base: "oe",
  letters: "œ"
}, {
  base: "P",
  letters: "PⓅＰṔṖƤⱣꝐꝒꝔ"
}, {
  base: "Q",
  letters: "QⓆＱꝖꝘɊ"
}, {
  base: "R",
  letters: "RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"
}, {
  base: "S",
  letters: "SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"
}, {
  base: "T",
  letters: "TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"
}, {
  base: "TZ",
  letters: "Ꜩ"
}, {
  base: "U",
  letters: "UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"
}, {
  base: "V",
  letters: "VⓋＶṼṾƲꝞɅ"
}, {
  base: "VY",
  letters: "Ꝡ"
}, {
  base: "W",
  letters: "WⓌＷẀẂŴẆẄẈⱲ"
}, {
  base: "X",
  letters: "XⓍＸẊẌ"
}, {
  base: "Y",
  letters: "YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"
}, {
  base: "Z",
  letters: "ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"
}, {
  base: "a",
  letters: "aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ"
}, {
  base: "aa",
  letters: "ꜳ"
}, {
  base: "ae",
  letters: "æǽǣ"
}, {
  base: "ao",
  letters: "ꜵ"
}, {
  base: "au",
  letters: "ꜷ"
}, {
  base: "av",
  letters: "ꜹꜻ"
}, {
  base: "ay",
  letters: "ꜽ"
}, {
  base: "b",
  letters: "bⓑｂḃḅḇƀƃɓ"
}, {
  base: "c",
  letters: "cⓒｃćĉċčçḉƈȼꜿↄ"
}, {
  base: "d",
  letters: "dⓓｄḋďḍḑḓḏđƌɖɗꝺ"
}, {
  base: "dz",
  letters: "ǳǆ"
}, {
  base: "e",
  letters: "eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ"
}, {
  base: "f",
  letters: "fⓕｆḟƒꝼ"
}, {
  base: "g",
  letters: "gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ"
}, {
  base: "h",
  letters: "hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"
}, {
  base: "hv",
  letters: "ƕ"
}, {
  base: "i",
  letters: "iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"
}, {
  base: "j",
  letters: "jⓙｊĵǰɉ"
}, {
  base: "k",
  letters: "kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"
}, {
  base: "l",
  letters: "lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ"
}, {
  base: "lj",
  letters: "ǉ"
}, {
  base: "m",
  letters: "mⓜｍḿṁṃɱɯ"
}, {
  base: "n",
  letters: "nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ"
}, {
  base: "nj",
  letters: "ǌ"
}, {
  base: "o",
  letters: "oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ"
}, {
  base: "oi",
  letters: "ƣ"
}, {
  base: "ou",
  letters: "ȣ"
}, {
  base: "oo",
  letters: "ꝏ"
}, {
  base: "p",
  letters: "pⓟｐṕṗƥᵽꝑꝓꝕ"
}, {
  base: "q",
  letters: "qⓠｑɋꝗꝙ"
}, {
  base: "r",
  letters: "rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"
}, {
  base: "s",
  letters: "sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ"
}, {
  base: "t",
  letters: "tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"
}, {
  base: "tz",
  letters: "ꜩ"
}, {
  base: "u",
  letters: "uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"
}, {
  base: "v",
  letters: "vⓥｖṽṿʋꝟʌ"
}, {
  base: "vy",
  letters: "ꝡ"
}, {
  base: "w",
  letters: "wⓦｗẁẃŵẇẅẘẉⱳ"
}, {
  base: "x",
  letters: "xⓧｘẋẍ"
}, {
  base: "y",
  letters: "yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"
}, {
  base: "z",
  letters: "zⓩｚźẑżžẓẕƶȥɀⱬꝣ"
}].reduce(function(acc, _ref) {
  var base = _ref.base, letters = _ref.letters;
  letters.split("").forEach(function(letter) {
    acc[letter] = base;
  });
  return acc;
}, {});
var latin = "̀-ͯ";
var japanese = "゙゚";
function stripDiacritics(str) {
  return str.normalize("NFD").replace(new RegExp("[".concat(latin).concat(japanese, "]"), "g"), "").replace(/[^\u0000-\u007E]/g, function(a) {
    return map[a] || a;
  });
}

// node_modules/react-bootstrap-typeahead/es/utils/warn.js
var import_warning = __toESM(require_warning());
var warned = {};
function warn(falseToWarn, message) {
  if (!falseToWarn && message.indexOf("deprecated") !== -1) {
    if (warned[message]) {
      return;
    }
    warned[message] = true;
  }
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  import_warning.default.apply(void 0, [falseToWarn, "[react-bootstrap-typeahead] ".concat(message)].concat(args));
}

// node_modules/react-bootstrap-typeahead/es/utils/defaultFilterBy.js
function isMatch(input, string, props) {
  var searchStr = input;
  var str = string;
  if (!props.caseSensitive) {
    searchStr = searchStr.toLowerCase();
    str = str.toLowerCase();
  }
  if (props.ignoreDiacritics) {
    searchStr = stripDiacritics(searchStr);
    str = stripDiacritics(str);
  }
  return str.indexOf(searchStr) !== -1;
}
function defaultFilterBy(option, props) {
  var filterBy = props.filterBy, labelKey = props.labelKey, multiple = props.multiple, selected = props.selected, text = props.text;
  if (multiple && selected.some(function(o3) {
    return (0, import_fast_deep_equal.default)(o3, option);
  })) {
    return false;
  }
  if (isFunction(labelKey)) {
    return isMatch(text, labelKey(option), props);
  }
  var fields = filterBy.slice();
  if (isString(labelKey)) {
    if (fields.indexOf(labelKey) === -1) {
      fields.unshift(labelKey);
    }
  }
  if (isString(option)) {
    warn(fields.length <= 1, "You cannot filter by properties when `option` is a string.");
    return isMatch(text, option, props);
  }
  return fields.some(function(field) {
    var value = getOptionProperty(option, field);
    if (!isString(value)) {
      warn(false, "Fields passed to `filterBy` should have string values. Value will be converted to a string; results may be unexpected.");
      value = String(value);
    }
    return isMatch(text, value, props);
  });
}

// node_modules/react-bootstrap-typeahead/es/utils/isSelectable.js
function isSelectable(inputNode) {
  return inputNode.selectionStart != null;
}

// node_modules/react-bootstrap-typeahead/es/utils/defaultSelectHint.js
function defaultSelectHint(e3, selectHint) {
  var shouldSelectHint = false;
  if (e3.key === "ArrowRight") {
    shouldSelectHint = isSelectable(e3.currentTarget) ? e3.currentTarget.selectionStart === e3.currentTarget.value.length : true;
  }
  if (e3.key === "Tab") {
    e3.preventDefault();
    shouldSelectHint = true;
  }
  return selectHint ? selectHint(shouldSelectHint, e3) : shouldSelectHint;
}

// node_modules/react-bootstrap-typeahead/es/utils/getDisplayName.js
function getDisplayName(Component) {
  return Component.displayName || Component.name || "Component";
}

// node_modules/react-bootstrap-typeahead/es/utils/getMatchBounds.js
var import_invariant2 = __toESM(require_browser());
var CASE_INSENSITIVE = "i";
var COMBINING_MARKS = /[\u0300-\u036F]/;
function escapeStringRegexp(str) {
  !(typeof str === "string") ? true ? (0, import_invariant2.default)(false, "`escapeStringRegexp` expected a string.") : (0, import_invariant2.default)(false) : void 0;
  return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function getMatchBounds(subject, str) {
  var search = new RegExp(escapeStringRegexp(stripDiacritics(str)), CASE_INSENSITIVE);
  var matches = search.exec(stripDiacritics(subject));
  if (!matches) {
    return null;
  }
  var start = matches.index;
  var matchLength = matches[0].length;
  if (COMBINING_MARKS.test(subject)) {
    for (var ii = 0; ii <= start; ii++) {
      if (COMBINING_MARKS.test(subject[ii])) {
        start += 1;
      }
    }
    for (var _ii = start; _ii <= start + matchLength; _ii++) {
      if (COMBINING_MARKS.test(subject[_ii])) {
        matchLength += 1;
      }
    }
  }
  return {
    end: start + matchLength,
    start
  };
}

// node_modules/react-bootstrap-typeahead/es/utils/getHintText.js
function getHintText(_ref) {
  var activeIndex = _ref.activeIndex, initialItem = _ref.initialItem, isFocused = _ref.isFocused, isMenuShown = _ref.isMenuShown, labelKey = _ref.labelKey, multiple = _ref.multiple, selected = _ref.selected, text = _ref.text;
  if (
    // No text entered.
    !text || // The input is not focused.
    !isFocused || // The menu is hidden.
    !isMenuShown || // No item in the menu.
    !initialItem || // The initial item is a custom option.
    !isString(initialItem) && hasOwnProperty(initialItem, "customOption") || // One of the menu items is active.
    activeIndex > -1 || // There's already a selection in single-select mode.
    !!selected.length && !multiple
  ) {
    return "";
  }
  var initialItemStr = getOptionLabel_default(initialItem, labelKey);
  var bounds = getMatchBounds(initialItemStr.toLowerCase(), text.toLowerCase());
  if (!(bounds && bounds.start === 0)) {
    return "";
  }
  return text + initialItemStr.slice(bounds.end, initialItemStr.length);
}
var getHintText_default = getHintText;

// node_modules/react-bootstrap-typeahead/es/utils/getInputProps.js
var import_classnames = __toESM(require_classnames());

// node_modules/react-bootstrap-typeahead/es/utils/getMenuItemId.js
function getMenuItemId() {
  var id = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  var position = arguments.length > 1 ? arguments[1] : void 0;
  return "".concat(id, "-item-").concat(position);
}

// node_modules/react-bootstrap-typeahead/es/utils/getInputProps.js
var _excluded = ["activeIndex", "id", "isFocused", "isMenuShown", "multiple", "onClick", "onFocus", "placeholder"];
function ownKeys(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o3 = Object.getOwnPropertySymbols(e3);
    r2 && (o3 = o3.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o3);
  }
  return t2;
}
function _objectSpread(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys(Object(t2), true).forEach(function(r3) {
      _defineProperty(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
var getInputProps = function getInputProps2(_ref) {
  var activeIndex = _ref.activeIndex, id = _ref.id, isFocused = _ref.isFocused, isMenuShown = _ref.isMenuShown, multiple = _ref.multiple, onClick = _ref.onClick, onFocus = _ref.onFocus, placeholder = _ref.placeholder, props = _objectWithoutProperties(_ref, _excluded);
  return function() {
    var _cx;
    var inputProps = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var className = hasOwnProperty(inputProps, "className") ? String(inputProps.className) : void 0;
    return _objectSpread(_objectSpread(_objectSpread(_objectSpread({
      // These props can be overridden by values in `inputProps`.
      autoComplete: "off",
      placeholder,
      type: "text"
    }, inputProps), props), {}, {
      "aria-activedescendant": activeIndex >= 0 ? getMenuItemId(id, activeIndex) : void 0,
      "aria-autocomplete": "both",
      "aria-expanded": isMenuShown,
      "aria-haspopup": "listbox",
      "aria-multiselectable": multiple || void 0,
      "aria-owns": isMenuShown ? id : void 0,
      className: (0, import_classnames.default)((_cx = {}, _defineProperty(_cx, className || "", !multiple), _defineProperty(_cx, "focus", isFocused), _cx))
    }, multiple && {
      inputClassName: className
    }), {}, {
      onClick,
      onFocus,
      role: "combobox"
    });
  };
};
var getInputProps_default = getInputProps;

// node_modules/react-bootstrap-typeahead/es/utils/getInputText.js
function getInputText(props) {
  var activeItem = props.activeItem, labelKey = props.labelKey, multiple = props.multiple, selected = props.selected, text = props.text;
  if (activeItem) {
    return getOptionLabel_default(activeItem, labelKey);
  }
  if (!multiple && selected.length && selected[0]) {
    return getOptionLabel_default(selected[0], labelKey);
  }
  return text;
}
var getInputText_default = getInputText;

// node_modules/react-bootstrap-typeahead/es/utils/getIsOnlyResult.js
function getIsOnlyResult(props) {
  var allowNew = props.allowNew, highlightOnlyResult = props.highlightOnlyResult, results = props.results;
  if (!highlightOnlyResult || allowNew) {
    return false;
  }
  return results.length === 1 && !getOptionProperty(results[0], "disabled");
}
var getIsOnlyResult_default = getIsOnlyResult;

// node_modules/react-bootstrap-typeahead/es/utils/getTruncatedOptions.js
function getTruncatedOptions(options, maxResults) {
  if (!maxResults || maxResults >= options.length) {
    return options;
  }
  return options.slice(0, maxResults);
}
var getTruncatedOptions_default = getTruncatedOptions;

// node_modules/react-bootstrap-typeahead/es/utils/getUpdatedActiveIndex.js
function isDisabledOption(index, items) {
  var option = items[index];
  return !!option && !!getOptionProperty(option, "disabled");
}
function skipDisabledOptions(currentIndex, key, items) {
  var newIndex = currentIndex;
  while (isDisabledOption(newIndex, items)) {
    newIndex += key === "ArrowUp" ? -1 : 1;
  }
  return newIndex;
}
function getUpdatedActiveIndex(currentIndex, key, items) {
  var newIndex = currentIndex;
  newIndex += key === "ArrowUp" ? -1 : 1;
  newIndex = skipDisabledOptions(newIndex, key, items);
  if (newIndex === items.length) {
    newIndex = -1;
  } else if (newIndex === -2) {
    newIndex = items.length - 1;
    newIndex = skipDisabledOptions(newIndex, key, items);
  }
  return newIndex;
}

// node_modules/react-bootstrap-typeahead/es/utils/isShown.js
function isShown(_ref) {
  var open = _ref.open, minLength = _ref.minLength, showMenu = _ref.showMenu, text = _ref.text;
  if (open || open === false) {
    return open;
  }
  if (text.length < minLength) {
    return false;
  }
  return showMenu;
}

// node_modules/react-bootstrap-typeahead/es/utils/preventInputBlur.js
function preventInputBlur(e3) {
  e3.preventDefault();
}

// node_modules/react-bootstrap-typeahead/es/utils/propsWithBsClassName.js
var import_classnames2 = __toESM(require_classnames());

// node_modules/react-bootstrap-typeahead/es/utils/size.js
function isSizeLarge(size) {
  return size === "lg";
}
function isSizeSmall(size) {
  return size === "sm";
}

// node_modules/react-bootstrap-typeahead/es/utils/propsWithBsClassName.js
var _excluded2 = ["className", "isInvalid", "isValid", "size"];
function ownKeys2(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o3 = Object.getOwnPropertySymbols(e3);
    r2 && (o3 = o3.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o3);
  }
  return t2;
}
function _objectSpread2(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys2(Object(t2), true).forEach(function(r3) {
      _defineProperty(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys2(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function propsWithBsClassName(_ref) {
  var className = _ref.className, isInvalid = _ref.isInvalid, isValid = _ref.isValid, size = _ref.size, props = _objectWithoutProperties(_ref, _excluded2);
  return _objectSpread2(_objectSpread2({}, props), {}, {
    className: (0, import_classnames2.default)("form-control", "rbt-input", {
      "form-control-lg": isSizeLarge(size),
      "form-control-sm": isSizeSmall(size),
      "is-invalid": isInvalid,
      "is-valid": isValid
    }, className)
  });
}

// node_modules/react-bootstrap-typeahead/es/utils/validateSelectedPropChange.js
function validateSelectedPropChange(prevSelected, selected) {
  var uncontrolledToControlled = !prevSelected && selected;
  var controlledToUncontrolled = prevSelected && !selected;
  var from, to, precedent;
  if (uncontrolledToControlled) {
    from = "uncontrolled";
    to = "controlled";
    precedent = "an";
  } else {
    from = "controlled";
    to = "uncontrolled";
    precedent = "a";
  }
  var message = "You are changing ".concat(precedent, " ").concat(from, " typeahead to be ").concat(to, ". ") + "Input elements should not switch from ".concat(from, " to ").concat(to, " (or vice versa). ") + "Decide between using a controlled or uncontrolled element for the lifetime of the component.";
  warn(!(uncontrolledToControlled || controlledToUncontrolled), message);
}

// node_modules/react-bootstrap-typeahead/es/propTypes.js
var INPUT_PROPS_BLACKLIST = [{
  alt: "onBlur",
  prop: "onBlur"
}, {
  alt: "onInputChange",
  prop: "onChange"
}, {
  alt: "onFocus",
  prop: "onFocus"
}, {
  alt: "onKeyDown",
  prop: "onKeyDown"
}];
var sizeType = import_prop_types.default.oneOf(SIZES);
function checkPropType(validator, callback) {
  return function(props, propName, componentName) {
    import_prop_types.default.checkPropTypes(_defineProperty({}, propName, validator), props, "prop", componentName);
    isFunction(callback) && callback(props, propName, componentName);
  };
}
function caseSensitiveType(props) {
  var caseSensitive = props.caseSensitive, filterBy = props.filterBy;
  warn(!caseSensitive || typeof filterBy !== "function", "Your `filterBy` function will override the `caseSensitive` prop.");
}
function defaultInputValueType(props) {
  var defaultInputValue = props.defaultInputValue, defaultSelected = props.defaultSelected, multiple = props.multiple, selected = props.selected;
  var name = defaultSelected.length ? "defaultSelected" : "selected";
  warn(!(!multiple && defaultInputValue && (defaultSelected.length || selected && selected.length)), "`defaultInputValue` will be overridden by the value from `".concat(name, "`."));
}
function defaultSelectedType(props) {
  var defaultSelected = props.defaultSelected, multiple = props.multiple;
  warn(multiple || defaultSelected.length <= 1, "You are passing multiple options to the `defaultSelected` prop of a Typeahead in single-select mode. The selections will be truncated to a single selection.");
}
function highlightOnlyResultType(_ref) {
  var allowNew = _ref.allowNew, highlightOnlyResult = _ref.highlightOnlyResult;
  warn(!(highlightOnlyResult && allowNew), "`highlightOnlyResult` will not work with `allowNew`.");
}
function ignoreDiacriticsType(props) {
  var filterBy = props.filterBy, ignoreDiacritics = props.ignoreDiacritics;
  warn(ignoreDiacritics || typeof filterBy !== "function", "Your `filterBy` function will override the `ignoreDiacritics` prop.");
}
function inputPropsType(_ref2) {
  var inputProps = _ref2.inputProps;
  if (!(inputProps && Object.prototype.toString.call(inputProps) === "[object Object]")) {
    return;
  }
  INPUT_PROPS_BLACKLIST.forEach(function(_ref3) {
    var alt = _ref3.alt, prop = _ref3.prop;
    var msg = alt ? " Use the top-level `".concat(alt, "` prop instead.") : null;
    warn(!inputProps[prop], "The `".concat(prop, "` property of `inputProps` will be ignored.").concat(msg));
  });
}
function isRequiredForA11y(props, propName, componentName) {
  warn(props[propName] != null, "The prop `".concat(propName, "` is required to make `").concat(componentName, "` ") + "accessible for users of assistive technologies such as screen readers.");
}
function labelKeyType(_ref4) {
  var allowNew = _ref4.allowNew, labelKey = _ref4.labelKey;
  warn(!(isFunction(labelKey) && allowNew), "`labelKey` must be a string when `allowNew={true}`.");
}
var optionType = import_prop_types.default.oneOfType([import_prop_types.default.object, import_prop_types.default.string]);
function selectedType(_ref5) {
  var multiple = _ref5.multiple, onChange = _ref5.onChange, selected = _ref5.selected;
  warn(multiple || !selected || selected.length <= 1, "You are passing multiple options to the `selected` prop of a Typeahead in single-select mode. This may lead to unexpected behaviors or errors.");
  warn(!selected || selected && isFunction(onChange), "You provided a `selected` prop without an `onChange` handler. If you want the typeahead to be uncontrolled, use `defaultSelected`. Otherwise, set `onChange`.");
}

// node_modules/react-bootstrap-typeahead/es/behaviors/async.js
var _excluded3 = ["allowNew", "delay", "emptyLabel", "isLoading", "minLength", "onInputChange", "onSearch", "options", "promptText", "searchText", "useCache"];
function ownKeys3(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o3 = Object.getOwnPropertySymbols(e3);
    r2 && (o3 = o3.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o3);
  }
  return t2;
}
function _objectSpread3(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys3(Object(t2), true).forEach(function(r3) {
      _defineProperty(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys3(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
var propTypes = {
  /**
   * Delay, in milliseconds, before performing search.
   */
  delay: import_prop_types2.default.number,
  /**
   * Whether or not a request is currently pending. Necessary for the
   * container to know when new results are available.
   */
  isLoading: import_prop_types2.default.bool.isRequired,
  /**
   * Number of input characters that must be entered before showing results.
   */
  minLength: import_prop_types2.default.number,
  /**
   * Callback to perform when the search is executed.
   */
  onSearch: import_prop_types2.default.func.isRequired,
  /**
   * Options to be passed to the typeahead. Will typically be the query
   * results, but can also be initial default options.
   */
  options: import_prop_types2.default.arrayOf(optionType),
  /**
   * Message displayed in the menu when there is no user input.
   */
  promptText: import_prop_types2.default.node,
  /**
   * Message displayed in the menu while the request is pending.
   */
  searchText: import_prop_types2.default.node,
  /**
   * Whether or not the component should cache query results.
   */
  useCache: import_prop_types2.default.bool
};
function useAsync(props) {
  var allowNew = props.allowNew, _props$delay = props.delay, delay = _props$delay === void 0 ? 200 : _props$delay, emptyLabel = props.emptyLabel, isLoading = props.isLoading, _props$minLength = props.minLength, minLength = _props$minLength === void 0 ? 2 : _props$minLength, onInputChange = props.onInputChange, onSearch = props.onSearch, _props$options = props.options, options = _props$options === void 0 ? [] : _props$options, _props$promptText = props.promptText, promptText = _props$promptText === void 0 ? "Type to search..." : _props$promptText, _props$searchText = props.searchText, searchText = _props$searchText === void 0 ? "Searching..." : _props$searchText, _props$useCache = props.useCache, useCache = _props$useCache === void 0 ? true : _props$useCache, otherProps = _objectWithoutProperties(props, _excluded3);
  var cacheRef = (0, import_react.useRef)({});
  var handleSearchDebouncedRef = (0, import_react.useRef)(null);
  var queryRef = (0, import_react.useRef)(props.defaultInputValue || "");
  var forceUpdate = useForceUpdate();
  var prevProps = usePrevious(props);
  var handleSearch = (0, import_react.useCallback)(function(query) {
    queryRef.current = query;
    if (!query || minLength && query.length < minLength) {
      return;
    }
    if (useCache && cacheRef.current[query]) {
      forceUpdate();
      return;
    }
    onSearch(query);
  }, [forceUpdate, minLength, onSearch, useCache]);
  (0, import_react.useEffect)(function() {
    handleSearchDebouncedRef.current = (0, import_lodash.default)(handleSearch, delay);
    return function() {
      handleSearchDebouncedRef.current && handleSearchDebouncedRef.current.cancel();
    };
  }, [delay, handleSearch]);
  (0, import_react.useEffect)(function() {
    if (!isLoading && prevProps && prevProps.isLoading && useCache) {
      cacheRef.current[queryRef.current] = options;
    }
  });
  var getEmptyLabel = function getEmptyLabel2() {
    if (!queryRef.current.length) {
      return promptText;
    }
    if (isLoading) {
      return searchText;
    }
    return emptyLabel;
  };
  var handleInputChange = (0, import_react.useCallback)(function(query, e3) {
    onInputChange && onInputChange(query, e3);
    handleSearchDebouncedRef.current && handleSearchDebouncedRef.current(query);
  }, [onInputChange]);
  var cachedQuery = cacheRef.current[queryRef.current];
  return _objectSpread3(_objectSpread3({}, otherProps), {}, {
    // Disable custom selections during a search if `allowNew` isn't a function.
    allowNew: isFunction(allowNew) ? allowNew : allowNew && !isLoading,
    emptyLabel: getEmptyLabel(),
    isLoading,
    minLength,
    onInputChange: handleInputChange,
    options: useCache && cachedQuery ? cachedQuery : options
  });
}
function withAsync(Component) {
  warn(false, "Warning: `withAsync` is deprecated and will be removed in the next major version. Use `useAsync` instead.");
  var AsyncTypeahead2 = (0, import_react.forwardRef)(function(props, ref) {
    return import_react.default.createElement(Component, _extends({}, props, useAsync(props), {
      ref
    }));
  });
  AsyncTypeahead2.displayName = "withAsync(".concat(getDisplayName(Component), ")");
  AsyncTypeahead2.propTypes = propTypes;
  return AsyncTypeahead2;
}

// node_modules/react-bootstrap-typeahead/es/components/Typeahead/Typeahead.js
init_extends();
var import_classnames9 = __toESM(require_classnames());
var import_prop_types12 = __toESM(require_prop_types());
var import_react21 = __toESM(require_react());

// node_modules/react-bootstrap-typeahead/es/core/Typeahead.js
init_extends();
var import_fast_deep_equal2 = __toESM(require_fast_deep_equal());
var import_prop_types3 = __toESM(require_prop_types());
var import_react4 = __toESM(require_react());

// node_modules/react-bootstrap-typeahead/es/core/TypeaheadManager.js
var import_react3 = __toESM(require_react());

// node_modules/react-bootstrap-typeahead/es/core/Context.js
var import_react2 = __toESM(require_react());
var defaultContext = {
  activeIndex: -1,
  hintText: "",
  id: "",
  initialItem: null,
  inputNode: null,
  isOnlyResult: false,
  onActiveItemChange: noop,
  onAdd: noop,
  onInitialItemChange: noop,
  onMenuItemClick: noop,
  setItem: noop
};
var TypeaheadContext = (0, import_react2.createContext)(defaultContext);
var useTypeaheadContext = function useTypeaheadContext2() {
  return (0, import_react2.useContext)(TypeaheadContext);
};

// node_modules/react-bootstrap-typeahead/es/core/TypeaheadManager.js
function ownKeys4(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o3 = Object.getOwnPropertySymbols(e3);
    r2 && (o3 = o3.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o3);
  }
  return t2;
}
function _objectSpread4(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys4(Object(t2), true).forEach(function(r3) {
      _defineProperty(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys4(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
var inputPropKeys = ["activeIndex", "disabled", "id", "inputRef", "isFocused", "isMenuShown", "multiple", "onBlur", "onChange", "onClick", "onFocus", "onKeyDown", "placeholder"];
var propKeys = ["activeIndex", "hideMenu", "isMenuShown", "labelKey", "onClear", "onHide", "onRemove", "results", "selected", "text", "toggleMenu"];
var contextKeys = ["activeIndex", "id", "initialItem", "inputNode", "onActiveItemChange", "onAdd", "onInitialItemChange", "onMenuItemClick", "setItem"];
var TypeaheadManager = function TypeaheadManager2(props) {
  var allowNew = props.allowNew, children = props.children, initialItem = props.initialItem, isMenuShown = props.isMenuShown, onAdd = props.onAdd, onInitialItemChange = props.onInitialItemChange, onKeyDown = props.onKeyDown, onMenuToggle = props.onMenuToggle, results = props.results, selectHint = props.selectHint;
  var hintText = getHintText_default(props);
  (0, import_react3.useEffect)(function() {
    if (!(allowNew || results.length)) {
      onInitialItemChange();
    }
  });
  var isInitialRender = (0, import_react3.useRef)(true);
  (0, import_react3.useEffect)(function() {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    onMenuToggle(isMenuShown);
  }, [isMenuShown, onMenuToggle]);
  var handleKeyDown = function handleKeyDown2(e3) {
    onKeyDown(e3);
    if (!initialItem) {
      return;
    }
    var addOnlyResult = e3.key === "Enter" && getIsOnlyResult_default(props);
    var shouldSelectHint = hintText && defaultSelectHint(e3, selectHint);
    if (addOnlyResult || shouldSelectHint) {
      onAdd(initialItem);
    }
  };
  var childProps = _objectSpread4(_objectSpread4({}, pick(props, propKeys)), {}, {
    getInputProps: getInputProps_default(_objectSpread4(_objectSpread4({}, pick(props, inputPropKeys)), {}, {
      onKeyDown: handleKeyDown,
      value: getInputText_default(props)
    }))
  });
  var contextValue = _objectSpread4(_objectSpread4({}, pick(props, contextKeys)), {}, {
    hintText,
    isOnlyResult: getIsOnlyResult_default(props)
  });
  return import_react3.default.createElement(TypeaheadContext.Provider, {
    value: contextValue
  }, isFunction(children) ? children(childProps) : children);
};
var TypeaheadManager_default = TypeaheadManager;

// node_modules/react-bootstrap-typeahead/es/core/TypeaheadState.js
function ownKeys5(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o3 = Object.getOwnPropertySymbols(e3);
    r2 && (o3 = o3.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o3);
  }
  return t2;
}
function _objectSpread5(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys5(Object(t2), true).forEach(function(r3) {
      _defineProperty(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys5(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function getInitialState(props) {
  var defaultInputValue = props.defaultInputValue, defaultOpen = props.defaultOpen, defaultSelected = props.defaultSelected, maxResults = props.maxResults, multiple = props.multiple;
  var selected = props.selected ? props.selected.slice() : defaultSelected.slice();
  var text = defaultInputValue;
  if (!multiple && selected.length) {
    text = getOptionLabel_default(selected[0], props.labelKey);
    if (selected.length > 1) {
      selected = selected.slice(0, 1);
    }
  }
  return {
    activeIndex: -1,
    activeItem: void 0,
    initialItem: void 0,
    isFocused: false,
    selected,
    showMenu: defaultOpen,
    shownResults: maxResults,
    text
  };
}
function clearTypeahead(state, props) {
  return _objectSpread5(_objectSpread5({}, getInitialState(props)), {}, {
    isFocused: state.isFocused,
    selected: [],
    text: ""
  });
}
function clickOrFocusInput(state) {
  return _objectSpread5(_objectSpread5({}, state), {}, {
    isFocused: true,
    showMenu: true
  });
}
function hideMenu(state, props) {
  var _getInitialState = getInitialState(props), activeIndex = _getInitialState.activeIndex, activeItem = _getInitialState.activeItem, initialItem = _getInitialState.initialItem, shownResults = _getInitialState.shownResults;
  return _objectSpread5(_objectSpread5({}, state), {}, {
    activeIndex,
    activeItem,
    initialItem,
    showMenu: false,
    shownResults
  });
}
function toggleMenu(state, props) {
  return state.showMenu ? hideMenu(state, props) : _objectSpread5(_objectSpread5({}, state), {}, {
    showMenu: true
  });
}

// node_modules/react-bootstrap-typeahead/es/core/Typeahead.js
var _excluded4 = ["onChange"];
function ownKeys6(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o3 = Object.getOwnPropertySymbols(e3);
    r2 && (o3 = o3.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o3);
  }
  return t2;
}
function _objectSpread6(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys6(Object(t2), true).forEach(function(r3) {
      _defineProperty(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys6(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e3) {
    return false;
  }
}
var propTypes2 = {
  /**
   * Allows the creation of new selections on the fly. Note that any new items
   * will be added to the list of selections, but not the list of original
   * options unless handled as such by `Typeahead`'s parent.
   *
   * If a function is specified, it will be used to determine whether a custom
   * option should be included. The return value should be true or false.
   */
  allowNew: import_prop_types3.default.oneOfType([import_prop_types3.default.bool, import_prop_types3.default.func]),
  /**
   * Autofocus the input when the component initially mounts.
   */
  autoFocus: import_prop_types3.default.bool,
  /**
   * Whether or not filtering should be case-sensitive.
   */
  caseSensitive: checkPropType(import_prop_types3.default.bool, caseSensitiveType),
  /**
   * The initial value displayed in the text input.
   */
  defaultInputValue: checkPropType(import_prop_types3.default.string, defaultInputValueType),
  /**
   * Whether or not the menu is displayed upon initial render.
   */
  defaultOpen: import_prop_types3.default.bool,
  /**
   * Specify any pre-selected options. Use only if you want the component to
   * be uncontrolled.
   */
  defaultSelected: checkPropType(import_prop_types3.default.arrayOf(optionType), defaultSelectedType),
  /**
   * Either an array of fields in `option` to search, or a custom filtering
   * callback.
   */
  filterBy: import_prop_types3.default.oneOfType([import_prop_types3.default.arrayOf(import_prop_types3.default.string.isRequired), import_prop_types3.default.func]),
  /**
   * Highlights the menu item if there is only one result and allows selecting
   * that item by hitting enter. Does not work with `allowNew`.
   */
  highlightOnlyResult: checkPropType(import_prop_types3.default.bool, highlightOnlyResultType),
  /**
   * An html id attribute, required for assistive technologies such as screen
   * readers.
   */
  id: checkPropType(import_prop_types3.default.oneOfType([import_prop_types3.default.number, import_prop_types3.default.string]), isRequiredForA11y),
  /**
   * Whether the filter should ignore accents and other diacritical marks.
   */
  ignoreDiacritics: checkPropType(import_prop_types3.default.bool, ignoreDiacriticsType),
  /**
   * Specify the option key to use for display or a function returning the
   * display string. By default, the selector will use the `label` key.
   */
  labelKey: checkPropType(import_prop_types3.default.oneOfType([import_prop_types3.default.string, import_prop_types3.default.func]), labelKeyType),
  /**
   * Maximum number of results to display by default. Mostly done for
   * performance reasons so as not to render too many DOM nodes in the case of
   * large data sets.
   */
  maxResults: import_prop_types3.default.number,
  /**
   * Number of input characters that must be entered before showing results.
   */
  minLength: import_prop_types3.default.number,
  /**
   * Whether or not multiple selections are allowed.
   */
  multiple: import_prop_types3.default.bool,
  /**
   * Invoked when the input is blurred. Receives an event.
   */
  onBlur: import_prop_types3.default.func,
  /**
   * Invoked whenever items are added or removed. Receives an array of the
   * selected options.
   */
  onChange: import_prop_types3.default.func,
  /**
   * Invoked when the input is focused. Receives an event.
   */
  onFocus: import_prop_types3.default.func,
  /**
   * Invoked when the input value changes. Receives the string value of the
   * input.
   */
  onInputChange: import_prop_types3.default.func,
  /**
   * Invoked when a key is pressed. Receives an event.
   */
  onKeyDown: import_prop_types3.default.func,
  /**
   * Invoked when menu visibility changes.
   */
  onMenuToggle: import_prop_types3.default.func,
  /**
   * Invoked when the pagination menu item is clicked. Receives an event.
   */
  onPaginate: import_prop_types3.default.func,
  /**
   * Whether or not the menu should be displayed. `undefined` allows the
   * component to control visibility, while `true` and `false` show and hide
   * the menu, respectively.
   */
  open: import_prop_types3.default.bool,
  /**
   * Full set of options, including pre-selected options. Must either be an
   * array of objects (recommended) or strings.
   */
  options: import_prop_types3.default.arrayOf(optionType).isRequired,
  /**
   * Give user the ability to display additional results if the number of
   * results exceeds `maxResults`.
   */
  paginate: import_prop_types3.default.bool,
  /**
   * The selected option(s) displayed in the input. Use this prop if you want
   * to control the component via its parent.
   */
  selected: checkPropType(import_prop_types3.default.arrayOf(optionType), selectedType)
};
var defaultProps = {
  allowNew: false,
  autoFocus: false,
  caseSensitive: false,
  defaultInputValue: "",
  defaultOpen: false,
  defaultSelected: [],
  filterBy: [],
  highlightOnlyResult: false,
  ignoreDiacritics: true,
  labelKey: DEFAULT_LABELKEY,
  maxResults: 100,
  minLength: 0,
  multiple: false,
  onBlur: noop,
  onFocus: noop,
  onInputChange: noop,
  onKeyDown: noop,
  onMenuToggle: noop,
  onPaginate: noop,
  paginate: true
};
function triggerInputChange(input, value) {
  var inputValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value");
  inputValue && inputValue.set && inputValue.set.call(input, value);
  var e3 = new Event("input", {
    bubbles: true
  });
  input.dispatchEvent(e3);
}
var Typeahead = function(_React$Component) {
  _inherits(Typeahead2, _React$Component);
  var _super = _createSuper(Typeahead2);
  function Typeahead2() {
    var _this;
    _classCallCheck(this, Typeahead2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", getInitialState(_this.props));
    _defineProperty(_assertThisInitialized(_this), "inputNode", null);
    _defineProperty(_assertThisInitialized(_this), "isMenuShown", false);
    _defineProperty(_assertThisInitialized(_this), "items", []);
    _defineProperty(_assertThisInitialized(_this), "blur", function() {
      _this.inputNode && _this.inputNode.blur();
      _this.hideMenu();
    });
    _defineProperty(_assertThisInitialized(_this), "clear", function() {
      _this.setState(clearTypeahead);
    });
    _defineProperty(_assertThisInitialized(_this), "focus", function() {
      _this.inputNode && _this.inputNode.focus();
    });
    _defineProperty(_assertThisInitialized(_this), "getInput", function() {
      return _this.inputNode;
    });
    _defineProperty(_assertThisInitialized(_this), "inputRef", function(inputNode) {
      _this.inputNode = inputNode;
    });
    _defineProperty(_assertThisInitialized(_this), "setItem", function(item, position) {
      _this.items[position] = item;
    });
    _defineProperty(_assertThisInitialized(_this), "hideMenu", function() {
      _this.setState(hideMenu);
    });
    _defineProperty(_assertThisInitialized(_this), "toggleMenu", function() {
      _this.setState(toggleMenu);
    });
    _defineProperty(_assertThisInitialized(_this), "_handleActiveIndexChange", function(activeIndex) {
      _this.setState(function(state) {
        return {
          activeIndex,
          activeItem: activeIndex >= 0 ? state.activeItem : void 0
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "_handleActiveItemChange", function(activeItem) {
      if (!(0, import_fast_deep_equal2.default)(activeItem, _this.state.activeItem)) {
        _this.setState({
          activeItem
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "_handleBlur", function(e3) {
      e3.persist();
      _this.setState({
        isFocused: false
      }, function() {
        return _this.props.onBlur(e3);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "_handleChange", function(selected) {
      _this.props.onChange && _this.props.onChange(selected);
    });
    _defineProperty(_assertThisInitialized(_this), "_handleClear", function() {
      _this.inputNode && triggerInputChange(_this.inputNode, "");
      _this.setState(clearTypeahead, function() {
        if (_this.props.multiple) {
          _this._handleChange([]);
        }
      });
    });
    _defineProperty(_assertThisInitialized(_this), "_handleClick", function(e3) {
      var _this$props$inputProp;
      e3.persist();
      var onClick = (_this$props$inputProp = _this.props.inputProps) === null || _this$props$inputProp === void 0 ? void 0 : _this$props$inputProp.onClick;
      _this.setState(clickOrFocusInput, function() {
        return isFunction(onClick) && onClick(e3);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "_handleFocus", function(e3) {
      e3.persist();
      _this.setState(clickOrFocusInput, function() {
        return _this.props.onFocus(e3);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "_handleInitialItemChange", function(initialItem) {
      if (!(0, import_fast_deep_equal2.default)(initialItem, _this.state.initialItem)) {
        _this.setState({
          initialItem
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "_handleInputChange", function(e3) {
      e3.persist();
      var text = e3.currentTarget.value;
      var _this$props = _this.props, multiple = _this$props.multiple, onInputChange = _this$props.onInputChange;
      var shouldClearSelections = _this.state.selected.length && !multiple;
      _this.setState(function(state, props) {
        var _getInitialState = getInitialState(props), activeIndex = _getInitialState.activeIndex, activeItem = _getInitialState.activeItem, shownResults = _getInitialState.shownResults;
        return {
          activeIndex,
          activeItem,
          selected: shouldClearSelections ? [] : state.selected,
          showMenu: true,
          shownResults,
          text
        };
      }, function() {
        onInputChange(text, e3);
        shouldClearSelections && _this._handleChange([]);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "_handleKeyDown", function(e3) {
      var activeItem = _this.state.activeItem;
      if (!_this.isMenuShown) {
        if (e3.key === "ArrowUp" || e3.key === "ArrowDown") {
          _this.setState({
            showMenu: true
          });
        }
        _this.props.onKeyDown(e3);
        return;
      }
      switch (e3.key) {
        case "ArrowUp":
        case "ArrowDown":
          e3.preventDefault();
          _this._handleActiveIndexChange(getUpdatedActiveIndex(_this.state.activeIndex, e3.key, _this.items));
          break;
        case "Enter":
          e3.preventDefault();
          activeItem && _this._handleMenuItemSelect(activeItem, e3);
          break;
        case "Escape":
        case "Tab":
          _this.hideMenu();
          break;
        default:
          break;
      }
      _this.props.onKeyDown(e3);
    });
    _defineProperty(_assertThisInitialized(_this), "_handleMenuItemSelect", function(option, e3) {
      if (getOptionProperty(option, "paginationOption")) {
        _this._handlePaginate(e3);
      } else {
        _this._handleSelectionAdd(option);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "_handlePaginate", function(e3) {
      e3.persist();
      _this.setState(function(state, props) {
        return {
          shownResults: state.shownResults + props.maxResults
        };
      }, function() {
        return _this.props.onPaginate(e3, _this.state.shownResults);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "_handleSelectionAdd", function(option) {
      var _this$props2 = _this.props, multiple = _this$props2.multiple, labelKey = _this$props2.labelKey;
      var selected;
      var selection = option;
      var text;
      if (!isString(selection) && selection.customOption) {
        selection = _objectSpread6(_objectSpread6({}, selection), {}, {
          id: uniqueId("new-id-")
        });
      }
      if (multiple) {
        selected = _this.state.selected.concat(selection);
        text = "";
      } else {
        selected = [selection];
        text = getOptionLabel_default(selection, labelKey);
      }
      _this.setState(function(state, props) {
        return _objectSpread6(_objectSpread6({}, hideMenu(state, props)), {}, {
          initialItem: selection,
          selected,
          text
        });
      }, function() {
        return _this._handleChange(selected);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "_handleSelectionRemove", function(selection) {
      var selected = _this.state.selected.filter(function(option) {
        return !(0, import_fast_deep_equal2.default)(option, selection);
      });
      _this.focus();
      _this.setState(function(state, props) {
        return _objectSpread6(_objectSpread6({}, hideMenu(state, props)), {}, {
          selected
        });
      }, function() {
        return _this._handleChange(selected);
      });
    });
    return _this;
  }
  _createClass(Typeahead2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.autoFocus && this.focus();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props3 = this.props, labelKey = _this$props3.labelKey, multiple = _this$props3.multiple, selected = _this$props3.selected;
      validateSelectedPropChange(selected, prevProps.selected);
      if (selected && !(0, import_fast_deep_equal2.default)(selected, prevState.selected)) {
        this.setState({
          selected
        });
        if (!multiple) {
          this.setState({
            text: selected.length ? getOptionLabel_default(selected[0], labelKey) : ""
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props, onChange = _this$props4.onChange, props = _objectWithoutProperties(_this$props4, _excluded4);
      var mergedPropsAndState = _objectSpread6(_objectSpread6({}, props), this.state);
      var filterBy = mergedPropsAndState.filterBy, labelKey = mergedPropsAndState.labelKey, options = mergedPropsAndState.options, paginate = mergedPropsAndState.paginate, shownResults = mergedPropsAndState.shownResults, text = mergedPropsAndState.text;
      this.isMenuShown = isShown(mergedPropsAndState);
      this.items = [];
      var results = [];
      if (this.isMenuShown) {
        var cb = isFunction(filterBy) ? filterBy : defaultFilterBy;
        results = options.filter(function(option) {
          return cb(option, mergedPropsAndState);
        });
        var shouldPaginate = paginate && results.length > shownResults;
        results = getTruncatedOptions_default(results, shownResults);
        if (addCustomOption_default(results, mergedPropsAndState)) {
          results.push(_defineProperty({
            customOption: true
          }, getStringLabelKey(labelKey), text));
        }
        if (shouldPaginate) {
          var _results$push2;
          results.push((_results$push2 = {}, _defineProperty(_results$push2, getStringLabelKey(labelKey), ""), _defineProperty(_results$push2, "paginationOption", true), _results$push2));
        }
      }
      return import_react4.default.createElement(TypeaheadManager_default, _extends({}, mergedPropsAndState, {
        hideMenu: this.hideMenu,
        inputNode: this.inputNode,
        inputRef: this.inputRef,
        isMenuShown: this.isMenuShown,
        onActiveItemChange: this._handleActiveItemChange,
        onAdd: this._handleSelectionAdd,
        onBlur: this._handleBlur,
        onChange: this._handleInputChange,
        onClear: this._handleClear,
        onClick: this._handleClick,
        onFocus: this._handleFocus,
        onHide: this.hideMenu,
        onInitialItemChange: this._handleInitialItemChange,
        onKeyDown: this._handleKeyDown,
        onMenuItemClick: this._handleMenuItemSelect,
        onRemove: this._handleSelectionRemove,
        results,
        setItem: this.setItem,
        toggleMenu: this.toggleMenu
      }));
    }
  }]);
  return Typeahead2;
}(import_react4.default.Component);
_defineProperty(Typeahead, "propTypes", propTypes2);
_defineProperty(Typeahead, "defaultProps", defaultProps);
var Typeahead_default = Typeahead;

// node_modules/react-bootstrap-typeahead/es/components/ClearButton/ClearButton.js
init_extends();
var import_classnames3 = __toESM(require_classnames());
var import_prop_types4 = __toESM(require_prop_types());
var import_react5 = __toESM(require_react());
var _excluded5 = ["className", "label", "onClick", "onKeyDown", "size"];
var propTypes3 = {
  label: import_prop_types4.default.string,
  onClick: import_prop_types4.default.func,
  onKeyDown: import_prop_types4.default.func,
  size: sizeType
};
var ClearButton = function ClearButton2(_ref) {
  var className = _ref.className, _ref$label = _ref.label, label = _ref$label === void 0 ? "Clear" : _ref$label, _onClick = _ref.onClick, _onKeyDown = _ref.onKeyDown, size = _ref.size, props = _objectWithoutProperties(_ref, _excluded5);
  return import_react5.default.createElement("button", _extends({}, props, {
    "aria-label": label,
    className: (0, import_classnames3.default)("close", "btn-close", "rbt-close", {
      "rbt-close-lg": isSizeLarge(size),
      "rbt-close-sm": isSizeSmall(size)
    }, className),
    onClick: function onClick(e3) {
      e3.stopPropagation();
      _onClick && _onClick(e3);
    },
    onKeyDown: function onKeyDown(e3) {
      if (e3.key === "Backspace") {
        e3.preventDefault();
      }
      _onKeyDown && _onKeyDown(e3);
    },
    type: "button"
  }), import_react5.default.createElement("span", {
    "aria-hidden": "true",
    className: "rbt-close-content"
  }, "×"), import_react5.default.createElement("span", {
    className: "sr-only visually-hidden"
  }, label));
};
ClearButton.propTypes = propTypes3;
var ClearButton_default = ClearButton;

// node_modules/react-bootstrap-typeahead/es/components/Loader/Loader.js
var import_prop_types5 = __toESM(require_prop_types());
var import_react6 = __toESM(require_react());
var propTypes4 = {
  label: import_prop_types5.default.string
};
var Loader = function Loader2(_ref) {
  var _ref$label = _ref.label, label = _ref$label === void 0 ? "Loading..." : _ref$label;
  return import_react6.default.createElement("div", {
    className: "rbt-loader spinner-border spinner-border-sm",
    role: "status"
  }, import_react6.default.createElement("span", {
    className: "sr-only visually-hidden"
  }, label));
};
Loader.propTypes = propTypes4;
var Loader_default = Loader;

// node_modules/react-bootstrap-typeahead/es/components/Overlay/Overlay.js
var import_prop_types6 = __toESM(require_prop_types());

// node_modules/react-bootstrap-typeahead/es/components/Overlay/useOverlay.js
var import_react7 = __toESM(require_react());
function ownKeys7(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o3 = Object.getOwnPropertySymbols(e3);
    r2 && (o3 = o3.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o3);
  }
  return t2;
}
function _objectSpread7(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys7(Object(t2), true).forEach(function(r3) {
      _defineProperty(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys7(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
var setPopperWidth = {
  enabled: true,
  fn: function fn(data) {
    data.state.styles.popper.width = "".concat(data.state.rects.reference.width, "px");
  },
  name: "setPopperWidth",
  phase: "write"
};
function getModifiers(props) {
  var modifiers = [{
    enabled: !!props.flip,
    name: "flip"
  }];
  if (props.align !== "right" && props.align !== "left") {
    modifiers.push(setPopperWidth);
  }
  return modifiers;
}
function getPlacement(props) {
  var x = props.align === "right" ? "end" : "start";
  var y = props.dropup ? "top" : "bottom";
  return "".concat(y, "-").concat(x);
}
function useOverlay(referenceElement, options) {
  var _useState = (0, import_react7.useState)(null), _useState2 = _slicedToArray(_useState, 2), popperElement = _useState2[0], attachRef = _useState2[1];
  var _usePopper = usePopper(referenceElement, popperElement, {
    modifiers: getModifiers(options),
    placement: getPlacement(options),
    strategy: options.positionFixed ? "fixed" : "absolute"
  }), attributes = _usePopper.attributes, styles = _usePopper.styles, forceUpdate = _usePopper.forceUpdate;
  var refElementHeight = referenceElement === null || referenceElement === void 0 ? void 0 : referenceElement.offsetHeight;
  (0, import_react7.useEffect)(function() {
    forceUpdate && forceUpdate();
  }, [refElementHeight]);
  return _objectSpread7(_objectSpread7({}, attributes.popper), {}, {
    innerRef: attachRef,
    style: styles.popper
  });
}
var useOverlay_default = useOverlay;

// node_modules/react-bootstrap-typeahead/es/components/Overlay/Overlay.js
var _excluded6 = ["referenceElement", "isMenuShown"];
var SafeElement = typeof Element === "undefined" ? noop : Element;
var propTypes5 = {
  /**
   * Specify menu alignment. The default value is `justify`, which makes the
   * menu as wide as the input and truncates long values. Specifying `left`
   * or `right` will align the menu to that side and the width will be
   * determined by the length of menu item values.
   */
  align: import_prop_types6.default.oneOf(ALIGN_VALUES),
  children: import_prop_types6.default.func.isRequired,
  /**
   * Specify whether the menu should appear above the input.
   */
  dropup: import_prop_types6.default.bool,
  /**
   * Whether or not to automatically adjust the position of the menu when it
   * reaches the viewport boundaries.
   */
  flip: import_prop_types6.default.bool,
  isMenuShown: import_prop_types6.default.bool,
  positionFixed: import_prop_types6.default.bool,
  // @ts-ignore
  referenceElement: import_prop_types6.default.instanceOf(SafeElement)
};
var Overlay = function Overlay2(_ref) {
  var referenceElement = _ref.referenceElement, isMenuShown = _ref.isMenuShown, props = _objectWithoutProperties(_ref, _excluded6);
  var overlayProps = useOverlay_default(referenceElement, props);
  if (!isMenuShown) {
    return null;
  }
  return props.children(overlayProps);
};
Overlay.propTypes = propTypes5;
var Overlay_default = Overlay;

// node_modules/react-bootstrap-typeahead/es/components/RootClose/useRootClose.js
var import_react9 = __toESM(require_react());

// node_modules/react-overlays/esm/useRootClose.js
var import_react8 = __toESM(require_react());
var import_warning2 = __toESM(require_warning());

// node_modules/react-overlays/esm/safeFindDOMNode.js
var import_react_dom = __toESM(require_react_dom());
function safeFindDOMNode(componentOrElement) {
  if (componentOrElement && "setState" in componentOrElement) {
    return import_react_dom.default.findDOMNode(componentOrElement);
  }
  return componentOrElement != null ? componentOrElement : null;
}

// node_modules/react-overlays/esm/ownerDocument.js
var ownerDocument_default = function(componentOrElement) {
  return ownerDocument(safeFindDOMNode(componentOrElement));
};

// node_modules/react-overlays/esm/useRootClose.js
var escapeKeyCode = 27;
var noop2 = function noop3() {
};
function isLeftClickEvent(event) {
  return event.button === 0;
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
var getRefTarget = function getRefTarget2(ref) {
  return ref && ("current" in ref ? ref.current : ref);
};
function useRootClose(ref, onRootClose, _temp) {
  var _ref = _temp === void 0 ? {} : _temp, disabled = _ref.disabled, _ref$clickTrigger = _ref.clickTrigger, clickTrigger = _ref$clickTrigger === void 0 ? "click" : _ref$clickTrigger;
  var preventMouseRootCloseRef = (0, import_react8.useRef)(false);
  var onClose = onRootClose || noop2;
  var handleMouseCapture = (0, import_react8.useCallback)(function(e3) {
    var _e$composedPath$;
    var currentTarget = getRefTarget(ref);
    (0, import_warning2.default)(!!currentTarget, "RootClose captured a close event but does not have a ref to compare it to. useRootClose(), should be passed a ref that resolves to a DOM node");
    preventMouseRootCloseRef.current = !currentTarget || isModifiedEvent(e3) || !isLeftClickEvent(e3) || !!contains(currentTarget, (_e$composedPath$ = e3.composedPath == null ? void 0 : e3.composedPath()[0]) != null ? _e$composedPath$ : e3.target);
  }, [ref]);
  var handleMouse = useEventCallback(function(e3) {
    if (!preventMouseRootCloseRef.current) {
      onClose(e3);
    }
  });
  var handleKeyUp = useEventCallback(function(e3) {
    if (e3.keyCode === escapeKeyCode) {
      onClose(e3);
    }
  });
  (0, import_react8.useEffect)(function() {
    if (disabled || ref == null)
      return void 0;
    var currentEvent = window.event;
    var doc = ownerDocument_default(getRefTarget(ref));
    var removeMouseCaptureListener = listen_default(doc, clickTrigger, handleMouseCapture, true);
    var removeMouseListener = listen_default(doc, clickTrigger, function(e3) {
      if (e3 === currentEvent) {
        currentEvent = void 0;
        return;
      }
      handleMouse(e3);
    });
    var removeKeyupListener = listen_default(doc, "keyup", function(e3) {
      if (e3 === currentEvent) {
        currentEvent = void 0;
        return;
      }
      handleKeyUp(e3);
    });
    var mobileSafariHackListeners = [];
    if ("ontouchstart" in doc.documentElement) {
      mobileSafariHackListeners = [].slice.call(doc.body.children).map(function(el) {
        return listen_default(el, "mousemove", noop2);
      });
    }
    return function() {
      removeMouseCaptureListener();
      removeMouseListener();
      removeKeyupListener();
      mobileSafariHackListeners.forEach(function(remove) {
        return remove();
      });
    };
  }, [ref, disabled, clickTrigger, handleMouseCapture, handleMouse, handleKeyUp]);
}
var useRootClose_default = useRootClose;

// node_modules/react-bootstrap-typeahead/es/components/RootClose/useRootClose.js
function useRootClose2(onRootClose, options) {
  var rootElementRef = (0, import_react9.useRef)(null);
  useRootClose_default(rootElementRef.current, onRootClose, options);
  return rootElementRef;
}
var useRootClose_default2 = useRootClose2;

// node_modules/react-bootstrap-typeahead/es/components/RootClose/RootClose.js
var _excluded7 = ["children", "onRootClose"];
function RootClose(_ref) {
  var children = _ref.children, onRootClose = _ref.onRootClose, props = _objectWithoutProperties(_ref, _excluded7);
  var rootRef = useRootClose_default2(onRootClose, props);
  return children(rootRef);
}
var RootClose_default = RootClose;

// node_modules/react-bootstrap-typeahead/es/components/Token/Token.js
init_extends();
var import_classnames4 = __toESM(require_classnames());
var import_react11 = __toESM(require_react());

// node_modules/react-bootstrap-typeahead/es/behaviors/token.js
init_extends();
var import_prop_types7 = __toESM(require_prop_types());
var import_react10 = __toESM(require_react());
var _excluded8 = ["onBlur", "onClick", "onFocus", "onRemove", "option"];
function ownKeys8(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o3 = Object.getOwnPropertySymbols(e3);
    r2 && (o3 = o3.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o3);
  }
  return t2;
}
function _objectSpread8(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys8(Object(t2), true).forEach(function(r3) {
      _defineProperty(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys8(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
var propTypes6 = {
  onBlur: import_prop_types7.default.func,
  onClick: import_prop_types7.default.func,
  onFocus: import_prop_types7.default.func,
  onRemove: import_prop_types7.default.func,
  option: optionType.isRequired
};
function useToken(_ref) {
  var onBlur = _ref.onBlur, onClick = _ref.onClick, onFocus = _ref.onFocus, onRemove = _ref.onRemove, option = _ref.option, props = _objectWithoutProperties(_ref, _excluded8);
  var _useState = (0, import_react10.useState)(false), _useState2 = _slicedToArray(_useState, 2), active = _useState2[0], setActive = _useState2[1];
  var _useState3 = (0, import_react10.useState)(null), _useState4 = _slicedToArray(_useState3, 2), rootElement = _useState4[0], attachRef = _useState4[1];
  var handleBlur = function handleBlur2(e3) {
    setActive(false);
    onBlur && onBlur(e3);
  };
  var handleClick = function handleClick2(e3) {
    setActive(true);
    onClick && onClick(e3);
  };
  var handleFocus = function handleFocus2(e3) {
    setActive(true);
    onFocus && onFocus(e3);
  };
  var handleRemove = function handleRemove2() {
    onRemove && onRemove(option);
  };
  var handleKeyDown = function handleKeyDown2(e3) {
    if (e3.key === "Backspace" && active) {
      e3.preventDefault();
      handleRemove();
    }
  };
  useRootClose_default(rootElement, handleBlur, _objectSpread8(_objectSpread8({}, props), {}, {
    disabled: !active
  }));
  return {
    active,
    onBlur: handleBlur,
    onClick: handleClick,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onRemove: isFunction(onRemove) ? handleRemove : void 0,
    ref: attachRef
  };
}
function withToken(Component) {
  warn(false, "Warning: `withToken` is deprecated and will be removed in the next major version. Use `useToken` instead.");
  var displayName = "withToken(".concat(getDisplayName(Component), ")");
  var WrappedToken = function WrappedToken2(props) {
    return import_react10.default.createElement(Component, _extends({}, props, useToken(props)));
  };
  WrappedToken.displayName = displayName;
  WrappedToken.propTypes = propTypes6;
  return WrappedToken;
}

// node_modules/react-bootstrap-typeahead/es/components/Token/Token.js
var _excluded9 = ["active", "children", "className", "onRemove", "tabIndex"];
var _excluded22 = ["children", "option", "readOnly"];
var _excluded32 = ["ref"];
function ownKeys9(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o3 = Object.getOwnPropertySymbols(e3);
    r2 && (o3 = o3.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o3);
  }
  return t2;
}
function _objectSpread9(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys9(Object(t2), true).forEach(function(r3) {
      _defineProperty(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys9(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
var InteractiveToken = (0, import_react11.forwardRef)(function(_ref, ref) {
  var active = _ref.active, children = _ref.children, className = _ref.className, onRemove = _ref.onRemove, tabIndex = _ref.tabIndex, props = _objectWithoutProperties(_ref, _excluded9);
  return import_react11.default.createElement("div", _extends({}, props, {
    className: (0, import_classnames4.default)("rbt-token", "rbt-token-removeable", {
      "rbt-token-active": !!active
    }, className),
    ref,
    tabIndex: tabIndex || 0
  }), children, import_react11.default.createElement(ClearButton_default, {
    className: "rbt-token-remove-button",
    label: "Remove",
    onClick: onRemove,
    tabIndex: -1
  }));
});
var StaticToken = function StaticToken2(_ref2) {
  var children = _ref2.children, className = _ref2.className, disabled = _ref2.disabled, href = _ref2.href;
  var classnames = (0, import_classnames4.default)("rbt-token", {
    "rbt-token-disabled": disabled
  }, className);
  if (href && !disabled) {
    return import_react11.default.createElement("a", {
      className: classnames,
      href
    }, children);
  }
  return import_react11.default.createElement("div", {
    className: classnames
  }, children);
};
var Token = function Token2(_ref3) {
  var children = _ref3.children, option = _ref3.option, readOnly = _ref3.readOnly, props = _objectWithoutProperties(_ref3, _excluded22);
  var _useToken = useToken(_objectSpread9(_objectSpread9({}, props), {}, {
    option
  })), ref = _useToken.ref, tokenProps = _objectWithoutProperties(_useToken, _excluded32);
  var child = import_react11.default.createElement("div", {
    className: "rbt-token-label"
  }, children);
  return !props.disabled && !readOnly && isFunction(tokenProps.onRemove) ? import_react11.default.createElement(InteractiveToken, _extends({}, props, tokenProps, {
    ref
  }), child) : import_react11.default.createElement(StaticToken, props, child);
};
var Token_default = Token;

// node_modules/react-bootstrap-typeahead/es/components/TypeaheadInputMulti/TypeaheadInputMulti.js
init_extends();
var import_classnames6 = __toESM(require_classnames());
var import_react14 = __toESM(require_react());

// node_modules/react-bootstrap-typeahead/es/components/Hint/Hint.js
var import_react12 = __toESM(require_react());
function interpolateStyle(styles, attr) {
  var subattr = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  if (subattr) {
    subattr = subattr.replace(subattr[0], subattr[0].toUpperCase());
  }
  return ["Top", "Right", "Bottom", "Left"].map(function(dir) {
    return styles["".concat(attr).concat(dir).concat(subattr)];
  }).join(" ");
}
function copyStyles(inputNode, hintNode) {
  var inputStyle = window.getComputedStyle(inputNode);
  hintNode.style.borderStyle = interpolateStyle(inputStyle, "border", "style");
  hintNode.style.borderWidth = interpolateStyle(inputStyle, "border", "width");
  hintNode.style.fontSize = inputStyle.fontSize;
  hintNode.style.fontWeight = inputStyle.fontWeight;
  hintNode.style.height = inputStyle.height;
  hintNode.style.lineHeight = inputStyle.lineHeight;
  hintNode.style.margin = interpolateStyle(inputStyle, "margin");
  hintNode.style.padding = interpolateStyle(inputStyle, "padding");
}
var useHint = function useHint2() {
  var _useTypeaheadContext = useTypeaheadContext(), hintText = _useTypeaheadContext.hintText, inputNode = _useTypeaheadContext.inputNode;
  var hintRef = (0, import_react12.useRef)(null);
  (0, import_react12.useEffect)(function() {
    if (inputNode && hintRef.current) {
      copyStyles(inputNode, hintRef.current);
    }
  });
  return {
    hintRef,
    hintText
  };
};
var Hint = function Hint2(_ref) {
  var children = _ref.children, className = _ref.className;
  var _useHint = useHint(), hintRef = _useHint.hintRef, hintText = _useHint.hintText;
  return import_react12.default.createElement("div", {
    className,
    style: {
      display: "flex",
      flex: 1,
      height: "100%",
      position: "relative"
    }
  }, children, import_react12.default.createElement("input", {
    "aria-hidden": true,
    className: "rbt-input-hint",
    ref: hintRef,
    readOnly: true,
    style: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      boxShadow: "none",
      color: "rgba(0, 0, 0, 0.54)",
      left: 0,
      pointerEvents: "none",
      position: "absolute",
      top: 0,
      width: "100%"
    },
    tabIndex: -1,
    value: hintText
  }));
};
var Hint_default = Hint;

// node_modules/react-bootstrap-typeahead/es/components/Input/Input.js
init_extends();
var import_classnames5 = __toESM(require_classnames());
var import_react13 = __toESM(require_react());
var Input = (0, import_react13.forwardRef)(function(props, ref) {
  return import_react13.default.createElement("input", _extends({}, props, {
    className: (0, import_classnames5.default)("rbt-input-main", props.className),
    ref
  }));
});
var Input_default = Input;

// node_modules/react-bootstrap-typeahead/es/components/TypeaheadInputMulti/TypeaheadInputMulti.js
var _excluded10 = ["children", "className", "inputClassName", "inputRef", "referenceElementRef", "selected"];
function TypeaheadInputMulti(props) {
  var wrapperRef = import_react14.default.useRef(null);
  var inputElem = import_react14.default.useRef(null);
  var _propsWithBsClassName = propsWithBsClassName(props), children = _propsWithBsClassName.children, className = _propsWithBsClassName.className, inputClassName = _propsWithBsClassName.inputClassName, inputRef = _propsWithBsClassName.inputRef, referenceElementRef = _propsWithBsClassName.referenceElementRef, selected = _propsWithBsClassName.selected, rest = _objectWithoutProperties(_propsWithBsClassName, _excluded10);
  function getInputRef(input) {
    inputElem.current = input;
    props.inputRef(input);
  }
  function handleContainerClickOrFocus(e3) {
    if (props.disabled) {
      e3.currentTarget.blur();
      return;
    }
    var inputNode = inputElem.current;
    if (!inputNode || // Ignore if the clicked element is a child of the container, ie: a token
    // or the input itself.
    e3.currentTarget.contains(e3.target) && e3.currentTarget !== e3.target) {
      return;
    }
    if (isSelectable(inputNode)) {
      inputNode.selectionStart = inputNode.value.length;
    }
    inputNode.focus();
  }
  function handleKeyDown(e3) {
    if (e3.key === "Backspace" && selected.length && !props.value) {
      var _wrapperRef$current;
      e3.preventDefault();
      var wrapperChildren = (_wrapperRef$current = wrapperRef.current) === null || _wrapperRef$current === void 0 ? void 0 : _wrapperRef$current.children;
      if (wrapperChildren !== null && wrapperChildren !== void 0 && wrapperChildren.length) {
        var lastToken = wrapperChildren[wrapperChildren.length - 2];
        lastToken === null || lastToken === void 0 || lastToken.focus();
      }
    }
    props.onKeyDown && props.onKeyDown(e3);
  }
  return import_react14.default.createElement("div", {
    className: (0, import_classnames6.default)("rbt-input-multi", {
      disabled: props.disabled
    }, className),
    onClick: handleContainerClickOrFocus,
    onFocus: handleContainerClickOrFocus,
    ref: referenceElementRef,
    tabIndex: -1
  }, import_react14.default.createElement("div", {
    className: "rbt-input-wrapper",
    ref: wrapperRef
  }, children, import_react14.default.createElement(Hint_default, null, import_react14.default.createElement(Input_default, _extends({}, rest, {
    className: inputClassName,
    onKeyDown: handleKeyDown,
    ref: getInputRef,
    style: {
      backgroundColor: "transparent",
      border: 0,
      boxShadow: "none",
      cursor: "inherit",
      outline: "none",
      padding: 0,
      width: "100%",
      zIndex: 1
    }
  })))));
}
var TypeaheadInputMulti_default = TypeaheadInputMulti;

// node_modules/react-bootstrap-typeahead/es/components/TypeaheadInputSingle/TypeaheadInputSingle.js
init_extends();
var import_react15 = __toESM(require_react());
var _excluded11 = ["inputRef", "referenceElementRef"];
var TypeaheadInputSingle = function TypeaheadInputSingle2(_ref) {
  var inputRef = _ref.inputRef, referenceElementRef = _ref.referenceElementRef, props = _objectWithoutProperties(_ref, _excluded11);
  return import_react15.default.createElement(Hint_default, null, import_react15.default.createElement(Input_default, _extends({}, propsWithBsClassName(props), {
    ref: function ref(node) {
      inputRef(node);
      referenceElementRef(node);
    }
  })));
};
var TypeaheadInputSingle_default = TypeaheadInputSingle;

// node_modules/react-bootstrap-typeahead/es/components/TypeaheadMenu/TypeaheadMenu.js
init_extends();
var import_prop_types11 = __toESM(require_prop_types());
var import_react20 = __toESM(require_react());

// node_modules/react-bootstrap-typeahead/es/components/Highlighter/Highlighter.js
var import_prop_types8 = __toESM(require_prop_types());
var import_react16 = __toESM(require_react());
var propTypes7 = {
  children: import_prop_types8.default.string.isRequired,
  highlightClassName: import_prop_types8.default.string,
  search: import_prop_types8.default.string.isRequired
};
var Highlighter = function Highlighter2(_ref) {
  var children = _ref.children, _ref$highlightClassNa = _ref.highlightClassName, highlightClassName = _ref$highlightClassNa === void 0 ? "rbt-highlight-text" : _ref$highlightClassNa, search = _ref.search;
  if (!search || !children) {
    return import_react16.default.createElement(import_react16.default.Fragment, null, children);
  }
  var matchCount = 0;
  var remaining = children;
  var highlighterChildren = [];
  while (remaining) {
    var bounds = getMatchBounds(remaining, search);
    if (!bounds) {
      highlighterChildren.push(remaining);
      break;
    }
    var nonMatch = remaining.slice(0, bounds.start);
    if (nonMatch) {
      highlighterChildren.push(nonMatch);
    }
    var match = remaining.slice(bounds.start, bounds.end);
    highlighterChildren.push(import_react16.default.createElement("mark", {
      className: highlightClassName,
      key: matchCount
    }, match));
    matchCount += 1;
    remaining = remaining.slice(bounds.end);
  }
  return import_react16.default.createElement(import_react16.default.Fragment, null, highlighterChildren);
};
Highlighter.propTypes = propTypes7;
var Highlighter_default = Highlighter;

// node_modules/react-bootstrap-typeahead/es/components/Menu/Menu.js
init_extends();
var import_classnames8 = __toESM(require_classnames());
var import_prop_types10 = __toESM(require_prop_types());
var import_react19 = __toESM(require_react());

// node_modules/react-bootstrap-typeahead/es/components/MenuItem/MenuItem.js
init_extends();
var import_classnames7 = __toESM(require_classnames());
var import_react18 = __toESM(require_react());

// node_modules/react-bootstrap-typeahead/es/behaviors/item.js
init_extends();
var import_prop_types9 = __toESM(require_prop_types());
var import_react17 = __toESM(require_react());

// node_modules/compute-scroll-into-view/dist/index.js
var t = (t2) => "object" == typeof t2 && null != t2 && 1 === t2.nodeType;
var e = (t2, e3) => (!e3 || "hidden" !== t2) && ("visible" !== t2 && "clip" !== t2);
var n = (t2, n2) => {
  if (t2.clientHeight < t2.scrollHeight || t2.clientWidth < t2.scrollWidth) {
    const o3 = getComputedStyle(t2, null);
    return e(o3.overflowY, n2) || e(o3.overflowX, n2) || ((t3) => {
      const e3 = ((t4) => {
        if (!t4.ownerDocument || !t4.ownerDocument.defaultView)
          return null;
        try {
          return t4.ownerDocument.defaultView.frameElement;
        } catch (t5) {
          return null;
        }
      })(t3);
      return !!e3 && (e3.clientHeight < t3.scrollHeight || e3.clientWidth < t3.scrollWidth);
    })(t2);
  }
  return false;
};
var o = (t2, e3, n2, o3, l2, r2, i, s) => r2 < t2 && i > e3 || r2 > t2 && i < e3 ? 0 : r2 <= t2 && s <= n2 || i >= e3 && s >= n2 ? r2 - t2 - o3 : i > e3 && s < n2 || r2 < t2 && s > n2 ? i - e3 + l2 : 0;
var l = (t2) => {
  const e3 = t2.parentElement;
  return null == e3 ? t2.getRootNode().host || null : e3;
};
var r = (e3, r2) => {
  var i, s, d, h;
  if ("undefined" == typeof document)
    return [];
  const { scrollMode: c, block: f, inline: u, boundary: a, skipOverflowHiddenElements: g } = r2, p = "function" == typeof a ? a : (t2) => t2 !== a;
  if (!t(e3))
    throw new TypeError("Invalid target");
  const m = document.scrollingElement || document.documentElement, w = [];
  let W = e3;
  for (; t(W) && p(W); ) {
    if (W = l(W), W === m) {
      w.push(W);
      break;
    }
    null != W && W === document.body && n(W) && !n(document.documentElement) || null != W && n(W, g) && w.push(W);
  }
  const b = null != (s = null == (i = window.visualViewport) ? void 0 : i.width) ? s : innerWidth, H = null != (h = null == (d = window.visualViewport) ? void 0 : d.height) ? h : innerHeight, { scrollX: y, scrollY: M } = window, { height: v, width: E, top: x, right: C, bottom: I, left: R } = e3.getBoundingClientRect(), { top: T, right: B, bottom: F, left: V } = ((t2) => {
    const e4 = window.getComputedStyle(t2);
    return { top: parseFloat(e4.scrollMarginTop) || 0, right: parseFloat(e4.scrollMarginRight) || 0, bottom: parseFloat(e4.scrollMarginBottom) || 0, left: parseFloat(e4.scrollMarginLeft) || 0 };
  })(e3);
  let k = "start" === f || "nearest" === f ? x - T : "end" === f ? I + F : x + v / 2 - T + F, D = "center" === u ? R + E / 2 - V + B : "end" === u ? C + B : R - V;
  const L = [];
  for (let t2 = 0; t2 < w.length; t2++) {
    const e4 = w[t2], { height: n2, width: l2, top: r3, right: i2, bottom: s2, left: d2 } = e4.getBoundingClientRect();
    if ("if-needed" === c && x >= 0 && R >= 0 && I <= H && C <= b && x >= r3 && I <= s2 && R >= d2 && C <= i2)
      return L;
    const h2 = getComputedStyle(e4), a2 = parseInt(h2.borderLeftWidth, 10), g2 = parseInt(h2.borderTopWidth, 10), p2 = parseInt(h2.borderRightWidth, 10), W2 = parseInt(h2.borderBottomWidth, 10);
    let T2 = 0, B2 = 0;
    const F2 = "offsetWidth" in e4 ? e4.offsetWidth - e4.clientWidth - a2 - p2 : 0, V2 = "offsetHeight" in e4 ? e4.offsetHeight - e4.clientHeight - g2 - W2 : 0, S = "offsetWidth" in e4 ? 0 === e4.offsetWidth ? 0 : l2 / e4.offsetWidth : 0, X = "offsetHeight" in e4 ? 0 === e4.offsetHeight ? 0 : n2 / e4.offsetHeight : 0;
    if (m === e4)
      T2 = "start" === f ? k : "end" === f ? k - H : "nearest" === f ? o(M, M + H, H, g2, W2, M + k, M + k + v, v) : k - H / 2, B2 = "start" === u ? D : "center" === u ? D - b / 2 : "end" === u ? D - b : o(y, y + b, b, a2, p2, y + D, y + D + E, E), T2 = Math.max(0, T2 + M), B2 = Math.max(0, B2 + y);
    else {
      T2 = "start" === f ? k - r3 - g2 : "end" === f ? k - s2 + W2 + V2 : "nearest" === f ? o(r3, s2, n2, g2, W2 + V2, k, k + v, v) : k - (r3 + n2 / 2) + V2 / 2, B2 = "start" === u ? D - d2 - a2 : "center" === u ? D - (d2 + l2 / 2) + F2 / 2 : "end" === u ? D - i2 + p2 + F2 : o(d2, i2, l2, a2, p2 + F2, D, D + E, E);
      const { scrollLeft: t3, scrollTop: h3 } = e4;
      T2 = 0 === X ? 0 : Math.max(0, Math.min(h3 + T2 / X, e4.scrollHeight - n2 / X + V2)), B2 = 0 === S ? 0 : Math.max(0, Math.min(t3 + B2 / S, e4.scrollWidth - l2 / S + F2)), k += h3 - T2, D += t3 - B2;
    }
    L.push({ el: e4, top: T2, left: B2 });
  }
  return L;
};

// node_modules/scroll-into-view-if-needed/dist/index.js
var o2 = (t2) => false === t2 ? { block: "end", inline: "nearest" } : ((t3) => t3 === Object(t3) && 0 !== Object.keys(t3).length)(t2) ? t2 : { block: "start", inline: "nearest" };
function e2(e3, r2) {
  if (!e3.isConnected || !((t2) => {
    let o3 = t2;
    for (; o3 && o3.parentNode; ) {
      if (o3.parentNode === document)
        return true;
      o3 = o3.parentNode instanceof ShadowRoot ? o3.parentNode.host : o3.parentNode;
    }
    return false;
  })(e3))
    return;
  const n2 = ((t2) => {
    const o3 = window.getComputedStyle(t2);
    return { top: parseFloat(o3.scrollMarginTop) || 0, right: parseFloat(o3.scrollMarginRight) || 0, bottom: parseFloat(o3.scrollMarginBottom) || 0, left: parseFloat(o3.scrollMarginLeft) || 0 };
  })(e3);
  if (((t2) => "object" == typeof t2 && "function" == typeof t2.behavior)(r2))
    return r2.behavior(r(e3, r2));
  const l2 = "boolean" == typeof r2 || null == r2 ? void 0 : r2.behavior;
  for (const { el: a, top: i, left: s } of r(e3, o2(r2))) {
    const t2 = i - n2.top + n2.bottom, o3 = s - n2.left + n2.right;
    a.scroll({ top: t2, left: o3, behavior: l2 });
  }
}

// node_modules/react-bootstrap-typeahead/es/behaviors/item.js
var _excluded12 = ["label", "onClick", "option", "position"];
function ownKeys10(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o3 = Object.getOwnPropertySymbols(e3);
    r2 && (o3 = o3.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o3);
  }
  return t2;
}
function _objectSpread10(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys10(Object(t2), true).forEach(function(r3) {
      _defineProperty(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys10(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
var propTypes8 = {
  option: optionType.isRequired,
  position: import_prop_types9.default.number
};
function useItem(_ref) {
  var label = _ref.label, onClick = _ref.onClick, option = _ref.option, position = _ref.position, props = _objectWithoutProperties(_ref, _excluded12);
  var _useTypeaheadContext = useTypeaheadContext(), activeIndex = _useTypeaheadContext.activeIndex, id = _useTypeaheadContext.id, isOnlyResult = _useTypeaheadContext.isOnlyResult, onActiveItemChange = _useTypeaheadContext.onActiveItemChange, onInitialItemChange = _useTypeaheadContext.onInitialItemChange, onMenuItemClick = _useTypeaheadContext.onMenuItemClick, setItem = _useTypeaheadContext.setItem;
  var itemRef = (0, import_react17.useRef)(null);
  (0, import_react17.useEffect)(function() {
    if (position === 0) {
      onInitialItemChange(option);
    }
  });
  (0, import_react17.useEffect)(function() {
    if (position === activeIndex) {
      onActiveItemChange(option);
      var node = itemRef.current;
      node && e2(node, {
        boundary: node.parentNode,
        scrollMode: "if-needed"
      });
    }
  }, [activeIndex, onActiveItemChange, option, position]);
  var handleClick = (0, import_react17.useCallback)(function(e3) {
    onMenuItemClick(option, e3);
    onClick && onClick(e3);
  }, [onClick, onMenuItemClick, option]);
  var active = isOnlyResult || activeIndex === position;
  setItem(option, position);
  return _objectSpread10(_objectSpread10({}, props), {}, {
    active,
    "aria-label": label,
    "aria-selected": active,
    id: getMenuItemId(id, position),
    onClick: handleClick,
    onMouseDown: preventInputBlur,
    ref: itemRef,
    role: "option"
  });
}
function withItem(Component) {
  warn(false, "Warning: `withItem` is deprecated and will be removed in the next major version. Use `useItem` instead.");
  var WrappedMenuItem = function WrappedMenuItem2(props) {
    return import_react17.default.createElement(Component, _extends({}, props, useItem(props)));
  };
  WrappedMenuItem.displayName = "withItem(".concat(getDisplayName(Component), ")");
  WrappedMenuItem.propTypes = propTypes8;
  return WrappedMenuItem;
}

// node_modules/react-bootstrap-typeahead/es/components/MenuItem/MenuItem.js
var _excluded13 = ["active", "children", "className", "disabled", "onClick"];
var BaseMenuItem = (0, import_react18.forwardRef)(function(_ref, ref) {
  var active = _ref.active, children = _ref.children, className = _ref.className, disabled = _ref.disabled, _onClick = _ref.onClick, props = _objectWithoutProperties(_ref, _excluded13);
  return import_react18.default.createElement("a", _extends({}, props, {
    className: (0, import_classnames7.default)("dropdown-item", {
      active,
      disabled
    }, className),
    href: props.href || "#",
    onClick: function onClick(e3) {
      e3.preventDefault();
      !disabled && _onClick && _onClick(e3);
    },
    ref
  }), children);
});
function MenuItem(props) {
  return import_react18.default.createElement(BaseMenuItem, useItem(props));
}

// node_modules/react-bootstrap-typeahead/es/components/Menu/Menu.js
var _excluded14 = ["emptyLabel", "innerRef", "maxHeight", "style"];
function ownKeys11(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o3 = Object.getOwnPropertySymbols(e3);
    r2 && (o3 = o3.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o3);
  }
  return t2;
}
function _objectSpread11(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys11(Object(t2), true).forEach(function(r3) {
      _defineProperty(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys11(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
var MenuDivider = function MenuDivider2() {
  return import_react19.default.createElement("div", {
    className: "dropdown-divider",
    role: "separator"
  });
};
var MenuHeader = function MenuHeader2(props) {
  return (
    // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
    import_react19.default.createElement("div", _extends({}, props, {
      className: "dropdown-header",
      role: "heading"
    }))
  );
};
var propTypes9 = {
  "aria-label": import_prop_types10.default.string,
  /**
   * Message to display in the menu if there are no valid results.
   */
  emptyLabel: import_prop_types10.default.node,
  /**
   * Needed for accessibility.
   */
  id: checkPropType(import_prop_types10.default.oneOfType([import_prop_types10.default.number, import_prop_types10.default.string]), isRequiredForA11y),
  /**
   * Maximum height of the dropdown menu.
   */
  maxHeight: import_prop_types10.default.string
};
var Menu = function Menu2(_ref) {
  var _ref$emptyLabel = _ref.emptyLabel, emptyLabel = _ref$emptyLabel === void 0 ? "No matches found." : _ref$emptyLabel, innerRef = _ref.innerRef, _ref$maxHeight = _ref.maxHeight, maxHeight = _ref$maxHeight === void 0 ? "300px" : _ref$maxHeight, style = _ref.style, props = _objectWithoutProperties(_ref, _excluded14);
  var children = import_react19.Children.count(props.children) === 0 ? import_react19.default.createElement(BaseMenuItem, {
    disabled: true,
    role: "option"
  }, emptyLabel) : props.children;
  return (
    /* eslint-disable jsx-a11y/interactive-supports-focus */
    import_react19.default.createElement("div", _extends({}, props, {
      "aria-label": props["aria-label"] || "menu-options",
      className: (0, import_classnames8.default)("rbt-menu", "dropdown-menu", "show", props.className),
      onMouseDown: (
        // Prevent input from blurring when clicking on the menu scrollbar.
        preventInputBlur
      ),
      ref: innerRef,
      role: "listbox",
      style: _objectSpread11(_objectSpread11({}, style), {}, {
        display: "block",
        maxHeight,
        overflow: "auto"
      })
    }), children)
  );
};
Menu.propTypes = propTypes9;
Menu.Divider = MenuDivider;
Menu.Header = MenuHeader;
var Menu_default = Menu;

// node_modules/react-bootstrap-typeahead/es/components/TypeaheadMenu/TypeaheadMenu.js
var _excluded15 = ["labelKey", "newSelectionPrefix", "options", "paginationText", "renderMenuItemChildren", "text"];
var propTypes10 = {
  /**
   * Provides the ability to specify a prefix before the user-entered text to
   * indicate that the selection will be new. No-op unless `allowNew={true}`.
   */
  newSelectionPrefix: import_prop_types11.default.node,
  /**
   * Prompt displayed when large data sets are paginated.
   */
  paginationText: import_prop_types11.default.node,
  /**
   * Provides a hook for customized rendering of menu item contents.
   */
  renderMenuItemChildren: import_prop_types11.default.func
};
function renderMenuItemChildrenFn(option, props) {
  return import_react20.default.createElement(Highlighter_default, {
    search: props.text
  }, getOptionLabel_default(option, props.labelKey));
}
var TypeaheadMenu = function TypeaheadMenu2(props) {
  var labelKey = props.labelKey, _props$newSelectionPr = props.newSelectionPrefix, newSelectionPrefix = _props$newSelectionPr === void 0 ? "New selection: " : _props$newSelectionPr, options = props.options, _props$paginationText = props.paginationText, paginationText = _props$paginationText === void 0 ? "Display additional results..." : _props$paginationText, _props$renderMenuItem = props.renderMenuItemChildren, renderMenuItemChildren = _props$renderMenuItem === void 0 ? renderMenuItemChildrenFn : _props$renderMenuItem, text = props.text, menuProps = _objectWithoutProperties(props, _excluded15);
  var renderMenuItem = function renderMenuItem2(option, position) {
    var label = getOptionLabel_default(option, labelKey);
    var menuItemProps = {
      disabled: !!getOptionProperty(option, "disabled"),
      label,
      option,
      position
    };
    if (getOptionProperty(option, "customOption")) {
      return import_react20.default.createElement(MenuItem, _extends({}, menuItemProps, {
        className: "rbt-menu-custom-option",
        key: position,
        label
      }), newSelectionPrefix, import_react20.default.createElement(Highlighter_default, {
        search: text
      }, label));
    }
    if (getOptionProperty(option, "paginationOption")) {
      return import_react20.default.createElement(import_react20.default.Fragment, {
        key: "pagination-option-divider"
      }, import_react20.default.createElement(Menu_default.Divider, null), import_react20.default.createElement(MenuItem, _extends({}, menuItemProps, {
        className: "rbt-menu-pagination-option",
        label: (
          // TODO: Fix how (aria-)labels are passed to `MenuItem`.
          // `paginationText` can be a ReactNode.
          isString(paginationText) ? paginationText : ""
        )
      }), paginationText));
    }
    return import_react20.default.createElement(MenuItem, _extends({}, menuItemProps, {
      key: position
    }), renderMenuItemChildren(option, props, position));
  };
  return import_react20.default.createElement(Menu_default, _extends({}, menuProps, {
    key: (
      // Force a re-render if the text changes to ensure that menu
      // positioning updates correctly.
      text
    )
  }), options.map(renderMenuItem));
};
TypeaheadMenu.propTypes = propTypes10;
var TypeaheadMenu_default = TypeaheadMenu;

// node_modules/react-bootstrap-typeahead/es/components/Typeahead/Typeahead.js
function ownKeys12(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o3 = Object.getOwnPropertySymbols(e3);
    r2 && (o3 = o3.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o3);
  }
  return t2;
}
function _objectSpread12(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys12(Object(t2), true).forEach(function(r3) {
      _defineProperty(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys12(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _createSuper2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct2();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct2() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e3) {
    return false;
  }
}
var propTypes11 = {
  /**
   * Displays a button to clear the input when there are selections.
   */
  clearButton: import_prop_types12.default.bool,
  /**
   * Props to be applied directly to the input. `onBlur`, `onChange`,
   * `onFocus`, and `onKeyDown` are ignored.
   */
  inputProps: checkPropType(import_prop_types12.default.object, inputPropsType),
  /**
   * Bootstrap 4 only. Adds the `is-invalid` classname to the `form-control`.
   */
  isInvalid: import_prop_types12.default.bool,
  /**
   * Indicate whether an asynchronous data fetch is happening.
   */
  isLoading: import_prop_types12.default.bool,
  /**
   * Bootstrap 4 only. Adds the `is-valid` classname to the `form-control`.
   */
  isValid: import_prop_types12.default.bool,
  /**
   * Callback for custom input rendering.
   */
  renderInput: import_prop_types12.default.func,
  /**
   * Callback for custom menu rendering.
   */
  renderMenu: import_prop_types12.default.func,
  /**
   * Callback for custom menu rendering.
   */
  renderToken: import_prop_types12.default.func,
  /**
   * Specifies the size of the input.
   */
  size: sizeType
};
var defaultProps2 = {
  isLoading: false
};
var defaultRenderMenu = function defaultRenderMenu2(results, menuProps, props) {
  return import_react21.default.createElement(TypeaheadMenu_default, _extends({}, menuProps, {
    labelKey: props.labelKey,
    options: results,
    text: props.text
  }));
};
var defaultRenderToken = function defaultRenderToken2(option, props, idx) {
  return import_react21.default.createElement(Token_default, {
    disabled: props.disabled,
    key: idx,
    onRemove: props.onRemove,
    option,
    tabIndex: props.tabIndex
  }, getOptionLabel_default(option, props.labelKey));
};
var overlayPropKeys = ["align", "dropup", "flip", "positionFixed"];
function getOverlayProps(props) {
  return pick(props, overlayPropKeys);
}
var TypeaheadComponent = function(_React$Component) {
  _inherits(TypeaheadComponent2, _React$Component);
  var _super = _createSuper2(TypeaheadComponent2);
  function TypeaheadComponent2() {
    var _this;
    _classCallCheck(this, TypeaheadComponent2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "_referenceElement", null);
    _defineProperty(_assertThisInitialized(_this), "referenceElementRef", function(referenceElement) {
      _this._referenceElement = referenceElement;
    });
    _defineProperty(_assertThisInitialized(_this), "_renderInput", function(inputProps, props) {
      var _this$props = _this.props, isInvalid = _this$props.isInvalid, isValid = _this$props.isValid, multiple = _this$props.multiple, renderInput = _this$props.renderInput, renderToken = _this$props.renderToken, size = _this$props.size;
      if (isFunction(renderInput)) {
        return renderInput(inputProps, props);
      }
      var commonProps = _objectSpread12(_objectSpread12({}, inputProps), {}, {
        isInvalid,
        isValid,
        size
      });
      if (!multiple) {
        return import_react21.default.createElement(TypeaheadInputSingle_default, commonProps);
      }
      var labelKey = props.labelKey, onRemove = props.onRemove, selected = props.selected;
      return import_react21.default.createElement(TypeaheadInputMulti_default, _extends({}, commonProps, {
        placeholder: selected.length ? "" : inputProps.placeholder,
        selected
      }), selected.map(function(option, idx) {
        return (renderToken || defaultRenderToken)(option, _objectSpread12(_objectSpread12({}, commonProps), {}, {
          labelKey,
          onRemove
        }), idx);
      }));
    });
    _defineProperty(_assertThisInitialized(_this), "_renderMenu", function(results, menuProps, props) {
      var _this$props2 = _this.props, emptyLabel = _this$props2.emptyLabel, id = _this$props2.id, maxHeight = _this$props2.maxHeight, newSelectionPrefix = _this$props2.newSelectionPrefix, paginationText = _this$props2.paginationText, renderMenu = _this$props2.renderMenu, renderMenuItemChildren = _this$props2.renderMenuItemChildren;
      return (renderMenu || defaultRenderMenu)(results, _objectSpread12(_objectSpread12({}, menuProps), {}, {
        emptyLabel,
        id,
        maxHeight,
        newSelectionPrefix,
        paginationText,
        renderMenuItemChildren
      }), props);
    });
    _defineProperty(_assertThisInitialized(_this), "_renderAux", function(_ref) {
      var onClear = _ref.onClear, selected = _ref.selected;
      var _this$props3 = _this.props, clearButton = _this$props3.clearButton, disabled = _this$props3.disabled, isLoading = _this$props3.isLoading, size = _this$props3.size;
      var content;
      if (isLoading) {
        content = import_react21.default.createElement(Loader_default, null);
      } else if (clearButton && !disabled && selected.length) {
        content = import_react21.default.createElement(ClearButton_default, {
          onClick: onClear,
          onMouseDown: preventInputBlur,
          size
        });
      }
      return content ? import_react21.default.createElement("div", {
        className: (0, import_classnames9.default)("rbt-aux", {
          "rbt-aux-lg": isSizeLarge(size)
        })
      }, content) : null;
    });
    return _this;
  }
  _createClass(TypeaheadComponent2, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props4 = this.props, children = _this$props4.children, className = _this$props4.className, instanceRef = _this$props4.instanceRef, open = _this$props4.open, options = _this$props4.options, style = _this$props4.style;
      return import_react21.default.createElement(Typeahead_default, _extends({}, this.props, {
        options,
        ref: instanceRef
      }), function(props) {
        var hideMenu2 = props.hideMenu, isMenuShown = props.isMenuShown, results = props.results;
        var auxContent = _this2._renderAux(props);
        return import_react21.default.createElement(RootClose_default, {
          disabled: open || !isMenuShown,
          onRootClose: hideMenu2
        }, function(ref) {
          return import_react21.default.createElement("div", {
            className: (0, import_classnames9.default)("rbt", {
              "has-aux": !!auxContent,
              "is-invalid": _this2.props.isInvalid,
              "is-valid": _this2.props.isValid
            }, className),
            ref,
            style: _objectSpread12(_objectSpread12({}, style), {}, {
              outline: "none",
              position: "relative"
            }),
            tabIndex: -1
          }, _this2._renderInput(_objectSpread12(_objectSpread12({}, props.getInputProps(_this2.props.inputProps)), {}, {
            referenceElementRef: _this2.referenceElementRef
          }), props), import_react21.default.createElement(Overlay_default, _extends({}, getOverlayProps(_this2.props), {
            isMenuShown,
            referenceElement: _this2._referenceElement
          }), function(menuProps) {
            return _this2._renderMenu(results, menuProps, props);
          }), auxContent, isFunction(children) ? children(props) : children);
        });
      });
    }
  }]);
  return TypeaheadComponent2;
}(import_react21.default.Component);
_defineProperty(TypeaheadComponent, "propTypes", propTypes11);
_defineProperty(TypeaheadComponent, "defaultProps", defaultProps2);
var Typeahead_default2 = (0, import_react21.forwardRef)(function(props, ref) {
  return import_react21.default.createElement(TypeaheadComponent, _extends({}, props, {
    instanceRef: ref
  }));
});

// node_modules/react-bootstrap-typeahead/es/components/AsyncTypeahead/AsyncTypeahead.js
var AsyncTypeahead = (0, import_react22.forwardRef)(function(props, ref) {
  return import_react22.default.createElement(Typeahead_default2, _extends({}, useAsync(props), {
    ref
  }));
});
var AsyncTypeahead_default = AsyncTypeahead;
export {
  AsyncTypeahead_default as AsyncTypeahead,
  BaseMenuItem,
  ClearButton_default as ClearButton,
  Highlighter_default as Highlighter,
  Hint_default as Hint,
  Input_default as Input,
  Loader_default as Loader,
  Menu_default as Menu,
  MenuItem,
  Token_default as Token,
  Typeahead_default2 as Typeahead,
  TypeaheadInputMulti_default as TypeaheadInputMulti,
  TypeaheadInputSingle_default as TypeaheadInputSingle,
  TypeaheadMenu_default as TypeaheadMenu,
  Typeahead_default as TypeaheadRef,
  useAsync,
  useHint,
  useItem,
  useToken,
  withAsync,
  withItem,
  withToken
};
//# sourceMappingURL=react-bootstrap-typeahead.js.map
