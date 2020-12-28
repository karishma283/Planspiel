//Taleh Muzaffarov
import React, { Component } from 'react'
import { Card } from 'antd';
import { Carousel, WingBlank } from 'antd-mobile';
import PopoverActions from '../shared/PopoverActions'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'

const { Meta } = Card;

class TopNews extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleArticle = (val) => {
        this.setState({ article: val._id })
        this.props.history.push("/article/" + val.url)
    }

    render() {
        const news = this.props.news
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
                    {Object.values(news).map((val, key) => (
                        <Card
                            onClick={() => this.handleArticle(val)}
                            hoverable
                            style={{ width: "90%", height: "100%", borderRadius: 20 }}
                            cover={<img alt="example" style={{ minHeight: "25%", borderTopLeftRadius: 20, borderTopRightRadius: 20 }} src={val.img} />}
                        >
                            <Meta title={val.title} description={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  consetetur"} />
                        </Card>
                    ))}
                </Carousel>
            </WingBlank>
        )
    }
}

const mapStateToProps = state => ({
    news: state.test.news,
    userCategories: state.test.userCategories
});

export default withRouter(connect(mapStateToProps, {})(TopNews))
