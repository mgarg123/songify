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
    axios.get(process.env.searchV2_prefix + "" + req.query.q + "" + process.env.searchV2_suffix).then(resp => {
        let data = resp.data
        res.send(data)
    }).catch(err => console.log(err.message))
}

export default handler