import {
  __esm
} from "./chunk-2LSFTFF7.js";

// node_modules/tiny-invariant/dist/esm/tiny-invariant.js
function invariant(condition, message) {
  if (condition) {
    return;
  }
  if (isProduction) {
    throw new Error(prefix);
  }
  var provided = typeof message === "function" ? message() : message;
  var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
  throw new Error(value);
}
var isProduction, prefix;
var init_tiny_invariant = __esm({
  "node_modules/tiny-invariant/dist/esm/tiny-invariant.js"() {
    isProduction = false;
    prefix = "Invariant failed";
  }
});

export {
  invariant,
  init_tiny_invariant
};
//# sourceMappingURL=chunk-U4RNP7XN.js.map
