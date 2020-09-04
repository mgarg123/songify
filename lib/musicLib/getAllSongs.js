function getAllSongs() {
    let localLib = JSON.parse(localStorage.getItem('songify_library'))
    let songs = []
    if (localLib) {
        let songList = localLib.filter(x => x.id)
        songs = [...songList]
        let albumsList = localLib.filter(x => x.albumid && !x.id).map(x => x.songs)
        for (let i in albumsList) {
            for (let j in albumsList[i]) {
                if (songs.find(x => x.id === albumsList[i][j].id) === undefined)
                    songs.push(albumsList[i][j])
            }
        }
    }
    return songs
}

export default getAllSongs