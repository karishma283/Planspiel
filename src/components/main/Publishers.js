//Taleh Muzaffarov 

import React, { Component } from 'react'
import { Card } from 'antd';
import { Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons'

const { Title } = Typography;
const { Text } = Typography;


const { Meta } = Card;
export default class Publishers extends Component {
    render() {
        return (
            <div style={{ marginTop: 40 }}>
                <Card title={<div style={{ fontWeight: 'bold', whiteSpace: 'pre-wrap' }}><LeftOutlined style={{ paddingRight: 16, }} onClick={() => this.props.history.goBack()} /><p>Publishers</p></div>} bordered={false}>
                </Card>
                <Card
                    hoverable
                    style={{ width: "100%" }}
/*                     cover={<img alt="example" style={{ width: "100%" }} src="https://www.famouslogos.net/images/cnn-logo.jpg" />}
 */                >
                    <Meta style={{ textAlign: "center" }} title="Freie Presse" />
                </Card>
                <Card
                    hoverable
                    style={{ width: "100%" }}
/*                     cover={<img alt="example" style={{ width: "100%" }} src="https://www.famouslogos.net/images/cnn-logo.jpg" />}
 */                >
                    <Meta style={{ textAlign: "center" }} title="Blick" />
                </Card>
                <Card
                    hoverable
                    style={{ width: "100%" }}
/*                     cover={<img alt="example" style={{ width: "100%" }} src="https://www.famouslogos.net/images/cnn-logo.jpg" />}
 */                >
                    <Meta style={{ textAlign: "center" }} title="Leipziger Volkszeitung" />
                </Card>
                <Card
                    hoverable
                    style={{ width: "100%" }}
/*                     cover={<img alt="example" style={{ width: "100%" }} src="https://www.famouslogos.net/images/cnn-logo.jpg" />}
 */                >
                    <Meta style={{ textAlign: "center" }} title="Sachsische" />
                </Card>
                <br />
                <br />
                <br />
                <div>
                    <p style={{ textAlign: "center", width: "100%" }}>Please connect to your account</p><p style={{ textAlign: "center", width: "100%" }}>  on at least one publisher </p>
                </div>
            </div>
        )
    }
}
