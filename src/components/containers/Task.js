import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextUtil, DateUtil } from '../../utils'
import actions from '../../actions'
import { Link } from 'react-router'

class Task extends Component {
  constructor(){
    super()
    this.state = {
      loop: false,
      message: {
        text: ''
      }
    }
  }

  componentDidMount(){
    console.log('componentDidMount: ' + this.props.params.id)
    if(this.props.messages[this.props.params.id])
      return

    //this.props.fetchMessages({task: this.props.params.id})
    this.fetchMessages()
  }

  fetchMessages(){
    this.props.fetchMessages({task: this.props.params.id})
    .then(response => {
    if(this.props.router.location.pathname != '/task/'+this.props.params.id)
      return
      setTimeout(() => {
        this.fetchMessages()
      }, 3000)
    })
    .catch(err => {
      console.log('ERROR: ' + err)
    })
  }

  componentDidUpdate(){
    console.log('componentDidUpdate: ' + JSON.stringify(this.props.router))
  }

  componentWillUnmount(){
    console.log('componentDidUnmount: ' + JSON.stringify(this.props.router))

  }

  // fetchMessagesInSeconds(seconds){
  //   setTimeout(() => {
  //     this.props.fetchMessages({task: this.props.params.id})
  //     this.setState({
  //       loop: false
  //     })
  //   }, 1000*seconds) //5 sec
  // }



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
    updated['task'] = this.props.params.id
    console.log('submitMessage: ' + JSON.stringify(updated))
    this.props.createMessage(updated)
    .then(response => {
      //console.log('MESSAGE CREATED: ' + JSON.stringify(response))
      toastr.success('Thanks for Replying')

    })
    .catch(err => {
      console.log('ERROR: ' + JSON.stringify(err))
    })
  }


  render(){
    let now = new Date()
    const taskId = this.props.params.id
    const task = this.props.tasks[taskId]

    const messages = this.props.messages[taskId]
    return(
      <div>
        <h2>Single Task:</h2><br/>
        <h3>Title: </h3>{task.title} <br/>
        <h3>Category: </h3>{ TextUtil.capitalize(task.category) } <br/>
        <h3>Description: </h3>{TextUtil.capitalize(task.description)}<br/>
        <h3>Time: </h3>{DateUtil.formattedDate(task.timestamp)}<br/>
        <hr/>
        <h3>Relies:</h3><br/>
        <ol>
          {(messages == null) ? <p>No Replies</p> :
            messages.map((message, i) => {
              return <li key={message.id}>{message.text} by <Link to={'/profile/' + message.profile.id}>{message.profile.username}</Link></li>
            })
          }


        </ol>

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
      account: state.account,
      messages: state.message
  }
}

const dispatchToProps = (dispatch) => {
  return {
    createMessage: (params) => dispatch(actions.createMessage(params)),
    fetchMessages: (params) => dispatch(actions.fetchMessages(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Task)
