import { combineReducers } from 'redux'
import playQueueReducer from './reducers/playQueueReducer'
import currentSongReducer from './reducers/currentSongReducer'

const rootReducer = combineReducers({
    playQueue: playQueueReducer,
    currentSong: currentSongReducer
})

export default rootReducer