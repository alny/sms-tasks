import React, { Component } from 'react'
import { APIManager } from '../../utils'

class CreateTask extends Component {
  constructor(){
    super()
    this.state = {
      task: {
        title: '',
        description: '',
        category: ''

      }
    }
  }

  updateTask(event){
    event.preventDefault()
    // console.log(event.target.id + '==' + event.target.value)
    let updated = Object.assign({}, this.state.task)
    updated[event.target.id] = event.target.value
    this.setState({
      task: updated
    })
  }

  submitTask(event){
    event.preventDefault()
    // console.log(JSON.stringify(this.state.task))
    this.props.onSubmitTask(this.state.task)
  }



  render(){
    return(
      <div>
        CreateTask Component
        <input onChange={this.updateTask.bind(this)} className="form-control" id="title" type="text" placeholder="Title"/><br/>
        <input onChange={this.updateTask.bind(this)} className="form-control" id="description" type="text" placeholder="Description"/><br/>
        <select className="form-control" id="category" onChange={this.updateTask.bind(this)}>
          <option>Select A Category</option>
          <option value="delivery">Delivery</option>
          <option value="dog walking">Dog Walking</option>
          <option value="house cleaning">House Cleaning</option>
        </select><br/>
        <button onClick={this.submitTask.bind(this)} className="btn btn-primary">Submit</button>

      </div>
    )
  }
}

export default CreateTask
