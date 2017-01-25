import constants from '../constants'

var initialState = {
    all: null,
    selectedCategory: 'delivery',
    categories: [
      'delivery',
      'dog walking',
      'house cleaning'

    ]


}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)

  switch (action.type){
    case constants.TASKS_RECIEVED:
        console.log('TASKS_RECIEVED: ' + JSON.stringify(action.payload))
        updated['all'] = action.payload

        return updated

    case constants.TASK_CREATED:
        console.log('TASK_CREATED: ' + JSON.stringify(action.payload))
        let currentTasks = (updated['all']) ? Object.assign([], updated['all']) : []
        currentTasks.unshift(action.payload)
        updated['all'] = currentTasks

        return updated


    default:
      return state
  }
}
