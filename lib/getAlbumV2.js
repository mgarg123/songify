import axios from 'axios'

async function getAlbumV2(songId) {
    return axios.get('/api/albumV2?id=' + songId)
        .then(resp => {
            let data = resp.data
            return data
        }).catch(err => console.log(err.message))
}

export default getAlbumV2