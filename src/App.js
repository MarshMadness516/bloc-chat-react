import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB3dM9835VxaUgFmvVEb4b9Kq71O5LB5U0",
    authDomain: "bloc-chat-5dafd.firebaseapp.com",
    databaseURL: "https://bloc-chat-5dafd.firebaseio.com",
    projectId: "bloc-chat-5dafd",
    storageBucket: "bloc-chat-5dafd.appspot.com",
    messagingSenderId: "499679567203"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: '',
      activeRoomName: ''
    }

  }

  setActiveRoom(e) {
    this.setState({ activeRoomKey: e.target.getAttribute('data-rooms-key'), activeRoomName: e.target.getAttribute('data-rooms-name') });
    console.log(this.state.activeRoom);
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="sidebar">
            <h1>Bloc Chat</h1>
            <RoomList
              firebase={ firebase }
              activeRoom={ this.state.activeRoomKey }
              setActiveRoom={(e) => this.setActiveRoom(e) } />
          </div>
        </header>
        <div>
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoomKey}
            activeRoomName={this.state.activeRoomName} />
        </div>
      </div>
    );
  }
}

export default App;
