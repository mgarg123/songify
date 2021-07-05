function getSongsForPlaylist(listid) {
    let localLib = JSON.parse(localStorage.getItem('songify_library'))
    let albumData = {}


    
    if (localLib) {
        let playlistPresent = localLib.filter(x => x.listid === listid)
        if (playlistPresent.length > 0) {
            albumData = playlistPresent[0]
        } else {
            let data = localLib.filter(x => x.listid === listid)
            let obj = {
                title: data[0].listname,
                name: data[0].listname,
                albumid:-1,
                year: 'Mix',
                release_date: 'NA',
                primary_artists: 'Various',
                primary_artists_id: 'NA',
                listid: data[0].listid,
                image: data[0].image,
                songs: data[0].songs
            }
            albumData = obj
        }

    }
    return albumData
}

export default getSongsForPlaylist