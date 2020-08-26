import React, { Component } from 'react'
import { IconContext } from 'react-icons'
import { MdHome, MdSearch, MdLibraryMusic, MdAccountCircle } from 'react-icons/md'
import '../../statics/css/footer.css'


export class Footer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            whichTab: "home"
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.whichTab !== this.state.whichTab) {
            this.props.tabsCallBack(this.state.whichTab)
        }
    }
    render() {
        return (

            <footer>
                <div className="footer">
                    <IconContext.Provider value={{
                        color: `${this.state.whichTab === "home" ? 'aqua' : '#fff'}`,
                        size: '1.75em',
                        className: "footer-icon"
                    }}>
                        <div
                            className="home-tab"
                            onClick={() => this.setState({ whichTab: "home" })}
                        ><MdHome /></div>
                    </IconContext.Provider>

                    <IconContext.Provider value={{
                        color: `${this.state.whichTab === "search" ? 'aqua' : '#fff'}`,
                        size: '1.75em',
                        className: "footer-icon"
                    }}>
                        <div
                            className="search-tab"
                            onClick={() => this.setState({ whichTab: "search" })}
                        ><MdSearch /></div>
                    </IconContext.Provider>

                    <IconContext.Provider value={{
                        color: `${this.state.whichTab === "library" ? 'aqua' : '#fff'}`,
                        size: '1.75em',
                        className: "footer-icon"
                    }}>
                        <div
                            className="library-tab"
                            onClick={() => this.setState({ whichTab: "library" })}
                        ><MdLibraryMusic /></div>
                    </IconContext.Provider>

                    <IconContext.Provider value={{
                        color: `${this.state.whichTab === "settings" ? 'aqua' : '#fff'}`,
                        size: '1.75em',
                        className: "footer-icon"
                    }}>
                        <div
                            className="settings-tab"
                            onClick={() => this.setState({ whichTab: "settings" })}
                        ><MdAccountCircle /></div>
                    </IconContext.Provider>
                </div>

            </footer>
        )
    }
}

export default Footer
