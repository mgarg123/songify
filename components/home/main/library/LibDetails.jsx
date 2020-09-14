import React, { Component } from 'react'
import RecentSearchList from '../search/RecentSearchList'
import { IconContext } from 'react-icons'
import { GrFormSearch } from 'react-icons/gr'
import getSongsForAlbum from '../../../../lib/musicLib/getSongsForAlbum'

export class LibDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchVal: "",
            lists: [],
            playSongData: {},
            albumData: {},
            originalAlbumData: {}
        }
    }

    componentDidMount() {
        this.setState({ lists: this.props.lists })
    }

    playSongCallBack = (data) => {
        this.setState({ playSongData: data })
    }

    albumClickedCallBack = (albumData) => {
        let localAlbumData = getSongsForAlbum(albumData.albumid)
        if (albumData.subType && albumData.subType === "artist") {
            localAlbumData = albumData
        }
        this.setState({ albumData: localAlbumData, originalAlbumData: albumData })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.lists !== prevProps.lists) {
            this.setState({ lists: this.props.lists })
        }

        if (this.state.searchVal !== prevState.searchVal) {
            if (this.props.type === "Song") {
                let newList = this.props.lists.filter(x => x.song.toLowerCase().includes(this.state.searchVal.toLowerCase()))
                this.setState({ lists: newList })
            }
        }

        if (this.state.playSongData !== prevState.playSongData) {
            this.props.playSongCallBack(this.state.playSongData)
        }

        if (this.state.albumData !== prevState.albumData)
            this.props.albumClickedCallBack(this.state.albumData, this.state.originalAlbumData)
    }

    render() {
        return (
            <div className="lib-details">
                <div className="lib-search">
                    <input type="text"
                        id="lib-search-bar"
                        value={this.state.searchVal}
                        placeholder={`Search ${this.props.type}`}
                        autoComplete="off"
                        onChange={(event) => this.setState({ searchVal: event.target.value })}
                    />
                    <IconContext.Provider value={{
                        size: '1.8em',
                        // color: '#fff',
                        style: {
                            position: 'absolute',
                            top: '4px',
                            left: '7px',
                        }
                    }}>
                        <GrFormSearch />
                    </IconContext.Provider>
                </div>
                <div className="lib-reuslts">

                    {
                        this.state.lists.map(song => {
                            return (
                                <RecentSearchList
                                    key={song.id ? song.id : song.albumid}
                                    imgId={song.image}
                                    songId={song.id ? song.id : song.albumid}
                                    type={this.props.type.toLowerCase()}
                                    subType={this.props.subType !== undefined && this.props.subType.toLowerCase()}
                                    albumClickedCallBack={this.albumClickedCallBack}
                                    authorName={this.props.type === "Song" ? song.singers : song.primary_artists}
                                    artistName={song.name}
                                    isRemovable={false}
                                    hasMoreOptions={true}
                                    searchTitle={this.props.type === "Song" ? song.song : song.title}
                                    playSongCallBack={this.playSongCallBack}
                                    playSongData={this.props.playSongData}
                                />
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}

export default LibDetails
