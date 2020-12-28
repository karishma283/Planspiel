//Taleh Muzaffarov and Shruti Chauhan

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ListView, Grid, Popover, WhiteSpace, NavBar, List } from 'antd-mobile';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import PopoverActions from '../shared/PopoverActions'
import { fetchNews, fetchUserCategories } from '../../actions/testAction'
import { Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons'

const { Title, Text } = Typography;

const Item = List.Item;
const Brief = Item.Brief;
class AllNews extends Component {
    componentDidMount() {
        this.props.fetchNews()
        this.props.fetchUserCategories()
    }
    render() {
        const { news, userCategories } = this.props
        return (
            <div style={{ width: '100%', padding: '10px', margin: 0, marginTop: 64, height: '100%', borderRadius: '20px 20px 0 0', backgroundColor: 'white' }}>
                <Title level={4} style={{ textAlign: 'left ' }}><LeftOutlined type="left" style={{ paddingRight: 16, }} onClick={() => this.props.history.goBack()} /> All Recent News</Title>
                <List className="my-list">
                    {
                        Object.values(userCategories).map((category, key) => {
                            const categoryName = <div style={{ width: '100%', float: 'left' }}>
                                <Title style={{ float: 'left ', fontWeight: 'bold', margin: 0, fontSize: 14, padding: 10, width: '100px' }}>{category.name}</Title>
                                <Text style={{ float: 'right', color: 'blue', margin: 0, padding: 10 }} onClick={this.allRecentNews}>More</Text>
                            </div>
                            var vals = Object.values(news).map((val, key) => {
                                if (val.category === category._id) {
                                    return <Item style={{ width: '100%', float: 'left' }} align="top" multipleLine >
                                        <div style={{ width: '30%', float: 'left' }} onClick={() => this.handleArticle(val)}>
                                            <img style={{ width: '100%', height: '100%' }} src={val.img} />
                                        </div>
                                        <div style={{ width: '70%', float: 'left', paddingLeft: 10 }} >
                                            <span style={{ fontSize: 12, fontWeight: 'bold', width: '100%' }} onClick={() => this.handleArticle(val._id)}>{val.title}</span>
                                            <Brief >2 days ago {<PopoverActions />}</Brief>
                                        </div>
                                    </Item>
                                }
                            })
                            return <div>
                                {categoryName} {vals}
                            </div>
                        })
                    }
                </List>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    news: state.test.news,
    userCategories: state.test.userCategories

});
export default withRouter(connect(mapStateToProps, { fetchNews, fetchUserCategories })(AllNews))
