import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextUtil, DateUtil } from '../../utils'
import actions from '../../actions'

class Task extends Component {
  constructor(){
    super()
    this.state = {
      message: {
        text: ''
      }
    }
  }

  componentDidMount(){

  }

  updateMessage(event){
    let updated = Object.assign({}, this.state.message)
    updated['text'] = event.target.value
    this.setState({
      message: updated
    })

  }

  submitMessage(event){
    event.preventDefault()
    let updated = Object.assign({}, this.state.message)

    const user = this.props.account.user
    updated['profile'] = {
        id: user.id,
        username: user.username
    }
    console.log('submitMessage: ' + JSON.stringify(updated))
    this.props.createMessage(updated)
    .then(response => {
      //console.log('MESSAGE CREATED: ' + JSON.stringify(response))
      alert('Thanks for Replying')

    })
    .catch(err => {
      console.log('ERROR: ' + JSON.stringify(err))
    })
  }


  render(){
    let now = new Date()
    const taskId = this.props.params.id
    const task = this.props.tasks[taskId]
    return(
      <div>
        <h2>Single Task:</h2><br/>
        <h3>Title: </h3>{task.title} <br/>
        <h3>Category: </h3>{ TextUtil.capitalize(task.category) } <br/>
        <h3>Description: </h3>{TextUtil.capitalize(task.description)}<br/>
        <h3>Time: </h3>{DateUtil.formattedDate(task.timestamp)}<br/>

          {(this.props.account.user == null) ? <h3>Please login to post a Reply</h3> : <div>
            <textarea onChange={this.updateMessage.bind(this)} className="form-control" placeholder="Write your respond here!"></textarea><br/>
            <button onClick={this.submitMessage.bind(this)} className="btn btn-primary">Submit Comment</button>
          </div>
          }
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
      tasks: state.task,
      account: state.account
  }
}

const dispatchToProps = (dispatch) => {
  return {
    createMessage: (params) => dispatch(actions.createMessage(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Task)
