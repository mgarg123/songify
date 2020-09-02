import React, { Component } from 'react'
import { MdMusicNote as SongsIcon, MdKeyboardArrowRight } from 'react-icons/md'
import { BsMusicNoteList as PlayListIcon } from 'react-icons/bs'
import { FiDisc as AlbumIcon } from 'react-icons/fi'
import { GiMicrophone as ArtistIcon } from 'react-icons/gi'
import { IconContext } from 'react-icons'

export class LibOption extends Component {
    render() {
        return (
            <div className="lib-option" onClick={() => this.props.whichOptionCallBack(this.props.title)}>
                <IconContext.Provider value={{
                    className: "opt-icon-1"
                }}>
                    {
                        this.props.title === "Songs" ?
                            <SongsIcon /> :
                            this.props.title === "Artists" ?
                                <ArtistIcon /> :
                                this.props.title === "Albums" ?
                                    <AlbumIcon /> :
                                    <PlayListIcon />
                    }

                </IconContext.Provider>
                <span id="opt-title">{this.props.title}</span>
                <span id="opt-count">{this.props.count}</span>
                <IconContext.Provider value={{
                    className: "opt-icon-2"
                }}>
                    <MdKeyboardArrowRight />
                </IconContext.Provider>
            </div>
        )
    }
}

export default LibOption
