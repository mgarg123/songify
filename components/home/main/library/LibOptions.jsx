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
                <LibOption title={"Songs"} count={100} whichOptionCallBack={this.whichOptionCallBack} />
                <LibOption title={"Albums"} count={20} whichOptionCallBack={this.whichOptionCallBack} />
                <LibOption title={"Artists"} count={13} whichOptionCallBack={this.whichOptionCallBack} />
                <LibOption title={"Playlists"} count={0} whichOptionCallBack={this.whichOptionCallBack} />
            </div>
        )
    }
}

export default LibOptions
