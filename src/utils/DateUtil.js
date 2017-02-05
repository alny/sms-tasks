import React from 'react'
import Time from 'react-time' //https://github.com/andreypopp/react-time

export default {

  formattedDate: (date) => {

    let now = new Date()
    const diff = now - new Date(date)
    console.log('diff: ' + diff)

    const sec = diff / 1000
    const mins = sec / 60
    const hours = mins / 60
    console.log('HOURS: ' + hours)

    if(hours > 24) {
      return <Time value={date} format="DD MMM HH:mm" />
    }
    return <Time value={date} format="HH:mm DD/MMM" relative />

  }





}
