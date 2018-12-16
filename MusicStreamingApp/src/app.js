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

}
