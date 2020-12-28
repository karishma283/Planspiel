//Taleh Muzaffarov  and Rajat Ghosh
import React, { Component } from 'react'
import { Carousel, WingBlank, ListView, Grid, Popover, WhiteSpace, NavBar, List } from 'antd-mobile';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { Icon, Card, Avatar, Drawer, Menu, Tabs } from 'antd'
import ReactDOM from 'react-dom'
import * as Moment from 'moment';
import 'moment/locale/de';
import { fetchPodcasts, fetchChannels } from '../../actions/testAction'
import { connect } from 'react-redux';
import { log } from 'util';
import { Typography } from 'antd';
import TopChannels from './TopChannels'
import Categories from './Categories'
import RecentPodcasts from './RecentPodcasts'
const { Title, Text } = Typography;
const Item = List.Item;
const Brief = Item.Brief;
const PopItem = Popover.Item;

const { Meta } = Card;
const { TabPane } = Tabs;

class MobileHomePodcast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            selected: '',
            isLoading: true,
            tabs: [{ tab: "Discover", component: <Categories /> },
            { tab: "Trending", component: <TopChannels /> },
            { tab: "Recent Podcasts", component: <RecentPodcasts /> }]
            /*drawerVisible: false,*/
        };

    }

    componentDidMount() {
        this.props.fetchChannels()
        this.props.fetchPodcasts()

        //const tabsHeight = document.getElementsByClassName("ant-tabs-nav")[0].clientWidth
        //const allTabsHeight = document.getElementsByClassName("ant-tabs-nav-scroll")[0].clientWidth
        //const tabsMargin = (allTabsHeight - tabsHeight) / 2
        //this.setState({ tabsMargin: tabsMargin })

    }
    allChannels = () => {
        this.props.history.push('/allchannels')
    }
    onChangeTab = (activeKey) => {
        const { tabs } = this.state
        const route = tabs[activeKey].tab.toLowerCase().replace(" ", "-")
        this.props.history.push("/" + route)

    }
    render() {
        const tab = this.props.tab
        console.log(tab);

        const { tabs } = this.state
        console.log(tabs);

        var tmp = tabs[tab];
        tabs[tab] = tabs[1];
        tabs[1] = tmp;
        console.log(tabs);


        const renderTabBar = (props, DefaultTabBar) => (
            <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ marginLeft: this.state.tabsMargin }} />
        );
        return (
            <div id="mobileHomeNews">
                <Tabs renderTabBar={renderTabBar} onChange={this.onChangeTab} activeKey={"2"}>
                    {tabs.map((val, index) => (
                        <TabPane tab={val.tab} key={index} className="bgColor">
                            {val.component}
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        )


    }
}

const mapStateToProps = state => ({
    channels: state.test.channels,
    userCategories: state.test.userCategories
});
export default withRouter(connect(mapStateToProps, { fetchPodcasts, fetchChannels })(MobileHomePodcast))
