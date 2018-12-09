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

var _soundcloudAudio = require('soundcloud-audio');

var _soundcloudAudio2 = _interopRequireDefault(_soundcloudAudio);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var PropTypes = _react2['default'].PropTypes;
var Component = _react2['default'].Component;

var Progress = (function (_Component) {
    _inherits(Progress, _Component);

    function Progress() {
        _classCallCheck(this, Progress);

        _get(Object.getPrototypeOf(Progress.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Progress, [{
        key: 'handleSeekTrack',
        value: function handleSeekTrack(e) {
            var _props = this.props;
            var onSeekTrack = _props.onSeekTrack;
            var soundCloudAudio = _props.soundCloudAudio;

            var xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

            if (soundCloudAudio && !isNaN(soundCloudAudio.audio.duration)) {
                soundCloudAudio.audio.currentTime = xPos * soundCloudAudio.audio.duration;
            }

            onSeekTrack && onSeekTrack.call(this, xPos, e);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props;
            var value = _props2.value;
            var className = _props2.className;
            var innerClassName = _props2.innerClassName;
            var style = _props2.style;
            var innerStyle = _props2.innerStyle;
            var currentTime = _props2.currentTime;
            var duration = _props2.duration;

            if (!value && currentTime && duration) {
                value = currentTime / duration * 100 || 0;
            }

            if (value < 0) {
                value = 0;
            }

            if (value > 100) {
                value = 100;
            }

            var classNames = (0, _classnames2['default'])('sb-soundplayer-progress-container', className);
            var innerClassNames = (0, _classnames2['default'])('sb-soundplayer-progress-inner', innerClassName);

            if (!innerStyle) {
                innerStyle = {};
            }

            innerStyle = Object.assign(innerStyle, { width: value + '%' });

            return _react2['default'].createElement(
                'div',
                { className: classNames, style: style, onClick: this.handleSeekTrack.bind(this) },
                _react2['default'].createElement('div', { className: innerClassNames, style: innerStyle })
            );
        }
    }]);

    return Progress;
})(Component);

Progress.propTypes = {
    className: PropTypes.string,
    innerClassName: _react2['default'].PropTypes.string,
    innerStyle: PropTypes.object,
    value: _react2['default'].PropTypes.number,
    onSeekTrack: PropTypes.func,
    soundCloudAudio: PropTypes.instanceOf(_soundcloudAudio2['default'])
};

Progress.defaultProps = {
    value: 0
};

exports['default'] = Progress;
module.exports = exports['default'];