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
    const bitrate = req.query.bitrate ? req.query.bitrate : "320"
    const idPart1 = id.split("_")[0]
    const idPart2 = id.split("_")[1]
    const resp = await fetch(process.env.play_song_prefix + "" + idPart1 + "/" + idPart2 + "/" + id + "_" + bitrate + "" + process.env.play_song_suffix)
    console.log(process.env.play_song_prefix + "" + idPart1 + "/" + idPart2 + "/" + id + "_" + bitrate + "" + process.env.play_song_suffix)
    const data = resp.body
    res.send(data)
}

export default handler