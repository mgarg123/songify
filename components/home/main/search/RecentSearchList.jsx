import React, { Component, Fragment } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { MdMoreVert } from 'react-icons/md'
import { IconContext } from "react-icons"
import Menu from '../../menu/Menu'
import getSongDetailsV2 from '../../../../lib/getSongDetailsV2'
import getAlbumV2 from '../../../../lib/getAlbumV2'
import getAllArtists from '../../../../lib/musicLib/getAllArtists'
// import {CurrentPlayingCon} from '../../../context/currentPlayingContext'

export class RecentSearchList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playSongData: {},
            expandMore: false,
            isAlbumClicked: false,
            albumData: {}
        }
    }


    clickHandle = (type) => {
        let history = localStorage.getItem('songify_search_history')

        let checkFirst = JSON.parse(history)
        if (checkFirst.length === 0 || checkFirst.find(x => x.id === this.props.songId) === undefined) {
            let obj = {
                id: this.props.songId,
                image: this.props.imgId,
                title: this.props.searchTitle,
                author: this.props.authorName,
                type: this.props.type
            }
            if (history) {
                let data = JSON.parse(history)
                let res = [obj, ...data]
                localStorage.setItem('songify_search_history', JSON.stringify(res))
            } else {
                let res = []
                res.push(obj)
                localStorage.setItem('songify_search_history', JSON.stringify(res))
            }

        }

        if (this.props.type !== undefined && this.props.type === "song") {

            getSongDetailsV2(this.props.songId).then(data => {
                let mediaURL = data.media_preview_url.replace("preview", "h").replace("_96_p.mp4", "_320.mp3")
                data.media_preview_url = mediaURL

                if (type === "details") {
                    let albumData = {
                        title: data.song,
                        name: data.song,
                        year: data.year,
                        image: data.image,
                        primary_artists: data.primary_artists,
                        play_count: data.play_count,
                        songs: [data]
                    }
                    this.setState({ albumData: albumData, isAlbumClicked: true })
                } else {

                    this.setState({ playSongData: data })
                }
            }).catch(err => console.log(err.message))
        } else if (this.props.type === "album" && this.props.subType === "artist") {
            let songs = getAllArtists()
            let artistData = songs.find(x => x.name === this.props.artistName)
            this.setState({ albumData: artistData, isAlbumClicked: true })
            return;
        } else if (this.props.type === "album") {

            getAlbumV2(this.props.songId).then(data => {
                if (type === "play") {
                    let songToPlay = data.songs[0]
                    let songsQueue = datat.songs.length > 1 && data.songs.map((x, index) => index > 0 && x)
                    songToPlay.media_preview_url = songToPlay.media_preview_url.replace("preview", "h").replace("_96_p.mp4", "_320.mp3")
                    // console.log(songToPlay);
                    if (data.songs.length > 1) {
                        this.props.playSongCallBack(songToPlay, songsQueue)
                    } else {
                        this.props.playSongCallBack(songToPlay)
                    }

                    // this.setState({ playSongData: songToPlay })
                } else {
                    this.setState({ albumData: data, isAlbumClicked: true })
                }
            }).catch(err => console.log(err.message));






        }
    }


    removeFromSuggestion = (event) => {
        let history = JSON.parse(localStorage.getItem('songify_search_history'))
        let id = this.props.songId
        // console.log("Delete: " + id)
        let res = history.filter(x => x.id !== id)
        // console.log(res);
        // localStorage.setItem('songify_search_history', JSON.stringify(res))
        this.props.removeCallBack(res)
    }

    closeMoreOptionCallBack = (expandMore) => {
        this.setState({ expandMore: expandMore })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.playSongData !== prevState.playSongData) {
            this.props.playSongCallBack(this.state.playSongData)

        }

        if (this.state.albumData !== prevState.albumData)
            this.props.albumClickedCallBack(this.state.albumData)
    }

    render() {
        return (
            <Fragment>
                <div
                    className="sugg-list"
                    id={this.props.songId}
                >

                    <div className="sugg-img" onClick={this.clickHandle} >
                        <img src={this.props.imgId}
                            width={"50px"}
                            height={"50px"}
                            alt="Img" />
                    </div>
                    <div className="sugg-details">
                        <span id="sugg-title"
                            onClick={this.clickHandle}
                            style={{ color: `${this.props.playSongData && this.props.playSongData.id === this.props.songId ? 'rgb(11, 226, 226)' : '#fff'}` }}
                            dangerouslySetInnerHTML={{
                                __html: `${this.props.searchTitle.length > 28 ?
                                    this.props.searchTitle.substr(0, 26) + "..." :
                                    this.props.searchTitle}`
                            }}
                        >
                            {/* {"&amp;"} */}
                            {/* {this.props.searchTitle.length > 28 ? this.props.searchTitle.substr(0, 26) + "..." : this.props.searchTitle} */}
                        </span>
                        {
                            this.props.isRemovable &&
                            <IconContext.Provider value={{
                                size: "1.4em",
                                className: "sugg-remove"
                            }}>
                                <RiCloseFill
                                    onClickCapture={this.removeFromSuggestion}
                                />
                            </IconContext.Provider>
                        }
                        {
                            this.props.hasMoreOptions &&
                            <IconContext.Provider value={{
                                size: "1.5em",
                                className: "sugg-remove"
                            }}>
                                <MdMoreVert onClickCapture={() => this.setState({ expandMore: true })} />

                            </IconContext.Provider>
                        }
                        <div id="sugg-author"
                            dangerouslySetInnerHTML={{
                                __html: `${this.props.authorName.length > 42 ?
                                    this.props.authorName.substr(0, 42) + "..." :
                                    this.props.authorName}`
                            }}
                        ></div>
                    </div>

                </div>
                {
                    this.state.expandMore &&
                    <Menu
                        id={this.props.songId}
                        type={this.props.type}
                        artist={this.props.authorName}
                        title={this.props.searchTitle}
                        image={this.props.imgId}
                        optionsArray={['Play Now', 'Details']}
                        clickHandleCallBack={this.clickHandle}
                        closeMoreOptionCallBack={this.closeMoreOptionCallBack}
                    />
                }
            </Fragment>
        )
    }
}



export default RecentSearchList
