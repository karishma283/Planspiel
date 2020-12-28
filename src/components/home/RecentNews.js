//Taleh Muzaffarov and Karishma Shaik
import React, { Component } from 'react'
import { Typography, Card } from 'antd';
import { Carousel, WingBlank } from 'antd-mobile';
import PopoverActions from '../shared/PopoverActions'
import { connect } from 'react-redux';
import { ListView, Grid, Popover, WhiteSpace, NavBar, List } from 'antd-mobile';
import { EllipsisOutlined, ShareAltOutlined, SaveOutlined, DownloadOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'


const { Meta } = Card;

function onChange(a, b, c) {
    console.log(a, b, c);
}
const { Title, Text } = Typography;
const Item = List.Item;
const Brief = Item.Brief;
const PopItem = Popover.Item;

class RecentNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            selected: '',
            isLoading: true,
        };
    }
    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    handleArticle = (val) => {
        this.setState({ article: val._id })
        this.props.history.push("/article/" + val.url)
    }
    allRecentNews = () => {
        this.props.history.push('/allnews')
    }
    handleVisibleChange = (rowID) => {
        this.setState({
            visible: rowID
        });
    };
    render() {
        const news = this.props.news
        const popover = <Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={false}
            overlay={[
                (<PopItem key="4" value="scan" icon={<SaveOutlined />} data-seed="logId">Save Article</PopItem>),
                (<PopItem key="5" value="special" icon={<DownloadOutlined />} style={{ whiteSpace: 'nowrap' }}>Download Audio</PopItem>),
                (<PopItem key="6" value="button ct" icon={<ShareAltOutlined />}>
                    <span style={{ marginRight: 5 }}>Share</span>
                </PopItem>),
            ]}
            align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
            }}
            onVisibleChange={() => this.handleVisibleChange(1)}
            onSelect={this.onSelect}
        >
            <div style={{
                height: '100%',
                width: '25px',
                marginRight: '-10px',
                display: 'flex',
                alignItems: 'center',
                float: 'right'
            }}
            >
                <EllipsisOutlined />
            </div>
        </Popover>
        return (
            <div id="recentnews">
                <div style={{ width: '100%', float: 'left' }}>
                    <Text style={{ float: 'right', color: 'blue', margin: 0, padding: 10 }} onClick={this.allRecentNews}>See All</Text>
                </div>
                <List className="my-list">
                    {Object.values(news).map((val, key) => {
                        return <Item style={{ width: '90%', float: 'left', marginLeft: "5%", marginBottom: "3%", padding: 0 }} key={key} align="top" multipleLine >
                            <div style={{ width: '25%', float: 'left' }} onClick={() => this.handleArticle(val)}>
                                <img style={{ width: '100%', height: '100%' }} src={val.img} />
                            </div>
                            <div style={{ width: '75%', float: 'left', paddingLeft: 10 }} >
                                <span style={{ fontSize: 12, fontWeight: 'bold', width: '100%' }} onClick={() => this.handleArticle(val._id)}>{val.title}</span>
                                <Brief style={{ fontSize: 10 }}>2 days ago - {'category'} {popover}</Brief>
                            </div>
                        </Item>
                    })}
                </List>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    news: state.test.news,
});

export default withRouter(connect(mapStateToProps, {})(RecentNews))
