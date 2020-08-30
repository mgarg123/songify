import Cors from 'cors'
import axios from 'axios'
import unescape from 'lodash.unescape'
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
        resss.title = unescape(resss.title)
        resss.primary_artists = unescape(resss.primary_artists)
        for (let i in resss.songs) {
            resss.songs[i].song = unescape(resss.songs[i].song).replace('&#039;', "'")
            resss.songs[i].singers = unescape(resss.songs[i].singers)
            resss.songs[i].primary_artists = unescape(resss.songs[i].primary_artists)
        }
        res.send(resss)


    }).catch(err => console.log(err.message))

}

export default handler