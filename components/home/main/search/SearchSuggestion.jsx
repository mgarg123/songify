import React, { Component } from 'react'
import RecentSearchList from './RecentSearchList'


export class SearchSuggestion extends Component {
    constructor(props) {
        super(props)

        this.state = {
            seeAll: false,
            suggestions: [],
            showSuggestion: [],
            playSongData: {},
            albumData: {}
        }
    }

    componentDidMount() {
        let data = localStorage.getItem('songify_search_history') ? JSON.parse(localStorage.getItem('songify_search_history')) : []
        let showData = []
        let cnt = 0
        if (data.length > 4) {
            for (let i in data) {
                if (cnt < 4) {
                    showData.push(data[i])
                }
                cnt++
            }
            this.setState({ showSuggestion: showData })
        } else {
            this.setState({ showSuggestion: data })
        }
        this.setState({ suggestions: data })
    }

    playSongCallBack = (data) => {
        this.setState({ playSongData: data })
    }

    removeCallBack = (suggestion) => {
        localStorage.setItem('songify_search_history', JSON.stringify(suggestion))

        let showData = []
        if (this.state.seeAll) {
            if (suggestion.length > 4) {
                // showData = suggestion.filter((data, index) => index < 4)
                this.setState({ showSuggestion: suggestion })
            } else {
                this.setState({ showSuggestion: suggestion, seeAll: false })
            }
        } else {
            if (suggestion.length > 4) {
                showData = suggestion.filter((data, index) => index < 4)
                this.setState({ showSuggestion: showData })
            } else {
                this.setState({ showSuggestion: suggestion, })
            }
        }


        this.setState({ suggestions: suggestion })
    }

    albumClickedCallBack = (albumData) => {
        this.setState({ albumData: albumData })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.seeAll !== prevState.seeAll) {
            if (this.state.seeAll) {
                this.setState({ showSuggestion: this.state.suggestions })
            } else {
                let showData = []
                if (this.state.suggestions.length > 4) {
                    showData = this.state.suggestions.filter((data, index) => index < 4)
                    this.setState({ showSuggestion: showData })
                } else {
                    this.setState({ showSuggestion: this.state.suggestions })
                }
            }
        }

        if (this.state.playSongData !== prevState.playSongData) {
            this.props.playSongCallBack(this.state.playSongData)
        }

        if (this.state.albumData !== prevState.albumData)
            this.props.albumClickedCallBack(this.state.albumData)
    }

    render() {
        return (
            <div className="search-suggestion-container"
                style={{ height: `${this.state.suggestions.length > 2 ? 'auto' : '100vh'}` }}
            >
                <div className="suggestions">
                    <div className="sugg-top">
                        <h2>Recent Searches</h2>
                        <span
                            style={{ display: `${this.state.suggestions.length < 5 ? 'none' : 'inline-block'}` }}
                            onClick={() => this.setState((prevState) => ({ seeAll: !prevState.seeAll }))}
                        >{this.state.seeAll ? 'Collapse' : 'See All'}</span>
                    </div>

                    <div className="search-suggestion-list">
                        {
                            this.state.showSuggestion && this.state.showSuggestion.map(data => {
                                return (
                                    <RecentSearchList
                                        playSongCallBack={this.playSongCallBack}
                                        albumClickedCallBack={this.albumClickedCallBack}
                                        key={data.id}
                                        type={data.type}
                                        imgId={data.image.replace("-150x150.jpg", "-350x350.jpg")}
                                        songId={data.id}
                                        authorName={data.author}
                                        isRemovable={true}
                                        searchTitle={data.title}
                                        removeCallBack={this.removeCallBack}
                                        playSongData={this.props.playSongData}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="trending-search">

                    <h2>Trending</h2>


                    <div className="search-suggestion-list">
                        <RecentSearchList
                            imgId={"https://c.saavncdn.com/996/Titoo-Mba-Hindi-2018-20180517-150x150.jpg"}
                            songId={""}
                            authorName={"Arijit Singh, Jaani V"}
                            isRemovable={false}
                            searchTitle={"Pachtaoge"} />
                        <RecentSearchList imgId={"https://c.saavncdn.com/996/Titoo-Mba-Hindi-2018-20180517-150x150.jpg"}
                            songId={""}
                            isRemovable={false}
                            authorName={"Arijit Singh, Jonita Gandhi"}
                            searchTitle={"Dil Kya Kare"} />
                        <RecentSearchList imgId={"https://c.saavncdn.com/996/Titoo-Mba-Hindi-2018-20180517-150x150.jpg"}
                            songId={""}
                            isRemovable={false}
                            authorName={"Arijit Singh, B Praak"}
                            searchTitle={"Arijit Singh"} />
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchSuggestion
