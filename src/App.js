import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header>
          <div className="sidebar">
            <h1>Bloc Chat</h1>
            <RoomList firebase={ firebase }/>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
