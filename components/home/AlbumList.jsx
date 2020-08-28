import React, { Component, Fragment } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { IconContext } from "react-icons"
import Menu from './menu/Menu'

export class AlbumList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expandMore: false
        }
    }


    clickHandle = () => {

    }

    closeMoreOptionCallBack = (expandMore) => {
        this.setState({ expandMore: expandMore })
    }

    render() {
        return (
            <Fragment>
                <div className='album-list-root'>
                    <div className="list-cont">
                        <div className='lc-index'>{this.props.index + "."}</div>
                        <div className="lc-det">
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
                        optionsArray={['Play Now', 'Add to Queue']}
                    />
                }
            </Fragment>
        )
    }
}

export default AlbumList
