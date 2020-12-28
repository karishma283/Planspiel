//Taleh Muzaffarov 

import React, { Component } from 'react'
import { ButtonMobile } from 'antd-mobile';
import { Layout, Menu, Breadcrumb, Icon, Typography, Button } from 'antd';
import LoginOutlined from '@ant-design/icons/LoginOutlined';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { testAction } from '../../actions/testAction'
import '../../index.css';
import ContentList from './../ContentList'
import { DesktopUserProfile } from './../Responsive'
import UserProfile from './../profile/UserProfile';
const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;
class Test extends Component {
    constructor(props) {
        super()
        this.state = {}
    }
    handleClick = () => {
    }
    render() {

        return (
            <header className="App-header">
                <Layout style={{ width: '100%' }}>
                    <LoginOutlined theme="filled" style={{ float: 'right', color: 'red' }} />
                    <Header className="header">
                        <div className="logo"></div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1" className="headerMenuItem"><LoginOutlined className="headerMenuIcon" /> Login</Menu.Item>
                            <Menu.Item key="2" className="headerMenuItem">Premium Access    </Menu.Item>
                            <Menu.Item key="3" className="headerMenuItem"></Menu.Item>
                        </Menu>


                    </Header>
                    <Content style={{ padding: '0 50px' }}>

                        <Layout style={{ padding: '24px 0', background: '#fff' }}>
                            <UserProfile />
                            <ContentList style={{ padding: '0 24px', minHeight: 280 }} />
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </header>
        )
    }
}

const mapStateToProps = state => ({
    test: state.test.test,
});


export default withRouter(connect(mapStateToProps, {})(Test));
