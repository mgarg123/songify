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



export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            whichTab: "home",
            playSongData: {},
            isAlbumClicked: false,
            albumData: {}
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

    albumClickedCallBack = (albumData) => {
        this.setState({ albumData: albumData, isAlbumClicked: true })
    }

    closeAlbumCallBack = (isAlbumClicked) => {
        this.setState({ isAlbumClicked: isAlbumClicked })
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
                <Header visible={this.state.whichTab === "search" ? false : true} />
                {
                    this.state.whichTab === "home" ? <MainHome /> :
                        this.state.whichTab === 'search' ?
                            this.state.isAlbumClicked ?
                                <DetailsPage
                                    albumClickedCallBack={this.closeAlbumCallBack}
                                    albumData={this.state.albumData}
                                /> :
                                <MainSearch
                                    playSongCallBack={this.playSongCallBack}
                                    albumClickedCallBack={this.albumClickedCallBack}
                                />

                            : this.state.whichTab === "library" ? <MainLib /> :
                                <MainAccount />
                }
                {
                    Object.keys(this.state.playSongData).length !== 0 && <Player visible={true} playSongData={this.state.playSongData} />
                }
                <Footer tabsCallBack={this.tabsCallBack} />
            </Fragment>
        )
    }
}

export default Home
