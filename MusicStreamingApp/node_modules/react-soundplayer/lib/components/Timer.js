'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var PropTypes = _react2['default'].PropTypes;
var Component = _react2['default'].Component;

var Timer = (function (_Component) {
    _inherits(Timer, _Component);

    function Timer() {
        _classCallCheck(this, Timer);

        _get(Object.getPrototypeOf(Timer.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Timer, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var duration = _props.duration;
            var currentTime = _props.currentTime;
            var className = _props.className;
            var style = _props.style;
            var soundCloudAudio = _props.soundCloudAudio;

            var classNames = (0, _classnames2['default'])('sb-soundplayer-timer', className);

            if (!duration && soundCloudAudio.duration) {
                duration = soundCloudAudio.duration;
            }

            return _react2['default'].createElement(
                'div',
                { className: classNames, style: style },
                Timer.prettyTime(currentTime),
                ' / ',
                Timer.prettyTime(duration)
            );
        }
    }], [{
        key: 'prettyTime',
        value: function prettyTime(time) {
            var hours = Math.floor(time / 3600);
            var mins = '0' + Math.floor(time % 3600 / 60);
            var secs = '0' + Math.floor(time % 60);

            mins = mins.substr(mins.length - 2);
            secs = secs.substr(secs.length - 2);

            if (!isNaN(secs)) {
                if (hours) {
                    return hours + ':' + mins + ':' + secs;
                } else {
                    return mins + ':' + secs;
                }
            } else {
                return '00:00';
            }
        }
    }]);

    return Timer;
})(Component);

Timer.propTypes = {
    className: PropTypes.string,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currentTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Timer.defaultProps = {
    duration: 0,
    currentTime: 0
};

exports['default'] = Timer;
module.exports = exports['default'];