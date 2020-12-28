//Taleh Muzaffarov and Rajat Ghosh
import React, { Component } from 'react'
import { Button, Tooltip } from 'antd'
import { Gamepad, QuestionAnswer, Share as ShareIcon, MoreVert } from '@material-ui/icons';
import { log } from 'util';
import { DownloadOutlined, AppstoreOutlined } from '@ant-design/icons'
export default class ArticleActions extends Component {
    constructor(props) {
        super()
        this.state = {
            open: false
        }
    }

    showTools = () => {
        this.setState({
            open: !this.state.open
        })
    }
    share = (i) => {
        switch (i) {
            case 0:
                return console.log("sdfsd");
            case 1:
                return console.log("sdfsd");
            case 2:
                return console.log("sdfsd");
            default:
                break;

        }
    }
    render() {
        const { open } = this.state
        const data = [{
            icon: <ShareIcon />,
        },
        {
            icon: <DownloadOutlined />,
        },
        {
            icon: <AppstoreOutlined />,
        }]
        var tools = null
        if (open) {
            tools = data.map((val, i) => (
                <Button shape="circle"
                    style={{ width: 40, height: 40, right: 20, position: 'fixed', bottom: 70 + ((i + 1) * 50), zIndex: 1000 }}
                    onClick={() => this.share(i)}>
                    {val.icon}
                </Button>
            ))
        }

        return (
            <div style={{ position: 'absolute', right: 30, bottom: 35, zIndex: '1000' }}>
                <MoreVert style={{ position: "absolute", fontSize: 25 }} onClick={() => this.showTools()} />
                {tools}
            </div >
        )
    }
}
