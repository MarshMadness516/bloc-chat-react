import React, { Component } from 'react';

class User extends Component {

  render(){
    return(
      <div>
        <div>
          <p>User: {this.props.user.displayName}</p>
        </div>
        <div>
          { ( this.props.isSignedIn )
            ?
            <button onClick={ () => this.props.signOut() }>Sign Out</button>
            :
            <button onClick={ () => this.props.signIn() }>Sign In</button>
          }
        </div>
      </div>
    )
  }
}

export default User;
