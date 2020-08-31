import React, { Component } from 'react'
import { FaPlay, FaInfoCircle } from 'react-icons/fa'
import { MdQueueMusic } from 'react-icons/md'
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
        let imgUrl = this.props.image
        let newImgUrl = imgUrl.replace("-50x50.jpg", "-250x250.jpg")
        console.log(newImgUrl);
        return (
            <div className={`menu-root`} >
                <div className="menu-container">
                    <div className="main-details">
                        <div className="menu-img-div">
                            <img src={newImgUrl} alt="" />
                        </div>
                        <div className="content-details">
                            <div className="content-name"
                                style={{ textAlign: 'center' }}
                                dangerouslySetInnerHTML={{
                                    __html: this.props.title > 28 ?
                                        this.props.title.substr(0, 28) + "..." :
                                        this.props.title
                                }}
                            ></div>
                            <div className="artist-name"
                                dangerouslySetInnerHTML={{
                                    __html: this.props.artist.length > 38 ?
                                        this.props.artist.substr(0, 38) + "..." :
                                        this.props.artist
                                }}
                            ></div>
                        </div>
                        <ul>
                            <li onClick={() => this.props.clickHandleCallBack("play")}>
                                <IconContext.Provider value={{
                                    size: '1.2em',
                                    color: 'rgb(11, 226, 226)'
                                }}>
                                    <FaPlay />
                                </IconContext.Provider>
                                <span>{this.props.optionsArray[0]}</span>
                            </li>
                            <li onClick={() => this.props.clickHandleCallBack(
                                this.props.optionsArray[1] === 'Details' ? 'details' : 'queue')}>

                                <IconContext.Provider value={{
                                    size: '1.2em',
                                }}>
                                    {
                                        this.props.optionsArray[1] === 'Details' ?
                                            <FaInfoCircle /> :
                                            <MdQueueMusic />
                                    }

                                </IconContext.Provider>
                                <span>{this.props.optionsArray[1]}</span>
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
