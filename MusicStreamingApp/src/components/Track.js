// require React, extract the Component class from React
import React, {Component} from 'react';
// requite a few components provided by React SoundPlayer
import { PlayButton, Progress, Timer } from 'react-soundplayer/components';

// exporting the class - it can be imported into another file
export default class Track extends Component{
  render() {
    // extract the information from the props
    // assign them into variables
    const { track, soundCloudAudio, playing, seeking, currentTime, duration } = this.props;

    // calculate the track's current progress
    const currentProgress = currentTime / duration * 100 || 0;

    // return the UI of the component
    return(
    <div className="player">
    <PlayButton
    className="orange-button"
    soundCloudAudio={soundCloudAudio}
    playing={playing}
    seeking={seeking} />
    <Timer
    duration={duration}
    className="timer"
    soundCloudAudio={soundCloudAudio}
    currentTime={currentTime} />
    <div className="track-info">
    <h2 className="track-title">{track && track.title}</h2>
    <h3 className="track-user">{track && track.user &&
    track.user.username}</h3>
    </div>
    <Progress
    className="progress-container"
    innerClassName="progress"
    soundCloudAudio={soundCloudAudio}
    value={currentProgress} />
    </div>
  );
  }
}
