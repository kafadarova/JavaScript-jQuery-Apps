import React, {Component, PropTypes} from 'react';
// higher level container that propagates its children with the props they will need to build the audio player
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import Track from './Track';

// create  the ProgressSoundPlayer component
export default class ProgressSoundPlayer extends Component {
  render() {
    const {resolveUrl, clientId} = this.props;
    return (
      // pass the resolveUrl and clientId as props
        <SoundPlayerContainer resolveUrl = {resolveUrl} clientId = {clientId}>
      <Track />
    </SoundPlayerContainer>
  );
  }
}
// props required by the component
ProgressSoundPlayer.propTypes = {
  resolveUrl: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired
};
