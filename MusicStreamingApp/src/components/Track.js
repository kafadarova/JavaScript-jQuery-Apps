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
  }
}
