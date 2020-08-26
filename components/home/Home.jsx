import React, { Component, Fragment } from 'react'
import Header from './Header.jsx'
import Footer from './Footer'
import Player from './Player'
import MainHome from './main/MainHome.jsx'
import MainSearch from './main/MainSearch.jsx'
import MainLib from './main/MainLib.jsx'
import MainAccount from './main/MainAccount.jsx'
import Router from 'next/router'



export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            whichTab: "home",
            playSongData: {}
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

    render() {
        return (
            <Fragment>
                <Header visible={this.state.whichTab === "search" ? false : true} />
                {
                    this.state.whichTab === "home" ? <MainHome /> :
                        this.state.whichTab === 'search' ? <MainSearch playSongCallBack={this.playSongCallBack} /> :
                            this.state.whichTab === "library" ? <MainLib /> :
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
