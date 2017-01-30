import React, { Component } from 'react'
import { Auth } from '../views'
import actions from '../../actions'
import { connect } from 'react-redux'

class Account extends Component {

  componentDidMount(){

    if(this.props.user != null)
    return

    this.props.currentUser()
      .then(response => {

      })
      .catch(err => {
        console.log('ERROR: ' + err.message)
      })
  }


  login(credentials){
    console.log('Login: ' + JSON.stringify(credentials))
    this.props.login(credentials)
    .then(response => {

    })
    .catch(err => {
      alert(err.message)
    })

  }

  register(credentials){
    console.log('register: ' + JSON.stringify(credentials))
    this.props.register(credentials)

  }

  logout(){
    this.props.logout()
  }


  render(){
    return(
      <div>
        <h2>Account</h2>
          {(this.props.user == null) ? <Auth onLogin={this.login.bind(this)} onRegister={this.register.bind(this)}/> :
          <div>
            <h2>Welcome {this.props.user.username}</h2><br/>
            <button onClick={this.logout.bind(this)} className="btn btn-warning">Log Out</button>
          </div>

          }
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.account.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    register: (credentials) => dispatch(actions.register(credentials)),
    login: (credentials) => dispatch(actions.login(credentials)),
    currentUser: () => dispatch(actions.currentUser()),
    logout: () => dispatch(actions.logout())
  }
}


export default connect(stateToProps, dispatchToProps)(Account)
