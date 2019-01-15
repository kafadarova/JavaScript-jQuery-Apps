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

// create main component
class Main extends Component {

  // define the constructor
  constructor(props) {

    // call the  constructor of the Component class and
    // any initialization code that the Component class has
    super();

    // set the default state of the app
    this.state = {
      query: '', // default search query
      hasResults: false, // has the component currently any results from the API
      searchResults: [], // stores the current search results
      isLoading: false // app is currently fetching results from the API or not.
    };

    // update the query in state
    handleTextChange(e){
      this.setState({
        query: e.target.value
      });
      // call the search methon on enter klick 
      if (e.key === 'Enter'){
        this.search.call(this);
      }
    }
    
    // send the query to the  API and processes the response
    search() {
      // sets the loading state to true
      // spinner becomes visible
      this.setState({
        isLoading: true
      });
      
      // get request to tracks
      SC.get('/tracks', {
        q: this.state.query, 
        embeddable_by: 'all'
      }, (err, tracks) => {
        // update the state 
        this.setState({
          hasResults: true,
          searchResults: tracks,
          isLoading: false
        });
      }
    });
  }
  // renders the UI
  render() {
   return (
     <div>
     <h1>Electron SoundCloud Player</h1>
     <input type="search"
            onKeyUp={this.handleTextChange.bind(this)}
            className="search-field"
            placeholder="Enter song name or artist" />
    <button className="search-button"
            onClick={this.search.bind(this)}>Search</button>
    <div class="center">
    {this.state.isLoading && <Loading type="bars" color="#FFB935" />}
    </div>
    {this.state.hasResults && !this.state.isLoading ? 
    this.renderSearchResults.call(this):
    this.renderNoSearchResults.call(this)}
     </div>
   );
  }
  // called by default since there are no search
  renderNoSearchResults() {
    return (
       <div id="no-results"></div>
    );
  }
  
  // search results to display
  renderSearchResults() {
    return (
      <div id="search-results"> 
      // loop through all the result
      // execute the renderPlayer function for each iteration
      {this.state.searchResults.map(this.renderPlayer.bind(this))}
      </div>
    );
  }
  // accepts the individual track object as its argument
  renderPlayer(track) {
    return (
    <ProgressSoundPlayer
    key = {track.id}
    client_id = {client_id} // the  SoundCloud API key
    resolveUrl = {track.permalink.url} // refers to specific audio track
    />  
    );
  } 
}
