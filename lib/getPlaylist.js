import axios from 'axios'

async function getPlaylist(songId) {
    return axios.get('/api/playlist?id=' + songId)
        .then(resp => {
            let data = resp.data
            return data
        }).catch(err => console.log(err.message))
}

export default getPlaylist