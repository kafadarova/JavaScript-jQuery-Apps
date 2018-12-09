'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _soundcloudAudio = require('soundcloud-audio');

var _soundcloudAudio2 = _interopRequireDefault(_soundcloudAudio);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _utilsAudioStoreJs = require('../utils/audioStore.js');

var PropTypes = _react2['default'].PropTypes;
var Component = _react2['default'].Component;

var SoundPlayerContainer = (function (_Component) {
    _inherits(SoundPlayerContainer, _Component);

    function SoundPlayerContainer(props, context) {
        _classCallCheck(this, SoundPlayerContainer);

        _get(Object.getPrototypeOf(SoundPlayerContainer.prototype), 'constructor', this).call(this, props, context);

        if (!props.clientId) {
            throw new Error('You need to get clientId from SoundCloud\n                https://github.com/soundblogs/react-soundplayer#usage');
        }

        // Don't create a SoundCloudAudio instance
        // if there is no `window`
        if ('undefined' !== typeof window) {
            this.soundCloudAudio = new _soundcloudAudio2['default'](props.clientId);
        }

        this.state = {
            duration: 0,
            currentTime: 0,
            seeking: false,
            playing: false
        };
        this.wrapChild = this.wrapChild.bind(this);
    }

    _createClass(SoundPlayerContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;

            var soundCloudAudio = this.soundCloudAudio;
            var _props = this.props;
            var resolveUrl = _props.resolveUrl;
            var streamUrl = _props.streamUrl;

            if (streamUrl) {
                soundCloudAudio.preload(streamUrl);
            } else if (resolveUrl) {
                soundCloudAudio.resolve(resolveUrl, function (data) {
                    _this.setState(_defineProperty({}, data.tracks ? 'playlist' : 'track', data));
                });
            }

            // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
            soundCloudAudio.on('playing', this.onAudioStarted.bind(this));
            soundCloudAudio.on('timeupdate', this.getCurrentTime.bind(this));
            soundCloudAudio.on('loadedmetadata', this.getDuration.bind(this));
            soundCloudAudio.on('seeking', this.onSeekingTrack.bind(this));
            soundCloudAudio.on('seeked', this.onSeekedTrack.bind(this));
            soundCloudAudio.on('pause', this.onAudioPaused.bind(this));
            soundCloudAudio.on('ended', this.onAudioEnded.bind(this));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var soundCloudAudio = this.soundCloudAudio;
            var _props2 = this.props;
            var streamUrl = _props2.streamUrl;
            var resolveUrl = _props2.resolveUrl;

            var playedBefore = this.state.playing;

            function restartIfPlayed() {
                if (playedBefore) {
                    soundCloudAudio.play();
                }
            }

            if (streamUrl !== nextProps.streamUrl) {
                soundCloudAudio.stop();
                soundCloudAudio.preload(nextProps.streamUrl);
                restartIfPlayed();
            } else if (resolveUrl !== nextProps.resolveUrl) {
                soundCloudAudio.stop();
                soundCloudAudio.resolve(nextProps.resolveUrl, function (data) {
                    _this2.setState(_defineProperty({}, data.tracks ? 'playlist' : 'track', data));
                    restartIfPlayed();
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.soundCloudAudio.unbindAll();
        }
    }, {
        key: 'onSeekingTrack',
        value: function onSeekingTrack() {
            this.setState({ seeking: true });
        }
    }, {
        key: 'onSeekedTrack',
        value: function onSeekedTrack() {
            this.setState({ seeking: false });
        }
    }, {
        key: 'onAudioStarted',
        value: function onAudioStarted() {
            var soundCloudAudio = this.soundCloudAudio;
            var onStartTrack = this.props.onStartTrack;

            this.setState({ playing: true });

            (0, _utilsAudioStoreJs.stopAllOther)(soundCloudAudio.playing);
            (0, _utilsAudioStoreJs.addToPlayedStore)(soundCloudAudio);

            onStartTrack && onStartTrack(soundCloudAudio, soundCloudAudio.playing);
        }
    }, {
        key: 'onAudioPaused',
        value: function onAudioPaused() {
            var onPauseTrack = this.props.onPauseTrack;

            this.setState({ playing: false });

            onPauseTrack && onPauseTrack(this.soundCloudAudio);
        }
    }, {
        key: 'onAudioEnded',
        value: function onAudioEnded() {
            var onStopTrack = this.props.onStopTrack;

            this.setState({ playing: false });

            onStopTrack && onStopTrack(this.soundCloudAudio);
        }
    }, {
        key: 'getCurrentTime',
        value: function getCurrentTime() {
            this.setState({ currentTime: this.soundCloudAudio.audio.currentTime });
        }
    }, {
        key: 'getDuration',
        value: function getDuration() {
            this.setState({ duration: this.soundCloudAudio.audio.duration });
        }
    }, {
        key: 'wrapChild',
        value: function wrapChild(child) {
            var newProps = (0, _objectAssign2['default'])({}, { soundCloudAudio: this.soundCloudAudio }, this.state);
            return _react2['default'].cloneElement(child, newProps);
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.children;

            if (!children) {
                return null;
            }

            if (!Array.isArray(children)) {
                var child = children;
                return this.wrapChild(child);
            } else {
                return _react2['default'].createElement(
                    'span',
                    null,
                    _react2['default'].Children.map(children, this.wrapChild)
                );
            }
        }
    }]);

    return SoundPlayerContainer;
})(Component);

SoundPlayerContainer.propTypes = {
    streamUrl: PropTypes.string,
    resolveUrl: PropTypes.string,
    clientId: PropTypes.string.isRequired,
    onStartTrack: PropTypes.func,
    onStopTrack: PropTypes.func,
    onPauseTrack: PropTypes.func
};

exports['default'] = SoundPlayerContainer;
module.exports = exports['default'];