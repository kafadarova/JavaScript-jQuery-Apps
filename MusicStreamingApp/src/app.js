// import all the libraries
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ProgressSoundPlayer from './components/ProgressSoundPlayer';
import SC from 'node-soundcloud';
import Loading from 'react-loading'

// Add the soundcloud id
let client_id = 'YOUR SOUNDCLOUD APP ID';

// Initialize the node-souded library
SC.init({
  id: client_id
});
