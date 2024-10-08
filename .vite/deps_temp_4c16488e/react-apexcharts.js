import {
  require_apexcharts_common
} from "./chunk-3JC3INOK.js";
import {
  require_prop_types
} from "./chunk-XKFK7FOU.js";
import "./chunk-OIOQ25RB.js";
import "./chunk-S7NTK4BX.js";
import {
  require_react
} from "./chunk-SOSU2OUM.js";
import {
  __commonJS
} from "./chunk-2LSFTFF7.js";

// node_modules/react-apexcharts/dist/react-apexcharts.min.js
var require_react_apexcharts_min = __commonJS({
  "node_modules/react-apexcharts/dist/react-apexcharts.min.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e;
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    };
    var _extends = Object.assign || function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r, n = arguments[t];
        for (r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    };
    var _createClass = function() {
      function n(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n2 = t[r];
          n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e, n2.key, n2);
        }
      }
      return function(e, t, r) {
        return t && n(e.prototype, t), r && n(e, r), e;
      };
    }();
    var _apexcharts = require_apexcharts_common();
    var _apexcharts2 = _interopRequireDefault(_apexcharts);
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _defineProperty(e, t, r) {
      return t in e ? Object.defineProperty(e, t, { value: r, enumerable: true, configurable: true, writable: true }) : e[t] = r, e;
    }
    function _objectWithoutProperties(e, t) {
      var r, n = {};
      for (r in e)
        0 <= t.indexOf(r) || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
      return n;
    }
    function _classCallCheck(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function _possibleConstructorReturn(e, t) {
      if (e)
        return !t || "object" != typeof t && "function" != typeof t ? e : t;
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    function _inherits(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: false, writable: true, configurable: true } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }
    window.ApexCharts = _apexcharts2.default;
    var Charts = function() {
      function r(e) {
        _classCallCheck(this, r);
        var t = _possibleConstructorReturn(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, e));
        return _react2.default.createRef ? t.chartRef = _react2.default.createRef() : t.setRef = function(e2) {
          return t.chartRef = e2;
        }, t.chart = null, t;
      }
      return _inherits(r, _react.Component), _createClass(r, [{ key: "render", value: function() {
        var e = _objectWithoutProperties(this.props, []);
        return _react2.default.createElement("div", _extends({ ref: _react2.default.createRef ? this.chartRef : this.setRef }, e));
      } }, { key: "componentDidMount", value: function() {
        var e = _react2.default.createRef ? this.chartRef.current : this.chartRef;
        this.chart = new _apexcharts2.default(e, this.getConfig()), this.chart.render();
      } }, { key: "getConfig", value: function() {
        var e = this.props, t = e.type, r2 = e.height, n = e.width, o = e.series, e = e.options;
        return this.extend(e, { chart: { type: t, height: r2, width: n }, series: o });
      } }, { key: "isObject", value: function(e) {
        return e && "object" === (void 0 === e ? "undefined" : _typeof(e)) && !Array.isArray(e) && null != e;
      } }, { key: "extend", value: function(t, r2) {
        var n = this, o = ("function" != typeof Object.assign && (Object.assign = function(e) {
          if (null == e)
            throw new TypeError("Cannot convert undefined or null to object");
          for (var t2 = Object(e), r3 = 1; r3 < arguments.length; r3++) {
            var n2 = arguments[r3];
            if (null != n2)
              for (var o2 in n2)
                n2.hasOwnProperty(o2) && (t2[o2] = n2[o2]);
          }
          return t2;
        }), Object.assign({}, t));
        return this.isObject(t) && this.isObject(r2) && Object.keys(r2).forEach(function(e) {
          n.isObject(r2[e]) && e in t ? o[e] = n.extend(t[e], r2[e]) : Object.assign(o, _defineProperty({}, e, r2[e]));
        }), o;
      } }, { key: "componentDidUpdate", value: function(e) {
        if (!this.chart)
          return null;
        var t = this.props, r2 = t.options, n = t.series, o = t.height, t = t.width, i = JSON.stringify(e.options), a = JSON.stringify(e.series), r2 = JSON.stringify(r2), s = JSON.stringify(n);
        i === r2 && a === s && o === e.height && t === e.width || (a !== s && i === r2 && o === e.height && t === e.width ? this.chart.updateSeries(n) : this.chart.updateOptions(this.getConfig()));
      } }, { key: "componentWillUnmount", value: function() {
        this.chart && "function" == typeof this.chart.destroy && this.chart.destroy();
      } }]), r;
    }();
    (exports.default = Charts).propTypes = { type: _propTypes2.default.string.isRequired, width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]), height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]), series: _propTypes2.default.array.isRequired, options: _propTypes2.default.object.isRequired }, Charts.defaultProps = { type: "line", width: "100%", height: "auto" };
  }
});
export default require_react_apexcharts_min();
//# sourceMappingURL=react-apexcharts.js.map
