import React, { Component } from 'react'
import '../../statics/css/details.css'
import { IconContext } from 'react-icons'
import { AiFillHeart } from 'react-icons/ai'
import { FiPlay, FiArrowLeft } from 'react-icons/fi'
import AlbumList from './AlbumList'

export class DetailsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAlbumClicked: true
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isAlbumClicked !== prevState.isAlbumClicked)
            this.props.albumClickedCallBack(this.state.isAlbumClicked)
    }


    render() {
        return (
            <div className="details-root">
                <IconContext.Provider value={{
                    size: '2.5em',
                    style: {
                        position: 'absolute',
                        border: '0.5px solid grey',
                        borderRadius: '20px',
                        padding: '5px',
                        top: '10px',
                        left: '10px'
                    },
                    className: 'go-back-icon'
                }}>
                    <FiArrowLeft onClickCapture={() => this.setState({ isAlbumClicked: false })} />
                </IconContext.Provider>
                <div className="details-container">
                    <div className="album-image">
                        <img src={this.props.albumData.image.replace("-150x150.jpg", "-250x250.jpg")} alt="" />
                    </div>
                    <div className="album-details">
                        <div className="ad-title">{this.props.albumData.title}</div>
                        <div className="ad-artist">{this.props.albumData.primary_artists}</div>
                        <div className="ad-more-info">{this.props.albumData.year}</div>
                        <div className="ad-icons">
                            <IconContext.Provider value={{
                                className: 'heart',
                                size: '2.7em',
                                style: {
                                    border: '0.5px solid grey',
                                    borderRadius: '50px',
                                    padding: '8px',
                                    margin: '6px'
                                }
                            }}>
                                <AiFillHeart />
                            </IconContext.Provider>
                            <IconContext.Provider value={{
                                className: 'playAll',
                                size: '2.7em',
                                style: {
                                    border: '0.5px solid grey',
                                    borderRadius: '40px',
                                    padding: '6px',
                                    background: 'rgb(11, 226, 226)',
                                    margin: '6px'
                                }
                            }}>
                                <FiPlay />
                            </IconContext.Provider>
                        </div>


                    </div>
                    <div className="album-song-list">
                        {
                            this.props.albumData.songs.map((data, index) => {
                                return (
                                    <AlbumList key={data.id}
                                        index={index + 1}
                                        title={data.song}
                                        type={data.type}
                                        image={data.image.replace('-150x150.jpg', '-250x250.jpg')}
                                        artist={data.primary_artists} />
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default DetailsPage
