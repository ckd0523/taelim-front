import {
  _inheritsLoose
} from "./chunk-6C4GU5JX.js";
import {
  listen_default,
  ownerDocument,
  useEventCallback
} from "./chunk-GEJUQJDF.js";
import {
  _objectWithoutPropertiesLoose
} from "./chunk-PSGUSLG5.js";
import {
  useBootstrapPrefix
} from "./chunk-JI27HZNN.js";
import {
  require_prop_types
} from "./chunk-XKFK7FOU.js";
import {
  require_classnames
} from "./chunk-D6SQWUSH.js";
import {
  require_react_dom
} from "./chunk-NK66VB5V.js";
import {
  require_jsx_runtime
} from "./chunk-I6NDISQF.js";
import {
  require_react
} from "./chunk-SOSU2OUM.js";
import {
  __toESM
} from "./chunk-2LSFTFF7.js";

// node_modules/react-bootstrap/esm/Toast.js
var React10 = __toESM(require_react());
var import_react11 = __toESM(require_react());
var import_classnames5 = __toESM(require_classnames());

// node_modules/@restart/hooks/esm/useTimeout.js
var import_react4 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useMounted.js
var import_react = __toESM(require_react());
function useMounted() {
  const mounted = (0, import_react.useRef)(true);
  const isMounted = (0, import_react.useRef)(() => mounted.current);
  (0, import_react.useEffect)(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return isMounted.current;
}

// node_modules/@restart/hooks/esm/useUpdatedRef.js
var import_react2 = __toESM(require_react());
function useUpdatedRef(value) {
  const valueRef = (0, import_react2.useRef)(value);
  valueRef.current = value;
  return valueRef;
}

// node_modules/@restart/hooks/esm/useWillUnmount.js
var import_react3 = __toESM(require_react());
function useWillUnmount(fn) {
  const onUnmount = useUpdatedRef(fn);
  (0, import_react3.useEffect)(() => () => onUnmount.current(), []);
}

// node_modules/@restart/hooks/esm/useTimeout.js
var MAX_DELAY_MS = 2 ** 31 - 1;
function setChainedTimeout(handleRef, fn, timeoutAtMs) {
  const delayMs = timeoutAtMs - Date.now();
  handleRef.current = delayMs <= MAX_DELAY_MS ? setTimeout(fn, delayMs) : setTimeout(() => setChainedTimeout(handleRef, fn, timeoutAtMs), MAX_DELAY_MS);
}
function useTimeout() {
  const isMounted = useMounted();
  const handleRef = (0, import_react4.useRef)();
  useWillUnmount(() => clearTimeout(handleRef.current));
  return (0, import_react4.useMemo)(() => {
    const clear = () => clearTimeout(handleRef.current);
    function set(fn, delayMs = 0) {
      if (!isMounted())
        return;
      clear();
      if (delayMs <= MAX_DELAY_MS) {
        handleRef.current = setTimeout(fn, delayMs);
      } else {
        setChainedTimeout(handleRef, fn, Date.now() + delayMs);
      }
    }
    return {
      set,
      clear
    };
  }, []);
}

// node_modules/react-bootstrap/esm/ToastFade.js
var React5 = __toESM(require_react());

// node_modules/react-transition-group/esm/Transition.js
var import_prop_types2 = __toESM(require_prop_types());
var import_react6 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/react-transition-group/esm/config.js
var config_default = {
  disabled: false
};

// node_modules/react-transition-group/esm/utils/PropTypes.js
var import_prop_types = __toESM(require_prop_types());
var timeoutsShape = true ? import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
  enter: import_prop_types.default.number,
  exit: import_prop_types.default.number,
  appear: import_prop_types.default.number
}).isRequired]) : null;
var classNamesShape = true ? import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.shape({
  enter: import_prop_types.default.string,
  exit: import_prop_types.default.string,
  active: import_prop_types.default.string
}), import_prop_types.default.shape({
  enter: import_prop_types.default.string,
  enterDone: import_prop_types.default.string,
  enterActive: import_prop_types.default.string,
  exit: import_prop_types.default.string,
  exitDone: import_prop_types.default.string,
  exitActive: import_prop_types.default.string
})]) : null;

// node_modules/react-transition-group/esm/TransitionGroupContext.js
var import_react5 = __toESM(require_react());
var TransitionGroupContext_default = import_react5.default.createContext(null);

// node_modules/react-transition-group/esm/utils/reflow.js
var forceReflow = function forceReflow2(node) {
  return node.scrollTop;
};

// node_modules/react-transition-group/esm/Transition.js
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
var Transition = function(_React$Component) {
  _inheritsLoose(Transition2, _React$Component);
  function Transition2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context;
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;
    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }
    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }
  Transition2.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;
    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }
    return null;
  };
  var _proto = Transition2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;
    if (prevProps !== this.props) {
      var status = this.state.status;
      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }
    this.updateStatus(false, nextStatus);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };
  _proto.getTimeouts = function getTimeouts() {
    var timeout2 = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout2;
    if (timeout2 != null && typeof timeout2 !== "number") {
      exit = timeout2.exit;
      enter = timeout2.enter;
      appear = timeout2.appear !== void 0 ? timeout2.appear : enter;
    }
    return {
      exit,
      enter,
      appear
    };
  };
  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }
    if (nextStatus !== null) {
      this.cancelNextCallback();
      if (nextStatus === ENTERING) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var node = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom.default.findDOMNode(this);
          if (node)
            forceReflow(node);
        }
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };
  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;
    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;
    var _ref2 = this.props.nodeRef ? [appearing] : [import_react_dom.default.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    if (!mounting && !enter || config_default.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function() {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }
    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function() {
      _this2.props.onEntering(maybeNode, maybeAppearing);
      _this2.onTransitionEnd(enterTimeout, function() {
        _this2.safeSetState({
          status: ENTERED
        }, function() {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };
  _proto.performExit = function performExit() {
    var _this3 = this;
    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? void 0 : import_react_dom.default.findDOMNode(this);
    if (!exit || config_default.disabled) {
      this.safeSetState({
        status: EXITED
      }, function() {
        _this3.props.onExited(maybeNode);
      });
      return;
    }
    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function() {
      _this3.props.onExiting(maybeNode);
      _this3.onTransitionEnd(timeouts.exit, function() {
        _this3.safeSetState({
          status: EXITED
        }, function() {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };
  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  _proto.safeSetState = function safeSetState(nextState, callback) {
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };
  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;
    var active = true;
    this.nextCallback = function(event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };
    this.nextCallback.cancel = function() {
      active = false;
    };
    return this.nextCallback;
  };
  _proto.onTransitionEnd = function onTransitionEnd(timeout2, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom.default.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout2 == null && !this.props.addEndListener;
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
      this.props.addEndListener(maybeNode, maybeNextCallback);
    }
    if (timeout2 != null) {
      setTimeout(this.nextCallback, timeout2);
    }
  };
  _proto.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }
    var _this$props = this.props, children = _this$props.children, _in = _this$props.in, _mountOnEnter = _this$props.mountOnEnter, _unmountOnExit = _this$props.unmountOnExit, _appear = _this$props.appear, _enter = _this$props.enter, _exit = _this$props.exit, _timeout = _this$props.timeout, _addEndListener = _this$props.addEndListener, _onEnter = _this$props.onEnter, _onEntering = _this$props.onEntering, _onEntered = _this$props.onEntered, _onExit = _this$props.onExit, _onExiting = _this$props.onExiting, _onExited = _this$props.onExited, _nodeRef = _this$props.nodeRef, childProps = _objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      import_react6.default.createElement(TransitionGroupContext_default.Provider, {
        value: null
      }, typeof children === "function" ? children(status, childProps) : import_react6.default.cloneElement(import_react6.default.Children.only(children), childProps))
    );
  };
  return Transition2;
}(import_react6.default.Component);
Transition.contextType = TransitionGroupContext_default;
Transition.propTypes = true ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: import_prop_types2.default.shape({
    current: typeof Element === "undefined" ? import_prop_types2.default.any : function(propValue, key, componentName, location, propFullName, secret) {
      var value = propValue[key];
      return import_prop_types2.default.instanceOf(value && "ownerDocument" in value ? value.ownerDocument.defaultView.Element : Element)(propValue, key, componentName, location, propFullName, secret);
    }
  }),
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: import_prop_types2.default.oneOfType([import_prop_types2.default.func.isRequired, import_prop_types2.default.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: import_prop_types2.default.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: import_prop_types2.default.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: import_prop_types2.default.bool,
  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: import_prop_types2.default.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: import_prop_types2.default.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: import_prop_types2.default.bool,
  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function timeout(props) {
    var pt = timeoutsShape;
    if (!props.addEndListener)
      pt = pt.isRequired;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return pt.apply(void 0, [props].concat(args));
  },
  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: import_prop_types2.default.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: import_prop_types2.default.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: import_prop_types2.default.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: import_prop_types2.default.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: import_prop_types2.default.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: import_prop_types2.default.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: import_prop_types2.default.func
} : {};
function noop() {
}
Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
var Transition_default = Transition;

// node_modules/react-bootstrap/esm/Fade.js
var import_classnames = __toESM(require_classnames());
var React4 = __toESM(require_react());
var import_react9 = __toESM(require_react());

// node_modules/dom-helpers/esm/ownerWindow.js
function ownerWindow(node) {
  var doc = ownerDocument(node);
  return doc && doc.defaultView || window;
}

// node_modules/dom-helpers/esm/getComputedStyle.js
function getComputedStyle(node, psuedoElement) {
  return ownerWindow(node).getComputedStyle(node, psuedoElement);
}

// node_modules/dom-helpers/esm/hyphenate.js
var rUpper = /([A-Z])/g;
function hyphenate(string) {
  return string.replace(rUpper, "-$1").toLowerCase();
}

// node_modules/dom-helpers/esm/hyphenateStyle.js
var msPattern = /^ms-/;
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, "-ms-");
}

// node_modules/dom-helpers/esm/isTransform.js
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function isTransform(value) {
  return !!(value && supportedTransforms.test(value));
}

// node_modules/dom-helpers/esm/css.js
function style(node, property) {
  var css = "";
  var transforms = "";
  if (typeof property === "string") {
    return node.style.getPropertyValue(hyphenateStyleName(property)) || getComputedStyle(node).getPropertyValue(hyphenateStyleName(property));
  }
  Object.keys(property).forEach(function(key) {
    var value = property[key];
    if (!value && value !== 0) {
      node.style.removeProperty(hyphenateStyleName(key));
    } else if (isTransform(key)) {
      transforms += key + "(" + value + ") ";
    } else {
      css += hyphenateStyleName(key) + ": " + value + ";";
    }
  });
  if (transforms) {
    css += "transform: " + transforms + ";";
  }
  node.style.cssText += ";" + css;
}
var css_default = style;

// node_modules/dom-helpers/esm/triggerEvent.js
function triggerEvent(node, eventName, bubbles, cancelable) {
  if (bubbles === void 0) {
    bubbles = false;
  }
  if (cancelable === void 0) {
    cancelable = true;
  }
  if (node) {
    var event = document.createEvent("HTMLEvents");
    event.initEvent(eventName, bubbles, cancelable);
    node.dispatchEvent(event);
  }
}

// node_modules/dom-helpers/esm/transitionEnd.js
function parseDuration(node) {
  var str = css_default(node, "transitionDuration") || "";
  var mult = str.indexOf("ms") === -1 ? 1e3 : 1;
  return parseFloat(str) * mult;
}
function emulateTransitionEnd(element, duration, padding) {
  if (padding === void 0) {
    padding = 5;
  }
  var called = false;
  var handle = setTimeout(function() {
    if (!called)
      triggerEvent(element, "transitionend", true);
  }, duration + padding);
  var remove = listen_default(element, "transitionend", function() {
    called = true;
  }, {
    once: true
  });
  return function() {
    clearTimeout(handle);
    remove();
  };
}
function transitionEnd(element, handler, duration, padding) {
  if (duration == null)
    duration = parseDuration(element) || 0;
  var removeEmulate = emulateTransitionEnd(element, duration, padding);
  var remove = listen_default(element, "transitionend", handler);
  return function() {
    removeEmulate();
    remove();
  };
}

// node_modules/react-bootstrap/esm/transitionEndListener.js
function parseDuration2(node, property) {
  const str = css_default(node, property) || "";
  const mult = str.indexOf("ms") === -1 ? 1e3 : 1;
  return parseFloat(str) * mult;
}
function transitionEndListener(element, handler) {
  const duration = parseDuration2(element, "transitionDuration");
  const delay = parseDuration2(element, "transitionDelay");
  const remove = transitionEnd(element, (e) => {
    if (e.target === element) {
      remove();
      handler(e);
    }
  }, duration + delay);
}

// node_modules/react-bootstrap/esm/triggerBrowserReflow.js
function triggerBrowserReflow(node) {
  node.offsetHeight;
}

// node_modules/react-bootstrap/esm/TransitionWrapper.js
var import_react8 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useMergedRefs.js
var import_react7 = __toESM(require_react());
var toFnRef = (ref) => !ref || typeof ref === "function" ? ref : (value) => {
  ref.current = value;
};
function mergeRefs(refA, refB) {
  const a = toFnRef(refA);
  const b = toFnRef(refB);
  return (value) => {
    if (a)
      a(value);
    if (b)
      b(value);
  };
}
function useMergedRefs(refA, refB) {
  return (0, import_react7.useMemo)(() => mergeRefs(refA, refB), [refA, refB]);
}
var useMergedRefs_default = useMergedRefs;

// node_modules/react-bootstrap/esm/safeFindDOMNode.js
var import_react_dom2 = __toESM(require_react_dom());
function safeFindDOMNode(componentOrElement) {
  if (componentOrElement && "setState" in componentOrElement) {
    return import_react_dom2.default.findDOMNode(componentOrElement);
  }
  return componentOrElement != null ? componentOrElement : null;
}

// node_modules/react-bootstrap/esm/TransitionWrapper.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var TransitionWrapper = import_react8.default.forwardRef(({
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  addEndListener,
  children,
  childRef,
  ...props
}, ref) => {
  const nodeRef = (0, import_react8.useRef)(null);
  const mergedRef = useMergedRefs_default(nodeRef, childRef);
  const attachRef = (r) => {
    mergedRef(safeFindDOMNode(r));
  };
  const normalize = (callback) => (param) => {
    if (callback && nodeRef.current) {
      callback(nodeRef.current, param);
    }
  };
  const handleEnter = (0, import_react8.useCallback)(normalize(onEnter), [onEnter]);
  const handleEntering = (0, import_react8.useCallback)(normalize(onEntering), [onEntering]);
  const handleEntered = (0, import_react8.useCallback)(normalize(onEntered), [onEntered]);
  const handleExit = (0, import_react8.useCallback)(normalize(onExit), [onExit]);
  const handleExiting = (0, import_react8.useCallback)(normalize(onExiting), [onExiting]);
  const handleExited = (0, import_react8.useCallback)(normalize(onExited), [onExited]);
  const handleAddEndListener = (0, import_react8.useCallback)(normalize(addEndListener), [addEndListener]);
  return (0, import_jsx_runtime.jsx)(Transition_default, {
    ref,
    ...props,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    nodeRef,
    children: typeof children === "function" ? (status, innerProps) => (
      // TODO: Types for RTG missing innerProps, so need to cast.
      children(status, {
        ...innerProps,
        ref: attachRef
      })
    ) : import_react8.default.cloneElement(children, {
      ref: attachRef
    })
  });
});
var TransitionWrapper_default = TransitionWrapper;

// node_modules/react-bootstrap/esm/Fade.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var fadeStyles = {
  [ENTERING]: "show",
  [ENTERED]: "show"
};
var Fade = React4.forwardRef(({
  className,
  children,
  transitionClasses = {},
  onEnter,
  ...rest
}, ref) => {
  const props = {
    in: false,
    timeout: 300,
    mountOnEnter: false,
    unmountOnExit: false,
    appear: false,
    ...rest
  };
  const handleEnter = (0, import_react9.useCallback)((node, isAppearing) => {
    triggerBrowserReflow(node);
    onEnter == null ? void 0 : onEnter(node, isAppearing);
  }, [onEnter]);
  return (0, import_jsx_runtime2.jsx)(TransitionWrapper_default, {
    ref,
    addEndListener: transitionEndListener,
    ...props,
    onEnter: handleEnter,
    childRef: children.ref,
    children: (status, innerProps) => React4.cloneElement(children, {
      ...innerProps,
      className: (0, import_classnames.default)("fade", className, children.props.className, fadeStyles[status], transitionClasses[status])
    })
  });
});
Fade.displayName = "Fade";
var Fade_default = Fade;

// node_modules/react-bootstrap/esm/ToastFade.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var fadeStyles2 = {
  [ENTERING]: "showing",
  [EXITING]: "showing show"
};
var ToastFade = React5.forwardRef((props, ref) => (0, import_jsx_runtime3.jsx)(Fade_default, {
  ...props,
  ref,
  transitionClasses: fadeStyles2
}));
ToastFade.displayName = "ToastFade";
var ToastFade_default = ToastFade;

// node_modules/react-bootstrap/esm/ToastHeader.js
var import_classnames3 = __toESM(require_classnames());
var React8 = __toESM(require_react());
var import_react10 = __toESM(require_react());

// node_modules/react-bootstrap/esm/CloseButton.js
var import_prop_types3 = __toESM(require_prop_types());
var React6 = __toESM(require_react());
var import_classnames2 = __toESM(require_classnames());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var propTypes = {
  /** An accessible label indicating the relevant information about the Close Button. */
  "aria-label": import_prop_types3.default.string,
  /** A callback fired after the Close Button is clicked. */
  onClick: import_prop_types3.default.func,
  /**
   * Render different color variant for the button.
   *
   * Omitting this will render the default dark color.
   */
  variant: import_prop_types3.default.oneOf(["white"])
};
var CloseButton = React6.forwardRef(({
  className,
  variant,
  "aria-label": ariaLabel = "Close",
  ...props
}, ref) => (0, import_jsx_runtime4.jsx)("button", {
  ref,
  type: "button",
  className: (0, import_classnames2.default)("btn-close", variant && `btn-close-${variant}`, className),
  "aria-label": ariaLabel,
  ...props
}));
CloseButton.displayName = "CloseButton";
CloseButton.propTypes = propTypes;
var CloseButton_default = CloseButton;

// node_modules/react-bootstrap/esm/ToastContext.js
var React7 = __toESM(require_react());
var ToastContext = React7.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose() {
  }
});
var ToastContext_default = ToastContext;

// node_modules/react-bootstrap/esm/ToastHeader.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var ToastHeader = React8.forwardRef(({
  bsPrefix,
  closeLabel = "Close",
  closeVariant,
  closeButton = true,
  className,
  children,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "toast-header");
  const context = (0, import_react10.useContext)(ToastContext_default);
  const handleClick = useEventCallback((e) => {
    context == null ? void 0 : context.onClose == null ? void 0 : context.onClose(e);
  });
  return (0, import_jsx_runtime6.jsxs)("div", {
    ref,
    ...props,
    className: (0, import_classnames3.default)(bsPrefix, className),
    children: [children, closeButton && (0, import_jsx_runtime5.jsx)(CloseButton_default, {
      "aria-label": closeLabel,
      variant: closeVariant,
      onClick: handleClick,
      "data-dismiss": "toast"
    })]
  });
});
ToastHeader.displayName = "ToastHeader";
var ToastHeader_default = ToastHeader;

// node_modules/react-bootstrap/esm/ToastBody.js
var React9 = __toESM(require_react());
var import_classnames4 = __toESM(require_classnames());
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var ToastBody = React9.forwardRef(({
  className,
  bsPrefix,
  as: Component = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "toast-body");
  return (0, import_jsx_runtime7.jsx)(Component, {
    ref,
    className: (0, import_classnames4.default)(className, bsPrefix),
    ...props
  });
});
ToastBody.displayName = "ToastBody";
var ToastBody_default = ToastBody;

// node_modules/react-bootstrap/esm/Toast.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var Toast = React10.forwardRef(({
  bsPrefix,
  className,
  transition: Transition2 = ToastFade_default,
  show = true,
  animation = true,
  delay = 5e3,
  autohide = false,
  onClose,
  onEntered,
  onExit,
  onExiting,
  onEnter,
  onEntering,
  onExited,
  bg,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "toast");
  const delayRef = (0, import_react11.useRef)(delay);
  const onCloseRef = (0, import_react11.useRef)(onClose);
  (0, import_react11.useEffect)(() => {
    delayRef.current = delay;
    onCloseRef.current = onClose;
  }, [delay, onClose]);
  const autohideTimeout = useTimeout();
  const autohideToast = !!(autohide && show);
  const autohideFunc = (0, import_react11.useCallback)(() => {
    if (autohideToast) {
      onCloseRef.current == null ? void 0 : onCloseRef.current();
    }
  }, [autohideToast]);
  (0, import_react11.useEffect)(() => {
    autohideTimeout.set(autohideFunc, delayRef.current);
  }, [autohideTimeout, autohideFunc]);
  const toastContext = (0, import_react11.useMemo)(() => ({
    onClose
  }), [onClose]);
  const hasAnimation = !!(Transition2 && animation);
  const toast = (0, import_jsx_runtime8.jsx)("div", {
    ...props,
    ref,
    className: (0, import_classnames5.default)(bsPrefix, className, bg && `bg-${bg}`, !hasAnimation && (show ? "show" : "hide")),
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true"
  });
  return (0, import_jsx_runtime8.jsx)(ToastContext_default.Provider, {
    value: toastContext,
    children: hasAnimation && Transition2 ? (0, import_jsx_runtime8.jsx)(Transition2, {
      in: show,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      unmountOnExit: true,
      children: toast
    }) : toast
  });
});
Toast.displayName = "Toast";
var Toast_default = Object.assign(Toast, {
  Body: ToastBody_default,
  Header: ToastHeader_default
});

export {
  css_default,
  EXITED,
  ENTERING,
  ENTERED,
  EXITING,
  transitionEnd,
  transitionEndListener,
  triggerBrowserReflow,
  useMergedRefs_default,
  safeFindDOMNode,
  TransitionWrapper_default,
  useMounted,
  Fade_default,
  CloseButton_default,
  useWillUnmount,
  useTimeout,
  ToastHeader_default,
  ToastBody_default,
  Toast_default
};
//# sourceMappingURL=chunk-ZSD7IZM6.js.map
