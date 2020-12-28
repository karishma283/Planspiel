/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
//Taleh Muzaffarov 

import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { Icon, Card, Avatar, Drawer, Menu, Tabs } from 'antd'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as Moment from 'moment';
import 'moment/locale/de';
import TopNews from './TopNews'

import RecentNews from './RecentNews'
import { fetchNews } from '../../actions/testAction'
import { connect } from 'react-redux';
import Categories from './Categories'
import { log } from 'util';
import { Typography } from 'antd';


const { TabPane } = Tabs;

class MobileHomeNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            selected: '',
            isLoading: true,
            tabs: [{ tab: "Discover", component: <Categories /> },
            { tab: "Trending", component: <TopNews /> },
            { tab: "Recent News", component: <RecentNews /> }]
            /*drawerVisible: false,*/
        };
    }

    componentDidMount() {
        this.props.fetchNews()
        const tabsHeight = document.getElementsByClassName("ant-tabs-nav")[0].clientWidth
        const allTabsHeight = document.getElementsByClassName("ant-tabs-nav-scroll")[0].clientWidth
        const tabsMargin = (allTabsHeight - tabsHeight) / 2
        this.setState({ tabsMargin: tabsMargin })
    }


    handleArticle = (val) => {
        this.setState({ article: val._id })
        this.props.history.push("/article/" + val.url)
    }
    onChangeTab = (activeKey) => {
        const { tabs } = this.state
        const route = tabs[activeKey].tab.toLowerCase().replace(" ", "-")
        this.props.history.push("/" + route)

    }

    render() {
        const tab = this.props.tab
        const { tabs } = this.state
        var tmp = tabs[tab];
        tabs[tab] = tabs[1];
        tabs[1] = tmp;


        const renderTabBar = (props, DefaultTabBar) => (
            <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ marginLeft: this.state.tabsMargin }} />
        );

        return (<div id="mobileHomeNews">
            <Tabs renderTabBar={renderTabBar} onChange={this.onChangeTab} activeKey={"1"}>
                {tabs.map((val, index) => (
                    <TabPane tab={val.tab} key={index} className="bgColor">
                        {val.component}
                    </TabPane>
                ))}
            </Tabs>



        </div >

        );
    }
}
const mapStateToProps = state => ({
    news: state.test.news,
    userCategories: state.test.userCategories
});
export default withRouter(connect(mapStateToProps, { fetchNews })(MobileHomeNews))
