import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { CreateTask } from '../views'
import actions from '../../actions'
import { connect } from 'react-redux'
import  { Link } from 'react-router'


class Tasks extends Component {
  constructor(){
    super()
    //this.getTasks = this.getTasks.bind(this)
  }

  getTasks(){
    if(this.props.tasks[this.props.tasks.selectedCategory] != null)
      return

    this.props.fetchTasks({category: this.props.tasks.selectedCategory})
    .then(results => {
      // console.log(JSON.stringify(results))
    })
    .catch(err => {
      alert('Oh Boy')
    })
  }

  componentDidMount(){
    this.getTasks()
  }

  componentDidUpdate(){
    this.getTasks()

  }

  createTask(task){
    this.props.createTask(task)

  }

  render(){
    return(
      <div>
        <h2>Tasks List:</h2>
        <ol>
          {(this.props.tasks[this.props.tasks.selectedCategory] == null) ? null :
          this.props.tasks[this.props.tasks.selectedCategory].map((task, i) => {
            return (
              <li key={task.id}><Link to={'/task/' + task.id} href="#">Title: {task.title} - Category: {task.category}</Link></li>

                  )
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
    fetchTasks: (task) => dispatch(actions.fetchTasks(task)),
    selectCategory: (category) => dispatch(actions.selectCategory(category))



  }
}

export default connect(stateToProps, dispatchToProps)(Tasks)
