import axios from 'axios'

async function fetchSearchResult(song, singer) {
    return axios.get('/api/search?q=' + song + "+" + singer)
        .then(resp => {
            let data = resp.data.result.data["Best Match"]
            return data
        }).catch(err => console.log(err.message))
}

export default fetchSearchResult