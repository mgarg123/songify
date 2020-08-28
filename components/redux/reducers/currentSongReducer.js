const CURR_SONG = "CURR_SONG"

export function currentSong(song) {
    return {
        type: CURR_SONG,
        payload: song
    }
}

const initialSongState = {
    song: {}
}

const currentSongReducer = (state = initialSongState, action) => {
    switch (action.type) {
        case CURR_SONG:
            return {
                ...state,
                song: action.payload
            }
        default:
            return state
    }
}

export default currentSongReducer