import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'


class Profile extends Component {

  componentDidMount(){
    const id = this.props.params.id
    if(this.props.profiles[id] != null)
    return
    this.props.fetchProfile(id)

  }

  render(){
        const profile = this.props.profiles[this.props.params.id]

        return(profile == null) ? <div>Not Found</div> : (
        <div>
          <h2>This is the Profile Component</h2><br/>
          <span>Username: {profile.username}</span><br/>
          <span>Email: {profile.email}</span><br/>
        </div>
      )
  }
}


const stateToProps = (state) => {
  return {
    profiles: state.profile
  }
}

const dispatchToProps = (dispatch) => {
  return {
    fetchProfile: (id) => dispatch(actions.fetchProfile(id))
  }
}

export default connect(stateToProps, dispatchToProps)(Profile)
