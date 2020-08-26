import React, { Component } from 'react'
import RecentSearchList from './RecentSearchList'

export class SearchResult extends Component {

    constructor(props) {
        super(props)

        this.state = {
            playSongData: {}
        }
    }

    playSongCallBack = (data) => {
        this.setState({ playSongData: data })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.playSongData !== prevState.playSongData) {
            this.props.playSongCallBack(this.state.playSongData)
        }
    }

    render() {
        return (
            <div className="search-suggestion-container search-res-container">
                <div className="suggestions">
                    <div className="sugg-top">
                        <h2>Best Match</h2>
                    </div>

                    <div className="search-suggestion-list">
                        {
                            this.props.result.topquery.data.map(data => {
                                return (
                                    <RecentSearchList
                                        key={data.id}
                                        imgId={data.image}
                                        songId={data.id}
                                        type={data.type}
                                        authorName={data.type === "song" ? data.more_info.singers : data.type}
                                        isRemovable={false}
                                        hasMoreOptions={true}
                                        searchTitle={data.title}
                                        playSongCallBack={this.playSongCallBack}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="suggestions">
                    <div className="sugg-top">
                        <h2>Songs</h2>
                    </div>

                    <div className="search-suggestion-list">
                        {
                            this.props.result.songs.data.map(data => {
                                return (
                                    <RecentSearchList
                                        key={data.id}
                                        imgId={data.image}
                                        songId={data.id}
                                        type={data.type}
                                        authorName={data.type === "song" ? data.more_info.singers : data.type}
                                        isRemovable={false}
                                        hasMoreOptions={true}
                                        searchTitle={data.title}
                                        playSongCallBack={this.playSongCallBack}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="suggestions">
                    <div className="sugg-top">
                        <h2>Albums</h2>
                    </div>

                    <div className="search-suggestion-list">
                        {
                            this.props.result.songs.data.map(data => {
                                return (
                                    <RecentSearchList
                                        key={data.id}
                                        imgId={data.image}
                                        songId={data.id}
                                        type={data.type}
                                        authorName={data.type === "song" ? data.more_info.singers :
                                            data.type === "album" ? data.music : data.type}
                                        isRemovable={false}
                                        hasMoreOptions={true}
                                        searchTitle={data.title} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchResult
