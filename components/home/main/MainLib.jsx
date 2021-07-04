import React, { Component } from 'react'
import '../../../statics/css/library.css'
import LibDetails from './library/LibDetails'
import LibOptions from './library/LibOptions'
import { FiArrowLeft } from 'react-icons/fi'
import { IconContext } from 'react-icons'
import { MdShuffle } from 'react-icons/md'
import getAllSongs from '../../../lib/musicLib/getAllSongs'
import getAllArtists from '../../../lib/musicLib/getAllArtists'
import getAllAlbums from '../../../lib/musicLib/getAllAlbums'
import DetailsPage from '../DetailsPage'
import { shuffle,sortBy } from 'lodash'

export class MainLib extends Component {
    constructor(props) {
        super(props)

        this.state = {
            whichOption: "",
            showDetailsPage: false,
            lists: [],
            playSongData: {},
            albumData: {},
            originalAlbumData: {},
            isAlbumClicked: false,
            songsQueue: [],
            count: {
                song: 0,
                album: 0,
                artist: 0,
                playlist: 0
            }
        }
    }

    componentDidMount() {
        let songs = getAllSongs()
        let albums = getAllAlbums()
        let artists = getAllArtists()
        // let playlists = getAllPlaylists()
        let count = {
            song: songs !== undefined && songs.length,
            album: albums !== undefined && albums.length,
            artist: artists !== undefined && artists.length,
            playlist: 0
        }


        this.setState({
            lists: songs,
            count: count
        })
    }

    shuffleFromLibrary = () => {
        let songs = getAllSongs()
        let shuffledSongs = shuffle(songs)
        this.setState({
            songsQueue:shuffledSongs
        })
    }

    //sort event
    sortItems = (event) => {
        let currentList = this.state.lists
        let sortedList = sortBy(currentList,(obj) => 
        {
            if(obj.title!==undefined)
                return obj.title 
            else
                return obj.song
        }
        )
        this.setState({lists:sortedList})
    }


    playSongCallBack = (data) => {
        this.setState({ playSongData: data })
    }

    albumClickedCallBack = (albumData, originalAlbumData) => {
        // if (this.state.whichOption === "Artists") {
        //     let artists = getAllArtists()
        //     let artistData = artists.find(x => x.name === albumData.name)
        //     albumData = artistData
        //     originalAlbumData = artistData
        // }
        this.setState({
            albumData: albumData,
            isAlbumClicked: true,
            originalAlbumData: originalAlbumData
        })
    }

    whichOptionCallBack = (option) => {
        if (option === 'Albums') {
            let albums = getAllAlbums()
            this.setState({ lists: albums })
        } else if (option === 'Songs') {
            let songs = getAllSongs()
            this.setState({ lists: songs })
        } else if (option === "Artists") {
            let artists = getAllArtists()
            this.setState({ lists: artists !== undefined ? artists : [] })
        } else {
            // let playlists = getAllPlaylists()
            this.setState({ lists: [] })
        }
        this.setState({
            whichOption: option,
            showDetailsPage: true
        })
    }

    closeAlbumCallBack = (isAlbumClicked) => {
        this.setState({ isAlbumClicked: isAlbumClicked })
    }

    songQueueCallBack = (queue) => {
        this.setState({ songsQueue: queue })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.playSongData !== prevState.playSongData) {
            this.props.playSongCallBack(this.state.playSongData)
        }

        if (this.state.albumData !== prevState.albumData)
            this.setState({ isAlbumClicked: true, showDetailsPage: false })

        if (this.state.songsQueue !== prevState.songsQueue)
            this.props.songQueueCallBack(this.state.songsQueue)

    }

    render() {
        return (
            <div className="library-root"
                style={{
                    height: `${this.state.isAlbumClicked ? 'auto' : !this.state.showDetailsPage ? '100vh' :
                        this.state.lists.length < 7 ? '100vh' : 'auto'}`
                }}>
                <div className="lib-cont">
                    {
                        !this.state.isAlbumClicked &&
                        <div className="title">
                            {

                                <IconContext.Provider value={{
                                    size: '2.5em',
                                    style: {
                                        border: '0.5px solid grey',
                                        borderRadius: '20px',
                                        padding: '5px',
                                        display: `${this.state.showDetailsPage ? 'block' : 'none'}`
                                    },
                                    className: 'go-back-icon'
                                }}>
                                    <FiArrowLeft onClick={() => this.setState({ showDetailsPage: false })} />
                                </IconContext.Provider>
                            }
                            <h1 style={{
                                paddingLeft: '10px',
                                width: '70%'
                            }}>
                                {!this.state.showDetailsPage ? 'My Library' : this.state.whichOption}
                            </h1>
                            <span style={{
                                width: '20%',
                                color: 'rgb(11,226,226)',
                                textAlign: 'center',
                                cursor: 'pointer',
                                display: `${this.state.showDetailsPage ? 'inline-block' : 'none'}`
                            }}
                            onClick={this.sortItems}
                            >Sort</span>
                        </div>
                    }
                    {
                        !this.state.showDetailsPage && !this.state.isAlbumClicked &&
                        <LibOptions count={this.state.count} whichOptionCallBack={this.whichOptionCallBack} />
                    }

                    {
                        !this.state.showDetailsPage && 
                        <div className="shuffleAll-lib">
                        <button onClick={this.shuffleFromLibrary}>
                            <IconContext.Provider value={{
                                size: '1.5em',
                                color: "#fff",
                                style: {
                                    float: "left",
                                    textAlign:"left"
                                }
                            }}>
                                <MdShuffle />
                            </IconContext.Provider>
                            <span style={{ float: "right" }}>Shuffle All</span></button>

                    </div>
                    }
                   

                    {
                        this.state.showDetailsPage ?
                            this.state.whichOption === "Songs" ?
                                <LibDetails
                                    type={"Song"}
                                    lists={this.state.lists}
                                    playSongCallBack={this.playSongCallBack}
                                    playSongData={this.props.playSongData}
                                /> :
                                this.state.whichOption === "Albums" ?
                                    <LibDetails
                                        lists={this.state.lists}
                                        type={"Album"}
                                        albumClickedCallBack={this.albumClickedCallBack}
                                    /> :
                                    this.state.whichOption === "Artists" ?
                                        <LibDetails type={"Artist"}
                                            lists={this.state.lists}
                                            type={"Album"}
                                            subType={"Artist"}
                                            albumClickedCallBack={this.albumClickedCallBack}
                                        /> :
                                        <LibDetails type={"Playlist"}
                                            lists={this.state.lists}
                                            type={"Album"}
                                            subType={"Playlists"}
                                            albumClickedCallBack={this.albumClickedCallBack}
                                        /> :
                            <></>


                    }

                    {

                        this.state.isAlbumClicked &&
                        <DetailsPage
                            albumClickedCallBack={this.closeAlbumCallBack}
                            songQueueCallBack={this.songQueueCallBack}
                            playSongCallBack={this.playSongCallBack}
                            songsQueueMain={this.state.songsQueue}
                            albumData={this.state.albumData}
                            originalAlbumData={this.state.originalAlbumData}
                            fromLibrary={true}
                        />
                    }



                </div>
            </div>
        )
    }
}

export default MainLib
