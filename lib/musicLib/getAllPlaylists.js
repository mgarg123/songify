function getAllPlaylists() {
    let localLib = JSON.parse(localStorage.getItem('songify_library'))
    let playlists = []

    if (localLib) {
        let uniquePlaylists = Array.from(new Set(Array.from(localLib.map(x => x.type==='playlist' && x.listid))))

        for (let j in uniquePlaylists) {
            for (let i in localLib) {
                if (uniquePlaylists[j] === localLib[i].listid) {
                    let obj = {
                        title: localLib[i].listname,
                        id: localLib[i].listid,
                        albumid: -1,
                        type: "playlist",
                        primary_artists: 'Various',
                        primary_artists_id: -1,
                        image: localLib[i].image
                    }
                    playlists.push(obj)
                    break;
                }

            }
        }

    }
    return playlists
}

export default getAllPlaylists