import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

const cors = initMiddleware(
    Cors({
        methods: ['GET']
    })
)

async function handler(req, res) {
    await cors(req, res)
    const id: String = req.query.id
    const count: Number = req.query.count ? parseInt(req.query.count) : -1
    const resp: any = await fetch(process.env.playlists + "" + req.query.id)
    const data: any = await resp.json()

    const listOfSongs = data.result.data.list
    const newListOfSongs = {
        header: data.result.data.header,
        count: count,
        list: []
    }
    if (count === -1) {
        data.result.data.count = listOfSongs.length
        res.send(data)
    } else {
        let cnt = 0;
        for (let i in listOfSongs) {
            if (cnt == count)
                break;

            newListOfSongs.list.push(listOfSongs[i])
            cnt++;
        }
        res.send(newListOfSongs)
    }


    res.send(data)
}

export default handler