function addAllAlbumSongsToLib(albumid, albumData) {

    let localLib = JSON.parse(localStorage.getItem('songify_library'))

    if (localLib) {
        let songsPresent = localLib.filter(x => x.albumid === albumid && x.id)
            // let albumPresent = localLib.filter(x => x.albumid === albumid && !x.id)

        let newLib = []

        if (songsPresent.length) {
            for (let i = 0; i < albumData.length; i++) {
                for (let j = 0; j < songsPresent.length; j++) {
                    if (!(albumData[i].id === songsPresent[j].id) && newLib.find(x => x.id === albumData[i].id) === undefined) {
                        newLib.push(albumData[i])
                    }
                }
            }
        }
        localLib = [...localLib, ...newLib]
        console.log(newLib)
        console.log(songsPresent)
        console.log(albumData.songs)
        localStorage.setItem('songify_library', JSON.stringify(localLib))
    }
}


export default addAllAlbumSongsToLib