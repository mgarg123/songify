import axios from 'axios'

async function getSongDetailsV2(songId) {
    return axios.get("/api/songDetailsV2?id=" + songId)
        .then(resp => {
            let data = resp.data[songId]
            return data
        }).catch(err => console.log(err.message))
}

export default getSongDetailsV2