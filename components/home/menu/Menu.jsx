import React, { Component } from 'react'
import { FaPlay, FaInfoCircle, FaCaretRight } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import '../../../statics/css/menu.css'


export class Menu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expandMore: true
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.expandMore !== prevState.expandMore) {
            this.props.closeMoreOptionCallBack(this.state.expandMore)
        }
    }

    render() {
        return (
            <div className={`menu-root`} >
                <div className="menu-container">
                    <div className="main-details">
                        <div className="menu-img-div">
                            <img src={this.props.image} alt="" />
                        </div>
                        <div className="content-details">
                            <div className="content-name"
                                dangerouslySetInnerHTML={{ __html: this.props.title }}
                            ></div>
                            <div className="artist-name"
                                dangerouslySetInnerHTML={{ __html: this.props.artist }}
                            ></div>
                        </div>
                        <ul>
                            <li onClick={() => this.props.clickHandleCallBack()}>
                                <IconContext.Provider value={{
                                    size: '1.2em',
                                    color: 'rgb(11, 226, 226)'
                                }}>
                                    <FaPlay />
                                </IconContext.Provider>
                                <span>Play Now</span>
                            </li>
                            <li>

                                <IconContext.Provider value={{
                                    size: '1.2em',
                                }}>
                                    <FaInfoCircle />
                                </IconContext.Provider>
                                <span>Details</span>
                            </li>
                        </ul>
                    </div>
                    <div className="close-menu">
                        <button onClick={() => this.setState({ expandMore: false })}
                        >Close</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu
