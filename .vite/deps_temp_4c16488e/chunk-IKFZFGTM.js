import {
  require_react
} from "./chunk-SOSU2OUM.js";
import {
  __commonJS,
  __toESM
} from "./chunk-2LSFTFF7.js";

// node_modules/invariant/browser.js
var require_browser = __commonJS({
  "node_modules/invariant/browser.js"(exports, module) {
    "use strict";
    var invariant = function(condition, format, a, b, c, d, e, f) {
      if (true) {
        if (format === void 0) {
          throw new Error("invariant requires an error message argument");
        }
      }
      if (!condition) {
        var error;
        if (format === void 0) {
          error = new Error(
            "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
          );
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(
            format.replace(/%s/g, function() {
              return args[argIndex++];
            })
          );
          error.name = "Invariant Violation";
        }
        error.framesToPop = 1;
        throw error;
      }
    };
    module.exports = invariant;
  }
});

// node_modules/@restart/hooks/esm/usePrevious.js
var import_react = __toESM(require_react());
function usePrevious(value) {
  const ref = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    ref.current = value;
  });
  return ref.current;
}

// node_modules/@restart/hooks/esm/useForceUpdate.js
var import_react2 = __toESM(require_react());
function useForceUpdate() {
  const [, dispatch] = (0, import_react2.useReducer)((state) => !state, false);
  return dispatch;
}

// node_modules/dom-helpers/esm/contains.js
function contains(context, node) {
  if (context.contains)
    return context.contains(node);
  if (context.compareDocumentPosition)
    return context === node || !!(context.compareDocumentPosition(node) & 16);
}

export {
  require_browser,
  usePrevious,
  useForceUpdate,
  contains
};
//# sourceMappingURL=chunk-IKFZFGTM.js.map
