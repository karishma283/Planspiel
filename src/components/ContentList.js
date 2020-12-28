import React, { Component } from 'react'
import { Row, Col, Layout, Avatar, Card, Typography } from 'antd';
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons'
const { Content } = Layout;
const { Meta } = Card;
const { Title, Text } = Typography;

class ContentList extends Component {
    render() {
        return (
            <Content >
                <Row gutter={24}>
                    {[1, 2, 3, 4, 5].map((key) =>
                        <Col span={6} key={key} style={{ padding: 20 }}>
                            <Card
                                hoverable
                                style={{ width: '100%', textAlign: 'left' }}
                                cover={<img alt="example" src="https://pics.freiepresse.de/DYNIMG/06/85/7090685_M650x433.jpg" />}
                                actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined type="ellipsis" key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    title="The mixed balance of the Christmas market"
                                    description="The booth magic is over. Dealers are happy about more guests, but also see room for improvement. The market performed worse in a test than in 2018."
                                />
                            </Card>
                        </Col>

                    )}



                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card title="Card title" bordered={false}>
                            Card content
        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="Card title" bordered={false}>
                            Card content
        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="Card title" bordered={false}>
                            Card content
        </Card>
                    </Col>
                </Row>
            </Content>
        )
    }
}

export default ContentList