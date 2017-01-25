import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { CreateTask } from '../views'
import actions from '../../actions'
import { connect } from 'react-redux'

class Categories extends Component {
  render(){
    return(
      <div>
        <h2>Categories</h2>
        <ul>
          {this.props.tasks.categories.map((category, i) => {
            const color = (category == this.props.tasks.selectedCategory) ? 'red' : '#333'
            return <li key={category}>
                  <a href="" style={{color: color}}>{category}</a>
                  </li>
          })
        }
        </ul>
      </div>

    )
  }
}

const stateToProps = (state) => {
  return {
      tasks: state.task
  }
}

export default connect(stateToProps)(Categories)
