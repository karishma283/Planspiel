//Taleh Muzaffarov 

import React, { Component } from 'react'
import { List } from 'antd-mobile';
import { Typography } from 'antd';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import lscache from 'lscache'
import { AppstoreOutlined, UserOutlined, FileTextOutlined, UserAddOutlined, NotificationOutlined, AudioOutlined } from '@ant-design/icons'

const { Title } = Typography;
const Item = List.Item;

const Brief = Item.Brief;
class Settings extends Component {
    logOut = () => {
        lscache.flush()
        this.props.history.push("/login")
        console.log(lscache.get("usertoken"));
    }
    render() {
        const iconStyle = { fontSize: 20 }
        return (
            <div>
                <List renderHeader={() => <Title level={4}>Settings</Title>} style={{ marginTop: 64, backgroundColor: 'white' }}>
                    <Item onClick={() => this.props.history.push("/account")}
                        thumb={<UserOutlined style={iconStyle} />}
                    > My Account</Item>
                </List>

                <List >
                    <Item
                        thumb={<NotificationOutlined style={iconStyle} />}
                        onClick={() => { }}
                    >
                        Notifications
                            </Item>
                </List>
                <List className="">
                    <Item
                        thumb={<UserAddOutlined style={iconStyle} />}
                    >Refer to a Friend</Item>
                </List>
                <List >
                    <Item
                        thumb={<FileTextOutlined style={iconStyle} />}
                        onClick={() => { }}
                    >
                        Terms of Use
                            </Item>
                </List>
                <List>
                    <Item
                        thumb={<AudioOutlined style={iconStyle} />}
                        onClick={() => this.logOut()}
                    >
                        Logout
                        </Item>
                </List>
            </div>
        )
    }
}
export default withRouter(Settings)