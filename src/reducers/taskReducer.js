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
        //console.log('TASKS_RECIEVED: ' + JSON.stringify(action.payload))

        const keys = Object.keys(action.params)
        keys.forEach((key, i) => {
          const value = action.params[key]
          updated[value] = action.payload
        })

        console.log('TASKS_RECIEVED: ' + JSON.stringify(updated))



        return updated

    case constants.TASK_CREATED:
        console.log('TASK_CREATED: ' + JSON.stringify(action.payload))
        let currentTasks = (updated[action.payload.category]) ? Object.assign([], updated[action.payload.category]) : []
        currentTasks.unshift(action.payload)
        updated[action.payload.category] = currentTasks

        return updated

    case constants.CATEGORY_SELECTED:
        console.log('CATEGORY_SELECTED ' + JSON.stringify(action.payload))
        updated['selectedCategory'] = action.payload

        return updated


    default:
      return state
  }
}
