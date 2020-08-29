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
    axios.get(process.env.getAlbumV2 + "" + req.query.id).then(resp => {
        let datas = resp.data
        let obj = new Object(datas)
        let newData = obj.substr(obj.indexOf('{'), obj.length - 1)
        let resss = JSON.parse(newData)
        resss.title = resss.title.replace('&quot;', "'").replace('&amp;', '&')
        resss.primary_artists = resss.primary_artists.replace('&quot;', "'").replace('&amp;', '&')
        for (let i in resss.songs) {
            resss.songs[i].song = resss.songs[i].song.replace('&quot;', "'").replace('&amp;', '&')
            resss.songs[i].singers = resss.songs[i].singers.replace('&quot;', "'").replace('&amp;', '&')
            resss.songs[i].primary_artists = resss.songs[i].primary_artists.replace('&quot;', "'").replace('&amp;', '&')
        }
        res.send(resss)


    }).catch(err => console.log(err.message))

}

export default handler