import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'

const green = '#8bc574';
const red = '#e23d3d';
const white = '#f1f1f1';

export default class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            colorU: white,
            colorD: white,
            nonColorU: green,
            nonColorD: red
        };
        this.changeColorU = this.changeColorU.bind(this);
        this.changeColorD = this.changeColorD.bind(this);
    }
    changeColorU() {
        const newColor = this.state.colorU === green ? white : green;
        if (this.state.colorD===red)
        {
            this.changeColorD();
        }
        this.setState({ nonColorU: this.state.colorU })
        this.setState({ colorU: newColor })
    }
    changeColorD() {
        const newColor = this.state.colorD === red ? white : red;
        if (this.state.colorU === green) {
            this.changeColorU();
        }
        this.setState({ nonColorD: this.state.colorD })
        this.setState({ colorD: newColor })
    }

    render() {
        return (
            <>
            <button className="button up" style={{ background: this.state.colorU }} onClick={this.changeColorU}>
                <FontAwesomeIcon icon={faThumbsUp} />
            </button>
                <button 
                className="button down" 
                style={
                    {background: this.state.colorD}
                } 
                onClick={this.changeColorD}>
                <FontAwesomeIcon icon={faThumbsDown} 
            />

            </button>
            </>
        )
    }
}