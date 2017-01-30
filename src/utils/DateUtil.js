import React from 'react'
import Time from 'react-time'

export default {

  formattedDate: (date) => {

    return <Time value={date} format="HH:mm DD/MMM" relative />

  }





}
