//Taleh Muzaffarov and Shruti Chauhan
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ListView, Grid, Popover, WhiteSpace, NavBar, List } from 'antd-mobile';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import PopoverActions from '../shared/PopoverActions'
import { fetchNews, fetchUserCategories } from '../../actions/testAction'
import { Typography, Icon } from 'antd';
import { LeftOutlined } from '@ant-design/icons'


const { Title, Text } = Typography;

const Item = List.Item;
const Brief = Item.Brief;
class AllNews extends Component {
    componentDidMount() {
    }
    render() {
        const { channels, userCategories } = this.props
        return (
            <div style={{ width: '100%', padding: '10px', margin: 0, marginTop: 64, height: '100%', borderRadius: '20px 20px 0 0', backgroundColor: 'white' }}>
                <Title level={4} style={{ textAlign: 'left ' }}><LeftOutlined style={{ paddingRight: 16, }} onClick={() => this.props.history.goBack()} /> All Channels</Title>
                <List className="my-list">
                    {
                        Object.values(userCategories).map((category, key) => {
                            const categoryName = <div style={{ width: '100%', float: 'left' }}>
                                <Title style={{ float: 'left ', fontWeight: 'bold', margin: 0, fontSize: 14, padding: 10, width: '100px' }}>{category.name}</Title>
                                <Text style={{ float: 'right', color: 'blue', margin: 0, padding: 10 }} onClick={this.allRecentNews}>More</Text>
                            </div>
                            return Object.values(channels).map((val, key) => {
                                if (val.category === category._id) {
                                    return <div>
                                        {categoryName}
                                        <Item style={{ width: '100%', float: 'left' }} align="top" multipleLine >
                                            <div style={{ width: '30%', float: 'left' }} onClick={() => this.handleArticle(val)}>
                                                <img style={{ width: '100%', height: '100%' }} src={val.img} />
                                            </div>
                                            <div style={{ width: '70%', float: 'left', paddingLeft: 10 }} >
                                                <span style={{ fontSize: 12, fontWeight: 'bold', width: '100%' }} onClick={() => this.handleArticle(val._id)}>{val.name}</span>
                                                <Brief style={{ fontSize: 10 }}>{val.podcast_count} Episodes * {val.length} mins {<PopoverActions />}</Brief>
                                            </div>
                                        </Item>
                                    </div>
                                }
                                else {
                                    return null
                                }
                            })

                        })
                    }
                </List>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    channels: state.test.channels,
    userCategories: state.test.userCategories

});
export default withRouter(connect(mapStateToProps, { fetchNews, fetchUserCategories })(AllNews))
