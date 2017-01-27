import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Task extends Component {

  componentDidMount(){

  }


  render(){
    const taskId = this.props.params.id
    const task = this.props.tasks[taskId]
    return(
      <div>
        <h2>Single Task:</h2><br/>
        <h3>Title: </h3>{task.title} <br/>
        <h3>Category: </h3>{task.category} <br/>
        <h3>Description: </h3>{task.description}
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
      tasks: state.task
  }
}

const dispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(stateToProps, dispatchToProps)(Task)
