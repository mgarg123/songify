import React, { Component, Fragment } from 'react'
import Header from './Header.jsx'
import Footer from './Footer'
import Player from './Player'
import MainHome from './main/MainHome.jsx'
import MainSearch from './main/MainSearch.jsx'
import MainLib from './main/MainLib.jsx'
import MainAccount from './main/MainAccount.jsx'
import DetailsPage from './DetailsPage'
// import Router from 'next/router'
import '../../statics/css/index.css'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { CurrentPlayingProvider } from '../context/currentPlayingContext'



export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            whichTab: "home",
            playSongData: {},
            isAlbumClicked: false,
            albumData: {},
            songsQueue: [],
            queueNo: 0,
            isPrevEnd: true,
            isNextEnd: true
        }
    }

    componentDidMount() {
        let searchHist = localStorage.getItem('songify_search_history')
        if (searchHist === null)
            localStorage.setItem('songify_search_history', "[]")
    }

    playSongCallBack = (data) => {
        this.setState({ playSongData: data })
    }

    songQueueCallBack = (queue) => {
        this.setState({ songsQueue: queue })
    }

    albumClickedCallBack = (albumData) => {
        this.setState({ albumData: albumData, isAlbumClicked: true })
    }

    closeAlbumCallBack = (isAlbumClicked) => {
        this.setState({ isAlbumClicked: isAlbumClicked })
    }

    playNextCallBack = (repeat, isShuffled) => {

        if (this.state.songsQueue.length) {
            if (!isShuffled) {
                if (repeat === "all") {
                    if (this.state.queueNo === this.state.songsQueue.length - 1) {
                        let playData = this.state.songsQueue[0]
                        this.setState({
                            playSongData: playData,
                            queueNo: 0
                        })
                    } else {
                        let playData = this.state.songsQueue[this.state.queueNo + 1]
                        this.setState((prevState) => ({
                            playSongData: playData,
                            queueNo: prevState.queueNo + 1
                        }))
                    }
                } else {
                    if (this.state.songsQueue.length && (this.state.queueNo < this.state.songsQueue.length - 1)) {
                        let playData = this.state.songsQueue[this.state.queueNo + 1]
                        this.setState((prevState) => ({
                            playSongData: playData,
                            queueNo: prevState.queueNo + 1
                        }))
                    }
                }
            } else {
                let randomNo = Math.floor(Math.random() * this.state.songsQueue.length)
                let playData = this.state.songsQueue[randomNo]
                this.setState({
                    playSongData: playData,
                    queueNo: randomNo
                })
            }

        }



        // if (this.state.queueNo === 0 && this.state.songsQueue.length > 0) {
        //     this.setState({ isPrevEnd: true, isNextEnd: false })
        // }
    }

    playPrevCallBack = () => {
        if (this.state.songsQueue.length && (this.state.queueNo > 0)) {
            let playData = this.state.songsQueue[this.state.queueNo - 1]
            this.setState((prevState) => ({
                playSongData: playData,
                queueNo: prevState.queueNo - 1
            }))
        }

        // if (this.state.queueNo === this.state.songsQueue.length - 1 && this.state.songsQueue.length > 0) {
        //     this.setState({ isPrevEnd: false, isNextEnd: true })
        // }
    }

    tabsCallBack = (tab) => {
        // // Router.push(`/`, { hash: tab })
        // if (tab === "home")
        //     // Router.replace('/', '/')
        //     Router.push('/', '/', { shallow: true })
        // else
        //     // Router.replace('/', `/${tab}`)
        //     Router.push('/', '/' + tab, { shallow: true })

        this.setState({ whichTab: tab })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.albumData !== prevState.albumData)
            this.setState({ isAlbumClicked: true })
    }

    render() {
        return (
            <Fragment>
                <Provider store={store}>
                    <CurrentPlayingProvider playSongData={this.state.playSongData}>
                        <Header visible={this.state.whichTab === "search" || this.state.whichTab === "library" ? false : true} />
                        {
                            this.state.whichTab === "home" ? <MainHome /> :
                                this.state.whichTab === 'search' ?
                                    this.state.isAlbumClicked ?
                                        <DetailsPage
                                            albumClickedCallBack={this.closeAlbumCallBack}
                                            songQueueCallBack={this.songQueueCallBack}
                                            playSongCallBack={this.playSongCallBack}
                                            songsQueueMain={this.state.songsQueue}
                                            albumData={this.state.albumData}
                                            fromLibrary={false}
                                        /> :
                                        <MainSearch
                                            playSongCallBack={this.playSongCallBack}
                                            albumClickedCallBack={this.albumClickedCallBack}
                                            playSongData={this.state.playSongData}
                                        />

                                    : this.state.whichTab === "library" ?
                                        <MainLib
                                            playSongCallBack={this.playSongCallBack}
                                            playSongData={this.state.playSongData}
                                            songQueueCallBack={this.songQueueCallBack}
                                        /> :
                                        <MainAccount />
                        }
                        {
                            Object.keys(this.state.playSongData).length !== 0 &&
                            <Player visible={true}
                                playSongData={this.state.playSongData}
                                playNextCallBack={this.playNextCallBack}
                                playPrevCallBack={this.playPrevCallBack}
                                isPrevEnd={this.state.isPrevEnd}
                                isNextEnd={this.state.isNextEnd}
                                songsQueue={this.state.songsQueue}
                            />
                        }
                        <Footer tabsCallBack={this.tabsCallBack} />
                    </CurrentPlayingProvider>
                </Provider>
            </Fragment>
        )
    }
}


export default Home
