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

var NextButton = (function (_Component) {
    _inherits(NextButton, _Component);

    function NextButton() {
        _classCallCheck(this, NextButton);

        _get(Object.getPrototypeOf(NextButton.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(NextButton, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return false;
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            var _props = this.props;
            var soundCloudAudio = _props.soundCloudAudio;
            var onNextClick = _props.onNextClick;

            soundCloudAudio && soundCloudAudio.next();
            onNextClick && onNextClick(e);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props;
            var className = _props2.className;
            var style = _props2.style;

            var classNames = (0, _classnames2['default'])('sb-soundplayer-play-btn', className);

            return _react2['default'].createElement(
                'button',
                { type: 'button', className: classNames, style: style, onClick: this.handleClick.bind(this) },
                _react2['default'].createElement(_Icons.NextIconSVG, null)
            );
        }
    }]);

    return NextButton;
})(Component);

NextButton.propTypes = {
    className: PropTypes.string,
    onNextClick: PropTypes.func,
    soundCloudAudio: PropTypes.instanceOf(_soundcloudAudio2['default'])
};

exports['default'] = NextButton;
module.exports = exports['default'];