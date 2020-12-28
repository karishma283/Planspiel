//Taleh Muzaffarov 

import React, { Component } from 'react'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import MobileHomeNews from './MobileHomeNews'
import MobileHomePodcast from './MobileHomePodcast'
import TopNews from './TopNews'
import { MenuOutlined } from '@ant-design/icons'

import Categories from '../shared/Categories'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'

import { fetchUserCategories } from '../../actions/testAction'
import { connect } from 'react-redux';
import Podcast from '../shared/Podcast'
const tabs = [
    { title: <Badge ><MenuOutlined onClick={this.showDrawer} /></Badge> },
    { title: <Badge dot>News</Badge> },
    { title: <Badge dot>Podcasts</Badge> },
];

const tabs2 = [
    { title: 'First Tab', sub: '1' },
    { title: 'Second Tab', sub: '2' },
    { title: 'Third Tab', sub: '3' },
];

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            selected: '',
            isLoading: true,
            drawerVisible: true
        };
    }
    onChange = (index, tab) => {
        console.log(tab);

    }
    componentDidMount() {

    }
    onTabClick = (index, tab) => {
        if (index == 0) {
            document.getElementsByClassName("am-tabs-default-bar-underline")[0].style.border = 'none'
        }
        else {
            document.getElementsByClassName("am-tabs-default-bar-underline")[0].style.border = '1px #108ee9 solid'
            document.getElementsByClassName("am-tabs-default-bar-underline")[0].style.width = '45%'

            const left = 10
            index = index - 1
            index = index * 45

            document.getElementsByClassName("am-tabs-default-bar-underline")[0].style.left = left + index + '%'
        }
    }
    render() {
        const { mode } = this.props
        return (
            <div style={{ marginTop: 20, height: '100%', }} >
                <div style={{ display: 'flex', alignItems: 'center', borderRadius: '20px 20px 0 0', justifyContent: 'center', }}>
                    {mode === "podcast" ? <MobileHomeNews tab={this.props.tab} /> : <MobileHomePodcast tab={this.props.tab} />}

                </div>
                <WhiteSpace />
            </div>
        )
    }
}

const mapStateToProps = state => ({
})
export default withRouter(connect(mapStateToProps, { fetchUserCategories })(Home))


