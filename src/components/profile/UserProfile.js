//Karishma Shaik
import React, { Component } from 'react';
import { List } from 'antd-mobile';
import { Layout, Menu, Breadcrumb, Icon, Typography, Button, Avatar } from 'antd';
import { AppstoreOutlined, AudioOutlined, DownloadOutlined, LinkOutlined, EditOutlined } from '@ant-design/icons'
import ProfilePic from "../../images/profile.png"
import AddCategory from '../shared/AddCategory'
import { log } from 'util';
const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const Item = List.Item;
const Brief = Item.Brief;

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,

        };
    }
    showCategory = () => {
        console.log("Sdf");

        this.setState({ visible: true })
    }
    setVisible = () => {
        this.setState({
            visible: false
        })
    }
    render() {
        console.log(this.state.visible);
        const { visible } = this.state
        if (visible) {
            return <AddCategory visible={true} mode={"profile"} setVisible={() => this.setVisible()} />
        } else {

            return (
                <Content style={{ marginTop: 64 }}>

                    <Layout>
                        <Sider width={'100%'} style={{ background: '#fff' }}>
                            <List className="my-list">
                                <Item extra={
                                    <EditOutlined className="profileEdit" />
                                }>
                                    <div>
                                        <Avatar size={64} src={ProfilePic} className="userIcon" />
                                        <Title level={4} className="userName" >Taleh Muzaffarov</Title>
                                    </div>
                                </Item>
                            </List>
                            <List className="profileMenu">
                                <Item
                                    thumb={<AppstoreOutlined style={{ fontSize: 20 }} />}
                                    arrow="horizontal"
                                    onClick={() => { this.showCategory() }}
                                >Categories</Item>
                                <Item
                                    thumb={<DownloadOutlined style={{ fontSize: 20 }} />}
                                    onClick={() => { }}
                                    arrow="horizontal"
                                >
                                    Downloads
                            </Item>
                                <Item
                                    thumb={<LinkOutlined style={{ fontSize: 20 }} />}
                                    onClick={() => { }}
                                    arrow="horizontal"
                                >
                                    Linked Accounts
                            </Item>
                            </List>

                            {/* <Menu
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
                        </Menu> */}
                        </Sider>
                    </Layout>
                </Content >

            )
        }
    }
}



