import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { CreateTask } from '../views'
import actions from '../../actions'
import { connect } from 'react-redux'


class Tasks extends Component {
  constructor(){
    super()
    this.state = {

    }
  }

  componentDidMount(){
    this.props.fetchTasks(null)
    .then(results => {
      // console.log(JSON.stringify(results))
    })
    .catch(err => {
      alert('Oh Boy')
    })
  }

  createTask(task){
    this.props.createTask(task)

  }

  render(){
    return(
      <div>
        <h2>Tasks List:</h2>
        <ol>
          {(this.props.tasks.all == null) ? null :
          this.props.tasks.all.map((task, i) => {
            return <li key={task.id}>Title: {task.title} - Category: {task.category}</li>
          })
          }
      </ol>
        <CreateTask onSubmitTask={this.createTask.bind(this)}/>
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
    tasksRecieved: (tasks) => dispatch(actions.tasksRecieved(tasks)),
    createTask: (task) => dispatch(actions.createTask(task)),
    fetchTasks: (task) => dispatch(actions.fetchTasks(task))


  }
}

export default connect(stateToProps, dispatchToProps)(Tasks)
