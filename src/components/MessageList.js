import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          messages: [],
          username: '',
          content: '',
          roomID: '',
          sentAt: '',
        }

        this.messagesRef = this.props.firebase.database().ref('messages');

    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
          const message = snapshot.val();
          message.key = snapshot.key;
          this.setState({ messages: this.state.messages.concat( message ) });
        });
    }

    render() {
      if(this.props.activeRoom === undefined) {
        return (
          <div>
            <h3>Not currently in a chatroom</h3>
            <h4>Select or create one to start chatting</h4>
          </div>
        );
      } else {
        return (
          <div>
            <h3>{this.props.activeRoomName}</h3>
            <ul>
              {this.state.messages
                .filter((message) => message.roomId === this.props.activeRoom.key)
                .map((message, index) =>
                  <div key={index}>
                    <p id="username">Username: {message.username}</p>
                    <p id="content">Message: {message.content}</p>
                    <p id="timestamp">Timestamp: {message.sentAt}</p>
                  </div>
              )}
            </ul>
          </div>
        );
        }
      }
    }


export default MessageList;
