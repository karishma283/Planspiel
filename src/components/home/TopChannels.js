// Taleh Muzaffarov
import React, { Component } from 'react'
import { Card } from 'antd';
import { Carousel, WingBlank } from 'antd-mobile';
import PopoverActions from '../shared/PopoverActions'
import { connect } from 'react-redux';

const { Meta } = Card;


class TopNews extends Component {

    render() {
        const { channels } = this.props
        return (
            <WingBlank style={{ height: "100%" }}>
                <Carousel className="space-carousel"
                    style={{ marginTop: "12.5%", height: "100%" }}
                    frameOverflow="visible"
                    cellSpacing={10}
                    slideWidth={0.8}
                    infinite
                    afterChange={index => this.setState({ slideIndex: index })}
                >
                    {Object.values(channels).map((val, key) => (
                        <Card
                            hoverable
                            style={{ width: "90%", height: "100%", borderRadius: 20 }}
                            cover={<img alt="example" style={{ minHeight: "25%", borderTopLeftRadius: 20, borderTopRightRadius: 20 }} src={val.img} />}
                        >
                            <Meta title={val.name} description={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  consetetur"} />
                        </Card>
                    ))}
                </Carousel>
            </WingBlank>
        )
    }
}

const mapStateToProps = state => ({
    channels: state.test.channels,
    userCategories: state.test.userCategories
});

export default connect(mapStateToProps, {})(TopNews)
