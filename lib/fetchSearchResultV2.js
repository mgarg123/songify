import axios from 'axios'

async function fetchSearchResultV2(searchValue) {
    return axios.get("https://cors-anywhere.herokuapp.com/" + process.env.searchV2_prefix + "" + searchValue + "" + process.env.searchV2_suffix)
        .then(resp => {
            let data = resp.data
            return data
        }).catch(err => console.log(err.message))
}

export default fetchSearchResultV2