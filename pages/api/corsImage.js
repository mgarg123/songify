import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import axios from 'axios'

const cors = initMiddleware(
    Cors({
        methods: ['GET']
    })
)



async function handler(req, res) {
    await cors(req, res)
    const data = await fetch(req.query.url)
    const body = data.body
    res.send(body)

}

export default handler