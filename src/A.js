import React from 'react';
import PropTypes from 'prop-types';

export default class A extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            text: undefined
        }
    }

    changeText = () => {
        this.setState({
            text: 'Congratulations!'
        })
    }

    render(){
        return(
            <>
                <B onBtnClick={this.changeText} />
                <C text={this.state.text} />
            </>
        )
    }
}


class B extends React.Component {
    render(){
        return(
            <button onClick={this.props.onBtnClick}>Wish me</button>
        )
    }
}


class C extends React.Component {
    render(){
        return(
            <>
                <div>{this.props.text}</div>
            </>
        )
    }
}

C.propTypes = {
    text: PropTypes.string
}

// no props is passed  then this will be passed a prop
// text is undefined
C.defaultProps = {
    text: 'This is a defualt text'
}
