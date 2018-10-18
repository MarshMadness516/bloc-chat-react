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
      activeRoomName: '',
      activeRoomKey: ''
    }

  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room })
    console.log(this.state.activeRoom)
  }

  render() {
    return (
      <div className="App">
          <div className="sidebar">
            <h1>Bloc Chat</h1>
            <RoomList
              firebase={ firebase }
              activeRoom={ this.state.activeRoom }
              setActiveRoom={(room) => this.setActiveRoom(room) } />
          </div>
        <div>
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom} />
        </div>
      </div>
    );
  }
}

export default App;
