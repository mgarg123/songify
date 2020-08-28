import Cors from 'cors'
import axios from 'axios'
import initMiddleware from '../../lib/init-middleware'

const cors = initMiddleware(
    Cors({
        methods: ['GET']
    })
)

async function handler(req, res) {
    await cors(req, res)
    axios.get("https://cors-anywhere.herokuapp.com/" + process.env.searchV2_prefix + "" + req.query.q + "" + process.env.searchV2_suffix, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:49.0) Gecko/20100101 Firefox/49.0',
            "Accept": "*/*",
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(resp => {
        let data = resp.data
        res.send(data)
    }).catch(err => console.log(err.message))
}

export default handler