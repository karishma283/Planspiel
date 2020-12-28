// Karishma Shaik

import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Typography, Button } from 'antd';
import UserOutlined from '@ant-design/icons/UserOutlined'
import { NotificationOutlined } from '@ant-design/icons'
import { LaptopIcon } from './Icon'
const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;
export const UserProfile = () => (
    <Sider width={300} style={{ background: '#fff', marginTop: 64 }} >
        <UserOutlined className="userIcon" />
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
                        <UserOutlined />
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
                        <LaptopOutlined />
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
                        <NotificationOutlined />
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

)


