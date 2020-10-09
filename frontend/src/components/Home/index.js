import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getSomeData } from './action';
import 'antd/dist/antd.css';
import '../../index.css';
import { Layout } from 'antd';
import "./styles.css";

import LeftSidePanel from '../LeftSidePanel';
import HomeCenter from '../HomeCenter';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            someStateVariable: "hi"
        }
    }
     
    render() {
        return (
            <div>
                <Layout>
                    <LeftSidePanel/>
                    <Layout style={{ padding: '0 24px 24px' }}>   
                        <HomeCenter/>
                    </Layout>   
                </Layout>
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