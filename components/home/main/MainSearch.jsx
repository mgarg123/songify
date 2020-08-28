import React, { Component } from 'react'
import SearchBar from './search/SearchBar'
import SearchSuggestion from './search/SearchSuggestion'
import SearchResult from './search/SearchResult'
import '../../../statics/css/search.css'
import axios from 'axios'

export class MainSearch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchValue: "",
            searchResult: {},
            loading: false,
            playSongData: {},
            isAlbumClicked: false,
            albumData: {}
        }
    }

    searchCallBack = (val) => {
        if (val !== "")
            this.setState({ searchValue: val, loading: true })
        else
            this.setState({ searchValue: val })
    }

    playSongCallBack = (data) => {
        this.setState({ playSongData: data })
    }

    albumClickedCallBack = (albumData) => {
        this.setState({ albumData: albumData })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.searchValue !== prevState.searchValue && this.state.searchValue !== "") {
            axios.get("https://cors-anywhere.herokuapp.com/" + process.env.searchV2_prefix + "" + this.state.searchValue + "" + process.env.searchV2_suffix).then(resp => {
                let data = resp.data
                this.setState({ searchResult: data, loading: false })
            }).catch(err => console.log(err.message));
            // fetch("/api/searchv2?q=" + this.state.searchValue)
            //     .then(resp => resp.json())
            //     .then(resp => {
            //         this.setState({ searchResult: resp, loading: false })
            //     }).catch(err => console.log(err.message))
        }

        if (this.state.playSongData !== prevState.playSongData) {
            this.props.playSongCallBack(this.state.playSongData)
        }

        if (this.state.albumData !== prevState.albumData)
            this.props.albumClickedCallBack(this.state.albumData)
    }

    render() {
        return (
            <div className="search-container">
                <div className="search-cont">
                    <SearchBar searchCallBack={this.searchCallBack} loading={this.state.loading} />
                    {
                        this.state.loading || this.state.searchValue.length === 0 ?
                            <SearchSuggestion
                                playSongCallBack={this.playSongCallBack}
                                albumClickedCallBack={this.albumClickedCallBack}
                            /> :
                            <SearchResult
                                playSongCallBack={this.playSongCallBack}
                                albumClickedCallBack={this.albumClickedCallBack}
                                result={this.state.searchResult} />

                    }

                </div>
            </div>
        )
    }
}

export default MainSearch
