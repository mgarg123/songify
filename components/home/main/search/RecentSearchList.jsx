import React, { Component, Fragment } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { MdMoreVert } from 'react-icons/md'
import { IconContext } from "react-icons"
import Menu from '../../menu/Menu'

export class RecentSearchList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playSongData: {},
            expandMore: false,
        }
    }


    clickHandle = () => {
        let history = localStorage.getItem('songify_search_history')

        let checkFirst = JSON.parse(history)
        if (checkFirst.length === 0 || checkFirst.find(x => x.id === this.props.songId) === undefined) {
            let obj = {
                id: this.props.songId,
                image: this.props.imgId,
                title: this.props.searchTitle,
                author: this.props.authorName,
                type: this.props.type
            }
            if (history) {
                let data = JSON.parse(history)
                let res = [obj, ...data]
                localStorage.setItem('songify_search_history', JSON.stringify(res))
            } else {
                let res = []
                res.push(obj)
                localStorage.setItem('songify_search_history', JSON.stringify(res))
            }

        }

        if (this.props.type !== undefined && this.props.type === "song") {
            fetch("/api/songDetailsV2?id=" + this.props.songId)
                .then(response => response.json())
                .then(resp => {
                    let data = resp[this.props.songId]
                    let mediaURL = data.media_preview_url.replace("preview", "h").replace("_96_p.mp4", "_320.mp3")
                    data.media_preview_url = mediaURL
                    this.setState({ playSongData: data })
                }).catch(err => console.log(err.message));
        }


    }

    removeFromSuggestion = (event) => {
        let history = JSON.parse(localStorage.getItem('songify_search_history'))
        let id = this.props.songId
        // console.log("Delete: " + id)
        let res = history.filter(x => x.id !== id)
        // console.log(res);
        // localStorage.setItem('songify_search_history', JSON.stringify(res))
        this.props.removeCallBack(res)
    }

    closeMoreOptionCallBack = (expandMore) => {
        this.setState({ expandMore: expandMore })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.playSongData !== prevState.playSongData) {
            this.props.playSongCallBack(this.state.playSongData)

        }
    }

    render() {
        return (
            <Fragment>
                <div
                    className="sugg-list"
                    id={this.props.songId}
                >

                    <div className="sugg-img" onClick={this.clickHandle} >
                        <img src={this.props.imgId}
                            width={"50px"}
                            height={"50px"}
                            alt="Img" />
                    </div>
                    <div className="sugg-details">
                        <span id="sugg-title"
                            onClick={this.clickHandle}
                            style={{ color: `${this.props.songId === this.state.playSongData.id ? 'rgb(11, 226, 226)' : '#fff'}` }}
                            dangerouslySetInnerHTML={{
                                __html: `${this.props.searchTitle.length > 28 ?
                                    this.props.searchTitle.substr(0, 26) + "..." :
                                    this.props.searchTitle}`
                            }}
                        >
                            {/* {"&amp;"} */}
                            {/* {this.props.searchTitle.length > 28 ? this.props.searchTitle.substr(0, 26) + "..." : this.props.searchTitle} */}
                        </span>
                        {
                            this.props.isRemovable &&
                            <IconContext.Provider value={{
                                size: "1.4em",
                                className: "sugg-remove"
                            }}>
                                <RiCloseFill
                                    onClickCapture={this.removeFromSuggestion}
                                />
                            </IconContext.Provider>
                        }
                        {
                            this.props.hasMoreOptions &&
                            <IconContext.Provider value={{
                                size: "1.5em",
                                className: "sugg-remove"
                            }}>
                                <MdMoreVert onClickCapture={() => this.setState({ expandMore: true })} />

                            </IconContext.Provider>
                        }
                        <div id="sugg-author"
                            dangerouslySetInnerHTML={{
                                __html: `${this.props.authorName.length > 42 ?
                                    this.props.authorName.substr(0, 42) + "..." :
                                    this.props.authorName}`
                            }}
                        ></div>
                    </div>

                </div>
                {
                    this.state.expandMore &&
                    <Menu
                        id={this.props.songId}
                        type={this.props.type}
                        artist={this.props.authorName}
                        title={this.props.searchTitle}
                        image={this.props.imgId}
                        clickHandleCallBack={this.clickHandle}
                        closeMoreOptionCallBack={this.closeMoreOptionCallBack}
                    />
                }
            </Fragment>
        )
    }
}

export default RecentSearchList
