import React, { Component, Fragment } from 'react'
import '../../statics/css/player.css'
import { FaPlay, FaPause } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { IconContext } from "react-icons"
import ClipLoader from 'react-spinners/ClipLoader'
import durationToTime from '../../lib/durationToTime.js'
import dynamic from 'next/dynamic'

//Dynamic import and turning off server side import so that we do not get 'window is not defined' error!
const MediaSession = dynamic(() => {
    return import('@mebtte/react-media-session')
},
    { ssr: false }
);


export class Player extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isPlaying: true,
            isFullScreen: false,
            currentDuration: 0,
            isBuffering: false,
            totalDurationInTime: "00:00",
            currentElapsedTime: "00:00"
        }
        this.audioRef = React.createRef()
        this.rangeSlider = React.createRef()
        this.elapsedTime = React.createRef()
    }



    componentDidMount() {
        if (this.audioRef.current !== null)
            this.audioRef.current.play().catch(() => console.log("Error in URL"));

        let duration = this.props.playSongData.duration + ""
        let totalTime = durationToTime(duration)
        this.setState({ totalDurationInTime: totalTime })
    }

    //Handle URL error, revert to 64 KBPS if 320 KBPS mp3 not found 
    audioError = (event) => {

        let url = this.props.playSongData.media_preview_url
        url = url.replace("_320", "_64")
        this.audioRef.current.src = url
        this.audioRef.current.play().catch(() => console.log("Error in URL"));
    }

    timeUpdate = (event) => {
        let duration = this.audioRef.current.currentTime + ""
        let elapsedTime = durationToTime(duration)
        if (this.rangeSlider.current !== null)
            this.rangeSlider.current.value = this.audioRef.current.currentTime
        if (this.elapsedTime.current !== null)
            this.elapsedTime.current.innerHTML = elapsedTime
        // this.setState({
        //     currentDuration: this.audioRef.current.currentTime,
        //     currentElapsedTime: elapsedTime
        // })
    }

    fullScreenMode = (event) => {
        this.setState((prevState) => ({ isFullScreen: !prevState.isFullScreen }))
    }

    closeFullScreen = (event) => {
        event.stopPropagation()
        this.setState({ isFullScreen: false })
    }

    seek = (event) => {
        this.audioRef.current.currentTime = event.target.value
        this.rangeSlider.current.value = event.target.value
        let elapsedTime = durationToTime(event.target.value)
        this.elapsedTime.current.innerHTML = elapsedTime
        // this.setState({ currentDuration: event.target.value })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.playSongData !== prevProps.playSongData) {
            if (this.audioRef.current !== null) {
                this.audioRef.current.play().catch(() => console.log("Error in URL"));
            }
        }
        if (this.state.isFullScreen !== prevState.isFullScreen) {
            if (this.state.isFullScreen)
                document.getElementById('root').style.overflowY = 'hidden'
        }

    }

    render() {
        return (
            <Fragment>
                <MediaSession
                    title={this.props.playSongData.song}
                    artist={this.props.playSongData.singers}
                    artwork={[
                        { src: `${this.props.playSongData.image}`, sizes: '96x96', type: 'image/png' },
                        { src: `${this.props.playSongData.image}`, sizes: '128x128', type: 'image/png' },
                        { src: `${this.props.playSongData.image}`, sizes: '192x192', type: 'image/png' },
                        { src: `${this.props.playSongData.image}`, sizes: '256x256', type: 'image/png' },
                        { src: `${this.props.playSongData.image}`, sizes: '384x384', type: 'image/png' },
                        { src: `${this.props.playSongData.image}`, sizes: '512x512', type: 'image/png' },

                    ]}
                    onPlay={() => this.audioRef.current.play()}
                    onPause={() => this.audioRef.current.pause()}
                    onSeekBackward={() => this.audioRef.current.currentTime > 9 ?
                        this.audioRef.current.currentTime -= 10 :
                        this.audioRef.current.currentTime = 0}
                    onSeekForward={() => this.audioRef.current.currentTime += 10}
                />
                <div className={`player-footer ${this.state.isFullScreen ? 'fullscreen-pf' : ''}`}>
                    <div className={`image-div ${this.state.isFullScreen ? 'fullscreen-imgdiv' : ''}`}
                        onClick={this.fullScreenMode}>
                        <img src={this.props.playSongData.image} alt="IMG" />
                        <IconContext.Provider value={{
                            size: '2em',
                            style: { display: `${this.state.isFullScreen ? 'block' : 'none'}` },
                            className: "close-player"
                        }}>
                            <MdClose onClick={this.closeFullScreen} />
                        </IconContext.Provider>
                    </div>
                    <div className={`song-details ${this.state.isFullScreen ? 'fullscreen-songdet' : ''}`}
                        onClick={this.fullScreenMode}>
                        <div className="song-title">
                            {
                                (this.props.playSongData.song.length > 28 && !this.state.isFullScreen ||
                                    this.props.playSongData.song.length > 32 && this.state.isFullScreen) && this.state.isPlaying ?
                                    <marquee behavior="scroll"
                                        direction="left"
                                        dangerouslySetInnerHTML={{ __html: `${this.props.playSongData.song}` }}
                                        scrollamount="6"
                                        loop="2"
                                    ></marquee> :
                                    <span
                                        dangerouslySetInnerHTML={{ __html: this.props.playSongData.song.substr(0, 36) }}
                                    ></span>
                            }

                        </div>
                        <div className="song-author"
                            style={{ color: `${this.state.isFullScreen ? '#2d2d2d' : '#c5c5c5'}` }}
                        >
                            {
                                (this.props.playSongData.singers.length > 39 && !this.state.isFullScreen ||
                                    this.props.playSongData.singers.length > 52 && this.state.isFullScreen) && this.state.isPlaying ?
                                    <marquee behavior="scroll"
                                        direction="left"
                                        dangerouslySetInnerHTML={{ __html: `${this.props.playSongData.singers}` }}
                                        scrollamount="6"
                                        loop="2"
                                    ></marquee> :
                                    <span
                                        dangerouslySetInnerHTML={{ __html: `${this.props.playSongData.singers}` }}
                                    ></span>
                            }

                        </div>
                    </div>
                    <div className={`audio-element ${this.state.isFullScreen ? 'fullscreen-audioelmnt' : ''}`}>
                        <input type="range"
                            name="slider"
                            id="range-slider"
                            ref={this.rangeSlider}
                            // value={this.state.currentDuration}
                            step="any"
                            style={{ display: `${this.state.isFullScreen ? 'block' : 'none'}` }}
                            max={this.props.playSongData.duration}
                            onChange={this.seek}

                        />
                        <span id="play-pause">
                            <IconContext.Provider value={{
                                size: `${this.state.isFullScreen ? '2.5em' : '1.4em'}`,
                                className: `play-pause ${this.state.isFullScreen ? 'play-pause-animate' : ''}`,
                                style: { display: `${this.state.isBuffering ? 'none' : 'block'}` }
                            }}>
                                {
                                    this.state.isPlaying ?
                                        <FaPause
                                            onClick={() => this.audioRef.current.pause()}
                                        /> :
                                        <FaPlay
                                            onClick={() => this.audioRef.current.play().catch(() => console.log("Error in URL"))}
                                        />
                                }
                            </IconContext.Provider>
                        </span>

                        <ClipLoader
                            css={`display:flex;justify-content:center;align-items:center; display:${this.state.isBuffering ? 'block' : 'none'}`}
                            size={35}
                            color={"#757575"}
                        />
                        {
                            this.state.isFullScreen &&
                            <Fragment>
                                <span
                                    ref={this.elapsedTime}
                                    className="song-play-elapsed-time">00:00</span>
                                <span className="song-end-time">{this.state.totalDurationInTime}</span>
                            </Fragment>
                        }

                        <audio
                            ref={this.audioRef}
                            src={this.props.playSongData.media_preview_url}
                            onPlay={() => this.setState({ isPlaying: true })}
                            onPause={() => this.setState({ isPlaying: false })}
                            onError={this.audioError}
                            onTimeUpdate={this.timeUpdate}
                            onWaiting={() => this.setState({ isBuffering: true })}
                            onPlaying={() => this.setState({ isBuffering: false })}
                        ></audio>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Player
