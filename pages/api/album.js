import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

const cors = initMiddleware(
    Cors({
        methods: ['GET']
    })
)

async function handler(req, res) {
    await cors(req, res)
    const resp = await fetch(process.env.album_list + "" + req.query.id)
    const data = await resp.json()
    res.send(data)
}

export default handler