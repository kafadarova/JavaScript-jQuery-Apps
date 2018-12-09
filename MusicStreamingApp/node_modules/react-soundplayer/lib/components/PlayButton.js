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

var _soundcloudAudio = require('soundcloud-audio');

var _soundcloudAudio2 = _interopRequireDefault(_soundcloudAudio);

var _Icons = require('./Icons');

var PropTypes = _react2['default'].PropTypes;
var Component = _react2['default'].Component;

var PlayButton = (function (_Component) {
    _inherits(PlayButton, _Component);

    function PlayButton() {
        _classCallCheck(this, PlayButton);

        _get(Object.getPrototypeOf(PlayButton.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(PlayButton, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            var _props = this.props;
            var playing = _props.playing;
            var seeking = _props.seeking;

            return playing !== nextProps.playing || seeking !== nextProps.seeking;
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            var _props2 = this.props;
            var playing = _props2.playing;
            var soundCloudAudio = _props2.soundCloudAudio;
            var onTogglePlay = _props2.onTogglePlay;

            if (!playing) {
                soundCloudAudio && soundCloudAudio.play({ playlistIndex: soundCloudAudio._playlistIndex });
            } else {
                soundCloudAudio && soundCloudAudio.pause();
            }

            onTogglePlay && onTogglePlay(e);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props;
            var playing = _props3.playing;
            var seekingIcon = _props3.seekingIcon;
            var seeking = _props3.seeking;
            var className = _props3.className;
            var style = _props3.style;

            var iconNode = undefined;
            if (seeking && seekingIcon) {
                iconNode = _react2['default'].cloneElement(seekingIcon);
            } else if (playing) {
                iconNode = _react2['default'].createElement(_Icons.PauseIconSVG, null);
            } else {
                iconNode = _react2['default'].createElement(_Icons.PlayIconSVG, null);
            }

            var classNames = (0, _classnames2['default'])('sb-soundplayer-play-btn', className);

            return _react2['default'].createElement(
                'button',
                { type: 'button', className: classNames, style: style, onClick: this.handleClick.bind(this) },
                iconNode
            );
        }
    }]);

    return PlayButton;
})(Component);

PlayButton.propTypes = {
    className: PropTypes.string,
    seeking: PropTypes.bool,
    playing: PropTypes.bool,
    onTogglePlay: PropTypes.func,
    seekingIcon: PropTypes.node,
    soundCloudAudio: PropTypes.instanceOf(_soundcloudAudio2['default'])
};

PlayButton.defaultProps = {
    playing: false,
    seeking: false
};

exports['default'] = PlayButton;
module.exports = exports['default'];