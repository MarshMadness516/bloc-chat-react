import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.createRoom = this.createRoom.bind(this);

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });
    }

    handleChange(e) {
        this.setState({newRoomName: e.target.value});
    }

    createRoom(e) {
        e.preventDefault();
        if (!this.state.newRoomName) return
        this.roomsRef.push({
            name: this.state.newRoomName
        })
        this.setState({ newRoomName: '' })
    }

    render() {
        return( 
            <div>
                <section>
                    {
                      this.state.rooms.map((room, index) =>
                        <div key={index}>{room.name}</div>
                      )
                    }
                </section>
                <section>
                    <form onSubmit={ (e) => this.createRoom(e) }>
                        <label>
                          Create New Room:
                          <input
                            type="text"
                            placeholder="New Room Name"
                            value={this.state.newRoomName} 
                            onChange={ (e) => this.handleChange(e) } />
                          <input type="submit" value="submit" />
                        </label>
                    </form>
                </section>
            </div>
        );
    }
};

export default RoomList;