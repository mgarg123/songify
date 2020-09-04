import React, { Component } from 'react'
import '../../statics/css/details.css'
import { IconContext } from 'react-icons'
import { AiFillHeart } from 'react-icons/ai'
import { FiPlay, FiArrowLeft } from 'react-icons/fi'
import AlbumList from './AlbumList'

export class DetailsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAlbumClicked: true,
            playSongData: {},
            songsQueue: [],
            displayAdded: false,
            addedQuantity: 0,
            isPresentInLib: false
        }
    }

    componentDidMount() {
        //To scroll to top always when component mounts
        window.scrollTo(0, 0)

        let localLib = JSON.parse(localStorage.getItem("songify_library"))
        let isPresent = localLib ? localLib.find(x => x.albumid === this.props.albumData.albumid) !== undefined : false
        this.setState({
            isPresentInLib: isPresent
        })
    }

    addAllSongsToQueue = () => {
        let songsToAdd = this.props.albumData.songs
        for (let i in songsToAdd) {
            let mediaURL = songsToAdd[i].media_preview_url.replace("preview", "h").replace("_96_p.mp4", "_320.mp3")
            songsToAdd[i].media_preview_url = mediaURL
        }
        let playCurrentFromQueue = songsToAdd[0]
        this.setState({
            songsQueue: songsToAdd,
            playSongData: playCurrentFromQueue,
            displayAdded: true,
            addedQuantity: songsToAdd.length
        })
        setTimeout(() => {
            this.setState({ displayAdded: false })
        }, 2500)
    }

    addOneToQueueCallBack = (queueOne) => {
        let currentQueue = [...this.props.songsQueueMain]
        let isAlreadyPresent = currentQueue.findIndex(x => x.id === queueOne.id) !== -1
        if (!isAlreadyPresent) {
            currentQueue.push(queueOne)
            this.setState({
                songsQueue: currentQueue,
                displayAdded: true,
                addedQuantity: 1
            })
        }
        setTimeout(() => {
            this.setState({ displayAdded: false })
        }, 2500)

    }

    playSongCallBack = (data) => {
        this.setState({ playSongData: data })
    }

    addToLib = () => {
        let localLib = JSON.parse(localStorage.getItem("songify_library"))
        let isAdded = false

        if (localLib) {
            let isPresent = localLib.find(x => x.albumid === this.props.albumData.albumid) !== undefined
            if (!isPresent) {
                localLib.push(this.props.albumData)
                isAdded = true
            } else {
                localLib = localLib.filter(x => x.albumid !== this.props.albumData.albumid)
                isAdded = false
            }
        } else {
            localLib = []
            localLib.push(this.props.albumData)
            isAdded = true
        }

        localStorage.setItem("songify_library", JSON.stringify(localLib))
        this.setState({
            isPresentInLib: isAdded
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isAlbumClicked !== prevState.isAlbumClicked)
            this.props.albumClickedCallBack(this.state.isAlbumClicked)

        if (this.state.playSongData !== prevState.playSongData) {
            this.props.playSongCallBack(this.state.playSongData)
        }

        if (this.state.songsQueue !== prevState.songsQueue)
            this.props.songQueueCallBack(this.state.songsQueue)
    }


    render() {
        return (
            <div className="details-root"
                style={{ height: `${this.props.albumData.songs.length < 3 ? '100vh' : 'auto'}` }}>

                <IconContext.Provider value={{
                    size: '2.5em',
                    style: {
                        position: 'absolute',
                        border: '0.5px solid grey',
                        borderRadius: '20px',
                        padding: '5px',
                        top: '10px',
                        left: '10px'
                    },
                    className: 'go-back-icon'
                }}>
                    <span className={`display-queue ${this.state.displayAdded && '.disp-q-slide-down'}`}
                        style={{ display: `${this.state.displayAdded ? 'inline-block' : 'none'}` }}
                    >{`+${this.state.addedQuantity}`}</span>

                    <FiArrowLeft onClickCapture={() => this.setState({ isAlbumClicked: false })} />
                </IconContext.Provider>
                <div className="details-container">
                    <div className="album-image">
                        <img src={this.props.albumData.image.replace("-150x150.jpg", "-250x250.jpg")} alt="" />
                    </div>
                    <div className="album-details">
                        <div className="ad-title">{this.props.albumData.title.length > 33 ?
                            this.props.albumData.title.substr(0, 32) + "..." :
                            this.props.albumData.title
                        }</div>
                        <div className="ad-artist">{this.props.albumData.primary_artists.length > 50 ?
                            this.props.albumData.primary_artists.substr(0, 50) + "..." :
                            this.props.albumData.primary_artists
                        }</div>
                        <div className="ad-more-info">{this.props.albumData.play_count ?
                            this.props.albumData.play_count.toLocaleString() + " plays" :
                            this.props.albumData.year
                        }</div>
                        <div className="ad-icons">
                            <IconContext.Provider value={{
                                className: 'heart',
                                size: '2.7em',
                                color: this.state.isPresentInLib ? 'red' : 'white',
                                style: {
                                    border: '0.5px solid grey',
                                    borderRadius: '50px',
                                    padding: '8px',
                                    margin: '6px'
                                }
                            }}>
                                <AiFillHeart onClick={this.addToLib} />
                            </IconContext.Provider>
                            <IconContext.Provider value={{
                                className: 'playAll',
                                size: '2.7em',
                                style: {
                                    border: '0.5px solid grey',
                                    borderRadius: '40px',
                                    padding: '6px',
                                    background: 'rgb(11, 226, 226)',
                                    margin: '6px'
                                }
                            }}>
                                <FiPlay onClickCapture={this.addAllSongsToQueue} />
                            </IconContext.Provider>
                        </div>


                    </div>
                    <div className="album-song-list">
                        {
                            this.props.albumData.songs.map((data, index) => {
                                return (
                                    <AlbumList key={data.id}
                                        songId={data.id}
                                        index={index + 1}
                                        playSongCallBack={this.playSongCallBack}
                                        addOneToQueueCallBack={this.addOneToQueueCallBack}
                                        title={data.song}
                                        type={data.type}
                                        image={data.image.replace('-150x150.jpg', '-250x250.jpg')}
                                        artist={data.primary_artists} />
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default DetailsPage
