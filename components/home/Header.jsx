import React, { Component } from 'react'
import '../../statics/css/header.css'
// import songify from '../../statics/img/songify.ico'

export class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <header className={`${this.props.visible ? 'slide-down' : 'slide-up'}`}>
                <div>
                    <img id="logo" src={require('../../statics/img/logo-songify.png')} alt="SONGIFY" />
                </div>
            </header>
        )
    }
}

export default Header
