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
    let updated = Object.assign({}, task)

    const user = this.props.account.user
    updated['profile'] = {
        id: user.id,
        username: user.username
    }

    this.props.createTask(updated)

  }

  render(){
    return(

      <div className="content">
        <article>


          {(this.props.tasks[this.props.tasks.selectedCategory] == null) ? null :
          this.props.tasks[this.props.tasks.selectedCategory].map((task, i) => {
            return (

              <ul style={{border: '1px solid #ddd'}} className="actions" key={task.id}>
                <h3><Link to={'/task/' + task.id} href="#">{task.title}</Link></h3>
                <p><Link to={'/task/' + task.id} href="#">{task.description}</Link></p>
                  <p><Link to={'/task/' + task.id} href="#">{task.profile.username}</Link></p>



                </ul>

                  )
          })
          }
      </article>
        <CreateTask onSubmitTask={this.createTask.bind(this)}/>
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
    tasksRecieved: (tasks) => dispatch(actions.tasksRecieved(tasks)),
    createTask: (task) => dispatch(actions.createTask(task)),
    fetchTasks: (task) => dispatch(actions.fetchTasks(task)),
    selectCategory: (category) => dispatch(actions.selectCategory(category))



  }
}

export default connect(stateToProps, dispatchToProps)(Tasks)
