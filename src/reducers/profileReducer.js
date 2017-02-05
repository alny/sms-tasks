import constants from '../constants'

var initialState =  {

}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)

  switch (action.type) {

    case constants.PROFILES_RECEIVED:
      console.log('PROFILES_RECEIVED: ' + JSON.stringify(action.payload))

      let profile = action.payload
      updated[profile.id] = profile
      return updated


    default:
      return state

  }
}
