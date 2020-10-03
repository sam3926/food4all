import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getSomeData } from './action';

import "./styles.css"


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            someStateVariable: "hi"
        }
    }

    render() {
        const { someData } = this.props;
        const { someStateVariable } = this.state
        return (
            <div>
                HOME -- state {someStateVariable}-- props -- {someData}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    someData: state.homeReducer.someData
})

const mapDispatchToProps = dispatch => ({
    getSomeData: bindActionCreators(getSomeData, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);