export default {

  capitalize: (string) => {
    if(string.length == 0 ) {
      return string
    }
    if(string.length == 1) {
      return string.toUpperCase()
    }

    const firstLetter = string.substr(0, 1)
    return firstLetter.toUpperCase()+string.substr(1, string.length)
  }

}
