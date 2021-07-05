function getAllAlbums() {
    let localLib = JSON.parse(localStorage.getItem('songify_library'))
    let albums = []

    if (localLib) {
        let uniqueAlbums = Array.from(new Set(Array.from(localLib.map(x => x.albumid!==-1 && x.albumid))))

        for (let j in uniqueAlbums) {
            for (let i in localLib) {
                if (uniqueAlbums[j] === localLib[i].albumid) {
                    let obj = {
                        title: localLib[i].type !== undefined ? localLib[i].album : localLib[i].title,
                        id: localLib[i].albumid,
                        albumid: localLib[i].albumid,
                        type: "album",
                        primary_artists: localLib[i].primary_artists,
                        primary_artists_id: localLib[i].primary_artists_id,
                        image: localLib[i].image
                    }
                    albums.push(obj)
                    break;
                }

            }
        }

    }
    return albums
}

export default getAllAlbums