import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          messages: [],
          Message: [{
            username: '',
            content: '',
            roomId: '',
            sentAt: '',
          }],
          newMessage: ''
        }

        this.messagesRef = this.props.firebase.database().ref('Messages');
        this.createMessages=this.createMessages.bind(this);
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
          const message = snapshot.val();
          message.key = snapshot.key;
          this.setState({ messages: this.state.messages.concat( message ) });
        });
    }

  createMessages(newMessage) {
    this.messagesRef.push({
      username: this.props.user ? this.props.user.displayName : 'Guest',
      content: this.state.newMessage,
      roomId: this.props.activeRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });

    this.setState({newMessage:''});
  }

  handleChange(e){
    this.setState({newMessage: e.target.value});
  }

  convertTime(timestamp) {
    const date = new Date(timestamp*1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return [date, hours, minutes, seconds];
  }

    render() {

        return (
          <div>
            <h3>{this.props.activeRoomName}</h3>
              <div>{this.state.messages
                .filter(message => message.roomId === this.props.activeRoom.key)
                .map((message, index) =>
                  <div key={index}>
                    <p id="username">Sent By: {message.username}</p>
                    <p id="content">Message: {message.content}</p>
                    <p id="timestamp">Sent At: {this.convertTime(message.sentAt)[1] + ':' + this.convertTime(message.sentAt)[2]}</p>
                  </div>
              )}
              </div>
              <section>
                <form onSubmit={(e) => {e.preventDefault(); this.createMessages(this.state.newMessage) } }>
                  <input type="text" value={this.state.newMessage} onChange={(e) => this.handleChange(e)} placeholder="New Message" />
                  <input type="submit" />
                </form>
              </section>
          </div>
        );
      }
    }


export default MessageList;
