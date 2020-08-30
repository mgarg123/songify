import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import unescape from 'lodash.unescape'

const cors = initMiddleware(
    Cors({
        methods: ['GET']
    })
)



async function handler(req, res) {
    await cors(req, res)
    const resp = await fetch(process.env.single_song_detailsV2 + "" + req.query.id)
    const data = await resp.json()
        // data[req.query.id]['media_url1'] = des_decrypt(data[req.query.id]['encrypted_media_url'])
    data[req.query.id]['song'] = unescape(data[req.query.id]['song']).replace('&#039;', "'")
    data[req.query.id]['singers'] = unescape(data[req.query.id]['singers'])
    data[req.query.id]['primary_artists'] = unescape(data[req.query.id]['primary_artists'])
    data[req.query.id]['media_url2'] = data[req.query.id]['media_preview_url'].replace("preview", "h").replace("_96_p.mp4", "_320.mp3")
    res.send(data)
}

export default handler