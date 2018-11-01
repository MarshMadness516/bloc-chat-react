import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
      user: this.getGuestUser()
    }

  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.setUser( user );
      } else {
        this.setUser( this.getGuestUser() );
      }
    });
  }

  setUser( user ){
    this.setState( { user: user } );
  }
  getGuestUser() {
    return { displayName: "Guest", uid: "GUEST" };
  }

  signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup( provider )
      .then( ( result ) => {
        console.log("Sign-in successful: " + result.user.displayName )
      } )
      .catch( (error) => {
        console.log( error.toString() )
      });
  }

  signOut() {
    firebase.auth().signOut()
      .then( () => { console.log( "Sign-out successful" ) })
      .catch( (error) => { console.log( error.toString() ) });
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room })
    console.log(this.state.activeRoom)
  }

  render() {
    const user = this.state.user;
    const isGuest = (user.uid === this.getGuestUser().uid );
    return (
      <div className="App">
          <div className="sidebar">
            <h1>Bloc Chat</h1>
            <User
              firebase={ firebase }
              user={ user }
              isSignedIn={ !isGuest }
              signIn={ () => this.signIn() }
              signOut={ () => this.signOut() } />
            <RoomList
              firebase={ firebase }
              activeRoom={ this.state.activeRoom }
              setActiveRoom={(room) => this.setActiveRoom(room) } />
          </div>
        <div>
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            setUser={this.setUser}
            user={this.state.user} />
        </div>
      </div>
    );
  }
}

export default App;
