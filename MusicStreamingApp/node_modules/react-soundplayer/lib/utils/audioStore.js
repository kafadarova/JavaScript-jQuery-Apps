// handling multiple audio on the page helpers
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stopAllOther = stopAllOther;
exports.addToPlayedStore = addToPlayedStore;
var _playedAudios = [];

function each(arr, cb) {
    if (arr) {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] && cb(arr[i], i, arr)) {
                break;
            }
        }
    }
}

function stopAllOther(playing) {
    each(_playedAudios, function (soundCloudAudio) {
        if (soundCloudAudio.playing && soundCloudAudio.playing !== playing) {
            soundCloudAudio.stop();
        }
    });
}

function addToPlayedStore(soundCloudAudio) {
    var isPresent = false;

    each(_playedAudios, function (_soundCloudAudio) {
        if (_soundCloudAudio.playing === soundCloudAudio.playing) {
            isPresent = true;
            return true;
        }
    });

    if (!isPresent) {
        _playedAudios.push(soundCloudAudio);
    }
}