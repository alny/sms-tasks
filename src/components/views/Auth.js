import React, { Component } from 'react'


class Auth extends Component {
  constructor(){
    super()
    this.state = {
      credentials: {
        username: '',
        phone: '',
        email: '',
        password: ''
      }
    }
  }

  updateLogin(event){
    console.log('updateLogin: ' + event.target.id + ' == ' + event.target.value)
    event.preventDefault()
    let updated = Object.assign({}, this.state.credentials)
    updated[event.target.id] = event.target.value
    this.setState({
      credentials: updated
    })
  }

  createSignUp(event){
    if(this.state.credentials.username.length == 0){
      toastr.warning('Enter a Username to Login Please!')
      return
    }
    event.preventDefault()
    toastr.success('Your account are now created and active')
    this.props.onRegister(this.state.credentials)

  }

  createLogin(event){
    if(this.state.credentials.email.length == 0){
      toastr.warning('Enter a Username to Login Please!')
      return
    }
    if(this.state.credentials.password.length == 0){
      toastr.warning('Enter a Password to Login Please!')
      return
    }
    event.preventDefault()
    this.props.onLogin(this.state.credentials)

  }


  render(){
    return(
      <div>
        <h3>Sign Up</h3>
        <input onChange={this.updateLogin.bind(this)} id="username" className="form-control" type="text" placeholder="Username"/><br/>
        <input onChange={this.updateLogin.bind(this)} id="phone" className="form-control" type="text" placeholder="Phone"/><br/>
        <input onChange={this.updateLogin.bind(this)} id="email" className="form-control" type="text" placeholder="Email"/><br/>
        <input onChange={this.updateLogin.bind(this)} id="password" className="form-control" type="text" placeholder="Password"/><br/>
        <button onClick={this.createSignUp.bind(this)} className="btn btn-success">Join</button>

        <h3>Login</h3>
        <input id="email" onChange={this.updateLogin.bind(this)} className="form-control" type="text" placeholder="Email"/><br/>
        <input id="password" onChange={this.updateLogin.bind(this)} className="form-control" type="text" placeholder="Password"/><br/>
        <button onClick={this.createLogin.bind(this)} className="btn btn-info">Log In</button>


      </div>
    )
  }
}


export default Auth
