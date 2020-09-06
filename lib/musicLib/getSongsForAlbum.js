function getSongsForAlbum(albumId) {
    let localLib = JSON.parse(localStorage.getItem('songify_library'))
    let albumData = {}

    if (localLib) {
        let albumPresent = localLib.filter(x => x.albumid === albumId && !x.id)
        if (albumPresent.length > 0) {
            albumData = albumPresent[0]
        } else {
            let data = localLib.filter(x => x.albumid === albumId && x.id)
            let obj = {
                title: data[0].album,
                name: data[0].song,
                year: data[0].year,
                release_date: data[0].release_date,
                primary_artists: data[0].primary_artists,
                primary_artists_id: data[0].primary_artists_id,
                albumid: data[0].albumid,
                image: data[0].image,
                songs: data
            }
            albumData = obj
        }

    }
    return albumData
}

export default getSongsForAlbum