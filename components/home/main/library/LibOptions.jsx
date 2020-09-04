import React, { Component } from 'react'
import LibOption from './LibOption'

export class LibOptions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            whichOption: ""
        }
    }
    whichOptionCallBack = (option) => {
        this.props.whichOptionCallBack(option)
    }

    render() {
        return (
            <div className="lib-options">
                <LibOption title={"Songs"} count={this.props.count.song} whichOptionCallBack={this.whichOptionCallBack} />
                <LibOption title={"Albums"} count={this.props.count.album} whichOptionCallBack={this.whichOptionCallBack} />
                <LibOption title={"Artists"} count={this.props.count.artist} whichOptionCallBack={this.whichOptionCallBack} />
                <LibOption title={"Playlists"} count={this.props.count.playlist} whichOptionCallBack={this.whichOptionCallBack} />
            </div>
        )
    }
}

export default LibOptions
