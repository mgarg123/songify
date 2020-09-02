import React, { Component } from 'react'
import RecentSearchList from '../search/RecentSearchList'
import { IconContext } from 'react-icons'
import { GrFormSearch } from 'react-icons/gr'

export class LibDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchVal: ""
        }
    }

    render() {
        return (
            <div className="lib-details">
                <div className="lib-search">
                    <input type="text"
                        id="lib-search-bar"
                        value={this.state.searchVal}
                        placeholder={`Search ${this.props.type}`}
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

                    <RecentSearchList
                        key={"P4H0mL2F"}
                        imgId={"https://c.saavncdn.com/996/Titoo-Mba-Hindi-2018-20180517-50x50.jpg"}
                        songId={"P4H0mL2F"}
                        type={"Song"}
                        albumClickedCallBack={this.albumClickedCallBack}
                        authorName={"Arijit Singh"}
                        isRemovable={false}
                        hasMoreOptions={true}
                        searchTitle={"Kyu Hua"}
                        playSongCallBack={this.playSongCallBack}
                    />
                    <RecentSearchList
                        key={"P4H0mL2G"}
                        imgId={"https://c.saavncdn.com/996/Titoo-Mba-Hindi-2018-20180517-50x50.jpg"}
                        songId={"P4H0mL2F"}
                        type={"Song"}
                        albumClickedCallBack={this.albumClickedCallBack}
                        authorName={"Arijit Singh"}
                        isRemovable={false}
                        hasMoreOptions={true}
                        searchTitle={"Kyu Hua"}
                        playSongCallBack={this.playSongCallBack}
                    />
                    <RecentSearchList
                        key={"P4H0mL2H"}
                        imgId={"https://c.saavncdn.com/996/Titoo-Mba-Hindi-2018-20180517-50x50.jpg"}
                        songId={"P4H0mL2F"}
                        type={"Song"}
                        albumClickedCallBack={this.albumClickedCallBack}
                        authorName={"Arijit Singh"}
                        isRemovable={false}
                        hasMoreOptions={true}
                        searchTitle={"Kyu Hua"}
                        playSongCallBack={this.playSongCallBack}
                    />
                </div>
            </div>
        )
    }
}

export default LibDetails
