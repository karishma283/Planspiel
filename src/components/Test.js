import React, { Component } from 'react'
import { ButtonMobile } from 'antd-mobile';
import { Layout, Menu, Breadcrumb, Icon, Typography, Button } from 'antd';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { testAction } from '../actions/testAction'
import '../index.css';
import ContentList from './ContentList'
import { DesktopUserProfile } from './Responsive'
const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;
class Test extends Component {
    constructor(props) {
        super()
        this.state = {}
    }
    handleClick = () => {
        this.props.testAction();
    }
    render() {
        console.log(this.props.test);

        return (
            <Layout style={{ width: '100%' }}>
                <Icon type="login" theme="filled" style={{ float: 'right', color: 'red' }} />
                <Header className="header">
                    <div className="logo"></div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1" className="headerMenuItem"><Icon type="login" className="headerMenuIcon" /> Login</Menu.Item>
                        <Menu.Item key="2" className="headerMenuItem">Premium Access    </Menu.Item>
                        <Menu.Item key="3" className="headerMenuItem"></Menu.Item>
                    </Menu>


                </Header>
                <Content style={{ padding: '0 50px' }}>

                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={300} style={{ background: '#fff' }}>
                            <Icon type="user" className="userIcon" />
                            <Title level={4}>Rajat Ghosh</Title>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu
                                    key="sub1"
                                    title={
                                        <span>
                                            <Icon type="user" />
                                            Choosen Categories
                                        </span>
                                    }
                                >
                                    <Menu.Item key="1" className="menuItem">All</Menu.Item>
                                    <Menu.Item key="2" className="menuItem">Entertainment</Menu.Item>
                                    <Menu.Item key="3" className="menuItem">Sport</Menu.Item>
                                    <Menu.Item key="4" className="menuItem">Technology</Menu.Item>
                                    <Menu.Item key="5" className="menuItem">Politics</Menu.Item>
                                    <Button type="dashed"> + Add New Category</Button>
                                </SubMenu>
                                <SubMenu
                                    key="sub2"
                                    title={
                                        <span>
                                            <Icon type="laptop" />
                                            subnav 2
                </span>
                                    }
                                >
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub3"
                                    title={
                                        <span>
                                            <Icon type="notification" />
                                            subnav 3
                </span>
                                    }
                                >
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <ContentList style={{ padding: '0 24px', minHeight: 280 }} />
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    test: state.test.test,
});


export default withRouter(connect(mapStateToProps, { testAction })(Test));
