import React from 'react'

const CurrentPlayingContext = React.createContext({})

const CurrentPlayingProvider = CurrentPlayingContext.Provider
const CurrentPlayingConsumer = CurrentPlayingContext.Consumer

export { CurrentPlayingProvider, CurrentPlayingConsumer }
export default CurrentPlayingContext