import constants from '../constants'

var initialState =  {

}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)

  switch (action.type) {

    case constants.MESSAGE_RECIEVED:


      let taskId = action.params.task
      updated[taskId] = action.payload
      console.log('MESSAGE_RECIEVED: ' + JSON.stringify(updated))
      
      return updated


    default:
      return state

  }
}
