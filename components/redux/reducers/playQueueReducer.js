const QUEUE_SONG = "QUEUE_SONG"


export function enqueSong(songs) {
    return {
        type: QUEUE_SONG,
        payload: newSong
    }
}


const initialQueueState = {
    songs: []
}

const playQueueReducer = (state = initialQueueState, action) => {
    switch (action.type) {
        case QUEUE_SONG:
            return {
                ...state,
                songs: [...state.songs, action.payload]
            }
        default:
            return state
    }
}

export default playQueueReducer