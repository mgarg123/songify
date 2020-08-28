const withCSS = require('@zeit/next-css')
const withImg = require('next-images')
module.exports = withCSS(withImg({
    env: {
        img: "http://jioimages.cdn.jio.com/hdindiamusic/images/", //Pass the Image ID
        single_song_details: "http://beatsapi.media.jio.com/v2_1/beats-api/jio/src/response/songdetails/", //Pass Song ID
        play_song_prefix: "http://jiobeats.cdn.jio.com/mod/_definst_/mp4:hdindiamusic/audiofiles/", //ex:- 717/716180/717_716180_1_{bitrate}.mp4/play_song_suffix  
        play_song_suffix: "/playlist.m3u8",
        search_autocomplete: "http://beatsapi.media.jio.com/v2_1/beats-api/jio/src/response/autocomplete/", //Pass search input value
        search_all: "http://beatsapi.media.jio.com/v2_1/beats-api/jio/src/response/search2/", //Put '/' at end else it won't work.
        album_list: "http://beatsapi.media.jio.com/v2_1/beats-api/jio/src/response/albumsongs/albumid/", //Pass album ID eg. 1041579,
        playlists: "http://beatsapi.media.jio.com/v2_1/beats-api/jio/src/response/listsongs/playlistsongs/", //Pass Playlist ID eg. 4308,
        searchV2_prefix: "https://www.saavn.com/api.php?__call=autocomplete.get&_marker=0&query=",
        searchV2_suffix: "&ctx=android&_format=json&_marker=0",
        single_song_detailsV2: "https://www.jiosaavn.com/api.php?cc=in&_marker=0%3F_marker%3D0&_format=json&model=Redmi_5A&__call=song.getDetails&pids=", //Apppend Song Id eg. P4H0mL2F
        getAlbumV2: "https://www.jiosaavn.com/api.php?_format=json&__call=content.getAlbumDetails&albumid=", //Append ALbum ID eg. 18291629

    }
}))