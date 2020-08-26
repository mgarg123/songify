import React, { Component } from 'react'
import Typical from 'react-typical'
import { GrFormClose } from 'react-icons/gr'
import { GrFormSearch } from 'react-icons/gr'
import { IconContext } from "react-icons"
import ClipLoader from 'react-spinners/ClipLoader'
import _ from 'lodash'

export class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchVal: "",
            plcaeholderList: ["Pachtaoge", 500, "Arijit Singh", 500, "Senorita", 500],
            switchAnimation: true,
            iseResetClicked: false
        }
        this.onChangeDebounced = _.debounce(this.onChangeDebounced, 500)
    }

    handleChange = (event) => {
        this.setState({ searchVal: event.target.value })
        this.onChangeDebounced(event)
    }

    onChangeDebounced = (event) => {
        this.props.searchCallBack(this.state.searchVal)
    }

    resetInput = (event) => {
        this.props.searchCallBack("")
        this.setState({ searchVal: "", switchAnimation: true, iseResetClicked: true })

    }

    componentDidUpdate(prevProps, prevState) {
        // if (this.state.searchVal !== prevState.searchVal)

    }
    render() {
        return (
            <div className="search-bar">

                <input type="text"
                    value={this.state.searchVal}
                    id="search-box"
                    autoComplete={"off"}
                    onChange={this.handleChange}
                    onFocus={() => this.setState({ switchAnimation: false })}
                    onBlur={() => this.setState({ switchAnimation: this.state.searchVal ? false : true })}
                />
                <IconContext.Provider value={{
                    color: "grey", size: "1.6em",
                    className: "search-icon",
                    style: { display: this.props.loading ? 'none' : 'block' }
                }}>
                    <GrFormSearch />
                </IconContext.Provider>
                <ClipLoader
                    css={`position:absolute;top: 15px;left: 12px;display:${this.props.loading ? 'block' : 'none'}`}
                    size={20}
                    color={"#757575"}
                />
                <div style={{ display: `${this.state.switchAnimation ? "block" : "none"}` }}>
                    <Typical
                        steps={this.state.plcaeholderList}
                        loop={Infinity}
                        wrapper="span"
                    />
                </div>


                <span id="reset-field"
                    className={this.state.searchVal ? 'slide-in' : 'slide-out'}
                    style={{ display: `${this.state.searchVal ? 'inline-block' : 'none'}` }}
                    onClick={this.resetInput}
                >
                    <IconContext.Provider value={{ color: "rgb(110,110,110)", size: "1.5em" }}>
                        <GrFormClose />
                    </IconContext.Provider>
                </span>
            </div>
        )
    }
}

export default SearchBar
