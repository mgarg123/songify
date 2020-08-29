import React, { Component, Fragment } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { IconContext } from "react-icons"
import Menu from './menu/Menu'
import axios from 'axios'

export class AlbumList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expandMore: false,
            playSongData: {},
            queueOne: {}
        }
    }


    clickHandle = (type) => {
        // console.log(this.props.songId);
        axios.get('/api/songDetailsV2?id=' + this.props.songId).then(res => {
            let data = res.data[this.props.songId]
            let mediaURL = data.media_preview_url.replace("preview", "h").replace("_96_p.mp4", "_320.mp3")
            data.media_preview_url = mediaURL

            if (type === "queue") {
                this.setState({ queueOne: data })
            } else {
                this.setState({ playSongData: data })
            }


        }).catch(err => console.log(err.message))
    }


    closeMoreOptionCallBack = (expandMore) => {
        this.setState({ expandMore: expandMore })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.playSongData !== prevState.playSongData) {
            this.props.playSongCallBack(this.state.playSongData)
        }

        if (this.state.queueOne !== prevState.queueOne)
            this.props.addOneToQueueCallBack(this.state.queueOne)
    }

    render() {
        return (
            <Fragment>
                <div className='album-list-root'>
                    <div className="list-cont">
                        <div className='lc-index'>{this.props.index + "."}</div>
                        <div className="lc-det" onClickCapture={this.clickHandle}>
                            <div className='lc-title'>{this.props.title.length > 28 ?
                                this.props.title.substr(0, 28) + "..." :
                                this.props.title
                            }</div>
                            <div className='lc-artist'>{this.props.artist.length > 35 ?
                                this.props.artist.substr(0, 35) + "..." :
                                this.props.artist
                            }</div>
                        </div>
                        <div className="lc-icon">
                            <IconContext.Provider value={{
                                className: 'lc-more-options',
                                size: '1.5em'
                            }}>
                                <MdMoreVert
                                    onClickCapture={() => this.setState({ expandMore: true })}
                                />
                            </IconContext.Provider>
                        </div>

                    </div>
                </div>
                {
                    this.state.expandMore &&
                    <Menu
                        id={this.props.songId}
                        type={this.props.type}
                        artist={this.props.artist}
                        title={this.props.title}
                        image={this.props.image}
                        clickHandleCallBack={this.clickHandle}
                        closeMoreOptionCallBack={this.closeMoreOptionCallBack}
                        clickHandleCallBack={this.clickHandle}
                        optionsArray={['Play Now', 'Add to Queue']}
                    />
                }
            </Fragment>
        )
    }
}

export default AlbumList
