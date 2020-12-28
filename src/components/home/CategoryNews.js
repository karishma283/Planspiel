//Taleh Muzaffarov
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
    }
    render() {
        const { news, userCategories } = this.props
        if (news.length > 0) {
            return (

                < div style={{ width: '100%', padding: '10px', margin: 0, marginTop: 64, height: '100%', borderRadius: '20px 20px 0 0', backgroundColor: 'white' }
                }>
                    {
                        Object.values(userCategories).map((category, key) => {
                            if (category._id === news[0].category) {
                                var title = <Title level={4} style={{ textAlign: 'left ' }}><LeftOutlined type="left" style={{ paddingRight: 16, }} onClick={() => this.props.history.goBack()} /> {category.name}</Title>

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
                                return <div>{title}  <List className="my-list">{vals}</List></div>
                            }
                        })
                    }

                </div >
            )
        }
        else {
            return < div style={{ width: '100%', padding: '10px', margin: 0, marginTop: 64, textAlign: "center", height: '100%', borderRadius: '20px 20px 0 0', backgroundColor: 'white' }
            }>No news found on this category. Please check later</div>
        }
    }
}

const mapStateToProps = state => ({
    news: state.test.news,
    userCategories: state.test.userCategories

});
export default withRouter(connect(mapStateToProps, { fetchNews, fetchUserCategories })(AllNews))
