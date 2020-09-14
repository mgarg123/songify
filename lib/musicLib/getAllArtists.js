import getAllSongs from './getAllSongs'

function getAllArtists() {
    let localLib = JSON.parse(localStorage.getItem('songify_library'))


    let artistData = []

    if (localLib) {
        let songs = getAllSongs()
        let artistList = []

        for (let i in songs) {
            let singers = songs[i].singers.trim().split(",")
            for (let j in singers) {
                if (artistList.find(x => x === singers[j].trim()) === undefined && singers[j].trim() !== "")
                    artistList.push(singers[j].trim())
            }
        }

        for (let i in artistList) {
            let songsToAdd = []
            for (let j in songs) {
                if (songs[j].singers.trim().includes(artistList[i])) {
                    songsToAdd.push(songs[j])
                }
            }
            let obj = {
                title: artistList[i],
                albumid: songsToAdd[0].albumid,
                name: artistList[i],
                type: "album",
                subType: "artist",
                image: songsToAdd[0].image,
                primary_artists: songsToAdd.length > 1 ? songsToAdd.length + " songs" : songsToAdd.length + " song",
                songs: songsToAdd
            }
            artistData.push(obj)
        }

        // console.log(artistList)
        // console.log(artistData)
        return artistData
    }

}

export default getAllArtists