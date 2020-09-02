import React, { Component, Fragment } from 'react'
import '../../statics/css/player.css'
import { FaPlay, FaPause } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { IconContext } from "react-icons"
import ClipLoader from 'react-spinners/ClipLoader'
import durationToTime from '../../lib/durationToTime.js'
import dynamic from 'next/dynamic'
import { CgPlayTrackPrev, CgPlayTrackNext } from 'react-icons/cg'
import { MdShuffle, MdRepeat, MdRepeatOne } from 'react-icons/md'
import { AiFillHeart } from 'react-icons/ai'
// import axios from 'axios'
import Hls from 'hls.js'
import isColorDark from '../../lib/isColorDark'
import Color, { Palette } from 'color-thief-react'
import fetchSearchResult from '../../lib/fetchSearchResult'

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
            currentElapsedTime: '00:00',
            playSongData: {},
            queueNo: 0,
            repeat: "no",      //"no" -No repeat, -> "all" -repeat all -> "one" -repeat one
            isShuffled: false
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
        if (this.audioRef.current) {
            this.audioRef.current.addEventListener('ended', () => {
                if (this.state.repeat === 'one') {
                    this.audioRef.current.play().catch(err => console.log("Play Error - OnEnd"))
                } else {
                    this.props.playNextCallBack(this.state.repeat, this.state.isShuffled)
                }

            });
        }



    }

    //Handle URL error, search for best quality else revert to 64 KBPS if 320 KBPS mp3 not found 
    audioError = (event) => {

        if (this.audioRef.current.src.match("m3u8") !== null) {
            let url = this.props.playSongData.media_preview_url
            url = url.replace("_320", "_64")
            this.audioRef.current.src = url
            this.audioRef.current.play().catch(() => console.log("Error in URL"));
        } else {
            //Fetch HIGH Quality song from other API
            let song = this.props.playSongData.song
            let singer = this.props.playSongData.singers.split(",")[0]
            fetchSearchResult(song, singer).then(data => {
                let songId = ""
                if (data.length) {
                    songId = data[0].id
                    let url = `https://jiobeats.cdn.jio.com/mod/_definst_/mp4:hdindiamusic/audiofiles/${songId.split('_')[0]}/${songId.split('_')[1]}/${songId}_320.mp4/playlist.m3u8`

                    this.audioRef.current.src = url;
                    //Setting Up HLS JS to play m3u8 file
                    setTimeout(() => {
                        //This will check whether m3u8 file is playing or not, if not it will revert back to available api
                        if (this.state.isBuffering) {
                            let url = this.props.playSongData.media_preview_url
                            url = url.replace("_320", "_64")
                            this.audioRef.current.src = url
                            this.audioRef.current.play().catch(() => console.log("Error in URL"));
                        }

                    }, 6000);
                    if (this.audioRef.current !== null && this.audioRef.current.src.match('m3u8') !== null) {
                        if (Hls.isSupported) {
                            let hls = new Hls();
                            hls.loadSource(this.audioRef.current.src);
                            hls.attachMedia(this.audioRef.current);
                            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                                this.audioRef.current.play().catch(err => console.log('error in play 1'))
                            });
                        }
                        else if (this.audioRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                            this.audioRef.current.addEventListener('loadedmetadata', function () {
                                this.audioRef.current.play().catch(err => console.log('error in play 2'))
                            });
                        }
                    }


                } else {
                    let url = this.props.playSongData.media_preview_url
                    url = url.replace("_320", "_64")
                    this.audioRef.current.src = url
                    this.audioRef.current.play().catch(() => console.log("Error in URL"));
                }
            }).catch(err => console.log(err.message))
            // axios.get('/api/search?q=' + song + "+" + singer).then(resp => {
            //     let data = resp.data.result.data["Best Match"]


            // }).catch(err => console.log(err.message));
        }

        if (this.audioRef.current.src.match('m3u8') !== null) {

        }

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

    // onSongEnd = (event) => {
    //     alert("end")
    //     this.props.playNextCallBack()
    // }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.playSongData !== prevProps.playSongData) {
            if (this.audioRef.current !== null) {
                this.audioRef.current.play().catch(() => console.log("Error in URL"));

                //Set total duration of next song as didMount won't be called again
                let totalDuration = durationToTime(this.props.playSongData.duration)
                this.setState({ totalDurationInTime: totalDuration })
            }
        }
        if (this.state.isFullScreen !== prevState.isFullScreen) {
            if (this.state.isFullScreen) {
                document.getElementById('root').style.overflowY = 'hidden'
                let elapsedTime = durationToTime(this.audioRef.current.currentTime)
                this.elapsedTime.current.innerHTML = elapsedTime
            }

        }

        if (this.props.playSongData !== prevProps.playSongData)
            this.setState({ playSongData: this.props.playSongData })
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
                <Color
                    src={"https://api.codetabs.com/v1/proxy/?quest=" + this.props.playSongData.image}
                    format="hex"
                    crossOrigin="anonymous"
                >
                    {
                        ({ data, loading }) => {
                            // console.log(data)
                            let mainColor = data
                            return (
                                <Fragment>
                                    <Palette
                                        src={"https://api.codetabs.com/v1/proxy/?quest=" + this.props.playSongData.image}
                                        format="hex"
                                        crossOrigin="anonymous"
                                        colorCount={5}
                                    >
                                        {
                                            ({ data, loading }) => {
                                                // console.log("pal: " + data)
                                                let color = isColorDark(data)
                                                let randColor1 = color[Math.floor(Math.random() * 5)]
                                                let randColor2 = color[Math.floor(Math.random() * 5)]
                                                return (
                                                    <div className={`player-footer ${this.state.isFullScreen ? 'fullscreen-pf' : ''}`}
                                                        style={{
                                                            background: `${this.state.isFullScreen ?
                                                                !loading ?
                                                                    `linear-gradient(60deg, ${color[0]}, ${color[1]})` :
                                                                    'linear-gradient(60deg, #e8d0d0, #e0b1b1)' :
                                                                '#222'}`
                                                        }}
                                                    >
                                                        <div className={`image-div ${this.state.isFullScreen ? 'fullscreen-imgdiv' : ''}`}
                                                            onClick={this.fullScreenMode}>
                                                            <img src={this.props.playSongData.image.replace("-150x150.jpg", "-350x350.jpg")} alt="IMG" />
                                                            <IconContext.Provider value={{
                                                                size: '2em',
                                                                style: {
                                                                    display: `${this.state.isFullScreen ? 'block' : 'none'}`,
                                                                    borderRadius: '30px',
                                                                    color: '#fff',
                                                                    boxShadow: '0px 0px 4px 2px rgba(0,0,0,0.5)'
                                                                },
                                                                className: "close-player"
                                                            }}>
                                                                <MdClose onClick={this.closeFullScreen} />
                                                            </IconContext.Provider>
                                                        </div>
                                                        <div className={`song-details ${this.state.isFullScreen ? 'fullscreen-songdet' : ''}`}
                                                            onClick={this.fullScreenMode}
                                                            style={{
                                                                pointerEvents: `${this.state.isFullScreen ? 'none' : 'all'}`
                                                            }}
                                                        >
                                                            <div className="song-title">
                                                                {
                                                                    (this.props.playSongData.song.length > 28 && !this.state.isFullScreen ||
                                                                        this.props.playSongData.song.length > 32 && this.state.isFullScreen) && this.state.isPlaying ?
                                                                        <marquee behavior="scroll"
                                                                            direction="left"
                                                                            scrollamount="6"
                                                                            loop="2"
                                                                        >{this.props.playSongData.song}</marquee> :
                                                                        <span>{this.props.playSongData.song.length > 28 ?
                                                                            this.props.playSongData.song.substr(0, 27) + "..." :
                                                                            this.props.playSongData.song
                                                                        }</span>
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
                                                                            scrollamount="6"
                                                                            loop="2"
                                                                        >{this.props.playSongData.singers}</marquee> :
                                                                        <span>{this.props.playSongData.singers.length > 38 ?
                                                                            this.props.playSongData.singers.substr(0, 37) + '...' :
                                                                            this.props.playSongData.singers
                                                                        }</span>
                                                                }

                                                            </div>
                                                        </div>
                                                        <div className={`audio-element ${this.state.isFullScreen ? 'fullscreen-audioelmnt' : ''}`}
                                                            style={{
                                                                background: `${this.state.isFullScreen ?
                                                                    !loading ?
                                                                        `linear-gradient(60deg, ${color[3]}, ${color[1]})` :
                                                                        '#222' :
                                                                    '#222'}`,
                                                                boxShadow: `0 3px 50px 1px ${data}`
                                                            }}
                                                        >
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
                                                            <span id="play-pause"
                                                                style={{}}
                                                            >
                                                                {
                                                                    this.state.isFullScreen &&
                                                                    <IconContext.Provider value={{
                                                                        size: '2em',
                                                                        color: `${this.state.isShuffled ? '#0be2e2' : '#fff'}`,
                                                                        style: {
                                                                            position: 'absolute',
                                                                            bottom: '10px',
                                                                            left: '10px'
                                                                        }
                                                                    }}>
                                                                        <MdShuffle onClick={() => this.setState(
                                                                            (prevState) => ({ isShuffled: !prevState.isShuffled })
                                                                        )} />
                                                                    </IconContext.Provider>
                                                                }

                                                                {
                                                                    this.state.isFullScreen &&
                                                                    <IconContext.Provider value={{
                                                                        size: '2.5em',
                                                                        // style: {
                                                                        //     pointerEvents: `${this.props.isNextEnd && 'none'}`,
                                                                        //     color: `${this.props.isNextEnd && 'grey'}`
                                                                        // }
                                                                    }}>
                                                                        <CgPlayTrackPrev
                                                                            onClickCapture={() => this.props.playPrevCallBack()} />
                                                                    </IconContext.Provider>
                                                                }

                                                                <IconContext.Provider value={{
                                                                    size: `${this.state.isFullScreen ? '2.5em' : '1.4em'}`,
                                                                    className: `play-pause ${this.state.isFullScreen ? 'play-pause-animate' : ''}`,
                                                                    style: {
                                                                        display: `${this.state.isBuffering ? 'none' : 'block'}`
                                                                    }
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
                                                                <ClipLoader
                                                                    css={`display:flex;justify-content:center;align-items:center; display:${this.state.isBuffering ? 'block' : 'none'}`}
                                                                    size={35}
                                                                    color={"#757575"}
                                                                />
                                                                {
                                                                    this.state.isFullScreen &&
                                                                    <IconContext.Provider value={{
                                                                        size: '2.5em',
                                                                        // style: {
                                                                        //     pointerEvents: `${this.props.isNextEnd && 'none'}`,
                                                                        //     color: `${this.props.isNextEnd && 'grey'}`
                                                                        // }
                                                                    }}>
                                                                        <CgPlayTrackNext
                                                                            onClickCapture={() => this.props.playNextCallBack(this.state.repeat, this.state.isShuffled)} />
                                                                    </IconContext.Provider>
                                                                }
                                                                {
                                                                    this.state.isFullScreen &&
                                                                    <IconContext.Provider value={{
                                                                        className: 'heart',
                                                                        size: '2em',
                                                                        style: {
                                                                            position: 'absolute',
                                                                            bottom: '10px',
                                                                            left: '52px'
                                                                        }
                                                                    }}>
                                                                        <AiFillHeart />
                                                                    </IconContext.Provider>
                                                                }
                                                                {
                                                                    this.state.isFullScreen &&
                                                                    <IconContext.Provider value={{
                                                                        size: '2em',
                                                                        color: `${this.state.repeat === "all" ? '#0be2e2' : '#fff'}`,
                                                                        style: {
                                                                            position: 'absolute',
                                                                            bottom: '10px',
                                                                            right: '10px'
                                                                        }
                                                                    }}>
                                                                        {
                                                                            this.state.repeat === "one" ?
                                                                                <MdRepeatOne onClick={() => this.setState({ repeat: "no" })} /> :
                                                                                <MdRepeat onClick={() => this.setState(
                                                                                    (prevState) => this.setState({
                                                                                        repeat: `${prevState.repeat === "no" ? 'all' :
                                                                                            prevState.repeat === "all" ? 'one' : "no"}`
                                                                                    })
                                                                                )} />
                                                                        }

                                                                    </IconContext.Provider>
                                                                }


                                                            </span>


                                                            {
                                                                this.state.isFullScreen &&
                                                                <Fragment>
                                                                    <span
                                                                        ref={this.elapsedTime}
                                                                        className="song-play-elapsed-time">00:00</span>
                                                                    <span
                                                                        className="song-end-time">{this.state.totalDurationInTime}</span>
                                                                </Fragment>
                                                            }

                                                            <audio
                                                                ref={this.audioRef}
                                                                autoPlay="autoplay"
                                                                preload="metadata"
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
                                                )
                                            }
                                        }

                                    </Palette>
                                </Fragment>
                            )
                        }
                    }


                </Color>
            </Fragment>
        )
    }
}

export default Player
