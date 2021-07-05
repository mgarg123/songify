import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

const cors = initMiddleware(
    Cors({
        methods: ['GET']
    })
)

async function handler(req, res) {
    await cors(req, res)
    const id = req.query.id
    
    const resp = await fetch(process.env.playlist_details_base_url + "" + req.query.id)
    const data = await resp.json()



    res.send(data)
}

export default handler